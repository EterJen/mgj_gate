
package com.gwideal.core.basic.l1.controller;
import com.gwideal.core.basic.l2.service.CoreRoleService;
import com.gwideal.core.basic.l4.entity.CoreRole;
import com.gwideal.core.cms.l4.entity.Administrator;
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
@RequestMapping("/coreRole")
public class CoreRoleController {

	@Autowired
	CoreRoleService coreRoleService;

	@RequestMapping("/init")
	public ResultInfo<CoreRole> init(String initType) {
		ResultInfo<CoreRole> result = new ResultInfo<CoreRole>();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)SecurityContextHolder.getContext().getAuthentication();
		JwtUser currentUser =(JwtUser)token.getPrincipal();
		CoreRole initBean = null;
		if(initType.equals("create")){
			initBean = new CoreRole();
		}else if(initType.equals("query")){
			initBean = new CoreRole();
		}
		result.setBean(initBean);
		return result;
	}


	@RequestMapping("/create")
	public ResultInfo<CoreRole> create(@RequestBody @Validated(value={Default.class}) CoreRole coreRole,BindingResult bindingResult) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<CoreRole> result = new ResultInfo<CoreRole>();
		if(bindingResult.hasErrors()){
			result.setResultType("validationError");
			for(FieldError fe:bindingResult.getFieldErrors()){
				result.getErrors().put(fe.getField(), fe.getDefaultMessage());
			}
			return result;
		}
		coreRole.setShowAble(BigDecimal.ONE);
		if(coreRoleService.searchRoleByName(coreRole).getTotalRows()>0){
			result.setResultType("fail");
			result.setMessage("角色“"+coreRole.getName()+"”已经存在，创建失败");	
			return result;
		}
		if(coreRoleService.create(coreRole)>0){
			result.setResultType("success");
			result.setBeanId(coreRole.getId());
			result.setMessage("创建成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("创建失败");	
		}
		return result;
	}
	
	@RequestMapping(value="/read/{id}")
	public ResultInfo<CoreRole> read(@PathVariable(name="id") BigDecimal id) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<CoreRole> result = new ResultInfo<CoreRole>();
		CoreRole bean = coreRoleService.read(id);
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

	@RequestMapping(value="/{roleId}/notExistsUsers")
	public ResultInfo<Administrator> notExistsUsers(@PathVariable(name="roleId") BigDecimal roleId) {
		ResultInfo<Administrator> result = new ResultInfo<Administrator>();

		try {
			List<Administrator> users = coreRoleService.notExistsUsers(roleId);
			result.setResultType("success");
			result.setMessage("读取成功");
			result.setBeanList(users);
		} catch (Exception e) {
			e.printStackTrace();
			result.setResultType("fail");
			result.setMessage("Exception:" + e.getCause().getClass() + ":" + e.getCause().getMessage());
		}


		return result;
	}
	
	@RequestMapping(value="/update")
	public ResultInfo<CoreRole> update(@RequestBody @Validated(value={Default.class}) CoreRole coreRole,BindingResult bindingResult) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<CoreRole> result = new ResultInfo<CoreRole>();
		if(bindingResult.hasErrors()){
			result.setResultType("validationError");
			for(FieldError fe:bindingResult.getFieldErrors()){
				result.getErrors().put(fe.getField(), fe.getDefaultMessage());
			}
			return result;
		}
		if(coreRoleService.update(coreRole)>0){
			result.setResultType("success");
			result.setMessage("更新成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("更新失败");	
		}
		return result;
	}
	
	@RequestMapping(value="/delete/{id}")
	public ResultInfo<CoreRole> delete(@PathVariable(name="id") BigDecimal id) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<CoreRole> result = new ResultInfo<CoreRole>();
		if(coreRoleService.delete(id)>0){
			result.setResultType("success");
			result.setMessage("删除成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("删除失败");	
		}
		return result;
	}
	
	
	@RequestMapping(value="/list")
	public ResultInfo<CoreRole> list(@RequestBody CoreRole coreRole) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)currentUser;
		JwtUser currentUser1 =(JwtUser)token.getPrincipal();
		coreRole.setCurrentUser(currentUser1);
		return coreRoleService.list(coreRole);
	}
	
	@RequestMapping(value={"/listTopClick","/roleManage/listTopClick"})
	public ResultInfo<CoreRole> listAll(@RequestBody CoreRole coreRole) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)currentUser;
		JwtUser currentUser1 =(JwtUser)token.getPrincipal();
		coreRole.setCurrentUser(currentUser1);
		//coreRole.setPageSize(20);
		return coreRoleService.listByClickrate(coreRole);
	}
	
	
	

	@RequestMapping(value = "/{id}/users")
    public ResultInfo<Administrator> queryUserByRid(@PathVariable(name = "id") BigDecimal id) {
        //ResultInfo<CoreUser> result = new ResultInfo<CoreUser>();
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) currentUser;
        JwtUser currentUser1 = (JwtUser) token.getPrincipal();
        return coreRoleService.queryUserByRid(id);
    }
	
    @RequestMapping(value="/saveRoleUser")
	public ResultInfo<CoreRole> saveRoleUser(@RequestBody CoreRole coreRole) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)currentUser;
		JwtUser currentUser1 =(JwtUser)token.getPrincipal();
		coreRole.setCurrentUser(currentUser1);
		return coreRoleService.saveRoleUser(coreRole);
	}
    
	@RequestMapping(value="/deleteRoleUser")
	public ResultInfo<CoreRole> deleteRoleUser(@RequestBody CoreRole coreRole) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)currentUser;
		JwtUser currentUser1 =(JwtUser)token.getPrincipal();
		coreRole.setCurrentUser(currentUser1);
		return coreRoleService.deleteRoleUser(coreRole);
	}
	
	@RequestMapping(value="/searchRole/{name}")
	public ResultInfo<CoreRole> searchRoleByName(@PathVariable(name="name") String name) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<CoreRole> result = new ResultInfo<CoreRole>();
		CoreRole role = new CoreRole();
		role.setName(name);
		return coreRoleService.searchRoleByNameLike(role);
	}
}
