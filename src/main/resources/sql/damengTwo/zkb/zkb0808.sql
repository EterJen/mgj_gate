alter table wf_process_def_manage add (option_show_conf varchar2(500));
comment on column "wf_process_def_manage"."option_show_conf" is '节点意见展示配置';
alter table wf_current_task_info add (from_task_id varchar2(60));
comment on column "wf_current_task_info"."from_task_id" is '来源任务Id）'; --用于任务防重

ALTER TABLE wf_history_task_info add (assignee_id varchar2(50));
ALTER TABLE wf_history_task_info add (assignee_name varchar2(50));
ALTER TABLE wf_history_task_info add (assignee_type varchar2(50));
comment on column "wf_history_task_info"."assignee_id" is '任务接收者id';
comment on column "wf_history_task_info"."assignee_name" is '任务接收者名字';
comment on column "wf_history_task_info"."assignee_type" is '任务接收者类型';
commit;
