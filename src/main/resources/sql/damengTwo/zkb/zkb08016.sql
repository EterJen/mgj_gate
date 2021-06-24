DELETE FROM dic_mode WHERE  dictype = 'personalBasisSetting';
DELETE FROM dic_type WHERE  ename = 'aegentSetting';
DELETE FROM dic_type WHERE  ename = 'pwdSetting';
DELETE FROM dic_type WHERE  ename = 'userInfoModify';
DELETE FROM dic_type WHERE  ename = 'autoReceiveTask';

insert into DIC_MODE (SELECT JXWOAUniversalSeq.nextval,'personalBasisSetting','1','个人基础配置',t.id,'1' from DIC_CATEGORY t WHERE t.NAME ='系统配置');
insert into DIC_TYPE (SELECT JXWOAUniversalSeq.nextval,'代理人','配置代理人','aegentSetting' ,'coreHome.personBasisSetting.agentSetting' ,'1',t.id from DIC_MODE t WHERE t.dictype ='personalBasisSetting');
insert into DIC_TYPE (SELECT JXWOAUniversalSeq.nextval,'口令设置','修改口令','userInfoModify' ,'coreHome.personBasisSetting.userInfoModify' ,'1',t.id from DIC_MODE t WHERE t.dictype ='personalBasisSetting');
insert into DIC_TYPE (SELECT JXWOAUniversalSeq.nextval,'自动接收代办任务','自动接收代办任务','autoReceiveTask' ,'coreHome.personBasisSetting.autoReceiveTask' ,'1',t.id from DIC_MODE t WHERE t.dictype ='personalBasisSetting');

alter table orguser add (auto_receive_task  varchar2(10));
COMMENT ON COLUMN orguser.auto_receive_task IS '个人自动接收代办任务标记';
UPDATE orguser set auto_receive_task = '0';
UPDATE orguser set password = '6A5167CEE2856F7797E93CCB35CC869B';

-- SELECT  * FROM MPSMODULE WHERE title = '领导设置';
INSERT INTO MPSMODULE(id, pkcode, title, flag ,  parentid, ng_state, title_menu_show)
(select JXWOAUniversalSeq.nextval,'05010405','领导设置',1,	m.id,'coreHome.leaderMng','领导设置' from MPSMODULE m where m.title_menu_show='组织管理');

insert into MPSAVAILMODULE (ELEMENTID,ELEMENTTYPE,FLAG,modulecode,mpsmodule_id)(select 3001,'R','1',id,id from MPSMODULE where title='字典管理');
insert into MPSAVAILMODULE (ELEMENTID,ELEMENTTYPE,FLAG,modulecode,mpsmodule_id)(select 3001,'R','1',id,id from MPSMODULE where title='系统字典');
insert into MPSAVAILMODULE (ELEMENTID,ELEMENTTYPE,FLAG,modulecode,mpsmodule_id)(select 3001,'R','1',id ,id from MPSMODULE where title='领导设置');
COMMIT;

DELETE FROM DIC_MODE WHERE dictype = 'leaderType';
INSERT INTO DIC_MODE(id, dictype, split_mode, cname, category_id, flag)
    (SELECT JXWOAUniversalSeq.nextval,'leaderType',NULL ,'领导分类','33',1);
INSERT INTO DIC_TYPE (id, name, description, ename, ext, flag, dic_mode_id)
    (SELECT JXWOAUniversalSeq.nextval,'长城电子领导',NULL ,'jxwLeader','84',1,m.id FROM DIC_MODE m WHERE dictype = 'leaderType');
INSERT INTO DIC_TYPE (id, name, description, ename, ext, flag, dic_mode_id)
    (SELECT JXWOAUniversalSeq.nextval,'长城电子党委领导',NULL ,'jxdwLeader','75',1,m.id FROM DIC_MODE m WHERE dictype = 'leaderType');
COMMIT ;

/*领导分管部门中间表*/
create TABLE "org_l_d" (
    "user_id" NUMBER,
    "dept_id" NUMBER,
    "order_num" NUMBER
);
COMMENT ON TABLE org_l_d IS '领导分管部门中间表';
COMMENT ON COLUMN org_l_d.user_id IS '领导id';
COMMENT ON COLUMN org_l_d.dept_id IS '分管部门id';
COMMENT ON COLUMN org_l_d.order_num IS '排序字段';

CREATE or replace unique index uidx_org_l_d_ldid on org_l_d (user_id, dept_id);

COMMIT;
/*select *
from user_tab_comments
where Table_Name='org_l_d'
order by Table_Name;

--获取字段注释：

select *
from user_col_comments
where Table_Name='org_l_d'
order by column_name*/

