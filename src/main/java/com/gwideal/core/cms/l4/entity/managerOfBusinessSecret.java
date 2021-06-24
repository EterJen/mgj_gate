package com.gwideal.core.cms.l4.entity;

import javax.persistence.Transient;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.gwideal.increment.generator.IncAnnoColumn;
import com.gwideal.increment.generator.IncAnnoDbName;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Table(name = "MANAGER_OF_BUSINESS_SECRET")
@IncAnnoDbName(name = "dameng", comment = "默认表名")
public class managerOfBusinessSecret extends com.gwideal.core.common.CoreBaseEntity {

    @Id()
    @IncAnnoColumn(name = "ID", dbType = "NUMERIC", jdbcType = "NUMERIC", dataPrecision = "38", dataScale = "65531", dataLength = "0", comment = "默认标签")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "select JXWOAUniversalSeq.nextval from dual")
    private java.math.BigDecimal id;

    @IncAnnoColumn(name = "USER_DEPTNAME", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "512", comment = "默认标签")
    private java.lang.String userDeptname;

    @IncAnnoColumn(name = "USER_ORGANIZATIONCODE", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "512", comment = "默认标签")
    private java.lang.String userOrganizationcode;

    @IncAnnoColumn(name = "USER_PRODUCTIONQUALIFICATION", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "512", comment = "默认标签")
    private java.lang.String userProductionqualification;

    @IncAnnoColumn(name = "USER_PRODUCTIONQUALIFICATIONTIME", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "8", comment = "默认标签")
    private java.lang.String userProductionqualificationtime;

    @IncAnnoColumn(name = "USER_SALESQUALIFICATION", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "512", comment = "默认标签")
    private java.lang.String userSalesqualification;

    @IncAnnoColumn(name = "USER_SALESQUALIFICATIONTIME", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "8", comment = "默认标签")
    private java.lang.String userSalesqualificationtime;

    @IncAnnoColumn(name = "USER_ADRESS", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "512", comment = "默认标签")
    private java.lang.String userAdress;

    @IncAnnoColumn(name = "USER_CODE", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "512", comment = "默认标签")
    private java.lang.String userCode;

    @IncAnnoColumn(name = "USER_TEL", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "512", comment = "默认标签")
    private java.lang.String userTel;

    @IncAnnoColumn(name = "USER_PERSON", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "512", comment = "默认标签")
    private java.lang.String userPerson;

    @IncAnnoColumn(name = "USER_MAIL", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "512", comment = "默认标签")
    private java.lang.String userMail;

    @IncAnnoColumn(name = "USER_MOBILE", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "512", comment = "默认标签")
    private java.lang.String userMobile;

    @IncAnnoColumn(name = "USER_REMARK", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "512", comment = "默认标签")
    private java.lang.String userRemark;

    @IncAnnoColumn(name = "STATUS", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "512", comment = "默认标签")
    private java.lang.String status;

    @IncAnnoColumn(name = "GRANTED", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "512", comment = "默认标签")
    private java.lang.String granted;

    @IncAnnoColumn(name = "PRODUCT_DEPTNAME", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "512", comment = "默认标签")
    private java.lang.String productDeptname;

    @IncAnnoColumn(name = "PRODUCT_NAME", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "512", comment = "默认标签")
    private java.lang.String productName;

    @IncAnnoColumn(name = "PRODUCT_TYPE", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "512", comment = "默认标签")
    private java.lang.String productType;

    @IncAnnoColumn(name = "PRODUCT_CODE", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "512", comment = "默认标签")
    private java.lang.String productCode;

    @IncAnnoColumn(name = "PRODUCT_DATA", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "8", comment = "默认标签")
    private java.lang.String productData;

    @IncAnnoColumn(name = "PRODUCT_REMARK", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "512", comment = "默认标签")
    private java.lang.String productRemark;

    @IncAnnoColumn(name = "SALE_TIME", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "8", comment = "默认标签")
    private java.lang.String saleTime;

    @IncAnnoColumn(name = "SALE_DEPTNAME", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "512", comment = "默认标签")
    private java.lang.String saleDeptname;

    @IncAnnoColumn(name = "SALE_TYPE", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "512", comment = "默认标签")
    private java.lang.String saleType;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @IncAnnoColumn(name = "APPLY_DATA", dbType = "DATETIME", jdbcType = "TIMESTAMP", dataPrecision = "", dataScale = "6", dataLength = "8", comment = "注册时间")
    private java.util.Date applyData;

    @IncAnnoColumn(name = "IMAGE_PATH", dbType = "NUMERIC", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "300", comment = "默认标签")
    private java.math.BigDecimal imagePath;

    public BigDecimal getImagePath() {
        return imagePath;
    }

    public void setImagePath(BigDecimal imagePath) {
        this.imagePath = imagePath;
    }

    @Transient
    private List<SimpleFile> simpleFiles;

    public List<SimpleFile> getSimpleFiles() {
        return simpleFiles;
    }

    public void setSimpleFiles(List<SimpleFile> simpleFiles) {
        this.simpleFiles = simpleFiles;
    }

    @Override
    public BigDecimal getId() {
        return id;
    }

    @Override
    public void setId(BigDecimal id) {
        this.id = id;
    }

    public String getUserDeptname() {
        return userDeptname;
    }

    public void setUserDeptname(String userDeptname) {
        this.userDeptname = userDeptname;
    }

    public String getUserOrganizationcode() {
        return userOrganizationcode;
    }

    public void setUserOrganizationcode(String userOrganizationcode) {
        this.userOrganizationcode = userOrganizationcode;
    }

    public String getUserProductionqualification() {
        return userProductionqualification;
    }

    public void setUserProductionqualification(String userProductionqualification) {
        this.userProductionqualification = userProductionqualification;
    }

    public String getUserProductionqualificationtime() {
        return userProductionqualificationtime;
    }

    public void setUserProductionqualificationtime(String userProductionqualificationtime) {
        this.userProductionqualificationtime = userProductionqualificationtime;
    }

    public String getUserSalesqualification() {
        return userSalesqualification;
    }

    public void setUserSalesqualification(String userSalesqualification) {
        this.userSalesqualification = userSalesqualification;
    }

    public String getUserSalesqualificationtime() {
        return userSalesqualificationtime;
    }

    public void setUserSalesqualificationtime(String userSalesqualificationtime) {
        this.userSalesqualificationtime = userSalesqualificationtime;
    }

    public String getUserAdress() {
        return userAdress;
    }

    public void setUserAdress(String userAdress) {
        this.userAdress = userAdress;
    }

    public String getUserCode() {
        return userCode;
    }

    public void setUserCode(String userCode) {
        this.userCode = userCode;
    }

    public String getUserTel() {
        return userTel;
    }

    public void setUserTel(String userTel) {
        this.userTel = userTel;
    }

    public String getUserPerson() {
        return userPerson;
    }

    public void setUserPerson(String userPerson) {
        this.userPerson = userPerson;
    }

    public String getUserMail() {
        return userMail;
    }

    public void setUserMail(String userMail) {
        this.userMail = userMail;
    }

    public String getUserMobile() {
        return userMobile;
    }

    public void setUserMobile(String userMobile) {
        this.userMobile = userMobile;
    }

    public String getUserRemark() {
        return userRemark;
    }

    public void setUserRemark(String userRemark) {
        this.userRemark = userRemark;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getGranted() {
        return granted;
    }

    public void setGranted(String granted) {
        this.granted = granted;
    }

    public String getProductDeptname() {
        return productDeptname;
    }

    public void setProductDeptname(String productDeptname) {
        this.productDeptname = productDeptname;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductType() {
        return productType;
    }

    public void setProductType(String productType) {
        this.productType = productType;
    }

    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }

    public String getProductData() {
        return productData;
    }

    public void setProductData(String productData) {
        this.productData = productData;
    }

    public String getProductRemark() {
        return productRemark;
    }

    public void setProductRemark(String productRemark) {
        this.productRemark = productRemark;
    }

    public String getSaleTime() {
        return saleTime;
    }

    public void setSaleTime(String saleTime) {
        this.saleTime = saleTime;
    }

    public String getSaleDeptname() {
        return saleDeptname;
    }

    public void setSaleDeptname(String saleDeptname) {
        this.saleDeptname = saleDeptname;
    }

    public String getSaleType() {
        return saleType;
    }

    public void setSaleType(String saleType) {
        this.saleType = saleType;
    }

    public Date getApplyData() {
        return applyData;
    }

    public void setApplyData(Date applyData) {
        this.applyData = applyData;
    }
}
