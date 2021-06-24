package com.gwideal.core.cms.l4.entity;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.gwideal.increment.generator.IncAnnoColumn;
import com.gwideal.increment.generator.IncAnnoDbName;

@Table(name = "CITYADDRESSBOOKDEPARTMENT")
@IncAnnoDbName(name = "dameng", comment = "市委机要局电话表_部门")
public class CityAddressBookDepartMent extends com.gwideal.core.common.CoreBaseEntity<CityAddressBookDepartMent, BigDecimal>{
	
	@Id()
    @IncAnnoColumn(name = "ID", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "主键")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "select JXWOAUniversalSeq.nextval from dual")
    private java.math.BigDecimal id;
	
	@IncAnnoColumn(name = "DEPARTNAME", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "50", comment = "部门名称")
	private java.lang.String departname;//姓名
	
	@IncAnnoColumn(name = "REMARKS", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "200", comment = "备注")
    private java.lang.String remarks;//姓名
	
    @IncAnnoColumn(name = "ORDERNO", dbType = "NUMBER", jdbcType = "INTEGER", dataPrecision = "", dataScale = "0", dataLength = "22", comment = "排序号")
    private java.lang.Integer orderno;
    
    @IncAnnoColumn(name = "ISDELETE", dbType = "NUMBER", jdbcType = "INTEGER", dataPrecision = "1", dataScale = "0", dataLength = "22", comment = "是否删除 0：否，1：是")
    private java.lang.Integer isdelete;
    
    @Transient
    private List<CityAddressBook> bookList = new ArrayList<CityAddressBook>();

	public java.math.BigDecimal getId() {
		return id;
	}

	public void setId(java.math.BigDecimal id) {
		this.id = id;
	}

	public java.lang.String getDepartname() {
		return departname;
	}

	public void setDepartname(java.lang.String departname) {
		this.departname = departname;
	}

	public java.lang.String getRemarks() {
		return remarks;
	}

	public void setRemarks(java.lang.String remarks) {
		this.remarks = remarks;
	}

	public java.lang.Integer getOrderno() {
		return orderno;
	}

	public void setOrderno(java.lang.Integer orderno) {
		this.orderno = orderno;
	}

	public java.lang.Integer getIsdelete() {
		return isdelete;
	}

	public void setIsdelete(java.lang.Integer isdelete) {
		this.isdelete = isdelete;
	}

	public List<CityAddressBook> getBookList() {
		return bookList;
	}

	public void setBookList(List<CityAddressBook> bookList) {
		this.bookList = bookList;
	}
	
	
	

}
