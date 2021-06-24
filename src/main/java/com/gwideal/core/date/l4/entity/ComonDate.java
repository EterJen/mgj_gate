package com.gwideal.core.date.l4.entity;

import javax.persistence.Transient;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.gwideal.increment.generator.IncAnnoColumn;
import com.gwideal.increment.generator.IncAnnoDbName;
import java.util.Date;

@Table(name = "COMON_DATE")
@IncAnnoDbName(name = "dameng", comment = "默认表名")
public class ComonDate extends com.gwideal.core.common.CoreBaseEntity {

    @Id()
    @IncAnnoColumn(name = "ID", dbType = "NUMERIC", jdbcType = "NUMERIC", dataPrecision = "38", dataScale = "65531", dataLength = "0", comment = "默认标签")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "select JXWOAUniversalSeq.nextval from dual")
    private java.math.BigDecimal id;

    @IncAnnoColumn(name = "O_DATE", dbType = "TIMESTAMP", jdbcType = "TIMESTAMP", dataPrecision = "", dataScale = "", dataLength = "8", comment = "默认标签")
    private java.util.Date oDate;

    @IncAnnoColumn(name = "YEAR", dbType = "NUMERIC", jdbcType = "NUMERIC", dataPrecision = "38", dataScale = "65531", dataLength = "0", comment = "默认标签")
    private java.math.BigDecimal year;

    @IncAnnoColumn(name = "MONTH", dbType = "NUMERIC", jdbcType = "NUMERIC", dataPrecision = "38", dataScale = "65531", dataLength = "0", comment = "默认标签")
    private java.math.BigDecimal month;

    @IncAnnoColumn(name = "DAY", dbType = "NUMERIC", jdbcType = "NUMERIC", dataPrecision = "38", dataScale = "65531", dataLength = "0", comment = "默认标签")
    private java.math.BigDecimal day;

    @IncAnnoColumn(name = "LUNAR_YEAR", dbType = "NUMERIC", jdbcType = "NUMERIC", dataPrecision = "38", dataScale = "65531", dataLength = "0", comment = "默认标签")
    private java.math.BigDecimal lunarYear;

    @IncAnnoColumn(name = "LUNAR_MONTH", dbType = "NUMERIC", jdbcType = "NUMERIC", dataPrecision = "38", dataScale = "65531", dataLength = "0", comment = "默认标签")
    private java.math.BigDecimal lunarMonth;

    @IncAnnoColumn(name = "LUNAR_DATE", dbType = "NUMERIC", jdbcType = "NUMERIC", dataPrecision = "38", dataScale = "65531", dataLength = "0", comment = "默认标签")
    private java.math.BigDecimal lunarDate;

    @IncAnnoColumn(name = "L_MONTH", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "50", comment = "默认标签")
    private java.lang.String lMonth;

    @IncAnnoColumn(name = "L_DATE", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "50", comment = "默认标签")
    private java.lang.String lDate;

    @IncAnnoColumn(name = "GZ_YEAR", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "50", comment = "默认标签")
    private java.lang.String gzYear;

    @IncAnnoColumn(name = "GZ_MONTH", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "50", comment = "默认标签")
    private java.lang.String gzMonth;

    @IncAnnoColumn(name = "GZ_DATE", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "50", comment = "默认标签")
    private java.lang.String gzDate;

    @IncAnnoColumn(name = "ANIMAL", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "50", comment = "默认标签")
    private java.lang.String animal;

    @IncAnnoColumn(name = "CN_DAY", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "50", comment = "默认标签")
    private java.lang.String cnDay;

    @IncAnnoColumn(name = "TERM", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "50", comment = "默认标签")
    private java.lang.String term;

    @IncAnnoColumn(name = "IS_BIG_MONTH", dbType = "NUMERIC", jdbcType = "NUMERIC", dataPrecision = "38", dataScale = "65531", dataLength = "0", comment = "默认标签")
    private java.math.BigDecimal isBigMonth;

    @IncAnnoColumn(name = "AVOID", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "1000", comment = "默认标签")
    private java.lang.String avoid;

    @IncAnnoColumn(name = "SUIT", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "1000", comment = "默认标签")
    private java.lang.String suit;

    @IncAnnoColumn(name = "VALUE", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "1000", comment = "默认标签")
    private java.lang.String value;

    @IncAnnoColumn(name = "SEASONS", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "10", comment = "默认标签")
    private java.lang.String seasons;

    @IncAnnoColumn(name = "STATUS", dbType = "NUMERIC", jdbcType = "NUMERIC", dataPrecision = "38", dataScale = "65531", dataLength = "0", comment = "默认标签")
    private java.math.BigDecimal status;

    @IncAnnoColumn(name = "DESCRIPTION", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "1000", comment = "默认标签")
    private java.lang.String description;

    public java.math.BigDecimal getId() {
        return this.id;
    }

    public void setId(java.math.BigDecimal id) {
        this.id = id;
    }

    public java.util.Date getODate() {
        return this.oDate;
    }

    public void setODate(java.util.Date oDate) {
        this.oDate = oDate;
    }

    public java.math.BigDecimal getYear() {
        return this.year;
    }

    public void setYear(java.math.BigDecimal year) {
        this.year = year;
    }

    public java.math.BigDecimal getMonth() {
        return this.month;
    }

    public void setMonth(java.math.BigDecimal month) {
        this.month = month;
    }

    public java.math.BigDecimal getDay() {
        return this.day;
    }

    public void setDay(java.math.BigDecimal day) {
        this.day = day;
    }

    public java.math.BigDecimal getLunarYear() {
        return this.lunarYear;
    }

    public void setLunarYear(java.math.BigDecimal lunarYear) {
        this.lunarYear = lunarYear;
    }

    public java.math.BigDecimal getLunarMonth() {
        return this.lunarMonth;
    }

    public void setLunarMonth(java.math.BigDecimal lunarMonth) {
        this.lunarMonth = lunarMonth;
    }

    public java.math.BigDecimal getLunarDate() {
        return this.lunarDate;
    }

    public void setLunarDate(java.math.BigDecimal lunarDate) {
        this.lunarDate = lunarDate;
    }

    public java.lang.String getLMonth() {
        return this.lMonth;
    }

    public void setLMonth(java.lang.String lMonth) {
        this.lMonth = lMonth;
    }

    public java.lang.String getLDate() {
        return this.lDate;
    }

    public void setLDate(java.lang.String lDate) {
        this.lDate = lDate;
    }

    public java.lang.String getGzYear() {
        return this.gzYear;
    }

    public void setGzYear(java.lang.String gzYear) {
        this.gzYear = gzYear;
    }

    public java.lang.String getGzMonth() {
        return this.gzMonth;
    }

    public void setGzMonth(java.lang.String gzMonth) {
        this.gzMonth = gzMonth;
    }

    public java.lang.String getGzDate() {
        return this.gzDate;
    }

    public void setGzDate(java.lang.String gzDate) {
        this.gzDate = gzDate;
    }

    public java.lang.String getAnimal() {
        return this.animal;
    }

    public void setAnimal(java.lang.String animal) {
        this.animal = animal;
    }

    public java.lang.String getCnDay() {
        return this.cnDay;
    }

    public void setCnDay(java.lang.String cnDay) {
        this.cnDay = cnDay;
    }

    public java.lang.String getTerm() {
        return this.term;
    }

    public void setTerm(java.lang.String term) {
        this.term = term;
    }

    public java.math.BigDecimal getIsBigMonth() {
        return this.isBigMonth;
    }

    public void setIsBigMonth(java.math.BigDecimal isBigMonth) {
        this.isBigMonth = isBigMonth;
    }

    public java.lang.String getAvoid() {
        return this.avoid;
    }

    public void setAvoid(java.lang.String avoid) {
        this.avoid = avoid;
    }

    public java.lang.String getSuit() {
        return this.suit;
    }

    public void setSuit(java.lang.String suit) {
        this.suit = suit;
    }

    public void setValue(java.lang.String value) {
        this.value = value;
    }

    public java.lang.String getValue() {
        return this.value;
    }

    public void setSeasons(java.lang.String seasons) {
        this.seasons = seasons;
    }

    public java.lang.String getSeasons() {
        return this.seasons;
    }

    public void setStatus(java.math.BigDecimal status) {
        this.status = status;
    }

    public java.math.BigDecimal getStatus() {
        return this.status;
    }

    public void setDescription(java.lang.String description) {
        this.description = description;
    }

    public java.lang.String getDescription() {
        return this.description;
    }

    @Transient
    private ComonDate updateQuery;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @Transient
    private java.util.Date startDay;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @Transient
    private java.util.Date endDay;

    @Transient
    private String desc;


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

    public ComonDate getUpdateQuery() {
        return updateQuery;
    }

    public void setUpdateQuery(ComonDate updateQuery) {
        this.updateQuery = updateQuery;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public Date getoDate() {
        return oDate;
    }

    public void setoDate(Date oDate) {
        this.oDate = oDate;
    }

    public String getlMonth() {
        return lMonth;
    }

    public void setlMonth(String lMonth) {
        this.lMonth = lMonth;
    }

    public String getlDate() {
        return lDate;
    }

    public void setlDate(String lDate) {
        this.lDate = lDate;
    }
}
