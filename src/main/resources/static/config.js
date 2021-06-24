var myApp = angular.module('app', ['ngSanitize', 'oc.lazyLoad', 'ui.router', 'pagination', 'paginationA', "jcs-autoValidate", "angularjs-dropdown-multiselect"]);

//var myApp = angular.module('app', ['ui.router']);
/*myApp.constant('ENV',{
	"debug": true,
    "version":"1.0.1",
    "localapi":"http://31.5.48.206:8080",
    "templateLocate":"http://31.5.48.206:8080"
});*/
/*myApp.constant('ENV',{
    "debug": true,
    "version":"1.0.1",
    "localapi":"http://11.30.28.54:8081",
    "templateLocate":"http://11.30.28.54:8081"
});*/
/*myApp.constant('ENV',{
    "debug": true,
    "version":"1.0.1",
    "localapi":"http://172.17.12.1",
    "templateLocate":"http://172.17.12.1"
});*/
var uri = document.location.toString();
var end = uri.indexOf('/index.html');
var HostUri = uri.substr(0,end);

myApp.constant('ENV', {
    "debug": true,
    "version": "1.0.1",
    "localapi": HostUri,
    serverUri: HostUri,
    "templateLocate": HostUri,
});

/*myApp.constant('ENV',{
    "debug": true,
    "version":"1.0.1",
    "localapi":"http://31.5.48.116/jxw3",
    "templateLocate":"http://31.5.48.116/jxw3"
});*/


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
	$stateProvider.state('coreHome.articleManagement', {
		url: "/articleManagement",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/cms/firstPageMng/articleManagement/articleManagement.html?ts=" + timestamp,
				controller: "articleManagementCtrl",
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					"apps/cms/firstPageMng/articleManagement/articleManagementCtl.js?ts=" + timestamp,
					"js/angularjs-ui-tree/angular-ui-tree.min.js?ts=" + timestamp,
					"js/angularjs-ui-tree/angular-ui-tree.min.css?ts=" + timestamp,
					"services/NodeTreeTool.js?ts=" + timestamp,
				]);
			}]
		},
	}).state('coreHome.friendlyLink', {
		url: "/friendlyLink",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/cms/firstPageMng/friendlyLink/friendlyLink.html?ts=" + timestamp,
				controller: "friendlyLinkCtl",
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					"apps/cms/firstPageMng/friendlyLink/friendlyLinkCtl.js?ts=" + timestamp,
					"js/angularjs-ui-tree/angular-ui-tree.min.js?ts=" + timestamp,
					"js/angularjs-ui-tree/angular-ui-tree.min.css?ts=" + timestamp,
					"services/NodeTreeTool.js?ts=" + timestamp,
				]);
			}]
		},
	}).state('coreHome.userViewSkin', {
		url: "/userViewSkin",
		views: {
			'rightContent@coreHome': {
				templateUrl: "apps/cms/firstPageMng/userViewSkin/userViewSkin.html?ts=" + timestamp,
				controller: "userViewSkinCtl",
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					"apps/cms/firstPageMng/userViewSkin/userViewSkin.js?ts=" + timestamp,
					"js/angularjs-ui-tree/angular-ui-tree.min.js?ts=" + timestamp,
					"js/angularjs-ui-tree/angular-ui-tree.min.css?ts=" + timestamp,
					"services/NodeTreeTool.js?ts=" + timestamp,
				]);
			}]
		},
	}).state('coreHome.juBaoTouSu', {
        url: "/juBaoTouSu",
        views: {
            'rightContent@coreHome': {
                templateUrl: ENV.templateLocate + "/apps/cms/firstPageMng/juBaoTouSu/juBaoTouSu.html?ts=" + timestamp,
                controller: "juBaoTouSuCtl",
            }
        },
        resolve: {
            loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
                return $ocLazyLoad.load([
                    "apps/cms/firstPageMng/juBaoTouSu/juBaoTouSu.js?ts=" + timestamp,
                    "js/angularjs-ui-tree/angular-ui-tree.min.js?ts=" + timestamp,
                    "js/angularjs-ui-tree/angular-ui-tree.min.css?ts=" + timestamp,
                    "services/NodeTreeTool.js?ts=" + timestamp,
                ]);
            }]
        },
    }).state('coreHome.linksInfo', {//企业信息管理、技术标准管理
		url: "/linksInfo",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/cms/firstPageMng/linksInfo/linksInfo.html?ts=" + timestamp,
				controller: "linksInfoCtl",
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					"apps/cms/firstPageMng/linksInfo/linksInfo.js?ts=" + timestamp,
					"js/angularjs-ui-tree/angular-ui-tree.min.js?ts=" + timestamp,
					"js/angularjs-ui-tree/angular-ui-tree.min.css?ts=" + timestamp,
					"services/NodeTreeTool.js?ts=" + timestamp,
				]);
			}]
		},
	}).state('coreHome.contactInformation', {
		url: "/contactInformation",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/cms/firstPageMng/contactInformation/contactInformation.html?ts=" + timestamp,
				controller: "contactInformationCtl",
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					"apps/cms/firstPageMng/contactInformation/contactInformationCtl.js?ts=" + timestamp,
					"js/angularjs-ui-tree/angular-ui-tree.min.js?ts=" + timestamp,
					"js/angularjs-ui-tree/angular-ui-tree.min.css?ts=" + timestamp,
					"services/NodeTreeTool.js?ts=" + timestamp,
				]);
			}]
		},
	}).state('coreHome.bayWindow', {
		url: "/bayWindow",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/cms/firstPageMng/bayWindow/bayWindow.html?ts=" + timestamp,
				controller: "bayWindow",
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					"apps/cms/firstPageMng/bayWindow/bayWindow.js?ts=" + timestamp,
				]);
			}]
		},
	}).state('coreHome.archiveManagement', {
		url: "/archiveManagement",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/cms/archiveManagement/archiveManagement.html?ts=" + timestamp,
				controller: "archiveManagementCtl",
				cache: true
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					"apps/cms/archiveManagement/archiveManagement.js?ts=" + timestamp,
				]);
			}]
		}
	}).state('coreHome.holidayManagement', {
		url: "/holidayManagement",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/cms/holidayManagement/holidayManagement.html?ts=" + timestamp,
				controller: "holidayManagementCtl",
				cache: true
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					'css/datepicker3.css',
					'js/bootstrap-datepicker.js',
					"apps/cms/holidayManagement/holidayManagement.js?ts=" + timestamp,
				]);
			}]
		}
	}).state('coreHome.dutyStaffManagement', {
		url: "/dutyStaffManagement",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/cms/dutyStaffManagement/dutyStaffManagement.html?ts=" + timestamp,
				controller: "dutyStaffManagementCtl",
				cache: true
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					'css/datepicker3.css',
					'js/bootstrap-datepicker.js',
					"apps/cms/dutyStaffManagement/dutyStaffManagement.js?ts=" + timestamp,
				]);
			}]
		}
	}).state('coreHome.communicationDutyTable', {
		url: "/communicationDutyTable",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/cms/communicationDutyTable/communicationDutyTable.html?ts=" + timestamp,
				controller: "communicationDutyTableCtl",
				cache: true
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					"apps/cms/communicationDutyTable/communicationDutyTable.js?ts=" + timestamp,
				]);
			}]
		}
	}).state('coreHome.technologyDutyTable', {
		url: "/technologyDutyTable",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/cms/technologyDutyTable/technologyDutyTable.html?ts=" + timestamp,
				controller: "technologyDutyTableCtl",
				cache: true
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					"apps/cms/technologyDutyTable/technologyDutyTable.js?ts=" + timestamp,
				]);
			}]
		}
	}).state('coreHome.columnManagement', {
		url: "/columnManagement",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/cms/columnManagement/columnManagement.html?ts=" + timestamp,
				controller: "columnManagementCtl",
				cache: true
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					"apps/cms/columnManagement/columnManagementCtl.js?ts=" + timestamp,
					/*'css/datepicker3.css',
					'js/bootstrap-datepicker.js',*/
					"js/angularjs-ui-tree/angular-ui-tree.min.js?ts=" + timestamp,
					"js/angularjs-ui-tree/angular-ui-tree.min.css?ts=" + timestamp,
					"services/NodeTreeTool.js?ts=" + timestamp,
					"css/layout.css?ts=" + timestamp
				]);
			}]
		}
	}).state('coreHome.documentManagement', {
		url: "/documentManagement",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/cms/documentManagement/documentManagement.html?ts=" + timestamp,
				controller: "documentManagementCtl",
				cache: true
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					"apps/cms/documentManagement/documentManagement.js?ts=" + timestamp,
				]);
			}]
		}
	}).state('coreHome.formManagement', {
		url: "/formManagement",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/cms/formManagement/formManagement.html?ts=" + timestamp,
				controller: "formManagementCtl",
				cache: true
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					"apps/cms/formManagement/formManagement.js?ts=" + timestamp,
				]);
			}]
		}
	}).state('coreHome.resourceManagement', {
		url: "/resourceManagement",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/cms/resourceManagement/resourceManagement.html?ts=" + timestamp,
				controller: "resourceManagementCtl",
				cache: true
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					"apps/cms/resourceManagement/resourceManagement.js?ts=" + timestamp,
				]);
			}]
		}
	}).state('coreHome.linkManagement', {
		url: "/linkManagement",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/cms/linkManagement/linkManagement.html?ts=" + timestamp,
				controller: "linkManagementCtl",
				cache: true
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					"apps/cms/linkManagement/linkManagement.js?ts=" + timestamp,
				]);
			}]
		}
	}).state('coreHome.templateManagement', {
		url: "/templateManagement",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/cms/templateManagement/templateManagement.html?ts=" + timestamp,
				controller: "templateManagementCtl",
				cache: true
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					"apps/cms/templateManagement/templateManagement.js?ts=" + timestamp,
				]);
			}]
		}
	}).state('coreHome.whitelistManagement', {
		url: "/whitelistManagement",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/cms/whitelistManagement/whitelistManagement.html?ts=" + timestamp,
				controller: "whitelistManagementCtl",
				cache: true
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					"apps/cms/whitelistManagement/whitelistManagement.js?ts=" + timestamp,
				]);
			}]
		}
	}).state('coreHome.userManagement', {
		url: "/userManagement",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/cms/userManagement/userManagement.html?ts=" + timestamp,
				controller: "userManagementCtl",
				cache: true
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					"apps/cms/userManagement/userManagement.js?ts=" + timestamp,
				]);
			}]
		}
	}).state('coreHome.messageBoardManagement', {
		url: "/messageBoardManagement",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/cms/messageBoardManagement/messageBoardManagement.html?ts=" + timestamp,
				controller: "messageBoardManagementCtl",
				cache: true
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					"apps/cms/messageBoardManagement/messageBoardManagement.js?ts=" + timestamp,
				]);
			}]
		}
	}).state('coreHome.intranetAddressBook', {
		url: "/intranetAddressBook",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/cms/intranetAddressBook/intranetAddressBook.html?ts=" + timestamp,
				controller: "intranetAddressBookCtl",
				cache: true
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					"apps/cms/intranetAddressBook/intranetAddressBook.js?ts=" + timestamp,
				]);
			}]
		}
	}).state('coreHome.cityAddressBook', {
		url: "/cityAddressBook",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/cms/cityAddressBook/cityAddressBook.html?ts=" + timestamp,
				controller: "cityAddressBookCtl",
				cache: true
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					"apps/cms/cityAddressBook/cityAddressBook.js?ts=" + timestamp,
				]);
			}]
		}
	}).state('coreHome.chinaAddressBook', {
		url: "/chinaAddressBook",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/cms/chinaAddressBook/chinaAddressBook.html?ts=" + timestamp,
				controller: "chinaAddressBookCtl",
				cache: true
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					"apps/cms/chinaAddressBook/chinaAddressBook.js?ts=" + timestamp,
				]);
			}]
		}
	}).state('coreHome.unitAddressBook', {
		url: "/unitAddressBook",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/cms/unitAddressBook/unitAddressBook.html?ts=" + timestamp,
				controller: "unitAddressBookCtl",
				cache: true
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					"apps/cms/unitAddressBook/unitAddressBook.js?ts=" + timestamp,
				]);
			}]
		}
	}).state('coreHome.expertLibrary', {
		url: "/expertLibrary",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/cms/expertLibrary/expertLibrary.html?ts=" + timestamp,
				controller: "expertLibraryCtl",
				cache: true
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					"apps/cms/expertLibrary/expertLibrary.js?ts=" + timestamp,
				]);
			}]
		}
	}).state('coreHome.expertManagement', {
		url: "/expertManagement",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/cms/expertManagement/expertManagement.html?ts=" + timestamp,
				controller: "expertManagementCtl",
				cache: true
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					"apps/cms/expertManagement/expertManagement.js?ts=" + timestamp,
				]);
			}]
		}
	}).state('coreHome.policyManagement', {
		url: "/policyManagement",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/cms/policyManagement/policyManagement.html?ts=" + timestamp,
				controller: "policyManagementCtl",
				cache: true
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					"apps/cms/policyManagement/policyManagement.js?ts=" + timestamp,
				]);
			}]
		}
	}).state('coreHome.doneList', {
		url: "/doneList",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/workflow/doneList.html?ts=" + timestamp,
				controller: "doneListCtrl",
				cache: true,
			}
		},
		resolve: {
			loadDoneList: ['$ocLazyLoad', function ($ocLazyLoad) {
				return $ocLazyLoad.load([
					'apps/workflow/doneListCtrl.js'
				]);
			}]
		}

	}).state('coreHome.adjustmentOpinion', {
		url: "/adjustmentOpinion",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/workflow/adjustmentOpinion/adjustmentOpinion.html?ts=" + timestamp,
				controller: "adjustmentOpinionCtrl",
				cache: true,
			}
		},
		resolve: {
			loadDoneList: ['$ocLazyLoad', function ($ocLazyLoad) {
				return $ocLazyLoad.load([
					'apps/workflow/adjustmentOpinion/adjustmentOpinionCtrl.js'
				]);
			}]
		}

	}).state('formEditGeneric', {
		url: "/officialDocuments",
		abstract: true,
		views: {
			//进入到该状态即加载formEdit.html
			'': {
				templateUrl: ENV.templateLocate + '/apps/workflow/formEditGeneric.html?ts=' + timestamp,
				controller: "formEditGeneric",
			},
			'leftMenu@formEditGeneric': {
				templateUrl: ENV.templateLocate + "/apps/workflow/formEditGenericLeftMenu.html?ts=" + timestamp,
			},
			'rightMenu@formEditGeneric': {
				templateUrl: ENV.templateLocate + "/apps/workflow/formEditGenericRightMenu.html?ts=" + timestamp,
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				if (SysUtils.isWindows()) {
					//Sconsole.log("foxit.js");
					return $ocLazyLoad.load([
						'apps/workflow/formEditGeneric.js',
						'css/formEditNew/layout.css',
						'css/formEditNew/reset.css',
						'js/contextMenu/jquery.contextMenu.min.css',
						/*'js/contextMenu/jquery.ui.position.min.js',*/
						'js/contextMenu/jquery.contextMenu.min.js',
						'css/font-Awesome-master/css/font-awesome.min.css',
						'css/processForm.css',
						/* 'js/jQuery.print.js',*/
						'js/wpsJs/windows/wpsjs.js',
						'js/wpsJs/wpsEvent.js',
						'js/suwell_ofdReader.js',
						'css/datepicker3.css',
						'js/bootstrap-datepicker.js',
						'js/ztree/jquery.ztree.core.min.js',
						'css/ztree/zTreeStyle.css',
						'services/LeaveService.js',
						'services/PersonnelService.js'
					]);
				} else {
					console.log("linux.js");
					//console.log("Foxit_npapi_new.js");
					return $ocLazyLoad.load([
						'apps/workflow/formEditGeneric.js',
						'css/formEditNew/layout.css',
						'css/formEditNew/reset.css',
						'css/processForm.css',
						'css/datepicker3.css',
						'css/font-Awesome-master/css/font-awesome.min.css',
						// 'css/daterangepicker.css',
						// 'js/moment.min.js',
						// 'js/daterangepicker.js',
						'js/bootstrap-datepicker.js',
						'js/contextMenu/jquery.contextMenu.min.css',
						/*'js/contextMenu/jquery.ui.position.min.js',*/
						'js/contextMenu/jquery.contextMenu.min.js',
						'js/wpsJs/linux/wpsjs.js',
						'js/wpsJs/wpsEvent.js',
						'js/suwell_ofdReader.js',
						'js/ztree/jquery.ztree.core.min.js',
						'css/ztree/zTreeStyle.css',
						'services/LeaveService.js',
						'services/PersonnelService.js'
					]);
				}
			}]
		}
	}).state('formEditGeneric.fawen', {
		url: "/fawen/:taskInfoId",
		views: {
			'middleForm@formEditGeneric': {
				templateUrl: ENV.templateLocate + "/apps/workflow/formTemplates/jxw_fawen.html?ts=" + timestamp,
				controller: "formEditGenericFawenCtrl",
				cache: true,
			}
		},
		resolve: {
			loadDoneList: ['$ocLazyLoad', function ($ocLazyLoad) {
				return $ocLazyLoad.load([
					'apps/workflow/formTemplates/jxw_fawen.js'
				]);
			}]
		}
	}).state('formEditGeneric.wuguanju', {
		url: "/wuguanju/:taskInfoId",
		views: {
			'middleForm@formEditGeneric': {
				templateUrl: ENV.templateLocate + "/apps/workflow/formTemplates/wuguanju.html?ts=" + timestamp,
				controller: "wuguanjuCtrl",
				cache: true,
			}
		},
		resolve: {
			loadDoneList: ['$ocLazyLoad', function ($ocLazyLoad) {
				return $ocLazyLoad.load([
					'apps/workflow/formTemplates/wuguanju.js'
				]);
			}]
		}
	}).state('formEditGeneric.lhfawen', {
		url: "/lhfawen/:taskInfoId",
		views: {
			'middleForm@formEditGeneric': {
				templateUrl: ENV.templateLocate + "/apps/workflow/formTemplates/lhfawen.html?ts=" + timestamp,
				controller: "lhfawenCtrl",
				cache: true,
			}
		},
		resolve: {
			loadDoneList: ['$ocLazyLoad', function ($ocLazyLoad) {
				return $ocLazyLoad.load([
					'apps/workflow/formTemplates/lhfawen.js'
				]);
			}]
		}
	}).state('formEditGeneric.jxwdwfawen', {
		url: "/jxwdwfawen/:taskInfoId",
		views: {
			'middleForm@formEditGeneric': {
				templateUrl: ENV.templateLocate + "/apps/workflow/formTemplates/jxwdwfawen.html?ts=" + timestamp,
				controller: "formEditGenericJxwdwfawenCtrl",
				cache: true,
			}
		},
		resolve: {
			loadDoneList: ['$ocLazyLoad', function ($ocLazyLoad) {
				return $ocLazyLoad.load([
					'apps/workflow/formTemplates/jxwdwfawen.js'
				]);
			}]
		}
	}).state('formEditGeneric.jxwdwhyjy', {
        url: "/jxwdwhyjy/:taskInfoId",
        views: {
            'middleForm@formEditGeneric': {
                templateUrl: ENV.templateLocate + "/apps/workflow/formTemplates/jxwdwhyjy.html?ts=" + timestamp,
                controller: "formEditGenericjxwdwhyjyCtrl",
                cache: true,
            }
        },
        resolve: {
            loadDoneList: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    'apps/workflow/formTemplates/jxwdwhyjy.js'
                ]);
            }]
        }
    }).state('formEditGeneric.jxwdwshouwen', {
		url: "/jxwdwshouwen/:taskInfoId",
		views: {
			'middleForm@formEditGeneric': {
				templateUrl: ENV.templateLocate + "/apps/workflow/formTemplates/jxwdwshouwen.html?ts=" + timestamp,
				controller: "formEditGenericJxwdwshouwenCtrl",
				cache: true,
			}
		},
		resolve: {
			loadDoneList: ['$ocLazyLoad', function ($ocLazyLoad) {
				return $ocLazyLoad.load([
					'apps/workflow/formTemplates/jxwdwshouwen.js'
				]);
			}]
		}
	}).state('formEditGeneric.jxwshouwen', {
		url: "/jxwshouwen/:taskInfoId",
		views: {
			'middleForm@formEditGeneric': {
				templateUrl: ENV.templateLocate + "/apps/workflow/formTemplates/jxwshouwen.html?ts=" + timestamp,
				controller: "formEditGenericJxwshouwenCtrl",
				cache: true,
			}
		},
		resolve: {
			loadDoneList: ['$ocLazyLoad', function ($ocLazyLoad) {
				return $ocLazyLoad.load([
					'apps/workflow/formTemplates/jxwshouwen.js'
				]);
			}]
		}
	}).state('formEditGeneric.jxwdwxinhan', {
		url: "/jxwdwxinhan/:taskInfoId",
		views: {
			'middleForm@formEditGeneric': {
				templateUrl: ENV.templateLocate + "/apps/workflow/formTemplates/jxwdwxinhan.html?ts=" + timestamp,
				controller: "formEditGenericJxwdwxinhanCtrl",
				cache: true,
			}
		},
		resolve: {
			loadDoneList: ['$ocLazyLoad', function ($ocLazyLoad) {
				return $ocLazyLoad.load([
					'apps/workflow/formTemplates/jxwdwxinhan.js'
				]);
			}]
		}
	}).state('formEditGeneric.jxwxinhan', {
		url: "/jxwxinhan/:taskInfoId",
		views: {
			'middleForm@formEditGeneric': {
				templateUrl: ENV.templateLocate + "/apps/workflow/formTemplates/jxwxinhan.html?ts=" + timestamp,
				controller: "formEditGenericJxwxinhanCtrl",
				cache: true,
			}
		},
		resolve: {
			loadDoneList: ['$ocLazyLoad', function ($ocLazyLoad) {
				return $ocLazyLoad.load([
					'apps/workflow/formTemplates/jxwxinhan.js'
				]);
			}]
		}
	}).state('formEditGeneric.gfkgbfawen', {
		url: "/gfkgbfawen/:taskInfoId",
		views: {
			'middleForm@formEditGeneric': {
				templateUrl: ENV.templateLocate + "/apps/workflow/formTemplates/gfkgbfawen.html?ts=" + timestamp,
				controller: "formEditGenericGfkgbfawenCtrl",
				cache: true,
			}
		},
		resolve: {
			loadDoneList: ['$ocLazyLoad', function ($ocLazyLoad) {
				return $ocLazyLoad.load([
					'apps/workflow/formTemplates/gfkgbfawen.js'
				]);
			}]
		}
	}).state('formEditGeneric.hjxgffawen', {
		url: "/hjxgffawen/:taskInfoId",
		views: {
			'middleForm@formEditGeneric': {
				templateUrl: ENV.templateLocate + "/apps/workflow/formTemplates/hjxgffawen.html?ts=" + timestamp,
				controller: "hjxgffawenCtrl",
				cache: true,
			}
		},
		resolve: {
			loadDoneList: ['$ocLazyLoad', function ($ocLazyLoad) {
				return $ocLazyLoad.load([
					'apps/workflow/formTemplates/hjxgffawen.js'
				]);
			}]
		}
	}).state('formEditGeneric.jywjb', {
		url: "/jywjb/:taskInfoId",
		views: {
			'middleForm@formEditGeneric': {
				templateUrl: ENV.templateLocate + "/apps/workflow/formTemplates/jywjb.html?ts=" + timestamp,
				controller: "jywjbCtrl",
				cache: true,
			}
		},
		resolve: {
			loadDoneList: ['$ocLazyLoad', function ($ocLazyLoad) {
				return $ocLazyLoad.load([
					'apps/workflow/formTemplates/jywjb.js'
				]);
			}]
		}
	}).state('formEditGeneric.jywjg', {
		url: "/jywjg/:taskInfoId",
		views: {
			'middleForm@formEditGeneric': {
				templateUrl: ENV.templateLocate + "/apps/workflow/formTemplates/jywjg.html?ts=" + timestamp,
				controller: "jywjgCtrl",
				cache: true,
			}
		},
		resolve: {
			loadDoneList: ['$ocLazyLoad', function ($ocLazyLoad) {
				return $ocLazyLoad.load([
					'apps/workflow/formTemplates/jywjg.js'
				]);
			}]
		}
	}).state('formEditGeneric.jxwduwen', {
		url: "/jxwduwen/:taskInfoId",
		views: {
			'middleForm@formEditGeneric': {
				templateUrl: ENV.templateLocate + "/apps/workflow/formTemplates/jxwduwen.html?ts=" + timestamp,
				controller: "jxwduwenCtrl",
				cache: true,
			}
		},
		resolve: {
			loadDoneList: ['$ocLazyLoad', function ($ocLazyLoad) {
				return $ocLazyLoad.load([
					'apps/workflow/formTemplates/jxwduwen.js'
				]);
			}]
		}
	}).state('formEditGeneric.jxwdwduwen', {
		url: "/jxwdwduwen/:taskInfoId",
		views: {
			'middleForm@formEditGeneric': {
				templateUrl: ENV.templateLocate + "/apps/workflow/formTemplates/jxwdwduwen.html?ts=" + timestamp,
				controller: "jxwdwduwenCtrl",
				cache: true,
			}
		},
		resolve: {
			loadDoneList: ['$ocLazyLoad', function ($ocLazyLoad) {
				return $ocLazyLoad.load([
					'apps/workflow/formTemplates/jxwdwduwen.js'
				]);
			}]
		}
	}).state('formEditGeneric.jywjj', {
		url: "/jywjj/:taskInfoId",
		views: {
			'middleForm@formEditGeneric': {
				templateUrl: ENV.templateLocate + "/apps/workflow/formTemplates/jywjj.html?ts=" + timestamp,
				controller: "jywjjCtrl",
				cache: true,
			}
		},
		resolve: {
			loadDoneList: ['$ocLazyLoad', function ($ocLazyLoad) {
				return $ocLazyLoad.load([
					'apps/workflow/formTemplates/jywjj.js'
				]);
			}]
		}
	}).state('formEditGeneric.jywjy', {
		url: "/jywjy/:taskInfoId",
		views: {
			'middleForm@formEditGeneric': {
				templateUrl: ENV.templateLocate + "/apps/workflow/formTemplates/jywjy.html?ts=" + timestamp,
				controller: "jywjyCtrl",
				cache: true,
			}
		},
		resolve: {
			loadDoneList: ['$ocLazyLoad', function ($ocLazyLoad) {
				return $ocLazyLoad.load([
					'apps/workflow/formTemplates/jywjy.js'
				]);
			}]
		}
	}).state('formEditGeneric.workapproved', {
		url: "/workapproved/:taskInfoId",
		views: {
			'middleForm@formEditGeneric': {
				templateUrl: ENV.templateLocate + "/apps/workflow/formTemplates/workApproved.html?ts=" + timestamp,
				controller: "formEditGenericWorkApprovedCtrl",
				cache: false,
			}
		},
		resolve: {
			loadDoneList: ['$ocLazyLoad', function ($ocLazyLoad) {
				return $ocLazyLoad.load([
					'apps/workflow/formTemplates/workApproved.js'
				]);
			}]
		}
    }).state('formEditGeneric.partyapproved', {
        url: "/partyapproved/:taskInfoId",
        views: {
            'middleForm@formEditGeneric': {
                templateUrl: ENV.templateLocate + "/apps/workflow/formTemplates/partyApproved.html?ts=" + timestamp,
                controller: "formEditGenericPartyApprovedCtrl",
                cache: false,
            }
        },
        resolve: {
            loadDoneList: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    'apps/workflow/formTemplates/partyApproved.js'
                ]);
            }]
        }
	}).state('formEditGeneric.officepartyapproved', {
        url: "/officepartyapproved/:taskInfoId",
        views: {
            'middleForm@formEditGeneric': {
                templateUrl: ENV.templateLocate + "/apps/workflow/formTemplates/officepartyApproved.html?ts=" + timestamp,
                controller: "formEditGenericofficePartyApprovedCtrl",
                cache: false,
            }
        },
        resolve: {
            loadDoneList: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    'apps/workflow/formTemplates/officepartyApproved.js'
                ]);
            }]
        }
	}).state('coreHome.proposalReply', {
		url: "/proposalReply",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/workflow/DPComposedDeal/proposalReply/proposalReply.html?ts=" + timestamp,
				controller: "proposalReplyCtrl",
				cache: true,
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					'css/datepicker3.css',
					'js/bootstrap-datepicker.js',
					"services/NodeTreeTool.js?ts=" + timestamp,
					"apps/workflow/DPComposedDeal/proposalReply/proposalReply.js?ts=" + timestamp
				]);
			}]
		}
	}).state('formEditGeneric.blyjbpzx', {
		url: "/blyjbpzx/:taskInfoId",
		views: {
			'middleForm@formEditGeneric': {
				templateUrl: ENV.templateLocate + "/apps/workflow/formTemplates/blyjbp.html?ts=" + timestamp,
				controller: "blyjbpCtrl",
				cache: true,
			}
		},
		resolve: {
			loadDoneList: ['$ocLazyLoad', function ($ocLazyLoad) {
				return $ocLazyLoad.load([
					'apps/workflow/formTemplates/blyjbp.js'
				]);
			}]
		}
	}).state('formEditGeneric.blyjbprd', {
		url: "/blyjbprd/:taskInfoId",
		views: {
			'middleForm@formEditGeneric': {
				templateUrl: ENV.templateLocate + "/apps/workflow/formTemplates/blyjbp.html?ts=" + timestamp,
				controller: "blyjbpCtrl",
				cache: true,
			}
		},
		resolve: {
			loadDoneList: ['$ocLazyLoad', function ($ocLazyLoad) {
				return $ocLazyLoad.load([
					'apps/workflow/formTemplates/blyjbp.js'
				]);
			}]
		}
	}).state('formEditGeneric.otherapproved', {
		url: "/otherapproved/:taskInfoId",
		views: {
			'middleForm@formEditGeneric': {
				templateUrl: ENV.templateLocate + "/apps/workflow/formTemplates/otherApproved.html?ts=" + timestamp,
				controller: "formEditGenericOtherApprovedCtrl",
				cache: false,
			}
		},
		resolve: {
			loadDoneList: ['$ocLazyLoad', function ($ocLazyLoad) {
				return $ocLazyLoad.load([
					'apps/workflow/formTemplates/otherApproved.js'
				]);
			}]
		}
	}).state('formEditGeneric.ygcgzsbaopi', {
		url: "/ygcgzsbaopi/:taskInfoId",
		views: {
			'middleForm@formEditGeneric': {
				templateUrl: ENV.templateLocate + "/apps/workflow/formTemplates/ygcgzsbaopi.html?ts=" + timestamp,
				controller: "formYgcgzsbaopiCtl",
				cache: false,
			}
		},
		resolve: {
			loadDoneList: ['$ocLazyLoad', function ($ocLazyLoad) {
				return $ocLazyLoad.load([
					'apps/workflow/formTemplates/ygcgzsbaopi.js'
				]);
			}]
		}
	}).state('formEditGeneric.yscgjshengpi', {
		url: "/yscgjshengpi/:taskInfoId",
		views: {
			'middleForm@formEditGeneric': {
				templateUrl: ENV.templateLocate + "/apps/workflow/formTemplates/yscgjshengpi.html?ts=" + timestamp,
				controller: "yscgjshengpiCtrl",
				cache: false,
			}
		},
		resolve: {
			loadDoneList: ['$ocLazyLoad', function ($ocLazyLoad) {
				return $ocLazyLoad.load([
					'apps/workflow/formTemplates/yscgjshengpi.js'
				]);
			}]
		}
	}).state('formEditGeneric.contractapproved', {
		url: "/contractapproved/:taskInfoId",
		views: {
			'middleForm@formEditGeneric': {
				templateUrl: ENV.templateLocate + "/apps/workflow/formTemplates/contractApproved.html?ts=" + timestamp,
				controller: "formEditGenericContractApprovedCtrl",
				cache: false,
			}
		},
		resolve: {
			loadDoneList: ['$ocLazyLoad', function ($ocLazyLoad) {
				return $ocLazyLoad.load([
					'apps/workflow/formTemplates/contractApproved.js'
				]);
			}]
		}
	}).state('formEditGeneric.draftapproved', {
		url: "/draftapproved/:taskInfoId",
		views: {
			'middleForm@formEditGeneric': {
				templateUrl: ENV.templateLocate + "/apps/workflow/formTemplates/draftApproved.html?ts=" + timestamp,
				controller: "formEditGenericDraftApprovedCtrl",
				cache: true,
			}
		},
		resolve: {
			loadDoneList: ['$ocLazyLoad', function ($ocLazyLoad) {
				return $ocLazyLoad.load([
					'apps/workflow/formTemplates/draftApproved.js'
				]);
			}]
		}
	}).state('formEditGeneric.jxwhuiyi', {
		url: "/jxwhuiyi/:taskInfoId",
		views: {
			'middleForm@formEditGeneric': {
				templateUrl: ENV.templateLocate + "/apps/workflow/formTemplates/jxwhuiyi.html?ts=" + timestamp,
				controller: "jxwhuiyiCtrl",
				cache: true
			}
		},
		resolve: {
			loadDoneList: ['$ocLazyLoad', function ($ocLazyLoad) {
				return $ocLazyLoad.load([
					'apps/workflow/formTemplates/jxwhuiyi.js',
					"js/angularjs-ui-tree/angular-ui-tree.min.js?ts=" + timestamp,
					"js/angularjs-ui-tree/angular-ui-tree.min.css?ts=" + timestamp,
				]);
			}]
		}
	}).state('formEditGeneric.gwwjb', {
		url: "/gwwjb/:taskInfoId",
		views: {
			'middleForm@formEditGeneric': {
				templateUrl: ENV.templateLocate + "/apps/workflow/formTemplates/gwwjb.html?ts=" + timestamp,
				controller: "gwwjbCtrl",
				cache: true
			}
		},
		resolve: {
			loadDoneList: ['$ocLazyLoad', function ($ocLazyLoad) {
				return $ocLazyLoad.load([
					'apps/workflow/formTemplates/gwwjb.js',
					"js/angularjs-ui-tree/angular-ui-tree.min.js?ts=" + timestamp,
					"js/angularjs-ui-tree/angular-ui-tree.min.css?ts=" + timestamp,
				]);
			}]
		}
	}).state('formEditGeneric.dpComposedDeal', {
		url: "/dpComposedDeal/:taskInfoId",
		views: {
			'middleForm@formEditGeneric': {
				templateUrl: ENV.templateLocate + "/apps/workflow/formTemplates/dpComposedDeal.html?ts=" + timestamp,
				controller: "dpComposedDealCtrl",
				cache: false,
			}
		},
		resolve: {
			loadDoneList: ['$ocLazyLoad', function ($ocLazyLoad) {
				return $ocLazyLoad.load([
					'apps/workflow/formTemplates/dpComposedDeal.js'
				]);
			}]
		}
	}).state('formEditGeneric.jxwleave', {
		url: "/jxwleave/:taskInfoId",
		views: {
			'middleForm@formEditGeneric': {
				templateUrl: ENV.templateLocate + "/apps/workflow/formTemplates/jxwleave.html?ts=" + timestamp,
				controller: "jxwleaveCtrl",
				cache: true
			}
		},
		resolve: {
			loadDoneList: ['$ocLazyLoad', function ($ocLazyLoad) {
				return $ocLazyLoad.load([
					'apps/workflow/formTemplates/jxwleave.js'
				]);
			}]
		}
	}).state('formEditGeneric.jxwpersonnel', {
		url: "/jxwpersonnel/:taskInfoId",
		views: {
			'middleForm@formEditGeneric': {
				templateUrl: ENV.templateLocate + "/apps/workflow/formTemplates/jxwpersonnel.html?ts=" + timestamp,
				controller: "jxwpersonnelCtrl",
				cache: true
			}
		},
		resolve: {
			loadDoneList: ['$ocLazyLoad', function ($ocLazyLoad) {
				return $ocLazyLoad.load([
					'apps/workflow/formTemplates/jxwpersonnel.js',
					'services/LeaveService.js'
				]);
			}]
		}
	}).state('formEditGeneric.meeting', {
		url: "/meeting/:taskInfoId",
		views: {
			'middleForm@formEditGeneric': {
				templateUrl: ENV.templateLocate + "/apps/workflow/formTemplates/meeting.html?ts=" + timestamp,
				controller: "meetingCtrl",
				cache: true
			}
		},
		resolve: {
			loadDoneList: ['$ocLazyLoad', function ($ocLazyLoad) {
				return $ocLazyLoad.load([
					'apps/workflow/formTemplates/meeting.js',
					'services/LeaveService.js'
				]);
			}]
		}
	}).state('coreHome.officialDocuments', {
		url: "/officialDocuments",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/workflow/query/zongheQuery.html?ts=" + timestamp,
				controller: "zongheQueryCtrl",
				cache: true,
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					'css/datepicker3.css',
					// 'css/daterangepicker.css',
					// 'js/moment.min.js',
					// 'js/daterangepicker.js',
					'js/bootstrap-datepicker.js',
					"apps/workflow/query/zongheQuery.js?ts=" + timestamp,
				]);
			}]
		}
	}).state('coreHome.userManageList', {
		url: "/userManageList",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/userManage/userList.html?ts=" + timestamp,
				controller: "userListCtrl",
				cache: true,
			}
		},
		resolve: {
			loadUserManageList: ['$ocLazyLoad', function ($ocLazyLoad) {
				return $ocLazyLoad.load([
					"apps/userManage/userManage.js?ts=" + timestamp,
					"services/NodeTreeTool.js?ts=" + timestamp,
				]);
			}]
		}
	}).state('coreHome.departManageList', {
		url: "/departManageList",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/departManage/departManageList.html?ts=" + timestamp,
				controller: "departManageListCtrl",
				cache: true,
			}
		},
		resolve: {
			loadUserManageList: ['$ocLazyLoad', function ($ocLazyLoad) {
				return $ocLazyLoad.load([
					"apps/departManage/departManage.js?ts=" + timestamp,
					"js/angularjs-ui-tree/angular-ui-tree.min.js?ts=" + timestamp,
					"js/ng-sortable.min.js?ts=" + timestamp,
					"js/angularjs-ui-tree/angular-ui-tree.min.css?ts=" + timestamp,
					"css/ng-sortable.min.css?ts=" + timestamp,
					"css/ng-sortable.style.min.css?ts=" + timestamp,
					"services/NodeTreeTool.js?ts=" + timestamp,
				]);
			}]
		}
	}).state('coreHome.roleManageList', {
		url: "/roleManageList",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/roleManage/roleManageList.html?ts=" + timestamp,
				controller: "roleManageListCtrl",
				cache: true,
			}
		},
		resolve: {
			loadUserManageList: ['$ocLazyLoad', function ($ocLazyLoad) {
				return $ocLazyLoad.load([
					"apps/roleManage/roleManage.js?ts=" + timestamp,
					"js/angularjs-ui-tree/angular-ui-tree.min.js?ts=" + timestamp,
					"js/angularjs-ui-tree/angular-ui-tree.min.css?ts=" + timestamp,
					"css/layout.css?ts=" + timestamp,
					"services/NodeTreeTool.js?ts=" + timestamp
				]);
			}]
		}
	}).state('coreHome.personBasisSetting', {
		url: "/personBasisSetting",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/personSetting/basisSetting/personBasisSetting.html?ts=" + timestamp,
				controller: "personBasisSettingCtrl",
				cache: true,
			}
		},
		resolve: {
			loadUserManageList: ['$ocLazyLoad', function ($ocLazyLoad) {
				return $ocLazyLoad.load([
					"apps/personSetting/basisSetting/personBasisSetting.js?ts=" + timestamp,
					"js/angularjs-ui-tree/angular-ui-tree.min.js?ts=" + timestamp,
					"js/angularjs-ui-tree/angular-ui-tree.min.css?ts=" + timestamp,
					"css/layout.css?ts=" + timestamp,
					"services/NodeTreeTool.js?ts=" + timestamp
				]);
			}]
		}
	}).state('coreHome.personBasisSetting.agentSetting', {
		url: "/agentSetting",
		views: {
			'settingPath@coreHome.personBasisSetting': {
				templateUrl: ENV.templateLocate + "/apps/personSetting/basisSetting/settingPath/agentSetting.html?ts=" + timestamp,
				controller: "agentSettingCtrl",
				cache: true,
			}
		},
		resolve: {
			loadUserManageList: ['$ocLazyLoad', function ($ocLazyLoad) {
				return $ocLazyLoad.load([
					"apps/personSetting/basisSetting/settingPath/agentSetting.js?ts=" + timestamp
				]);
			}]
		}
	}).state('coreHome.personBasisSetting.autoReceiveTask', {
		url: "/autoReceiveTask",
		views: {
			'settingPath@coreHome.personBasisSetting': {
				templateUrl: ENV.templateLocate + "/apps/personSetting/basisSetting/settingPath/autoReceiveTask.html?ts=" + timestamp,
				controller: "autoReceiveTaskCtl",
				cache: true,
			}
		},
		resolve: {
			loadUserManageList: ['$ocLazyLoad', function ($ocLazyLoad) {
				return $ocLazyLoad.load([
					"apps/personSetting/basisSetting/settingPath/autoReceiveTask.js?ts=" + timestamp
				]);
			}]
		}
	}).state('coreHome.personBasisSetting.userInfoModify', {
		url: "/userInfoModify",
		views: {
			'settingPath@coreHome.personBasisSetting': {
				templateUrl: ENV.templateLocate + "/apps/personSetting/basisSetting/settingPath/userInfoMng.html?ts=" + timestamp,
				controller: "userInfoMngCtl",
				cache: true,
			}
		},
		resolve: {
			loadUserManageList: ['$ocLazyLoad', function ($ocLazyLoad) {
				return $ocLazyLoad.load([
					"apps/personSetting/basisSetting/settingPath/userInfoMng.js?ts=" + timestamp
				]);
			}]
		}
	}).state('coreHome.processDefList', {
		url: "/processDefList",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/sysMng/processMng/processDefMng/processDefList.html?ts=" + timestamp,
				controller: "processDefListCtrl",
				cache: true,
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					"apps/sysMng/processMng/processDefMng/processDefCtl.js?ts=" + timestamp,
					'css/processDefList/layout.css',
					"js/angularjs-ui-tree/angular-ui-tree.min.js?ts=" + timestamp,
					"js/angularjs-ui-tree/angular-ui-tree.min.css?ts=" + timestamp,
					"css/layout.css?ts=" + timestamp
					/*'css/formEditNew/reset.css'*/
				]);
			}]
		}
	}).state('coreHome.flowActionMng', {
		url: "/flowActionMng",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/sysMng/processMng/actionMng/flowActionMng.html?ts=" + timestamp,
				controller: "flowActionCtl",
				cache: true,
			}
		},
		resolve: {
			loadUserManageList: ['$ocLazyLoad', function ($ocLazyLoad) {
				return $ocLazyLoad.load([
					"apps/sysMng/processMng/actionMng/flowActionMng.js?ts=" + timestamp,
					"services/NodeTreeTool.js?ts=" + timestamp
				]);
			}]
		}
	}).state('coreHome.overallAgentMng', {
		url: "/overallAgentMng",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/securityMng/agentMng/agentSetting.html?ts=" + timestamp,
				controller: "overallAgentMngCtl",
				cache: true,
			}
		},
		resolve: {
			loadUserManageList: ['$ocLazyLoad', function ($ocLazyLoad) {
				return $ocLazyLoad.load([
					"apps/securityMng/agentMng/agentSetting.js?ts=" + timestamp,
					"services/NodeTreeTool.js?ts=" + timestamp
				]);
			}]
		}
	}).state('coreHome.leaderMng', {
		url: "/leaderMng",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/sysMng/orgMng/leaderMng/leaderMng.html?ts=" + timestamp,
				controller: "leaderMngCtl",
				cache: true,
			}
		},
		resolve: {
			loadUserManageList: ['$ocLazyLoad', function ($ocLazyLoad) {
				return $ocLazyLoad.load([
					"apps/sysMng/orgMng/leaderMng/leaderMng.js?ts=" + timestamp,
					"services/NodeTreeTool.js?ts=" + timestamp
				]);
			}]
		}
	}).state('coreHome.postManageList', {
		url: "/postManageList",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/postManage/postList.html?ts=" + timestamp,
				controller: "postListCtrl",
				cache: true,
			}
		},
		resolve: {
			loadPostMng: ['$ocLazyLoad', function ($ocLazyLoad) {
				return $ocLazyLoad.load([
					"apps/postManage/postManage.js?ts=" + timestamp,
					"js/angularjs-ui-tree/angular-ui-tree.min.js?ts=" + timestamp,
					"js/angularjs-ui-tree/angular-ui-tree.min.css?ts=" + timestamp,
					"css/layout.css?ts=" + timestamp,
					"services/NodeTreeTool.js?ts=" + timestamp
				]);
			}]
		}
	}).state('coreHome.moduleAuthManageList', {
		url: "/moduleAuthManageList",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/moduleAuthManage/moduleAuthManageList.html?ts=" + timestamp,
				controller: "moduleAuthManageListCtrl",
				cache: true,
			}
		},
		resolve: {
			loadAuthMng: ['$ocLazyLoad', function ($ocLazyLoad) {
				return $ocLazyLoad.load([
					"apps/moduleAuthManage/moduleAuthManage.js?ts=" + timestamp,
					"js/angularjs-ui-tree/angular-ui-tree.min.js?ts=" + timestamp,
					"js/angularjs-ui-tree/angular-ui-tree.min.css?ts=" + timestamp,
					'css/font-Awesome-master/css/font-awesome.min.css',
					"css/layout.css?ts=" + timestamp,
					"services/NodeTreeTool.js?ts=" + timestamp
				]);
			}]
		}
	}).state('coreHome.formConfig', {
		url: "/formConfig",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/workflow/formConfig.html?ts=" + timestamp,
				controller: "formConfigCtrl",
				cache: true,
			}
		},
		resolve: {
			loadFormNodeMng: ['$ocLazyLoad', function ($ocLazyLoad) {
				return $ocLazyLoad.load([
					"apps/workflow/formConfig.js?ts=" + timestamp,
					"js/angularjs-ui-tree/angular-ui-tree.min.js?ts=" + timestamp,
					"js/angularjs-ui-tree/angular-ui-tree.min.css?ts=" + timestamp,
					"css/layout.css?ts=" + timestamp,
					"css/processForm.css?ts=" + timestamp,
					"services/NodeTreeTool.js?ts=" + timestamp
				]);
			}]
		}
	}).state('coreHome.redTemplate', {
		url: "/redTemplate",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/workflow/redTemplate/redTemplate.html?ts=" + timestamp,
				controller: "redTemplateCtrl",
				cache: true,
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					//'css/processDefList/layout.css',
					//'css/formEditNew/reset.css',
					"js/angularjs-ui-tree/angular-ui-tree.min.js?ts=" + timestamp,
					"js/angularjs-ui-tree/angular-ui-tree.min.css?ts=" + timestamp,
					'apps/workflow/redTemplate/redTemplate.js',
					'js/contextMenu/jquery.contextMenu.min.css',
					'js/contextMenu/jquery.ui.position.min.js',
					'js/contextMenu/jquery.contextMenu.min.js'
				]);
			}]
		}
	}).state('coreHome.dicManage', {
		url: "/dicManage",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/dicManage/dicManage.html?ts=" + timestamp,
				controller: "dicManageCtrl",
				cache: true,
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					'apps/dicManage/dicManage.js',
					"js/angularjs-ui-tree/angular-ui-tree.min.js?ts=" + timestamp,
					"js/ng-sortable.min.js?ts=" + timestamp,
					"js/angularjs-ui-tree/angular-ui-tree.min.css?ts=" + timestamp,
					"css/layout.css?ts=" + timestamp,
					"css/ng-sortable.min.css?ts=" + timestamp,
					"css/ng-sortable.style.min.css?ts=" + timestamp,
					"services/NodeTreeTool.js?ts=" + timestamp
				]);
			}]
		}
	}).state('coreHome.auditInfoList', {
		url: "/auditInfoList",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/auditInfo/auditInfoList.html?ts=" + timestamp,
				controller: "AuditInfoCtrl",
				cache: true,
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					'apps/auditInfo/auditInfoManage.js',
					'css/datepicker3.css',
					// 'css/daterangepicker.css',
					// 'js/moment.min.js',
					// 'js/daterangepicker.js',
					'js/bootstrap-datepicker.js'
				]);
			}]
		}
	}).state('coreHome.responsiblePersonManage', {
		url: "/responsiblePersonManage",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/moduleAuthManage/responsiblePersonManage/responsiblePersonManage.html?ts=" + timestamp,
				controller: "responsiblePersonManageCtrl",
				cache: true,
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					"apps/moduleAuthManage/responsiblePersonManage/responsiblePersonManage.js?ts=" + timestamp,
					"services/NodeTreeTool.js?ts=" + timestamp,
				]);
			}]
		}
	}).state('coreHome.sentOfficialDocuments', {
		url: "/sentOfficialDocuments",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/bangong/bangongguanli/fawenguanli/fawenManage.html?ts=" + timestamp,
				controller: "fawenManageCtrl",
				cache: true,
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					'css/datepicker3.css',
					'js/bootstrap-datepicker.js',
					"services/NodeTreeTool.js?ts=" + timestamp,
					"apps/bangong/bangongguanli/fawenguanli/fawenManage.js?ts=" + timestamp
				]);
			}]
		}
	}).state('coreHome.receivedOfficialDocuments', {
		url: "/receivedOfficialDocuments",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/bangong/bangongguanli/shouwenguanli/shouwenManage.html?ts=" + timestamp,
				controller: "shouwenManageCtrl",
				cache: true,
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					'css/datepicker3.css',
					'js/bootstrap-datepicker.js',
					"services/NodeTreeTool.js?ts=" + timestamp,
					"apps/bangong/bangongguanli/shouwenguanli/shouwenManage.js?ts=" + timestamp
				]);
			}]
		}
	}).state('coreHome.collectionList', {
		url: "/collectionList",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/workflow/myCollection/collectionList.html?ts=" + timestamp,
				controller: "collectionListCtrl",
				cache: true,
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					"apps/workflow/myCollection/collectionCtrl.js?ts=" + timestamp,
				]);
			}]
		}
	}).state('coreHome.meetingroomArrange', {
		url: "/meetingroomArrange",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/meetingroomMng/arrange/meetingroomArrange.html?ts=" + timestamp,
				controller: "meetingroomArrangeCtrl",
				cache: true
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					"apps/meetingroomMng/arrange/meetingroomArrange.js?ts=" + timestamp,
					"js/angularjs-ui-tree/angular-ui-tree.min.js?ts=" + timestamp,
					"js/angularjs-ui-tree/angular-ui-tree.min.css?ts=" + timestamp,
				]);
			}]
		}
	}).state('coreHome.meetingroomApply', {
		url: "/meetingroomApply",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/meetingroomMng/apply/meetingroomApply.html?ts=" + timestamp,
				controller: "meetingroomApplyCtrl",
				cache: true
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					"apps/meetingroomMng/apply/meetingroomApply.js?ts=" + timestamp,
					'css/datepicker3.css',
					'js/bootstrap-datepicker.js',
					"services/NodeTreeTool.js?ts=" + timestamp
				]);
			}]
		}
	}).state('coreHome.meetingroomManage', {
		url: "/meetingroomManage",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/meetingroomMng/manage/meetingroomManage.html?ts=" + timestamp,
				controller: "meetingroomManageCtrl",
				cache: true
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					"apps/meetingroomMng/manage/meetingroomManage.js?ts=" + timestamp,
					"services/NodeTreeTool.js?ts=" + timestamp
				]);
			}]
		}
	}).state('coreHome.meetingroomQuery', {
		url: "/meetingroomQuery",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/meetingroomMng/query/meetingroomQuery.html?ts=" + timestamp,
				controller: "meetingroomQueryCtrl",
				cache: true
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					"apps/meetingroomMng/query/meetingroomQuery.js?ts=" + timestamp,
					'css/datepicker3.css',
					'js/bootstrap-datepicker.js'
				]);
			}]
		}
	}).state('coreHome.leaderWorkArrange', {
		url: "/leaderWorkArrange",
		params: {modeType: 'W'},
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/bangong/bangongguanli/leaderwork/leaderWorkArrange.html?ts=" + timestamp,
				controller: "leaderWorkArrangeCtrl",
				cache: true
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					"apps/bangong/bangongguanli/leaderwork/leaderWorkArrange.js?ts=" + timestamp,
					'css/datepicker3.css',
					'js/bootstrap-datepicker.js',
					"js/angularjs-ui-tree/angular-ui-tree.min.js?ts=" + timestamp,
					"js/angularjs-ui-tree/angular-ui-tree.min.css?ts=" + timestamp,
				]);
			}]
		}
	}).state('coreHome.executiveLeaderArrange', {
		url: "/executiveLeaderArrange",
		params: {modeType: 'X'},
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/bangong/bangongguanli/leaderwork/leaderWorkArrange.html?ts=" + timestamp,
				controller: "leaderWorkArrangeCtrl",
				cache: true
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					"apps/bangong/bangongguanli/leaderwork/leaderWorkArrange.js?ts=" + timestamp,
					'css/datepicker3.css',
					'js/bootstrap-datepicker.js',
					"js/angularjs-ui-tree/angular-ui-tree.min.js?ts=" + timestamp,
					"js/angularjs-ui-tree/angular-ui-tree.min.css?ts=" + timestamp,
				]);
			}]
		}
	}).state('coreHome.partyLeaderArrange', {
		url: "/partyLeaderArrange",
		params: {modeType: 'D'},
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/bangong/bangongguanli/leaderwork/leaderWorkArrange.html?ts=" + timestamp,
				controller: "leaderWorkArrangeCtrl",
				cache: true
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					"apps/bangong/bangongguanli/leaderwork/leaderWorkArrange.js?ts=" + timestamp,
					'css/datepicker3.css',
					'js/bootstrap-datepicker.js',
					"js/angularjs-ui-tree/angular-ui-tree.min.js?ts=" + timestamp,
					"js/angularjs-ui-tree/angular-ui-tree.min.css?ts=" + timestamp,
				]);
			}]
		}
	}).state('coreHome.processControl', {
		url: "/processControl",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/sysMng/processControlMng/processControlMng.html?ts=" + timestamp,
				controller: "processControlMngCtrl",
				cache: true
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					"apps/sysMng/processControlMng/processControlMng.js?ts=" + timestamp,
					'css/datepicker3.css',
					'js/bootstrap-datepicker.js',
					"js/angularjs-ui-tree/angular-ui-tree.min.js?ts=" + timestamp,
					"js/angularjs-ui-tree/angular-ui-tree.min.css?ts=" + timestamp,
					"services/NodeTreeTool.js?ts=" + timestamp
				]);
			}]
		}
	}).state('coreHome.governor', {
		url: "/governor",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/supervisorMng/governor/governor.html?ts=" + timestamp,
				controller: "governorCtrl",
				cache: true
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					"apps/supervisorMng/governor/governor.js?ts=" + timestamp,
					'css/datepicker3.css',
					'js/bootstrap-datepicker.js',
					"js/angularjs-ui-tree/angular-ui-tree.min.js?ts=" + timestamp,
					"js/angularjs-ui-tree/angular-ui-tree.min.css?ts=" + timestamp,
					"services/NodeTreeTool.js?ts=" + timestamp
				]);
			}]
		}
	}).state('coreHome.workApproved', {
		url: "/workApproved",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/workflow/workApproved/workApprovedManager.html?ts=" + timestamp,
				controller: "workApprovedCtrl",
				cache: false,
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					'css/datepicker3.css',
					'js/bootstrap-datepicker.js',
					"apps/workflow/workApproved/workApproved.js?ts=" + timestamp,
				]);
			}]
		}
	}).state('coreHome.itemManager', {
        url: "/itemManager",
        views: {
            'rightContent@coreHome': {
                templateUrl: ENV.templateLocate + "/apps/workflow/itemManager/itemManager.html?ts=" + timestamp,
                controller: "itemManagerCtrl",
                cache: true,
            }
        },
        resolve: {
            loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
                return $ocLazyLoad.load([
                	'css/datepicker3.css',
                    'js/bootstrap-datepicker.js',
                    "apps/workflow/itemManager/itemManager.js?ts=" + timestamp,
                ]);
            }]
        }
    }).state('coreHome.itemsPurchase', {
        url: "/itemsPurchase",
        views: {
            'rightContent@coreHome': {
                templateUrl: ENV.templateLocate + "/apps/workflow/itemManager/itemsPurchase.html?ts=" + timestamp,
                controller: "itemsPurchaseCtrl",
                cache: true,
            }
        },
        resolve: {
            loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
                return $ocLazyLoad.load([
                	'css/datepicker3.css',
                    'js/bootstrap-datepicker.js',
                    "apps/workflow/itemManager/itemsPurchase.js?ts=" + timestamp,
                ]);
            }]
        }
    }).state('coreHome.itemPartyManager', {
        url: "/itemPartyManager",
        views: {
            'rightContent@coreHome': {
                templateUrl: ENV.templateLocate + "/apps/workflow/itemManager/itemPartyManager.html?ts=" + timestamp,
                controller: "itemPartyManagerCtrl",
                cache: true,
            }
        },
        resolve: {
            loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
                return $ocLazyLoad.load([
                	'css/datepicker3.css',
                    'js/bootstrap-datepicker.js',
                    "apps/workflow/itemManager/itemPartyManager.js?ts=" + timestamp,
                ]);
            }]
        }
    }).state('coreHome.fileQuery', {
        url: "/fileQuery",
        views: {
            'rightContent@coreHome': {
                templateUrl: ENV.templateLocate + "/apps/workflow/officialApprove/fileQueryManager.html?ts=" + timestamp,
                controller: "fileQueryManagerCtrl",
                cache: true,
            }
        },
        resolve: {
            loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
                return $ocLazyLoad.load([
                	'css/datepicker3.css',
                    'js/bootstrap-datepicker.js',
                    "apps/workflow/officialApprove/fileQuery.js?ts=" + timestamp,
                ]);
            }]
        }
    }).state('coreHome.scheduleMng', {
		url: "/scheduleMng",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/moduleAuthManage/scheduleMng/scheduleMng.html?ts=" + timestamp,
				controller: "scheduleMngCtrl",
				cache: true
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					"apps/moduleAuthManage/scheduleMng/scheduleMng.js?ts=" + timestamp,
					'css/datepicker3.css',
					'js/bootstrap-datepicker.js',
					"js/angularjs-ui-tree/angular-ui-tree.min.js?ts=" + timestamp,
					"js/angularjs-ui-tree/angular-ui-tree.min.css?ts=" + timestamp,
					"services/NodeTreeTool.js?ts=" + timestamp,
					"css/layout.css?ts=" + timestamp
				]);
			}]
		}
	}).state('coreHome.itemManagement', {
        url: "/itemManagement/:parameterName",
        views: {
            'rightContent@coreHome': {
                templateUrl: ENV.templateLocate + "/apps/officeSupplies/itemManagement/itemManagement.html?ts=" + timestamp,
                controller: "itemManagementCtl",
                cache: true
            }
        },
        resolve: {
            loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
                return $ocLazyLoad.load([
                    "apps/officeSupplies/itemManagement/itemManagementCtl.js?ts=" + timestamp,
                    'css/datepicker3.css',
                    'js/bootstrap-datepicker.js',
                    "js/angularjs-ui-tree/angular-ui-tree.min.js?ts=" + timestamp,
                    "js/angularjs-ui-tree/angular-ui-tree.min.css?ts=" + timestamp,
                    "services/NodeTreeTool.js?ts=" + timestamp,
                    "css/layout.css?ts=" + timestamp
                ]);
            }]
        }
    }).state('coreHome.purchaseGoods', {
        url: "/purchaseGoods/:parameterName",
        views: {
            'rightContent@coreHome': {
                templateUrl: ENV.templateLocate + "/apps/officeSupplies/purchaseGoods/purchaseGoods.html?ts=" + timestamp,
                controller: "purchaseGoodsCtl",
                cache: true
            }
        },
        resolve: {
            loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
                return $ocLazyLoad.load([
                    "apps/officeSupplies/purchaseGoods/purchaseGoodsCtl.js?ts=" + timestamp,
                    'css/datepicker3.css',
                    'js/bootstrap-datepicker.js',
                    "js/angularjs-ui-tree/angular-ui-tree.min.js?ts=" + timestamp,
                    "js/angularjs-ui-tree/angular-ui-tree.min.css?ts=" + timestamp,
                    "services/NodeTreeTool.js?ts=" + timestamp,
                    "css/layout.css?ts=" + timestamp
                ]);
            }]
        }
    }).state('coreHome.applicationGoods', {
		url: "/applicationGoods/:parameterName",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/officeSupplies/applicationGoods/applicationGoods.html?ts=" + timestamp,
				controller: "applicationGoodsCtl",
				cache: true
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					"apps/officeSupplies/applicationGoods/applicationGoodsCtl.js?ts=" + timestamp,
					'css/datepicker3.css',
					'js/bootstrap-datepicker.js',
				]);
			}]
		}
	}).state('coreHome.itemDistribution', {
		url: "/itemDistribution/:parameterName",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/officeSupplies/itemDistribution/itemDistribution.html?ts=" + timestamp,
				controller: "itemDistributionCtl",
				cache: true
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					"apps/officeSupplies/itemDistribution/itemDistributionCtl.js?ts=" + timestamp,
					'css/datepicker3.css',
					'js/bootstrap-datepicker.js',
				]);
			}]
		}
	}).state('coreHome.claimConfirmation', {
		url: "/claimConfirmation/:parameterName",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/officeSupplies/claimConfirmation/claimConfirmation.html?ts=" + timestamp,
				controller: "claimConfirmationCtl",
				cache: true
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					"apps/officeSupplies/claimConfirmation/claimConfirmationCtl.js?ts=" + timestamp,
					'css/datepicker3.css',
					'js/bootstrap-datepicker.js',
				]);
			}]
		}
	}).state('coreHome.itemStatistics', {
		url: "/itemStatistics/:parameterName",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/officeSupplies/itemStatistics/itemStatistics.html?ts=" + timestamp,
				controller: "itemStatisticsCtl",
				cache: true
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					"apps/officeSupplies/itemStatistics/itemStatisticsCtl.js?ts=" + timestamp,
					'css/datepicker3.css',
					'js/bootstrap-datepicker.js',
				]);
			}]
		}
	}).state('coreHome.supervise', {
		url: "/supervise",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/supervisorMng/supervise/supervise.html?ts=" + timestamp,
				controller: "superviseMngCtrl",
				cache: true
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					"apps/supervisorMng/supervise/superviseMng.js?ts=" + timestamp,
					'css/datepicker3.css',
					'js/bootstrap-datepicker.js',
					"js/angularjs-ui-tree/angular-ui-tree.min.js?ts=" + timestamp,
					"js/angularjs-ui-tree/angular-ui-tree.min.css?ts=" + timestamp,
					"services/NodeTreeTool.js?ts=" + timestamp,
					"css/layout.css?ts=" + timestamp
				]);
			}]
		}
	}).state('coreHome.approval', {
		url: "/approval",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/supervisorMng/approval/approval.html?ts=" + timestamp,
				controller: "approvalMngCtrl",
				cache: true
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					"apps/supervisorMng/approval/approvalMng.js?ts=" + timestamp,
					'css/datepicker3.css',
					'js/bootstrap-datepicker.js',
					"js/angularjs-ui-tree/angular-ui-tree.min.js?ts=" + timestamp,
					"js/angularjs-ui-tree/angular-ui-tree.min.css?ts=" + timestamp,
					"services/NodeTreeTool.js?ts=" + timestamp,
					"css/layout.css?ts=" + timestamp
				]);
			}]
		}
	}).state('coreHome.summary', {
		url: "/summary",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/supervisorMng/summary/summary.html?ts=" + timestamp,
				controller: "summaryMngCtrl",
				cache: true
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					"apps/supervisorMng/summary/summaryMng.js?ts=" + timestamp,
					'css/datepicker3.css',
					'js/bootstrap-datepicker.js',
					"js/angularjs-ui-tree/angular-ui-tree.min.js?ts=" + timestamp,
					"js/angularjs-ui-tree/angular-ui-tree.min.css?ts=" + timestamp,
					"services/NodeTreeTool.js?ts=" + timestamp,
					"css/layout.css?ts=" + timestamp
				]);
			}]
		}
	}).state('coreHome.officialbulletin', {
		url: "/officialbulletin",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/bangong/bangongguanli/officialbulletin/officialbulletin.html?ts=" + timestamp,
				controller: "officialbulletinMngCtrl",
				cache: true
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					"apps/bangong/bangongguanli/officialbulletin/officialbulletinMng.js?ts=" + timestamp,
					'css/datepicker3.css',
					'js/bootstrap-datepicker.js',
					"js/angularjs-ui-tree/angular-ui-tree.min.js?ts=" + timestamp,
					"js/angularjs-ui-tree/angular-ui-tree.min.css?ts=" + timestamp,
					"services/NodeTreeTool.js?ts=" + timestamp,
					"css/layout.css?ts=" + timestamp
				]);
			}]
		}
	}).state('coreHome.meetingMng', {
		url: "/meetingMng",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/bangong/bangongguanli/meetingMng/meetingMng.html?ts=" + timestamp,
				controller: "meetingMngCtrl",
				cache: true
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					"apps/bangong/bangongguanli/meetingMng/meetingMng.js?ts=" + timestamp,
					'css/datepicker3.css',
					'js/bootstrap-datepicker.js'
				]);
			}]
		}
	}).state('coreHome.DPComposedDeal', {
		url: "/DPComposedDeal",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/workflow/DPComposedDeal/dpComposedDealManager.html?ts=" + timestamp,
				controller: "DPComposedDealListCtrl",
				cache: true,
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					'css/datepicker3.css',
					'js/bootstrap-datepicker.js',
					"apps/workflow/DPComposedDeal/dpComposedDeal.js?ts=" + timestamp,
				]);
			}]
		}
	})
		.state('formEditGeneric.npcHandling', {
			url: "/npcHandling/:taskInfoId",
			views: {
				'middleForm@formEditGeneric': {
					templateUrl: ENV.templateLocate + "/apps/workflow/formTemplates/npcHandling.html?ts=" + timestamp,
					controller: "npcHandlingCtrl",
					cache: true,
				}
			},
			resolve: {
				loadDoneList: ['$ocLazyLoad', function ($ocLazyLoad) {
					return $ocLazyLoad.load([
						'apps/workflow/formTemplates/npcHandling.js'
					]);
				}]
			}
		}).state('coreHome.approvalAttachManage', {
		url: "/approvalAttachManage",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/workflow/DPComposedDeal/approvalAttachManage/approvalAttachManage.html?ts=" + timestamp,
				controller: "approvalAttachManageCtrl",
				cache: false,
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					'css/datepicker3.css',
					'js/bootstrap-datepicker.js',
					"apps/workflow/DPComposedDeal/approvalAttachManage/approvalAttachManage.js?ts=" + timestamp,
				]);
			}]
		}
  }).state('coreHome.batchimport', {
      url: "/batchimport",
      views: {
          'rightContent@coreHome': {
              templateUrl: ENV.templateLocate + "/apps/workflow/DPComposedDeal/batchimport/batchimport.html?ts=" + timestamp,
              controller: "batchimportCtrl",
              cache: false,
          }
      },
      resolve: {
          loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
              return $ocLazyLoad.load([
                  'css/datepicker3.css',
                  'js/bootstrap-datepicker.js',
                  "apps/workflow/DPComposedDeal/batchimport/batchimport.js?ts=" + timestamp,
              ]);
          }]
      }
	}).state('coreHome.leaveApproval', {
		url: "/leaveApproval",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/personnelMng/leave/leaveApproval.html?ts=" + timestamp,
				controller: "leaveApprovalCtrl",
				cache: true
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					'css/datepicker3.css',
					'js/bootstrap-datepicker.js',
					"apps/personnelMng/leave/leaveApprovalMng.js?ts=" + timestamp
				]);
			}]
		}
	}).state('coreHome.leaveQuery', {
		url: "/leaveQuery",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/personnelMng/leave/leaveQuery.html?ts=" + timestamp,
				controller: "leaveQueryCtrl",
				cache: true
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					'css/datepicker3.css',
					'js/bootstrap-datepicker.js',
					"apps/personnelMng/leave/leaveQueryMng.js?ts=" + timestamp
				]);
			}]
		}
	}).state('coreHome.wageQuery', {
		url: "/wageQuery",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/personnelMng/wage/wageQuery.html?ts=" + timestamp,
				controller: "wageQueryCtrl",
				cache: true
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					'css/datepicker3.css',
					'js/bootstrap-datepicker.js',
					"apps/personnelMng/wage/wageQueryMng.js?ts=" + timestamp
				]);
			}]
		}
	}).state('coreHome.hireMng', {
		url: "/hireMng",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/personnelMng/hireMng/hireMng.html?ts=" + timestamp,
				controller: "hireMngCtrl",
				cache: true
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					'css/datepicker3.css',
					'js/bootstrap-datepicker.js',
					"apps/personnelMng/hireMng/hireMng.js?ts=" + timestamp
				]);
			}]
		}
	}).state('coreHome.yscgMng', {
		url: "/yscgMng",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/personnelMng/yscgMng/yscgMng.html?ts=" + timestamp,
				controller: "yscgMngCtrl",
				cache: true
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					'css/datepicker3.css',
					'js/bootstrap-datepicker.js',
					"apps/personnelMng/yscgMng/yscgMng.js?ts=" + timestamp
				]);
			}]
		}
	}).state('coreHome.partyDuesQuery', {
		url: "/partyDuesQuery",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/personnelMng/partyDues/partyDuesQuery.html?ts=" + timestamp,
				controller: "partyDuesQueryMngCtrl",
				cache: true
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					'css/datepicker3.css',
					'js/bootstrap-datepicker.js',
					"apps/personnelMng/partyDues/partyDuesQueryMng.js?ts=" + timestamp
				]);
			}]
		}
	}).state('formEditGeneric.reminderNotice', {
        url: "/reminderNotice/:taskInfoId",
        views: {
            'middleForm@formEditGeneric': {
                templateUrl: ENV.templateLocate + "/apps/workflow/formTemplates/reminderNotice.html?ts=" + timestamp,
                controller: "reminderNoticeCtrl",
                cache: true,
            }
        },
        resolve: {
            loadDoneList: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    'apps/workflow/formTemplates/reminderNotice.js'
                ]);
            }]
        }
    }).state('formEditGeneric.dwReminderNotice', {
		url: "/dwReminderNotice/:taskInfoId",
		views: {
			'middleForm@formEditGeneric': {
				templateUrl: ENV.templateLocate + "/apps/workflow/formTemplates/dwReminderNotice.html?ts=" + timestamp,
				controller: "dwReminderNoticeCtrl",
				cache: true,
			}
		},
		resolve: {
			loadDoneList: ['$ocLazyLoad', function ($ocLazyLoad) {
				return $ocLazyLoad.load([
					'apps/workflow/formTemplates/dwReminderNotice.js'
				]);
			}]
		}
	}).state('coreHome.processMonitor', {
		url: "/processMonitor",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/sysMng/processMonitorMng/processMonitorMng.html?ts=" + timestamp,
				controller: "processMonitorMngCtrl",
				cache: true
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					'css/formEditNew/layout.css',
					'css/formEditNew/reset.css',
					'css/datepicker3.css',
					'js/bootstrap-datepicker.js',
					"services/NodeTreeTool.js?ts=" + timestamp,
					"apps/sysMng/processMonitorMng/processMonitorMng.js?ts=" + timestamp
				]);
			}]
		}
	}).state('coreHome.categoryMaintenance', {
        url: "/categoryMaintenance/:parameterName",
        views: {
            'rightContent@coreHome': {
                templateUrl: ENV.templateLocate + "/apps/officeSupplies/categoryMaintenance/categoryMaintenance.html?ts=" + timestamp,
                controller: "categoryMaintenanceCtrl",
                cache: true
            }
        },
        resolve: {
            loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    "apps/officeSupplies/categoryMaintenance/categoryMaintenanceCtl.js?ts=" + timestamp
                ]);
            }]
        }
    }).state('coreHome.jinKouZhengManager', {//进口证管理
        url: "/jinKouZhengManager",
        views: {
            'rightContent@coreHome': {
                templateUrl: ENV.templateLocate + "/apps/cms/firstPageMng/jinKouZhengManager/jinKouZhengManager.html?ts=" + timestamp,
                controller: "jinKouZhengManagerCtl",
            }
        },
        resolve: {
            loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
                return $ocLazyLoad.load([
                    "apps/cms/firstPageMng/jinKouZhengManager/jinKouZhengManager.js?ts=" + timestamp,
                    "js/angularjs-ui-tree/angular-ui-tree.min.js?ts=" + timestamp,
                    "js/angularjs-ui-tree/angular-ui-tree.min.css?ts=" + timestamp,
                    "services/NodeTreeTool.js?ts=" + timestamp,
                ]);
            }]
        },
    }).state('coreHome.chuKouZhengManager', {//进口证管理
        url: "/chuKouZhengManager",
        views: {
            'rightContent@coreHome': {
                templateUrl: ENV.templateLocate + "/apps/cms/firstPageMng/chuKouZhengManager/chuKouZhengManager.html?ts=" + timestamp,
                controller: "chuKouZhengManagerCtl",
            }
        },
        resolve: {
            loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
                return $ocLazyLoad.load([
                    "apps/cms/firstPageMng/chuKouZhengManager/chuKouZhengManager.js?ts=" + timestamp,
                    "js/angularjs-ui-tree/angular-ui-tree.min.js?ts=" + timestamp,
                    "js/angularjs-ui-tree/angular-ui-tree.min.css?ts=" + timestamp,
                    "services/NodeTreeTool.js?ts=" + timestamp,
                ]);
            }]
        },
    }).state('coreHome.numberCerManager', {//进口证管理
		url: "/numberCerManager",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/cms/firstPageMng/numberCerManager/numberCerManager.html?ts=" + timestamp,
				controller: "numberCerManagerCtl",
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					"apps/cms/firstPageMng/numberCerManager/numberCerManager.js?ts=" + timestamp,
					"js/angularjs-ui-tree/angular-ui-tree.min.js?ts=" + timestamp,
					"js/angularjs-ui-tree/angular-ui-tree.min.css?ts=" + timestamp,
					"services/NodeTreeTool.js?ts=" + timestamp,
				]);
			}]
		},
	}).state('coreHome.businessSecretsUser', {//进口证管理
		url: "/businessSecretsUser",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/cms/firstPageMng/businessSecretsUser/businessSecretsUser.html?ts=" + timestamp,
				controller: "businessSecretsUserCtl",
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					"apps/cms/firstPageMng/businessSecretsUser/businessSecretsUser.js?ts=" + timestamp,
					"js/angularjs-ui-tree/angular-ui-tree.min.js?ts=" + timestamp,
					"js/angularjs-ui-tree/angular-ui-tree.min.css?ts=" + timestamp,
					"services/NodeTreeTool.js?ts=" + timestamp,
				]);
			}]
		},
	}).state('coreHome.businessSecretsProduct', {//进口证管理
		url: "/businessSecretsProduct",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/cms/firstPageMng/businessSecretsProduct/businessSecretsProduct.html?ts=" + timestamp,
				controller: "businessSecretsProductCtl",
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					"apps/cms/firstPageMng/businessSecretsProduct/businessSecretsProduct.js?ts=" + timestamp,
					"js/angularjs-ui-tree/angular-ui-tree.min.js?ts=" + timestamp,
					"js/angularjs-ui-tree/angular-ui-tree.min.css?ts=" + timestamp,
					"services/NodeTreeTool.js?ts=" + timestamp,
				]);
			}]
		},
	}).state('coreHome.businessSecretsSale', {//进口证管理
		url: "/businessSecretsSale",
		views: {
			'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/cms/firstPageMng/businessSecretsSale/businessSecretsSale.html?ts=" + timestamp,
				controller: "businessSecretsSaleCtl",
			}
		},
		resolve: {
			loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
				return $ocLazyLoad.load([
					"apps/cms/firstPageMng/businessSecretsSale/businessSecretsSale.js?ts=" + timestamp,
					"js/angularjs-ui-tree/angular-ui-tree.min.js?ts=" + timestamp,
					"js/angularjs-ui-tree/angular-ui-tree.min.css?ts=" + timestamp,
					"services/NodeTreeTool.js?ts=" + timestamp,
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
	errorMessages['BadInternet'] = '请输入正确的网址';

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
        var cal = newDate.getFullYear()+"年"+(newDate.getMonth() + 1 )+ "月" + newDate.getDate()+"日";
        return cal.trim();
    }
});
myApp.filter("highlight", function($sce){
	return function(text, search){
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

myApp.directive("dyCompile", ["$compile", function($compile) {
    return {
      replace: true,
      restrict: 'EA',
      link: function(scope, elm, iAttrs) {
        var DUMMY_SCOPE = {
            $destroy: angular.noop
          },
          root = elm,
          childScope,
          destroyChildScope = function() {
            (childScope || DUMMY_SCOPE).$destroy();
          };
        iAttrs.$observe("html", function(html) {
          if (html) {
            destroyChildScope();
            childScope = scope.$new(false);
            var content = $compile(html)(childScope);
            root.replaceWith(content);
            root = content;
          }
          scope.$on("$destroy", destroyChildScope);
        });
      }
    };
  }])

