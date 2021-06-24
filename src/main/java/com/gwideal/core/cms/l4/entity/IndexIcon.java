package com.gwideal.core.cms.l4.entity;

import com.gwideal.increment.generator.IncAnnoColumn;
import com.gwideal.increment.generator.IncAnnoDbName;
import javax.persistence.*;

@Table(name = "INDEX_ICON")
@IncAnnoDbName(name = "dameng", comment = "自定义底部菜单表")
public class IndexIcon extends com.gwideal.core.common.CoreBaseEntity {

    @Id()
    @IncAnnoColumn(name = "ID", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "主键")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "select JXWOAUniversalSeq.nextval from dual")
    private java.math.BigDecimal id;

    @IncAnnoColumn(name = "ISDELETE", dbType = "NUMBER", jdbcType = "INTEGER", dataPrecision = "1", dataScale = "0", dataLength = "22", comment = "是否删除 0：否，1：是")
    private java.lang.Integer isdelete;

    @IncAnnoColumn(name = "UPDATOR", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "更新人")
    private java.math.BigDecimal updator;

    @IncAnnoColumn(name = "UPDATETIME", dbType = "DATETIME", jdbcType = "TIMESTAMP", dataPrecision = "", dataScale = "6", dataLength = "8", comment = "更新时间")
    private java.util.Date updatetime;

    @IncAnnoColumn(name = "ICONNAME", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "50", comment = "图标名字")
    private java.lang.String iconname;

    @IncAnnoColumn(name = "ICONURL", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "200", comment = "图标url")
    private java.lang.String iconurl;

    @IncAnnoColumn(name = "CLASSNAME", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "50", comment = "class的名字")
    private java.lang.String classname;

    @IncAnnoColumn(name = "IMGNAME", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "50", comment = "图片名字")
    private java.lang.String imgname;

    @IncAnnoColumn(name = "ORDERNO", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "排序")
    private java.math.BigDecimal orderno;

    @IncAnnoColumn(name = "PARENTID", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "父id")
    private java.math.BigDecimal parentid;

    @IncAnnoColumn(name = "SHOW_IMAGE_NAME", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "100", comment = "前端图片展示名称")
    private java.lang.String showImageName;

    public java.math.BigDecimal getId() {
        return this.id;
    }

    public void setId(java.math.BigDecimal id) {
        this.id = id;
    }

    public java.lang.Integer getIsdelete() {
        return this.isdelete;
    }

    public void setIsdelete(java.lang.Integer isdelete) {
        this.isdelete = isdelete;
    }

    public java.math.BigDecimal getUpdator() {
        return this.updator;
    }

    public void setUpdator(java.math.BigDecimal updator) {
        this.updator = updator;
    }

    public java.util.Date getUpdatetime() {
        return this.updatetime;
    }

    public void setUpdatetime(java.util.Date updatetime) {
        this.updatetime = updatetime;
    }

    public java.lang.String getIconname() {
        return this.iconname;
    }

    public void setIconname(java.lang.String iconname) {
        this.iconname = iconname;
    }

    public java.lang.String getIconurl() {
        return this.iconurl;
    }

    public void setIconurl(java.lang.String iconurl) {
        this.iconurl = iconurl;
    }

    public java.lang.String getClassname() {
        return this.classname;
    }

    public void setClassname(java.lang.String classname) {
        this.classname = classname;
    }

    public java.lang.String getImgname() {
        return this.imgname;
    }

    public void setImgname(java.lang.String imgname) {
        this.imgname = imgname;
    }

    public java.math.BigDecimal getOrderno() {
        return this.orderno;
    }

    public void setOrderno(java.math.BigDecimal orderno) {
        this.orderno = orderno;
    }

    public java.math.BigDecimal getParentid() {
        return this.parentid;
    }

    public void setParentid(java.math.BigDecimal parentid) {
        this.parentid = parentid;
    }

    public void setShowImageName(java.lang.String showImageName) {
        this.showImageName = showImageName;
    }

    public java.lang.String getShowImageName() {
        return this.showImageName;
    }

    @Transient
    private java.lang.String status;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
