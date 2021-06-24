package com.gwideal.core.cms.l4.entity;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.gwideal.increment.generator.IncAnnoColumn;
import com.gwideal.increment.generator.IncAnnoDbName;

@Table(name = "CITYADDRESSBOOK")
@IncAnnoDbName(name = "dameng", comment = "市委机要局电话表")
public class CityAddressBook extends com.gwideal.core.common.CoreBaseEntity<CityAddressBook, BigDecimal>{

	@Id()
    @IncAnnoColumn(name = "ID", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "主键")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "select JXWOAUniversalSeq.nextval from dual")
    private java.math.BigDecimal id;
	
	@IncAnnoColumn(name = "NAME", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "50", comment = "姓名")
    private java.lang.String name;//姓名
	
    @IncAnnoColumn(name = "DEPARTMENT", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "50", comment = "部门")
    private java.lang.String department;//部门
    
    @IncAnnoColumn(name = "DEPARTMENTID", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "0", dataLength = "22", comment = "部门ID")
    private java.math.BigDecimal departmentid;//部门
    
    @IncAnnoColumn(name = "ADDRESS", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "50", comment = "地址")
    private java.lang.String address;
    
    @IncAnnoColumn(name = "ROOM", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "50", comment = "房间")
    private java.lang.String room;
	
    @IncAnnoColumn(name = "EXTENSION", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "50", comment = "分机")
    private java.lang.String extension;
    
    @IncAnnoColumn(name = "REDPHONE", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "50", comment = "红机")
    private java.lang.String redphone;
    
    @IncAnnoColumn(name = "MOBILE", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "50", comment = "工作手机")
    private java.lang.String mobile;
    
    @IncAnnoColumn(name = "DIRECTLINE", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "50", comment = "直线")
    private java.lang.String directline;
    
    @IncAnnoColumn(name = "ORDERNO", dbType = "NUMBER", jdbcType = "INTEGER", dataPrecision = "", dataScale = "0", dataLength = "22", comment = "排序号")
    private java.lang.Integer orderno;
    
    @IncAnnoColumn(name = "ISDELETE", dbType = "NUMBER", jdbcType = "INTEGER", dataPrecision = "1", dataScale = "0", dataLength = "22", comment = "是否删除 0：否，1：是")
    private java.lang.Integer isdelete;
    
    @Transient
    private Map colspanMap = new HashMap();//判断单元格横向合并
    
    @Transient
    private Map rowspanMap = new HashMap();//判断单元格竖向合并
    
    @Transient
    private Map displayMap = new HashMap();//判断单元格是否显示
    
    public java.math.BigDecimal getId() {
		return id;
	}

	public void setId(java.math.BigDecimal id) {
		this.id = id;
	}

	public java.lang.String getName() {
		return name;
	}

	public void setName(java.lang.String name) {
		this.name = name;
	}

	public java.lang.String getDepartment() {
		return department;
	}

	public void setDepartment(java.lang.String department) {
		this.department = department;
	}

	public java.lang.String getAddress() {
		return address;
	}

	public void setAddress(java.lang.String address) {
		this.address = address;
	}

	public java.lang.String getRoom() {
		return room;
	}

	public void setRoom(java.lang.String room) {
		this.room = room;
	}

	public java.lang.String getExtension() {
		return extension;
	}

	public void setExtension(java.lang.String extension) {
		this.extension = extension;
	}

	public java.lang.String getRedphone() {
		return redphone;
	}

	public void setRedphone(java.lang.String redphone) {
		this.redphone = redphone;
	}

	public java.lang.String getMobile() {
		return mobile;
	}

	public void setMobile(java.lang.String mobile) {
		this.mobile = mobile;
	}

	public java.lang.String getDirectline() {
		return directline;
	}

	public void setDirectline(java.lang.String directline) {
		this.directline = directline;
	}

	public java.lang.Integer getIsdelete() {
		return isdelete;
	}

	public void setIsdelete(java.lang.Integer isdelete) {
		this.isdelete = isdelete;
	}

	public java.math.BigDecimal getDepartmentid() {
		return departmentid;
	}

	public void setDepartmentid(java.math.BigDecimal departmentid) {
		this.departmentid = departmentid;
	}

	public java.lang.Integer getOrderno() {
		return orderno;
	}

	public void setOrderno(java.lang.Integer orderno) {
		this.orderno = orderno;
	}

	public Map getColspanMap() {
		return colspanMap;
	}

	public void setColspanMap(Map colspanMap) {
		this.colspanMap = colspanMap;
	}

	public Map getRowspanMap() {
		return rowspanMap;
	}

	public void setRowspanMap(Map rowspanMap) {
		this.rowspanMap = rowspanMap;
	}

	public Map getDisplayMap() {
		return displayMap;
	}

	public void setDisplayMap(Map displayMap) {
		this.displayMap = displayMap;
	}

	

	

}
