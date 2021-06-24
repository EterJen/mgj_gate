/* 文章详情页*/
gwNgApp.controller('articleViewCtl', ['$scope', 'mgjgateUserviewHttp', '$timeout', 'NgLoading', '$stateParams', function ($scope, mgjgateUserviewHttp, $timeout, NgLoading, $stateParams) {
    console.log(2)
    $scope.fc.articleId = $stateParams.articleId;


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
    mgjgateUserviewHttp.jsonPostWithCache("/trustedRequest/gateFirstPage/categoryStrTreeMap", {}, "categoryStrTreeMap").then(function (res) {
        $scope.categoryIdStrPathArr = [];
        $scope.fc.allArticleCategoryStrMap = res.bean;
        $scope.fc.categoryIdstrMap = res.additionalInfo.categoryIdstrMap;
        return mgjgateUserviewHttp.jsonPost("/article/trustedRequest/read/" + $scope.fc.articleId, {});
    }).then(
        function (resultInfo) {
            $scope.bean = resultInfo.bean;
            console.log($scope.bean)
            $scope.fc.parseCategoryTree($scope.fc.allArticleCategoryStrMap, $scope.fc.categoryIdstrMap, $scope.categoryIdStrPathArr, $scope.fc.categoryIdstrMap['id:'+$scope.bean.docCategoryId]);
            $scope.fc.activeTopBar = $scope.categoryIdStrPathArr[0];

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

}]);
