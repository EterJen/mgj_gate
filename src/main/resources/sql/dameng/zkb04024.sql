DROP TABLE WF_FORM_JXWSJSHOUWEN;
--1.长城电子规范发文
CREATE TABLE WF_FORM_HJXGFFAWEN (
  ID                     NUMBER, --	主键
  RELATED_RECEIVE_DOC_ID NUMBER, --关联收文号；个性字段；
  SEND_TO_MAIN           VARCHAR2(512), --主送；个性字段；
  SEND_TO_CC             VARCHAR2(512), --抄送；个性字段；
  HE_GAO                 VARCHAR2(512), --核稿；个性字段；
  HUI_GAO                VARCHAR2(512), --会稿；个性字段；
  HUI_QIAN               VARCHAR2(512), --会签；个性字段；
  SHEN_HE                VARCHAR2(512), --审核；个性字段；
  QIAN_FA                VARCHAR2(512), --签发；个性字段；
  NI_GAO_USERID          NUMBER, --拟稿人id；个性字段；
  NI_GAO_USERNAME        VARCHAR2(64), --拟稿人姓名，冗余字段；个性字段；
  NI_GAO_DATE            DATETIME, --拟稿年月日；个性字段；
  FORM_COMMON_ID         NUMBER, --通用表单的id,
  PRIMARY KEY (ID)
);
COMMIT ;

COMMENT ON TABLE WF_FORM_HJXGFFAWEN IS '长城电子规范发文个性表单';
COMMENT ON COLUMN WF_FORM_HJXGFFAWEN.ID IS '主键';
COMMENT ON COLUMN WF_FORM_HJXGFFAWEN.RELATED_RECEIVE_DOC_ID IS '关联收文号';
COMMENT ON COLUMN WF_FORM_HJXGFFAWEN.SEND_TO_MAIN IS '主送';
COMMENT ON COLUMN WF_FORM_HJXGFFAWEN.SEND_TO_CC IS '抄送';
COMMENT ON COLUMN WF_FORM_HJXGFFAWEN.HE_GAO IS '核稿';
COMMENT ON COLUMN WF_FORM_HJXGFFAWEN.HUI_GAO IS '会稿';
COMMENT ON COLUMN WF_FORM_HJXGFFAWEN.HUI_QIAN IS '会签';
COMMENT ON COLUMN WF_FORM_HJXGFFAWEN.SHEN_HE IS '审核';
COMMENT ON COLUMN WF_FORM_HJXGFFAWEN.QIAN_FA IS '签发';
COMMENT ON COLUMN WF_FORM_HJXGFFAWEN.NI_GAO_USERID IS '拟稿人id';
COMMENT ON COLUMN WF_FORM_HJXGFFAWEN.NI_GAO_USERNAME IS '拟稿人姓名';
COMMENT ON COLUMN WF_FORM_HJXGFFAWEN.NI_GAO_DATE IS '拟稿日期';
COMMENT ON COLUMN WF_FORM_HJXGFFAWEN.FORM_COMMON_ID IS '公用表单ID';
COMMIT ;

/*{
"dbName":"dameng",
"pkStrategy":"Sequence",
"pkSequence":"JXWOAUniversalSeq",
"metaPackageList":[
{
"packageNameBase":"com.gwideal.core.forms",
"metaTableConfigs":[
 {"tableName":"wf_form_jxwdwshouwen","entityName":"FormJxwdwshouwen"}
]
}
]
}*/

