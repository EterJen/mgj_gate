myApp.controller('governorCtrl', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils', 'maxHeigtTool', 'NodeTreeTool', function ($rootScope, $scope, ENV, $state, SysUtils, maxHeigtTool, NodeTreeTool) {

    console.log('督查立督');
    $rootScope.addBgground = true;
    $scope.queryBean = {paging: 'Yes',groupId: 'duwen', isFinished:'Active'};
    $scope.proInstList = [];
	$scope.allProInstRoot = {};
	$scope.selectedProInsts = [];
	$scope.hasSWDLRole = false;
    var childWindowMap = {};//存储已经打开的窗口
	$scope.proInst = {};
  $rootScope.reNewBtn =   "directQuery";
	$scope.isFinished = '';
    $scope.pointSupervises = [
        {key: '', val: '全部'},
        {key: 'true', val: '重要'}
    ];

	$scope.formDefIds = [
		{key: '', val: '全部'},
		{key: 'jxwduwen', val: '长城电子督'}
	];

    $scope.paginationConf = {
        currentPage: 1,
        totalItems: -1,
        itemsPerPage: 10,
        pagesLength: 13,
        perPageOptions: [10, 20, 30, 40, 50]
    };

  $scope.proinsCheckCurrentck = function (v) {
  }
  $scope.proinsCheckCurrent = function (v) {
    $scope.proInstList.forEach(function (value) {
      if (v.id == value.id) {
        value.checked = !value.checked;
        if (value.checked) {
          $scope.selectedProInsts = [];
          $scope.selectedProInsts.push(value);
        }
      } else {
        value.checked = false;
      }
	})
  }
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
		var _window = window.open(ENV.localapi + "/index.html#!/officialDocuments/" + formDefId + "/-" + proInst.id);
		childWindowMap[proInst.id] = _window;
	};

	/**
	 * 搜索框查询
	 * @param modal
	 */
	$scope.queryProInstListChangeBean = function (modal) {
		$scope.initPaging();
		$scope.queryBean.totalRows = $scope.paginationConf.totalItems;
		$scope.queryBean.pageNo = $scope.paginationConf.currentPage;
		$scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;

		$scope.queryProInstList(modal);
	};

	$scope.queryProInstList = function (modal) {
		$scope.proInstList = [];
		console.log($scope.queryBean);
		$scope.selectedProInsts = [];
		SysUtils.requestByJson("/rProcessInstance/list", $scope.queryBean, function (resultInfo) {
			SysUtils.handleResult(resultInfo, {'state': $state}, function () {
				console.log(resultInfo.bean);
				$scope.proInstList = resultInfo.beanList;
				$scope.isFinished = resultInfo.bean.isFinished;
				$scope.paginationConf.totalItems = resultInfo.totalRows;
				$scope.paginationConf.currentPage = resultInfo.bean.pageNo;
				if (!SysUtils.isEmpty(modal)) {
					$('#' + modal).modal('hide');
				}
				$scope.$apply();
			})
		});
	};

	$scope.initParams = function () {
		$scope.queryBean = {paging: 'Yes', groupId: 'duwen'};
		$scope.$applyAsync();
		$scope.initPaging();
	};

	$scope.initParamsAndQuery = function () {
		$scope.queryBean = {paging: 'Yes', groupId: 'duwen'};//初始化查询参数
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

	$scope.openQueryModal = function (modal) {
		$scope.queryBean.paging = "Yes";
		$scope.queryBean.pageNo = 1;
		$scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
		$scope.queryBean.pointSupervise = $scope.pointSupervises[0].key;
		$scope.queryBean.formDefId = $scope.formDefIds[0].key;
		$('#' + modal).modal('show');
	};

	/**
	 * 在做、已做查询
	 * @param isFinished
	 */
	$scope.queryProInstListByCondition = function (isFinished) {
      if ("Finished" == isFinished) {
        $rootScope.reNewBtn =  "directQuery";
      }else if ("Active" == isFinished) {
        $rootScope.reNewBtn =  "directQuery";
      }
		$scope.initParams();
		$scope.queryBean.totalRows = $scope.paginationConf.totalItems;
		$scope.queryBean.pageNo = $scope.paginationConf.currentPage;
		$scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
		$scope.queryBean.isFinished = isFinished;
		$scope.queryProInstList();
	};

	/**
	 * 督文审批
	 */
	$scope.audit = function () {

	};

	/**
	 * 督文办结
	 */
	$scope.finishDuwen = function () {
		if ($scope.selectedProInsts.length == 0) {
			SysUtils.swalForTips('提示', '请勾选要办结的督文！', 'info', function () {
			});
			return;
		}
		SysUtils.swalConfirm('提示', '确定办结勾选的督文吗?', 'info', function (isConfirm) {
			if (isConfirm) {
				SysUtils.requestByJson('/rProcessInstance/duwenFinished', $scope.selectedProInsts, function (resultInfo) {
					SysUtils.handleResult(resultInfo, {'state': $state}, function () {
						$scope.queryProInstListByCondition($scope.isFinished);
					});
				});
			} else {
				if ($scope.selectedProInsts.length != 0) {
					angular.forEach($scope.selectedProInsts, function (item) {
						angular.element("input#" + item.id).click();
					});
				}
			}
		});
	};

	/**
	 * 再次办文
	 */
	$scope.handleAgain = function () {
		if (!$scope.hasSWDLRole) {
			SysUtils.swalForTips('提示', '您无权限再次办文！', 'info', function () {
			});
			return;
		}

      if ($scope.selectedProInsts.length != 1) {
			SysUtils.swalForTips('提示', '请勾选一条记录！', 'info', function () {
				angular.forEach($scope.selectedProInsts, function (item) {
					angular.element("input#" + item.id).click();
				});
			});
			return;
		}
		console.log($scope.selectedProInsts);

		$scope.proInst = $scope.selectedProInsts[0];
      $scope.selectedProInsts = [];
		/*SysUtils.swalConfirm('提示', '确定再次办文吗?', 'info', function (isConfirm) {
			if (isConfirm) {
			}
		});*/
		SysUtils.requestByJson('/rCurrentTaskInfo/duwenHandleAgain', $scope.proInst, function (resultInfo) {
			SysUtils.handleResult(resultInfo, {'state': $state}, function () {
				var formDefId = resultInfo.bean.belongingProInst.formDefId;
				var _window;
				if (!SysUtils.isEmpty(childWindowMap[resultInfo.bean.id])) {
					childWindowMap[resultInfo.bean.id].close();
				}
				_window = window.open(ENV.localapi + "/index.html#!/officialDocuments/" + formDefId + "/" + resultInfo.bean.id);
				childWindowMap[resultInfo.bean.id] = _window;
              $scope.pageAuto();
			});
		});
	};

	$scope.nodeTrClick = function (parentNode, selfNode, siblingNodes, sonNodes, event) {
		NodeTreeTool.relatedCheck(parentNode, selfNode, siblingNodes, sonNodes);
		/*根据需要统计选中结果*/
		$scope.selectedProInsts = NodeTreeTool.checkedCount(parentNode, selfNode, siblingNodes, sonNodes, $scope.selectedProInsts);
		$scope.selectedProInsts = $scope.selectedProInsts.filter(function (item) {
			return !SysUtils.isEmpty(item.id);
		});
		console.log($scope.selectedProInsts);
	};

	/**
	 * 校验用户是否有'收文登录'角色
	 */
	$scope.checkSWDLRole = function () {
		$scope.user = {};
		$scope.user.roleList = [];
		$scope.user.roleList.push({name: '收文登录'});
		SysUtils.requestByJson('/coreUser/checkUserRole', $scope.user, function (resultInfo) {
			SysUtils.handleResult(resultInfo, {'state': $state}, function () {
				$scope.hasSWDLRole = resultInfo.additionalInfo.has;
				$scope.$apply();
			});
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
        //console.log("第三次"+$('#bmxx_tit').innerHeight());
        $scope.calculatedHeight();
    }, 500);

	$scope.checkSWDLRole();

}]);
