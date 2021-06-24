/*myApp.config(function($stateProvider,ENV) {
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
}); */

myApp.controller('blyjbpCtrl', ['$scope', 'ENV', '$state', '$stateParams', 'SysUtils', 'dataFactory', '$ocLazyLoad', function ($scope, ENV, $state, $stateParams, SysUtils, dataFactory, $ocLazyLoad) {

    /*************************一、变量定义****************************/

    $scope.fc.preSaveForm = function () {
        var thisValid = this;
        if (!($scope.publicityLevelDetail.currentLevel.contain('zdgk') || $scope.publicityLevelDetail.currentLevel.contain("bygk") || $scope.publicityLevelDetail.currentLevel.contain('ysqgk'))) {
            SysUtils.swalForTips("提示", "主动公开、不予公开、依申请公开中必选选择一项!", "info", function (isConfirm) {
                return $scope.saveFormBz();
            });
        } else if ((($scope.publicityLevelDetail.currentLevel.contain('ysqgk') || $scope.publicityLevelDetail.currentLevel.contain('bygk')) && !SysUtils.notEmpty($scope.task.theCommonFormInfo, ['otherReason']))) {
            SysUtils.swalForTips("提示", "请填写不予公开理由!", "info", function (isConfirm) {
                return $scope.saveFormBz();
            });
        } else {
            return thisValid.nextValidRun();
        }
    }
    /*$scope.fc.publicityLevelClick = function (newlevel,cb) {
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
              if (SysUtils.notEmpty($scope.publicityLevelDetail,['currentLevel'])) {
                $scope.task.theCommonFormInfo.publicityLevel = $scope.publicityLevelDetail.currentLevel.join('|');
              }

                $scope.$applyAsync();

                $scope.publicityLevelShow();
            } else {
                return;
            }
        });

    };*/


    $scope.fc.initCurrTask = function () {
        console.log($scope.publicityLevelDetail.currentLevel);

        if (SysUtils.notEmpty($scope.task, ['theCommonFormInfo', 'publicityLevel'])) {
            $scope.publicityLevelDetail.currentLevel = $scope.task.theCommonFormInfo.publicityLevel.split('|');
        }
        //$scope.fc.wpsDetail.middleContentType=='wps' && $scope.fc.currentAttach!=null&&$scope.fc.currentAttach.attachment.id!=null&&$scope.fc.currentAttach.bizFileType=='content'&&!$scope.task.currNodeIsShowRevisecurrNodeIsShowRevise
        //console.log($scope.task.currNodeIsShowRevise)
        $scope.publicityLevelShow();
        $scope.$applyAsync();
    }


    /*************************三、初始化调用****************************/


}]);


