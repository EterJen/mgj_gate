package com.gwideal.core.cms.l4.entity;

import javax.persistence.Transient;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import com.gwideal.increment.generator.IncAnnoColumn;
import com.gwideal.increment.generator.IncAnnoDbName;

@Table(name = "THEMATIC")
@IncAnnoDbName(name = "dameng", comment = "专题表")
public class Thematic extends com.gwideal.core.common.CoreBaseEntity {

    @Id()
    @IncAnnoColumn(name = "ID", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "主键")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "select JXWOAUniversalSeq.nextval from dual")
    private java.math.BigDecimal id;

    @IncAnnoColumn(name = "TITLE", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "512", comment = "标题")
    private java.lang.String title;

    @IncAnnoColumn(name = "IMAGE", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "512", comment = "图片")
    private java.lang.String image;

    @IncAnnoColumn(name = "TYPE", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "2", comment = "类型  0：文章专题，1：链接专题")
    private java.lang.String type;

    @IncAnnoColumn(name = "SUBTYPE", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "2", comment = "")
    private java.lang.String subtype;

    @IncAnnoColumn(name = "SORTID", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "排序")
    private java.math.BigDecimal sortid;

    @IncAnnoColumn(name = "LINKURL", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "512", comment = "链接url")
    private java.lang.String linkurl;

    @IncAnnoColumn(name = "CREATETIME", dbType = "DATETIME", jdbcType = "TIMESTAMP", dataPrecision = "", dataScale = "6", dataLength = "8", comment = "创建时间")
    private java.util.Date createtime;

    @IncAnnoColumn(name = "ISDELETE", dbType = "NUMBER", jdbcType = "INTEGER", dataPrecision = "1", dataScale = "0", dataLength = "22", comment = "是否删除 0：否，1：是")
    private java.lang.Integer isdelete;

    public java.math.BigDecimal getId() {
        return this.id;
    }

    public void setId(java.math.BigDecimal id) {
        this.id = id;
    }

    public java.lang.String getTitle() {
        return this.title;
    }

    public void setTitle(java.lang.String title) {
        this.title = title;
    }

    public java.lang.String getImage() {
        return this.image;
    }

    public void setImage(java.lang.String image) {
        this.image = image;
    }

    public java.lang.String getType() {
        return this.type;
    }

    public void setType(java.lang.String type) {
        this.type = type;
    }

    public java.lang.String getSubtype() {
        return this.subtype;
    }

    public void setSubtype(java.lang.String subtype) {
        this.subtype = subtype;
    }

    public java.math.BigDecimal getSortid() {
        return this.sortid;
    }

    public void setSortid(java.math.BigDecimal sortid) {
        this.sortid = sortid;
    }

    public java.lang.String getLinkurl() {
        return this.linkurl;
    }

    public void setLinkurl(java.lang.String linkurl) {
        this.linkurl = linkurl;
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
}
