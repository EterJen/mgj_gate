package com.gwideal.core.yeWu.l4.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.gwideal.increment.generator.IncAnnoColumn;
import com.gwideal.increment.generator.IncAnnoDbName;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.math.BigDecimal;
import java.util.Date;

@Table(name = "PY_OVERSEASUSER")
@IncAnnoDbName(name = "dameng", comment = "默认表名")
public class PyOverSeasUser {

    @Id()
    @IncAnnoColumn(name = "USERID", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "默认标签")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "select JXWOAUniversalSeq.nextval from dual")
    private java.math.BigDecimal userid;

    @IncAnnoColumn(name = "USERNAME", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "100", comment = "登录名")
    private java.lang.String username;

    @IncAnnoColumn(name = "PASSWORDS", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "100", comment = "密码")
    private java.lang.String passwords;

    @IncAnnoColumn(name = "ASSWORDSASK", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "100", comment = "密保问题")
    private java.lang.String asswordsask;

    @IncAnnoColumn(name = "PASSWORDANSWER", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "100", comment = "密保答案")
    private java.lang.String passwordanswer;

    @IncAnnoColumn(name = "ORGANIZATIONNAME", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "100", comment = "组织公司名称")
    private java.lang.String organizationname;

    @IncAnnoColumn(name = "MANAGEPLACE", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "100", comment = "联系地址?")
    private java.lang.String manageplace;

    @IncAnnoColumn(name = "MANAGELIEU", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "100", comment = "经办人")
    private java.lang.String managelieu;

    @IncAnnoColumn(name = "MANAGEPERSON", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "100", comment = "经办人电话")
    private java.lang.String manageperson;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @IncAnnoColumn(name = "DATATIME", dbType = "DATETIME", jdbcType = "TIMESTAMP", dataPrecision = "", dataScale = "6", dataLength = "8", comment = "默认标签")
    private java.util.Date datatime;

    @IncAnnoColumn(name = "TYPEID", dbType = "NUMBER", jdbcType = "INTEGER", dataPrecision = "4", dataScale = "0", dataLength = "22", comment = "企业类型")
    private java.lang.Integer typeid;

    @IncAnnoColumn(name = "EMAIL", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "100", comment = "邮件地址")
    private java.lang.String email;

    @IncAnnoColumn(name = "ORGANIZECODE", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "100", comment = "默认标签")
    private java.lang.String organizecode;

    @IncAnnoColumn(name = "ARREST", dbType = "NUMBER", jdbcType = "INTEGER", dataPrecision = "4", dataScale = "0", dataLength = "22", comment = "默认标签")
    private java.lang.Integer arrest=0;

    @IncAnnoColumn(name = "STATE", dbType = "NUMBER", jdbcType = "INTEGER", dataPrecision = "4", dataScale = "0", dataLength = "22", comment = "默认标签")
    private java.lang.Integer state=1;

    @IncAnnoColumn(name = "TOKEN", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "100", comment = "token")
    private java.lang.String token;


    public BigDecimal getUserid() {
        return userid;
    }

    public void setUserid(BigDecimal userid) {
        this.userid = userid;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPasswords() {
        return passwords;
    }

    public void setPasswords(String passwords) {
        this.passwords = passwords;
    }

    public String getAsswordsask() {
        return asswordsask;
    }

    public void setAsswordsask(String asswordsask) {
        this.asswordsask = asswordsask;
    }

    public String getPasswordanswer() {
        return passwordanswer;
    }

    public void setPasswordanswer(String passwordanswer) {
        this.passwordanswer = passwordanswer;
    }

    public String getOrganizationname() {
        return organizationname;
    }

    public void setOrganizationname(String organizationname) {
        this.organizationname = organizationname;
    }

    public String getManageplace() {
        return manageplace;
    }

    public void setManageplace(String manageplace) {
        this.manageplace = manageplace;
    }

    public String getManagelieu() {
        return managelieu;
    }

    public void setManagelieu(String managelieu) {
        this.managelieu = managelieu;
    }

    public String getManageperson() {
        return manageperson;
    }

    public void setManageperson(String manageperson) {
        this.manageperson = manageperson;
    }

    public Date getDatatime() {
        return datatime;
    }

    public void setDatatime(Date datatime) {
        this.datatime = datatime;
    }

    public Integer getTypeid() {
        return typeid;
    }

    public void setTypeid(Integer typeid) {
        this.typeid = typeid;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getOrganizecode() {
        return organizecode;
    }

    public void setOrganizecode(String organizecode) {
        this.organizecode = organizecode;
    }

    public Integer getArrest() {
        return arrest;
    }

    public void setArrest(Integer arrest) {
        this.arrest = arrest;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
