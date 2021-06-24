package com.gwideal.core.basic.l4.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.gwideal.core.cms.l4.entity.Administrator;
import com.gwideal.increment.generator.IncAnnoColumn;
import com.gwideal.increment.generator.IncAnnoDbName;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Table(name = "MPSMODULE")
@JsonIgnoreProperties(ignoreUnknown = true)
@IncAnnoDbName(name = "dameng", comment = "默认表名")
public class CoreMpsModule extends com.gwideal.core.common.CoreBaseEntity<CoreMpsModule, BigDecimal> implements Serializable {

    @Id()
    @IncAnnoColumn(name = "ID", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "默认标签")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "select JXWOAUniversalSeq.nextval from dual")
    private java.math.BigDecimal id;

    @IncAnnoColumn(name = "PKCODE", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "128", comment = "默认标签")
    private java.lang.String pkcode;

    @IncAnnoColumn(name = "TITLE", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "50", comment = "默认标签")
    private java.lang.String title;

    @IncAnnoColumn(name = "ACTIONURL", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "500", comment = "默认标签")
    private java.lang.String actionurl;

    @IncAnnoColumn(name = "PARENTID", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "默认标签")
    private java.math.BigDecimal parentid;

    @IncAnnoColumn(name = "ICONSELECT", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "128", comment = "默认标签")
    private java.lang.String iconselect;

    @IncAnnoColumn(name = "ICONFOCUS", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "128", comment = "默认标签")
    private java.lang.String iconfocus;

    @IncAnnoColumn(name = "FLAG", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "10", comment = "默认标签")
    private java.lang.String flag;

    @IncAnnoColumn(name = "DESCRIPTION", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "512", comment = "默认标签")
    private java.lang.String description;

    @IncAnnoColumn(name = "TARGETFRAME", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "512", comment = "默认标签")
    private java.lang.String targetframe;

    @IncAnnoColumn(name = "ICON", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "128", comment = "默认标签")
    private java.lang.String icon;

    @IncAnnoColumn(name = "TITLE_MENU_SHOW", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "50", comment = "默认标签")
    private java.lang.String titleMenuShow;

    @IncAnnoColumn(name = "NG_STATE", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "50", comment = "默认标签")
    private java.lang.String ngState;

    @IncAnnoColumn(name = "SHOW_ABLE", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "默认标签")
    private java.math.BigDecimal showAble;

    public java.math.BigDecimal getId() {
        return this.id;
    }

    public void setId(java.math.BigDecimal id) {
        this.id = id;
    }

    public java.lang.String getPkcode() {
        return this.pkcode;
    }

    public void setPkcode(java.lang.String pkcode) {
        this.pkcode = pkcode;
    }

    public java.lang.String getTitle() {
        return this.title;
    }

    public void setTitle(java.lang.String title) {
        this.title = title;
    }

    public java.lang.String getActionurl() {
        return this.actionurl;
    }

    public void setActionurl(java.lang.String actionurl) {
        this.actionurl = actionurl;
    }

    public java.math.BigDecimal getParentid() {
        return this.parentid;
    }

    public void setParentid(java.math.BigDecimal parentid) {
        this.parentid = parentid;
    }

    public void setIconselect(java.lang.String iconselect) {
        this.iconselect = iconselect;
    }

    public java.lang.String getIconselect() {
        return this.iconselect;
    }

    public void setIconfocus(java.lang.String iconfocus) {
        this.iconfocus = iconfocus;
    }

    public java.lang.String getIconfocus() {
        return this.iconfocus;
    }

    public void setFlag(java.lang.String flag) {
        this.flag = flag;
    }

    public java.lang.String getFlag() {
        return this.flag;
    }

    public void setDescription(java.lang.String description) {
        this.description = description;
    }

    public java.lang.String getDescription() {
        return this.description;
    }

    public void setTargetframe(java.lang.String targetframe) {
        this.targetframe = targetframe;
    }

    public java.lang.String getTargetframe() {
        return this.targetframe;
    }

    public void setIcon(java.lang.String icon) {
        this.icon = icon;
    }

    public java.lang.String getIcon() {
        return this.icon;
    }

    public void setTitleMenuShow(java.lang.String titleMenuShow) {
        this.titleMenuShow = titleMenuShow;
    }

    public java.lang.String getTitleMenuShow() {
        return this.titleMenuShow;
    }

    public void setNgState(java.lang.String ngState) {
        this.ngState = ngState;
    }

    public java.lang.String getNgState() {
        return this.ngState;
    }

    public void setShowAble(java.math.BigDecimal showAble) {
        this.showAble = showAble;
    }

    public java.math.BigDecimal getShowAble() {
        return this.showAble;
    }

    @javax.persistence.Transient
    private List<Administrator> userList = new ArrayList<Administrator>();

    @javax.persistence.Transient
    private List<CoreRole> roleList = new ArrayList<CoreRole>();

    @javax.persistence.Transient
    private Boolean checked = false;

    @javax.persistence.Transient
    private String queryListType;

    @javax.persistence.Transient
    private BigDecimal mpsmoduleId;

    @javax.persistence.Transient
    private BigDecimal elementid;

    @javax.persistence.Transient
    private BigDecimal userId;

    @javax.persistence.Transient
    private String elementtype;

    /*io流深拷贝暂不支持对父类继承而来的属性copy 固在此处显示声明*/
    @javax.persistence.Transient
    private List<CoreMpsModule> nodes = new ArrayList<CoreMpsModule>();

    public List<CoreRole> getRoleList() {
        return roleList;
    }

    public void setRoleList(List<CoreRole> roleList) {
        this.roleList = roleList;
    }

    public List<Administrator> getUserList() {
        return userList;
    }

    public void setUserList(List<Administrator> userList) {
        this.userList = userList;
    }

    public BigDecimal getMpsmoduleId() {
        return mpsmoduleId;
    }

    public void setMpsmoduleId(BigDecimal mpsmoduleId) {
        this.mpsmoduleId = mpsmoduleId;
    }

    public BigDecimal getElementid() {
        return elementid;
    }

    public void setElementid(BigDecimal elementid) {
        this.elementid = elementid;
    }

    public String getElementtype() {
        return elementtype;
    }

    public void setElementtype(String elementtype) {
        this.elementtype = elementtype;
    }

    public String getQueryListType() {
        return queryListType;
    }

    public void setQueryListType(String queryListType) {
        this.queryListType = queryListType;
    }

    public Boolean getChecked() {
        return checked;
    }

    public void setChecked(Boolean checked) {
        this.checked = checked;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        CoreMpsModule that = (CoreMpsModule) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public List<CoreMpsModule> getNodes() {
        return nodes;
    }

    @Override
    public void setNodes(List<CoreMpsModule> nodes) {
        this.nodes = nodes;
    }

    public BigDecimal getUserId() {
        return userId;
    }

    public void setUserId(BigDecimal userId) {
        this.userId = userId;
    }
}
