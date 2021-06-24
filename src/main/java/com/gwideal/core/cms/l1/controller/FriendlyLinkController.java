
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
@RequestMapping("/friendlyLink")
public class FriendlyLinkController {

	@Autowired
	FriendlyLinkService friendlyLinkService;

	@RequestMapping("/init")
	public ResultInfo<FriendlyLink> init(String initType) {
		ResultInfo<FriendlyLink> result = new ResultInfo<FriendlyLink>();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)SecurityContextHolder.getContext().getAuthentication();
		JwtUser currentUser =(JwtUser)token.getPrincipal();
		FriendlyLink initBean = null;
		if(initType.equals("create")){
			initBean = new FriendlyLink();
		}else if(initType.equals("query")){
			initBean = new FriendlyLink();
		}
		result.setBean(initBean);
		return result;
	}


	@RequestMapping("/create")
	public ResultInfo<FriendlyLink> create(@RequestBody @Validated(value={Default.class}) FriendlyLink friendlyLink,BindingResult bindingResult) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<FriendlyLink> result = new ResultInfo<FriendlyLink>();
		if(bindingResult.hasErrors()){
			result.setResultType("validationError");
			for(FieldError fe:bindingResult.getFieldErrors()){
				result.getErrors().put(fe.getField(), fe.getDefaultMessage());
			}
			return result;
		}
		if(friendlyLinkService.create(friendlyLink)>0){
			result.setResultType("success");
			result.setBeanId(friendlyLink.getId());
			result.setMessage("创建成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("创建失败");	
		}
		return result;
	}
	
	@RequestMapping(value="/read/{id}")
	public ResultInfo<FriendlyLink> read(@PathVariable(name="id") BigDecimal id) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<FriendlyLink> result = new ResultInfo<FriendlyLink>();
		FriendlyLink bean = friendlyLinkService.read(id);
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
	public ResultInfo<FriendlyLink> updateBatch(@RequestBody @Validated(value={Default.class}) List<FriendlyLink> friendlyLinks) {
		return friendlyLinkService.sortUpdateBatch(friendlyLinks);
	}
	@RequestMapping(value="/batchDel")
	public ResultInfo<FriendlyLink> batchDel(@RequestBody @Validated(value={Default.class}) List<FriendlyLink> friendlyLinks) {
		return friendlyLinkService.batchDel(friendlyLinks);
	}
	@RequestMapping(value="/update")
	public ResultInfo<FriendlyLink> update(@RequestBody @Validated(value={Default.class}) FriendlyLink friendlyLink,BindingResult bindingResult) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<FriendlyLink> result = new ResultInfo<FriendlyLink>();
		if(bindingResult.hasErrors()){
			result.setResultType("validationError");
			for(FieldError fe:bindingResult.getFieldErrors()){
				result.getErrors().put(fe.getField(), fe.getDefaultMessage());
			}
			return result;
		}
		if(friendlyLinkService.update(friendlyLink)>0){
			result.setResultType("success");
			result.setMessage("更新成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("更新失败");	
		}
		return result;
	}
	
	@RequestMapping(value="/delete/{id}")
	public ResultInfo<FriendlyLink> delete(@PathVariable(name="id") BigDecimal id) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<FriendlyLink> result = new ResultInfo<FriendlyLink>();
		if(friendlyLinkService.delete(id)>0){
			result.setResultType("success");
			result.setMessage("删除成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("删除失败");	
		}
		return result;
	}
	
	@RequestMapping(value="/list")
	public ResultInfo<FriendlyLink> list(@RequestBody FriendlyLink friendlyLink) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)currentUser;
		JwtUser currentUser1 =(JwtUser)token.getPrincipal();
		friendlyLink.setCurrentUser(currentUser1);
		return friendlyLinkService.list(friendlyLink);
	}

}
