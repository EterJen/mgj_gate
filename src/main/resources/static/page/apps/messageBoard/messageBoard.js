
myApp.controller('messageBoardCtrl', ['$rootScope', '$scope', 'ENV', '$state',  'SysUtils', '$timeout','$stateParams', function ($rootScope, $scope, ENV, $state, SysUtils, $timeout,$stateParams) {
    console.log("messageBoardCtrl");
    /*************************一、变量定义****************************/
    $scope.queryBean = {
        isdelete:0,
        paging: "Yes",
        examine:1,
    };
    $scope.newBean={isdelete:0};
    $scope.fc = {

    };
    $scope.dataObject={

    };

    /*************************二、函数定义****************************/

    /**
     * 初始化查查询
     */
    $scope.queryBeanList = function () {
        var url='/msgboard/list';
        SysUtils.requestByJson(url, $scope.queryBean, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                $scope.dataObject.beanList = resultInfo.beanList;
                $scope.paginationConf.totalItems = resultInfo.totalRows;
                $scope.$apply();
            })
        });
    };


    /**
     * 初始化查询
     */
    /*$scope.queryBeanList = function () {
        var url='/expertstype/list';
        SysUtils.requestByJson(url, $scope.queryBean, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                $scope.fc.expertstypeList=resultInfo.beanList;
                $scope.$apply();
            })
        })
    };*/

    $scope.fc.saveBean = function (modal) {
        var url='/msgboard/create';
        SysUtils.requestByJson(url, $scope.newBean, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                swal(resultInfo.message,"",resultInfo.resultType);
                if (!SysUtils.isEmpty(modal)) {
                    $('#'+modal).modal('hide');
                }
            })
        })
    };

    /**
     * 新增资源管理
     * @param modl
     */
    $scope.fc.addBean = function (modal) {
        console.log($rootScope.currentUser);
        $scope.newBean={
            orguser:$rootScope.currentUser.display,
            department:$rootScope.currentUser.oaDeptName,
        };
        $scope.fc.headPortrait = {};
        /*var obj = document.getElementById('fujian') ;
        obj.outerHTML=obj.outerHTML;*/
        if (!SysUtils.isEmpty(modal)) {
            $('#'+modal).modal('show');
        }
    }









    /*************************三、自动执行函数****************************/
    //$scope.queryBeanList();





    //<editor-fold desc="分页配置">
    $scope.paginationConf = {
        currentPage: 1,
        totalItems: -1,
        itemsPerPage: 3,
        pagesLength: 13,
        perPageOptions: [10, 20, 30, 40, 50],
        onChange: function () {
        }
    };

    $scope.initPaging = function () {
        $scope.paginationConf.currentPage = 1;
        $scope.paginationConf.totalItems = -1;
        $scope.paginationConf.itemsPerPage = 3;

        $scope.$applyAsync();
    };






    $scope.pageAuto = function () {
        //$scope.queryBean = {};
        //$scope.queryBean.paging = "Yes";
        $scope.queryBean.pageNo = $scope.paginationConf.currentPage;
        $scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
        $scope.queryBeanList();
        $scope.$applyAsync();
    };



    $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.pageAuto);
    //</editor-fold>

    $scope.enterKeyup = function (e) {

        //IE 编码包含在window.event.keyCode中，Firefox或Safari 包含在event.which中
        var keycode = window.event ? e.keyCode : e.which;

        if (keycode == 13) {
            $scope.pageAuto();
        } else {
            return;
        }
    };



}]);
