--督查管理
update MPSMODULE set TARGETFRAME = null, FLAG = 1, ICONFOCUS = 'supervisorMng', NG_STATE = 'coreHome.' where ID = 100054;
update MPSMODULE set ACTIONURL = '/coreHome/governor', TARGETFRAME = 'governor', FLAG = 1, NG_STATE = 'coreHome.governor' where ID = 100058;


alter table wf_process_instance add city_approval varchar2(1000);
alter table wf_process_instance add duwen_handle_again_num number ;

comment on column wf_process_instance.city_approval is '市领导批示';
comment on column wf_process_instance.duwen_handle_again_num is '督文再次办文次数';

--更新督文流程的意见展示配置
update wf_process_def_manage set option_show_conf = '{"wldps": ["3","4"],"dbyj": ["1","2"],"csyj": ["5","6"]}' where form_def_id = 'jxwduwen';

--日程安排管理
update MPSMODULE set ACTIONURL = '/coreHome/scheduleMng', TARGETFRAME = 'scheduleMng', FLAG = 1, NG_STATE = 'coreHome.scheduleMng' where ID = 100332;

--领导工作安排查看模式
create table WF_LEADERWORK_VIEW_MODE(
  id number not null primary key ,
  flag varchar2(4) not null default '1',
  creator_id number not null default '',
  creator_name varchar2(256) not null default '',
  create_time datetime,
  last_updated_time datetime,
  mode_name varchar2(1024) not null ,
  mode_view varchar2(4096) not null ,
  mode_type varchar2(4) ,
  mode_desc varchar2(2048)
);

comment on table WF_LEADERWORK_VIEW_MODE is '领导工作安排查看模式';
comment on column WF_LEADERWORK_VIEW_MODE.id is '主键';
comment on column WF_LEADERWORK_VIEW_MODE.flag is '标志位,1有效、0无效';
comment on column WF_LEADERWORK_VIEW_MODE.creator_id is '创建人ID';
comment on column WF_LEADERWORK_VIEW_MODE.creator_name is '创建人姓名';
comment on column WF_LEADERWORK_VIEW_MODE.create_time is '创建时间';
comment on column WF_LEADERWORK_VIEW_MODE.last_updated_time is '最新更新时间';
comment on column WF_LEADERWORK_VIEW_MODE.mode_name is '模式名称';
comment on column WF_LEADERWORK_VIEW_MODE.mode_view is '可查看安排的领导信息';
comment on column WF_LEADERWORK_VIEW_MODE.mode_type is '模式分类';
comment on column WF_LEADERWORK_VIEW_MODE.mode_desc is '模式描述';


create table WF_LEADERWORK_USER_MODE(
  user_id number not null ,
  mode_id number not null
);

comment on table WF_LEADERWORK_USER_MODE is '领导工作安排模式-用户关系表';
comment on column WF_LEADERWORK_USER_MODE.user_id is '用户ID';
comment on column WF_LEADERWORK_USER_MODE.mode_id is '模式ID';

CREATE or replace unique index uidx_lw_uid_mid on WF_LEADERWORK_USER_MODE(user_id, mode_id);

--修改用户表密码字段长度
alter table ORGUSER modify password varchar2(128);
--更新用户初始密码1为SHA256散列值
update ORGUSER set PASSWORD = '6B86B273FF34FCE19D6B804EFF5A3F5747ADA4EAA22F1D49C01E52DDB7875B4B'
where FLAG = 1;