myApp.controller('contactInformationCtl', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils', '$timeout', '$stateParams', '$filter', 'NodeTreeTool', 'dataFactory', '$interval', 'sessionStorageService', function ($rootScope, $scope, ENV, $state, SysUtils, $timeout, $stateParams, $filter, NodeTreeTool, dataFactory, $interval, sessionStorageService) {
    $scope.queryBean = function () {
        var url = '/contactInformation/read/1';
        SysUtils.requestByJson(url, {}, function (resultInfo) {
            $scope.bean = resultInfo.bean;
            $scope.$applyAsync();
        });
    };
    $scope.queryBean();
    $scope.updateBean = function () {
        SysUtils.swalConfirm('警告', '确认进行修改操作?', 'warning', function (isConfirm) {
            if (isConfirm) {
                var url = '/contactInformation/update';
                SysUtils.requestByJson(url, $scope.bean, function (resultInfo) {
                    $scope.bean = resultInfo.bean;
                    $scope.queryBean();
                });
            }
        });
    }
}]);