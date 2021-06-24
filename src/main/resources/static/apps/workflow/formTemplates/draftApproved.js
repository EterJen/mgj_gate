/*myApp.config(function ($stateProvider, ENV) {
    $stateProvider.state('formEditGeneric.jywjy', {
        url: "/jywjy/:taskInfoId",
        views: {
            'middleForm@formEditGeneric': {
                templateUrl: ENV.templateLocate + "/apps/workflow/formTemplates/jywjy.html?ts=" + timestamp,
                controller: "jywjyCtrl",
                cache: false,
            }
        }
    });
});*/

myApp.controller('formEditGenericDraftApprovedCtrl', ['$scope', 'ENV', '$state', '$stateParams',  'SysUtils', 'dataFactory', '$ocLazyLoad', function ($scope, ENV, $state, $stateParams,  SysUtils, dataFactory, $ocLazyLoad) {
    /*************************一、变量定义****************************/
    /*************************二、函数定义****************************/

    $scope.fc.publicityLevelClick = function (newlevel,cb) {
        SysUtils.swalConfirm("提示", "确定修改文档公开等级吗？", "info", function (isConfirm) {
            if (isConfirm) {
                if ($scope.publicityLevelDetail.currentLevel.contains(newlevel)) {
                    $scope.publicityLevelDetail.currentLevel.remove(newlevel);
                } else {
                    $scope.publicityLevelDetail.currentLevel = $scope.publicityLevelDetail.currentLevel.concat(newlevel);
                }

                if (cb) {
                    cb();
                }

                $scope.task.theCommonFormInfo.publicityLevel = $scope.publicityLevelDetail.currentLevel.join('|');

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




    /*************************三、初始化调用****************************/


}]);


