package com.gwideal.core.cms.l4.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.gwideal.increment.generator.IncAnnoColumn;
import com.gwideal.increment.generator.IncAnnoDbName;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.math.BigDecimal;

@Table(name = "SHPHONEBOOK")
@IncAnnoDbName(name = "dameng", comment = "sh电话薄表")
public class Shphonebook extends com.gwideal.core.common.CoreBaseEntity<Shphonebook, BigDecimal> {

    @Id()
    @IncAnnoColumn(name = "ID", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "主键")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "select JXWOAUniversalSeq.nextval from dual")
    private java.math.BigDecimal id;

    @IncAnnoColumn(name = "ORG", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "50", comment = "部门")
    private java.lang.String org;

    @IncAnnoColumn(name = "DEPARTMENT", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "50", comment = "单位")
    private java.lang.String department;

    @IncAnnoColumn(name = "ADDRESS", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "50", comment = "地址")
    private java.lang.String address;

    @IncAnnoColumn(name = "REDPHONE", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "50", comment = "红机")
    private java.lang.String redphone;

    @IncAnnoColumn(name = "BLACKPHONE", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "50", comment = "黑机")
    private java.lang.String blackphone;

    @IncAnnoColumn(name = "NAME", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "50", comment = "领导姓名")
    private java.lang.String name;

    @IncAnnoColumn(name = "DUTY", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "50", comment = "职务")
    private java.lang.String duty;

    @IncAnnoColumn(name = "PHONE", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "50", comment = "手机")
    private java.lang.String phone;

    @IncAnnoColumn(name = "NAMEA", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "50", comment = "密码操作人员A姓名")
    private java.lang.String namea;

    @IncAnnoColumn(name = "PHONEA", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "50", comment = "密码操作人员A电话")
    private java.lang.String phonea;

    @IncAnnoColumn(name = "NAMEB", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "50", comment = "密码操作人员B姓名")
    private java.lang.String nameb;

    @IncAnnoColumn(name = "PHONEB", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "50", comment = "密码操作人员B电话")
    private java.lang.String phoneb;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @IncAnnoColumn(name = "UPDATETIME", dbType = "DATETIME", jdbcType = "TIMESTAMP", dataPrecision = "", dataScale = "6", dataLength = "8", comment = "修改时间 ")
    private java.util.Date updatetime;

    @IncAnnoColumn(name = "ISDELETE", dbType = "NUMBER", jdbcType = "INTEGER", dataPrecision = "1", dataScale = "0", dataLength = "22", comment = "是否删除 0：否，1：是 ")
    private java.lang.Integer isdelete;

    public java.math.BigDecimal getId() {
        return this.id;
    }

    public void setId(java.math.BigDecimal id) {
        this.id = id;
    }

    public java.lang.String getOrg() {
        return this.org;
    }

    public void setOrg(java.lang.String org) {
        this.org = org;
    }

    public java.lang.String getDepartment() {
        return this.department;
    }

    public void setDepartment(java.lang.String department) {
        this.department = department;
    }

    public java.lang.String getAddress() {
        return this.address;
    }

    public void setAddress(java.lang.String address) {
        this.address = address;
    }

    public java.lang.String getRedphone() {
        return this.redphone;
    }

    public void setRedphone(java.lang.String redphone) {
        this.redphone = redphone;
    }

    public java.lang.String getBlackphone() {
        return this.blackphone;
    }

    public void setBlackphone(java.lang.String blackphone) {
        this.blackphone = blackphone;
    }

    public java.lang.String getName() {
        return this.name;
    }

    public void setName(java.lang.String name) {
        this.name = name;
    }

    public java.lang.String getDuty() {
        return this.duty;
    }

    public void setDuty(java.lang.String duty) {
        this.duty = duty;
    }

    public java.lang.String getPhone() {
        return this.phone;
    }

    public void setPhone(java.lang.String phone) {
        this.phone = phone;
    }

    public java.lang.String getNamea() {
        return this.namea;
    }

    public void setNamea(java.lang.String namea) {
        this.namea = namea;
    }

    public java.lang.String getPhonea() {
        return this.phonea;
    }

    public void setPhonea(java.lang.String phonea) {
        this.phonea = phonea;
    }

    public java.lang.String getNameb() {
        return this.nameb;
    }

    public void setNameb(java.lang.String nameb) {
        this.nameb = nameb;
    }

    public java.lang.String getPhoneb() {
        return this.phoneb;
    }

    public void setPhoneb(java.lang.String phoneb) {
        this.phoneb = phoneb;
    }

    public java.util.Date getUpdatetime() {
        return this.updatetime;
    }

    public void setUpdatetime(java.util.Date updatetime) {
        this.updatetime = updatetime;
    }

    public java.lang.Integer getIsdelete() {
        return this.isdelete;
    }

    public void setIsdelete(java.lang.Integer isdelete) {
        this.isdelete = isdelete;
    }
}
