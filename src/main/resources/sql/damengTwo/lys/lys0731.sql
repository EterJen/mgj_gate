create table "wf_form_jxwdwxinhan"
(
"id" number not null,
"receive_date" datetime(6),
"doc_type" varchar2(255),
"receive_doc_num" number,
"doc_abstract" varchar2(512),
"liuzhuan_opinion" varchar2(512),
"receive_user" varchar2(255),
"shoujian_date" datetime(6),
"audit_user" varchar2(255),
"form_common_id" number,
cluster primary key("id")) storage(on "main", clusterbtr) ;
comment on table "wf_form_jxwxinhan" is '长城电子信函收文';
comment on column "wf_form_jxwxinhan"."audit_user" is '审核人';
comment on column "wf_form_jxwxinhan"."doc_abstract" is '摘要';
comment on column "wf_form_jxwxinhan"."doc_type" is '类别';
comment on column "wf_form_jxwxinhan"."form_common_id" is '通用表单的id';
comment on column "wf_form_jxwxinhan"."id" is '主键';
comment on column "wf_form_jxwxinhan"."liuzhuan_opinion" is '流转意见';
comment on column "wf_form_jxwxinhan"."receive_date" is '收到日期';
comment on column "wf_form_jxwxinhan"."receive_doc_num" is '收文文号';
comment on column "wf_form_jxwxinhan"."receive_user" is '收件人';
comment on column "wf_form_jxwxinhan"."shoujian_date" is '收件时间';