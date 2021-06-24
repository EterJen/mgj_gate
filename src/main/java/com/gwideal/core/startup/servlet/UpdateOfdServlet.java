package com.gwideal.core.startup.servlet;

import com.gwideal.core.basic.l5.extend.fileoperation.SpringUtil;
import org.apache.commons.lang3.StringUtils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;

public class UpdateOfdServlet extends HttpServlet{
	
	
	/*@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		this.doPost(req,resp);
	}
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse resp)
			throws ServletException, IOException {
		try {
			AttachmentService attachmentService=(AttachmentService) SpringUtil.getBean("attachmentService");
			CoreUserService coreUserService = (CoreUserService) SpringUtil.getBean("coreUserService");
			MiddleAttachmentService middleAttachmentService=(MiddleAttachmentService) SpringUtil.getBean("middleAttachmentService");
			String middattachmentId = request.getParameter("middattachmentId");
			String userId = request.getParameter("userId");
			String currentNodeId = request.getParameter("currentNodeId");

			if (request.getContentLength() > 0)
			{ 
                MiddleAttachment read=new MiddleAttachment();
				if(StringUtils.isNotBlank(middattachmentId)){
                    read = middleAttachmentService.read(new BigDecimal(middattachmentId));
                    read.setAttachment(attachmentService.read(read.getAttachmentid()));
					read.setCurrentNodeId(currentNodeId);
					if (StringUtils.isNotBlank(userId)) {
						CoreUser user = coreUserService.cacheCompleteCopy(new CoreUser(userId));
						read.setCreatorId(user.getId());
						read.setCreatorName(user.getName());
						CoreDepartment department = user.getDepartment();
						if (null != department) {
							read.setCreatorDepartname(department.getName());
						}
					}
                }else{
					System.out.println("附件中间表id参数未找到");
					return;
				}
                InputStream in = request.getInputStream();
				String name="未命名.ofd";
				if(read.getAttachment()!=null){
					name=read.getAttachment().getFilename();
				}
				MiddleAttachment middleAttachment = attachmentService.saveOrUpdateAttach(name, read, in);
			}
			else
			{
				System.out.println("文件上传失败! input stream 长度是 0");
			}
		} 
		catch (IOException e){
			System.out.println("文件上传失败! 发生了异常");
			e.printStackTrace();
		}
	}*/

}
