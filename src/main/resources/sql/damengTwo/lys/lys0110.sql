INSERT INTO PROCESS_DEF_GROUP (ID, FORM_EN_NAME, FORM_ZH_NAME, DESCRIPTION, FLAG, ORDER_NUM)
VALUES (7, 'leave', '请假管理', null, '1', 7);

INSERT INTO PROCESS_DEF_GROUP (ID, FORM_EN_NAME, FORM_ZH_NAME, DESCRIPTION, FLAG, ORDER_NUM)
VALUES (8, 'personnel', '人事管理', null, '1', 8);

INSERT INTO WF_PROCESS_FORM (ID, FORM_EN_NAME, FORM_ZH_NAME, DESCRIPTION, BELONG_GROUP, FLAG, ORDER_NUM)
VALUES (16, 'jxwleave', '请假报批', '请假管理', 'leave', '1', null);

INSERT INTO WF_PROCESS_FORM (ID, FORM_EN_NAME, FORM_ZH_NAME, DESCRIPTION, BELONG_GROUP, FLAG, ORDER_NUM)
VALUES (17, 'jxwpersonnel', '临时借聘报备表', '人事管理-临时借聘报备表', 'personnel', '1', null);

INSERT INTO WF_PROCESS_DEF_MANAGE (ID, NAME, DESCRIPTION, ORDER_NUM, FORM_DEF_ID, PRO_DEF_GROUP_ID, FLAG, PUBLISH_OFFICE, PUBLISH_SYMBOL, UNIFIED_SOCIAL_CREDIT_CODE, DOC_OID, SEND_DEPART_CODE, SERIAL_NUMBER, PUBLISH_OFFICE_BRIF, ISSUE_PERSON, ISSUE_PERSON_POST, OPTION_SHOW_CONF)
VALUES (888890, '请假审批', '处级干部和一般人员请假', 16, 'jxwleave', 'leave', '1', null, null, null, null, null, null, null, null, null, '{"cld": ["2"],"fgld": ["3","6"],"zyld": ["5"],"rjcsh": ["4","7"],"dbba": ["8"]}');

INSERT INTO WF_PROCESS_DEF_MANAGE (ID, NAME, DESCRIPTION, ORDER_NUM, FORM_DEF_ID, PRO_DEF_GROUP_ID, FLAG, PUBLISH_OFFICE, PUBLISH_SYMBOL, UNIFIED_SOCIAL_CREDIT_CODE, DOC_OID, SEND_DEPART_CODE, SERIAL_NUMBER, PUBLISH_OFFICE_BRIF, ISSUE_PERSON, ISSUE_PERSON_POST, OPTION_SHOW_CONF)
VALUES (888891, '委领导请假', '两委领导请假', 17, 'jxwleave', 'leave', '1', null, null, null, null, null, null, null, null, null, '{"zyld": ["2"],"rjcsh": ["3"],"dbba": ["8"]}');

INSERT INTO WF_PROCESS_DEF_MANAGE (ID, NAME, DESCRIPTION, ORDER_NUM, FORM_DEF_ID, PRO_DEF_GROUP_ID, FLAG, PUBLISH_OFFICE, PUBLISH_SYMBOL, UNIFIED_SOCIAL_CREDIT_CODE, DOC_OID, SEND_DEPART_CODE, SERIAL_NUMBER, PUBLISH_OFFICE_BRIF, ISSUE_PERSON, ISSUE_PERSON_POST, OPTION_SHOW_CONF)
VALUES (888892, '借聘用报备', '人事管理-临时借聘报备表', 17, 'jxwpersonnel', 'personnel', '1', null, null, null, null, null, null, null, null, null, '{"yrcs": ["2"],"gbc": ["8"],"rsjyc": ["5","13"],"dbxb": ["11"],"yrcld": ["3"],"gbcld": ["9"],"rsjycld": ["14"],"dbxbld": ["12"],"zyld": ["6"]}');


INSERT INTO WF_PROCESS_DEF_VERSION (ID, PROCESS_DEF_ID, VERSION, FILE_NAME, FILE_PATH, IS_ACTIVE, DESCRIPTION)
VALUES (110127, 888890, 1, '8442d5a1-b72f-44ad-941a-c94e39f36de7', '8442d5a1-b72f-44ad-941a-c94e39f36de7', '1', '请假审批');

INSERT INTO WF_PROCESS_DEF_VERSION (ID, PROCESS_DEF_ID, VERSION, FILE_NAME, FILE_PATH, IS_ACTIVE, DESCRIPTION)
VALUES (222228, 888891, 1, '6b9f0807-85f1-40ff-aa9b-0c244c41508b', '6b9f0807-85f1-40ff-aa9b-0c244c41508b.xml', '1', '委领导请假');

INSERT INTO WF_PROCESS_DEF_VERSION (ID, PROCESS_DEF_ID, VERSION, FILE_NAME, FILE_PATH, IS_ACTIVE, DESCRIPTION)
VALUES (110128, 888892, 1, '6f3e20f6-8eca-4c31-85c8-dda2a3ba7ede', '6f3e20f6-8eca-4c31-85c8-dda2a3ba7ede.xml', '0', '临时借聘报备流程');

INSERT INTO WF_PROCESS_DEF_VERSION (ID, PROCESS_DEF_ID, VERSION, FILE_NAME, FILE_PATH, IS_ACTIVE, DESCRIPTION)
VALUES (222225, 888892, 1, '7e50c7a9-4392-4cbf-9d3b-6c152357807e', '7e50c7a9-4392-4cbf-9d3b-6c152357807e.xml', '1', '临时借聘报备修改版本');



update MPSMODULE set FLAG = 1 where TITLE = '事务';
update MPSMODULE set FLAG = 1, ICONFOCUS = 'personnelMng' where TITLE = '人事管理';
update MPSMODULE set FLAG = 1, PARENTID = 100117, ACTIONURL = '/coreHome/leaveApproval', NG_STATE = 'coreHome.leaveApproval' where ID = 100118;
update MPSMODULE set FLAG = 1, PARENTID = 100117, ACTIONURL = '/coreHome/leaveQuery', NG_STATE = 'coreHome.leaveQuery' where ID = 100119;
update MPSMODULE set FLAG = 1, PARENTID = 100117, ACTIONURL = '/coreHome/wageQuery', NG_STATE = 'coreHome.wageQuery' where ID = 100120;
update MPSMODULE set FLAG = 1, PARENTID = 100117, ACTIONURL = '/coreHome/hireMng', NG_STATE = 'coreHome.hireMng' where ID = 100121;

--请假报批
create table wf_form_jxwleave(
  id number not null primary key ,
  flag varchar2(16) not null default '1',
  creator_id number default '',
  creator_name varchar2(256) default '',
  create_time datetime ,
  last_updated_time datetime ,
  approved_num varchar2(128) default '',
  leave_apply_person varchar2(64) not null ,
  leave_apply_dept varchar2(256) not null ,
  leave_type varchar2(32) ,
  leave_cause varchar2(2048),
  leave_start_date datetime not null ,
  leave_end_date datetime not null ,
  leave_days number ,
  dept_leader_opinion varchar2(2048) ,
  incharge_leader_opinion varchar2(2048) ,
  main_leader_opinion varchar2(2048) ,
  personal_signature varchar2(1024) ,
  leave_apply_date datetime not null ,
  personnel_review varchar2(2048) ,
  office_recode varchar2(2048),
  terminate_leave_desc varchar2(2048)
);

comment on table wf_form_jxwleave is '请假管理表';
comment on column wf_form_jxwleave.id is '主键';
comment on column wf_form_jxwleave.flag is '标志位';
comment on column wf_form_jxwleave.creator_id is '创建人ID';
comment on column wf_form_jxwleave.creator_name is '创建人姓名';
comment on column wf_form_jxwleave.create_time is '创建时间';
comment on column wf_form_jxwleave.last_updated_time is '最新更新时间';
comment on column wf_form_jxwleave.approved_num is '报批号';
comment on column wf_form_jxwleave.leave_apply_person is '请假申请人，对应表单姓名';
comment on column wf_form_jxwleave.leave_apply_dept is '申请人部门，对应表单处室';
comment on column wf_form_jxwleave.leave_type is '休假类别';
comment on column wf_form_jxwleave.leave_cause is '请假事由';
comment on column wf_form_jxwleave.leave_start_date is '休假开始日期';
comment on column wf_form_jxwleave.leave_end_date is '休假结束日期';
comment on column wf_form_jxwleave.leave_days is '休假天数';
comment on column wf_form_jxwleave.dept_leader_opinion is '处领导意见';
comment on column wf_form_jxwleave.incharge_leader_opinion is '分管领导意见';
comment on column wf_form_jxwleave.main_leader_opinion is '主要领导意见';
comment on column wf_form_jxwleave.personal_signature is '本人签名';
comment on column wf_form_jxwleave.leave_apply_date is '申请日期';
comment on column wf_form_jxwleave.personnel_review is '人教处审核、备案';
comment on column wf_form_jxwleave.office_recode is '党办或行办备案';
comment on column wf_form_jxwleave.terminate_leave_desc is '销假说明';


--临时借聘用报备
create table wf_form_jxwpersonnel(
  id number not null primary key ,
  flag varchar2(8) not null default '1',
  creator_id number default '',
  creator_name varchar2(256) default '',
  create_time datetime ,
  last_updated_time datetime ,
  approved_num varchar2(128) default '',
  temporary_hire_dept varchar2(256) ,
  vacant_post_name varchar2(256) ,
  post_responsibilities varchar2(4096) ,
  post_qualification varchar2(4096) ,
  secret_post varchar2(8) ,
  temporary_post varchar2(8) ,
  temporary_hire_start_date datetime ,
  temporary_hire_end_date datetime ,
  temporary_hire_type varchar2(32) ,
  hire_person_name varchar2(64) ,
  hire_person_gender varchar2(8) ,
  hire_person_birth varchar2(64),
  hire_person_education varchar2(128) ,
  hire_person_profession varchar2(256) ,
  hire_person_deptname varchar2(256) ,
  hire_person_position varchar2(128) ,
  retire_identity varchar2(16) ,
  departmental_cadre varchar2(8)
);

comment on table wf_form_jxwpersonnel is '临时借聘报备表';
comment on column wf_form_jxwpersonnel.id is '主键';
comment on column wf_form_jxwpersonnel.flag is '有效标志位';
comment on column wf_form_jxwpersonnel.creator_id is '创建人ID';
comment on column wf_form_jxwpersonnel.creator_name is '创建人姓名';
comment on column wf_form_jxwpersonnel.create_time is '创建时间';
comment on column wf_form_jxwpersonnel.last_updated_time is '最新更新时间';
comment on column wf_form_jxwpersonnel.approved_num is '报批号';
comment on column wf_form_jxwpersonnel.temporary_hire_dept is '临时借用用人处室';
comment on column wf_form_jxwpersonnel.vacant_post_name is '空缺岗位名称';
comment on column wf_form_jxwpersonnel.post_responsibilities is '岗位职责';
comment on column wf_form_jxwpersonnel.post_qualification is '岗位所需资格条件';
comment on column wf_form_jxwpersonnel.secret_post is '是否涉密岗位';
comment on column wf_form_jxwpersonnel.temporary_post is '是否属于临时性岗位';
comment on column wf_form_jxwpersonnel.temporary_hire_start_date is '临时借用开始日期';
comment on column wf_form_jxwpersonnel.temporary_hire_end_date is '临时借用结束日期';
comment on column wf_form_jxwpersonnel.temporary_hire_type is '临时借用类型';
comment on column wf_form_jxwpersonnel.hire_person_name is '借用人员姓名';
comment on column wf_form_jxwpersonnel.hire_person_gender is '借用人员性别';
comment on column wf_form_jxwpersonnel.hire_person_birth is '借用人员出生日期';
comment on column wf_form_jxwpersonnel.hire_person_education is '借用人员学历';
comment on column wf_form_jxwpersonnel.hire_person_profession is '借用人员专业';
comment on column wf_form_jxwpersonnel.hire_person_deptname is '借用人员单位名称';
comment on column wf_form_jxwpersonnel.hire_person_position is '借用人员职务';
comment on column wf_form_jxwpersonnel.retire_identity is '借用人员退休前身份';
comment on column wf_form_jxwpersonnel.departmental_cadre is '借用人员是否处级干部';



alter table WF_FORM_JXWLEAVE add departure varchar2(16) null ;
comment on column wf_form_jxwleave.departure is '是否出境';

alter table WF_FORM_JXWPERSONNEL add engage_type varchar2(32) null ;
comment on column wf_form_jxwpersonnel.engage_type is '聘用类型';

--开启流程监控菜单
update MPSMODULE set ACTIONURL = '/coreHome/processMonitor' , TARGETFRAME = 'processMonitor',
FLAG = 1, NG_STATE = 'coreHome.processMonitor' where ID = 100344;


alter table WF_HISTORY_TASK_INFO add from_task_id number ;
comment on column wf_history_task_info.from_task_id is '流转时源待办任务的ID';

--流程监控菜单单独开给王玮
insert into MPSAVAILMODULE (ELEMENTID, ELEMENTTYPE, MODULECODE, FLAG, MPSMODULE_ID)
values (195, 'U', 9999999, '1', 100344);

--流程表单转督办按钮
insert into WF_FORM_ACTION (ID, ACTION_ID, NAME, DESCRIPTION, PRE_CONDITION, ACTION_TO_PERFORM, IMAGE_URL, ORDER_NUM, FLAG, ACTION_TYPE)
(select JXWOAUniversalSeq.nextval, 'transmitInfo', '转督办', '流程：转重点督办',
'$scope.fc.wpsDetail.middleContentType==''form''&&$scope.task.status==''Accepted''&&$scope.task.theCommonFormInfo.belongProInst.pointSupervise',
'$scope.fc.transmitInfo()', 'images/sidebar_right-bc.svg', 880, '1', 'currentTaskDeal');


--流转记录用于流程监控
create table wf_process_monitor(
  id number not null primary key ,
  pro_inst_id number not null ,
  node_id varchar2(8) not null ,
  node_name varchar2(32) not null ,
  action_type varchar2(32) not null ,
  sender_id number ,
  sender_name varchar2(64) ,
  send_time datetime ,
  send_to varchar2(64) ,
  send_to_type varchar2(16) ,
  send_to_id number ,
  receiver_id number ,
  receiver_name varchar2(64) ,
  receive_time datetime ,
  finish_time datetime ,
  state varchar2(16) ,
  show_tag varchar2(8) ,
  order_num integer ,
  from_task_id number ,
  inserted_task_id number ,
  from_current_task varchar2(8)
);

comment on table wf_process_monitor is '流程监控表';
comment on column wf_process_monitor.id is '主键';
comment on column wf_process_monitor.pro_inst_id is '流程主键';
comment on column wf_process_monitor.node_id is '流程阶段ID';
comment on column wf_process_monitor.node_name is '流程阶段名称';
comment on column wf_process_monitor.action_type is '流程记录操作类型';
comment on column wf_process_monitor.sender_id is '发送人ID';
comment on column wf_process_monitor.sender_name is '发送人姓名';
comment on column wf_process_monitor.send_time is '发送时间';
comment on column wf_process_monitor.send_to is '发送至';
comment on column wf_process_monitor.send_to_type is '发送类型';
comment on column wf_process_monitor.send_to_id is '发送类型ID';
comment on column wf_process_monitor.receiver_id is '接收人ID';
comment on column wf_process_monitor.receiver_name is '接收人姓名';
comment on column wf_process_monitor.receive_time is '接收时间';
comment on column wf_process_monitor.finish_time is '完成时间';
comment on column wf_process_monitor.state is '状态';
comment on column wf_process_monitor.show_tag is '流程监控记录显示标识';
comment on column wf_process_monitor.order_num is '流程监控记录排序';
comment on column wf_process_monitor.from_task_id is '流程监控记录源自待办任务ID';
comment on column wf_process_monitor.inserted_task_id is '流程监控记录流转生成待办任务ID';
comment on column wf_process_monitor.from_current_task is '该记录是否有对应的待办任务';


--事务菜单下新增会议室相关子菜单
insert into mpsmodule (id, pkcode, title, description, flag, iconfocus, parentid, ng_state, title_menu_show)
values (876034 , '03010000', '会议室', '会议室管理', '1', 'meetingroomMng', '100116', 'coreHome.', '会议室');

insert into mpsmodule (id, pkcode, title, actionurl, targetframe, description, flag, parentid, ng_state, title_menu_show)
(select JXWOAUniversalSeq.nextval, '03010100', '会议室安排', '/coreHome/meetingroomArrange','meetingroomArrange', '会议室安排', '1', '876034', 'coreHome.meetingroomArrange','会议室安排');

insert into mpsmodule (id, pkcode, title, actionurl, targetframe, description, flag, parentid, ng_state, title_menu_show)
(select JXWOAUniversalSeq.nextval, '03010200', '会议申请', '/coreHome/meetingroomApply', 'meetingroomApply', '会议室申请', '1', '876034', 'coreHome.meetingroomApply', '会议申请');

insert into mpsmodule (id, pkcode, title, actionurl, targetframe, description, flag, parentid, ng_state, title_menu_show)
(select JXWOAUniversalSeq.nextval, '03010300', '会议查询', '/coreHome/meetingroomQuery', 'meetingroomQuery', '会议查询', '1', '876034', 'coreHome.meetingroomQuery', '会议查询');


--增加督文是否已转督标记字段
alter table WF_PROCESS_INSTANCE add transmitted varchar2(16);
comment on column wf_process_instance.transmitted is '督文是否已转督';

--更新转督办按钮显示逻辑条件
update WF_FORM_ACTION set PRE_CONDITION = '$scope.fc.wpsDetail.middleContentType==''form''&&$scope.task.status==''Accepted''&&$scope.task.theCommonFormInfo.belongProInst.pointSupervise&&$scope.task.theCommonFormInfo.belongProInst.transmitted!=''Yes'''
where ACTION_ID = 'transmitInfo' ;