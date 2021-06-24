
package com.gwideal.core.basic.l1.controller;
import java.math.BigDecimal;

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

import com.gwideal.core.basic.l2.service.CoreMpsavailModuleService;
import com.gwideal.core.basic.l4.entity.CoreMpsavailModule;
import com.gwideal.core.jwt.JwtUser;
import com.gwideal.mybatis.metautils.ResultInfo;

@RestController
@RequestMapping("/coreMpsavailModule")
public class CoreMpsavailModuleController {

	@Autowired
	CoreMpsavailModuleService coreMpsavailModuleService;

	@RequestMapping("/init")
	public ResultInfo<CoreMpsavailModule> init(String initType) {
		ResultInfo<CoreMpsavailModule> result = new ResultInfo<CoreMpsavailModule>();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)SecurityContextHolder.getContext().getAuthentication();
		JwtUser currentUser =(JwtUser)token.getPrincipal();
		CoreMpsavailModule initBean = null;
		if(initType.equals("create")){
			initBean = new CoreMpsavailModule();
		}else if(initType.equals("query")){
			initBean = new CoreMpsavailModule();
		}
		result.setBean(initBean);
		return result;
	}


	@RequestMapping("/create")
	public ResultInfo<CoreMpsavailModule> create(@RequestBody @Validated(value={Default.class}) CoreMpsavailModule coreMpsavailModule,BindingResult bindingResult) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<CoreMpsavailModule> result = new ResultInfo<CoreMpsavailModule>();
		/*if(bindingResult.hasErrors()){
			result.setResultType("validationError");
			for(FieldError fe:bindingResult.getFieldErrors()){
				result.getErrors().put(fe.getField(), fe.getDefaultMessage());
			}
			return result;
		}
		if(coreMpsavailModuleService.create(coreMpsavailModule)>0){
			result.setResultType("success");
			result.setBeanId(coreMpsavailModule.getId());
			result.setMessage("创建成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("创建失败");	
		}*/
		return result;
	}
	
	@RequestMapping(value="/read/{id}")
	public ResultInfo<CoreMpsavailModule> read(@PathVariable(name="id") BigDecimal id) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<CoreMpsavailModule> result = new ResultInfo<CoreMpsavailModule>();
		CoreMpsavailModule bean = coreMpsavailModuleService.read(id);
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
	public ResultInfo<CoreMpsavailModule> update(@RequestBody @Validated(value={Default.class}) CoreMpsavailModule coreMpsavailModule,BindingResult bindingResult) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<CoreMpsavailModule> result = new ResultInfo<CoreMpsavailModule>();
		if(bindingResult.hasErrors()){
			result.setResultType("validationError");
			for(FieldError fe:bindingResult.getFieldErrors()){
				result.getErrors().put(fe.getField(), fe.getDefaultMessage());
			}
			return result;
		}
		if(coreMpsavailModuleService.update(coreMpsavailModule)>0){
			result.setResultType("success");
			result.setMessage("更新成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("更新失败");	
		}
		return result;
	}
	
	@RequestMapping(value="/delete/{id}")
	public ResultInfo<CoreMpsavailModule> delete(@PathVariable(name="id") String id) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<CoreMpsavailModule> result = new ResultInfo<CoreMpsavailModule>();
		if(coreMpsavailModuleService.delete(id)>0){
			result.setResultType("success");
			result.setMessage("删除成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("删除失败");	
		}
		return result;
	}
	
	@RequestMapping(value="/list")
	public ResultInfo<CoreMpsavailModule> list(@RequestBody CoreMpsavailModule coreMpsavailModule) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)currentUser;
		JwtUser currentUser1 =(JwtUser)token.getPrincipal();
		coreMpsavailModule.setCurrentUser(currentUser1);
		return coreMpsavailModuleService.list(coreMpsavailModule);
	}
	
	@RequestMapping(value="/savaMpsavailModulePermiss")
	public ResultInfo<CoreMpsavailModule> mpsavailmodule(@RequestBody CoreMpsavailModule coreMpsavailModule) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)currentUser;
		JwtUser currentUser1 =(JwtUser)token.getPrincipal();
		coreMpsavailModule.setCurrentUser(currentUser1);
		return coreMpsavailModuleService.authorization(coreMpsavailModule);
	}
	

}
