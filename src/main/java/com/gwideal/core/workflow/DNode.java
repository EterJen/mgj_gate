package com.gwideal.core.workflow;

import com.gwideal.core.basic.l4.entity.ActionDef;
import com.gwideal.core.cms.l4.entity.Administrator;
import com.gwideal.core.workflow.DEnums.CandidateExpType;
import com.gwideal.core.workflow.DEnums.ExecType;
import com.gwideal.core.workflow.DEnums.ParticipantType;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.*;

public class DNode implements Comparable<DNode> , Serializable {

	private String id;
	private String name;
	private String description;
	private Boolean isAccept=true;//是否需要接收，默认为true;
	private String acceptSuccess;
	private String flowActionOrder; /*流转操作排序*/
	private Boolean isInitNode = false;
	private Boolean isAbleToCancel = false;//是否能撤回
	private Boolean isAbleToReturn = false;//是否能退回
	private Boolean currNodeIsShowRevise = false;//对于正文是否显示修订的信息，默认不显示修订信息
	private Boolean currNodeIsEnableRevision = true;//对于正文是否打开修订，默认打开修订
	private Boolean editRank = false;//对于正文是否显示修订的信息，默认不显示修订信息
	private String contentType;
	
	private ExecType execType=null;//执行类型：当assigneeType是ListOfPeople的时候，按照那种方式执行
	private Set<DOperation> operations = new HashSet<DOperation>();
	private BigDecimal orderNum;
	private List<DFormAction> formActions = new ArrayList<DFormAction>();
    private ArrayList<MixedCandidate> mixedCandidateList;
    
    private CandidateExpType candidateExpType;
    private Map<ParticipantType,List<DParticipantInfoDetails>> candidatMap = new LinkedHashMap<ParticipantType,List<DParticipantInfoDetails>>();
    private ParticipantType dynamicExpType;
    private ParticipantType assigneePartType;
    private String dynamicExp;
	private String roleType;	

	private List<Administrator> usersInTheNode = new ArrayList<Administrator>();
	private Boolean isCurrNode = false;
	private String nodeType;
	private List<String> selectedFormActIdList =new ArrayList<String>();
	private List<String> insHisShowAvilableActions =new ArrayList<String>(); /*流程历史查看右侧操作菜单配置  任务拥有着（或经办人）处理节点动作*/
	private List<ActionDef> actionDefList =new ArrayList<ActionDef>();/*附件操作的列表*/
	private List<ActionDef> actionDefHistoryList =new ArrayList<ActionDef>();/*附件操作的列表*/

	public List<ActionDef> getActionDefList() {
		return actionDefList;
	}

	public void setActionDefList(List<ActionDef> actionDefList) {
		this.actionDefList = actionDefList;
	}

	public enum NodeType{
		dq,
		notStarted,
		started
	}

	public List<String> getInsHisShowAvilableActions() {
		return insHisShowAvilableActions;
	}

	public void setInsHisShowAvilableActions(List<String> insHisShowAvilableActions) {
		this.insHisShowAvilableActions = insHisShowAvilableActions;
	}

	public List<String> getSelectedFormActIdList() {
		return selectedFormActIdList;
	}

	public void setSelectedFormActIdList(List<String> selectedFormActIdList) {
		this.selectedFormActIdList = selectedFormActIdList;
	}

	public ParticipantType getAssigneePartType() {
		return assigneePartType;
	}

	public void setAssigneePartType(ParticipantType assigneePartType) {
		this.assigneePartType = assigneePartType;
	}

	public ParticipantType getDynamicExpType() {
		return dynamicExpType;
	}

	public void setDynamicExpType(ParticipantType dynamicExpType) {
		this.dynamicExpType = dynamicExpType;
	}

	public CandidateExpType getCandidateExpType() {
		return candidateExpType;
	}

	public void setCandidateExpType(CandidateExpType candidateExpType) {
		this.candidateExpType = candidateExpType;
	}

	public String getDynamicExp() {
		return dynamicExp;
	}

	public void setDynamicExp(String dynamicExp) {
		this.dynamicExp = dynamicExp;
	}

	public String getNodeType() {
		if(this.isCurrNode)
			return NodeType.dq.name();
		if(this.usersInTheNode.size()==0)
			return NodeType.notStarted.name();
		else
			return NodeType.started.name();
	}

	public List<DFormAction> getFormActions() {
		return formActions;
	}

	public void setFormActions(List<DFormAction> formActions) {
		this.formActions = formActions;
	}

	public Boolean getIsCurrNode() {
		return isCurrNode;
	}

	public void setIsCurrNode(Boolean isCurrNode) {
		this.isCurrNode = isCurrNode;
	}

	public List<Administrator> getUsersInTheNode() {
		return usersInTheNode;
	}

	public void setUsersInTheNode(List<Administrator> usersInTheNode) {
		this.usersInTheNode = usersInTheNode;
	}

	public String getAcceptSuccess() {
		return acceptSuccess;
	}

	public void setAcceptSuccess(String acceptSuccess) {
		this.acceptSuccess = acceptSuccess;
	}

	public BigDecimal getOrderNum() {
		return orderNum;
	}


	public void setOrderNum(BigDecimal orderNum) {
		this.orderNum = orderNum;
	}

	public Boolean getEditRank() {
		return editRank;
	}

	public void setEditRank(Boolean editRank) {
		this.editRank = editRank;
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
	public Boolean getIsAccept() {
		return isAccept;
	}
	public void setIsAccept(Boolean isAccept) {
		this.isAccept = isAccept;
	}
	public Boolean getIsInitNode() {
		return isInitNode;
	}
	public void setIsInitNode(Boolean isInitNode) {
		this.isInitNode = isInitNode;
	}
	public Boolean getIsAbleToCancel() {
		return isAbleToCancel;
	}
	public void setIsAbleToCancel(Boolean isAbleToCancel) {
		this.isAbleToCancel = isAbleToCancel;
	}
	public Boolean getIsAbleToReturn() {
		return isAbleToReturn;
	}
	public void setIsAbleToReturn(Boolean isAbleToReturn) {
		this.isAbleToReturn = isAbleToReturn;
	}
	

	public void setNodeType(String nodeType) {
		this.nodeType = nodeType;
	}
	
	
	public Map<ParticipantType, List<DParticipantInfoDetails>> getCandidatMap() {
		return candidatMap;
	}

	public void setCandidatMap(Map<ParticipantType, List<DParticipantInfoDetails>> candidatMap) {
		this.candidatMap = candidatMap;
	}


	public String getRoleType() {
		return roleType;
	}

	public void setRoleType(String roleType) {
		this.roleType = roleType;
	}

	public ExecType getExecType() {
		return execType;
	}
	public void setExecType(ExecType execType) {
		this.execType = execType;
	}
	public Set<DOperation> getOperations() {
		return operations;
	}
	public void setOperations(Set<DOperation> operations) {
		this.operations = operations;
	}

	public ArrayList<MixedCandidate> getMixedCandidateList() {
		return mixedCandidateList;
	}

	public void setMixedCandidateList(ArrayList<MixedCandidate> mixedCandidateList) {
		this.mixedCandidateList = mixedCandidateList;
	}

	public Boolean getCurrNodeIsEnableRevision() {
		return currNodeIsEnableRevision;
	}

	public void setCurrNodeIsEnableRevision(Boolean currNodeIsEnableRevision) {
		this.currNodeIsEnableRevision = currNodeIsEnableRevision;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		DNode other = (DNode) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	public Boolean getAccept() {
		return isAccept;
	}

	public void setAccept(Boolean accept) {
		isAccept = accept;
	}

	public Boolean getInitNode() {
		return isInitNode;
	}

	public void setInitNode(Boolean initNode) {
		isInitNode = initNode;
	}

	public Boolean getAbleToCancel() {
		return isAbleToCancel;
	}

	public void setAbleToCancel(Boolean ableToCancel) {
		isAbleToCancel = ableToCancel;
	}

	public Boolean getAbleToReturn() {
		return isAbleToReturn;
	}

	public void setAbleToReturn(Boolean ableToReturn) {
		isAbleToReturn = ableToReturn;
	}

	public Boolean getCurrNode() {
		return isCurrNode;
	}

	public void setCurrNode(Boolean currNode) {
		isCurrNode = currNode;
	}

	public int compareTo(DNode arg0) {
        return this.getOrderNum().compareTo(arg0.getOrderNum());
    }

	public Boolean getCurrNodeIsShowRevise() {
		return currNodeIsShowRevise;
	}

	public void setCurrNodeIsShowRevise(Boolean currNodeIsShowRevise) {
		this.currNodeIsShowRevise = currNodeIsShowRevise;
	}

	public String getContentType() {
		return contentType;
	}

	public void setContentType(String contentType) {
		this.contentType = contentType;
	}

	public String getFlowActionOrder() {
		return flowActionOrder;
	}

	public void setFlowActionOrder(String flowActionOrder) {
		this.flowActionOrder = flowActionOrder;
	}

	public List<ActionDef> getActionDefHistoryList() {
		return actionDefHistoryList;
	}

	public void setActionDefHistoryList(List<ActionDef> actionDefHistoryList) {
		this.actionDefHistoryList = actionDefHistoryList;
	}
}
