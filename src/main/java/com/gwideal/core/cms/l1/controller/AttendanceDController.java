
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
@RequestMapping("/attendanceD")
public class AttendanceDController {

	@Autowired
	AttendanceDService attendanceDService;

	@RequestMapping("/init")
	public ResultInfo<AttendanceD> init(String initType) {
		ResultInfo<AttendanceD> result = new ResultInfo<AttendanceD>();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)SecurityContextHolder.getContext().getAuthentication();
		JwtUser currentUser =(JwtUser)token.getPrincipal();
		AttendanceD initBean = null;
		if(initType.equals("create")){
			initBean = new AttendanceD();
		}else if(initType.equals("query")){
			initBean = new AttendanceD();
		}
		result.setBean(initBean);
		return result;
	}


	@RequestMapping("/create")
	public ResultInfo<AttendanceD> create(@RequestBody @Validated(value={Default.class}) AttendanceD attendanceD,BindingResult bindingResult) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<AttendanceD> result = new ResultInfo<AttendanceD>();
		if(bindingResult.hasErrors()){
			result.setResultType("validationError");
			for(FieldError fe:bindingResult.getFieldErrors()){
				result.getErrors().put(fe.getField(), fe.getDefaultMessage());
			}
			return result;
		}
		if(attendanceDService.create(attendanceD)>0){
			result.setResultType("success");
			result.setBeanId(attendanceD.getId());
			result.setMessage("????????????");	
		}else{
			result.setResultType("fail");
			result.setMessage("????????????");	
		}
		return result;
	}
	
	@RequestMapping(value="/read/{id}")
	public ResultInfo<AttendanceD> read(@PathVariable(name="id") BigDecimal id) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<AttendanceD> result = new ResultInfo<AttendanceD>();
		AttendanceD bean = attendanceDService.read(id);
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
	public ResultInfo<AttendanceD> update(@RequestBody @Validated(value={Default.class}) AttendanceD attendanceD,BindingResult bindingResult) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<AttendanceD> result = new ResultInfo<AttendanceD>();
		if(bindingResult.hasErrors()){
			result.setResultType("validationError");
			for(FieldError fe:bindingResult.getFieldErrors()){
				result.getErrors().put(fe.getField(), fe.getDefaultMessage());
			}
			return result;
		}
		if(attendanceDService.update(attendanceD)>0){
			result.setResultType("success");
			result.setMessage("????????????");	
		}else{
			result.setResultType("fail");
			result.setMessage("????????????");	
		}
		return result;
	}
	
	@RequestMapping(value="/delete/{id}")
	public ResultInfo<AttendanceD> delete(@PathVariable(name="id") BigDecimal id) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<AttendanceD> result = new ResultInfo<AttendanceD>();
		if(attendanceDService.delete(id)>0){
			result.setResultType("success");
			result.setMessage("????????????");	
		}else{
			result.setResultType("fail");
			result.setMessage("????????????");	
		}
		return result;
	}
	
	@RequestMapping(value="/list")
	public ResultInfo<AttendanceD> list(@RequestBody AttendanceD attendanceD) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)currentUser;
		JwtUser currentUser1 =(JwtUser)token.getPrincipal();
		attendanceD.setCurrentUser(currentUser1);
		return attendanceDService.list(attendanceD);
	}

}
