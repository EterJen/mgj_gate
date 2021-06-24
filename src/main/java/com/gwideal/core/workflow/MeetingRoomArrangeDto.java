package com.gwideal.core.workflow;

import java.util.List;
import java.util.Map;

/**
 * @author 18800
 * @date 2018/11/12 10:37
 */
public class MeetingRoomArrangeDto {

	private String meetingRoomName;

	private List<String> dateList;

	private Map<String, Object> data;

	public String getMeetingRoomName() {
		return meetingRoomName;
	}

	public void setMeetingRoomName(String meetingRoomName) {
		this.meetingRoomName = meetingRoomName;
	}

	public List<String> getDateList() {
		return dateList;
	}

	public void setDateList(List<String> dateList) {
		this.dateList = dateList;
	}

	public Map<String, Object> getData() {
		return data;
	}

	public void setData(Map<String, Object> data) {
		this.data = data;
	}
}
