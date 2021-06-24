package com.gwideal.core.cms.l4.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.gwideal.increment.generator.IncAnnoColumn;
import com.gwideal.increment.generator.IncAnnoDbName;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.math.BigDecimal;
import java.util.Date;

@Table(name = "FOREIGN_AFFAIRS_CERTIFICATE")
@IncAnnoDbName(name = "dameng", comment = "涉外办证")
public class ForeignAffairsCertificate extends com.gwideal.core.common.CoreBaseEntity {

    @Id()
    @IncAnnoColumn(name = "ID", dbType = "NUMERIC", jdbcType = "NUMERIC", dataPrecision = "38", dataScale = "65531", dataLength = "0", comment = "主键")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "select JXWOAUniversalSeq.nextval from dual")
    private java.math.BigDecimal id;

    @IncAnnoColumn(name = "APPLY_NAME", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "200", comment = "申请人")
    private java.lang.String applyName;

    @IncAnnoColumn(name = "APPLY_DEPT", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "200", comment = "申请单位")
    private java.lang.String applyDept;

    @Override
    public String toString() {
        return "{" +
                "id=" + id +
                ", applyName='" + applyName + '\'' +
                ", applyDept='" + applyDept + '\'' +
                ", legdaRepresentative='" + legdaRepresentative + '\'' +
                ", telPhone='" + telPhone + '\'' +
                ", qualificationCertificateNo='" + qualificationCertificateNo + '\'' +
                ", commodity='" + commodity + '\'' +
                ", number='" + number + '\'' +
                ", applyData=" + applyData +
                '}';
    }

    @IncAnnoColumn(name = "ADDRESS", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "200", comment = "住址")
    private java.lang.String address;

    @IncAnnoColumn(name = "ENTERPRISE_TYPE", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "200", comment = "企业类型")
    private java.lang.String enterpriseType;

    @IncAnnoColumn(name = "LEGDA_REPRESENTATIVE", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "200", comment = "法定代表人")
    private java.lang.String legdaRepresentative;

    @IncAnnoColumn(name = "TEL_PHONE", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "200", comment = "联系方式")
    private java.lang.String telPhone;

    @IncAnnoColumn(name = "QUALIFICATION_CERTIFICATE_NO", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "200", comment = "资质证书编号")
    private java.lang.String qualificationCertificateNo;

    @IncAnnoColumn(name = "EXPORT_OR_IMPORT", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "200", comment = "类型")
    private java.lang.String exportOrImport;

    @IncAnnoColumn(name = "COMMODITY", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "200", comment = "商品")
    private java.lang.String commodity;

    @IncAnnoColumn(name = "NUMBER", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "200", comment = "数量")
    private java.lang.String number;

    @IncAnnoColumn(name = "COUNTRY", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "200", comment = "国家")
    private java.lang.String country;

    @IncAnnoColumn(name = "PURPOSE", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "200", comment = "目的")
    private java.lang.String purpose;

    @IncAnnoColumn(name = "REMARK", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "200", comment = "备注")
    private java.lang.String remark;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @IncAnnoColumn(name = "APPLY_DATA", dbType = "DATETIME", jdbcType = "TIMESTAMP", dataPrecision = "", dataScale = "6", dataLength = "8", comment = "注册时间")
    private java.util.Date applyData;

    @IncAnnoColumn(name = "TYPE", dbType = "NUMERIC", jdbcType = "NUMERIC", dataPrecision = "38", dataScale = "65531", dataLength = "0", comment = "进出口类型")
    private java.math.BigDecimal type;

    @IncAnnoColumn(name = "IS_DELETE", dbType = "NUMERIC", jdbcType = "NUMERIC", dataPrecision = "38", dataScale = "65531", dataLength = "0", comment = "删除标记")
    private java.math.BigDecimal isDelete;

    @IncAnnoColumn(name = "STATUS", dbType = "NUMERIC", jdbcType = "NUMERIC", dataPrecision = "38", dataScale = "65531", dataLength = "0", comment = "状态")
    private java.math.BigDecimal status;


    @Override
    public BigDecimal getId() {
        return id;
    }

    @Override
    public void setId(BigDecimal id) {
        this.id = id;
    }

    public String getApplyName() {
        return applyName;
    }

    public void setApplyName(String applyName) {
        this.applyName = applyName;
    }

    public String getApplyDept() {
        return applyDept;
    }

    public void setApplyDept(String applyDept) {
        this.applyDept = applyDept;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEnterpriseType() {
        return enterpriseType;
    }

    public void setEnterpriseType(String enterpriseType) {
        this.enterpriseType = enterpriseType;
    }

    public String getLegdaRepresentative() {
        return legdaRepresentative;
    }

    public void setLegdaRepresentative(String legdaRepresentative) {
        this.legdaRepresentative = legdaRepresentative;
    }

    public String getTelPhone() {
        return telPhone;
    }

    public void setTelPhone(String telPhone) {
        this.telPhone = telPhone;
    }

    public String getQualificationCertificateNo() {
        return qualificationCertificateNo;
    }

    public void setQualificationCertificateNo(String qualificationCertificateNo) {
        this.qualificationCertificateNo = qualificationCertificateNo;
    }

    public String getExportOrImport() {
        return exportOrImport;
    }


    public void setExportOrImport(String exportOrImport) {
        this.exportOrImport = exportOrImport;
    }

    public String getCommodity() {
        return commodity;
    }

    public void setCommodity(String commodity) {
        this.commodity = commodity;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Date getApplyData() {
        return applyData;
    }

    public void setApplyData(Date applyData) {
        this.applyData = applyData;
    }

    public BigDecimal getType() {
        return type;
    }

    public void setType(BigDecimal type) {
        this.type = type;
    }

    public BigDecimal getIsDelete() {
        return isDelete;
    }

    public void setIsDelete(BigDecimal isDelete) {
        this.isDelete = isDelete;
    }

    public BigDecimal getStatus() {
        return status;
    }

    public void setStatus(BigDecimal status) {
        this.status = status;
    }

    @IncAnnoColumn(name = "SIGN_TEXT", dbType = "TEXT", jdbcType = "LONGVARCHAR", dataPrecision = "", dataScale = "0", dataLength = "2147483647", comment = "默认标签")
    private java.lang.String signText;

    public String getSignText() {
        return signText;
    }

    public void setSignText(String signText) {
        this.signText = signText;
    }


}
