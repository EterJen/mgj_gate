
package com.gwideal.core.basic.l1.controller;

import com.gwideal.core.basic.l2.service.DicTypeService;
import com.gwideal.core.basic.l4.entity.DicType;
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
@RequestMapping("/dicType")
public class DicTypeController {

	@Autowired
	DicTypeService dicTypeService;

	@RequestMapping("/init")
	public ResultInfo<DicType> init(String initType) {
		ResultInfo<DicType> result = new ResultInfo<DicType>();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)SecurityContextHolder.getContext().getAuthentication();
		JwtUser currentUser =(JwtUser)token.getPrincipal();
		DicType initBean = null;
		if(initType.equals("create")){
			initBean = new DicType();
		}else if(initType.equals("query")){
			initBean = new DicType();
		}
		result.setBean(initBean);
		return result;
	}


	@RequestMapping("/create")
	public ResultInfo<DicType> create(@RequestBody @Validated(value={Default.class}) DicType dicType,BindingResult bindingResult) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<DicType> result = new ResultInfo<DicType>();
		if(bindingResult.hasErrors()){
			result.setResultType("validationError");
			for(FieldError fe:bindingResult.getFieldErrors()){
				result.getErrors().put(fe.getField(), fe.getDefaultMessage());
			}
			return result;
		}
		if(dicTypeService.create(dicType)>0){
			result.setResultType("success");
			result.setBeanId(dicType.getId());
			result.setMessage("创建成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("创建失败");	
		}
		return result;
	}

	@RequestMapping("/createTypItem")
	public ResultInfo<DicType> createTypItem(@RequestBody @Validated(value={Default.class}) DicType dicType,BindingResult bindingResult) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<DicType> result = new ResultInfo<DicType>();
		if(bindingResult.hasErrors()){
			result.setResultType("validationError");
			for(FieldError fe:bindingResult.getFieldErrors()){
				result.getErrors().put(fe.getField(), fe.getDefaultMessage());
			}
			return result;
		}
		if(dicTypeService.createTypItem(dicType)>0){
			result.setResultType("success");
			result.setBeanId(dicType.getId());
			result.setMessage("创建成功");
		}else{
			result.setResultType("fail");
			result.setMessage("创建失败");
		}
		return result;
	}
	
	@RequestMapping(value="/read/{id}")
	public ResultInfo<DicType> read(@PathVariable(name="id") BigDecimal id) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<DicType> result = new ResultInfo<DicType>();
		DicType bean = dicTypeService.read(id);
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

	@RequestMapping(value="/batchChangeOder")
	public ResultInfo<DicType> batchChangeOder(@RequestBody @Validated(value={Default.class}) List<DicType> dicTypes) {
		ResultInfo<DicType> result = new ResultInfo<DicType>();
		dicTypeService.updateBatch(dicTypes,result);
		return result;
	}
	@RequestMapping(value="/update")
	public ResultInfo<DicType> update(@RequestBody @Validated(value={Default.class}) DicType dicType,BindingResult bindingResult) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<DicType> result = new ResultInfo<DicType>();
		if(bindingResult.hasErrors()){
			result.setResultType("validationError");
			for(FieldError fe:bindingResult.getFieldErrors()){
				result.getErrors().put(fe.getField(), fe.getDefaultMessage());
			}
			return result;
		}
		if(dicTypeService.update(dicType)>0){
			result.setResultType("success");
			result.setMessage("更新成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("更新失败");	
		}
		return result;
	}
	
	@RequestMapping(value="/delete/{id}")
	public ResultInfo<DicType> delete(@PathVariable(name="id") BigDecimal id) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<DicType> result = new ResultInfo<DicType>();
		if(dicTypeService.delete(id)>0){
			result.setResultType("success");
			result.setMessage("删除成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("删除失败");	
		}
		return result;
	}
	
	@RequestMapping(value="/list")
	public ResultInfo<DicType> list(@RequestBody DicType dicType) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)currentUser;
		JwtUser currentUser1 =(JwtUser)token.getPrincipal();
		dicType.setCurrentUser(currentUser1);
		return dicTypeService.list(dicType);
	}

	@RequestMapping(value="/queryByModeDicTypeList")
	public ResultInfo<DicType> queryByModeDicTypeList(@RequestBody DicType dicType) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)currentUser;
		JwtUser currentUser1 =(JwtUser)token.getPrincipal();
		dicType.setCurrentUser(currentUser1);
		return dicTypeService.queryByModeDicTypeList(dicType);
	}

	@RequestMapping(value = "/delDts")
	public ResultInfo<String> delDicTypes( @RequestBody List<DicType> dicTypes, BindingResult bindingResult) {
		ResultInfo<String> result = new ResultInfo<>();

		if (bindingResult.hasErrors()) {
			result.setResultType("validationError");
			for (FieldError fe : bindingResult.getFieldErrors()) {
				result.getErrors().put(fe.getField(), fe.getDefaultMessage());
			}
			return result;
		}

		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) currentUser;
		JwtUser currentUser1 = (JwtUser) token.getPrincipal();

		dicTypeService.delDicTypes(dicTypes, result);
		return result;
	}

	@RequestMapping("/getDicTypesByDicModeName/{modeName}")
	public ResultInfo<DicType> getDicTypesByDicModeName(@PathVariable("modeName") String modeName) {
		return dicTypeService.getDicTypesByDicModeName(modeName);
	}

}
