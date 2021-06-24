/*委内公开同时作为是否涉密标记*/
alter table wf_process_instance add (wngk  varchar2(5));
COMMENT ON COLUMN wf_process_instance.wngk IS '委内公开标记 0|1';

update wf_process_instance set wngk = '0'  ;
update wf_process_instance w set wngk = '1' where exists (select 1 from wf_form_common c where w.id = c.pro_inst_id and instr('wngk',c.publicity_level)>0);

update mpsmodule set title = '个人配置' where title = '基础配置';
update mpsmodule set title = '已办事项'  where title = '已办流程';

DROP index wpi_idx_com;
CREATE or replace INDEX wpi_idx_ct  ON wf_process_instance (id desc,pro_def_group_id,FORM_DEF_ID,incoming_num,doc_full_name,title,incoming_doc_num,INCOMING_DOC_DEPART,wngk);
commit;