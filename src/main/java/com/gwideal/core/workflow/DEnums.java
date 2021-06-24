package com.gwideal.core.workflow;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

public class DEnums {

	public enum ProInstStatus{
		Active,//正常
		Finished,//办结
		canBeReturn,//办结
		Archived,//归档
	}
    public enum handleState {
        已归档,
        已办结,
        已转督,
        转报批,
    }
	public enum TaskCreateMode{
		DeleteCurrTask,
		KeepCurrTask,
	}

    public enum TaskFlowMode {
        returnSender,
        returnPass,
        orgDef,
        exDef,
        noDef;
        private static Map<String, TaskFlowMode> taskFlowModeMap = new HashMap<>();

        static {
            for (TaskFlowMode taskFlowMode : TaskFlowMode.values()) {
                taskFlowModeMap.put(taskFlowMode.name(), taskFlowMode);
            }
        }

        public static TaskFlowMode getEnum(String eName) {
            TaskFlowMode taskFlowMode = taskFlowModeMap.get(eName);
            if (null == taskFlowMode) {
                taskFlowMode = noDef;
            }
            return taskFlowMode;
        }
    }

    public enum ParticipantType {
    	HoleDepartment,
        noDef,
        Person,
        Role,
        Post,
        Department,
        History,
        ByCaculat,
        TaskCreater;

        private static Map<String, ParticipantType> candidatesOrderMap = new HashMap<>();

        static {
            for (ParticipantType order : ParticipantType.values()) {
                candidatesOrderMap.put(order.name(), order);
            }
        }

        public static ParticipantType getEnum(String eName) {
            ParticipantType candidatesExpandType = candidatesOrderMap.get(eName);
            if (null == candidatesExpandType) {
                candidatesExpandType = noDef;
            }
            return candidatesExpandType;
        }

        static List<ParticipantType> participantTypesOrds = new LinkedList<ParticipantType>() {
            {	
            	add(HoleDepartment);
                add(ByCaculat);
                add(TaskCreater);
                add(History);
                add(Person);
                add(Role);
                add(Post);
                add(Department);
                
            }
        };

        public static List<ParticipantType> getOrds() {
            return participantTypesOrds;
        }

    }

    public enum ParticipantTypeName {
        部门,
        角色,
        岗位,
        群组,
        历史人员
    }

    public enum TaskInitType {
        single,
        multiple
    }

    public enum CandidateExpType {
        ConstantValue,
        DynamicExp
    }

    public enum CandidatesExpandType {
        noDef,
        all,
        sameParentDept,
        selfDept,
        secondPost,
        delCands,
        manageDepart;
        private static Map<String, CandidatesExpandType> candidatesExpandTypeMap = new HashMap<>();

        static {
            for (CandidatesExpandType expandType : CandidatesExpandType.values()) {
                candidatesExpandTypeMap.put(expandType.name(), expandType);
            }
        }

        public static CandidatesExpandType getEnum(String eName) {
            CandidatesExpandType candidatesExpandType = candidatesExpandTypeMap.get(eName);
            if (null == candidatesExpandType) {
                candidatesExpandType = noDef;
            }
            return candidatesExpandType;
        }
    }

    public enum CandidatesOrder {
        noDef,
        selfDept,
        sameParentDept,
        manageDept;
        private static Map<String, CandidatesOrder> candidatesOrderMap = new HashMap<>();

        static {
            for (CandidatesOrder order : CandidatesOrder.values()) {
                candidatesOrderMap.put(order.name(), order);
            }
        }

        public static CandidatesOrder getEnum(String eName) {
            CandidatesOrder candidatesExpandType = candidatesOrderMap.get(eName);
            if (null == candidatesExpandType) {
                candidatesExpandType = noDef;
            }
            return candidatesExpandType;
        }
    }


	/*public enum CandidateType{
		Person,
		Role,
		Post,
		Department
		
		All,//所有，没有过滤
		SingleDepart,//某个部门		
		ListOfDepart,//部门列表
		SinglePerson,//单个人员
		ListOfPeople,//人员列表		
		SingleRole,//单个角色
		ListOfRole,//角色列表
		SinglgePost,//单个岗位，
		ListOfPost,//岗位列表
		SingleGroup,//单个群组
		ListOfGroup,//群组列表
		HandledUsers//已处理过的用户列表
	}*/


    public enum ExecType {
        Sequence,//顺序执行，最后一个完成算结束
        ParallelOne,//所有并行，其中一个完成即结束
        ParallelAll,//所有并行，全部完成才算结束
        MasterAndSlave,//主办
    }
	
	/*public enum AssigneeType {
		Person,
		Role,
		Post,
		Department
		SinglePerson,
		ListOfPeople,
		SingleRole,
	}*/

    public enum TaskStatus {
        NotAccepted,//未接收；
        Accepted,//已接收
        Finished,//已办结
    }

    public enum TaskHisShowTag {
        Yes,//被标记的历史表记录将用于流程查看
        No,
	    Monitor,//系统管理员流程监控相关操作记录
    }

    public enum TaskHisShowStatus {
        办结,
        移交,//移交
        未收,
        办理,
        传阅,
        撤回,
	    监控办结,
    }

    public enum TaskType {
        NormalFlow,//正常工作量的任务；
        SecretResponse,//定密责任人的定密任务
        ForView,//传阅
        Withdraw,//撤回
        DocTransDuwenTask, /*督文 转换*/
	    JustFinish,//补一个仅能办结的任务
	    DuwenHandleAgain,//督文再办
	    ProcessMonitor,//流程监控专用
    }

    public enum ActionType {//操作类型：用于历史记录
        CreateInstance,
        HandleSecretResponse,
        FinishTask,
        SysAutoFinishTask,/*系统自动办结任务：如二次督办时流转给某领导，该领导所在节点已存在未办结任务,默认为该节点领导创建新任务，老任务由系统自动办结*/
        FinishInstance,
        NormalAction,
        ForView,//传阅
        Withdraw,//撤回任务
        blyjbpTrans,/*办理意见报批转换 因公出国政审报批 转换*/
        DocTransDuwen, /*督文 转换*/
    }

    public static String getActionTypeChinese(ActionType at) {
        String result = "";
        if (at == null)
            return "";
        switch (at) {
            case CreateInstance:
                result = "创建流程";
                break;
            case HandleSecretResponse:
                result = "定密";
                break;
            case FinishTask:
                result = "办结任务";
                break;
            case FinishInstance:
                result = "办结流程";
                break;
            case NormalAction:
                result = "流转";
                break;
            case Withdraw:
                result = "撤回";
                break;
            case DocTransDuwen:
                result = "转督文";
                break;
        }
        return result;
    }


    public enum WorkflowActions {
        Accept,//接收操作
    }

    public enum ProcessNodeName {
        ng("拟稿"),
        dl("发文登录"),
        wy("文印"),
        qz("签章"),
        swcl("收文处理"),
        swdl("收文登录");
        private String nodeName;

        ProcessNodeName(String nodeName) {
            this.nodeName = nodeName;
        }

        public String getNodeName() {
            return nodeName;
        }
    }

    public enum ProInstAllowRepeated {
        Repeated,//来文文号重复
        Allow,    //允许来文重复
    }

    public enum ProInstState {
        /**
         * 已删除数据
         */
        Useful,
        Delete,
    }

    public enum goodsStatus {
        /**
         * 商品状态
         */
        Warehousing,//已入库
        DirectStorage,//直接入库虚拟出来一个记录
        NotPurchased,//未入库
        Bought,//已购买入库
    }

    public enum ApplicationStatus {
        /**
         * 物品申领流转状态
         */
        Principaleview("待处长审核"),//待处长审核
        DirectorApproved("处长审核通过"),//处长审核通过
        Review("通过"),//复审通过
        PartiallyPassed("部分通过");//部分通过

        private String nodeName;

        ApplicationStatus(String nodeName) {
            this.nodeName = nodeName;
        }

        public String getNodeName() {
            return nodeName;
        }
    }

    public enum GoodsAGStatus {
        /**
         * 物品申领流转状态
         */
        Review("通过"),//办公室审核通过
        DistributionGoods("待分发"),//办公室办公室分发
        PendingConfirmation("待确认申领"),
        ConfirmedClaim("已经确认申领");//部分通过

        private String nodeName;

        GoodsAGStatus(String nodeName) {
            this.nodeName = nodeName;
        }

        public String getNodeName() {
            return nodeName;
        }
    }
}
