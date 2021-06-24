package com.gwideal.core.cms.l4.entity;

import java.math.BigDecimal;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.gwideal.increment.generator.IncAnnoColumn;
import com.gwideal.increment.generator.IncAnnoDbName;

@Table(name = "CHINAADDRESSBOOK")
@IncAnnoDbName(name = "dameng", comment = "中办机要局电话表")
public class ChinaAddressBook extends com.gwideal.core.common.CoreBaseEntity<ChinaAddressBook, BigDecimal>{

	@Id()
    @IncAnnoColumn(name = "ID", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "主键")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "select JXWOAUniversalSeq.nextval from dual")
    private java.math.BigDecimal id;
	
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @IncAnnoColumn(name = "FILE_TIME", dbType = "DATETIME", jdbcType = "TIMESTAMP", dataPrecision = "", dataScale = "6", dataLength = "8", comment = "创建时间")
    private java.util.Date fileTime;//发布时间 or 创建时间
    
    @IncAnnoColumn(name = "FILE_NAME", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "100", comment = "文件名称")
    private java.lang.String fileName;//文件名
	
    @IncAnnoColumn(name = "FILE_PATH", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "200", comment = "下载地址")
    private java.lang.String filePath;//文件下载地址
    
    public java.math.BigDecimal getId() {
		return id;
	}

	public void setId(java.math.BigDecimal id) {
		this.id = id;
	}

	public java.util.Date getFileTime() {
		return fileTime;
	}

	public void setFileTime(java.util.Date fileTime) {
		this.fileTime = fileTime;
	}

	public java.lang.String getFileName() {
		return fileName;
	}

	public void setFileName(java.lang.String fileName) {
		this.fileName = fileName;
	}

	public java.lang.String getFilePath() {
		return filePath;
	}

	public void setFilePath(java.lang.String filePath) {
		this.filePath = filePath;
	}
    
    
	
}
