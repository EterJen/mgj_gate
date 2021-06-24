INSERT INTO WF_PROCESS_DEF_MANAGE (ID, NAME, DESCRIPTION, ORDER_NUM, FORM_DEF_ID, PRO_DEF_GROUP_ID, FLAG, PUBLISH_OFFICE, PUBLISH_SYMBOL, UNIFIED_SOCIAL_CREDIT_CODE, DOC_OID, SEND_DEPART_CODE, SERIAL_NUMBER, PUBLISH_OFFICE_BRIF, ISSUE_PERSON, ISSUE_PERSON_POST, OPTION_SHOW_CONF, DOC_PREFIX) VALUES (600006, '党委催办通知单', '立督阶段可以创建通知单', 254, 'dwReminderNotice', 'urgent', '1', null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO WF_PROCESS_DEF_VERSION (ID, PROCESS_DEF_ID, VERSION, FILE_NAME, FILE_PATH, IS_ACTIVE, DESCRIPTION) VALUES (947923, 600006, 1, '52dda02e-3dea-48d1-8b56-d4b8819d1897', '52dda02e-3dea-48d1-8b56-d4b8819d1897.xml', '1', '党委催办单');
INSERT INTO WF_FORM_ACTION (ID, ACTION_ID, NAME, DESCRIPTION, PRE_CONDITION, ACTION_TO_PERFORM, IMAGE_URL, ORDER_NUM, FLAG, ACTION_TYPE) VALUES (600009, 'dwReminderNotice', '通知单', '党委督文：催办单', '$scope.task.readMode==''task''&& $scope.fc.wpsDetail.middleContentType==''form''&& $scope.task.status==''Accepted'' ', '$scope.createReminderNotice("dwReminderNotice")', 'images/sidebar_right-bc.svg', 897, '1', 'currentTaskDeal');
update WF_PROCESS_INSTANCE set DOC_FULL_NAME = replace(DOC_FULL_NAME,'(','（') where DOC_FULL_NAME is not null;
update WF_PROCESS_INSTANCE set DOC_FULL_NAME = replace(DOC_FULL_NAME,')','）') where DOC_FULL_NAME is not null;
update WF_PROCESS_INSTANCE set RELATE_DU_WEN_DOC_ID = replace(RELATE_DU_WEN_DOC_ID,'(','（') where RELATE_DU_WEN_DOC_ID is not null;
update WF_PROCESS_INSTANCE set RELATE_DU_WEN_DOC_ID = replace(RELATE_DU_WEN_DOC_ID,')','）') where RELATE_DU_WEN_DOC_ID is not null;
update WF_PROCESS_INSTANCE set RELATED_RECEIVE_DOC_ID = replace(RELATED_RECEIVE_DOC_ID,'(','（') where RELATED_RECEIVE_DOC_ID is not null;
update WF_PROCESS_INSTANCE set RELATED_RECEIVE_DOC_ID = replace(RELATED_RECEIVE_DOC_ID,')','）') where RELATED_RECEIVE_DOC_ID is not null;

INSERT INTO ORGROLE (ID, PKID, NAME, DESCRIPTION, FLAG, CLICKRATE) VALUES (3005, 1, '行政表单打印', '公文查询打开文后增加打印表单按钮', 1, 19);
commit;

create or replace procedure delInst(v in number) is
i number;
begin
i:=v;
DELETE FROM wf_process_instance WHERE id = i;
DELETE    from wf_current_task_info   where pro_inst_id = i;
DELETE    from WF_HISTORY_TASK_INFO   where pro_inst_id = i;
DELETE    from wf_form_common   where pro_inst_id = i;
commit;
end delInst;
-- delInst(948052);
