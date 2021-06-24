/*myApp.config(function ($stateProvider, ENV) {

    $stateProvider.state('coreHome.fawenManage', {
        url: "/fawenManage",
        views: {
            'rightContent@coreHome': {
                templateUrl: ENV.templateLocate + "/apps/bangong/bangongguanli/fawenguanli/fawenManage.html?ts=" + timestamp,
                controller: "fawenManageCtrl",
                cache: false,
            }
        }
    });

});*/


myApp.controller('fawenManageCtrl', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils', 'dataFactory', 'NodeTreeTool', 'maxHeigtTool', function ($rootScope, $scope, ENV, $state, SysUtils, dataFactory, NodeTreeTool, maxHeigtTool) {

  /*************************一、变量定义****************************/
  $rootScope.addBgground = true;
  $scope.queryBean = {paging: 'Yes'};
  $scope.proInstList = [];
  $scope.currGroupId = 'fawen';
  $scope.formpath = null;
  $scope.formTempPath = "apps/bangong/bangongguanli/fawenguanli/";
  $scope.activeTab = "ng";
    $scope.homeListRenewId =   $scope.activeTab;
  $rootScope.reNewBtn = "directQuery";
  $scope.ngDisableDelete = false;
  $scope.dlDisableDelete = false;
  $scope.qzDisableDelete = false;
  $scope.ngHandled = true;
  $scope.hiddenStatus = '';
  var childWindowMap = {};//存储已经打开的窗口

  $scope.paginationConf = {
    currentPage   : 1,
    totalItems    : -1,
    itemsPerPage  : 10,
    pagesLength   : 13,
    perPageOptions: [10, 20, 30, 40, 50]
  };

  $scope.formDefIdOptions = [
    {name: '全部', val: ''},
    {name: '长城电子发文', val: 'fawen'},
    {name: '长城电子党委发文', val: 'jxwdwfawen'},
//    {name: '国防办发文', val: 'gfkgbfawen'},
    {name: '长城电子规范发文', val: 'hjxgffawen'},
   {name: '无管局发文', val: 'wuguanju'},
  ];
  /*************************二、函数定义****************************/
  /*查询当前用户拟稿的发文*/
  $scope.queryProInstList = function (modal) {
    //$scope.proInstList = [];
    console.log("查询当前用户的拟稿的发文");
    $scope.queryBean.groupId = $scope.currGroupId;
    $scope.queryBean.pNodeName = $scope.activeTab;
    SysUtils.requestByJson("/rProcessInstance/queryList", $scope.queryBean, function (resultInfo) {
      SysUtils.handleResult(resultInfo, {'state': $state}, function () {
        $scope.proInstList = resultInfo.beanList;
        $scope.paginationConf.totalItems = resultInfo.totalRows;
        $scope.hiddenStatus = $scope.queryBean.strStatus;
        if (SysUtils.notEmpty(modal,[]))
          $('#' + modal).modal('hide');
        $scope.$apply();
      })
    })
  };

  $scope.openCreateProInstDialog = function () {
    $scope.proInst = {};
    $scope.processVersionQueryBean = {
      paging: 'No', isActive: '1', dbParams: {
        defManageFlag: '1', proDefGroupId: $scope.currGroupId
      }
    };
    $(".flyover").show();
    $.ajax({
      type      : "POST",
      url       : ENV.localapi + "/processDefVersion/list",
      beforeSend: function (request) {
        request.setRequestHeader("Content-type", "application/json");
        //request.setRequestHeader("Authorization", "Bearer " + $cookies.getObject('user').token);
      },
      dataType  : 'json',
      data      : JSON.stringify($scope.processVersionQueryBean),
      success   : function (resultInfo) {
        $(".flyover").hide();
        SysUtils.handleResult(resultInfo, {'state': $state}, function () {
          $scope.activeProcVersionList = resultInfo.beanList;
          if (!$scope.currentUser.executive) {
            $scope.proInst.processVersionId = $scope.activeProcVersionList[0].id;
          } else {
            $scope.proInst.processVersionId = $scope.activeProcVersionList[1].id;
          }
          $scope.$apply();
          $('#createProInstDialog').modal('show');
        })
      },
      error     : function (XMLResponse) {
        $(".flyover").hide();
        console.log(JSON.stringify(XMLResponse));
      }
    });
  };

  /*发起一个流程 给当前用户一个初始 任务*/


  $scope.saveProInst = function () {
    SysUtils.silenceWithAuthAjax("/rProcessInstance/create",$scope.proInst,function (resultInfo) {
      $('#createProInstDialog').modal('hide');

      window.open(ENV.localapi + "/index.html#!/officialDocuments/" + resultInfo.additionalInfo.formDefId + "/" + resultInfo.additionalInfo.currentTuskId, resultInfo.additionalInfo.currentTuskId);
    });
  };

  $scope.choseCandate = function (currNode) {
    console.log(currNode);
    $scope.activeTab = currNode;
      $scope.homeListRenewId =   $scope.activeTab;
    $rootScope.reNewBtn = "directQuery";
    $scope.$applyAsync();
    $scope.initParamsAndQuery();
    $scope.calculatedHeight();
  };

  $scope.gotoDetail = function (proInst) {
      $rootScope.reNewBtn = "directQuery";
    var defId = proInst.formDefId;
    var _window;
    if (!SysUtils.isEmpty(childWindowMap[proInst.id])) {
      childWindowMap[proInst.id].close();
    }
    if ($scope.hiddenStatus.indexOf('NotAccepted') >= 0 || $scope.hiddenStatus.indexOf('Accepted') >= 0) {
      _window = window.open(ENV.localapi + "/index.html#!/officialDocuments/" + defId + "/" + proInst.taskId,proInst.taskId);
    } else {
      _window = window.open(ENV.localapi + "/index.html#!/officialDocuments/" + defId + "/-" + proInst.id,proInst.id);
    }
    childWindowMap[proInst.id] = _window;
  };

  $scope.setFormPath = function () {
    $scope.formpath = $scope.formTempPath + $scope.activeTab + ".html";
  };

  $scope.initParamsAndQuery = function () {
    $scope.queryBean = {paging: 'Yes'};//初始化查询参数
    $scope.setStatus($scope.activeTab);
    $scope.setFormPath();
    $scope.$applyAsync();
    $scope.initPaging();
    $scope.pageAuto();

  };

  $scope.initPaging = function () {
    $scope.paginationConf.currentPage = 1;
    $scope.paginationConf.totalItems = -1;
    $scope.paginationConf.itemsPerPage = 10;

    $scope.$applyAsync();
  };

  $scope.setFormPath();

  $scope.pageAuto = function () {
    console.log("currentTab: " + $scope.activeTab);
    $scope.queryBean.totalRows = $scope.paginationConf.totalItems;
    $scope.queryBean.pageNo = $scope.paginationConf.currentPage;
    $scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
    $scope.queryProInstList($scope.activeTab);
  };

  $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.pageAuto);

  $scope.showDetail = function (modal) {
    SysUtils.requestByJson("/rProcessInstance/init?initType=query", {}, function (resultInfo) {
      $scope.queryBean = resultInfo.bean;
      $scope.queryBean.pageNo = 1;
      $scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
      $('#' + modal).modal('show');
    });
  }

  $scope.queryProInstListChangeBean = function (modal) {
    $scope.initPaging();
    $scope.queryBean.strStatus = $scope.hiddenStatus;
    $scope.queryProInstList(modal);
  };

  $scope.queryProInstNotAccepted = function () {
    $scope.initPaging();
    $scope.queryBean.totalRows = $scope.paginationConf.totalItems;
    $scope.queryBean.pageNo = $scope.paginationConf.currentPage;
    $scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
    $scope.ngDisableDelete = true;
    $scope.dlDisableDelete = false;
    $scope.qzDisableDelete = false;
    $scope.queryBean.strStatus = 'NotAccepted';
    $scope.queryProInstList($scope.activeTab)
  };

  $scope.queryProInstAccepted = function () {
  	$scope.initPaging();
	$scope.queryBean.totalRows = $scope.paginationConf.totalItems;
	$scope.queryBean.pageNo = $scope.paginationConf.currentPage;
	$scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
    $scope.ngDisableDelete = false;
    $scope.dlDisableDelete = false;
    $scope.qzDisableDelete = false;
    $scope.queryBean.strStatus = 'Accepted';
    $scope.ngHandled = true;
    $scope.queryProInstList($scope.activeTab)
  };

  $scope.queryProInstHandled = function () {
    $scope.initPaging();
    $scope.ngDisableDelete = true;
    $scope.queryBean.totalRows = $scope.paginationConf.totalItems;
    $scope.queryBean.pageNo = $scope.paginationConf.currentPage;
    $scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
    $scope.ngDisableDelete = true;
    $scope.dlDisableDelete = true;
    $scope.qzDisableDelete = true;
    $scope.ngHandled = false;
    $scope.queryBean.strStatus = 'Handled';
    $scope.queryProInstList($scope.activeTab);
  };

  $scope.delete = function (proInst) {
    $scope.queryBean = proInst;
    $scope.queryBean.state = 'Delete';
    SysUtils.swalConfirm("提示", "是否删除此记录", "info", function (isConfirm) {
      if (isConfirm) {
        SysUtils.requestByJson('/rProcessInstance/update', $scope.queryBean, function (resultInfo) {
          SysUtils.handleResult(resultInfo, {'state': $state}, function () {
            $scope.choseCandate($scope.activeTab);
          })
        })
      }
    });
  };

  $scope.reComposing = function (proInst) {
    console.log("再排版：" + proInst.id);
    SysUtils.swalConfirm("提示", "确认再排版此记录", "info", function (isConfirm) {
      if (isConfirm) {
        SysUtils.requestByJson('/rProcessInstance/reComposing/' + proInst.id, {}, function (resultInfo) {
          SysUtils.handleResult(resultInfo, {'state': $state}, function () {
            swal("提示", resultInfo.message, "info");
            $scope.queryProInstList($scope.activeTab);
          })
        })
      }
    });
  };

  $scope.setStatus = function (currNode) {
    switch (currNode) {
      case 'ng':
        $scope.ngHandled = true;
        $scope.ngDisableDelete = false;
        $scope.queryBean.strStatus = 'Accepted';
        break;
      case 'dl':
        $scope.dlDisableDelete = false;
        $scope.queryBean.strStatus = 'NotAccepted,Accepted';
        break;
      case 'wy':
        $scope.queryBean.strStatus = 'NotAccepted';
        break;
      case 'qz':
        $scope.qzDisableDelete = false;
        $scope.queryBean.strStatus = 'NotAccepted,Accepted';
        break;
    }
  };
  $scope.setStatus($scope.activeTab);

  $scope.checkStatus = function (status) {
    var flag = false;

    $scope.hiddenStatus.split(",").forEach(function (sta) {
      if (status == sta) {
        flag = true;
      }
    });
    return flag;
  };

	$('#fawenDW').on('hidden.bs.modal', function () {
		$scope.queryBean = {paging: 'Yes'};
	});

  /*************************三、初始化调用****************************/
  /*计算布局高度*/
  $scope.calculatedHeight = function () {
    $('.content-wrapper').css('height', SysUtils.get_content_wrapper());
    //console.log("=ceter_p=="+$('.content').height()+"=="+$('#panel-heading').outerHeight(true)+"=bmxx_tit="+$('#bmxx_tit').innerHeight());
    $('#panel-body-table').css('height', $('.content').height() - $('#panel-heading').outerHeight(true) - $('#bmxx_tit').height());
    $('.table_shadow').css('max-height', $('.content').height() - $('#panel-heading').outerHeight(true) - $('#ceter_p').outerHeight() - $('#bmxx_tit').height());
  }

  /*$scope.includeInit = function(){
      setTimeout(function () {
          //console.log("第三次"+$('#bmxx_tit').innerHeight());
          $scope.calculatedHeight();
      },500);
  }*/
  setTimeout(function () {
    //console.log("第四次"+$('#bmxx_tit').innerHeight());
    $scope.calculatedHeight();
  }, 500);

  /*var window_height = $(window).height();
  var heightList=[];
  heightList.push($('.main-header').outerHeight());
  heightList.push($('.heading').outerHeight(true));
  var resultHeight=maxHeigtTool.maxHeigt(window_height,heightList);
  $('.panel-body').css('max-height', resultHeight);
  $('.panel-body').css('height', resultHeight);*/
}]);