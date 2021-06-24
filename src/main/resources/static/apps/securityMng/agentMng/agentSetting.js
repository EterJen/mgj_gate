myApp.controller('overallAgentMngCtl', ['$rootScope','$scope', 'ENV', '$state', 'dataFactory', 'NodeTreeTool', '$filter', 'SysUtils', 'maxHeigtTool',  function ($rootScope,$scope, ENV, $state, dataFactory, NodeTreeTool, $filter, SysUtils, maxHeigtTool ) {
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

    $scope.userSearchStr = '';

    $scope.pageAuto = function () {
        $scope.allUsersRoot = {};
        $scope.queryBean = {};
        $scope.queryBean.flag = 1;
        $scope.queryBean.paging = "Yes";
        $scope.queryBean.pageNo = $scope.paginationConf.currentPage;
        $scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
        $scope.queryBean.name = $scope.userSearchStr;
        $scope.queryBean.username = $scope.userSearchStr;
        $scope.queryUsear();
    };

    $scope.checkUserParent = function (u) {
        var flag = u.checked;
        if (flag) {
            u.checked = false;
        } else {
            u.checked = true;
        }
        $scope.nodeTrClick(null, $scope.allUsersRoot, null, $scope.dbUsers, null)
        $scope.$applyAsync();
    };

    $scope.checkDelByAgentParent = function (u) {
        var flag = u.checked;
        if (flag) {
            u.checked = false;
        } else {
            u.checked = true;
        }
        $scope.byAgentNodeTrClick(null, $scope.byAgentUsersRoot, null, $scope.selectAgentSetUser.byAgentUser, null)
        $scope.$applyAsync();
    };
    $scope.checkDelAgentParent = function (u) {
        var flag = u.checked;
        if (flag) {
            u.checked = false;
        } else {
            u.checked = true;
        }
        $scope.agentNodeTrClick(null, $scope.agentUsersRoot, null, $scope.selectAgentSetUser.agentUser, null)
        $scope.$applyAsync();
    };

    $scope.checkUserChildren = function (u) {
        var flag = u.checked;
        if (flag) {
            u.checked = false;
        } else {
            u.checked = true;
        }
        $scope.nodeTrClick($scope.allUsersRoot, u, $scope.dbUsers, null, null)
        $scope.$applyAsync();
    };
    $scope.checkByAgentUserChildren = function (u) {
        var flag = u.checked;
        if (flag) {
            u.checked = false;
        } else {
            u.checked = true;
        }
        $scope.byAgentNodeTrClick($scope.byAgentUsersRoot, u, $scope.selectAgentSetUser.byAgentUser, null, null)
        $scope.$applyAsync();
    };
    $scope.checkAgentUserChildren = function (u) {
        var flag = u.checked;
        if (flag) {
            u.checked = false;
        } else {
            u.checked = true;
        }
        $scope.agentNodeTrClick($scope.agentUsersRoot, u, $scope.selectAgentSetUser.agentUser, null, null)
        $scope.$applyAsync();
    };

    $scope.enterKeyup = function (e) {
        var keycode = window.event ? e.keyCode : e.which;
        if (keycode == 13) {
            $scope.pageAuto();
        }
    };

    $scope.nodeTrClick = function (parentNode, selfNode, siblingNodes, sonNodes, event) {
        /*选中自己*/
        /*   if (NodeTreeTool.isFalse(selfNode.checked)) {
         selfNode.checked = true;
         } else {
         selfNode.checked = false;
         }*/

        /*选中相关*/
        NodeTreeTool.relatedCheck(parentNode, selfNode, siblingNodes, sonNodes);

        /*根据需要统计选中结果*/
        $scope.selectedUsers = NodeTreeTool.checkedCount(parentNode, selfNode, siblingNodes, sonNodes, $scope.selectedUsers);
    };

    $scope.agentNodeTrClick = function (parentNode, selfNode, siblingNodes, sonNodes, event) {
        /*选中自己*/
        /*   if (NodeTreeTool.isFalse(selfNode.checked)) {
         selfNode.checked = true;
         } else {
         selfNode.checked = false;
         }*/

        /*选中相关*/
        NodeTreeTool.relatedCheck(parentNode, selfNode, siblingNodes, sonNodes);

        /*根据需要统计选中结果*/
        $scope.tuDelAgentUsers = NodeTreeTool.checkedCount(parentNode, selfNode, siblingNodes, sonNodes, $scope.tuDelAgentUsers);

    };
    $scope.byAgentNodeTrClick = function (parentNode, selfNode, siblingNodes, sonNodes, event) {
        /*选中自己*/
        /*   if (NodeTreeTool.isFalse(selfNode.checked)) {
         selfNode.checked = true;
         } else {
         selfNode.checked = false;
         }*/

        /*选中相关*/
        NodeTreeTool.relatedCheck(parentNode, selfNode, siblingNodes, sonNodes);

        /*根据需要统计选中结果*/
        $scope.tuDelByAgentUsers = NodeTreeTool.checkedCount(parentNode, selfNode, siblingNodes, sonNodes, $scope.tuDelByAgentUsers);

    };

    $scope.queryUsear = function () {
        SysUtils.requestByJson("/coreUser/searchUser", $scope.queryBean, function (resultInfo) {
            $scope.dbUsers = resultInfo.beanList;
            $scope.paginationConf.totalItems = resultInfo.totalRows;
            $scope.$applyAsync();
        });
    };

    $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.pageAuto);
    //</editor-fold>


    //<editor-fold desc="用户代理列表分页配置">
    $scope.agentListPc = {
        currentPage: 1,
        totalItems: 80,
        itemsPerPage: 10,
        pagesLength: 13,
        perPageOptions: [10, 20, 30, 40, 50],
        onChange: function () {
        }
    };


    $scope.agentListPageAuto = function () {
        $scope.selectAgentSetUser = {};
        $scope.agentSetUsers = [];
        $scope.queryBean = {};
        $scope.queryBean.paging = "Yes";
        $scope.queryBean.pageNo = $scope.agentListPc.currentPage;
        $scope.queryBean.pageSize = $scope.agentListPc.itemsPerPage;
        $scope.queryUsearAgentList();
    };

    $scope.pointAgentUser = function (u) {
        $scope.selectAgentSetUser = u;
        $scope.$applyAsync();
    }

    $scope.agentUserNameKU = function (e) {
        var keycode = window.event ? e.keyCode : e.which;
        if (keycode == 13) {
            $scope.queryUsearAgentList();
        }
    };


    $scope.queryUsearAgentList = function () {
        $scope.queryBean = {};
        $scope.queryBean.flag = 1;
        $scope.queryBean.paging = "Yes";
        $scope.queryBean.pageNo = $scope.agentListPc.currentPage;
        $scope.queryBean.pageSize = $scope.agentListPc.itemsPerPage;
        $scope.queryBean.name = $scope.agentUserName;
        $scope.queryBean.username = $scope.agentUserName;

        SysUtils.requestByJson("/coreUser/agentSetting/usearAgentList", $scope.queryBean, function (resultInfo) {
            $scope.agentSetUsers = resultInfo.beanList;
            $scope.agentListPc.totalItems = resultInfo.totalRows;
            $scope.selectAgentSetUser = {};
            $scope.$applyAsync();
        });
    };


    $scope.$watch('agentListPc.currentPage + agentListPc.itemsPerPage', $scope.agentListPageAuto);
//</editor-fold>

    $scope.chooseUsers = function (action, modalId) {
        $scope.selectedUsers = [];
        $scope.userSearchStr = "";
        $scope.paginationConf.currentPage = 1;
        $scope.paginationConf.itemsPerPage = 10;
        $scope.pageAuto();
        $scope.userModalConfirmAction = action;
        if (action == '$scope.byAgent()') {
            $scope.userModalHeadMsg = '将<' +
                $scope.selectAgentSetUser.name +
                '>用户的代理权限授予以下被选中用户：';

        }else if (action == '$scope.delAgent()') {
            $scope.userModalHeadMsg = '删除<' +
                $scope.selectAgentSetUser.name +
                '>用户以下选择的代理权限：';
        }else {
            $scope.userModalHeadMsg = '为<' +
                $scope.selectAgentSetUser.name +
                '>用户获取以下被选中用户的代理权限：';
        }
        $('#' + modalId).modal('show');
        $scope.$applyAsync();
    };

    $scope.execNgScript = function (actionStr) {
        eval(actionStr)
    };


    $scope.byAgent = function () {

        $('#userModal').modal('hide');
        for (i = 0; i < $scope.selectedUsers.length; i++) {
            $scope.selectedUsers[i].noRepeat = true;
            if (!$scope.selectedUsers[i].id  || $scope.selectedUsers[i].id == $scope.selectAgentSetUser.id) {
                $scope.selectedUsers[i].noRepeat = false;
            } else {
                for (j = 0; j < $scope.selectAgentSetUser.byAgentUser.length; j++) {
                    if ($scope.selectedUsers[i].id == $scope.selectAgentSetUser.byAgentUser[j].id) {
                        $scope.selectedUsers[i].noRepeat = false;
                        break;
                    }
                }
            }
        }



        $scope.selectedUsers = $scope.selectedUsers.filter(function (value) {
            return value.noRepeat;
        });



        SysUtils.requestByJson("/coreUser/byAgent/" + $scope.selectAgentSetUser.id, $scope.selectedUsers, function (resultInfo) {
            swal("成功", resultInfo.message, "success");
            $scope.queryUsearAgentList();
        });
    };

    $scope.addAgent = function () {
        $('#userModal').modal('hide');
        for (i = 0; i < $scope.selectedUsers.length; i++) {
            $scope.selectedUsers[i].noRepeat = true;
            if (!$scope.selectedUsers[i].id  || $scope.selectedUsers[i].id == $scope.selectAgentSetUser.id) {
                $scope.selectedUsers[i].noRepeat = false;
            } else {
                for (j = 0; j < $scope.selectAgentSetUser.agentUser.length; j++) {
                    if ($scope.selectedUsers[i].id == $scope.selectAgentSetUser.agentUser[j].id) {
                        $scope.selectedUsers[i].noRepeat = false;
                        break;
                    }
                }
            }
        }
        $scope.selectedUsers = $scope.selectedUsers.filter(function (value) {
            return value.noRepeat;
        });



        SysUtils.requestByJson("/coreUser/addAgent/" + $scope.selectAgentSetUser.id, $scope.selectedUsers, function (resultInfo) {
            swal("成功", resultInfo.message, "success");
            $scope.queryUsearAgentList();
        });
    };

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


    $scope.delAgent = function () {
        $('#delAgentModal').modal('hide');

        for (i = 0; i < $scope.tuDelByAgentUsers.length; i++) {
            $scope.tuDelByAgentUsers[i].noRepeat = true;
            if (!$scope.tuDelByAgentUsers[i].id ) {
                $scope.tuDelByAgentUsers[i].noRepeat = false;
            }
        }
        $scope.tuDelByAgentUsers = $scope.tuDelByAgentUsers.filter(function (value) {
            return value.noRepeat;
        });
        for (i = 0; i < $scope.tuDelAgentUsers.length; i++) {
            $scope.tuDelAgentUsers[i].noRepeat = true;
            if (!$scope.tuDelAgentUsers[i].id ) {
                $scope.tuDelAgentUsers[i].noRepeat = false;
            }
        }
        $scope.tuDelAgentUsers = $scope.tuDelAgentUsers.filter(function (value) {
            return value.noRepeat;
        });

        mapToDb = {};
        mapToDb.tuDelAgentUsers = $scope.tuDelAgentUsers;
        mapToDb.tuDelByAgentUsers = $scope.tuDelByAgentUsers;

        SysUtils.requestByJson("/coreUser/delAgent/" + $scope.selectAgentSetUser.id, mapToDb, function (resultInfo) {
            swal("成功", resultInfo.message, "success");
            $scope.queryUsearAgentList();
        });
    };
    /*计算布局高度*/
    $scope.calculatedHeight=function(){
        $('.content-wrapper').css('height', SysUtils.get_content_wrapper());
        //console.log("=ceter_p=="+$('#panel-heading').outerHeight(true));
        $('#panel-body-table').css('height',$('.content').height()-$('#panel-heading').outerHeight(true));
        $('.table_shadow').css('max-height',$('.content').height()-$('#panel-heading').outerHeight(true)-$('#ceter_p').outerHeight());
    }

    $scope.calculatedHeight();


}]);