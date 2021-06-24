CREATE TABLE DIC_CATEGORY ( --字典分类
  ID   NUMBER, -- 主键
  NAME    VARCHAR2 (255), -- 名称
  DESCRIPTION      VARCHAR2 (255), --描述
  PRIMARY KEY (ID)
);

CREATE TABLE DIC_MODE ( --字典二级分类
  ID   NUMBER, -- 主键
  dictype      VARCHAR2 (255), --分类名 英文字母
  SPLIT_MODE   VARCHAR2 (10), --未知用途
  CNAME      VARCHAR2 (255), --	中文名
  CATEGORY_ID  number, --DIC_CATEGORY id
  PRIMARY KEY (ID)
);

CREATE TABLE DIC_TYPE ( --字典项
  ID   NUMBER, -- 主键
  NAME      VARCHAR2 (255), --中文名
  DESCRIPTION VARCHAR2 (512), --描述
  ENAME VARCHAR2 (255), --英文名
  ext  VARCHAR2 (50),
  FLAG  VARCHAR2(10), --有效标记
  DIC_MODE_id  NUMBER ,--字典二级分类 id
  PRIMARY KEY (ID)
);

COMMIT ;

insert into DIC_CATEGORY (SELECT t.* from EITC09.DICCATEGORY t);
COMMIT ;
insert into DIC_MODE  (SELECT JXWOAUniversalSeq.nextval,t.* from EITC09.DICMODE t);
COMMIT ;
insert into DIC_TYPE  (
SELECT JXWOAUniversalSeq.nextval,
t.NAME,
t.DESCRIPTION,
t.ENAME,
t.EXT,
t.FLAG,
b.id
from EITC09.DICTYPE t
LEFT JOIN DIC_MODE b ON t.DICTYPE = b.dictype);
COMMIT ;

/*测试文种*/
SELECT a.ID,a.NAME,b.ID,b.dictype,b.CNAME,c.ID,c.NAME
FROM DIC_CATEGORY a
LEFT JOIN DIC_MODE b ON  a.ID = b.CATEGORY_ID
LEFT JOIN DIC_TYPE c ON  b.ID = c.DIC_MODE_ID
WHERE b.CNAME = '不予公开理由';

SELECT * FROM DIC_TYPE WHERE
NAME = '个人隐私'

