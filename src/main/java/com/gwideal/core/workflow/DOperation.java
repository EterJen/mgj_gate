package com.gwideal.core.workflow;

import com.gwideal.core.basic.l4.entity.CoreRole;
import com.gwideal.core.cms.l4.entity.Administrator;
import com.gwideal.core.workflow.DEnums.*;
import jdk.nashorn.internal.runtime.regexp.joni.constants.CCSTATE;
import org.apache.commons.lang3.StringUtils;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.*;

public class DOperation implements Comparable<DOperation> , Serializable {

    private String id;
    private String name;
    private String description;
    private String targetNodeId;
    private String preCondition;
    private String postLogic;
    private String candidatesCacultLogic; //候选人计算逻辑
    private TaskInitType taskInitType;//任务基数
    private TaskCreateMode taskCreateMode;//de
    private Object taskReturnMode;//de
    private List<TaskFlowMode> taskReturnModes = new ArrayList<>();//de
    private Object candidatesExpandTypes;//de
    private List<CandidatesExpandType> candidatesExpandTypeEs = new ArrayList<>();//de
    private Object candidatesOrder;//候选人排序
    private List<CandidatesOrder> candidatesOrderEs = new ArrayList<>();//de
    private Object candiTypeOrder;//候选类型排序
    private List<ParticipantType> candiTypeOrderEs = new ArrayList<>();//de
    private Boolean optionValidate = false;/*意见必填*/
    private boolean optionAgent = false;/*意见代签*/
    private String optionValidateErrorMsg;
    private String flowActionTips;
	private String colNode;//智能连接的节点
	
	private String colName;//智能连接设置的类型（onlyPerson，onlyDepart，both ）

	//运行时产生的信息：候选参与者的列表,每个操作可以有多个候选者类型
    private Map<ParticipantType,List<DParticipantInfoDetails>> candidatMap = new LinkedHashMap<ParticipantType,List<DParticipantInfoDetails>>();
    private boolean isZntj;
    private ParticipantType zntjAssignType;
    private List<Administrator> zntjU = new ArrayList<>();
    private List<CoreRole> zntjR = new ArrayList<>();
    private DNode targetNode;

    private Boolean preConditionPass;

    //迁移条件不满足时的提示消息
    private String preConditionFalseMessage;

    //操作的顺序:可以自己配置，也可以通过所指向的节点的顺序进行设置。默认用后者；
    private BigDecimal orderNum;

    //当前操作推荐的用户
    private Administrator recomSelectedUser;
    
    
    //当前操作推荐的用户  有可能为多个用户
    private List<Administrator> recomSelectedUsers = new ArrayList<Administrator>();
    
    private ParticipantType targetNodeAssigneeType;


    public Boolean getOptionValidate() {
        return optionValidate;
    }

    public void setOptionValidate(Boolean optionValidate) {
        this.optionValidate = optionValidate;
    }

    public String getOptionValidateErrorMsg() {
        return optionValidateErrorMsg;
    }

    public void setOptionValidateErrorMsg(String optionValidateErrorMsg) {
        this.optionValidateErrorMsg = optionValidateErrorMsg;
    }

    List<DParticipantInfoDetails> sysCaculteCandidates;

    public TaskCreateMode getTaskCreateMode() {
		return taskCreateMode;
	}

	public void setTaskCreateMode(TaskCreateMode taskCreateMode) {
		this.taskCreateMode = taskCreateMode;
	}


    public Object getTaskReturnMode() {
        return taskReturnMode;
    }

    public void setTaskReturnMode(Object taskReturnMode) {
        this.taskReturnMode = taskReturnMode;
    }

    public List<TaskFlowMode> getTaskReturnModes() {
        return taskReturnModes;
    }

    public void setTaskReturnModes() {
        List<TaskFlowMode> tempTaskFlowModes = new ArrayList<>();
        if (taskReturnMode instanceof List) {
            List<Map>  xx =(List<Map>) taskReturnMode;
            for (Map map : xx) {
                tempTaskFlowModes.add(TaskFlowMode.getEnum((String) map.get("id")));
            }
        }
        this.taskReturnModes = tempTaskFlowModes;
    }
    public void setTaskReturnModes(List<TaskFlowMode> taskReturnModes) {
        this.taskReturnModes = taskReturnModes;
    }

    public Object getCandidatesExpandTypes() {
        return candidatesExpandTypes;
    }

    public Object getCandidatesOrder() {
        return candidatesOrder;
    }

    public void setCandidatesOrder() {
        List<CandidatesOrder> expandTypes = new ArrayList<>();
        if (this.candidatesOrder instanceof List) {
            List<Map>  xx =(List<Map>) this.candidatesOrder;
            for (Map map : xx) {
                expandTypes.add(CandidatesOrder.getEnum((String) map.get("id")));
            }
        }
        this.candidatesOrderEs = expandTypes;
    }
    public void setCandidatesOrder(Object candidatesOrder) {
        this.candidatesOrder = candidatesOrder;
    }

    public List<CandidatesOrder> getCandidatesOrderEs() {
        return candidatesOrderEs;
    }

    public void setCandidatesOrderEs(List<CandidatesOrder> candidatesOrderEs) {
        this.candidatesOrderEs = candidatesOrderEs;
    }

    public void setCandidatesExpandTypeEs() {
        List<CandidatesExpandType> expandTypes = new ArrayList<>();
        if (this.candidatesExpandTypes instanceof List) {
            List<Map>  xx =(List<Map>) this.candidatesExpandTypes;
            for (Map map : xx) {
                expandTypes.add(CandidatesExpandType.getEnum((String) map.get("id")));
            }
        }
        this.candidatesExpandTypeEs = expandTypes;
    }

    public Object getCandiTypeOrder() {
        return candiTypeOrder;
    }

    public void setCandiTypeOrder(Object candiTypeOrder) {
        this.candiTypeOrder = candiTypeOrder;
    }

    public List<ParticipantType> getCandiTypeOrderEs() {
        return candiTypeOrderEs;
    }

    public void setCandiTypeOrderEs(List<ParticipantType> candiTypeOrderEs) {
        this.candiTypeOrderEs = candiTypeOrderEs;
    }
    public void setCandiTypeOrderEs() {
        List<ParticipantType> expandTypes = new ArrayList<>();
        if (this.candiTypeOrder instanceof List) {
            List<Map>  xx =(List<Map>) this.candiTypeOrder;
            for (Map map : xx) {
                expandTypes.add(ParticipantType.getEnum((String) map.get("id")));
            }
        }
        this.candiTypeOrderEs = expandTypes;
    }

    public void setCandidatesExpandTypes(Object candidatesExpandTypes) {
        this.candidatesExpandTypes = candidatesExpandTypes;
    }

    public List<CandidatesExpandType> getCandidatesExpandTypeEs() {
        return candidatesExpandTypeEs;
    }

    public void setCandidatesExpandTypeEs(List<CandidatesExpandType> candidatesExpandTypeEs) {
        this.candidatesExpandTypeEs = candidatesExpandTypeEs;
    }

    public ParticipantType getTargetNodeAssigneeType() {
		return targetNodeAssigneeType;
	}

	public void setTargetNodeAssigneeType(ParticipantType targetNodeAssigneeType) {
		this.targetNodeAssigneeType = targetNodeAssigneeType;
	}

	public TaskInitType getTaskInitType() {
		return taskInitType;
	}

	public void setTaskInitType(TaskInitType taskInitType) {
		this.taskInitType = taskInitType;
	}

    public Administrator getRecomSelectedUser() {
        return recomSelectedUser;
    }

    public void setRecomSelectedUser(Administrator recomSelectedUser) {
        this.recomSelectedUser = recomSelectedUser;
    }

    public BigDecimal getOrderNum() {
        return orderNum;
    }

    public void setOrderNum(BigDecimal orderNum) {
        this.orderNum = orderNum;
    }

    public String getPreConditionFalseMessage() {
        return preConditionFalseMessage;
    }

    public void setPreConditionFalseMessage(String preConditionFalseMessage) {
        this.preConditionFalseMessage = preConditionFalseMessage;
    }

    public Boolean getPreConditionPass() {
        return preConditionPass;
    }

    public void setPreConditionPass(Boolean preConditionPass) {
        this.preConditionPass = preConditionPass;
    }

    public DNode getTargetNode() {
        return targetNode;
    }

    public void setTargetNode(DNode targetNode) {
        this.targetNode = targetNode;
    }
    

	public Map<ParticipantType, List<DParticipantInfoDetails>> getCandidatMap() {
		return candidatMap;
	}

	public void setCandidatMap(Map<ParticipantType, List<DParticipantInfoDetails>> candidatMap) {
		this.candidatMap = candidatMap;
	}

    public String getCandidatesCacultLogic() {
        return candidatesCacultLogic;
    }

    public void setCandidatesCacultLogic(String candidatesCacultLogic) {
        this.candidatesCacultLogic = candidatesCacultLogic;
    }

    public void setZntjAssignType(ParticipantType zntjAssignType) {
		this.zntjAssignType = zntjAssignType;
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

    public String getTargetNodeId() {
        return targetNodeId;
    }

    public void setTargetNodeId(String targetNodeId) {
        this.targetNodeId = targetNodeId;
    }

    public String getPreCondition() {
        return preCondition;
    }

    public void setPreCondition(String preCondition) {
        this.preCondition = preCondition;
    }

    public String getPostLogic() {
        return postLogic;
    }

    public void setPostLogic(String postLogic) {
        this.postLogic = postLogic;
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
        DOperation other = (DOperation) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        return true;
    }

    public int compareTo(DOperation arg0) {
        return this.getOrderNum().compareTo(arg0.getOrderNum());
    }

    public List<Administrator> getZntjU() {
        return zntjU;
    }

    public void setZntjU(List<Administrator> zntjU) {
        this.zntjU = zntjU;
    }

    public List<CoreRole> getZntjR() {
        return zntjR;
    }

    public void setZntjR(List<CoreRole> zntjR) {
        this.zntjR = zntjR;
    }

    public boolean isZntj() {
        return isZntj;
    }

    public void setZntj(boolean zntj) {
        isZntj = zntj;
    }

	public ParticipantType getZntjAssignType() {
		return zntjAssignType;
	}

    public boolean isOptionAgent() {
        return optionAgent;
    }

    public void setOptionAgent(boolean optionAgent) {
        this.optionAgent = optionAgent;
    }

    public List<DParticipantInfoDetails> getSysCaculteCandidates() {
        return sysCaculteCandidates;
    }

    public void setSysCaculteCandidates(List<DParticipantInfoDetails> sysCaculteCandidates) {
        this.sysCaculteCandidates = sysCaculteCandidates;
    }

    public String getFlowActionTips() {
        return flowActionTips;
    }

    public void setFlowActionTips(String flowActionTips) {
        this.flowActionTips = flowActionTips;
    }

	public String getColNode() {
		return colNode;
	}

	public void setColNode(String colNode) {
		this.colNode = colNode;
	}

	public String getColName() {
		return colName;
	}

	public void setColName(String colName) {
		this.colName = colName;
	}

    public List<Administrator> getRecomSelectedUsers() {
        return recomSelectedUsers;
    }

    public void setRecomSelectedUsers(List<Administrator> recomSelectedUsers) {
        this.recomSelectedUsers = recomSelectedUsers;
    }
}
