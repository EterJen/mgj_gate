
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
@RequestMapping("/bayWindow")
public class BayWindowController {

	@Autowired
	BayWindowService bayWindowService;

	@RequestMapping("/init")
	public ResultInfo<BayWindow> init(String initType) {
		ResultInfo<BayWindow> result = new ResultInfo<BayWindow>();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)SecurityContextHolder.getContext().getAuthentication();
		JwtUser currentUser =(JwtUser)token.getPrincipal();
		BayWindow initBean = null;
		if(initType.equals("create")){
			initBean = new BayWindow();
		}else if(initType.equals("query")){
			initBean = new BayWindow();
		}
		result.setBean(initBean);
		return result;
	}


	@RequestMapping("/create")
	public ResultInfo<BayWindow> create(@RequestBody @Validated(value={Default.class}) BayWindow bayWindow,BindingResult bindingResult) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<BayWindow> result = new ResultInfo<BayWindow>();
		if(bindingResult.hasErrors()){
			result.setResultType("validationError");
			for(FieldError fe:bindingResult.getFieldErrors()){
				result.getErrors().put(fe.getField(), fe.getDefaultMessage());
			}
			return result;
		}
		if(bayWindowService.create(bayWindow)>0){
			result.setResultType("success");
			result.setBeanId(bayWindow.getId());
			result.setMessage("????????????");	
		}else{
			result.setResultType("fail");
			result.setMessage("????????????");	
		}
		return result;
	}
	
	@RequestMapping(value="/read/{id}")
	public ResultInfo<BayWindow> read(@PathVariable(name="id") BigDecimal id) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<BayWindow> result = new ResultInfo<BayWindow>();
		BayWindow bean = bayWindowService.read(id);
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
	public ResultInfo<BayWindow> update(@RequestBody @Validated(value={Default.class}) BayWindow bayWindow,BindingResult bindingResult) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<BayWindow> result = new ResultInfo<BayWindow>();
		if(bindingResult.hasErrors()){
			result.setResultType("validationError");
			for(FieldError fe:bindingResult.getFieldErrors()){
				result.getErrors().put(fe.getField(), fe.getDefaultMessage());
			}
			return result;
		}
		if(bayWindowService.update(bayWindow)>0){
			result.setResultType("success");
			result.setMessage("????????????");	
		}else{
			result.setResultType("fail");
			result.setMessage("????????????");	
		}
		return result;
	}
	
	@RequestMapping(value="/delete/{id}")
	public ResultInfo<BayWindow> delete(@PathVariable(name="id") BigDecimal id) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<BayWindow> result = new ResultInfo<BayWindow>();
		if(bayWindowService.delete(id)>0){
			result.setResultType("success");
			result.setMessage("????????????");	
		}else{
			result.setResultType("fail");
			result.setMessage("????????????");	
		}
		return result;
	}
	
	@RequestMapping(value="/list")
	public ResultInfo<BayWindow> list(@RequestBody BayWindow bayWindow) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)currentUser;
		JwtUser currentUser1 =(JwtUser)token.getPrincipal();
		bayWindow.setCurrentUser(currentUser1);
		return bayWindowService.list(bayWindow);
	}

}
