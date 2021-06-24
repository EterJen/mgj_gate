myApp.config
(
		function($stateProvider,ENV)
		{
			$stateProvider.state
			(
					'coreHome.groupManageDebug', 
					{
        				url: "/groupManageDebug",
        				views:
        				{
        					'rightContent@coreHome':
        					{	
        						templateUrl: ENV.templateLocate + "/apps/groupManage/debug.html?ts=" + timestamp,
        						controller: "groupManageDebugControl",
        						cache: false,
        					}
        				}
					}
			);
		}
); 


myApp.controller
(
		'groupManageDebugControl', 
		[
		 	'$scope',
		 	'ENV',
		 	'$state',
		 	'Storage',
		 	'dataFactory',
		 	function($scope, ENV,$state,Storage,dataFactory) 
		 	{
		 		console.log("groupManageDebug controller");

		 	}
		]
);