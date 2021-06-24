myApp.controller('leaveApprovalCtrl', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils', 'maxHeigtTool', 'NodeTreeTool', function ($rootScope, $scope, ENV, $state, SysUtils, maxHeigtTool, NodeTreeTool) {

	console.log('请假报批');
	$rootScope.addBgground = true;
	$scope.queryBean = {paging: 'Yes', groupId: 'leave', dbParams:{}};
	$scope.proInstList = [];
	$scope.currGroupId = 'leave';
	var childWindowMap = {};//存储已经打开的窗口
	$scope.proInst = {};
	$rootScope.reNewBtn = "directQuery";
	$scope.isFinished = 'Active';

	$scope.leaveTypes = [
		{key: '', val: '全部'},
		{key: 'affair', val: '事假'},
		{key: 'sick', val: '病假'},
		{key: 'annual', val: '年休假'},
		{key: 'family', val: '探亲假'},
		{key: 'marriage', val: '婚假'},
		{key: 'funeral', val: '丧假'},
		{key: 'fertility', val: '生育假'},
		{key: 'escort', val: '陪护假'},
		{key: 'other', val: '其他'}
	];

	$scope.paginationConf = {
		currentPage: 1,
		totalItems: -1,
		itemsPerPage: 10,
		pagesLength: 13,
		perPageOptions: [10, 20, 30, 40, 50]
	};
	$scope.deleteProInst = function (inst) {
		SysUtils.swalConfirm("提示", "是否删除选中公文", "info", function (isConfirm) {
			if (isConfirm) {
				SysUtils.requestByJson("/rProcessInstance/safeDelet", inst, function (resultInfo) {
					$scope.queryProInstList();
				})
			}
		});

	};

	$scope.openCreateProInstDialog = function () {
		$scope.proInst = {};
		$scope.processVersionQueryBean = {
			paging: 'No', isActive: '1', dbParams: {
				defManageFlag: '1', proDefGroupId: $scope.currGroupId
			}
		};
		SysUtils.requestByJson('/processDefVersion/list', $scope.processVersionQueryBean, function (resultInfo) {
			SysUtils.handleResult(resultInfo, {'state': $state}, function () {
				$scope.activeProcVersionList = resultInfo.beanList;
				$scope.proInst.processVersionId = $scope.activeProcVersionList[0].id;
				$scope.$apply();
				$('#createProInstDialog').modal('show');
			});
		});
	};

	$scope.saveProInst = function () {
		SysUtils.silenceWithAuthAjax("/rProcessInstance/create",$scope.proInst,function (resultInfo) {
			$('#createProInstDialog').modal('hide');
			$rootScope.reNewBtn = "directQuery";
			window.open(ENV.localapi + "/index.html#!/officialDocuments/" + resultInfo.additionalInfo.formDefId + "/" + resultInfo.additionalInfo.currentTuskId, resultInfo.additionalInfo.currentTuskId);
		});
	};

	$scope.initPaging = function () {
		$scope.paginationConf.currentPage = 1;
		$scope.paginationConf.totalItems = -1;
		$scope.paginationConf.itemsPerPage = 10;

		$scope.$applyAsync();
	};

	$scope.gotoDetail = function (proInst) {
		$rootScope.reNewBtn = "directQuery";
		var formDefId = proInst.formDefId;
		if (!SysUtils.isEmpty(childWindowMap[proInst.id])) {
			childWindowMap[proInst.id].close();
		}
		var url = "";
		if ("Active" == $scope.isFinished && !$scope.has) {
			url = ENV.localapi + "/index.html#!/officialDocuments/" + formDefId + "/" + proInst.taskId;
		} else {
			url = ENV.localapi + "/index.html#!/officialDocuments/" + formDefId + "/-" + proInst.id;
		}
		var _window = window.open(url);
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
		$scope.proInstList = [];
		$scope.queryBean.dbParams.has = $scope.has;
		console.log($scope.queryBean);
		SysUtils.requestByJson("/rProcessInstance/queryLeaveList", $scope.queryBean, function (resultInfo) {
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
		$scope.queryBean = {paging: 'Yes', groupId: 'leave', dbParams:{}};
		$scope.$applyAsync();
		$scope.initPaging();
	};

	$scope.initParamsAndQuery = function () {
		$scope.queryBean = {paging: 'Yes', groupId: 'leave', dbParams:{}};//初始化查询参数
		$scope.$applyAsync();
		$scope.initPaging();
		$scope.pageAuto();
	};

	$scope.pageAuto = function () {
		$scope.queryBean.totalRows = $scope.paginationConf.totalItems;
		$scope.queryBean.pageNo = $scope.paginationConf.currentPage;
		$scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
		$scope.setStatus();
		$scope.queryProInstList();
	};

	$scope.queryProInstListByCondition = function (isFinished) {
		$scope.isFinished = isFinished;
		$scope.initParamsAndQuery();
	};

	$scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.pageAuto);

	$scope.openQueryModal = function (modal) {
		$scope.queryBean.paging = "Yes";
		$scope.queryBean.pageNo = 1;
		$scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
		$scope.queryBean.dbParams.leaveType = $scope.leaveTypes[0].key;
		$('#' + modal).modal('show');
	};

	$scope.setStatus = function () {
		if ("Active" === $scope.isFinished) {
			$scope.queryBean.strStatus = 'NotAccepted,Accepted';
		} else {
			$scope.queryBean.strStatus = "Handled";
		}
	};

	$scope.leaveCancel = function (proInst) {
		console.log(proInst);
		SysUtils.swalConfirm('提示', '确认删除该报批信息吗?', 'info', function (isConfirm) {
			if (isConfirm) {
				SysUtils.requestByJson('/rProcessInstance/leaveCancel', proInst, function (resultInfo) {
					SysUtils.handleResult(resultInfo, {'state': $state}, function () {
						$scope.queryProInstList();
					});
				});
			}
		});
	};

	$('#queryModal').on('shown.bs.modal', function () {
		$('#leaveStartDate').datepicker({
			format: 'yyyy-mm-dd',
			autoclose : true,
			clearBtn: true
		}).on('show',function(e){
			if ($('#leaveEndDate').val() == '') {
				$('#leaveStartDate').datepicker('setEndDate', null);
			}
		}).on('changeDate',function(e){
			if (e.date) {
				$('#leaveEndDate').datepicker('setStartDate', new Date(e.date.valueOf()));
			} else {
				$('#leaveEndDate').datepicker('setStartDate', null);
			}
		});
		$('#leaveEndDate').datepicker({
			format: 'yyyy-mm-dd',
			autoclose : true,
			clearBtn: true
		}).on('show',function(e){
			if ($('#leaveStartDate').val() == '') {
				$('#leaveEndDate').datepicker('setStartDate', null);
			}
		}).on('changeDate',function(e){
			if (e.date) {
				$('#leaveStartDate').datepicker('setEndDate', new Date(e.date.valueOf()));
			} else {
				$('#leaveStartDate').datepicker('setEndDate', null);
			}
		});
	});

	$scope.has = false;
	$scope.checkLeaveAdminRole = function () {
		$scope.user = {};
		$scope.user.roleList = [];
		$scope.user.roleList.push({name: '请假报批管理员'});
		SysUtils.requestByJsonSync('/coreUser/checkUserRole', $scope.user, function (resultInfo) {
			SysUtils.handleResult(resultInfo, {'state': $state}, function () {
				$scope.has = resultInfo.additionalInfo.has;
				$scope.$applyAsync();
			});
		});
	};

	/*************************三、初始化调用****************************/

	$scope.checkLeaveAdminRole();

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
