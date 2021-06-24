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

myApp.controller('npcHandlingCtrl', ['$scope', 'ENV', '$state', '$stateParams',  'SysUtils', 'dataFactory', '$ocLazyLoad', function ($scope, ENV, $state, $stateParams,  SysUtils, dataFactory, $ocLazyLoad) {
    /*************************一、变量定义****************************/
    /*$scope.fc.receiptYears=[];
    for(var i=2018;i<=2025;i++){
        $scope.fc.receiptYears.push(i);
    }*/
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
        /*$scope.publicityLevelDetail.currentLevel = $scope.task.theCommonFormInfo.publicityLevel.split('|');
        $scope.publicityLevelShow();
        $scope.$applyAsync();*/
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

    /**
     * 弹出收文编号选择框
     */
    $scope.fc.selectYear = function (Dialog) {
        $("#"+Dialog+"Dialog").modal('show');
    }

    $scope.fc.generateDocfullName = function () {
        /*文档全称检查*/
        if (SysUtils.notEmpty($scope.task.theCommonFormInfo.docNumber, [])) {
            $scope.task.theCommonFormInfo.belongProInst.docFullName = $scope.task.theCommonFormInfo.docPrefix + "（" + $scope.task.theCommonFormInfo.docYear + "）" + SysUtils.PrefixInteger($scope.task.theCommonFormInfo.docNumber, 4);
        }
    };
}]);


