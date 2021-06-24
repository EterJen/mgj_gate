/*home 用户查看主页*/
gwNgApp.controller('foreignAffairsCertificateApplyCtl', ['$scope', 'mgjgateUserviewHttp','$rootScope','$state', '$timeout','NgLoading','$stateParams', function ($scope,mgjgateUserviewHttp,$rootScope,$state, $timeout,NgLoading,$stateParams) {

    $scope.showzh = "涉外办证";
    $scope.truethName = "swbz";
    $scope.showzhflag = false;

    $scope.fc.activeTopBar = $scope.truethName

    if (gwObjectUtils.objNotEmpty($scope.showzh, [])) {
        $scope.showzhflag = true;
    }



    $scope.types = [
        {id:1,zhName:'进口证'},
        {id:2,zhName:'出口证'}
    ];


    $scope.enterpriseType = [
        {id:1,zhName:'有限责任公司'},
        {id:2,zhName:'股份有限公司'},
        {id:3,zhName:'国有独资公司'},
        {id:4,zhName:'个人独资企业'},
        {id:5,zhName:'合伙企业'},
        {id:6,zhName:'个体工商户'},
        {id:7,zhName:'外商投资企业'},
        {id:8,zhName:'私营企业'},
        {id:9,zhName:'其他性质企业'},
    ];

    $scope.bean = {};

    $scope.save = function () {
        mgjgateUserviewHttp.jsonPost("/foreignAffairsCertificate/trustedRequest/create", $scope.bean).then(
            function (resultInfo) {

                swal("提示", resultInfo.message, resultInfo.resultType);

                $timeout(function () {
                    swal.close();
                    $state.go("home.foreignAffairsCertificate");
                }, 500);

                $scope.$applyAsync();
            }
        );
    }

    $scope.fanhui = function () {
        $state.go("home.foreignAffairsCertificate");
    }

}]);
