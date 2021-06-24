myApp.controller('meetingroomArrangeCtrl', ['$rootScope','$scope', 'ENV', '$state', 'dataFactory', 'NodeTreeTool', 'SysUtils', function ($rootScope, $scope, ENV, $state, dataFactory, NodeTreeTool, SysUtils) {

	console.log("meetingroomArrangeCtrl");

	/*************************一、变量定义****************************/
	$rootScope.indexNoMagin = true;
	$scope.queryBean = {paging: 'No',flag: "1", meetingDateQuery: new Date()};

	$scope.meetingrooms = [];
	$scope.data = [];
	$scope.dates = [];
	$scope.meetingRoomId = '';
	$scope.formPath = null;
	$scope.formTempPath = "apps/meetingroomMng/arrange/";
	$scope.currTab = 'summary';
	$scope.meetingDateQueryPre = '';
	$scope.meetingDateQueryStr = '';
	$scope.meetingDateQueryNext = '';
	$scope.tabList = [
		{id: 'summary', val: '汇总表'},
		{id: 'pivot', val: '透视表'}
	]

	/*************************二、函数定义****************************/
	$scope.getMeetingRoomArrange = function (meetingroom) {
		console.log("查询会议室会议安排");
		$scope.queryBean.meetingRoomId = meetingroom.id;
		$scope.requstPivot();
	};

	/**
	 * 透视表
	 */
	$scope.requstPivot = function() {
		SysUtils.requestByJson('/formJxwhuiyi/meetingroomArrangePivot', $scope.queryBean, function (resultInfo) {
			SysUtils.handleResult(resultInfo, {'state': $state}, function () {
				$scope.meetingrooms = resultInfo.beanList;
				$scope.dates = resultInfo.additionalInfo.dates;
				$scope.data = resultInfo.additionalInfo.data;
				$scope.meetingDateQueryStr = resultInfo.additionalInfo.dateStr;
				$scope.meetingRoomId = $scope.queryBean.meetingRoomId;
				$scope.$apply();
			});
		});
	};

	/**
	 * 汇总表
	 */
	$scope.requestSummary = function (currentDate) {
		$scope.queryBean.meetingStartTime = currentDate;
		SysUtils.requestByJson('/formJxwhuiyi/checkMeetingRoomArrange', $scope.queryBean, function (resultInfo) {
			SysUtils.handleResult(resultInfo, {'state': $state}, function () {
				console.log(resultInfo.beanList);
				$scope.meetingRoomArrangeList = resultInfo.beanList;
				$scope.dateList = resultInfo.bean.dateList;
				$scope.meetingDateQueryStr = resultInfo.additionalInfo.current;
				$scope.meetingDateQueryPre = resultInfo.additionalInfo.pre;
				$scope.meetingDateQueryNext = resultInfo.additionalInfo.next;
				$scope.$apply();
			})
		})
	};


	$scope.setFormPath = function () {
		$scope.formPath = $scope.formTempPath + $scope.currTab + ".html";
	};


	$scope.choseCandate = function (tab) {
		$scope.currTab = tab;
		$scope.setFormPath();
		if ("summary" == tab) {
			$scope.requestSummary(new Date().format('yyyy-MM-dd HH:mm'));
		}
		if ("pivot" == tab) {
			$scope.requstPivot()
		}
	};

	$scope.choseCandate($scope.currTab);


	/*************************三、初始化调用****************************/
}]);

