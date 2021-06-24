--请假报批修改字段
alter table WF_FORM_JXWLEAVE modify leave_days varchar2(16);

--请假报批新增字段
alter table WF_FORM_JXWLEAVE add departure_cause varchar2(2048);
alter table WF_FORM_JXWLEAVE add departure_destination varchar2(64);
alter table WF_FORM_JXWLEAVE add departure_start_date datetime;
alter table WF_FORM_JXWLEAVE add departure_end_date datetime;
alter table WF_FORM_JXWLEAVE add departure_days varchar2(16);
alter table WF_FORM_JXWLEAVE add transmit_abroad_private varchar2(8);
alter table WF_FORM_JXWLEAVE add abroad_private_id number;
alter table WF_FORM_JXWLEAVE add abroad_private_number varchar2(64);

comment on column wf_form_jxwleave.departure_cause is '出境事由';
comment on column wf_form_jxwleave.departure_destination is '出境目的地';
comment on column wf_form_jxwleave.departure_start_date is '出境开始日期';
comment on column wf_form_jxwleave.departure_end_date is '出境结束日期';
comment on column wf_form_jxwleave.departure_days is '出境天数';
comment on column wf_form_jxwleave.transmit_abroad_private is '是否转因私出国报批';
comment on column wf_form_jxwleave.abroad_private_id is '转因私出国报批流程实例主键';
comment on column wf_form_jxwleave.abroad_private_number is '转因私出国报批流程文号';



insert into WF_FORM_ACTION (ID, ACTION_ID, NAME, DESCRIPTION, PRE_CONDITION, ACTION_TO_PERFORM, IMAGE_URL, ORDER_NUM, FLAG, ACTION_TYPE)
(select JXWOAUniversalSeq.nextval, 'transmitAbroadPrivate', '因私出国', '流程：转因私出境',
'$scope.fc.wpsDetail.middleContentType==''form''&&$scope.task.status==''Accepted''&&$scope.task.theCommonFormInfo.formJxwLeave.departure==''Yes''&&$scope.task.theCommonFormInfo.formJxwLeave.transmitAbroadPrivate!=''Yes''',
'$scope.fc.transmitAbroadPrivate()', 'images/sidebar_right-bc.svg', 990, '1', 'currentTaskDeal');


insert into WF_FORM_ACTION (ID, ACTION_ID, NAME, DESCRIPTION, PRE_CONDITION, ACTION_TO_PERFORM, IMAGE_URL, ORDER_NUM, FLAG, ACTION_TYPE)
(select JXWOAUniversalSeq.nextval, 'viewAbroadPrivate', '因私出国', '流程：查看因私出境',
'$scope.fc.wpsDetail.middleContentType==''form''&&$scope.task.status==''Accepted''&&$scope.task.theCommonFormInfo.formJxwLeave.transmitAbroadPrivate==''Yes''',
'$scope.viewAbroadPrivate()', 'images/sidebar_right-bc.svg', 991, '1', 'currentTaskDeal');

insert into WF_FORM_ACTION (ID, ACTION_ID, NAME, DESCRIPTION, PRE_CONDITION, ACTION_TO_PERFORM, IMAGE_URL, ORDER_NUM, FLAG, ACTION_TYPE)
(select JXWOAUniversalSeq.nextval, 'viewAbroadPrivateHistory', '因私出国', '流程：查看因私出境',
'$scope.fc.wpsDetail.middleContentType==''form''&&$scope.task.theCommonFormInfo.formJxwLeave.transmitAbroadPrivate==''Yes''',
'$scope.viewAbroadPrivate()', 'images/sidebar_right-bc.svg', 991, '1', 'hisView');



alter table WF_FORM_JXWLEAVE add leave_category varchar2(16);
comment on column wf_form_jxwleave.leave_category is '请假类别：normal(请假审批)、leader(委领导请假)';


update WF_FORM_ACTION set ACTION_TO_PERFORM = '$scope.transmitAbroadPrivate()' where ACTION_ID = 'transmitAbroadPrivate' ;

update WF_FORM_ACTION set IMAGE_URL = 'images/sidebar_right-lzjl.svg' where ACTION_ID in ('viewAbroadPrivate','viewAbroadPrivateHistory');

--党费查询
update MPSMODULE set PKCODE = '02100500', FLAG = 1, PARENTID = 100117, ACTIONURL = '/coreHome/partyDuesQuery', NG_STATE = 'coreHome.partyDuesQuery' where ID = 100124;

alter table WF_FORM_ACTION modify action_id varchar2(32);

insert into WF_FORM_ACTION (ID, ACTION_ID, NAME, DESCRIPTION, PRE_CONDITION, ACTION_TO_PERFORM, IMAGE_URL, ORDER_NUM, FLAG, ACTION_TYPE)
(select JXWOAUniversalSeq.nextval, 'transmitInfoNewManualOnce', '转督办', '流程：转重点督办',
'$scope.fc.wpsDetail.middleContentType==''form''',
'$scope.fc.transmitInfoNewManualOnce()', 'images/sidebar_right-bc.svg', 991, '1', 'hisView');
