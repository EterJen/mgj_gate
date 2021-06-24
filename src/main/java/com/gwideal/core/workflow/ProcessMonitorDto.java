package com.gwideal.core.workflow;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

/**
 * @author 18800
 * @date 2019/3/5 16:40
 */
public class ProcessMonitorDto implements Serializable {

	private BigDecimal id;

	private String nodeId;

	private String nodeName;

	private String sender;

	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
	private Date sendTime;

	private String sendTo;

	private String receiver;

	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
	private Date receiveTime;

	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
	private Date finishTime;

	private String status;

	private BigDecimal fromTaskId;

	private BigDecimal insertedTaskId;

	private BigDecimal proInstId;

	private Boolean fromCurrentTask = Boolean.FALSE;

	private Boolean revocable = Boolean.FALSE;

	private Boolean selected = Boolean.FALSE;

	public BigDecimal getId() {
		return id;
	}

	public void setId(BigDecimal id) {
		this.id = id;
	}

	public String getNodeId() {
		return nodeId;
	}

	public void setNodeId(String nodeId) {
		this.nodeId = nodeId;
	}

	public String getNodeName() {
		return nodeName;
	}

	public void setNodeName(String nodeName) {
		this.nodeName = nodeName;
	}

	public String getSender() {
		return sender;
	}

	public void setSender(String sender) {
		this.sender = sender;
	}

	public Date getSendTime() {
		return sendTime;
	}

	public void setSendTime(Date sendTime) {
		this.sendTime = sendTime;
	}

	public String getSendTo() {
		return sendTo;
	}

	public void setSendTo(String sendTo) {
		this.sendTo = sendTo;
	}

	public String getReceiver() {
		return receiver;
	}

	public void setReceiver(String receiver) {
		this.receiver = receiver;
	}

	public Date getReceiveTime() {
		return receiveTime;
	}

	public void setReceiveTime(Date receiveTime) {
		this.receiveTime = receiveTime;
	}

	public Date getFinishTime() {
		return finishTime;
	}

	public void setFinishTime(Date finishTime) {
		this.finishTime = finishTime;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public BigDecimal getFromTaskId() {
		return fromTaskId;
	}

	public void setFromTaskId(BigDecimal fromTaskId) {
		this.fromTaskId = fromTaskId;
	}

	public BigDecimal getInsertedTaskId() {
		return insertedTaskId;
	}

	public void setInsertedTaskId(BigDecimal insertedTaskId) {
		this.insertedTaskId = insertedTaskId;
	}

	public BigDecimal getProInstId() {
		return proInstId;
	}

	public void setProInstId(BigDecimal proInstId) {
		this.proInstId = proInstId;
	}

	public Boolean getFromCurrentTask() {
		return fromCurrentTask;
	}

	public void setFromCurrentTask(Boolean fromCurrentTask) {
		this.fromCurrentTask = fromCurrentTask;
	}

	public Boolean getRevocable() {
		return revocable;
	}

	public void setRevocable(Boolean revocable) {
		this.revocable = revocable;
	}

	public Boolean getSelected() {
		return selected;
	}

	public void setSelected(Boolean selected) {
		this.selected = selected;
	}

	public ProcessMonitorDto() {
	}

	private ProcessMonitorDto(Builder builder) {
		id = builder.id;
		nodeId = builder.nodeId;
		nodeName = builder.nodeName;
		sender = builder.sender;
		sendTime = builder.sendTime;
		sendTo = builder.sendTo;
		receiver = builder.receiver;
		receiveTime = builder.receiveTime;
		finishTime = builder.finishTime;
		status = builder.status;
		fromTaskId = builder.fromTaskId;
		insertedTaskId = builder.insertedTaskId;
		proInstId = builder.proInstId;
		fromCurrentTask = builder.fromCurrentTask;
		revocable = builder.revocable;
		selected = builder.selected;
	}

	public static Builder newBuilder() {
		return new Builder();
	}

	public static Builder newBuilder(ProcessMonitorDto copy) {
		Builder builder = new Builder();
		builder.id = copy.getId();
		builder.nodeId = copy.getNodeId();
		builder.nodeName = copy.getNodeName();
		builder.sender = copy.getSender();
		builder.sendTime = copy.getSendTime();
		builder.sendTo = copy.getSendTo();
		builder.receiver = copy.getReceiver();
		builder.receiveTime = copy.getReceiveTime();
		builder.finishTime = copy.getFinishTime();
		builder.status = copy.getStatus();
		builder.fromTaskId = copy.getFromTaskId();
		builder.insertedTaskId = copy.getInsertedTaskId();
		builder.proInstId = copy.getProInstId();
		builder.fromCurrentTask = copy.getFromCurrentTask();
		builder.revocable = copy.getRevocable();
		builder.selected = copy.getSelected();
		return builder;
	}


	public static final class Builder {
		private BigDecimal id;
		private String nodeId;
		private String nodeName;
		private String sender;
		private Date sendTime;
		private String sendTo;
		private String receiver;
		private Date receiveTime;
		private Date finishTime;
		private String status;
		private BigDecimal fromTaskId;
		private BigDecimal insertedTaskId;
		private BigDecimal proInstId;
		private Boolean fromCurrentTask = Boolean.FALSE;
		private Boolean revocable = Boolean.FALSE;
		private Boolean selected = Boolean.FALSE;

		private Builder() {
		}

		public Builder id(BigDecimal id) {
			this.id = id;
			return this;
		}

		public Builder nodeId(String nodeId) {
			this.nodeId = nodeId;
			return this;
		}

		public Builder nodeName(String nodeName) {
			this.nodeName = nodeName;
			return this;
		}

		public Builder sender(String sender) {
			this.sender = sender;
			return this;
		}

		public Builder sendTime(Date sendTime) {
			this.sendTime = sendTime;
			return this;
		}

		public Builder sendTo(String sendTo) {
			this.sendTo = sendTo;
			return this;
		}

		public Builder receiver(String receiver) {
			this.receiver = receiver;
			return this;
		}

		public Builder receiveTime(Date receiveTime) {
			this.receiveTime = receiveTime;
			return this;
		}

		public Builder finishTime(Date finishTime) {
			this.finishTime = finishTime;
			return this;
		}

		public Builder status(String status) {
			this.status = status;
			return this;
		}

		public Builder fromTaskId(BigDecimal fromTaskId) {
			this.fromTaskId = fromTaskId;
			return this;
		}

		public Builder insertedTaskId(BigDecimal insertedTaskId) {
			this.insertedTaskId = insertedTaskId;
			return this;
		}

		public Builder proInstId(BigDecimal proInstId) {
			this.proInstId = proInstId;
			return this;
		}

		public Builder fromCurrentTask(Boolean fromCurrentTask) {
			this.fromCurrentTask = fromCurrentTask;
			return this;
		}

		public Builder revocable(Boolean revocable) {
			this.revocable = revocable;
			return this;
		}

		public Builder selected(Boolean selected) {
			this.selected = selected;
			return this;
		}

		public ProcessMonitorDto build() {
			return new ProcessMonitorDto(this);
		}
	}
}
