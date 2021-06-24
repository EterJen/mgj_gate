myApp.controller('jxwduwenCtrl', ['$scope', 'ENV', '$state', '$stateParams', 'SysUtils', 'dataFactory', '$ocLazyLoad', function ($scope, ENV, $state, $stateParams, SysUtils, dataFactory, $ocLazyLoad) {
  /*
  字段映射
  密级 task.theCommonFormInfo.secretLevel
  紧急程度  task.theCommonFormInfo.emergenceLevel
  委内公开 publicityLevelDetail.wngk
  信息公开 publicityLevelDetail.zdgk
  来文单位 task.theCommonFormInfo.belongProInst.incomingDocDepart
  来文文号 task.theCommonFormInfo.belongProInst.incomingDocNum
  本件共 task.theCommonFormInfo.belongProInst.incomingNum 份
  收文日期 task.theCommonFormInfo.belongProInst.receiveDocTime
  收文文号 task.theCommonFormInfo.belongProInst.docFullName
  承办部门  task.theCommonFormInfo.belongProInst.chenBanDepart
  限办日期 task.theCommonFormInfo.belongProInst.xianBanTime
  文件名称  task.theCommonFormInfo.belongProInst.title
  市领导批示  task.theCommonFormInfo.belongProInst.cityApproval
  重点督办  task.theCommonFormInfo.belongProInst.pointSupervise
  登录  task.theCommonFormInfo.belongProInst.denluPerson
  登录日期 task.theCommonFormInfo.belongProInst.denluTime
  督办  task.theCommonFormInfo.belongProInst.dubanPerson
  登录日期  task.theCommonFormInfo.belongProInst.dubanTime
  审核  task.theCommonFormInfo.belongProInst.shenhePerson
  审核日期  task.theCommonFormInfo.belongProInst.shenheTime
  * */


  /*************************一、变量定义****************************/
  $scope.$parent.taskId = $stateParams.taskInfoId;//当前的任务id
  $scope.fc.cityApprovalCtl = {};
  /*************************二、函数定义****************************/

  $scope.fc.publicityLevelClick = function (newlevel, cb) {
    SysUtils.swalConfirm("提示", "确定修改文档公开等级吗？", "info", function (isConfirm) {
      if (isConfirm) {
        if ($scope.publicityLevelDetail.currentLevel.contains(newlevel)) {
          $scope.publicityLevelDetail.currentLevel.remove(newlevel);
        } else {
          $scope.publicityLevelDetail.currentLevel = $scope.publicityLevelDetail.currentLevel.concat(newlevel);
        }
        if (cb) {
          cb();
        }

        $scope.task.theCommonFormInfo.publicityLevel = $scope.publicityLevelDetail.currentLevel.join('|');

        $scope.$applyAsync();

        $scope.publicityLevelShow();
      } else {
        return;
      }
    });

  };

  $scope.fc.cityApprovalCtlBlr = function () {
    $scope.fc.cityApprovalCtl.state = "view";
    $scope.fc.cityApprovalCtl.showList = [];
    var showList = $scope.fc.cityApprovalCtl.baseStr.split("\n");
    showList.forEach(function (value, index) {
      var temp = {};
      temp.str = value;
      temp.css = "cityApproval" + (index + 1);
      $scope.fc.cityApprovalCtl.showList.push(temp)
    })

    $scope.$applyAsync();
  }

  $scope.fc.cityApprovalCtlEditAble = false;
  $scope.fc.cityApprovalCtlEdit = function () {
    if (("task" == $scope.task.readMode)) {
        if (SysUtils.strIsTrue($scope.fc, ['formFieldControlMap','市领导批示','isAbleEditHis']) ){
        $scope.fc.cityApprovalCtlEditAble = true;
      }
    } else if (("proInst" == $scope.task.readMode)  ) {
      if (SysUtils.strIsTrue($scope.fc, ['formFieldControlMap','市领导批示','isAbleEditHis']) ){
        $scope.fc.cityApprovalCtlEditAble = true;
      }
    }
  };
  $scope.fc.cityApprovalEdit = function () {
    if (!$scope.fc.cityApprovalCtlEditAble) {
      return;
    }
    $scope.initSldpsActiveOption("sldps");
    $('#OptionModal').modal('show');
  };

  $scope.fc.generateDocfullName = function () {
    if (SysUtils.notEmpty($scope.task.theCommonFormInfo.docNumber, [])) {
      $scope.task.theCommonFormInfo.belongProInst.docFullName = $scope.task.theCommonFormInfo.docPrefix + "（" + $scope.task.theCommonFormInfo.docYear + "）" + SysUtils.PrefixInteger($scope.task.theCommonFormInfo.docNumber, 4);
      $scope.$applyAsync();
    }
  };

  $scope.fc.initCurrTask = function () {
    $scope.fc.cityApprovalCtlEdit();


    if ($scope.task.theCommonFormInfo.belongProInst.pointSupervise == 'true') {
      $scope.task.theCommonFormInfo.belongProInst.pointSupervise = true;
    } else {
      $scope.task.theCommonFormInfo.belongProInst.pointSupervise = false;
    }


    if (SysUtils.notEmpty($scope.task, ['theCommonFormInfo', 'publicityLevel'])) {
      $scope.publicityLevelDetail.currentLevel = $scope.task.theCommonFormInfo.publicityLevel.split('|');
    }

    $scope.publicityLevelShow();
    $scope.$applyAsync();
  }


  /*************************三、初始化调用****************************/


}]);


