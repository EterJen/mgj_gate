myApp.controller('meetingroomQueryCtrl', ['$scope', 'ENV', '$state', 'dataFactory', 'NodeTreeTool', 'SysUtils', function ($scope, ENV, $state, dataFactory, NodeTreeTool, SysUtils) {

	console.log("meetingroomQueryCtrl");

	/*************************一、变量定义****************************/
	$scope.queryBean = {paging: 'Yes',flag: "1",meetingDateQuery: new Date()};
	$scope.meetingroomList = [];
	$scope.meetingQueryList = [];
	$scope.meetingDateQueryStr = '';
	$scope.meetingDateQueryPre = '';
	$scope.meetingDateQueryNext = '';
	$scope.meetingDateQuery = '';
	var childWindowMap = {};//存储已经打开的窗口

	$scope.paginationConf = {
		currentPage   : 1,
		totalItems    : -1,
		itemsPerPage  : 10,
		pagesLength   : 13,
		perPageOptions: [10, 20, 30, 40, 50]
	};


	/*************************二、函数定义****************************/
	$scope.queryMeetingList = function (modal) {
		console.log("会议查询");
		SysUtils.requestByJson("/formJxwhuiyi/queryHuiyiList", $scope.queryBean, function (resultInfo) {
			SysUtils.handleResult(resultInfo, {'state': $state}, function () {
				$scope.meetingQueryList = resultInfo.beanList;
				$scope.meetingDateQuery = resultInfo.bean.meetingDateQuery;
				$scope.meetingDateQueryStr = resultInfo.bean.meetingDateQueryStr;
				$scope.meetingDateQueryPre = resultInfo.bean.meetingDateQueryPre;
				$scope.meetingDateQueryNext = resultInfo.bean.meetingDateQueryNext;
				$scope.paginationConf.totalItems = resultInfo.totalRows;
				if (!SysUtils.isEmpty(modal))
					$('#' + modal).modal('hide');
				$scope.$apply();
			})
		})
	};

	$scope.gotoDetail = function (meeting) {
		var formDefId = meeting.processInstance.formDefId;
		var _window;
		if (!SysUtils.isEmpty(childWindowMap[meeting.id])) {
			childWindowMap[meeting.id].close();
		}
		if ($scope.orgNavType === "IndividualToDone") {
			_window = window.open(ENV.localapi + "/index.html#!/officialDocuments/" + formDefId + "/" + meeting.proInstId);
		} else {
			_window = window.open(ENV.localapi + "/index.html#!/officialDocuments/" + formDefId + "/-" + meeting.proInstId);
		}
		childWindowMap[meeting.id] = _window;
	}

	$scope.initParamsAndQuery = function () {
		$scope.queryBean = {paging: 'Yes'};//初始化查询参数
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

	$scope.openMeetingQueryDialog = function (modal) {
		SysUtils.requestByJson('/formJxwhuiyi/initQuery', {}, function (resultInfo) {
			SysUtils.handleResult(resultInfo, {'state': $state}, function () {
				$scope.meetingroomList = resultInfo.beanList;
				$scope.queryBean = resultInfo.bean;
				$scope.$apply();
				$("#" + modal).modal('show');
			});
		});
	};


	$scope.pageAuto = function () {
		$scope.queryBean.totalRows = $scope.paginationConf.totalItems;
		$scope.queryBean.pageNo = $scope.paginationConf.currentPage;
		$scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
		$scope.queryMeetingList();
	};

	$scope.queryMeetingListChangeBean = function (modal) {
		$scope.initPaging();
		$scope.queryBean.totalRows = $scope.paginationConf.totalItems;
		$scope.queryBean.pageNo = $scope.paginationConf.currentPage;
		$scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
		$scope.queryBean.meetingDateQuery = $scope.meetingDateQuery;
		$scope.queryBean.dbParams = {op: 'query'};
		$scope.queryMeetingList(modal);
	};

	$scope.init = function () {
		$scope.queryBean = {paging: 'Yes', flag: '1'};
		$scope.initPaging();
		$scope.queryBean.totalRows = $scope.paginationConf.totalItems;
		$scope.queryBean.pageNo = $scope.paginationConf.currentPage;
		$scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
	};

	$scope.queryPreWeekMeeting = function () {
		$scope.init();
		$scope.queryBean.meetingDateQuery = $scope.meetingDateQueryPre;
		$scope.queryMeetingList();
	};

	$scope.queryNextWeekMeeting = function () {
		$scope.init();
		$scope.queryBean.meetingDateQuery = $scope.meetingDateQueryNext;
		$scope.queryMeetingList();
	};

	$scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.pageAuto);

	$('#meetingQueryModal').on('shown.bs.modal', function () {
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
	});

}]);

