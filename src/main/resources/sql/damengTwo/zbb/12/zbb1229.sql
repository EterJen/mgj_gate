/*update WF_PROCESS_DEF_VERSION set DESCRIPTION='政协提案办理' where DESCRIPTION='人大政协';

update WF_PROCESS_DEF_MANAGE set FORM_DEF_ID='dpComposedDeal'where id=110079;*/
insert into "WF_PROCESS_DEF_MANAGE" ("ID","NAME","DESCRIPTION","ORDER_NUM","FORM_DEF_ID","PRO_DEF_GROUP_ID","FLAG","PUBLISH_OFFICE","PUBLISH_SYMBOL","UNIFIED_SOCIAL_CREDIT_CODE","DOC_OID","SEND_DEPART_CODE","SERIAL_NUMBER","PUBLISH_OFFICE_BRIF","ISSUE_PERSON","ISSUE_PERSON_POST","OPTION_SHOW_CONF","DOC_PREFIX") values (110079, '政协提案办理', '政协提案办理', 1, 'dpComposedDeal', 'handlingwork', '1', null, null, null, null, null, null, null, null, null, '{ "lingdaopishi": [ "2", "3" ],"banniqingkuang":["1","4"] }', null);
insert into "WF_PROCESS_DEF_VERSION" ("ID","PROCESS_DEF_ID","VERSION","FILE_NAME","FILE_PATH","IS_ACTIVE","DESCRIPTION") values (875037, 110079, 425, '29d8583a-964f-4fac-ac8b-a1c8c1d4a6c8', '29d8583a-964f-4fac-ac8b-a1c8c1d4a6c8.xml', '1', '政协提案办理');
INSERT INTO WF_PROCESS_DEF_MANAGE (ID, NAME, DESCRIPTION, ORDER_NUM, FORM_DEF_ID, PRO_DEF_GROUP_ID, FLAG, PUBLISH_OFFICE, PUBLISH_SYMBOL, UNIFIED_SOCIAL_CREDIT_CODE, DOC_OID, SEND_DEPART_CODE, SERIAL_NUMBER, PUBLISH_OFFICE_BRIF, ISSUE_PERSON, ISSUE_PERSON_POST, OPTION_SHOW_CONF,DOC_PREFIX)
VALUES (110081, '人大书面意见办理', '人大书面意见办理', 2, 'npcHandling', 'handlingwork', '1', null, null, null, null, null, null, null, null, null, null,'人大');
commit;

insert into WF_PROCESS_DEF_VERSION (select  "JXWOAUNIVERSALSEQ".NEXTVAL,110081,1,'28ad16a6-ea4f-4c0a-9843-4e251dd2562a','28ad16a6-ea4f-4c0a-9843-4e251dd2562a.xml','1','人大书面意见办理');
commit;

CREATE TABLE "WF_FORM_DPCOMPOSEDDEAL"
(
"ID" NUMBER NOT NULL,
"RECEIVE_DATE" DATETIME(6),
"HAND_REQUIREMENT" VARCHAR2(255),
"SEND_TO_MAIN" VARCHAR2(255),
"PRESIDENT_DEPARTMENT" VARCHAR2(255),
"PROPOSAL_NUMBER" NUMBER,
"PROPOSAL_PEOPLE" VARCHAR2(50),
"HANDLING_RESULT" VARCHAR2(255),
"NIBAN" VARCHAR2(4000),
"DUBAN" VARCHAR2(50),
"DUBAN_DATE" DATETIME(6),
"SHENHE" VARCHAR2(255),
"SHENHE_DATE" DATETIME(6),
"RECEIPT_NUMBER" NUMBER,
"RECEIPT_YEAR" NUMBER,
CLUSTER PRIMARY KEY("ID")) STORAGE(ON "MAIN", CLUSTERBTR);


comment on table WF_FORM_DPCOMPOSEDDEAL is '政协提案办理';
comment on column WF_FORM_DPCOMPOSEDDEAL.ID is '主键';
comment on column WF_FORM_DPCOMPOSEDDEAL.RECEIVE_DATE is '收文日期';
comment on column WF_FORM_DPCOMPOSEDDEAL.HAND_REQUIREMENT is '办理要求';
comment on column WF_FORM_DPCOMPOSEDDEAL.SEND_TO_MAIN is '主办';
comment on column WF_FORM_DPCOMPOSEDDEAL.PRESIDENT_DEPARTMENT is '会办部门';
comment on column WF_FORM_DPCOMPOSEDDEAL.PROPOSAL_NUMBER is '提案编号';
comment on column WF_FORM_DPCOMPOSEDDEAL.PROPOSAL_PEOPLE is '提出人';
comment on column WF_FORM_DPCOMPOSEDDEAL.HANDLING_RESULT is '办理结果';
comment on column WF_FORM_DPCOMPOSEDDEAL.NIBAN is '拟办意见';
comment on column WF_FORM_DPCOMPOSEDDEAL.DUBAN is '督办';
comment on column WF_FORM_DPCOMPOSEDDEAL.DUBAN_DATE is '督办时间';
comment on column WF_FORM_DPCOMPOSEDDEAL.SHENHE is '审核';
comment on column WF_FORM_DPCOMPOSEDDEAL.SHENHE_DATE is '审核';
comment on column WF_FORM_DPCOMPOSEDDEAL.RECEIPT_YEAR is '收文年份';

insert into ORGROLE(select "JXWOAUNIVERSALSEQ".NEXTVAL,null,'人大政协督办人','人大政协特有督办只有一个人',1,null);
insert into ORGROLE(select "JXWOAUNIVERSALSEQ".NEXTVAL,null,'人大政协审核人','人大政协特有审核只有一个人',1,null);
commit ;
insert into ORGRU(select id,2397,null from ORGROLE where name='人大政协督办人');
insert into ORGRU(select id,18,null from ORGROLE where name='人大政协审核人');
commit ;


CREATE TABLE "WF_FORM_NPCHANDLING"
(
"ID" NUMBER NOT NULL,
"RECEIVE_DATE" DATETIME(6),
"HAND_REQUIREMENT" VARCHAR2(255),
"SEND_TO_MAIN" VARCHAR2(255),
"PRESIDENT_DEPARTMENT" VARCHAR2(255),
"PROPOSAL_NUMBER" NUMBER,
"PROPOSAL_PEOPLE" VARCHAR2(50),
"HANDLING_RESULT" VARCHAR2(255),
"NIBAN" VARCHAR2(4000),
"DUBAN" VARCHAR2(50),
"DUBAN_DATE" DATETIME(6),
"SHENHE" VARCHAR2(255),
"SHENHE_DATE" DATETIME(6),
"RECEIPT_NUMBER" NUMBER,
"RECEIPT_YEAR" NUMBER,
CLUSTER PRIMARY KEY("ID")) STORAGE(ON "MAIN", CLUSTERBTR);

alter table WF_FORM_NPCHANDLING modify (PROPOSAL_NUMBER varchar2(50)); -- 修改数据类型
alter table WF_FORM_DPCOMPOSEDDEAL modify (PROPOSAL_NUMBER varchar2(50)); -- 修改数据类型

comment on table WF_FORM_NPCHANDLING is '人大书面意见办理';
comment on column WF_FORM_NPCHANDLING.ID is '主键';
comment on column WF_FORM_NPCHANDLING.RECEIVE_DATE is '收文日期';
comment on column WF_FORM_NPCHANDLING.HAND_REQUIREMENT is '办理要求';
comment on column WF_FORM_NPCHANDLING.SEND_TO_MAIN is '主办';
comment on column WF_FORM_NPCHANDLING.PRESIDENT_DEPARTMENT is '会办部门';
comment on column WF_FORM_NPCHANDLING.PROPOSAL_NUMBER is '提案编号';
comment on column WF_FORM_NPCHANDLING.PROPOSAL_PEOPLE is '提出人';
comment on column WF_FORM_NPCHANDLING.HANDLING_RESULT is '办理结果';
comment on column WF_FORM_NPCHANDLING.NIBAN is '拟办意见';
comment on column WF_FORM_NPCHANDLING.DUBAN is '督办';
comment on column WF_FORM_NPCHANDLING.DUBAN_DATE is '督办时间';
comment on column WF_FORM_NPCHANDLING.SHENHE is '审核';
comment on column WF_FORM_NPCHANDLING.SHENHE_DATE is '审核';
comment on column WF_FORM_NPCHANDLING.RECEIPT_YEAR is '收文年份';