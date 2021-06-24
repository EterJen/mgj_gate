package com.gwideal.core.basic.l4.entity;

import java.io.Serializable;
import java.math.BigDecimal;

public class CountNumber implements Serializable {

	private BigDecimal count=new BigDecimal(0);
	private BigDecimal numberCopies=new BigDecimal(0);
	private BigDecimal wngk=new BigDecimal(0);
	private BigDecimal notWngk=new BigDecimal(0);
	private BigDecimal zdgk=new BigDecimal(0);
	private BigDecimal ysqgk=new BigDecimal(0);
	private BigDecimal bygk=new BigDecimal(0);
	//秘密数量和份数
	private BigDecimal secret=new BigDecimal(0);
	private BigDecimal secretCopies=new BigDecimal(0);
	//机密数量和份数
	private BigDecimal confidential=new BigDecimal(0);
	private BigDecimal confidentialCopies=new BigDecimal(0);
	//绝密数量和份数
	private BigDecimal topSecret=new BigDecimal(0);
	private BigDecimal topSecretCopies=new BigDecimal(0);

    public BigDecimal getCount() {
        return count;
    }

    public void setCount(BigDecimal count) {
        this.count = count;
    }

    public BigDecimal getNumberCopies() {
        return numberCopies;
    }

    public void setNumberCopies(BigDecimal numberCopies) {
        this.numberCopies = numberCopies;
    }

    public BigDecimal getWngk() {
        return wngk;
    }

    public void setWngk(BigDecimal wngk) {
        this.wngk = wngk;
    }

    public BigDecimal getNotWngk() {
        return notWngk;
    }

    public void setNotWngk(BigDecimal notWngk) {
        this.notWngk = notWngk;
    }

    public BigDecimal getZdgk() {
        return zdgk;
    }

    public void setZdgk(BigDecimal zdgk) {
        this.zdgk = zdgk;
    }

    public BigDecimal getYsqgk() {
        return ysqgk;
    }

    public void setYsqgk(BigDecimal ysqgk) {
        this.ysqgk = ysqgk;
    }

    public BigDecimal getBygk() {
        return bygk;
    }

    public void setBygk(BigDecimal bygk) {
        this.bygk = bygk;
    }

    public BigDecimal getSecret() {
        return secret;
    }

    public void setSecret(BigDecimal secret) {
        this.secret = secret;
    }

    public BigDecimal getSecretCopies() {
        return secretCopies;
    }

    public void setSecretCopies(BigDecimal secretCopies) {
        this.secretCopies = secretCopies;
    }

    public BigDecimal getConfidential() {
        return confidential;
    }

    public void setConfidential(BigDecimal confidential) {
        this.confidential = confidential;
    }

    public BigDecimal getConfidentialCopies() {
        return confidentialCopies;
    }

    public void setConfidentialCopies(BigDecimal confidentialCopies) {
        this.confidentialCopies = confidentialCopies;
    }

    public BigDecimal getTopSecret() {
        return topSecret;
    }

    public void setTopSecret(BigDecimal topSecret) {
        this.topSecret = topSecret;
    }

    public BigDecimal getTopSecretCopies() {
        return topSecretCopies;
    }

    public void setTopSecretCopies(BigDecimal topSecretCopies) {
        this.topSecretCopies = topSecretCopies;
    }
}
