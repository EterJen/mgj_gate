drop table audit_info;
drop table wf_process_def_manage;
drop table wf_process_def_version;
drop table wf_process_instance;
drop table wf_current_task_info;
drop table wf_history_task_info;
drop table wf_form_common; --通用字段放在这个表里面
drop table wf_form_fawen;

CREATE TABLE audit_info (
  ID          NUMBER, --	主键
  operator_id number,
  operator_name varchar2(64),
  operator_dept_id number,
  operator_dept_name varchar2(64),
  operator_time DATETIME,
  operate_type varchar2(64),
  description varchar2(4000),
  ENTITY varchar2(64),
  IP varchar2(64),
  PRIMARY KEY (ID)
);
COMMENT ON TABLE audit_info IS '审计信息表';
COMMENT ON COLUMN AUDIT_INFO.ENTITY IS '操作对象';
COMMENT ON COLUMN AUDIT_INFO.IP IS 'IP地址';


CREATE TABLE wf_process_instance (
  ID           NUMBER, --	主键
  current_node_id varchar2(255),--当前所处节点的i
  creator_id  NUMBER, --创建流程的用户的id
  creator_name VARCHAR2 (50),--创建流程的用户名称
  create_time DATETIME,--创建时间
  last_updated_time DATETIME,--最新流转时间,
  process_version_id number,--流程定义的版本信息
  form_common_id NUMBER,
  form_def_id varchar2(255),--个性化表单定义的的id,
  form_detail_id number,--个性化表单实例的id,
  PRIMARY KEY (ID)
);


CREATE TABLE wf_current_task_info (
  ID          NUMBER, --	主键
  pro_inst_id  NUMBER, -- 当前任务所属流程实例的id
  assignee NUMBER,--接收人的id
  status varchar2(50), --任务的状态：未接收、已接收、已办结；
  creator_id NUMBER, --创建流程的用户的id
  creator_name VARCHAR2 (50),--创建流程的用户名称
  create_time DATETIME,--创建时间
  last_updated_time DATETIME,--最新流转时间
  PRIMARY KEY (ID)
);

CREATE TABLE wf_history_task_info (
  ID           NUMBER, --	主键
  pro_inst_id  NUMBER, -- 任务所属流程实例的id
  from_node_id varchar2(255),--开始节点
  to_node_id varchar2(255), --目标节点
  operate_time DATETIME, --操作时间
  operator_id NUMBER, --操作人员id
  operator_name varchar2(255),--操作人员姓名；
  operator_depart_id NUMBER,--操作人员所属部门；
  operator_depart_name varchar2(50),--操作人员所属部门名称；
  opinion varchar2(512), --操作意见 冗余字段 意见放入个性表单相关字段
  PRIMARY KEY (ID)
);


CREATE TABLE wf_process_def_manage (
  ID NUMBER, --	主键
  name varchar2(255), --流程定义的name;
  description varchar2(1024), --流程定义的描述
  order_num number, --排序字段
  form_def_id varchar2(255),
  PRIMARY KEY (ID)
);


CREATE TABLE wf_process_def_version (
  ID NUMBER, --	主键
  process_def_id NUMBER, --外键，流程定义的id;
  version NUMBER, --版本号
  file_name varchar2(255), --文件名
  file_path varchar2(1024),
  is_active varchar2(10), --是否启用
  description varchar2(1024), --描述
  PRIMARY KEY (ID)
);



CREATE TABLE wf_form_common (
  ID NUMBER, --	主键
  emergence_level varchar2(64), --紧急程度：待字典描述;  通用字段；
  publicity_level varchar2(64), --公开级别：委内公开，主动公开，不予公开，依申请公开；  通用字段；
  doc_type varchar2(255), --文种；通用字段；
  secret_form_id NUMBER, --定密单ID
  secret_level varchar2(255), --密级；冗余 通用字段；
  dept_id NUMBER, --流程发起部门 用于页面展示部门简称
  doc_year integer, --年份；通用字段；
  doc_number integer, --号；通用字段；
  title varchar2(512),--标题；通用字段；
  not_open_reason varchar2(64), --不予公开理由：国家秘密，个人隐私，内部管理信息，商业秘密，危及三安全一稳定，过程性信息，其他理由；通用字段
  other_reason varchar2(255), --不予公开的其他理由；通用字段
  number_of_copy integer, --打印份数；通用字段
  form_detail_id NUMBER,  --个性表单记录的id;
  form_detail_type varchar2(64),--个性表单的类型
  PRIMARY KEY (ID)
);

create table wf_form_fawen(
  ID NUMBER, --	主键
  related_receive_doc_id NUMBER, --关联收文号；个性字段；
  send_to_main varchar2(512), --主送；个性字段；
  send_to_cc varchar2(512), --抄送；个性字段；
  he_gao varchar2(512), --核稿；个性字段；
  hui_gao varchar2(512), --会稿；个性字段；
  hui_qian varchar2(512), --会签；个性字段；
  shen_he varchar2(512), --审核；个性字段；
  qian_fa varchar2(512), --签发；个性字段；
  ni_gao_userid NUMBER, --拟稿人id；个性字段；
  ni_gao_username varchar2(64), --拟稿人姓名，冗余字段；个性字段；
  ni_gao_date DATETIME,--拟稿年月日；个性字段；
  form_common_id number, --通用表单的id,
  PRIMARY KEY (ID)
);

COMMENT ON TABLE orggroup IS '分组表';
COMMENT ON TABLE orgpost IS '岗位表';

COMMIT ;
