
package com.gwideal.core.cms.l1.controller;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gwideal.core.cms.l2.service.ComformService;
import com.gwideal.core.cms.l4.entity.Comform;
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
@RequestMapping("/comform")
public class ComformController {

	@Autowired
	ComformService comformService;

	@RequestMapping("/init")
	public ResultInfo<Comform> init(String initType) {
		ResultInfo<Comform> result = new ResultInfo<Comform>();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)SecurityContextHolder.getContext().getAuthentication();
		JwtUser currentUser =(JwtUser)token.getPrincipal();
		Comform initBean = null;
		if(initType.equals("create")){
			initBean = new Comform();
		}else if(initType.equals("query")){
			initBean = new Comform();
		}
		result.setBean(initBean);
		return result;
	}


	@RequestMapping("/create")
	public ResultInfo<Comform> create(@RequestBody @Validated(value={Default.class}) Comform comform,BindingResult bindingResult) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<Comform> result = new ResultInfo<Comform>();
		if(bindingResult.hasErrors()){
			result.setResultType("validationError");
			for(FieldError fe:bindingResult.getFieldErrors()){
				result.getErrors().put(fe.getField(), fe.getDefaultMessage());
			}
			return result;
		}
		if(comformService.create(comform)>0){
			result.setResultType("success");
			result.setBeanId(comform.getId());
			result.setMessage("创建成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("创建失败");	
		}
		return result;
	}
	
	@RequestMapping(value="/read/{id}")
	public ResultInfo<Comform> read(@PathVariable(name="id") BigDecimal id) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<Comform> result = new ResultInfo<Comform>();
		Comform bean = comformService.read(id);
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
	public ResultInfo<Comform> update(@RequestBody @Validated(value={Default.class}) Comform comform,BindingResult bindingResult) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<Comform> result = new ResultInfo<Comform>();
		if(bindingResult.hasErrors()){
			result.setResultType("validationError");
			for(FieldError fe:bindingResult.getFieldErrors()){
				result.getErrors().put(fe.getField(), fe.getDefaultMessage());
			}
			return result;
		}
		if(comformService.update(comform)>0){
			result.setResultType("success");
			result.setMessage("更新成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("更新失败");	
		}
		return result;
	}
	
	@RequestMapping(value="/delete/{id}")
	public ResultInfo<Comform> delete(@PathVariable(name="id") BigDecimal id) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<Comform> result = new ResultInfo<Comform>();
		if(comformService.delete(id)>0){
			result.setResultType("success");
			result.setMessage("删除成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("删除失败");	
		}
		return result;
	}

	@RequestMapping(value="/batchDelete")
	public ResultInfo<Comform> batchDelete(@RequestBody Comform comform) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)currentUser;
		JwtUser currentUser1 =(JwtUser)token.getPrincipal();
		comform.setCurrentUser(currentUser1);
		return comformService.batchDelete(comform);
	}
	
	@RequestMapping(value="/list")
	public ResultInfo<Comform> list(@RequestBody Comform comform) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)currentUser;
		JwtUser currentUser1 =(JwtUser)token.getPrincipal();
		comform.setCurrentUser(currentUser1);
		return comformService.list(comform);
	}

	@RequestMapping(value="/saveOrupdateAttachment")
	public ResultInfo<Comform> saveOrupdateAttachment(@RequestParam(value = "file", required = false) MultipartFile file, @RequestParam(value = "selectedBean", required = false) String selectedBean) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)currentUser;
		JwtUser currentUser1 =(JwtUser)token.getPrincipal();
		ObjectMapper mapper = new ObjectMapper();
		Comform comform=null;
		try {
			comform=mapper.readValue(selectedBean, Comform.class);
		} catch (IOException e) {
			e.printStackTrace();
		}
		comform.setCurrentUser(currentUser1);
		return comformService.saveOrupdateAttachment(comform,file);
	}

}
