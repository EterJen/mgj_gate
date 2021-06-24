
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
@RequestMapping("/relationArticleSimplefile")
public class RelationArticleSimplefileController {

	@Autowired
	RelationArticleSimplefileService relationArticleSimplefileService;

	@RequestMapping("/init")
	public ResultInfo<RelationArticleSimplefile> init(String initType) {
		ResultInfo<RelationArticleSimplefile> result = new ResultInfo<RelationArticleSimplefile>();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)SecurityContextHolder.getContext().getAuthentication();
		JwtUser currentUser =(JwtUser)token.getPrincipal();
		RelationArticleSimplefile initBean = null;
		if(initType.equals("create")){
			initBean = new RelationArticleSimplefile();
		}else if(initType.equals("query")){
			initBean = new RelationArticleSimplefile();
		}
		result.setBean(initBean);
		return result;
	}


	@RequestMapping("/create")
	public ResultInfo<RelationArticleSimplefile> create(@RequestBody @Validated(value={Default.class}) RelationArticleSimplefile relationArticleSimplefile,BindingResult bindingResult) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<RelationArticleSimplefile> result = new ResultInfo<RelationArticleSimplefile>();
		if(bindingResult.hasErrors()){
			result.setResultType("validationError");
			for(FieldError fe:bindingResult.getFieldErrors()){
				result.getErrors().put(fe.getField(), fe.getDefaultMessage());
			}
			return result;
		}
		if(relationArticleSimplefileService.create(relationArticleSimplefile)>0){
			result.setResultType("success");
			result.setBeanId(relationArticleSimplefile.getId());
			result.setMessage("创建成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("创建失败");	
		}
		return result;
	}
	
	@RequestMapping(value="/read/{id}")
	public ResultInfo<RelationArticleSimplefile> read(@PathVariable(name="id") BigDecimal id) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<RelationArticleSimplefile> result = new ResultInfo<RelationArticleSimplefile>();
		RelationArticleSimplefile bean = relationArticleSimplefileService.read(id);
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
	public ResultInfo<RelationArticleSimplefile> update(@RequestBody @Validated(value={Default.class}) RelationArticleSimplefile relationArticleSimplefile,BindingResult bindingResult) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<RelationArticleSimplefile> result = new ResultInfo<RelationArticleSimplefile>();
		if(bindingResult.hasErrors()){
			result.setResultType("validationError");
			for(FieldError fe:bindingResult.getFieldErrors()){
				result.getErrors().put(fe.getField(), fe.getDefaultMessage());
			}
			return result;
		}
		if(relationArticleSimplefileService.update(relationArticleSimplefile)>0){
			result.setResultType("success");
			result.setMessage("更新成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("更新失败");	
		}
		return result;
	}
	
	@RequestMapping(value="/delete/{id}")
	public ResultInfo<RelationArticleSimplefile> delete(@PathVariable(name="id") BigDecimal id) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<RelationArticleSimplefile> result = new ResultInfo<RelationArticleSimplefile>();
		if(relationArticleSimplefileService.delete(id)>0){
			result.setResultType("success");
			result.setMessage("删除成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("删除失败");	
		}
		return result;
	}
	
	@RequestMapping(value="/list")
	public ResultInfo<RelationArticleSimplefile> list(@RequestBody RelationArticleSimplefile relationArticleSimplefile) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)currentUser;
		JwtUser currentUser1 =(JwtUser)token.getPrincipal();
		relationArticleSimplefile.setCurrentUser(currentUser1);
		return relationArticleSimplefileService.list(relationArticleSimplefile);
	}

}
