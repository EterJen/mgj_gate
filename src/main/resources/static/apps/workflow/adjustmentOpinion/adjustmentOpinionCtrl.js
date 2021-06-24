myApp.controller('adjustmentOpinionCtrl', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils', '$timeout', function ($rootScope, $scope, ENV, $state, SysUtils, $timeout) {
  console.log("adjustmentOpinionCtrl controller");


  /*var window_height = $(window).height();
  var heightList = [];
  heightList.push($('.main-header').outerHeight());
  $('#table_dt').css('height', window_height - 191);
  $('.content-wrapper').css('height', maxHeigtTool.maxHeigt(window_height, heightList));*/


  /*************************一、变量定义****************************/
  $rootScope.addBgground = true;
  $scope.currTaskList = [];//当前用户列表
  $scope.proInst = {};
  $scope.processVersionQueryBean = {};//流程版本的列表查询bean
  $scope.activeProcVersionList = {};//当前启用的流程版本列表
  $scope.titleDocFullName = '';
  var childWindowMap = {};//存储已经打开的窗口
  $scope.currInstanceDetail = {};
  /*************************二、函数定义****************************/

  $scope.saveProInst = function () {
    $(".flyover").show();
    $.ajax({
      type      : "POST",
      url       : ENV.localapi + "/rProcessInstance/create",
      beforeSend: function (request) {
        request.setRequestHeader("Content-type", "application/json");
        //request.setRequestHeader("Authorization", "Bearer " + $cookies.getObject('user').token);
      },
      dataType  : 'json',
      data      : JSON.stringify($scope.proInst),
      success   : function (resultInfo) {
        $(".flyover").hide();
        SysUtils.handleResult(resultInfo, {'state': $state}, function () {
          SysUtils.swalOnlyConfirm("提示", resultInfo.message, "info", function (isConfirm) {
            $('#createProInstDialog').modal('hide');
            console.log(ENV.localapi + "/index.html#!/officialDocuments/" + resultInfo.additionalInfo.formDefId + "/" + resultInfo.additionalInfo.currentTuskId)
            window.open(ENV.localapi + "/index.html#!/officialDocuments/" + resultInfo.additionalInfo.formDefId + "/" + resultInfo.additionalInfo.currentTuskId, resultInfo.additionalInfo.currentTuskId);
            $scope.initCuTask();
          });
        })
      },
      error     : function (XMLResponse) {
        $(".flyover").hide();
        console.log(JSON.stringify(XMLResponse));
      }
    });
  }

  /*$scope.emergenceLevels = [];
  $scope.selectUserType = {id:"", name:'紧急程度'};
  $scope.dimods=[
      {dictype:"Level"}
  ]

  $scope.emergenceLevels =       [{"id":102962,"name":"无"},{"id":102963,"name":"特急"},{"id":102964,"name":"加急"}];
  $scope.emergenceLevels.push($scope.selectUserType);*/
  /*    SysUtils.silenceWithAuthAjax("/dicMode/querybyArray",$scope.dimods,function (resultInfo) {
          if (SysUtils.notEmpty(resultInfo.additionalInfo,['Level','dicTypes'])) {
              $scope.emergenceLevels = resultInfo.additionalInfo.Level.dicTypes;
              $scope.emergenceLevels.push($scope.selectUserType);

              var simple = [];
              angular.forEach($scope.emergenceLevels, function (item) {
                  simple.push({id:item.id, name: item.name})
              });
              console.log(JSON.stringify(simple));

          }
          $scope.$applyAsync();
      })*/;

  $scope.openCreateProInstDialog = function () {
    $scope.proInst = {};
    $scope.processVersionQueryBean = {paging: 'N0', isActive: '1', dbParams: {defManageFlag: '1'}};
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
          console.log($scope.processVersionQueryBean);
          console.log($scope.activeProcVersionList);
          $scope.$apply();
          $('#createProInstDialog').modal('show');
        })
      },
      error     : function (XMLResponse) {
        $(".flyover").hide();
        console.log(JSON.stringify(XMLResponse));
      }
    });
  }

  $scope.changeNavType = function (stateId) {
    $scope.orgNavType = stateId;
    $scope.paginationConf.totalItems = -1;
    //$scope.titleDocFullName = "";
    $scope.pageAuto();
  };

  $scope.closeCreateDialog = function () {
    $('#createProInstDialog').modal('hide');
  }


  $scope.gotoOpinionList = function (instanc) {
    console.log(instanc);
    $scope.currInstanceDetail = instanc;
    $scope.pageAutoOpinion(instanc.id);
    $scope.pageAutoDeleteOpinion(instanc.id);
    $('#OpinionList').modal('show');

    /*var formDefId = task.belongingProInst.formDefId;
    if(!SysUtils.isEmpty(childWindowMap[task.id])){
        childWindowMap[task.id].close();
    }
    var _window=window.open(ENV.localapi + "/index.html#!/officialDocuments/" + formDefId + "/" + task.id);
    childWindowMap[task.id]=_window;*/
  }

  $scope.queryOpinion = function (id) {
    SysUtils.requestByJson('/wfOpinion/read/' + id, {}, function (resultInfo) {
      $scope.currEditeOpinion = resultInfo.bean;
      $scope.$apply();
    })
    $('#OpinionDetail').modal('show');
  };
  $scope.updateOpinion = function () {
    $scope.currEditeOpinion.initType = "update";
    SysUtils.requestByJson('/wfOpinion/systemOperat', $scope.currEditeOpinion, function (resultInfo) {
      SysUtils.handleResult(resultInfo, {'state': $state}, function () {
        var formDefId = $scope.currInstanceDetail.formDefId;
        //更新数据
          $scope.pageAutoOpinion($scope.currInstanceDetail.id);
        /*var formDefId =  currInstanceDetail.formDefId;
        if(!SysUtils.isEmpty(childWindowMap[task.id])){
            childWindowMap[task.id].close();
        }*/
        var _window = window.open(ENV.localapi + "/index.html#!/officialDocuments/" + formDefId + "/" + -$scope.currInstanceDetail.id);
        //childWindowMap[task.id]=_window;
        //$scope.fc.queryHistoryAttach();
      })
    })
  }

  $scope.deleteOpinion = function () {
    $scope.currEditeOpinion.initType = "delete";
    SysUtils.requestByJson('/wfOpinion/systemOperat', $scope.currEditeOpinion, function (resultInfo) {
      SysUtils.handleResult(resultInfo, {'state': $state}, function () {
        $scope.pageAutoOpinion($scope.currInstanceDetail.id);
        $scope.pageAutoDeleteOpinion($scope.currInstanceDetail.id);
        $('#OpinionDetail').modal('hide');
        swal(resultInfo.message, "", "success");
        $scope.$applyAsync();
      })
    })
  };

  $scope.historyOpinion = function () {
    var opinionHistorn = {};
    opinionHistorn.opinionId = $scope.currEditeOpinion.id;
    opinionHistorn.paging = "No";
    SysUtils.requestByJson('/opinionHistory/list', opinionHistorn, function (resultInfo) {
      SysUtils.handleResult(resultInfo, {'state': $state}, function () {
        $scope.HistoryOpinionList = resultInfo.beanList;
        $('#OpinionHistoryList').modal('show');
        $scope.$applyAsync();
      })
    })
  }

  //<editor-fold desc="分页配置">这是实例表的分页
  $scope.paginationConf = {
    currentPage   : 1,
    totalItems    : -1,
    itemsPerPage  : 10,
    pagesLength   : 13,
    perPageOptions: [10, 20, 30, 40, 50],
    onChange      : function () {
    }
  };

  //<editor-fold desc="分页配置">这是意见的分页
  $scope.opinionPaginationConf = {
    currentPage   : 1,
    totalItems    : -1,
    itemsPerPage  : 10,
    pagesLength   : 13,
    perPageOptions: [10, 20, 30, 40, 50],
    onChange      : function () {
    }
  };

  //<editor-fold desc="分页配置">这是删除意见的分页
  $scope.deletePpinionPaginationConf = {
    currentPage   : 1,
    totalItems    : -1,
    itemsPerPage  : 10,
    pagesLength   : 13,
    perPageOptions: [10, 20, 30, 40, 50],
    onChange      : function () {
    }
  };

  $scope.initPaging = function () {
    $scope.paginationConf.currentPage = 1;
    $scope.paginationConf.totalItems = -1;
    $scope.paginationConf.itemsPerPage = 10;

    $scope.$applyAsync();
  };

  $scope.pageAuto = function () {

    $scope.proInst = {};
    $scope.proInst.paging = "Yes";
    $scope.proInst.pageNo = $scope.paginationConf.currentPage;
    $scope.proInst.pageSize = $scope.paginationConf.itemsPerPage;
    $scope.proInst.docNameOrTitle = $scope.titleDocFullName;

    if (SysUtils.notEmpty($scope.titleDocFullName, '')) {
      $scope.initPaging();
      $scope.initCuTask();
      return;
    } else {
      $scope.initCuTask();
    }
  };

  $scope.pageAutoOpinion = function (id) {
    $scope.pageOpinionParam = {};
    $scope.pageOpinionParam.paging = "No";
    $scope.pageOpinionParam.pageNo = $scope.opinionPaginationConf.currentPage;
    $scope.pageOpinionParam.pageSize = $scope.opinionPaginationConf.itemsPerPage;
    if (!SysUtils.isEmpty(id)) {
      $scope.pageOpinionParam.flowId = id;
    } else {
      return;
    }
    console.log($scope.pageOpinionParam.flowId);
    $scope.initOpinion();
  };

  $scope.pageAutoDeleteOpinion = function (id) {
    $scope.pageOpinionDeleteParam = {};
    $scope.pageOpinionDeleteParam.paging = "No";
    $scope.pageOpinionDeleteParam.pageNo = $scope.deletePpinionPaginationConf.currentPage;
    $scope.pageOpinionDeleteParam.pageSize = $scope.deletePpinionPaginationConf.itemsPerPage;
    if (!SysUtils.isEmpty(id)) {
      $scope.pageOpinionDeleteParam.flowId = id;
      $scope.pageOpinionDeleteParam.state = "delete";
    } else {
      return;
    }
    $scope.initDeleteOpinion();
  };


  $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.pageAuto);
  /* $scope.$watch('opinionPaginationConf.currentPage + opinionPaginationConf.itemsPerPage', $scope.pageAutoOpinion());
   $scope.$watch('deletePpinionPaginationConf.currentPage + deletePpinionPaginationConf.itemsPerPage', $scope.pageAutoDeleteOpinion());*/


  $scope.initCuTask = function () {
    SysUtils.requestByJson('/rProcessInstance/authOpinionlist', $scope.proInst, function (resultInfo) {
      $scope.currTaskList = resultInfo.beanList;
      //console.log($scope.currTaskList);
      $scope.paginationConf.totalItems = resultInfo.totalRows;
      $scope.$apply();
    })
  }

  $scope.initOpinion = function () {
    SysUtils.requestByJson('/wfOpinion/list', $scope.pageOpinionParam, function (resultInfo) {
      $scope.currOpinionList = resultInfo.beanList;
      //console.log($scope.currOpinionList);
      $scope.pageOpinionParam.totalItems = resultInfo.totalRows;
      $scope.$apply();
    })
  }

  $scope.initDeleteOpinion = function () {
    SysUtils.requestByJson('/wfOpinion/list', $scope.pageOpinionDeleteParam, function (resultInfo) {
      $scope.currDeleteOpinionList = resultInfo.beanList;
      console.log($scope.currDeleteOpinionList);
      $scope.pageOpinionDeleteParam.totalItems = resultInfo.totalRows;
      $scope.$apply();
    })
  }

  $scope.showDetail = function (modal) {
    $scope.proInst.pageNo = 1;
    $scope.proInst.pageSize = $scope.paginationConf.itemsPerPage;
    $('#' + modal).modal('show');
  }

  $scope.enterKeyup = function (e) {

    //IE 编码包含在window.event.keyCode中，Firefox或Safari 包含在event.which中
    var keycode = window.event ? e.keyCode : e.which;

    if (keycode == 13) {
      $scope.pageAuto();
    } else {
      return;
    }
  };


  /*************************三、初始化调用****************************/
  //$scope.initCuTask();


  $timeout(function () {
    $('.content-wrapper').css('height', SysUtils.get_content_wrapper());
    $('#panel-body-table').css('height', $('.content').height() - $('#panel-heading').outerHeight(true));
    //console.log($('.content').height()+"=="+$('#panel-heading').outerHeight(true)+"==="+$('#ceter_p').height());
    $('.table_shadow').css('max-height', $('.content').height() - $('#panel-heading').outerHeight(true) - $('#ceter_p').outerHeight());
  });
}]);