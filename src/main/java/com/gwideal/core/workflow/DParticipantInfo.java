package com.gwideal.core.workflow;

import java.math.BigDecimal;
import java.util.List;

import com.gwideal.core.workflow.DEnums.ParticipantType;

public interface DParticipantInfo {

	
	public ParticipantType getParticipantType() ;
	public List<DParticipantInfoDetails> getChildrenParticipants();

	public BigDecimal getParticipantId() ;
	public Boolean getExpand();
	
	public String getParticipantName() ;

	public String getOrderBy();

}
