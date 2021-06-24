DELETE FROM dic_mode WHERE  dictype = 'personalBasisSetting';
DELETE FROM dic_type WHERE  ename = 'aegentSetting';
DELETE FROM dic_type WHERE  ename = 'pwdSetting';

insert into DIC_MODE (SELECT JXWOAUniversalSeq.nextval,'personalBasisSetting','1','个人基础配置',t.id,'1' from DIC_CATEGORY t WHERE t.NAME ='系统配置');
insert into DIC_TYPE (SELECT JXWOAUniversalSeq.nextval,'代理人','配置代理人','aegentSetting' ,'coreHome.personBasisSetting.agentSetting' ,'1',t.id from DIC_MODE t WHERE t.dictype ='personalBasisSetting');
insert into DIC_TYPE (SELECT JXWOAUniversalSeq.nextval,'个人信息维护','修改个人信息','userInfoModify' ,'coreHome.personBasisSetting.userInfoModify' ,'1',t.id from DIC_MODE t WHERE t.dictype ='personalBasisSetting');
COMMIT;


create table "orgua"
(
"user_id" number not null,
"agent_id" number not null
);
COMMIT;
comment on column "orgua"."user_id" is '用户id';
comment on column "orgua"."agent_id" is '代理人id';
COMMIT ;

UPDATE mpsmodule set ng_state ='coreHome.' || targetframe;
UPDATE mpsmodule set ng_state ='coreHome.workflowDef' WHERE title = '已办流程';
update mpsmodule set flag = '1',ng_state = 'coreHome.personBasisSetting'  where title = '基础配置';
COMMIT ;
