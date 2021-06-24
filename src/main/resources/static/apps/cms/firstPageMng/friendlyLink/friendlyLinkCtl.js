myApp.controller('friendlyLinkCtl', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils', '$timeout', '$stateParams', '$filter', 'NodeTreeTool', 'dataFactory', '$interval', 'sessionStorageService', function ($rootScope, $scope, ENV, $state, SysUtils, $timeout, $stateParams, $filter, NodeTreeTool, dataFactory, $interval, sessionStorageService) {
    $scope.queryBean = {category: '', ifDelete: 0};
    $scope.ableLinkTypesMap = {
        zygjbm: "中央国家部门",
        mmgljg: "密码管理机构",
        xgdw: "相关单位",
    }

    $scope.ableLinkTypes = [
        {val: 'zygjbm', zh: '中央国家部门'},
        {val: 'mmgljg', zh: '密码管理机构'},
        {val: 'xgdw', zh: '相关单位'},
    ];
    $scope.linkTypes = [
        {val: '', zh: '全部友情连接'},
    ];
    $scope.linkTypes.push(...$scope.ableLinkTypes);
    $scope.cu = sessionStorageService.get(sessionStorageService.key_cu);
    $scope.addBean = function () {
        $scope.addOrUpdateBean = {};
        $scope.addOrUpdateBean.modalTitle = "新增";
        $scope.addOrUpdateBean.ifDelete = 0;
        $('#addOrUpdateModal').modal('show');
    }

    $scope.deletBean = function (bean) {
        SysUtils.swalConfirm('警告', '确认删除记录?', 'warning', function (isConfirm) {
            if (isConfirm) {
                bean.ifDelete = 1;
                $scope.addOrUpdateBean = bean;
                $scope.addBeanCommit();
            }
        });
    }
    $scope.batchDelAble = false;

    $scope.batchDel = function () {
        SysUtils.swalConfirm('警告', '确认删除选中记录?', 'warning', function (isConfirm) {
            $scope.batchDelAble = false;
            var delList = [];
            $scope.beanList.forEach(function (v) {
                if (v.ngChecked) {
                    delList.push(v);
                }
            });
            if (isConfirm) {
                var url = '/friendlyLink/batchDel';
                SysUtils.requestByJson(url, delList, function (resultInfo) {
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
    $scope.addBeanCommit = function () {
        if (!SysUtils.notEmpty($scope.addOrUpdateBean.id)) {
            var url = '/friendlyLink/create';
        } else {
            var url = '/friendlyLink/update';
        }
        SysUtils.requestByJson(url, $scope.addOrUpdateBean, function (resultInfo) {
            $scope.firstPageQuery();
            $('#addOrUpdateModal').modal('hide');
        });
    }

    $scope.beanListCk = false;
    $scope.checkOne = function (bean) {
        res = true;
        $scope.batchDelAble = false;
        $scope.beanList.forEach(function (v) {
            if (v.ngChecked) {
                $scope.batchDelAble = true;
            }
            if (res) {
                res = res && v.ngChecked;
            }
            $scope.beanListCk = res;
        });
    }
    $scope.beanListCkAll = function () {
        if ($scope.beanListCk) {
            $scope.batchDelAble = true;
            $scope.beanList.forEach(function (v) {
                v.ngChecked = true;
            });
        } else {
            $scope.batchDelAble = false;
            $scope.beanList.forEach(function (v) {
                v.ngChecked = false;
            });
        }
    };

    $scope.updateSortList = [];
    $scope.updateSortIdxs = [];
    $scope.updateSortQuery = function () {
        $scope.updateSortList = [];
        $scope.updateSortIdxs = [];
        var url = '/friendlyLink/list';
        SysUtils.requestByJson(url, $scope.updateSortQueryBean, function (resultInfo) {
            $scope.updateSortList = resultInfo.beanList;
            $scope.updateSortList.forEach(function (value, index, array) {
                var sortNumber = index + 1;
                $scope.updateSortIdxs.push(sortNumber);
                value.sortNumber = sortNumber;
                value.newSortNumber = sortNumber;
            });
            $('#updateSortModal').modal('show');
            $scope.$applyAsync();
        });
    }

    $scope.updateBatch = function () {
        var url = '/friendlyLink/sortUpdateBatch';
        SysUtils.requestByJson(url, $scope.updateSortList, function (resultInfo) {
            $('#updateSortModal').modal('hide');
            $scope.firstPageQuery();
            $scope.$applyAsync();
        });
    }

    $scope.changeSort = function () {
        $scope.updateSortQueryBean = {category: 'zygjbm', ifDelete: 0, paging: 'No'};
        $scope.updateSortQuery();
    }
    $scope.newSortChange = function (f) {
        if (f.newSortNumber > f.sortNumber) {
            f.sortNumber = f.newSortNumber + 0.1;
        } else {
            f.sortNumber = f.newSortNumber - 0.1;
        }
        $scope.updateSortList.commonSort();
        $scope.updateSortList.forEach(function (value, index, array) {
            var sortNumber = index + 1;
            value.sortNumber = sortNumber;
            value.newSortNumber = sortNumber;
        });
    };

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
        var url = '/friendlyLink/list';
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