myApp.controller('officialbulletinMngCtrl', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils', 'maxHeigtTool', function ($rootScope, $scope, ENV, $state, SysUtils, maxHeigtTool) {

    console.log('公务网简报');
    $rootScope.addBgground = true;
    $scope.queryBean = {paging: 'Yes',groupId: 'jb',formDefId: 'gwwjb'};
    $scope.proInstList = [];
    $scope.formPath = null;
    $scope.formTempPath = "apps/bangong/bangongguanli/officialbulletin/";
    $scope.orgNavType = "all";
	$scope.isFinished = 'Active';
    var childWindowMap = {};//存储已经打开的窗口

    $scope.docTypelist = [
        {id: 'all', val: '全部简报'},
        {id: 'identifing', val: '待识别'},
        // {id: 'processing', val: '待处理'}
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

	$scope.gotoDetail = function (proInst) {
		var formDefId = proInst.formDefId;
		if (!SysUtils.isEmpty(childWindowMap[proInst.id])) {
			childWindowMap[proInst.id].close();
		}
		var _window;
		if ("identifing" === $scope.orgNavType && "Active" === $scope.isFinished) {
			_window = window.open(ENV.localapi + "/index.html#!/officialDocuments/" + formDefId + "/" + proInst.taskId);
		} else {
			_window = window.open(ENV.localapi + "/index.html#!/officialDocuments/" + formDefId + "/-" + proInst.id);
		}
		childWindowMap[proInst.id] = _window;
	};

	$scope.setFormPath = function () {
		$scope.formPath = $scope.formTempPath + $scope.orgNavType + ".html";
	};

	//待识别tab页待处理、已处理查询
	$scope.queryProInstListByCondition = function (isFinished) {
		$scope.isFinished = isFinished;
		$scope.initParamsAndQuery($scope.orgNavType);
	};

	$scope.queryProInstListChangeBean = function (modal) {
		$scope.initPaging();
		$scope.queryBean.paging = 'Yes';
		if (SysUtils.notEmpty($scope.deadLine)) {
			$scope.queryBean.receiveDocTimeQueryEnd = $scope.deadLine;
			$scope.isFinished = 'Active';
		}
		$scope.queryBean.totalRows = $scope.paginationConf.totalItems;
		$scope.queryBean.pageNo = $scope.paginationConf.currentPage;
		$scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;

		$scope.queryBulletinList(modal);
	};

	$scope.queryBulletinList = function (modal) {
		if ('all' != $scope.orgNavType) {
			$scope.queryBean.bulletinType = $scope.orgNavType;
			$scope.queryBean.isFinished = $scope.isFinished;
		}
		console.log($scope.queryBean);
		SysUtils.requestByJson("/rProcessInstance/list", $scope.queryBean, function (resultInfo) {
			SysUtils.handleResult(resultInfo, {'state': $state}, function () {
				console.log(resultInfo);
				$scope.proInstList = resultInfo.beanList;
				$scope.paginationConf.totalItems = resultInfo.totalRows;
				$scope.paginationConf.currentPage = resultInfo.bean.pageNo;
				if (!SysUtils.isEmpty(modal)) {
					$('#' + modal).modal('hide');
				}
				$scope.$apply();
			});
		});
	};

	$scope.choseCandate = function (type) {
		if ("identifing" === type) {
			$scope.isFinished = 'Active';
		}
		$scope.orgNavType = type;
		$scope.$applyAsync();
		$scope.initParamsAndQuery();
	};

	$scope.initParamsAndQuery = function () {
		$scope.queryBean = {paging: 'Yes',groupId: 'jb',formDefId: 'gwwjb'};//初始化查询参数
		$scope.setFormPath();
		$scope.$applyAsync();
		$scope.initPaging();
		$scope.pageAuto();
	};

	$scope.setFormPath();

	$scope.pageAuto = function () {
		$scope.queryBean.totalRows = $scope.paginationConf.totalItems;
		$scope.queryBean.pageNo = $scope.paginationConf.currentPage;
		$scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
		$scope.queryBulletinList();
	};

    $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.pageAuto);

	$scope.showDetail = function (detail) {
		$scope.queryBean.paging = "Yes";
		$scope.queryBean.pageNo = 1;
		$scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
		$('#' + detail).modal('show');
	};

	//弹出批量关闭模态框
	$scope.batchClose = function () {
		$('#batchCloseModal').modal('show');
	};

	$scope.deadLine = '';
	$scope.countResult = '';
	$scope.incomingDocNums = '';
	$scope.mandatoryFinishList = [];
	//选择截止日期时统计简报数量
	$scope.countBulletin = function () {
		$scope.queryBean.paging = 'No';
		$scope.queryBean.receiveDocTimeQueryEnd = $scope.deadLine;
		$scope.queryBean.isFinished = 'Active';
		console.log($scope.queryBean);
		SysUtils.requestByJson('/rProcessInstance/countBulletin', $scope.queryBean, function (resultInfo) {
			console.log(resultInfo);
			$scope.mandatoryFinishList = resultInfo.beanList;
			$scope.countResult = resultInfo.additionalInfo.countResult;
			$scope.incomingDocNums = resultInfo.additionalInfo.incomingDocNums;
			$scope.$applyAsync();
		});
	};

	//强制办结
	$scope.doMandatoryFinish = function (modal) {
		SysUtils.swalConfirm('提示', '确定强制办结吗？', 'info', function (isConfirm) {
			if (isConfirm) {
				if (!SysUtils.isEmpty(modal)) {
					$('#' + modal).modal('hide');
				}
				SysUtils.requestByJson('/rProcessInstance/bulletinMandatoryFinish', $scope.mandatoryFinishList, function (resultInfo) {
					$scope.initParamsAndQuery();
				});
			}
		});
	};

	$('#batchCloseModal').on('shown.bs.modal', function () {
		$('#deadLine').datepicker({
			format: 'yyyy-mm-dd',
			autoclose: true,
			clearBtn: true
		}).on('show', function (e) {
			$('#deadLine').datepicker('setDate', null);
		}).on('changeDate', function (e) {
			if (e.date) {
				$scope.countBulletin();
			}
		})
	}).on('hidden.bs.modal', function () {
		console.log("batchCloseModal");
		$scope.deadLine = '';
		$scope.countResult = '';
		$scope.incomingDocNums = '';
		$scope.$applyAsync();
	});

	$('#queryModal').on('shown.bs.modal', function () {
		$('#receiveDocTimeStart').datepicker({
			format: 'yyyy-mm-dd',
			autoclose : true,
			clearBtn: true
		}).on('show',function(e){
			$('#receiveDocTimeStart').datepicker('setStartDate', null);
			if ($('#receiveDocTimeEnd').val() == '') {
			     $('#receiveDocTimeStart').datepicker('setEndDate', null);
			} else {
			     $('#receiveDocTimeStart').datepicker('setEndDate', new Date($('#receiveDocTimeEnd').val()))
			}
		}).on('changeDate',function(e){
			if (e.date) {
				$('#receiveDocTimeEnd').datepicker('setStartDate', new Date(e.date.valueOf()));
			} else {
				$('#receiveDocTimeEnd').datepicker('setStartDate', null);
			}
		});
		$('#receiveDocTimeEnd').datepicker({
			format: 'yyyy-mm-dd',
			autoclose : true,
			clearBtn: true
		}).on('show',function(e){
			if ($('#receiveDocTimeStart').val() == '') {
				$('#receiveDocTimeEnd').datepicker('setStartDate', null);
			} else {
				$('#receiveDocTimeEnd').datepicker('setStartDate', new Date($('#receiveDocTimeStart').val()));
			}
		}).on('changeDate',function(e){
			if (e.date) {
				$('#receiveDocTimeStart').datepicker('setEndDate', new Date(e.date.valueOf()));
			} else {
				$('#receiveDocTimeStart').datepicker('setEndDate', null);
			}
		});
	});


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
