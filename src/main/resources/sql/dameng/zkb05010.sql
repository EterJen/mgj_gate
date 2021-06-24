alter table wf_process_instance add (pro_def_group_id varchar2(50));
UPDATE wf_process_instance t SET
t.pro_def_group_id=(select m.pro_def_group_id from wf_process_def_version v
INNER JOIN wf_process_def_manage m on v.process_def_id = m.id where v.id = t.process_version_id );

alter table wf_process_instance add (doc_full_name varchar2(255)); /*文档 全名*/
UPDATE wf_process_instance t SET
t.doc_full_name = (select fc.doc_full_name from wf_form_common fc WHERE t.form_common_id = fc.id);

alter table wf_process_instance add (title varchar2(255)); /*文档 标题*/
UPDATE wf_process_instance t SET
t.title = (select fc.title from wf_form_common fc WHERE t.form_common_id = fc.id);

alter table wf_process_instance add (RELATED_RECEIVE_DOC_ID varchar2(255)); /*关联收文号*/
alter table wf_form_fawen modify (RELATED_RECEIVE_DOC_ID varchar2(255)); -- 修改数据类型
alter table wf_form_jxwdwfawen modify (RELATED_RECEIVE_DOC_ID varchar2(255)); -- 修改数据类型
alter table wf_form_gfkgbfawen modify (RELATED_RECEIVE_DOC_ID varchar2(255)); -- 修改数据类型
alter table wf_form_hjxgffawen modify (RELATED_RECEIVE_DOC_ID varchar2(255)); -- 修改数据类型
-- update wf_process_instance set RELATED_RECEIVE_DOC_ID= 'ff' where id = '99991'


-- 收文
alter table wf_process_instance add (incoming_doc_num varchar2(255)); /*来文字号*/
alter table wf_form_jxwshouwen modify (incoming_doc_num varchar2(255)); -- 修改数据类型
alter table wf_process_instance add (INCOMING_DOC_DEPART varchar2(512)); /*来文单位*/
alter table wf_process_instance add (incoming_num NUMBER); /*来文份数*/
alter table wf_process_instance add (state varchar2(255)); /*流程全局状态 不同于单个任务状态*/

CREATE or replace INDEX wpi_idx_ct  ON wf_process_instance (create_time DESC);
CREATE or replace INDEX wpi_idx_com  ON wf_process_instance (pro_def_group_id,FORM_DEF_ID,incoming_num);

SELECT COUNT(1)
FROM wf_process_instance t
WHERE  t.pro_def_group_id = 'shouwen';


SELECT *
FROM (SELECT
        ROWNUM AS rowno,
        r.*
      FROM (SELECT
              t.*
             FROM wf_process_instance INDEX wpi_idx_ct t
              WHERE t.pro_def_group_id = 'fawen')

           r
      WHERE ROWNUM <= 10000 * 10) table_alias
WHERE table_alias.rowno > (10000 - 1) * 10 ;


