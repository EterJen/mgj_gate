myApp.config(function ($stateProvider, $urlRouterProvider, ENV) {
	$stateProvider.state('rest_todoList', {
		url: "/rest_todoList/:id/:emergency",
		templateUrl: ENV.templateLocate + "/apps/restful/toDoList/todoList.html?ts=" + timestamp,
		controller: "todoListCtrl",
		cache: true,
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					"apps/restful/toDoList/toDoListCtl.js?ts=" + timestamp
				]);
			}]
		}
	}).state('rest_viewTimeBook', {
		url: "/rest_viewTimeBook",
		params: {modeType: 'W'},
		templateUrl: ENV.templateLocate + "/apps/restful/viewtimebook/leaderWorkArrange.html?ts=" + timestamp,
		controller: "leaderWorkArrangeCtrl",
		cache: true,
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					"apps/restful/viewtimebook/leaderWorkArrange.js?ts=" + timestamp
				]);
			}]
		}
	}).state('rest_viewmeeting', {
		url: "/rest_viewmeeting",
		templateUrl: ENV.templateLocate + "/apps/restful/viewmeeting/meetingroomApply.html?ts=" + timestamp,
		controller: "meetingroomApplyCtrl",
		cache: true,
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					"apps/restful/viewmeeting/meetingroomApply.js?ts=" + timestamp,
					'css/datepicker3.css',
					'js/bootstrap-datepicker.js',
					"services/NodeTreeTool.js?ts=" + timestamp
				]);
			}]
		}
	}).state('rest_meetingroomarrange', {
		url: "/rest_meetingroomarrange",
		templateUrl: ENV.templateLocate + "/apps/restful/meetingroom/meetingroomArrange.html?ts=" + timestamp,
		controller: "meetingroomArrangeCtrl",
		cache: true,
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					"apps/restful/meetingroom/meetingroomArrange.js?ts=" + timestamp,
					"js/angularjs-ui-tree/angular-ui-tree.min.js?ts=" + timestamp,
					"js/angularjs-ui-tree/angular-ui-tree.min.css?ts=" + timestamp
				]);
			}]
		}
	}).state('rest_viewbrief', {
		url: "/rest_viewbrief",
		templateUrl: ENV.templateLocate + "/apps/restful/officialbulletin/officialbulletin.html?ts=" + timestamp,
		controller: "officialbulletinMngCtrl",
		cache: true,
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					"apps/restful/officialbulletin/officialbulletinMng.js?ts=" + timestamp,
					'css/datepicker3.css',
					'js/bootstrap-datepicker.js'
				]);
			}]
		}
	})
});