
package com.gwideal.core.cms.l1.controller;
import com.gwideal.core.cms.l2.service.JyphonebookService;
import com.gwideal.core.cms.l4.entity.Jyphonebook;
import com.gwideal.core.jwt.JwtUser;
import com.gwideal.mybatis.metautils.ResultInfo;
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

import javax.validation.groups.Default;
import java.math.BigDecimal;

@RestController
@RequestMapping("/jyphonebook")
public class JyphonebookController {

	@Autowired
	JyphonebookService jyphonebookService;

	@RequestMapping("/init")
	public ResultInfo<Jyphonebook> init(String initType) {
		ResultInfo<Jyphonebook> result = new ResultInfo<Jyphonebook>();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)SecurityContextHolder.getContext().getAuthentication();
		JwtUser currentUser =(JwtUser)token.getPrincipal();
		Jyphonebook initBean = null;
		if(initType.equals("create")){
			initBean = new Jyphonebook();
		}else if(initType.equals("query")){
			initBean = new Jyphonebook();
		}
		result.setBean(initBean);
		return result;
	}


	@RequestMapping("/create")
	public ResultInfo<Jyphonebook> create(@RequestBody @Validated(value={Default.class}) Jyphonebook jyphonebook,BindingResult bindingResult) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<Jyphonebook> result = new ResultInfo<Jyphonebook>();
		if(bindingResult.hasErrors()){
			result.setResultType("validationError");
			for(FieldError fe:bindingResult.getFieldErrors()){
				result.getErrors().put(fe.getField(), fe.getDefaultMessage());
			}
			return result;
		}
		if(jyphonebookService.create(jyphonebook)>0){
			result.setResultType("success");
			result.setBeanId(jyphonebook.getId());
			result.setMessage("创建成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("创建失败");	
		}
		return result;
	}
	
	@RequestMapping(value="/read/{id}")
	public ResultInfo<Jyphonebook> read(@PathVariable(name="id") BigDecimal id) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<Jyphonebook> result = new ResultInfo<Jyphonebook>();
		Jyphonebook bean = jyphonebookService.read(id);
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
	public ResultInfo<Jyphonebook> update(@RequestBody @Validated(value={Default.class}) Jyphonebook jyphonebook,BindingResult bindingResult) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<Jyphonebook> result = new ResultInfo<Jyphonebook>();
		if(bindingResult.hasErrors()){
			result.setResultType("validationError");
			for(FieldError fe:bindingResult.getFieldErrors()){
				result.getErrors().put(fe.getField(), fe.getDefaultMessage());
			}
			return result;
		}
		if(jyphonebookService.update(jyphonebook)>0){
			result.setResultType("success");
			result.setMessage("更新成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("更新失败");	
		}
		return result;
	}
	
	@RequestMapping(value="/delete/{id}")
	public ResultInfo<Jyphonebook> delete(@PathVariable(name="id") BigDecimal id) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<Jyphonebook> result = new ResultInfo<Jyphonebook>();
		if(jyphonebookService.delete(id)>0){
			result.setResultType("success");
			result.setMessage("删除成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("删除失败");	
		}
		return result;
	}
	
	@RequestMapping(value="/list")
	public ResultInfo<Jyphonebook> list(@RequestBody Jyphonebook jyphonebook) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)currentUser;
		JwtUser currentUser1 =(JwtUser)token.getPrincipal();
		jyphonebook.setCurrentUser(currentUser1);
		return jyphonebookService.list(jyphonebook);
	}

	@RequestMapping(value="/batchDelete")
	public ResultInfo<Jyphonebook> batchDelete(@RequestBody Jyphonebook jyphonebook) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)currentUser;
		JwtUser currentUser1 =(JwtUser)token.getPrincipal();
		jyphonebook.setCurrentUser(currentUser1);
		return jyphonebookService.batchDelete(jyphonebook);
	}

}
