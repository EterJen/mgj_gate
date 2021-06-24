package com.gwideal.core.basic.l4.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.gwideal.core.cms.l4.entity.Administrator;
import com.gwideal.core.workflow.DEnums.ParticipantType;
import com.gwideal.core.workflow.DParticipantInfo;
import com.gwideal.core.workflow.DParticipantInfoDetails;
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

@Table(name = "ORGROLE")
@JsonIgnoreProperties(ignoreUnknown = true)
@IncAnnoDbName(name = "dameng", comment = "默认表名")
public class CoreRole extends com.gwideal.core.common.CoreBaseEntity<CoreRole, BigDecimal> implements DParticipantInfo, Serializable {

    @Id()
    @IncAnnoColumn(name = "ID", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "默认标签")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "select JXWOAUniversalSeq.nextval from dual")
    private java.math.BigDecimal id;

    @IncAnnoColumn(name = "PKID", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "默认标签")
    private java.math.BigDecimal pkid;

    @IncAnnoColumn(name = "NAME", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "64", comment = "默认标签")
    private java.lang.String name;

    @IncAnnoColumn(name = "DESCRIPTION", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "128", comment = "默认标签")
    private java.lang.String description;

    @IncAnnoColumn(name = "CLICKRATE", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "默认标签")
    private java.math.BigDecimal clickrate;

    @IncAnnoColumn(name = "FLAG", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "默认标签")
    private java.math.BigDecimal flag;

    @IncAnnoColumn(name = "SHOW_ABLE", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "默认标签")
    private java.math.BigDecimal showAble;

    public java.math.BigDecimal getId() {
        return this.id;
    }

    public void setId(java.math.BigDecimal id) {
        this.id = id;
    }

    public java.math.BigDecimal getPkid() {
        return this.pkid;
    }

    public void setPkid(java.math.BigDecimal pkid) {
        this.pkid = pkid;
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

    public java.math.BigDecimal getFlag() {
        return this.flag;
    }

    public void setFlag(java.math.BigDecimal flag) {
        this.flag = flag;
    }

    public void setShowAble(java.math.BigDecimal showAble) {
        this.showAble = showAble;
    }

    public java.math.BigDecimal getShowAble() {
        return this.showAble;
    }

    public java.math.BigDecimal getClickrate() {
        return clickrate;
    }

    public void setClickrate(java.math.BigDecimal clickrate) {
        this.clickrate = clickrate;
    }

    /*手动添加非持久化字段，必须加上Transient注解*/
    @javax.persistence.Transient
    private List<Administrator> users = new ArrayList<Administrator>();

    @javax.persistence.Transient
    private String orderBy;

    public List<Administrator> getUsers() {
        return users;
    }

    public void setUsers(List<Administrator> users) {
        this.users = users;
    }

    @Override
    public ParticipantType getParticipantType() {
        return ParticipantType.Role;
    }

    @Override
    public BigDecimal getParticipantId() {
        return this.id;
    }

    @Override
    public String getParticipantName() {
        return this.name;
    }

    public String getOrderBy() {
        return orderBy;
    }

    public void setOrderBy(String orderBy) {
        this.orderBy = orderBy;
    }

    @javax.persistence.Transient
    private List<DParticipantInfoDetails> childrenParticipants;

    @javax.persistence.Transient
    private Boolean expand = false;

    @Override
    public List<DParticipantInfoDetails> getChildrenParticipants() {
        return childrenParticipants;
    }

    public void setChildrenParticipants(List<DParticipantInfoDetails> childrenParticipants) {
        this.childrenParticipants = childrenParticipants;
    }

    @Override
    public Boolean getExpand() {
        return expand;
    }

    public void setExpand(Boolean expand) {
        this.expand = expand;
    }
}
