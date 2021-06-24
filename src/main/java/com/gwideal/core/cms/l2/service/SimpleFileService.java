package com.gwideal.core.cms.l2.service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.TypeReference;
import com.gwideal.core.jwt.JwtUser;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import com.gwideal.core.cms.l4.entity.*;
import com.gwideal.core.cms.l3.dao.*;
import com.gwideal.mybatis.metautils.*;
import com.gwideal.mybatis.metautils.ResultInfo;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.github.pagehelper.PageInfo;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;
import per.eter.utils.datetime.DateTimeUtils;
import per.eter.utils.file.FileUtils;
import per.eter.utils.file.SimpFile;
import per.eter.web.fileop.FileOpController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.math.BigDecimal;

@Service
@Transactional
public class SimpleFileService {

    @Autowired
    private SimpleFileMapper simpleFileMapper;

    @Autowired
    private FileUtils fileUtils;

    public static String simpleFileRelativePath = "/simpleFile";

    public int create(SimpleFile simpleFile) {
        return simpleFileMapper.insert(simpleFile);
    }

    public SimpleFile read(BigDecimal id) {
        return simpleFileMapper.selectByPrimaryKey(id);
    }

    public int update(SimpleFile simpleFile) {
        return simpleFileMapper.updateByPrimaryKey(simpleFile);
    }

    public int delete(BigDecimal id) {
        return simpleFileMapper.deleteByPrimaryKey(id);
    }


    public ResultInfo<SimpleFile> list(SimpleFile queryBean) {
        ResultInfo<SimpleFile> result = new ResultInfo<SimpleFile>();
        if (queryBean.getPaging().equals("Yes")) {
            PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
            List<SimpleFile> plist = simpleFileMapper.list(queryBean);
            PageInfo<SimpleFile> pageInfo = new PageInfo<SimpleFile>(plist);
            result.setTotalRows(pageInfo.getTotal());
            result.setBeanList(pageInfo.getList());
            result.setResultType("success");
            return result;
        } else {
            List<SimpleFile> plist = simpleFileMapper.list(queryBean);
            result.setTotalRows((long) plist.size());
            result.setBeanList(plist);
            result.setResultType("success");
            return result;
        }
    }

    public ResultInfo<SimpleFile> upload(MultipartFile clientFile, String simpleFileStr) {
        ResultInfo<SimpleFile> result = new ResultInfo<SimpleFile>();


        MultipartFile[] multipartFiles = {clientFile};
        try {
            Map<String, SimpFile> stringSimpFileMap = fileUtils.remoteUpload(multipartFiles, simpleFileRelativePath);

            SimpleFile simpleFile = JSON.parseObject(simpleFileStr, new TypeReference<SimpleFile>() {
            });
            String originalFilename = clientFile.getOriginalFilename();
            SimpFile simpFileStoreInfo = stringSimpFileMap.get(originalFilename);
            if (SimpFile.FileOperationResult.success.equals(simpFileStoreInfo.getFileOperationResult())) {
                simpleFile.setUuidName(simpFileStoreInfo.getRelativePath());
                simpleFile.setOriginalName(originalFilename);
                simpleFile.setShowName(originalFilename);
                if (null == simpleFile.getId()) {
                    ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
                    HttpServletRequest request = servletRequestAttributes.getRequest();
                    HttpSession session = request.getSession(true);
                    Administrator coreUser = (Administrator) session.getAttribute("authUser");
                    if(coreUser == null){
                        simpleFile.setCreateTime(DateTimeUtils.ldt2Date(LocalDateTime.now()));
                        simpleFileMapper.insert(simpleFile);
                    }else{
                        Administrator cu = ((JwtUser) (((UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication()).getPrincipal())).getCoreUser();
                        simpleFile.setCreaterId(cu.getId());
                        simpleFile.setCreaterName(cu.getDisplay());
                        simpleFile.setCreateTime(DateTimeUtils.ldt2Date(LocalDateTime.now()));
                        simpleFileMapper.insert(simpleFile);
                    }

                } else {
                    simpleFileMapper.updateByPrimaryKeySelective(simpleFile);
                }

                result.setResultType("success");
                result.setBean(simpleFile);
                return result;
            } else {
                result.setResultType("fail");
                result.setMessage("附件上传失败");
                return result;
            }
        } catch (Exception e) {
            result.setResultType("fail");
            result.setMessage("附件上传失败");
            return result;
        }
    }
}
