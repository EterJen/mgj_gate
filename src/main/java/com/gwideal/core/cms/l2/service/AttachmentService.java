package com.gwideal.core.cms.l2.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.gwideal.core.basic.l2.service.ResourceService;
import com.gwideal.core.cms.l3.dao.AttachmentMapper;
import com.gwideal.core.cms.l4.entity.Attachment;
import com.gwideal.core.common.CoreBaseEntity;
import com.gwideal.core.common.SystemUtils;
import com.gwideal.mybatis.metautils.ResultInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import per.eter.utils.file.FileUtils;
import per.eter.utils.file.SimpFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.*;

@Service
@Transactional
public class AttachmentService {

	@Autowired
	private AttachmentMapper attachmentMapper;

	@Autowired
	private LogService logService;

	@Autowired
	ResourceService resourceService;
	@Autowired
	private FileUtils fileUtils;

	public static String attRelativePath = "/articleAtt/newSoftware";

	public int create(Attachment attachment){
		attachment.setCreatetime(new Date());
		attachment.setIsdelete(0);
		int result = attachmentMapper.insert(attachment);
		logService.log(result, LogService.AuditType.新增, attachment);
		return result;
	}
	
	public Attachment read(BigDecimal id){
		return attachmentMapper.selectByPrimaryKey(id);
	}

	public int update(Attachment attachment){
		Attachment oldAttachment = attachmentMapper.selectByPrimaryKey(attachment.getId());
		attachment.setUpdatetime(new Date());
		int result = attachmentMapper.updateByPrimaryKey(attachment);
		logService.log(result, LogService.AuditType.修改, oldAttachment);
		return result;
	}
	
	public int delete(BigDecimal id){
		Attachment attachment = attachmentMapper.selectByPrimaryKey(id);
		attachment.setIsdelete(1);
		int result = attachmentMapper.updateByPrimaryKeySelective(attachment);
		logService.log(result, LogService.AuditType.删除, attachment);
		return result;
	}
	
	
	public ResultInfo<Attachment> list(Attachment queryBean){
		ResultInfo<Attachment> result = new ResultInfo<Attachment>();
		if(queryBean.getPaging().equals("Yes")){
			PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
	        List<Attachment> plist = attachmentMapper.list(queryBean);
	        PageInfo<Attachment> pageInfo = new PageInfo<Attachment>(plist);
	        result.setTotalRows(pageInfo.getTotal());
	        result.setBeanList(pageInfo.getList());
	        result.setResultType("success");
	        return result;
		}else{
			List<Attachment> plist = attachmentMapper.list(queryBean);
			result.setTotalRows((long)plist.size());
	        result.setBeanList(plist);
	        result.setResultType("success");
	        return result;
		}
	}

	public ResultInfo<Attachment> saveOrupdateAttachment(Attachment attachment, MultipartFile file) {
		ResultInfo<Attachment> result = new ResultInfo<>();
		if (file!=null && file.getSize()>0) {
			try {
				MultipartFile[] multipartFiles = {file};
				Map<String, SimpFile> stringSimpFileMap = fileUtils.remoteUpload(multipartFiles, attRelativePath);

				SimpFile simpFile = stringSimpFileMap.get(file.getOriginalFilename());
				if (SimpFile.FileOperationResult.success.equals(simpFile.getFileOperationResult())) {
					attachment.setOriginalName(simpFile.getOriginalFilename());
					attachment.setFile(simpFile.getRelativePath());
					long size = file.getSize();
					float v = (float) size / 1048576;
					DecimalFormat df = new DecimalFormat("0.00");
					attachment.setSize(df.format(v)+"M");
				} else {
					result.setResultType("fail");
					result.setMessage("附件上传失败");
					return result;
				}
			} catch (Exception e) {
				e.printStackTrace();
				result.setResultType("fail");
				result.setMessage("附件上传失败");
				return result;
			}

		}
		int i;
		if (attachment.getId()!=null) {
			i=update(attachment);
		}else{
			i=create(attachment);
		}
		if(i>0){
			result.setResultType("success");
			result.setMessage("保存成功");
		}else{
			result.setResultType("fail");
			result.setMessage("保存失败");
		}
		return result;
	}


	public <T extends CoreBaseEntity> ResultInfo<T> uploadImg(MultipartFile file) throws Exception{
		ResultInfo<T> result = new ResultInfo<>();
		//写入附件返回路径
		InputStream in = file.getInputStream();
		String originalFilename = file.getOriginalFilename();
		String fileName = originalFilename.substring(originalFilename.lastIndexOf(System.getProperty("file.separator")) + 1);//获取上传文件名字
		Calendar currentCalendar = Calendar.getInstance();
		String fileExt = fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length());
		String uuidFileName = UUID.randomUUID() + "." + fileExt;
		String ftpWorkDir = currentCalendar.get(Calendar.YEAR) + "_" + (currentCalendar.get(Calendar.MONTH) + 1) + File.separator;
		String realFileName;
		if (SystemUtils.getPlatForm().equals(SystemUtils.Platform.Windows)) {
			realFileName=resourceService.getCmsPrefixWindows()+resourceService.getCmsBasicDocumentPath()+ftpWorkDir;
		}else {
			realFileName=resourceService.getCmsPrefixLinux()+resourceService.getCmsBasicDocumentPath()+ftpWorkDir;
		}
		// 断判文件夹是否存在,如果不存在则创建文件夹
		File tempFile = new File(realFileName);
		if (!tempFile.exists()) {
			tempFile.mkdirs();
		}
		int contentlen;
		byte b[] = new byte[1024];
		File f = new File(realFileName+uuidFileName);
		FileOutputStream o = null;
		try {
			o = new FileOutputStream(f);
			while ((contentlen = in.read(b)) != -1)
			{
				o.write(b, 0, contentlen);
			}
			o.close();
			in.close();
		} catch (Exception e) {
			e.printStackTrace();
			result.setMessage("图片文件文件上传失败! ");
			System.out.println("图片文件上传失败! ");
			result.setResultType("fail");
			return result;
		}
		//把文件写到项目目录下
		String destBasePath=ftpWorkDir+uuidFileName;
		//SystemUtils.copyFile(f,destBasePath);
		result.setToken(destBasePath);
		result.setResultType("success");
		return result;
	}

	public ResultInfo<Attachment> batchDelete(Attachment attachment) {
		ResultInfo<Attachment> result = new ResultInfo<>();
		List<BigDecimal> ids = attachment.getIds();
		int i=0;
		if (ids!=null&& ids.size()>0) {
			for (BigDecimal id : ids) {
				i+=delete(id);
			}
		}
		result.setResultType("success");
		result.setMessage("批量删除成功，删除"+i+"条记录！");
		return result;
	}


}
