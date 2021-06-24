CREATE TABLE attachment(
	 ID            NUMBER, --	主键
	filename varchar2(50) ,
	url varchar2(100) ,
	FLAG  NUMBER,
	create_time DATETIME,--创建时间
    last_updated_time DATETIME,--最新更新时间,
	PRIMARY KEY (ID)
);
COMMENT ON TABLE attachment IS '附件表';
COMMENT ON COLUMN attachment."ID" IS '主键';
COMMENT ON COLUMN attachment."filename" IS '文件名称';
COMMENT ON COLUMN attachment."url" IS '文件全路径';
COMMENT ON COLUMN attachment."FLAG" IS '是否可用';
COMMENT ON COLUMN attachment."create_time" IS '创建时间';
COMMENT ON COLUMN attachment."last_updated_time" IS '最新更新时间';

--附件中间表
 CREATE TABLE middle_attachment
(
  relationId           NUMBER,         
  attachmentId         NUMBER, 
  type           VARCHAR2(50)
  
);