
package com.gwideal.core.basic.l1.controller;

import com.gwideal.core.basic.l2.service.ActionDefService;
import com.gwideal.core.basic.l4.entity.ActionDef;
import com.gwideal.core.jwt.JwtUser;
import com.gwideal.mybatis.metautils.ResultInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/actionDef")
public class ActionDefController {

    @Autowired
    ActionDefService actionDefService;




    /*@RequestMapping("/create")
    public ResultInfo<Attachment> create(@RequestBody @Validated(value = {Default.class}) Attachment attachment, BindingResult bindingResult) {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        ResultInfo<Attachment> result = new ResultInfo<Attachment>();
        if (bindingResult.hasErrors()) {
            result.setResultType("validationError");
            for (FieldError fe : bindingResult.getFieldErrors()) {
                result.getErrors().put(fe.getField(), fe.getDefaultMessage());
            }
            return result;
        }
        if (actionDefService.create(attachment) > 0) {
            result.setResultType("success");
            result.setBeanId(attachment.getId());
            result.setMessage("创建成功");
        } else {
            result.setResultType("fail");
            result.setMessage("创建失败");
        }
        return result;
    }

    @RequestMapping(value = "/read/{id}")
    public ResultInfo<Attachment> read(@PathVariable(name = "id") BigDecimal id) {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        ResultInfo<Attachment> result = new ResultInfo<Attachment>();
        Attachment bean = actionDefService.read(id);
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
    public ResultInfo<Attachment> update(@RequestBody @Validated(value = {Default.class}) Attachment attachment, BindingResult bindingResult) {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        ResultInfo<Attachment> result = new ResultInfo<Attachment>();
        if (bindingResult.hasErrors()) {
            result.setResultType("validationError");
            for (FieldError fe : bindingResult.getFieldErrors()) {
                result.getErrors().put(fe.getField(), fe.getDefaultMessage());
            }
            return result;
        }
        if (actionDefService.update(attachment) > 0) {
            result.setResultType("success");
            result.setMessage("更新成功");
        } else {
            result.setResultType("fail");
            result.setMessage("更新失败");
        }
        return result;
    }

    @RequestMapping(value = "/delete/{id}")
    public ResultInfo<Attachment> delete(@PathVariable(name = "id") BigDecimal id, @RequestBody MiddleAttachment middleAttachment) {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        ResultInfo<Attachment> result = new ResultInfo<Attachment>();
        if (actionDefService.delete(id, middleAttachment) > 0) {
            result.setResultType("success");
            result.setMessage("删除成功");
        } else {
            result.setResultType("fail");
            result.setMessage("删除失败");
        }
        return result;
    }*/

    @RequestMapping(value = "/list")
    public ResultInfo<ActionDef> list(@RequestBody ActionDef actionDef) {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) currentUser;
        JwtUser currentUser1 = (JwtUser) token.getPrincipal();
        return actionDefService.list(actionDef,currentUser1);
    }

}
