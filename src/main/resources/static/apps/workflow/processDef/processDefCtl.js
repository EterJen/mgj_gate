myApp.controller('processDefListCtrl', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils', 'dataFactory', '$timeout', 'maxHeigtTool', function ($rootScope, $scope, ENV, $state, SysUtils, dataFactory, $timeout, maxHeigtTool) {
  console.log("processDefListCtrl controller");

  /*************************一、变量定义****************************/
  $scope.currentUser = $rootScope.currentUser;
  $scope.processDefManage = {};
  $scope.postProcessPdm = {};
  $scope.processVersionEditBean = {};
  $scope.processDefList = [];
  $scope.processVersionList = [];
  $scope.mode = '';
  $scope.versionMode = '';


  $scope.selectedProcessDefInfo = null;
  $scope.RFormCommon = {};
  $scope.attUploadInfo = null;
  $scope.uselessList = true;
  $scope.isAttachShow = false;
  $scope.showWps = true;
  $scope.processActionSetting = false;
  $scope.orgNavType = "usefulProcess";
  $scope.formActionMap = {};
  $scope.formActionList = {};

  //$scope.showWps = true;
  $scope.fc = {
    fujianMidAttList       : [],
    attachHistoryList      : [],
    currentGroupOwnerAttach: null
  };
  $scope.formDefOptions = [
    {id: 'fawen', name: "长城电子发文"},//长城电子发
    {id: 'hjxgffawen', name: "长城电子规范发文"},//长城电子规范发文
    {id: 'jxwdwfawen', name: "长城电子党工发文"},//长城电子党委发文
//    {id: 'gfkgbfawen', name: "国防办发文"},//沪府国防办发

    {id: 'jxwshouwen', name: "长城电子收"},//长城电子收
    {id: 'jxwdwshouwen', name: "长城电子党工收文"}, //长城电子党委收文
    {id: 'jywjj', name: "机要文件甲"}, //中央文件（甲）
    {id: 'jywjy', name: "机要文件乙"}, //市委文件（乙）
    {id: 'jywjb', name: "机要文件丙"}, //市府文件（丙）
    {id: 'jywjg', name: "机要文件国"}, //国务院文件（国）

    {id: 'jxwxinhan', name: "信函"}  //信函
  ];
  $scope.flowActionFlags = [{id: '1', val: '有效流程'}, {id: '0', val: '失效流程'}];
  /*************************二、函数定义****************************/

  $scope.newPfa = function () {
    $("#formActionForm").get(0).reset();
    $scope.selectedActionForm = {};
    $scope.selectedActionForm.flag = "1";
    $scope.mode = 'create';
    $('#formActionDialog').modal('show');
  }


  $scope.delPfa = function (obj) {
    SysUtils.swalConfirm("提示", "是否删除此操作", "info", function (isConfirm) {
      if (isConfirm) {
        $scope.selectedActionForm = obj;
        $scope.mode = "update";
        $scope.selectedActionForm.flag = "0";
        $scope.saveProcessFormAction();
      }
    });
  }

  $scope.reusePfa = function (obj) {
    SysUtils.swalConfirm("提示", "是否恢复此操作使用", "info", function (isConfirm) {
      if (isConfirm) {
        $scope.selectedActionForm = obj;
        $scope.mode = "update";
        $scope.selectedActionForm.flag = "1";
        $scope.saveProcessFormAction();
      }
    });

  }


  $scope.pageAuto = function () {
    $scope.queryFormActionMapAndList(1);
  };
  $scope.queryFormActionMapAndList = function (flag) {
    var queryBean = {};
    queryBean.paging = "No";
    queryBean.flag = flag;
    SysUtils.requestByJson('/formAction/listAndMap', queryBean, function (resultInfo) {
      $scope.formActionMap = resultInfo.additionalInfo.dbParams;
      $scope.formActionList = resultInfo.beanList;
      $('#table_body').css('height', window_height - $('.main-header').outerHeight() - $('#toolBar').outerHeight() - $('#table_head').outerHeight() - 20);
      $scope.processActionSetting = true;
      $scope.$applyAsync();
    });
  }


  $scope.saveProcessFormAction = function () {
    SysUtils.postWhithBackInf('/formAction/' + $scope.mode, $scope.selectedActionForm, function (resultInfo) {
      $('#formActionDialog').modal('hide');
      $scope.queryFormActionMapAndList('1');
      $scope.$applyAsync();
    });
  }


  $scope.isUpdate = false;

  $scope.updatePdmBefore = function () {
    $scope.postProcessPdm = $scope.selectedProDef;
    $scope.updatePdm();
  }

  $scope.updatePdm = function () {
    $(".flyover").show();
    $.ajax({
      type      : "POST",
      url       : ENV.localapi + "/processDefManage/update",
      beforeSend: function (request) {
        request.setRequestHeader("Content-type", "application/json");
        //request.setRequestHeader("Authorization", "Bearer " + $cookies.getObject('user').token);
      },
      dataType  : 'json',
      data      : JSON.stringify($scope.postProcessPdm),
      success   : function (resultInfo) {
        $(".flyover").hide();
        SysUtils.handleResult(resultInfo, {'state': $state}, function () {
          $scope.queryProcessDefManage();
          $scope.initVars();
          $scope.$apply();
        })
      },
      error     : function (XMLResponse) {
        $(".flyover").hide();
        console.log(JSON.stringify(XMLResponse));
      }
    })
  }


  $('#ProcessDefManageDialog').on('hidden.bs.modal', function () {
    $("#pdmEditForm").get(0).reset();
    $scope.initVars();
    $scope.isUpdate = false;
    $scope.$applyAsync();
  });


  $scope.selectedProDef = {};
  $scope.selectedProDefGroup = {};


  $scope.addProcessVersionInfo = function () {
    if ($scope.selectedProcessDefInfo == null) {
      SysUtils.swalOnlyConfirm("提示", '请选择流程定义', "info", function (isConfirm) {

      });
      return;
    }
    $scope.processVersionEditBean = {processDefId: $scope.selectedProcessDefInfo.id, isActive: '0'};
    $scope.versionMode = 'create';
    $('#ProcessVersionDialog').modal('show');
  }

  $scope.closeProcessVersionDialog = function () {
    $('#ProcessVersionDialog').modal('hide');
  }


  $scope.goToVisualEditor = function (processVersion) {
    /*		var mode = '';
     if(processVersion.filePath==null)
     mode = 'create';
     else
     mode = 'update';
     */
    console.log("sdf");
    window.open(ENV.localapi + "/visualWF/index2.html?processVersionId=" + processVersion.id);
  }


  /*************************三、初始化调用****************************/
  $scope.queryProcessDefManage();

  $scope.$on('$viewContentLoaded', function () {
    /*
     $("#processDefListTable").on("click-row.bs.table",function(e,row,ele){
     $(".danger").removeClass("danger");
     $(ele).addClass("danger");
     });*/
  });
  /*================wps初始化====start===================*/
  var DocFrame;
  var obj = null;
  var app;
  var MenuItems = {
    FILE  : 1 << 0,
    EDIT  : 1 << 1,
    VIEW  : 1 << 2,
    INSERT: 1 << 3,
    FORMAT: 1 << 4,
    TOOL  : 1 << 5,
    CHART : 1 << 6,
    HELP  : 1 << 7
  };
  var FileSubmenuItems = {
    NEW      : 1 << 0,
    OPEN     : 1 << 1,
    CLOSE    : 1 << 2,
    SAVE     : 1 << 3,
    SAVEAS   : 1 << 4,
    PAGESETUP: 1 << 5,
    PRINT    : 1 << 6,
    PROPERTY : 1 << 7
  };

  /*
   $scope.openWps = function () {
   //$scope.fc.wpsDetail.middleContentType = 'form';
   if (SysUtils.isWindows()) {
   DocFrame = SysUtils.openWps(DocFrame, obj, app, "wpsContent", "100%", "100%");
   DocFrame.createDocument("uot");
   } else {
   obj = SysUtils.initLinux("wpsContent", "100%", "100%");
   //obj = this.initLinux(tagID, width, height);
   var Interval_control = setInterval(
   function () {
   app = obj.Application;
   if (app && app.IsLoad()) {
   clearInterval(Interval_control);
   app.createDocument("wps");
   }
   }, 500);
   }
   }
   */

  $scope.fc.fileUpload = function () {
    accUrl = ENV.localapi + "/attachment/upload";
    if (SysUtils.isEmpty($scope.attUploadInfo.annexDescription)) {
      swal("提示", "附件说明必须填写", "info");
      return;
    }
    var fd = new FormData();
    var file = $scope.fc.headPortrait;
    if ($scope.fc.currentGroupOwnerAttach !== null)
      $scope.attUploadInfo.id = $scope.fc.currentGroupOwnerAttach.id;
    $scope.attUploadInfo.initType = "add";
    //console.log(JSON.stringify($scope.attUploadInfo));
    fd.append('file', file);
    //fd.append('fileType', "HeadPortrait");
    fd.append('selectedBean', JSON.stringify($scope.attUploadInfo));
    fd.append('isWindows', SysUtils.isWindows());
    dataFactory.getlist(accUrl, 'POST', {'Content-type': undefined}, fd).then(
            function (d) {
              console.log(JSON.stringify(d));
              SysUtils.handleResult(d, {'state': $state}, function () {
                swal("提示", d.message, "success");
                $('#uploadAttach').modal('hide');
                //查询主附件所需要的参数
                $scope.attUploadInfo = {
                  processInstanceId: $scope.fc.processDef.id,
                  bizAttachType    : "taohongmoban",
                  bizFileType      : "content"
                }
                $scope.fc.queryAttach($scope.attUploadInfo, "open");
              })
            },
            function (d) {
              console.log(JSON.stringify(d));
            }
    )
  };
  $scope.enclosureAction = function (action, attach) {
    var attachUrl;
    if (action === 'download') {
      attachUrl = ENV.localapi + "/attach/downloadWps?id=" + attach.attachment.id;
      var xhr = new XMLHttpRequest();
      xhr.open("get", attachUrl);
      xhr.responseType = "blob";
      xhr.setRequestHeader("Content-Type", "multipart/form-data");
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          var name = xhr.getResponseHeader("Content-disposition");
          var filename = name.substring(20, name.length);
          var blob = new Blob([xhr.response], {type: 'text/doc'});
          var csvUrl = URL.createObjectURL(blob);
          var link = $("#aa");
          link.href = csvUrl;
          link.download = attach.filename;
          link.click();
        }
      };
      xhr.send(null);
    } else if (action === 'delete') {
      attachUrl = ENV.localapi + "/attachment/delete/" + attach.attachment.id;
      dataFactory.getlist(attachUrl, 'POST', {'Content-type': "application/json"}, JSON.stringify(attach)).then(
              function (d) {
                SysUtils.handleResult(d, {'state': $state}, function () {
                  swal("提示", d.message, "success");
                  $scope.fc.queryHistoryAttach();
                  //$scope.fc.queryAttach($scope.fc.currentGroupOwnerAttach);
                })
              },
              function (d) {
                console.log(JSON.stringify(d));
              }
      )
    } else if (action === "open") {
      $scope.fc.currentAttach = attach;
      $scope.fc.wpsDetail.middleContentType = 'wps';
      console.log("地址==" + ENV.localapi + attach);
      /*var aa = DocFrame.openDocumentRemote(ENV.localapi+attach.url,false);*/
      var aa = SysUtils.openDocumentRemote(DocFrame, app, ENV.localapi + attach.url, false);

    }
  }
  $scope.fc.SendDataToServer = function () {
    console.log('附件信息：' + JSON.stringify($scope.attUploadInfo));
    var params = "";
    params += "processInstanceId=" + $scope.fc.processDef.id;
    params += "&bizAttachType=" + $scope.attUploadInfo.bizAttachType;
    params += "&bizFileType=" + $scope.attUploadInfo.bizFileType;
    params += "&fileExt=" + $scope.attUploadInfo.fileExt;
    params += "&isWindows=" + SysUtils.isWindows();
    params += "&userId=" + $scope.currentUser.id;
    var saveUrl = ENV.localapi + "/attach/uploadWps?" + params;
    if ($scope.fc.currentGroupOwnerAttach == null) {//新建
      var defaultText = $scope.fc.processDef.name + ".wps";
      var name = prompt("请输入要保存的名称", defaultText);
      if (name != null && name != "") {
        //var ret = DocFrame.saveURL(saveUrl, name);
        var ret = SysUtils.saveURL(DocFrame, app, saveUrl, name);
        if (ret) {
          //$scope.fc.wpsDetail.middleContentType = 'form';
          $scope.fc.queryAttach($scope.attUploadInfo);
          alert('保存成功');
        }
      }
    } else {//更新
      saveUrl += "&id=" + $scope.fc.currentGroupOwnerAttach.id;
      var ret = SysUtils.saveURL(DocFrame, app, saveUrl, $scope.fc.currentGroupOwnerAttach.attachment.filename);
      if (ret) {
        //$scope.fc.wpsDetail.middleContentType = 'form';
        $scope.fc.queryAttach($scope.attUploadInfo);
        alert('保存成功');
      }
    }
  }
  $scope.loadVersionFormId = function (processDef) {
    $scope.isAttachShow = true;
    $scope.fc.processDef = processDef;
    $scope.attUploadInfo = {
      processInstanceId: $scope.fc.processDef.id,
      bizAttachType    : "taohongmoban",
      bizFileType      : "content"
    }
    $scope.fc.queryAttach($scope.attUploadInfo, "open");
    /*$scope.attUploadInfo = {
     processInstanceId: processDef.id,
     bizAttachType: "taohongmoban",
     bizFileType:"content"
     };
     $scope.attUploadInfo = {
     id:datas.id,
     processInstanceId: datas.processInstanceId,
     bizAttachType: datas.bizAttachType,
     bizFileType:datas.bizFileType
     };
     $scope.task.belongingProInst.fujianMidAttList=[];//附件初始化
     $('#uploadAttach').modal('show');*/
  }
  $scope.fc.returnForm = function () {
    $scope.isAttachShow = false;
  }
  //添加正文
  $scope.addAttachment = function (type) {
    $scope.fc.currentAttach = null;
    $scope.fc.currentGroupOwnerAttach = null;//组主信息
    $scope.showWps = false;
    if (type === "zhengwen") {
      $scope.attUploadInfo = {
        bizAttachType: 'zhengwen',//正文
        bizFileType  : 'content',//内容
        fileExt      : 'wps'//后缀
      }
      SysUtils.createDocument(DocFrame, app);
    } else if (type === "add") {
      $scope.attUploadInfo = {
        processInstanceId: $scope.fc.processDef.id,
        bizAttachType    : "taohongmoban",
        bizFileType      : "content",
        fileExt          : 'wps'
      };
      $scope.fc.fujianMidAttList = [];//附件初始化
      //$scope.fc.queryAttach();//查询附件
      $('#uploadAttach').modal('show');
    }
  }
  //查询版本记录
  $scope.fc.queryAttach = function (middelAttach, action) {
    middelAttach.groupLeaderId = middelAttach.id;
    dataFactory.getlist(ENV.localapi + "/middleAttachment/gethistoricalVersion", 'POST', {'Content-type': "application/json"}, JSON.stringify(middelAttach)).then(
            function (d) {
              if (action === "history") {
                $scope.fc.attachHistoryList = d.beanList;
                $('#uploadAttach').modal('show');
              } else if (action === "open" && d.beanList !== null && d.beanList.length === 1) {
                $scope.fc.attachList = d.beanList;
                $scope.fc.openDocumentText($scope.fc.attachList[0], "groupOwner");
              } else if (d.beanList !== null && d.beanList.length === 1) {
                $scope.fc.attachList = d.beanList;
                $scope.fc.currentGroupOwnerAttach = d.beanList[0];
              } else
                $scope.fc.attachList = d.beanList;

            },
            function (d) {
              console.log(JSON.stringify(d));
            }
    )
  };
  //查询历史按钮事件
  $scope.fc.queryHistoryAttach = function () {
    if ($scope.fc.currentGroupOwnerAttach === null) {
      swal("提示", "请先上传模板！", "info");
    } else {
      $scope.showWps = false;
      //console.log("=="+JSON.stringify($scope.fc.currentGroupOwnerAttach));
      $scope.fc.queryAttach($scope.fc.currentGroupOwnerAttach, "history");
    }
  }

  $scope.fc.openDocumentText = function (attachMiddle, type) {//打开正文或者附件
    $scope.fc.currentAttach = attachMiddle;
    //$scope.showWps=true;
    if (type === "groupOwner") {
      $scope.fc.currentGroupOwnerAttach = attachMiddle;
    }
    var fileType = SysUtils.getFileExt($scope.fc.currentAttach.attachment.filename);
    var bizFileType = $scope.fc.currentAttach.bizFileType;
    //$scope.fc.wpsDetail.middleContentType = 'wps';
    $scope.attUploadInfo = {
      processInstanceId: $scope.fc.processDef.id,
      bizAttachType    : $scope.fc.currentAttach.bizAttachType,//正文
      bizFileType      : bizFileType,//套红
      fileExt          : 'wps'//后缀
    }
    var url = ENV.localapi + "/attach/downloadWps?id=" + $scope.fc.currentAttach.attachment.id;
    if (SysUtils.isWindows()) {
      $timeout(function () {
        console.log("windoes地址====" + url);
        SysUtils.openDocumentRemote(DocFrame, app, url, false);
      }, 1000);
    } else {
      obj = SysUtils.initLinux("wpsContent", "100%", "100%");
      $timeout(function () {
        console.log("linux地址====" + url);
        app = obj.Application;
        if (app && app.IsLoad()) {
          SysUtils.openDocumentRemote(DocFrame, app, url, false);
        }
      }, 1000);
    }
  }

  /*计算布局高度*/
  $scope.calculatedHeight = function () {
    $('.content-wrapper').css('height', SysUtils.get_content_wrapper());
    //console.log("=ceter_p=="+$('#panel-heading').outerHeight(true));
    $('.gdt_cont').css('max-height', $('.content').height());
    $('.details').css('height', $('.content').height());
  }

  $scope.calculatedHeight();

}])