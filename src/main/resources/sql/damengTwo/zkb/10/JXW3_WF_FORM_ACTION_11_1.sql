insert into "WF_FORM_ACTION" ("ID","ACTION_ID","NAME","DESCRIPTION","PRE_CONDITION","ACTION_TO_PERFORM","IMAGE_URL","ORDER_NUM","FLAG","ACTION_TYPE") values (1, 'saveForm', '�� ��', '���������� ��', '$scope.task.readMode==''task''&& $scope.fc.wpsDetail.middleContentType==''form''&& $scope.task.status==''Accepted'' && $scope.task.taskType!=''SecretResponse''', '$scope.saveForm()', 'images/sidebar_right-bc.svg', 200, '1', 'currentTaskDeal');
insert into "WF_FORM_ACTION" ("ID","ACTION_ID","NAME","DESCRIPTION","PRE_CONDITION","ACTION_TO_PERFORM","IMAGE_URL","ORDER_NUM","FLAG","ACTION_TYPE") values (2, 'inputOpinion', '���¼��', '�����������¼��', '$scope.task.readMode==''task''&& $scope.fc.wpsDetail.middleContentType==''form''&& $scope.task.status==''Accepted'' && $scope.task.taskType!=''SecretResponse''', '$scope.inputOption()', 'images/sidebar_right-yjlr.svg', 210, '1', 'currentTaskDeal');
insert into "WF_FORM_ACTION" ("ID","ACTION_ID","NAME","DESCRIPTION","PRE_CONDITION","ACTION_TO_PERFORM","IMAGE_URL","ORDER_NUM","FLAG","ACTION_TYPE") values (3, 'changeWorkflow', '��  ת', '������ ת', '$scope.task.readMode==''task''&& $scope.fc.wpsDetail.middleContentType==''form''&& $scope.task.status==''Accepted'' && $scope.task.taskType!=''SecretResponse''', '$scope.fc.openMoveWorkflowDialog()', 'images/sidebar_right-lz.svg', 110, '1', 'currentTaskDeal');
insert into "WF_FORM_ACTION" ("ID","ACTION_ID","NAME","DESCRIPTION","PRE_CONDITION","ACTION_TO_PERFORM","IMAGE_URL","ORDER_NUM","FLAG","ACTION_TYPE") values (4, 'finishTask', '�������', '���񣺰��', '$scope.task.readMode==''task''&& $scope.fc.wpsDetail.middleContentType==''form''&& $scope.task.status==''Accepted'' && $scope.task.taskType!=''SecretResponse''', '$scope.finishTask()', 'images/sidebar_right-bj.svg', 130, '1', 'currentTaskDeal');
insert into "WF_FORM_ACTION" ("ID","ACTION_ID","NAME","DESCRIPTION","PRE_CONDITION","ACTION_TO_PERFORM","IMAGE_URL","ORDER_NUM","FLAG","ACTION_TYPE") values (5, 'viewHistory', '��ת��¼', '���̣���ת��¼', '$scope.task.readMode==''task''&& $scope.fc.wpsDetail.middleContentType==''form''&& $scope.task.status==''Accepted''', '$scope.viewHistory()', 'images/sidebar_right-lzjl.svg', 810, '1', 'currentTaskDeal');
insert into "WF_FORM_ACTION" ("ID","ACTION_ID","NAME","DESCRIPTION","PRE_CONDITION","ACTION_TO_PERFORM","IMAGE_URL","ORDER_NUM","FLAG","ACTION_TYPE") values (6, 'finishInstance', '�������', '���̣����', '$scope.task.readMode==''task''&& $scope.fc.wpsDetail.middleContentType==''form''&& $scope.task.status==''Accepted'' && $scope.task.taskType!=''SecretResponse''', '$scope.finishInstance()', 'images/sidebar_right-bj.svg', 899, '1', 'currentTaskDeal');
insert into "WF_FORM_ACTION" ("ID","ACTION_ID","NAME","DESCRIPTION","PRE_CONDITION","ACTION_TO_PERFORM","IMAGE_URL","ORDER_NUM","FLAG","ACTION_TYPE") values (7, 'returnFormWps', '���ر�', '������ʽwps�����ر�', '$scope.task.readMode==''task''&& $scope.fc.wpsDetail.middleContentType==''wps''', '$scope.fc.returnForm()', 'images/sidebar_right-fhbd.svg', 390, '1', 'currentTaskDeal');
insert into "WF_FORM_ACTION" ("ID","ACTION_ID","NAME","DESCRIPTION","PRE_CONDITION","ACTION_TO_PERFORM","IMAGE_URL","ORDER_NUM","FLAG","ACTION_TYPE") values (8, 'saveDoc', '�����ĵ�', '������ʽwps������', '$scope.task.readMode==''task''&& $scope.fc.wpsDetail.middleContentType==''wps''', '$scope.fc.SendDataToServer()', 'images/sidebar_right-bcwd.svg', 300, '1', 'currentTaskDeal');
insert into "WF_FORM_ACTION" ("ID","ACTION_ID","NAME","DESCRIPTION","PRE_CONDITION","ACTION_TO_PERFORM","IMAGE_URL","ORDER_NUM","FLAG","ACTION_TYPE") values (9, 'convertToOfd', 'ת  ��', '������ʽwps��ת ��', '$scope.task.readMode==''task''&& $scope.fc.wpsDetail.middleContentType==''wps'' && $scope.fc.currentAttach!=null&&$scope.fc.currentAttach.bizFileType==''taohong''&&$scope.fc.currentAttach.bizAttachType==''zhengwen''', '$scope.fc.convertToOfd()', 'images/sidebar_right-zb.svg', 380, '1', 'currentTaskDeal');
insert into "WF_FORM_ACTION" ("ID","ACTION_ID","NAME","DESCRIPTION","PRE_CONDITION","ACTION_TO_PERFORM","IMAGE_URL","ORDER_NUM","FLAG","ACTION_TYPE") values (10, 'taohong', '��  ��', '������ʽwps����  ��', '$scope.task.readMode==''task''&& $scope.fc.wpsDetail.middleContentType==''wps'' && $scope.fc.currentAttach!=null&&$scope.fc.currentAttach.attachment.id!=null&&$scope.fc.currentAttach.bizFileType==''content''&&$scope.fc.currentAttach.bizAttachType==''zhengwen''', '$scope.fc.openWithTemplate()', 'images/sidebar_right-th.svg', 340, '1', 'currentTaskDeal');
insert into "WF_FORM_ACTION" ("ID","ACTION_ID","NAME","DESCRIPTION","PRE_CONDITION","ACTION_TO_PERFORM","IMAGE_URL","ORDER_NUM","FLAG","ACTION_TYPE") values (11, 'returnFormOfd', '���ر�', '���İ�ʽofd�����ر�', '$scope.task.readMode==''task''&& $scope.fc.wpsDetail.middleContentType==''ofd''', '$scope.fc.returnForm()', 'images/sidebar_right-fhbd.svg', 490, '1', 'currentTaskDeal');
insert into "WF_FORM_ACTION" ("ID","ACTION_ID","NAME","DESCRIPTION","PRE_CONDITION","ACTION_TO_PERFORM","IMAGE_URL","ORDER_NUM","FLAG","ACTION_TYPE") values (12, 'printOfd', '��  ӡ', '���İ�ʽofd���� ӡ', '$scope.task.readMode==''task''&& $scope.fc.wpsDetail.middleContentType==''ofd''', '$scope.ofdPrint()', 'images/sidebar_right-dy.svg', 480, '1', 'currentTaskDeal');
insert into "WF_FORM_ACTION" ("ID","ACTION_ID","NAME","DESCRIPTION","PRE_CONDITION","ACTION_TO_PERFORM","IMAGE_URL","ORDER_NUM","FLAG","ACTION_TYPE") values (13, 'relationReciveDoc', '��������', '����������������', 'SysUtils.notEmpty($scope.task.theCommonFormInfo,[''belongProInst'',''relatedReceiveDocId'']) && $scope.task.readMode==''task''&& $scope.fc.wpsDetail.middleContentType==''form''&& $scope.task.status==''Accepted''', '$scope.fc.relationReciveDoc(''relatedReceiveDocIdDialog'',''relatedReceiveDocId'')', 'images/sidebar_right-glsw.svg', 250, '1', 'currentTaskDeal');
insert into "WF_FORM_ACTION" ("ID","ACTION_ID","NAME","DESCRIPTION","PRE_CONDITION","ACTION_TO_PERFORM","IMAGE_URL","ORDER_NUM","FLAG","ACTION_TYPE") values (14, 'dmTaskFinish', '��  ��', '���񣺶������񣺰��', '$scope.task.readMode==''task''&& $scope.fc.wpsDetail.middleContentType==''form''&& $scope.task.status==''Accepted'' && $scope.task.taskType ==''SecretResponse''', '$scope.saveForm()', 'images/sidebar_right-bj.svg', 120, '1', 'currentTaskDeal');
insert into "WF_FORM_ACTION" ("ID","ACTION_ID","NAME","DESCRIPTION","PRE_CONDITION","ACTION_TO_PERFORM","IMAGE_URL","ORDER_NUM","FLAG","ACTION_TYPE") values (15, 'acceptTask', '��  ��', '���񣺽���', '$scope.task.readMode==''task''&& $scope.fc.wpsDetail.middleContentType==''form''&& $scope.task.status==''NotAccepted''', '$scope.acceptTask()', 'images/sidebar_right-js.svg', 100, '1', 'currentTaskDeal');
insert into "WF_FORM_ACTION" ("ID","ACTION_ID","NAME","DESCRIPTION","PRE_CONDITION","ACTION_TO_PERFORM","IMAGE_URL","ORDER_NUM","FLAG","ACTION_TYPE") values (16, 'ofdSign', 'ǩ  ��', '���İ�ʽofd��ǩ��', '$scope.task.readMode==''task''&& $scope.fc.wpsDetail.middleContentType==''ofd''', '$scope.fc.ofdSign()', 'images/sidebar_right-qz.svg', 470, '1', 'currentTaskDeal');
insert into "WF_FORM_ACTION" ("ID","ACTION_ID","NAME","DESCRIPTION","PRE_CONDITION","ACTION_TO_PERFORM","IMAGE_URL","ORDER_NUM","FLAG","ACTION_TYPE") values (17, 'isShowRevise', '��ʾ�޶�', '������ʽwps����ʾ�޶�', '$scope.task.readMode==''task''&& $scope.fc.wpsDetail.middleContentType==''wps'' && $scope.fc.currentAttach!=null&&$scope.fc.currentAttach.attachment.id!=null&&$scope.fc.currentAttach.bizFileType==''content''&&!$scope.task.currNodeIsShowRevise', '$scope.fc.isRevise(0)', 'images/sidebar_right-xsxd.svg', 331, '1', 'currentTaskDeal');
insert into "WF_FORM_ACTION" ("ID","ACTION_ID","NAME","DESCRIPTION","PRE_CONDITION","ACTION_TO_PERFORM","IMAGE_URL","ORDER_NUM","FLAG","ACTION_TYPE") values (18, 'isHideRevise', '�����޶�', '������ʽwps�������޶�', '$scope.task.readMode==''task''&& $scope.fc.wpsDetail.middleContentType==''wps'' && $scope.fc.currentAttach!=null&&$scope.fc.currentAttach.attachment.id!=null&&$scope.fc.currentAttach.bizFileType==''content''&&$scope.task.currNodeIsShowRevise', '$scope.fc.isRevise(2)', 'images/sidebar_right-ycxd.svg', 332, '1', 'currentTaskDeal');
insert into "WF_FORM_ACTION" ("ID","ACTION_ID","NAME","DESCRIPTION","PRE_CONDITION","ACTION_TO_PERFORM","IMAGE_URL","ORDER_NUM","FLAG","ACTION_TYPE") values (19, 'revisionAcceptCommand', '�����޶�', '������ʽwps�������޶�', '$scope.task.readMode==''task''&& $scope.fc.wpsDetail.middleContentType==''wps'' && $scope.fc.currentAttach!=null&&$scope.fc.currentAttach.attachment.id!=null&&$scope.fc.currentAttach.bizFileType==''content''', '$scope.fc.revisionAcceptCommand()', 'images/sidebar_right-jsxd.svg', 339, '1', 'currentTaskDeal');
insert into "WF_FORM_ACTION" ("ID","ACTION_ID","NAME","DESCRIPTION","PRE_CONDITION","ACTION_TO_PERFORM","IMAGE_URL","ORDER_NUM","FLAG","ACTION_TYPE") values (20, 'printBaseForm', '��ӡ��', '����������ӡ��', '$scope.fc.wpsDetail.middleContentType==''form''', '$scope.fc.printForm()', 'images/sidebar_right-jsxd.svg', 240, '1', 'currentTaskDeal');
insert into "WF_FORM_ACTION" ("ID","ACTION_ID","NAME","DESCRIPTION","PRE_CONDITION","ACTION_TO_PERFORM","IMAGE_URL","ORDER_NUM","FLAG","ACTION_TYPE") values (21, 'printBaseFormHistory', '��ӡ��', '����������ӡ��', '$scope.fc.wpsDetail.middleContentType==''form''', '$scope.fc.printForm()', 'images/sidebar_right-jsxd.svg', 240, '1', 'hisView');
insert into "WF_FORM_ACTION" ("ID","ACTION_ID","NAME","DESCRIPTION","PRE_CONDITION","ACTION_TO_PERFORM","IMAGE_URL","ORDER_NUM","FLAG","ACTION_TYPE") values (22, 'closeBaseForm', '�رմ���', '���������رմ���', '$scope.fc.wpsDetail.middleContentType==''form''', '$scope.fc.closeCurrentForm()', 'images/sidebar_right-bc.svg', 999, '1', 'currentTaskDeal');
insert into "WF_FORM_ACTION" ("ID","ACTION_ID","NAME","DESCRIPTION","PRE_CONDITION","ACTION_TO_PERFORM","IMAGE_URL","ORDER_NUM","FLAG","ACTION_TYPE") values (23, 'closeBaseFormHistory', '�رմ���', '���������رմ���', '$scope.fc.wpsDetail.middleContentType==''form''', '$scope.fc.closeCurrentForm()', 'images/sidebar_right-bc.svg', 999, '1', 'hisView');
insert into "WF_FORM_ACTION" ("ID","ACTION_ID","NAME","DESCRIPTION","PRE_CONDITION","ACTION_TO_PERFORM","IMAGE_URL","ORDER_NUM","FLAG","ACTION_TYPE") values (24, 'convertType', 'ת������', '���̣�ת������', '$scope.fc.wpsDetail.middleContentType==''form''', '$scope.fc.printForm()', 'images/sidebar_right-bc.svg', 879, '1', 'currentTaskDeal');
insert into "WF_FORM_ACTION" ("ID","ACTION_ID","NAME","DESCRIPTION","PRE_CONDITION","ACTION_TO_PERFORM","IMAGE_URL","ORDER_NUM","FLAG","ACTION_TYPE") values (25, 'convertTypeHistory', 'ת������', '���̣�ת������', '$scope.fc.wpsDetail.middleContentType==''form''', '$scope.fc.printForm()', 'images/sidebar_right-bc.svg', 879, '1', 'hisView');
insert into "WF_FORM_ACTION" ("ID","ACTION_ID","NAME","DESCRIPTION","PRE_CONDITION","ACTION_TO_PERFORM","IMAGE_URL","ORDER_NUM","FLAG","ACTION_TYPE") values (26, 'associatedFile', '��������', '����������������', '$scope.task.readMode==''task''&& $scope.fc.wpsDetail.middleContentType==''form''&& $scope.task.status==''Accepted''', '$scope.fc.relationReciveDoc(''relatedReceiveDocIdDialog'',''relatedReceiveDocId'')', 'images/sidebar_right-glsw.svg', 251, '1', 'currentTaskDeal');
insert into "WF_FORM_ACTION" ("ID","ACTION_ID","NAME","DESCRIPTION","PRE_CONDITION","ACTION_TO_PERFORM","IMAGE_URL","ORDER_NUM","FLAG","ACTION_TYPE") values (27, 'associatedFileHistory', '��������', '����������������', '$scope.task.readMode==''task''&& $scope.fc.wpsDetail.middleContentType==''form''', '$scope.fc.relationReciveDoc(''relatedReceiveDocIdDialog'',''relatedReceiveDocId'')', 'images/sidebar_right-glsw.svg', 251, '1', 'hisView');
insert into "WF_FORM_ACTION" ("ID","ACTION_ID","NAME","DESCRIPTION","PRE_CONDITION","ACTION_TO_PERFORM","IMAGE_URL","ORDER_NUM","FLAG","ACTION_TYPE") values (28, 'transfeGovernor', 'ת �� ��', '���̣�ת����', '$scope.fc.wpsDetail.middleContentType==''form'' ', '$scope.fc.transfeGovernor()', 'images/sidebar_right-bc.svg', 870, '1', 'currentTaskDeal');
insert into "WF_FORM_ACTION" ("ID","ACTION_ID","NAME","DESCRIPTION","PRE_CONDITION","ACTION_TO_PERFORM","IMAGE_URL","ORDER_NUM","FLAG","ACTION_TYPE") values (29, 'transfeGovernorHistory', 'ת �� ��', '���̣�ת����', '$scope.fc.wpsDetail.middleContentType==''form''', '$scope.fc.printForm()', 'images/sidebar_right-bc.svg', 870, '1', 'hisView');
insert into "WF_FORM_ACTION" ("ID","ACTION_ID","NAME","DESCRIPTION","PRE_CONDITION","ACTION_TO_PERFORM","IMAGE_URL","ORDER_NUM","FLAG","ACTION_TYPE") values (32, 'showYanTuoSgn', '�鿴ǩ��', '���������鿴ǩ��', '$scope.fc.wpsDetail.middleContentType==''form''', '$scope.fc.showSgn()', 'images/sidebar_right-bc.svg', 290, '1', 'currentTaskDeal');
insert into "WF_FORM_ACTION" ("ID","ACTION_ID","NAME","DESCRIPTION","PRE_CONDITION","ACTION_TO_PERFORM","IMAGE_URL","ORDER_NUM","FLAG","ACTION_TYPE") values (33, 'showYanTuoSgn', '�鿴ǩ��', '���������鿴ǩ��', '$scope.fc.wpsDetail.middleContentType==''form''', '$scope.fc.showSgn()', 'images/sidebar_right-bc.svg', 290, '1', 'hisView');
insert into "WF_FORM_ACTION" ("ID","ACTION_ID","NAME","DESCRIPTION","PRE_CONDITION","ACTION_TO_PERFORM","IMAGE_URL","ORDER_NUM","FLAG","ACTION_TYPE") values (34, 'conversionTypeHistory', '�������', '���񣺰��(����->����)', '$scope.task.readMode==''task''&& $scope.fc.wpsDetail.middleContentType==''form''&& $scope.task.status==''Accepted'' && $scope.task.taskType!=''SecretResponse''', '$scope.finishAllTaskInstance()', 'images/sidebar_right-bc.svg', 140, '1', 'currentTaskDeal');
insert into "WF_FORM_ACTION" ("ID","ACTION_ID","NAME","DESCRIPTION","PRE_CONDITION","ACTION_TO_PERFORM","IMAGE_URL","ORDER_NUM","FLAG","ACTION_TYPE") values (50, 'relateDuWenHistory', '��������', '����������������', '$scope.fc.wpsDetail.middleContentType==''form'' && SysUtils.notEmpty($scope.task.theCommonFormInfo,[''belongProInst'',''relateDuWenDocId''])', '$scope.fc.relationReciveDoc(''relatedReceiveDocIdDialog'',''relateDuWenDocId'')', 'images/sidebar_right-glsw.svg', 252, '1', 'hisView');
insert into "WF_FORM_ACTION" ("ID","ACTION_ID","NAME","DESCRIPTION","PRE_CONDITION","ACTION_TO_PERFORM","IMAGE_URL","ORDER_NUM","FLAG","ACTION_TYPE") values (51, 'relateDuWen', '��������', '����������������', '$scope.task.readMode==''task''&& $scope.fc.wpsDetail.middleContentType==''form''&& $scope.task.status==''Accepted'' && SysUtils.notEmpty($scope.task.theCommonFormInfo,[''belongProInst'',''relateDuWenDocId''])', '$scope.fc.relationReciveDoc(''relatedReceiveDocIdDialog'',''relateDuWenDocId'')', 'images/sidebar_right-glsw.svg', 252, '1', 'currentTaskDeal');
insert into "WF_FORM_ACTION" ("ID","ACTION_ID","NAME","DESCRIPTION","PRE_CONDITION","ACTION_TO_PERFORM","IMAGE_URL","ORDER_NUM","FLAG","ACTION_TYPE") values (108466, 'printNumRegist', '�ݺŵǼ�', '���̣����ܷ��ģ��ݺŵǼ�', 'SysUtils.notEmpty( $scope.task.theCommonFormInfo,["wfSecretConfirm","dicTypeRef","name"])', '$scope.fc.openInstanceNumber()', 'images/sidebar_right-fhdj.svg', 880, '1', 'currentTaskDeal');
insert into "WF_FORM_ACTION" ("ID","ACTION_ID","NAME","DESCRIPTION","PRE_CONDITION","ACTION_TO_PERFORM","IMAGE_URL","ORDER_NUM","FLAG","ACTION_TYPE") values (759475, 'viewHistory', '�鿴����', '���̣���ת��¼', '$scope.fc.wpsDetail.middleContentType==''form''', '$scope.viewHistory()', 'images/sidebar_right-lzjl.svg', 810, '1', 'hisView');
insert into "WF_FORM_ACTION" ("ID","ACTION_ID","NAME","DESCRIPTION","PRE_CONDITION","ACTION_TO_PERFORM","IMAGE_URL","ORDER_NUM","FLAG","ACTION_TYPE") values (759476, 'printNumRegist', '�ݺŵǼ�', '���̣����ܷ��ģ��ݺŵǼ�', '$scope.fc.wpsDetail.middleContentType==''form''', '$scope.fc.openInstanceNumber()', 'images/sidebar_right-fhdj.svg', 880, '1', 'hisView');
insert into "WF_FORM_ACTION" ("ID","ACTION_ID","NAME","DESCRIPTION","PRE_CONDITION","ACTION_TO_PERFORM","IMAGE_URL","ORDER_NUM","FLAG","ACTION_TYPE") values (759477, 'hisSaveForm', '�����', '���������� ��', '$scope.fc.wpsDetail.middleContentType==''form''', '$scope.saveForm()', 'images/sidebar_right-bc.svg', 200, '1', 'hisView');
insert into "WF_FORM_ACTION" ("ID","ACTION_ID","NAME","DESCRIPTION","PRE_CONDITION","ACTION_TO_PERFORM","IMAGE_URL","ORDER_NUM","FLAG","ACTION_TYPE") values (759478, 'HisAssociatedShouWen', '��������', '����������������', '$scope.fc.wpsDetail.middleContentType==''form'' && SysUtils.notEmpty($scope.task.theCommonFormInfo,[''belongProInst'',''relatedReceiveDocId''])', '$scope.fc.relationReciveDoc(''relatedReceiveDocIdDialog'',''relatedReceiveDocId'')', 'images/sidebar_right-glsw.svg', 250, '1', 'hisView');
insert into "WF_FORM_ACTION" ("ID","ACTION_ID","NAME","DESCRIPTION","PRE_CONDITION","ACTION_TO_PERFORM","IMAGE_URL","ORDER_NUM","FLAG","ACTION_TYPE") values (759479, 'adjustOpinions', '�������', '���������������', '$scope.fc.wpsDetail.middleContentType==''form''', '$scope.adjustOpinions()', 'images/sidebar_right-yjlr.svg', 220, '1', 'currentTaskDeal');
insert into "WF_FORM_ACTION" ("ID","ACTION_ID","NAME","DESCRIPTION","PRE_CONDITION","ACTION_TO_PERFORM","IMAGE_URL","ORDER_NUM","FLAG","ACTION_TYPE") values (759480, 'adjustOpinions', '�������', '���������������', '$scope.fc.wpsDetail.middleContentType==''form''', '$scope.adjustOpinions()', 'images/sidebar_right-yjlr.svg', 220, '1', 'hisView');
insert into "WF_FORM_ACTION" ("ID","ACTION_ID","NAME","DESCRIPTION","PRE_CONDITION","ACTION_TO_PERFORM","IMAGE_URL","ORDER_NUM","FLAG","ACTION_TYPE") values (759481, 'duwenJdOpinions', '���ȵ���', '�����������Ľ��ȵ���', ' $scope.fc.wpsDetail.middleContentType==''form''&& $scope.task.status==''Accepted''', '$scope.duwenJdOpinions()', 'images/sidebar_right-yjlr.svg', 230, '1', 'currentTaskDeal');
insert into "WF_FORM_ACTION" ("ID","ACTION_ID","NAME","DESCRIPTION","PRE_CONDITION","ACTION_TO_PERFORM","IMAGE_URL","ORDER_NUM","FLAG","ACTION_TYPE") values (759482, 'returnTasksInHis', '��������', '����δ���ܳ���', '$scope.fc.wpsDetail.middleContentType==''form'' && $scope.task.canReturnTasks.length > 0', '$scope.wf.hisView.fun.returnTasks()', 'images/sidebar_right-bc.svg', 100, '1', 'hisView');