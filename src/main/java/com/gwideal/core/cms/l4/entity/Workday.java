package com.gwideal.core.cms.l4.entity;

import javax.persistence.Transient;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import com.gwideal.increment.generator.IncAnnoColumn;
import com.gwideal.increment.generator.IncAnnoDbName;

@Table(name = "WORKDAY")
@IncAnnoDbName(name = "dameng", comment = "默认表名")
public class Workday extends com.gwideal.core.common.CoreBaseEntity {

    @IncAnnoColumn(name = "ID", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "默认标签")
    @Id()
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "select JXWOAUniversalSeq.nextval from dual")
    private java.math.BigDecimal id;

    @IncAnnoColumn(name = "WORKDATE", dbType = "TIMESTAMP", jdbcType = "TIMESTAMP", dataPrecision = "", dataScale = "0", dataLength = "8", comment = "默认标签")
    private java.util.Date workdate;

    @IncAnnoColumn(name = "ISWORK", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "100", comment = "默认标签")
    private java.lang.String iswork;

    @IncAnnoColumn(name = "REMARK", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "100", comment = "默认标签")
    private java.lang.String remark;

    @IncAnnoColumn(name = "MUSTWORKDAY", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "100", comment = "默认标签")
    private java.lang.String mustworkday;

    @IncAnnoColumn(name = "PUPDATER", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "36", comment = "默认标签")
    private java.lang.String pupdater;

    @IncAnnoColumn(name = "PUPDATETIME", dbType = "TIMESTAMP", jdbcType = "TIMESTAMP", dataPrecision = "", dataScale = "0", dataLength = "8", comment = "默认标签")
    private java.sql.Timestamp pupdatetime;

    @IncAnnoColumn(name = "PFLAG", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "1", comment = "默认标签")
    private java.lang.String pflag;
    
    @Transient
    private java.lang.String year;
    
    @Transient
    private java.lang.String month;
    
    @Transient
    private java.lang.String[] checks;
    
    @Transient
    private java.lang.String[] pids;
    
    @Transient
    private java.lang.String[] mustWorkdays;
    
    @Transient
    private java.lang.String[] remarks;


    public java.lang.String[] getChecks() {
		return checks;
	}

	public void setChecks(java.lang.String[] checks) {
		this.checks = checks;
	}
	

	public java.lang.String[] getMustWorkdays() {
		return mustWorkdays;
	}

	public void setMustWorkdays(java.lang.String[] mustWorkdays) {
		this.mustWorkdays = mustWorkdays;
	}

	public java.lang.String[] getPids() {
		return pids;
	}

	public void setPids(java.lang.String[] pids) {
		this.pids = pids;
	}



	public java.lang.String[] getRemarks() {
		return remarks;
	}

	public void setRemarks(java.lang.String[] remarks) {
		this.remarks = remarks;
	}

	public java.lang.String getYear() {
		return year;
	}

	public void setYear(java.lang.String year) {
		this.year = year;
	}

	public java.lang.String getMonth() {
		return month;
	}

	public void setMonth(java.lang.String month) {
		this.month = month;
	}

	public java.math.BigDecimal getId() {
        return this.id;
    }

    public void setId(java.math.BigDecimal id) {
        this.id = id;
    }

    public java.util.Date getWorkdate() {
        return this.workdate;
    }

    public void setWorkdate(java.util.Date workdate) {
        this.workdate = workdate;
    }

    public java.lang.String getIswork() {
        return this.iswork;
    }

    public void setIswork(java.lang.String iswork) {
        this.iswork = iswork;
    }

    public java.lang.String getRemark() {
        return this.remark;
    }

    public void setRemark(java.lang.String remark) {
        this.remark = remark;
    }

    public java.lang.String getMustworkday() {
        return this.mustworkday;
    }

    public void setMustworkday(java.lang.String mustworkday) {
        this.mustworkday = mustworkday;
    }

    public java.lang.String getPupdater() {
        return this.pupdater;
    }

    public void setPupdater(java.lang.String pupdater) {
        this.pupdater = pupdater;
    }

    public java.sql.Timestamp getPupdatetime() {
        return this.pupdatetime;
    }

    public void setPupdatetime(java.sql.Timestamp pupdatetime) {
        this.pupdatetime = pupdatetime;
    }

    public java.lang.String getPflag() {
        return this.pflag;
    }

    public void setPflag(java.lang.String pflag) {
        this.pflag = pflag;
    }
}
