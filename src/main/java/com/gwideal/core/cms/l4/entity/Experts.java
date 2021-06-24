package com.gwideal.core.cms.l4.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.gwideal.increment.generator.IncAnnoColumn;
import com.gwideal.increment.generator.IncAnnoDbName;
import javax.persistence.*;
import java.math.BigDecimal;

@Table(name = "EXPERTS")
@IncAnnoDbName(name = "dameng", comment = "专家表")
public class Experts extends com.gwideal.core.common.CoreBaseEntity<Experts, BigDecimal> {

    @Id()
    @IncAnnoColumn(name = "ID", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "主键")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "select JXWOAUniversalSeq.nextval from dual")
    private java.math.BigDecimal id;

    @IncAnnoColumn(name = "DISPLAYNAME", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "512", comment = "姓名")
    private java.lang.String displayname;

    @IncAnnoColumn(name = "EXPERTSTYPE", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "库")
    private java.math.BigDecimal expertstype;

    @IncAnnoColumn(name = "SEX", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "2", comment = "性别")
    private java.lang.String sex;

    @IncAnnoColumn(name = "MAJOR", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "512", comment = "从事专业")
    private java.lang.String major;

    @IncAnnoColumn(name = "TECHNICAL", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "512", comment = "技术职称")
    private java.lang.String technical;

    @IncAnnoColumn(name = "JOB", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "512", comment = "单位及职务")
    private java.lang.String job;

    @IncAnnoColumn(name = "PHONE", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "50", comment = "联系电话")
    private java.lang.String phone;

    @IncAnnoColumn(name = "ADDRESS", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "50", comment = "办公地点")
    private java.lang.String address;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @IncAnnoColumn(name = "UPDATETIME", dbType = "DATETIME", jdbcType = "TIMESTAMP", dataPrecision = "", dataScale = "6", dataLength = "8", comment = "创建修改时间")
    private java.util.Date updatetime;

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

    public java.math.BigDecimal getExpertstype() {
        return this.expertstype;
    }

    public void setExpertstype(java.math.BigDecimal expertstype) {
        this.expertstype = expertstype;
    }

    public java.lang.String getSex() {
        return this.sex;
    }

    public void setSex(java.lang.String sex) {
        this.sex = sex;
    }

    public java.lang.String getMajor() {
        return this.major;
    }

    public void setMajor(java.lang.String major) {
        this.major = major;
    }

    public java.lang.String getTechnical() {
        return this.technical;
    }

    public void setTechnical(java.lang.String technical) {
        this.technical = technical;
    }

    public java.lang.String getJob() {
        return this.job;
    }

    public void setJob(java.lang.String job) {
        this.job = job;
    }

    public java.lang.String getPhone() {
        return this.phone;
    }

    public void setPhone(java.lang.String phone) {
        this.phone = phone;
    }

    public java.lang.String getAddress() {
        return this.address;
    }

    public void setAddress(java.lang.String address) {
        this.address = address;
    }

    public java.util.Date getUpdatetime() {
        return this.updatetime;
    }

    public void setUpdatetime(java.util.Date updatetime) {
        this.updatetime = updatetime;
    }

    @Transient
    private Expertstype expertstypeRef;

    public Expertstype getExpertstypeRef() {
        return expertstypeRef;
    }

    public void setExpertstypeRef(Expertstype expertstypeRef) {
        this.expertstypeRef = expertstypeRef;
    }
}
