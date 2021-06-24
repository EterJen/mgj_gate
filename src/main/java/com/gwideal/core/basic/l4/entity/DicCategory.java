package com.gwideal.core.basic.l4.entity;

import com.gwideal.increment.generator.IncAnnoColumn;
import com.gwideal.increment.generator.IncAnnoDbName;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.List;

@Table(name = "DIC_CATEGORY")
@IncAnnoDbName(name = "dameng", comment = "默认表名")
public class DicCategory extends com.gwideal.core.common.CoreBaseEntity {

    @Id()
    @IncAnnoColumn(name = "ID", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "默认标签")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "select JXWOAUniversalSeq.nextval from dual")
    private java.math.BigDecimal id;

    @IncAnnoColumn(name = "NAME", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "255", comment = "默认标签")
    private java.lang.String name;

    @IncAnnoColumn(name = "DESCRIPTION", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "255", comment = "默认标签")
    private java.lang.String description;

    @IncAnnoColumn(name = "FLAG", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "10", comment = "默认标签")
    private java.lang.String flag;

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

    public void setFlag(java.lang.String flag) {
        this.flag = flag;
    }

    public java.lang.String getFlag() {
        return this.flag;
    }

    @javax.persistence.Transient
    private List<DicMode> dicModes = new ArrayList<DicMode>();

    public List<DicMode> getDicModes() {
        return dicModes;
    }

    public void setDicModes(List<DicMode> dicModes) {
        this.dicModes = dicModes;
    }
}
