myApp.controller('partyDuesQueryMngCtrl', ['$sce', '$rootScope', '$scope', 'ENV', '$state', 'SysUtils', 'maxHeigtTool', 'NodeTreeTool', function ($sce, $rootScope, $scope, ENV, $state, SysUtils, maxHeigtTool, NodeTreeTool) {

	console.log('党费查询');
	$rootScope.addBgground = true;
	var childWindowMap = {};//存储已经打开的窗口
	$rootScope.reNewBtn = "duwenzb";
	$scope.partyDuesQueryUrl = '';

	$scope.paginationConf = {
		currentPage: 1,
		totalItems: -1,
		itemsPerPage: 10,
		pagesLength: 13,
		perPageOptions: [10, 20, 30, 40, 50]
	};

	$scope.init = function () {
		SysUtils.requestByJsonSync('/restful/partydues', {}, function (resultInfo) {
			$scope.partyDuesQueryUrl = $sce.trustAsResourceUrl(resultInfo.bean);
			$scope.$applyAsync();
		});
		$("#partyDuesQueryModal").modal('show');
	};

	$scope.initPaging = function () {
		$scope.paginationConf.currentPage = 1;
		$scope.paginationConf.totalItems = -1;
		$scope.paginationConf.itemsPerPage = 10;

		$scope.$applyAsync();
	};

	$scope.gotoDetail = function (proInst) {
		var formDefId = proInst.formDefId;
		if (!SysUtils.isEmpty(childWindowMap[proInst.id])) {
			childWindowMap[proInst.id].close();
		}
		var url = "";
		if ("Active" == $scope.isFinished) {
			url = ENV.localapi + "/index.html#!/officialDocuments/" + formDefId + "/" + proInst.taskId;
		} else {
			url = ENV.localapi + "/index.html#!/officialDocuments/" + formDefId + "/-" + proInst.id;
		}
		var _window = window.open(url);
		childWindowMap[proInst.id] = _window;
	};

	/*************************三、初始化调用****************************/

	$scope.init();

	/*计算布局高度*/
	$scope.calculatedHeight = function () {
		$('.content-wrapper').css('height', SysUtils.get_content_wrapper());
		$('#panel-body-table').css('height', $('.content').height() - $('#panel-heading').outerHeight(true) - $('#bmxx_tit').height());
		$('.table_shadow').css('max-height', $('.content').height() - $('#panel-heading').outerHeight(true) - $('#ceter_p').outerHeight() - $('#bmxx_tit').height());
	};

	setTimeout(function () {
		$scope.calculatedHeight();
	}, 500);

}]);
