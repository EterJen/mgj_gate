package com.gwideal.core.workflow;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;

/**
 * @author 18800
 * @date 2018/11/19 14:19
 */
public class LeaderWorkArrangeDto {

	@JsonProperty(value = "id")
	private BigDecimal userid;

	@JsonProperty(value = "name")
	private String usercname;



	private Boolean editable;

	public LeaderWorkArrangeDto() {
	}


	public BigDecimal getUserid() {
		return userid;
	}

	public void setUserid(BigDecimal userid) {
		this.userid = userid;
	}

	public String getUsercname() {
		return usercname;
	}

	public void setUsercname(String usercname) {
		this.usercname = usercname;
	}



	public Boolean getEditable() {
		return editable;
	}

	public void setEditable(Boolean editable) {
		this.editable = editable;
	}

}
