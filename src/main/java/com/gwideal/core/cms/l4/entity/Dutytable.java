package com.gwideal.core.cms.l4.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.gwideal.increment.generator.IncAnnoColumn;
import com.gwideal.increment.generator.IncAnnoDbName;

import javax.persistence.*;
import java.util.Date;

@Table(name = "DUTYTABLE")
@IncAnnoDbName(name = "dameng", comment = "值班表")
public class Dutytable extends com.gwideal.core.common.CoreBaseEntity {

    @Id()
    @IncAnnoColumn(name = "ID", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "主键")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "select JXWOAUniversalSeq.nextval from dual")
    private java.math.BigDecimal id;

    @IncAnnoColumn(name = "YEAR", dbType = "NUMBER", jdbcType = "INTEGER", dataPrecision = "4", dataScale = "0", dataLength = "22", comment = "年")
    private java.lang.Integer year;

    @IncAnnoColumn(name = "MONTH", dbType = "NUMBER", jdbcType = "INTEGER", dataPrecision = "2", dataScale = "0", dataLength = "22", comment = "月")
    private java.lang.Integer month;

    @IncAnnoColumn(name = "DAY", dbType = "NUMBER", jdbcType = "INTEGER", dataPrecision = "2", dataScale = "0", dataLength = "22", comment = "日")
    private java.lang.Integer day;

    @IncAnnoColumn(name = "WEEK", dbType = "NUMBER", jdbcType = "INTEGER", dataPrecision = "1", dataScale = "0", dataLength = "22", comment = "星期")
    private java.lang.Integer week;

    @IncAnnoColumn(name = "DATELONG", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "20", comment = "日期")
    private java.lang.String datelong;

    @IncAnnoColumn(name = "HOLIDAY", dbType = "NUMBER", jdbcType = "INTEGER", dataPrecision = "1", dataScale = "0", dataLength = "22", comment = "是否是节假日 0：否，1：是")
    private java.lang.Integer holiday;

    @IncAnnoColumn(name = "USER1", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "20", comment = "技保处")
    private java.lang.String user1;

    @IncAnnoColumn(name = "USER2", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "20", comment = "通信组")
    private java.lang.String user2;

    @IncAnnoColumn(name = "USER3", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "20", comment = "修改时间")
    private java.lang.String user3;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @IncAnnoColumn(name = "UPDATETIME", dbType = "DATETIME", jdbcType = "TIMESTAMP", dataPrecision = "", dataScale = "6", dataLength = "8", comment = "默认标签")
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

    public java.lang.Integer getMonth() {
        return this.month;
    }

    public void setMonth(java.lang.Integer month) {
        this.month = month;
    }

    public java.lang.Integer getDay() {
        return this.day;
    }

    public void setDay(java.lang.Integer day) {
        this.day = day;
    }

    public java.lang.Integer getWeek() {
        return this.week;
    }

    public void setWeek(java.lang.Integer week) {
        this.week = week;
    }

    public java.lang.String getDatelong() {
        return this.datelong;
    }

    public void setDatelong(java.lang.String datelong) {
        this.datelong = datelong;
    }

    public java.lang.Integer getHoliday() {
        return this.holiday;
    }

    public void setHoliday(java.lang.Integer holiday) {
        this.holiday = holiday;
    }

    public java.lang.String getUser1() {
        return this.user1;
    }

    public void setUser1(java.lang.String user1) {
        this.user1 = user1;
    }

    public java.lang.String getUser2() {
        return this.user2;
    }

    public void setUser2(java.lang.String user2) {
        this.user2 = user2;
    }

    public java.lang.String getUser3() {
        return this.user3;
    }

    public void setUser3(java.lang.String user3) {
        this.user3 = user3;
    }

    public java.util.Date getUpdatetime() {
        return this.updatetime;
    }

    public void setUpdatetime(java.util.Date updatetime) {
        this.updatetime = updatetime;
    }

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @Transient
    private java.util.Date startDate;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @Transient
    private java.util.Date endDate;

    @Transient
    private String weekName;

    @Transient
    private Administrator administrator1;

    @Transient
    private Administrator administrator2;

    @Transient
    private Administrator administrator3;

    public String getWeekName() {
        if (week!=null) {
            switch(this.week){
                case 1:
                    weekName="周一";
                    break;
                case 2:
                    weekName="周二";
                    break;
                case 3:
                    weekName="周三";
                    break;
                case 4:
                    weekName="周四";
                    break;
                case 5:
                    weekName="周五";
                    break;
                case 6:
                    weekName="周六";
                    break;
                case 0:
                    weekName="周日";
                    break;
                default:
                    weekName="未知";
                    break;
            }
        }

        return weekName;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public Administrator getAdministrator1() {
        return administrator1;
    }

    public void setAdministrator1(Administrator administrator1) {
        this.administrator1 = administrator1;
    }

    public Administrator getAdministrator2() {
        return administrator2;
    }

    public void setAdministrator2(Administrator administrator2) {
        this.administrator2 = administrator2;
    }

    public Administrator getAdministrator3() {
        return administrator3;
    }

    public void setAdministrator3(Administrator administrator3) {
        this.administrator3 = administrator3;
    }
}
