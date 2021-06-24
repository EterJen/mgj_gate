package com.gwideal.core.cms.l4.entity;

import javax.persistence.Transient;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.gwideal.increment.generator.IncAnnoColumn;
import com.gwideal.increment.generator.IncAnnoDbName;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Table(name = "ATTENDANCE_T")
@IncAnnoDbName(name = "dameng", comment = "默认表名")
public class AttendanceT extends com.gwideal.core.common.CoreBaseEntity {

    @Id()
    @IncAnnoColumn(name = "ID", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "默认标签")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "select JXWOAUniversalSeq.nextval from dual")
    private java.math.BigDecimal id;

    @IncAnnoColumn(name = "MARK", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "500", comment = "默认标签")
    private java.lang.String mark;

    @IncAnnoColumn(name = "WORKDAY", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "20", comment = "默认标签")
    private java.lang.String workday;

    @IncAnnoColumn(name = "DEPT_ID", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "20", comment = "默认标签")
    private java.lang.String deptId;

    @IncAnnoColumn(name = "DEPT_NAME", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "200", comment = "默认标签")
    private java.lang.String deptName;

    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
    @IncAnnoColumn(name = "LAST_UPDATE_TIME", dbType = "DATETIME", jdbcType = "TIMESTAMP", dataPrecision = "", dataScale = "6", dataLength = "8", comment = "默认标签")
    private java.util.Date lastUpdateTime;

    @IncAnnoColumn(name = "DAY_SIZE", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "默认标签")
    private java.math.BigDecimal daySize;

    @IncAnnoColumn(name = "STATUS", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "200", comment = "默认标签")
    private java.lang.String status;

    @IncAnnoColumn(name = "ORDER_NUM", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "默认标签")
    private java.math.BigDecimal orderNum;

    public java.math.BigDecimal getId() {
        return this.id;
    }

    public void setId(java.math.BigDecimal id) {
        this.id = id;
    }

    public java.lang.String getMark() {
        return this.mark;
    }

    public void setMark(java.lang.String mark) {
        this.mark = mark;
    }

    public java.lang.String getWorkday() {
        return this.workday;
    }

    public void setWorkday(java.lang.String workday) {
        this.workday = workday;
    }

    public java.lang.String getDeptId() {
        return this.deptId;
    }

    public void setDeptId(java.lang.String deptId) {
        this.deptId = deptId;
    }

    public java.lang.String getDeptName() {
        return this.deptName;
    }

    public void setDeptName(java.lang.String deptName) {
        this.deptName = deptName;
    }

    public void setLastUpdateTime(java.util.Date lastUpdateTime) {
        this.lastUpdateTime = lastUpdateTime;
    }

    public java.util.Date getLastUpdateTime() {
        return this.lastUpdateTime;
    }

    public void setDaySize(java.math.BigDecimal daySize) {
        this.daySize = daySize;
    }

    public java.math.BigDecimal getDaySize() {
        return this.daySize;
    }

    public void setStatus(java.lang.String status) {
        this.status = status;
    }

    public java.lang.String getStatus() {
        return this.status;
    }

    public void setOrderNum(java.math.BigDecimal orderNum) {
        this.orderNum = orderNum;
    }

    public java.math.BigDecimal getOrderNum() {
        return this.orderNum;
    }

    @Transient
    private AttendanceD attendanceD;


    @Transient
    private List<String> deptIds = new ArrayList<>();

    @Transient
    private List<AttendanceD> attendanceDList;

    @Transient
    private List<AttendanceT> attendanceTList;

    public List<AttendanceD> getAttendanceDList() {
        return attendanceDList;
    }

    public void setAttendanceDList(List<AttendanceD> attendanceDList) {
        this.attendanceDList = attendanceDList;
    }

    @Transient
    private String[] sizes;

    @Transient
    private String[] use;

    public String[] getSizes() {
        return sizes;
    }

    public void setSizes(String[] sizes) {
        this.sizes = sizes;
    }

    public String[] getUse() {
        return use;
    }

    public void setUse(String[] use) {
        this.use = use;
    }

    public List<AttendanceT> getAttendanceTList() {
        return attendanceTList;
    }

    public void setAttendanceTList(List<AttendanceT> attendanceTList) {
        this.attendanceTList = attendanceTList;
    }

    public AttendanceD getAttendanceD() {
        return attendanceD;
    }

    public void setAttendanceD(AttendanceD attendanceD) {
        this.attendanceD = attendanceD;
    }

    public List<String> getDeptIds() {
        return deptIds;
    }

    public void setDeptIds(List<String> deptIds) {
        this.deptIds = deptIds;
    }
}
