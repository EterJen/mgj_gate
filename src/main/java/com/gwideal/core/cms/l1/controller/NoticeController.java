
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
@RequestMapping("/notice")
public class NoticeController {

	@Autowired
	NoticeService noticeService;

	@RequestMapping("/init")
	public ResultInfo<Notice> init(String initType) {
		ResultInfo<Notice> result = new ResultInfo<Notice>();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)SecurityContextHolder.getContext().getAuthentication();
		JwtUser currentUser =(JwtUser)token.getPrincipal();
		Notice initBean = null;
		if(initType.equals("create")){
			initBean = new Notice();
		}else if(initType.equals("query")){
			initBean = new Notice();
		}
		result.setBean(initBean);
		return result;
	}


	@RequestMapping("/create")
	public ResultInfo<Notice> create(@RequestBody @Validated(value={Default.class}) Notice notice,BindingResult bindingResult) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<Notice> result = new ResultInfo<Notice>();
		if(bindingResult.hasErrors()){
			result.setResultType("validationError");
			for(FieldError fe:bindingResult.getFieldErrors()){
				result.getErrors().put(fe.getField(), fe.getDefaultMessage());
			}
			return result;
		}
		if(noticeService.create(notice)>0){
			result.setResultType("success");
			result.setBeanId(notice.getId());
			result.setMessage("创建成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("创建失败");	
		}
		return result;
	}
	
	@RequestMapping(value="/read/{id}")
	public ResultInfo<Notice> read(@PathVariable(name="id") BigDecimal id) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<Notice> result = new ResultInfo<Notice>();
		Notice bean = noticeService.read(id);
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
	public ResultInfo<Notice> update(@RequestBody @Validated(value={Default.class}) Notice notice,BindingResult bindingResult) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<Notice> result = new ResultInfo<Notice>();
		if(bindingResult.hasErrors()){
			result.setResultType("validationError");
			for(FieldError fe:bindingResult.getFieldErrors()){
				result.getErrors().put(fe.getField(), fe.getDefaultMessage());
			}
			return result;
		}
		if(noticeService.update(notice)>0){
			result.setResultType("success");
			result.setMessage("更新成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("更新失败");	
		}
		return result;
	}
	
	@RequestMapping(value="/delete/{id}")
	public ResultInfo<Notice> delete(@PathVariable(name="id") BigDecimal id) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<Notice> result = new ResultInfo<Notice>();
		if(noticeService.delete(id)>0){
			result.setResultType("success");
			result.setMessage("删除成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("删除失败");	
		}
		return result;
	}
	
	@RequestMapping(value="/list")
	public ResultInfo<Notice> list(@RequestBody Notice notice) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)currentUser;
		JwtUser currentUser1 =(JwtUser)token.getPrincipal();
		notice.setCurrentUser(currentUser1);
		return noticeService.list(notice);
	}

}
