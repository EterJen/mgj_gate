package com.gwideal.core.cms.l4.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.gwideal.increment.generator.IncAnnoColumn;
import com.gwideal.increment.generator.IncAnnoDbName;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Table(name = "ENGINE")
@IncAnnoDbName(name = "dameng", comment = "项目所属专家表")
public class Engine extends com.gwideal.core.common.CoreBaseEntity<Engine, BigDecimal> {

    @Id()
    @IncAnnoColumn(name = "ID", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "主键")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "select JXWOAUniversalSeq.nextval from dual")
    private java.math.BigDecimal id;

    @IncAnnoColumn(name = "DISPLAYNAME", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "512", comment = "项目名称")
    private java.lang.String displayname;

    @IncAnnoColumn(name = "EXPERTSID", dbType = "TEXT", jdbcType = "LONGVARCHAR", dataPrecision = "", dataScale = "0", dataLength = "2147483647", comment = "专家")
    private java.lang.String expertsid;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @IncAnnoColumn(name = "CREATETIME", dbType = "DATETIME", jdbcType = "TIMESTAMP", dataPrecision = "", dataScale = "6", dataLength = "8", comment = "修改时间")
    private java.util.Date createtime;

    public java.math.BigDecimal getId() {
        return this.id;
    }

    public void setId(java.math.BigDecimal id) {
        this.id = id;
    }

    public java.lang.String getDisplayname() {
        return this.displayname;
    }

    public void setDisplayname(java.lang.String displayname) {
        this.displayname = displayname;
    }

    public java.lang.String getExpertsid() {
        return this.expertsid;
    }

    public void setExpertsid(java.lang.String expertsid) {
        this.expertsid = expertsid;
    }

    public java.util.Date getCreatetime() {
        return this.createtime;
    }

    public void setCreatetime(java.util.Date createtime) {
        this.createtime = createtime;
    }

    @Transient
    private List<Experts> expertsList = new ArrayList<>();

    @Transient
    private List<Expertstype> expertstypeList = new ArrayList<>();

    @Transient
    private Map<String,List<Experts>> expertsMap = new HashMap<>();

    public List<Experts> getExpertsList() {
        return expertsList;
    }

    public void setExpertsList(List<Experts> expertsList) {
        this.expertsList = expertsList;
    }

    public List<Expertstype> getExpertstypeList() {
        return expertstypeList;
    }

    public void setExpertstypeList(List<Expertstype> expertstypeList) {
        this.expertstypeList = expertstypeList;
    }

    public Map<String, List<Experts>> getExpertsMap() {
        return expertsMap;
    }

    public void setExpertsMap(Map<String, List<Experts>> expertsMap) {
        this.expertsMap = expertsMap;
    }
}
