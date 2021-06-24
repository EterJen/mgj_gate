package com.gwideal.core.workflow;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;
import java.util.LinkedList;
import java.util.List;

/**
 * @author 18800
 * @date 2018/11/13 12:58
 */
public class MeetingRoomManageDto {

	private BigDecimal id;

	@JsonProperty(value = "name")
	private String meetingroomName;

	private List<MeetingRoomManageDto> nodes = new LinkedList<>();

	public MeetingRoomManageDto() {
	}

	public MeetingRoomManageDto(String meetingroomName, List<MeetingRoomManageDto> nodes) {
		this.meetingroomName = meetingroomName;
		this.nodes = nodes;
	}

	public BigDecimal getId() {
		return id;
	}

	public void setId(BigDecimal id) {
		this.id = id;
	}

	public String getMeetingroomName() {
		return meetingroomName;
	}

	public void setMeetingroomName(String meetingroomName) {
		this.meetingroomName = meetingroomName;
	}

	public List<MeetingRoomManageDto> getNodes() {
		return nodes;
	}

	public void setNodes(List<MeetingRoomManageDto> nodes) {
		this.nodes = nodes;
	}
}
