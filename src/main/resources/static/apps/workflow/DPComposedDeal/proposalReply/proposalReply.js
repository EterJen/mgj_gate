/*
myApp.config(function ($stateProvider, ENV) {

    $stateProvider.state('coreHome.shouwenManage', {
        url: "/shouwenManage",
        views: {
            'rightContent@coreHome': {
                templateUrl: ENV.templateLocate + "/apps/bangong/bangongguanli/shouwenguanli/shouwenManage.html?ts=" + timestamp,
                controller: "shouwenManageCtrl",
                cache: false,
            }
        }
    });

});
*/


myApp.controller('proposalReplyCtrl', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils', 'dataFactory', 'NodeTreeTool', 'maxHeigtTool', '$http', function ($rootScope, $scope, ENV, $state, SysUtils, dataFactory, NodeTreeTool, maxHeigtTool, $http) {

  /*************************一、变量定义****************************/
  $rootScope.addBgground = true;
  $scope.queryBean = {paging: 'Yes',dbParams:{}};
  $scope.proInstList = [];
  $scope.currGroupId = 'shouwen';
  $scope.formpath = null;
  $scope.formTempPath = "apps/workflow/DPComposedDeal/proposalReply/";
  $scope.activeTab = "todoTasks";
  $scope.homeListRenewId = $scope.activeTab;
  $rootScope.reNewBtn = "directQuery";
  $scope.hiddenStatus = '';
  $scope.modeName = 'SelectModalRsv1';
  $scope.sjlw = 'shangjilaiwen';
  $scope.formDefId = '';
  var childWindowMap = {};//存储已经打开的窗口

  $scope.paginationConf = {
    currentPage   : 1,
    totalItems    : -1,
    itemsPerPage  : 10,
    pagesLength   : 13,
    perPageOptions: [10, 20, 30, 40, 50]
  };
  $scope.shouwenFormDefIdOptions = [
    {name: '全部', val: ''},
    {name: '长城电子党委', val: 'jxwdwshouwen'},
    {name: '长城电子', val: 'jxwshouwen'}
  ];

    /**
     * 字典初始化
     */
    $scope.dicMod={
        bpzhuangtai:[
            {name: '全部', val: ''},
            {name: '拟稿', val: '拟稿'},
            {name: '处长意见', val: '处长意见'},
            {name: '预审', val: '预审'},
            {name: '审核', val: '审核'},
            {name: '审批', val: '审批'},
            {name: '排版', val: '排版'},
            {name: '签章', val: '签章'},
            {name: '文印', val: '文印'}
        ]
    }
  /*************************二、函数定义****************************/
  /*查询当前用户登录的收文*/
  $scope.queryProInstList = function () {
      //$scope.queryBean={}
    console.log(JSON.stringify($scope.queryBean));

    $scope.proInstList = [];
    if ("todoTasks" == $scope.activeTab) {
      SysUtils.requestByJson("/rCurrentTaskInfo/getTodoList", $scope.queryBean, function (resultInfo) {
        SysUtils.handleResult(resultInfo, {'state': $state}, function () {
          $scope.proInstList = resultInfo.beanList;
          $scope.paginationConf.totalItems = resultInfo.totalRows;
          $scope.hiddenStatus = $scope.queryBean.strStatus;

          $scope.$apply();
        })
      })
    } else {
      SysUtils.requestByJson("/rProcessInstance/doneList", $scope.queryBean, function (resultInfo) {
        SysUtils.handleResult(resultInfo, {'state': $state}, function () {
          $scope.proInstList = resultInfo.beanList;
          $scope.paginationConf.totalItems = resultInfo.totalRows;
          $scope.hiddenStatus = $scope.queryBean.strStatus;

          $scope.$apply();
        })
      })
    }
  };

  $scope.openCreateProInstDialog = function () {

    $scope.proInst = {};

    var param = {ids: []};

    angular.forEach($scope.shouwenTypes, function (data) {
      param.ids.push(data.id);
    });
    /*var defId = $scope.formDefId.split('-')[0];
    $scope.processVersionQueryBean = {paging: 'No', isActive: '1',dbParams:{
            defManageFlag: '1',defId: defId, proDefGroupId: $scope.currGroupId
        }};
    if (defId != '')
        $scope.processVersionQueryBean.dbParams.proDefGroupId = '';*/
    //console.log($scope.processVersionQueryBean);
    SysUtils.silenceWithAuthAjax("/processDefVersion/querySwdlTemplate", param, function (resultInfo) {
      $scope.activeProcVersionList = resultInfo.beanList;
      $scope.proInst.processVersionId = $scope.activeProcVersionList[0].id;
      $scope.$apply();
      $('#createProInstDialog').modal('show');
    });
  };

  $scope.saveProInst = function () {
    SysUtils.silenceWithAuthAjax("/rProcessInstance/create", $scope.proInst, function (resultInfo) {
      $rootScope.reNewBtn = "directQuery";
      window.open(ENV.localapi + "/index.html#!/officialDocuments/" + resultInfo.additionalInfo.formDefId + "/" + resultInfo.additionalInfo.currentTuskId, resultInfo.additionalInfo.currentTuskId);
      $('#createProInstDialog').modal('hide');
    });
  };


  $scope.gotoDetail = function (task, cIdx) {
    $rootScope.reNewBtn = "directQuery";
    var _window;
    if (!SysUtils.isEmpty(childWindowMap[task.id])) {
      childWindowMap[task.id].close();
    }
    if ("todoTasks" == $scope.activeTab) {
      _window = window.open(ENV.localapi + "/index.html#!/officialDocuments/" + task.belongingProInst.formDefId + "/" + task.id);
    } else {
      _window = window.open(ENV.localapi + "/index.html#!/officialDocuments/" + task.formDefId + "/-" + task.id);
    }
    childWindowMap[task.id] = _window;
  }

  $scope.formDefIds = [
    {idx: "0", val: '全部', key: ['blyjbpzx', 'blyjbprd']},
    {idx: "1", val: '人大报批', key: ['blyjbprd']},
    {idx: "2", val: '政协报批', key: ['blyjbpzx']}
  ]
  $scope.isFinisheds = [
    {key: '', val: '全部'},
    {key: 'Active', val: '在办'},
    {key: 'Finished', val: '已办结'}
  ];

  $scope.handdingResultZd = ["解决或采纳","列入计划拟解决","留作参考"];
  $scope.handdingResultRd = ["解决采纳","计划解决","正在解决","留作参考"];
  var handdingResult=["解决采纳","计划解决","正在解决","留作参考","解决或采纳","列入计划拟解决"];
  $scope.handdingResult=handdingResult;
  $scope.selectFormDef = function () {
    if($scope.queryBean.formDefIdsObjIdx=='1'){
        $scope.handdingResult=$scope.handdingResultRd;
    }else if($scope.queryBean.formDefIdsObjIdx=='2'){
        $scope.handdingResult=$scope.handdingResultZd;
    }else{
        $scope.handdingResult=handdingResult;
    }
  }
  $scope.showDetail = function (detail) {
    $scope.queryBean.totalRows = -1;
    $scope.queryBean.pageNo = 1;
    $scope.queryBean.pageSize = 10;
    $scope.queryBean = {paging: 'Yes',dbParams:{}};//初始化查询参数
    $scope.queryBean.formDefIdsObjIdx = "0";
    $('#' + detail).modal('show');
    $scope.$applyAsync();
  };
  $scope.detailQurey = function (detail) {
    $scope.queryBean.formDefIds = $scope.formDefIds[$scope.queryBean.formDefIdsObjIdx].key;
    $scope.formDefIdsChosed = $scope.queryBean.formDefIds;
    $scope.queryProInstList();
  };

  $scope.queryProInstListChangeBean = function (detail) {
    $scope.initPaging();
    $scope.queryBean.strStatus = $scope.hiddenStatus;
    $scope.queryProInstList(detail)
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


  $scope.formDefIdsChosed = $scope.formDefIds[0].key;
  $scope.initParamsAndQuery = function () {
    $scope.initPaging();
    $scope.queryBean = {paging: 'Yes',dbParams:{}};//初始化查询参数
    $scope.formDefIdsChosed = $scope.formDefIds[0].key;
    $scope.pageAuto();
    $scope.$applyAsync();
  };

  $scope.setFormPath = function () {
    $scope.formpath = $scope.formTempPath + $scope.activeTab + ".html";
  };

  $scope.initPaging = function () {
    $scope.paginationConf.currentPage = 1;
    $scope.paginationConf.totalItems = -1;
    $scope.paginationConf.itemsPerPage = 10;

    $scope.$applyAsync();
  };

  $scope.setFormPath();

  $scope.pageAuto = function () {
    $scope.queryBean.totalRows = $scope.paginationConf.totalItems;
    $scope.queryBean.pageNo = $scope.paginationConf.currentPage;
    $scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
    $scope.queryBean.formDefIds = $scope.formDefIdsChosed;

    $scope.queryProInstList();
  };

  $scope.queryProInstNotAccepted = function () {
    $scope.ngDisableDelete = false;
    $scope.dlDisableDelete = false;
    $scope.qzDisableDelete = false;
    $scope.queryBean.strStatus = 'NotAccepted';
    $scope.queryProInstList($scope.activeTab)
  };


  $scope.queryProInstAccepted = function (tab) {
    $scope.activeTab = tab;
    $scope.homeListRenewId = $scope.activeTab;
    $rootScope.reNewBtn = "directQuery";
    $scope.handdingResult=handdingResult;
    $scope.setFormPath();
    $scope.initParamsAndQuery();
    $scope.$applyAsync();
  };

  $scope.queryProInstHandled = function () {
    $scope.ngDisableDelete = true;
    $scope.dlDisableDelete = true;
    $scope.disabled = true;
    $scope.qzDisableDelete = true;
    $scope.qzReForm = false;
    $scope.qfTime = '办结时间';
    $scope.ngHandled = false;
    $scope.queryBean.strStatus = 'Handled';
    $scope.queryProInstList($scope.activeTab);
  };

  $scope.showExportDialog = function () {
    $scope.proInst = {};
    SysUtils.requestByJson('/dicType/getDicTypesByDicModeName/' + $scope.modeName, {}, function (resultInfo) {
      SysUtils.handleResult(resultInfo, {'state': $state}, function () {
        $scope.dicTypes = resultInfo.beanList;
        $scope.$apply();
        $("#exportDialog").modal('show');
      })
    })
  };

  /**
   * 上级来文导出
   */
  $scope.doExport = function () {
    console.log($scope.proInst.dicTypeId);
    $scope.queryBean = {paging: 'No'};
    $scope.queryBean.dicTypeId = $scope.proInst.dicTypeId;
    if (typeof $scope.queryBean.dicTypeId == 'undefined' || $scope.queryBean.dicTypeId == '') {
      SysUtils.swalForTips("提示", "请选择模板", "info", function (isConfirm) {
      });
      return;
    }
    $("#exportDialog").modal('hide');
    $scope.queryBean.groupId = $scope.sjlw;
    $scope.queryBean.pdmId = $scope.formDefId.split('-')[0];
    $http({
      url         : "/rProcessInstance/doExport",
      method      : "POST",
      data        : $scope.queryBean,
      headers     : {
        "Content-type": "application/json"
      },
      responseType: "arraybuffer"
    }).then(function (data, status, headers, config) {
      var blob = new Blob([data.data], {type: "application/vnd.ms-excel"});
      var filename = "上级来文记录.xls";
      if (window.navigator.msSaveOrOpenBlob) {// For IE:
        navigator.msSaveBlob(blob, filename);
      } else {
        var objectUrl = URL.createObjectURL(blob);
        var a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display:none');
        a.setAttribute('href', objectUrl);
        a.setAttribute('download', filename);
        a.click();
        URL.revokeObjectURL(objectUrl);
      }
    })
  };

  $scope.setStatus = function (currNode) {
    console.log(2);

    var hiddenStatus = $scope.hiddenStatus;
    switch (currNode) {
      case 'swcl':
        $scope.queryBean.strStatus = hiddenStatus == '' ? 'NotAccepted,Accepted' : hiddenStatus;
        break;
      case 'swdl':
        $scope.queryBean.strStatus = hiddenStatus == '' ? 'Accepted' : hiddenStatus;
        break;
    }
  };

  $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.pageAuto);

  $scope.initShouWenTypes = function (bacFun) {
    var queryBean = [{
      processDefManage: {
        proDefGroupId: "handlingwork",
        formDefId    : "blyjbprd",
      }
    }
      , {
        processDefManage: {
          proDefGroupId: "handlingwork",
          formDefId    : "blyjbpzx",
        }
      }
    ];
    SysUtils.requestByJson("/processDefManage/enableDefMngTypes", queryBean, function (resultInfo) {
      SysUtils.handleResult(resultInfo, {'state': $state}, function () {
        $scope.shouwenTypes = resultInfo.beanList;
        $scope.queryBean.formDefIds = [];
        $scope.shouwenTypes.forEach(function (v, i, a) {
          $scope.queryBean.formDefIds.push(v.processDefManage.formDefId);
        })
        if (SysUtils.notEmpty(bacFun, [])) {
          bacFun();
        }
        //$scope.$apply();
      })
    })
  };

  /**
   * 允许来文重复
   * @param proInst
   */
  $scope.doAllowRepeated = function (proInst) {
    $scope.queryBean = proInst;
    $scope.queryBean.allowRepeated = 'Allow';
    SysUtils.requestByJson('/rProcessInstance/update', $scope.queryBean, function (resultInfo) {
      SysUtils.handleResult(resultInfo, {'state': $state}, function () {
        $scope.queryProInstList($scope.activeTab);
      })
    })
  };

  $scope.checkStatus = function (status) {
    return status == $scope.activeTab;
  };

  /*************************三、初始化调用****************************/
  /*计算布局高度*/
  $scope.calculatedHeight = function () {
    $('.content-wrapper').css('height', SysUtils.get_content_wrapper());
    //console.log("=ceter_p=="+$('#ceter_p').height());
    $('#panel-body-table').css('height', $('.content').height() - $('#panel-heading').outerHeight(true) - $('#bmxx_tit').height());
    $('.table_shadow').css('max-height', $('.content').height() - $('#panel-heading').outerHeight(true) - $('#ceter_p').outerHeight() - $('#bmxx_tit').height());
  }

  setTimeout(function () {
    //console.log("第三次"+$('#bmxx_tit').innerHeight());
    $scope.calculatedHeight();
  }, 500);

  /* var window_height = $(window).height();
   var heightList=[];
   heightList.push($('.main-header').outerHeight());
   heightList.push($('.panel-heading').outerHeight(true));
   var resultHeight=maxHeigtTool.maxHeigt(window_height,heightList);
   console.log(heightList);
   console.log(resultHeight);
   $('.panel-body').css('max-height', resultHeight);
   $('.panel-body').css('height', resultHeight);*/

}]);