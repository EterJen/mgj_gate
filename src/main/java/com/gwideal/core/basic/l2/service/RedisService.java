package com.gwideal.core.basic.l2.service;


import com.gwideal.core.basic.ehcache.EhcacheUtil;
import com.gwideal.core.basic.l3.dao.DicModeMapper;
import com.gwideal.core.basic.l4.entity.DicMode;
import com.gwideal.core.basic.l4.entity.DicType;
import com.gwideal.core.cms.l2.service.AdministratorService;
import com.gwideal.core.cms.l4.entity.Administrator;
import com.gwideal.core.visual.VisualController;
import com.gwideal.mybatis.metautils.ResultInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@Service
@ConfigurationProperties(prefix = "sysInitVal.forRedisService")
public class RedisService {

    @Resource
    private RedisTemplate<String, Object> redisTemplate;

    @Value("${workflow.processDefDir}")
    String dirStr;

    @Value("${workflow.linuxProcessDefDir}")
    String linuxDirStr;

    /*@Value("${ftp_address}")
    String ftpAddress;

    @Value("${ftp_port}")
    int ftpPort;

    @Value("${ftp_username}")
    String ftpUsername;

    @Value("${ftp_password}")
    String ftpPassword;

    @Value("${ftp_basepath}")
    String ftpBasepath;*/

    @Autowired
    EhcacheUtil redisMapper;


    @Autowired
    private RedisServiceHandle redisServiceHandle;

    @Autowired
    private DicModeMapper dicModeMapper;
    @Autowired
    private AdministratorService administratorService;


    @Autowired
    VisualController visualController;
    public void test() {
        /*CoreUser user = coreUserService.cacheCompleteCopy(new CoreUser(new BigDecimal(8)));
        redisMapper.set("user", "user", user);
        Object useer1 = redisMapper.get("user","users:user192");
        long user1 = redisMapper.getExpire("user","user");
        if (useer1 instanceof CoreUser) {
            CoreUser useer11 = (CoreUser) useer1;
            useer11.setName("???");
        }*/
    }

    //<editor-fold desc="??????????????????">
    /*??????????????????????????????,????????????????????? ????????????  ????????? ????????????*/
    @Cacheable(value = "user", key = "'complete:'+ #coreUser.getId()")
    public Administrator selUser(Administrator coreUser) {
        return administratorService.wrapUser(coreUser);
    }

    @CacheEvict(value = "user", key = "'complete:'+ #coreUser.getId()")
    public void delUser(Administrator coreUser) {
        System.out.println("??? [user:complete] ???????????? [" + coreUser.getId() + "] ?????????");
    }


    /*???????????????????????? ???????????????????????????????????????*/
    @Cacheable(value = "user", key = "'ng:'+ #coreUser.getId()")
    public Administrator selUserNg(Administrator coreUser) {
        return administratorService.ngWrapUser(coreUser);
    }

    @CacheEvict(value = "user", key = "'ng:'+ #coreUser.getId()")
    public void delUserNg(Administrator coreUser) {
        System.out.println("??? [user:ng] ???????????? [" + coreUser.getId() + "] ?????????");
    }


    @CacheEvict(value = "user", allEntries = true)
    public void cleanUser() {
        System.out.println("?????? [user] ?????? ");
    }
    //</editor-fold>

    //<editor-fold desc="??????????????????">
    @Cacheable(value = "dicMode", key = "'complete:'+ #dicMode.getDictype()")
    public DicMode selDicMode(DicMode dicMode) {
        DicMode result = dicModeMapper.findDicMod(dicMode);
        Map<String, DicType> dicTypeMap = result.getDicTypes().stream().collect(Collectors.toMap(DicType::getEname, a -> a, (k1, k2) -> k1));
        result.setDicTypeMap(dicTypeMap);
        return result;
    }

    /*????????????????????????????????????*/
    @Cacheable(value = "dicMode", key = "'completeList:ForHandleTask'")
    public List<DicMode> selDicModesForHandleTask() {
        return redisServiceHandle.selDicModesForHandleTask();
    }

    /*?????????????????????*/
    @Cacheable(value = "dicMode", key = "'completeList:ForBusiness'")
    public List<DicMode> selDicModesForBusiness() {
        return redisServiceHandle.selDicModesForBusiness();
    }

    @CacheEvict(value = "dicMode", allEntries = true)
    public void cleanDicMode() {
        System.out.println("?????? [dicMode] ?????? ");
    }
    //</editor-fold>

    //<editor-fold desc="??????????????????">
    /*?????????????????????????????????*/
    /*@Cacheable(value = "dept", key = "'completeList:ordered'")
    public List<CoreDepartment> selDeptListOrdered() {
        CoreDepartment coreDepartment = new CoreDepartment();
        coreDepartment.setFlag(new BigDecimal(1));
        List<CoreDepartment> departments = coreDepartmentMapper.listDynamic(coreDepartment);
        DecimalFormat decimalFormat = new DecimalFormat("0000");
        for (CoreDepartment department : departments) {
            BigDecimal orderNum = department.getOrderNum();
            String s = "9999";
            if (null != orderNum) {
                s = orderNum.toString();
            }
            department.setOrderBy(decimalFormat.format(Integer.parseInt(s)));
            if (null == department.getOrderBy()) {
                department.setOrderBy("9999");
            }
        }
        departments.sort((ord1, ord2) -> ord1.getOrderBy().compareTo(ord2.getOrderBy()));
        return departments;
    }*/

    /*@Cacheable(value = "dept", key = "'completeMap:ordered'")
    public Map<String, CoreDepartment> selDeptMapOrdered() {
        Map<String, CoreDepartment> result = new LinkedHashMap<>();
        SystemUtils.list2Map(redisServiceHandle.selDeptListOrdered(), "getId", CoreDepartment.class)
                .forEach((key, value) -> result.put(String.valueOf(key), value));
        return result;
    }*/

   /* @CacheEvict(value = "dept", allEntries = true)
    public void cleanDept() {
        System.out.println("?????? [dept] ?????? ");
    }*/
    //</editor-fold>

    //<editor-fold desc="??????????????????">
    private final String PROCESS_TEMPLATE_MAP_KEYPREFIX = "processTemplate:Map:proDefGroupId:";

    /*??????????????????  ??????????????? ?????????????????????*/
    /*@Cacheable(value = "processDef", key = "'formDefId:'+ #processDefVersion.getProcessDefManage().getFormDefId()")
    public ProcessDefVersion selProcessDef(ProcessDefVersion processDefVersion) {
        Object cachePushReady = processDefVersion.getDbParams().get("cachePushReady");
        if (null != cachePushReady) {
            return processDefVersion;
        }
        ProcessDefManage processDefManage = processDefVersion.getProcessDefManage();
        ProcessDefVersion queryBean = new ProcessDefVersion();
        queryBean.getDbParams().put("defManageFlag", "1");
        queryBean.setIsActive("1");
        queryBean.getDbParams().put("proDefGroupId", processDefManage.getProDefGroupId());
        queryBean.getDbParams().put("formDefId", processDefManage.getFormDefId());
        List<ProcessDefVersion> plist = processDefVersionMapper.list(queryBean);
        if (null != plist && !plist.isEmpty()) {
            processDefVersion = plist.get(0);
        } else {
            System.err.println("???????????????????????????");
            return null;
        }
        return processDefVersion;
    }*/

    /*?????????????????????????????????defmanage*/
    /*@Cacheable(value = "processDefManage", key = "'processDefManageAll:id'")
    public List<ProcessDefManage> selProcessDefManage() {

        ProcessDefManage queryBean = new ProcessDefManage();
        queryBean.setFlag("1");
        List<ProcessDefManage> plist = processDefManageMapper.list(queryBean);
        return plist;
    }*/

    /*@CacheEvict(value = "processDef", key = "'formDefId:'+ #processDefVersion.getProcessDefManage().getFormDefId()")
    public void delProcessDef(ProcessDefVersion processDefVersion) {
        System.out.println("??? [processDef:formDefId???] ???????????? [" + processDefVersion.getProcessDefManage().getFormDefId() + "] ?????????");
    }*/

    /*@CacheEvict(value = "processDef", allEntries = true)
    public void cleanProcessDef() {
        System.out.println("?????? [processDef] ?????? ");
    }*/

    /*?????????????????? ???????????? ??????id ??????*/
    /*@Cacheable(value = "processTemplate", key = "'id:'+ #processDefVersion.getId()")
    public DProcess selProcessTemplate(ProcessDefVersion processDefVersion) {
        if (null == processDefVersion.getId()) {
            System.err.println("????????????id?????????????????????????????????");
            return null;
        }

        ProcessDefManage processDefManage = processDefVersion.getProcessDefManage();
        if (null == processDefManage) {
            ProcessDefVersion queryBean = new ProcessDefVersion();
            queryBean.setId(processDefVersion.getId());
            queryBean.getDbParams().put("defManageFlag", "1");
            List<ProcessDefVersion> plist = processDefVersionMapper.list(queryBean);
            if (null != plist && !plist.isEmpty()) {
                processDefVersion = plist.get(0);
                processDefManage = processDefVersion.getProcessDefManage();
            } else {
                System.err.println("???????????????????????????");
                return null;
            }
        }

        *//*????????????????????????????????????*//*
        processDefVersion.getDbParams().put("cachePushReady", "ok");
        redisServiceHandle.selProcessDef(processDefVersion);
//        ((RedisService) AopContext.currentProxy()).selProcessDef(processDefVersion);

        System.out.println("???????????????????????????");
        System.out.println(processDefVersion.getId());
        System.out.println(processDefVersion.getNameAndVersion());
        System.out.println(processDefVersion.getFilePath());
        DProcess process = null;
        try {
            String formDefId = processDefManage.getFormDefId();
            //String s = FtpUtil.ftpFile2resXmlStr(ftpAddress, ftpPort, ftpUsername, ftpPassword, ftpBasepath + linuxDirStr, processDefVersion.getFilePath());
            String realFileName="";
            if (SystemUtils.getPlatForm().equals(SystemUtils.Platform.Windows)) {
                realFileName=dirStr;
            }else {
                realFileName=linuxDirStr;
            }
            InputStream in=new FileInputStream(realFileName+processDefVersion.getFilePath());
            String s = visualController.readStream(in);
            process = rProcessInstanceService.initProcessDefByXml(s);
            process.getProcessBeans().add("fawenService");
            if ("npcHandling".equals(formDefId)) {
                process.getProcessBeans().add("formDpComposedDealService");
            }
            if (StringUtils.isNotBlank(formDefId)) {
                process.getProcessBeans().add("form" + formDefId.substring(0, 1).toUpperCase() + formDefId.substring(1) + "Service");
            }

            redisMapper.hset("processTemplate",PROCESS_TEMPLATE_MAP_KEYPREFIX + processDefManage.getProDefGroupId(), formDefId, process);
        } catch (IOException e) {
            process = null;
            e.printStackTrace();
            System.err.println("????????????????????????,???????????????");
        }

        return process;
    }*/

    /*????????????????????????????????????????????? ?????????????????????????????? ??????????????????*/
    /*@CacheEvict(value = "processTemplate", key = "'id:'+ #processDefVersion.getId()")
    public void delProcessTemplate(ProcessDefVersion processDefVersion) {
        if (null == processDefVersion.getId()) {
            System.err.println("????????????id???????????????????????????????????????");
            return;
        }

        ProcessDefManage processDefManage = processDefVersion.getProcessDefManage();
        if (null == processDefManage) {
            ProcessDefVersion queryBean = new ProcessDefVersion();
            queryBean.setId(processDefVersion.getId());
            queryBean.getDbParams().put("defManageFlag", "1");
            queryBean.setPaging("no");
            List<ProcessDefVersion> plist = processDefVersionMapper.list(queryBean);
            if (null != plist && !plist.isEmpty()) {
                processDefVersion = plist.get(0);
                processDefManage = processDefVersion.getProcessDefManage();
            } else {
                System.err.println("???????????????????????????,??????????????????????????????");
                return;
            }
        }

//        ((RedisService) AopContext.currentProxy()).delProcessDef(processDefVersion); ??????????????????????????????
        redisServiceHandle.delProcessDef(processDefVersion);
        redisMapper.hdel("processTemplate",PROCESS_TEMPLATE_MAP_KEYPREFIX + processDefManage.getProDefGroupId(), processDefManage.getFormDefId());
        redisMapper.delKeysLike("processTemplate",PROCESS_NODE_IDS_KEYPREFIX + processDefManage.getProDefGroupId());
        System.out.println("??? [processTemplate:id] ???????????? [" + processDefVersion.getId() + "] ?????????");
    }*/

    private final String PROCESS_NODE_IDS_KEYPREFIX = "processNodeIds:groupId:";

    /*@Cacheable(value = "processNodeIds", key = "'groupId:'+ #groupId+ ':nodeName:'+#pNodeName")
    public Set<String> selProcessNodeIds(String groupId, String pNodeName) {
        if ("allshouwen".equals(groupId)) {
            return null;
        }
        Set<String> result = new HashSet<>();

        if (StringUtils.isNotEmpty(groupId) && StringUtils.isNotEmpty(pNodeName)) {
            Map<Object, Object> hmget = redisMapper.hmget("processTemplate",PROCESS_TEMPLATE_MAP_KEYPREFIX + groupId);
            if (null == hmget || hmget.isEmpty()) {
                System.err.println("?????????????????????????????????????????????????????????????????????");
                ProcessDefVersion queryBean = new ProcessDefVersion();
                queryBean.getDbParams().put("defManageFlag", "1");
                queryBean.setIsActive("1");
                queryBean.getDbParams().put("proDefGroupId", groupId);
                List<ProcessDefVersion> plist = processDefVersionMapper.list(queryBean);
                for (ProcessDefVersion processDefVersion : plist) {
                    redisServiceHandle.delProcessTemplate(processDefVersion);
                    redisServiceHandle.selProcessTemplate(processDefVersion);
                }
                hmget = redisMapper.hmget("processTemplate",PROCESS_TEMPLATE_MAP_KEYPREFIX + groupId);
                if (null == hmget || hmget.isEmpty()) {
                    System.err.println("?????????????????????????????????????????????????????????");
                    return null;
                }
            }
            for (Map.Entry<Object, Object> objectObjectEntry : hmget.entrySet()) {
                DProcess process = (DProcess) objectObjectEntry.getValue();
                List<DNode> nodes = process.getNodes();
                for (int i = 0; i < nodes.size(); i++) {
                    if (pNodeName.equals(nodes.get(i).getName())) {
                        result.add(nodes.get(i).getId());
                        break;
                    }
                    if ("swdl".equalsIgnoreCase(pNodeName)) {
                        if (i == 0) {
                            result.add(nodes.get(i).getId());
                            break;
                        }
                    }
                    if ("swcl".equalsIgnoreCase(pNodeName)) {
                        if (i != 0) {
                            result.add(nodes.get(i).getId());
                        }
                    }
                }

            }
        } else {
            System.out.println("processNodeIds:???????????????");
        }
        return result;
    }*/

    /*@CacheEvict(value = "processNodeIds", allEntries = true)
    public void cleanProcessNodeIds() {
        System.out.println("?????? [processNodeIds] ?????? ");
    }*/


    /*@CacheEvict(value = "processTemplate", allEntries = true)
    public void cleanProcessRef() {
        redisServiceHandle.cleanProcessDef();
        redisServiceHandle.cleanProcessNodeIds();
        redisMapper.delKeysLike("user",PROCESS_TEMPLATE_MAP_KEYPREFIX);
        System.out.println("?????? [processTemplate] ?????? ");
    }*/


    //</editor-fold>

    //<editor-fold desc="??????????????????">
    private ArrayList<String> selShouWenTypesXz;
    private ArrayList<String> selShouWenTypesDw;

    /*public void setSelShouWenTypesXz(ArrayList<String> selShouWenTypesXz) {
        this.selShouWenTypesXz = selShouWenTypesXz;
    }*/

    /*public void setSelShouWenTypesDw(ArrayList<String> selShouWenTypesDw) {
        this.selShouWenTypesDw = selShouWenTypesDw;
    }*/
    /*@Cacheable(value = "handleState", key = "'transactor:'+ #transactor")
    public String selHandleStateByTransactor(String transactor) {
        CoreUser coreUser = new CoreUser();
        coreUser.setName(transactor);
        List<CoreUser> list = coreUserMapper.list(coreUser);
        if (null != list && !list.isEmpty()) {
            CoreUser user = list.get(0);
            CoreUser cacheUser = selUser(user);
            CoreDepartment department = cacheUser.getDepartment();
            if (null != department) {
                transactor = department.getName();
            }
        }
        return transactor;
    }*/
    /*@Cacheable(value = "shouWenTypes", key = "'roleType:'+ #roleType")
    public List<ProcessDefManage> selShouWenTypes(String roleType) {
        List<ProcessDefManage> types = new ArrayList<>();
        ProcessDefVersion processDefVersion = new ProcessDefVersion();
        ProcessDefManage processDefManage = new ProcessDefManage();
        processDefVersion.setProcessDefManage(processDefManage);

        switch (roleType) {
            case "dw":
                for (String s : selShouWenTypesDw) {
                    processDefManage.setFormDefId(s);
                    ProcessDefVersion processDefVersion1 = redisServiceHandle.selProcessDef(processDefVersion);
                    types.add(processDefVersion1.getProcessDefManage());
                }
                break;
            case "xz":
                for (String s : selShouWenTypesXz) {
                    processDefManage.setFormDefId(s);
                    ProcessDefVersion processDefVersion1 = redisServiceHandle.selProcessDef(processDefVersion);
                    types.add(processDefVersion1.getProcessDefManage());
                }
                break;
            case "xz_dw":
                for (String s : selShouWenTypesXz) {
                    processDefManage.setFormDefId(s);
                    ProcessDefVersion processDefVersion1 = redisServiceHandle.selProcessDef(processDefVersion);
                    types.add(processDefVersion1.getProcessDefManage());
                }
                for (String s : selShouWenTypesDw) {
                    processDefManage.setFormDefId(s);
                    ProcessDefVersion processDefVersion1 = redisServiceHandle.selProcessDef(processDefVersion);
                    types.add(processDefVersion1.getProcessDefManage());
                }
                break;
            case "dw_xz":
                for (String s : selShouWenTypesDw) {
                    processDefManage.setFormDefId(s);
                    ProcessDefVersion processDefVersion1 = redisServiceHandle.selProcessDef(processDefVersion);
                    types.add(processDefVersion1.getProcessDefManage());
                }
                for (String s : selShouWenTypesXz) {
                    processDefManage.setFormDefId(s);
                    ProcessDefVersion processDefVersion1 = redisServiceHandle.selProcessDef(processDefVersion);
                    types.add(processDefVersion1.getProcessDefManage());
                }
                break;
        }

        if (!types.isEmpty()) {
            StringBuffer allDefIds = new StringBuffer();
            types.forEach(type -> {
                type.setIdDefIdGroupId(type.getId() + "-" + type.getFormDefId() + "-" + type.getProDefGroupId());
                allDefIds.append(type.getFormDefId() + "|");
            });
            ProcessDefManage allProcessDefManage = new ProcessDefManage();
            allProcessDefManage.setFormDefId(allDefIds.deleteCharAt(allDefIds.length() - 1).toString());
            allProcessDefManage.setIdDefIdGroupId("xxx-xxx-allshouwen");
            allProcessDefManage.setProDefGroupId("allshouwen");
            allProcessDefManage.setName("??????");
            types.add(allProcessDefManage);
        }
        return types;
    }*/

    /*@CacheEvict(value = "shouWenTypes", allEntries = true)
    public void cleanShouWenTypes() {
        System.out.println("?????? [shouWenTypes] ?????? ");
    }*/

    private List<Map<String, String>> shouwen_manage_listmap;

    public List<Map<String, String>> getShouwen_manage_listmap() {
        return shouwen_manage_listmap;
    }

    public void setShouwen_manage_listmap(List<Map<String, String>> shouwen_manage_listmap) {
        this.shouwen_manage_listmap = shouwen_manage_listmap;
    }



    private Map<String, Map<String, String>> shouwen_manage_map;

    public Map<String, Map<String, String>> getShouwen_manage_map() {
        return shouwen_manage_map;
    }

    public void setShouwen_manage_map(Map<String, Map<String, String>> shouwen_manage_map) {
        this.shouwen_manage_map = shouwen_manage_map;
    }

    @PostConstruct
    public void initMethod() {
        System.out.println(">>>>>>>>>RedisService initMethod<<<<<<<<<<<");
        this.shouwen_manage_map = new HashMap<>();
        for (Map<String, String> stringStringMap : shouwen_manage_listmap) {
            this.shouwen_manage_map.put(stringStringMap.get("name"), stringStringMap);
        }
    }

    /*@Cacheable(value = "shouWenManageExSql", key = "#queryBean.getFormDefId()")
    public List<Map<String, String>> selShouWenManageExSql(RProcessInstance queryBean) {
        List<Map<String, String>> mapList = new ArrayList<>();
        String[] formDefIds = queryBean.getFormDefIds();

        for (String formDefId : formDefIds) {
            mapList.add(this.shouwen_manage_map.get(formDefId));
        }
        return mapList;
    }*/

    /*@CacheEvict(value = "shouWenManageExSql", allEntries = true)
    public void cleanShouWenManageExSql() {
        System.out.println("?????? [shouWenManageExSql] ?????? ");
    }*/

    public ResultInfo<Administrator> cleanSysCache(String type) {
        ResultInfo<Administrator> ri = new ResultInfo<>();
        //Set<String> keys = redisTemplate.keys("*");
        String retainKeys = null;

        if (null == type) {
            type = "exceptLoginInfo";
        }
        switch (type) {
            case "exceptLoginInfo":
                //retainKeys = redisTemplate.keys(LOGIN_SET_KEYPREFIX + "*");
                //retainKeys.addAll(redisTemplate.keys(LOGIN_KEYPRIFIX + "*"));
                retainKeys="cleanAllCache";
                ri.setMessage("??????????????????????????????");
                break;
            case "all":
                ri.setMessage("??????????????????????????????,?????????????????????");
                break;
        }

        if ("cleanAllCache".equals(retainKeys)) {
            //keys.removeAll(retainKeys);
            redisMapper.cleanCache();
        }else {
            redisMapper.cleanNotByUserCache();
        }

        ri.setResultType("success");

        return ri;
    }


    //</editor-fold>

}

