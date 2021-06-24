package com.gwideal.core.cms.l4.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.gwideal.increment.generator.IncAnnoColumn;
import com.gwideal.increment.generator.IncAnnoDbName;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.math.BigDecimal;

@Table(name = "DUTYDATE")
@IncAnnoDbName(name = "dameng", comment = "值班时间表")
public class Dutydate extends com.gwideal.core.common.CoreBaseEntity<Dutydate, BigDecimal> {

    @Id()
    @IncAnnoColumn(name = "ID", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "主键")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "select JXWOAUniversalSeq.nextval from dual")
    private java.math.BigDecimal id;

    @IncAnnoColumn(name = "YEAR", dbType = "NUMBER", jdbcType = "INTEGER", dataPrecision = "4", dataScale = "0", dataLength = "22", comment = "年份")
    private java.lang.Integer year;

    @IncAnnoColumn(name = "HOLIDAY", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "1024", comment = "法定节假日")
    private java.lang.String holiday;

    @IncAnnoColumn(name = "WORKDAY", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "1024", comment = "周末调班")
    private java.lang.String workday;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @IncAnnoColumn(name = "UPDATETIME", dbType = "DATETIME", jdbcType = "TIMESTAMP", dataPrecision = "", dataScale = "6", dataLength = "8", comment = "修改时间")
    private java.util.Date updatetime;

    public java.math.BigDecimal getId() {
        return this.id;
    }

    public void setId(java.math.BigDecimal id) {
        this.id = id;
    }

    public java.lang.Integer getYear() {
        return this.year;
    }

    public void setYear(java.lang.Integer year) {
        this.year = year;
    }

    public java.lang.String getHoliday() {
        return this.holiday;
    }

    public void setHoliday(java.lang.String holiday) {
        this.holiday = holiday;
    }

    public java.lang.String getWorkday() {
        return this.workday;
    }

    public void setWorkday(java.lang.String workday) {
        this.workday = workday;
    }

    public java.util.Date getUpdatetime() {
        return this.updatetime;
    }

    public void setUpdatetime(java.util.Date updatetime) {
        this.updatetime = updatetime;
    }


}
