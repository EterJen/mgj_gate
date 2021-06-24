package com.gwideal.core.startup.servlet;

import javax.servlet.http.HttpServlet;
public class UploadRedTemplateServlet  extends HttpServlet{
	
	
	/*@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		this.doPost(req,resp);
	}
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse resp)
			throws ServletException, IOException {
		try {       
			AttachmentService attachmentService=(AttachmentService) SpringUtil.getBean("attachmentService");
			MiddleAttachmentService middleAttachmentService=(MiddleAttachmentService) SpringUtil.getBean("middleAttachmentService");
			RProcessInstanceService rProcessInstanceService=(RProcessInstanceService) SpringUtil.getBean("rProcessInstanceService");
			String processInstanceId = request.getParameter("processInstanceId");
			String bizAttachType = request.getParameter("bizAttachType");
			String bizFileType = request.getParameter("bizFileType");
			String fileExt = request.getParameter("fileExt");
			String isWindows = request.getParameter("isWindows");
			String id= request.getParameter("id");
			String userId= request.getParameter("userId");
			String partNumber=request.getParameter("partNumber");
			if (request.getContentLength() > 0) 
			{ 
				String md5sum = request.getHeader("md5sum");
				if(md5sum != null && !md5sum.isEmpty())
				{
					System.out.println("md5sum = " + md5sum);
				}else{
					System.out.println("md5sum is empty, please check plugin version!");	
				}
				
				InputStream in = request.getInputStream();
				byte b[] = new byte[1024];
				//固定128字节
				byte filename[] = new byte[128];
				int contentlen;
				int filenamelen;
				String name = "test.wps";
				if("true".equals(isWindows)){
					if ((filenamelen = in.read(filename)) != -1)
					{
						int i;
						for (i = 0; i < filename.length && filename[i] != 0; i++) {
						}
						name = new String(filename, 0, i, "GBK");
					}
				}else{
					String localfileName = request.getHeader("filename");
					if(StringUtils.isNotBlank(localfileName)){
						name = new String(localfileName.getBytes("iso-8859-1"),"UTF-8");
					}
				}
				MiddleAttachment matt=new MiddleAttachment();
				matt.setProcessInstanceId(new BigDecimal(processInstanceId));
				//matt.setAttachmentid(att.getId());
				matt.setBizAttachType(bizAttachType);
				matt.setBizFileType(bizFileType);
				matt.setFileExt(fileExt);
				if(StringUtils.isNotBlank(id))
				matt.setId(new BigDecimal(id));
				//设置当前登录用户id
				CoreUser currCoreUser=new CoreUser();
				if(StringUtils.isNotBlank(userId))
				currCoreUser.setId(new BigDecimal(userId));
				matt.setCurrCoreUser(currCoreUser);
				if(StringUtils.isNotBlank(partNumber))
					matt.setPartNumber(new BigDecimal(partNumber));
				//attachmentService.saveOrUpdateAttach(name, matt, in,isWindows);
				Calendar cal = Calendar.getInstance();
		        String url = "";
		        if (SystemUtils.getPlatForm().equals(Platform.Windows)) {
		            url = attachmentService.getWindowsProcessDefDir();
		        } else {
		            url = attachmentService.getLinuxDirStr();
		        }
		        String realFileName = url + "redTemplate";
		        *//*String realFileName = cal.get(Calendar.YEAR) + "-" + (cal.get(Calendar.MONTH) + 1);
		        System.out.println("" + realFileName);*//*
		        File tempFile = new File(realFileName ); // 断判文件夹是否存在,如果不存在则创建文件夹
		        if (!tempFile.exists()) {
		            tempFile.mkdirs();
		        }
		        if(StringUtils.isBlank(fileExt))
		        	fileExt = name.substring(name.lastIndexOf(".") + 1, name.length());
		        matt.setFileExt(fileExt);
		        //对于linux系统需要对文件名称进行编码
		        String uuid=UUID.randomUUID()+ "." + fileExt;
		        Attachment att=new Attachment();
		       if(matt.getId()!=null){
		    	   MiddleAttachment midd = middleAttachmentService.read(matt.getId());
		    	   att = attachmentService.read(midd.getAttachmentid());
		       }else{
		    	    att.setFilename(name);
					att.setUrl(uuid);
					att.setFlag(new BigDecimal(1));
					att.setCreateTime(new Date());
					att.setLastUpdatedTime(new Date());
					attachmentService.create(att);//创建简单的attach文件
					matt.setProcessInstanceId(new BigDecimal(processInstanceId));
					matt.setAttachmentid(att.getId());
					matt.setBizAttachType(bizAttachType);
					matt.setBizFileType(bizFileType);
					matt.setFileExt(fileExt);
					matt.setCreateTime(new Date());
					middleAttachmentService.create(matt);
		       }
		       if ("true".equals(isWindows)) {
		            realFileName += File.separator + att.getUrl();
		        } else {
		            realFileName +=  File.separator  + new String(att.getUrl().getBytes("iso-8859-1"), "UTF-8");
		            uuid= new String(uuid.getBytes("iso-8859-1"), "UTF-8");
		        }
		        //这里上传到ftp
				//FtpUtil.uploadFile(attachmentService.getFtpAddress(),attachmentService.getFtpPort(),attachmentService.getFtpUsername(),attachmentService.getFtpPassword(),attachmentService.getFtpBasepath(),attachmentService.getLinuxDirStr()+"redTemplate/",att.getUrl(),in);
		        File f = new File(realFileName);
				FileOutputStream o = new FileOutputStream(f);
				StringBuffer out = new StringBuffer();
				System.out.println( out.toString());
				while ((contentlen = in.read(b)) != -1)
				{                             
					o.write(b, 0, contentlen);
				}
				o.close();
				in.close();

				System.out.println("文件上传成功！路径 : " + (realFileName) );
				//String ext = name.substring(name.lastIndexOf("."),name.length());
				//System.out.println("上传name===="+name);
				//String realFileName = request.getSession().getServletContext().getRealPath("/") + name;
				*//*Calendar cal = Calendar.getInstance();
				//String basePath = ResourceUtils.getURL("classpath:static").getPath();
				String url = "";
				if(SystemUtils.getPlatForm().equals(Platform.Windows)){
					url = attachmentService.getUrl();
				}else{
					url = attachmentService.getLinuxUrl();
				}
				String realFileName = cal.get(Calendar.YEAR) + "-" + (cal.get(Calendar.MONTH) + 1);
				File tempFile = new File(url+realFileName); // 断判文件夹是否存在,如果不存在则创建文件夹
		        if (!tempFile.exists()) {
		        	tempFile.mkdirs();
		        }
		        if("true".equals(isWindows)){
		        	realFileName+=File.separator+UUID.randomUUID()+"."+fileExt;
		        	System.out.println("windows=="+System.getProperties().getProperty("os.name"));
				}else{
					realFileName+="/"+ new String((UUID.randomUUID()+"."+fileExt).getBytes("iso-8859-1"),"UTF-8");
					System.out.println("linux=="+System.getProperties().getProperty("os.name"));
				}
		        
		        Attachment att=new Attachment();
				if(StringUtils.isNotBlank(attachId)){
					att.setId(new BigDecimal(attachId));
				}
				if(att.getId()!=null){
					att=attachmentService.read(att.getId());
					att.setFilename(name);
					att.setUrl(realFileName);
					att.setLastUpdatedTime(new Date());
					attachmentService.update(att);
				}else{
					att.setFilename(name);
					att.setUrl(realFileName);
					att.setFlag(new BigDecimal(1));
					att.setCreateTime(new Date());
					att.setLastUpdatedTime(new Date());
					attachmentService.create(att);//创建简单的attach文件
					MiddleAttachment matt = new MiddleAttachment();
					matt.setProcessInstanceId(new BigDecimal(processInstanceId));
					matt.setAttachmentid(att.getId());
					matt.setBizAttachType(bizAttachType);
					matt.setBizFileType(bizFileType);
					matt.setFileExt(fileExt);
					matt.setCreateTime(new Date());
					middleAttachmentService.create(matt);
				}
				
				System.out.println("name " + name);
				//System.out.println("realFileName " + (basePath+realFileName));

				File f = new File(url+realFileName);
				FileOutputStream o = new FileOutputStream(f);
				StringBuffer out = new StringBuffer();
				System.out.println( out.toString());
				while ((contentlen = in.read(b)) != -1)
				{                             
					o.write(b, 0, contentlen);
				}
				o.close();
				in.close();
				//out.print("File upload success! Username is " + userid);      
				System.out.println("文件上传成功！路径 : " + (url+realFileName) ); *//*
				
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
