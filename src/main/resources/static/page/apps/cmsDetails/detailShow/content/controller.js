myApp.controller('cmsDetailshow_content', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils', '$timeout', '$stateParams', 'sessionStorageService', function ($rootScope, $scope, ENV, $state, SysUtils, $timeout, $stateParams, sessionStorageService) {
    $scope.fc.file = sessionStorageService.get($stateParams.tskey);
    SysUtils.requestByJson('/article/read/' + $scope.fc.articleId, {}, function (resultInfo) {
        $scope.bean = resultInfo.bean;
        $scope.$apply();
    });

}]);
