myApp.controller('dutyWatchCtrl', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils', '$timeout', '$stateParams', 'sessionStorageService', function ($rootScope, $scope, ENV, $state, SysUtils, $timeout, $stateParams, sessionStorageService) {
    console.log("dutyWatchCtrl");
    /*************************一、变量定义****************************/
    $scope.cu = sessionStorageService.get(sessionStorageService.key_cu);
    $scope.showlunardate = false;

    $scope.fc = {
        years: [],
        month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    };
    $scope.fc.currentYear = new Date().getFullYear();
    $scope.fc.currentMonth = new Date().getMonth() + 1;
    $scope.queryBean = {
        //datelong:SysUtils.dateFtt("yyyy-MM-dd",new Date()),
        //datelong:$scope.fc.currentYear+"-"+$scope.fc.currentMonth+"-01",
        year: $scope.fc.currentYear,
        paging: "Yes"
    };
    for (var i = 2018; i <= 2025; i++) {
        $scope.fc.years.push(i);
    }
    /*$scope.queryBean = {
        isdelete:0,
        paging: "N0"
    };*/
    $scope.iscu = function (name) {
        if (!SysUtils.notEmpty(name, [])) {
            return false;
        }
        if ($scope.cu.display.trim() == name.trim()) {
            return true;
        }
        return false;
    };

    /*************************二、函数定义****************************/

    $scope.fc.ENV = ENV.localapi + "/../";

    $scope.nextMonthQuery = function () {
        $scope.fc.currentMonth += 1;
        if ($scope.fc.currentMonth == 13) {
            $scope.fc.currentMonth = 1;
            $scope.fc.currentYear += 1;

        }
        $scope.queryBeanList();
    }
    /**
     * 初始化查询
     */
    $scope.queryBeanList = function () {
        var url = '/dutytable/showMonth';
        var currentMonth = $scope.fc.currentMonth;
        //console.log(url);
        if (currentMonth < 10) {
            currentMonth = "0" + currentMonth;
        }
        $scope.queryBean.datelong = $scope.fc.currentYear + "-" + currentMonth + "-01";
        SysUtils.requestByJson(url, $scope.queryBean, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                $scope.fc.beanList = resultInfo.beanList;
                //$scope.paginationConf.totalItems = resultInfo.totalRows;
                $scope.$apply();
            })
        })
    };

    $scope.exportMonthJbc = function () {
        var currentYear = $scope.fc.currentYear;
        var currentMonth = $scope.fc.currentMonth;
        if (currentMonth < 10) {
            currentMonth = "0" + currentMonth;
        }
        console.log("currentMonth" + currentYear + "-" + currentMonth + "-01");

        var url = '../dutytable/exportMonth';
        var form = $('<form method = "POST"  action = "' + url + '">');
        form.append($('<input type="hidden" name="datelong" value="' + currentYear + "-" + currentMonth + "-01" + '">'))
        $('body').append(form);
        form.submit();
    }


    $scope.exportMonthTxbw = function () {
        var currentYear = $scope.fc.currentYear;
        var currentMonth = $scope.fc.currentMonth;
        if (currentMonth < 10) {
            currentMonth = "0" + currentMonth;
        }
        console.log("currentMonth" + currentYear + "-" + currentMonth + "-01");

        var url = '../dutytable/exportMonthTxbw';
        var form = $('<form method = "POST"  action = "' + url + '">');
        form.append($('<input type="hidden" name="datelong" value="' + currentYear + "-" + currentMonth + "-01" + '">'))
        $('body').append(form);
        form.submit();
    }


    $scope.dutyManager = function () {
        window.open(ENV.localapi + "/../index.html#!/coreHome/technologyDutyTable");
    }


    /**
     * 搜索商品
     */
    $scope.searchGoods = function () {
        $scope.initPaging();
        $scope.pageAuto();
    }

    $scope.printDuty = function () {
        $("#print").printArea();
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
