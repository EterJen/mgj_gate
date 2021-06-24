/*myApp.config(function($stateProvider,ENV) {
	$stateProvider.state('formEditGeneric.jxwdwshouwen', {
        url: "/jxwdwshouwen/:taskInfoId",
        views:{
        	'middleForm@formEditGeneric': {
				templateUrl: ENV.templateLocate + "/apps/workflow/formTemplates/jxwdwshouwen.html?ts=" + timestamp,
				controller: "formEditGenericJxwdwshouwenCtrl",
				cache: false,
        	}	
        }
    });
});*/

myApp.controller('formEditGenericJxwdwshouwenCtrl', ['$scope', 'ENV', '$state', '$stateParams',  'SysUtils', 'dataFactory', '$ocLazyLoad', function ($scope, ENV, $state, $stateParams,  SysUtils, dataFactory, $ocLazyLoad) {
    console.log("formEditGenericJxwdwshouwenCtrl controller");
    console.log('子状态：'+$scope.$parent.taskId);
    
    /*************************一、变量定义****************************/
    $scope.taskId = $stateParams.taskInfoId;//当前的任务id

    /*************************一、变量定义****************************/
    $scope.$parent.taskId = $stateParams.taskInfoId;//当前的任务id
    /*************************二、函数定义****************************/

    $scope.fc.publicityLevelClick = function (newlevel,cb) {
        SysUtils.swalConfirm("提示", "确定修改文档公开等级吗？", "info", function (isConfirm) {
            if (isConfirm) {
                if ($scope.publicityLevelDetail.currentLevel.contains(newlevel)) {
                    $scope.publicityLevelDetail.currentLevel.remove(newlevel);
                } else {
                    $scope.publicityLevelDetail.currentLevel = $scope.publicityLevelDetail.currentLevel.concat(newlevel);
                }

                $scope.task.theCommonFormInfo.publicityLevel = $scope.publicityLevelDetail.currentLevel.join('|');

                if (cb) {
                    cb();
                }
                $scope.$applyAsync();

                $scope.publicityLevelShow();
            } else {
                return;
            }
        });

    };



    $scope.fc.initCurrTask = function () {
        if (SysUtils.notEmpty($scope.task, ['theCommonFormInfo', 'publicityLevel'])) {
            $scope.publicityLevelDetail.currentLevel = $scope.task.theCommonFormInfo.publicityLevel.split('|');
        }

        $scope.publicityLevelShow();
        $scope.$applyAsync();
    }
    $scope.fc.generateDocfullName = function () {
        if (SysUtils.notEmpty($scope.task.theCommonFormInfo.docNumber, [])) {
            $scope.task.theCommonFormInfo.belongProInst.docFullName = $scope.task.theCommonFormInfo.docPrefix + "（" + $scope.task.theCommonFormInfo.docYear + "）" + SysUtils.PrefixInteger($scope.task.theCommonFormInfo.docNumber, 4);
            $scope.$applyAsync();
        }
    };

    /*************************三、初始化调用****************************/

    $scope.fc.transfeGovernorTx = function () {
        var workflowInfo = {
            id: $scope.taskId,
            operationId: $scope.selectedOp.id,
            assigneeList: $scope.selectedCanditList,
            taskCreateMode: $scope.selectedOp.taskCreateMode,
            transDocType: "dwShouwen2dwDuWen"
        }


        workflowInfo.createTime = $scope.task.theCommonFormInfo.formJxwdwshouwen.receiveDate + " 00:00:00";
        if (SysUtils.notEmpty($scope.wf.nextTask.userOptin, []) && SysUtils.notEmpty($scope.selectedCanditList, [])) {
            var v = $scope.selectedCanditList[0];

            if (v.participantType == "Person") {
                var options = {};
                var t = new Date(SysUtils.sysDate());
                options.approveTime = t.format("yyyy-MM-dd HH:mm:ss");
                options.dealerId = $scope.currentUser.id;
                options.dealerName = $scope.currentUser.name;
                options.showField = "normal";
                options.approverId = v.participantId;
                options.assigneeName = v.participantName;
                /*页面显示名字*/
                options.approverName = options.assigneeName;
                options.opinion = $scope.wf.nextTask.userOptin;
                options.agentFlag = '1';
                workflowInfo.agentOption = options;
            }
            ;
        }

        SysUtils.requestByJson('/rCurrentTaskInfo/transDoc', workflowInfo, function (resultInfo) {
            $scope.task = resultInfo.bean;
            window.location = ENV.localapi + "/index.html#!/officialDocuments/" + $scope.task.belongingProInst.formDefId + "/-" + $scope.task.belongingProInst.id;
            window.location.reload();
        });
    };

    /*转督文*/
    $scope.fc.transfeGovernor = function () {
        $scope.fc.flowAction = $scope.fc.transfeGovernorTx;
        SysUtils.requestByJson('/rCurrentTaskInfo/candis4transDwDuwen', {}, function (resultInfo) {
            $('#moveWorkflowDialog').modal('show');
            $scope.$parent.availableOps = resultInfo.beanList;
            $scope.showOperCandidates($scope.$parent.availableOps[0]);
            $scope.$applyAsync();
        });

    };
}]);


