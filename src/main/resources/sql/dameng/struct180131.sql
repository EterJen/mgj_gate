drop table ORGUSER;
drop table ORGDEPT;
drop table ORGDU;
drop table ORGGROUP;
drop table ORGGU;
drop table ORGPOST;
drop table ORGPU;
drop table ORGROLE;
drop table ORGRU;
drop table MPSMODULE;
drop table MPSAVAILMODULE;


CREATE TABLE ORGUSER (
  ID            NUMBER, --	主键
  PKID          NUMBER, --	主键
  WORKCODE      VARCHAR2 (64), --
  SEQUENCEID    NUMBER, --
  USERNAME      VARCHAR2 (64), --	登录名
  PASSWORD      VARCHAR2 (64), --	密码密文
  NAME          VARCHAR2 (64), --	姓名
  GENDER        VARCHAR2 (10), --	性别
  LOGGINGON     NUMBER, --
  LOGGINGTIME   DATETIME, --	本次登录时间
  ONLEAVE       NUMBER, --
  TIMEOUT       NUMBER, --
  USERMODE      NUMBER, --	登录模式
  ALTERNATES    VARCHAR2 (64), --
  EMAIL         VARCHAR2 (64), --
  MOBILEPHONE   VARCHAR2 (64), --
  FLAG          NUMBER, --	是否可用
  GUI           NUMBER, --
  LASTLOGINIP   VARCHAR2 (64), --	上次登录地址
  LASTLOGINTIME DATETIME, --	上次登录时间
  PHOTOFILE_PATH VARCHAR2 (512), --原来是用另外一张表存储的CLOB字段，本次改造将把照片信息提出到文件系统中，数据库里面仅仅存储文件的路径
  PRIMARY KEY (ID)

);

COMMENT ON TABLE ORGUSER IS '用户表';
COMMENT ON COLUMN ORGUSER."ID" IS '主键';
COMMENT ON COLUMN ORGUSER."PKID" IS '原主键';
COMMENT ON COLUMN ORGUSER."WORKCODE" IS '工号';
COMMENT ON COLUMN ORGUSER."SEQUENCEID" IS '序列号?';
COMMENT ON COLUMN ORGUSER."USERNAME" IS '登录名';
COMMENT ON COLUMN ORGUSER."PASSWORD" IS '登录密码';
COMMENT ON COLUMN ORGUSER."NAME" IS '姓名';
COMMENT ON COLUMN ORGUSER."GENDER" IS '性别';
COMMENT ON COLUMN ORGUSER."LOGGINGON" IS '登录ip？';
COMMENT ON COLUMN ORGUSER."LOGGINGTIME" IS '当前登录时间';
COMMENT ON COLUMN ORGUSER."ONLEAVE" IS '休假？';
COMMENT ON COLUMN ORGUSER."TIMEOUT" IS '超时？';
COMMENT ON COLUMN ORGUSER."USERMODE" IS '登录模式';
COMMENT ON COLUMN ORGUSER."ALTERNATES" IS '?';
COMMENT ON COLUMN ORGUSER."EMAIL" IS '邮箱';
COMMENT ON COLUMN ORGUSER."MOBILEPHONE" IS '手机号码';
COMMENT ON COLUMN ORGUSER."FLAG" IS '用户有效标识';
COMMENT ON COLUMN ORGUSER."GUI" IS '?';
COMMENT ON COLUMN ORGUSER."LASTLOGINIP" IS '上次登录IP';
COMMENT ON COLUMN ORGUSER."LASTLOGINTIME" IS '上次登录时间';

CREATE TABLE ORGDEPT (
  ID          NUMBER, --  '主键',
  PKID        NUMBER, --	原主键
  PARENTID    NUMBER, --	父结点
  SEQUENCEID  NUMBER, --	序号
  NAME        VARCHAR2 (64), --	名称
  BRIEF       VARCHAR2 (6), --	简称
  LOCATION    VARCHAR2 (32), --
  CONTACT     VARCHAR2 (32), --
  PRINCIPAL   VARCHAR2 (50), --
  DESCRIPTION VARCHAR2 (128), --
  FLAG        NUMBER, --	是否可用
  ORDERBY        NUMBER, --	是否可用
  PRIMARY KEY (ID)
);
COMMENT ON TABLE ORGDEPT IS '部门表';
COMMENT ON COLUMN ORGDEPT."ID" IS '主键';
COMMENT ON COLUMN ORGDEPT."PKID" IS '原主键';
COMMENT ON COLUMN ORGDEPT."PARENTID" IS '父节点ID';
COMMENT ON COLUMN ORGDEPT."SEQUENCEID" IS '序号';
COMMENT ON COLUMN ORGDEPT."NAME" IS '名称';
COMMENT ON COLUMN ORGDEPT."BRIEF" IS '简称';
COMMENT ON COLUMN ORGDEPT."LOCATION" IS '地址?';
COMMENT ON COLUMN ORGDEPT."CONTACT" IS '联系方式?';
COMMENT ON COLUMN ORGDEPT."PRINCIPAL" IS '负责人?';
COMMENT ON COLUMN ORGDEPT."DESCRIPTION" IS '描述';
COMMENT ON COLUMN ORGDEPT."FLAG" IS '是否可用';
COMMENT ON COLUMN ORGDEPT."ORDERBY" IS '排序';

/**
 * @ eter created at 2018/1/8
 * 部门-用户关系表
 */
CREATE TABLE ORGDU (
  DEPTID  NUMBER, --	部门主键
  USERID NUMBER, --	人员主键
  ORDERID NUMBER --	排序
  --FOREIGN KEY (DEPTID) REFERENCES ORGDEPT (ID),
  --FOREIGN KEY (USERID) REFERENCES ORGUSER (ID)
);
COMMENT ON TABLE ORGDU IS '关系表：部门-用户';
COMMENT ON COLUMN ORGDU."DEPTID" IS '部门ID';
COMMENT ON COLUMN ORGDU."USERID" IS '用户ID';
COMMENT ON COLUMN ORGDU."ORDERID" IS '部门下用户排序';

/**
 * @ eter created at 2018/1/8
 * 组表
 */
CREATE TABLE ORGGROUP (
  ID          NUMBER, --	主键
  PKID        NUMBER, --	主键
  PARENTID    NUMBER, --	父结点
  NAME        VARCHAR2 (64), --	组名称
  CONTACT     VARCHAR2 (64), --
  PRINCIPAL   VARCHAR2 (64), --
  DESCRIPTION VARCHAR2 (128), --
  FLAG        NUMBER, --	是否可用
  PRIMARY KEY (ID)
);
COMMENT ON TABLE ORGGROUP IS '组表';
COMMENT ON COLUMN ORGGROUP."ID" IS '主键';
COMMENT ON COLUMN ORGGROUP."PKID" IS '原主键';
COMMENT ON COLUMN ORGGROUP."PARENTID" IS '父节点ID';
COMMENT ON COLUMN ORGGROUP."NAME" IS '组名';
COMMENT ON COLUMN ORGGROUP."CONTACT" IS '联系方式';
COMMENT ON COLUMN ORGGROUP."PRINCIPAL" IS '负责人';
COMMENT ON COLUMN ORGGROUP."DESCRIPTION" IS '描述';
COMMENT ON COLUMN ORGGROUP."FLAG" IS '可用标识';

/**
 * @ eter created at 2018/1/8
 * 组-用户关系表
 */
CREATE TABLE ORGGU (
  GROUPID NUMBER, --	组主键
  USERID  NUMBER --	人员主键
  --FOREIGN KEY (GROUPID) REFERENCES ORGGROUP (ID),
  --FOREIGN KEY (USERID) REFERENCES ORGUSER (ID)
);
COMMENT ON TABLE ORGGU IS '关系表：组-用户';
COMMENT ON COLUMN ORGGU."GROUPID" IS '组ID';
COMMENT ON COLUMN ORGGU."USERID" IS '用户ID';


/**
 * @ eter created at 2018/1/8
 * 岗位表
 * 不建立中间表直接引用部门id
 */
CREATE TABLE ORGPOST (
  ID          NUMBER, --	主键
  PKID        NUMBER, --	主键
  DEPTID      NUMBER, --	部门主键
  NAME        VARCHAR2 (64), --	名称
  DESCRIPTION VARCHAR2 (128), --
  FLAG        NUMBER, --	是否可用
  ORDERBY     NUMBER,
  PRIMARY KEY (ID)
  --FOREIGN KEY (DEPTID) REFERENCES ORGDEPT (ID)
);
COMMENT ON TABLE ORGPOST IS '岗位表 关联部门主键';
COMMENT ON COLUMN ORGPOST."ID" IS '主键';
COMMENT ON COLUMN ORGPOST."PKID" IS '原主键';
COMMENT ON COLUMN ORGPOST."DEPTID" IS '部门ID';
COMMENT ON COLUMN ORGPOST."NAME" IS '岗位名';
COMMENT ON COLUMN ORGPOST."DESCRIPTION" IS '描述';
COMMENT ON COLUMN ORGPOST."FLAG" IS '可用标识';
COMMENT ON COLUMN ORGPOST."ORDERBY" IS '排序字段';

/**
 * @ eter created at 2018/1/8
 * 部门-岗位-用户关系表
 */;
CREATE TABLE ORGPU (
  POSTID NUMBER, --	岗位主键
  USERID NUMBER, --	人员主键
  DEPTID NUMBER,  --	部门主键 暂时无效 岗位表已关联部门表
  DPUORDERBY  NUMBER  --排序字段
  --FOREIGN KEY (POSTID) REFERENCES ORGPOST (ID),
  --FOREIGN KEY (DEPTID) REFERENCES ORGDEPT (ID),
  --FOREIGN KEY (USERID) REFERENCES ORGUSER (ID)
);
COMMENT ON TABLE ORGPU IS '关系表：部门-岗位-人员';
COMMENT ON COLUMN ORGPU."DEPTID" IS '部门ID';
COMMENT ON COLUMN ORGPU."POSTID" IS '岗位ID';
COMMENT ON COLUMN ORGPU."USERID" IS '人员ID';
COMMENT ON COLUMN ORGPU."DPUORDERBY" IS '部门岗位下用户排序';

/**
 * @ eter created at 2018/1/8
 * 角色表
 */
CREATE TABLE ORGROLE (
  ID          NUMBER, --	主键
  PKID        NUMBER, --	主键
  NAME        VARCHAR2 (64), --	角色名称
  DESCRIPTION VARCHAR2 (128), --
  FLAG        NUMBER, --	是否可用
  PRIMARY KEY (ID)
);
COMMENT ON TABLE ORGROLE IS '角色表';
COMMENT ON COLUMN ORGROLE."ID" IS '主键';
COMMENT ON COLUMN ORGROLE."PKID" IS '原主键';
COMMENT ON COLUMN ORGROLE."NAME" IS '角色名称';
COMMENT ON COLUMN ORGROLE."DESCRIPTION" IS '描述';
COMMENT ON COLUMN ORGROLE."FLAG" IS '可用标识';

/**
 * @ eter created at 2018/1/8
 * 角色-用户关系表
 */
CREATE TABLE ORGRU (
  ROLEID   NUMBER, --	角色主键
  USERID   NUMBER, --	人员主键
  ORDERNUM NUMBER -- 
  --FOREIGN KEY (ROLEID) REFERENCES ORGROLE (ID),
  --FOREIGN KEY (USERID) REFERENCES ORGUSER (ID)
);
COMMENT ON TABLE ORGRU IS '关系表：角色-人员';
COMMENT ON COLUMN ORGRU."ROLEID" IS '角色ID';
COMMENT ON COLUMN ORGRU."USERID" IS '用户ID';


/**
 * @ eter created at 2018/1/24
 * 功能模块表
 */
CREATE TABLE MPSMODULE (
  ID          NUMBER, --  主键,新增的主键列
  PKCODE      VARCHAR2 (128), --	原主键,用的varchar
  TITLE       VARCHAR2 (50), --	模块标题
  ICON        VARCHAR2 (128), --图标
  ACTIONURL   VARCHAR2 (128), --相对URL
  TARGETFRAME VARCHAR2 (512),
  DESCRIPTION VARCHAR2 (512),
  FLAG  VARCHAR2 (10), 
  ICONFOCUS  VARCHAR2 (128),
  ICONSELECT  VARCHAR2 (128),
  PARENTID    NUMBER, --	父结点
  PRIMARY KEY (ID)
);
COMMENT ON TABLE MPSMODULE IS '功能模块表';
COMMENT ON COLUMN MPSMODULE."ID" IS '主键';
COMMENT ON COLUMN MPSMODULE."PKCODE" IS '原主键';
COMMENT ON COLUMN MPSMODULE."TITLE" IS '模块标题';
COMMENT ON COLUMN MPSMODULE."ACTIONURL" IS '相对URL';
COMMENT ON COLUMN MPSMODULE."PARENTID" IS '父id';

/**
 * @ eter created at 2018/1/24
 * 用户模块权限关系授权表
 */
CREATE TABLE MPSAVAILMODULE (
  ELEMENTID      NUMBER, --	表示授权对象的ID，按照elementid所指示的对象类型，表示人员、角色、部门、岗位表中一个对象的ID
  ELEMENTTYPE    VARCHAR2 (50), --	范围（U,R,D,P） 表示授权的对象类型是 人员（U）角色（R）部门（D）岗位（P）
  MODULECODE     NUMBER, --mpsmodule表内一个对象的主键值
  FLAG           VARCHAR2 (10),
  MPSMODULE_ID   NUMBER,
  PRIMARY KEY (ELEMENTID,ELEMENTTYPE,MPSMODULE_ID)
);
COMMENT ON TABLE MPSAVAILMODULE IS '用户模块权限关系授权表';
COMMENT ON COLUMN MPSAVAILMODULE."ELEMENTID" IS '元素类型，范围（U,R,D,P）';
COMMENT ON COLUMN MPSAVAILMODULE."ELEMENTTYPE" IS 'elementid所指示的对象类型，表示人员、角色、部门、岗位表中一个对象的ID';
COMMENT ON COLUMN MPSAVAILMODULE."MODULECODE" IS 'mpsmodule表内一个对象的主键值';




