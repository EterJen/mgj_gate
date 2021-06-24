/*home 用户查看主页*/
gwNgApp.controller('foreignAffairsCertificateCtl', ['$scope', 'mgjgateUserviewHttp','$rootScope','$state', '$timeout','NgLoading','$stateParams', function ($scope,mgjgateUserviewHttp,$rootScope,$state, $timeout,NgLoading,$stateParams) {

    $scope.showzh = "涉外办证";
    $scope.truethName = "swbz";
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
        paging: 'Yes',
        isDelete: 0
    };


    $scope.queryList = function(){
        mgjgateUserviewHttp.jsonPost("/foreignAffairsCertificate/trustedRequest/list", $scope.queryBean).then(
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
        $state.go("home.foreignAffairsCertificate.apply");
    }




    $scope.pageAuto = function () {
        $scope.queryBean.pageNo = $scope.paginationConf.currentPage;
        $scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;

        $scope.queryList();
    };


    $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.pageAuto);



}]);
