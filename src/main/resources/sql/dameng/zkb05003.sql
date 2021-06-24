CREATE TABLE WF_FORM_JYWJJ ( -- 中央文件（甲）
  ID                  NUMBER, --	主键
  RECEIVE_SERIAL_NUM  VARCHAR2(512), --收文编号
  RECEIVE_DATE        DATETIME, --收文日期
  INCOMING_NUM        NUMBER, --收文分数
  INCOMING_ZI_HAO     VARCHAR2(512), --来文字号；
  INCOMING_DOC_DEPART VARCHAR2(512), --来文单位；
  ATTACH_DESC         VARCHAR2(512), --附件说明
  READ_OPINION        VARCHAR2(1024), --阅示意见
  TODO_OPINION        VARCHAR2(1024), --办理意见
  REGISTER_USER       VARCHAR2(255), --登记人
  REGISTER_DATE       DATETIME, --登记时间
  FORM_COMMON_ID      NUMBER, --通用表单的id,
  PRIMARY KEY (ID)
);
COMMENT ON TABLE WF_FORM_JYWJJ IS '中央文件（甲）收文个性表单';
COMMENT ON COLUMN WF_FORM_JYWJJ.ID IS '主键';
COMMENT ON COLUMN WF_FORM_JYWJJ.RECEIVE_SERIAL_NUM IS '收文编号';
COMMENT ON COLUMN WF_FORM_JYWJJ.RECEIVE_DATE IS '收文日期';
COMMENT ON COLUMN WF_FORM_JYWJJ.INCOMING_NUM IS '收文分数';
COMMENT ON COLUMN WF_FORM_JYWJJ.INCOMING_ZI_HAO IS '来文字号';
COMMENT ON COLUMN WF_FORM_JYWJJ.INCOMING_DOC_DEPART IS '来文单位';
COMMENT ON COLUMN WF_FORM_JYWJJ.ATTACH_DESC IS '附件说明';
COMMENT ON COLUMN WF_FORM_JYWJJ.READ_OPINION IS '阅示意见';
COMMENT ON COLUMN WF_FORM_JYWJJ.TODO_OPINION IS '办理意见';
COMMENT ON COLUMN WF_FORM_JYWJJ.REGISTER_USER IS '登记人';
COMMENT ON COLUMN WF_FORM_JYWJJ.REGISTER_DATE IS '登记时间';
COMMENT ON COLUMN WF_FORM_JYWJJ.FORM_COMMON_ID IS '通用表单的id';
COMMIT;


CREATE TABLE WF_FORM_JYWJY ( -- 市委文件（乙）
  ID                  NUMBER, --	主键
  RECEIVE_SERIAL_NUM  VARCHAR2(512), --收文编号
  RECEIVE_DATE        DATETIME, --收文日期
  INCOMING_NUM        NUMBER, --收文分数
  INCOMING_ZI_HAO     VARCHAR2(512), --来文字号；
  INCOMING_DOC_DEPART VARCHAR2(512), --来文单位；
  ATTACH_DESC         VARCHAR2(512), --附件说明
  READ_OPINION        VARCHAR2(1024), --阅示意见
  TODO_OPINION        VARCHAR2(1024), --办理意见
  REGISTER_USER       VARCHAR2(255), --登记人
  REGISTER_DATE       DATETIME, --登记时间
  FORM_COMMON_ID      NUMBER, --通用表单的id,
  PRIMARY KEY (ID)
);
COMMENT ON TABLE WF_FORM_JYWJY IS '市委文件（乙）收文个性表单';
COMMENT ON COLUMN WF_FORM_JYWJY.ID IS '主键';
COMMENT ON COLUMN WF_FORM_JYWJY.RECEIVE_SERIAL_NUM IS '收文编号';
COMMENT ON COLUMN WF_FORM_JYWJY.RECEIVE_DATE IS '收文日期';
COMMENT ON COLUMN WF_FORM_JYWJY.INCOMING_NUM IS '收文分数';
COMMENT ON COLUMN WF_FORM_JYWJY.INCOMING_ZI_HAO IS '来文字号';
COMMENT ON COLUMN WF_FORM_JYWJY.INCOMING_DOC_DEPART IS '来文单位';
COMMENT ON COLUMN WF_FORM_JYWJY.ATTACH_DESC IS '附件说明';
COMMENT ON COLUMN WF_FORM_JYWJY.READ_OPINION IS '阅示意见';
COMMENT ON COLUMN WF_FORM_JYWJY.TODO_OPINION IS '办理意见';
COMMENT ON COLUMN WF_FORM_JYWJY.REGISTER_USER IS '登记人';
COMMENT ON COLUMN WF_FORM_JYWJY.REGISTER_DATE IS '登记时间';
COMMENT ON COLUMN WF_FORM_JYWJY.FORM_COMMON_ID IS '通用表单的id';
COMMIT;


CREATE TABLE WF_FORM_JYWJB ( -- 市府文件（丙）
  ID                  NUMBER, --	主键
  RECEIVE_SERIAL_NUM  VARCHAR2(512), --收文编号
  RECEIVE_DATE        DATETIME, --收文日期
  INCOMING_NUM        NUMBER, --收文分数
  INCOMING_ZI_HAO     VARCHAR2(512), --来文字号；
  INCOMING_DOC_DEPART VARCHAR2(512), --来文单位；
  ATTACH_DESC         VARCHAR2(512), --附件说明
  READ_OPINION        VARCHAR2(1024), --阅示意见
  TODO_OPINION        VARCHAR2(1024), --办理意见
  REGISTER_USER       VARCHAR2(255), --登记人
  REGISTER_DATE       DATETIME, --登记时间
  FORM_COMMON_ID      NUMBER, --通用表单的id,
  PRIMARY KEY (ID)
);
COMMENT ON TABLE WF_FORM_JYWJB IS '市府文件（丙）收文个性表单';
COMMENT ON COLUMN WF_FORM_JYWJB.ID IS '主键';
COMMENT ON COLUMN WF_FORM_JYWJB.RECEIVE_SERIAL_NUM IS '收文编号';
COMMENT ON COLUMN WF_FORM_JYWJB.RECEIVE_DATE IS '收文日期';
COMMENT ON COLUMN WF_FORM_JYWJB.INCOMING_NUM IS '收文分数';
COMMENT ON COLUMN WF_FORM_JYWJB.INCOMING_ZI_HAO IS '来文字号';
COMMENT ON COLUMN WF_FORM_JYWJB.INCOMING_DOC_DEPART IS '来文单位';
COMMENT ON COLUMN WF_FORM_JYWJB.ATTACH_DESC IS '附件说明';
COMMENT ON COLUMN WF_FORM_JYWJB.READ_OPINION IS '阅示意见';
COMMENT ON COLUMN WF_FORM_JYWJB.TODO_OPINION IS '办理意见';
COMMENT ON COLUMN WF_FORM_JYWJB.REGISTER_USER IS '登记人';
COMMENT ON COLUMN WF_FORM_JYWJB.REGISTER_DATE IS '登记时间';
COMMENT ON COLUMN WF_FORM_JYWJB.FORM_COMMON_ID IS '通用表单的id';
COMMIT;

CREATE TABLE WF_FORM_JYWJG ( -- 国务院文件（国）
  ID                  NUMBER, --	主键
  RECEIVE_SERIAL_NUM  VARCHAR2(512), --收文编号
  RECEIVE_DATE        DATETIME, --收文日期
  INCOMING_NUM        NUMBER, --收文分数
  INCOMING_ZI_HAO     VARCHAR2(512), --来文字号；
  INCOMING_DOC_DEPART VARCHAR2(512), --来文单位；
  ATTACH_DESC         VARCHAR2(512), --附件说明
  READ_OPINION        VARCHAR2(1024), --阅示意见
  TODO_OPINION        VARCHAR2(1024), --办理意见
  REGISTER_USER       VARCHAR2(255), --登记人
  REGISTER_DATE       DATETIME, --登记时间
  FORM_COMMON_ID      NUMBER, --通用表单的id,
  PRIMARY KEY (ID)
);
COMMENT ON TABLE WF_FORM_JYWJG IS '国务院文件（国）收文个性表单';
COMMENT ON COLUMN WF_FORM_JYWJG.ID IS '主键';
COMMENT ON COLUMN WF_FORM_JYWJG.RECEIVE_SERIAL_NUM IS '收文编号';
COMMENT ON COLUMN WF_FORM_JYWJG.RECEIVE_DATE IS '收文日期';
COMMENT ON COLUMN WF_FORM_JYWJG.INCOMING_NUM IS '收文分数';
COMMENT ON COLUMN WF_FORM_JYWJG.INCOMING_ZI_HAO IS '来文字号';
COMMENT ON COLUMN WF_FORM_JYWJG.INCOMING_DOC_DEPART IS '来文单位';
COMMENT ON COLUMN WF_FORM_JYWJG.ATTACH_DESC IS '附件说明';
COMMENT ON COLUMN WF_FORM_JYWJG.READ_OPINION IS '阅示意见';
COMMENT ON COLUMN WF_FORM_JYWJG.TODO_OPINION IS '办理意见';
COMMENT ON COLUMN WF_FORM_JYWJG.REGISTER_USER IS '登记人';
COMMENT ON COLUMN WF_FORM_JYWJG.REGISTER_DATE IS '登记时间';
COMMENT ON COLUMN WF_FORM_JYWJG.FORM_COMMON_ID IS '通用表单的id';
COMMIT;

DELETE FROM WF_PROCESS_DEF_VERSION;

INSERT INTO WF_PROCESS_DEF_VERSION (ID, PROCESS_DEF_ID, VERSION, FILE_NAME, FILE_PATH, IS_ACTIVE, DESCRIPTION) VALUES (109706, 109705, 425, '754ef89b-08ba-48b6-bb1d-587f9eb14eb7', '754ef89b-08ba-48b6-bb1d-587f9eb14eb7.xml', '1', '长城电子发');
INSERT INTO WF_PROCESS_DEF_VERSION (ID, PROCESS_DEF_ID, VERSION, FILE_NAME, FILE_PATH, IS_ACTIVE, DESCRIPTION) VALUES (109895, 109894, 425, '885234f2-6831-4306-8af7-5cb6b9294aa3', '885234f2-6831-4306-8af7-5cb6b9294aa3.xml', '1', '长城电子党委发文');
INSERT INTO WF_PROCESS_DEF_VERSION (ID, PROCESS_DEF_ID, VERSION, FILE_NAME, FILE_PATH, IS_ACTIVE, DESCRIPTION) VALUES (109902, 109901, 425, '77c0228b-2377-4bdc-b45e-f00548eba062', '77c0228b-2377-4bdc-b45e-f00548eba062.xml', '1', '国防办发文');
INSERT INTO WF_PROCESS_DEF_VERSION (ID, PROCESS_DEF_ID, VERSION, FILE_NAME, FILE_PATH, IS_ACTIVE, DESCRIPTION) VALUES (109904, 109903, 425, '59a904c2-a2e1-435f-98f2-a81a115ee02d', '59a904c2-a2e1-435f-98f2-a81a115ee02d.xml', '1', '长城电子党委收文');
INSERT INTO WF_PROCESS_DEF_VERSION (ID, PROCESS_DEF_ID, VERSION, FILE_NAME, FILE_PATH, IS_ACTIVE, DESCRIPTION) VALUES (109907, 109906, 425, '356ebec5-3818-44b0-8f28-78a5f4386a52', '356ebec5-3818-44b0-8f28-78a5f4386a52.xml', '1', '长城电子收文');
INSERT INTO WF_PROCESS_DEF_VERSION (ID, PROCESS_DEF_ID, VERSION, FILE_NAME, FILE_PATH, IS_ACTIVE, DESCRIPTION) VALUES (109911, 109910, 425, 'f8fdc476-3f7d-481a-be38-4e498a01f53b', 'f8fdc476-3f7d-481a-be38-4e498a01f53b.xml', '1', '长城电子信函收文');
INSERT INTO WF_PROCESS_DEF_VERSION (ID, PROCESS_DEF_ID, VERSION, FILE_NAME, FILE_PATH, IS_ACTIVE, DESCRIPTION) VALUES (110081, 110069, 425, '8220757b-6813-4a5f-8f00-7cafded79a12', '8220757b-6813-4a5f-8f00-7cafded79a12.xml', '1', '长城电子规范发文');
INSERT INTO WF_PROCESS_DEF_VERSION (ID, PROCESS_DEF_ID, VERSION, FILE_NAME, FILE_PATH, IS_ACTIVE, DESCRIPTION) VALUES (110122, 110070, 425, 'f51296c1-eac4-4c50-8b62-2f96d967a627', 'f51296c1-eac4-4c50-8b62-2f96d967a627.xml', '1', '中央文件（甲）');
INSERT INTO WF_PROCESS_DEF_VERSION (ID, PROCESS_DEF_ID, VERSION, FILE_NAME, FILE_PATH, IS_ACTIVE, DESCRIPTION) VALUES (110123, 110071, 425, '4c293291-d8fa-45e2-9199-0748245dda70', '4c293291-d8fa-45e2-9199-0748245dda70.xml', '1', '市委文件（乙）');
INSERT INTO WF_PROCESS_DEF_VERSION (ID, PROCESS_DEF_ID, VERSION, FILE_NAME, FILE_PATH, IS_ACTIVE, DESCRIPTION) VALUES (110124, 110072, 425, '50716f34-f8ac-424d-b754-22d000a03d0f', '50716f34-f8ac-424d-b754-22d000a03d0f.xml', '1', '市府文件（丙）');
INSERT INTO WF_PROCESS_DEF_VERSION (ID, PROCESS_DEF_ID, VERSION, FILE_NAME, FILE_PATH, IS_ACTIVE, DESCRIPTION) VALUES (110125, 110073, 425, 'd5e1d453-8b80-4881-ab00-3365753606e3', 'd5e1d453-8b80-4881-ab00-3365753606e3.xml', '1', '国务院文件（国）');
COMMIT ;

INSERT INTO WF_PROCESS_DEF_MANAGE (ID, NAME, DESCRIPTION, ORDER_NUM, FORM_DEF_ID) VALUES (109705, '长城电子发', '长城电子发文', 1, 'fawen');
INSERT INTO WF_PROCESS_DEF_MANAGE (ID, NAME, DESCRIPTION, ORDER_NUM, FORM_DEF_ID) VALUES (110069, '长城电子规范发文', '长城电子规范发文', 2, 'hjxgffawen');
INSERT INTO WF_PROCESS_DEF_MANAGE (ID, NAME, DESCRIPTION, ORDER_NUM, FORM_DEF_ID) VALUES (109894, '长城电子党委发文', '长城电子党工发文', 3, 'jxwdwfawen');
INSERT INTO WF_PROCESS_DEF_MANAGE (ID, NAME, DESCRIPTION, ORDER_NUM, FORM_DEF_ID) VALUES (109901, '国防办发文', '沪府国防办发', 4, 'gfkgbfawen');
INSERT INTO WF_PROCESS_DEF_MANAGE (ID, NAME, DESCRIPTION, ORDER_NUM, FORM_DEF_ID) VALUES (109903, '长城电子党委收文', '长城电子党工收文', 6, 'jxwdwshouwen');
INSERT INTO WF_PROCESS_DEF_MANAGE (ID, NAME, DESCRIPTION, ORDER_NUM, FORM_DEF_ID) VALUES (109906, '长城电子收', '长城电子收', 5, 'jxwshouwen');
INSERT INTO WF_PROCESS_DEF_MANAGE (ID, NAME, DESCRIPTION, ORDER_NUM, FORM_DEF_ID) VALUES (109910, '信函', '信函', 11, 'jxwxinhan');
INSERT INTO WF_PROCESS_DEF_MANAGE (ID, NAME, DESCRIPTION, ORDER_NUM, FORM_DEF_ID) VALUES (110070, '中央文件（甲）', '机要文件甲', 7, 'jywjj');
INSERT INTO WF_PROCESS_DEF_MANAGE (ID, NAME, DESCRIPTION, ORDER_NUM, FORM_DEF_ID) VALUES (110071, '市委文件（乙）', '机要文件乙', 8, 'jywjy');
INSERT INTO WF_PROCESS_DEF_MANAGE (ID, NAME, DESCRIPTION, ORDER_NUM, FORM_DEF_ID) VALUES (110072, '市府文件（丙）', '机要文件丙', 9, 'jywjb');
INSERT INTO WF_PROCESS_DEF_MANAGE (ID, NAME, DESCRIPTION, ORDER_NUM, FORM_DEF_ID) VALUES (110073, '国务院文件（国）', '机要文件国', 10, 'jywjg');
COMMIT ;