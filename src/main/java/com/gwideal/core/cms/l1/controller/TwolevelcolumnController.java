
package com.gwideal.core.cms.l1.controller;
import com.gwideal.core.cms.l2.service.TwolevelcolumnService;
import com.gwideal.core.cms.l4.entity.Twolevelcolumn;
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
@RequestMapping("/twolevelcolumn")
public class TwolevelcolumnController {

	@Autowired
	TwolevelcolumnService twolevelcolumnService;

	@RequestMapping("/init")
	public ResultInfo<Twolevelcolumn> init(String initType) {
		ResultInfo<Twolevelcolumn> result = new ResultInfo<Twolevelcolumn>();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)SecurityContextHolder.getContext().getAuthentication();
		JwtUser currentUser =(JwtUser)token.getPrincipal();
		Twolevelcolumn initBean = null;
		if(initType.equals("create")){
			initBean = new Twolevelcolumn();
		}else if(initType.equals("query")){
			initBean = new Twolevelcolumn();
		}
		result.setBean(initBean);
		return result;
	}


	@RequestMapping("/create")
	public ResultInfo<Twolevelcolumn> create(@RequestBody @Validated(value={Default.class}) Twolevelcolumn twolevelcolumn,BindingResult bindingResult) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<Twolevelcolumn> result = new ResultInfo<Twolevelcolumn>();
		if(bindingResult.hasErrors()){
			result.setResultType("validationError");
			for(FieldError fe:bindingResult.getFieldErrors()){
				result.getErrors().put(fe.getField(), fe.getDefaultMessage());
			}
			return result;
		}
		if(twolevelcolumnService.create(twolevelcolumn)>0){
			result.setResultType("success");
			result.setBean(twolevelcolumn);
			result.setBeanId(twolevelcolumn.getId());
			result.setMessage("创建成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("创建失败");	
		}
		return result;
	}
	
	@RequestMapping(value="/read/{id}")
	public ResultInfo<Twolevelcolumn> read(@PathVariable(name="id") BigDecimal id) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<Twolevelcolumn> result = new ResultInfo<Twolevelcolumn>();
		Twolevelcolumn bean = twolevelcolumnService.read(id);
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
	public ResultInfo<Twolevelcolumn> update(@RequestBody @Validated(value={Default.class}) Twolevelcolumn twolevelcolumn,BindingResult bindingResult) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<Twolevelcolumn> result = new ResultInfo<Twolevelcolumn>();
		if(bindingResult.hasErrors()){
			result.setResultType("validationError");
			for(FieldError fe:bindingResult.getFieldErrors()){
				result.getErrors().put(fe.getField(), fe.getDefaultMessage());
			}
			return result;
		}
		if(twolevelcolumnService.update(twolevelcolumn)>0){
			result.setResultType("success");
			result.setMessage("更新成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("更新失败");	
		}
		return result;
	}
	
	@RequestMapping(value="/delete/{id}")
	public ResultInfo<Twolevelcolumn> delete(@PathVariable(name="id") BigDecimal id) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<Twolevelcolumn> result = new ResultInfo<Twolevelcolumn>();
		if(twolevelcolumnService.delete(id)>0){
			result.setResultType("success");
			result.setMessage("删除成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("删除失败");	
		}
		return result;
	}
	
	@RequestMapping(value="/list")
	public ResultInfo<Twolevelcolumn> list(@RequestBody Twolevelcolumn twolevelcolumn) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)currentUser;
		JwtUser currentUser1 =(JwtUser)token.getPrincipal();
		twolevelcolumn.setCurrentUser(currentUser1);
		return twolevelcolumnService.list(twolevelcolumn);
	}

	@RequestMapping(value="/findColumns")
	public ResultInfo<Twolevelcolumn> findColumns(@RequestBody Twolevelcolumn twolevelcolumn) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)currentUser;
		JwtUser currentUser1 =(JwtUser)token.getPrincipal();
		twolevelcolumn.setCurrentUser(currentUser1);
		return twolevelcolumnService.findColumns(twolevelcolumn);
	}

}
