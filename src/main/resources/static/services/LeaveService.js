myApp.service('LeaveService', function (SysUtils) {

	var _this = this;

	_this.leaveTypes = {
		allType   : ['affair', 'sick', 'annual', 'family', 'marriage', 'funeral', 'fertility', 'escort', 'other'],
		affair    : false,
		sick      : false,
		annual    : false,
		family    : false,
		marriage  : false,
		funeral   : false,
		fertility : false,
		escort    : false,
		other     : false
	};

	/**
	 * 返回请假类型
	 */
	this.getLeaveTypes = function () {
		return _this.leaveTypes;
	};

	/**
	 * 选择请假类型
	 */
	this.choseLeaveType = function (task, type, $event) {
		var currSelect = _this.leaveTypes[type];
		_this.leaveTypes.allType.forEach(function (value) {
			_this.leaveTypes[value] = false;
		});
		if (currSelect) {
			$($event.target).removeClass("checked");
			_this.leaveTypes[type] = true;
			task.theCommonFormInfo.formJxwLeave.leaveType = type;
		} else {
			$($event.target).addClass("checked");
			task.theCommonFormInfo.formJxwLeave.leaveType = null;
		}
		return task;
	};

	/**
	 * 选择是否出境
	 */
	this.choseDeparture = function (task, $event) {
		if ($event.target.checked) {
			SysUtils.swalForTips('提示', '请填写出境事由、目的地等相关信息！', 'info', function () {
			});
			$($event.target).addClass('checked');
			task.theCommonFormInfo.formJxwLeave.departure = 'Yes';
			task.theCommonFormInfo.formJxwLeave.departureCause = task.theCommonFormInfo.formJxwLeave.leaveCause;
		} else {
			$($event.target).removeClass('checked');
			task.theCommonFormInfo.formJxwLeave.departure = null;
			task.theCommonFormInfo.formJxwLeave.departureCause = null;
			task.theCommonFormInfo.formJxwLeave.departureStartDate = null;
			task.theCommonFormInfo.formJxwLeave.departureEndDate = null;
			task.theCommonFormInfo.formJxwLeave.departureDestination = null;
			task.theCommonFormInfo.formJxwLeave.departureDays = null;
		}
		return task;
	}


});