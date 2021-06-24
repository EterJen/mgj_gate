package com.gwideal.core.cms.l4.entity;

import javax.persistence.Transient;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.gwideal.core.date.l4.entity.ComonDate;
import com.gwideal.increment.generator.IncAnnoColumn;
import com.gwideal.increment.generator.IncAnnoDbName;
import java.util.Date;

@Table(name = "USER_VIEW_SKIN")
@IncAnnoDbName(name = "dameng", comment = "默认表名")
public class UserViewSkin extends com.gwideal.core.common.CoreBaseEntity {

    @Id()
    @IncAnnoColumn(name = "ID", dbType = "NUMERIC", jdbcType = "NUMERIC", dataPrecision = "38", dataScale = "65531", dataLength = "0", comment = "默认标签")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "select JXWOAUniversalSeq.nextval from dual")
    private java.math.BigDecimal id;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @IncAnnoColumn(name = "DAY", dbType = "TIMESTAMP", jdbcType = "TIMESTAMP", dataPrecision = "", dataScale = "", dataLength = "8", comment = "默认标签")
    private java.util.Date day;

    @IncAnnoColumn(name = "SKIN", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "200", comment = "默认标签")
    private java.lang.String skin;

    public java.math.BigDecimal getId() {
        return this.id;
    }

    public void setId(java.math.BigDecimal id) {
        this.id = id;
    }

    public java.util.Date getDay() {
        return this.day;
    }

    public void setDay(java.util.Date day) {
        this.day = day;
    }

    public java.lang.String getSkin() {
        return this.skin;
    }

    public void setSkin(java.lang.String skin) {
        this.skin = skin;
    }

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @Transient
    private java.util.Date startDay;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @Transient
    private java.util.Date endDay;
    @Transient
    private ComonDate comonDate;

    public Date getStartDay() {
        return startDay;
    }

    public void setStartDay(Date startDay) {
        this.startDay = startDay;
    }

    public Date getEndDay() {
        return endDay;
    }

    public void setEndDay(Date endDay) {
        this.endDay = endDay;
    }

    public ComonDate getComonDate() {
        return comonDate;
    }

    public void setComonDate(ComonDate comonDate) {
        this.comonDate = comonDate;
    }
}
