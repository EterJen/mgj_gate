package com.gwideal.core.cms.l4.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.gwideal.core.basic.l4.entity.CoreMpsModule;
import com.gwideal.core.basic.l4.entity.CoreRole;
import com.gwideal.increment.generator.IncAnnoColumn;
import com.gwideal.increment.generator.IncAnnoDbName;
import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Table(name = "ADMINISTRATOR")
@IncAnnoDbName(name = "dameng", comment = "默认表名")
public class Administrator extends com.gwideal.core.common.CoreBaseEntity<Administrator, BigDecimal> implements Serializable {

    @Id()
    @IncAnnoColumn(name = "ID", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "0", dataLength = "22", comment = "默认标签")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "select JXWOAUniversalSeq.nextval from dual")
    private java.math.BigDecimal id;

    @IncAnnoColumn(name = "SN", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "64", comment = "默认标签")
    private java.lang.String sn;

    @IncAnnoColumn(name = "NAME", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "50", comment = "默认标签")
    private java.lang.String name;

    @IncAnnoColumn(name = "DISPLAY", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "20", comment = "默认标签")
    private java.lang.String display;

    @IncAnnoColumn(name = "ROLEID", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "默认标签")
    private java.math.BigDecimal roleid;

    @IncAnnoColumn(name = "DESCRIPTION", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "2000", comment = "默认标签")
    private java.lang.String description;

    @IncAnnoColumn(name = "DEPARTMENT", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "50", comment = "默认标签")
    private java.lang.String department;

    @IncAnnoColumn(name = "PASSWORD", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "200", comment = "默认标签")
    private java.lang.String password;

    @IncAnnoColumn(name = "MAIL", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "100", comment = "默认标签")
    private java.lang.String mail;

    @IncAnnoColumn(name = "PHONE", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "11", comment = "默认标签")
    private java.lang.String phone;

    @IncAnnoColumn(name = "STATE", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "默认标签")
    private java.math.BigDecimal state;

    @IncAnnoColumn(name = "CERT", dbType = "TEXT", jdbcType = "LONGVARCHAR", dataPrecision = "", dataScale = "0", dataLength = "2147483647", comment = "默认标签")
    private java.lang.String cert;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @IncAnnoColumn(name = "CREATETIME", dbType = "DATETIME", jdbcType = "TIMESTAMP", dataPrecision = "", dataScale = "6", dataLength = "8", comment = "默认标签")
    private java.util.Date createtime;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @IncAnnoColumn(name = "MODIFYTIME", dbType = "DATETIME", jdbcType = "TIMESTAMP", dataPrecision = "", dataScale = "6", dataLength = "8", comment = "默认标签")
    private java.util.Date modifytime;

    @IncAnnoColumn(name = "DN", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "64", comment = "默认标签")
    private java.lang.String dn;

    @IncAnnoColumn(name = "ISDELETE", dbType = "NUMBER", jdbcType = "INTEGER", dataPrecision = "1", dataScale = "0", dataLength = "22", comment = "默认标签")
    private java.lang.Integer isdelete;

    @IncAnnoColumn(name = "COMMENTED", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "1024", comment = "默认标签")
    private java.lang.String commented;

    @IncAnnoColumn(name = "USB_KEY_INFO", dbType = "TEXT", jdbcType = "LONGVARCHAR", dataPrecision = "", dataScale = "0", dataLength = "2147483647", comment = "默认标签")
    private java.lang.String usbKeyInfo;

    @IncAnnoColumn(name = "SHOW_ABLE", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "默认标签")
    private java.math.BigDecimal showAble;

    @IncAnnoColumn(name = "SIGN_TEXT", dbType = "TEXT", jdbcType = "LONGVARCHAR", dataPrecision = "", dataScale = "0", dataLength = "2147483647", comment = "默认标签")
    private java.lang.String signText;

    public String getSignText() {
        return signText;
    }

    public void setSignText(String signText) {
        this.signText = signText;
    }

    public java.math.BigDecimal getId() {
        return this.id;
    }

    public void setId(java.math.BigDecimal id) {
        this.id = id;
    }

    public java.lang.String getSn() {
        return this.sn;
    }

    public void setSn(java.lang.String sn) {
        this.sn = sn;
    }

    public java.lang.String getName() {
        return this.name;
    }

    public void setName(java.lang.String name) {
        this.name = name;
    }

    public java.lang.String getDisplay() {
        return this.display;
    }

    public void setDisplay(java.lang.String display) {
        this.display = display;
    }

    public java.math.BigDecimal getRoleid() {
        return this.roleid;
    }

    public void setRoleid(java.math.BigDecimal roleid) {
        this.roleid = roleid;
    }

    public java.lang.String getDescription() {
        return this.description;
    }

    public void setDescription(java.lang.String description) {
        this.description = description;
    }

    public java.lang.String getDepartment() {
        return this.department;
    }

    public void setDepartment(java.lang.String department) {
        this.department = department;
    }

    public java.lang.String getPassword() {
        return this.password;
    }

    public void setPassword(java.lang.String password) {
        this.password = password;
    }

    public java.lang.String getMail() {
        return this.mail;
    }

    public void setMail(java.lang.String mail) {
        this.mail = mail;
    }

    public java.lang.String getPhone() {
        return this.phone;
    }

    public void setPhone(java.lang.String phone) {
        this.phone = phone;
    }

    public java.math.BigDecimal getState() {
        return this.state;
    }

    public void setState(java.math.BigDecimal state) {
        this.state = state;
    }

    public java.lang.String getCert() {
        return this.cert;
    }

    public void setCert(java.lang.String cert) {
        this.cert = cert;
    }

    public java.util.Date getCreatetime() {
        return this.createtime;
    }

    public void setCreatetime(java.util.Date createtime) {
        this.createtime = createtime;
    }

    public java.util.Date getModifytime() {
        return this.modifytime;
    }

    public void setModifytime(java.util.Date modifytime) {
        this.modifytime = modifytime;
    }

    public java.lang.String getDn() {
        return this.dn;
    }

    public void setDn(java.lang.String dn) {
        this.dn = dn;
    }

    public java.lang.Integer getIsdelete() {
        return this.isdelete;
    }

    public void setIsdelete(java.lang.Integer isdelete) {
        this.isdelete = isdelete;
    }

    public void setCommented(java.lang.String commented) {
        this.commented = commented;
    }

    public java.lang.String getCommented() {
        return this.commented;
    }

    public void setUsbKeyInfo(java.lang.String usbKeyInfo) {
        this.usbKeyInfo = usbKeyInfo;
    }

    public java.lang.String getUsbKeyInfo() {
        return this.usbKeyInfo;
    }

    public void setShowAble(java.math.BigDecimal showAble) {
        this.showAble = showAble;
    }

    public java.math.BigDecimal getShowAble() {
        return this.showAble;
    }

    @Transient
    private String sessionId;

    @Transient
    private BigDecimal usermode = new BigDecimal(1);

    @Transient
    private BigDecimal orderNum;

    @Transient
    private boolean isAdmin = false;

    /*后台访问*/
    @Transient
    private boolean htfw = false;

    @Transient
    private List<CoreRole> roleList = new ArrayList<CoreRole>();

    @Transient
    List<CoreMpsModule> userAuthTree = new ArrayList<CoreMpsModule>();

    @Transient
    private boolean hasRoleNeiQin = false;

    @Transient
    private boolean zhenzhi = false;

    @Transient
    private boolean fuzhi = false;

    @Transient
    private BigDecimal oaDeptId;

    @Transient
    private boolean bgsUser = false;

    @Transient
    private String oaDeptName;

    @Transient
    Set<String> userAuthUri = new HashSet<>();

    /*安全管理用户() 下的用户透明不可见  操作权限不被拦截*/
    @Transient
    private boolean securityUser;

    @JsonIgnore
    public Set<BigDecimal> getRoleIds() {
        if (this.roleList.isEmpty())
            return new HashSet<BigDecimal>();
        else {
            Set<BigDecimal> ids = new HashSet<BigDecimal>();
            for (CoreRole cr : this.roleList) {
                ids.add(cr.getId());
            }
            return ids;
        }
    }

    public void setSecurityUser() {
        if (null == this.roleList || this.roleList.isEmpty()) {
            this.securityUser = false;
        } else {
            BigDecimal secRoleId = new BigDecimal(3000);
            for (CoreRole coreRole : this.roleList) {
                if (coreRole.getId().equals(secRoleId)) {
                    this.securityUser = true;
                    break;
                }
            }
        }
    }

    public boolean isSecurityUser() {
        return securityUser;
    }

    public void setSecurityUser(boolean securityUser) {
        this.securityUser = securityUser;
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public List<CoreRole> getRoleList() {
        return roleList;
    }

    public void setRoleList(List<CoreRole> roleList) {
        this.roleList = roleList;
    }

    public BigDecimal getUsermode() {
        return usermode;
    }

    public void setUsermode(BigDecimal usermode) {
        this.usermode = usermode;
    }

    public List<CoreMpsModule> getUserAuthTree() {
        return userAuthTree;
    }

    public void setUserAuthTree(List<CoreMpsModule> userAuthTree) {
        this.userAuthTree = userAuthTree;
    }

    public Set<String> getUserAuthUri() {
        return userAuthUri;
    }

    public void setUserAuthUri(Set<String> userAuthUri) {
        this.userAuthUri = userAuthUri;
    }

    public BigDecimal getOrderNum() {
        return orderNum;
    }

    public void setOrderNum(BigDecimal orderNum) {
        this.orderNum = orderNum;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public void setAdmin(boolean admin) {
        isAdmin = admin;
    }

    public boolean isHasRoleNeiQin() {
        return hasRoleNeiQin;
    }

    public void setHasRoleNeiQin(boolean hasRoleNeiQin) {
        this.hasRoleNeiQin = hasRoleNeiQin;
    }

    public boolean isZhenzhi() {
        return zhenzhi;
    }

    public void setZhenzhi(boolean zhenzhi) {
        this.zhenzhi = zhenzhi;
    }

    public boolean isFuzhi() {
        return fuzhi;
    }

    public void setFuzhi(boolean fuzhi) {
        this.fuzhi = fuzhi;
    }

    public BigDecimal getOaDeptId() {
        return oaDeptId;
    }

    public void setOaDeptId(BigDecimal oaDeptId) {
        this.oaDeptId = oaDeptId;
    }

    public String getOaDeptName() {
        return oaDeptName;
    }

    public void setOaDeptName(String oaDeptName) {
        this.oaDeptName = oaDeptName;
    }

    public boolean isBgsUser() {
        return bgsUser;
    }

    public void setBgsUser(boolean bgsUser) {
        this.bgsUser = bgsUser;
    }

    public boolean isHtfw() {
        return htfw;
    }

    public void setHtfw(boolean htfw) {
        this.htfw = htfw;
    }

    @Override
    public String toString() {
        return "{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", display='" + display + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
