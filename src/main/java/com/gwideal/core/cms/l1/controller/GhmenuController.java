
package com.gwideal.core.cms.l1.controller;
import javax.validation.groups.Default;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.gwideal.core.jwt.JwtUser;
import com.gwideal.mybatis.metautils.ResultInfo;
import com.gwideal.core.cms.l4.entity.*;
import com.gwideal.core.cms.l2.service.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import java.math.BigDecimal;

@RestController
@RequestMapping("/ghmenu")
public class GhmenuController {

	@Autowired
	GhmenuService ghmenuService;

	@RequestMapping("/init")
	public ResultInfo<Ghmenu> init(String initType) {
		ResultInfo<Ghmenu> result = new ResultInfo<Ghmenu>();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)SecurityContextHolder.getContext().getAuthentication();
		JwtUser currentUser =(JwtUser)token.getPrincipal();
		Ghmenu initBean = null;
		if(initType.equals("create")){
			initBean = new Ghmenu();
		}else if(initType.equals("query")){
			initBean = new Ghmenu();
		}
		result.setBean(initBean);
		return result;
	}


	@RequestMapping("/create")
	public ResultInfo<Ghmenu> create(@RequestBody @Validated(value={Default.class}) Ghmenu ghmenu,BindingResult bindingResult) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<Ghmenu> result = new ResultInfo<Ghmenu>();
		if(bindingResult.hasErrors()){
			result.setResultType("validationError");
			for(FieldError fe:bindingResult.getFieldErrors()){
				result.getErrors().put(fe.getField(), fe.getDefaultMessage());
			}
			return result;
		}
		if(ghmenuService.create(ghmenu)>0){
			result.setResultType("success");
			result.setBeanId(ghmenu.getId());
			result.setMessage("创建成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("创建失败");	
		}
		return result;
	}
	
	@RequestMapping(value="/read/{id}")
	public ResultInfo<Ghmenu> read(@PathVariable(name="id") BigDecimal id) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<Ghmenu> result = new ResultInfo<Ghmenu>();
		Ghmenu bean = ghmenuService.read(id);
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
	public ResultInfo<Ghmenu> update(@RequestBody @Validated(value={Default.class}) Ghmenu ghmenu,BindingResult bindingResult) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<Ghmenu> result = new ResultInfo<Ghmenu>();
		if(bindingResult.hasErrors()){
			result.setResultType("validationError");
			for(FieldError fe:bindingResult.getFieldErrors()){
				result.getErrors().put(fe.getField(), fe.getDefaultMessage());
			}
			return result;
		}
		if(ghmenuService.update(ghmenu)>0){
			result.setResultType("success");
			result.setMessage("更新成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("更新失败");	
		}
		return result;
	}
	
	@RequestMapping(value="/delete/{id}")
	public ResultInfo<Ghmenu> delete(@PathVariable(name="id") BigDecimal id) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<Ghmenu> result = new ResultInfo<Ghmenu>();
		if(ghmenuService.delete(id)>0){
			result.setResultType("success");
			result.setMessage("删除成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("删除失败");	
		}
		return result;
	}
	
	@RequestMapping(value="/list")
	public ResultInfo<Ghmenu> list(@RequestBody Ghmenu ghmenu) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)currentUser;
		JwtUser currentUser1 =(JwtUser)token.getPrincipal();
		ghmenu.setCurrentUser(currentUser1);
		return ghmenuService.list(ghmenu);
	}

}
