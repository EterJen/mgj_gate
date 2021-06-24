gwNgApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home/init');
    $stateProvider.state('home', {
        url: "/home",
        cache: true,
        views: {
            '': {
                templateUrl: SysInfo.activeEnv.sourcePrefix + "/apps/user-view/pages/home/home.html?ts=" + timestamp,
                controller: "homeCtl",
            }
        },
        resolve: {
            loadFormEditResources: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    SysInfo.activeEnv.sourcePrefix + "/apps/user-view/pages/home/home.js?ts=" + timestamp,
                ]);
            }]
        },
    }).state('home.init', {
        url: "/init",
        cache: true,
        views: {
            'content@home': {
                templateUrl: SysInfo.activeEnv.sourcePrefix + "/apps/user-view/pages/home/init/home-init.html?ts=" + timestamp,
                controller: "homeInitCtl",
            }
        },
        resolve: {
            loadFormEditResources: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    SysInfo.activeEnv.sourcePrefix + "/apps/user-view/pages/home/init/home-init.js?ts=" + timestamp,
                ]);
            }]
        },
    }).state('home.articleList', {
        url: "/articleList/:categoryStr",
        params: {categoryStr: '',articleNameLike:'',showzh:'',truethName:''},
        cache: true,
        views: {
            'content@home': {
                templateUrl: SysInfo.activeEnv.sourcePrefix + "/apps/user-view/pages/home/article/list/article-list.html?ts=" + timestamp,
                controller: "articleListCtl",
            }
        },
        resolve: {
            loadFormEditResources: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    SysInfo.activeEnv.sourcePrefix + "/apps/user-view/pages/home/article/list/article-list.js?ts=" + timestamp,
                ]);
            }]
        },
    }).state('home.linkList', {
        url: "/linkList/:categoryStr",
        params: {categoryStr: ''},
        cache: true,
        views: {
            'content@home': {
                templateUrl: SysInfo.activeEnv.sourcePrefix + "/apps/user-view/pages/home/link/list/link-list.html?ts=" + timestamp,
                controller: "refLinkListCtl",
            }
        },
        resolve: {
            loadFormEditResources: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    SysInfo.activeEnv.sourcePrefix + "/apps/user-view/pages/home/link/list/link-list.js?ts=" + timestamp,
                ]);
            }]
        },
    }).state('home.articleView', {
        url: "/articleView/:articleId",
        params: {articleId: ''},
        cache: true,
        views: {
            'content@home': {
                templateUrl: SysInfo.activeEnv.sourcePrefix + "/apps/user-view/pages/home/article/view/article-view.html?ts=" + timestamp,
                controller: "articleViewCtl",
            }
        },
        resolve: {
            loadFormEditResources: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    SysInfo.activeEnv.sourcePrefix + "/apps/user-view/pages/home/article/view/article-view.js?ts=" + timestamp,
                ]);
            }]
        },
    }).state('home.smxhView', {
        url: "/smxhView",
        cache: true,
        views: {
            'content@home': {
                templateUrl: SysInfo.activeEnv.sourcePrefix + "/apps/user-view/pages/home/smxh/view/smxh-view.html?ts=" + timestamp,
                controller: "smxhViewCtl",
            }
        },
        resolve: {
            loadFormEditResources: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    SysInfo.activeEnv.sourcePrefix + "/apps/user-view/pages/home/smxh/view/smxh-view.js?ts=" + timestamp,
                ]);
            }]
        },
    }).state('home.cyjdView', {
        url: "/cyjdView",
        cache: true,
        views: {
            'content@home': {
                templateUrl: SysInfo.activeEnv.sourcePrefix + "/apps/user-view/pages/home/cyjd/view/cyjd-view.html?ts=" + timestamp,
                controller: "cyjdViewCtl",
            }
        },
        resolve: {
            loadFormEditResources: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    SysInfo.activeEnv.sourcePrefix + "/apps/user-view/pages/home/cyjd/view/cyjd-view.js?ts=" + timestamp,
                ]);
            }]
        },
    }).state('home.juBaoTouSu', {
        url: "/juBaoTouSu/:categoryStr",
        params: {showzh: '',truethName:'',categoryStr: ''},
        views: {
            'content@home': {
                templateUrl: SysInfo.activeEnv.sourcePrefix + "/apps/user-view/JuBaoTouSu/juBaoTouSu.html?ts=" + timestamp,
                controller: "juBaoTouSuCtl",
            }
        },
        resolve: {
            loadFormEditResources: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    SysInfo.activeEnv.sourcePrefix + "/apps/user-view/JuBaoTouSu/juBaoTouSu.js?ts=" + timestamp,
                ]);
            }]
        },
    }).state('home.foreignAffairsCertificate', {
        url: "/foreignAffairsCertificate",
        params: {showzh: '',truethName:''},
        views: {
            'content@home': {
                templateUrl: SysInfo.activeEnv.sourcePrefix + "/apps/user-view/pages/home/foreignAffairsCertificate/foreignAffairsCertificate.html?ts=" + timestamp,
                controller: "foreignAffairsCertificateCtl",
            }
        },
        resolve: {
            loadFormEditResources: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    SysInfo.activeEnv.sourcePrefix + "/apps/user-view/pages/home/foreignAffairsCertificate/foreignAffairsCertificate.js?ts=" + timestamp,
                ]);
            }]
        },
    }).state('home.foreignAffairsCertificate.apply', {
        url: "/foreignAffairsCertificateApply",
        params: {showzh: '',truethName:''},
        views: {
            'content@home': {
                templateUrl: SysInfo.activeEnv.sourcePrefix + "/apps/user-view/pages/home/foreignAffairsCertificateApply/foreignAffairsCertificateApply.html?ts=" + timestamp,
                controller: "foreignAffairsCertificateApplyCtl",
            }
        },
        resolve: {
            loadFormEditResources: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    SysInfo.activeEnv.sourcePrefix + "/apps/user-view/pages/home/foreignAffairsCertificateApply/foreignAffairsCertificateApply.js?ts=" + timestamp,
                    SysInfo.activeEnv.sourcePrefix + "/js/sweetalert-master/sweetalert.min.js?ts=" + timestamp,
                    SysInfo.activeEnv.sourcePrefix + "/js/sweetalert-master/sweetalert.css?ts=" + timestamp,
                ]);
            }]
        },
    }).state('home.managerOfBusinessSecret', {
        url: "/managerOfBusinessSecret",
        params: {showzh: '',truethName:''},
        views: {
            'content@home': {
                templateUrl: SysInfo.activeEnv.sourcePrefix + "/apps/user-view/pages/home/managerOfBusinessSecret/managerOfBusinessSecret.html?ts=" + timestamp,
                controller: "managerOfBusinessSecretCtl",
            }
        },
        resolve: {
            loadFormEditResources: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    SysInfo.activeEnv.sourcePrefix + "/apps/user-view/pages/home/managerOfBusinessSecret/managerOfBusinessSecret.js?ts=" + timestamp,
                ]);
            }]
        },
    }).state('home.managerOfBusinessSecret.apply', {
        url: "/managerOfBusinessSecretApply",
        params: {showzh: '',truethName:''},
        views: {
            'content@home': {
                templateUrl: SysInfo.activeEnv.sourcePrefix + "/apps/user-view/pages/home/managerOfBusinessSecretApply/managerOfBusinessSecretApply.html?ts=" + timestamp,
                controller: "managerOfBusinessSecretApplyCtl",
            }
        },
        resolve: {
            loadFormEditResources: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    SysInfo.activeEnv.sourcePrefix + "/apps/user-view/pages/home/managerOfBusinessSecretApply/managerOfBusinessSecretApply.js?ts=" + timestamp,
                    SysInfo.activeEnv.sourcePrefix + "/js/sweetalert-master/sweetalert.min.js?ts=" + timestamp,
                    SysInfo.activeEnv.sourcePrefix + "/js/sweetalert-master/sweetalert.css?ts=" + timestamp,
                ]);
            }]
        },
    });
});