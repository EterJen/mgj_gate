DROP index wpi_idx_com;
CREATE or replace INDEX wpi_idx_ct  ON wf_process_instance (id desc,pro_def_group_id,FORM_DEF_ID,incoming_num,doc_full_name,title,incoming_doc_num,INCOMING_DOC_DEPART);

COMMIT ;
