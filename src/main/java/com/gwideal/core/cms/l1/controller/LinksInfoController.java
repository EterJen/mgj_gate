
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
import java.util.List;

@RestController
@RequestMapping("/linksInfo")
public class LinksInfoController {

	@Autowired
	LinksInfoService linksInfoService;

	@RequestMapping("/init")
	public ResultInfo<LinksInfo> init(String initType) {
		ResultInfo<LinksInfo> result = new ResultInfo<LinksInfo>();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)SecurityContextHolder.getContext().getAuthentication();
		JwtUser currentUser =(JwtUser)token.getPrincipal();
		LinksInfo initBean = null;
		if(initType.equals("create")){
			initBean = new LinksInfo();
		}else if(initType.equals("query")){
			initBean = new LinksInfo();
		}
		result.setBean(initBean);
		return result;
	}


	@RequestMapping("/create")
	public ResultInfo<LinksInfo> create(@RequestBody @Validated(value={Default.class}) LinksInfo LinksInfo,BindingResult bindingResult) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<LinksInfo> result = new ResultInfo<LinksInfo>();
		if(bindingResult.hasErrors()){
			result.setResultType("validationError");
			for(FieldError fe:bindingResult.getFieldErrors()){
				result.getErrors().put(fe.getField(), fe.getDefaultMessage());
			}
			return result;
		}
		if(linksInfoService.create(LinksInfo)>0){
			result.setResultType("success");
			result.setBeanId(LinksInfo.getId());
			result.setMessage("创建成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("创建失败");	
		}
		return result;
	}
	
	@RequestMapping(value="/read/{id}")
	public ResultInfo<LinksInfo> read(@PathVariable(name="id") BigDecimal id) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<LinksInfo> result = new ResultInfo<LinksInfo>();
		LinksInfo bean = linksInfoService.read(id);
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
	@RequestMapping(value="/sortUpdateBatch")
	public ResultInfo<LinksInfo> updateBatch(@RequestBody @Validated(value={Default.class}) List<LinksInfo> LinksInfos) {
		return linksInfoService.sortUpdateBatch(LinksInfos);
	}
	@RequestMapping(value="/batchDel")
	public ResultInfo<LinksInfo> batchDel(@RequestBody @Validated(value={Default.class}) List<LinksInfo> LinksInfos) {
		return linksInfoService.batchDel(LinksInfos);
	}
	@RequestMapping(value="/update")
	public ResultInfo<LinksInfo> update(@RequestBody @Validated(value={Default.class}) LinksInfo LinksInfo,BindingResult bindingResult) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<LinksInfo> result = new ResultInfo<LinksInfo>();
		if(bindingResult.hasErrors()){
			result.setResultType("validationError");
			for(FieldError fe:bindingResult.getFieldErrors()){
				result.getErrors().put(fe.getField(), fe.getDefaultMessage());
			}
			return result;
		}
		if(linksInfoService.update(LinksInfo)>0){
			result.setResultType("success");
			result.setMessage("更新成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("更新失败");	
		}
		return result;
	}
	
	@RequestMapping(value="/delete/{id}")
	public ResultInfo<LinksInfo> delete(@PathVariable(name="id") BigDecimal id) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<LinksInfo> result = new ResultInfo<LinksInfo>();
		if(linksInfoService.delete(id)>0){
			result.setResultType("success");
			result.setMessage("删除成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("删除失败");	
		}
		return result;
	}

	@RequestMapping(value = {"/trustedRequest/list", "/list"})
	public ResultInfo<LinksInfo> list(@RequestBody LinksInfo LinksInfo) {
		return linksInfoService.list(LinksInfo);
	}

}
