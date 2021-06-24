UPDATE WF_FORM_ACTION SET ACTION_ID = 'saveForm', NAME = '保      存', DESCRIPTION = '审批单：保 存', PRE_CONDITION = '$scope.fc.wpsDetail.middleContentType==''form''&& $scope.task.status==''Accepted'' && $scope.task.taskType==''NormalFlow''', ACTION_TO_PERFORM = '$scope.saveForm()', IMAGE_URL = 'images/sidebar_right-bc.svg', ORDER_NUM = 200, FLAG = '1', ACTION_TYPE = 'currentTaskDeal' WHERE ID = 1;
UPDATE WF_FORM_ACTION SET ACTION_ID = 'inputOpinion', NAME = '意见录入', DESCRIPTION = '审批单：意见录入', PRE_CONDITION = '$scope.fc.wpsDetail.middleContentType==''form''&& $scope.task.status==''Accepted'' && $scope.task.taskType==''NormalFlow''', ACTION_TO_PERFORM = '$scope.inputOption()', IMAGE_URL = 'images/sidebar_right-yjlr.svg', ORDER_NUM = 210, FLAG = '1', ACTION_TYPE = 'currentTaskDeal' WHERE ID = 2;
UPDATE WF_FORM_ACTION SET ACTION_ID = 'changeWorkflow', NAME = '流      转', DESCRIPTION = '任务：流 转', PRE_CONDITION = '$scope.fc.wpsDetail.middleContentType==''form''&& $scope.task.status==''Accepted'' && $scope.task.taskType==''NormalFlow''', ACTION_TO_PERFORM = '$scope.fc.openMoveWorkflowDialog()', IMAGE_URL = 'images/sidebar_right-lz.svg', ORDER_NUM = 235, FLAG = '1', ACTION_TYPE = 'currentTaskDeal' WHERE ID = 3;
UPDATE WF_FORM_ACTION SET ACTION_ID = 'finishTask', NAME = '办结任务', DESCRIPTION = '任务：办结', PRE_CONDITION = '$scope.task.readMode==''task''&& $scope.fc.wpsDetail.middleContentType==''form''&& $scope.task.status==''Accepted'' && $scope.task.taskType==''NormalFlow''', ACTION_TO_PERFORM = '$scope.finishTask()', IMAGE_URL = 'images/sidebar_right-bj.svg', ORDER_NUM = 896, FLAG = '1', ACTION_TYPE = 'currentTaskDeal' WHERE ID = 4;
UPDATE WF_FORM_ACTION SET ACTION_ID = 'viewHistory', NAME = '查看流程', DESCRIPTION = '流程：流转记录', PRE_CONDITION = '$scope.fc.wpsDetail.middleContentType==''form''', ACTION_TO_PERFORM = '$scope.viewHistory()', IMAGE_URL = 'images/sidebar_right-lzjl.svg', ORDER_NUM = 810, FLAG = '1', ACTION_TYPE = 'currentTaskDeal' WHERE ID = 5;
UPDATE WF_FORM_ACTION SET ACTION_ID = 'finishInstance', NAME = '办结流程', DESCRIPTION = '流程：办结', PRE_CONDITION = '$scope.task.readMode==''task''&& $scope.fc.wpsDetail.middleContentType==''form''&& $scope.task.status==''Accepted'' && $scope.task.taskType==''NormalFlow''', ACTION_TO_PERFORM = '$scope.finishInstance()', IMAGE_URL = 'images/sidebar_right-bj.svg', ORDER_NUM = 899, FLAG = '1', ACTION_TYPE = 'currentTaskDeal' WHERE ID = 6;
UPDATE WF_FORM_ACTION SET ACTION_ID = 'returnFormWps', NAME = '显示表单', DESCRIPTION = '正文流式wps：返回表单', PRE_CONDITION = '$scope.fc.wpsDetail.middleContentType==''wps''', ACTION_TO_PERFORM = '$scope.fc.returnForm()', IMAGE_URL = 'images/sidebar_right-fhbd.svg', ORDER_NUM = 390, FLAG = '1', ACTION_TYPE = 'currentTaskDeal' WHERE ID = 7;
UPDATE WF_FORM_ACTION SET ACTION_ID = 'saveDoc', NAME = '保存文档', DESCRIPTION = '正文流式wps：保存', PRE_CONDITION = '$scope.fc.wpsDetail.middleContentType==''wps''', ACTION_TO_PERFORM = '$scope.fc.SendDataToServer()', IMAGE_URL = 'images/sidebar_right-bcwd.svg', ORDER_NUM = 300, FLAG = '1', ACTION_TYPE = 'currentTaskDeal' WHERE ID = 8;
UPDATE WF_FORM_ACTION SET ACTION_ID = 'convertToOfd', NAME = '套      红', DESCRIPTION = '正文流式wps：套    红', PRE_CONDITION = '$scope.fc.wpsDetail.middleContentType==''wps'' && $scope.fc.currentAttach!=null&&$scope.fc.currentAttach.bizFileType==''taohong''&&$scope.fc.currentAttach.bizAttachType==''zhengwen''', ACTION_TO_PERFORM = '$scope.fc.convertToOfd()', IMAGE_URL = 'images/sidebar_right-zb.svg', ORDER_NUM = 380, FLAG = '1', ACTION_TYPE = 'currentTaskDeal' WHERE ID = 9;
UPDATE WF_FORM_ACTION SET ACTION_ID = 'taohong', NAME = '排      版', DESCRIPTION = '正文流式wps：排    版', PRE_CONDITION = '$scope.fc.wpsDetail.middleContentType==''wps'' && $scope.fc.currentAttach!=null&&$scope.fc.currentAttach.attachment.id!=null&&$scope.fc.currentAttach.bizFileType==''content''', ACTION_TO_PERFORM = '$scope.fc.openWithTemplate()', IMAGE_URL = 'images/sidebar_right-th.svg', ORDER_NUM = 340, FLAG = '1', ACTION_TYPE = 'currentTaskDeal' WHERE ID = 10;
UPDATE WF_FORM_ACTION SET ACTION_ID = 'returnFormOfd', NAME = '显示表单', DESCRIPTION = '正文版式ofd：返回表单', PRE_CONDITION = '$scope.fc.wpsDetail.middleContentType==''ofd''', ACTION_TO_PERFORM = '$scope.fc.returnForm()', IMAGE_URL = 'images/sidebar_right-fhbd.svg', ORDER_NUM = 490, FLAG = '1', ACTION_TYPE = 'currentTaskDeal' WHERE ID = 11;
UPDATE WF_FORM_ACTION SET ACTION_ID = 'printOfd', NAME = '打      印', DESCRIPTION = '正文版式ofd：打 印', PRE_CONDITION = '$scope.fc.wpsDetail.middleContentType==''ofd''', ACTION_TO_PERFORM = '$scope.ofdPrint()', IMAGE_URL = 'images/sidebar_right-dy.svg', ORDER_NUM = 480, FLAG = '1', ACTION_TYPE = 'currentTaskDeal' WHERE ID = 12;
UPDATE WF_FORM_ACTION SET ACTION_ID = 'relationReciveDoc', NAME = '关联收文', DESCRIPTION = '审批单：关联收文', PRE_CONDITION = '$scope.fc.wpsDetail.middleContentType==''form''  && SysUtils.notEmpty($scope.task.theCommonFormInfo,[''belongProInst'',''relatedReceiveDocId''])', ACTION_TO_PERFORM = '$scope.fc.relationReciveDoc(''relatedReceiveDocIdDialog'',''relatedReceiveDocId'')', IMAGE_URL = 'images/sidebar_right-glsw.svg', ORDER_NUM = 250, FLAG = '1', ACTION_TYPE = 'currentTaskDeal' WHERE ID = 13;
UPDATE WF_FORM_ACTION SET ACTION_ID = 'dmTaskFinish', NAME = '办      结', DESCRIPTION = '任务：定密任务：办结', PRE_CONDITION = '$scope.task.readMode==''task''&& $scope.fc.wpsDetail.middleContentType==''form''&& $scope.task.status==''Accepted'' && $scope.task.taskType ==''SecretResponse''', ACTION_TO_PERFORM = '$scope.saveForm()', IMAGE_URL = 'images/sidebar_right-bj.svg', ORDER_NUM = 896, FLAG = '1', ACTION_TYPE = 'currentTaskDeal' WHERE ID = 14;
UPDATE WF_FORM_ACTION SET ACTION_ID = 'acceptTask', NAME = '接      收', DESCRIPTION = '任务：接收', PRE_CONDITION = '$scope.fc.wpsDetail.middleContentType==''form''&& $scope.task.status==''NotAccepted''', ACTION_TO_PERFORM = '$scope.acceptTask()', IMAGE_URL = 'images/sidebar_right-js.svg', ORDER_NUM = 100, FLAG = '1', ACTION_TYPE = 'currentTaskDeal' WHERE ID = 15;
UPDATE WF_FORM_ACTION SET ACTION_ID = 'ofdSign', NAME = '签      章', DESCRIPTION = '正文版式ofd：签章', PRE_CONDITION = '$scope.fc.wpsDetail.middleContentType==''ofd''', ACTION_TO_PERFORM = '$scope.fc.ofdSign()', IMAGE_URL = 'images/sidebar_right-qz.svg', ORDER_NUM = 470, FLAG = '0', ACTION_TYPE = 'currentTaskDeal' WHERE ID = 16;
UPDATE WF_FORM_ACTION SET ACTION_ID = 'isShowRevise', NAME = '显示修订', DESCRIPTION = '正文流式wps：显示修订', PRE_CONDITION = '$scope.fc.wpsDetail.middleContentType==''wps'' && $scope.fc.currentAttach!=null&&$scope.fc.currentAttach.attachment.id!=null&&$scope.fc.currentAttach.bizFileType==''content''&&!$scope.task.currNodeIsShowRevise', ACTION_TO_PERFORM = '$scope.fc.isRevise(0)', IMAGE_URL = 'images/sidebar_right-xsxd.svg', ORDER_NUM = 331, FLAG = '1', ACTION_TYPE = 'currentTaskDeal' WHERE ID = 17;
UPDATE WF_FORM_ACTION SET ACTION_ID = 'isHideRevise', NAME = '隐藏修订', DESCRIPTION = '正文流式wps：隐藏修订', PRE_CONDITION = '$scope.fc.wpsDetail.middleContentType==''wps'' && $scope.fc.currentAttach!=null&&$scope.fc.currentAttach.attachment.id!=null&&$scope.fc.currentAttach.bizFileType==''content''&&$scope.task.currNodeIsShowRevise', ACTION_TO_PERFORM = '$scope.fc.isRevise(2)', IMAGE_URL = 'images/sidebar_right-ycxd.svg', ORDER_NUM = 332, FLAG = '1', ACTION_TYPE = 'currentTaskDeal' WHERE ID = 18;
UPDATE WF_FORM_ACTION SET ACTION_ID = 'revisionAccept', NAME = '接受修订', DESCRIPTION = '正文流式wps：保存和接受修订', PRE_CONDITION = '$scope.fc.wpsDetail.middleContentType==''wps'' && $scope.fc.currentAttach!=null&&$scope.fc.currentAttach.attachment.id!=null&&$scope.fc.currentAttach.bizFileType==''content''', ACTION_TO_PERFORM = '$scope.fc.saveEnableRevision()', IMAGE_URL = 'images/sidebar_right-jsxd.svg', ORDER_NUM = 339, FLAG = '1', ACTION_TYPE = 'currentTaskDeal' WHERE ID = 19;
UPDATE WF_FORM_ACTION SET ACTION_ID = 'printBaseForm', NAME = '打印表单', DESCRIPTION = '审批单：打印表单', PRE_CONDITION = '$scope.fc.wpsDetail.middleContentType==''form''', ACTION_TO_PERFORM = '$scope.fc.silencePrintForm()', IMAGE_URL = 'images/sidebar_right-jsxd.svg', ORDER_NUM = 240, FLAG = '1', ACTION_TYPE = 'currentTaskDeal' WHERE ID = 20;
UPDATE WF_FORM_ACTION SET ACTION_ID = 'printBaseFormHistory', NAME = '打印表单', DESCRIPTION = '审批单：打印表单', PRE_CONDITION = '$scope.fc.wpsDetail.middleContentType==''wps'' && $scope.fc.currentAttach!=null&&$scope.fc.currentAttach.attachment.id!=null&&$scope.fc.currentAttach.bizFileType==''content''', ACTION_TO_PERFORM = '$scope.fc.silencePrintForm()', IMAGE_URL = 'images/sidebar_right-jsxd.svg', ORDER_NUM = 240, FLAG = '1', ACTION_TYPE = 'hisView' WHERE ID = 21;
UPDATE WF_FORM_ACTION SET ACTION_ID = 'closeBaseForm', NAME = '关闭窗口', DESCRIPTION = '审批单：关闭窗口', PRE_CONDITION = '1==1', ACTION_TO_PERFORM = '$scope.fc.closeCurrentForm()', IMAGE_URL = 'images/sidebar_right-bc.svg', ORDER_NUM = 999, FLAG = '1', ACTION_TYPE = 'currentTaskDeal' WHERE ID = 22;
UPDATE WF_FORM_ACTION SET ACTION_ID = 'closeBaseFormHistory', NAME = '关闭窗口', DESCRIPTION = '审批单：关闭窗口', PRE_CONDITION = '1==1', ACTION_TO_PERFORM = '$scope.fc.closeCurrentForm()', IMAGE_URL = 'images/sidebar_right-bc.svg', ORDER_NUM = 999, FLAG = '1', ACTION_TYPE = 'hisView' WHERE ID = 23;
UPDATE WF_FORM_ACTION SET ACTION_ID = 'convertType', NAME = '转换类型', DESCRIPTION = '流程：转换类型', PRE_CONDITION = '$scope.fc.wpsDetail.middleContentType==''form''', ACTION_TO_PERFORM = '$scope.fc.convertType()', IMAGE_URL = 'images/sidebar_right-bc.svg', ORDER_NUM = 879, FLAG = '1', ACTION_TYPE = 'currentTaskDeal' WHERE ID = 24;
UPDATE WF_FORM_ACTION SET ACTION_ID = 'convertTypeHistory', NAME = '转换类型', DESCRIPTION = '流程：转换类型', PRE_CONDITION = '$scope.fc.wpsDetail.middleContentType==''form''', ACTION_TO_PERFORM = '$scope.fc.convertType()', IMAGE_URL = 'images/sidebar_right-bc.svg', ORDER_NUM = 879, FLAG = '1', ACTION_TYPE = 'hisView' WHERE ID = 25;
UPDATE WF_FORM_ACTION SET ACTION_ID = 'associatedFile', NAME = '关联发文', DESCRIPTION = '审批单：关联发文', PRE_CONDITION = '$scope.fc.wpsDetail.middleContentType==''form''  && SysUtils.notEmpty($scope.task.theCommonFormInfo,[''belongProInst'',''relatedReceiveDocId''])', ACTION_TO_PERFORM = '$scope.fc.relationReciveDoc(''relatedReceiveDocIdDialog'',''relatedReceiveDocId'')', IMAGE_URL = 'images/sidebar_right-glsw.svg', ORDER_NUM = 251, FLAG = '1', ACTION_TYPE = 'currentTaskDeal' WHERE ID = 26;
UPDATE WF_FORM_ACTION SET ACTION_ID = 'associatedFileHistory', NAME = '关联发文', DESCRIPTION = '审批单：关联发文', PRE_CONDITION = '$scope.fc.wpsDetail.middleContentType==''form''  && SysUtils.notEmpty($scope.task.theCommonFormInfo,[''belongProInst'',''relatedReceiveDocId''])', ACTION_TO_PERFORM = '$scope.fc.relationReciveDoc(''relatedReceiveDocIdDialog'',''relatedReceiveDocId'')', IMAGE_URL = 'images/sidebar_right-glsw.svg', ORDER_NUM = 251, FLAG = '1', ACTION_TYPE = 'hisView' WHERE ID = 27;
UPDATE WF_FORM_ACTION SET ACTION_ID = 'transfeGovernor', NAME = '转 督 文', DESCRIPTION = '流程：转督文', PRE_CONDITION = '$scope.fc.wpsDetail.middleContentType==''form'' ', ACTION_TO_PERFORM = '$scope.fc.transfeGovernor()', IMAGE_URL = 'images/sidebar_right-bc.svg', ORDER_NUM = 870, FLAG = '1', ACTION_TYPE = 'currentTaskDeal' WHERE ID = 28;
UPDATE WF_FORM_ACTION SET ACTION_ID = 'transfeGovernorHistory', NAME = '转 督 文', DESCRIPTION = '流程：转督文', PRE_CONDITION = '$scope.fc.wpsDetail.middleContentType==''form''', ACTION_TO_PERFORM = '$scope.fc.transfeGovernor()', IMAGE_URL = 'images/sidebar_right-bc.svg', ORDER_NUM = 870, FLAG = '1', ACTION_TYPE = 'hisView' WHERE ID = 29;
UPDATE WF_FORM_ACTION SET ACTION_ID = 'conversionTypeHistory', NAME = '办结任务', DESCRIPTION = '任务：办结(任务->流程)', PRE_CONDITION = '$scope.task.readMode==''task''&& $scope.fc.wpsDetail.middleContentType==''form''&& $scope.task.status==''Accepted'' && $scope.task.taskType==''NormalFlow''', ACTION_TO_PERFORM = '$scope.finishAllTaskInstance()', IMAGE_URL = 'images/sidebar_right-bc.svg', ORDER_NUM = 896, FLAG = '1', ACTION_TYPE = 'currentTaskDeal' WHERE ID = 34;
UPDATE WF_FORM_ACTION SET ACTION_ID = 'relateDuWenHistory', NAME = '关联督文', DESCRIPTION = '审批单：关联督文', PRE_CONDITION = '$scope.fc.wpsDetail.middleContentType==''form'' && SysUtils.notEmpty($scope.task.theCommonFormInfo,[''belongProInst'',''relateDuWenDocId''])', ACTION_TO_PERFORM = '$scope.fc.relationReciveDoc(''relatedReceiveDocIdDialog'',''relateDuWenDocId'')', IMAGE_URL = 'images/sidebar_right-glsw.svg', ORDER_NUM = 252, FLAG = '1', ACTION_TYPE = 'hisView' WHERE ID = 50;
UPDATE WF_FORM_ACTION SET ACTION_ID = 'relateDuWen', NAME = '关联督文', DESCRIPTION = '审批单：关联督文', PRE_CONDITION = '$scope.fc.wpsDetail.middleContentType==''form''&& $scope.task.status==''Accepted'' && SysUtils.notEmpty($scope.task.theCommonFormInfo,[''belongProInst'',''relateDuWenDocId''])', ACTION_TO_PERFORM = '$scope.fc.relationReciveDoc(''relatedReceiveDocIdDialog'',''relateDuWenDocId'')', IMAGE_URL = 'images/sidebar_right-glsw.svg', ORDER_NUM = 252, FLAG = '1', ACTION_TYPE = 'currentTaskDeal' WHERE ID = 51;
UPDATE WF_FORM_ACTION SET ACTION_ID = 'saveOfdSignature', NAME = '保      存', DESCRIPTION = '正文版式ofd:保存签章', PRE_CONDITION = '$scope.fc.wpsDetail.middleContentType==''ofd''', ACTION_TO_PERFORM = '$scope.fc.saveOfdSignature()', IMAGE_URL = 'images/sidebar_right-bc.svg', ORDER_NUM = 300, FLAG = '1', ACTION_TYPE = 'currentTaskDeal' WHERE ID = 52;
UPDATE WF_FORM_ACTION SET ACTION_ID = 'printNumRegist', NAME = '份号登记', DESCRIPTION = '流程：涉密发文：份号登记', PRE_CONDITION = '$scope.fc.wpsDetail.middleContentType==''form'' && $scope.task.status==''Accepted''  && SysUtils.notEmpty( $scope.task.theCommonFormInfo,["wfSecretConfirm","dicTypeRef","name"])', ACTION_TO_PERFORM = '$scope.fc.openInstanceNumber()', IMAGE_URL = 'images/sidebar_right-fhdj.svg', ORDER_NUM = 880, FLAG = '1', ACTION_TYPE = 'currentTaskDeal' WHERE ID = 108466;
UPDATE WF_FORM_ACTION SET ACTION_ID = 'uploadFile', NAME = '上传文档', DESCRIPTION = '流程：上传文档', PRE_CONDITION = '$scope.fc.wpsDetail.middleContentType==''form''&& $scope.task.status==''Accepted'' && $scope.task.taskType==''NormalFlow''', ACTION_TO_PERFORM = '$scope.addAttachment()', IMAGE_URL = 'images/sidebar_right-uploadFile.svg', ORDER_NUM = 201, FLAG = '1', ACTION_TYPE = 'currentTaskDeal' WHERE ID = 600000;
UPDATE WF_FORM_ACTION SET ACTION_ID = 'downloadFile', NAME = '下载文档', DESCRIPTION = '流程：下载文档', PRE_CONDITION = '$scope.fc.wpsDetail.middleContentType!=''form''', ACTION_TO_PERFORM = '$scope.fc.downLoadCurrentAtt()', IMAGE_URL = 'images/sidebar_right-downloadFile.svg', ORDER_NUM = 305, FLAG = '1', ACTION_TYPE = 'currentTaskDeal' WHERE ID = 600001;
UPDATE WF_FORM_ACTION SET ACTION_ID = 'viewHistory', NAME = '查看流程', DESCRIPTION = '流程：流转记录', PRE_CONDITION = '$scope.fc.wpsDetail.middleContentType==''form''', ACTION_TO_PERFORM = '$scope.viewHistory()', IMAGE_URL = 'images/sidebar_right-lzjl.svg', ORDER_NUM = 810, FLAG = '1', ACTION_TYPE = 'hisView' WHERE ID = 759475;
UPDATE WF_FORM_ACTION SET ACTION_ID = 'printNumRegist', NAME = '份号登记', DESCRIPTION = '流程：涉密发文：份号登记', PRE_CONDITION = '$scope.fc.wpsDetail.middleContentType==''form'' && SysUtils.notEmpty( $scope.task.theCommonFormInfo,["wfSecretConfirm","dicTypeRef","name"])', ACTION_TO_PERFORM = '$scope.fc.openInstanceNumber()', IMAGE_URL = 'images/sidebar_right-fhdj.svg', ORDER_NUM = 880, FLAG = '1', ACTION_TYPE = 'hisView' WHERE ID = 759476;
UPDATE WF_FORM_ACTION SET ACTION_ID = 'hisSaveForm', NAME = '保存表单', DESCRIPTION = '审批单：保 存', PRE_CONDITION = '$scope.fc.wpsDetail.middleContentType==''form''', ACTION_TO_PERFORM = '$scope.saveForm()', IMAGE_URL = 'images/sidebar_right-bc.svg', ORDER_NUM = 200, FLAG = '1', ACTION_TYPE = 'hisView' WHERE ID = 759477;
UPDATE WF_FORM_ACTION SET ACTION_ID = 'HisAssociatedShouWen', NAME = '关联收文', DESCRIPTION = '审批单：关联收文', PRE_CONDITION = '$scope.fc.wpsDetail.middleContentType==''form'' && SysUtils.notEmpty($scope.task.theCommonFormInfo,[''belongProInst'',''relatedReceiveDocId''])', ACTION_TO_PERFORM = '$scope.fc.relationReciveDoc(''relatedReceiveDocIdDialog'',''relatedReceiveDocId'')', IMAGE_URL = 'images/sidebar_right-glsw.svg', ORDER_NUM = 250, FLAG = '1', ACTION_TYPE = 'hisView' WHERE ID = 759478;
UPDATE WF_FORM_ACTION SET ACTION_ID = 'adjustOpinions', NAME = '意见调整', DESCRIPTION = '审批单：意见调整', PRE_CONDITION = '$scope.fc.wpsDetail.middleContentType==''form''', ACTION_TO_PERFORM = '$scope.adjustOpinions()', IMAGE_URL = 'images/sidebar_right-yjlr.svg', ORDER_NUM = 220, FLAG = '1', ACTION_TYPE = 'currentTaskDeal' WHERE ID = 759479;
UPDATE WF_FORM_ACTION SET ACTION_ID = 'adjustOpinions', NAME = '意见调整', DESCRIPTION = '审批单：意见调整', PRE_CONDITION = '$scope.fc.wpsDetail.middleContentType==''form''', ACTION_TO_PERFORM = '$scope.adjustOpinions()', IMAGE_URL = 'images/sidebar_right-yjlr.svg', ORDER_NUM = 220, FLAG = '1', ACTION_TYPE = 'hisView' WHERE ID = 759480;
UPDATE WF_FORM_ACTION SET ACTION_ID = 'duwenJdOpinions', NAME = '进度调整', DESCRIPTION = '审批单：督文进度调整', PRE_CONDITION = '$scope.fc.wpsDetail.middleContentType==''form''&& $scope.task.status==''Accepted''', ACTION_TO_PERFORM = '$scope.duwenJdOpinions(''blqk'')', IMAGE_URL = 'images/sidebar_right-yjlr.svg', ORDER_NUM = 230, FLAG = '1', ACTION_TYPE = 'currentTaskDeal' WHERE ID = 759481;
UPDATE WF_FORM_ACTION SET ACTION_ID = 'returnTasksInHis', NAME = '撤回任务', DESCRIPTION = '任务：未接受撤回', PRE_CONDITION = '$scope.fc.wpsDetail.middleContentType==''form'' && $scope.task.canReturnTasks.length > 0', ACTION_TO_PERFORM = '$scope.wf.hisView.fun.returnTasks()', IMAGE_URL = 'images/sidebar_right-bc.svg', ORDER_NUM = 100, FLAG = '1', ACTION_TYPE = 'hisView' WHERE ID = 759482;
UPDATE WF_FORM_ACTION SET ACTION_ID = 'duwenJdPerOpinions', NAME = '进度录入', DESCRIPTION = '审批单：督文进度录入', PRE_CONDITION = '$scope.fc.wpsDetail.middleContentType==''form''&& $scope.task.status==''Accepted''', ACTION_TO_PERFORM = '$scope.duwenJdPerOpinions(''blqk'')', IMAGE_URL = 'images/sidebar_right-yjlr.svg', ORDER_NUM = 230, FLAG = '1', ACTION_TYPE = 'currentTaskDeal' WHERE ID = 759483;
UPDATE WF_FORM_ACTION SET ACTION_ID = 'returnFormWps', NAME = '显示表单', DESCRIPTION = '正文流式wps：返回表单', PRE_CONDITION = '$scope.fc.wpsDetail.middleContentType==''wps''', ACTION_TO_PERFORM = '$scope.fc.returnForm()', IMAGE_URL = 'images/sidebar_right-fhbd.svg', ORDER_NUM = 390, FLAG = '1', ACTION_TYPE = 'hisView' WHERE ID = 869340;
UPDATE WF_FORM_ACTION SET ACTION_ID = 'returnFormOfd', NAME = '显示表单', DESCRIPTION = '正文版式ofd：返回表单', PRE_CONDITION = '$scope.fc.wpsDetail.middleContentType==''ofd''', ACTION_TO_PERFORM = '$scope.fc.returnForm()', IMAGE_URL = 'images/sidebar_right-fhbd.svg', ORDER_NUM = 490, FLAG = '1', ACTION_TYPE = 'hisView' WHERE ID = 869341;
UPDATE WF_FORM_ACTION SET ACTION_ID = 'delofdSign', NAME = '撤销签章', DESCRIPTION = '正文版式ofd：撤销签章', PRE_CONDITION = '$scope.fc.wpsDetail.middleContentType==''ofd''', ACTION_TO_PERFORM = '$scope.fc.delofdSign()', IMAGE_URL = 'images/sidebar_right-ht.svg', ORDER_NUM = 470, FLAG = '0', ACTION_TYPE = 'currentTaskDeal' WHERE ID = 869342;
UPDATE WF_FORM_ACTION SET ACTION_ID = 'informMeeting', NAME = '知      会', DESCRIPTION = '任务:会议知会', PRE_CONDITION = '$scope.task.readMode==''task''&& $scope.fc.wpsDetail.middleContentType==''form''&& $scope.task.status==''Accepted'' && $scope.task.taskType==''NormalFlow''', ACTION_TO_PERFORM = '$scope.informMeeting()', IMAGE_URL = 'images/sidebar_right-bc.svg', ORDER_NUM = 999, FLAG = '1', ACTION_TYPE = 'currentTaskDeal' WHERE ID = 888888;

commit ;