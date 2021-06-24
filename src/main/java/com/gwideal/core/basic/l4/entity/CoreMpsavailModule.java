package com.gwideal.core.basic.l4.entity;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Transient;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import com.gwideal.increment.generator.IncAnnoColumn;
import com.gwideal.increment.generator.IncAnnoDbName;

@Table(name = "MPSAVAILMODULE")
@IncAnnoDbName(name = "dameng", comment = "用户模块权限关系授权表")
public class CoreMpsavailModule extends com.gwideal.core.common.CoreBaseEntity<CoreMpsavailModule, BigDecimal> {

    @IncAnnoColumn(name = "ELEMENTID", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "元素类型，范围（u,r,d,p）")
    private java.math.BigDecimal elementid;

    @IncAnnoColumn(name = "ELEMENTTYPE", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "50", comment = "elementid所指示的对象类型，表示人员、角色、部门、岗位表中一个对象的id")
    private java.lang.String elementtype;

    @IncAnnoColumn(name = "MODULECODE", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "mpsmodule表内一个对象的主键值")
    private java.math.BigDecimal modulecode;

    @IncAnnoColumn(name = "MPSMODULE_ID", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "默认标签")
    private java.math.BigDecimal mpsmoduleId;

    @IncAnnoColumn(name = "FLAG", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "10", comment = "默认标签")
    private java.lang.String flag;

    public java.math.BigDecimal getElementid() {
        return this.elementid;
    }

    public void setElementid(java.math.BigDecimal elementid) {
        this.elementid = elementid;
    }

    public java.lang.String getElementtype() {
        return this.elementtype;
    }

    public void setElementtype(java.lang.String elementtype) {
        this.elementtype = elementtype;
    }

    public java.math.BigDecimal getModulecode() {
        return this.modulecode;
    }

    public void setModulecode(java.math.BigDecimal modulecode) {
        this.modulecode = modulecode;
    }

    public void setMpsmoduleId(java.math.BigDecimal mpsmoduleId) {
        this.mpsmoduleId = mpsmoduleId;
    }

    public java.math.BigDecimal getMpsmoduleId() {
        return this.mpsmoduleId;
    }

    public void setFlag(java.lang.String flag) {
        this.flag = flag;
    }

    public java.lang.String getFlag() {
        return this.flag;
    }

    /*手动添加非持久化字段，必须加上Transient注解*/
    @javax.persistence.Transient
    private List<CoreMpsModule> mpsModuleList = new ArrayList<CoreMpsModule>();

    @javax.persistence.Transient
    private boolean checked = false;

    public boolean isChecked() {
        return checked;
    }

    public void setChecked(boolean checked) {
        this.checked = checked;
    }

    public List<CoreMpsModule> getMpsModuleList() {
        return mpsModuleList;
    }

    public void setMpsModuleList(List<CoreMpsModule> mpsModuleList) {
        this.mpsModuleList = mpsModuleList;
    }
}
