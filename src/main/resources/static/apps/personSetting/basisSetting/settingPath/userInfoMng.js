myApp.controller('userInfoMngCtl', ['$rootScope','$scope', 'ENV', '$state', 'dataFactory', 'NodeTreeTool', '$filter', 'SysUtils',  function ($rootScope,$scope, ENV, $state, dataFactory, NodeTreeTool, $filter, SysUtils) {
    $scope.selectedUser = $rootScope.currentUser;
    $scope.userModeOptions = [
        {id: 3, name: "单用户替代"},
        // {id: 2, name: "单用户唯一"},
        {id: 1, name: "多用户登录"},
    ];

    $scope.disableForm = true;
    $scope.formValid = function (srcForm) {
        if (srcForm.passwordConfirm.$dirty) {
            $scope.disableForm =  srcForm.passwordConfirm.$invalid;
        }else {
            $scope.disableForm = srcForm.$invalid;
        }
    };

    $scope.fileUpload = function () {

        accUrl = ENV.localapi + "/fileOperation/upload";
        var fd = new FormData();

        // console.log(JSON.stringify($scope.selectedUser));
        /*确保新增有效*/
        $scope.selectedUser.flag = 1;
        var file = $scope.headPortrait;
        fd.append('file', file);
        fd.append('fileType', "HeadPortrait");
        fd.append('selectedBean', JSON.stringify($scope.selectedUser));

        dataFactory.getlist(accUrl, 'POST', {'Content-type': undefined}, fd).then(
            function (d) {
                $scope.selectedUser.photofilePath = d.bean;
                $scope.selectedUser.id = d.beanId;
            },
            function (d) {
                console.log(JSON.stringify(d));
            }
        )


    };

    $scope.saveUser = function () {
        var postBean = {};
        postBean.id = $rootScope.currentUser.id;
        postBean.password = $scope.selectedUser.password;
        postBean.oldPwd = $scope.selectedUser.oldPwd;
        postBean.repassword = $scope.selectedUser.repassword;
        $scope.selectedUser = postBean;

        SysUtils.postWhithBackInf('/coreUser/updatePwd', $scope.selectedUser, function (resultInfo) {
        });
    }


}]);