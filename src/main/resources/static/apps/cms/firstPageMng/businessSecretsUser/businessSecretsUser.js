myApp.controller('businessSecretsUserCtl', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils', '$timeout', '$stateParams', '$filter', 'NodeTreeTool', 'dataFactory', '$interval', 'sessionStorageService', function ($rootScope, $scope, ENV, $state, SysUtils, $timeout, $stateParams, $filter, NodeTreeTool, dataFactory, $interval, sessionStorageService) {


    $scope.queryBean = {};

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
        $scope.addOrUpdateBean.modalTitle = "详情";
        $('#addOrUpdateModal').modal('show');
    }


    $scope.addBeanCommit = function () {
        if (!SysUtils.notEmpty($scope.addOrUpdateBean.id)) {
            var url = '/managerOfBusinessSecret/create';
        } else {
            var url = '/managerOfBusinessSecret/update';
        }
        SysUtils.requestByJson(url, $scope.addOrUpdateBean, function (resultInfo) {
            swal("提示", "保存成功！", "success");
            $scope.firstPageQuery();
            $('#addOrUpdateModal').modal('hide');
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