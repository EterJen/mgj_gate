myApp.controller('meetingroomApplyCtrl', ['$rootScope','$scope', 'ENV', '$state', 'dataFactory', 'NodeTreeTool', 'SysUtils', function ($rootScope, $scope, ENV, $state, dataFactory, NodeTreeTool, SysUtils) {

	console.log("meetingroomApplyCtrl");

	/*************************一、变量定义****************************/
	$rootScope.indexNoMagin = true;

	$scope.proInst = {};
	$scope.params = {paging: 'Yes',flag: '1', tab: ''};
	$scope.meetingroomList = [];
	$scope.jxwhuiyiList = [];
	$scope.meetingList = [];
	$scope.formTempPath = "apps/restful/viewmeeting/";
	$scope.currGroupId = 'jxwhuiyi,meeting';
	var childWindowMap = {};
	$scope.tabList = [
		{id: 'jxwhuiyi', val: '委内会议'},
		{id: 'meeting', val: '外出会议'}
	];

	$scope.paginationConf = {
		currentPage   : 1,
		totalItems    : -1,
		itemsPerPage  : 10,
		pagesLength   : 13,
		perPageOptions: [10, 20, 30, 40, 50]
	};

	/*************************二、函数定义****************************/
	$scope.queryList = function (modal) {
		$scope.params.tab = $scope.currGroupId;
		SysUtils.requestByJson("/restmeeting/query", $scope.params, function (resultInfo) {
			SysUtils.handleResult(resultInfo, {'state': $state}, function () {
				$scope.jxwhuiyiList = resultInfo.additionalInfo.huiyi;
				$scope.meetingList = resultInfo.additionalInfo.meeting;
				$scope.currGroupId = resultInfo.additionalInfo.tab;
				$scope.paginationConf.totalItems = resultInfo.additionalInfo.totalRows;
				$scope.paginationConf.currentPage = resultInfo.additionalInfo.pageNo;
				if (!SysUtils.isEmpty(modal))
					$('#' + modal).modal('hide');
				$scope.setFormPath();
				$scope.$apply();
			})
		});
	};

	$scope.choseCandate = function (tab) {
		$scope.currGroupId = tab;
		$scope.initParamsAndQuery();
	};

	$scope.gotoDetail = function (meeting) {
		var formDefId = meeting.processInstance.formDefId;
		var _window;
		if (!SysUtils.isEmpty(childWindowMap[meeting.id])) {
			childWindowMap[meeting.id].close();
		}
		_window = window.open(ENV.localapi + "/index.html#!/officialDocuments/" + formDefId + "/-" + meeting.processInstance.id);
		childWindowMap[meeting.id] = _window;
	};

	$scope.initParamsAndQuery = function () {
		$scope.params = {paging: 'Yes', flag: '1', tab: ''};//初始化查询参数
		$scope.$applyAsync();
		$scope.initPaging();
		$scope.pageAuto();

	};

	$scope.initPaging = function () {
		$scope.paginationConf.currentPage = 1;
		$scope.paginationConf.totalItems = -1;
		$scope.paginationConf.itemsPerPage = 10;

		$scope.$applyAsync();
	};

	$scope.setFormPath = function () {
		$scope.formPath = $scope.formTempPath + $scope.currGroupId + ".html";
	};

	$scope.pageAuto = function () {
		$scope.params.totalRows = $scope.paginationConf.totalItems;
		$scope.params.pageNo = $scope.paginationConf.currentPage;
		$scope.params.pageSize = $scope.paginationConf.itemsPerPage;
		$scope.queryList();
	};

	$scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.pageAuto);


	/*$('#meetingApplyModal').on('shown.bs.modal', function () {
		$('#meetingStartTime').datepicker({
			format: 'yyyy-mm-dd',
			autoclose : true,
			clearBtn: true
		}).on('show',function(e){
			if ($('#meetingEndTime').val() == '') {
				$('#meetingStartTime').datepicker('setEndDate', null);
			}
		}).on('changeDate',function(e){
			if (e.date) {
				$('#meetingEndTime').datepicker('setStartDate', new Date(e.date.valueOf()));
			} else {
				$('#meetingEndTime').datepicker('setStartDate', null);
			}
		});
		$('#meetingEndTime').datepicker({
			format: 'yyyy-mm-dd',
			autoclose : true,
			clearBtn: true
		}).on('show',function(e){
			if ($('#meetingStartTime').val() == '') {
				$('#meetingEndTime').datepicker('setStartDate', null);
			}
		}).on('changeDate',function(e){
			if (e.date) {
				$('#meetingStartTime').datepicker('setEndDate', new Date(e.date.valueOf()));
			} else {
				$('#meetingStartTime').datepicker('setEndDate', null);
			}
		});
	});*/




}]);

