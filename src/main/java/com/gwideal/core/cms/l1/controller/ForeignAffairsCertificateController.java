package com.gwideal.core.cms.l1.controller;

import com.gwideal.core.cms.l2.service.ForeignAffairsCertificateService;
import com.gwideal.core.cms.l4.entity.ForeignAffairsCertificate;
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

@RestController
@RequestMapping("/foreignAffairsCertificate")
public class ForeignAffairsCertificateController {

    @Autowired
    ForeignAffairsCertificateService foreignAffairsCertificateService;

    @RequestMapping("/init")
    public ResultInfo<ForeignAffairsCertificate> init(String initType) {
        ResultInfo<ForeignAffairsCertificate> result = new ResultInfo<ForeignAffairsCertificate>();
        /*UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)SecurityContextHolder.getContext().getAuthentication();
        JwtUser currentUser =(JwtUser)token.getPrincipal();*/
        ForeignAffairsCertificate initBean = null;
        if(initType.equals("create")){
            initBean = new ForeignAffairsCertificate();
        }else if(initType.equals("query")){
            initBean = new ForeignAffairsCertificate();
        }
        result.setBean(initBean);
        return result;
    }


    @RequestMapping(value = {"/trustedRequest/create","/create"})
    public ResultInfo<ForeignAffairsCertificate> create(@RequestBody @Validated(value={Default.class}) ForeignAffairsCertificate foreignAffairsCertificate, BindingResult bindingResult) {
        //Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        ResultInfo<ForeignAffairsCertificate> result = new ResultInfo<ForeignAffairsCertificate>();
        if(bindingResult.hasErrors()){
            result.setResultType("validationError");
            for(FieldError fe:bindingResult.getFieldErrors()){
                result.getErrors().put(fe.getField(), fe.getDefaultMessage());
            }
            return result;
        }
        if(foreignAffairsCertificateService.create(foreignAffairsCertificate)>0){
            result.setResultType("success");
            result.setBeanId(foreignAffairsCertificate.getId());
            result.setMessage("创建成功");
        }else{
            result.setResultType("fail");
            result.setMessage("创建失败");
        }
        return result;
    }

    @RequestMapping(value="/read/{id}")
    public ResultInfo<ForeignAffairsCertificate> read(@PathVariable(name="id") BigDecimal id) {
        //Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        ResultInfo<ForeignAffairsCertificate> result = new ResultInfo<ForeignAffairsCertificate>();
        ForeignAffairsCertificate bean = foreignAffairsCertificateService.read(id);
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
    public ResultInfo<ForeignAffairsCertificate> update(@RequestBody @Validated(value={Default.class}) ForeignAffairsCertificate foreignAffairsCertificate,BindingResult bindingResult) {
        //Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        ResultInfo<ForeignAffairsCertificate> result = new ResultInfo<ForeignAffairsCertificate>();
        if(bindingResult.hasErrors()){
            result.setResultType("validationError");
            for(FieldError fe:bindingResult.getFieldErrors()){
                result.getErrors().put(fe.getField(), fe.getDefaultMessage());
            }
            return result;
        }
        if(foreignAffairsCertificateService.update(foreignAffairsCertificate)>0){
            result.setResultType("success");
            result.setMessage("更新成功");
        }else{
            result.setResultType("fail");
            result.setMessage("更新失败");
        }
        return result;
    }

    @RequestMapping(value="/delete/{id}")
    public ResultInfo<ForeignAffairsCertificate> delete(@PathVariable(name="id") BigDecimal id) {
        //Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        ResultInfo<ForeignAffairsCertificate> result = new ResultInfo<ForeignAffairsCertificate>();
        if(foreignAffairsCertificateService.delete(id)>0){
            result.setResultType("success");
            result.setMessage("删除成功");
        }else{
            result.setResultType("fail");
            result.setMessage("删除失败");
        }
        return result;
    }

    @RequestMapping(value={"/trustedRequest/list", "/list"})
    public ResultInfo<ForeignAffairsCertificate> list(@RequestBody ForeignAffairsCertificate foreignAffairsCertificate) {
        /*Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)currentUser;
        JwtUser currentUser1 =(JwtUser)token.getPrincipal();
        foreignAffairsCertificate.setCurrentUser(currentUser1);*/
        return foreignAffairsCertificateService.list(foreignAffairsCertificate);
    }
}
