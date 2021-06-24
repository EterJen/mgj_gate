package com.gwideal.core.cms.l4.entity;

import com.gwideal.increment.generator.IncAnnoColumn;
import com.gwideal.increment.generator.IncAnnoDbName;
import javax.persistence.*;

@Table(name = "INDEX_USER_ICON")
@IncAnnoDbName(name = "dameng", comment = "用户自定义菜单表")
public class IndexUserIcon extends com.gwideal.core.common.CoreBaseEntity {

    @Id()
    @IncAnnoColumn(name = "ID", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "主键")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "select JXWOAUniversalSeq.nextval from dual")
    private java.math.BigDecimal id;

    @IncAnnoColumn(name = "USERID", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "用户id")
    private java.math.BigDecimal userid;

    @IncAnnoColumn(name = "ORDERNO", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "排序")
    private java.math.BigDecimal orderno;

    @IncAnnoColumn(name = "ICONID", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "ICON表id")
    private java.math.BigDecimal iconid;

    public java.math.BigDecimal getId() {
        return this.id;
    }

    public void setId(java.math.BigDecimal id) {
        this.id = id;
    }

    public java.math.BigDecimal getUserid() {
        return this.userid;
    }

    public void setUserid(java.math.BigDecimal userid) {
        this.userid = userid;
    }

    public java.math.BigDecimal getOrderno() {
        return this.orderno;
    }

    public void setOrderno(java.math.BigDecimal orderno) {
        this.orderno = orderno;
    }

    public java.math.BigDecimal getIconid() {
        return this.iconid;
    }

    public void setIconid(java.math.BigDecimal iconid) {
        this.iconid = iconid;
    }

    @Transient
    private IndexIcon indexIcon;

    public IndexIcon getIndexIcon() {
        return indexIcon;
    }

    public void setIndexIcon(IndexIcon indexIcon) {
        this.indexIcon = indexIcon;
    }
}
