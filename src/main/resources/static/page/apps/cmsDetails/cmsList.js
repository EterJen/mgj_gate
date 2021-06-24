myApp.controller('cmsListCtrl', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils', '$timeout', '$stateParams', 'sessionStorageService', function ($rootScope, $scope, ENV, $state, SysUtils, $timeout, $stateParams, sessionStorageService) {
    console.log("cmsListCtrl");
    /*************************一、变量定义****************************/
    var id = $stateParams.parameterId;

    var ifShowInNewList = undefined;
    if (40 == id) {
        ifShowInNewList = 1;
    }


    $scope.fc = {};
    $scope.queryBean = {
        ifShowInNewList: ifShowInNewList,
        isdelete: 0,
        twolevelcolumnId: id,
        paging: "Yes"
    };

    /*************************二、函数定义****************************/

    $scope.fc.ENV = ENV.localapi + "/../";

    /**
     * 初始化查询
     */
    $scope.queryBeanList = function () {
        var url = '/article/list';
        if (40 == id) {
            $scope.queryBean.twolevelcolumnId = undefined;
        }

        SysUtils.requestByJson(url, $scope.queryBean, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                $scope.fc.beanList = resultInfo.beanList;
                $scope.paginationConf.totalItems = resultInfo.totalRows;
                $scope.$apply();
            })
        });
    };

    $scope.queryDetail = function () {
        var url = '/twolevelcolumn/read/' + id;
        SysUtils.requestByJson(url, {}, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                $scope.fc.twolevelcolumn = resultInfo.bean;
                $scope.$apply();
            })
        })
    };

    /**
     * 判断是否是单一附件
     * @param cms
     */

    $scope.fc.download = function (bean) {
        var url = $scope.fc.ENV + "attach/downloadWps?fileName=" + bean.name;
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

    $scope.activeArticleHover = function (article) {
        $("#cms_a_" + article.id).addClass("a-hover");
    }
    $scope.activeArticleBlur = function (article) {
        $("#cms_a_" + article.id).removeClass("a-hover");
    }
    /**
     * 展示新发布最近7天的文章
     * @param article
     */
    $scope.fc.showNewImage = function (article) {

        if (!SysUtils.isEmpty(article.createtime)) {
            var dateBegin = new Date(article.createtime.replace(/-/g, "/"));
            var dateEnd = new Date();
            var dateDiff = dateEnd.getTime() - dateBegin.getTime();
            var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数
            if (dayDiff < 7) {
                return true;
            }
        }
        return false;
    }
    $scope.fc.goContent = function (twolevelcolumnId) {
        $scope.queryBean.twolevelcolumnId = twolevelcolumnId;
        $scope.searchGoods();
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
    $scope.queryDetail();


}]);
