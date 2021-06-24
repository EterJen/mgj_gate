myApp.controller('leaderWorkArrangeCtrl', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils', 'dataFactory', 'NodeTreeTool', 'maxHeigtTool','$stateParams', function ($rootScope, $scope, ENV, $state, SysUtils, dataFactory, NodeTreeTool, maxHeigtTool,$stateParams) {

	/*************************一、变量定义****************************/
	$rootScope.addBgground = true;
	$scope.queryBean = {paging: 'Yes',dbParams:{}};
	$scope.modeType = $stateParams.modeType;
	$scope.leaderDept = [];
	$scope.proInstList = [];
	$scope.dateList = [];
	$scope.dataList = [];
	$scope.deptcname = '';
	$scope.currentWeekStr = '';
	$scope.preWeek = '';
	$scope.currentWeek = '';
	$scope.nextWeek = '';
	$scope.leaderList = [];
	$scope.starttimeHours = [
		{label: '07', val: '7'},{label: '08', val: '8'},{label: '09', val: '9'},{label: '10', val: '10'},{label: '11', val: '11'},
		{label: '12', val: '12'},{label: '13', val: '13'},{label: '14', val: '14'},{label: '15', val: '15'},{label: '16', val: '16'},
		{label: '17', val: '17'},{label: '18', val: '18'},{label: '19', val: '19'},{label: '20', val: '20'}
	];
	$scope.minutes = [
		{label: '00', val: '0'},{label: '10', val: '10'},{label: '15', val: '15'},{label: '20', val: '20'},
		{label: '30', val: '30'},{label: '40', val: '40'},{label: '45', val: '45'},{label: '50', val: '50'}
	];
	$scope.endtimeHours = [
		{label: '未定', val: '0'},{label: '08', val: '8'},{label: '09', val: '9'},{label: '10', val: '10'},{label: '11', val: '11'},
		{label: '12', val: '12'},{label: '13', val: '13'},{label: '14', val: '14'},{label: '15', val: '15'},{label: '16', val: '16'},
		{label: '17', val: '17'},{label: '18', val: '18'},{label: '19', val: '19'},{label: '20', val: '20'},{label: '21', val: '21'},
		{label: '22', val: '22'}
	];
	$scope.treeData = null;
	$scope.currDepartUserList = [];
	$scope.nodeId = '';
	$scope.data = [];
	$scope.agentList = [];
	$scope.agentLeaderList = [];
	$scope.user = {};
	$scope.username = '';
	$scope.detailWeek = {};
	$scope.leaderWorkArrangeOfWeek = []; //一周活动安排模态框领导工作安排
	$scope.actionItemList = [];         //活动细目
	$scope.userid = null;
	$scope.date = null;
	/*************************二、函数定义****************************/

	$scope.query = function (currentDate) {
		console.log($stateParams.modeType);
		$scope.queryBean = {paging: 'Yes',dbParams:{}};
		$scope.queryBean.queryDate = currentDate;
		$scope.queryBean.dbParams.modeType = $scope.modeType;
		SysUtils.requestByJson('/leaderWorkArrange/query', $scope.queryBean, function (resultInfo) {
			SysUtils.handleResult(resultInfo, {'state': $state}, function () {
				console.log(resultInfo);
				$scope.dateList = resultInfo.additionalInfo.dateList;
				$scope.dataList = resultInfo.beanList;
				$scope.leaderDept = resultInfo.additionalInfo.leaderDept;
				$scope.preWeek = resultInfo.additionalInfo.preWeek;
				$scope.currentWeek = resultInfo.additionalInfo.currentWeek;
				$scope.nextWeek = resultInfo.additionalInfo.nextWeek;
				$scope.detailWeek = resultInfo.additionalInfo.detailWeek;
				$scope.$apply();
			});
		});
	};

	$scope.initParamsAndQuery = function (date) {
		$scope.queryBean = {paging: 'Yes'};
		$scope.query(date);
	};

	$scope.openCreateArrangeDialog = function (arrange, userid, date) {
		$scope.queryBean = {};
		//$scope.actionItemList = [];
		if (!SysUtils.isEmpty(arrange)) {
			$scope.queryBean = SysUtils.deepCopy(arrange);
			$scope.userid = arrange.userid;
			$scope.date = arrange.startday;
		}
		if (!SysUtils.isEmpty(userid)) {
			$scope.queryBean.userid = userid;
			$scope.userid = userid;
		}
		if (!SysUtils.isEmpty(date)) {
			$scope.queryBean.queryDate = date.substr(date.indexOf(">") + 1);
			$scope.date = $scope.queryBean.queryDate;
		}
		SysUtils.requestByJson('/leaderWorkArrange/initCreateOrUpdate', $scope.queryBean, function (resultInfo) {
			SysUtils.handleResult(resultInfo, {'state': $state}, function () {
				console.log(resultInfo);
				$scope.leaderList = resultInfo.beanList;
				angular.forEach($scope.leaderList, function (item) {
					if (item.selectMode === 'selected') {
						$scope.user = item;
					}
				});
				$scope.queryBean = resultInfo.additionalInfo.queryBean;
				$scope.queryBean.userid = $scope.user.id;
				$scope.queryBean.usercname = $scope.user.name;
				$scope.actionItemList = resultInfo.additionalInfo.actionItemList;
				angular.forEach($scope.leaderList, function (leader) {
					if (leader.id === $scope.user.id) {
						$scope.deptcname = leader.department.name;
						$scope.queryBean.deptid = leader.department.id;
						$scope.queryBean.deptcname = leader.department.name
					}
				});
				$scope.$apply();
				$("#createArrangeDialog").modal('show');

			});
		});
	};

	/**
	 * 创建工作安排模态框姓名下拉列表选择用户改变其对应的部门
	 * @param user
	 */
	$scope.changeUser = function (user) {
		console.log(user);
		$scope.queryBean.userid = user.id;
		$scope.queryBean.usercname = user.name;
		$scope.queryBean.deptid = user.department.id;
		$scope.queryBean.deptcname = user.department.name;
		$scope.deptcname = user.department.name;
	};

	/**
	 * 点击领导弹出对应的一周工作安排模态框
	 * @param arrange
	 */
	$scope.showDetailArrangeDialog = function (arrange) {
		console.log(arrange);
		if (arrange.name.length > 2) {
			$scope.username = arrange.name.substr(1);
		} else {
			$scope.username = arrange.name;
		}
		$scope.queryBean.userid = arrange.id;
		$scope.queryBean.usercname = arrange.name;
		$scope.queryBean.queryDate = $scope.detailWeek;
		SysUtils.requestByJson('/leaderWorkArrange/showDetailArrangeByLeader', $scope.queryBean, function (resultInfo) {
			SysUtils.handleResult(resultInfo, {'state': $state}, function () {
				$scope.leaderWorkArrangeOfWeek = resultInfo.additionalInfo.data;
				$scope.currentWeekStr = resultInfo.additionalInfo.currentWeekStr;
				$scope.$apply();
				$("#detailArrangeModal").modal('show');
			});
		});

	};

	/**
	 * 点击"授权"按钮弹出管理授权模态框
	 */
	$scope.agentAuth = function () {
		$scope.queryBean = {paging: 'No'};
		$scope.agentList = [];
		$scope.currDepartUserList = [];
		SysUtils.requestByJson('/leaderWorkArrange/authManage', $scope.queryBean, function (resultInfo) {
			SysUtils.handleResult(resultInfo, {'state': $state}, function () {
				$scope.treeData = resultInfo.additionalInfo.depts;
				console.log(resultInfo);
				angular.forEach(resultInfo.additionalInfo.agents, function (item) {
					$scope.agentList.push({
						id: item.id,
						name: item.name
					});
				});
				$scope.agentLeaderList = resultInfo.additionalInfo.leaders;
				$scope.$apply();
				$('#agentAuthDialog').modal('show');
			});
		});
	};

	$scope.selectCandidate = function (node) {
		$scope.nodeId = node.id;
		var readUrl = "/coreDepartment/read/" + node.id;
		SysUtils.requestByJson(readUrl, {}, function (resultInfo) {
			$scope.currDepartUserList = resultInfo.bean.users;
			$scope.$apply();
		});
	};

	/**
	 * 领导工作安排授权模态框 部门人员列表 点击人员，选进已选列表
	 * @param user
	 */
	$scope.selectUserCandidate = function (user) {
		$scope.agentList = $scope.agentList.filter(function (value) {
			return !(value.id == user.id);
		});
		$scope.agentList.push({
			id: user.id,
			name: user.name
		});
		$scope.$applyAsync();
	};

	/**
	 * 领导工作安排授权模态框 已选列表 点击人员，从已选列表移除该人员
	 * @param $index
	 */
	$scope.removeFromSelected = function ($index) {
		$scope.agentList.splice($index, 1);
	};

	/**
	 * 领导工作安排授权模态框"确定"操作
	 */
	$scope.saveAgent = function () {
		console.log($scope.agentList);
		SysUtils.requestByJson('/leaderWorkArrange/saveAgent', $scope.agentList, function (resultInfo) {
			SysUtils.handleResult(resultInfo, {'state': $state}, function () {
				$('#agentAuthDialog').modal('hide');
			});
		});
	};

	$scope.valid = function () {
		var obj = {flag: false, msg: ''};
		if ($scope.queryBean.startday > $scope.queryBean.endday) {
			obj.flag = true;
			obj.msg = '开始日期不允许大于结束日期';
		}
		return obj;
	};

	/**
	 * 保存工作安排
	 * @param modal
	 */
	$scope.saveArrange = function (modal) {
		console.log($scope.queryBean);
		var valid = $scope.valid();
		if (valid.flag) {
			SysUtils.swalForTips('提示', valid.msg, 'info', function () {
			});
			return;
		}
		SysUtils.requestByJson('/leaderWorkArrange/saveArrange', $scope.queryBean, function (resultInfo) {
			SysUtils.handleResult(resultInfo, {'state': $state}, function () {
				$scope.initParamsAndQuery($scope.detailWeek);
				if (!SysUtils.isEmpty(modal)) {
					$('#' + modal).modal('hide');
				}
			});
		});
	};

	/**
	 * 更改工作安排
	 * @param modal
	 */
	$scope.updateArrange = function (modal) {
		var valid = $scope.valid();
		if (valid.flag) {
			SysUtils.swalForTips('提示', valid.msg, 'info', function () {
			});
			return;
		}
		SysUtils.requestByJson('/leaderWorkArrange/updateArrange', $scope.queryBean, function (resultInfo) {
			SysUtils.handleResult(resultInfo, {'state': $state}, function () {
				$scope.initParamsAndQuery($scope.detailWeek);
				if (!SysUtils.isEmpty(modal)) {
					$('#' + modal).modal('hide');
				}
			});
		});
	};

	/**
	 * 删除工作安排
	 * @param modal
	 */
	$scope.deleteArrange = function (modal) {
		console.log($scope.queryBean);
		SysUtils.swalConfirm('提示', '确定删除吗?','info',function (isConfirm) {
			if (isConfirm) {
				SysUtils.requestByJson('/leaderWorkArrange/deleteArrange', $scope.queryBean, function (resultInfo) {
					SysUtils.handleResult(resultInfo, {'state': $state}, function () {
						$scope.initParamsAndQuery($scope.detailWeek);
						if (!SysUtils.isEmpty(modal)) {
							$('#' + modal).modal('hide');
						}
					});
				});
			}
		})
	};

	/**
	 * 导出
	 */
	$scope.exportArrange = function () {
		$scope.queryBean = {dbParams:{}};
		$scope.queryBean.queryDate = $scope.detailWeek;
		$scope.queryBean.paging = 'No';
		$scope.queryBean.dbParams.modeType = $scope.modeType;
		var url = ENV.localapi + "/leaderWorkArrange/exportArrange";
		var value = JSON.stringify($scope.queryBean);
		var form = $("<form>");   //定义一个form表单
		form.attr('style', 'display:none');   //在form表单中添加查询参数
		form.attr('target', '');
		form.attr('method', 'post');
		form.attr('action', url);
		var input1 = $('<input>');
		input1.attr('type', 'hidden');
		input1.attr('name', 'arrange');
		input1.attr('value', value);
		$('body').append(form);  //将表单放置在web中
		form.append(input1);   //将查询参数控件提交到表单上
		form.submit();
	};

	$scope.print = function () {
		SysUtils.swalConfirm('提示', '要打印吗？', 'info', function (isConfirm) {
			if (isConfirm) {
				$("#arrangeDetail").printArea();
			} else {
				swal.close();
			}
		})
	};

	$('#detailArrangeModal').on('shown.bs.modal', function () {
		setTimeout(function () {
			$scope.print();
		}, 500);

	});

	$('#createArrangeDialog').on('shown.bs.modal', function () {
		$('#startday').datepicker({
			format: 'yyyy-mm-dd',
			autoclose : true,
			clearBtn: true
		}).on('show',function(e){
			if ($('#endday').val() == '') {
				$('#startday').datepicker('setEndDate', null);
			}
		}).on('changeDate',function(e){
			if (e.date) {
				$('#endday').datepicker('setStartDate', new Date(e.date.valueOf()));
			} else {
				$('#endday').datepicker('setStartDate', null);
			}
		});
		$('#endday').datepicker({
			format: 'yyyy-mm-dd',
			autoclose : true,
			clearBtn: true
		}).on('show',function(e){
			if ($('#startday').val() == '') {
				$('#endday').datepicker('setStartDate', null);
			}
		}).on('changeDate',function(e){
			if (e.date) {
				$('#startday').datepicker('setEndDate', new Date(e.date.valueOf()));
			} else {
				$('#startday').datepicker('setEndDate', null);
			}
		});
	});


	/*************************三、初始化调用****************************/
	$scope.query(new Date());

	/*计算布局高度*/
	$scope.calculatedHeight = function () {
		$('.content-wrapper').css('height', SysUtils.get_content_wrapper());
		$('#panel-body-table').css('height', $('.content').height() - $('#panel-heading').outerHeight(true) - $('#bmxx_tit').height() - $("#title").height() - $('#bmxx_tit').height()/2);
		$('.table_shadow').css('max-height', $('.content').height() - $('#panel-heading').outerHeight(true) - $('#bmxx_tit').height() - $("#title").height() - $('#bmxx_tit').height()/2);
	};

	setTimeout(function () {
		$scope.calculatedHeight();
	}, 500);


}]);