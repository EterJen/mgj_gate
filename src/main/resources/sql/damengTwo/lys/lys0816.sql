alter table wf_form_field_control add (is_required varchar2(50));
comment on column "wf_form_field_control"."is_required" is '某节点该字段是否必填';