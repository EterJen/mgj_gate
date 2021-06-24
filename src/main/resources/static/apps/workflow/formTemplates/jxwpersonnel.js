myApp.controller('jxwpersonnelCtrl', ['$scope', 'ENV', '$state', '$stateParams',  'SysUtils', 'dataFactory', '$ocLazyLoad', function ($scope, ENV, $state, $stateParams,  SysUtils, dataFactory, $ocLazyLoad) {
	console.log("jxwpersonnelCtrl");

	/*************************一、变量定义****************************/
	var chkTypeVals = {
		types: ['secretPost', 'temporaryPost', 'temporaryHireType', 'retireIdentity', 'departmentalCadre', 'engageType']
	};
	/*************************二、函数定义****************************/
	$scope.fc.initCurrTask = function () {
		chkTypeVals.secretPost = $scope.task.theCommonFormInfo.formJxwPersonnel.secretPost;
		chkTypeVals.temporaryPost = $scope.task.theCommonFormInfo.formJxwPersonnel.temporaryPost;
		chkTypeVals.temporaryHireType = $scope.task.theCommonFormInfo.formJxwPersonnel.temporaryHireType;
		chkTypeVals.retireIdentity = $scope.task.theCommonFormInfo.formJxwPersonnel.retireIdentity;
		chkTypeVals.departmentalCadre = $scope.task.theCommonFormInfo.formJxwPersonnel.departmentalCadre;
		chkTypeVals.engageType = $scope.task.theCommonFormInfo.formJxwPersonnel.engageType;
		angular.forEach(chkTypeVals.types, function (type) {
			if (SysUtils.notEmpty(chkTypeVals[type])) {
				$scope.personnelChk[type].types.forEach(function (value) {
					if (chkTypeVals[type] === value) {
						$scope.personnelChk[type][value] = true;
					}
				});
			}
		});
		$scope.$applyAsync();
	};

	/**
	 * 保存表单前校验
	 * @returns {{msg: string, flag: boolean, errorCallFun: null}}
	 */
	/*$scope.fc.preSaveForm = function () {
		var obj = {
			flag        : false,
			msg         : '',
			errorCallFun: null
		};
		var temporaryHireStartDate = $scope.task.theCommonFormInfo.formJxwPersonnel.temporaryHireStartDate;
		var temporaryHireEndDate = $scope.task.theCommonFormInfo.formJxwPersonnel.temporaryHireEndDate;
		if (temporaryHireStartDate > temporaryHireEndDate) {
			obj.flag = true;
			obj.msg = "临时借（聘）用起始日期不能大于终止日期!";
		}
		return obj;
	};*/

	/**
	 * 点击流转校验
	 * @returns {{msg: string, flag: boolean, errorCallFun: null}}
	 */
	$scope.fc.perBeforeFlowDeal = function () {
		var obj = {
			flag        : false,
			msg         : '',
			errorCallFun: null
		};
		var temporaryHireStartDate = $scope.task.theCommonFormInfo.formJxwPersonnel.temporaryHireStartDate;
		var temporaryHireEndDate = $scope.task.theCommonFormInfo.formJxwPersonnel.temporaryHireEndDate;
		if (temporaryHireStartDate > temporaryHireEndDate) {
			obj.flag = true;
			obj.msg = "临时借（聘）用起始日期不能大于终止日期!";
		}
		if (SysUtils.isEmpty($scope.task.theCommonFormInfo.formJxwPersonnel.engageType)) {
			obj.flag = true;
			obj.msg = "请选择聘用类型";
		}
		return obj;
	};

    /*************************三、初始化调用****************************/

}]);


