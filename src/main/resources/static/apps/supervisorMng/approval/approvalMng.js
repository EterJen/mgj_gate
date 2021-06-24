myApp.controller('approvalMngCtrl', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils', 'maxHeigtTool', 'NodeTreeTool', function ($rootScope, $scope, ENV, $state, SysUtils, maxHeigtTool, NodeTreeTool) {

	console.log('督查审批');
	$rootScope.addBgground = true;
	$scope.queryBean = {paging: 'Yes', readMode: 'task',belongingProInst: {}};
	$scope.proInstList = [];
	$scope.allProInstRoot = {};
	$scope.selectedProInsts = [];
	$scope.hasSWDLRole = false;
	var childWindowMap = {};//存储已经打开的窗口
	$scope.proInst = {};
	$rootScope.reNewBtn = "directQuery"
	$scope.isFinished = 'Active';
	$scope.pointSupervises = [
		{key: '', val: '全部'},
		{key: 'true', val: '重要'}
	];

	$scope.formDefIds = [
		{key: '', val: '全部'},
		{key: 'jxwduwen', val: '长城电子督'}
	];

	$scope.paginationConf = {
		currentPage: 1,
		totalItems: -1,
		itemsPerPage: 10,
		pagesLength: 13,
		perPageOptions: [10, 20, 30, 40, 50]
	};

	$scope.proinsCheckCurrent = function (v) {
		$scope.proInstList.forEach(function (value) {
			if (v.id == value.id) {
				value.checked = !value.checked;
				if (value.checked) {
					$scope.selectedProInsts = [];
					$scope.selectedProInsts.push(value);
				}
			} else {
				value.checked = false;
			}
		})
	};

	$scope.initPaging = function () {
		$scope.paginationConf.currentPage = 1;
		$scope.paginationConf.totalItems = -1;
		$scope.paginationConf.itemsPerPage = 10;

		$scope.$applyAsync();
	};

	$scope.gotoDetail = function (proInst) {
		var formDefId = proInst.belongingProInst.formDefId;
		if (!SysUtils.isEmpty(childWindowMap[proInst.id])) {
			childWindowMap[proInst.id].close();
		}
		var _window = window.open(ENV.localapi + "/index.html#!/officialDocuments/" + formDefId + "/" + proInst.id);
		childWindowMap[proInst.id] = _window;
	};

	/**
	 * 搜索框查询
	 * @param modal
	 */
	$scope.queryProInstListChangeBean = function (modal) {
		$scope.initPaging();
		$scope.queryBean.totalRows = $scope.paginationConf.totalItems;
		$scope.queryBean.pageNo = $scope.paginationConf.currentPage;
		$scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;

		$scope.queryProInstList(modal);
	};

	$scope.queryProInstList = function (modal) {
		$scope.selectedProInsts = [];
		SysUtils.requestByJson("/rCurrentTaskInfo/duwenApprovalList", $scope.queryBean, function (resultInfo) {
			SysUtils.handleResult(resultInfo, {'state': $state}, function () {
				console.log(resultInfo);
				$scope.proInstList = resultInfo.beanList;
				$scope.paginationConf.totalItems = resultInfo.totalRows;
				$scope.paginationConf.currentPage = resultInfo.bean.pageNo;
				if (!SysUtils.isEmpty(modal)) {
					$('#' + modal).modal('hide');
				}
				$scope.$apply();
			})
		});
	};

	$scope.initParams = function () {
		$scope.queryBean = {paging: 'Yes', readMode: 'task',belongingProInst: {}};
		$scope.$applyAsync();
		$scope.initPaging();
	};

	$scope.initParamsAndQuery = function () {
		$scope.queryBean = {paging: 'Yes', readMode: 'task',belongingProInst: {}};//初始化查询参数
		$scope.$applyAsync();
		$scope.initPaging();
		$scope.pageAuto();
	};

	$scope.pageAuto = function () {
		$scope.queryBean.totalRows = $scope.paginationConf.totalItems;
		$scope.queryBean.pageNo = $scope.paginationConf.currentPage;
		$scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
		$scope.queryProInstList();
	};

	$scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.pageAuto);

	$scope.openQueryModal = function (modal) {
		$scope.queryBean.paging = "Yes";
		$scope.queryBean.pageNo = 1;
		$scope.queryBean.belongingProInst = {};
		$scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
		$scope.queryBean.pointSupervise = $scope.pointSupervises[0].key;
		$scope.queryBean.formDefId = $scope.formDefIds[0].key;
		$('#' + modal).modal('show');
	};

	/**
	 * 在做、已做查询
	 * @param isFinished
	 */
	$scope.queryProInstListByCondition = function (isFinished) {
		$scope.isFinished = isFinished;
		if ("Finished" == isFinished) {
			$rootScope.reNewBtn = "directQuery";
		} else if ("Active" == isFinished) {
			$rootScope.reNewBtn = "directQuery"
		}
		$scope.initParams();
		$scope.queryBean.totalRows = $scope.paginationConf.totalItems;
		$scope.queryBean.pageNo = $scope.paginationConf.currentPage;
		$scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
		$scope.queryBean.isFinished = isFinished;
		console.log($scope.queryBean);
		//$scope.queryProInstList();
	};

	/**
	 * 督文审批
	 */
	$scope.audit = function () {

	};


	/*************************三、初始化调用****************************/
	/*计算布局高度*/
	$scope.calculatedHeight = function () {
		$('.content-wrapper').css('height', SysUtils.get_content_wrapper());
		$('#panel-body-table').css('height', $('.content').height() - $('#panel-heading').outerHeight(true) - $('#bmxx_tit').height());
		$('.table_shadow').css('max-height', $('.content').height() - $('#panel-heading').outerHeight(true) - $('#ceter_p').outerHeight() - $('#bmxx_tit').height());
	};

	setTimeout(function () {
		//console.log("第三次"+$('#bmxx_tit').innerHeight());
		$scope.calculatedHeight();
	}, 500);

}]);
