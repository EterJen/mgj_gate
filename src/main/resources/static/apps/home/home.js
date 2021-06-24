myApp.config(function ($stateProvider, ENV) {

    $stateProvider.state('coreHome', {
        url: "/coreHome",
        abstract: true,
        views: {
            //进入到该状态即加载home.html
            '': {
                templateUrl: ENV.templateLocate + '/apps/home/home.html?ts=' + timestamp,
                controller: "homeCtrl",
            },
            //动态视图加载左边的菜单
            'leftMenu@coreHome': {
                templateUrl: ENV.templateLocate + "/apps/home/leftMenu.html?ts=" + timestamp,
                controller: "leftMenuCtrl",
            },
        }
    });
});


myApp.controller('homeCtrl', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils','sessionStorageService','$timeout', function ($rootScope, $scope, ENV, $state, SysUtils,sessionStorageService,$timeout) {
    $rootScope.docNameOrTitle = {};
    $rootScope.docNameOrTitle.a = "";
    $rootScope.docNameOrTitle.b = "";
    $scope.cu = sessionStorageService.get(sessionStorageService.key_cu);
    console.log("homeCtrl");
    $scope.currUserInfo = {};

    var window_height = $(window).height();
    var heightList = [];
    heightList.push($('.main-header').outerHeight());
    // $('.main-sidebar').css('height', window_height);
    // $('#firstdMenu').css('height', window_height);
    // $('#rightContent').css('height', window_height);

    $scope.enterKeyupA = function (e) {
        var keycode = window.event ? e.keyCode : e.which;
        if (keycode == 13 && $rootScope.docNameOrTitle.a.length > 0) {
            $rootScope.docNameOrTitle.b = $rootScope.docNameOrTitle.a;
            $rootScope.docNameOrTitle.a = "";
            if ('/coreHome/officialDocuments' == SysUtils.getUri()) {
                $rootScope.docNameOrTitle.aSearch('all');
            } else {
                if (SysUtils.notEmpty($rootScope.docNameOrTitle.openedWindow, [])) {
                    $rootScope.docNameOrTitle.openedWindow.close();
                }
                $rootScope.docNameOrTitle.openedWindow = window.open(ENV.localapi + "/index.html#!/coreHome/officialDocuments?docKey=" + $rootScope.docNameOrTitle.b);
            }
        }
    }

    $('body').on('hidden.bs.modal', '.bigmodal', function () {
        console.log("RemoveData before:" + $(this).data("bs.modal"));
        $(this).removeData("bs.modal");
        console.log("RemoveData after:" + $(this).data("bs.modal"))
    });
    $('body').on('show.bs.modal', '.middlemodal', function () {
        $(this).draggable({
            handle: ".modal-header",   // 只能点击头部拖动
        });

        $(this).css("overflow-y", "auto");

        var $modal_head = $(this).find('.modal-header');
        $modal_head.css('cursor', 'move');

        var $this = $(this);
        $this.css('display', 'block');
        $(this).css("top", "0px");
        $(this).css("left", "0px");

        var $modal_dialog = $this.find('.modal-dialog');
        $modal_dialog.css("display", "block");
        $modal_dialog.css("position", "absolute");
        $modal_dialog.css("width", "auto");
        $modal_dialog.css("height", "auto");
        $modal_dialog.css("top", "100px");
        $modal_dialog.css("bottom", "100px");
        $modal_dialog.css("right", "400px");
        $modal_dialog.css("left", "400px");

        var $modal_content = $this.find('.modal-content');
        $modal_content.css("height", "100%");

        var $modal_header = $this.find('.modal-header');
        $modal_header.css("position", "absolute");
        $modal_header.css("padding", "10px");
        $modal_header.css("top", "0");
        $modal_header.css("width", "100%");
        $modal_header.css("border-bottom", "1px solid #e5e5e5");

        var $modal_body = $this.find('.modal-body');
        $modal_body.css("position", "absolute");
        $modal_body.css("overflow", "auto");
        $modal_body.css("padding", "5px");
        $modal_body.css("right", "0px");
        $modal_body.css("left", "0px");
        $modal_body.css("top", "50px");
        $modal_body.css("bottom", "58px");
        $modal_body.css("width", "100%");


        var $modal_footer = $this.find('.modal-footer');
        $modal_footer.css("position", "absolute");
        $modal_footer.css("padding", "10px");
        $modal_footer.css("bottom", "0");
        $modal_footer.css("width", "100%");
        $modal_footer.css("border-top", "1px solid #e5e5e5");
    })
    $('body').on('show.bs.modal', '.bigmodal', function () {
        $(this).draggable({
            handle: ".modal-header",   // 只能点击头部拖动
        });

        $(this).css("overflow-y", "auto");

        var $modal_head = $(this).find('.modal-header');
        $modal_head.css('cursor', 'move');

        var $this = $(this);
        $this.css('display', 'block');
        $(this).css("top", "0px");
        $(this).css("left", "0px");

        var $modal_dialog = $this.find('.modal-dialog');
        $modal_dialog.css("display", "block");
        $modal_dialog.css("position", "absolute");
        $modal_dialog.css("width", "auto");
        $modal_dialog.css("height", "auto");
        $modal_dialog.css("top", "10px");
        $modal_dialog.css("bottom", "10px");
        $modal_dialog.css("right", "50px");
        $modal_dialog.css("left", "50px");

        var $modal_content = $this.find('.modal-content');
        $modal_content.css("height", "100%");

        var $modal_header = $this.find('.modal-header');
        $modal_header.css("position", "absolute");
        $modal_header.css("padding", "10px");
        $modal_header.css("top", "0");
        $modal_header.css("width", "100%");
        $modal_header.css("border-bottom", "1px solid #e5e5e5");

        var $modal_body = $this.find('.modal-body');
        $modal_body.css("position", "absolute");
        $modal_body.css("overflow", "auto");
        $modal_body.css("padding", "5px");
        $modal_body.css("top", "50px");
        $modal_body.css("bottom", "58px");
        $modal_body.css("width", "100%");

        var $modal_footer = $this.find('.modal-footer');
        $modal_footer.css("position", "absolute");
        $modal_footer.css("padding", "10px");
        $modal_footer.css("bottom", "0");
        $modal_footer.css("width", "100%");
        $modal_footer.css("border-top", "1px solid #e5e5e5");
    });

    $scope.initModealDialogs = function () {
/*
        $('.minmodal').on('hidden.bs.modal', function () {
            $(this).removeData("bs.modal");
            if (SysUtils.notEmpty($scope.CUserOptionList, [])) {
                $scope.CUserOptionList.forEach(function (value, index, array) {
                    array[index].disDel = false;
                });
            }
        });
*/
/*        $('.minmodal').on('show.bs.modal', function () {
            $(this).css("overflow-y", "auto");

            $(this).draggable({
                handle: ".modal-header",   // 只能点击头部拖动
            });
            var $modal_head = $(this).find('.modal-header');
            $modal_head.css('cursor', 'move');

            $(this).css("overflow", "hidden"); // 防止出现滚动条，出现的话，你会把滚动条一起拖着走的
            $(this).css("top", "0px");
            $(this).css("left", "0px");

            var $this = $(this);
            var $modal_dialog = $this.find('.modal-dialog');
            // 关键代码，如没将modal设置为 block，则$modala_dialog.height() 为零
            $this.css('display', 'block');
            $modal_dialog.css({'margin-top': Math.max(0, ($(window).height() - $modal_dialog.height()) / 4)});

            //<editor-fold desc="垂直居中">
            /!* var $this = $(this);
             var $modal_dialog = $this.find('.modal-dialog');
             // 关键代码，如没将modal设置为 block，则$modala_dialog.height() 为零
             $this.css('display', 'block');
             $modal_dialog.css({'margin-top': Math.max(0, ($(window).height() - $modal_dialog.height()) / 2)});
             // $(this).css("overflow-y", "scroll");*!/
            //</editor-fold>
        });*/
        $('body').on('hidden.bs.modal', '.bigmodal', function () {
            console.log("RemoveData before:" + $(this).data("bs.modal"));
            $(this).removeData("bs.modal");
            console.log("RemoveData after:" + $(this).data("bs.modal"))
        });
        $('body').on('show.bs.modal', '.bigmodal', function () {
            $(this).draggable({
                handle: ".modal-header",   // 只能点击头部拖动
            });
            $(this).css("overflow-y", "auto");

            var $modal_head = $(this).find('.modal-header');
            $modal_head.css('cursor', 'move');

            var $this = $(this);
            $this.css('display', 'block');
            $(this).css("top", "0px");
            $(this).css("left", "0px");

            var $modal_dialog = $this.find('.modal-dialog');
            // 关键代码，如没将modal设置为 block，则$modala_dialog.height() 为零
            $modal_dialog.css({'margin-top': Math.max(0, ($(window).height() - $modal_dialog.height()) / 4)});

            //<editor-fold desc="垂直居中">
            /* var $this = $(this);
             var $modal_dialog = $this.find('.modal-dialog');
             // 关键代码，如没将modal设置为 block，则$modala_dialog.height() 为零
             $this.css('display', 'block');
             $modal_dialog.css({'margin-top': Math.max(0, ($(window).height() - $modal_dialog.height()) / 2)});
             // $(this).css("overflow-y", "scroll");*/
            //</editor-fold>
        });
        $('.bigmodal').on('hidden.bs.modal', function () {
            $(this).removeData("bs.modal");
            if (SysUtils.notEmpty($scope.CUserOptionList, [])) {
                $scope.CUserOptionList.forEach(function (value, index, array) {
                    array[index].disDel = false;
                });
            }
        });
        $('.bigmodal').on('show.bs.modal', function () {
            $(this).draggable({
                handle: ".modal-header",   // 只能点击头部拖动
            });
            $(this).css("overflow-y", "auto");

            var $modal_head = $(this).find('.modal-header');
            $modal_head.css('cursor', 'move');

            var $this = $(this);
            $this.css('display', 'block');
            $(this).css("top", "0px");
            $(this).css("left", "0px");

            var $modal_dialog = $this.find('.modal-dialog');
            // 关键代码，如没将modal设置为 block，则$modala_dialog.height() 为零
            $modal_dialog.css({'margin-top': Math.max(0, ($(window).height() - $modal_dialog.height()) / 4)});

            //<editor-fold desc="垂直居中">
            /* var $this = $(this);
             var $modal_dialog = $this.find('.modal-dialog');
             // 关键代码，如没将modal设置为 block，则$modala_dialog.height() 为零
             $this.css('display', 'block');
             $modal_dialog.css({'margin-top': Math.max(0, ($(window).height() - $modal_dialog.height()) / 2)});
             // $(this).css("overflow-y", "scroll");*/
            //</editor-fold>
        });

        //<editor-fold desc="去除最外层遮罩">
        /*    $('.modal').on('shown.bs.modal', function () {
                $(".modal-backdrop").remove();
            });*/
        //</editor-fold>

    }

    $scope.allDocsSerach = function () {
        if ($rootScope.docNameOrTitle.a.length > 0) {
            $rootScope.docNameOrTitle.b = $rootScope.docNameOrTitle.a;
            if ('/coreHome/officialDocuments' == SysUtils.getUri()) {
                $rootScope.docNameOrTitle.aSearch('all');
            } else {
                if (SysUtils.notEmpty($rootScope.docNameOrTitle.openedWindow, [])) {
                    $rootScope.docNameOrTitle.openedWindow.close();
                }
                $rootScope.docNameOrTitle.openedWindow = window.open(ENV.localapi + "/index.html#!/coreHome/officialDocuments?docKey=" + $rootScope.docNameOrTitle.b, "docSearch");
            }
        }
    }

    $scope.loginoutEx = function () {
        $(".flyover").show();
        $(".modal-backdrop").remove();
        $.ajax({
            type: "POST",
            url: ENV.localapi + "/logOut",
            beforeSend: function (request) {
                request.setRequestHeader("Content-type", "application/json");
                //request.setRequestHeader("Authorization", "Bearer " + $cookies.getObject('user').token);
            },
            dataType: 'json',
            success: function (resultInfo) {
                $(".flyover").hide();
                SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                    $scope.currUserInfo = resultInfo.bean;
                    $scope.$apply();
                    // $cookies.remove("user");
                    sessionStorageService.set(sessionStorageService.key_ukeySsoAble,"false");
                    window.open(ENV.localapi+'/mng', "_self");
                })
            },
            error: function (XMLResponse) {
                $(".flyover").hide();
                console.log(JSON.stringify(XMLResponse));
            }
        });
    }

    $scope.cleanCacheTypes = [
        {val: "exceptLoginInfo", name: "除登录状态"},
        {val: "all", name: "全部"}
    ]
    $scope.cleanSysCache = function () {
        $(".modal-backdrop").remove();
        SysUtils.requestByJson("/cleanCache", {cleanCacheType: $scope.cleanCacheType}, function (resultInfo) {
            $scope.loginoutEx();
        });
    }
    $scope.loginout = function () {
        //调用登出方法
        if (3000 == $rootScope.currentUser.id) {
            $scope.cleanCacheType = "exceptLoginInfo";
            $('#cleanCache').modal('show');
        } else {
            $scope.loginoutEx();
        }
    }

    /*返回首页列表时刷新*/
    $rootScope.reNewBtn = "";

    window.renwPage = function () {
        if (SysUtils.notEmpty($rootScope.reNewBtn, [])) {
            var bacBtn = window.document.getElementById($rootScope.reNewBtn);
            if (SysUtils.notEmpty(bacBtn, [])) {
                bacBtn.click();
            }
        }
    };


}]);


myApp.controller('leftMenuCtrl', ['$rootScope', '$scope', 'ENV', '$state', '$stateParams', 'SysUtils','$timeout','sessionStorageService', function ($rootScope, $scope, ENV, $state, $stateParams, SysUtils,$timeout,sessionStorageService) {
    $scope.queryBean = {};

    console.log("leftMenuCtrl");
    //获取当前用户所拥有权限菜单
    var permissUrl = ENV.localapi + "/coreMpsModule/index.html";
    //SysUtils.httpFactory();
    $scope.goToContent = function (c, $event) {
        $event.stopPropagation();
    /*    angular.forEach($rootScope.secondAuthTree, function (secondMenuItem) {
            angular.forEach(secondMenuItem.nodes, function (thirdMenuItem) {
                thirdMenuItem.ddon = true;
            });
        });
        c.ddon = true;*/

        if(c.ngState.indexOf("http") >= 0){
            window.open(c.ngState,'_blank');
        }else{
            $timeout(function () {
                $state.go(c.ngState, {}, {reload: true});
            });
        }

    };

    $scope.secondMenuChenge = function (b, e) {


        $(".sidebar-menu li").each(function () {
            $(this).find(".dl_box").slideUp(100);
        });
        angular.forEach($rootScope.secondAuthTree, function (secondMenuItem) {
            if (b.id != secondMenuItem.id) {
                secondMenuItem.secondMenuActive = false;
            }
        });
        var _this = e.currentTarget;
        if (b.secondMenuActive) {
            $(_this).find(".dl_box").slideUp(100);
            b.secondMenuActive = false;
        } else {
            $(_this).find(".dl_box").slideDown(100);
            b.secondMenuActive = true;
        }

        $scope.$applyAsync();
    };




    $scope.queryAuthTree = function () {
        $rootScope.authTree = $rootScope.currentUser.userAuthTree;
        $rootScope.authTree[0].firstMenuActive = true;
        angular.forEach($rootScope.authTree, function (firstMenuItem) {
            if (firstMenuItem.firstMenuActive) {
                $scope.firstMenuChenge(firstMenuItem);
            }
        });

        $scope.$applyAsync();
    };

    $scope.paseAuthTreeByUrl = function () {
        $rootScope.currentUser = sessionStorageService.get(sessionStorageService.key_cu);
        $rootScope.authTree = $rootScope.currentUser.userAuthTree;
        $rootScope.secondAuthTree = [];
        // var pageUri = SysUtils.getUri();
        var currentState = $state.$current.name;
        var breakFlag = false;
        angular.forEach($rootScope.authTree, function (firstMenuItem, i1) {
            $rootScope.secondAuthTree.push(...firstMenuItem.nodes);
            if (!breakFlag) {
                angular.forEach(firstMenuItem.nodes, function (secondMenuItem, i2) {
                    angular.forEach(secondMenuItem.nodes, function (thirdMenuItem, i3) {
                        if (currentState == thirdMenuItem.ngState) {
                            breakFlag = true;
                            firstMenuItem.firstMenuActive = true;
                            secondMenuItem.secondMenuActive = true;
                            thirdMenuItem.ddon = true;
                            $scope.$applyAsync();
                        }
                    });
                });
            }
        });

        $scope.$applyAsync();
    };


    $scope.firstMenuClick = function (a) {
        //console.log(JSON.stringify($rootScope.authTree));
        $(".sidebar-menu li").each(function () {
            $(this).find(".dl_box").slideUp(100);
        });
        angular.forEach($rootScope.authTree, function (firstMenuItem) {
            firstMenuItem.firstMenuActive = false;
        });
        a.firstMenuActive = true;
        angular.forEach(a.nodes, function (secondMenuItem) {
            secondMenuItem.secondMenuActive = false;
            angular.forEach(secondMenuItem.nodes, function (thirdMenuItem) {
                thirdMenuItem.ddon = false;
            });
        });
        if (a.nodes[0].nodes !== null && a.nodes[0].nodes.length > 0) {
            a.nodes[0].secondMenuActive = true;
            a.nodes[0].nodes[0].ddon = true;
            $(".sidebar-menu li :first-child").find(".dl_box").slideDown(100);
            $state.go(a.nodes[0].nodes[0].ngState);
        }
        $scope.$applyAsync();
    };

    var window_height = $(window).height();
    var heightList = [];
    heightList.push($('.main-header').outerHeight());
    // $('#firstdMenu').css('height', maxHeigtTool.maxHeigt(window_height, heightList));
    // $('#secondMenu').css('height', maxHeigtTool.maxHeigt(window_height, heightList));

    if (!SysUtils.notEmpty($rootScope.currentUser, ['id'])) {
        SysUtils.silenceWithAuthAjax("/administrator/currentUser", {}, function (resultInfo) {
            $rootScope.currentUser = resultInfo.bean;
            sessionStorageService.set(sessionStorageService.key_cu, $rootScope.currentUser);
            $scope.paseAuthTreeByUrl();
            $scope.$applyAsync();
        });
    }else {
        $scope.paseAuthTreeByUrl();
    };

}]);

myApp.controller('rightContentDefaultCtrl', ['$scope', 'ENV', '$state', '$stateParams', function ($scope, ENV, $state, $stateParams) {

    console.log("rightContentDefaultCtrl");

}]);
