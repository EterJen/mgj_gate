/* 文章详情页*/
gwNgApp.controller('smxhViewCtl', ['$scope', 'mgjgateUserviewHttp', '$timeout', 'NgLoading', '$stateParams', function ($scope, mgjgateUserviewHttp, $timeout, NgLoading, $stateParams) {
    $scope.selNav = ''
    $scope.navs = ['xhjs', 'hydw', 'jqhd'];
    $scope.navMaps = {
        xhjs: {
            zh: "协会介绍",
            click: function () {
                $scope.queryBean = {
                    categoryIdStr: "xtgnymsmxhjs",
                    ifDelete: 0,
                    ifPublished: 1,
                    pageNo: 1,
                    pageSize: 1,
                    paging: "Yes"
                }
                mgjgateUserviewHttp.jsonPost("/article/trustedRequest/list", $scope.queryBean).then(
                    function (resultInfo) {
                        return mgjgateUserviewHttp.jsonPost("/article/trustedRequest/read/" + resultInfo.beanList[0].id, {});
                    }
                ).then(function (resultInfo) {
                    $scope.bean = resultInfo.bean;

                    NgLoading.ngLoadingEnd();
                });
            }
        },
        hydw: {
            zh: "会员单位",
            click: function () {
                $scope.linklistQueryBean = {
                    paging: 'Yes',
                    type:"1",
                    ifDelete: 0
                };
                $scope.linklistPaginationConf.currentPage = 1;
                $scope.linklistPaginationConf.itemsPerPage = 20;
                $scope.$watch('linklistPaginationConf.currentPage + linklistPaginationConf.itemsPerPage', $scope.linklistPageAuto);
            }
        },
        jqhd: {
            zh: "近期活动",
            click: function () {
                $scope.articleQueryBean = {
                    paging: 'Yes',
                    categoryIdStr: "xhdt",
                    ifPublished: 1,
                    ifDelete: 0
                };
                $scope.paginationConf.currentPage = 1;
                $scope.paginationConf.itemsPerPage = 20;
                $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.articlePageAuto);
            }
        }
    }
    $scope.linklistPaginationConf = {
        currentPage: 1,
        totalItems: -1,
        itemsPerPage: 20,
        pagesLength: 7,
        perPageOptions: [ 20, 30, 40, 50],
    };

    $scope.paginationConf = {
        currentPage: 1,
        totalItems: -1,
        itemsPerPage: 20,
        pagesLength: 7,
        perPageOptions: [20, 30, 40, 50],
    };

    $scope.articlePageAuto = function () {
        // $scope.articleQueryBean.titleLike = $scope.fc.articleNameLike;
        $scope.articleQueryBean.pageNo = $scope.paginationConf.currentPage;
        $scope.articleQueryBean.pageSize = $scope.paginationConf.itemsPerPage;
        mgjgateUserviewHttp.jsonPost("/article/trustedRequest/list", $scope.articleQueryBean).then(
            function (resultInfo) {
                $scope.beanList = resultInfo.beanList;
                $scope.paginationConf.totalItems = resultInfo.totalRows;
                NgLoading.ngLoadingEnd();
                $scope.$applyAsync();
            }
        );
    };
    $scope.linklistPageAuto = function () {
        // $scope.linklistQueryBean.titleLike = $scope.fc.articleNameLike;
        $scope.linklistQueryBean.pageNo = $scope.linklistPaginationConf.currentPage;
        $scope.linklistQueryBean.pageSize = $scope.linklistPaginationConf.itemsPerPage;
        mgjgateUserviewHttp.jsonPost("/linksInfo/trustedRequest/list", $scope.linklistQueryBean).then(
            function (resultInfo) {
                $scope.beanList = resultInfo.beanList;
                $scope.linklistPaginationConf.totalItems = resultInfo.totalRows;
                NgLoading.ngLoadingEnd();
                $scope.$applyAsync();
            }
        );
    };

    $scope.smxhArticleView = function (x) {
        $scope.articleContentView = true;
        $scope.article = {
            image: {
                show: false,
                content: ''
            },
            video: {
                show: false,
                content: ''
            },
            text: {
                show: false,
                content: ''
            },
            attachments: {
                show: false,
                content: ''
            }
        }

        mgjgateUserviewHttp.jsonPost("/article/trustedRequest/read/" + x.id, {}).then(
            function (resultInfo) {
                $scope.bean = resultInfo.bean;
                console.log($scope.bean)
                if (gwObjectUtils.objNotEmpty($scope.bean, ['imagePath'])) {
                    $scope.article.image.show = true;
                    $scope.article.image.content = $scope.bean.imagePath;
                    console.log($scope.article.image)
                }
                if (gwObjectUtils.objNotEmpty($scope.bean, ['videoPath'])) {
                    $scope.article.video.show = true;
                    $scope.article.video.content = $scope.bean.videoPath;
                }
                if (gwObjectUtils.objNotEmpty($scope.bean, ['content'])) {
                    $scope.article.text.show = true;
                    $scope.article.text.content = $scope.bean.content;
                }
                if (gwObjectUtils.objNotEmpty($scope.bean, ['simpleFiles'])) {
                    $scope.article.attachments.show = true;
                    $scope.article.attachments.content = $scope.bean.simpleFiles;
                }
                NgLoading.ngLoadingEnd();
                $scope.$applyAsync();
            }
        );

    }

    $scope.navChange = function (navType) {
        $scope.articleContentView = false;
        NgLoading.ngLoadingStart();
        $scope.selNav = navType;
        $scope.navMaps[$scope.selNav].click();
    };

    $scope.navChange($scope.navs[0]);

}]);
