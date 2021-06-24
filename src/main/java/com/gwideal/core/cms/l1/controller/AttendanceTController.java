
package com.gwideal.core.cms.l1.controller;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.groups.Default;

import org.apache.commons.lang3.StringUtils;
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
@RequestMapping("/attendanceT")
public class AttendanceTController {

	@Autowired
	AttendanceTService attendanceTService;

	@RequestMapping("/init")
	public ResultInfo<AttendanceT> init(String initType) {
		ResultInfo<AttendanceT> result = new ResultInfo<AttendanceT>();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)SecurityContextHolder.getContext().getAuthentication();
		JwtUser currentUser =(JwtUser)token.getPrincipal();
		AttendanceT initBean = null;
		if(initType.equals("create")){
			initBean = new AttendanceT();
		}else if(initType.equals("query")){
			initBean = new AttendanceT();
		}
		result.setBean(initBean);
		return result;
	}


	@RequestMapping("/initData")
	public ResultInfo<AttendanceT> initData(@RequestBody AttendanceT queryBean) {
		return attendanceTService.initData(queryBean);
	}

	@RequestMapping("/inits")
	public ResultInfo<AttendanceT> inits(@RequestBody @Validated(value={Default.class}) AttendanceT attendanceT,BindingResult bindingResult) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<AttendanceT> result = new ResultInfo<AttendanceT>();
		if(bindingResult.hasErrors()){
			result.setResultType("validationError");
			for(FieldError fe:bindingResult.getFieldErrors()){
				result.getErrors().put(fe.getField(), fe.getDefaultMessage());
			}
			return result;
		}

		ResultInfo<AttendanceT> one = attendanceTService.getOne(attendanceT);
		if(null != one.getBean()){
			result.setResultType("success");
		}else{
			attendanceTService.createAndRef(attendanceT);
			result.setResultType("success");
		}
		return result;
	}


	@RequestMapping("/create")
	public ResultInfo<AttendanceT> create(@RequestBody @Validated(value={Default.class}) AttendanceT attendanceT,BindingResult bindingResult) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<AttendanceT> result = new ResultInfo<AttendanceT>();
		if(bindingResult.hasErrors()){
			result.setResultType("validationError");
			for(FieldError fe:bindingResult.getFieldErrors()){
				result.getErrors().put(fe.getField(), fe.getDefaultMessage());
			}
			return result;
		}
		if(null == attendanceT.getId()){
			if(attendanceTService.create(attendanceT)>0){
				result.setResultType("success");
				result.setBeanId(attendanceT.getId());
				result.setMessage("创建成功");
			}else{
				result.setResultType("fail");
				result.setMessage("创建失败");
			}
		}else{
			if(attendanceTService.update(attendanceT)>0){
				result.setResultType("success");
				result.setMessage("更新成功");
			}else{
				result.setResultType("fail");
				result.setMessage("更新失败");
			}
		}
		return result;
	}

	@RequestMapping("/createList")
	public ResultInfo<AttendanceT> createList(@RequestBody @Validated(value={Default.class}) List<AttendanceT> attendanceTList, BindingResult bindingResult) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<AttendanceT> result = new ResultInfo<AttendanceT>();
		if(bindingResult.hasErrors()){
			result.setResultType("validationError");
			for(FieldError fe:bindingResult.getFieldErrors()){
				result.getErrors().put(fe.getField(), fe.getDefaultMessage());
			}
			return result;
		}
		if(attendanceTService.updateList(attendanceTList)>0){
			result.setResultType("success");
			result.setMessage("更新成功");
		}else{
			result.setResultType("fail");
			result.setMessage("更新失败");
		}
		return result;
	}


	
	@RequestMapping(value="/read/{id}")
	public ResultInfo<AttendanceT> read(@PathVariable(name="id") BigDecimal id) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<AttendanceT> result = new ResultInfo<AttendanceT>();
		AttendanceT bean = attendanceTService.read(id);
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
	@RequestMapping(value="/upSend")
	public ResultInfo<AttendanceT> upSend(@RequestBody @Validated(value={Default.class}) AttendanceT attendanceT,BindingResult bindingResult) {
		ResultInfo<AttendanceT> result = new ResultInfo<AttendanceT>();

		attendanceTService.upSend(attendanceT);
		result.setResultType("success");
		result.setMessage("更新成功");
		return result;
	}
	@RequestMapping(value="/update")
	public ResultInfo<AttendanceT> update(@RequestBody @Validated(value={Default.class}) AttendanceT attendanceT,BindingResult bindingResult) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<AttendanceT> result = new ResultInfo<AttendanceT>();
		if(bindingResult.hasErrors()){
			result.setResultType("validationError");
			for(FieldError fe:bindingResult.getFieldErrors()){
				result.getErrors().put(fe.getField(), fe.getDefaultMessage());
			}
			return result;
		}
		if(attendanceTService.update(attendanceT)>0){
			result.setResultType("success");
			result.setMessage("更新成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("更新失败");	
		}
		return result;
	}
	
	@RequestMapping(value="/delete/{id}")
	public ResultInfo<AttendanceT> delete(@PathVariable(name="id") BigDecimal id) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<AttendanceT> result = new ResultInfo<AttendanceT>();
		if(attendanceTService.delete(id)>0){
			result.setResultType("success");
			result.setMessage("删除成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("删除失败");	
		}
		return result;
	}
	
	@RequestMapping(value="/list")
	public ResultInfo<AttendanceT> list(@RequestBody AttendanceT attendanceT) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)currentUser;
		JwtUser currentUser1 =(JwtUser)token.getPrincipal();
		attendanceT.setCurrentUser(currentUser1);
		return attendanceTService.list(attendanceT);
	}

	@RequestMapping(value="/getOne")
	public ResultInfo<AttendanceT> getOne(@RequestBody AttendanceT attendanceT) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)currentUser;
		JwtUser currentUser1 =(JwtUser)token.getPrincipal();
		attendanceT.setCurrentUser(currentUser1);
		return attendanceTService.getOne(attendanceT);
	}

	@RequestMapping(value="/getMore")
	public ResultInfo<AttendanceT> getMore(@RequestBody AttendanceT attendanceT) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)currentUser;
		JwtUser currentUser1 =(JwtUser)token.getPrincipal();
		attendanceT.setCurrentUser(currentUser1);
		return attendanceTService.getMore(attendanceT);
	}

	@RequestMapping(value = "/export")
	public void export(HttpServletRequest request, HttpServletResponse response){
		String attendanceRefId = request.getParameter("attendanceRefId");
		attendanceTService.export(attendanceRefId,request, response);
	}

    @RequestMapping(value = "/exportAll")
    public void exportAll(HttpServletRequest request, HttpServletResponse response){
        String attendanceRefId = request.getParameter("attendanceRefId");
        attendanceTService.exportAll(attendanceRefId,request, response);
    }
}
