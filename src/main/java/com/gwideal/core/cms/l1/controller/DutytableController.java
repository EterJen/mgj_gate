
package com.gwideal.core.cms.l1.controller;
import com.gwideal.core.cms.l2.service.DutytableService;
import com.gwideal.core.cms.l3.dao.WorkdayMapper;
import com.gwideal.core.cms.l4.entity.Dutyshow;
import com.gwideal.core.cms.l4.entity.Dutytable;
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

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.groups.Default;
import java.math.BigDecimal;
import java.util.Map;


@RestController
@RequestMapping("/dutytable")
public class DutytableController {

	@Autowired
	DutytableService dutytableService;
	
	@Autowired
	WorkdayMapper workdayMapper;
	

	@RequestMapping("/init")
	public ResultInfo<Dutytable> init(String initType) {
		ResultInfo<Dutytable> result = new ResultInfo<Dutytable>();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)SecurityContextHolder.getContext().getAuthentication();
		JwtUser currentUser =(JwtUser)token.getPrincipal();
		Dutytable initBean = null;
		if(initType.equals("create")){
			initBean = new Dutytable();
		}else if(initType.equals("query")){
			initBean = new Dutytable();
		}
		result.setBean(initBean);
		return result;
	}


	@RequestMapping("/create")
	public ResultInfo<Dutytable> create(@RequestBody @Validated(value={Default.class}) Dutytable dutytable,BindingResult bindingResult) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<Dutytable> result = new ResultInfo<Dutytable>();
		if(bindingResult.hasErrors()){
			result.setResultType("validationError");
			for(FieldError fe:bindingResult.getFieldErrors()){
				result.getErrors().put(fe.getField(), fe.getDefaultMessage());
			}
			return result;
		}
		if(dutytableService.create(dutytable)>0){
			result.setResultType("success");
			result.setBeanId(dutytable.getId());
			result.setMessage("创建成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("创建失败");	
		}
		return result;
	}
	
	@RequestMapping(value="/read/{id}")
	public ResultInfo<Dutytable> read(@PathVariable(name="id") BigDecimal id) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<Dutytable> result = new ResultInfo<Dutytable>();
		Dutytable bean = dutytableService.read(id);
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
	public ResultInfo<Dutytable> update(@RequestBody @Validated(value={Default.class}) Dutytable dutytable,BindingResult bindingResult) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<Dutytable> result = new ResultInfo<Dutytable>();
		if(bindingResult.hasErrors()){
			result.setResultType("validationError");
			for(FieldError fe:bindingResult.getFieldErrors()){
				result.getErrors().put(fe.getField(), fe.getDefaultMessage());
			}
			return result;
		}
		if(dutytableService.update(dutytable)>0){
			result.setResultType("success");
			result.setMessage("更新成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("更新失败");	
		}
		return result;
	}
	
	@RequestMapping(value="/delete/{id}")
	public ResultInfo<Dutytable> delete(@PathVariable(name="id") BigDecimal id) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<Dutytable> result = new ResultInfo<Dutytable>();
		if(dutytableService.delete(id)>0){
			result.setResultType("success");
			result.setMessage("删除成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("删除失败");	
		}
		return result;
	}
	
	@RequestMapping(value="/list")
	public ResultInfo<Dutytable> list(@RequestBody Dutytable dutytable) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)currentUser;
		JwtUser currentUser1 =(JwtUser)token.getPrincipal();
		dutytable.setCurrentUser(currentUser1);
		return dutytableService.list(dutytable);
	}

	@RequestMapping(value="/queryMonth")
	public ResultInfo<Dutytable> queryMonth(@RequestBody Dutytable dutytable) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)currentUser;
		JwtUser currentUser1 =(JwtUser)token.getPrincipal();
		dutytable.setCurrentUser(currentUser1);
		return dutytableService.queryMonth(dutytable);
	}
	
	@RequestMapping(value="/showMonth")
	public ResultInfo<Dutyshow> showMonth(@RequestBody Dutytable dutytable) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)currentUser;
		JwtUser currentUser1 =(JwtUser)token.getPrincipal();
		dutytable.setCurrentUser(currentUser1);
		return dutytableService.showMonth(dutytable);
	}

	
	@RequestMapping(value="/updateUsers")
	public ResultInfo<Dutytable> updateUsers(@RequestBody @Validated(value={Default.class}) Dutytable dutytable,BindingResult bindingResult) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<Dutytable> result = new ResultInfo<Dutytable>();
		if(bindingResult.hasErrors()){
			result.setResultType("validationError");
			for(FieldError fe:bindingResult.getFieldErrors()){
				result.getErrors().put(fe.getField(), fe.getDefaultMessage());
			}
			return result;
		}
		
		return dutytableService.updateUsers(dutytable);
		
	}
	
	@RequestMapping(value="/updateUsersTxbw")
	public ResultInfo<Dutytable> updateUsersTxbw(@RequestBody @Validated(value={Default.class}) Dutytable dutytable,BindingResult bindingResult) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<Dutytable> result = new ResultInfo<Dutytable>();
		if(bindingResult.hasErrors()){
			result.setResultType("validationError");
			for(FieldError fe:bindingResult.getFieldErrors()){
				result.getErrors().put(fe.getField(), fe.getDefaultMessage());
			}
			return result;
		}
		if("2".equals(dutytable.getInitType())){
			return dutytableService.updateUsersTxbw(dutytable, "2");
		}else{
			return dutytableService.updateUsersTxbw(dutytable, "3");
		}
	}

	@RequestMapping(value="/deleteUser")
	public ResultInfo<Dutytable> deleteUser(@RequestBody @Validated(value={Default.class}) Dutytable dutytable,BindingResult bindingResult) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<Dutytable> result = new ResultInfo<Dutytable>();
		if(bindingResult.hasErrors()){
			result.setResultType("validationError");
			for(FieldError fe:bindingResult.getFieldErrors()){
				result.getErrors().put(fe.getField(), fe.getDefaultMessage());
			}
			return result;
		}
		
		return dutytableService.deleteUser(dutytable);
		
	}
	
	@RequestMapping(value="/exportMonth")
	public void  exportMonth(HttpServletRequest request, HttpServletResponse response){
		String startdate=request.getParameter("datelong");
		dutytableService.exportMonth(startdate, request, response);    
	}
	
	@RequestMapping(value="/exportMonthTxbw")
	public void  exportMonthTxbw(HttpServletRequest request, HttpServletResponse response){
		String startdate=request.getParameter("datelong");
		dutytableService.exportMonthTxbw(startdate, request, response);    
	}

}
