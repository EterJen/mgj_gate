alter table MPSMODULE modify(actionurl varchar2(500));

update  MPSMODULE set title_menu_show = '待办事项', actionurl = '/coreHome/todoList|/coreHome/todoListff' where  title = '待办事项';
update  MPSMODULE set actionurl = '/coreHome/doneList' where  title = '已办事项';
update  MPSMODULE set actionurl = '/coreHome/personBasisSetting|/coreHome/personBasisSetting/agentSetting|/coreHome/personBasisSetting/autoReceiveTask|/coreHome/personBasisSetting/userInfoModify' where  title = '个人配置';
update  MPSMODULE set actionurl = '/coreHome/receivedOfficialDocuments' where  title = '收文管理';
update  MPSMODULE set actionurl = '/coreHome/sentOfficialDocuments' where  title = '发文管理';
update  MPSMODULE set actionurl = '/coreHome/officialDocuments' where  title = '公文查询';
update  MPSMODULE set actionurl = '/coreHome/userManageList|/coreUser/searchUser' where  title = '人员管理';
update  MPSMODULE set actionurl = '/coreHome/departManageList|/coreDepartment/departmentTree' where  title = '部门管理';
update  MPSMODULE set actionurl = '/coreHome/roleManageList|/coreRole/listTopClick' where  title = '角色管理';
update  MPSMODULE set actionurl = '/coreHome/postManageList|/coreDepartment/deptMixPostTree' where  title = '岗位管理';
update  MPSMODULE set actionurl = '/coreHome/leaderMng|/coreUser/leader' where  title = '领导设置';
update  MPSMODULE set actionurl = '/coreHome/formConfig|/processDefVersion/list' where  title = '表单定义';
update  MPSMODULE set actionurl = '/coreHome/redTemplate|/wfDocType/list' where  title = '模板管理';
update  MPSMODULE set actionurl = '/coreHome/processDefList|/processDefManage/groupingTree' where  title = '流程定制';
update  MPSMODULE set actionurl = '/coreHome/flowActionMng|/formAction/searchByEntity' where  title = '节点操作';
update  MPSMODULE set actionurl = '/coreHome/dicManage|/dicCategory/list' where  title = '系统字典';
update  MPSMODULE set actionurl = '/coreHome/moduleAuthManageList|/coreUser/searchUser' where  title = '模块授权';
update  MPSMODULE set actionurl = '/coreHome/responsiblePersonManage|/coreDepartment/deptMixPostTree' where  title = '定密管理';
update  MPSMODULE set actionurl = '/coreHome/overallAgentMng|/coreUser/searchUser' where  title = '代理人管';
update  MPSMODULE set actionurl = '/coreHome/auditInfoList|/auditInfo/list' where  title = '日志管理';

commit;