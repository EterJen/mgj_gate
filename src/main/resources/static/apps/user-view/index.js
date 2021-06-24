/**/
var gwNgApp = angular.module('gwngapp', [
    'oc.lazyLoad',
    'ui.router',
    'ngSanitize',
    'pagination',
    "jcs-autoValidate",
    "angularjs-dropdown-multiselect",
    "as.sortable",
]);
gwNgApp.run(['$rootScope', 'bootstrap3ElementModifier', function ($rootScope, bootstrap3ElementModifier) {
    //bootstrap3ElementModifier.enableValidationStateIcons(true);
    $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
        $rootScope.previousState = from; //from为前一个页面的路由信息：url,cache,views,name
        $rootScope.previousParams = fromParams; //fromParams为前一个页面的ID信息
        $rootScope.nowState = to; //to为当前页面的路由信息：url,cache,views,name，同样，toParams为当前页面的ID信息
        bootstrap3ElementModifier.enableValidationStateIcons(true);
    });
}]);
gwNgApp.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
    function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
        gwNgApp.controller = $controllerProvider.register;
        gwNgApp.directive = $compileProvider.directive;
        gwNgApp.filter = $filterProvider.register;
        gwNgApp.factory = $provide.factory;
        gwNgApp.service = $provide.service;
        gwNgApp.constant = $provide.constant;
    }
]);
/*
gwNgApp.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);
*/
