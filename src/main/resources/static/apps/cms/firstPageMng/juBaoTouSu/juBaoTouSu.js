myApp.controller('juBaoTouSuCtl', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils', '$timeout', '$stateParams', '$filter', 'NodeTreeTool', 'dataFactory', '$interval', 'sessionStorageService', function ($rootScope, $scope, ENV, $state, SysUtils, $timeout, $stateParams, $filter, NodeTreeTool, dataFactory, $interval, sessionStorageService) {
    $scope.queryBean = {state: '0'};

    $scope.linkTypes = [
        {val: '0', zh: '未处理'},
        {val: '1', zh: '已处理'},
    ];


    $scope.cu = sessionStorageService.get(sessionStorageService.key_cu);


    $scope.batchDelAble = false;

    //删除
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



    $scope.beanListCk = false;
    //单选
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
    //多选
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
    //更新顺序查询
    $scope.updateSortQuery = function () {
       /* $scope.updateSortList = [];
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
        });*/
    }

    $scope.updateBatch = function () {
       /* var url = '/friendlyLink/sortUpdateBatch';
        SysUtils.requestByJson(url, $scope.updateSortList, function (resultInfo) {
            $('#updateSortModal').modal('hide');
            $scope.firstPageQuery();
            $scope.$applyAsync();
        });*/
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




    //刷新
    $scope.firstPageQuery = function () {
        $scope.paginationConf.currentPage = 1;
        $scope.paginationConf.itemsPerPage = 10;
        $scope.pageAuto();
    };


    //初始化
    $scope.pageAuto = function () {
        $scope.queryBean.pageNo = $scope.paginationConf.currentPage;
        $scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
        var url = '/suggesTionBox/list';
        // console.log($scope.queryBean.suggestiontitle)
        SysUtils.requestByJson(url, $scope.queryBean, function (resultInfo) {
            $scope.beanList = resultInfo.beanList;
            console.log($scope.beanList)
            $scope.beanList.forEach(function (v) {
                v.ngChecked = false;
            });
            $scope.paginationConf.totalItems = resultInfo.totalRows;
            $scope.$applyAsync();
        });
    };

    $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.pageAuto);


    //删除
    $scope.deletBean = function (bean) {
        SysUtils.swalConfirm('警告', '确认删除记录?', 'warning', function (isConfirm) {
            if (isConfirm) {
                $scope.addOrUpdateBean = bean;
                var url = '/suggesTionBox/delete/'+bean.id;
                SysUtils.requestByJson(url, {}, function (resultInfo) {
                    $scope.firstPageQuery();
                    $('#addOrUpdateModal').modal('hide');
                });
            }
        });
    }

    //更新
    $scope.updateBean = function (bean) {
        $scope.addOrUpdateBean = bean;
        $scope.addOrUpdateBean.modalTitle = "查看处理";
        $('#addOrUpdateModal').modal('show');
    }






    //添加修改删除
    $scope.addBeanCommit = function () {
        // alert($scope.addOrUpdateBean.id);
        if (!SysUtils.notEmpty($scope.addOrUpdateBean.id)) {
            var url = '/suggesTionBox/create';
        } else {
            $scope.addOrUpdateBean.state='1';
            $scope.addOrUpdateBean.company='example';

            var url = '/suggesTionBox/update';
        }
        SysUtils.requestByJson(url, $scope.addOrUpdateBean, function (resultInfo) {
            $scope.firstPageQuery();
            $('#addOrUpdateModal').modal('hide');
        });
    }

}]);