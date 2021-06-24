package com.gwideal.core.cms.l4.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.gwideal.increment.generator.IncAnnoColumn;
import com.gwideal.increment.generator.IncAnnoDbName;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.math.BigDecimal;

@Table(name = "MSGBOARD")
@IncAnnoDbName(name = "dameng", comment = "默认表名")
public class Msgboard extends com.gwideal.core.common.CoreBaseEntity<Msgboard, BigDecimal> {

    @Id()
    @IncAnnoColumn(name = "ID", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "默认标签")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "select JXWOAUniversalSeq.nextval from dual")
    private java.math.BigDecimal id;

    @IncAnnoColumn(name = "DEPARTMENT", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "512", comment = "默认标签")
    private java.lang.String department;

    @IncAnnoColumn(name = "CONTENT", dbType = "TEXT", jdbcType = "LONGVARCHAR", dataPrecision = "", dataScale = "0", dataLength = "2147483647", comment = "默认标签")
    private java.lang.String content;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @IncAnnoColumn(name = "CREATETIME", dbType = "DATETIME", jdbcType = "TIMESTAMP", dataPrecision = "", dataScale = "6", dataLength = "8", comment = "默认标签")
    private java.util.Date createtime;

    @IncAnnoColumn(name = "ISDELETE", dbType = "NUMBER", jdbcType = "INTEGER", dataPrecision = "1", dataScale = "0", dataLength = "22", comment = "默认标签")
    private java.lang.Integer isdelete;

    @IncAnnoColumn(name = "ORGUSER", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "50", comment = "默认标签")
    private java.lang.String orguser;

    @IncAnnoColumn(name = "EXAMINECONTENT", dbType = "TEXT", jdbcType = "LONGVARCHAR", dataPrecision = "", dataScale = "0", dataLength = "2147483647", comment = "默认标签")
    private java.lang.String examinecontent;

    @IncAnnoColumn(name = "EXAMINE", dbType = "NUMBER", jdbcType = "INTEGER", dataPrecision = "1", dataScale = "0", dataLength = "22", comment = "默认标签")
    private java.lang.Integer examine;

    public java.math.BigDecimal getId() {
        return this.id;
    }

    public void setId(java.math.BigDecimal id) {
        this.id = id;
    }

    public java.lang.String getDepartment() {
        return this.department;
    }

    public void setDepartment(java.lang.String department) {
        this.department = department;
    }

    public java.lang.String getContent() {
        return this.content;
    }

    public void setContent(java.lang.String content) {
        this.content = content;
    }

    public java.util.Date getCreatetime() {
        return this.createtime;
    }

    public void setCreatetime(java.util.Date createtime) {
        this.createtime = createtime;
    }

    public java.lang.Integer getIsdelete() {
        return this.isdelete;
    }

    public void setIsdelete(java.lang.Integer isdelete) {
        this.isdelete = isdelete;
    }

    public void setOrguser(java.lang.String orguser) {
        this.orguser = orguser;
    }

    public java.lang.String getOrguser() {
        return this.orguser;
    }

    public void setExaminecontent(java.lang.String examinecontent) {
        this.examinecontent = examinecontent;
    }

    public java.lang.String getExaminecontent() {
        return this.examinecontent;
    }

    public void setExamine(java.lang.Integer examine) {
        this.examine = examine;
    }

    public java.lang.Integer getExamine() {
        return this.examine;
    }
}
