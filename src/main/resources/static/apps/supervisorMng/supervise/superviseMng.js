myApp.controller('superviseMngCtrl', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils', 'maxHeigtTool', 'NodeTreeTool', function ($rootScope, $scope, ENV, $state, SysUtils, maxHeigtTool, NodeTreeTool) {

	console.log('督查登陆');
	$rootScope.addBgground = true;
	$scope.queryBean = {paging: 'Yes', groupId: 'duwen', isFinished: 'Active'};
	$scope.proInstList = [];
	$scope.allProInstRoot = {};
	$scope.selectedProInsts = [];
	$scope.hasSWDLRole = false;
	var childWindowMap = {};//存储已经打开的窗口
	$scope.proInst = {};
	$rootScope.reNewBtn = "duwenzb";
	$scope.isFinished = '';
	$scope.pointSupervises = [
		{key: '', val: '全部'},
		{key: 'true', val: '重要'}
	];

	$scope.formDefIds = [
		{key: '', val: '全部'},
		{key: 'jxwduwen', val: '沪经督'}
	];

	$scope.paginationConf = {
		currentPage: 1,
		totalItems: -1,
		itemsPerPage: 10,
		pagesLength: 13,
		perPageOptions: [10, 20, 30, 40, 50]
	};

	$scope.proinsCheckCurrentck = function (v) {
	}
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
	}
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
		var _window = window.open(ENV.localapi + "/index.html#!/officialDocuments/" + formDefId + "/-" + proInst.id);
		childWindowMap[proInst.id] = _window;
	};

	$scope.duwenModify = function (){
		if ($scope.selectedProInsts.length == 0) {
			SysUtils.swalForTips('提示', '请先勾选督文！', 'info', function () {
			});
			return;
		}
		SysUtils.requestByJson('/rCurrentTaskInfo/duwenModify', $scope.selectedProInsts[0], function (resultInfo) {
			SysUtils.handleResult(resultInfo, {'state': $state}, function () {
				var formDefId = resultInfo.bean.belongingProInst.formDefId;
				var _window;
				if (!SysUtils.isEmpty(childWindowMap[resultInfo.bean.id])) {
					childWindowMap[resultInfo.bean.id].close();
				}
				_window = window.open(ENV.localapi + "/index.html#!/officialDocuments/" + formDefId + "/" + resultInfo.bean.id);
				childWindowMap[resultInfo.bean.id] = _window;
			});
		});
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
		console.log($scope.queryBean);
		$scope.selectedProInsts = [];
		SysUtils.requestByJson("/rProcessInstance/list", $scope.queryBean, function (resultInfo) {
			SysUtils.handleResult(resultInfo, {'state': $state}, function () {
				console.log(resultInfo.bean);
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

	$scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.pageAuto);

	$scope.openQueryModal = function (modal) {
		$scope.queryBean.paging = "Yes";
		$scope.queryBean.pageNo = 1;
		$scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
		$scope.queryBean.pointSupervise = $scope.pointSupervises[0].key;
		$scope.queryBean.formDefId = $scope.formDefIds[0].key;
		$('#' + modal).modal('show');
	};

	$scope.delete = function () {
		console.log($scope.selectedProInsts);
		if (!SysUtils.nonEmptyCheck($scope.selectedProInsts)) {
			SysUtils.swalForTips('提示', '请选择要删除的督办信息!', 'info', function () {
			});
			return;
		}
		SysUtils.swalConfirm('提示', '确认删除选中的督办信息吗?', 'info', function (isConfirm) {
			if (isConfirm) {
				SysUtils.requestByJson('/rProcessInstance/duwenDelete', $scope.selectedProInsts[0], function (resultInfo) {
					SysUtils.handleResult(resultInfo, {'state': $state}, function () {
						$scope.queryProInstList();
					});
				});
			} else {
				angular.forEach($scope.selectedProInsts, function (item) {
					item.checked = false;
				});
				$scope.$apply();
			}
		});
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
