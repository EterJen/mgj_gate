alter table orgpost add (is_leader varchar2(10));
comment on column "orgpost"."is_leader" is '岗位是否是领导标记 区别于特殊岗位（如定密负责人）';
commit;
UPDATE orgpost SET is_leader = '0';
UPDATE orgpost SET is_leader = '1' WHERE name LIKE '%主任%' OR  name LIKE '%处长%';
commit;

UPDATE MPSMODULE SET ng_state = 'coreHome.doneList' WHERE title = '已办流程';
alter table wf_form_action add (action_type varchar2(50));
comment on column "wf_form_action"."action_type" is '动作类型(历史查看操作 代办任务操作)';
COMMIT;
UPDATE wf_form_action SET  action_type = 'currentTaskDeal';
COMMIT;
-- UPDATE wf_form_action SET  action_type = 'hisView';
DELETE FROM MPSMODULE WHERE  title = '节点操作';
INSERT INTO MPSMODULE(id, pkcode, title, flag ,  parentid, ng_state, title_menu_show)
(select JXWOAUniversalSeq.nextval,'05030305','节点操作',1,	m.id,'coreHome.flowActionMng','节点操作' from MPSMODULE m where m.title_menu_show='流程管理');
insert into MPSAVAILMODULE (ELEMENTID,ELEMENTTYPE,FLAG,modulecode,mpsmodule_id)(select 3000,'R','1',id ,id from MPSMODULE where title = '节点操作');
COMMIT ;
