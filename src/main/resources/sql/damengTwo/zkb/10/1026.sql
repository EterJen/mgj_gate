-- fawenService.choseFirstCandidate(flowAction,candidatesMap);自动选择第一个并展开
INSERT INTO PROCESS_DEF_GROUP (ID, FORM_EN_NAME, FORM_ZH_NAME, DESCRIPTION, FLAG, ORDER_NUM) VALUES (5, 'duwen', '督文', null, '1', 5);
INSERT INTO WF_PROCESS_FORM (ID, FORM_EN_NAME, FORM_ZH_NAME, DESCRIPTION, BELONG_GROUP, FLAG, ORDER_NUM) VALUES (13, 'jxwduwen', '长城电子督', '长城电子督文', 'duwen', '1', null);
INSERT INTO WF_PROCESS_DEF_MANAGE (ID, NAME, DESCRIPTION, ORDER_NUM, FORM_DEF_ID, PRO_DEF_GROUP_ID, FLAG, PUBLISH_OFFICE, PUBLISH_SYMBOL, UNIFIED_SOCIAL_CREDIT_CODE, DOC_OID, SEND_DEPART_CODE, SERIAL_NUMBER, PUBLISH_OFFICE_BRIF, ISSUE_PERSON, ISSUE_PERSON_POST, OPTION_SHOW_CONF) VALUES (882464, '长城电子督', '长城电子督文', 13, 'jxwduwen', 'duwen', '1', null, null, null, null, null, null, null, null, null, null);
UPDATE WF_PROCESS_DEF_VERSION SET PROCESS_DEF_ID = 758900, VERSION = 1, FILE_NAME = 'e086ac5e-26a7-40b3-a096-c64fe8a720be', FILE_PATH = 'e086ac5e-26a7-40b3-a096-c64fe8a720be.xml', IS_ACTIVE = '1', DESCRIPTION = '党委信函' WHERE ID = 758901;
INSERT INTO WF_PROCESS_DEF_VERSION (ID, PROCESS_DEF_ID, VERSION, FILE_NAME, FILE_PATH, IS_ACTIVE, DESCRIPTION) VALUES (882465, 882464, 1, '626e3988-f60c-4734-8bb1-e22c8d101555', '626e3988-f60c-4734-8bb1-e22c8d101555.xml', '1', '长城电子督文');


alter table wf_process_instance add (RECEIVE_DOC_TIME datetime(6));
COMMENT ON COLUMN wf_process_instance.RECEIVE_DOC_TIME IS '收文日期';
alter table wf_process_instance add (CHEN_BAN_DEPART VARCHAR2(512));
COMMENT ON COLUMN wf_process_instance.CHEN_BAN_DEPART IS '承办部门';
alter table wf_process_instance add (XIAN_BAN_TIME datetime(6));
COMMENT ON COLUMN wf_process_instance.XIAN_BAN_TIME IS '限办日期';
alter table wf_form_common add (CITY_APPROVAL VARCHAR2(1000));
COMMENT ON COLUMN wf_form_common.CITY_APPROVAL IS '市领导批示';
alter table wf_process_instance add (POINT_SUPERVISE VARCHAR2(10));
COMMENT ON COLUMN wf_process_instance.POINT_SUPERVISE IS '重点督办';
alter table wf_form_common add (HANDLE_SITUATION VARCHAR2(1000));
COMMENT ON COLUMN wf_form_common.HANDLE_SITUATION IS '办理情况';

alter table wf_process_instance add (DENLU_PERSON VARCHAR2(10));
COMMENT ON COLUMN wf_process_instance.DENLU_PERSON IS '登录人';
alter table wf_process_instance add (DENLU_TIME datetime(6));
COMMENT ON COLUMN wf_process_instance.DENLU_TIME IS '登录日期';

alter table wf_process_instance add (DUBAN_PERSON VARCHAR2(10));
COMMENT ON COLUMN wf_process_instance.DUBAN_PERSON IS '登录人';
alter table wf_process_instance add (DUBAN_TIME datetime(6));
COMMENT ON COLUMN wf_process_instance.DUBAN_TIME IS '登录日期';
alter table wf_process_instance add (SHENHE_PERSON VARCHAR2(10));
COMMENT ON COLUMN wf_process_instance.SHENHE_PERSON IS '登录人';
alter table wf_process_instance add (SHENHE_TIME datetime(6));
COMMENT ON COLUMN wf_process_instance.SHENHE_TIME IS '登录日期';