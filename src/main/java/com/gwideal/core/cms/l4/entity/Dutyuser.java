package com.gwideal.core.cms.l4.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.gwideal.increment.generator.IncAnnoColumn;
import com.gwideal.increment.generator.IncAnnoDbName;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.math.BigDecimal;

@Table(name = "DUTYUSER")
@IncAnnoDbName(name = "dameng", comment = "值班人员表")
public class Dutyuser extends com.gwideal.core.common.CoreBaseEntity<Dutyuser, BigDecimal> {

    @Id()
    @IncAnnoColumn(name = "ID", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "主键")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "select JXWOAUniversalSeq.nextval from dual")
    private java.math.BigDecimal id;

    @IncAnnoColumn(name = "NAME", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "50", comment = "姓名")
    private java.lang.String name;

    @IncAnnoColumn(name = "DEPARTMENT", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "部门")
    private java.math.BigDecimal department;

    @IncAnnoColumn(name = "SORTID", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "排班序号")
    private java.math.BigDecimal sortid;

    @IncAnnoColumn(name = "STARTDATE", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "50", comment = "不值班开始时间")
    private java.lang.String startdate;

    @IncAnnoColumn(name = "ENDDATE", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "50", comment = "不值班结束时间")
    private java.lang.String enddate;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @IncAnnoColumn(name = "UPDATETIME", dbType = "DATETIME", jdbcType = "TIMESTAMP", dataPrecision = "", dataScale = "6", dataLength = "8", comment = "修改时间")
    private java.util.Date updatetime;

    @IncAnnoColumn(name = "ISDELETE", dbType = "NUMBER", jdbcType = "INTEGER", dataPrecision = "1", dataScale = "0", dataLength = "22", comment = "是否删除 0：否，1：是")
    private java.lang.Integer isdelete;

    public java.math.BigDecimal getId() {
        return this.id;
    }

    public void setId(java.math.BigDecimal id) {
        this.id = id;
    }

    public java.lang.String getName() {
        return this.name;
    }

    public void setName(java.lang.String name) {
        this.name = name;
    }

    public java.math.BigDecimal getDepartment() {
        return this.department;
    }

    public void setDepartment(java.math.BigDecimal department) {
        this.department = department;
    }

    public java.math.BigDecimal getSortid() {
        return this.sortid;
    }

    public void setSortid(java.math.BigDecimal sortid) {
        this.sortid = sortid;
    }

    public java.lang.String getStartdate() {
        return this.startdate;
    }

    public void setStartdate(java.lang.String startdate) {
        this.startdate = startdate;
    }

    public java.lang.String getEnddate() {
        return this.enddate;
    }

    public void setEnddate(java.lang.String enddate) {
        this.enddate = enddate;
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
