package com.gwideal.core.cms.l4.entity;

import javax.persistence.Transient;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.gwideal.increment.generator.IncAnnoColumn;
import com.gwideal.increment.generator.IncAnnoDbName;

@Table(name = "SIMPLE_FILE")
@IncAnnoDbName(name = "dameng", comment = "默认表名")
public class SimpleFile extends com.gwideal.core.common.CoreBaseEntity {

    @Id()
    @IncAnnoColumn(name = "ID", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "默认标签")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "select JXWOAUniversalSeq.nextval from dual")
    private java.math.BigDecimal id;

    @IncAnnoColumn(name = "UUID_NAME", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "500", comment = "默认标签")
    private java.lang.String uuidName;

    @IncAnnoColumn(name = "CREATER_NAME", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "60", comment = "默认标签")
    private java.lang.String createrName;

    @IncAnnoColumn(name = "CREATER_ID", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "默认标签")
    private java.math.BigDecimal createrId;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @IncAnnoColumn(name = "CREATE_TIME", dbType = "DATETIME", jdbcType = "TIMESTAMP", dataPrecision = "", dataScale = "6", dataLength = "8", comment = "默认标签")
    private java.util.Date createTime;

    @IncAnnoColumn(name = "ACTIVE", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "默认标签")
    private java.math.BigDecimal active;

    @IncAnnoColumn(name = "ORIGINAL_NAME", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "500", comment = "默认标签")
    private java.lang.String originalName;

    @IncAnnoColumn(name = "SHOW_NAME", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "500", comment = "默认标签")
    private java.lang.String showName;

    public java.math.BigDecimal getId() {
        return this.id;
    }

    public void setId(java.math.BigDecimal id) {
        this.id = id;
    }

    public java.lang.String getUuidName() {
        return this.uuidName;
    }

    public void setUuidName(java.lang.String uuidName) {
        this.uuidName = uuidName;
    }

    public java.lang.String getCreaterName() {
        return this.createrName;
    }

    public void setCreaterName(java.lang.String createrName) {
        this.createrName = createrName;
    }

    public java.math.BigDecimal getCreaterId() {
        return this.createrId;
    }

    public void setCreaterId(java.math.BigDecimal createrId) {
        this.createrId = createrId;
    }

    public java.util.Date getCreateTime() {
        return this.createTime;
    }

    public void setCreateTime(java.util.Date createTime) {
        this.createTime = createTime;
    }

    public java.math.BigDecimal getActive() {
        return this.active;
    }

    public void setActive(java.math.BigDecimal active) {
        this.active = active;
    }

    public void setOriginalName(java.lang.String originalName) {
        this.originalName = originalName;
    }

    public java.lang.String getOriginalName() {
        return this.originalName;
    }

    public void setShowName(java.lang.String showName) {
        this.showName = showName;
    }

    public java.lang.String getShowName() {
        return this.showName;
    }
}
