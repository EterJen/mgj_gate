gwNgApp.controller('juBaoTouSuCtl', ['$scope', 'mgjgateUserviewHttp', '$timeout', '$state', 'NgLoading', '$stateParams',
    function ($scope, mgjgateUserviewHttp, $timeout, $state, NgLoading, $stateParams) {

        $scope.showzh = "举报投诉";
        $scope.truethName = "jbts";
        $scope.showzhflag = false;

        //$scope.fc.activeTopBar = $scope.truethName

        if (gwObjectUtils.objNotEmpty($scope.showzh, [])) {
            $scope.showzhflag = true;
        }

        $scope.fc.activeTopBar = $stateParams.categoryStr;


        NgLoading.ngLoadingEnd();
        console.log("--------------举报投诉-----------")

        $scope.jbts = {
            name: "",
            tel: "",
            suggestion_Email: "",
            suggestion_title: "",
            suggestion_body: "",
            varCode: ""
        }
        /**
         * 更改验证码
         */
        $scope.changeImg = function () {
            $("#picVerCode").attr("src", "../../pyOverSeasUser/trustedRequest/verCode?time=" + new Date().getTime());
        }

        $scope.submit_jbts = function () {
            // trustedRequest/saveSuggesTionBox
            console.log($scope.jbts.name + "/" + $scope.jbts.tel + "/" +
                $scope.jbts.suggestion_Email + "/" + $scope.jbts.suggestion_title + "/" +
                $scope.jbts.suggestion_body + "/" + $scope.jbts.varCode);

            if ($scope.jbts.name.length > 0 && $scope.jbts.tel.length > 0 &&
                $scope.jbts.suggestion_Email.length > 0 && $scope.jbts.suggestion_title.length > 0 &&
                $scope.jbts.suggestion_body.length > 0 && $scope.jbts.varCode.length > 0) {
                console.log("-----校验通过----------")
                mgjgateUserviewHttp.jsonPost("/suggesTionBox/trustedRequest/saveSuggesTionBox", $scope.jbts).then(
                    function (res) {
                        if (res.code == '1') {
                            //提交成功
                            alert("您的意见已经提交，我们会尽快处理，谢谢！");
                            window.location.reload();
                        } else {
                            alert(res.msg);
                        }
                    }
                );
            }
        }


    }]);
