
package com.gwideal.core.cms.l1.controller;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gwideal.core.cms.l2.service.TemplateMngService;
import com.gwideal.core.cms.l4.entity.TemplateMng;
import com.gwideal.core.jwt.JwtUser;
import com.gwideal.mybatis.metautils.ResultInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.groups.Default;
import java.io.IOException;
import java.math.BigDecimal;

@RestController
@RequestMapping("/templateMng")
public class TemplateMngController {

	@Autowired
	TemplateMngService templateMngService;

	@RequestMapping("/init")
	public ResultInfo<TemplateMng> init(String initType) {
		ResultInfo<TemplateMng> result = new ResultInfo<TemplateMng>();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)SecurityContextHolder.getContext().getAuthentication();
		JwtUser currentUser =(JwtUser)token.getPrincipal();
		TemplateMng initBean = null;
		if(initType.equals("create")){
			initBean = new TemplateMng();
		}else if(initType.equals("query")){
			initBean = new TemplateMng();
		}
		result.setBean(initBean);
		return result;
	}


	@RequestMapping("/create")
	public ResultInfo<TemplateMng> create(@RequestBody @Validated(value={Default.class}) TemplateMng templateMng,BindingResult bindingResult) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<TemplateMng> result = new ResultInfo<TemplateMng>();
		if(bindingResult.hasErrors()){
			result.setResultType("validationError");
			for(FieldError fe:bindingResult.getFieldErrors()){
				result.getErrors().put(fe.getField(), fe.getDefaultMessage());
			}
			return result;
		}
		if(templateMngService.create(templateMng)>0){
			result.setResultType("success");
			result.setBeanId(templateMng.getId());
			result.setMessage("创建成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("创建失败");	
		}
		return result;
	}
	
	@RequestMapping(value="/read/{id}")
	public ResultInfo<TemplateMng> read(@PathVariable(name="id") BigDecimal id) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<TemplateMng> result = new ResultInfo<TemplateMng>();
		TemplateMng bean = templateMngService.read(id);
		if(bean==null){
			result.setResultType("fail");
			result.setMessage("读取的数据不存在");
		}else{
			result.setResultType("success");
			result.setMessage("读取成功");
			result.setBean(bean);
		}
		return result;
	}
	
	@RequestMapping(value="/update")
	public ResultInfo<TemplateMng> update(@RequestBody @Validated(value={Default.class}) TemplateMng templateMng,BindingResult bindingResult) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<TemplateMng> result = new ResultInfo<TemplateMng>();
		if(bindingResult.hasErrors()){
			result.setResultType("validationError");
			for(FieldError fe:bindingResult.getFieldErrors()){
				result.getErrors().put(fe.getField(), fe.getDefaultMessage());
			}
			return result;
		}
		if(templateMngService.update(templateMng)>0){
			result.setResultType("success");
			result.setMessage("更新成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("更新失败");	
		}
		return result;
	}
	
	@RequestMapping(value="/delete/{id}")
	public ResultInfo<TemplateMng> delete(@PathVariable(name="id") BigDecimal id) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<TemplateMng> result = new ResultInfo<TemplateMng>();
		if(templateMngService.delete(id)>0){
			result.setResultType("success");
			result.setMessage("删除成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("删除失败");	
		}
		return result;
	}
	
	@RequestMapping(value="/list")
	public ResultInfo<TemplateMng> list(@RequestBody TemplateMng templateMng) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)currentUser;
		JwtUser currentUser1 =(JwtUser)token.getPrincipal();
		templateMng.setCurrentUser(currentUser1);
		return templateMngService.list(templateMng);
	}


	@RequestMapping(value="/batchDelete")
	public ResultInfo<TemplateMng> batchDelete(@RequestBody TemplateMng templateMng) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)currentUser;
		JwtUser currentUser1 =(JwtUser)token.getPrincipal();
		templateMng.setCurrentUser(currentUser1);
		return templateMngService.batchDelete(templateMng);
	}

	@RequestMapping(value="/saveOrupdateAttachment")
	public ResultInfo<TemplateMng> saveOrupdateAttachment(@RequestParam(value = "file", required = false) MultipartFile file, @RequestParam(value = "selectedBean", required = false) String selectedBean) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)currentUser;
		JwtUser currentUser1 =(JwtUser)token.getPrincipal();
		ObjectMapper mapper = new ObjectMapper();
		TemplateMng templateMng=null;
		try {
			templateMng=mapper.readValue(selectedBean, TemplateMng.class);
		} catch (IOException e) {
			e.printStackTrace();
		}
		templateMng.setCurrentUser(currentUser1);
		return templateMngService.saveOrupdateAttachment(templateMng,file);
	}

}
