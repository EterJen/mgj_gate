/*myApp.config(function ($stateProvider, ENV) {
    $stateProvider.state('formEditGeneric.fawen', {
        url: "/fawen/:taskInfoId",
        views: {
            'middleForm@formEditGeneric': {
                templateUrl: ENV.templateLocate + "/apps/workflow/formTemplates/jxw_fawen.html?ts=" + timestamp,
                controller: "formEditGenericFawenCtrl",
                cache: false,
            }
        }
    });
});*/


myApp.controller('lhfawenCtrl', ['$scope', 'ENV', '$state', '$stateParams', 'SysUtils', function ($scope, ENV, $state, $stateParams, SysUtils) {

    /*************************一、变量定义****************************/
    /*************************二、函数定义****************************/

    /*表单更新前辅助逻辑*/
    $scope.fc.updateDocFullName = function () {
    };

    $scope.fc.generateDocfullName = function () {
    };


    $scope.fc.initCurrTask = function () {
        if (SysUtils.notEmpty($scope.task.belongingProInst,['zhengwenMidAttList'])) {
            $scope.fc.openDocumentText($scope.task.belongingProInst.zhengwenMidAttList[0], "groupOwner");
        }
    }
}]);


