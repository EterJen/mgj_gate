alter table wf_process_instance add (RELATE_DU_WEN_DOC_ID varchar2(255)); /*关联收文号*/
COMMENT ON COLUMN wf_process_instance.RELATE_DU_WEN_DOC_ID IS '关联督文号';
