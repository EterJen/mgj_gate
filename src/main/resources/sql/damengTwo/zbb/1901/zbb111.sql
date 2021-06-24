alter table WF_PROCESS_INSTANCE add (SEVERAL_SESSIONS number);
alter table WF_PROCESS_INSTANCE add (SECOND number);
alter table WF_FORM_DPCOMPOSEDDEAL modify (PROPOSAL_NUMBER VARCHAR2(50));
alter table WF_FORM_NPCHANDLING modify (PROPOSAL_NUMBER VARCHAR2(50));
commit ;
comment on column WF_PROCESS_INSTANCE.SEVERAL_SESSIONS is '人大政协第几届';
comment on column WF_PROCESS_INSTANCE.SECOND is '人大政协第几次';
--跟新人大政协管理表

update WF_PROCESS_DEF_MANAGE set PUBLISH_OFFICE='市政协',PUBLISH_OFFICE_BRIF='18',ISSUE_PERSON='3',OPTION_SHOW_CONF='{ "niban":["1"],"lingdaopishi": [ "2", "3" ],"banniqingkuang":["4"] }' where FORM_DEF_ID='dpComposedDeal' or FORM_DEF_ID='npcHandling';

update MPSMODULE set flag='1',ng_state='coreHome.approvalAttachManage',ACTIONURL='/coreHome/approvalAttachManage' where PARENTID=100061 and title='帮助';