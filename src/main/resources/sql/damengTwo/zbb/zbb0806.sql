CREATE TABLE "wf_form_jxwdwxinhan"
(
"id" NUMBER NOT NULL,
"receive_date" DATETIME(6),
"doc_type" VARCHAR2(255),
"receive_doc_num" NUMBER,
"doc_abstract" VARCHAR2(512),
"liuzhuan_opinion" VARCHAR2(512),
"receive_user" VARCHAR2(255),
"shoujian_date" DATETIME(6),
"audit_user" VARCHAR2(255),
"form_common_id" NUMBER,
CLUSTER PRIMARY KEY("id")) STORAGE(ON "MAIN", CLUSTERBTR) ;
COMMENT ON TABLE "wf_form_jxwdwxinhan" IS '长城电子党委信函收文';
COMMENT ON COLUMN "wf_form_jxwdwxinhan"."audit_user" IS '审核人';
COMMENT ON COLUMN "wf_form_jxwdwxinhan"."doc_abstract" IS '摘要';
COMMENT ON COLUMN "wf_form_jxwdwxinhan"."doc_type" IS '类别';
COMMENT ON COLUMN "wf_form_jxwdwxinhan"."form_common_id" IS '通用表单的id';
COMMENT ON COLUMN "wf_form_jxwdwxinhan"."id" IS '主键';
COMMENT ON COLUMN "wf_form_jxwdwxinhan"."liuzhuan_opinion" IS '流转意见';
COMMENT ON COLUMN "wf_form_jxwdwxinhan"."receive_date" IS '收到日期';
COMMENT ON COLUMN "wf_form_jxwdwxinhan"."receive_doc_num" IS '收文文号';
COMMENT ON COLUMN "wf_form_jxwdwxinhan"."receive_user" IS '收件人';
COMMENT ON COLUMN "wf_form_jxwdwxinhan"."shoujian_date" IS '收件时间';


--这是导入以前套红模板文件，从以前jxw3迁入的
/*insert into middle_attachment(id,process_instance_id,attachmentid,biz_attach_type,biz_file_type,file_ext,creator_id,creator_name,creator_departname,create_time,large_version,minor_version)
(select id,process_instance_id,attachmentid,biz_attach_type,biz_file_type,file_ext,creator_id,creator_name,creator_departname,create_time,large_version,minor_version from middle_attachment t where t.biz_attach_type='taohongmoban' and group_leader_id is null);


insert into attachment(select a.* from middle_attachment t left join attachment a on a.id=t.attachmentid where t.biz_attach_type='taohongmoban' and group_leader_id is null);
commit;*/