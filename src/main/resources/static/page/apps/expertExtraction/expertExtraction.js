
myApp.controller('expertExtractionCtrl', ['$rootScope', '$scope', 'ENV', '$state',  'SysUtils', '$timeout','$stateParams', function ($rootScope, $scope, ENV, $state, SysUtils, $timeout,$stateParams) {
    console.log("expertExtractionCtrl");
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
        var url='/expertstype/list';
        SysUtils.requestByJson(url, $scope.queryBean, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                resultInfo.beanList.forEach(function (v) {
                    v.pageNo=null;
                });
                $scope.fc.expertstypeList=resultInfo.beanList;
                $scope.$apply();
            })
        })
    };

    $scope.fc.saveBean = function () {
        var url='/engine/extract';
        var flag=true;
        $scope.fc.expertstypeList.forEach(function (v) {
            /*console.log(v.pageNo);
            console.log(!SysUtils.isEmpty(v.pageNo));
            console.log("!=0"+(v.pageNo!=0));*/
            if(!SysUtils.isEmpty(v.pageNo)&&v.pageNo!=0){
                flag=false;
            }
        });
        if(flag){
            swal("请填一项专家人数！","","info");
            return;
        }
        var param={displayname:$scope.newBean.displayname,expertstypeList:$scope.fc.expertstypeList}
        SysUtils.requestByJson(url, param, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                $state.go("menu.expertExtractionDetail",{parameterId:resultInfo.beanId});

            })
        })
    }









    /*************************三、自动执行函数****************************/
    $scope.queryBeanList();




}]);
