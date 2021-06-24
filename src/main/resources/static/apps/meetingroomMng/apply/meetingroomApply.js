myApp.controller('meetingroomApplyCtrl', ['$rootScope','$scope', 'ENV', '$state', 'dataFactory', 'NodeTreeTool', 'SysUtils', function ($rootScope, $scope, ENV, $state, dataFactory, NodeTreeTool, SysUtils) {

	console.log("meetingroomApplyCtrl");

	/*************************一、变量定义****************************/
	$scope.proInst = {};
	$scope.queryBean = {paging: 'Yes',flag: "1"};
	$scope.meetingroomList = [];
	$scope.meetingApplyList = [];
	$scope.meetingApplysRoot = {};
	$scope.selectedMeetingApplies = [];
	$scope.deleteMeetingApplies = [];
	$scope.formDefId = 'jxwhuiyi';
	$scope.currTab = 'APPLYING';
	$rootScope.reNewBtn = "directQuery";
	$scope.op = '';
	var childWindowMap = {};
	$scope.tabList = [
		{id: 'APPLYING', val: '申请中'},
		{id: 'FINISHED', val: '已申请'},
		{id: 'CANCELED', val: '已取消'}
	];

	$scope.paginationConf = {
		currentPage   : 1,
		totalItems    : -1,
		itemsPerPage  : 10,
		pagesLength   : 13,
		perPageOptions: [10, 20, 30, 40, 50]
	};


	/*************************二、函数定义****************************/
	$scope.queryMeetingApplyList = function (modal) {
		console.log("查询会议申请");
		$scope.queryBean.meetingStatus = $scope.currTab;
		if ('all' == $scope.op) {
			$scope.queryBean.dbParams = {op: 'all'};
		}
		SysUtils.requestByJson("/formJxwhuiyi/list", $scope.queryBean, function (resultInfo) {
			SysUtils.handleResult(resultInfo, {'state': $state}, function () {
				$scope.meetingApplyList = resultInfo.beanList;
				$scope.paginationConf.totalItems = resultInfo.totalRows;
				$scope.op = '';
				if (!SysUtils.isEmpty(modal))
					$('#' + modal).modal('hide');
				$scope.reset();
				$scope.$apply();
			})
		});
	};

	$scope.choseCandate = function (tab) {
		$scope.currTab = tab;
		$scope.op = '';
		$scope.initParamsAndQuery();
	};

	$scope.gotoDetail = function (meeting) {
		$rootScope.reNewBtn = "directQuery";
		var formDefId = meeting.processInstance.formDefId;
		var _window;
		if (!SysUtils.isEmpty(childWindowMap[meeting.id])) {
			childWindowMap[meeting.id].close();
		}
		if (meeting.meetingStatus === "APPLYING") {
			_window = window.open(ENV.localapi + "/index.html#!/officialDocuments/" + formDefId + "/" + meeting.currentTaskId);
		} else {
			_window = window.open(ENV.localapi + "/index.html#!/officialDocuments/" + formDefId + "/-" + meeting.processInstance.id);
		}
		childWindowMap[meeting.id] = _window;
	};



	$scope.initParamsAndQuery = function () {
		$scope.queryBean = {paging: 'Yes', flag: "1"};//初始化查询参数
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

	$scope.openMeetingApplyForm = function () {
		SysUtils.silenceWithAuthAjax('/formJxwhuiyi/initTaskAndProInstance', $scope.proInst, function (resultInfo) {
			$rootScope.reNewBtn = "directQuery";
			window.open(ENV.localapi + "/index.html#!/officialDocuments/" + resultInfo.additionalInfo.formDefId + "/" + resultInfo.additionalInfo.currentTuskId, resultInfo.additionalInfo.currentTuskId);
			// $scope.queryMeetingApplyList();
		})
	};

	$scope.openMeetingApplyDialog = function (modal) {
		SysUtils.requestByJson('/formJxwhuiyi/initQuery', {}, function (resultInfo) {
			SysUtils.handleResult(resultInfo, {'state': $state}, function () {
				$scope.meetingroomList = resultInfo.beanList;
				$scope.queryBean = resultInfo.bean;
				$scope.$apply();
				$("#" + modal).modal('show');
			})
		})
	};

	$scope.pageAuto = function () {
		$scope.queryBean.totalRows = $scope.paginationConf.totalItems;
		$scope.queryBean.pageNo = $scope.paginationConf.currentPage;
		$scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
		$scope.queryMeetingApplyList();
	};

	$scope.delete = function (meetingApply) {
		SysUtils.swalConfirm('提示', '确定删除该会议申请信息吗?', 'info', function (isConfirm) {
			if (isConfirm) {
				$scope.queryBean = SysUtils.deepCopy(meetingApply);
				$scope.deleteMeetingApplies.push($scope.queryBean)
				SysUtils.requestByJson('/formJxwhuiyi/batchDelete', $scope.deleteMeetingApplies, function (resultInfo) {
					SysUtils.handleResult(resultInfo, {'state': $state}, function () {
						$scope.reset();
						$scope.initParamsAndQuery();
					})
				});
			}
		});

	};

	$scope.batchDelete = function () {
		if ($scope.selectedMeetingApplies.length == 0) {
			SysUtils.swalOnlyConfirm('提示', '请勾选要删除的会议申请信息！', 'info', function () {
			});
			return;
		}
		$scope.deleteMeetingApplies = SysUtils.deepCopy($scope.selectedMeetingApplies);
		SysUtils.swalConfirm('提示', '确定删除勾选的会议申请信息吗?', 'info', function (isConfirm) {
			if (isConfirm) {
				SysUtils.requestByJson('/formJxwhuiyi/batchDelete', $scope.deleteMeetingApplies, function (resultInfo) {
					SysUtils.handleResult(resultInfo, {'state': $state}, function () {
						$scope.reset();
						$scope.initParamsAndQuery();
					});
				});
			} else {
				angular.element("#chkAll").click();
				$scope.reset();

			}
		});
	};

	$scope.cancelMeeting = function (meeting) {
		if (meeting.meetingApplyPersonId != $rootScope.currentUser.id) {
			SysUtils.swalForTips('提示', '无法取消会议申请，应由申请人取消！', 'info', function () {
			});
			return;
		}
		$scope.queryBean = SysUtils.deepCopy(meeting);
		SysUtils.swalConfirm('提示', '确定取消该会议申请吗?', 'info', function (isConfirm) {
			if (isConfirm) {
				SysUtils.requestByJson('/formJxwhuiyi/cancelMeeting', $scope.queryBean, function (resultInfo) {
					SysUtils.handleResult(resultInfo, {'state': $state}, function () {
						$scope.choseCandate($scope.currTab);
					});
				});
			}
		});
	};

	$scope.queryAllMeetingApply = function (op) {
		$scope.op = op;
		$scope.initParamsAndQuery();
	};

	$scope.queryMeetingListChangeBean = function (modal) {
		$scope.initPaging();
		$scope.queryBean.totalRows = $scope.paginationConf.totalItems;
		$scope.queryBean.pageNo = $scope.paginationConf.currentPage;
		$scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
		$scope.queryBean.dbParams = {op: 'query'};
		$scope.queryMeetingApplyList(modal);
	};

	$scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.pageAuto);

	$scope.nodeTrClick = function (parentNode, selfNode, siblingNodes, sonNodes, event) {
		NodeTreeTool.relatedCheck(parentNode, selfNode, siblingNodes, sonNodes);
		/*根据需要统计选中结果*/
		$scope.selectedMeetingApplies = NodeTreeTool.checkedCount(parentNode, selfNode, siblingNodes, sonNodes, $scope.selectedMeetingApplies);
		$scope.selectedMeetingApplies = $scope.selectedMeetingApplies.filter(function (item) {
			return SysUtils.nonEmptyCheck(item.id);
		});
		console.log($scope.selectedMeetingApplies);
	};

	$('#meetingApplyModal').on('shown.bs.modal', function () {
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


	$scope.reset = function () {
		$scope.meetingApplysRoot.checked = false;
		$scope.selectedMeetingApplies = [];
		$scope.deleteMeetingApplies = [];
	};



}]);

