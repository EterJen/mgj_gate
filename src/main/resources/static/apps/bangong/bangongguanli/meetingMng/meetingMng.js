myApp.controller('meetingMngCtrl', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils', 'maxHeigtTool', function ($rootScope, $scope, ENV, $state, SysUtils, maxHeigtTool) {

	console.log('会议管理');
	$rootScope.addBgground = true;
	$scope.proInst = {};
	$scope.queryBean = {paging: 'Yes', flag: '1', dbParams: {}};
	$scope.proInstList = [];
	$scope.currGroupId = 'dl';
	$scope.formPath = null;
	$scope.formTempPath = "apps/bangong/bangongguanli/meetingMng/";
	$scope.orgNavType = "dl";
	$scope.status = 'before';
	$rootScope.reNewBtn = "directQuery";
	var childWindowMap = {};//存储已经打开的窗口
	$scope.hasJYMSRole = false;

	$scope.docTypelist = [
		/*{id: 'tz', val: '会议通知'},*/
		{id: 'dl', val: '登录'}
	];

	$scope.paginationConf = {
		currentPage: 1,
		totalItems: -1,
		itemsPerPage: 10,
		pagesLength: 13,
		perPageOptions: [10, 20, 30, 40, 50]
	};

	$scope.createMeeting = function () {
		SysUtils.silenceWithAuthAjax('/formMeeting/initTaskAndProInstance', $scope.proInst, function (resultInfo) {
			$rootScope.reNewBtn = "directQuery";
			window.open(ENV.localapi + "/index.html#!/officialDocuments/" + resultInfo.additionalInfo.formDefId + "/" + resultInfo.additionalInfo.currentTuskId, resultInfo.additionalInfo.currentTuskId);
			//$scope.queryMeetingApplyList();
		})
	};

	$scope.initPaging = function () {
		$scope.paginationConf.currentPage = 1;
		$scope.paginationConf.totalItems = -1;
		$scope.paginationConf.itemsPerPage = 10;

		$scope.$applyAsync();
	};

	$scope.gotoDetail = function (task) {
		$rootScope.reNewBtn = "directQuery";
		var formDefId = task.processInstance.formDefId;
		if (!SysUtils.isEmpty(childWindowMap[task.id])) {
			childWindowMap[task.id].close();
		}
		var _window = window.open(ENV.localapi + "/index.html#!/officialDocuments/" + formDefId + "/-" + task.processInstance.id);
		childWindowMap[task.id] = _window;
	};

	$scope.setFormPath = function () {
		$scope.formPath = $scope.formTempPath + $scope.currGroupId + ".html";
	};

	$scope.queryProInstListByCondition = function (status) {
		$scope.status = status;
		$scope.initParamsAndQuery($scope.currGroupId);
	};

	$scope.queryProInstListChangeBean = function (modal) {
		$scope.initPaging();
		$scope.queryBean.totalRows = $scope.paginationConf.totalItems;
		$scope.queryBean.pageNo = $scope.paginationConf.currentPage;
		$scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;

		$scope.queryProInstList(modal);
	};

	$scope.queryProInstList = function (modal) {
		$scope.proInstList = [];
		$scope.queryBean.dbParams.status = $scope.status;
		SysUtils.requestByJson("/formMeeting/list", $scope.queryBean, function (resultInfo) {
			SysUtils.handleResult(resultInfo, {'state': $state}, function () {
				console.log(resultInfo);
				$scope.proInstList = resultInfo.beanList;
				$scope.paginationConf.totalItems = resultInfo.totalRows;
				$scope.paginationConf.currentPage = resultInfo.bean.pageNo;
				if (!SysUtils.isEmpty(modal)) {
					$('#' + modal).modal('hide');
				}
				$scope.$apply();
			});
		});
	};

	$scope.choseCandate = function (type) {
		$scope.status = 'before';
		$scope.orgNavType = type;
		$scope.$applyAsync();
		$scope.initParamsAndQuery(type);
	};

	$scope.initParamsAndQuery = function (groupId) {
		$scope.queryBean = {paging: 'Yes', flag: '1', dbParams: {}};//初始化查询参数
		$scope.currGroupId = groupId;
		$scope.setFormPath();
		$scope.$applyAsync();
		$scope.initPaging();
		$scope.pageAuto();
	};

	$scope.setFormPath();

	$scope.pageAuto = function () {
		$scope.queryBean.totalRows = $scope.paginationConf.totalItems;
		$scope.queryBean.pageNo = $scope.paginationConf.currentPage;
		$scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
		$scope.setCurrentNodeId($scope.orgNavType);
		$scope.queryProInstList();
	};

	$scope.setCurrentNodeId = function (orgNavType) {
		switch (orgNavType) {
			case 'tz':
				$scope.queryBean.currentNodeId = "2";
				break;
			case 'dl':
				$scope.queryBean.currentNodeId = '1';
				break;
		}
	};

	$scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.pageAuto);

	$scope.showDetail = function (detail) {
		$scope.queryBean = {dbParams: {}};
		$scope.queryBean.paging = "Yes";
		$scope.queryBean.pageNo = 1;
		$scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
		$('#' + detail).modal('show');
	};

	$scope.delete = function (task) {
		SysUtils.swalConfirm('提示', '确认删除选中的会议吗?', 'info', function (isConfirm) {
			if (isConfirm) {
				SysUtils.requestByJson('/formMeeting/deleteMeeting', task, function (resultInfo) {
					SysUtils.handleResult(resultInfo, {'state': $state}, function () {
						$scope.queryProInstList();
					});
				});
			}
		});
	};

	/**
	 * 校验当前用户是否具有机要秘书的角色
	 */
	$scope.checkJYMSRole = function () {
		$scope.user = {};
		$scope.user.roleList = [];
		$scope.user.roleList.push({name: '机要秘书'});
		SysUtils.requestByJson('/coreUser/checkUserRole', $scope.user, function (resultInfo) {
			SysUtils.handleResult(resultInfo, {'state': $state}, function () {
				$scope.hasJYMSRole = resultInfo.additionalInfo.has;
				$scope.$apply();
			});
		});
	};

	$('#queryModal').on('shown.bs.modal', function () {
		$('#meetingTimeStart').datepicker({
			format: 'yyyy-mm-dd',
			autoclose : true,
			clearBtn: true
		}).on('show',function(e){
			if ($('#meetingTimeEnd').val() == '') {
				$('#meetingTimeStart').datepicker('setEndDate', null);
			}
		}).on('changeDate',function(e){
			if (e.date) {
				$('#meetingTimeEnd').datepicker('setStartDate', new Date(e.date.valueOf()));
			} else {
				$('#meetingTimeEnd').datepicker('setStartDate', null);
			}
		});
		$('#meetingTimeEnd').datepicker({
			format: 'yyyy-mm-dd',
			autoclose : true,
			clearBtn: true
		}).on('show',function(e){
			if ($('#meetingTimeStart').val() == '') {
				$('#meetingTimeEnd').datepicker('setStartDate', null);
			}
		}).on('changeDate',function(e){
			if (e.date) {
				$('#meetingTimeStart').datepicker('setEndDate', new Date(e.date.valueOf()));
			} else {
				$('#meetingTimeStart').datepicker('setEndDate', null);
			}
		});
	});

	$scope.checkJYMSRole();

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
