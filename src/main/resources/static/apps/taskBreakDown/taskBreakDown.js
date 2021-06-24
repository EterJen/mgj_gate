myApp.config(function ($stateProvider, ENV) {
  $stateProvider.state('taskBreakDown', {
    url        : "/taskBreakDown/:id",
    templateUrl: ENV.templateLocate + "apps/taskBreakDown/taskBreakDown.html?ts=" + timestamp,
    controller : 'TaskBreakDownCtrl'
  });
});

myApp.controller('TaskBreakDownCtrl', ['$scope', '$rootScope', '$state', '$stateParams', 'ENV', 'ProjectInfoService', function ($scope, $rootScope, $state, $stateParams, ENV, ProjectInfoService) {
  console.log('TaskBreakDownCtrl Controller' + ENV.templateLocate + "参数：" + $stateParams.id);
  var projectInfoIdParam = $stateParams.id;
  $scope.selectedTask = {};
  $scope.projectInfo = {};

  $scope.openTaskProgress = function (index) {
    $scope.selectedTask = $scope.projectInfo.tasks[index];
    $('#taskDialog').modal('show');
  }

  $scope.openMoneyProgress = function (projectInfoId, monthNum) {
    alert(projectInfoId + "   " + monthNum);
  }

  $scope.openNodeProgress = function (projectInfoId, monthNum) {
    alert(projectInfoId + "   " + monthNum);
  }

  $scope.closeTask = function () {
    $('#taskDialog').modal('hide');
  }

  $scope.saveTask = function () {
    $.ajax({
      type    : "POST",//
      url     : ENV.localapi + "AllInServlet?operation=saveTaskByStr",//要访问的后台地址
      dataType: 'json',
      data    : "taskStr=" + JSON.stringify($scope.selectedTask),
      success : function (result) {//data为返回的数据，在这里做数据绑定
        alert(result.message);
        $('#taskDialog').modal('hide');
        location.reload();
      },
      error   : function (XMLResponse) {
        console.log(JSON.stringify(XMLResponse));
      }
    });
  }


  $(".flyover").show();
  $.ajax({
    type    : "GET",//
    url     : ENV.localapi + "AllInServlet?operation=getTaskBreakDownInfoByProjectId&projectInfoId=" + projectInfoIdParam,
    dataType: 'json',
    success : function (result) {//data为返回的数据，在这里做数据绑定
      $(".flyover").hide();
      $scope.projectInfo = result.projectInfo;
      $scope.$apply();
    },
    error   : function (XMLResponse) {
      $(".flyover").hide();
      console.log(JSON.stringify(XMLResponse));
    }
  });


}]);   

