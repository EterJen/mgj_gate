package com.gwideal.jyjcms.reqthird.jyjoa.I2service;


import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Service;
import per.eter.utils.http.RequestTemplate;

import javax.annotation.Resource;
import java.util.Map;


@Service
@ConfigurationProperties(
        prefix = "jyjoa.url"
)
public class OaSourcesService {
    @Resource
    RequestTemplate requestTemplate;
    private String toDoTaskUrl = "";
    private String leaderWorkArrangeSaveUrl = "";
    private String toGetDept = "";
    private String toGetDeptAll = "";
    private String toGetUserRole = "";
    private String jyjoaUserinfo = "";
    private String jyjoaDeptWithUser = "";

    public String getToDoTaskUrl() {
        return toDoTaskUrl;
    }

    public void setToDoTaskUrl(String toDoTaskUrl) {
        this.toDoTaskUrl = toDoTaskUrl;
    }

    public String getJyjoaDeptWithUser() {
        return jyjoaDeptWithUser;
    }

    public void setJyjoaDeptWithUser(String jyjoaDeptWithUser) {
        this.jyjoaDeptWithUser = jyjoaDeptWithUser;
    }

    public String getLeaderWorkArrangeSaveUrl() {
        return leaderWorkArrangeSaveUrl;
    }

    public void setLeaderWorkArrangeSaveUrl(String leaderWorkArrangeSaveUrl) {
        this.leaderWorkArrangeSaveUrl = leaderWorkArrangeSaveUrl;
    }


    public String getToGetDept() {
        return toGetDept;
    }

    public void setJyjoaUserinfo(String jyjoaUserinfo) {
        this.jyjoaUserinfo = jyjoaUserinfo;
    }
    public String getJyjoaUserinfo() {
        return jyjoaUserinfo;
    }
    public void setToGetDept(String toGetDept) {
        this.toGetDept = toGetDept;
    }

    public String getToGetDeptAll() {
        return toGetDeptAll;
    }

    public void setToGetDeptAll(String toGetDeptAll) {
        this.toGetDeptAll = toGetDeptAll;
    }

    public String getToGetUserRole() {
        return toGetUserRole;
    }

    public void setToGetUserRole(String toGetUserRole) {
        this.toGetUserRole = toGetUserRole;
    }

    public String toDoTask(Map<String, Object> postBean) {
        return  requestTemplate.jsonClient(toDoTaskUrl, postBean);
    }

    public String leaderWorkArrangeSave(Map<String, Object> postBean) {
        return  requestTemplate.jsonClient(leaderWorkArrangeSaveUrl, postBean);
    }

    public String toGetDept(Map<String, Object> postBean) {
        return  requestTemplate.jsonClient(toGetDept,postBean);
    }

    public String toGetDeptAll(Map<String, Object> postBean) {
        return  requestTemplate.jsonClient(toGetDeptAll,postBean);
    }

    public String toGetUserRole(Map<String, Object> postBean) {
        return  requestTemplate.jsonClient(toGetUserRole,postBean);
    }

    public String getJyjoaUserinfo(Map<String, Object> postBean) {
        return requestTemplate.jsonClient(jyjoaUserinfo,postBean);
    }

    public String getJyjoaDeptWithUser(Map<String, Object> postBean) {
        return requestTemplate.jsonClient(jyjoaDeptWithUser,postBean);
    }


}
