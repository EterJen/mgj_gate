
package com.gwideal.core.cms.l1.controller;
import com.gwideal.core.cms.l2.service.AdministratorService;
import com.gwideal.core.cms.l4.entity.Administrator;
import com.gwideal.core.jwt.JwtUser;
import com.gwideal.mybatis.metautils.ResultInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
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
@RequestMapping("/administrator")
public class AdministratorController {

	@Autowired
	AdministratorService administratorService;
	@Autowired
	PasswordEncoder encoder;

	@RequestMapping("/init")
	public ResultInfo<Administrator> init(String initType) {
		ResultInfo<Administrator> result = new ResultInfo<Administrator>();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)SecurityContextHolder.getContext().getAuthentication();
		JwtUser currentUser =(JwtUser)token.getPrincipal();
		Administrator initBean = null;
		if(initType.equals("create")){
			initBean = new Administrator();
		}else if(initType.equals("query")){
			initBean = new Administrator();
		}
		result.setBean(initBean);
		return result;
	}


	@RequestMapping("/create")
	public ResultInfo<Administrator> create(@RequestBody @Validated(value={Default.class}) Administrator administrator,BindingResult bindingResult) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<Administrator> result = new ResultInfo<Administrator>();
		if(bindingResult.hasErrors()){
			result.setResultType("validationError");
			for(FieldError fe:bindingResult.getFieldErrors()){
				result.getErrors().put(fe.getField(), fe.getDefaultMessage());
			}
			return result;
		}
		administrator.setPassword(encoder.encode(administrator.getPassword().trim()));
		administrator.setShowAble(BigDecimal.ONE);
		if(administratorService.create(administrator)>0){
			result.setResultType("success");
			result.setBeanId(administrator.getId());
			result.setMessage("创建成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("创建失败");	
		}
		return result;
	}
	
	@RequestMapping(value="/read/{id}")
	public ResultInfo<Administrator> read(@PathVariable(name="id") BigDecimal id) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<Administrator> result = new ResultInfo<Administrator>();
		Administrator bean = administratorService.read(id);
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
	public ResultInfo<Administrator> update(@RequestBody @Validated(value={Default.class}) Administrator administrator,BindingResult bindingResult) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<Administrator> result = new ResultInfo<Administrator>();
		if(bindingResult.hasErrors()){
			result.setResultType("validationError");
			for(FieldError fe:bindingResult.getFieldErrors()){
				result.getErrors().put(fe.getField(), fe.getDefaultMessage());
			}
			return result;
		}
		if (null != administrator.getPassword() && administrator.getPassword().length() < 21) {
			administrator.setPassword(encoder.encode(administrator.getPassword().trim()));
		}
		if(administratorService.update(administrator)>0){
			result.setResultType("success");
			result.setMessage("更新成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("更新失败");	
		}
		return result;
	}
	
	@RequestMapping(value="/delete/{id}")
	public ResultInfo<Administrator> delete(@PathVariable(name="id") BigDecimal id) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<Administrator> result = new ResultInfo<Administrator>();
		if(administratorService.delete(id)>0){
			result.setResultType("success");
			result.setMessage("删除成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("删除失败");	
		}
		return result;
	}
	
	@RequestMapping(value="/list")
	public ResultInfo<Administrator> list(@RequestBody Administrator administrator) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)currentUser;
		JwtUser currentUser1 =(JwtUser)token.getPrincipal();
		administrator.setCurrentUser(currentUser1);
		return administratorService.list(administrator);
	}

	@RequestMapping(value = "/currentUser")
	public ResultInfo<Administrator> currentUser() {
		ResultInfo<Administrator> ri = new ResultInfo<Administrator>();
		Administrator cu = ((JwtUser) (((UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication()).getPrincipal())).getCoreUser();
		Administrator coreUser = administratorService.cacheNgCopy(cu);
		ri.setBean(coreUser);
		ri.setResultType("success");
		ri.setBeanId(coreUser.getId());
		return ri;
	}

	@RequestMapping(value = "/findUser")
	public ResultInfo<Administrator> findUser(@RequestBody Administrator coreUser) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) currentUser;
		JwtUser currentUser1 = (JwtUser) token.getPrincipal();
		coreUser.setCurrentUser(currentUser1);
		return administratorService.findUser(coreUser);
	}

	@RequestMapping(value="/batchDelete")
	public ResultInfo<Administrator> batchDelete(@RequestBody Administrator linked) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)currentUser;
		JwtUser currentUser1 =(JwtUser)token.getPrincipal();
		linked.setCurrentUser(currentUser1);
		return administratorService.batchDelete(linked);
	}

}
