/*home 用户查看主页*/
gwNgApp.controller('homeCtl', ['$scope', 'mgjgateUserviewHttp', '$timeout', '$state', 'NgLoading', function ($scope, mgjgateUserviewHttp, $timeout, $state, NgLoading) {
    NgLoading.ngLoadingStart();


    $scope.fc = {
        storgeKey: {
            ngState: "gateViewNgState:",
            activeTopBar: "gateViewTopBar:",
        },
    };
    $scope.fc.activeTopBar = 'home';
    $scope.fc.currentNgState = "";
    $scope.fc.currentNgParm = {};

    $scope.fc.parseCategoryTree = function (allArticleCategoryStrMap, categoryIdstrMap, categoryIdStrPathArr, currentCategoryStr) {
        categoryIdStrPathArr.unshift(currentCategoryStr);
        var allArticleCategoryStrMapElement = allArticleCategoryStrMap[currentCategoryStr];
        var parentid = allArticleCategoryStrMapElement.parentid;
        if (gwObjectUtils.objNotEmpty(parentid,[]) && 1 != parentid) {/*根节点id为１*/
            $scope.fc.parseCategoryTree(allArticleCategoryStrMap, categoryIdstrMap, categoryIdStrPathArr, categoryIdstrMap['id:' + parentid]);
        }
    };

    $scope.fc.smallSideBarShow = function () {
        $("#small-sidebar").css("display", "block");
    };

    mgjgateUserviewHttp.jsonPost("/trustedRequest/gateFirstPage/currentDay", {}).then(
        function (res) {
            $scope.fc.currentDay = res.bean;
            $scope.$applyAsync();
        }
    );
    $scope.fc.topBarMap = {
        wzcx: {
            en: 'wzcx',
            zh: '文章查询',
            state: {
                name: "home.articleList",
                parm: {categoryStr: 'xxfb', articleNameLike: $scope.fc.articleNameLike}
            }
        },
        home: {
            en: 'home',
            zh: '网站首页',
            state: {
                name: "home.init",
                parm: {}
            }
        },
        tzgg: {
            en: 'tzgg',
            zh: '通知公告',
            state: {
                name: "home.articleList",
                parm: {categoryStr: 'tzgg'}
            }
        },
        smdt: {
            en: 'smdt',
            zh: '专题专栏',
            state: {
                name: "home.articleList",
                parm: {categoryStr: 'smdt'}
            }
        },
        zcfg: {
            en: 'zcfg',
            zh: '政策法规',
            state: {
                name: "home.articleList",
                parm: {categoryStr: 'zcfg'}
            }
        },
        cpml: {
            en: 'cpml',
            zh: '产品名录',
            state: {
                name: "home.articleList",
                parm: {categoryStr: 'cpml'}
            }
        },
        qyxx: {
            en: 'qyxx',
            zh: '企业信息',
            state: {
                name: "home.linkList",
                parm: {categoryStr: 'qyxx'}
            }
        },
        bszn: {
            en: 'bszn',
            zh: '办事指南',
            state: {
                name: "home.articleList",
                parm: {categoryStr: 'bszn'}
            }
        },

        xzfw: {
            en: 'xzfw',
            zh: '下载服务',
            state: {
                name: "home.articleList",
                parm: {categoryStr: 'xzfw'}
            }
        },
        jsbz: {
            en: 'jsbz',
            zh: '技术标准',
            state: {
                name: "home.linkList",
                parm: {categoryStr: 'jsbz'}
            }
        },
        jbts: {
            en: 'jbts',
            zh: '举报投诉',
            state: {
                name: "home.juBaoTouSu",
                parm: {showzh:"举报投诉",truethName:'jbts',categoryStr: 'jbts'}
            }
        },
        wzck: {
            en: 'wzck',
            zh: '文章查看',
            state: {
                name: "home.articleView",
                parm: {articleId: ''}
            }
        },
        smxh: {
            en: 'smxh',
            zh: '商密协会',
            state: {
                name: "home.smxhView",
            }
        },
        cyjd: {
            en: 'cyjd',
            zh: '产业基地',
            state: {
                name: "home.cyjdView",
            }
        },
        wsbs: {
            en: 'wsbs',
            zh: '网上办事',
            state: {
                name: "home.managerOfBusinessSecret",
                parm: {showzh:"网上办事",truethName:'wsbs'}
            }
        },
        swbz: {
            en: 'swbz',
            zh: '涉外办证',
            state: {
                name: "home.foreignAffairsCertificate",
                parm: {showzh:"涉外办证",truethName:'swbz'}

            }
        },
    }
    $scope.fc.articleNameLikeKeyUp = function (e) {
        //IE 编码包含在window.event.keyCode中，Firefox或Safari 包含在event.which中
        var keycode = window.event ? e.keyCode : e.which;

        if (keycode == 13) {
            $scope.fc.goState($scope.fc.topBarMap.wzcx);
        } else {
            return;
        }
    };
    $scope.fc.topBar = [
        $scope.fc.topBarMap.home,
        $scope.fc.topBarMap.tzgg,
        $scope.fc.topBarMap.smdt,
        $scope.fc.topBarMap.zcfg,
        $scope.fc.topBarMap.cpml,
        $scope.fc.topBarMap.qyxx,
        $scope.fc.topBarMap.bszn,
        $scope.fc.topBarMap.xzfw,
        $scope.fc.topBarMap.jsbz,
        $scope.fc.topBarMap.wsbs,
        $scope.fc.topBarMap.swbz,
        // $scope.fc.topBarMap.jbts,
    ]

    $scope.fc.goBack = function () {
        NgLoading.ngLoadingStart();
        history.go(-1);
    };

    $scope.fc.goArticleList = function (x) {
        var state = {
            name: "home.articleList",
            parm: {categoryStr: x}
        };

        $scope.fc.goNgState(state);
    }

    /*有携带参数/子路由　不会走缓存　没有会走缓存*/
    $scope.fc.goNgState = function (state) {
        NgLoading.ngLoadingStart();
        setTimeout(function () {
            if ($scope.fc.currentNgState === state.name && gwObjectUtils.objEq($scope.fc.currentNgParm, state.parm, true, true)) {
                $state.reload(state.name, state.parm);
            } else {
                $state.go(state.name, state.parm);
            }
        });
    }
    $scope.fc.goState = function (x) {
        $scope.fc.goNgState(x.state);
    };

    $scope.fc.articleView = function (x) {
        $scope.fc.topBarMap.wzck.state.parm.articleId = x.id;
        $scope.fc.goState($scope.fc.topBarMap.wzck);
    }

    $scope.$on("$stateChangeSuccess", function (e, toState, toParams, fromState, fromParams) {
        $scope.fc.currentNgState = toState.name;
        $scope.fc.currentNgParm = toParams;
        console.log($scope.fc.currentNgParm)
        console.log($scope.fc.currentNgState);
    });
}]);
