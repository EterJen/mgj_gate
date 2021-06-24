package com.gwideal.core.common.enums;


import net.sf.json.JSONArray;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/*日志产生者分类*/
public enum AuditReader {
    ordinaryUser("ordinaryUser", new ArrayList<AuditCreater>() {{
        add(AuditCreater.ordinaryUser);
    }}),
    sysMgr("sysMgr", new ArrayList<AuditCreater>() {{
        /*系统管理员无日志查看功能*/
    }}),
    securityMgr("securityMgr", new ArrayList<AuditCreater>() {{
        add(AuditCreater.ordinaryUser);
        add(AuditCreater.auditMgr);
    }}),
    auditMgr("auditMgr", new ArrayList<AuditCreater>() {{
        add(AuditCreater.securityMgr);
        add(AuditCreater.sysMgr);
        add(AuditCreater.auditMgr);
    }});



    private String readerType;
    private List<AuditCreater> auditCreaters;
    private String ngShowJsonStr;
    private String dbSerchStr;

    private static Map<String, AuditReader> auditCreaterMap = new HashMap<>();

    static {
        for (AuditReader auditCreater : AuditReader.values()) {
            auditCreater.mkDbSerchStr();
            auditCreater.mkNgShowJsonStr();
            auditCreaterMap.put(auditCreater.readerType, auditCreater);
        }
    }

    private void mkNgShowJsonStr() {
        JSONArray jsonArray = new JSONArray();
        for (AuditCreater auditCreater : auditCreaters) {
            jsonArray.add(auditCreater.toJsonObj());
        }
        ngShowJsonStr = jsonArray.toString();
    }

    private void mkDbSerchStr() {
        StringBuffer sb = new StringBuffer("(");

        if (auditCreaters.size() > 0) {
            for (AuditCreater auditCreater : auditCreaters) {
                sb.append("'" +
                        auditCreater.getCreaterType()+
                        "',");
            }
            sb.deleteCharAt(sb.length() - 1);
        } else {
            sb.append("''");
        }
        sb.append(")");
        dbSerchStr = sb.toString();
    }


    /**
     * 私有化构造函数
     */
    AuditReader(String createrType, List<AuditCreater> auditCreaters) {
        this.readerType = createrType;
        this.auditCreaters = auditCreaters;
    }

    /**
     * @return
     * @Description: 依据str获取枚举
     */
    public static AuditReader getEnum(String str)  {
        if (auditCreaterMap.containsKey(str)) {
            return auditCreaterMap.get(str);
        } else {
            System.err.println("不存在的日志查看者类型");
            return null;
        }
    }

    public String getNgShowJsonStr() {
        return ngShowJsonStr;
    }



    public String getDbSerchStr() {
        return dbSerchStr;
    }

}
