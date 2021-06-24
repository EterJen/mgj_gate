package com.gwideal.core.juBaoTouSu.l1.controllear;

import com.gwideal.core.juBaoTouSu.l2.service.SuggesTionBoxService;
import com.gwideal.core.juBaoTouSu.l4.entity.SuggesTionBox;
import com.gwideal.core.jwt.JwtUser;
import com.gwideal.mybatis.metautils.ResultInfo;
import net.sf.json.JSON;
import net.sf.json.JSONObject;
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

import javax.servlet.http.HttpServletRequest;
import javax.validation.groups.Default;
import java.math.BigDecimal;
import java.util.Map;

@RestController
@RequestMapping("/suggesTionBox")
public class SuggesTionBoxController {

    @Autowired
    SuggesTionBoxService suggesTionBoxService;

    /**
     * 填报举报申请
     * @param suggesTion_map
     * @param request
     * @return
     */
    @RequestMapping(value = "/trustedRequest/saveSuggesTionBox")
    public JSON saveSuggesTionBox(@RequestBody Map suggesTion_map, HttpServletRequest request) {
        Object obj_name = suggesTion_map.get("name");
        String name = obj_name == null ? "" : obj_name.toString().trim();
        Object obj_tel = suggesTion_map.get("tel");
        String tel = obj_tel == null ? "" : obj_tel.toString().trim().toLowerCase();
        Object obj_suggestion_Email = suggesTion_map.get("suggestion_Email");
        String suggestion_Email = obj_suggestion_Email == null ? "" : obj_suggestion_Email.toString().trim().toLowerCase();
        Object obj_suggestion_title = suggesTion_map.get("suggestion_title");
        String suggestion_title = obj_suggestion_title == null ? "" : obj_suggestion_title.toString().trim();
        Object obj_suggestion_body = suggesTion_map.get("suggestion_body");
        String suggestion_body = obj_suggestion_body == null ? "" : obj_suggestion_body.toString().trim();
        Object obj_varCode = suggesTion_map.get("varCode");
        String varCode = obj_varCode == null ? "" : obj_varCode.toString().trim().toLowerCase();
        JSONObject jsonObject=new JSONObject();

        //验证码从session中取出来看看
        String yanzhengm= (String) request.getSession().getAttribute("RANDOMREDISKEY");
        if(!varCode.equals(yanzhengm.toLowerCase())){
            jsonObject.put("code","-1");
            jsonObject.put("msg","验证码输入错误！");

        }else if(name.length()==0){
            jsonObject.put("code","-1");
            jsonObject.put("msg","姓名不可以为空！");
        }else if(tel.length()<6 || tel.length()>11){
            jsonObject.put("code","-1");
            jsonObject.put("msg","电话不正确！");
        }else if(suggestion_Email.length()<5 || suggestion_Email.indexOf("@")==-1){
            jsonObject.put("code","-1");
            jsonObject.put("msg","邮箱地址不正确！");
        }else if(suggestion_title.length()==0){
            jsonObject.put("code","-1");
            jsonObject.put("msg","标题不可以为空！");
        }else if(suggestion_body.length()==0){
            jsonObject.put("code","-1");
            jsonObject.put("msg","内容不可以为空！");
        }else{
            suggesTionBoxService.saveSuggesTionBox(name,tel,suggestion_Email,suggestion_title,suggestion_body);
            jsonObject.put("code","1");
        }



        return jsonObject;
    }


    @RequestMapping(value="/list")
    public ResultInfo<SuggesTionBox> list(@RequestBody SuggesTionBox suggesTionBox) {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)currentUser;
        JwtUser currentUser1 =(JwtUser)token.getPrincipal();
        suggesTionBox.setCurrentUser(currentUser1);
        return suggesTionBoxService.list(suggesTionBox);

    }


    @RequestMapping(value="/delete/{id}")
    public ResultInfo<SuggesTionBox> delete(@PathVariable(name="id") BigDecimal id) {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        ResultInfo<SuggesTionBox> result = new ResultInfo<SuggesTionBox>();
        if(suggesTionBoxService.delete(id)>0){
            result.setResultType("success");
            result.setMessage("删除成功");
        }else{
            result.setResultType("fail");
            result.setMessage("删除失败");
        }
        return result;
    }

    @RequestMapping(value="/update")
    public ResultInfo<SuggesTionBox> update(@RequestBody @Validated(value={Default.class}) SuggesTionBox suggesTionBox, BindingResult bindingResult) {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        ResultInfo<SuggesTionBox> result = new ResultInfo<SuggesTionBox>();
        if(bindingResult.hasErrors()){
            result.setResultType("validationError");
            for(FieldError fe:bindingResult.getFieldErrors()){
                result.getErrors().put(fe.getField(), fe.getDefaultMessage());
            }
            return result;
        }
        if(suggesTionBoxService.update(suggesTionBox)>0){
            result.setResultType("success");
            result.setMessage("更新成功");
        }else{
            result.setResultType("fail");
            result.setMessage("更新失败");
        }
        return result;
    }


}
