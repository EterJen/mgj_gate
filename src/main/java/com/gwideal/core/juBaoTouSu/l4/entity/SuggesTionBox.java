package com.gwideal.core.juBaoTouSu.l4.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.gwideal.increment.generator.IncAnnoColumn;
import com.gwideal.increment.generator.IncAnnoDbName;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.math.BigDecimal;
import java.util.Date;

@Table(name = "SUGGESTIONBOX")
@IncAnnoDbName(name = "dameng", comment = "默认表名")
public class SuggesTionBox extends com.gwideal.core.common.CoreBaseEntity {
    @Id()
    @IncAnnoColumn(name = "ID", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "默认标签")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "select JXWOAUniversalSeq.nextval from dual")
    private BigDecimal id;

    @IncAnnoColumn(name = "SUGGESTIONTITLE", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "100", comment = "标题")
    private String suggestiontitle;

    @IncAnnoColumn(name = "SUGGESTIONBODY", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "100", comment = "内容")
    private String suggestionbody;

    @IncAnnoColumn(name = "COMPANY", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "100", comment = "处理类型")
    private String company;

    @IncAnnoColumn(name = "NAME", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "100", comment = "姓名")
    private String name;

    @IncAnnoColumn(name = "EMAIL", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "100", comment = "邮件")
    private String email;

    @IncAnnoColumn(name = "TEL", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "100", comment = "电话")
    private String tel;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @IncAnnoColumn(name = "INTIME", dbType = "DATETIME", jdbcType = "TIMESTAMP", dataPrecision = "", dataScale = "6", dataLength = "8", comment = "插入时间")
    private java.util.Date intime;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @IncAnnoColumn(name = "EDITTIME", dbType = "DATETIME", jdbcType = "TIMESTAMP", dataPrecision = "", dataScale = "6", dataLength = "8", comment = "结束时间")
    private java.util.Date edittime;

    @IncAnnoColumn(name = "STATE", dbType = "NUMBER", jdbcType = "INTEGER", dataPrecision = "4", dataScale = "0", dataLength = "22", comment = "状态")
    private java.lang.Integer state;


    public BigDecimal getId() {
        return id;
    }

    public void setId(BigDecimal id) {
        this.id = id;
    }

    public String getSuggestiontitle() {
        return suggestiontitle;
    }

    public void setSuggestiontitle(String suggestiontitle) {
        this.suggestiontitle = suggestiontitle;
    }

    public String getSuggestionbody() {
        return suggestionbody;
    }

    public void setSuggestionbody(String suggestionbody) {
        this.suggestionbody = suggestionbody;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public Date getIntime() {
        return intime;
    }

    public void setIntime(Date intime) {
        this.intime = intime;
    }

    public Date getEdittime() {
        return edittime;
    }

    public void setEdittime(Date edittime) {
        this.edittime = edittime;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }
}
