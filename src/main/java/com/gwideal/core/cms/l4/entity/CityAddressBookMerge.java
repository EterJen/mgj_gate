package com.gwideal.core.cms.l4.entity;

import java.math.BigDecimal;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.gwideal.increment.generator.IncAnnoColumn;
import com.gwideal.increment.generator.IncAnnoDbName;

@Table(name = "CITYADDRESSBOOKMERGE")
@IncAnnoDbName(name = "dameng", comment = "市委机要局电话表合并规则表")
public class CityAddressBookMerge extends com.gwideal.core.common.CoreBaseEntity<CityAddressBookMerge, BigDecimal>{

	@Id()
    @IncAnnoColumn(name = "ID", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "主键")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "select JXWOAUniversalSeq.nextval from dual")
    private java.math.BigDecimal id;
	
    @IncAnnoColumn(name = "BOOKID", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "0", dataLength = "22", comment = "通讯录ID")
    private java.math.BigDecimal bookid;//通讯录ID
    
    @IncAnnoColumn(name = "COLUMNNAME", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "50", comment = "字段名")
    private java.lang.String columnname;//字段名
    
    @IncAnnoColumn(name = "LEFT", dbType = "VARCHAR2", jdbcType = "BOOLEAN", dataPrecision = "", dataScale = "0", dataLength = "1", comment = "与左方单元格合并")
    private java.lang.Boolean left;//与左方单元格合并
    
    @IncAnnoColumn(name = "LEFTBLANK", dbType = "VARCHAR2", jdbcType = "BOOLEAN", dataPrecision = "", dataScale = "0", dataLength = "1", comment = "与左方空白单元格合并")
    private java.lang.Boolean leftblank;//与左方空白单元格合并
    
    @IncAnnoColumn(name = "ABOVE", dbType = "VARCHAR2", jdbcType = "BOOLEAN", dataPrecision = "", dataScale = "0", dataLength = "1", comment = "与上方单元格合并")
    private java.lang.Boolean above;//与上方单元格合并
    
    @IncAnnoColumn(name = "ABOVEBLANK", dbType = "VARCHAR2", jdbcType = "BOOLEAN", dataPrecision = "", dataScale = "0", dataLength = "1", comment = "与上方空白单元格合并")
    private java.lang.Boolean aboveblank;//与上方空白单元格合并

	public java.math.BigDecimal getId() {
		return id;
	}

	public void setId(java.math.BigDecimal id) {
		this.id = id;
	}

	public java.math.BigDecimal getBookid() {
		return bookid;
	}

	public void setBookid(java.math.BigDecimal bookid) {
		this.bookid = bookid;
	}

	public java.lang.String getColumnname() {
		return columnname;
	}

	public void setColumnname(java.lang.String columnname) {
		this.columnname = columnname;
	}

	public java.lang.Boolean getLeft() {
		return left;
	}

	public void setLeft(java.lang.Boolean left) {
		this.left = left;
	}

	public java.lang.Boolean getLeftblank() {
		return leftblank;
	}

	public void setLeftblank(java.lang.Boolean leftblank) {
		this.leftblank = leftblank;
	}

	public java.lang.Boolean getAbove() {
		return above;
	}

	public void setAbove(java.lang.Boolean above) {
		this.above = above;
	}

	public java.lang.Boolean getAboveblank() {
		return aboveblank;
	}

	public void setAboveblank(java.lang.Boolean aboveblank) {
		this.aboveblank = aboveblank;
	}

	
    
    
	
}
