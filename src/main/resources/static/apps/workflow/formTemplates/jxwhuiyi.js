myApp.controller('jxwhuiyiCtrl', ['$scope', 'ENV', '$state', '$stateParams',  'SysUtils', 'dataFactory', '$ocLazyLoad', function ($scope, ENV, $state, $stateParams,  SysUtils, dataFactory, $ocLazyLoad) {
	console.log("jxwhuiyiCtrl");

	/*************************一、变量定义****************************/
	$scope.meetingRoomSelectList = [];
	$scope.formJxwhuiyi = {};
	$scope.flag = false;
	/*************************二、函数定义****************************/


	$scope.fc.initCurrTask = function () {
		$scope.$applyAsync();
	};

	/**
	 * 校验会议时间
	 * @returns {{flag: boolean, msg: string}}
	 */
	$scope.fc.preSaveForm = function () {
		if ($scope.fc.cuAct.actionId.indexOf("finish") != -1) {
			return $scope.finishTask();
		}
		var thisValid = this;

		var result = {flag: false, msg: ''};
		var startTime = $scope.task.theCommonFormInfo.formJxwhuiyi.meetingStartTime;
		var endTime = $scope.task.theCommonFormInfo.formJxwhuiyi.meetingEndTime;
		var reg= "^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[13579][26])00))-02-29))\\s{1}([0-1]?[0-9]|2[0-3]):([0-5][0-9])$";
		if (startTime == '') {
			SysUtils.swalForTips("提示", "请填写会议开始时间", "info", function (isConfirm) {
				return false;
			});
		}else
		if (!startTime.match(reg)) {
			SysUtils.swalForTips("提示", "会议开始时间格式不正确或日期时间不合理", "info", function (isConfirm) {
				return false;
			});
		}else
		if (endTime == '') {
			SysUtils.swalForTips("提示", "会议开始时间格式不正确或日期时间不合理", "info", function (isConfirm) {
				return false;
			});

		}else
		if (!endTime.match(reg)) {
			SysUtils.swalForTips("提示", "会议开始时间格式不正确或日期时间不合理", "info", function (isConfirm) {
				return false;
			});
		}else if (startTime <= new Date().format('yyyy-MM-dd HH:mm')) {
			SysUtils.swalForTips("提示", "会议开始时间不允许小于等于当前时间", "info", function (isConfirm) {
				return false;
			});
		} else if (endTime <= startTime) {
			SysUtils.swalForTips("提示", "会议结束时间不允许小于或等于开始时间", "info", function (isConfirm) {
				return false;
			});
		} else {
			$scope.checkMeetingRoomAvailableBeforeSave();
			if ($scope.flag) {
				SysUtils.swalForTips("提示", "会议室【" + $scope.task.theCommonFormInfo.formJxwhuiyi.meetingRoomName + "】已被申请", "error", function (isConfirm) {
					return false;
				});
			} else {
				return thisValid.nextValidRun();
			}
		}
	};

	$scope.checkMeetingRoomAvailableBeforeSave = function () {
		SysUtils.requestByJsonSync('/formJxwhuiyi/checkMeetingRoomAvailable', $scope.task.theCommonFormInfo.formJxwhuiyi, function (resultInfo) {
			SysUtils.handleResult(resultInfo, {state: '$state'}, function () {
				if (resultInfo.beanList.length > 0) {
					$scope.flag = true;
				} else {
					$scope.flag = false;
				}
				$scope.$applyAsync();
			});
		})
	};

	$scope.fc.huiyiChooseCandidate = function (type) {
		console.log($scope.task.theCommonFormInfo.formJxwhuiyi);
		$scope.$parent.type = type;
		if ('obj' == type) {
			$scope.$parent.orgNavType = 'Person';
		}
		if ('leader' == type) {
			$scope.$parent.orgNavType = 'Leader';
		}
		$scope.$parent.currDepartUserList = [];
		$scope.$parent.nodeId = '';
		$scope.queryByType($scope.$parent.orgNavType);
		$('#huiyiCandidateDialog').modal('show');
	};


	$scope.queryByType = function (type) {
		if ($scope.$parent.huiyiCandidateMap == null) {
			$scope.$parent.huiyiCandidateMap = {};
		}
		if ($scope.$parent.huiyiCandidateMap[$scope.$parent.orgNavType] == null) {
			$scope.$parent.huiyiCandidateMap[$scope.$parent.orgNavType] = [];
		}
		$scope.queryBean = {paging: 'No'};
		if (type == 'Leader') {
			$scope.queryBean.nodes = [{paging: 'No', id: 84}, {paging: 'No', id: 75}];
		}
		SysUtils.requestByJson('/coreDepartment/departmentTree', $scope.queryBean, function (resultInfo) {
			$scope.$parent.treeData = resultInfo.beanList;
			console.log($scope.$parent.treeData);
			$scope.$parent.$applyAsync();
		});
	};

	$scope.fc.selectTab = function (tab) {
		$scope.$parent.orgNavType = tab;
		$scope.queryByType(tab);
	};

	$scope.fc.selectCandidate = function (node) {
		$scope.$parent.nodeId = node.id;
		SysUtils.requestByJson("/coreDepartment/read/" + node.id, {}, function (resultInfo) {
			$scope.$parent.currDepartUserList = resultInfo.bean.users;
			$scope.$apply();
		});
	};

	$scope.fc.selectUserCandidate = function (user) {
		$scope.$parent.huiyiCandidateMap[$scope.$parent.orgNavType] = $scope.$parent.huiyiCandidateMap[$scope.$parent.orgNavType].filter(function (value) {
			return !(value.id == user.id);
		});
		//TODO:去重复的；
		$scope.$parent.huiyiCandidateMap[$scope.$parent.orgNavType].push({
			id: user.id,
			name: user.name
		});
		$scope.$applyAsync();
	};

	$scope.fc.huiyiRemoveFromSelected = function ($index) {
		$scope.$parent.huiyiCandidateMap[$scope.$parent.orgNavType].splice($index, 1);
	};

	$scope.fc.saveHuiyiCandidate = function () {
		var names = '';
		var ids = '';
		angular.forEach($scope.$parent.huiyiCandidateMap[$scope.$parent.orgNavType], function (item) {
			names += item.name + ' ';
			ids += item.id + ',';
		});
		console.log(JSON.stringify($scope.$parent.huiyiCandidateMap[$scope.$parent.orgNavType]));
		if ('' != names) {
			names = names.substr(0, names.length - 1);
		}
		if ('' != ids) {
			ids = ids.substr(0, ids.length - 1);
		}
		if ($scope.$parent.orgNavType == 'Person') {
			$scope.task.theCommonFormInfo.formJxwhuiyi.meetingAttendObj = JSON.stringify($scope.$parent.huiyiCandidateMap['Person']);
			$scope.task.theCommonFormInfo.formJxwhuiyi.meetingAttendObjName = names;
			$scope.task.theCommonFormInfo.formJxwhuiyi.meetingAttendObjId = ids;
		}
		if ($scope.$parent.orgNavType == 'Leader') {
			$scope.task.theCommonFormInfo.formJxwhuiyi.meetingAttendLeader = JSON.stringify($scope.$parent.huiyiCandidateMap['Leader']);
			$scope.task.theCommonFormInfo.formJxwhuiyi.meetingAttendLeaderName = names;
			$scope.task.theCommonFormInfo.formJxwhuiyi.meetingAttendLeaderId = ids;
		}
		$scope.$parent.$applyAsync();
		console.log($scope.task.theCommonFormInfo.formJxwhuiyi);
		$('#huiyiCandidateDialog').modal('hide');
	};

	$scope.fc.informMeeting = function () {
		$scope.checkMeetingRoomAvailableBeforeSave();
		if ($scope.flag) {
			SysUtils.swalForTips("提示", "会议室【" + $scope.task.theCommonFormInfo.formJxwhuiyi.meetingRoomName + "】已被申请", "error", function (isConfirm) {
				return false;
			});
		}
		SysUtils.requestByJson('/formJxwhuiyi/informMeeting', $scope.task, function (resultInfo) {
			SysUtils.handleResult(resultInfo, {'state': $state}, function () {
				SysUtils.swalForTips('提示', resultInfo.message,'info', function (isConfirm) {
					window.close();
					window.opener.location.reload();
				})
			});
		});
		console.log($scope.task.theCommonFormInfo.formJxwhuiyi);
	};


	/**
	 * 校验出席对象是否包含特殊字符
	 * @returns {{flag: boolean, msg: string}}
	 */
	$scope.fc.attendantNameCheck = function () {
		var result = {flag: false, msg: '', justCallFun: null};
		var attendObj = $scope.task.theCommonFormInfo.formJxwhuiyi.meetingAttendObjName;
		var attendLeader = $scope.task.theCommonFormInfo.formJxwhuiyi.meetingAttendLeaderName;
		var myReg = /[~!@#$%^&*/\|,，.<>?"';:_+-=\[\]{}]/;

		if(myReg.test(attendObj) || myReg.test(attendLeader)) {
			result.flag = true;
			result.msg = '出席对象不能包含特殊字符，多个出席对象之间请以一个空格分隔';
			result.justCallFun = '$scope.fc.validFailReturn("' + result.msg + '")';
		}
		return result;
	};


	$scope.fc.validFailReturn = function (msg) {
		SysUtils.swalForTips('提示', msg, 'info', function (isConfirm) {
		});
	};
    /*************************三、初始化调用****************************/


}]);


