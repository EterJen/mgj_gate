package com.gwideal.core.cms.l4.entity;

import javax.persistence.Transient;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import com.gwideal.increment.generator.IncAnnoColumn;
import com.gwideal.increment.generator.IncAnnoDbName;

@Table(name = "CONTACT_INFORMATION")
@IncAnnoDbName(name = "dameng", comment = "联系方式信息表")
public class ContactInformation extends com.gwideal.core.common.CoreBaseEntity {

    @Id()
    @IncAnnoColumn(name = "ID", dbType = "NUMERIC", jdbcType = "NUMERIC", dataPrecision = "38", dataScale = "65531", dataLength = "0", comment = "主键")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "select JXWOAUniversalSeq.nextval from dual")
    private java.math.BigDecimal id;

    @IncAnnoColumn(name = "ADDRESS", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "200", comment = "地 址")
    private java.lang.String address;

    @IncAnnoColumn(name = "EMAIL", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "200", comment = "EMAIL")
    private java.lang.String email;

    @IncAnnoColumn(name = "TELEPHONE", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "500", comment = "电 话")
    private java.lang.String telephone;

    @IncAnnoColumn(name = "FAX", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "200", comment = "传 真")
    private java.lang.String fax;

    @IncAnnoColumn(name = "POSTAL_CODE", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "200", comment = "邮 编")
    private java.lang.String postalCode;

    @IncAnnoColumn(name = "IF_DELETE", dbType = "NUMERIC", jdbcType = "NUMERIC", dataPrecision = "38", dataScale = "65531", dataLength = "0", comment = "删除标记位")
    private java.math.BigDecimal ifDelete;

    @IncAnnoColumn(name = "WORK_TIME", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "200", comment = "工作时间")
    private java.lang.String workTime;

    public java.math.BigDecimal getId() {
        return this.id;
    }

    public void setId(java.math.BigDecimal id) {
        this.id = id;
    }

    public java.lang.String getAddress() {
        return this.address;
    }

    public void setAddress(java.lang.String address) {
        this.address = address;
    }

    public java.lang.String getEmail() {
        return this.email;
    }

    public void setEmail(java.lang.String email) {
        this.email = email;
    }

    public java.lang.String getTelephone() {
        return this.telephone;
    }

    public void setTelephone(java.lang.String telephone) {
        this.telephone = telephone;
    }

    public java.lang.String getFax() {
        return this.fax;
    }

    public void setFax(java.lang.String fax) {
        this.fax = fax;
    }

    public java.lang.String getPostalCode() {
        return this.postalCode;
    }

    public void setPostalCode(java.lang.String postalCode) {
        this.postalCode = postalCode;
    }

    public java.math.BigDecimal getIfDelete() {
        return this.ifDelete;
    }

    public void setIfDelete(java.math.BigDecimal ifDelete) {
        this.ifDelete = ifDelete;
    }

    public void setWorkTime(java.lang.String workTime) {
        this.workTime = workTime;
    }

    public java.lang.String getWorkTime() {
        return this.workTime;
    }
}
