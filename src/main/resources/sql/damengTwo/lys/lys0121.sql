--领导工作安排更名为两委领导安排
update MPSMODULE set TITLE = '两委领导安排', TITLE_MENU_SHOW = '两委领导安排' where ID = 999990;
--行政领导安排
update MPSMODULE set ACTIONURL = '/coreHome/executiveLeaderArrange', FLAG = 1, PARENTID = 100015, NG_STATE = 'coreHome.executiveLeaderArrange' where ID = 100034;
--党委领导安排
update MPSMODULE set ACTIONURL = '/coreHome/partyLeaderArrange', FLAG = 1, PARENTID = 100015, NG_STATE = 'coreHome.partyLeaderArrange' where ID = 100035;

----------------------20190122-----------------------------
--会议管理
update MPSMODULE set ACTIONURL = '/coreHome/meetingMng', FLAG = 1, NG_STATE = 'coreHome.meetingMng' where ID =  100026;

create table wf_form_meeting(
  id number not null primary key ,
  flag varchar2(8) not null ,
  creator_id number ,
  creator_name varchar2(64) ,
  create_time datetime ,
  last_updated_time datetime ,
  form_def_id varchar2(32) ,
  meeting_number varchar2(128) not null ,
  receive_date datetime ,
  issue_unit varchar2(128) not null ,
  meeting_status varchar2(32) ,
  meeting_time datetime ,
  meeting_weekday varchar2(32) ,
  meeting_address varchar2(256) ,
  meeting_attend varchar2(256) ,
  meeting_content varchar2(2048) ,
  meeting_register_person varchar2(64) ,
  meeting_register_date datetime,
  current_dealer varchar2(64),
  current_node_id number
);

comment on table wf_form_meeting is '会议管理表';
comment on column wf_form_meeting.id is '主键';
comment on column wf_form_meeting.flag is '有效标志位';
comment on column wf_form_meeting.creator_id is '创建人ID';
comment on column wf_form_meeting.creator_name is '创建人姓名';
comment on column wf_form_meeting.create_time is '创建时间';
comment on column wf_form_meeting.last_updated_time is '最新更新时间';
comment on column wf_form_meeting.form_def_id is '个性表单简称';
comment on column wf_form_meeting.meeting_number is '会议编号';
comment on column wf_form_meeting.receive_date is '收到日期';
comment on column wf_form_meeting.issue_unit is '发出单位';
comment on column wf_form_meeting.meeting_status is '会议状态';
comment on column wf_form_meeting.meeting_time is '会议时间';
comment on column wf_form_meeting.meeting_weekday is '会议时间对应星期几';
comment on column wf_form_meeting.meeting_address is '会议地点';
comment on column wf_form_meeting.meeting_attend is '出席对象';
comment on column wf_form_meeting.meeting_content is '会议内容';
comment on column wf_form_meeting.meeting_register_person is '登录人';
comment on column wf_form_meeting.meeting_register_date is '登录时间';
comment on column wf_form_meeting.current_dealer is '当前处理人';
comment on column wf_form_meeting.current_node_id is '当前节点ID';
