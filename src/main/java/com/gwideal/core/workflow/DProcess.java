package com.gwideal.core.workflow;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.*;


//所有工作流默认可以使用currentUser这个bean
@JsonIgnoreProperties(ignoreUnknown = true)
public class DProcess implements Serializable {

	
	private String id;
	private String name;
	private String description;
	private Date createDate;
	private Date updateDate;
	private String creatorId;
	private String creatorName;
	private BigDecimal formDefid;//流程表单的id;
	private List<DNode> nodes = new ArrayList<DNode>();
	private Set<String> processBeans = new HashSet<String>();
	
	
	//TODO:检查定义中有，且仅有一个初始节点

	@JsonIgnore
	public DNode getInitNode(){
		for(DNode dn:nodes){
			if(dn.getIsInitNode())
				return dn;
		}
		return null;
	}
	
	public DNode getNodeById(String nodeId){
		for(DNode dn:nodes)
			if(dn.getId().equals(nodeId))
				return dn;
		return null;
	}
	

	
	
	

	public BigDecimal getFormDefid() {
		return formDefid;
	}

	public void setFormDefid(BigDecimal formDefid) {
		this.formDefid = formDefid;
	}

	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public Date getUpdateDate() {
		return updateDate;
	}
	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}
	public String getCreatorId() {
		return creatorId;
	}
	public void setCreatorId(String creatorId) {
		this.creatorId = creatorId;
	}
	public String getCreatorName() {
		return creatorName;
	}
	public void setCreatorName(String creatorName) {
		this.creatorName = creatorName;
	}
	
	public List<DNode> getNodes() {
		return nodes;
	}

	public void setNodes(List<DNode> nodes) {
		this.nodes = nodes;
	}

	public Set<String> getProcessBeans() {
		return processBeans;
	}
	public void setProcessBeans(Set<String> processBeans) {
		this.processBeans = processBeans;
	}

}
