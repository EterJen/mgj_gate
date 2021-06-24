/*home 用户查看主页*/
gwNgApp.directive('ngFile', function ($timeout,mgjgateUserviewHttp) {
    return {
        restrict: 'ACE',
        link: function (scope, element) {
            element.on('change', function () {
                var clientFile = this.files[0];
                $(".flyover").show();
                $timeout(function () {

                    var fd = new FormData();
                    fd.append('clientFile', clientFile);
                    fd.append('simpleFileStr', JSON.stringify(scope.file));
                    mgjgateUserviewHttp.fileUpload("/simpleFile/trustedRequest/upload", fd, function (resultInfo) {
                        scope.file.showName = resultInfo.bean.showName;
                        scope.file.originalName = resultInfo.bean.originalName;
                        scope.file.uuidName = resultInfo.bean.uuidName;
                        scope.file.id = resultInfo.bean.id;
                        scope.$apply();
                    });
                }, 200);
            })
        },
        scope: {
            file: '=ngFile'
        }
    }
});
gwNgApp.controller('managerOfBusinessSecretApplyCtl', ['$scope', 'mgjgateUserviewHttp','$rootScope','$state', '$timeout','NgLoading','$stateParams', function ($scope,mgjgateUserviewHttp,$rootScope,$state, $timeout,NgLoading,$stateParams) {

    $scope.showzh = "网上办事";
    $scope.truethName = "wsbs";
    $scope.showzhflag = false;

    $scope.fc.activeTopBar = $scope.truethName

    if (gwObjectUtils.objNotEmpty($scope.showzh, [])) {
        $scope.showzhflag = true;
    }

    $scope.dateList = [2016,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026,2027,2028,2029];
    $scope.imgFile = {};


    $scope.formPath = null;
    $scope.currGroupId = "businessSecretsProduct";
    //$scope.currGroupId = "businessSecretsSale";

    $scope.formTempPath = "pages/home/managerOfBusinessSecretApply/";

    $scope.setFormPath = function () {
        $scope.formPath = $scope.formTempPath + $scope.currGroupId + ".html";
    }

    $scope.changePostCurrentData = function(bean){

        $scope.currGroupId = $scope.bean.status == 0 ? "businessSecretsProduct" : "businessSecretsSale";
        $scope.setFormPath();

    }

    $scope.bean = {
        status:0,
        granted:0
    };

    $scope.setFormPath();

    $scope.save = function () {
        $scope.bean.imagePath = $scope.imgFile.id;
        mgjgateUserviewHttp.jsonPost("/managerOfBusinessSecret/trustedRequest/create", $scope.bean).then(
            function (resultInfo) {

                swal("提示", resultInfo.message, resultInfo.resultType);

                $timeout(function () {
                    swal.close();
                    $state.go("home.managerOfBusinessSecret");
                }, 500);

                $scope.$applyAsync();
            }
        );
    }

    $scope.fanhui = function () {
        $state.go("home.managerOfBusinessSecret");
    }

}]);
