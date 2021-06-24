myApp.controller('whitelistManagementCtl', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils', '$timeout','$stateParams','dataFactory', function ($rootScope, $scope, ENV, $state, SysUtils, $timeout,$stateParams,dataFactory) {
    console.log("whitelistManagementCtl controller==");

    /*************************一、变量定义****************************/

    $scope.queryBean = {
        isdelete:0,
        paging: "Yes"
    };
    /*各种函数调用*/
    $scope.fc={};
    $scope.newBean={};
    $scope.dataObject={


    };

    /*************************二、函数定义****************************/

    /**
     * 初始化查查询
     */
    $scope.queryBeanList = function () {
        var url='/whitelist/list';
        SysUtils.requestByJson(url, $scope.queryBean, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                //$scope.dataObject.beanList = resultInfo.beanList;
                if (resultInfo.beanList != null && resultInfo.beanList.length > 0) {
                    $scope.newBean=resultInfo.beanList[0];
                }
                //$scope.paginationConf.totalItems = resultInfo.totalRows;
                $scope.$apply();
            })
        });
    };



    /**
     * 保存
     * @param modal
     */
    $scope.fc.saveBean = function (modal) {
        if(SysUtils.notEmpty($scope.newBean,['id'])){
            url="/whitelist/update";
        }else{
            url="/whitelist/create";
        }
        SysUtils.requestByJson(url, $scope.newBean, function (resultInfo) {
            swal("提示",resultInfo.message,resultInfo.resultType);
        })
    }









    //<editor-fold desc="分页配置">
    $scope.paginationConf = {
        currentPage: 1,
        totalItems: -1,
        itemsPerPage: 10,
        pagesLength: 13,
        perPageOptions: [10, 20, 30, 40, 50],
        onChange: function () {
        }
    };

    $scope.initPaging = function () {
        $scope.paginationConf.currentPage = 1;
        $scope.paginationConf.totalItems = -1;
        $scope.paginationConf.itemsPerPage = 10;

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



    //$scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.pageAuto);
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


    /*************************三、初始化调用****************************/
    $scope.queryBeanList();


    $timeout(function () {
        $('.content-wrapper').css('height', SysUtils.get_content_wrapper());
        $('#panel-body-table').css('height', $('.content').height() - $('#panel-heading').outerHeight(true));
        //console.log($('.content').height()+"=="+$('#panel-heading').outerHeight(true)+"==="+$('#ceter_p').height());
        $('.table_shadow').css('max-height', $('.content').height() - $('#panel-heading').outerHeight(true) - $('#ceter_p').outerHeight());
    });


}]);