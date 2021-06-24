package com.gwideal.core.basic.l4.entity;

import com.gwideal.core.workflow.DParticipantInfo;
import com.gwideal.increment.generator.IncAnnoColumn;
import com.gwideal.increment.generator.IncAnnoDbName;
import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Table(name = "DIC_MODE")
@IncAnnoDbName(name = "dameng", comment = "默认表名")
public class DicMode extends com.gwideal.core.common.CoreBaseEntity implements Serializable {

    @Id()
    @IncAnnoColumn(name = "ID", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "默认标签")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "select JXWOAUniversalSeq.nextval from dual")
    private java.math.BigDecimal id;

    @IncAnnoColumn(name = "DICTYPE", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "255", comment = "默认标签")
    private java.lang.String dictype;

    @IncAnnoColumn(name = "SPLIT_MODE", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "10", comment = "默认标签")
    private java.lang.String splitMode;

    @IncAnnoColumn(name = "CNAME", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "255", comment = "默认标签")
    private java.lang.String cname;

    @IncAnnoColumn(name = "CATEGORY_ID", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "默认标签")
    private java.math.BigDecimal categoryId;

    @IncAnnoColumn(name = "FLAG", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "10", comment = "默认标签")
    private java.lang.String flag;

    @Transient
    private DicType dicType;

    public DicMode(String flag, String ditype) {
        super();
        this.setFlag(flag);
        this.setDictype(ditype);
    }

    public DicMode() {
        super();
    }

    public java.math.BigDecimal getId() {
        return this.id;
    }

    public void setId(java.math.BigDecimal id) {
        this.id = id;
    }

    public java.lang.String getDictype() {
        return this.dictype;
    }

    public void setDictype(java.lang.String dictype) {
        this.dictype = dictype;
    }

    public java.lang.String getSplitMode() {
        return this.splitMode;
    }

    public void setSplitMode(java.lang.String splitMode) {
        this.splitMode = splitMode;
    }

    public java.lang.String getCname() {
        return this.cname;
    }

    public void setCname(java.lang.String cname) {
        this.cname = cname;
    }

    public java.math.BigDecimal getCategoryId() {
        return this.categoryId;
    }

    public void setCategoryId(java.math.BigDecimal categoryId) {
        this.categoryId = categoryId;
    }

    public void setFlag(java.lang.String flag) {
        this.flag = flag;
    }

    public java.lang.String getFlag() {
        return this.flag;
    }

    @javax.persistence.Transient
    private List<DicType> dicTypes = new ArrayList<DicType>();

    @javax.persistence.Transient
    private Map<String, DicType> dicTypeMap = new HashMap<>();

    public List<DicType> getDicTypes() {
        return dicTypes;
    }

    public void setDicTypes(List<DicType> dicTypes) {
        this.dicTypes = dicTypes;
    }

    public DicType getDicType() {
        return dicType;
    }

    public void setDicType(DicType dicType) {
        this.dicType = dicType;
    }

    public Map<String, DicType> getDicTypeMap() {
        return dicTypeMap;
    }

    public void setDicTypeMap(Map<String, DicType> dicTypeMap) {
        this.dicTypeMap = dicTypeMap;
    }
}
