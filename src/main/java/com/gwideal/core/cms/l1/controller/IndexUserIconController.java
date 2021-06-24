
package com.gwideal.core.cms.l1.controller;

import com.gwideal.core.cms.l2.service.IndexUserIconService;
import com.gwideal.core.cms.l4.entity.IndexUserIcon;
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
import java.util.List;

@RestController
@RequestMapping("/indexUserIcon")
public class IndexUserIconController {

	@Autowired
	IndexUserIconService indexUserIconService;

	@RequestMapping("/init")
	public ResultInfo<IndexUserIcon> init(String initType) {
		ResultInfo<IndexUserIcon> result = new ResultInfo<IndexUserIcon>();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)SecurityContextHolder.getContext().getAuthentication();
		JwtUser currentUser =(JwtUser)token.getPrincipal();
		IndexUserIcon initBean = null;
		if(initType.equals("create")){
			initBean = new IndexUserIcon();
		}else if(initType.equals("query")){
			initBean = new IndexUserIcon();
		}
		result.setBean(initBean);
		return result;
	}


	@RequestMapping("/create")
	public ResultInfo<IndexUserIcon> create(@RequestBody @Validated(value={Default.class}) IndexUserIcon indexUserIcon,BindingResult bindingResult) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)currentUser;
		JwtUser currentUser1 =(JwtUser)token.getPrincipal();
		indexUserIcon.setCurrentUser(currentUser1);
		ResultInfo<IndexUserIcon> result = new ResultInfo<IndexUserIcon>();
		if(bindingResult.hasErrors()){
			result.setResultType("validationError");
			for(FieldError fe:bindingResult.getFieldErrors()){
				result.getErrors().put(fe.getField(), fe.getDefaultMessage());
			}
			return result;
		}
		if(indexUserIconService.create(indexUserIcon)>0){
			result.setResultType("success");
			result.setBean(indexUserIcon);
			result.setBeanId(indexUserIcon.getId());
			result.setMessage("创建成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("创建失败");	
		}
		return result;
	}
	
	@RequestMapping(value="/read/{id}")
	public ResultInfo<IndexUserIcon> read(@PathVariable(name="id") BigDecimal id) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<IndexUserIcon> result = new ResultInfo<IndexUserIcon>();
		IndexUserIcon bean = indexUserIconService.read(id);
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
	public ResultInfo<IndexUserIcon> update(@RequestBody @Validated(value={Default.class}) IndexUserIcon indexUserIcon,BindingResult bindingResult) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<IndexUserIcon> result = new ResultInfo<IndexUserIcon>();
		if(bindingResult.hasErrors()){
			result.setResultType("validationError");
			for(FieldError fe:bindingResult.getFieldErrors()){
				result.getErrors().put(fe.getField(), fe.getDefaultMessage());
			}
			return result;
		}
		if(indexUserIconService.update(indexUserIcon)>0){
			result.setResultType("success");
			result.setMessage("更新成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("更新失败");	
		}
		return result;
	}
	
	@RequestMapping(value="/delete/{id}")
	public ResultInfo<IndexUserIcon> delete(@PathVariable(name="id") BigDecimal id) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<IndexUserIcon> result = new ResultInfo<IndexUserIcon>();
		if(indexUserIconService.delete(id)>0){
			result.setResultType("success");
			result.setMessage("删除成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("删除失败");	
		}
		return result;
	}
	
	@RequestMapping(value="/list")
	public ResultInfo<IndexUserIcon> list(@RequestBody IndexUserIcon indexUserIcon) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)currentUser;
		JwtUser currentUser1 =(JwtUser)token.getPrincipal();
		indexUserIcon.setCurrentUser(currentUser1);
		return indexUserIconService.list(indexUserIcon);
	}

	@RequestMapping(value="/saveconfig")
	public ResultInfo<IndexUserIcon> saveconfig(@RequestBody List<IndexUserIcon> indexUserIconList) {
		return indexUserIconService.saveconfig(indexUserIconList);
	}

}
