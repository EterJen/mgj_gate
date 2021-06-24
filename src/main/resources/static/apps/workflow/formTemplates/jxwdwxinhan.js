/*
myApp.config(function($stateProvider,ENV) {
	$stateProvider.state('formEditGeneric.jxwxinhan', {
        url: "/jxwxinhan/:taskInfoId",
        views:{
        	'middleForm@formEditGeneric': {
				templateUrl: ENV.templateLocate + "/apps/workflow/formTemplates/jxwxinhan.html?ts=" + timestamp,
				controller: "formEditGenericJxwxinhanCtrl",
				cache: false,
        	}	
        }
    });
}); 
*/

myApp.controller('formEditGenericJxwdwxinhanCtrl', ['$scope', 'ENV', '$state', '$stateParams',  'SysUtils', 'dataFactory', '$ocLazyLoad', function ($scope, ENV, $state, $stateParams,  SysUtils, dataFactory, $ocLazyLoad) {
    console.log("formEditGenericJxwdw xinhanCtrl controller");
    console.log('子状态：'+$scope.$parent.taskId);
    
    /*************************一、变量定义****************************/


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


