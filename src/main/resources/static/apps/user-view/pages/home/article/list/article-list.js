/*home 用户查看主页*/
gwNgApp.controller('articleListCtl', ['$scope', 'mgjgateUserviewHttp', '$timeout', 'NgLoading', '$stateParams', function ($scope, mgjgateUserviewHttp, $timeout, NgLoading, $stateParams) {

    $scope.currentCategoryStr = $stateParams.categoryStr;
    $scope.showzh = $stateParams.showzh;
    $scope.truethName = $stateParams.truethName;
    $scope.showzhflag = false;
    if (gwObjectUtils.objNotEmpty($scope.showzh, [])) {
        $scope.showzhflag = true;
    }
    $scope.categoryIdStrPathArr = [];
    $scope.showTpljList = false;

    mgjgateUserviewHttp.jsonPostWithCache("/trustedRequest/gateFirstPage/categoryStrTreeMap", {}, "categoryStrTreeMap").then(function (res) {
        $scope.fc.allArticleCategoryStrMap = res.bean;
        $scope.categoryIdStrPathArr = [];

        $scope.fc.categoryIdstrMap = res.additionalInfo.categoryIdstrMap;
        $scope.fc.parseCategoryTree($scope.fc.allArticleCategoryStrMap,$scope.fc.categoryIdstrMap, $scope.categoryIdStrPathArr, $scope.currentCategoryStr);
        $scope.fc.activeTopBar = $scope.truethName == "" ? $scope.categoryIdStrPathArr[0] : $scope.truethName;
        if ('xxfb' != $scope.fc.activeTopBar) {
            $scope.fc.articleNameLike = "";
        }

        $scope.tpljList = $scope.fc.allArticleCategoryStrMap[$scope.currentCategoryStr].nodes;/*二级菜单用图片链接展示*/
        if ('xxfb' != $scope.fc.activeTopBar && gwObjectUtils.objNotEmpty($scope.tpljList,[])) {
            NgLoading.ngLoadingEnd();
            $scope.showTpljList = true;
        } else {
            $scope.queryBean = {
                paging: 'Yes',
                ifPublished: 1,
                ifDelete: 0
            };
            $scope.queryBean.categoryIdStr = $scope.currentCategoryStr;

            $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.pageAuto);
        }


    });


    $scope.paginationConf = {
        currentPage: 1,
        totalItems: -1,
        itemsPerPage: 20,
        pagesLength: 7,
        perPageOptions: [20, 30, 40, 50],
    };


    $scope.pageAuto = function () {
        $scope.queryBean.titleLike = $scope.fc.articleNameLike;
        $scope.queryBean.pageNo = $scope.paginationConf.currentPage;
        $scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
        console.log($scope.queryBean)
        mgjgateUserviewHttp.jsonPost("/article/trustedRequest/list", $scope.queryBean).then(
            function (resultInfo) {
                $scope.beanList = resultInfo.beanList;
                $scope.paginationConf.totalItems = resultInfo.totalRows;
                NgLoading.ngLoadingEnd();
                $scope.$applyAsync();
            }
        );
    };

    console.log('article')
}]);
