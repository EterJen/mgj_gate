alter table wf_process_instance add (number_of_copy NUMBER (10));
alter table wf_process_instance add (secret_level_name varchar2(16));
alter table wf_process_instance add (issuer varchar2(32));
alter table wf_process_instance add (issue_time datetime(6));
alter table wf_process_instance add (allow_repeated char(1));
comment on column "wf_process_instance"."number_of_copy" is '份数';
comment on column "wf_process_instance"."secret_level_name" is '密级名称';
comment on column "wf_process_instance"."issuer" is '签发人';
comment on column "wf_process_instance"."issue_time" is '签发时间';
comment on column "wf_process_instance"."allow_repeated" is '允许来文重复';

alter table wf_process_instance modify allow_repeated varchar2(16);