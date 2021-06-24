package com.gwideal.core.startup.servlet;

import com.gwideal.core.basic.l5.extend.fileoperation.SpringUtil;
import com.gwideal.core.pdf.kit.constant.Constants;
import com.gwideal.core.pdf.kit.util.HtmlUtils;
import com.gwideal.core.pdf.kit.util.PDFUtils;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.math.BigDecimal;
import java.util.Map;

public class PrintFormDownloadServlet extends HttpServlet{


	/*private Map params;
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		this.doPost(req,resp);
	}
	
	*//**
	 * 打印表单
	 * @param request 
	 * @param response
	 *
	 *//*
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) {
		String path = "";
		try {
			RCurrentTaskInfoService rCurrentTaskInfoService=(RCurrentTaskInfoService) SpringUtil.getBean("RCurrentTaskInfoService");	
			String id = request.getParameter("id"); 
	        ResultInfo<RCurrentTaskInfo> ri = rCurrentTaskInfoService.viewOfficialDocument(new BigDecimal(id),null);
	        
            String basePath = PrintFormDownloadServlet.class.getClassLoader().getResource("static").getPath()+Constants.HTMLTEMP;
            
			RCurrentTaskInfo bean = (RCurrentTaskInfo) ri.getAdditionalInfo().get("task");
            String type = bean.getTheCommonFormInfo().getFormDetailType();
            *//*if(StringUtils.equals(Constants.DOC_TYPE_DWSHOUWEN, type)){
            	type = Constants.DOC_TYPE_SHOUWEN;
            }*//*
            String html = HtmlUtils.getHtmlString(basePath+type+Constants.HTMLDOC, bean,bean.getTheCommonFormInfo().getFormDetailType());         
            path = basePath+type+Constants.PDFSRC;
            PDFUtils.createPdf(html,path);
            String fileName =  bean.getTheCommonFormInfo().getFormDetailType()+Constants.PDFSRC;   
    		try {
    		    String agent = request.getHeader("User-Agent");
    		    boolean isMSIE = (agent != null && (agent.indexOf("MSIE") != -1 || agent.indexOf("Trident") != -1));
    		    if (isMSIE) {
    		      fileName = new String(fileName.getBytes("GBK"), "ISO8859-1");
    		    } else {
    		      fileName = new String(fileName.getBytes("utf-8"), "ISO8859-1");
    		    }
    			ByteArrayOutputStream stream = PDFUtils.html2Pdf(html);
    			response.setContentType("application/pdf");
    			response.setHeader("Content-disposition","atachment;filename="+fileName);
    	        OutputStream os = response.getOutputStream();
    	        stream.writeTo(os);
    	        os.flush();
    	        os.close();
		    } catch (IOException e) {
		    	e.printStackTrace();
		   } 
			
		} 
		catch (Exception e){
			//out.print("upload error. Username is " + userid);
			System.out.println("文件下载失败! 发生了异常");
			e.printStackTrace();
		}
	}*/
}
