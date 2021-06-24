insert into attachment(select 1,'附件插入模板.wps','fujianInsert.wps',1,SYSDATE(),SYSDATE());

/**************************************2018-8-14更新***************************************************/
insert into wf_process_form(select 12,'jxwdwxinhan','党委信函','党委信函','xinhan','1',null);
update wf_process_def_manage set form_def_id='jxwdwxinhan' where name='党委信函';