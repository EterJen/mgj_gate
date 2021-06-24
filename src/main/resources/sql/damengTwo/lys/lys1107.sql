insert into mpsmodule (id, pkcode, title, description, flag, iconfocus, parentid, ng_state, title_menu_show)
values (888880, '06010000', '会议室', '会议室管理', '1', 'meetingroomMng', '100000', 'coreHome.', '会议室');

insert into mpsmodule (id, pkcode, title, actionurl, targetframe, description, flag, parentid, ng_state, title_menu_show)
values (888881, '06010100', '会议室安排', '/coreHome/meetingroomArrange','meetingroomArrange', '会议室安排', '1', '888880', 'coreHome.meetingroomArrange','会议室安排');

insert into mpsmodule (id, pkcode, title, actionurl, targetframe, description, flag, parentid, ng_state, title_menu_show)
values (888882, '06010200', '会议申请', '/coreHome/meetingroomApply', 'meetingroomApply', '会议室申请', '1', '888880', 'coreHome.meetingroomApply', '会议申请');

insert into mpsmodule (id, pkcode, title, actionurl, targetframe, description, flag, parentid, ng_state, title_menu_show)
values (888883, '06010300', '会议室管理', '/coreHome/meetingroomManage', 'meetingroomManage', '会议室管理', '1', '888880', 'coreHome.meetingroomManage', '会议室管理');

insert into mpsmodule (id, pkcode, title, actionurl, targetframe, description, flag, parentid, ng_state, title_menu_show)
values (888884, '06010400', '会议审批', '/coreHome/meetingroomAudit', 'meetingroomAudit', '会议审批', '0', '888880', 'coreHome.meetingroomAudit', '会议审批');

insert into mpsmodule (id, pkcode, title, actionurl, targetframe, description, flag, parentid, ng_state, title_menu_show)
values (888885, '06010500', '会议查询', '/coreHome/meetingroomQuery', 'meetingroomQuery', '会议查询', '1', '888880', 'coreHome.meetingroomQuery', '会议查询');


create table "WF_MEETINGROOM_INFO"(
  id number not null primary key ,
  flag varchar2(256) not null default '1',
  seq number ,
  creator_id number not null default '',
  creator_name varchar2(256) not null default '',
  create_time datetime,
  last_updated_time datetime,
  meetingroom_id varchar2(256) default '',
  meetingroom_name varchar2(256) default '',
  meetingroom_address varchar2(256) default '',
  meetingroom_capacity number default 0 ,
  meetingroom_device varchar2(2048) default '',
  meetingroom_remark varchar2(2048) default ''
);
comment on table WF_MEETINGROOM_INFO is '会议室信息表';
comment on column WF_MEETINGROOM_INFO.ID is '主键';
comment on column WF_MEETINGROOM_INFO.FLAG is '标志位';
comment on column WF_MEETINGROOM_INFO.SEQ is '排序';
comment on column WF_MEETINGROOM_INFO.CREATOR_ID is '创建人ID';
comment on column WF_MEETINGROOM_INFO.CREATOR_NAME is '创建人姓名';
comment on column WF_MEETINGROOM_INFO.CREATE_TIME is '创建时间';
comment on column WF_MEETINGROOM_INFO.LAST_UPDATED_TIME is '最新更新时间';
comment on column WF_MEETINGROOM_INFO.MEETINGROOM_ID is '会议室ID';
comment on column WF_MEETINGROOM_INFO.MEETINGROOM_NAME is '会议室名称';
comment on column WF_MEETINGROOM_INFO.MEETINGROOM_ADDRESS is '会议室地点';
comment on column WF_MEETINGROOM_INFO.MEETINGROOM_CAPACITY is '会议室容量';
comment on column WF_MEETINGROOM_INFO.MEETINGROOM_DEVICE is '会议室设备';
comment on column WF_MEETINGROOM_INFO.MEETINGROOM_REMARK is '会议室备注';
