myApp.controller('processControlMngCtrl', ['$rootScope', '$scope', 'ENV', '$state', 'dataFactory', 'NodeTreeTool', 'SysUtils', function ($rootScope, $scope, ENV, $state, dataFactory, NodeTreeTool, SysUtils) {

	console.log("processControlMngCtrl");

	$rootScope.addBgground = true;
	//hasTodo: 有无待办(yes/no)
	$scope.queryBean = {paging: 'Yes',dbParams: {hasTodo: '',op:''}};
	$scope.proInstList = [];
	var childWindowMap = {};//存储已经打开的窗口
	$scope.currGroupId = 'all';
	$scope.homeListRenewId = "lckzcx";
  $rootScope.reNewBtn = $scope.homeListRenewId;
	$scope.yes = false;
	$scope.no = false;
	$scope.todoTaskList = [];
	$scope.proInst = {};
	$scope.allTodoTasksRoot = {};
	$scope.selectedTodoTasks = [];
	$scope.deleteTasks = [];
	$scope.nodeList = [];
	$scope.node = {};
	$scope.nodeId = '';

	$scope.ngSelectedCell = {};
	$scope.treeData = null;
	$scope.orgNavType = "Person"; //默认选择接收者类型 用户
	$scope.currDepart = {};
	$scope.currDepartUserList = {};
	$scope.task = {};

	$scope.docTypelist = [
		{id: 'all', val: '全部'},
		{id: 'shouwen', val: '收文'},
		{id: 'fawen', val: '发文'},
		{id: 'shangjilaiwen', val: '上级来文'},
		{id: 'xinhan', val: '信函'},
		{id: 'duwen', val: '督文'},
		{id: 'huiyi', val: '会议'}
	];

	$scope.formDefIds = [];
	$scope.formDefIdsObj = {
		shouwen:[
			{val: '全部', key: ''},
			{val: '长城电子党委收文', key: 'jxwdwshouwen'},
			{val: '长城电子收文', key: 'jxwshouwen'}
		],
		fawen:[
			{val: '全部', key: ''},
			{val: '长城电子发文', key: 'fawen'},
			{val: '长城电子党委发文', key: 'jxwdwfawen'},
//			{val: '国防办发文', key: 'gfkgbfawen'},
			{val: '长城电子规范发文', key: 'hjxgffawen'}
		],
		shangjilaiwen:[
			{val: '全部', key: ''},
			{val: '中央文件（甲）', key: 'jywjj'},
			{val: '市委文件（乙）', key: 'jywjy'},
			{val: '市府文件（丙）', key: 'jywjb'},
			{val: '国务院文件（国）', key: 'jywjg'}
		],
		xinhan:[
			{val: '全部', key: ''},
			{val: '长城电子信函', key: 'jxwxinhan'},
			{val: '长城电子党委信函', key: 'jxwdwxinhan'},
		],
		duwen:[
			{val: '全部', key: ''},
			{val: '长城电子督文', key: 'jxwduwen'},
		],
		huiyi:[
			{val: '全部', key: ''},
			{val: '长城电子会议', key: 'jxwhuiyi'}
		]
	};

	$scope.taskTypeList = [
		{id: 'NormalFlow', val: '正常流转'},
		{id: 'JustFinish', val: '办结任务'}
	];

	$scope.isFinisheds = [
		{key: '', val: '全部'},
		{key: 'Active', val: '在办'},
		{key: 'Finished', val: '已办结'}
	];

	$scope.paginationConf = {
		currentPage: 1,
		totalItems: -1,
		itemsPerPage: 10,
		pagesLength: 13,
		perPageOptions: [10, 20, 30, 40, 50]
	};

	$scope.initPaging = function () {
		$scope.paginationConf.currentPage = 1;
		$scope.paginationConf.totalItems = -1;
		$scope.paginationConf.itemsPerPage = 10;

		$scope.$applyAsync();
	};

	$scope.gotoDetail = function (task) {
		//console.log(task);
		var formDefId = task.formDefId;
		if (!SysUtils.isEmpty(childWindowMap[task.id])) {
			childWindowMap[task.id].close();
		}
      $rootScope.reNewBtn = $scope.homeListRenewId;
		var _window = window.open(ENV.localapi + "/index.html#!/officialDocuments/" + formDefId + "/-" + task.id + "?homeListRenewId=" + $scope.homeListRenewId);
		childWindowMap[task.id] = _window;
	};

	$scope.queryProInstList = function (modal) {
		$scope.proInstList = [];
		if ($scope.currGroupId != 'all') {
			$scope.queryBean.groupId = $scope.currGroupId;
		}
		$scope.queryBean.dbParams.op = 'control';
		SysUtils.requestByJson("/rProcessInstance/list", $scope.queryBean, function (resultInfo) {
			SysUtils.handleResult(resultInfo, {'state': $state}, function () {
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

	$scope.initParamsAndQuery = function () {
		$scope.queryBean = {paging: 'Yes',dbParams: {hasTodo: '',op:''}};
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

	$scope.collectionPros = function (index) {
		var pro = $scope.proInstList[index];
		if (pro.collection) {
			$scope.proInstList[index].collection = false;
		} else {
			$scope.proInstList[index].collection = true;

		}
		SysUtils.requestByJson('/rProcessInstance/insertMycollection', pro, function (r) {
			/*if($scope.proInstList[index].collection){
				SysUtils.swalTimer("提示","关注成功！","success");
			}else{
				SysUtils.swalTimer("提示","取消关注成功！","success");
			}*/
			$scope.queryProInstList();
		});
	};

	$scope.currGroupIdChg = function () {
		$scope.formDefIds = $scope.formDefIdsObj[$scope.currGroupId];
	};

	$scope.isFinishedChg = function () {
		if ($scope.queryBean.isFinished != 'Finished') {
			$scope.queryBean.finishedDate = "";
			$scope.queryBean.finishedDateZh = "";
			$scope.queryBean.finishedDateEnd = "";
			$scope.queryBean.finishedDateEndZh = "";
		}
	};

	$scope.showDetail = function (modal) {
		$scope.queryBean.paging = "Yes";
		$scope.queryBean.pageNo = 1;
		$scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
		$('#' + modal).modal('show');
	};

	$scope.timeChga = function () {
		$scope.tpsChg($scope.queryBean, 'createTime', ['createTimeEnd', 'finishedDate', 'finishedDateEnd'], []);
	};
	$scope.timeChgb = function () {
		$scope.tpsChg($scope.queryBean, 'createTimeEnd', ['finishedDate', 'finishedDateEnd'], ['createTime']);
	};
	$scope.timeChgc = function () {
		$scope.tpsChg($scope.queryBean, 'finishedDate', ['finishedDateEnd'], ['createTime', 'createTimeEnd']);
	};
	$scope.timeChgd = function () {
		$scope.tpsChg($scope.queryBean, 'finishedDateEnd', [], ['createTime', 'createTimeEnd', 'finishedDate']);
	};

	/**
	 * 定位模态框查询
	 * @param modal
	 */
	$scope.queryProInstListChangeBean = function (modal) {
		$scope.initPaging();
		$scope.queryBean.totalRows = $scope.paginationConf.totalItems;
		$scope.queryBean.pageNo = $scope.paginationConf.currentPage;
		$scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;

		$scope.queryProInstList(modal);
	};

	/**
	 * 有待办、无待办查询
	 * @param condition
	 */
	$scope.queryProInstListByCondition = function (condition) {
		$scope.queryBean = {paging: 'Yes',dbParams: {hasTodo: '',op:''}};
		$scope.initPaging();
		$scope.queryBean.totalRows = $scope.paginationConf.totalItems;
		$scope.queryBean.pageNo = $scope.paginationConf.currentPage;
		$scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
		if ("yes" === condition) {
			$scope.no = false;
			$scope.yes = !$scope.yes;
		}
		if ($scope.yes) {
			$scope.queryBean.dbParams.hasTodo = 'yes';
		}
		if ("no" === condition) {
			$scope.yes = false;
			$scope.no = !$scope.no;
		}
		if ($scope.no) {
			$scope.queryBean.dbParams.hasTodo = 'no';
		}
		$scope.queryProInstList();
	};

	/**
	 * 流程控制列表"控制"操作
	 * @param proInst
	 */
	$scope.doControl = function (proInst) {
		console.log(proInst);
		$scope.proInst = SysUtils.deepCopy(proInst);
		SysUtils.requestByJson('/rProcessInstance/doControl', $scope.proInst, function (resultInfo) {
			SysUtils.handleResult(resultInfo, {'state': $state}, function () {
				$scope.todoTaskList = resultInfo.additionalInfo.data;
				$scope.proInst = resultInfo.bean;
				$scope.allTodoTasksRoot.checked = false;
				$scope.$apply();
				$('#controlModal').modal('show');
			});
		});
	};

	/**
	 * 打开创建待办任务模态框
	 */
	$scope.openCreateCurrentTaskModal = function () {
		SysUtils.requestByJson('/rCurrentTaskInfo/openCreateCurrentTaskModal/' + $scope.proInst.processVersionId, {}, function (resultInfo) {
			SysUtils.handleResult(resultInfo, {'state': $state}, function () {
				console.log(resultInfo);
				$scope.nodeList = resultInfo.additionalInfo.nodes;
				$scope.task = resultInfo.bean;
				$scope.$apply();
				$('#createTodoTaskModal').modal('show');
			});
		});

	};

	$scope.selectTab = function (type) {
		$scope.nodeId = '';
		$scope.$applyAsync();
		$scope.orgNavType = type;
		$scope.queryByType(type);
	};

	$scope.removeFromSelected = function ($index) {
		$scope.ngSelectedCell.data.candidatMap[$scope.orgNavType].splice($index, 1);
	};

	$scope.selectUserCandidate = function (user) {
		/*$scope.ngSelectedCell.data.candidatMap[$scope.orgNavType] = $scope.ngSelectedCell.data.candidatMap[$scope.orgNavType].filter(function (value) {
			return !(value.participantId == user.id);
		});*/
		$scope.ngSelectedCell.data.candidatMap[$scope.orgNavType] = [];
		//TODO:去重复的；
		$scope.ngSelectedCell.data.candidatMap[$scope.orgNavType].push({
			participantId: user.id,
			participantName: user.name ,
			isParent: false,
			participantType: 'Person'
		});
		$scope.$applyAsync();
	};

	$scope.alreadySelected = function (node) {
		var result = false;
		angular.forEach($scope.ngSelectedCell.data.candidatMap[$scope.orgNavType], function (temp) {
			if (temp.participantId == node.id) {
				result = true;
			}
		});
		return result;
	};

	$scope.selectCandidate = function (node) {
		//console.log(node);
		$scope.nodeId = node.id;
		$scope.ngSelectedCell.data.candidatMap[$scope.orgNavType] = [];
		if ($scope.orgNavType == 'Role') {
			if (!$scope.alreadySelected(node) && (node.nodes === null || node.nodes.length === 0)) {
				var selectValue = {
					participantId: node.id,
					participantName: node.name,
					isParent: false,
					participantType: $scope.orgNavType
				};
				$scope.ngSelectedCell.data.candidatMap[$scope.orgNavType].push(selectValue);
			}
		}
		if ($scope.orgNavType == 'Person') {
			$scope.currDepart = node;
			var readUrl = "/coreDepartment/read/" + node.id;
			SysUtils.requestByJson(readUrl, {}, function (resultInfo) {
				$scope.currDepartUserList = resultInfo.bean.users;
				$scope.$apply();
			});
		}
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
		if (type == 'Role') {
			url = '/coreRole/listTopClick';
		}
		SysUtils.requestByJson(url, {paging: 'No'}, function (resultInfo) {
			$scope.treeData = resultInfo.beanList;
			$scope.$apply();
		});
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

	$scope.closeMultiSelDialog = function () {
		var candidate = '';
		var id = '';
		angular.forEach($scope.ngSelectedCell.data.candidatMap[$scope.orgNavType], function (item) {
			candidate += item.participantName + ' ';
			id += item.participantId + ' ';
		});
		$scope.task.assigneeName = '' != candidate ? candidate.substring(0, candidate.length - 1) : candidate;
		$scope.task.assignee = '' != id ? id.substring(0, id.length - 1) : id;
		$('#candidateMultiSelDialog').modal('hide');
	};

	/**
	 * 创建待办任务模态框节点名称下拉列表选择
	 * @param node
	 */
	$scope.changeNode = function (node) {
		$scope.task.belongingNodeId = node.id;
		$scope.task.belongNodeName = node.name;
	};

	/**
	 * 创建待办任务前校验，表单使用angularjs校验指令$valid
	 * 此方法可不用
	 */
	$scope.valid = function () {
		var obj = {flag: false, msg: ''};
		if (SysUtils.isEmpty($scope.node)) {
			obj.flag = true;
			obj.msg = '请选择节点名称';
			return obj;
		}
		if (SysUtils.isEmpty($scope.task.assigneeList)) {
			obj.flag = true;
			obj.msg = '请选择接收对象';
			return obj;
		}
		if (SysUtils.isEmpty($scope.task.taskType)) {
			obj.flag = true;
			obj.msg = '请选择任务类型';
			return obj;
		}
		return obj;
	};

	/**
	 * 创建待办任务
	 * @param modal
	 */
	$scope.createCurrentTask = function (modal) {
		$scope.task.proInstId = $scope.proInst.id;
		$scope.task.assigneeList = $scope.ngSelectedCell.data.candidatMap[$scope.orgNavType];
		$scope.task.belongingProInst.upcomingNum = $scope.todoTaskList.length;
		$scope.task.belongingProInst.processVersionId = $scope.proInst.processVersionId;
		console.log($scope.task);
		var obj = $scope.valid();
		if (obj.flag) {
			SysUtils.swalForTips('提示', obj.msg, 'info', function (isConfirm) {
			});
			return;
		}
		SysUtils.requestByJson('/rCurrentTaskInfo/createTaskWithControl', $scope.task, function (resultInfo) {
			SysUtils.handleResult(resultInfo, {'state': $state}, function () {
				$scope.doControl($scope.proInst);
				$('#' + modal).modal('hide');
			});
		});
	};

	/**
	 * 删除待办任务
	 * @param task
	 */
	$scope.deleteCurrentTask = function (task) {
		SysUtils.swalConfirm('提示', '确定删除该待办任务吗?', 'info', function (isConfirm) {
			if (isConfirm) {
				$scope.deleteTasks.push(task);
				SysUtils.requestByJson('/rCurrentTaskInfo/batchDelete', $scope.deleteTasks, function (resultInfo) {
					SysUtils.handleResult(resultInfo, {'state': $state}, function () {
						$scope.deleteTasks = [];
						$scope.doControl($scope.proInst);
					})
				});
			}
		});
	};

	/**
	 * 批量删除待办任务
	 */
	$scope.batchDeleteCurrentTask = function () {
		if ($scope.selectedTodoTasks.length == 0) {
			SysUtils.swalOnlyConfirm('提示', '请勾选要删除的待办任务！', 'info', function () {
			});
			return;
		}
		$scope.deleteTasks = SysUtils.deepCopy($scope.selectedTodoTasks);
		console.log($scope.deleteTasks);
		SysUtils.swalConfirm('提示', '确定删除勾选的待办任务吗?', 'info', function (isConfirm) {
			if (isConfirm) {
				SysUtils.requestByJson('/rCurrentTaskInfo/batchDelete', $scope.deleteTasks, function (resultInfo) {
					SysUtils.handleResult(resultInfo, {'state': $state}, function () {
						$scope.deleteTasks = [];
						$scope.doControl($scope.proInst);
					});
				});
			} else {
				angular.forEach($scope.selectedTodoTasks, function (item) {
					angular.element("input#" + item.id).click();
				});
			}
		});
	};

	$scope.nodeTrClick = function (parentNode, selfNode, siblingNodes, sonNodes, event) {
		NodeTreeTool.relatedCheck(parentNode, selfNode, siblingNodes, sonNodes);
		/*根据需要统计选中结果*/
		$scope.selectedTodoTasks = NodeTreeTool.checkedCount(parentNode, selfNode, siblingNodes, sonNodes, $scope.selectedTodoTasks);
		$scope.selectedTodoTasks = $scope.selectedTodoTasks.filter(function (item) {
			return SysUtils.nonEmptyCheck(item.id)
		});
		console.log($scope.selectedTodoTasks);
	};

}]);