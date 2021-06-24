insert into MPSMODULE (ID, PKCODE, TITLE, ACTIONURL, TARGETFRAME, DESCRIPTION, FLAG, PARENTID, NG_STATE, TITLE_MENU_SHOW)
values (999990, '01020400','领导工作安排','/coreHome/leaderWorkArrange','leaderWorkArrange','领导工作安排','1',100015,'coreHome.leaderWorkArrange','领导工作安排');

-- 领导工作安排表
create table wf_leaderwork_arrange(
  ID number not null primary key ,
  PKID number ,
  USERID number ,
  USERCNAME varchar2(256) ,
  DEPTID number ,
  DEPTCNAME varchar2(256) ,
  WEEKSTART datetime ,
  STARTDAY datetime ,
  ENDDAY datetime ,
  STARTTIME datetime ,
  ENDTIME datetime ,
  TITLE varchar2(4096) ,
  ADDRESS varchar2(1024) ,
  BRIEF varchar2(2048) ,
  SUBACTION number ,
  PARENTACTIONID number ,
  OPERATOR number ,
  MODIFYTIME datetime ,
  REMOVED number ,
  SOURCEID number ,
  SOURCETEXT varchar2(2048)
);

comment on table wf_leaderwork_arrange is '领导工作安排表';
comment on column wf_leaderwork_arrange.id is '主键';
comment on column wf_leaderwork_arrange.pkid is '迁移表主键';
comment on column wf_leaderwork_arrange.userid is '用户ID';
comment on column wf_leaderwork_arrange.usercname is '用户姓名';
comment on column wf_leaderwork_arrange.deptid is '部门ID';
comment on column wf_leaderwork_arrange.deptcname is '部门名称';
comment on column wf_leaderwork_arrange.weekstart is '活动起始周的周一日期';
comment on column wf_leaderwork_arrange.startday is '活动起始日期';
comment on column wf_leaderwork_arrange.endday is '活动结束日期';
comment on column wf_leaderwork_arrange.starttime is '活动起始时间';
comment on column wf_leaderwork_arrange.endtime is '活动结束时间';
comment on column wf_leaderwork_arrange.title is '活动标题';
comment on column wf_leaderwork_arrange.address is '活动地址';
comment on column wf_leaderwork_arrange.brief is '活动简介';
comment on column wf_leaderwork_arrange.subaction is '子活动标记';
comment on column wf_leaderwork_arrange.parentactionid is '父活动标记';
comment on column wf_leaderwork_arrange.operator is '操作人ID';
comment on column wf_leaderwork_arrange.modifytime is '修改日期';
comment on column wf_leaderwork_arrange.removed is '删除标记';
comment on column wf_leaderwork_arrange.sourceid is '外部来源ID';
comment on column wf_leaderwork_arrange.sourcetext is '外部来源描述';

-- 领导工作安排代理人表
create table wf_leaderwork_agent(
  leader_id number not null ,
  agent_id number not null
);

comment on table wf_leaderwork_agent is '领导工作安排代理人表';
comment on column wf_leaderwork_agent.leader_id is '领导ID';
comment on column wf_leaderwork_agent.agent_id is '代理人ID';
CREATE or replace  unique index uidx_leaderworkagent_lid_aid on wf_leaderwork_agent (leader_id, agent_id);


insert into WF_FORM_ACTION (ID, ACTION_ID, NAME, DESCRIPTION, PRE_CONDITION, ACTION_TO_PERFORM, IMAGE_URL, ORDER_NUM, FLAG, ACTION_TYPE)
values (888888, 'informMeeting', '知会', '任务:会议知会', '$scope.task.readMode==''task''&& $scope.fc.wpsDetail.middleContentType==''form''&& $scope.task.status==''Accepted'' && $scope.task.taskType!=''SecretResponse''',
'$scope.informMeeting()','images/sidebar_right-bc.svg',999,'1','currentTaskDeal');