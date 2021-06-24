
package com.gwideal.core.date.l1.controller;
import javax.validation.groups.Default;

import com.gwideal.core.util.DateTimeUtils;
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
import com.gwideal.core.date.l4.entity.*;
import com.gwideal.core.date.l2.service.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
@RequestMapping("/comonDate")
public class ComonDateController {

	@Autowired
	ComonDateService comonDateService;
	@RequestMapping("/trustedRequest/rsync")
	public ResultInfo<ComonDate> rsync(String quey) {
		ResultInfo<ComonDate> result = new ResultInfo<ComonDate>();
		result.setResultType("success");
		try {
			comonDateService.rsync(quey);

		} catch (Exception e) {
			e.printStackTrace();
			result.setResultType("fail");
		}
		return result;
	}
	@RequestMapping(value = "/trustedRequest/today")
	public ResultInfo<ComonDate> today(@RequestBody String pattern) {
		ResultInfo<ComonDate> ri = new ResultInfo<ComonDate>();
		ri.setBean(comonDateService.today());
		ri.setResultType("success");
		return ri;
	}

	@RequestMapping("/init")
	public ResultInfo<ComonDate> init(String initType) {
		ResultInfo<ComonDate> result = new ResultInfo<ComonDate>();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)SecurityContextHolder.getContext().getAuthentication();
		JwtUser currentUser =(JwtUser)token.getPrincipal();
		ComonDate initBean = null;
		if(initType.equals("create")){
			initBean = new ComonDate();
		}else if(initType.equals("query")){
			initBean = new ComonDate();
		}
		result.setBean(initBean);
		return result;
	}


	@RequestMapping("/create")
	public ResultInfo<ComonDate> create(@RequestBody @Validated(value={Default.class}) ComonDate comonDate,BindingResult bindingResult) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<ComonDate> result = new ResultInfo<ComonDate>();
		if(bindingResult.hasErrors()){
			result.setResultType("validationError");
			for(FieldError fe:bindingResult.getFieldErrors()){
				result.getErrors().put(fe.getField(), fe.getDefaultMessage());
			}
			return result;
		}
		if(comonDateService.create(comonDate)>0){
			result.setResultType("success");
			result.setBeanId(comonDate.getId());
			result.setMessage("创建成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("创建失败");	
		}
		return result;
	}
	
	@RequestMapping(value="/read/{id}")
	public ResultInfo<ComonDate> read(@PathVariable(name="id") BigDecimal id) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<ComonDate> result = new ResultInfo<ComonDate>();
		ComonDate bean = comonDateService.read(id);
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
	public ResultInfo<ComonDate> update(@RequestBody @Validated(value={Default.class}) ComonDate comonDate,BindingResult bindingResult) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<ComonDate> result = new ResultInfo<ComonDate>();
		if(bindingResult.hasErrors()){
			result.setResultType("validationError");
			for(FieldError fe:bindingResult.getFieldErrors()){
				result.getErrors().put(fe.getField(), fe.getDefaultMessage());
			}
			return result;
		}
		if(comonDateService.update(comonDate)>0){
			result.setResultType("success");
			result.setMessage("更新成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("更新失败");	
		}
		return result;
	}
	
	@RequestMapping(value="/delete/{id}")
	public ResultInfo<ComonDate> delete(@PathVariable(name="id") BigDecimal id) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<ComonDate> result = new ResultInfo<ComonDate>();
		if(comonDateService.delete(id)>0){
			result.setResultType("success");
			result.setMessage("删除成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("删除失败");	
		}
		return result;
	}
	
	@RequestMapping(value="/list")
	public ResultInfo<ComonDate> list(@RequestBody ComonDate comonDate) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)currentUser;
		JwtUser currentUser1 =(JwtUser)token.getPrincipal();
		comonDate.setCurrentUser(currentUser1);
		return comonDateService.list(comonDate);
	}

}
