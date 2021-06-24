myApp.controller('userViewSkinCtl', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils', '$timeout', '$stateParams', '$filter', 'NodeTreeTool', 'dataFactory', '$interval', 'sessionStorageService', function ($rootScope, $scope, ENV, $state, SysUtils, $timeout, $stateParams, $filter, NodeTreeTool, dataFactory, $interval, sessionStorageService) {
    $scope.years = [2021, 2022, 2023, 2024, 2025]
    $scope.queryYear = 0;
    $scope.beanList = [];
    SysUtils.querySysTime("yyyy-MM-dd HH:mm:ss", function (res) {
        $scope.queryYear = res.bean.year;
        $scope.querySkins();
    });
    $scope.querySkins = function () {
        SysUtils.requestByJson("/userViewSkin/query", $scope.queryYear, function (res) {
            console.log(res);
            $scope.beanList = res.beanList;
            $scope.skinMap = res.additionalInfo.skinMap;
            $scope.skins = res.additionalInfo.skins;
            $scope.$applyAsync();
        });
    };
    $scope.initSkin = function () {
        SysUtils.swalConfirm('提示', '确定初始化该年度皮肤设置吗?', 'info', function (isConfirm) {
            if (isConfirm) {
                SysUtils.requestByJson("/userViewSkin/init", $scope.queryYear, function (res) {
                    $scope.querySkins();
                });
            }
        });

    };
    $scope.update = function (x) {
        SysUtils.requestByJson("/userViewSkin/update", x, function (res) {
            $scope.querySkins();
        });
    };
}]);