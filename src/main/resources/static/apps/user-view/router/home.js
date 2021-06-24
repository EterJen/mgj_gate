gwNgApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider.state('home', {
        url: "/home",
        views: {
            '': {
                templateUrl: SysInfo.activeEnv.sourcePrefix + "/apps/user-view/pages/home/view.html?ts=" + timestamp,
                controller: "home",
                cache: true,
            }
        },
        resolve: {
            loadFormEditResources: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    SysInfo.activeEnv.sourcePrefix + "/apps/user-view/pages/home/controller.js?ts=" + timestamp,
                ]);
            }]
        },
    });
});