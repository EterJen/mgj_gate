package com.gwideal.core.startup.servlet;

import org.apache.commons.lang3.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.support.StandardServletMultipartResolver;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.util.Map;


public class UploadServlet extends HttpServlet {


    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        // TODO Auto-generated method stub
        this.doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse resp) throws IOException {
        /*AttachmentService attachmentService = (AttachmentService) SpringUtil.getBean("attachmentService");

        MiddleAttachmentService middleAttachmentService = (MiddleAttachmentService) SpringUtil.getBean("middleAttachmentService");
        CoreUserService coreUserService = (CoreUserService) SpringUtil.getBean("coreUserService");
        MiddleAttachmentMapper middleAttachmentMapper = (MiddleAttachmentMapper) SpringUtil.getBean("middleAttachmentMapper");*/
        String processInstanceId = request.getParameter("processInstanceId");
        String bizAttachType = request.getParameter("bizAttachType");
        String bizFileType = request.getParameter("bizFileType");
        String fileExt = request.getParameter("fileExt");
        String isWindows = request.getParameter("isWindows");
        String id = request.getParameter("id");
        String userId = request.getParameter("userId");
        String printCtlInfo = request.getParameter("printCtlInfo");
        String currentNodeId = request.getParameter("currentNodeId");
        String actionType = request.getParameter("actionType");

        System.out.println("isWindows=="+isWindows);
        /*CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver(request.getSession()
                .getServletContext());
        if (multipartResolver.isMultipart(request)) {
            MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request;
            Iterator<String> iter = multiRequest.getFileNames();
        }*/

        MultipartResolver resolver = new StandardServletMultipartResolver();
        MultipartHttpServletRequest mRequest = resolver.resolveMultipart(request);
        Map<String, MultipartFile> fileMap = mRequest.getFileMap();


        if (request.getContentLength() > 0) {
            InputStream in = request.getInputStream();
            //固定128字节


            String name = "未命名.wps";

            String localfileName = request.getHeader("filename");

            if (StringUtils.isNotBlank(localfileName)) {
                name = new String(localfileName.getBytes("iso-8859-1"), "UTF-8");
            }



            System.out.println("name=="+name);




        } else {
            System.out.println("文件上传失败! input stream 长度是 0");
        }
    }

}
