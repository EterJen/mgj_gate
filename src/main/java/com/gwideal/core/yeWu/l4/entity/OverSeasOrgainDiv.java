package com.gwideal.core.yeWu.l4.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.gwideal.increment.generator.IncAnnoColumn;
import com.gwideal.increment.generator.IncAnnoDbName;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.math.BigDecimal;
import java.util.Date;

@Table(name = "OVERSEASORGAINDIV")
@IncAnnoDbName(name = "dameng", comment = "默认表名")
public class OverSeasOrgainDiv {

    @Id()
    @IncAnnoColumn(name = "USERID", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "默认标签")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "select JXWOAUniversalSeq.nextval from dual")
    private BigDecimal userid;

    @IncAnnoColumn(name = "ENTERPRISENAME", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "100", comment = "默认标签")
    private String enterprisename;

    @IncAnnoColumn(name = "DWELLINGPLACE", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "100", comment = "住所地")
    private String dwellingplace;

    @IncAnnoColumn(name = "BUSINESSENTERPRISE", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "100", comment = "企业类型")
    private String businessenterprise;

    @IncAnnoColumn(name = "ENTERPRISECODE", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "100", comment = "默认标签")
    private String enterprisecode;

    @IncAnnoColumn(name = "REGISTEREDCAPITAL", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "100", comment = "默认标签")
    private String registeredcapital;

    @IncAnnoColumn(name = "MANAGETIMELIMIT", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "100", comment = "经营期限")
    private String managetimelimit;

    @IncAnnoColumn(name = "CORPORATIONREPRE", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "100", comment = "法人代表")
    private String corporationrepre;

    @IncAnnoColumn(name = "PHONENUMBER", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "100", comment = "默认标签")
    private String phonenumber;

    @IncAnnoColumn(name = "MANAGEPERSON", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "100", comment = "默认标签")
    private String manageperson;

    @IncAnnoColumn(name = "NUMBERCONTACT", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "100", comment = "默认标签")
    private String numbercontact;

    @IncAnnoColumn(name = "INVESTINENTERPRISE", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "100", comment = "主要投资企业名称及注册地")
    private String investinenterprise;

    @IncAnnoColumn(name = "SHARECAPITALSTRUCTURE", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "100", comment = "股本结构")
    private String sharecapitalstructure;

    @IncAnnoColumn(name = "MANAGERANGE", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "100", comment = "经营内容")
    private String managerange;

    @IncAnnoColumn(name = "NUMBERPERSONS", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "100", comment = "默认标签")
    private String numberpersons;

    public BigDecimal getUserid() {
        return userid;
    }

    public void setUserid(BigDecimal userid) {
        this.userid = userid;
    }

    public String getEnterprisename() {
        return enterprisename;
    }

    public void setEnterprisename(String enterprisename) {
        this.enterprisename = enterprisename;
    }

    public String getDwellingplace() {
        return dwellingplace;
    }

    public void setDwellingplace(String dwellingplace) {
        this.dwellingplace = dwellingplace;
    }

    public String getBusinessenterprise() {
        return businessenterprise;
    }

    public void setBusinessenterprise(String businessenterprise) {
        this.businessenterprise = businessenterprise;
    }

    public String getEnterprisecode() {
        return enterprisecode;
    }

    public void setEnterprisecode(String enterprisecode) {
        this.enterprisecode = enterprisecode;
    }

    public String getRegisteredcapital() {
        return registeredcapital;
    }

    public void setRegisteredcapital(String registeredcapital) {
        this.registeredcapital = registeredcapital;
    }

    public String getManagetimelimit() {
        return managetimelimit;
    }

    public void setManagetimelimit(String managetimelimit) {
        this.managetimelimit = managetimelimit;
    }

    public String getCorporationrepre() {
        return corporationrepre;
    }

    public void setCorporationrepre(String corporationrepre) {
        this.corporationrepre = corporationrepre;
    }

    public String getPhonenumber() {
        return phonenumber;
    }

    public void setPhonenumber(String phonenumber) {
        this.phonenumber = phonenumber;
    }

    public String getManageperson() {
        return manageperson;
    }

    public void setManageperson(String manageperson) {
        this.manageperson = manageperson;
    }

    public String getNumbercontact() {
        return numbercontact;
    }

    public void setNumbercontact(String numbercontact) {
        this.numbercontact = numbercontact;
    }

    public String getInvestinenterprise() {
        return investinenterprise;
    }

    public void setInvestinenterprise(String investinenterprise) {
        this.investinenterprise = investinenterprise;
    }

    public String getSharecapitalstructure() {
        return sharecapitalstructure;
    }

    public void setSharecapitalstructure(String sharecapitalstructure) {
        this.sharecapitalstructure = sharecapitalstructure;
    }

    public String getManagerange() {
        return managerange;
    }

    public void setManagerange(String managerange) {
        this.managerange = managerange;
    }

    public String getNumberpersons() {
        return numberpersons;
    }

    public void setNumberpersons(String numberpersons) {
        this.numberpersons = numberpersons;
    }
}
