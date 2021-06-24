INSERT INTO WF_PROCESS_DEF_MANAGE (ID, NAME, DESCRIPTION, ORDER_NUM, FORM_DEF_ID, PRO_DEF_GROUP_ID, FLAG, PUBLISH_OFFICE, PUBLISH_SYMBOL, UNIFIED_SOCIAL_CREDIT_CODE, DOC_OID, SEND_DEPART_CODE, SERIAL_NUMBER, PUBLISH_OFFICE_BRIF, ISSUE_PERSON, ISSUE_PERSON_POST, OPTION_SHOW_CONF, DOC_PREFIX) VALUES (600002, '无管局发文', '沪无管局', 1, 'wuguanju', 'fawen', '1', '上海市无线电管理局发文单', '0A', '12100000400002195R', '1.2.156.10', '000', '00288', '沪无管局', '', '处长', '{ "hegao": [ "2", "4" ], "huigao": [ "3" ], "shenhe": [ "5" ], "qianfa": [ "6" ] }', '长城电子');
INSERT INTO WF_PROCESS_DEF_VERSION (ID, PROCESS_DEF_ID, VERSION, FILE_NAME, FILE_PATH, IS_ACTIVE, DESCRIPTION) VALUES (943710, 600002, 1, 'ef81c4da-8f60-48dd-9528-be10124b477b', 'ef81c4da-8f60-48dd-9528-be10124b477b.xml', '1', '无管局发文');

-- auto-generated definition
create table WF_FORM_WUGUANJU
(
	ID NUMBER ,
	SEND_TO_MAIN VARCHAR2(2000),
	SEND_TO_CC VARCHAR2(512),
	HE_GAO VARCHAR2(512),
	HUI_GAO VARCHAR2(512),
	HUI_QIAN VARCHAR2(512),
	SHEN_HE VARCHAR2(512),
	QIAN_FA VARCHAR2(512),
	NI_GAO_USERID NUMBER,
	NI_GAO_USERNAME VARCHAR2(64),
	NI_GAO_DATE DATETIME,
	FORM_COMMON_ID NUMBER,
	PRIMARY KEY (ID)
);

comment on table WF_FORM_WUGUANJU is '无管局发文';
comment on column WF_FORM_WUGUANJU.ID is '主键';
comment on column WF_FORM_WUGUANJU.SEND_TO_MAIN is '主送';
comment on column WF_FORM_WUGUANJU.SEND_TO_CC is '抄送';
comment on column WF_FORM_WUGUANJU.HE_GAO is '核稿';
comment on column WF_FORM_WUGUANJU.HUI_GAO is '会稿';
comment on column WF_FORM_WUGUANJU.HUI_QIAN is '会签';
comment on column WF_FORM_WUGUANJU.SHEN_HE is '审核';
comment on column WF_FORM_WUGUANJU.QIAN_FA is '签发';
comment on column WF_FORM_WUGUANJU.NI_GAO_USERID is '拟稿人id';
comment on column WF_FORM_WUGUANJU.NI_GAO_USERNAME is '拟稿人姓名';
comment on column WF_FORM_WUGUANJU.NI_GAO_DATE is '拟稿日期';
comment on column WF_FORM_WUGUANJU.FORM_COMMON_ID is '公用表单id';
commit;

update WF_HISTORY_TASK_INFO set  FROM_NODE_NAME = '立督' where FROM_NODE_ID='2' and TO_NODE_ID='2' and TO_NODE_NAME='立督';
update WF_HISTORY_TASK_INFO set  TASK_HIS_SHOW_TAG = 'NO' where FROM_NODE_ID='1' and TO_NODE_ID='1' and   ACTION_TYPE = 'DocTransDuwen';
commit;