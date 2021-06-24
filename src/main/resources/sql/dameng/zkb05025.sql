CREATE or replace INDEX u_idx_n  ON ORGUSER (USERNAME);

-- UPDATE orguser SET USERNAME = 'A' WHERE USERNAME = 'Administrator';
UPDATE orguser SET PASSWORD = '6A5167CEE2856F7797E93CCB35CC869B';

DELETE FROM DIC_MODE
WHERE DICTYPE = 'fwSecurityLevel';



DELETE  FROM  DIC_TYPE t WHERE exists(
    SELECT 1 FROM DIC_TYPE T2
      LEFT JOIN DIC_MODE m ON t2.DIC_MODE_ID =  m.ID
    WHERE T2.ID = t.ID AND m.DICTYPE ='fwSecurityLevel'
);

insert into DIC_MODE (SELECT JXWOAUniversalSeq.nextval,'fwSecurityLevel','1','发文定密等级',t.id,'1' from DIC_CATEGORY t WHERE t.NAME ='流程');
insert into DIC_TYPE (SELECT JXWOAUniversalSeq.nextval,'机密',NULL ,NULL ,NULL ,'1',t.id from DIC_MODE t WHERE t.dictype ='fwSecurityLevel');
insert into DIC_TYPE (SELECT JXWOAUniversalSeq.nextval,'秘密',NULL ,NULL ,NULL ,'1',t.id from DIC_MODE t WHERE t.dictype ='fwSecurityLevel');
commit