alter table wf_process_instance add (is_finished varchar2(50));
alter table wf_process_instance add (finished_date datetime);
update mpsmodule set flag = '1', targetframe ='zongheQuery', actionurl ='/zongheQuery' where title ='公文查询'
update mpsmodule set flag = '1' where title ='办公管理' 

drop table process_def_group;
CREATE TABLE process_def_group(
id varchar2(50),
group_name VARCHAR2(50),
PRIMARY KEY (ID)
);
insert into process_def_group(id,group_name) values ('shouwen','收文');
insert into process_def_group(id,group_name) values ('fawen','发文');
insert into process_def_group(id,group_name) values ('shangjilaiwen','上级来文');

alter table wf_process_def_manage add (pro_def_group_id varchar2(50));


update wf_process_def_manage set pro_def_group_id = 'fawen' where form_def_id ='fawen';
update wf_process_def_manage set pro_def_group_id = 'fawen' where form_def_id ='gfkgbfawen';
update wf_process_def_manage set pro_def_group_id = 'fawen' where form_def_id ='jxwdwfawen';
update wf_process_def_manage set pro_def_group_id = 'fawen' where form_def_id ='hjxgffawen';
update wf_process_def_manage set pro_def_group_id = 'shouwen' where form_def_id ='jxwshouwen';
update wf_process_def_manage set pro_def_group_id = 'shouwen' where form_def_id ='jxwdwshouwen';
update wf_process_def_manage set pro_def_group_id = 'shouwen' where form_def_id ='jxwxinhan';