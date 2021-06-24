myApp.controller('meetingroomManageCtrl', ['$scope', 'ENV', '$state', 'dataFactory', 'NodeTreeTool', 'SysUtils', function ($scope, ENV, $state, dataFactory, NodeTreeTool, SysUtils) {

	console.log("meetingroomMnageCtrl");
	/*************************一、变量定义****************************/
	$scope.queryBean = {paging: 'Yes', flag: '1'};
	$scope.meetingroomList = [];
	$scope.allMeetingroomsRoot = {};
	$scope.selectedMeetingrooms = [];
	$scope.title = '新增会议室信息';
	$scope.meetingroomCapacityTypes = [
		{label: '>=', val: 'gte'},
		{label: '>', val: 'gt'},
		{label: '<=', val: 'lte'},
		{label: '<', val: 'lt'},
		{label: '=', val: 'eq'}
	];

	$scope.paginationConf = {
		currentPage   : 1,
		totalItems    : -1,
		itemsPerPage  : 10,
		pagesLength   : 13,
		perPageOptions: [10, 20, 30, 40, 50]
	};

	/*************************二、函数定义****************************/
	$scope.queryMeetingroomList = function (modal) {
		console.log("查询会议室信息列表");
		SysUtils.requestByJson("/meetingroomInfo/list", $scope.queryBean, function (resultInfo) {
			SysUtils.handleResult(resultInfo, {'state': $state}, function () {
				$scope.meetingroomList = resultInfo.beanList;
				$scope.paginationConf.totalItems = resultInfo.totalRows;
				if (!SysUtils.isEmpty(modal)) {
					$("#" + modal).modal('hide');
				}
				$scope.$apply();
			})
		})
	};

	$scope.openMeetingroomDialog = function (modal) {
		var initType = '';
		if (modal.indexOf('create') >= 0) {
			initType = 'create';
		}
		if (modal.indexOf('query') >= 0) {
			initType = 'query';
		}
		SysUtils.requestByJson('/meetingroomInfo/init?initType=' + initType, {}, function (resultInfo) {
			SysUtils.handleResult(resultInfo, {'state': $state}, function () {
				console.log(resultInfo);
				$scope.queryBean = resultInfo.bean;
				if (!SysUtils.isEmpty(modal)) {
					$('#' + modal).modal('show');
				}
				$scope.$apply();
			})

		});
	};

	$scope.saveMeetingroom = function (modal) {
		var url = '';
		if ($scope.queryBean.id == null) {
			url = '/meetingroomInfo/create';
		} else {
			url = '/meetingroomInfo/update';
		}
		console.log($scope.queryBean);
		SysUtils.requestByJson(url, $scope.queryBean, function (resultInfo) {
			SysUtils.handleResult(resultInfo, {'state': $state}, function () {
				if (!SysUtils.isEmpty(modal)) {
					$("#" + modal).modal('hide');
				}
				$("#meetingroomForm")[0].reset();
				$scope.initParamsAndQuery();
			})
		})

	};

	$scope.initParamsAndQuery = function () {
		$scope.queryBean = {paging: 'Yes', flag: '1'};//初始化查询参数
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

	$scope.queryMeetingroom = function (modal) {
		$scope.initPaging();
		$scope.queryBean.pageNo = $scope.paginationConf.currentPage;
		$scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
		console.log($scope.queryBean);
		$scope.queryMeetingroomList(modal);
	};

	$scope.pageAuto = function () {
		$scope.queryBean.totalRows = $scope.paginationConf.totalItems;
		$scope.queryBean.pageNo = $scope.paginationConf.currentPage;
		$scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
		$scope.queryMeetingroomList();
	};


	$scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.pageAuto);

	$scope.edit = function (meetingroom) {
		$scope.title = '修改会议室信息';
		$scope.queryBean = SysUtils.deepCopy(meetingroom);
		$("#createMeetingroomDialog").modal('show');
	};

	$scope.delete = function (meetingroom) {
		SysUtils.swalConfirm('提示', '确定删除该会议室信息吗?', 'info', function (isConfirm) {
			if (isConfirm) {
				$scope.queryBean = SysUtils.deepCopy(meetingroom);
				$scope.queryBean.flag = '0';
				SysUtils.requestByJson('/meetingroomInfo/update', $scope.queryBean, function (resultInfo) {
					SysUtils.handleResult(resultInfo, {'state': $state}, function () {
						$scope.initParamsAndQuery();
					})
				});
			}
		});

	};

	$scope.batchDelete = function () {
		if ($scope.selectedMeetingrooms.length == 0) {
			SysUtils.swalOnlyConfirm('提示', '请勾选要删除的会议室信息！', 'info', function () {
			});
			return;
		}
		SysUtils.swalConfirm('提示', '确定删除勾选的会议室信息吗?', 'info', function (isConfirm) {
			if (isConfirm) {
				SysUtils.requestByJson('/meetingroomInfo/batchDelete', $scope.selectedMeetingrooms, function (resultInfo) {
					SysUtils.handleResult(resultInfo, {'state': $state}, function () {
						$scope.initParamsAndQuery();
					});
				});
			} else {
				angular.forEach($scope.selectedMeetingrooms, function (item) {
					angular.element("input#" + item.id).click();
				});
			}
		});
	};

	$scope.showDetail = function (meetingroom) {
		$("#meetingroomForm")[0].reset();
		$scope.title = '修改会议室信息';
		$scope.queryBean = SysUtils.deepCopy(meetingroom);
		$("#createMeetingroomDialog").modal('show');
	};

	$scope.nodeTrClick = function (parentNode, selfNode, siblingNodes, sonNodes, event) {
		NodeTreeTool.relatedCheck(parentNode, selfNode, siblingNodes, sonNodes);
		/*根据需要统计选中结果*/
		$scope.selectedMeetingrooms = NodeTreeTool.checkedCount(parentNode, selfNode, siblingNodes, sonNodes, $scope.selectedMeetingrooms);
		$scope.selectedMeetingrooms = $scope.selectedMeetingrooms.filter(function (value) {
			return SysUtils.nonEmptyCheck(value.id);
		})
	};

	/*************************三、初始化调用****************************/

}]);

