/*home 用户查看主页*/
gwNgApp.controller('managerOfBusinessSecretCtl', ['$scope', 'mgjgateUserviewHttp','$rootScope','$state', '$timeout','NgLoading','$stateParams', function ($scope,mgjgateUserviewHttp,$rootScope,$state, $timeout,NgLoading,$stateParams) {

    $scope.showzh = "网上办事";
    $scope.truethName = "wsbs";
    $scope.showzhflag = false;

    $scope.fc.activeTopBar = $scope.truethName

    if (gwObjectUtils.objNotEmpty($scope.showzh, [])) {
        $scope.showzhflag = true;
    }


    $scope.paginationConf = {
        currentPage: 1,
        totalItems: -1,
        itemsPerPage: 20,
        pagesLength: 7,
        perPageOptions: [20, 30, 40, 50],
    };

    $scope.queryBean = {
        paging: 'Yes'
    };


    $scope.queryList = function(){
        mgjgateUserviewHttp.jsonPost("/managerOfBusinessSecret/trustedRequest/list", $scope.queryBean).then(
            function (resultInfo) {
                $scope.beanList = resultInfo.beanList;
                $scope.paginationConf.totalItems = resultInfo.totalRows;
                NgLoading.ngLoadingEnd();
                $scope.$applyAsync();
            }
        );
    }

    $scope.queryList();

    $scope.apply = function(){
        $state.go("home.managerOfBusinessSecret.apply");
    }




    $scope.pageAuto = function () {
        $scope.queryBean.pageNo = $scope.paginationConf.currentPage;
        $scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;

        $scope.queryList();
    };


    $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.pageAuto);



}]);
