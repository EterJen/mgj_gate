alter table wf_process_instance add (set_sceret_task_flag  varchar2(10));
COMMENT ON COLUMN wf_process_instance.set_sceret_task_flag IS '定密任务存在标记';