alter table wf_history_task_info add (done_task_ignore varchar2(2));
COMMIT ;

UPDATE WF_HISTORY_TASK_INFO SET done_task_ignore  = '0' WHERE from_node_id != to_node_id;
COMMIT ;

CREATE or replace INDEX whti_idx_pid  ON wf_history_task_info (done_task_ignore,operator_id,pro_inst_id DESC);
CREATE or replace INDEX wcti_idx_com  ON wf_current_task_info (assignee  ,assignee_type ,create_time DESC );

UPDATE MPSMODULE SET FLAG = '0', TARGETFRAME = 'groupManageList',ACTIONURL='/coreGroup/groupTree' WHERE TITLE = '组';

DROP index wcti_idx_pid;
COMMIT ;
