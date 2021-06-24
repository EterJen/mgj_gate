
package com.gwideal.core.basic.l1.controller;

import com.gwideal.core.basic.l2.service.DicModeService;
import com.gwideal.core.basic.l4.entity.DicMode;
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
import java.util.Map;

@RestController
@RequestMapping("/dicMode")
public class DicModeController {

    @Autowired
    DicModeService dicModeService;


    @RequestMapping(value = "/{id}/dicTypes")
    public ResultInfo<DicType> queryDicTypes(@PathVariable(name = "id") BigDecimal id, @RequestBody DicType queryBean, BindingResult bindingResult) {
        ResultInfo<DicType> result = new ResultInfo<>();

        if (bindingResult.hasErrors()) {
            result.setResultType("validationError");
            for (FieldError fe : bindingResult.getFieldErrors()) {
                result.getErrors().put(fe.getField(), fe.getDefaultMessage());
            }
            return result;
        }

        UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        JwtUser currentUser = (JwtUser) token.getPrincipal();

        dicModeService.queryDicTypes(result, id, queryBean);

        return result;
    }


    @RequestMapping(value = "/basisSettingTree")
    public ResultInfo<DicType> basisSettingTree() {
        ResultInfo<DicType> resultInfo = new ResultInfo<>();

        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) currentUser;
        JwtUser jwtUser = (JwtUser) token.getPrincipal();

        List<DicType> list=  dicModeService.basisSettingTree(jwtUser.getCoreUser());

        if (!list.isEmpty()) {
            resultInfo.setResultType("success");
            resultInfo.setMessage("基础配置树请求成功");
            resultInfo.setBeanList(list);
        } else {
            resultInfo.setResultType("noAuth");
            resultInfo.setMessage("基础配置树请求成功");
        }

        return resultInfo;
    }

    @RequestMapping(value = "qTypesByModeName/{modelName}")
    public ResultInfo<DicType> qTypesByModeName(@PathVariable(name = "modelName") String modelName) {
        ResultInfo<DicType> result = new ResultInfo<>();

        UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        JwtUser currentUser = (JwtUser) token.getPrincipal();

        DicMode dicMode = new DicMode();
        DicType dicType = new DicType();

        dicMode.setDictype(modelName);
        dicType.setPaging("No");

        dicModeService.queryDicTypes(result, dicMode, dicType);

        return result;
    }

    @RequestMapping(value = "/querybyArray")
    public ResultInfo<DicMode> querybyArray(@RequestBody List<DicMode> dicModes) {
        ResultInfo<DicMode> result = new ResultInfo<>();
        Map<String, Object> dicTypeMap = dicModeService.queryDicModes(dicModes);

        if (null != dicTypeMap && !dicTypeMap.isEmpty()) {
            result.setResultType("success");
            result.setAdditionalInfo(dicTypeMap);
        } else {
            result.setResultType("error");
        }


        return result;
    }

    @RequestMapping("/init")
    public ResultInfo<DicMode> init(String initType) {
        ResultInfo<DicMode> result = new ResultInfo<DicMode>();
        UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        JwtUser currentUser = (JwtUser) token.getPrincipal();
        DicMode initBean = null;
        if (initType.equals("create")) {
            initBean = new DicMode();
        } else if (initType.equals("query")) {
            initBean = new DicMode();
        }
        result.setBean(initBean);
        return result;
    }


    @RequestMapping("/create")
    public ResultInfo<DicMode> create(@RequestBody @Validated(value = {Default.class}) DicMode dicMode, BindingResult bindingResult) {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        ResultInfo<DicMode> result = new ResultInfo<DicMode>();
        if (bindingResult.hasErrors()) {
            result.setResultType("validationError");
            for (FieldError fe : bindingResult.getFieldErrors()) {
                result.getErrors().put(fe.getField(), fe.getDefaultMessage());
            }
            return result;
        }
        if (dicModeService.create(dicMode) > 0) {
            result.setResultType("success");
            result.setBeanId(dicMode.getId());
            result.setMessage("创建成功");
        } else {
            result.setResultType("fail");
            result.setMessage("创建失败");
        }
        return result;
    }

    @RequestMapping(value = "/read/{id}")
    public ResultInfo<DicMode> read(@PathVariable(name = "id") BigDecimal id) {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        ResultInfo<DicMode> result = new ResultInfo<DicMode>();
        DicMode bean = dicModeService.read(id);
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
    public ResultInfo<DicMode> update(@RequestBody @Validated(value = {Default.class}) DicMode dicMode, BindingResult bindingResult) {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        ResultInfo<DicMode> result = new ResultInfo<DicMode>();
        if (bindingResult.hasErrors()) {
            result.setResultType("validationError");
            for (FieldError fe : bindingResult.getFieldErrors()) {
                result.getErrors().put(fe.getField(), fe.getDefaultMessage());
            }
            return result;
        }
        if (dicModeService.update(dicMode) > 0) {
            result.setResultType("success");
            result.setMessage("更新成功");
        } else {
            result.setResultType("fail");
            result.setMessage("更新失败");
        }
        return result;
    }

    @RequestMapping(value = "/delete/{id}")
    public ResultInfo<DicMode> delete(@PathVariable(name = "id") BigDecimal id) {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        ResultInfo<DicMode> result = new ResultInfo<DicMode>();
        if (dicModeService.delete(id) > 0) {
            result.setResultType("success");
            result.setMessage("删除成功");
        } else {
            result.setResultType("fail");
            result.setMessage("删除失败");
        }
        return result;
    }

    @RequestMapping(value = "/list")
    public ResultInfo<DicMode> list(@RequestBody DicMode dicMode) {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) currentUser;
        JwtUser currentUser1 = (JwtUser) token.getPrincipal();
        dicMode.setCurrentUser(currentUser1);
        return dicModeService.list(dicMode);
    }

    @RequestMapping(value = "/findDicMod")
    public ResultInfo<DicMode> findDicMod(@RequestBody DicMode dicMode) {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) currentUser;
        JwtUser currentUser1 = (JwtUser) token.getPrincipal();
        dicMode.setCurrentUser(currentUser1);
        return dicModeService.findDicMod(dicMode);
    }


}
