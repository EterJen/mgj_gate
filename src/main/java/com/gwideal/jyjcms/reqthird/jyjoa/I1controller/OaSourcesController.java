package com.gwideal.jyjcms.reqthird.jyjoa.I1controller;

import com.gwideal.core.jwt.JwtUser;
import com.gwideal.jyjcms.reqthird.jyjoa.I2service.OaSourcesService;
import com.gwideal.mybatis.metautils.ResultInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/third/jyjoa")
public class OaSourcesController {

    @Autowired
    private OaSourcesService thirdTrustedRequestService;

    @RequestMapping(value = "/toDoTask")
    public String getRand(@RequestBody Map<String, Object> postBean) {
        return thirdTrustedRequestService.toDoTask(postBean);
    }

    @RequestMapping(value = "/LeaderWorkArrange/save")
    public String LeaderWorkArrangeSave(@RequestBody Map<String, Object> postBean) {
        return thirdTrustedRequestService.leaderWorkArrangeSave(postBean);
    }

    @RequestMapping(value = "/toGetDept")
    public String toGetDept(){
        Map<String, Object> postBean = new HashMap<>();
        UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        JwtUser currentUser =(JwtUser)token.getPrincipal();
        postBean.put("name",currentUser.getCoreUser().getDisplay());
        return thirdTrustedRequestService.toGetDept(postBean);
    }

    @RequestMapping(value = "/toGetDeptAll")
    public String toGetDeptAll(){
        Map<String, Object> postBean = new HashMap<>();
        UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        JwtUser currentUser =(JwtUser)token.getPrincipal();
        postBean.put("name",currentUser.getCoreUser().getDisplay());
        return thirdTrustedRequestService.toGetDeptAll(postBean);
    }

    @RequestMapping("/toGetUserRole")
    public String toGetUserRole(){
        Map<String, Object> postBean = new HashMap<>();
        UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        JwtUser currentUser =(JwtUser)token.getPrincipal();
        postBean.put("name",currentUser.getCoreUser().getDisplay());
        return thirdTrustedRequestService.toGetUserRole(postBean);
    }

    @RequestMapping("/getJyjoaDeptWithUser")
    public ResultInfo<String> getJyjoaDeptWithUser(){
        Map<String, Object> postBean = new HashMap<>();
        UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        JwtUser currentUser =(JwtUser)token.getPrincipal();
        postBean.put("name",currentUser.getCoreUser().getDisplay());
        ResultInfo<String> stringResultInfo = new ResultInfo<>();
        stringResultInfo.setResultType("success");
        stringResultInfo.setBean(thirdTrustedRequestService.getJyjoaDeptWithUser(postBean));
        return stringResultInfo;
    }

}
