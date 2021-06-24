myApp.controller('agentSettingCtrl', ['$rootScope','$scope', 'ENV', '$state', 'dataFactory', 'NodeTreeTool', '$filter', 'SysUtils',   function ($rootScope,$scope, ENV, $state, dataFactory, NodeTreeTool, $filter, SysUtils  ) {

    $scope.queryBean = {};
    $scope.dbUsers = [];
    $scope.allUsersRoot = {};
    $scope.selectedUsers = [];
    $scope.usearAgentList = [];
    $scope.userModalConfirmAction = '';
    $scope.userModalHeadMsg = '';
    $scope.sessonCu = $rootScope.currentUser;

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

    $scope.queryUsearAgentList = function () {
        $scope.queryBean = {};
        $scope.queryBean.id = $scope.sessonCu.id;
        $scope.queryBean.name = $scope.sessonCu.name;
        $scope.queryBean.username = $scope.sessonCu.username;

        SysUtils.requestByJson("/coreUser/usearAgentList", $scope.queryBean, function (resultInfo) {
            $scope.usearAgentList = resultInfo.beanList;
            console.log($scope.usearAgentList);
            $scope.$applyAsync();
        });
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

    $scope.chooseUsers = function (action) {
        $scope.selectedUsers = [];
        $scope.userSearchStr = "";
        $scope.paginationConf.currentPage = 1;
        $scope.paginationConf.itemsPerPage = 10;
        $scope.userModalConfirmAction = action;

        if (action == '$scope.byAgent()') {
            $scope.userModalHeadMsg = '将当前用户代理权限授予以下用户：';
            $scope.pageAuto();
            $scope.byAgentFlag = true;
        }else {
            $scope.userModalHeadMsg = '收回当前用户代理权限：';
            $scope.byAgentFlag = false;
            $scope.dbUsers = $scope.usearAgentList[0].byAgentUser;
        }

        $('#userModal').modal('show');
        $scope.$applyAsync();
    };

    $scope.execNgScript = function (actionStr) {
        eval(actionStr)
    };

    $scope.byAgent = function () {
        $('#userModal').modal('hide');
        for (i = 0; i < $scope.selectedUsers.length; i++) {
            $scope.selectedUsers[i].noRepeat = true;
            if (!$scope.selectedUsers[i].id  || $scope.selectedUsers[i].id == $scope.sessonCu.id) {
                $scope.selectedUsers[i].noRepeat = false;
            } else {
                for (j = 0; j < $scope.usearAgentList[0].byAgentUser.length; j++) {
                    if ($scope.selectedUsers[i].id == $scope.usearAgentList[0].byAgentUser[j].id) {
                        $scope.selectedUsers[i].noRepeat = false;
                        break;
                    }
                }
            }
        }
        $scope.selectedUsers = $scope.selectedUsers.filter(function (value) {
            return value.noRepeat;
        });



        SysUtils.requestByJson("/coreUser/byAgent/" + $scope.sessonCu.id, $scope.selectedUsers, function (resultInfo) {
            swal("成功", resultInfo.message, "success");
            $scope.queryUsearAgentList();
        });
    };

    $('#userModal').on('show.bs.modal', function () {
        $scope.allUsersRoot = {};
        $scope.selectedUsers = [];
        $scope.$applyAsync();
    });
    $('#userModal').on('hidden.bs.modal', function () {
        for (j = 0; j < $scope.dbUsers.length; j++) {
            $scope.dbUsers[j].checked = false;
        }
        $scope.$applyAsync();
    });

    $scope.delAgent = function () {
        $('#userModal').modal('hide');

        for (i = 0; i < $scope.selectedUsers.length; i++) {
            $scope.selectedUsers[i].noRepeat = true;
            if (!$scope.selectedUsers[i].id ) {
                $scope.selectedUsers[i].noRepeat = false;
            }
        }
        $scope.selectedUsers = $scope.selectedUsers.filter(function (value) {
            return value.noRepeat;
        });


        mapToDb = {};
        mapToDb.tuDelByAgentUsers = $scope.selectedUsers;

        SysUtils.requestByJson("/coreUser/delAgent/" + $scope.sessonCu.id, mapToDb, function (resultInfo) {
            swal("成功", resultInfo.message, "success");
            $scope.queryUsearAgentList();
        });
    };

    /**********************************初始化调用***************************************************/
    $scope.queryUsearAgentList();
}]);