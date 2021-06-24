package com.gwideal.core.cms.l4.entity;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.gwideal.increment.generator.IncAnnoColumn;
import com.gwideal.increment.generator.IncAnnoDbName;

@Table(name = "T_LINKS_INFO")
@IncAnnoDbName(name = "dameng", comment = "链接信息详细表(技术标准or企业信息)")
public class LinksInfo extends com.gwideal.core.common.CoreBaseEntity {

    @Id()
    @IncAnnoColumn(name = "ID", dbType = "NUMERIC", jdbcType = "NUMERIC", dataPrecision = "38", dataScale = "65531", dataLength = "0", comment = "主键")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "select JXWOAUniversalSeq.nextval from dual")
    private java.math.BigDecimal id;

    @IncAnnoColumn(name = "NAME", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "255", comment = "链接名称")
    private java.lang.String name;
    
    @IncAnnoColumn(name = "URL", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "255", comment = "链接网址")
    private java.lang.String url;
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @IncAnnoColumn(name = "ADDTIME", dbType = "DATETIME", jdbcType = "TIMESTAMP", dataPrecision = "", dataScale = "6", dataLength = "8", comment = "添加时间")
    private java.util.Date addtime;
    
    @IncAnnoColumn(name = "TYPE", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "255", comment = "1,企业信息 2,技术标准")
    private java.lang.String type;
    

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

	public java.lang.String getUrl() {
		return url;
	}

	public void setUrl(java.lang.String url) {
		this.url = url;
	}

	public java.util.Date getAddtime() {
		return addtime;
	}

	public void setAddtime(java.util.Date addtime) {
		this.addtime = addtime;
	}

	public java.lang.String getType() {
		return type;
	}

	public void setType(java.lang.String type) {
		this.type = type;
	}
    
	 @Transient
	 private String titleLike;

	    public String getTitleLike() {
	        return titleLike;
	    }

	    public void setTitleLike(String titleLike) {
	        this.titleLike = titleLike;
	    }

}
