package com.gwideal.core.startup.servlet;

import com.gwideal.core.basic.l2.service.ResourceService;
import com.gwideal.core.basic.l5.extend.fileoperation.SpringUtil;
import com.gwideal.core.common.SystemUtils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLEncoder;

public class DownloadServlet extends HttpServlet {


    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        // TODO Auto-generated method stub
        this.doPost(req, resp);
    }


    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {

            String path = request.getParameter("path");
            String formFileName = request.getParameter("fileName");

            ResourceService resourceService = (ResourceService) SpringUtil.getBean("resourceService");

                if (path != null) {//直接下载服务器文件
                    String encoding = SystemUtils.getEncoding(formFileName);
                    formFileName = new String(formFileName.getBytes(encoding), "UTF-8");
                    formFileName = URLEncoder.encode(formFileName, "UTF-8");
                    formFileName = formFileName.replaceAll("\\+", "%20");
                    String descPath="";
                    if (SystemUtils.getPlatForm().equals(SystemUtils.Platform.Windows)) {
                        descPath=resourceService.getCmsPrefixWindows()+resourceService.getCmsBasicDocumentPath();
                    }else {
                        descPath=resourceService.getCmsPrefixLinux()+resourceService.getCmsBasicDocumentPath();
                    }
                    //从数据库附件路径找到源文件
                    path = path.replaceAll("\\\\", "/");
                    String[] split = path.split("/");

                    if (split!=null && split.length>0) {
                        for (String s : split) {
                            descPath+=File.separator+s;
                        }
                    }
                    response.setHeader("content-disposition", "attachment;filename*=UTF-8''" + formFileName);
                    String ext = formFileName.substring(formFileName.lastIndexOf("."), formFileName.length());
                    if (ext.equals(".wps") || ext.equals(".wpt")) {
                        response.setContentType("application/force-download;charset=utf-8");
                    } else if (ext.equals(".ofd")) {
                        response.setContentType("application/force-download;charset=utf-8");
                    } else {
                        response.setContentType("text/html;charset=utf-8");
                    }
                    // 以流的形式下载文件。
                    InputStream fis = new BufferedInputStream(new FileInputStream(descPath));
                    byte[] buffer = new byte[fis.available()];
                    fis.read(buffer);
                    fis.close();


                    OutputStream os = response.getOutputStream();
                    os.write(buffer);
                    os.flush();
                    os.close();
                } /*else {
                    //要下载的文件
                    //客服端使用保存文件的对话框
                    String formFileName = att.getFilename();
                    String encoding = SystemUtils.getEncoding(att.getFilename());
                    formFileName = new String(formFileName.getBytes(encoding), "UTF-8");
                    formFileName = URLEncoder.encode(formFileName, "UTF-8");
                    formFileName = formFileName.replaceAll("\\+", "%20");
                    response.setHeader("content-disposition", "attachment;filename*=UTF-8''" + formFileName);
                    String ext = att.getFilename().substring(att.getFilename().lastIndexOf("."), att.getFilename().length());
                    if (ext.equals(".wps") || ext.equals(".wpt")) {
                        response.setContentType("application/force-download;charset=utf-8");
                    } else if (ext.equals(".ofd")) {
                        response.setContentType("application/force-download;charset=utf-8");
                    } else {
                        response.setContentType("text/html;charset=utf-8");
                    }
                    String realUrl="";
                    //得到想客服端输出的输出流
                    if ("pfdForm".equals(downloadType)) {
                        //FtpUtil.ftpFile2resOutStream(attachmentService.getFtpAddress(), attachmentService.getFtpPort(), attachmentService.getFtpUsername(), attachmentService.getFtpPassword(), attachmentService.getFtpBasepath() + "/attachments/temp/", att.getUrl(), response.getOutputStream());
                        //realUrl=attachmentService.getUrl()
                        if (SystemUtils.getPlatForm().equals(SystemUtils.Platform.Windows)) {
                            realUrl=attachmentService.getUrl()+"temp"+File.separator+att.getUrl();
                        }else {
                            realUrl=attachmentService.getLinuxUrl()+"temp"+File.separator+att.getUrl();
                        }
                    } else if ("taohongmoban".equals(bizAttachType)) {
                        //如果是套红模板就不用解析url
                        //FtpUtil.ftpFile2resOutStream(attachmentService.getFtpAddress(), attachmentService.getFtpPort(), attachmentService.getFtpUsername(), attachmentService.getFtpPassword(), attachmentService.getFtpBasepath() + attachmentService.getLinuxDirStr() + "redTemplate/", att.getUrl(), response.getOutputStream());
                        if (SystemUtils.getPlatForm().equals(SystemUtils.Platform.Windows)) {
                            realUrl=attachmentService.getWindowsProcessDefDir()+"redTemplate"+File.separator+att.getUrl();
                        }else {
                            realUrl=attachmentService.getLinuxDirStr()+"redTemplate"+File.separator+att.getUrl();
                        }

                    } else {
                        //如果是附件就要解析url,附件的url是以2018109/uuid.exe这种格式
                        String attachUrl = att.getUrl();
                        attachUrl = attachUrl.replaceAll("\\\\", "/");
                        String[] split = attachUrl.split("/");
                        if (split != null && split.length == 2) {
                            FtpUtil.ftpFile2resOutStream(attachmentService.getFtpAddress(), attachmentService.getFtpPort(), attachmentService.getFtpUsername(), attachmentService.getFtpPassword(), attachmentService.getFtpBasepath() + attachmentService.getFtpAttachments() + split[0], split[1], response.getOutputStream());
                        }
	                    String remotePath = attachUrl.substring(0, attachUrl.lastIndexOf("/"));
	                    String fileName = attachUrl.substring(attachUrl.lastIndexOf("/") + 1);
	                    //FtpUtil.ftpFile2resOutStream(attachmentService.getFtpAddress(), attachmentService.getFtpPort(), attachmentService.getFtpUsername(), attachmentService.getFtpPassword(), attachmentService.getFtpBasepath() + attachmentService.getFtpAttachments() + remotePath, fileName, response.getOutputStream());
                        if (SystemUtils.getPlatForm().equals(SystemUtils.Platform.Windows)) {
                            realUrl=attachmentService.getUrl()+remotePath+File.separator+fileName;
                        }else {
                            realUrl=attachmentService.getLinuxUrl()+remotePath+File.separator+fileName;
                        }
                    }
                    System.out.println(realUrl);
                    InputStream inputStream = new FileInputStream(realUrl);
                    int available = inputStream.available();
                    System.out.println(available);

                    BufferedInputStream inBuffer = new BufferedInputStream(inputStream);
                    BufferedOutputStream outBuffer = new BufferedOutputStream(response.getOutputStream());
                    byte[] buf = new byte[1024]; //自定义的字节缓冲区
                    while ((available = inBuffer.read(buf)) != -1) { //返回的是数组中的个数，如读完或读满，则返回-1
                        outBuffer.write(buf, 0, available);
                    }

                    outBuffer.flush();
                    outBuffer.close();
                    inBuffer.close();
                }*/


        } catch (IOException e) {
            System.out.println("文件下载失败! 发生了异常");
            e.printStackTrace();
        }
    }
	
	/*@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		try {       
			 String realFileName ="C:/33.ofd";
			  //得到想客服端输出的输出流  
			 OutputStream outputStream = response.getOutputStream();  
				//输出文件用的字节数组，每次向输出流发送600个字节  
			   byte b[] = new byte[100];  
			  //要下载的文件  
			   File fileload = new File(realFileName);       
			   //客服端使用保存文件的对话框  
			   String fn = "ddd.ofd";
			   response.setHeader("Content-disposition", "attachment; filename*=UTF-8''"+fn);  
			   //通知客服文件的MIME类型  
			   //response.setContentType("application/msword");  
			   response.setContentType("text/html");  
			   //通知客服文件的长度  
			   long fileLength = fileload.length();  
				String length = String.valueOf(fileLength);  
			   response.setHeader("Content-length", length);  
				//读取文件，并发送给客服端下载  
				FileInputStream inputStream = new FileInputStream(fileload);  
			   int n = 0;  
			   while((n=inputStream.read(b))!=-1){  
				   outputStream.write(b,0,n);  
			   }  
			   inputStream.close();
			   outputStream.close();
		} 
		catch (IOException e){
			//out.print("upload error. Username is " + userid);
			System.out.println("文件上传失败! 发生了异常");
			e.printStackTrace();
		}
	}*/

}
