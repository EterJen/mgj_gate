alter table WF_HISTORY_TASK_INFO add (INSERTED_TASK_ID number);

COMMENT ON COLUMN WF_HISTORY_TASK_INFO.INSERTED_TASK_ID IS '流转生成的新任务id,用于回退任务时删除流转记录';

UPDATE WF_FORM_ACTION SET PRE_CONDITION = '$scope.task.status==''Accepted'' && $scope.fc.wpsDetail.middleContentType==''wps'' && $scope.task.attIsFinalVersion' WHERE ID = 8;
UPDATE WF_FORM_ACTION SET PRE_CONDITION = '$scope.task.status==''Accepted'' && $scope.fc.wpsDetail.middleContentType==''wps'' && $scope.fc.currentAttach!=null&&$scope.fc.currentAttach.bizFileType==''taohong''&&$scope.fc.currentAttach.bizAttachType==''zhengwen''' WHERE ID = 9;
UPDATE WF_FORM_ACTION SET PRE_CONDITION = '$scope.task.status==''Accepted'' && $scope.fc.wpsDetail.middleContentType==''wps'' && $scope.fc.currentAttach!=null&&$scope.fc.currentAttach.attachment.id!=null&&$scope.fc.currentAttach.bizFileType==''content''' WHERE ID = 10;
UPDATE WF_FORM_ACTION SET PRE_CONDITION = '$scope.task.status==''Accepted'' && $scope.fc.wpsDetail.middleContentType==''ofd''' WHERE ID = 12;
UPDATE WF_FORM_ACTION SET PRE_CONDITION = '$scope.task.status==''Accepted'' && $scope.fc.wpsDetail.middleContentType==''ofd''' WHERE ID = 16;
UPDATE WF_FORM_ACTION SET PRE_CONDITION = '$scope.task.status==''Accepted'' && $scope.fc.wpsDetail.middleContentType==''wps'' && $scope.fc.currentAttach!=null&&$scope.fc.currentAttach.attachment.id!=null&&$scope.fc.currentAttach.bizFileType==''content''' WHERE ID = 19;
UPDATE WF_FORM_ACTION SET PRE_CONDITION = '$scope.task.status==''Accepted'' && $scope.fc.wpsDetail.middleContentType==''ofd'' && $scope.task.attIsFinalVersion' WHERE ID = 52;
UPDATE WF_FORM_ACTION SET PRE_CONDITION = '$scope.task.status==''Accepted'' && $scope.fc.wpsDetail.middleContentType==''form''' WHERE ID = 759479;
UPDATE WF_FORM_ACTION SET PRE_CONDITION = '$scope.fc.wpsDetail.middleContentType==''form'' && $scope.task.canReturnTasks.length >=1' WHERE ID = 759482;

insert into "MPSMODULE" ("ID","PKCODE","TITLE","ICON","ACTIONURL","TARGETFRAME","DESCRIPTION","FLAG","ICONFOCUS","ICONSELECT","PARENTID","NG_STATE","TITLE_MENU_SHOW") values (100061, '01080000', '办理办信', 'treeview_2', null, 'parent.MPBiz', '', '1', 'officeMng', null, 100000, 'coreHome.parent.MPBiz', '办理办信');
insert into "MPSMODULE" ("ID","PKCODE","TITLE","ICON","ACTIONURL","TARGETFRAME","DESCRIPTION","FLAG","ICONFOCUS","ICONSELECT","PARENTID","NG_STATE","TITLE_MENU_SHOW") values (100062, '01080100', '人大政协', 'treeview_2', '/coreHome/DPComposedDeal', 'parent.MPBiz', '人大政协', '1', null, null, 100061, 'coreHome.DPComposedDeal', '人大政协');
insert into "MPSMODULE" ("ID","PKCODE","TITLE","ICON","ACTIONURL","TARGETFRAME","DESCRIPTION","FLAG","ICONFOCUS","ICONSELECT","PARENTID","NG_STATE","TITLE_MENU_SHOW") values (100063, '01080200', '办理工作报批', 'treeview_2', 'coreHome/proposalReply', 'parent.MPBiz', '人大政协办理结果报批', '1', null, null, 100061, 'coreHome.proposalReply', '工作报批');

commit;