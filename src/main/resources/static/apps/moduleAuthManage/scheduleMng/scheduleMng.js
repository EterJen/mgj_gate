myApp.controller('scheduleMngCtrl', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils', 'dataFactory', 'NodeTreeTool', function ($rootScope, $scope, ENV, $state, SysUtils, dataFactory, NodeTreeTool) {

	/*************************一、变量定义****************************/
	console.log("scheduleMngCtrl");
	$scope.queryBean = {paging: 'Yes'};
	$scope.ngSelectedCell = {};
	$scope.orgNavType = 'Person';
	$scope.treeData = null;
	$scope.nodeId = '';
	$scope.viewModeUserList = []; //模式可查看的人员列表
	$scope.viewModeList = [];
	$scope.currentMode = "";
	$scope.modalTitle = null;
	$scope.newMode = {};
	$scope.userList = [];
	$scope.userListRoot = {};
	$scope.selectedUsers = [];
	$scope.paramUser = {};

	$scope.modeTypeList = [
		{key: 'W', val: '两委领导工作安排'},
		{key: 'X', val: '行政领导工作安排'},
		{key: 'D', val: '党委领导工作安排'}
	];
	/*************************二、函数定义****************************/

	$scope.candidateExpTypeSetting = function () {
		$scope.showCandidateMultiSelDialog();
	};

	$scope.closeMultiSelDialog = function () {
		var viewNames = '';
		angular.forEach($scope.ngSelectedCell.data.candidatMap[$scope.orgNavType], function (user) {
			viewNames += user.name + ' ';
		});
		viewNames = SysUtils.isEmpty(viewNames) ? viewNames : viewNames.substr(0, viewNames.length - 1);
		$scope.newMode.modeViewNames = viewNames;
		$scope.newMode.modeView = JSON.stringify($scope.ngSelectedCell.data.candidatMap[$scope.orgNavType]);
		$('#candidateMultiSelDialog').modal('hide');
	};

	$scope.showCandidateMultiSelDialog = function () {
		$scope.ngSelectedCell.data = {};
		if ($scope.ngSelectedCell.data.candidatMap == null)
			$scope.ngSelectedCell.data.candidatMap = {};
		if ($scope.ngSelectedCell.data.candidatMap[$scope.orgNavType] == null) {
			$scope.ngSelectedCell.data.candidatMap[$scope.orgNavType] = [];
		}
		$scope.queryByType($scope.orgNavType);
		$('#candidateMultiSelDialog').modal('show');
	};

	$scope.queryByType = function (type) {
		if ($scope.ngSelectedCell.data.candidatMap == null)
			$scope.ngSelectedCell.data.candidatMap = {};
		if ($scope.ngSelectedCell.data.candidatMap[$scope.orgNavType] == null) {
			$scope.ngSelectedCell.data.candidatMap[$scope.orgNavType] = [];
		}
		if (type == 'Person') {
			url = '/coreDepartment/departmentTree';
		}
		if (!SysUtils.isEmpty($scope.newMode.modeView)) {
			$scope.ngSelectedCell.data.candidatMap[$scope.orgNavType] = JSON.parse($scope.newMode.modeView);
		}
		SysUtils.requestByJson(url, {paging: 'No'}, function (resultInfo) {
			$scope.treeData = resultInfo.beanList;
			$scope.$apply();
		});
	};

	$scope.selectUserCandidate = function (user) {
		$scope.choosedUser = user;
		$scope.ngSelectedCell.data.candidatMap[$scope.orgNavType] = $scope.ngSelectedCell.data.candidatMap[$scope.orgNavType].filter(function (value) {
			return !(value.id == user.id);
		});
		$scope.ngSelectedCell.data.candidatMap[$scope.orgNavType].push({
			id: user.id,
			name: user.name
		});
		$scope.setUserCandidateOrder();
		$scope.$applyAsync();
	};

	$scope.selectCandidate = function (node) {
		$scope.nodeId = node.id;
		if ($scope.orgNavType == 'Person') {
			$scope.currDepart = node;
			var readUrl = "/coreDepartment/read/" + node.id;
			SysUtils.requestByJson(readUrl, {}, function (resultInfo) {
				$scope.currDepartUserList = resultInfo.bean.users;
				$scope.$apply();
			});
		}
	};

	$scope.removeFromSelected = function ($index) {
		$scope.ngSelectedCell.data.candidatMap[$scope.orgNavType].splice($index, 1);
		$scope.setUserCandidateOrder();
	};

	$scope.alreadySelected = function (node) {
		var result = false;
		angular.forEach($scope.ngSelectedCell.data.candidatMap[$scope.orgNavType], function (temp) {
			if (temp.id == node.id) {
				result = true;
			}
		});
		return result;
	};

	$scope.setUserCandidateOrder = function () {
		angular.forEach($scope.ngSelectedCell.data.candidatMap[$scope.orgNavType], function (value, index) {
			value.order = index;
		});
	};

	//新增、修改模式打开模态框
	$scope.openCreateModeModal = function (action) {
		if ('add' === action) {
			$scope.modalTitle = '新增模式';
			$scope.initMode(SysUtils.deepCopy($scope.queryBean));
		}
		if ('update' === action) {
			if (!SysUtils.nonEmptyCheck($scope.currentMode)) {
				SysUtils.swalForTips("提示", "请先选择模式", "info", function (isConfirm) {
				});
				return;
			}
			$scope.modalTitle = '修改模式';
			$scope.initMode($scope.currentMode);
		}
	};

	//新增或更新初始化模式信息
	$scope.initMode = function (mode) {
		SysUtils.requestByJson('/leaderWorkViewMode/initCreateOrUpdate', mode, function (resultInfo) {
			SysUtils.handleResult(resultInfo, {'state': $state}, function () {
				$scope.newMode = resultInfo.bean;
				$scope.$apply();
				$('#createMode').modal('show');
			});
		});
	};

	//模式管理列表点击模式
	$scope.toModeContent = function (mode) {
		SysUtils.requestByJson('/leaderWorkViewMode/read/' + mode.id, {}, function (resultInfo) {
			SysUtils.handleResult(resultInfo, {'state': $state}, function () {
				$scope.entityBean = resultInfo.bean;
				$scope.currentMode = resultInfo.bean;
				$scope.viewModeUserList = JSON.parse(resultInfo.bean.modeView);
				$scope.$apply();
			});
		});
	};

	//搜索模式动作
	$scope.modeSearch = function (e) {
		//IE 编码包含在window.event.keyCode中，Firefox或Safari 包含在event.which中
		var keycode = window.event ? e.keyCode : e.which;

		if (keycode == 13) {
			if (SysUtils.nonEmptyCheck($scope.queryText) && $scope.queryText.length > 0) {
				SysUtils.requestByJson('/leaderWorkViewMode/searchMode/' + $scope.queryText, {}, function (resultInfo) {
					SysUtils.handleResult(resultInfo, {'state': $state}, function () {
						$scope.viewModeList = resultInfo.beanList;
						$scope.$apply();
					});
				});
			} else {
				$scope.init();
			}
		}
	};

	//保存、更新模式
	$scope.saveMode = function (modal) {
		var url = '';
		if (SysUtils.isEmpty($scope.newMode.id)) {
			url = '/leaderWorkViewMode/create';
		} else {
			url = '/leaderWorkViewMode/update';
		}
		SysUtils.requestByJson(url, $scope.newMode, function (resultInfo) {
			SysUtils.handleResult(resultInfo, {'state': $state}, function () {
				$scope.currentMode = resultInfo.bean;
				$scope.init();
				$("#" + modal).modal('hide');
			});
		});
	};

	//删除模式
	$scope.deleteMode = function () {
		if (!SysUtils.nonEmptyCheck($scope.currentMode)) {
			SysUtils.swalForTips("提示", "请选择要删除的模式", "info", function (isConfirm) {
			});
			return;
		}
		if ($scope.currentMode.users.length > 0) {
			SysUtils.swalForTips("提示", "请先移出模式包含的用户", "info",function (isConfirm) {

			});
			return;
		}
		SysUtils.swalConfirm('警告', '确定删除该模式吗?', 'warning', function (isConfirm) {
			if (isConfirm) {
				SysUtils.requestByJson('/leaderWorkViewMode/delete/' + $scope.currentMode.id, {}, function (resultInfo) {
					SysUtils.handleResult(resultInfo, {'state': $state}, function () {
						$scope.currentMode = null;
						$scope.init();
					});
				});
			}
		});

	};

	$scope.initUser = function () {
		SysUtils.requestByJson('/coreUser/init?initType=create', {}, function (resultInfo) {
			SysUtils.handleResult(resultInfo, {'state': $state}, function () {
				$scope.paramUser = resultInfo.bean;
				$scope.pageAuto();
				$scope.$apply();
				$('#userList').modal('show');
			});
		});
	};


	//查询用户信息
	$scope.userListClick = function () {
		SysUtils.requestByJson('/coreUser/searchUser', $scope.paramUser, function (resultInfo) {
			SysUtils.handleResult(resultInfo, {'state': $state}, function () {
				$scope.userList = resultInfo.beanList;
				$scope.paginationConf.totalItems = resultInfo.totalRows;
				$scope.$apply();
			});
		});
	};

	$scope.paginationConf = {
		currentPage: 1,
		totalItems: 80,
		itemsPerPage: 10,
		pagesLength: 13,
		perPageOptions: [10, 20, 30, 40, 50]
	};

	$scope.pageAuto =function() {
		if($scope.paramUser!==undefined){
			$scope.paramUser.paging = "Yes";
			$scope.paramUser.pageNo = $scope.paginationConf.currentPage;
			$scope.paramUser.pageSize = $scope.paginationConf.itemsPerPage;
			$scope.paramUser.modeId=$scope.currentMode.id;
			$scope.paramUser.flag = 1;
			$scope.paramUser.initType = 'notInMode';
		}
		if (SysUtils.nonEmptyCheck($scope.currentMode.id)) {
			$scope.userListClick();
		}
	};
	$scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.pageAuto);

	//配置人员
	$scope.configUser = function (action) {
		if (!SysUtils.nonEmptyCheck($scope.currentMode)) {
			SysUtils.swalForTips('提示', '请先选择模式!', 'info', function (isConfirm) {
			});
			return;
		}
		if ('add' === action) {
			$scope.userListRoot.checked = false;
			angular.forEach($scope.selectedUsers, function (item) {
				angular.element("#" + item.id).click();
			});
			$scope.selectedUsers = [];
			$scope.initUser();
		}
		if ("remove" === action) {
			if ($scope.selectedUsers.length === 0) {
				SysUtils.swalForTips("提示", "请至少选择一个模式下的用户", "info", function (isConfirm) {
				});
				return;
			}
			$scope.currentMode.users = SysUtils.deepCopy($scope.selectedUsers);
			$scope.operatingUserList('removeModeUser');
		}
	};

	$scope.addUserToMode = function (saveUserToMode) {
		SysUtils.swalConfirm("提示", "将用户配置到[" + $scope.currentMode.modeName + "]模式下", "info", function (isConfirm) {
			if (isConfirm)
				$scope.currentMode.users = SysUtils.deepCopy($scope.selectedUsers);
				$scope.operatingUserList(saveUserToMode);
		});
	};
	//操作用户列表
	$scope.operatingUserList = function (action) {
		var url = '';
		if ("saveUserToMode" === action) {
			url = '/leaderWorkViewMode/saveUserToMode';
		}
		if ("removeModeUser" === action) {
			url = '/leaderWorkViewMode/deleteModeUser';
		}
		SysUtils.requestByJson(url, $scope.currentMode, function (resultInfo) {
			SysUtils.handleResult(resultInfo, {'state': $state}, function () {
				$scope.currentMode = resultInfo.bean;
				$scope.userListRoot.checked = false;
				$scope.selectedUsers = [];
				$scope.$apply();
				$('#userList').modal('hide');
				$scope.toModeContent($scope.currentMode);
			});
		});
	};

	$scope.nodeTrClick = function (parentNode, selfNode, siblingNodes, sonNodes, event) {
		NodeTreeTool.relatedCheck(parentNode, selfNode, siblingNodes, sonNodes);
		/*根据需要统计选中结果*/
		$scope.selectedUsers = NodeTreeTool.checkedCount(parentNode, selfNode, siblingNodes, sonNodes, $scope.selectedUsers);
		$scope.selectedUsers = $scope.selectedUsers.filter(function (value) {
			return !SysUtils.isEmpty(value.id);
		});
	};

	//页面初始化加载模式列表
	$scope.init = function () {
		$scope.entityBean = {paging: 'No'};
		SysUtils.requestByJson('/leaderWorkViewMode/list', $scope.entityBean, function (resultInfo) {
			SysUtils.handleResult(resultInfo, {'state': $state}, function () {
				$scope.viewModeList = resultInfo.beanList;
				$scope.viewModeUserList = [];
				if (SysUtils.nonEmptyCheck($scope.currentMode)) {
					$scope.toModeContent($scope.currentMode);
				}
				$scope.$apply();
			});
		});
	};

	/*************************三、初始化调用****************************/

	$scope.init();

	/*计算布局高度*/
	$scope.calculatedHeight = function () {
		$('.content-wrapper').css('height', SysUtils.get_content_wrapper());
		//console.log("=ceter_p=="+$('#panel-heading').outerHeight(true));
		$('.gdt_cont').css('max-height', $('.content').height());
		$('.details').css('height', $('.content').height());
	};

	$scope.calculatedHeight();

}]);