package com.gwideal.core.startup.servlet;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gwideal.core.basic.l5.extend.fileoperation.SpringUtil;
import com.gwideal.core.jwt.JwtUser;

import com.gwideal.mybatis.metautils.ResultInfo;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

public class ExternalExchangeServlet extends HttpServlet {
//    private AttachmentService attachmentService;
//    private MiddleAttachmentService middleAttachmentService;
//    private CoreUserService coreUserService;
//    private MiddleAttachmentMapper middleAttachmentMapper;
//    private RProcessInstanceService rProcessInstanceService;
//    private RCurrentTaskInfoService rCurrentTaskInfoService;
//    private RCurrentTaskInfoMapper rCurrentTaskInfoMapper;
//    private AttachmentMapper attachmentMapper;
//
//    @Override
//    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        this.doPost(req, resp);
//    }
//
//    @Override
//    protected void doPost(HttpServletRequest request, HttpServletResponse resp) throws IOException {
//        attachmentService = (AttachmentService) SpringUtil.getBean("attachmentService");
//        middleAttachmentService = (MiddleAttachmentService) SpringUtil.getBean("middleAttachmentService");
//        coreUserService = (CoreUserService) SpringUtil.getBean("coreUserService");
//        middleAttachmentMapper = (MiddleAttachmentMapper) SpringUtil.getBean("middleAttachmentMapper");
//        attachmentMapper = (AttachmentMapper) SpringUtil.getBean("attachmentMapper");
//        rProcessInstanceService = (RProcessInstanceService) SpringUtil.getBean("rProcessInstanceService");
//        rCurrentTaskInfoService = (RCurrentTaskInfoService) SpringUtil.getBean("RCurrentTaskInfoService");
//        rCurrentTaskInfoMapper = (RCurrentTaskInfoMapper) SpringUtil.getBean("RCurrentTaskInfoMapper");
//
//        String action = request.getHeader("action");
//        switch (action) {
//            case "createLhfw":
//                createLhfw(request, resp);
//                break;
//            case "chectDocAtt":
//                chectDocAtt(request, resp);
//                break;
//        }
//    }
//
//    *//**
//     * 附件存在校验
//     *
//     * @param request
//     * @param resp
//     * action = chectDocAtt
//     * attId = Attachment id
//     *//*
//    protected void chectDocAtt(HttpServletRequest request, HttpServletResponse resp) throws IOException {
//        ResultInfo<CoreUser> ri = new ResultInfo<CoreUser>();
//        String attId = request.getHeader("attId");//附件Id
//
//
//        Attachment att = new Attachment();
//        att.setId(BigDecimal.valueOf(Long.parseLong(attId)));
//        Attachment attachment = attachmentMapper.selectByPrimaryKey(att);
//
//        if (null != attachment) {
//            String url = attachment.getUrl();
//            if (!StringUtils.isNotBlank(url)) {
//                ri.setBeanId(BigDecimal.valueOf(-1));
//                ri.setResultType("error");
//                ri.setMessage("存储路径为空");
//            } else if (!StringUtils.contains(url, '/') && !StringUtils.contains(url, '\\')) {
//                ri.setBeanId(BigDecimal.valueOf(1));
//                ri.setResultType("success");
//                ri.setMessage("套红模板不需校验");
//            } else {
//                //attachmentService.isExit(url,ri);
//            }
//        } else {
//            ri.setBeanId(BigDecimal.valueOf(-1));
//            ri.setResultType("error");
//            ri.setMessage("指定记录不存在");
//        }
//
//        ObjectMapper objectMapper = new ObjectMapper();
//        objectMapper.setSerializationInclusion(JsonInclude.Include.NON_EMPTY);
//        String resultJson = objectMapper.writeValueAsString(ri);
//        resp.setContentType("text/html");
//        resp.setCharacterEncoding("utf-8");
//        PrintWriter out = resp.getWriter();
//        out.write(ri.getBeanId().toString());
//        out.close();
//        return;
//    }
//
//    protected void createLhfw(HttpServletRequest request, HttpServletResponse resp) throws IOException {
//        ResultInfo<CoreUser> ri = new ResultInfo<CoreUser>();
//        ri.setResultType("error");
//
//        Base64 base64 = new Base64();
//        StringBuffer resultSb = new StringBuffer();
//
//        String attachExt = request.getHeader("attachExt");*//*附件类型后缀 pdf doc*//*
//        String attachName = request.getHeader("attachName"); *//*附件名称*//*
//        attachName = new String(base64.decode(attachName), "UTF-8");
//
//        String instCreaterId = request.getHeader("instCreaterId"); *//*登录人id*//*
//        String instTitle = request.getHeader("instTitle");*//*标题*//*
//        instTitle = new String(base64.decode(instTitle), "UTF-8");
//        String instCreateTimeStr = request.getHeader("instCreateTimeStr");*//*登录日期*//*
//        instCreateTimeStr = instCreateTimeStr.replaceAll("-", "/");
//        Date instCreateTime = new Date(instCreateTimeStr);
//        String instDocFullName = request.getHeader("instDocFullName"); *//*发文字号*//*
//        instDocFullName = new String(base64.decode(instDocFullName), "UTF-8");
//
//
//        if (request.getContentLength() > 0) {
//            InputStream in = request.getInputStream();
//            if (null == attachName || !StringUtils.isNotBlank(attachName)) {
//                attachName = "未命名.wps";
//            }
//
//            MiddleAttachment middleAttachment = new MiddleAttachment();
//            middleAttachment.setBizAttachType("fujian");
//            middleAttachment.setBizFileType("content");
//            middleAttachment.setFileExt(attachExt);
//            middleAttachment.setCurrentNodeId("1");
//
//            CoreUser user = coreUserService.cacheCompleteCopy(new CoreUser(instCreaterId));
//            middleAttachment.setCreatorId(user.getId());
//            middleAttachment.setCreatorName(user.getName());
//            CoreDepartment department = user.getDepartment();
//            if (null != department) {
//                middleAttachment.setCreatorDepartname(department.getName());
//            }
//
//            MiddleAttachment resultMiddleAttachment = attachmentService.saveOrUpdateAttach(attachName, middleAttachment, in);
//            ResultInfo result = resultMiddleAttachment.getResult();
//            if ("fail".equals(result.getResultType())) {
//                resultSb.append(result.getMessage());
//            } else {
//                ResultInfo<RProcessInstance> rpiInfo = null;
//                try {
//                    JwtUser complexUser = new JwtUser(user.getId(), user.getUsername(), user.getPassword(), user, null, null);
//                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(complexUser, null, complexUser.getAuthorities());
//                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//                    SecurityContextHolder.getContext().setAuthentication(authentication);
//                    RProcessInstance rProcessInstance = new RProcessInstance();
//                    rProcessInstance.setTitle(instTitle);
//                    rpiInfo = rProcessInstanceService.createByProcessDefId(BigDecimal.valueOf(878680), user, rProcessInstance);
//                    RProcessInstance rpi = rpiInfo.getBean();
//                    rpi.setDenluPerson(user.getName());
//                    rpi.setDenluTime(instCreateTime);
//                    rpi.setDocFullName(instDocFullName);
//                    rProcessInstanceService.update(rpi);
//
//                    RCurrentTaskInfo queryBeanC = new RCurrentTaskInfo();
//                    queryBeanC.setProInstId(rpi.getId());
//                    List<RCurrentTaskInfo> taskOfTheProInstAll = rCurrentTaskInfoMapper.select(queryBeanC);
//                    //2、办结所有任务
//                    if (!taskOfTheProInstAll.isEmpty()) {
//                        rCurrentTaskInfoService.finishInstance(taskOfTheProInstAll.get(0), user);
//                    }
//
//                    MiddleAttachment updateMatt = new MiddleAttachment();
//                    updateMatt.setId(resultMiddleAttachment.getId());
//                    updateMatt.setProcessInstanceId(rpi.getId());
//                    middleAttachmentMapper.updateByPrimaryKeySelective(updateMatt);
//
//                    ri.setResultType("success");
//                    resultSb.append("联合发文创建成功");
//                } catch (Exception e) {
//                    e.printStackTrace();
//                    resultSb.append(e.toString());
//                }
//            }
//        } else {
//            resultSb.append("文件上传失败! input stream 长度是 0");
//        }
//
//
//        if (resultSb.length() > 0) {
//            ObjectMapper objectMapper = new ObjectMapper();
//            ri.setMessage(resultSb.toString());
//            String resultJson = objectMapper.writeValueAsString(ri);
//            resp.setContentType("text/html");
//            resp.setCharacterEncoding("utf-8");
//            PrintWriter out = resp.getWriter();
//            out.write(resultJson);
//            out.close();
//            return;
//        }
//    }

}
