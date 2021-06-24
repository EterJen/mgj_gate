insert into "WF_FORM_ACTION" ("ID","ACTION_ID","NAME","DESCRIPTION","PRE_CONDITION","ACTION_TO_PERFORM","IMAGE_URL","ORDER_NUM","FLAG","ACTION_TYPE") values (869343, 'adjustOpinionsFirst', '意见调整', '审批单：调整拟稿阶段意见', '$scope.fc.wpsDetail.middleContentType==''form''', '$scope.adjustOpinionsFirst()', 'images/sidebar_right-yjlr.svg', 220, '1', 'hisView');
commit;

insert into MPSAVAILMODULE(select 2397,'U',05000000,1,100284);
insert into MPSAVAILMODULE(select 2397,'U',05030000,1,100334);
insert into MPSAVAILMODULE(select 2397,'U',05030300,1,100340);
commit;
insert into DIC_MODE(select JXWOAUNIVERSALSEQ.NEXTVAL,'dwCommonPerson','1','党委一般人员意见查看',id,'1' from DIC_CATEGORY where name='流程');
insert into DIC_MODE(select JXWOAUNIVERSALSEQ.NEXTVAL,'xzCommonPerson','1','行政一般人员意见查看',id,'1' from DIC_CATEGORY where name='流程');
commit;
insert into DIC_TYPE(id,name,flag,DIC_MODE_ID,ORDER_NUM)(select JXWOAUNIVERSALSEQ.NEXTVAL,'国防办发文','1',id,'1' from DIC_MODE where CNAME='党委一般人员意见查看');
insert into DIC_TYPE(id,name,flag,DIC_MODE_ID,ORDER_NUM)(select JXWOAUNIVERSALSEQ.NEXTVAL,'长城电子发文','1',id,'2' from DIC_MODE where CNAME='党委一般人员意见查看');

insert into DIC_TYPE(id,name,flag,DIC_MODE_ID,ORDER_NUM)(select JXWOAUNIVERSALSEQ.NEXTVAL,'长城电子收文','1',id,'1' from DIC_MODE where CNAME='行政一般人员意见查看');
commit;

update MPSMODULE set ACTIONURL='/coreHome/adjustmentOpinion' where id=(select id from MPSMODULE where title='意见调整');
