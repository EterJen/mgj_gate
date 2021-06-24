/*myApp.config(function ($stateProvider, ENV) {
    $stateProvider.state('formEditGeneric.jywjg', {
        url: "/jywjg/:taskInfoId",
        views: {
            'middleForm@formEditGeneric': {
                templateUrl: ENV.templateLocate + "/apps/workflow/formTemplates/jywjg.html?ts=" + timestamp,
                controller: "jywjgCtrl",
                cache: false,
            }
        }
    });
});*/

myApp.controller('jywjgCtrl', ['$scope', 'ENV', '$state', '$stateParams',  'SysUtils', 'dataFactory', '$ocLazyLoad', function ($scope, ENV, $state, $stateParams,  SysUtils, dataFactory, $ocLazyLoad) {
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


    $scope.fc.generateDocfullName = function () {
        if (SysUtils.notEmpty($scope.task.theCommonFormInfo.docNumber, [])) {
            $scope.task.theCommonFormInfo.belongProInst.docFullName = $scope.task.theCommonFormInfo.docPrefix + "（" + $scope.task.theCommonFormInfo.docYear + "）" + SysUtils.PrefixInteger($scope.task.theCommonFormInfo.docNumber, 4);
            $scope.$applyAsync();
        }
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


