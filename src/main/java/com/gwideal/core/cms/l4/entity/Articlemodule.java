package com.gwideal.core.cms.l4.entity;

import com.gwideal.increment.generator.IncAnnoColumn;
import com.gwideal.increment.generator.IncAnnoDbName;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "ARTICLEMODULE")
@IncAnnoDbName(name = "dameng", comment = "文章栏目表")
public class Articlemodule extends com.gwideal.core.common.CoreBaseEntity {

    @Id()
    @IncAnnoColumn(name = "ID", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "主键")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "select JXWOAUniversalSeq.nextval from dual")
    private java.math.BigDecimal id;

    @IncAnnoColumn(name = "MODULENAME", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "512", comment = "标题")
    private java.lang.String modulename;

    @IncAnnoColumn(name = "DESCRIPTION", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "512", comment = "描述")
    private java.lang.String description;

    @IncAnnoColumn(name = "CONTENT", dbType = "TEXT", jdbcType = "LONGVARCHAR", dataPrecision = "", dataScale = "0", dataLength = "2147483647", comment = "内容")
    private java.lang.String content;

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

    public java.lang.String getModulename() {
        return this.modulename;
    }

    public void setModulename(java.lang.String modulename) {
        this.modulename = modulename;
    }

    public java.lang.String getDescription() {
        return this.description;
    }

    public void setDescription(java.lang.String description) {
        this.description = description;
    }

    public java.lang.String getContent() {
        return this.content;
    }

    public void setContent(java.lang.String content) {
        this.content = content;
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
