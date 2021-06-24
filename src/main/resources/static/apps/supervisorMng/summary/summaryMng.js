myApp.controller('summaryMngCtrl', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils', 'maxHeigtTool', 'NodeTreeTool', function ($rootScope, $scope, ENV, $state, SysUtils, maxHeigtTool, NodeTreeTool) {

	console.log('督查汇总');
	$rootScope.addBgground = true;
	$scope.queryBean = {paging: 'Yes', groupId: 'duwen'};
	$scope.proInstList = [];
	$scope.printProInstList = [];
	var childWindowMap = {};//存储已经打开的窗口
	$scope.proInst = {};
	$rootScope.reNewBtn = "directQuery";
	$scope.pointSupervises = [
		{key: '', val: '全部'},
		{key: 'true', val: '重要'}
	];

	$scope.formDefIds = [
		{key: '', val: '全部'},
		{key: 'jxwduwen', val: '长城电子督'}
	];

	$scope.isFinishedList = [
		{key: '', val: '全部'},
		{key: 'Active', val: '未完成'},
		{key: 'Finished', val: '已完成'}
	];

	$scope.paginationConf = {
		currentPage: 1,
		totalItems: -1,
		itemsPerPage: 10,
		pagesLength: 13,
		perPageOptions: [10, 20, 30, 40, 50]
	};

	$scope.paginationPrintConf = {
		currentPage: 1,
		totalItems: -1,
		itemsPerPage: 5,
		pagesLength: 13,
		perPageOptions: [10, 20, 30, 40, 50],
	};

	$scope.initPaging = function () {
		$scope.paginationConf.currentPage = 1;
		$scope.paginationConf.totalItems = -1;
		$scope.paginationConf.itemsPerPage = 10;

		$scope.$applyAsync();
	};

	$scope.initPrintPaging = function () {
		$scope.paginationPrintConf.currentPage = 1;
		$scope.paginationPrintConf.totalItems = -1;
		$scope.paginationPrintConf.itemsPerPage = 5;
		$scope.$applyAsync();
	};

	$scope.gotoDetail = function (proInst) {
		var formDefId = proInst.formDefId;
		if (!SysUtils.isEmpty(childWindowMap[proInst.id])) {
			childWindowMap[proInst.id].close();
		}
		var _window = (ENV.localapi + "/index.html#!/officialDocuments/" + formDefId + "/-" + proInst.id);
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
		console.log($scope.queryBean);
		SysUtils.requestByJson("/rProcessInstance/duwenSummaryList", $scope.queryBean, function (resultInfo) {
			SysUtils.handleResult(resultInfo, {'state': $state}, function () {
				console.log(resultInfo);
				$scope.proInstList = resultInfo.beanList;
				$scope.isFinished = resultInfo.bean.isFinished;
				$scope.paginationConf.totalItems = resultInfo.totalRows;
				$scope.paginationConf.currentPage = resultInfo.bean.pageNo;
				if (!SysUtils.isEmpty(modal)) {
					$('#' + modal).modal('hide');
				}
				$scope.$apply();
			})
		});
	};

	$scope.queryPrintProInstList = function (modal) {
		SysUtils.requestByJson("/rProcessInstance/duwenSummaryList", $scope.queryBean, function (resultInfo) {
			SysUtils.handleResult(resultInfo, {'state': $state}, function () {
				console.log(resultInfo);
				$scope.printProInstList = resultInfo.beanList;
				$scope.paginationPrintConf.totalItems = resultInfo.totalRows;
				$scope.paginationPrintConf.currentPage = resultInfo.bean.pageNo;
				$scope.$apply();
				if (!SysUtils.isEmpty(modal)) {
					$("#" + modal).modal('show');
				}
			});
		});
	};

	$scope.initParams = function () {
		$scope.queryBean = {paging: 'Yes', groupId: 'duwen'};
		$scope.$applyAsync();
		$scope.initPaging();
	};

	$scope.initParamsAndQuery = function () {
		$scope.queryBean = {paging: 'Yes', groupId: 'duwen'};//初始化查询参数
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

	$scope.printPageAuto = function (modal) {
		if ("printModal" === modal) {
			$scope.initPrintPaging();
			$scope.queryBean.dbParams = {op: 'print'};
		}
		$scope.queryBean.paging = 'Yes';
		$scope.queryBean.totalRows = $scope.paginationPrintConf.totalItems;
		$scope.queryBean.pageNo = $scope.paginationPrintConf.currentPage;
		$scope.queryBean.pageSize = $scope.paginationPrintConf.itemsPerPage;
		$scope.queryPrintProInstList(modal);
	};

	$scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.pageAuto);
	$scope.$watch('paginationPrintConf.currentPage + paginationPrintConf.itemsPerPage', $scope.printPageAuto);

	$scope.openQueryModal = function (modal) {
		$scope.queryBean.paging = "Yes";
		$scope.queryBean.pageNo = 1;
		$scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
		$scope.queryBean.pointSupervise = $scope.pointSupervises[0].key;
		$scope.queryBean.isFinished = $scope.isFinishedList[0].key;
		$('#' + modal).modal('show');
	};

	/**
	 * 督文导出、监督
	 * @param op 导出(export)、监督(supervise)
	 */
	$scope.export = function (op) {
		$scope.queryBean.dbParams = {op: op};
		var url = ENV.localapi + "/rProcessInstance/duwenExport";
		var value = JSON.stringify($scope.queryBean);
		var form = $("<form>");   //定义一个form表单
		form.attr('style', 'display:none');   //在form表单中添加查询参数
		form.attr('target', '');
		form.attr('method', 'post');
		form.attr('action', url);
		var input1 = $('<input>');
		input1.attr('type', 'hidden');
		input1.attr('name', 'selectedBean');
		input1.attr('value', value);
		$('body').append(form);  //将表单放置在web中
		form.append(input1);   //将查询参数控件提交到表单上
		form.submit();
	};

	$scope.print = function () {
		SysUtils.swalConfirm('提示', '要打印吗？', 'info', function (isConfirm) {
			if (isConfirm) {
				$("#printModal").printArea();
			} else {
				swal.close();
			}
		});
	};

	/*************************三、初始化调用****************************/
	/*计算布局高度*/
	$scope.calculatedHeight = function () {
		$('.content-wrapper').css('height', SysUtils.get_content_wrapper());
		$('#panel-body-table').css('height', $('.content').height() - $('#panel-heading').outerHeight(true) - $('#bmxx_tit').height());
		$('.table_shadow').css('max-height', $('.content').height() - $('#panel-heading').outerHeight(true) - $('#ceter_p').outerHeight() - $('#bmxx_tit').height() - $('#panel-heading').outerHeight(true)/2);
	};

	setTimeout(function () {
		$scope.calculatedHeight();
	}, 500);

}]);
