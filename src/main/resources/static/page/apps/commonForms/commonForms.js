myApp.controller('commonFormsCtrl', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils', '$timeout', '$stateParams', function ($rootScope, $scope, ENV, $state, SysUtils, $timeout, $stateParams) {
    console.log("commonFormsCtrl");
    /*************************一、变量定义****************************/

    $scope.fc = {};
    $scope.queryBean = {
        isdelete: 0,
        paging: "Yes"
    };

    $scope.bz = {
        map: {
            cybd: {
                url: '/comform/list',
                datalist: []
            },
            rjzx: {
                url: '/attachment/list',
                datalist: []
            }
        }
    }
    $scope.activeTabStr = 'cybd';
    $scope.activeTable = function (t,$event) {
        $($event.currentTarget).addClass("sel").siblings().removeClass("sel");
        $scope.activeTabStr = t;
        $scope.initPaging();
        $scope.pageAuto();
    }

    /*************************二、函数定义****************************/

    $scope.fc.ENV = ENV.localapi + "/../";

    /**
     * 初始化查询
     */
    $scope.queryBeanList = function () {
        var url = $scope.bz.map[$scope.activeTabStr].url;

        SysUtils.requestByJson(url, $scope.queryBean, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                $scope.fc.beanList = resultInfo.beanList;
                $scope.paginationConf.totalItems = resultInfo.totalRows;
                $scope.$apply();
            })
        })
    };


    $scope.fc.download = function (bean) {
        var simpleFile = {};
        simpleFile.relativePath = "" + bean.file;
        simpleFile.downloadName = "" + bean.originalName;
        SysUtils.remoteDownload(simpleFile);
        bean.downloadTimes += 1;
        SysUtils.requestByJson('/comform/update', bean, function (resultInfo) {
        });
    }

    /**
     * 搜索商品
     */
    $scope.searchGoods = function () {
        $scope.initPaging();
        $scope.pageAuto();
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
        $scope.queryBean.pageNo = $scope.paginationConf.currentPage;
        $scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
        $scope.queryBeanList();
        $scope.$applyAsync();
    };

    $scope.enterKeyup = function (e) {

        //IE 编码包含在window.event.keyCode中，Firefox或Safari 包含在event.which中
        var keycode = window.event ? e.keyCode : e.which;

        if (keycode == 13) {
            $scope.searchGoods();
        } else {
            return;
        }
    };


    $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.pageAuto);


    /*************************三、自动执行函数****************************/


}]);
