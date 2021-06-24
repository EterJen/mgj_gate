package com.gwideal.core.basic.l4.entity;


import com.gwideal.increment.generator.IncAnnoColumn;
import com.gwideal.increment.generator.IncAnnoDbName;
import org.apache.commons.lang3.StringUtils;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Table(name = "DIC_TYPE")
@IncAnnoDbName(name = "dameng", comment = "默认表名")
public class DicType extends com.gwideal.core.common.CoreBaseEntity implements Serializable {

    @Id()
    @IncAnnoColumn(name = "ID", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "默认标签")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "select JXWOAUniversalSeq.nextval from dual")
    private java.math.BigDecimal id;

    @IncAnnoColumn(name = "NAME", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "255", comment = "默认标签")
    private java.lang.String name;

    @IncAnnoColumn(name = "DESCRIPTION", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "512", comment = "默认标签")
    private java.lang.String description;

    @IncAnnoColumn(name = "ENAME", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "255", comment = "默认标签")
    private java.lang.String ename;

    @IncAnnoColumn(name = "EXT", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "50", comment = "默认标签")
    private java.lang.String ext;

    @IncAnnoColumn(name = "FLAG", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "10", comment = "默认标签")
    private java.lang.String flag;

    @IncAnnoColumn(name = "DIC_MODE_ID", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "默认标签")
    private java.math.BigDecimal dicModeId;

    @IncAnnoColumn(name = "ORDER_NUM", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "20", comment = "意见展示字段")
    private java.lang.String orderNum;

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

    public java.lang.String getDescription() {
        return this.description;
    }

    public void setDescription(java.lang.String description) {
        this.description = description;
    }

    public java.lang.String getEname() {
        if (StringUtils.isBlank(this.ename)) {
            return "dbNoPk";
        } else {
            return this.ename;
        }
    }

    public void setEname(java.lang.String ename) {
        this.ename = ename;
    }

    public java.lang.String getExt() {
        return this.ext;
    }

    public void setExt(java.lang.String ext) {
        this.ext = ext;
    }

    public java.lang.String getFlag() {
        return this.flag;
    }

    public void setFlag(java.lang.String flag) {
        this.flag = flag;
    }

    public java.math.BigDecimal getDicModeId() {
        return this.dicModeId;
    }

    public void setDicModeId(java.math.BigDecimal dicModeId) {
        this.dicModeId = dicModeId;
    }

    public void setOrderNum(java.lang.String orderNum) {
        this.orderNum = orderNum;
    }

    public java.lang.String getOrderNum() {
        return this.orderNum;
    }

    /*@Transient
    private List<WfDocType> wfDocTypeList = new ArrayList<WfDocType>();

    public List<WfDocType> getWfDocTypeList() {
        return wfDocTypeList;
    }

    public void setWfDocTypeList(List<WfDocType> wfDocTypeList) {
        this.wfDocTypeList = wfDocTypeList;
    }*/
}
