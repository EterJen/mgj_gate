
myApp.controller('expertExtractionDetailCtrl', ['$rootScope', '$scope', 'ENV', '$state',  'SysUtils', '$timeout','$stateParams', function ($rootScope, $scope, ENV, $state, SysUtils, $timeout,$stateParams) {
    console.log("expertExtractionDetailCtrl"+$stateParams.parameterId);

    var engineId=$stateParams.parameterId;
    /*************************一、变量定义****************************/
    $scope.queryBean = {
        isdelete:0,
        paging: "No"
    };
    $scope.newBean={};
    $scope.fc = {

    };


    /*************************二、函数定义****************************/


    /**
     * 初始化查询
     */
    $scope.queryBeanList = function () {
        var url='/engine/read/'+engineId;
        SysUtils.requestByJson(url, {}, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                $scope.fc.newNean=resultInfo.bean;
                $scope.$apply();
            })
        })
    };

    $scope.fc.print = function () {
        $("#print").printArea();
    }








    /*************************三、自动执行函数****************************/
    $scope.queryBeanList();




}]);
