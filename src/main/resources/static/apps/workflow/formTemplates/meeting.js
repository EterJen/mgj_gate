myApp.controller('meetingCtrl', ['$scope', 'ENV', '$state', '$stateParams',  'SysUtils', 'dataFactory', '$ocLazyLoad', function ($scope, ENV, $state, $stateParams,  SysUtils, dataFactory, $ocLazyLoad) {
	console.log("meetingCtrl");

	/*************************一、变量定义****************************/

	/*************************二、函数定义****************************/


	$scope.fc.initCurrTask = function () {
		$scope.$applyAsync();
	};

	/**
	 * 校验出席对象是否包含特殊字符
	 * @returns {{flag: boolean, msg: string}}
	 */
	$scope.fc.preSaveForm = function () {
		var thisValid = this;
		var valid = $scope.fc.attendantNameCheck();
		if (valid.flag) {
			SysUtils.swalForTips("提示", valid.msg, "info", function (isConfirm) {
				return false;
			});
		} else {
			return thisValid.nextValidRun();
		}
	};

	/**
	 * 校验出席对象是否包含特殊字符
	 * @returns {{flag: boolean, msg: string}}
	 */
	$scope.fc.attendantNameCheck = function () {
		var result = {flag: false, msg: '', justCallFun: null};
		var attend = $scope.task.theCommonFormInfo.formMeeting.meetingAttend;
		var myReg = /[~!@#$%^&*/\|,，.<>?"';:_+-=\[\]{}]/;
		var receiveDate = $scope.task.theCommonFormInfo.formMeeting.receiveDate;
		var meetingTime = $scope.task.theCommonFormInfo.formMeeting.meetingTime;
		var dateReg= "^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[13579][26])00))-02-29))$";
		var dateTimeReg= "^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[13579][26])00))-02-29))\\s{1}([0-1]?[0-9]|2[0-3]):([0-5][0-9])$";

		if(myReg.test(attend)) {
			result.flag = true;
			result.msg = '出席对象不能包含特殊字符，多个出席对象之间请以一个空格分隔';
			result.justCallFun = '$scope.fc.validFailReturn("' + result.msg + '")';
		}
		if (!receiveDate.match(dateReg)) {
			result.flag = true;
			result.msg = '收到时间格式不正确,请按"yyyy-MM-dd"格式输入';
			result.justCallFun = '$scope.fc.validFailReturn("' + result.msg + '")';
		}
		if (!meetingTime.match(dateTimeReg)) {
			result.flag = true;
			result.msg = '会议时间格式不正确,请按"yyyy-MM-dd HH:mm"格式输入';
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


