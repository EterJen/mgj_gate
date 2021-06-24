alter table wf_current_task_info add (belonging_node_id varchar2(50));
alter table wf_process_instance drop column current_node_id;
alter table WF_HISTORY_TASK_INFO  drop column task_type;
alter table WF_HISTORY_TASK_INFO add (action_type varchar2(255));
alter table wf_form_common add (pro_inst_id number); 

