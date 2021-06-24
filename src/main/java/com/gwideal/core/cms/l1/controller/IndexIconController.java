
package com.gwideal.core.cms.l1.controller;
import com.gwideal.core.cms.l2.service.IndexIconService;
import com.gwideal.core.cms.l4.entity.IndexIcon;
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
@RequestMapping("/indexIcon")
public class IndexIconController {

	@Autowired
	IndexIconService indexIconService;

	@RequestMapping("/init")
	public ResultInfo<IndexIcon> init(String initType) {
		ResultInfo<IndexIcon> result = new ResultInfo<IndexIcon>();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)SecurityContextHolder.getContext().getAuthentication();
		JwtUser currentUser =(JwtUser)token.getPrincipal();
		IndexIcon initBean = null;
		if(initType.equals("create")){
			initBean = new IndexIcon();
		}else if(initType.equals("query")){
			initBean = new IndexIcon();
		}
		result.setBean(initBean);
		return result;
	}


	@RequestMapping("/create")
	public ResultInfo<IndexIcon> create(@RequestBody @Validated(value={Default.class}) IndexIcon indexIcon,BindingResult bindingResult) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<IndexIcon> result = new ResultInfo<IndexIcon>();
		if(bindingResult.hasErrors()){
			result.setResultType("validationError");
			for(FieldError fe:bindingResult.getFieldErrors()){
				result.getErrors().put(fe.getField(), fe.getDefaultMessage());
			}
			return result;
		}
		if(indexIconService.create(indexIcon)>0){
			result.setResultType("success");
			result.setBeanId(indexIcon.getId());
			result.setMessage("创建成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("创建失败");	
		}
		return result;
	}
	
	@RequestMapping(value="/read/{id}")
	public ResultInfo<IndexIcon> read(@PathVariable(name="id") BigDecimal id) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<IndexIcon> result = new ResultInfo<IndexIcon>();
		IndexIcon bean = indexIconService.read(id);
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
	public ResultInfo<IndexIcon> update(@RequestBody @Validated(value={Default.class}) IndexIcon indexIcon,BindingResult bindingResult) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<IndexIcon> result = new ResultInfo<IndexIcon>();
		if(bindingResult.hasErrors()){
			result.setResultType("validationError");
			for(FieldError fe:bindingResult.getFieldErrors()){
				result.getErrors().put(fe.getField(), fe.getDefaultMessage());
			}
			return result;
		}
		if(indexIconService.update(indexIcon)>0){
			result.setResultType("success");
			result.setMessage("更新成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("更新失败");	
		}
		return result;
	}
	
	@RequestMapping(value="/delete/{id}")
	public ResultInfo<IndexIcon> delete(@PathVariable(name="id") BigDecimal id) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<IndexIcon> result = new ResultInfo<IndexIcon>();
		if(indexIconService.delete(id)>0){
			result.setResultType("success");
			result.setMessage("删除成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("删除失败");	
		}
		return result;
	}
	
	@RequestMapping(value="/list")
	public ResultInfo<IndexIcon> list(@RequestBody IndexIcon indexIcon) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)currentUser;
		JwtUser currentUser1 =(JwtUser)token.getPrincipal();
		indexIcon.setCurrentUser(currentUser1);
		return indexIconService.list(indexIcon);
	}

	@RequestMapping(value="/queryIcons")
	public ResultInfo<IndexIcon> queryIcons(@RequestBody IndexIcon indexIcon) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)currentUser;
		JwtUser currentUser1 =(JwtUser)token.getPrincipal();
		indexIcon.setCurrentUser(currentUser1);
		return indexIconService.queryIcons(indexIcon);
	}

}
