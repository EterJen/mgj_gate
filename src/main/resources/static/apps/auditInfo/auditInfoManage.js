/*myApp.config(function ($stateProvider, ENV) {

 $stateProvider.state('coreHome.auditInfoList', {
 url: "/auditInfoList",
 views: {
 'rightContent@coreHome': {
 templateUrl: ENV.templateLocate + "/apps/auditInfo/auditInfoList.html?ts=" + timestamp,
 controller: "AuditInfoCtrl",
 cache: false,
 }
 }
 });

 });*/


myApp.controller('AuditInfoCtrl', ['$scope', 'ENV', '$state',  '$http', 'SysUtils','maxHeigtTool', function ($scope, ENV, $state,  $http, SysUtils,maxHeigtTool) {

    /*************************一、变量定义****************************/
    $scope.auditInfoList = [];
    $scope.queryBean = {};

    /*************************二、函数定义****************************/
    var window_height = $(window).height();
    var heightList = [];
    heightList.push($('.main-header').outerHeight());
    // $('#table_dt').css('height', window_height - 191);
    // $('#currentTaskContent').css('height', maxHeigtTool.maxHeigt(window_height, heightList));

/*
    $scope.queryAuditList = function () {
        $.ajax({
            type: "POST",
            url: ENV.localapi + "/auditInfo/list",
            beforeSend: function (request) {
                request.setRequestHeader("Content-type", "application/json");
                //request.setRequestHeader("Authorization", "Bearer " + $cookies.getObject('user').token);
            },
            dataType: 'json',
            data: JSON.stringify($scope.queryBean),
            success: function (resultInfo) {
                SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                    $scope.auditInfoList = resultInfo.beanList;
                    $scope.$apply();
                })
            },
            error: function (XMLResponse) {
                console.log(JSON.stringify(XMLResponse));
            }
        })
    }
*/

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
    $scope.entitys = [
        "流程实例",
        "代办任务",
        "审核意见",
        "定密单",
        "份号管理",
        "任务流转记录",
        "用户",
        "角色",
        "岗位",
        "部门",
        "关系：角色-人员",
        "关系：部门-岗位-人员",
        "关系：部门-用户",
        "用户模块权限关系授权",
        "领导分管部门中间",
        "流程定义",
    ];

    $scope.oldPage = 1;

    $scope.cuTaskScroll = false;

    $scope.proInst = {};
    $scope.pageAuto = function () {
        $scope.proInst.paging = "Yes";
        $scope.proInst.pageNo = $scope.paginationConf.currentPage;
        $scope.proInst.pageSize = $scope.paginationConf.itemsPerPage;
        $scope.proInst.totalRows = $scope.paginationConf.totalItems;

        $scope.initCuTask();
    };


    $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.pageAuto);
    //</editor-fold>

    $scope.initCuTask = function () {
        SysUtils.requestByJson("/log/list",$scope.proInst,function (resultInfo) {
            $scope.auditInfoList = resultInfo.beanList;
            $scope.paginationConf.totalItems = resultInfo.totalRows;
            $scope.$applyAsync();
        });
    }

    $scope.pageInit = function (detail) {
        $scope.auditTypes = ['登录默认名','修改文章','退出默认名'];

        /*    SysUtils.requestByJson("/log/init?initType=query", {}, function (resultInfo){
                $scope.auditTypes = resultInfo.additionalInfo.aditTypes;
                $scope.auditCreaters = JSON.parse(resultInfo.additionalInfo.auditCreaters);
                console.log($scope.auditCreaters);
            });*/
    };

    $scope.showDetail = function (detail) {
        $scope.queryBean = {};
        $scope.queryBean.paging = "Yes";
        $scope.queryBean.pageNo = 1;
        $scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
        $scope.$applyAsync();
        $('#' + detail).modal('show');
    }

    $scope.querySysLog = function (act) {
        if ("reset" == act) {
            $scope.proInst = {};
            $scope.pageAuto();
        }else {
            $scope.proInst =  $scope.queryBean;
            var reg = /[\u4e00-\u9fa5]/g;
            if (!reg.test($scope.proInst.operatorName)) {
                $scope.proInst.operatorEname = $scope.proInst.operatorName;
                $scope.proInst.operatorName = '';
            }
            $scope.initCuTask();
        }
        $('#sysLogModal' ).modal('hide');
    }
    /*************************三、初始化调用****************************/

    $scope.pageInit();

    // $('.content-wrapper').css('height', SysUtils.get_content_wrapper());
    // $('#panel-body-table').css('height',$('.content').height()-$('#panel-heading').outerHeight(true));
    // $('.table_shadow').css('max-height',$('.content').height()-$('#panel-heading').outerHeight(true)-$('#ceter_p').outerHeight());

}]);