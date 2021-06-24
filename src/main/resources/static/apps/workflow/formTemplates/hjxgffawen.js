/*myApp.config(function ($stateProvider, ENV) {
    $stateProvider.state('formEditGeneric.hjxgffawen', {
        url: "/hjxgffawen/:taskInfoId",
        views: {
            'middleForm@formEditGeneric': {
                templateUrl: ENV.templateLocate + "/apps/workflow/formTemplates/hjxgffawen.html?ts=" + timestamp,
                controller: "hjxgffawenCtrl",
                cache: false,
            }
        }
    });
});*/


myApp.controller('hjxgffawenCtrl', ['$scope', 'ENV', '$state', '$stateParams', 'SysUtils', 'dataFactory', '$ocLazyLoad', function ($scope, ENV, $state, $stateParams, SysUtils, dataFactory, $ocLazyLoad) {

    /*************************一、变量定义****************************/
    /*************************二、函数定义****************************/
    /*流转前进行表单验证*/
    $scope.fc.preSaveForm = function () {
        var thisValid = this;
        if (!($scope.publicityLevelDetail.currentLevel.contain('zdgk') || $scope.publicityLevelDetail.currentLevel.contain("bygk") || $scope.publicityLevelDetail.currentLevel.contain('ysqgk'))) {
            SysUtils.swalForTips("提示", "主动公开、依申请公开、不予公开中必选选择一项!", "info", function (isConfirm) {
                return $scope.saveFormBz();
            });
        } else if ((($scope.publicityLevelDetail.currentLevel.contain("bygk")) && !SysUtils.notEmpty($scope.task.theCommonFormInfo, ['notOpenReason']))) {
            SysUtils.swalForTips("提示", "请选择不予公开理由!", "info", function (isConfirm) {
                return $scope.saveFormBz();
            });
        } else if ((SysUtils.notEmpty($scope.notOpenReason, ['otherReson']) && !SysUtils.notEmpty($scope.task.theCommonFormInfo, ['otherReason']))) {
            SysUtils.swalForTips("提示", "请填写不予公开的具体其他理由!", "info", function (isConfirm) {
                return $scope.saveFormBz();
            });
        } else {
            return thisValid.nextValidRun();
        }
    }


    $scope.fc.updateDocPrefix = function () {
        if ($scope.task.theCommonFormInfo.docType == '公告') {
            $scope.task.theCommonFormInfo.docPrefix = '公告';
        } else {
            $scope.task.theCommonFormInfo.docPrefix = '长城电子规范';
        }
    }

    /*表单更新前辅助逻辑*/
    $scope.fc.updateDocFullName = function () {
        /*拟稿日期*/
        $scope.task.theCommonFormInfo[$scope.queryDetaiTable()].niGaoDate = [$scope.task.theCommonFormInfo[$scope.queryDetaiTable()].niGaoY, $scope.task.theCommonFormInfo[$scope.queryDetaiTable()].niGaoM, $scope.task.theCommonFormInfo[$scope.queryDetaiTable()].niGaoD].join('-');
    };
    $scope.fc.generateDocfullName = function () {
        /*文档名称*/
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
        if (SysUtils.notEmpty($scope.task, ['theCommonFormInfo', 'notOpenReason'])) {
            arr = $scope.task.theCommonFormInfo.notOpenReason.split('|');
            $scope.notOpenReason.allType.forEach(function (value) {
                if (arr.contain(value)) {
                    $scope.notOpenReason[value] = true;
                }
            });
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


}]);


