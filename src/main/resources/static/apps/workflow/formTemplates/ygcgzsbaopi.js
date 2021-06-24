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

myApp.controller('formYgcgzsbaopiCtl', ['$scope', 'ENV', '$state', '$stateParams', 'SysUtils', 'dataFactory', '$ocLazyLoad', function ($scope, ENV, $state, $stateParams, SysUtils, dataFactory, $ocLazyLoad) {
    /*************************一、变量定义****************************/
    /*************************二、函数定义****************************/

    $scope.fc.publicityLevelClick = function (newlevel, cb) {
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


    /**
     * 打开modal
     */
    $scope.showType = function () {

        $('#openModal').modal('show');
        //$('.modal-backdrop').hide();
    }
    /**
     * 选择
     */
    $scope.fc.choose = function (val) {
        $scope.task.theCommonFormInfo.formYgcgzsbaopi.open = val;
        $('input[name=otherTypeRadio]').each(function () {
            if ($(this).val() == val) {
                this.checked = true;
            }
        })
        $('#openModal').modal('hide');
    }
    /**
     * 选择类别
     */
    $scope.fc.chooseCategory = function (val) {
        $scope.task.theCommonFormInfo.docPrefix = "长城电子" + val;
        // var num = '';
        // var docNumber = $scope.task.theCommonFormInfo.docNumber;
        // for(var i=0;i<4-docNumber.toString().length;i++){
        // 	num += "0";
        // }
        // num += $scope.task.theCommonFormInfo.docNumber;
        // $scope.task.theCommonFormInfo.belongProInst.docFullName = val +'('+ $scope.task.theCommonFormInfo.docYear +')'+ num;
        $('input[name=otherCategoryRadio]').each(function () {
            if ($(this).val() == val) {
                this.checked = true;
            }
        })
        $('#categoryModal').modal('hide');
        $scope.fc.receiptYearSelect();/*根据不同前缀生成文号*/
    }

    $scope.fc.generateDocfullName = function () {
        /*文档名称*/
        if (SysUtils.notEmpty($scope.task.theCommonFormInfo.docNumber, [])) {
            $scope.task.theCommonFormInfo.belongProInst.docFullName = $scope.task.theCommonFormInfo.docPrefix + $scope.task.theCommonFormInfo.departName + "（" + $scope.task.theCommonFormInfo.docYear + "）" + $scope.task.theCommonFormInfo.docNumber + "号";
        } else {/*文档全称  不带号*/
            $scope.task.theCommonFormInfo.belongProInst.docFullName = $scope.task.theCommonFormInfo.docPrefix + $scope.task.theCommonFormInfo.departName + "（" + $scope.task.theCommonFormInfo.docYear + "）" + "号";
        }
    };
    /**
     * 打开类别modal
     */
    $scope.showCategoryType = function () {

        $('#categoryModal').modal('show');
        //$('.modal-backdrop').hide();
    }
}]);


