
package com.gwideal.core.cms.l1.controller;

import javax.validation.groups.Default;

import com.gwideal.core.util.DateTimeUtils;
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
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/userViewSkin")
public class UserViewSkinController {

    @Autowired
    ArticleController articleController;
    @Autowired
    UserViewSkinService userViewSkinService;

    @RequestMapping("/init")
    public ResultInfo<UserViewSkin> init(@RequestBody int year) {
        ResultInfo<UserViewSkin> result = new ResultInfo<UserViewSkin>();
        try {
            userViewSkinService.init(year);
        } catch (Exception e) {
            result.setResultType("fail");
        }

        result.setResultType("success");
        return result;
    }
    @RequestMapping("/query")
    public ResultInfo<UserViewSkin> query(@RequestBody int year) {
        ResultInfo<UserViewSkin> result = new ResultInfo<UserViewSkin>();
        try {
            List<UserViewSkin> plist =  userViewSkinService.query(year);
            result.setBeanList(plist);
            HashMap<String, Object> additionalInfo = new HashMap<>();
            //additionalInfo.put("skins", Skin.values());
            additionalInfo.put("skinMap", Skin.getSkinEn2zhMap());
            additionalInfo.put("skins", Skin.getSkinEns());
            result.setAdditionalInfo(additionalInfo);
        } catch (Exception e) {
            e.printStackTrace();
            result.setResultType("fail");
        }

        result.setResultType("success");
        return result;
    }
    @RequestMapping("/getSkinEn2zhMap")
    public ResultInfo<Map> getSkinEn2zhMap(@RequestBody int year) {
        ResultInfo<Map> result = new ResultInfo<Map>();
        Map skinEn2zhMap = Skin.getSkinEn2zhMap();
        result.setBean(skinEn2zhMap);
        result.setResultType("success");
        return result;
    }
    @RequestMapping("/getSkins")
    public ResultInfo<Skin[]> getSkins(@RequestBody int year) {
        ResultInfo<Skin[]> result = new ResultInfo<Skin[]>();
        Skin[] skins = userViewSkinService.getSkins();
        result.setBean(skins);
        result.setResultType("success");
        return result;
    }



    @RequestMapping("/create")
    public ResultInfo<UserViewSkin> create(@RequestBody @Validated(value = {Default.class}) UserViewSkin userViewSkin, BindingResult bindingResult) {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        ResultInfo<UserViewSkin> result = new ResultInfo<UserViewSkin>();
        if (bindingResult.hasErrors()) {
            result.setResultType("validationError");
            for (FieldError fe : bindingResult.getFieldErrors()) {
                result.getErrors().put(fe.getField(), fe.getDefaultMessage());
            }
            return result;
        }
        if (userViewSkinService.create(userViewSkin) > 0) {
            result.setResultType("success");
            result.setBeanId(userViewSkin.getId());
            result.setMessage("创建成功");
        } else {
            result.setResultType("fail");
            result.setMessage("创建失败");
        }
        return result;
    }

    @RequestMapping(value = "/read/{id}")
    public ResultInfo<UserViewSkin> read(@PathVariable(name = "id") BigDecimal id) {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        ResultInfo<UserViewSkin> result = new ResultInfo<UserViewSkin>();
        UserViewSkin bean = userViewSkinService.read(id);
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
    public ResultInfo<UserViewSkin> update(@RequestBody @Validated(value = {Default.class}) UserViewSkin userViewSkin, BindingResult bindingResult) {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        ResultInfo<UserViewSkin> result = new ResultInfo<UserViewSkin>();
        if (bindingResult.hasErrors()) {
            result.setResultType("validationError");
            for (FieldError fe : bindingResult.getFieldErrors()) {
                result.getErrors().put(fe.getField(), fe.getDefaultMessage());
            }
            return result;
        }
        if (userViewSkinService.update(userViewSkin) > 0) {
            result.setResultType("success");
            result.setMessage("更新成功");
        } else {
            result.setResultType("fail");
            result.setMessage("更新失败");
        }
        return result;
    }

    @RequestMapping(value = "/delete/{id}")
    public ResultInfo<UserViewSkin> delete(@PathVariable(name = "id") BigDecimal id) {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        ResultInfo<UserViewSkin> result = new ResultInfo<UserViewSkin>();
        if (userViewSkinService.delete(id) > 0) {
            result.setResultType("success");
            result.setMessage("删除成功");
        } else {
            result.setResultType("fail");
            result.setMessage("删除失败");
        }
        return result;
    }

    @RequestMapping(value = "/list")
    public ResultInfo<UserViewSkin> list(@RequestBody UserViewSkin userViewSkin) {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) currentUser;
        JwtUser currentUser1 = (JwtUser) token.getPrincipal();
        userViewSkin.setCurrentUser(currentUser1);
        return userViewSkinService.list(userViewSkin);
    }

}
