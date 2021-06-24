
package com.gwideal.core.basic.l1.controller;

import com.gwideal.core.basic.l2.service.DicCategoryService;
import com.gwideal.core.basic.l4.entity.DicCategory;
import com.gwideal.core.basic.l4.entity.DicMode;
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
@RequestMapping("/dicCategory")
public class DicCategoryController {

    @Autowired
    DicCategoryService dicCategoryService;

    @RequestMapping("/init")
    public ResultInfo<DicCategory> init(String initType) {
        ResultInfo<DicCategory> result = new ResultInfo<DicCategory>();
        UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        JwtUser currentUser = (JwtUser) token.getPrincipal();
        DicCategory initBean = null;
        if (initType.equals("create")) {
            initBean = new DicCategory();
        } else if (initType.equals("query")) {
            initBean = new DicCategory();
        }
        result.setBean(initBean);
        return result;
    }


    @RequestMapping("/create")
    public ResultInfo<DicCategory> create(@RequestBody @Validated(value = {Default.class}) DicCategory dicCategory, BindingResult bindingResult) {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        ResultInfo<DicCategory> result = new ResultInfo<DicCategory>();
        if (bindingResult.hasErrors()) {
            result.setResultType("validationError");
            for (FieldError fe : bindingResult.getFieldErrors()) {
                result.getErrors().put(fe.getField(), fe.getDefaultMessage());
            }
            return result;
        }
        if (dicCategoryService.create(dicCategory) > 0) {
            result.setResultType("success");
            result.setBeanId(dicCategory.getId());
            result.setMessage("创建成功");
        } else {
            result.setResultType("fail");
            result.setMessage("创建失败");
        }
        return result;
    }

    @RequestMapping(value = "/read/{id}")
    public ResultInfo<DicCategory> read(@PathVariable(name = "id") BigDecimal id) {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        ResultInfo<DicCategory> result = new ResultInfo<DicCategory>();
        DicCategory bean = dicCategoryService.read(id);
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
    public ResultInfo<DicCategory> update(@RequestBody @Validated(value = {Default.class}) DicCategory dicCategory, BindingResult bindingResult) {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        ResultInfo<DicCategory> result = new ResultInfo<DicCategory>();
        if (bindingResult.hasErrors()) {
            result.setResultType("validationError");
            for (FieldError fe : bindingResult.getFieldErrors()) {
                result.getErrors().put(fe.getField(), fe.getDefaultMessage());
            }
            return result;
        }
        if (dicCategoryService.update(dicCategory) > 0) {
            result.setResultType("success");
            result.setMessage("更新成功");
        } else {
            result.setResultType("fail");
            result.setMessage("更新失败");
        }
        return result;
    }

    @RequestMapping(value = "/delete/{id}")
    public ResultInfo<DicCategory> delete(@PathVariable(name = "id") BigDecimal id) {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        ResultInfo<DicCategory> result = new ResultInfo<DicCategory>();
        if (dicCategoryService.delete(id) > 0) {
            result.setResultType("success");
            result.setMessage("删除成功");
        } else {
            result.setResultType("fail");
            result.setMessage("删除失败");
        }
        return result;
    }

    @RequestMapping(value = {"/list","/dicManage/list"})
    public ResultInfo<DicCategory> list(@RequestBody DicCategory dicCategory) {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) currentUser;
        JwtUser currentUser1 = (JwtUser) token.getPrincipal();
        dicCategory.setCurrentUser(currentUser1);
        return dicCategoryService.list(dicCategory);
    }


    @RequestMapping(value = "/{id}/delDms")
    public ResultInfo<String> delDicModes(@PathVariable(name = "id") BigDecimal id, @RequestBody List<DicMode> dicModes, BindingResult bindingResult) {
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
        dicCategoryService.delDicModes(id, dicModes, result);
        return result;
    }
}
