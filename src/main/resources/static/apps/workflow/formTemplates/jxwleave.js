myApp.controller('jxwleaveCtrl', ['$scope', 'ENV', '$state', '$stateParams',  'SysUtils', 'dataFactory', '$ocLazyLoad', function ($scope, ENV, $state, $stateParams,  SysUtils, dataFactory, $ocLazyLoad) {
	console.log("jxwleaveCtrl");

	/*************************一、变量定义****************************/

	/*************************二、函数定义****************************/


	$scope.fc.initCurrTask = function () {
		var type = $scope.task.theCommonFormInfo.formJxwLeave.leaveType;
		if (SysUtils.notEmpty(type)) {
			$scope.leaveTypes.allType.forEach(function (value) {
				if (type === value) {
					$scope.leaveTypes[value] = true;
				}
			});
		}
		var departure = $scope.task.theCommonFormInfo.formJxwLeave.departure;
		if ('Yes' === departure) {
			$scope.departure = true;
		}
		$scope.$applyAsync();
	};

	$scope.fc.perBeforeFlowDeal = function () {
		var obj = {
			flag        : false,
			msg         : '',
			errorCallFun: null
		};
		if (!SysUtils.nonEmptyCheck($scope.task.theCommonFormInfo.formJxwLeave.leaveType)) {
			obj.flag = true;
			obj.msg = "请选择休假类别!";
			return obj;
		}
		if (!SysUtils.nonEmptyCheck($scope.task.theCommonFormInfo.formJxwLeave.leaveStartDate) ||
			!SysUtils.nonEmptyCheck($scope.task.theCommonFormInfo.formJxwLeave.leaveEndDate)) {
			obj.flag = true;
			obj.msg = "请选择请假日期!";
			return obj;
		}
		if ($scope.task.theCommonFormInfo.formJxwLeave.leaveEndDate < $scope.task.theCommonFormInfo.formJxwLeave.leaveStartDate) {
			obj.flag = true;
			obj.msg = "请假结束日期不允许小于请假开始日期!";
			return obj;
		}
		if (!SysUtils.nonEmptyCheck($scope.task.theCommonFormInfo.formJxwLeave.leaveDays)) {
			obj.flag = true;
			obj.msg = "请填写请假天数!";
			return obj;
		}
		if (new Date($scope.task.theCommonFormInfo.formJxwLeave.leaveStartDate).getFullYear() <
			new Date($scope.task.theCommonFormInfo.formJxwLeave.leaveEndDate).getFullYear()) {
			if ($scope.task.theCommonFormInfo.formJxwLeave.leaveDays.trim().indexOf(" ") < 0) {
				obj.flag = true;
				obj.msg = "请假日期跨年,请自行分配请假天数并以空格分隔!";
				return obj;
			}
		} else {
			if ($scope.task.theCommonFormInfo.formJxwLeave.leaveDays.trim().indexOf(" ") > 0) {
				obj.flag = true;
				obj.msg = "请假日期未跨年,请假天数勿以空格分隔!";
				return obj;
			}
		}
		if ($scope.departure && $scope.task.belongingNodeId === '1') {
			if (!SysUtils.nonEmptyCheck($scope.task.theCommonFormInfo.formJxwLeave.departureCause)) {
				obj.flag = true;
				obj.msg = "请填写出境事由!";
				return obj;
			}
			if (!SysUtils.nonEmptyCheck($scope.task.theCommonFormInfo.formJxwLeave.departureDestination)) {
				obj.flag = true;
				obj.msg = "请填写出境目的地!";
				return obj;
			}
			if (!SysUtils.nonEmptyCheck($scope.task.theCommonFormInfo.formJxwLeave.departureDays)) {
				obj.flag = true;
				obj.msg = "请填写出境天数!";
				return obj;
			}
			if (!SysUtils.nonEmptyCheck($scope.task.theCommonFormInfo.formJxwLeave.departureStartDate)) {
				obj.flag = true;
				obj.msg = "请选择出境开始日期!";
				return obj;
			}
			if (!SysUtils.nonEmptyCheck($scope.task.theCommonFormInfo.formJxwLeave.departureEndDate)) {
				obj.flag = true;
				obj.msg = "请选择出境结束日期!";
				return obj;
			}
			if ($scope.task.theCommonFormInfo.formJxwLeave.departureEndDate < $scope.task.theCommonFormInfo.formJxwLeave.departureStartDate) {
				obj.flag = true;
				obj.msg = "出境结束日期不允许小于出境开始日期!";
				return obj;
			}
		}
		return obj;
	};

    /*************************三、初始化调用****************************/


}]);


