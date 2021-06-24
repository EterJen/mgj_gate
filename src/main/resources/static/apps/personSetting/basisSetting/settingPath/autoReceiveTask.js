myApp.controller('autoReceiveTaskCtl', ['$timeout', '$rootScope', '$scope', 'ENV', '$state', 'dataFactory', 'NodeTreeTool', '$filter', 'SysUtils', function ($timeout, $rootScope, $scope, ENV, $state, dataFactory, NodeTreeTool, $filter, SysUtils) {
    $scope.userModeOptions = [
        {id: "1", name: "是"},
        // {id: 2, name: "单用户唯一"},
        {id: "0", name: "否"},
    ];


    $scope.autoReceiveTaskModify = function () {
        SysUtils.postWhithBackInf('/coreUser/updateSelective', $scope.selectedUser, function (resultInfo) {
        });
    };


    $scope.selectedUser = {};
    if (!SysUtils.notEmpty($rootScope.currentUser, ['username'])) {
        SysUtils.silenceWithAuthAjax("/coreUser/currentUser", {}, function (resultInfo) {
            $rootScope.currentUser = resultInfo.bean;
            $scope.selectedUser.id = $rootScope.currentUser.id;
            $scope.selectedUser.autoReceiveTask = $rootScope.currentUser.autoReceiveTask;
        });
    } else {
        $scope.selectedUser.id = $rootScope.currentUser.id;
        $scope.selectedUser.autoReceiveTask = $rootScope.currentUser.autoReceiveTask;
    }
}]);