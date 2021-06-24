myApp.controller('loginCtrl', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils', '$timeout', '$stateParams', 'dataFactory', 'sessionStorage', 'sessionStorageService', function ($rootScope, $scope, ENV, $state, SysUtils, $timeout, $stateParams, dataFactory, sessionStorage, sessionStorageService) {
    console.log("loginCtrl");
    /*************************一、变量定义****************************/

    $scope.fc = {
        queryBean: {isdelete: 0}
    };
    $scope.user = {};
    /*************************二、函数定义****************************/

    $scope.loginBtnFocus = function () {
        $('#loginUserId').focus();
    };

    //登陆按钮处理事件
    $scope.loginEnable = true;
    $scope.login = function () {
        if ($scope.loginEnable && SysUtils.nonEmptyCheck($scope.user.username) && SysUtils.nonEmptyCheck($scope.user.password)) {
            $scope.loginEnable = false;
            $(".flyover").show();
            $.ajax({
                type: "POST",
                url: ENV.localapi + "/../auth",
                beforeSend: function (request) {
                    request.setRequestHeader("Content-type", "application/json");
                },
                dataType: 'json',
                data: JSON.stringify($scope.user),
                success: function (resultInfo) {
                    SysUtils.loginhandleResult(resultInfo, $scope, {'state': $state}, function () {
                        userAuthTree = resultInfo.bean.userAuthTree;
                        var noAnyAuth = true;
                        //console.log(resultInfo.bean.userAuthTree);
                        if (SysUtils.notEmpty(userAuthTree, [])) {
                            userAuthTree[0].firstMenuActive = true;
                            if (SysUtils.notEmpty(userAuthTree[0].nodes, [])) {
                                userAuthTree[0].nodes[0].secondMenuActive = true;
                                if (SysUtils.notEmpty(userAuthTree[0].nodes[0].nodes, [])) {
                                    userAuthTree[0].nodes[0].nodes[0].ddon = true;
                                noAnyAuth = false;
                            }
                        }
                        }

                        $scope.$applyAsync();
                        //console.log("user=="+sessionStorage.get("currentUser"));

                        if (!noAnyAuth) {
                            $rootScope.authTree = userAuthTree;
                            $rootScope.currentUser = resultInfo.bean;
                            sessionStorageService.set(sessionStorageService.key_cu, $rootScope.currentUser);
                            $scope.loginOa();
                            if ($rootScope.currentUser.securityUser) {

                                window.location.href = ENV.serverUri + "/index.html#!" + userAuthTree[0].nodes[0].nodes[0].actionurl;
                                // $state.go(userAuthTree[0].nodes[0].ngState);
                            } else {
                                $state.go("menu.coreHome");
                            }
                            /*同步登录到oa系统*/
                            $rootScope.indexNoMagin = false;
                        } else {
                            $rootScope.currentUser = resultInfo.bean;
                            sessionStorageService.set(sessionStorageService.key_cu, $rootScope.currentUser);
                            $scope.loginOa();
                            if ($rootScope.currentUser.securityUser) {

                                $state.go(userAuthTree[0].nodes[0].nodes[0].ngState);
                            } else {
                                $state.go("menu.coreHome");
                            }

                            // SysUtils.swalForTips("提示", "当前用户无任何系统权限，请联系系统安全管理员", "error", function () {
                            // });
                        }
                        $(".flyover").hide();
                        $scope.loginEnable = true;
                    });
                },
                error: function (XMLResponse) {
                    SysUtils.swalForTips("密码错误", "请输入正确的用户名和密码", "error", function () {
                    });
                    console.log(JSON.stringify(XMLResponse));
                    $(".flyover").hide();
                    $scope.loginEnable = true;
                }
            });
        } else {
            SysUtils.swalForTips("账号密码不能为空", "请输入用户名和密码！", "info", function () {
            });
            $timeout(function () {
                swal.close();
                $('#loginUserId').focus();
            }, 1200);
//          setTimeout("$('#loginUserId').focus()", 500);
        }
    };
    //清空用户名和密码
    $scope.relogin = function () {
        $scope.user = {};
    }

    //同步登录oa系统
    $scope.loginOa = function () {
        var accUrl = ENV.oaBasePath + "/restful/cors/datatransfer?operation=SIGNIN&username=" + $rootScope.currentUser.name + "&password=" + $rootScope.currentUser.password;

        dataFactory.getlist(accUrl, 'GET', {'Content-type': "application/plain"}, {}).then(
            function (d) {
                if (!SysUtils.isEmpty(d) && typeof (d) == "string") {
                    console.log(d);
                    /* $rootScope.oaSessionId=d.split(",")[0];
                     console.log($rootScope.oaSessionId);*/
                    sessionStorage.set("oaSessionId", d.split(",")[0]);
                }
                //不管成功与否都跳转首页，这里是oa的接口
                $state.go("menu.coreHome");
            },
            function (d) {
                console.log(JSON.stringify(d));
            }
        )
    }


    //响应登录回车事件
    $scope.myKeyup = function (e) {
        //IE 编码包含在window.event.keyCode中，Firefox或Safari 包含在event.which中
        var keycode = window.event ? e.keyCode : e.which;
        if (keycode == 13) {
            $scope.login();
        }
    };

    /*ukeyLogin*/

    // sessionStorageService.set(sessionStorageService.key_ukeySsoAble,"true");
    var randSign = "";
    $scope.ukeyLogin = function () {
        var ukeySsoAble = sessionStorageService.get(sessionStorageService.key_ukeySsoAble);
        if ("false" == ukeySsoAble) {
            return;
        }
        SysUtils.requestByJson('/ukeySso/randSign', {}, function (resultInfo) {
            randSign = resultInfo.message;
            $scope.doLogin();
        }, {async: false});
    };

    $scope.doLogin = function () {
        try {
            var bodyx = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><getsignandtokenreq version=\"1\"><challenge>" + randSign + "</challenge></getsignandtokenreq>";
            //套接字单点登录
            ws = new WebSocket("ws://127.0.0.1:30318");
            ws.onopen = function (event) {
                console.log("已经建立连ws");
                ws.send(bodyx);
            }
            ws.onerror = function (event) {
                console.log("ws:error");
            }
            ws.onclose = function (event) {
                console.log("ws:close");
            }
            ws.onmessage = function (event) {
                var resStr = event.data;
                resStr = resStr.split("</tokeninfo>")[0];
                resStr = resStr.split("<tokeninfo>")[1];
                ws.close();
                if (resStr.length > 50) {
                    var postBean = {}
                    postBean.rendsign = randSign;
                    postBean.authClientCtrl = resStr;
                    $scope.ukeyLoginTx(postBean);
                }
            }

        } catch (e) {
            throw new Error(e.message);
        }
    };

    $scope.ukeyLoginTx = function (postBean) {
        SysUtils.requestByJson('/ukeySso/login', postBean, function (resultInfo) {
            userAuthTree = resultInfo.bean.userAuthTree;
            var noAnyAuth = true;
            //console.log(resultInfo.bean.userAuthTree);
            if (SysUtils.notEmpty(userAuthTree, [])) {
                userAuthTree[0].firstMenuActive = true;
                if (SysUtils.notEmpty(userAuthTree[0].nodes, [])) {
                    userAuthTree[0].nodes[0].secondMenuActive = true;
                    if (SysUtils.notEmpty(userAuthTree[0].nodes[0].nodes, [])) {
                        userAuthTree[0].nodes[0].nodes[0].ddon = true;
                    noAnyAuth = false;
                }
            }
            }

            $scope.$applyAsync();
            //console.log("user=="+sessionStorage.get("currentUser"));

            if (!noAnyAuth) {
                $rootScope.authTree = userAuthTree;
                $rootScope.currentUser = resultInfo.bean;
                sessionStorageService.set(sessionStorageService.key_cu, $rootScope.currentUser);
                $scope.loginOa();
                if ($rootScope.currentUser.securityUser) {

                    $state.go(userAuthTree[0].nodes[0].nodes[0].ngState);
                } else {
                    $state.go("menu.coreHome");
                }

                //console.log(userAuthTree[0].nodes[0].ngState);
                //$state.go("menu.coreHome");
                /*同步登录到oa系统*/
                $rootScope.indexNoMagin = false;
            } else {
                $rootScope.currentUser = resultInfo.bean;
                sessionStorageService.set(sessionStorageService.key_cu, $rootScope.currentUser);
                $scope.loginOa();
                if ($rootScope.currentUser.securityUser) {

                    $state.go(userAuthTree[0].nodes[0].nodes[0].ngState);
                } else {
                    $state.go("menu.coreHome");
                }
            }
            $(".flyover").hide();
            $scope.loginEnable = true;
        }, {async: false});
    };
    $scope.ukeyLogin();

    /*************************三、自动执行函数****************************/


}]);
