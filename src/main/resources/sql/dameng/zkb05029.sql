-- alter table wf_form_common add (pro_def_group_id varchar2(50)); /*分组 id 收文、发文、信函、规范*/
-- alter table wf_form_common add (doc_full_name varchar2(255)); /*文档 全名*/
-- alter table wf_form_common add (title varchar2(255)); /*文档 标题*/
-- alter table wf_form_common add (state varchar2(255)); /*流程全局状态 不同于单个任务状态*/

/*文档 全名*/
alter table wf_form_common drop column doc_full_name;
/*文档 标题*/
alter table wf_form_common drop column title;
/*关联收文号*/
alter table wf_form_fawen  drop column RELATED_RECEIVE_DOC_ID; --relatedReceiveDocId
alter table wf_form_jxwdwfawen  drop column RELATED_RECEIVE_DOC_ID;
alter table wf_form_gfkgbfawen  drop column RELATED_RECEIVE_DOC_ID;
alter table wf_form_hjxgffawen  drop column RELATED_RECEIVE_DOC_ID;
/*来文字号*/
alter table WF_FORM_JXWDWSHOUWEN  drop column incoming_doc_num; --incomingDocNum
alter table WF_FORM_JXWSHOUWEN  drop column incoming_doc_num;
alter table WF_FORM_JXWXINHAN  drop column incoming_doc_num;
/*来文单位*/
alter table WF_FORM_JXWDWSHOUWEN  drop column INCOMING_DOC_DEPART;--incomingDocDepart
alter table WF_FORM_JXWSHOUWEN  drop column INCOMING_DOC_DEPART;
alter table WF_FORM_JXWXINHAN  drop column INCOMING_DOC_DEPART;
alter table WF_FORM_JYWJB  drop column INCOMING_DOC_DEPART;
alter table WF_FORM_JYWJG  drop column INCOMING_DOC_DEPART;
alter table WF_FORM_JYWJJ  drop column INCOMING_DOC_DEPART;
alter table WF_FORM_JYWJY  drop column INCOMING_DOC_DEPART;
/*来文份数*/
alter table WF_FORM_JXWDWSHOUWEN  drop column incoming_num;--incomingNum
alter table WF_FORM_JXWSHOUWEN  drop column incoming_num;
alter table WF_FORM_JYWJB  drop column incoming_num;
alter table WF_FORM_JYWJG  drop column incoming_num;
alter table WF_FORM_JYWJJ  drop column incoming_num;
alter table WF_FORM_JYWJY  drop column incoming_num;






