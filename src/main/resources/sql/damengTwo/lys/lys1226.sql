INSERT INTO WF_PROCESS_FORM (ID, FORM_EN_NAME, FORM_ZH_NAME, DESCRIPTION, BELONG_GROUP, FLAG, ORDER_NUM)
VALUES (15, 'gwwjb', '公务网简报', '外部简报', 'shouwen', '1', null);

INSERT INTO WF_PROCESS_DEF_MANAGE (ID, NAME, DESCRIPTION, ORDER_NUM, FORM_DEF_ID, PRO_DEF_GROUP_ID, FLAG, PUBLISH_OFFICE, PUBLISH_SYMBOL, UNIFIED_SOCIAL_CREDIT_CODE, DOC_OID, SEND_DEPART_CODE, SERIAL_NUMBER, PUBLISH_OFFICE_BRIF, ISSUE_PERSON, ISSUE_PERSON_POST, OPTION_SHOW_CONF)
VALUES (888889, '公务网简报', '外部简报', 15, 'gwwjb', 'shouwen', '1', null, null, null, null, null, null, null, null, null, null);

insert into WF_PROCESS_DEF_VERSION (ID, PROCESS_DEF_ID, VERSION, FILE_NAME, FILE_PATH, IS_ACTIVE, DESCRIPTION)
(select JXWOAUniversalSeq.nextval, 888889, 425, 'a5cc245b-f079-40bd-897f-f5100888a018', 'a5cc245b-f079-40bd-897f-f5100888a018.xml', '1', '公务网简报流程');

alter table WF_PROCESS_INSTANCE add bulletin_type varchar2(64);
alter table WF_FORM_COMMON add bulletin_remark varchar2(1024);
alter table WF_FORM_COMMON add bulletin_receipt_request varchar2(1024);

comment on column wf_process_instance.bulletin_type is '简报类型';
comment on column wf_form_common.bulletin_remark is '简报备注';
comment on column wf_form_common.bulletin_receipt_request is '简报回执要求';

