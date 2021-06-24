package com.gwideal.core.juBaoTouSu.l4.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.gwideal.increment.generator.IncAnnoColumn;
import com.gwideal.increment.generator.IncAnnoDbName;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.math.BigDecimal;
import java.util.Date;

@Table(name = "SUGGESTIONBOX_CL")
@IncAnnoDbName(name = "dameng", comment = "默认表名")
public class SuggesTionBoxCL {
    @Id()
    @IncAnnoColumn(name = "ID", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "默认标签")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "select JXWOAUniversalSeq.nextval from dual")
    private BigDecimal id;

    @IncAnnoColumn(name = "SU_ID", dbType = "NUMBER", jdbcType = "INTEGER", dataPrecision = "4", dataScale = "0", dataLength = "22", comment = "状态")
    private Integer su_id;

    @IncAnnoColumn(name = "CBODY", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "100", comment = "标题")
    private String cbody;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @IncAnnoColumn(name = "INTIME", dbType = "DATETIME", jdbcType = "TIMESTAMP", dataPrecision = "", dataScale = "6", dataLength = "8", comment = "插入时间")
    private Date intime;

    @IncAnnoColumn(name = "USERID", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "100", comment = "姓名")
    private String userid;

    @IncAnnoColumn(name = "USERNAME", dbType = "VARCHAR2", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "0", dataLength = "100", comment = "邮件")
    private String username;

    public BigDecimal getId() {
        return id;
    }

    public void setId(BigDecimal id) {
        this.id = id;
    }

    public Integer getSu_id() {
        return su_id;
    }

    public void setSu_id(Integer su_id) {
        this.su_id = su_id;
    }

    public String getCbody() {
        return cbody;
    }

    public void setCbody(String cbody) {
        this.cbody = cbody;
    }

    public Date getIntime() {
        return intime;
    }

    public void setIntime(Date intime) {
        this.intime = intime;
    }

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
