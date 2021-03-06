
package com.gwideal.core.cms.l1.controller;
import com.gwideal.core.cms.l2.service.HyperlinkService;
import com.gwideal.core.cms.l4.entity.Hyperlink;
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
@RequestMapping("/hyperlink")
public class HyperlinkController {

	@Autowired
	HyperlinkService hyperlinkService;

	@RequestMapping("/init")
	public ResultInfo<Hyperlink> init(String initType) {
		ResultInfo<Hyperlink> result = new ResultInfo<Hyperlink>();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)SecurityContextHolder.getContext().getAuthentication();
		JwtUser currentUser =(JwtUser)token.getPrincipal();
		Hyperlink initBean = null;
		if(initType.equals("create")){
			initBean = new Hyperlink();
		}else if(initType.equals("query")){
			initBean = new Hyperlink();
		}
		result.setBean(initBean);
		return result;
	}


	@RequestMapping("/create")
	public ResultInfo<Hyperlink> create(@RequestBody @Validated(value={Default.class}) Hyperlink hyperlink,BindingResult bindingResult) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<Hyperlink> result = new ResultInfo<Hyperlink>();
		if(bindingResult.hasErrors()){
			result.setResultType("validationError");
			for(FieldError fe:bindingResult.getFieldErrors()){
				result.getErrors().put(fe.getField(), fe.getDefaultMessage());
			}
			return result;
		}
		if(hyperlinkService.create(hyperlink)>0){
			result.setResultType("success");
			result.setBeanId(hyperlink.getId());
			result.setMessage("????????????");	
		}else{
			result.setResultType("fail");
			result.setMessage("????????????");	
		}
		return result;
	}
	
	@RequestMapping(value="/read/{id}")
	public ResultInfo<Hyperlink> read(@PathVariable(name="id") BigDecimal id) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<Hyperlink> result = new ResultInfo<Hyperlink>();
		Hyperlink bean = hyperlinkService.read(id);
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
	public ResultInfo<Hyperlink> update(@RequestBody @Validated(value={Default.class}) Hyperlink hyperlink,BindingResult bindingResult) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<Hyperlink> result = new ResultInfo<Hyperlink>();
		if(bindingResult.hasErrors()){
			result.setResultType("validationError");
			for(FieldError fe:bindingResult.getFieldErrors()){
				result.getErrors().put(fe.getField(), fe.getDefaultMessage());
			}
			return result;
		}
		if(hyperlinkService.update(hyperlink)>0){
			result.setResultType("success");
			result.setMessage("????????????");	
		}else{
			result.setResultType("fail");
			result.setMessage("????????????");	
		}
		return result;
	}
	
	@RequestMapping(value="/delete/{id}")
	public ResultInfo<Hyperlink> delete(@PathVariable(name="id") BigDecimal id) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<Hyperlink> result = new ResultInfo<Hyperlink>();
		if(hyperlinkService.delete(id)>0){
			result.setResultType("success");
			result.setMessage("????????????");	
		}else{
			result.setResultType("fail");
			result.setMessage("????????????");	
		}
		return result;
	}
	
	@RequestMapping(value="/list")
	public ResultInfo<Hyperlink> list(@RequestBody Hyperlink hyperlink) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)currentUser;
		JwtUser currentUser1 =(JwtUser)token.getPrincipal();
		hyperlink.setCurrentUser(currentUser1);
		return hyperlinkService.list(hyperlink);
	}

	@RequestMapping(value="/batchDelete")
	public ResultInfo<Hyperlink> batchDelete(@RequestBody Hyperlink hyperlink) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)currentUser;
		JwtUser currentUser1 =(JwtUser)token.getPrincipal();
		hyperlink.setCurrentUser(currentUser1);
		return hyperlinkService.batchDelete(hyperlink);
	}

}
