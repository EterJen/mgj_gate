var myApp = angular.module('app', ['ngSanitize', 'oc.lazyLoad', 'ui.router', 'pagination', 'paginationA', "jcs-autoValidate"]);

var uri = document.location.toString();
var end = uri.indexOf('/index.html');
var HostUri = uri.substr(0, end);

end = uri.indexOf('/page/index.html');
var serverUri = uri.substr(0, end);

var oaBasePath = "";
if (0 < HostUri.indexOf("172.17.12")) {
    oaBasePath = "http://172.17.12.1:8080/jyjoa"
} else if (0 < HostUri.indexOf("127.0.0.1")) {
    oaBasePath = "http://127.0.0.1:8080/jyjoa"
} else {
    oaBasePath = "http://11.4.240.103:8088/jyjoa";
}

myApp.constant('ENV', {
    "debug": true,
    "version": "1.0.1",
    "localapi": HostUri,
    serverUri: serverUri,
    "templateLocate": HostUri,
    "oaBasePath": oaBasePath
});


myApp.run(['$rootScope', 'bootstrap3ElementModifier', function ($rootScope, bootstrap3ElementModifier) {
    //bootstrap3ElementModifier.enableValidationStateIcons(true);
    $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
        $rootScope.previousState = from; //from为前一个页面的路由信息：url,cache,views,name
        $rootScope.previousParams = fromParams; //fromParams为前一个页面的ID信息
        $rootScope.nowState = to; //to为当前页面的路由信息：url,cache,views,name，同样，toParams为当前页面的ID信息
        bootstrap3ElementModifier.enableValidationStateIcons(true);
    });
}]);
myApp.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
    function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
        myApp.controller = $controllerProvider.register;
        myApp.directive = $compileProvider.directive;
        myApp.filter = $filterProvider.register;
        myApp.factory = $provide.factory;
        myApp.service = $provide.service;
        myApp.constant = $provide.constant;
    }]);

myApp.config(function ($httpProvider) {
    //加入监听器
    /*$httpProvider.interceptors.push('httpInterceptor');*/
});


myApp.config(function ($stateProvider, $urlRouterProvider, ENV) {
    $urlRouterProvider.otherwise('/login');
    $stateProvider.state('login', {
        url: "/login",
        templateUrl: ENV.templateLocate + "/apps/login/login.html?ts=" + timestamp,
        controller: "loginCtrl",
        cache: true,
        resolve: {
            loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
                return $ocLazyLoad.load([

                    "apps/login/login.js?ts=" + timestamp,
                ]);
            }]
        },
    }).state('cmsDetails', {
        url: "/cmsDetails/:parameterId",
        templateUrl: ENV.templateLocate + "/apps/cmsDetails/cmsDetails.html?ts=" + timestamp,
        controller: "cmsDetailsCtrl",
        cache: true,


        resolve: {
            loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
                return $ocLazyLoad.load([
                    "apps/cmsDetails/cmsDetails.js?ts=" + timestamp,
                ]);
            }]
        },
    }).state('cmsDetails.wps', {
        url: "/wps/:tskey",
        views: {
            'fileOpen@cmsDetails': {
                templateUrl: ENV.templateLocate + "/apps/cmsDetails/detailShow/wps/view.html?ts=" + timestamp,
                controller: "cmsDetailshow_wps",
                cache: true,
            }
        },

        resolve: {
            loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
                return $ocLazyLoad.load([
                    ENV.templateLocate + "/apps/cmsDetails/detailShow/wps/controller.js?ts=" + timestamp,
                ]);
            }]
        },
    }).state('cmsDetails.excl', {
        url: "/excl/:tskey",
        views: {
            'fileOpen@cmsDetails': {
                templateUrl: ENV.templateLocate + "/apps/cmsDetails/detailShow/wps/view.html?ts=" + timestamp,
                controller: "cmsDetailshow_wps",
                cache: true,
            }
        },

        resolve: {
            loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
                return $ocLazyLoad.load([
                    ENV.templateLocate + "/apps/cmsDetails/detailShow/wps/controller.js?ts=" + timestamp,
                ]);
            }]
        },
    }).state('cmsDetails.ppt', {
        url: "/ppt/:tskey",
        views: {
            'fileOpen@cmsDetails': {
                templateUrl: ENV.templateLocate + "/apps/cmsDetails/detailShow/wps/view.html?ts=" + timestamp,
                controller: "cmsDetailshow_wps",
                cache: true,
            }
        },

        resolve: {
            loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
                return $ocLazyLoad.load([
                    ENV.templateLocate + "/apps/cmsDetails/detailShow/wps/controller.js?ts=" + timestamp,
                ]);
            }]
        },
    }).state('cmsDetails.video', {
        url: "/video/:tskey",
        views: {
            'fileOpen@cmsDetails': {
                templateUrl: ENV.templateLocate + "/apps/cmsDetails/detailShow/video/view.html?ts=" + timestamp,
                controller: "cmsDetailshow_video",
                cache: true,
            }
        },

        resolve: {
            loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
                return $ocLazyLoad.load([
                    ENV.templateLocate + "/apps/cmsDetails/detailShow/video/controller.js?ts=" + timestamp,
                    ENV.serverUri + "/video-player/dist/css/ckin.css?ts=" + timestamp,
                    ENV.serverUri + "/video-player/dist/js/ckin.js?ts=" + timestamp
                ]);
            }]
        },
    }).state('cmsDetails.image', {
        url: "/image/:tskey",
        views: {
            'fileOpen@cmsDetails': {
                templateUrl: ENV.templateLocate + "/apps/cmsDetails/detailShow/image/view.html?ts=" + timestamp,
                controller: "cmsDetailshow_image",
                cache: true,
            }
        },

        resolve: {
            loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
                return $ocLazyLoad.load([
                    ENV.templateLocate + "/apps/cmsDetails/detailShow/image/controller.js?ts=" + timestamp,
                    ENV.serverUri + "/video-player/dist/css/ckin.css?ts=" + timestamp,
                    ENV.serverUri + "/video-player/dist/js/ckin.js?ts=" + timestamp
                ]);
            }]
        },
    }).state('cmsDetails.content', {
        url: "/content/:tskey",
        views: {
            'fileOpen@cmsDetails': {
                templateUrl: ENV.templateLocate + "/apps/cmsDetails/detailShow/content/view.html?ts=" + timestamp,
                controller: "cmsDetailshow_content",
                cache: true,
            }
        },

        resolve: {
            loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
                return $ocLazyLoad.load([
                    ENV.templateLocate + "/apps/cmsDetails/detailShow/content/controller.js?ts=" + timestamp,
                    ENV.serverUri + "/video-player/dist/css/ckin.css?ts=" + timestamp,
                    ENV.serverUri + "/video-player/dist/js/ckin.js?ts=" + timestamp
                ]);
            }]
        },
    }).state('cmsDetails.pdf', {
        url: "/pdf/:tskey",
        views: {
            'fileOpen@cmsDetails': {
                templateUrl: ENV.templateLocate + "/apps/cmsDetails/detailShow/pdf/view.html?ts=" + timestamp,
                controller: "cmsDetailshow_pdf",
                cache: true,
            }
        },

        resolve: {
            loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
                return $ocLazyLoad.load([
                    ENV.templateLocate + "/apps/cmsDetails/detailShow/pdf/controller.js?ts=" + timestamp,
                ]);
            }]
        },
    }).state('footBarCustomize', {
        url: "/footBarCustomize",
        templateUrl: ENV.templateLocate + "/apps/footBarCustomize/footBarCustomize.html?ts=" + timestamp,
        controller: "footBarCustomizeCtrl",
        cache: false,
        /*views: {
            'contentMenu@menu': {
                templateUrl: ENV.templateLocate + "/apps/footBarCustomize/footBarCustomize.html?ts=" + timestamp,
                controller: "footBarCustomizeCtrl",
                cache: true,
            }
        },*/
        resolve: {
            loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
                return $ocLazyLoad.load([
                    "js_1/css_1/common.css?ts=" + timestamp,
                    "js_1/css_1/footer.css?ts=" + timestamp,
                    "js_1/css_1/list.css?ts=" + timestamp,
                    /*"js_1/idangerous.swiper.min.js?ts=" + timestamp,*/
                    "js_1/drag-arrange.js?ts=" + timestamp,
                    /*"js_1/layer/layer.js?ts=" + timestamp,*/
                    "js_1/jquery.mousewheel.min.js?ts=" + timestamp,
                    "js_1/jquery.mCustomScrollbar.min.js?ts=" + timestamp,
                    "apps/footBarCustomize/footBarCustomize.js?ts=" + timestamp,
                ]);
            }]
        },
    }).state('menu.expertExtraction', {
        url: "/expertExtraction",
        views: {
            'contentMenu@menu': {
                templateUrl: ENV.templateLocate + "/apps/expertExtraction/expertExtraction.html?ts=" + timestamp,
                controller: "expertExtractionCtrl",
                cache: true,
            }
        },
        resolve: {
            loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
                return $ocLazyLoad.load([

                    "apps/expertExtraction/expertExtraction.js?ts=" + timestamp,
                ]);
            }]
        },
    }).state('menu.expertExtractionDetail', {
        url: "/expertExtractionDetail/:parameterId",
        views: {
            'contentMenu@menu': {
                templateUrl: ENV.templateLocate + "/apps/expertExtraction/expertExtractionDetail.html?ts=" + timestamp,
                controller: "expertExtractionDetailCtrl",
                cache: true,
            }
        },
        resolve: {
            loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
                return $ocLazyLoad.load([

                    "apps/expertExtraction/expertExtractionDetail.js?ts=" + timestamp,
                ]);
            }]
        },
    }).state('menu.cmsList', {
        url: "/cmsList/:parameterId",
        params: {parameterId:undefined,ifShowInNewList: undefined},//参数在这边声明
        views: {
            'contentMenu@menu': {
                templateUrl: ENV.templateLocate + "/apps/cmsDetails/cmsList.html?ts=" + timestamp,
                controller: "cmsListCtrl",
                cache: true,
            }
        },
        resolve: {
            loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
                resource = []
                resource.push("apps/cmsDetails/cmsList.js?ts=" + timestamp);
                return $ocLazyLoad.load(resource);
            }]
        },
    }).state('menu.cmsSearchList', {
        url: "/cmsSearchList/:parameterId",
        params: {'parameterId': null},//参数在这边声明
        views: {
            'contentMenu@menu': {
                templateUrl: ENV.templateLocate + "/apps/cmsDetails/cmsSearchList.html?ts=" + timestamp,
                controller: "cmsSearchListCtrl",
                cache: true,
            }
        },
        resolve: {
            loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
                return $ocLazyLoad.load([
                    "apps/cmsDetails/cmsSearchList.js?ts=" + timestamp,
                ]);
            }]
        },
    }).state('menu.commonForms', {
        url: "/commonForms",
        views: {
            'contentMenu@menu': {
                templateUrl: ENV.templateLocate + "/apps/commonForms/commonForms.html?ts=" + timestamp,
                controller: "commonFormsCtrl",
                cache: true,
            }
        },
        resolve: {
            loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
                return $ocLazyLoad.load([
                    "apps/commonForms/commonForms.js?ts=" + timestamp,
                ]);
            }]
        },
    }).state('menu.softwareCenter', {
        url: "/softwareCenter",
        views: {
            'contentMenu@menu': {
                templateUrl: ENV.templateLocate + "/apps/softwareCenter/softwareCenter.html?ts=" + timestamp,
                controller: "softwareCenterCtrl",
                cache: true,
            }
        },
        resolve: {
            loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
                return $ocLazyLoad.load([
                    "apps/softwareCenter/softwareCenter.js?ts=" + timestamp,
                ]);
            }]
        },
    }).state('menu.messageBoard', {
        url: "/messageBoard",
        views: {
            'contentMenu@menu': {
                templateUrl: ENV.templateLocate + "/apps/messageBoard/messageBoard.html?ts=" + timestamp,
                controller: "messageBoardCtrl",
                cache: true,
            }
        },
        resolve: {
            loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
                return $ocLazyLoad.load([
                    "apps/messageBoard/messageBoard.js?ts=" + timestamp,
                    /*"../css/layout.css?ts=" + timestamp*/
                ]);
            }]
        },
    }).state('menu.communication', {
        url: "/communication",
        views: {
            'contentMenu@menu': {
                templateUrl: ENV.templateLocate + "/apps/communication/communication.html?ts=" + timestamp,
                controller: "communicationCtrl",
                cache: true,
            }
        },
        resolve: {
            loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
                return $ocLazyLoad.load([
                    "apps/communication/communication.js?ts=" + timestamp,
                ]);
            }]
        },
    }).state('menu.addressbook', {
        url: "/addressBook",
        views: {
            'contentMenu@menu': {
                templateUrl: ENV.templateLocate + "/addressBook/?ts=" + timestamp,
                controller: "addressBookCtrl",
                cache: true,
            }
        },
        resolve: {
            loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
                return $ocLazyLoad.load([
                    "apps/addressBook/addressBook.js?ts=" + timestamp,
                ]);
            }]
        },
    }).state('menu.dutyWatch', {
        url: "/dutyWatch",
        views: {
            'contentMenu@menu': {
                templateUrl: ENV.templateLocate + "/apps/dutyWatch/dutyWatch.html?ts=" + timestamp,
                controller: "dutyWatchCtrl",
                cache: true,
            }
        },
        resolve: {
            loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
                return $ocLazyLoad.load([

                    "apps/dutyWatch/dutyWatch.js?ts=" + timestamp,
                ]);
            }]
        },
    }).state('menu.test', {
        url: "/test",
        views: {
            'contentMenu@menu': {
                templateUrl: ENV.templateLocate + "/apps/test/test.html?ts=" + timestamp,
                controller: "testCtrl",
                cache: true,
            }
        },
        resolve: {
            loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
                return $ocLazyLoad.load([
                    "css/easyui.css",
                    "apps/test/test.js?ts=" + timestamp,
                ]);
            }]
        },
    }).state('menu.attendance', {
        url: '/attendance',
        params: {'hasRoleNeiQin': true},
        views: {
            'contentMenu@menu': {
                templateUrl: ENV.templateLocate + "/apps/attendance/attendance.html?ts=" + timestamp,
                controller: "attendanceCtrl",
                cache: true,
            }
        },
        resolve: {
            loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
                return $ocLazyLoad.load([
                    "apps/attendance/attendance.js?ts=" + timestamp,
                    /*"../css/layout.css?ts=" + timestamp*/
                ]);
            }]
        },
    }).state('menu.attendanceAll', {
        url: '/attendanceAll',
        views: {
            'contentMenu@menu': {
                templateUrl: ENV.templateLocate + "/apps/attendance/attendanceAll.html?ts=" + timestamp,
                controller: "attendanceCtrlAll",
                cache: true,
            }
        },
        resolve: {
            loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
                return $ocLazyLoad.load([
                    "apps/attendance/attendanceAll.js?ts=" + timestamp,
                    /*"../css/layout.css?ts=" + timestamp*/
                ]);
            }]
        },
    })

});


myApp.run(function (defaultErrorMessageResolver) {
    defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
        errorMessages['BadPhoneNum'] = '请输入有效手机号 ,不支持虚拟网络号';
        errorMessages['BadUsername'] = '无效用户名,请以字母或下划线开头,长度大于3,不能出现特殊字符';
        errorMessages['userUnique'] = '用户已存在，请修改用户名';
        errorMessages['difPwd'] = '两次输入密码不相同';
        errorMessages['noOldPwd'] = '修改密码需提供原密码';
        errorMessages['userNameExist'] = '该用户名已存在，请使用其他用户名';
        errorMessages['BadPassword'] = '请输入至少十位数，并且包括至少1个大写字母，1个小写字母，1个数字';
    });
});

myApp.filter('dateFilter', function () { //可以注入依赖
    return function (date) {
        // 这里的str就是传进来的date，返回值就是最后的输出,把时间格式化成M/dd
        // 另外filter可以加参数，这里的args1对应1，args2对应'2'，即上面html对应的每个冒号后面的内容
        date = date.replace(/-/g, "/");
        // console.log(date);

        var newDate = new Date(date);
        // console.log(newDate);

        return (newDate.getMonth() + 1) + "/" + newDate.getDate();
    }
});
myApp.filter('dateTimeFilter', function () { //可以注入依赖
    return function (date) {
        // 这里的str就是传进来的date，返回值就是最后的输出,把时间格式化成M/dd
        // 另外filter可以加参数，这里的args1对应1，args2对应'2'，即上面html对应的每个冒号后面的内容
        date = date.replace(/-/g, "/");
        // console.log(date);

        var newDate = new Date(date);
        // console.log(newDate);
        var cal = newDate.getFullYear() + "年" + (newDate.getMonth() + 1) + "月" + newDate.getDate() + "日";
        return cal.trim();
    }
});
myApp.filter("highlight", function ($sce) {
    return function (text, search) {
        if (!search) {
            return $sce.trustAsHtml(text);
        }
        if (text) {
            //text = encodeURIComponent(text);
            // search = encodeURIComponent(search);
            var regex = new RegExp(search, 'gi');
            var result = text.replace(regex, '<span class="highlightedTextStyle">$&</span>');
            // result = decodeURIComponent(result);
            return $sce.trustAsHtml(result);
        }
    };
});

