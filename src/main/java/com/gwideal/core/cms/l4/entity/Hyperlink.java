package com.gwideal.core.cms.l4.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.gwideal.increment.generator.IncAnnoColumn;
import com.gwideal.increment.generator.IncAnnoDbName;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.math.BigDecimal;

@Table(name = "HYPERLINK")
@IncAnnoDbName(name = "dameng", comment = "hy链接表")
public class Hyperlink extends com.gwideal.core.common.CoreBaseEntity<Hyperlink, BigDecimal> {

    @Id()
    @IncAnnoColumn(name = "ID", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "主键")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "select JXWOAUniversalSeq.nextval from dual")
    private java.math.BigDecimal id;

    @IncAnnoColumn(name = "TITLE", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "512", comment = "标题")
    private java.lang.String title;

    @IncAnnoColumn(name = "LINKADDRESS", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "1024", comment = "链接地址")
    private java.lang.String linkaddress;

    @IncAnnoColumn(name = "LINKTYPE", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "100", comment = "链接类型")
    private java.lang.String linktype;

    @IncAnnoColumn(name = "SORTID", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "排序")
    private java.math.BigDecimal sortid;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
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

    public java.lang.String getLinkaddress() {
        return this.linkaddress;
    }

    public void setLinkaddress(java.lang.String linkaddress) {
        this.linkaddress = linkaddress;
    }

    public java.lang.String getLinktype() {
        return this.linktype;
    }

    public void setLinktype(java.lang.String linktype) {
        this.linktype = linktype;
    }

    public java.math.BigDecimal getSortid() {
        return this.sortid;
    }

    public void setSortid(java.math.BigDecimal sortid) {
        this.sortid = sortid;
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
