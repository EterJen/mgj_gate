/*myApp.config(function ($stateProvider, ENV) {
    $stateProvider.state('formEditGeneric.gfkgbfawen', {
        url: "/gfkgbfawen/:taskInfoId",
        views: {
            'middleForm@formEditGeneric': {
                templateUrl: ENV.templateLocate + "/apps/workflow/formTemplates/gfkgbfawen.html?ts=" + timestamp,
                controller: "formEditGenericGfkgbfawenCtrl",
                cache: false,
            }
        }
    });
});*/

myApp.controller('formEditGenericGfkgbfawenCtrl', ['$scope', 'ENV', '$state', '$stateParams', 'SysUtils', 'dataFactory', '$ocLazyLoad', function ($scope, ENV, $state, $stateParams, SysUtils, dataFactory, $ocLazyLoad) {
    console.log("formEditGenericGfkgbfawenCtrl controller");
    console.log('子状态：' + $scope.$parent.taskId);

    /*************************一、变量定义****************************/
    $scope.$parent.taskId = $stateParams.taskInfoId;//当前的任务id
    /*************************二、函数定义****************************/
    $scope.fc.preSaveForm = function () {
        var thisValid = this;

        if (!($scope.publicityLevelDetail.currentLevel.contain('zdgk') || $scope.publicityLevelDetail.currentLevel.contain("ysqgk") || $scope.publicityLevelDetail.currentLevel.contain('ysqgk'))) {
            SysUtils.swalForTips("提示", "主动公开与信息开中必选选择一项!", "info", function (isConfirm) {
                return $scope.saveFormBz();
            });
        } else if (($scope.publicityLevelDetail.currentLevel.contain('ysqgk') && !SysUtils.notEmpty($scope.task.theCommonFormInfo, ['otherReason']))) {
            SysUtils.swalForTips("提示", "请填写不予公开理由", "info", function (isConfirm) {
                return $scope.saveFormBz();
            });
        } else {
            return thisValid.nextValidRun();
        }
    }


    /*保存前 数据处理 辅助逻辑*/
    $scope.fc.updateDocFullName = function () {
        /*拟稿日期检查*/
        $scope.task.theCommonFormInfo[$scope.queryDetaiTable()].niGaoDate = [$scope.task.theCommonFormInfo[$scope.queryDetaiTable()].niGaoY, $scope.task.theCommonFormInfo[$scope.queryDetaiTable()].niGaoM, $scope.task.theCommonFormInfo[$scope.queryDetaiTable()].niGaoD].join('-');
    };

    $scope.fc.generateDocfullName = function () {
        /*文档全称检查*/
        if (SysUtils.notEmpty($scope.task.theCommonFormInfo.docNumber, [])) {
            $scope.task.theCommonFormInfo.belongProInst.docFullName = $scope.task.theCommonFormInfo.docPrefix + "（" + $scope.task.theCommonFormInfo.docYear + "）" + $scope.task.theCommonFormInfo.docNumber + "号";
        } else {/*文档全称  不带号*/
            $scope.task.theCommonFormInfo.belongProInst.docFullName = $scope.task.theCommonFormInfo.docPrefix + "（" + $scope.task.theCommonFormInfo.docYear + "）" + "号";
        }
    };

    $scope.fc.initCurrTask = function () {
        if (SysUtils.notEmpty($scope.task, ['theCommonFormInfo', 'publicityLevel'])) {
            $scope.publicityLevelDetail.currentLevel = $scope.task.theCommonFormInfo.publicityLevel.split('|');
        }

        //直接从task拿到定密单
        $scope.$parent.secretConfirm = $scope.task.theCommonFormInfo.wfSecretConfirm;

        niGaoDateArr = $scope.task.theCommonFormInfo[$scope.queryDetaiTable()].niGaoDate.split('-');

        $scope.task.theCommonFormInfo[$scope.queryDetaiTable()].niGaoY = niGaoDateArr[0];
        $scope.task.theCommonFormInfo[$scope.queryDetaiTable()].niGaoM = niGaoDateArr[1]
        $scope.task.theCommonFormInfo[$scope.queryDetaiTable()].niGaoD = niGaoDateArr[2]
        $scope.publicityLevelShow();
        $scope.$applyAsync();

    };


    /*************************三、初始化调用****************************/
    /*子ctrl调用完毕再初始化*/


}]);


