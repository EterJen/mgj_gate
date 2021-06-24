myApp.controller('chuKouZhengManagerCtl', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils', '$timeout', '$stateParams', '$filter', 'NodeTreeTool', 'dataFactory', '$interval', 'sessionStorageService', function ($rootScope, $scope, ENV, $state, SysUtils, $timeout, $stateParams, $filter, NodeTreeTool, dataFactory, $interval, sessionStorageService) {


    $scope.queryBean = {type: 2, isDelete: 0};

    $scope.deletBean = function (bean) {
        SysUtils.swalConfirm('警告', '确认删除记录?', 'warning', function (isConfirm) {
            if (isConfirm) {
                SysUtils.requestByJson("/foreignAffairsCertificate/delete/"+bean.id, {}, function (resultInfo) {
                    $scope.firstPageQuery();
                });
            }
        });
    }

    $scope.updateBean = function (bean) {

        if(bean.modify){
            swal("数据项被篡改！","","error");
            return;
        }

        $scope.addOrUpdateBean = bean;
        $scope.addOrUpdateBean.modalTitle = "审核";
        $scope.enterpriseType.forEach(function (value) {
            if(value.id == bean.enterpriseType){
                bean.enterpriseTypeName = value.zhName;
            }
        })
        $('#addOrUpdateModal').modal('show');
    }


    $scope.enterpriseType = [
        {id:1,zhName:'有限责任公司'},
        {id:2,zhName:'股份有限公司'},
        {id:3,zhName:'国有独资公司'},
        {id:4,zhName:'个人独资企业'},
        {id:5,zhName:'合伙企业'},
        {id:6,zhName:'个体工商户'},
        {id:7,zhName:'外商投资企业'},
        {id:8,zhName:'私营企业'},
        {id:9,zhName:'其他性质企业'},
    ];

    $scope.addBeanCommit = function(bean,flag){
        bean.status = flag;
        var url = '/foreignAffairsCertificate/update';
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
        var url = '/foreignAffairsCertificate/list';
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