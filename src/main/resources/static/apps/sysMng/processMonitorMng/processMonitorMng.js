myApp.controller('processMonitorMngCtrl', ['$rootScope', '$scope', 'ENV', '$state', 'dataFactory', 'NodeTreeTool', 'SysUtils', function ($rootScope, $scope, ENV, $state, dataFactory, NodeTreeTool, SysUtils) {

	console.log("流程监控");

	$rootScope.addBgground = true;
	$scope.queryBean = {paging: 'Yes'};
	$scope.proInstList = [];
	var childWindowMap = {};//存储已经打开的窗口
	$scope.homeListRenewId = "lcjkcx";
	$rootScope.reNewBtn = $scope.homeListRenewId;
	$scope.proInstListRoot = {};
	$scope.selectedProInsts = [];
	$scope.processDefListParam = {paging: 'No', flag: '1', dbParams: {op: 'monitor'}};
	$scope.processDefList = [];
	$scope.processDefManages = [];
	$scope.proGroup = null;
	$scope.formDefId = null;
	$scope.query = false;
	$scope.proInstance = null;
	$scope.hisTaskInfoQueryBean = {paging: 'No'};
	$scope.hisTaskInfoList = [];
	$scope.showDetailList = [];
	$scope.processNodes = [];
	$scope.processNodeId = null;
	$scope.selectedHisTasks = [];

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
		var formDefId = task.formDefId;
		if (!SysUtils.isEmpty(childWindowMap[task.id])) {
			childWindowMap[task.id].close();
		}
		$rootScope.reNewBtn = $scope.homeListRenewId;
		var _window = window.open(ENV.localapi + "/index.html#!/officialDocuments/" + formDefId + "/-" + task.id + "?homeListRenewId=" + $scope.homeListRenewId);
		childWindowMap[task.id] = _window;
	};

	$scope.queryProInstList = function (modal) {
		if (!$scope.query) {
			return;
		}
		$scope.proInstList = [];
		$scope.selectedProInsts = [];
		SysUtils.requestByJson("/rProcessInstance/monitorList", $scope.queryBean, function (resultInfo) {
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
		$scope.queryBean = {paging: 'Yes'};
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

	$scope.showDetail = function (modal) {
		$scope.queryBean = {paging: 'Yes'};
		SysUtils.silenceWithAuthAjax("/processDefManage/groupingTree", $scope.processDefListParam, function (resultInfo) {
			$scope.processDefList = resultInfo.beanList;
			$scope.proGroup = $scope.processDefList[0];
			$("#" + modal).modal('show');
			$scope.$applyAsync();
		});
	};

	$scope.changeProcessGroup = function (processGroup) {
		$scope.processDefManages = processGroup.processDefManages;
		$scope.proGroup = processGroup;
		$scope.formDefId = $scope.processDefManages[0].formDefId;
	};

	$scope.formatCreateTimeForQuery = function () {
		if (SysUtils.notEmpty($scope.queryBean.createTime)) {
			$scope.queryBean.createTime += " 00:00:00";
		}
		if (SysUtils.notEmpty($scope.queryBean.createTimeEnd)) {
			$scope.queryBean.createTimeEnd += " 23:59:59";
		}
	};

	/**
	 * 定位模态框查询
	 * @param modal
	 */
	$scope.queryProInstListChangeBean = function (modal) {
		$scope.query = true;
		$scope.initPaging();
		$scope.queryBean.totalRows = $scope.paginationConf.totalItems;
		$scope.queryBean.pageNo = $scope.paginationConf.currentPage;
		$scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
		$scope.queryBean.groupId = $scope.proGroup.formEnName;
		$scope.queryBean.formDefId = $scope.formDefId;
		$scope.formatCreateTimeForQuery();
		$scope.queryProInstList(modal);
	};

	/**
	 * 列表删除操作
	 */
	$scope.deleteProInst = function () {
		if (SysUtils.notEmpty($scope.selectedProInsts, [])) {
			SysUtils.swalConfirm('警告', '确定删除选中的流程吗?删除将不可恢复！', 'warning', function (isConfirm) {
				if (isConfirm) {
					angular.forEach($scope.selectedProInsts, function (item) {
						SysUtils.requestByJson('/rProcessInstance/safeDelet', item, function (resultInfo) {
							SysUtils.handleResult(resultInfo, {'state': $state}, function () {
								console.log($scope.queryBean);
								$scope.queryProInstList();
							});
						});
					})
				} else {
					angular.forEach($scope.selectedProInsts, function (item) {
						angular.element("input#" + item.id).click();
					});
				}
			});
		}
	};

	/**
	 * 单击列表记录弹出监控模态框
	 * @param proInst
	 */
	$scope.doMonitor = function (proInst, nodeId) {
		$scope.proInstance = proInst;
		$scope.hisTaskInfoList = [];
		$scope.hisTaskInfoQueryBean.proInstId = proInst.id;
		$scope.processNodeId = nodeId;
		proInst.dbParams = {nodeId: $scope.processNodeId};
		SysUtils.requestByJson('/rProcessInstance/doMonitor', proInst, function (resultInfo) {
			SysUtils.handleResult(resultInfo, {'state': $state}, function () {
				console.log(resultInfo.additionalInfo.showDetailList);
				$scope.hisTaskInfoList = resultInfo.additionalInfo.historyDetailList;
				$scope.showDetailList = resultInfo.additionalInfo.showDetailList;
				$scope.processNodes = resultInfo.additionalInfo.processNodes;
				$scope.$applyAsync();
			});
		});
		$("#proMonitorDialog").modal('show');
	};

	$scope.proinsCheckCurrent = function (v, event) {
		$scope.showDetailList.forEach(function (value) {
			if (v.id == value.id) {
				value.checked = !value.checked;
				if (value.checked) {
					$scope.selectedHisTasks = [];
					$scope.selectedHisTasks.push(value);
				} else {
					$scope.selectedHisTasks.splice($scope.selectedHisTasks.indexOf(v, 1));
				}
			} else {
				value.checked = false;
			}
		});
		console.log($scope.selectedHisTasks);
	};

	$scope.setSelectedItem = function () {
		$scope.hisTaskInfoList.forEach(function (item) {
			if (item.id == $scope.selectedHisTasks[0].id) {
				item.selected = true;
			}
		});
	};

	$scope.monitorTask = function (op) {
		if ("withdraw" === op) {
			if (!$scope.selectedHisTasks[0].revocable) {
				SysUtils.swalForTips('提示', '请从全部任务最后一条开始撤回!', 'info', function () {
					angular.forEach($scope.selectedHisTasks, function (item) {
						angular.element("input#" + item.id).click();
					});
					$scope.selectedHisTasks = [];
				});
				return;
			}
			if ($scope.selectedHisTasks[0].fromCurrentTask && $scope.hisTaskInfoList.length == 1) {
				SysUtils.swalForTips('提示', '该任务不允许撤回!', 'info', function () {
					angular.forEach($scope.selectedHisTasks, function (item) {
						item.checked = false;
					});
					$scope.selectedHisTasks = [];
				});
				return;
			}
		}
		if (SysUtils.notEmpty($scope.selectedHisTasks, [])) {
			$scope.setSelectedItem();
			SysUtils.requestByJson('/processMonitor/monitorTask/' + op, $scope.hisTaskInfoList, function (resultInfo) {
				SysUtils.handleResult(resultInfo, {'state': $state}, function () {
					$scope.selectedHisTasks = [];
					$scope.processNodeId = null;
					$scope.doMonitor($scope.proInstance, null);
				});
			});
		}
	};

	//流转任务相关定义
	$scope.participantTypeName = {
		NodeSetting: '可选人员'
	};
	$scope.availableOps = [];
	$scope.candidatMapKeyList = [];
	$scope.selectedOp = null;
	$scope.taskId = null;
	$scope.task = {};

	$scope.taskCirculation = function () {
		if (!SysUtils.notEmpty($scope.selectedHisTasks, [])) {
			SysUtils.swalForTips('提示', '请勾选要流转的任务!', 'info', function () {
			});
			return;
		}
		$('#moveWorkflowDialog').modal('show');
		$(".coop div:last").css('height', $(".yxzry_cont").outerHeight());
		$(".coop div:last").css('max-height', $(".yxzry_cont").outerHeight());
		SysUtils.requestByJson('/processMonitor/taskCirculation', $scope.selectedHisTasks[0], function (resultInfo) {
			SysUtils.handleResult(resultInfo, {'state': $state}, function () {
				$scope.task = resultInfo.additionalInfo.task;
				$scope.taskId = $scope.task.id;
				$scope.availableOps = resultInfo.beanList;
				$scope.showOperCandidates($scope.availableOps[0]);
				$scope.$apply();
			});
		});

	};

	$scope.showOperCandidates = function (oper) {
		$scope.selectedOp = oper;
		$scope.selectedCanditList = [];
		if (SysUtils.notEmpty(oper, ['sysCaculteCandidates'])) {
			$scope.selectedCanditList = SysUtils.deepCopy(oper.sysCaculteCandidates);
			$scope.selectedCanditList.forEach(function (value) {
				value.participantName = value.participantName.split(" ")[0];
			})
		}

		angular.forEach($scope.availableOps, function (op, index) {
			op.selectStatus = '';
		});
		$scope.selectedOp.selectStatus = 'on';

		var keyList = ['NodeSetting'];

		$scope.candidatMapKeyList = keyList;
		$scope.currCandidateKey = keyList[0];
		$scope.changeCandidate($scope.currCandidateKey);
		$scope.getRecomSelectedUser($scope.taskId, oper);
	};

	$scope.getRecomSelectedUser = function (taskid, availableOp) {
		SysUtils.requestByJson("/rCurrentTaskInfo/getRecomSelectedUser/" + taskid, availableOp, function (resultInfo) {
			SysUtils.handleResult(resultInfo, {'state': $state}, function () {
				$scope.selectedOp.recomSelectedUsers = resultInfo.bean.recomSelectedUsers;
				$scope.$apply();

			});
		});
	};

	$scope.changeCandidate = function (candidateKey) {
		$scope.currCandidateKey = candidateKey;
		$scope.$applyAsync();
	};

	$scope.showCandidateUserList = function (selectedCandid) {
		if (selectedCandid.expand) {
			selectedCandid.expand = false;
		} else {
			selectedCandid.expand = true;
		}
		console.log(selectedCandid);

		if (selectedCandid.childrenParticipants != null) {
			return;
		}
		var accessUrl = null;
		console.log("=当前55==" + selectedCandid.participantType);
		$scope.currCandidateKey = selectedCandid.participantType;

		if ($scope.currCandidateKey == 'Department')
			accessUrl = "/coreDepartment/read/" + selectedCandid.participantId;
		else if ($scope.currCandidateKey == 'Role')
			accessUrl = "/coreRole/read/" + selectedCandid.participantId;
		else if ($scope.currCandidateKey == 'Post')
			accessUrl = "/corePost/" + selectedCandid.participantId + "/users";

		SysUtils.requestByJson(accessUrl, {}, function (resultInfo) {
			SysUtils.handleResult(resultInfo, {'state': $state}, function () {
				if ($scope.currCandidateKey == 'Department') {
					selectedCandid.childrenParticipants = resultInfo.bean.users;
				} else if ($scope.currCandidateKey == 'Role') {
					selectedCandid.childrenParticipants = resultInfo.bean.users;
				} else if ($scope.currCandidateKey == 'Post') {
					selectedCandid.childrenParticipants = resultInfo.beanList;
				}

				/*if(($scope.currCandidateKey == 'Department'||$scope.currCandidateKey == 'Post')&&selectedCandid.childrenParticipants.length===1){
					//如果只有一个人员则默认选中,只有在部门和岗位下才请求后天拿人员列表

					$scope.moveUserToSelectedAssignee(selectedCandid.childrenParticipants[0]);
				}*/
				$scope.$apply();
			})
		})
	};

	$scope.moveUserToSelectedAssignee = function (selectedUser) {
		//处理接收者类型为单个用户的情况;
		if (SysUtils.notEmpty($scope.selectedOp, ['taskInitType'])) {
			if ($scope.selectedOp.taskInitType == 'single') {
				$scope.selectedCanditList = [];
			}
		} else {
			$scope.selectedCanditList = [];

		}

		console.log(selectedUser);

		if (SysUtils.notEmpty($scope.selectedOp, ['taskInitType'])) {
			if ($scope.selectedOp.taskInitType == 'multiple') {
				$scope.selectedCanditList = $scope.selectedCanditList.filter(function (value) {
					return !((value.participantId == selectedUser.participantId) && (value.participantType == selectedUser.participantType));
				});
			}
		}

		$scope.selectedCanditList.push({
			participantId: selectedUser.participantId,
			participantName: selectedUser.participantName.split(" ")[0],
			participantType: selectedUser.participantType,
		});
	};

	$scope.removeFromSelected = function ($index) {
		$scope.selectedCanditList.splice($index, 1);
	};

	$scope.changeWorkflow = function () {
		//判断已选列表是否为空
		if ($scope.selectedCanditList === null || $scope.selectedCanditList.length === 0) {
			return;
		}
		var workflowInfo = {
			id: $scope.taskId,
			operationId: $scope.selectedOp.id,
			assigneeList: $scope.selectedCanditList,
			taskCreateMode: $scope.selectedOp.taskCreateMode,
			processMonitor: true
		};

		console.log(workflowInfo);
		SysUtils.requestByJson("/rCurrentTaskInfo/changeWorkflow", workflowInfo, function (resultInfo) {
			$('#moveWorkflowDialog').modal('hide');
			SysUtils.handleResult(resultInfo, {'state': $state}, function () {
				$scope.doMonitor($scope.proInstance, null);
			});
		})

	};

	$('#queryModal').on('shown.bs.modal', function () {
		$('#createTime').datepicker({
			format: 'yyyy-mm-dd',
			autoclose: true,
			clearBtn: true
		}).on('show', function () {
			if ($('#createTimeEnd').val() == '') {
				$('#createTime').datepicker('setEndDate', null);
			}
		}).on('changeDate', function (e) {
			if (e.date) {
				$('#createTimeEnd').datepicker('setStartDate', new Date(e.date.valueOf()));
			} else {
				$('#createTimeEnd').datepicker('setStartDate', null);
			}
		});
		$('#createTimeEnd').datepicker({
			format: 'yyyy-mm-dd',
			autoclose: true,
			clearBtn: true
		}).on('show', function () {
			if ($('#createTime').val() == '') {
				$('#createTimeEnd').datepicker('setStartDate', null);
			}
		}).on('changeDate', function (e) {
			if (e.date) {
				$('#createTime').datepicker('setEndDate', new Date(e.date.valueOf()));
			} else {
				$('#createTime').datepicker('setEndDate', null);
			}
		});
	});

	$scope.nodeTrClick = function (parentNode, selfNode, siblingNodes, sonNodes, event) {
		NodeTreeTool.relatedCheck(parentNode, selfNode, siblingNodes, sonNodes);
		/*根据需要统计选中结果*/
		$scope.selectedProInsts = NodeTreeTool.checkedCount(parentNode, selfNode, siblingNodes, sonNodes, $scope.selectedProInsts);
		$scope.selectedProInsts = $scope.selectedProInsts.filter(function (item) {
			return SysUtils.nonEmptyCheck(item.id);
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
		$scope.calculatedHeight();
	}, 500);

}]);