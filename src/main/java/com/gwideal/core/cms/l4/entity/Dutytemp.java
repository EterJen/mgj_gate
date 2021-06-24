package com.gwideal.core.cms.l4.entity;

import javax.persistence.Transient;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import com.gwideal.increment.generator.IncAnnoColumn;
import com.gwideal.increment.generator.IncAnnoDbName;

@Table(name = "DUTYTEMP")
@IncAnnoDbName(name = "dameng", comment = "值班安排表")
public class Dutytemp extends com.gwideal.core.common.CoreBaseEntity {

    @Id()
    @IncAnnoColumn(name = "ID", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "主键")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "select JXWOAUniversalSeq.nextval from dual")
    private java.math.BigDecimal id;

    @IncAnnoColumn(name = "YEAR", dbType = "NUMBER", jdbcType = "INTEGER", dataPrecision = "4", dataScale = "0", dataLength = "22", comment = "年")
    private java.lang.Integer year;

    @IncAnnoColumn(name = "MONTH", dbType = "NUMBER", jdbcType = "INTEGER", dataPrecision = "2", dataScale = "0", dataLength = "22", comment = "月")
    private java.lang.Integer month;

    @IncAnnoColumn(name = "TYPE", dbType = "NUMBER", jdbcType = "INTEGER", dataPrecision = "1", dataScale = "0", dataLength = "22", comment = "1:技术保障处，2：通信组，3：办报组")
    private java.lang.Integer type;

    @IncAnnoColumn(name = "USERSORTID", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "20", comment = "最后一个值班人员排序id")
    private java.lang.String usersortid;

    @IncAnnoColumn(name = "UPDATETIME", dbType = "DATETIME", jdbcType = "TIMESTAMP", dataPrecision = "", dataScale = "6", dataLength = "8", comment = "修改时间")
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

    public java.lang.Integer getType() {
        return this.type;
    }

    public void setType(java.lang.Integer type) {
        this.type = type;
    }

    public java.lang.String getUsersortid() {
        return this.usersortid;
    }

    public void setUsersortid(java.lang.String usersortid) {
        this.usersortid = usersortid;
    }

    public java.util.Date getUpdatetime() {
        return this.updatetime;
    }

    public void setUpdatetime(java.util.Date updatetime) {
        this.updatetime = updatetime;
    }
}
