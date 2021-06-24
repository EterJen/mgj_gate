package com.gwideal.core.cms.l4.entity;

import javax.persistence.Transient;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.gwideal.increment.generator.IncAnnoColumn;
import com.gwideal.increment.generator.IncAnnoDbName;

@Table(name = "NUMBER_CERTIFICATE_MANAGER")
@IncAnnoDbName(name = "dameng", comment = "默认表名")
public class numberCertificateManager extends com.gwideal.core.common.CoreBaseEntity {

    @Id()
    @IncAnnoColumn(name = "ID", dbType = "NUMERIC", jdbcType = "NUMERIC", dataPrecision = "38", dataScale = "65531", dataLength = "0", comment = "主键")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "select JXWOAUniversalSeq.nextval from dual")
    private java.math.BigDecimal id;

    @IncAnnoColumn(name = "SERIAL_NUMBER", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "512", comment = "默认标签")
    private java.lang.String serialNumber;

    @IncAnnoColumn(name = "VERSION", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "512", comment = "默认标签")
    private java.lang.String version;

    @IncAnnoColumn(name = "USER_NAME", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "512", comment = "默认标签")
    private java.lang.String userName;

    @IncAnnoColumn(name = "ISSUER", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "512", comment = "默认标签")
    private java.lang.String issuer;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @IncAnnoColumn(name = "USER_DATA", dbType = "DATETIME", jdbcType = "TIMESTAMP", dataPrecision = "", dataScale = "", dataLength = "8", comment = "默认标签")
    private java.util.Date userData;

    public java.math.BigDecimal getId() {
        return this.id;
    }

    public void setId(java.math.BigDecimal id) {
        this.id = id;
    }

    public java.lang.String getSerialNumber() {
        return this.serialNumber;
    }

    public void setSerialNumber(java.lang.String serialNumber) {
        this.serialNumber = serialNumber;
    }

    public java.lang.String getVersion() {
        return this.version;
    }

    public void setVersion(java.lang.String version) {
        this.version = version;
    }

    public java.lang.String getUserName() {
        return this.userName;
    }

    public void setUserName(java.lang.String userName) {
        this.userName = userName;
    }

    public java.lang.String getIssuer() {
        return this.issuer;
    }

    public void setIssuer(java.lang.String issuer) {
        this.issuer = issuer;
    }

    public java.util.Date getUserData() {
        return this.userData;
    }

    public void setUserData(java.util.Date userData) {
        this.userData = userData;
    }
}
