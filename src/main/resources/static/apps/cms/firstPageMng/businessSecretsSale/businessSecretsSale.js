myApp.controller('businessSecretsSaleCtl', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils', '$timeout', '$stateParams', '$filter', 'NodeTreeTool', 'dataFactory', '$interval', 'sessionStorageService', function ($rootScope, $scope, ENV, $state, SysUtils, $timeout, $stateParams, $filter, NodeTreeTool, dataFactory, $interval, sessionStorageService) {


    $scope.dateList = [2016,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026,2027,2028,2029];
    $scope.queryBean = {
        status:1
    };

    $scope.addBean = function () {
        $scope.addOrUpdateBean = {};
        $scope.addOrUpdateBean.modalTitle = "新增";
        $('#addOrUpdateModal').modal('show');
    }

    $scope.deletBean = function (bean) {
        SysUtils.swalConfirm('警告', '确认删除记录?', 'warning', function (isConfirm) {
            if (isConfirm) {
                SysUtils.requestByJson("/managerOfBusinessSecret/delete/"+bean.id, {}, function (resultInfo) {
                    $scope.firstPageQuery();
                });
            }
        });
    }

    $scope.updateBean = function (bean) {

        $scope.addOrUpdateBean = bean;
        $scope.addOrUpdateBean.modalTitle = "修改";
        $('#addOrUpdateModal').modal('show');
    }

    $scope.addBeanCommit = function(bean,flag){
        bean.granted = flag;
        var url = '/managerOfBusinessSecret/update';
        SysUtils.requestByJson(url, bean, function (resultInfo) {
            $('#addOrUpdateModal').modal('hide');
            swal("提示",resultInfo.message,"info");
        });

    }


    $scope.paginationConf = {
        currentPage: 1,
        totalItems: -1,
        itemsPerPage: 10,
        pagesLength: 13,
        perPageOptions: [10, 20, 30, 40, 50],
    };

    $scope.firstPageQuery = function () {
        $scope.paginationConf.currentPage = 1;
        $scope.paginationConf.itemsPerPage = 10;
        $scope.pageAuto();
    };

    $scope.pageAuto = function () {
        $scope.queryBean.pageNo = $scope.paginationConf.currentPage;
        $scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
        var url = '/managerOfBusinessSecret/list';
        SysUtils.requestByJson(url, $scope.queryBean, function (resultInfo) {
            $scope.beanList = resultInfo.beanList;
            $scope.beanList.forEach(function (v) {
                v.ngChecked = false;
            });
            $scope.paginationConf.totalItems = resultInfo.totalRows;
            $scope.$applyAsync();
        });
    };

    $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.pageAuto);
}]);