myApp.controller('yscgjshengpiCtrl', ['$scope', 'ENV', '$state', '$stateParams',  'SysUtils', 'dataFactory', '$ocLazyLoad', function ($scope, ENV, $state, $stateParams,  SysUtils, dataFactory, $ocLazyLoad) {

	/*************************一、变量定义****************************/
	var chkTypeVals = {
		types: ['secretPost', 'temporaryPost', 'temporaryHireType', 'retireIdentity', 'departmentalCadre', 'engageType']
	};
	/*************************二、函数定义****************************/
	$scope.fc.initCurrTask = function () {
		$scope.fc.yscgReason = {
		    types:['travel','visRelatives','other'],
			cursorType : "cursor-pointer",
			cleanModel: 'task.theCommonFormInfo.formYscgjshengpi.otherReason',
            bindAtt:"task.theCommonFormInfo.formYscgjshengpi.reason",
			isAbleEdit: true,
			travel: false,
			visRelatives: false,
			other: false,
		};
		if (SysUtils.notEmpty($scope.fc.formFieldControlMap,['出国事由','isAbleEdit'])) {
			if ($scope.task.status == 'NotAccepted' || 'false' == $scope.fc.formFieldControlMap.出国事由.isAbleEdit) {
				$scope.fc.yscgReason.isAbleEdit = false;
				$scope.fc.yscgReason.cursorType = "cursor-not-allowed";
			}
		}
		$scope.fc.yscgReason[$scope.task.theCommonFormInfo.formYscgjshengpi.reason] = true;

		$scope.fc.userType = {
			types:['inPost','directly','retirement'],
			cursorType : "cursor-pointer",
			isAbleEdit: true,
			bindAtt:"task.theCommonFormInfo.formYscgjshengpi.userType",
			bindAttChange:"userTypeChenge",
			notNull:true,
			inPost: false,
			directly: false,
			retirement: false,
		};
		if (SysUtils.notEmpty($scope.fc.formFieldControlMap,['人员类别','isAbleEdit'])) {
			if ($scope.task.status == 'NotAccepted' || 'false' == $scope.fc.formFieldControlMap.人员类别.isAbleEdit) {
				$scope.fc.userType.isAbleEdit = false;
				$scope.fc.userType.cursorType = "cursor-not-allowed";
			}
		}
		$scope.fc.userType[$scope.task.theCommonFormInfo.formYscgjshengpi.userType] = true;

		$scope.fc.certificates = {
			types:['newCreate','newReceive','other'],
			cursorType : "cursor-pointer",
			cleanModel: 'task.theCommonFormInfo.formYscgjshengpi.otherCertificates',
			bindAtt:"task.theCommonFormInfo.formYscgjshengpi.certificates",
			isAbleEdit: true,
			newCreate: false,
			newReceive: false,
			other: false,
		};
		if (SysUtils.notEmpty($scope.fc.formFieldControlMap,['证件情况','isAbleEdit'])) {
			if ($scope.task.status == 'NotAccepted' || 'false' == $scope.fc.formFieldControlMap.证件情况.isAbleEdit) {
				$scope.fc.certificates.isAbleEdit = false;
				$scope.fc.certificates.cursorType = "cursor-not-allowed";
			}
		}
		$scope.fc.certificates[$scope.task.theCommonFormInfo.formYscgjshengpi.certificates] = true;

		$scope.fc.certificateType = {
			types:['passport','HongKong','Taiwan'],
			cursorType : "cursor-pointer",
			bindAtt:"task.theCommonFormInfo.formYscgjshengpi.certificateType",
			isAbleEdit: true,
			passport: false,
			HongKong: false,
			Taiwan: false,
		};
		if (SysUtils.notEmpty($scope.fc.formFieldControlMap,['证件类别','isAbleEdit'])) {
			if ($scope.task.status == 'NotAccepted' || 'false' == $scope.fc.formFieldControlMap.证件类别.isAbleEdit) {
				$scope.fc.certificateType.isAbleEdit = false;
				$scope.fc.certificateType.cursorType = "cursor-not-allowed";
			}
		}
		$scope.fc.certificateType[$scope.task.theCommonFormInfo.formYscgjshengpi.certificateType] = true;
		$scope.$applyAsync();
	};
	/*表单更新前辅助逻辑*/
	$scope.fc.updateDocFullName = function () {
		if (SysUtils.notEmpty($scope.task.theCommonFormInfo.formYscgjshengpi,['applicant'])) {
			$scope.task.theCommonFormInfo.belongProInst.title = $scope.task.theCommonFormInfo.formYscgjshengpi.applicant + "因私出国（境）报批";
		}

		$scope.$applyAsync();
	};

	$scope.userType2docPrefix={
		inPost: "机关",
		directly: "直属",
		retirement: "退休",
	}
	$scope.userTypeChenge = function () {
		$scope.task.theCommonFormInfo.docPrefix = "长城电子" + $scope.userType2docPrefix[$scope.task.theCommonFormInfo.formYscgjshengpi.userType];
		$scope.fc.receiptYearSelect();/*根据不同前缀生成文号*/
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
		var temporaryHireStartDate = $scope.task.theCommonFormInfo.formYscgjshengpi.temporaryHireStartDate;
		var temporaryHireEndDate = $scope.task.theCommonFormInfo.formYscgjshengpi.temporaryHireEndDate;
		if (temporaryHireStartDate > temporaryHireEndDate) {
			obj.flag = true;
			obj.msg = "临时借（聘）用起始日期不能大于终止日期!";
		}
		return obj;
	};*/
	/**
	 * 打开类别modal
	 */
	$scope.fc.chooseCategory = function (val) {
		$scope.task.theCommonFormInfo.docPrefix = "长城电子" + val;
		$('input[name=otherCategoryRadio]').each(function () {
			if ($(this).val() == val) {
				this.checked = true;
			}
		})
		$('#yscgjshengpiType').modal('hide');
		$scope.fc.receiptYearSelect();/*根据不同前缀生成文号*/
	};
	$scope.fc.generateDocfullName = function () {
		/*文档名称*/
		if (SysUtils.notEmpty($scope.task.theCommonFormInfo.docNumber, [])) {
			$scope.task.theCommonFormInfo.belongProInst.docFullName = $scope.task.theCommonFormInfo.docPrefix + "（" + $scope.task.theCommonFormInfo.docYear + "）" + $scope.task.theCommonFormInfo.docNumber + "号";
		} else {/*文档全称  不带号*/
			$scope.task.theCommonFormInfo.belongProInst.docFullName = $scope.task.theCommonFormInfo.docPrefix + "（" + $scope.task.theCommonFormInfo.docYear + "）" + "号";
		}
	};
	$scope.showCategoryType = function () {

		$('#yscgjshengpiType').modal('show');
		//$('.modal-backdrop').hide();
	}


    /*************************三、初始化调用****************************/

}]);


