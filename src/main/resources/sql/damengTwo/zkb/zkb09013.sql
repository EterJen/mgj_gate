update DIC_MODE  set DIC_MODE.cname = '个人配置' where  DIC_MODE.dictype = 'personalBasisSetting';
update DIC_TYPE set DIC_TYPE.name = '代理人设置' where  DIC_TYPE.ext = 'coreHome.personBasisSetting.agentSetting';
update DIC_TYPE set DIC_TYPE.name = '密码设置' where  DIC_TYPE.ext = 'coreHome.personBasisSetting.userInfoModify';
update DIC_TYPE set DIC_TYPE.name = '自动接收设置' where  DIC_TYPE.ext = 'coreHome.personBasisSetting.autoReceiveTask';


update  MPSMODULE set MPSMODULE.title_menu_show = '待办事项', MPSMODULE.actionurl = '/coreHome/todoList|/coreHome/todoListff' where  MPSMODULE.title = '待办事项';
update  MPSMODULE set MPSMODULE.actionurl = '/coreHome/doneList' where  MPSMODULE.title = '已办事项';
update  MPSMODULE set MPSMODULE.actionurl = '/coreHome/personBasisSetting|/coreHome/personBasisSetting/agentSetting|/coreHome/personBasisSetting/autoReceiveTask|/coreHome/personBasisSetting/userInfoModify' where  MPSMODULE.title = '个人配置';
update  MPSMODULE set MPSMODULE.actionurl = '/coreHome/receivedOfficialDocuments' where  MPSMODULE.title = '收文管理';
update  MPSMODULE set MPSMODULE.actionurl = '/coreHome/sentOfficialDocuments' where  MPSMODULE.title = '发文管理';
update  MPSMODULE set MPSMODULE.actionurl = '/coreHome/officialDocuments' where  MPSMODULE.title = '公文查询';
update  MPSMODULE set MPSMODULE.actionurl = '/coreHome/userManageList|/coreUser/userManage/searchUser' where  MPSMODULE.title = '人员管理';
update  MPSMODULE set MPSMODULE.actionurl = '/coreHome/departManageList|/coreDepartment/departManage/departmentTree' where  MPSMODULE.title = '部门管理';
update  MPSMODULE set MPSMODULE.actionurl = '/coreHome/roleManageList|/coreRole/roleManage/listTopClick' where  MPSMODULE.title = '角色管理';
update  MPSMODULE set MPSMODULE.actionurl = '/coreHome/postManageList|/coreDepartment/postManage/deptMixPostTree' where  MPSMODULE.title = '岗位管理';
update  MPSMODULE set MPSMODULE.actionurl = '/coreHome/leaderMng|/coreUser/leaderMng/leader' where  MPSMODULE.title = '领导设置';
update  MPSMODULE set MPSMODULE.actionurl = '/coreHome/formConfig|/processDefVersion/formConfig/list' where  MPSMODULE.title = '表单定义';
update  MPSMODULE set MPSMODULE.actionurl = '/coreHome/redTemplate|/wfDocType/redTemplate/list' where  MPSMODULE.title = '模板管理';
update  MPSMODULE set MPSMODULE.actionurl = '/coreHome/processDefList|/processDefManage/processDefCtl/groupingTree' where  MPSMODULE.title = '流程定制';
update  MPSMODULE set MPSMODULE.actionurl = '/coreHome/flowActionMng|/formAction/flowActionMng/searchByEntity' where  MPSMODULE.title = '节点操作';
update  MPSMODULE set MPSMODULE.actionurl = '/coreHome/dicManage|/dicCategory/dicManage/list' where  MPSMODULE.title = '系统字典';
update  MPSMODULE set MPSMODULE.actionurl = '/coreHome/moduleAuthManageList|/coreMpsModule/moduleAuthManage/mpsModuleTree' where  MPSMODULE.title = '模块授权';
update  MPSMODULE set MPSMODULE.actionurl = '/coreHome/responsiblePersonManage|/coreDepartment/responsiblePersonManage/deptMixPostTree' where  MPSMODULE.title = '定密管理';
update  MPSMODULE set MPSMODULE.actionurl = '/coreHome/overallAgentMng|/coreUser/agentSetting/usearAgentList' where  MPSMODULE.title = '代理人管理';
update  MPSMODULE set MPSMODULE.actionurl = '/coreHome/auditInfoList|/auditInfo/auditInfoManage/list' where  MPSMODULE.title = '日志管理';

COMMIT;