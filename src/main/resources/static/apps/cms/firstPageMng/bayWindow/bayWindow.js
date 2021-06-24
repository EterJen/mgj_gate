myApp.controller('bayWindow', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils', '$timeout', '$stateParams', '$filter', 'NodeTreeTool', 'dataFactory', '$interval', 'sessionStorageService', function ($rootScope, $scope, ENV, $state, SysUtils, $timeout, $stateParams, $filter, NodeTreeTool, dataFactory, $interval, sessionStorageService) {
    $scope.imgFile = {};
    $scope.fileUploadProgress = {};

    $scope.fileUploadBefore = function (file) {
        var ext = SysUtils.parseFiel(file.name).ext;
        if ('|png|jpg|jpeg|bmp|gif|'.indexOf('|'+ext.toLowerCase()+'|') == -1) {
            SysUtils.swalConfirm('警告', '请上传图片格式文件（png、jpg、jpeg、bmp、gif）', 'warning', function (isConfirm) {
            })
        }
    };
    $scope.queryBean = function () {
        var url = '/bayWindow/read/1';
        SysUtils.requestByJson(url, {}, function (resultInfo) {
            $scope.bean = resultInfo.bean;
            $scope.imgFile.uuidName = $scope.bean.imagePath;
            $scope.$applyAsync();
        });
    };
    $scope.queryBean();
    $scope.updateBean = function () {
        SysUtils.swalConfirm('警告', '确认进行修改操作?', 'warning', function (isConfirm) {
            if (isConfirm) {

                $scope.bean.imagePath = $scope.imgFile.uuidName;
                var url = '/bayWindow/update';
                SysUtils.requestByJson(url, $scope.bean, function (resultInfo) {
                    $scope.bean = resultInfo.bean;
                    $scope.queryBean();
                });
            }
        });
    }
    $scope.uploadImg = function () {
        $('#uploadImg').click();
    };
}]);