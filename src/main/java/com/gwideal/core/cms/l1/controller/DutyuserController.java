
package com.gwideal.core.cms.l1.controller;
import com.gwideal.core.cms.l2.service.DutyuserService;
import com.gwideal.core.cms.l4.entity.Dutyuser;
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
@RequestMapping("/dutyuser")
public class DutyuserController {

	@Autowired
	DutyuserService dutyuserService;

	@RequestMapping("/init")
	public ResultInfo<Dutyuser> init(String initType) {
		ResultInfo<Dutyuser> result = new ResultInfo<Dutyuser>();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)SecurityContextHolder.getContext().getAuthentication();
		JwtUser currentUser =(JwtUser)token.getPrincipal();
		Dutyuser initBean = null;
		if(initType.equals("create")){
			initBean = new Dutyuser();
		}else if(initType.equals("query")){
			initBean = new Dutyuser();
		}
		result.setBean(initBean);
		return result;
	}


	@RequestMapping("/create")
	public ResultInfo<Dutyuser> create(@RequestBody @Validated(value={Default.class}) Dutyuser dutyuser,BindingResult bindingResult) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)currentUser;
		JwtUser currentUser1 =(JwtUser)token.getPrincipal();
		dutyuser.setCurrentUser(currentUser1);
		ResultInfo<Dutyuser> result = new ResultInfo<Dutyuser>();
		if(bindingResult.hasErrors()){
			result.setResultType("validationError");
			for(FieldError fe:bindingResult.getFieldErrors()){
				result.getErrors().put(fe.getField(), fe.getDefaultMessage());
			}
			return result;
		}
		if(dutyuserService.create(dutyuser)>0){
			result.setResultType("success");
			result.setBeanId(dutyuser.getId());
			result.setMessage("创建成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("创建失败");	
		}
		return result;
	}
	
	@RequestMapping(value="/read/{id}")
	public ResultInfo<Dutyuser> read(@PathVariable(name="id") BigDecimal id) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<Dutyuser> result = new ResultInfo<Dutyuser>();
		Dutyuser bean = dutyuserService.read(id);
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
	public ResultInfo<Dutyuser> update(@RequestBody @Validated(value={Default.class}) Dutyuser dutyuser,BindingResult bindingResult) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)currentUser;
		JwtUser currentUser1 =(JwtUser)token.getPrincipal();
		dutyuser.setCurrentUser(currentUser1);
		ResultInfo<Dutyuser> result = new ResultInfo<Dutyuser>();
		if(bindingResult.hasErrors()){
			result.setResultType("validationError");
			for(FieldError fe:bindingResult.getFieldErrors()){
				result.getErrors().put(fe.getField(), fe.getDefaultMessage());
			}
			return result;
		}
		if(dutyuserService.update(dutyuser)>0){
			result.setResultType("success");
			result.setMessage("更新成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("更新失败");	
		}
		return result;
	}
	
	@RequestMapping(value="/delete/{id}")
	public ResultInfo<Dutyuser> delete(@PathVariable(name="id") BigDecimal id) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<Dutyuser> result = new ResultInfo<Dutyuser>();
		if(dutyuserService.delete(id)>0){
			result.setResultType("success");
			result.setMessage("删除成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("删除失败");	
		}
		return result;
	}
	
	@RequestMapping(value="/list")
	public ResultInfo<Dutyuser> list(@RequestBody Dutyuser dutyuser) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)currentUser;
		JwtUser currentUser1 =(JwtUser)token.getPrincipal();
		dutyuser.setCurrentUser(currentUser1);
		return dutyuserService.list(dutyuser);
	}

	@RequestMapping(value="/batchDelete")
	public ResultInfo<Dutyuser> batchDelete(@RequestBody Dutyuser dutyuser) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)currentUser;
		JwtUser currentUser1 =(JwtUser)token.getPrincipal();
		dutyuser.setCurrentUser(currentUser1);
		return dutyuserService.batchDelete(dutyuser);
	}
	
	@RequestMapping(value="/getUsers")
	public ResultInfo<Dutyuser> getUsers(@RequestBody Dutyuser dutyuser) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)currentUser;
		JwtUser currentUser1 =(JwtUser)token.getPrincipal();
		dutyuser.setCurrentUser(currentUser1);
		//根据值班人员所在部门查询用户
		return dutyuserService.getDutyusers(""+dutyuser.getDepartment());
	}

}
