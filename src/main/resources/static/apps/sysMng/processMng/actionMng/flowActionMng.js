myApp.controller('flowActionCtl', ['$rootScope','$scope', 'ENV', '$state', 'dataFactory', 'NodeTreeTool', '$filter', 'SysUtils', 'maxHeigtTool', function ($rootScope,$scope, ENV, $state, dataFactory, NodeTreeTool, $filter, SysUtils, maxHeigtTool ) {
    var window_height = $(window).height();
    var heightList = [];
    heightList.push($('.main-header').outerHeight());
    $('#currentTaskContent').css('height', maxHeigtTool.maxHeigt(window_height, heightList));

    $scope.queryBean = {};
    $scope.sessonCu = $rootScope.currentUser;
    $scope.dbUsers = [];
    $scope.allUsersRoot = {};
    $scope.agentUsersRoot = {};
    $scope.byAgentUsersRoot = {};
    $scope.selectedUsers = [];
    $scope.usearAgentList = [];
    $scope.userModalConfirmAction = '';
    $scope.userModalHeadMsg = '';
    $scope.selectAgentSetUser = {};
    $scope.agentSetUsers = [];
    $scope.agentUserName = "";
    $scope.tuDelAgentUsers = [];
    $scope.tuDelByAgentUsers = [];

    //<editor-fold desc="分页配置">
    $scope.paginationConf = {
        currentPage: 1,
        totalItems: 80,
        itemsPerPage: 10,
        pagesLength: 13,
        perPageOptions: [10, 20, 30, 40, 50],
        onChange: function () {
        }
    };
    $scope.flowActionTypes = [{ id: 'currentTaskDeal', val: '代办任务操作'},{ id: 'hisView', val: '历史任务操作'}]
    $scope.flowActionFlags = [{ id: '1', val: '有效动作'},{ id: '0', val: '失效动作'}]

    $scope.userSearchStr = '';
    $scope.flowActionType = 'currentTaskDeal';
    $scope.flowActionflag = '1';

    $scope.pageAuto = function () {
        $scope.allUsersRoot = {};
        $scope.queryBean = {};
        $scope.queryBean.paging = "Yes";
        $scope.queryBean.pageNo = $scope.paginationConf.currentPage;
        $scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
        $scope.queryBean.flag = $scope.flowActionflag;
        $scope.queryBean.actionType = $scope.flowActionType;
        $scope.queryBean.name = $scope.userSearchStr;
        $scope.queryUsear();
    };

    $scope.updatePfa = function (obj) {
        $scope.selectedActionForm =obj;
        $scope.mode = "update";
        $('#formActionDialog').modal('show')
    };
    $scope.saveProcessFormAction = function () {
        SysUtils.postWhithBackInf('/formAction/'+$scope.mode, $scope.selectedActionForm, function (resultInfo) {
            $('#formActionDialog').modal('hide');
            $scope.paginationConf.currentPage = 1;
            $scope.paginationConf.itemsPerPage = 10;
            $scope.userSearchStr = "";
            $scope.pageAuto();
            $scope.$applyAsync();
        });
    };

    $scope.reusePfa = function (obj) {
        SysUtils.swalConfirm("提示", "是否恢复此操作使用", "info", function (isConfirm) {
            if (isConfirm) {
                $scope.selectedActionForm =obj;
                $scope.mode = "update";
                $scope.selectedActionForm.flag = "1";
                $scope.saveProcessFormAction();
            }
        });

    };

    $scope.delPfa = function (obj) {
        SysUtils.swalConfirm("提示", "是否删除此操作", "info", function (isConfirm) {
            if (isConfirm) {
                $scope.selectedActionForm =obj;
                $scope.mode = "update";
                $scope.selectedActionForm.flag = "0";
                $scope.saveProcessFormAction();
            }
        });
    };

    $scope.newPfa = function () {
        $("#formActionForm").get(0).reset();
        $scope.selectedActionForm = {};
        $scope.selectedActionForm.flag = "1";
        $scope.selectedActionForm.actionType = "currentTaskDeal";

        $scope.mode = 'create';
        $('#formActionDialog').modal('show');
    };


    $scope.enterKeyup = function (e) {
        var keycode = window.event ? e.keyCode : e.which;
        if (keycode == 13) {
            $scope.pageAuto();
        }
    };


    $scope.queryUsear = function () {
        SysUtils.requestByJson("/formAction/flowActionMng/searchByEntity", $scope.queryBean, function (resultInfo) {
            $scope.paginationConf.totalItems = resultInfo.totalRows;
            $scope.formActionList = resultInfo.beanList;
            $scope.$applyAsync();
        });
    };

    $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.pageAuto);
    //</editor-fold>

    $('#delAgentModal').on('show.bs.modal', function () {
        $scope.agentUsersRoot = {};
        $scope.byAgentUsersRoot = {};
        $scope.tuDelAgentUsers = [];
        $scope.tuDelByAgentUsers = [];
        $scope.$applyAsync();
    });

    $('#delAgentModal').on('hidden.bs.modal', function () {
        for (j = 0; j < $scope.selectAgentSetUser.byAgentUser.length; j++) {
            $scope.selectAgentSetUser.byAgentUser[j].checked = false;
        }
        for (j = 0; j < $scope.selectAgentSetUser.agentUser.length; j++) {
            $scope.selectAgentSetUser.agentUser[j].checked = false;
        }
        $scope.$applyAsync();
    });

    /*计算布局高度*/
    $scope.calculatedHeight=function(){
        $('.content-wrapper').css('height', SysUtils.get_content_wrapper());
        //console.log("=ceter_p=="+$('#panel-heading').outerHeight(true));
        $('#panel-body-table').css('height',$('.content').height()-$('#panel-heading').outerHeight(true));
        $('.table_shadow').css('max-height',$('.content').height()-$('#panel-heading').outerHeight(true)-$('#ceter_p').outerHeight());
    }

    $scope.calculatedHeight();

}]);