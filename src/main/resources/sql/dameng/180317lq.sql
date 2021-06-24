alter table wf_history_task_info add (from_node_name varchar2(255));
alter table wf_history_task_info add (to_node_name varchar2(255));

alter table wf_form_common add (depart_name varchar2(255));

--2018.3.18增加字段
alter table WF_SECRETCONFIRM add (reson_people_name varchar2(255));
alter table WF_SECRETCONFIRM add (reson_people_id NUMBER);
alter table WF_SECRETCONFIRM add (reson_time DATETIME);

alter table WF_SECRETCONFIRM add (supervisor_people_name varchar2(255));
alter table WF_SECRETCONFIRM add (supervisor_people_id NUMBER);
alter table WF_SECRETCONFIRM add (supervisor_time DATETIME);

alter table WF_SECRETCONFIRM add (authorizor_people_name varchar2(255));
alter table WF_SECRETCONFIRM add (authorizor_people_id NUMBER);
alter table WF_SECRETCONFIRM add (authorizor_time DATETIME);
COMMIT ;
COMMENT ON COLUMN WF_SECRETCONFIRM."reson_people_name" IS '承办人的名字';
COMMENT ON COLUMN WF_SECRETCONFIRM."reson_people_id" IS '承办人的id';
COMMENT ON COLUMN WF_SECRETCONFIRM."reson_time" IS '承办时间';
COMMENT ON COLUMN WF_SECRETCONFIRM."supervisor_people_name" IS '承办人的名字';
COMMENT ON COLUMN WF_SECRETCONFIRM."supervisor_people_id" IS '承办人的id';
COMMENT ON COLUMN WF_SECRETCONFIRM."supervisor_time" IS '承办时间';
COMMENT ON COLUMN WF_SECRETCONFIRM."authorizor_people_name" IS '承办人的名字';
COMMENT ON COLUMN WF_SECRETCONFIRM."authorizor_people_id" IS '承办人的id';
COMMENT ON COLUMN WF_SECRETCONFIRM."authorizor_time" IS '承办时间';

alter table WF_SECRETCONFIRM drop column SECRET_LENGTH;
COMMIT ;
alter table WF_SECRETCONFIRM add (SECRET_LENGTH varchar2(255));
COMMIT ;
COMMENT ON COLUMN WF_SECRETCONFIRM."SECRET_LENGTH" IS '保密期限';

