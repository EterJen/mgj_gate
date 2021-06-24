//综合查询
/*myApp.config(function ($stateProvider, ENV) {

	$stateProvider.state('coreHome.zongheQuery', {
        url: "/zongheQuery",
        views: {
            'rightContent@coreHome': {
                templateUrl: ENV.templateLocate + "/apps/workflow/query/zongheQuery.html?ts=" + timestamp,
                controller: "zongheQueryCtrl",
                cache: false,
            }
        },
        resolve: {
            loadFormEditResources: ['$ocLazyLoad','SysUtils', function ($ocLazyLoad,SysUtils) {
            	return $ocLazyLoad.load([
                    'css/datepicker3.css',
                    'css/daterangepicker.css',
                    'js/bootstrap-datepicker.js',
                    'js/daterangepicker.js',
                    'js/bootstrap-datepicker.zh-CN.js',
                    "apps/workflow/query/zongheQuery.js?ts=" + timestamp,
				]);
	        }]
        }
    });

	
/!*	$stateProvider.state('coreHome.doneList', {
        url: "/doneList",
        views: {
            'rightContent@coreHome': {
                templateUrl: ENV.templateLocate + "/apps/workflow/doneList.html?ts=" + timestamp,
                controller: "doneListCtrl",
                cache: false,
            }
        }
	 });*!/
	
	
/!*	$stateProvider.state('formEditGeneric', {
        url: "/formEditGeneric",
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
                	console.log("foxit.js");
                    return $ocLazyLoad.load([
                        'css/formEditNew/layout.css',
                        'css/formEditNew/reset.css',
                        'js/contextMenu/jquery.contextMenu.min.css',
                        'js/contextMenu/jquery.ui.position.min.js',
                        'js/contextMenu/jquery.contextMenu.min.js',
                        'js/foxit.ofd.ocx.new.js'
                    ]);
                } else {
                    //console.log("Foxit_npapi_new.js");
                    return $ocLazyLoad.load([
                        'css/formEditNew/layout.css',
                        'css/formEditNew/reset.css',
                        'js/contextMenu/jquery.contextMenu.min.css',
                        'js/contextMenu/jquery.ui.position.min.js',
                        'js/contextMenu/jquery.contextMenu.min.js',
                        'js/Foxit_npapi_new.js'
                    ]);
                }
            }]
        }
    })*!/;
	
	 $stateProvider.state('coreHome.responsiblePersonManage', {
	        url: "/responsiblePersonManage",
	        views: {
	            'rightContent@coreHome': {
	                templateUrl: ENV.templateLocate + "/apps/moduleAuthManage/responsiblePersonManage/responsiblePersonManage.html?ts=" + timestamp,
	                controller: "responsiblePersonManageCtrl",
	                cache: false,
	            }
	        },
	        resolve: {
	            loadFormEditResources: ['$ocLazyLoad','SysUtils', function ($ocLazyLoad,SysUtils) {
	            	return $ocLazyLoad.load([
					  "apps/moduleAuthManage/responsiblePersonManage/responsiblePersonManage.js?ts=" + timestamp,
					]);
		        }]
	        }
	    });

})*/;