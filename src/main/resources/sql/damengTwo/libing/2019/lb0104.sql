
CREATE TABLE "WF_FORM_PARTYAPPROVED"
(
"ID" NUMBER NOT NULL,
"RECEIVE_DOC_NUM" NUMBER,
"NI_GAO_DATA" DATETIME(6),
"TYPE" VARCHAR2(255),
"FORM_COMMON_ID" NUMBER,
CLUSTER PRIMARY KEY("ID")) STORAGE(ON "MAIN", CLUSTERBTR);

comment on table WF_FORM_PARTYAPPROVED is '党委工作报批表';
comment on column WF_FORM_PARTYAPPROVED.ID is '主键';
comment on column WF_FORM_PARTYAPPROVED.RECEIVE_DOC_NUM is '收文文号';
comment on column WF_FORM_PARTYAPPROVED.NI_GAO_DATA is '拟稿日期';
comment on column WF_FORM_PARTYAPPROVED.FORM_COMMON_ID is '通用表单的id';


INSERT INTO WF_PROCESS_DEF_MANAGE (ID, NAME, DESCRIPTION, ORDER_NUM, FORM_DEF_ID, PRO_DEF_GROUP_ID, FLAG, PUBLISH_OFFICE, PUBLISH_SYMBOL, UNIFIED_SOCIAL_CREDIT_CODE, DOC_OID, SEND_DEPART_CODE, SERIAL_NUMBER, PUBLISH_OFFICE_BRIF, ISSUE_PERSON, ISSUE_PERSON_POST, OPTION_SHOW_CONF)
VALUES (110080, '党委工作报批', '党委工作报批', 13, 'partyapproved', 'xinhan', '1', null, null, null, null, null, null, null, null, null, null);