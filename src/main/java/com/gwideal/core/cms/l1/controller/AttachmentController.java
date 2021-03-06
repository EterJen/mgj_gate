
package com.gwideal.core.cms.l1.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gwideal.core.cms.l2.service.AttachmentService;
import com.gwideal.core.cms.l4.entity.Attachment;
import com.gwideal.core.jwt.JwtUser;
import com.gwideal.mybatis.metautils.ResultInfo;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.ResourceUtils;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.groups.Default;
import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.Calendar;

@RestController
@RequestMapping("/attachment")
public class AttachmentController {

	@Autowired
	AttachmentService attachmentService;

	@RequestMapping("/init")
	public ResultInfo<Attachment> init(String initType) {
		ResultInfo<Attachment> result = new ResultInfo<Attachment>();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)SecurityContextHolder.getContext().getAuthentication();
		JwtUser currentUser =(JwtUser)token.getPrincipal();
		Attachment initBean = null;
		if(initType.equals("create")){
			initBean = new Attachment();
		}else if(initType.equals("query")){
			initBean = new Attachment();
		}
		result.setBean(initBean);
		return result;
	}


	@RequestMapping("/create")
	public ResultInfo<Attachment> create(@RequestBody @Validated(value={Default.class}) Attachment attachment,BindingResult bindingResult) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<Attachment> result = new ResultInfo<Attachment>();
		if(bindingResult.hasErrors()){
			result.setResultType("validationError");
			for(FieldError fe:bindingResult.getFieldErrors()){
				result.getErrors().put(fe.getField(), fe.getDefaultMessage());
			}
			return result;
		}
		if(attachmentService.create(attachment)>0){
			result.setResultType("success");
			result.setBeanId(attachment.getId());
			result.setMessage("????????????");	
		}else{
			result.setResultType("fail");
			result.setMessage("????????????");	
		}
		return result;
	}
	
	@RequestMapping(value="/read/{id}")
	public ResultInfo<Attachment> read(@PathVariable(name="id") BigDecimal id) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<Attachment> result = new ResultInfo<Attachment>();
		Attachment bean = attachmentService.read(id);
		if(bean==null){
			result.setResultType("fail");
			result.setMessage("????????????????????????");
		}else{
			result.setResultType("success");
			result.setMessage("????????????");
			result.setBean(bean);
		}
		return result;
	}
	
	@RequestMapping(value="/update")
	public ResultInfo<Attachment> update(@RequestBody @Validated(value={Default.class}) Attachment attachment,BindingResult bindingResult) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<Attachment> result = new ResultInfo<Attachment>();
		if(bindingResult.hasErrors()){
			result.setResultType("validationError");
			for(FieldError fe:bindingResult.getFieldErrors()){
				result.getErrors().put(fe.getField(), fe.getDefaultMessage());
			}
			return result;
		}
		if(attachmentService.update(attachment)>0){
			result.setResultType("success");
			result.setMessage("????????????");	
		}else{
			result.setResultType("fail");
			result.setMessage("????????????");	
		}
		return result;
	}
	
	@RequestMapping(value="/delete/{id}")
	public ResultInfo<Attachment> delete(@PathVariable(name="id") BigDecimal id) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<Attachment> result = new ResultInfo<Attachment>();
		if(attachmentService.delete(id)>0){
			result.setResultType("success");
			result.setMessage("????????????");	
		}else{
			result.setResultType("fail");
			result.setMessage("????????????");	
		}
		return result;
	}


	@RequestMapping(value="/batchDelete")
	public ResultInfo<Attachment> batchDelete(@RequestBody Attachment attachment) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)currentUser;
		JwtUser currentUser1 =(JwtUser)token.getPrincipal();
		attachment.setCurrentUser(currentUser1);
		return attachmentService.batchDelete(attachment);
	}
	
	@RequestMapping(value="/list")
	public ResultInfo<Attachment> list(@RequestBody Attachment attachment) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)currentUser;
		JwtUser currentUser1 =(JwtUser)token.getPrincipal();
		attachment.setCurrentUser(currentUser1);
		return attachmentService.list(attachment);
	}

	@RequestMapping(value="/saveOrupdateAttachment")
	public ResultInfo<Attachment> saveOrupdateAttachment(@RequestParam(value = "file", required = false) MultipartFile file, @RequestParam(value = "selectedBean", required = false) String selectedBean) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)currentUser;
		JwtUser currentUser1 =(JwtUser)token.getPrincipal();
		ObjectMapper mapper = new ObjectMapper();
		Attachment attachment=null;
		try {
			attachment=mapper.readValue(selectedBean, Attachment.class);
		} catch (IOException e) {
			e.printStackTrace();
		}
		attachment.setCurrentUser(currentUser1);
		return attachmentService.saveOrupdateAttachment(attachment,file);
	}

	/**
	 * ????????????
	 * @param file
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/ckeditorUpload")
	public String ckeditorUpload(@RequestParam("upload")MultipartFile file,String CKEditorFuncNum)throws Exception{
		// ???????????????
		String fileName = file.getOriginalFilename();
		// ????????????????????????
		String suffixName = fileName.substring(fileName.lastIndexOf("."));
		//String newFileName = UUID.randomUUID()  + suffixName;
		Calendar currentCalendar = Calendar.getInstance();
		String ftpWorkDir = currentCalendar.get(Calendar.YEAR) + "_" + (currentCalendar.get(Calendar.MONTH) + 1) + File.separator;
		String destBasePath = "ckeditor"+ File.separator+ftpWorkDir + fileName;

		File path = new File(ResourceUtils.getURL("classpath:static").getPath());
		File dstPath = new File(path.getAbsolutePath()+File.separator+destBasePath);

		System.out.println(dstPath.getParentFile());
		if (!dstPath.getParentFile().exists()) {
			dstPath.getParentFile().mkdirs();
		}
		/*??????????????????????????????*/
		if (!dstPath.exists()) {
			FileUtils.copyInputStreamToFile(file.getInputStream(), dstPath);
		}
		destBasePath = destBasePath.replaceAll("\\\\", "/");

		StringBuffer sb=new StringBuffer();
		sb.append("<script type='text/javascript'>");
		sb.append("window.parent.CKEDITOR.tools.callFunction("+ CKEditorFuncNum + ",'" +"/"+ destBasePath + "','')");
		sb.append("</script>");

		return sb.toString();
	}

}
