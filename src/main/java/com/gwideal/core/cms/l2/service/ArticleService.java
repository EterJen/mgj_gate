package com.gwideal.core.cms.l2.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.gwideal.core.basic.l2.service.CacheService;
import com.gwideal.core.basic.l2.service.ResourceService;
import com.gwideal.core.cms.l3.dao.*;
import com.gwideal.core.cms.l4.entity.*;
import com.gwideal.core.common.SystemUtils;
import com.gwideal.core.jwt.JwtUser;
import com.gwideal.core.util.PDFUtil;
import com.gwideal.core.util.SignUtils;
import com.gwideal.mybatis.metautils.ResultInfo;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import per.eter.utils.datetime.DateTimeUtils;
import per.eter.utils.datetime.SimpleDay;
import per.eter.utils.file.FileExtend;
import per.eter.utils.file.FileUtils;
import per.eter.utils.file.SimpFile;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;

@Service
@Transactional
public class ArticleService {
    @Autowired
    TwolevelcolumnService twolevelcolumnService;
    @Autowired
    private AdministratorMapper administratorMapper;
    @Autowired
    CacheService cacheService;

    @Autowired
    private SimpleFileMapper simpleFileMapper;

    @Autowired
    private ArticleMapper articleMapper;

    @Autowired
    private RelationArticleSimplefileMapper relationArticleSimplefileMapper;
    @Autowired
    private AttachmentService attachmentService;
    @Autowired
    private FileUtils fileUtils;

    public static String attRelativePath = "/articleAtt/new";

    @Autowired
    private LogService logService;

    @Autowired
    private TwolevelcolumnMapper twolevelcolumnMapper;
    @Autowired
    ResourceService resourceService;

    @Value("${app.workspace}")
    private String workSpace;

    @Autowired
    private SignUtils signUtils;

    @PostConstruct
    public void afterInit() {
        File file = new File(workSpace);
        if (!file.exists()) {
            file.mkdirs();
        }
    }

    public int create(Article article) {
        Administrator cu = ((JwtUser) (((UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication()).getPrincipal())).getCoreUser();
        article.setCreater(cu.getDisplay());
        if (null == article.getPublishTime() && BigDecimal.ONE.equals(article.getIfPublished())) {
            article.setPublishTime(new Date());
        }
        article.setIfDelete(BigDecimal.ZERO);

        //??????
/*        String sign = signUtils.sign(article.toString().getBytes());
        article.setSignText(sign);*/


        //??????
        Map<String, Object> postBean = new HashMap<>();
        postBean.put("data",article.toString().getBytes());


		/*String sign = signUtils.sign(postBean);
		administrator.setSignText(sign);*/

        String sign = signUtils.sign(postBean);
        article.setSignText(sign);

        int result = articleMapper.insert(article);
        update(article);
        logService.log(result, LogService.AuditType.??????, article);
        return result;

    }

    public Article read(BigDecimal id) {
        Article article = articleMapper.selectByPrimaryKey(id);
        List<Twolevelcolumn> twolevelcolumnList = article.getTwolevelcolumnList();
        //?????????????????????

        BigDecimal docCategoryId = article.getDocCategoryId();
        Twolevelcolumn twolevelcolumn = twolevelcolumnMapper.selectByPrimaryKey(docCategoryId);
        twolevelcolumnList.add(twolevelcolumn);


        RelationArticleSimplefile relationArticleSimplefile = new RelationArticleSimplefile();
        relationArticleSimplefile.setArticleId(article.getId());
        List<RelationArticleSimplefile> list = relationArticleSimplefileMapper.list(relationArticleSimplefile);
        if (CollectionUtils.isNotEmpty(list)) {
            List<SimpleFile> simpleFiles = new ArrayList<>();
            for (RelationArticleSimplefile articleSimplefile : list) {
                SimpleFile simpleFile = simpleFileMapper.selectByPrimaryKey(articleSimplefile.getSimpleFileId());
                if (null != simpleFile) {
                    simpleFiles.add(simpleFile);
                }
            }
            article.setSimpleFiles(simpleFiles);
        }


        return article;
    }

    public int update(Article article) {
        Article oldArticle = articleMapper.selectByPrimaryKey(article.getId());
        BigDecimal ifSetTop = article.getIfSetTop();
        if (ifSetTop.equals(BigDecimal.ZERO)) {
            article.setSetTopSort(BigDecimal.ZERO);
        } else {
            BigDecimal sequence = administratorMapper.getSequence();
            article.setSetTopSort(sequence);
        }

        //??????
/*
        String sign = signUtils.sign(article.toString().getBytes());
        article.setSignText(sign);
*/

        //??????
        Map<String, Object> postBean = new HashMap<>();
        postBean.put("data",article.toString().getBytes());


		/*String sign = signUtils.sign(postBean);
		administrator.setSignText(sign);*/

        String sign = signUtils.sign(postBean);
        article.setSignText(sign);

        int result = articleMapper.updateByPrimaryKey(article);


        RelationArticleSimplefile relationArticleSimplefile = new RelationArticleSimplefile();
        relationArticleSimplefile.setArticleId(article.getId());
        relationArticleSimplefileMapper.delete(relationArticleSimplefile);

        List<SimpleFile> simpleFiles = article.getSimpleFiles();
        if (CollectionUtils.isNotEmpty(simpleFiles)) {
            for (int i = 0; i < simpleFiles.size(); i++) {
                SimpleFile simpleFile = simpleFiles.get(i);
                BigDecimal id = simpleFile.getId();
                if (null == id) {
                    continue;
                }
                relationArticleSimplefile.setOrderNumber(BigDecimal.valueOf(i + 1));
                relationArticleSimplefile.setSimpleFileId(id);
                relationArticleSimplefileMapper.insert(relationArticleSimplefile);
            }
        }


        logService.log(result, LogService.AuditType.??????, oldArticle);
        return result;
    }

    public int delete(BigDecimal id) {
        //????????????
        Article article = articleMapper.selectByPrimaryKey(id);
        article.setIfDelete(BigDecimal.ONE);
        int result = articleMapper.updateByPrimaryKeySelective(article);
        logService.log(result, LogService.AuditType.??????, article);
        return result;
    }


    public ResultInfo<Article> list(Article queryBean) {
        ResultInfo<Article> result = new ResultInfo<Article>();

        String categoryIdStr = queryBean.getCategoryIdStr();
        if (null != categoryIdStr) {
            queryBean.setDocCategoryId(twolevelcolumnService.getArticleCategoryId(categoryIdStr));
        }

        BigDecimal docCategoryId = queryBean.getDocCategoryId();
        if ( null == docCategoryId) {
            queryBean.setDocCategoryId(BigDecimal.ONE);/*??????????????????????????????????????? id???????????????????????????????????? */
        }

        List<BigDecimal> articleCategoryids = queryBean.getIds();
        if (CollectionUtils.isEmpty(articleCategoryids)) {
            getAllChrenId(queryBean);
        }else {
            queryBean.setDocCategoryId(null);
        }

        if (queryBean.getPaging().equals("Yes")) {
            PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
            List<Article> plist = articleMapper.list(queryBean);
            LocalDateTime nowTime = new SimpleDay(LocalDateTime.now()).getStartLocalDateTime();

            for (Article article : plist) {
                BigDecimal showNewFlag = article.getShowNewFlag();
                if (BigDecimal.ONE.equals(showNewFlag)) {
                    Date publishTime = article.getPublishTime();
                    BigDecimal newFlagShowDays = article.getNewFlagShowDays();
                    if (null == publishTime || null == newFlagShowDays) {
                        article.setShowNewFlag(BigDecimal.ZERO);
                    } else {
                        LocalDateTime publistLdt = DateTimeUtils.date2Ldt(publishTime);
                        long l = newFlagShowDays.longValue();
                        LocalDateTime localDateTime = nowTime.minusDays(l);
                        if (localDateTime.isAfter(publistLdt)) {
                            article.setShowNewFlag(BigDecimal.ZERO);
                        }
                    }
                }
            }

            plist.forEach(administrator ->{
                if(StringUtils.isNotEmpty(administrator.getSignText())){

                    Map<String, Object> postBean = new HashMap<>();
                    postBean.put("data",administrator.toString());
                    postBean.put("signData",administrator.getSignText());
                    if(signUtils.verify(postBean)){
                        administrator.setModify(true);
                    }
                    //????????????
/*                    if(!signUtils.verify(administrator.toString().getBytes(),administrator.getSignText())){
                        administrator.setModify(true);
                    }*/
                }
            });

            PageInfo<Article> pageInfo = new PageInfo<Article>(plist);
            result.setTotalRows(pageInfo.getTotal());
            result.setBeanList(pageInfo.getList());
            result.setResultType("success");
            return result;
        } else {
            List<Article> plist = articleMapper.list(queryBean);
            /*?????????????????????*/
            result.setTotalRows((long) plist.size());
            result.setBeanList(plist);
            result.setResultType("success");
            return result;
        }
    }

    /**
     * ???????????????????????????????????????????????????
     *
     * @param plist
     */


    /**
     * ????????????????????????????????????id
     *
     * @param queryBean
     */
    public void getAllChrenId(Article queryBean) {
        BigDecimal docCategoryId = queryBean.getDocCategoryId();
        queryBean.setDocCategoryId(null);
        List<BigDecimal> ids = twolevelcolumnService.articleCategoryids(docCategoryId);
        queryBean.setArticleCategoryIds(ids);
    }

    public ResultInfo<Article> deleteIds(Article article) {
        ResultInfo<Article> result = new ResultInfo<Article>();
        List<BigDecimal> ids = article.getIds();
        int i = 0;
        if (ids != null && ids.size() > 0) {
            for (BigDecimal id : ids) {
                i += delete(id);
            }
        }

        result.setResultType("success");
        result.setMessage("???????????????????????????" + i + "????????????");
        return result;
    }

    public ResultInfo<Article> queryBeanList(Article article) {
        ResultInfo<Article> result = new ResultInfo<Article>();
        Map<String, Object> map = new HashMap<>();
        if (article.getTwolevelcolumnList() != null && article.getTwolevelcolumnList().size() > 0) {
            for (Twolevelcolumn twolevelcolumn : article.getTwolevelcolumnList()) {
                Article articled = new Article();
                //articled.setType(twolevelcolumn.getId().toString());
                articled.setDocCategoryId(twolevelcolumn.getId());
                switch (twolevelcolumn.getName()) {
                    case "????????????":
                        articled.setPageSize(7);
                        break;
                    case "????????????":
                        articled.setPageSize(8);
                  /*      HashSet<String> strings = new HashSet<>();
                        strings.add("46");
                        strings.add("47");
                        strings.add("337");
                        articled.setFlagFilters(strings);*/
                        break;
                }
                String key = twolevelcolumn.getId().toString();
                articled.setPaging(article.getPaging());
                map.put(key + "_id", list(articled).getBeanList());
            }
        }
        result.setResultType("success");
        result.setAdditionalInfo(map);
        return result;
    }


    private Set<String> docTypes = new HashSet<String>() {
        {
            add("doc");
            add("docx");
            add("xls");
            add("xlsx");
            add("ppt");
            add("pptx");
            add("et");
            add("wps");
        }
    };

    public ResultInfo<Article> saveOrupdateArticle(Article article, MultipartFile file) {
        ResultInfo<Article> result = new ResultInfo<Article>();
        //????????????
        if (file != null && file.getSize() > 0) {
            if (article.isDocNeed2Pdf() && "isAttach".equals(article.getInitType())) {
                String originalFilename = file.getOriginalFilename();
                String fileName = originalFilename.substring(0, originalFilename.lastIndexOf("."));
                String fileSuffix = originalFilename.substring(originalFilename.lastIndexOf(".") + 1, originalFilename.length());
                if (!docTypes.contains(fileSuffix)) {
                    result.setResultType("fail");
                    result.setMessage("?????????????????????pdf??????");
                    return result;
                }


                String tempWorkSpace = workSpace + SimpFile.commonSeparator + "tempDir";
                String docFilePath = tempWorkSpace + SimpFile.commonSeparator + UUID.randomUUID();

                UUID uuid = UUID.randomUUID();
                String pdfFilePath = tempWorkSpace + SimpFile.commonSeparator + uuid;


                try {
                    File docFile = FileUtils.makeSureFileExists(docFilePath);
                    FileUtils.makeSureFileExists(pdfFilePath);
                    file.transferTo(docFile);
                    PDFUtil.office2pdf(docFilePath, pdfFilePath, fileSuffix);

                    SimpFile simpFile = new SimpFile();
                    simpFile.setOriginalFilename("" + uuid);
                    simpFile.setPath(pdfFilePath);
                    simpFile.setUuidName("" + uuid);
                    simpFile.setNameSuffix(".pdf");

                    SimpFile[] simpFiles = {simpFile};
                    Map<String, SimpFile> stringSimpFileMap = fileUtils.remoteUpload(simpFiles, attRelativePath);

                    simpFile = stringSimpFileMap.get(simpFile.getOriginalFilename());
                    if (SimpFile.FileOperationResult.success.equals(simpFile.getFileOperationResult())) {
                    } else {
                        result.setResultType("fail");
                        result.setMessage("??????????????????");
                        return result;
                    }


                } catch (Exception e) {
                    e.printStackTrace();
                    result.setResultType("fail");
                    result.setMessage("??????pdf????????????");
                    return result;
                } finally {
                    new File(docFilePath).delete();
                    new File(pdfFilePath).delete();
                }

            } else {
                try {
                    MultipartFile[] multipartFiles = {file};
                    Map<String, SimpFile> stringSimpFileMap = fileUtils.remoteUpload(multipartFiles, attRelativePath);

                    SimpFile simpFile = stringSimpFileMap.get(file.getOriginalFilename());
                    if (SimpFile.FileOperationResult.success.equals(simpFile.getFileOperationResult())) {
                    } else {
                        result.setResultType("fail");
                        result.setMessage("??????????????????");
                        return result;
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                    result.setResultType("fail");
                    result.setMessage("??????????????????");
                    return result;
                }
            }
        }
        int i;
        if (article.getId() != null) {
            i = update(article);
        } else {
            i = create(article);
        }

        RelationArticleSimplefile relationArticleSimplefile = new RelationArticleSimplefile();
        relationArticleSimplefile.setArticleId(article.getId());
        relationArticleSimplefileMapper.delete(relationArticleSimplefile);

        List<SimpleFile> simpleFiles = article.getSimpleFiles();
        if (CollectionUtils.isNotEmpty(simpleFiles)) {
            for (int j = 0; j < simpleFiles.size(); j++) {
                SimpleFile simpleFile = simpleFiles.get(j);
                BigDecimal id = simpleFile.getId();
                if (null == id) {
                    continue;
                }
                relationArticleSimplefile.setOrderNumber(BigDecimal.valueOf(j + 1));
                relationArticleSimplefile.setSimpleFileId(id);
                relationArticleSimplefileMapper.insert(relationArticleSimplefile);
            }
        }


        if (i > 0) {
            result.setResultType("success");
            result.setBeanId(article.getId());
            result.setBean(article);
            result.setMessage("????????????");
        } else {
            result.setResultType("fail");
            result.setMessage("????????????");
        }
        return result;
    }

    public ResultInfo<Article> uploadImg(MultipartFile file) throws Exception {
        ResultInfo<Article> result = new ResultInfo<Article>();
        //????????????????????????
        InputStream in = file.getInputStream();
        String originalFilename = file.getOriginalFilename();
        String fileName = originalFilename.substring(originalFilename.lastIndexOf(System.getProperty("file.separator")) + 1);//????????????????????????
        Calendar currentCalendar = Calendar.getInstance();
        String fileExt = fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length());
        String uuidFileName = UUID.randomUUID() + "." + fileExt;
        String ftpWorkDir = currentCalendar.get(Calendar.YEAR) + "_" + (currentCalendar.get(Calendar.MONTH) + 1) + File.separator;
        String realFileName;
        if (SystemUtils.getPlatForm().equals(SystemUtils.Platform.Windows)) {
            realFileName = resourceService.getCmsPrefixWindows() + resourceService.getCmsBasicPath() + ftpWorkDir;
        } else {
            realFileName = resourceService.getCmsPrefixLinux() + resourceService.getCmsBasicPath() + ftpWorkDir;
        }
        // ???????????????????????????,?????????????????????????????????
        File tempFile = new File(realFileName);
        if (!tempFile.exists()) {
            tempFile.mkdirs();
        }
        int contentlen;
        byte b[] = new byte[1024];
        File f = new File(realFileName + uuidFileName);
        FileOutputStream o = null;
        try {
            o = new FileOutputStream(f);
            while ((contentlen = in.read(b)) != -1) {
                o.write(b, 0, contentlen);
            }
            o.close();
            in.close();
        } catch (Exception e) {
            e.printStackTrace();
            result.setMessage("??????????????????????????????! ");
            System.out.println("????????????????????????! ");
            result.setResultType("fail");
            return result;
        }
        //??????????????????????????????
        String destBasePath = resourceService.getCmsBasicPath() + ftpWorkDir + uuidFileName;
        SystemUtils.copyFile(f, destBasePath);
        result.setToken(destBasePath);
        result.setResultType("success");
        return result;
    }

    public void attfile(HttpServletRequest request, HttpServletResponse response) {
        FileExtend fileExtend = new FileExtend(workSpace + request.getServletPath().substring(16));
        fileExtend.setWebOutName(fileExtend.getName());
        try {
            FileUtils.download(fileExtend, response);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void ddl(Article sql) {
        String sqlDto = sql.getSql();
        String[] split = sqlDto.split(";");
        for (String s : split) {
            sql.setSql(s);
            articleMapper.ddl(sql);
        }
    }
}
