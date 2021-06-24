
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
@RequestMapping("/managerOfBusinessSecret")
public class managerOfBusinessSecretController {

	@Autowired
	managerOfBusinessSecretService managerOfBusinessSecretService;

	@RequestMapping("/init")
	public ResultInfo<managerOfBusinessSecret> init(String initType) {
		ResultInfo<managerOfBusinessSecret> result = new ResultInfo<managerOfBusinessSecret>();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)SecurityContextHolder.getContext().getAuthentication();
		JwtUser currentUser =(JwtUser)token.getPrincipal();
		managerOfBusinessSecret initBean = null;
		if(initType.equals("create")){
			initBean = new managerOfBusinessSecret();
		}else if(initType.equals("query")){
			initBean = new managerOfBusinessSecret();
		}
		result.setBean(initBean);
		return result;
	}


	@RequestMapping(value = {"/trustedRequest/create","/create"})
	public ResultInfo<managerOfBusinessSecret> create(@RequestBody @Validated(value={Default.class}) managerOfBusinessSecret managerOfBusinessSecret,BindingResult bindingResult) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<managerOfBusinessSecret> result = new ResultInfo<managerOfBusinessSecret>();
		if(bindingResult.hasErrors()){
			result.setResultType("validationError");
			for(FieldError fe:bindingResult.getFieldErrors()){
				result.getErrors().put(fe.getField(), fe.getDefaultMessage());
			}
			return result;
		}
		if(managerOfBusinessSecretService.create(managerOfBusinessSecret)>0){
			result.setResultType("success");
			result.setBeanId(managerOfBusinessSecret.getId());
			result.setMessage("创建成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("创建失败");	
		}
		return result;
	}
	
	@RequestMapping(value="/read/{id}")
	public ResultInfo<managerOfBusinessSecret> read(@PathVariable(name="id") BigDecimal id) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<managerOfBusinessSecret> result = new ResultInfo<managerOfBusinessSecret>();
		managerOfBusinessSecret bean = managerOfBusinessSecretService.read(id);
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
	public ResultInfo<managerOfBusinessSecret> update(@RequestBody @Validated(value={Default.class}) managerOfBusinessSecret managerOfBusinessSecret,BindingResult bindingResult) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<managerOfBusinessSecret> result = new ResultInfo<managerOfBusinessSecret>();
		if(bindingResult.hasErrors()){
			result.setResultType("validationError");
			for(FieldError fe:bindingResult.getFieldErrors()){
				result.getErrors().put(fe.getField(), fe.getDefaultMessage());
			}
			return result;
		}
		if(managerOfBusinessSecretService.update(managerOfBusinessSecret)>0){
			result.setResultType("success");
			result.setMessage("更新成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("更新失败");	
		}
		return result;
	}
	
	@RequestMapping(value="/delete/{id}")
	public ResultInfo<managerOfBusinessSecret> delete(@PathVariable(name="id") BigDecimal id) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<managerOfBusinessSecret> result = new ResultInfo<managerOfBusinessSecret>();
		if(managerOfBusinessSecretService.delete(id)>0){
			result.setResultType("success");
			result.setMessage("删除成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("删除失败");	
		}
		return result;
	}
	
	@RequestMapping(value={"/trustedRequest/list", "/list"})
	public ResultInfo<managerOfBusinessSecret> list(@RequestBody managerOfBusinessSecret managerOfBusinessSecret) {
//		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
//		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)currentUser;
//		JwtUser currentUser1 =(JwtUser)token.getPrincipal();
//		managerOfBusinessSecret.setCurrentUser(currentUser1);
		return managerOfBusinessSecretService.list(managerOfBusinessSecret);
	}

}
