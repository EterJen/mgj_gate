create table wf_form_jxwhuiyi(
  id number not null primary key ,
  flag varchar2(16) not null default '1',
  creator_id number default '',
  creator_name varchar2(256) default '',
  create_time datetime ,
  last_updated_time datetime ,
  meeting_name varchar2(2048) default '',
  meeting_start_time datetime not null ,
  meeting_end_time datetime not null ,
  meeting_period varchar2(32) ,
  meeting_status varchar2(64),
  meeting_room_id number ,
  meeting_room_name varchar2(256) default '',
  meeting_attend_obj varchar2(2048),
  meeting_attend_obj_id varchar2(2048),
  meeting_attend_obj_name varchar2(2048),
  meeting_attend_leader varchar2(2048),
  meeting_attend_leader_id varchar2(2048),
  meeting_attend_leader_name varchar2(2048),
  meeting_content varchar2(4096) default '',
  meeting_summary varchar2(4096) default '',
  meeting_opinions varchar2(4096) default '',
  meeting_apply_person varchar2(64),
  meeting_apply_person_id number ,
  meeting_apply_dept varchar2(512),
  meeting_audit_person varchar2(1024),
  pro_inst_id number ,
  current_task_id number
);

comment on table wf_form_jxwhuiyi is '会议申请表';
comment on column wf_form_jxwhuiyi.id is '主键';
comment on column wf_form_jxwhuiyi.flag is '标志位';
comment on column wf_form_jxwhuiyi.creator_id is '会议创建人ID';
comment on column wf_form_jxwhuiyi.creator_name is '会议创建人姓名';
comment on column wf_form_jxwhuiyi.create_time is '会议创建时间';
comment on column wf_form_jxwhuiyi.last_updated_time is '最新更新时间';
comment on column wf_form_jxwhuiyi.meeting_name is '会议名称';
comment on column wf_form_jxwhuiyi.meeting_start_time is '会议开始时间';
comment on column wf_form_jxwhuiyi.meeting_end_time is '会议结束时间';
comment on column wf_form_jxwhuiyi.meeting_status is '会议状态';
comment on column WF_FORM_JXWHUIYI.meeting_period is '会议上下午,AM,PM';
comment on column wf_form_jxwhuiyi.meeting_room_id is '会议室信息主键';
comment on column wf_form_jxwhuiyi.meeting_room_name is '会议室名称';
comment on column wf_form_jxwhuiyi.meeting_attend_obj is '会议出席对象json';
comment on column wf_form_jxwhuiyi.meeting_attend_obj_id is '会议出席对象id';
comment on column wf_form_jxwhuiyi.meeting_attend_obj_name is '会议出席对象姓名';
comment on column wf_form_jxwhuiyi.meeting_attend_leader is '会议出席领导json';
comment on column wf_form_jxwhuiyi.meeting_attend_leader_id is '会议出席领导id';
comment on column wf_form_jxwhuiyi.meeting_attend_leader_name is '会议出席领导姓名';
comment on column wf_form_jxwhuiyi.meeting_content is '会议内容';
comment on column wf_form_jxwhuiyi.meeting_summary is '会议纪要';
comment on column wf_form_jxwhuiyi.meeting_opinions is '意见汇总';
comment on column wf_form_jxwhuiyi.meeting_apply_person is '申请人';
comment on column wf_form_jxwhuiyi.meeting_apply_person_id is '申请人ID';
comment on column wf_form_jxwhuiyi.meeting_apply_dept is '申请部门';
comment on column wf_form_jxwhuiyi.meeting_audit_person is '审批人';
comment on column WF_FORM_JXWHUIYI.pro_inst_id is '流程实例ID';
comment on column WF_FORM_JXWHUIYI.current_task_id is '当前任务ID';

CREATE or replace INDEX idx_meeting_starttime ON wf_form_jxwhuiyi (meeting_start_time);
CREATE or replace INDEX idx_meeting_endtime ON wf_form_jxwhuiyi (meeting_end_time);