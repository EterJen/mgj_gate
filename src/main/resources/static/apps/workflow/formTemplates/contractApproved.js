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

myApp.controller('formEditGenericContractApprovedCtrl', ['$scope', 'ENV', '$state', '$stateParams',  'SysUtils', 'dataFactory', '$ocLazyLoad', function ($scope, ENV, $state, $stateParams,  SysUtils, dataFactory, $ocLazyLoad) {
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



    $scope.showYearNum = function (){
    	$('#yearNumDialog').modal('show');
    	$('.modal-backdrop').hide();
    }
    $scope.numComit = function () {
    	$('#yearNumDialog').modal('hide');
    	SysUtils.requestByJson("/formContractApproved/queryYearNum", $scope.task.theCommonFormInfo.docYear, function (resultInfo) {
    		console.log($scope.task.theCommonFormInfo.belongProInst.docFullName)
    		$scope.task.theCommonFormInfo.belongProInst.docFullName = resultInfo.bean.contractnum;
    		$scope.$apply();
    	})
    }

    $scope.fc.generateDocfullName = function () {
        /*文档名称*/
        if (SysUtils.notEmpty($scope.task.theCommonFormInfo.docNumber, [])) {
            $scope.task.theCommonFormInfo.belongProInst.docFullName = $scope.task.theCommonFormInfo.docPrefix + "（" + $scope.task.theCommonFormInfo.docYear + "）" + SysUtils.PrefixInteger($scope.task.theCommonFormInfo.docNumber, 4);
        } else {/*文档全称  不带号*/
            $scope.task.theCommonFormInfo.belongProInst.docFullName = $scope.task.theCommonFormInfo.docPrefix + "（" + $scope.task.theCommonFormInfo.docYear + "）" ;
        }
    };

}]);


