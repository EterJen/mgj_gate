package com.gwideal.core.workflow;

import com.gwideal.core.workflow.DEnums.ParticipantType;

import javax.persistence.Transient;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

public class DParticipantInfoDetails implements Serializable {

	private ParticipantType participantType;
	private BigDecimal participantId;
	private BigDecimal Id;
	private String participantName;
	private String name;
	private List<DParticipantInfoDetails> childrenParticipants;
	private boolean isParent = true;/*是否父节点 可展开*/
	private Boolean expand = false;
	@javax.persistence.Transient
	private String orderBy ;


	public boolean isParent() {
		return isParent;
	}

	public void setParent(boolean parent) {
		isParent = parent;
	}

	public ParticipantType getParticipantType() {
		return participantType;
	}
	public void setParticipantType(ParticipantType participantType) {
		this.participantType = participantType;
	}
	public BigDecimal getParticipantId() {
		return participantId;
	}
	public void setParticipantId(BigDecimal participantId) {
		this.participantId = participantId;
	}
	public String getParticipantName() {
		return participantName;
	}
	public void setParticipantName(String participantName) {
		this.participantName = participantName;
	}
	public List<DParticipantInfoDetails> getChildrenParticipants() {
		return childrenParticipants;
	}
	public void setChildrenParticipants(List<DParticipantInfoDetails> childrenParticipants) {
		this.childrenParticipants = childrenParticipants;
	}

	public BigDecimal getId() {
		return Id;
	}

	public void setId(BigDecimal id) {
		Id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Boolean getExpand() {
		return expand;
	}

	public void setExpand(Boolean expand) {
		this.expand = expand;
	}

	public String getOrderBy() {
		return orderBy;
	}

	public String orderby() {
		return orderBy;
	}

	public void setOrderBy(String orderBy) {
		this.orderBy = orderBy;
	}
	@Transient
	boolean filter = true;

	public boolean isFilter() {
		return filter;
	}

	public void setFilter(boolean filter) {
		this.filter = filter;
	}
}
