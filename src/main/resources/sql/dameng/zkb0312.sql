drop table WF_OPINION;
drop table WF_SECRETCONFIRM;




/*审核意见*/
CREATE TABLE WF_OPINION (
  ID NUMBER, --	主键
  TASK_ID NUMBER, --wf_process_instance id 流程实例 id
  STEP_ID NUMBER, --wf_history_task_info id 流程历史阶段 id
  FLOW_ID NUMBER, --wf_process_def_manage  id  流程定义 id
  APPROVER_ID  NUMBER, --审核人id
  APPROVER_NAME varchar2(50), --审核人姓名
  APPROVE_TIME DATE , --审核时间
  DEPT_ID NUMBER , --用户部门id
  OPINION varchar2(255) , --意见描述
  PRIMARY KEY (ID)
);
COMMENT ON TABLE WF_OPINION IS '审核意见表';
COMMENT ON COLUMN WF_OPINION."ID" IS '主键';
COMMENT ON COLUMN WF_OPINION."TASK_ID" IS 'wf_process_instance id 流程实例 id 冗余';
COMMENT ON COLUMN WF_OPINION."STEP_ID" IS 'wf_history_task_info id 流程历史阶段 id';
COMMENT ON COLUMN WF_OPINION."FLOW_ID" IS 'wf_process_def_manage  id  流程定义 id 冗余';
COMMENT ON COLUMN WF_OPINION."APPROVER_ID" IS '审核人id';
COMMENT ON COLUMN WF_OPINION."APPROVER_NAME" IS '审核人姓名';
COMMENT ON COLUMN WF_OPINION."APPROVE_TIME" IS '审核时间';
COMMENT ON COLUMN WF_OPINION."DEPT_ID" IS '用户部门id';
COMMENT ON COLUMN WF_OPINION."OPINION" IS '意见描述';

/*定密单*/
CREATE TABLE WF_SECRETCONFIRM(
  ID NUMBER, --	主键
  FLOW_ID NUMBER, --下一阶段  人员选择
  PROCESS_ID NUMBER, --流程实例id wf_process_instance 冗余 
  DEPT_ID NUMBER, --  部门id
  DEPT_NAME varchar2(50), --部门名 冗余
  DRAFT_DATE DATE , --填表日期
  TITLE varchar2(512), -- 事项名称
  SECRET_LEVEL varchar2(50), -- 密级
  SECRET_LENGTH DATE, --保密期限
  SECRET_RANGE varchar2(50), -- 知悉范围
  RESON  varchar2(1024), --定密依据 
  SUPERVISOR   varchar2(1024), --处长意见 
  AUTHORIZOR   varchar2(1024), --定密责任人意见 
  FLAG NUMBER, --	有效性
  PRIMARY KEY (ID)
);
COMMENT ON TABLE WF_SECRETCONFIRM IS '定密单表';
COMMENT ON COLUMN WF_SECRETCONFIRM."ID" IS '主键';
COMMENT ON COLUMN WF_SECRETCONFIRM."FLOW_ID" IS 'wf_process_def_manage  id  流程定义 id 冗余';
COMMENT ON COLUMN WF_SECRETCONFIRM."PROCESS_ID" IS 'wf_process_instance id 流程实例 id ';
COMMENT ON COLUMN WF_SECRETCONFIRM."DEPT_ID" IS '部门id';
COMMENT ON COLUMN WF_SECRETCONFIRM."DEPT_NAME" IS '部门名 冗余';
COMMENT ON COLUMN WF_SECRETCONFIRM."DRAFT_DATE" IS '填表日期';
COMMENT ON COLUMN WF_SECRETCONFIRM."TITLE" IS '事项名称';
COMMENT ON COLUMN WF_SECRETCONFIRM."SECRET_LEVEL" IS '密级';
COMMENT ON COLUMN WF_SECRETCONFIRM."SECRET_LENGTH" IS '保密期限';
COMMENT ON COLUMN WF_SECRETCONFIRM."SECRET_RANGE" IS '知悉范围';
COMMENT ON COLUMN WF_SECRETCONFIRM."RESON" IS '定密依据';
COMMENT ON COLUMN WF_SECRETCONFIRM."SUPERVISOR" IS '处长意见';
COMMENT ON COLUMN WF_SECRETCONFIRM."AUTHORIZOR" IS '定密责任人意见';
COMMENT ON COLUMN WF_SECRETCONFIRM."FLAG" IS '有效性';

COMMIT ;

