
package com.gwideal.core.basic.l1.controller;

import com.gwideal.core.basic.l2.service.CoreMpsModuleService;
import com.gwideal.core.basic.l4.entity.CoreMpsModule;
import com.gwideal.core.jwt.JwtUser;
import com.gwideal.mybatis.metautils.ResultInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.groups.Default;
import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/coreMpsModule")
public class CoreMpsModuleController {

    @Autowired
    CoreMpsModuleService coreMpsModuleService;

    @RequestMapping("/init")
    public ResultInfo<CoreMpsModule> init(String initType) {
        ResultInfo<CoreMpsModule> result = new ResultInfo<CoreMpsModule>();
        UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        JwtUser currentUser = (JwtUser) token.getPrincipal();
        CoreMpsModule initBean = null;
        if (initType.equals("create")) {
            initBean = new CoreMpsModule();
        } else if (initType.equals("query")) {
            initBean = new CoreMpsModule();
        }
        result.setBean(initBean);
        return result;
    }


    @RequestMapping("/create")
    public ResultInfo<CoreMpsModule> create(@RequestBody @Validated(value = {Default.class}) CoreMpsModule coreMpsModule, BindingResult bindingResult) {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        ResultInfo<CoreMpsModule> result = new ResultInfo<CoreMpsModule>();
        if (bindingResult.hasErrors()) {
            result.setResultType("validationError");
            for (FieldError fe : bindingResult.getFieldErrors()) {
                result.getErrors().put(fe.getField(), fe.getDefaultMessage());
            }
            return result;
        }
        if (coreMpsModuleService.create(coreMpsModule) > 0) {
            result.setResultType("success");
            result.setBeanId(coreMpsModule.getId());
            result.setMessage("创建成功");
        } else {
            result.setResultType("fail");
            result.setMessage("创建失败");
        }
        return result;
    }

    @RequestMapping(value = "/read/{id}")
    public ResultInfo<CoreMpsModule> read(@PathVariable(name = "id") BigDecimal id) {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        ResultInfo<CoreMpsModule> result = new ResultInfo<CoreMpsModule>();
        CoreMpsModule bean = coreMpsModuleService.read(id);
        if (bean == null) {
            result.setResultType("fail");
            result.setMessage("读取的数据不存在");
        } else {
            result.setResultType("success");
            result.setMessage("读取成功");
            result.setBean(bean);
        }
        return result;
    }


    @RequestMapping(value = "/update")
    public ResultInfo<CoreMpsModule> update(@RequestBody @Validated(value = {Default.class}) CoreMpsModule coreMpsModule, BindingResult bindingResult) {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        ResultInfo<CoreMpsModule> result = new ResultInfo<CoreMpsModule>();
        if (bindingResult.hasErrors()) {
            result.setResultType("validationError");
            for (FieldError fe : bindingResult.getFieldErrors()) {
                result.getErrors().put(fe.getField(), fe.getDefaultMessage());
            }
            return result;
        }
        if (coreMpsModuleService.update(coreMpsModule) > 0) {
            result.setResultType("success");
            result.setMessage("更新成功");
        } else {
            result.setResultType("fail");
            result.setMessage("更新失败");
        }
        return result;
    }

    @RequestMapping(value = "/delete/{id}")
    public ResultInfo<CoreMpsModule> delete(@PathVariable(name = "id") String id) {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        ResultInfo<CoreMpsModule> result = new ResultInfo<CoreMpsModule>();
        if (coreMpsModuleService.delete(id) > 0) {
            result.setResultType("success");
            result.setMessage("删除成功");
        } else {
            result.setResultType("fail");
            result.setMessage("删除失败");
        }
        return result;
    }

    @RequestMapping(value = "/list")
    public ResultInfo<CoreMpsModule> list(@RequestBody CoreMpsModule coreMpsModule) {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) currentUser;
        JwtUser currentUser1 = (JwtUser) token.getPrincipal();
        coreMpsModule.setCurrentUser(currentUser1);
        return coreMpsModuleService.list(coreMpsModule);
    }

    @RequestMapping(value = {"/mpsModuleTree","/moduleAuthManage/mpsModuleTree"})
    public ResultInfo<CoreMpsModule> mpsModuleTree(@RequestBody CoreMpsModule coreMpsModule) {
        //Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        //UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) currentUser;
        //JwtUser currentUser1 = (JwtUser) token.getPrincipal();
        //coreMpsModule.setCurrentUser(currentUser1);
        return coreMpsModuleService.mpsModuleTree(coreMpsModule);
    }

    @RequestMapping(value = {"/moduleAuthManage/queryHavePromiss"})
    public ResultInfo<CoreMpsModule> queryHavePromiss(@RequestBody CoreMpsModule coreMpsModule) {
        return coreMpsModuleService.queryHavePromiss(coreMpsModule);
    }

    @RequestMapping(value = "/userAuthTree/{id}")
    public ResultInfo<CoreMpsModule> userAuthTree(@PathVariable(name = "id") BigDecimal id) {
        ResultInfo<CoreMpsModule> resultInfo = new ResultInfo<>();

        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) currentUser;
        JwtUser jwtUser = (JwtUser) token.getPrincipal();

        List<CoreMpsModule> list=  coreMpsModuleService.createUserAuthTree(jwtUser.getCoreUser());

        if (!list.isEmpty()) {
            resultInfo.setResultType("success");
            resultInfo.setMessage("树形菜单请求成功");
            resultInfo.setBeanList(list);
        } else {
            resultInfo.setResultType("noAuth");
            resultInfo.setMessage("当前用户无任何系统权限,请联系管理员");
        }

        return resultInfo;
    }

    @RequestMapping(value = "/savaMpsModulePermiss")
    public ResultInfo<CoreMpsModule> savaMpsModulePermiss(@RequestBody CoreMpsModule coreMpsModule) {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) currentUser;
        JwtUser currentUser1 = (JwtUser) token.getPrincipal();
        coreMpsModule.setCurrentUser(currentUser1);
        return coreMpsModuleService.savaMpsModulePermiss(coreMpsModule);
    }

    @RequestMapping(value = "/queryUserListByMpsmoduleId")
    public ResultInfo<CoreMpsModule> queryUserListByMpsmoduleId(@RequestBody CoreMpsModule coreMpsModule) {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) currentUser;
        JwtUser currentUser1 = (JwtUser) token.getPrincipal();
        coreMpsModule.setCurrentUser(currentUser1);
        return coreMpsModuleService.queryUserListByMpsmoduleId(coreMpsModule, currentUser1);
    }


    @RequestMapping(value = "/mpsModuleCreatParent", method = RequestMethod.GET)
    public ResultInfo<CoreMpsModule> mpsModuleCreatParent() {
        return coreMpsModuleService.mpsModuleCreatParent();
    }

}
