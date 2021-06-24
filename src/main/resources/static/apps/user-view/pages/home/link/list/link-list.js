/*home 用户查看主页*/
gwNgApp.controller('refLinkListCtl', ['$scope', 'mgjgateUserviewHttp', '$timeout','NgLoading','$stateParams', function ($scope, mgjgateUserviewHttp, $timeout,NgLoading,$stateParams) {
    $scope.fc.activeTopBar = $stateParams.categoryStr;

    $scope.queryBean = {
        paging: 'Yes',
        ifDelete: 0
    };

    $scope.typeMap = {
        qyxx: "1",
        jsbz: "2",
    }


    $scope.queryBean.type = $scope.typeMap[$scope.fc.activeTopBar];

    $scope.paginationConf = {
        currentPage: 1,
        totalItems: -1,
        itemsPerPage: 20,
        pagesLength: 7,
        perPageOptions: [ 20, 30, 40, 50],
    };



    $scope.pageAuto = function () {
        $scope.queryBean.titleLike = $scope.fc.articleNameLike;
        $scope.queryBean.pageNo = $scope.paginationConf.currentPage;
        $scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
        mgjgateUserviewHttp.jsonPost("/linksInfo/trustedRequest/list", $scope.queryBean).then(
            function (resultInfo) {
                $scope.beanList = resultInfo.beanList;
                $scope.paginationConf.totalItems = resultInfo.totalRows;
                NgLoading.ngLoadingEnd();
                $scope.$applyAsync();
            }
        );
    };

    $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.pageAuto);
}]);
