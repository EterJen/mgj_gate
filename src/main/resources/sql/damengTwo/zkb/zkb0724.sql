delete from orguser where  id in (3000,3001,3002);
delete from orgrole where id in (3000,3001,3002,3003);
delete from orgru where USERID in (3000,3001,3002,3003);
delete from MPSAVAILMODULE where ELEMENTID in (3001,3002,3003);
COMMIT ;

alter table mpsmodule add (ng_state VARCHAR2(50));
COMMENT ON COLUMN mpsmodule.ng_state IS '基于anjularjs的路由地址';
UPDATE mpsmodule SET ng_state  = 'coreHome.todoList' WHERE title = '待办事宜';
UPDATE mpsmodule SET ng_state  = 'coreHome.auditInfoList' WHERE title = '日志管理';
UPDATE mpsmodule SET ng_state  = 'coreHome.moduleAuthManageList' WHERE title = '模块授权';
UPDATE mpsmodule SET ng_state  = 'coreHome.userManageList' WHERE title = '人员';
COMMIT ;


/*
建立安全管理用户
假设用户表中 3000 - 3500 id 为系统预留*/
insert into orguser (id,username,password,name,usermode,flag) values (3000,'sysMgr','6A5167CEE2856F7797E93CCB35CC869B','系统管理员',3,1);
insert into orguser (id,username,password,name,usermode,flag) values (3001,'securityMgr','6A5167CEE2856F7797E93CCB35CC869B','安全管理员',3,1);
insert into orguser (id,username,password,name,usermode,flag) values (3002,'auditMgr','6A5167CEE2856F7797E93CCB35CC869B','审计管理员',3,1);
commit ;



/*
新建涉密 用户透明角色
用户在系统操作中透明
假设角色表中 3000 - 3500 id 为系统预留*/
insert into orgrole (id, name, description, flag) values (3000,'relateSecurity','涉密透明用户',0);
commit ;


/*用户禁用被查看标记*/
alter table orguser add (dis_show_role VARCHAR2(50));
COMMENT ON COLUMN orguser.dis_show_role IS '用户无权查看对应角色下的用户';
UPDATE orguser SET dis_show_role  = 3000; --系统管理账户对所有用户不可视
COMMIT ;


/*
新建三类系统管理角色
假设角色表中 3000 - 3500 id 为系统预留*/
insert into orgrole (id, name, description, flag) values (3001,'sysMgt','系统管理员',0);
insert into MPSAVAILMODULE (ELEMENTID,ELEMENTTYPE,FLAG,modulecode,mpsmodule_id)(select 3001,'R','1',id,id from MPSMODULE where title='系统');
insert into MPSAVAILMODULE (ELEMENTID,ELEMENTTYPE,FLAG,modulecode,mpsmodule_id)(select 3001,'R','1',id,id from MPSMODULE where title='组织管理');
insert into MPSAVAILMODULE (ELEMENTID,ELEMENTTYPE,FLAG,modulecode,mpsmodule_id)(select 3001,'R','1',id,id from MPSMODULE where title='人员');
insert into MPSAVAILMODULE (ELEMENTID,ELEMENTTYPE,FLAG,modulecode,mpsmodule_id)(select 3001,'R','1',id,id from MPSMODULE where title='部门');
insert into MPSAVAILMODULE (ELEMENTID,ELEMENTTYPE,FLAG,modulecode,mpsmodule_id)(select 3001,'R','1',id,id  from MPSMODULE where title='角色');
insert into MPSAVAILMODULE (ELEMENTID,ELEMENTTYPE,FLAG,modulecode,mpsmodule_id)(select 3001,'R','1',id ,id from MPSMODULE where title='岗位');
insert into MPSAVAILMODULE (ELEMENTID,ELEMENTTYPE,FLAG,modulecode,mpsmodule_id)(select 3001,'R','1',id ,id from MPSMODULE where title='流程管理');
insert into MPSAVAILMODULE (ELEMENTID,ELEMENTTYPE,FLAG,modulecode,mpsmodule_id)(select 3001,'R','1',id ,id from MPSMODULE where title='表单定义');
insert into MPSAVAILMODULE (ELEMENTID,ELEMENTTYPE,FLAG,modulecode,mpsmodule_id)(select 3001,'R','1',id ,id from MPSMODULE where title='模板管理');
insert into MPSAVAILMODULE (ELEMENTID,ELEMENTTYPE,FLAG,modulecode,mpsmodule_id)(select 3001,'R','1',id ,id from MPSMODULE where title='流程定制');

insert into orgrole (id, name, description, flag) values (3002,'securityMgt','安全管理员',0);
insert into MPSAVAILMODULE (ELEMENTID,ELEMENTTYPE,FLAG,modulecode,mpsmodule_id)(select 3002,'R','1',id ,id from MPSMODULE where title='系统');
insert into MPSAVAILMODULE (ELEMENTID,ELEMENTTYPE,FLAG,modulecode,mpsmodule_id)(select 3002,'R','1',id ,id from MPSMODULE where title='权限管理');
insert into MPSAVAILMODULE (ELEMENTID,ELEMENTTYPE,FLAG,modulecode,mpsmodule_id)(select 3002,'R','1',id ,id from MPSMODULE where title='模块授权');
insert into MPSAVAILMODULE (ELEMENTID,ELEMENTTYPE,FLAG,modulecode,mpsmodule_id)(select 3002,'R','1',id ,id from MPSMODULE where title='定密管理');
insert into MPSAVAILMODULE (ELEMENTID,ELEMENTTYPE,FLAG,modulecode,mpsmodule_id)(select 3002,'R','1',id ,id from MPSMODULE where title='运行管理');
insert into MPSAVAILMODULE (ELEMENTID,ELEMENTTYPE,FLAG,modulecode,mpsmodule_id)(select 3002,'R','1',id ,id from MPSMODULE where title='日志管理');
insert into MPSAVAILMODULE (ELEMENTID,ELEMENTTYPE,FLAG,modulecode,mpsmodule_id)(select 3002,'R','1',id ,id from MPSMODULE where title='岗位');

insert into orgrole (id, name, description, flag) values (3003,'auditMgt','审计管理员',0);
insert into MPSAVAILMODULE (ELEMENTID,ELEMENTTYPE,FLAG,modulecode,mpsmodule_id)(select 3003,'R','1',id ,id from MPSMODULE where title='系统');
insert into MPSAVAILMODULE (ELEMENTID,ELEMENTTYPE,FLAG,modulecode,mpsmodule_id)(select 3003,'R','1',id ,id from MPSMODULE where title='运行管理');
insert into MPSAVAILMODULE (ELEMENTID,ELEMENTTYPE,FLAG,modulecode,mpsmodule_id)(select 3003,'R','1',id ,id from MPSMODULE where title='日志管理');

/*角色下用户不可视 3000安全管理用户 */
INSERT INTO orgru (roleid, userid)  VALUES (3000,3000);
INSERT INTO orgru (roleid, userid)  VALUES (3000,3001);
INSERT INTO orgru (roleid, userid)  VALUES (3000,3002);

/*各安全管理用户进行分组 */
INSERT INTO orgru (roleid, userid)  VALUES (3001,3000);
INSERT INTO orgru (roleid, userid)  VALUES (3002,3001);
INSERT INTO orgru (roleid, userid)  VALUES (3003,3002);


commit ;