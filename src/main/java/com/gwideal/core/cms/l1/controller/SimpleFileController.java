
package com.gwideal.core.cms.l1.controller;

import javax.validation.groups.Default;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import com.gwideal.core.jwt.JwtUser;
import com.gwideal.mybatis.metautils.ResultInfo;
import com.gwideal.core.cms.l4.entity.*;
import com.gwideal.core.cms.l2.service.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;

@RestController
@RequestMapping("/simpleFile")
public class SimpleFileController {

    @Autowired
    SimpleFileService simpleFileService;

    @RequestMapping("/init")
    public ResultInfo<SimpleFile> init(String initType) {
        ResultInfo<SimpleFile> result = new ResultInfo<SimpleFile>();
        UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        JwtUser currentUser = (JwtUser) token.getPrincipal();
        SimpleFile initBean = null;
        if (initType.equals("create")) {
            initBean = new SimpleFile();
        } else if (initType.equals("query")) {
            initBean = new SimpleFile();
        }
        result.setBean(initBean);
        return result;
    }

    @RequestMapping(value = {"/trustedRequest/upload","/upload"})
    public ResultInfo<SimpleFile> upload(@RequestParam(value = "clientFile", required = true) MultipartFile clientFile, @RequestParam(value = "simpleFileStr", required = true) String simpleFileStr) {
        return simpleFileService.upload(clientFile, simpleFileStr);
    }

    @RequestMapping("/create")
    public ResultInfo<SimpleFile> create(@RequestBody @Validated(value = {Default.class}) SimpleFile simpleFile, BindingResult bindingResult) {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        ResultInfo<SimpleFile> result = new ResultInfo<SimpleFile>();
        if (bindingResult.hasErrors()) {
            result.setResultType("validationError");
            for (FieldError fe : bindingResult.getFieldErrors()) {
                result.getErrors().put(fe.getField(), fe.getDefaultMessage());
            }
            return result;
        }
        if (simpleFileService.create(simpleFile) > 0) {
            result.setBean(simpleFile);
            result.setResultType("success");
            result.setBeanId(simpleFile.getId());
            result.setMessage("????????????");
        } else {
            result.setResultType("fail");
            result.setMessage("????????????");
        }
        return result;
    }

    @RequestMapping(value = "/read/{id}")
    public ResultInfo<SimpleFile> read(@PathVariable(name = "id") BigDecimal id) {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        ResultInfo<SimpleFile> result = new ResultInfo<SimpleFile>();
        SimpleFile bean = simpleFileService.read(id);
        if (bean == null) {
            result.setResultType("fail");
            result.setMessage("????????????????????????");
        } else {
            result.setResultType("success");
            result.setMessage("????????????");
            result.setBean(bean);
        }
        return result;
    }

    @RequestMapping(value = "/update")
    public ResultInfo<SimpleFile> update(@RequestBody @Validated(value = {Default.class}) SimpleFile simpleFile, BindingResult bindingResult) {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        ResultInfo<SimpleFile> result = new ResultInfo<SimpleFile>();
        if (bindingResult.hasErrors()) {
            result.setResultType("validationError");
            for (FieldError fe : bindingResult.getFieldErrors()) {
                result.getErrors().put(fe.getField(), fe.getDefaultMessage());
            }
            return result;
        }
        if (simpleFileService.update(simpleFile) > 0) {
            result.setResultType("success");
            result.setMessage("????????????");
        } else {
            result.setResultType("fail");
            result.setMessage("????????????");
        }
        return result;
    }

    @RequestMapping(value = "/delete/{id}")
    public ResultInfo<SimpleFile> delete(@PathVariable(name = "id") BigDecimal id) {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        ResultInfo<SimpleFile> result = new ResultInfo<SimpleFile>();
        if (simpleFileService.delete(id) > 0) {
            result.setResultType("success");
            result.setMessage("????????????");
        } else {
            result.setResultType("fail");
            result.setMessage("????????????");
        }
        return result;
    }

    @RequestMapping(value = "/list")
    public ResultInfo<SimpleFile> list(@RequestBody SimpleFile simpleFile) {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) currentUser;
        JwtUser currentUser1 = (JwtUser) token.getPrincipal();
        simpleFile.setCurrentUser(currentUser1);
        return simpleFileService.list(simpleFile);
    }

}
