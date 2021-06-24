/*myApp.config(function($stateProvider,ENV) {

	$stateProvider.state('coreHome.roleManageList', {
        url: "/roleManageList",
        views:{
        	'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/roleManage/roleManageList.html?ts=" + timestamp,
				controller: "roleManageListCtrl",
				cache: false,
        	}	
        }
    });
	
}); */


myApp.controller('roleManageListCtrl', ['$rootScope', '$scope', 'ENV', '$state', 'dataFactory', 'NodeTreeTool', '$filter', 'SysUtils', 'maxHeigtTool', function ($rootScope, $scope, ENV, $state, dataFactory, NodeTreeTool, $filter, SysUtils, maxHeigtTool) {
    console.log("roleManageListCtrl controller");

    /*************************一、变量定义****************************/
    $rootScope.addBgground = true;
    $scope.userList = [];
    $scope.isUpdate = true;//初始化角色详情
    $scope.role = "";//点击事件储存角色
    /*************************二、函数定义****************************/
    $scope.cleanCache = function () {
        $scope.cleanCacheType = "exceptLoginInfo";
        $('#cleanCache').modal('show');
    }

    $scope.visible = function (item) {
        return !($scope.query && $scope.query.length > 0
            && item.title.indexOf($scope.query) == -1);
    };
    $scope.remove = function (scope) {
        scope.remove();
    };
    //初始化数据
    $scope.requstList = function () {
        var roleListUrl = ENV.localapi + "/coreRole/roleManage/listTopClick";
        dataFactory.getlist(roleListUrl, 'POST',
            {'Content-type': 'application/json'},
            JSON.stringify({paging: "No"})).then(
            function (d) {
                //console.log(JSON.stringify(d));
                $scope.data = d.beanList;
            }, function (data) {
                console.log(JSON.stringify(data));
            })
    }
    $scope.requstList();
    //点击角色获取角色详情和角色下的用户
    $scope.toRoleContent = function (role, target, action) {
        //console.log(action);
        //点击数菜单变更背景颜色
        if (action === null || action === '' || action === undefined) {
            $(".angular-ui-tree-handle").removeClass("active");
            $(target.currentTarget).addClass("active");
            $scope.role = role;
        }
        var roleDetailsUrl = ENV.localapi + "/coreRole/read/" + role.id;
        dataFactory.getlist(roleDetailsUrl, 'POST',
            {'Content-type': 'application/json'},
            {}).then(
            function (d) {
                //console.log(JSON.stringify(d));
                $scope.entityBean = d.bean;

                $scope.count = 0;//已选择数量
                data.selectData = [];//已选对象
                data.notSelectData = [];//未选对象
                $scope.userSelectAll = false;//清空全选
                angular.forEach($scope.entityBean.users, function (item) {//清空列表全选
                    item.checked = false;
                });

            }, function (data) {
                console.log(JSON.stringify(data));
            })
    }
    //监听添加用户界面modul消失，初始化复选框
    $('#userList').on('hidden.bs.modal', function (e) {
        $scope.count = 0;//已选择数量
        data.selectData = [];//已选对象
        data.notSelectData = [];//未选对象
        $scope.userSelectAll = false;//清空全选
        angular.forEach($scope.entityBean.users, function (item) {//清空列表全选
            item.checked = false;
        });
        $scope.$apply();
    })
    //新增角色默认代表新增平级角色,修改角色,配置人员的按钮点击事件
    $scope.addRole = function (action) {
        var roleDetailsUrl = ""
        if (action === 'add') {
            $scope.initRole();
            /*roleDetailsUrl=ENV.localapi+"/coreRole/read/"+$scope.role.parentid;
            dataFactory.getlist(roleDetailsUrl, 'POST',
                    { 'Content-type': 'application/json'},
                    {}).then(
                    function(d) {
                    $scope.parentRole=d.bean;
                    $scope.initRole(d.bean);
                    },function(data){

                    })*/
        } else if (action === 'update') {
            if ($scope.role === "") {
                SysUtils.swalForTips("请先选择角色", "", "info", function (isConfirm) {
                });
                return;
            }
            $scope.isUpdate = false;
        } else if (action === 'addUser') {
            //初始化用户参数
            $scope.initUser();
        } else if (action === 'deleteUser') {
            if (data.selectData === null || data.selectData.length === 0) {
                SysUtils.swalForTips("请选择用户", "至少选择一个角色下的用户", "info", function (isConfirm) {

                });
                return;
            }
            $scope.operatingUserList('deleteUser');
        } else if (action === 'deleteRole') {
            //console.log(JSON.stringify($scope.selectTreeData));
            if ($scope.role === "") {
                SysUtils.swalForTips("请选择需要删除的角色", "", "info", function (isConfirm) {

                });
                return;
            }
            if ($scope.entityBean.users.length > 0) {
                SysUtils.swalForTips("请先移出角色包含的用户", "", "info", function (isConfirm) {

                });
                return;
            }
            var deleteRoleUrl = ENV.localapi + "/coreRole/delete/" + $scope.role.id;

            SysUtils.swalConfirm("警告", "确定删除该角色?", "warning", function (isConfirm) {
                if (isConfirm) {
                    dataFactory.getlist(deleteRoleUrl, 'POST',
                        {'Content-type': 'application/json'},
                        {}).then(
                        function (d) {
                            $scope.entityBean = {};
                            $scope.requstList();
                        }, function (data) {
                            console.log(JSON.stringify(data));
                        })
                }
            })
        }
    }
    //新增获取角色信息
    $scope.initRole = function (role) {
        var roleDetailsUrl = ENV.localapi + "/coreRole/init?initType=create";
        dataFactory.getlist(roleDetailsUrl, 'POST',
            {'Content-type': 'application/json'},
            {}).then(
            function (d) {
                $scope.newRole = d.bean;
                $('#creatRole').modal('show');
            }, function (data) {
                console.log(JSON.stringify(data));
            })
    }
    //搜索角色动作
    $scope.roleSearch = function (e) {
        //IE 编码包含在window.event.keyCode中，Firefox或Safari 包含在event.which中
        var keycode = window.event ? e.keyCode : e.which;

        if (keycode == 13) {
            var roleListUrl = "";
            if (SysUtils.nonEmptyCheck($scope.queryText) && $scope.queryText.length > 0) {
                // console.log(URLEncoder.encode($scope.queryText,"UTF-8"))
                // console.log(URLEncoder.encode($scope.queryText,"UTF-8"))
                roleListUrl = ENV.localapi + "/coreRole/searchRole/" + $scope.queryText;
            } else {
                roleListUrl = ENV.localapi + "/coreRole/listTopClick";
            }
            dataFactory.getlist(roleListUrl, 'POST',
                {'Content-type': 'application/json;charset=utf-8'},
                JSON.stringify({paging: "No"})).then(
                function (d) {
                    //console.log(JSON.stringify(d));
                    $scope.data = d.beanList;
                }, function (data) {
                    console.log(JSON.stringify(data));
                })

        } else {
            return;
        }
    };
    //新增角色信息保存
    $scope.saveRole = function (action) {
        var postUrl = '';
        var parameter = {};
        if (action === 'add') {
            postUrl = ENV.localapi + "/coreRole/create";
            parameter = JSON.stringify($scope.newRole);
        } else if (action === 'update') {
            postUrl = ENV.localapi + "/coreRole/update";
            parameter = JSON.stringify($scope.entityBean);
        } else if (action === 'updateCancel') {
            $scope.isUpdate = true;
            return;
        }
        dataFactory.getlist(postUrl, 'POST',
            {'Content-type': 'application/json'},
            parameter).then(
            function (d) {
                //console.log(JSON.stringify(d));
                swal(d.message, "", "info");
                if (action === 'add') {
                    $('#creatRole').modal('hide');
                } else if (action === 'update') {
                    $scope.isUpdate = true;
                }
                $scope.requstList();
            }, function (data) {
                console.log(JSON.stringify(data));
            })
    }
    //初始化用户参数
    $scope.initUser = function () {
        SysUtils.requestByJson('/coreRole/' + $scope.role.id + '/notExistsUsers', {}, function (d) {
            $scope.userList = d.beanList;
            $scope.userList.forEach(function (value) {
                value.showAble = true;
            });
            $scope.userListFilterKey = "";

            $scope.count = 0;//已选择数量
            data.selectData = [];//已选对象
            data.notSelectData = [];//未选对象
            $scope.userSelectAll = false;//清空全选
            angular.forEach($scope.userList, function (item) {//清空列表全选
                item.checked = false;
            });
            $scope.$apply();
            $('#userList').modal('show');
        }, {async: false});
    }
    //查询用户信息
    $scope.userListClick = function () {
        var initUserUrl = ENV.localapi + "/coreUser/searchUser";
        //$scope.paramUser.paging="No";
        $scope.paramUser.roleId = $scope.role.id;

        dataFactory.getlist(initUserUrl, 'POST',
            {'Content-type': 'application/json'},
            JSON.stringify($scope.paramUser)).then(
            function (d) {
                $scope.userList = d.beanList;


                $scope.paginationConf.totalItems = d.totalRows;
                $scope.count = 0;//已选择数量
                data.selectData = [];//已选对象
                data.notSelectData = [];//未选对象
                $scope.userSelectAll = false;//清空全选
                angular.forEach($scope.userList, function (item) {//清空列表全选
                    item.checked = false;
                });
            }, function (data) {
                console.log(JSON.stringify(data));
            })
    }


    $scope.userListFilterKey = "";
    $scope.userListFilter = function () {
        $scope.userList.forEach(function (value) {
            if ((0 <= value.display.indexOf($scope.userListFilterKey)) || (0 <= value.name.indexOf($scope.userListFilterKey))) {
                value.showAble = true;
            } else {
                value.showAble = false;
            }
        });
    };
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
    $scope.pageAuto = function () {
        //console.log(JSON.stringify($scope.paramUser));
        if ($scope.paramUser !== undefined) {
            $scope.paramUser.paging = "Yes";
            $scope.paramUser.pageNo = $scope.paginationConf.currentPage;
            $scope.paramUser.pageSize = $scope.paginationConf.itemsPerPage;
            /*$scope.paramUser.role={"id":$scope.role.id};*/
            $scope.paramUser.roleId = $scope.role.id;
            $scope.paramUser.flag = 1;
            $scope.paramUser.initType = "notInRole";
        }
        //$scope.paramUser.usermode = $scope.userModeOptions[$scope.umoIndex].id;
        //$scope.paramUser.name = $scope.userNameLike;
        //console.log(angular.toJson($scope.paramUser,true));
        if (SysUtils.nonEmptyCheck($scope.role.id))
            $scope.userListClick();
    };
    $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.pageAuto);
    $scope.addUserToRole = function (saveUserToRole) {
        SysUtils.swalConfirm("提示", "将用户到[" + $scope.role.name + "]角色下", "info", function (isConfirm) {
            if (isConfirm)
                $scope.operatingUserList(saveUserToRole);
        });
    }
    //操作用户列表
    $scope.operatingUserList = function (action) {
        if (action === 'query') {
            $scope.paramUser.paging = "Yes";
            $scope.userListClick();
        } else if (action === 'saveUserToRole' || action === 'deleteUser') {
            $scope.role.ids = data.selectData;
            var saveRoleUserUrl = ENV.localapi + "/coreRole/saveRoleUser";
            if (action === 'deleteUser') {
                saveRoleUserUrl = ENV.localapi + "/coreRole/deleteRoleUser";
            }
            dataFactory.getlist(saveRoleUserUrl, 'POST',
                {'Content-type': 'application/json'},
                JSON.stringify($scope.role)).then(
                function (d) {
                    $('#userList').modal('hide');
                    if (data.selectData !== null && data.selectData.length > 0) {
                        $scope.toRoleContent($scope.role, null, "getRoleUsers");
                    }
                }, function (data) {
                    console.log(JSON.stringify(data));
                })
        }
    }
    /**********************************表格复选删除start***************************************************/
    var data = {};
    //选择单个（取消选择单个
    $scope.changeCurrent = function (current, $event, action) {
        var beanList = [];
        if (action === 'addUser') {
            beanList = $scope.userList;
        } else if (action === 'deleteUser') {
            beanList = $scope.entityBean.users;
        } else
            return;
        //console.log(current.checked);
        //计算已选数量 true加， false减
        $scope.count += current.checked ? 1 : -1;
        //判断是否全选，选数量等于数据长度为true
        $scope.userSelectAll = $scope.count === beanList.length;
        //统计已选对象
        data.selectData = [];
        data.notSelectData = [];
        angular.forEach(beanList, function (item) {
            if (item.checked) {
                data.selectData[data.selectData.length] = item.id;
            } else {
                data.notSelectData[data.notSelectData.length] = item.id;
            }
        });
        $event.stopPropagation();//阻止冒泡
    };

    //全选（取消全选
    $scope.changeAll = function (action) {
        data.selectData = [];
        data.notSelectData = [];
        var beanList = [];
        if (action === 'addUser') {
            beanList = $scope.userList;
        } else if (action === 'deleteUser') {
            beanList = $scope.entityBean.users;
        } else
            return;

        $scope.count = $scope.userSelectAll ? beanList.length : 0;
        //console.log("====="+$scope.userSelectAll);
        angular.forEach(beanList, function (item) {
            item.checked = $scope.userSelectAll;
            if (item.checked) {
                data.selectData[data.selectData.length] = item.id;
            } else {
                data.notSelectData[data.notSelectData.length] = item.id;
            }
        });
    };
    //选择单个（取消选择单个树形菜单
    $scope.countTree = 0;//已选择数量
    $scope.selectTreeData = [];//已选对象
    $scope.notSelectTreeData = [];//未选对象
    $scope.TreeSelectAll = false;//清空全选

    $scope.changeCurrentTree = function (current, $event) {
        console.log("0" + current.checked);
        var beanList = $scope.data;
        //计算已选数量 true加， false减
        // $scope.count += current.checked ? 1 : -1;
        //判断是否全选，选数量等于数据长度为true
        //$scope.treeSelectAll = $scope.count === beanList.length;
        //统计已选对象
        $scope.selectTreeData = [];//已选对象
        $scope.notSelectTreeData = [];//未选对象
        angular.forEach(beanList, function (item) {
            if (item.checked) {
                $scope.selectTreeData[$scope.selectTreeData.length] = item.id;
            } else {
                $scope.notSelectTreeData[$scope.notSelectTreeData.length] = item.id;
            }
            if (item.nodes !== null && item.nodes.length > 0) {
                $scope.foreach(item, current);
            }
        });
        //$event.stopPropagation();//阻止冒泡
    };
    $scope.foreach = function (node, current) {
        $scope.countTree = 0;//已选择数量
        angular.forEach(node.nodes, function (item) {//清空列表全选
            if (current.id === node.id) {
                item.checked = node.checked;
            }
            //计算已选数量 true加， false减
            $scope.countTree += item.checked ? 1 : -1;
            //判断是否全选，选数量等于数据长度为true
            if ($scope.countTree === node.nodes.length) {
                node.checked = true;
            }
            if (item.checked) {
                $scope.selectTreeData[$scope.selectTreeData.length] = item.id;
            } else {
                $scope.notSelectTreeData[$scope.notSelectTreeData.length] = item.id;
            }
            if (item.nodes !== null && item.nodes.length > 0) {
                $scope.foreach(item, current);
            }
        });
    }
    /**********************************表格复选删除end***************************************************/
    /*计算布局高度*/
    $scope.calculatedHeight = function () {
        $('.content-wrapper').css('height', SysUtils.get_content_wrapper());
        //console.log("=ceter_p=="+$('#panel-heading').outerHeight(true));
        $('.gdt_cont').css('max-height', $('.content').height());
        $('.details').css('height', $('.content').height());
    }

    $scope.calculatedHeight();

}]);