DELETE FROM DIC_MODE WHERE DICTYPE = 'fwSecurityLevel';


DELETE  FROM  DIC_TYPE t WHERE exists(
    SELECT 1 FROM DIC_TYPE T2
      LEFT JOIN DIC_MODE m ON t2.DIC_MODE_ID =  m.ID
    WHERE T2.ID = t.ID AND m.DICTYPE ='fwSecurityLevel'
);

insert into DIC_MODE (SELECT JXWOAUniversalSeq.nextval,'fwSecurityLevel','1','发文定密等级',t.id from DIC_CATEGORY t WHERE t.NAME ='流程');
insert into DIC_TYPE (SELECT JXWOAUniversalSeq.nextval,'机密',NULL ,NULL ,NULL ,'1',t.id from DIC_MODE t WHERE t.dictype ='fwSecurityLevel');
insert into DIC_TYPE (SELECT JXWOAUniversalSeq.nextval,'秘密',NULL ,NULL ,NULL ,'1',t.id from DIC_MODE t WHERE t.dictype ='fwSecurityLevel');
COMMIT ;

alter table ORGDEPT alter SEQUENCEID rename to ORDER_NUM;
alter table ORGUSER alter SEQUENCEID rename to ORDER_NUM;
UPDATE  ORGUSER SET ORDER_NUM = id;
