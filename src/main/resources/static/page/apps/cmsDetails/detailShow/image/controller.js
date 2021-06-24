myApp.controller('cmsDetailshow_image', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils', '$timeout', '$stateParams', 'sessionStorageService', function ($rootScope, $scope, ENV, $state, SysUtils, $timeout, $stateParams, sessionStorageService) {
    $scope.fc.file = sessionStorageService.get($stateParams.tskey);
    $("#imgdetail").attr("src",  $scope.fc.file.url);
    $scope.bean = {};
    $scope.bean.contentShowAble = false;
    SysUtils.requestByJson('/article/read/' + $scope.fc.articleId, {}, function (resultInfo) {
        $scope.bean = resultInfo.bean;
        if (SysUtils.notEmpty($scope.bean,['content'])) {
            $scope.bean.contentShowAble = true;
        }
        $scope.$apply();
    });

}]);
