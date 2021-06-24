CREATE TABLE wf_form_action (
  ID            NUMBER, --	主键
  actionId varchar2(255),
  name varchar2(255),
  pre_condition  varchar2(1024),
  action_to_perform  varchar2(1024),
  scope varchar2(50),
  PRIMARY KEY (ID)
);

CREATE UNIQUE INDEX form_action_id_unique ON wf_form_action (actionId);


UPDATE MPSMODULE  SET FLAG = '1', TARGETFRAME = 'formConfig',ACTIONURL='/formConfig' WHERE TITLE = '表单定义';

CREATE TABLE wf_form_field_control (
  ID            NUMBER, --	主键
  process_version_id NUMBER,
  node_id number,
  field_name varchar2(255),
  is_able_edit  varchar2(50),
  PRIMARY KEY (ID)
);