
myApp.controller('softwareCenterCtrl', ['$rootScope', '$scope', 'ENV', '$state',  'SysUtils', '$timeout','$stateParams', function ($rootScope, $scope, ENV, $state, SysUtils, $timeout,$stateParams) {
    console.log("softwareCenterCtrl");
    /*************************一、变量定义****************************/


    $scope.fc = {

    };
    $scope.queryBean = {
        isdelete:0,
        paging: "Yes"
    };

    /*************************二、函数定义****************************/

    $scope.fc.ENV=ENV.localapi+"/../";

    /**
     * 初始化查询
     */
    $scope.queryBeanList = function () {
        var url='/attachment/list';

        SysUtils.requestByJson(url, $scope.queryBean, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                $scope.fc.beanList=resultInfo.beanList;
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
        SysUtils.requestByJson('/attachment/update', bean, function (resultInfo) {
        });
    }

/*
    $scope.fc.download = function (bean) {
        var url = $scope.fc.ENV + "attach/downloadWps?fileName="+bean.name;
        var form = $("<form>");   //定义一个form表单
        form.attr('style', 'display:none');   //在form表单中添加查询参数
        form.attr('target', '');
        form.attr('method', 'post');
        form.attr('action', url);
        var input1 = $('<input>');
        input1.attr('type', 'hidden');
        input1.attr('name', 'path');
        input1.attr('value', bean.file);
        $('body').append(form);  //将表单放置在web中
        form.append(input1);   //将查询参数控件提交到表单上
        form.submit();

    }
*/

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
