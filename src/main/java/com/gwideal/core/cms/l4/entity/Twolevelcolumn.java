package com.gwideal.core.cms.l4.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.gwideal.increment.generator.IncAnnoColumn;
import com.gwideal.increment.generator.IncAnnoDbName;
import javax.persistence.*;
import java.io.Serializable;

@Table(name = "TWOLEVELCOLUMN")
@IncAnnoDbName(name = "dameng", comment = "默认表名")
public class Twolevelcolumn extends com.gwideal.core.common.CoreBaseEntity implements Serializable {

    @Id()
    @IncAnnoColumn(name = "ID", dbType = "NUMERIC", jdbcType = "NUMERIC", dataPrecision = "38", dataScale = "65531", dataLength = "0", comment = "默认标签")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "select JXWOAUniversalSeq.nextval from dual")
    private java.math.BigDecimal id;

    @IncAnnoColumn(name = "NAME", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "50", comment = "默认标签")
    private java.lang.String name;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @IncAnnoColumn(name = "MODIFYTIME", dbType = "TIMESTAMP", jdbcType = "TIMESTAMP", dataPrecision = "", dataScale = "", dataLength = "8", comment = "默认标签")
    private java.util.Date modifytime;

    @IncAnnoColumn(name = "NO", dbType = "NUMERIC", jdbcType = "NUMERIC", dataPrecision = "38", dataScale = "65531", dataLength = "0", comment = "默认标签")
    private java.math.BigDecimal no;

    @IncAnnoColumn(name = "PARENTLEV", dbType = "NUMERIC", jdbcType = "NUMERIC", dataPrecision = "38", dataScale = "65531", dataLength = "0", comment = "默认标签")
    private java.math.BigDecimal parentlev;

    @IncAnnoColumn(name = "ISDELETE", dbType = "NUMERIC", jdbcType = "NUMERIC", dataPrecision = "1", dataScale = "0", dataLength = "0", comment = "默认标签")
    private java.math.BigDecimal isdelete;

    @IncAnnoColumn(name = "ORDER_NUMBER", dbType = "NUMERIC", jdbcType = "NUMERIC", dataPrecision = "38", dataScale = "65531", dataLength = "0", comment = "默认标签")
    private java.math.BigDecimal orderNumber;

    @IncAnnoColumn(name = "DESCRIPTION", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "2000", comment = "默认标签")
    private java.lang.String description;

    @IncAnnoColumn(name = "CATEGORY_STR", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "100", comment = "默认标签")
    private java.lang.String categoryStr;

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

    public java.util.Date getModifytime() {
        return this.modifytime;
    }

    public void setModifytime(java.util.Date modifytime) {
        this.modifytime = modifytime;
    }

    public java.math.BigDecimal getNo() {
        return this.no;
    }

    public void setNo(java.math.BigDecimal no) {
        this.no = no;
    }

    public java.math.BigDecimal getParentlev() {
        return this.parentlev;
    }

    public void setParentlev(java.math.BigDecimal parentlev) {
        this.parentlev = parentlev;
    }

    public java.math.BigDecimal getIsdelete() {
        return this.isdelete;
    }

    public void setIsdelete(java.math.BigDecimal isdelete) {
        this.isdelete = isdelete;
    }

    public void setOrderNumber(java.math.BigDecimal orderNumber) {
        this.orderNumber = orderNumber;
    }

    public java.math.BigDecimal getOrderNumber() {
        return this.orderNumber;
    }

    public void setDescription(java.lang.String description) {
        this.description = description;
    }

    public java.lang.String getDescription() {
        return this.description;
    }

    public void setCategoryStr(java.lang.String categoryStr) {
        this.categoryStr = categoryStr;
    }

    public java.lang.String getCategoryStr() {
        return this.categoryStr;
    }

    @Transient
    private Twolevelcolumn parentTwolevelcolumn;

    public Twolevelcolumn getParentTwolevelcolumn() {
        return parentTwolevelcolumn;
    }

    public void setParentTwolevelcolumn(Twolevelcolumn parentTwolevelcolumn) {
        this.parentTwolevelcolumn = parentTwolevelcolumn;
    }
}
