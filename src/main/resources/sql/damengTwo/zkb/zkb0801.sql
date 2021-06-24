ALTER TABLE wf_history_task_info add (dealer_name varchar2(50));
ALTER TABLE wf_history_task_info add (dealer_id varchar2(50));
ALTER TABLE wf_history_task_info add (agent_flag varchar2(15));
comment on column "wf_history_task_info"."dealer_name" is '经办人名字';
comment on column "wf_history_task_info"."dealer_id" is '经办人名字id';
comment on column "wf_history_task_info"."agent_flag" is '是否代理标记 0/1';

ALTER TABLE wf_current_task_info add (dealer_name varchar2(50));
ALTER TABLE wf_current_task_info add (dealer_id varchar2(50));
ALTER TABLE wf_current_task_info add (agent_flag varchar2(15));
ALTER TABLE wf_current_task_info add (pro_inst_flag varchar2(15));
ALTER TABLE wf_current_task_info add (assignee_name varchar2(15));
comment on column "wf_current_task_info"."dealer_name" is '经办人名字';
comment on column "wf_current_task_info"."dealer_id" is '经办人名字id';
comment on column "wf_current_task_info"."agent_flag" is '是否代理标记 0/1';
comment on column "wf_current_task_info"."pro_inst_flag" is '所属流程实例是否有效标记';
comment on column "wf_current_task_info"."assignee_name" is '审批领导名字';

ALTER TABLE wf_opinion add (dealer_name varchar2(50));
ALTER TABLE wf_opinion add (dealer_id varchar2(50));
ALTER TABLE wf_opinion add (assignee_name varchar2(50));
ALTER TABLE wf_opinion add (agent_flag varchar2(15));
comment on column "wf_opinion"."dealer_name" is '经办人名字';
comment on column "wf_opinion"."dealer_id" is '经办人名字id';
comment on column "wf_opinion"."assignee_name" is '审批领导名字';
comment on column "wf_opinion"."agent_flag" is '是否代理标记 0/1';

UPDATE wf_current_task_info set pro_inst_flag = '1' WHERE exists(SELECT 1 FROM wf_process_instance p WHERE pro_inst_id = p.id AND p.state IS NULL )
UPDATE wf_current_task_info set agent_flag = '0';
UPDATE wf_history_task_info SET  agent_flag = '0';
UPDATE wf_history_task_info SET  agent_flag = '1' WHERE dealer_name is NULL and dealer_name != operator_name;

CREATE or replace  unique index uidx_orgua_uid_aid on orgua (user_id, agent_id);
CREATE or replace INDEX wcti_idx_com  ON wf_current_task_info (pro_inst_flag,assignee_type,assignee,agent_flag);
UPDATE mpsmodule set ng_state ='coreHome.overallAgentMng',flag = 1 WHERE actionurl = '../Manage/AgentM.aspx';
insert into MPSAVAILMODULE (ELEMENTID,ELEMENTTYPE,FLAG,modulecode,mpsmodule_id)(select 3002,'R','1',id ,id from MPSMODULE where actionurl = '../Manage/AgentM.aspx');

