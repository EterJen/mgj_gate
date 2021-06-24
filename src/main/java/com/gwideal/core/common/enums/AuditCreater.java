package com.gwideal.core.common.enums;


import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/*日志产生者分类*/
public enum AuditCreater {
    ordinaryUser("ordinaryUser","普通用户"),
    sysMgr("sysMgr","系统管理员"),
    securityMgr("securityMgr","安全管理员"),
    auditMgr("auditMgr","审计管理员");


    private String createrType;
    private String desciption;

    private static Map<String, AuditCreater> auditCreaterMap = new HashMap<>();

    static {
        for (AuditCreater auditCreater : AuditCreater.values()) {
            auditCreaterMap.put(auditCreater.getCreaterType(), auditCreater);
        }
    }

    /**
     * 私有化构造函数
     */
    AuditCreater(String createrType, String desciption) {
        this.createrType = createrType;
        this.desciption = desciption;
    }

    /**
     * @return
     * @Description: 依据str获取枚举
     */
    public static AuditCreater getEnum(String str) throws Exception {
        if (auditCreaterMap.containsKey(str)) {
            return auditCreaterMap.get(str);
        } else {
            throw new Exception("不存在的日志创建者类型");
        }
    }

    public String getCreaterType() {
        return createrType;
    }

    public void setCreaterType(String createrType) {
        this.createrType = createrType;
    }

    public String getDesciption() {
        return desciption;
    }

    public void setDesciption(String desciption) {
        this.desciption = desciption;
    }

    public static List<AuditCreater> list() {
        List<AuditCreater> auditCreaters = new ArrayList<>();
        auditCreaterMap.forEach(((k, v) -> auditCreaters.add(v)));
        return auditCreaters;
    }

    public static String allToJsonStr(){
        JSONArray jsonArray = new JSONArray();
        for (AuditCreater auditCreater : list()) {
            jsonArray.add(auditCreater.toJsonObj());
        }
        return jsonArray.toString();
    }

    public JSONObject toJsonObj() {
        JSONObject object = new JSONObject();
        object.put("createrType",createrType);
        object.put("desciption",desciption);
        return object;
    }

    public String toJsonStr() {
        return toJsonObj().toString();
    }
}
