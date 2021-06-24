package com.gwideal.core.cms.l4.entity;

import javax.persistence.Transient;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import com.gwideal.increment.generator.IncAnnoColumn;
import com.gwideal.increment.generator.IncAnnoDbName;

@Table(name = "ATTENDANCE_D")
@IncAnnoDbName(name = "dameng", comment = "默认表名")
public class AttendanceD extends com.gwideal.core.common.CoreBaseEntity {

    @Id()
    @IncAnnoColumn(name = "ID", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "默认标签")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "select JXWOAUniversalSeq.nextval from dual")
    private java.math.BigDecimal id;

    @IncAnnoColumn(name = "ATTENDANCE_ID", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "默认标签")
    private java.math.BigDecimal attendanceId;

    @IncAnnoColumn(name = "DAY31", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "10", comment = "默认标签")
    private java.lang.String day31;

    @IncAnnoColumn(name = "DAY30", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "10", comment = "默认标签")
    private java.lang.String day30;

    @IncAnnoColumn(name = "DAY29", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "10", comment = "默认标签")
    private java.lang.String day29;

    @IncAnnoColumn(name = "DAY28", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "10", comment = "默认标签")
    private java.lang.String day28;

    @IncAnnoColumn(name = "DAY27", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "10", comment = "默认标签")
    private java.lang.String day27;

    @IncAnnoColumn(name = "DAY26", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "10", comment = "默认标签")
    private java.lang.String day26;

    @IncAnnoColumn(name = "DAY25", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "10", comment = "默认标签")
    private java.lang.String day25;

    @IncAnnoColumn(name = "DAY24", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "10", comment = "默认标签")
    private java.lang.String day24;

    @IncAnnoColumn(name = "DAY23", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "10", comment = "默认标签")
    private java.lang.String day23;

    @IncAnnoColumn(name = "DAY22", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "10", comment = "默认标签")
    private java.lang.String day22;

    @IncAnnoColumn(name = "DAY21", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "10", comment = "默认标签")
    private java.lang.String day21;

    @IncAnnoColumn(name = "DAY20", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "10", comment = "默认标签")
    private java.lang.String day20;

    @IncAnnoColumn(name = "DAY19", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "10", comment = "默认标签")
    private java.lang.String day19;

    @IncAnnoColumn(name = "DAY18", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "10", comment = "默认标签")
    private java.lang.String day18;

    @IncAnnoColumn(name = "DAY17", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "10", comment = "默认标签")
    private java.lang.String day17;

    @IncAnnoColumn(name = "DAY16", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "10", comment = "默认标签")
    private java.lang.String day16;

    @IncAnnoColumn(name = "DAY15", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "10", comment = "默认标签")
    private java.lang.String day15;

    @IncAnnoColumn(name = "DAY14", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "10", comment = "默认标签")
    private java.lang.String day14;

    @IncAnnoColumn(name = "DAY13", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "10", comment = "默认标签")
    private java.lang.String day13;

    @IncAnnoColumn(name = "DAY12", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "10", comment = "默认标签")
    private java.lang.String day12;

    @IncAnnoColumn(name = "DAY11", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "10", comment = "默认标签")
    private java.lang.String day11;

    @IncAnnoColumn(name = "DAY10", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "10", comment = "默认标签")
    private java.lang.String day10;

    @IncAnnoColumn(name = "DAY9", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "10", comment = "默认标签")
    private java.lang.String day9;

    @IncAnnoColumn(name = "DAY8", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "10", comment = "默认标签")
    private java.lang.String day8;

    @IncAnnoColumn(name = "DAY7", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "10", comment = "默认标签")
    private java.lang.String day7;

    @IncAnnoColumn(name = "DAY6", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "10", comment = "默认标签")
    private java.lang.String day6;

    @IncAnnoColumn(name = "DAY5", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "10", comment = "默认标签")
    private java.lang.String day5;

    @IncAnnoColumn(name = "DAY4", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "10", comment = "默认标签")
    private java.lang.String day4;

    @IncAnnoColumn(name = "DAY3", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "10", comment = "默认标签")
    private java.lang.String day3;

    @IncAnnoColumn(name = "DAY2", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "10", comment = "默认标签")
    private java.lang.String day2;

    @IncAnnoColumn(name = "DAY1", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "10", comment = "默认标签")
    private java.lang.String day1;

    @IncAnnoColumn(name = "USERNAME", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "20", comment = "默认标签")
    private java.lang.String username;

    @IncAnnoColumn(name = "USER_ID", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "默认标签")
    private java.math.BigDecimal userId;

    @IncAnnoColumn(name = "SECOND_TO", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "500", comment = "默认标签")
    private java.lang.String secondTo;

    @IncAnnoColumn(name = "SECOND_FLAG", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "5", comment = "默认标签")
    private java.lang.String secondFlag;

    @IncAnnoColumn(name = "ORDER_NUM", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "默认标签")
    private java.math.BigDecimal orderNum;

    public java.math.BigDecimal getId() {
        return this.id;
    }

    public void setId(java.math.BigDecimal id) {
        this.id = id;
    }

    public java.math.BigDecimal getAttendanceId() {
        return this.attendanceId;
    }

    public void setAttendanceId(java.math.BigDecimal attendanceId) {
        this.attendanceId = attendanceId;
    }

    public void setDay31(java.lang.String day31) {
        this.day31 = day31;
    }

    public java.lang.String getDay31() {
        return this.day31;
    }

    public void setDay30(java.lang.String day30) {
        this.day30 = day30;
    }

    public java.lang.String getDay30() {
        return this.day30;
    }

    public void setDay29(java.lang.String day29) {
        this.day29 = day29;
    }

    public java.lang.String getDay29() {
        return this.day29;
    }

    public void setDay28(java.lang.String day28) {
        this.day28 = day28;
    }

    public java.lang.String getDay28() {
        return this.day28;
    }

    public void setDay27(java.lang.String day27) {
        this.day27 = day27;
    }

    public java.lang.String getDay27() {
        return this.day27;
    }

    public void setDay26(java.lang.String day26) {
        this.day26 = day26;
    }

    public java.lang.String getDay26() {
        return this.day26;
    }

    public void setDay25(java.lang.String day25) {
        this.day25 = day25;
    }

    public java.lang.String getDay25() {
        return this.day25;
    }

    public void setDay24(java.lang.String day24) {
        this.day24 = day24;
    }

    public java.lang.String getDay24() {
        return this.day24;
    }

    public void setDay23(java.lang.String day23) {
        this.day23 = day23;
    }

    public java.lang.String getDay23() {
        return this.day23;
    }

    public void setDay22(java.lang.String day22) {
        this.day22 = day22;
    }

    public java.lang.String getDay22() {
        return this.day22;
    }

    public void setDay21(java.lang.String day21) {
        this.day21 = day21;
    }

    public java.lang.String getDay21() {
        return this.day21;
    }

    public void setDay20(java.lang.String day20) {
        this.day20 = day20;
    }

    public java.lang.String getDay20() {
        return this.day20;
    }

    public void setDay19(java.lang.String day19) {
        this.day19 = day19;
    }

    public java.lang.String getDay19() {
        return this.day19;
    }

    public void setDay18(java.lang.String day18) {
        this.day18 = day18;
    }

    public java.lang.String getDay18() {
        return this.day18;
    }

    public void setDay17(java.lang.String day17) {
        this.day17 = day17;
    }

    public java.lang.String getDay17() {
        return this.day17;
    }

    public void setDay16(java.lang.String day16) {
        this.day16 = day16;
    }

    public java.lang.String getDay16() {
        return this.day16;
    }

    public void setDay15(java.lang.String day15) {
        this.day15 = day15;
    }

    public java.lang.String getDay15() {
        return this.day15;
    }

    public void setDay14(java.lang.String day14) {
        this.day14 = day14;
    }

    public java.lang.String getDay14() {
        return this.day14;
    }

    public void setDay13(java.lang.String day13) {
        this.day13 = day13;
    }

    public java.lang.String getDay13() {
        return this.day13;
    }

    public void setDay12(java.lang.String day12) {
        this.day12 = day12;
    }

    public java.lang.String getDay12() {
        return this.day12;
    }

    public void setDay11(java.lang.String day11) {
        this.day11 = day11;
    }

    public java.lang.String getDay11() {
        return this.day11;
    }

    public void setDay10(java.lang.String day10) {
        this.day10 = day10;
    }

    public java.lang.String getDay10() {
        return this.day10;
    }

    public void setDay9(java.lang.String day9) {
        this.day9 = day9;
    }

    public java.lang.String getDay9() {
        return this.day9;
    }

    public void setDay8(java.lang.String day8) {
        this.day8 = day8;
    }

    public java.lang.String getDay8() {
        return this.day8;
    }

    public void setDay7(java.lang.String day7) {
        this.day7 = day7;
    }

    public java.lang.String getDay7() {
        return this.day7;
    }

    public void setDay6(java.lang.String day6) {
        this.day6 = day6;
    }

    public java.lang.String getDay6() {
        return this.day6;
    }

    public void setDay5(java.lang.String day5) {
        this.day5 = day5;
    }

    public java.lang.String getDay5() {
        return this.day5;
    }

    public void setDay4(java.lang.String day4) {
        this.day4 = day4;
    }

    public java.lang.String getDay4() {
        return this.day4;
    }

    public void setDay3(java.lang.String day3) {
        this.day3 = day3;
    }

    public java.lang.String getDay3() {
        return this.day3;
    }

    public void setDay2(java.lang.String day2) {
        this.day2 = day2;
    }

    public java.lang.String getDay2() {
        return this.day2;
    }

    public void setDay1(java.lang.String day1) {
        this.day1 = day1;
    }

    public java.lang.String getDay1() {
        return this.day1;
    }

    public void setUsername(java.lang.String username) {
        this.username = username;
    }

    public java.lang.String getUsername() {
        return this.username;
    }

    public void setUserId(java.math.BigDecimal userId) {
        this.userId = userId;
    }

    public java.math.BigDecimal getUserId() {
        return this.userId;
    }

    public void setSecondTo(java.lang.String secondTo) {
        this.secondTo = secondTo;
    }

    public java.lang.String getSecondTo() {
        return this.secondTo;
    }

    public void setSecondFlag(java.lang.String secondFlag) {
        this.secondFlag = secondFlag;
    }

    public java.lang.String getSecondFlag() {
        return this.secondFlag;
    }

    public void setOrderNum(java.math.BigDecimal orderNum) {
        this.orderNum = orderNum;
    }

    public java.math.BigDecimal getOrderNum() {
        return this.orderNum;
    }
}
