/*insert into DIC_TYPE (id,name,ename,flag,dic_mode_id)(select JXWOAUNIVERSALSEQ.NEXTVAL,'党委请示','dbNoPk','1',101997);
insert into DIC_TYPE (id,name,ename,flag,dic_mode_id)(select JXWOAUNIVERSALSEQ.NEXTVAL,'党委通知','dbNoPk','1',101997);
commit ;*/

insert into WF_DOC_TYPE (select 107630,943389,'党委请示上行' );
insert into WF_DOC_TYPE (select 107631,943390,'党委通知');
commit;
insert into ATTACHMENT(select JXWOAUNIVERSALSEQ.NEXTVAL,'党委请示.wpt','983ceed5-c3ee-5b73-a409-190a32110082.wpt',1,sysdate(),sysdate());
insert into ATTACHMENT(select JXWOAUNIVERSALSEQ.NEXTVAL,'党委通知.wpt','384cerd5-c3ee-6b73-a409-191a32110083.wpt',1,sysdate(),sysdate());
commit;

insert into MIDDLE_ATTACHMENT (select JXWOAUNIVERSALSEQ.NEXTVAL,107630,id,'taohongmoban','content','wpt',0,'管理员','信息中心',sysdate(),JXWOAUNIVERSALSEQ.CURRVAL,null,null,1,1,null,null,null,null,null,1,107808,1 from ATTACHMENT where FILENAME='党委请示.wpt');
insert into MIDDLE_ATTACHMENT (select JXWOAUNIVERSALSEQ.NEXTVAL,107631,id,'taohongmoban','content','wpt',0,'管理员','信息中心',sysdate(),JXWOAUNIVERSALSEQ.CURRVAL,null,null,1,1,null,null,null,null,null,1,107808,1 from ATTACHMENT where FILENAME='党委通知.wpt');
commit;


insert into "WF_FORM_ACTION" ("ID","ACTION_ID","NAME","DESCRIPTION","PRE_CONDITION","ACTION_TO_PERFORM","IMAGE_URL","ORDER_NUM","FLAG","ACTION_TYPE") values (13, 'relationReciveNoticeDoc', '关联督文', '审批单：催办单关联督文', '$scope.fc.wpsDetail.middleContentType==''form''  && SysUtils.notEmpty($scope.task.theCommonFormInfo,[''belongProInst'',''relatedReceiveDocId''])', '$scope.fc.relationReciveDoc(''relatedReceiveDocIdDialog'',''relatedReceiveDocId'')', 'images/sidebar_right-glsw.svg', 250, '1', 'currentTaskDeal');
insert into "WF_FORM_ACTION" ("ID","ACTION_ID","NAME","DESCRIPTION","PRE_CONDITION","ACTION_TO_PERFORM","IMAGE_URL","ORDER_NUM","FLAG","ACTION_TYPE") values (759478, 'HisAssociatedNotice', '关联督文', '审批单：催办单关联督文', '$scope.fc.wpsDetail.middleContentType==''form'' && SysUtils.notEmpty($scope.task.theCommonFormInfo,[''belongProInst'',''relatedReceiveDocId''])', '$scope.fc.relationReciveDoc(''relatedReceiveDocIdDialog'',''relatedReceiveDocId'')', 'images/sidebar_right-glsw.svg', 250, '1', 'hisView');
