/*myApp.config(function ($stateProvider, ENV) {

    $stateProvider.state('coreHome.postManageList', {
        url: "/postManageList",
        views: {
            'rightContent@coreHome': {
                templateUrl: ENV.templateLocate + "/apps/postManage/postList.html?ts=" + timestamp,
                controller: "postListCtrl",
                cache: false,
            }
        }
    });

});*/


myApp.controller('postListCtrl', ['$rootScope', '$scope', 'ENV', '$state',  'SysUtils', 'dataFactory', 'NodeTreeTool', 'maxHeigtTool', function ($rootScope, $scope, ENV, $state,  SysUtils, dataFactory, NodeTreeTool, maxHeigtTool) {

    /*************************一、变量定义****************************/
    $rootScope.addBgground = true;
    $scope.queryText = "" //快速检索
    $scope.userFilterBean = {name: "", username: "", workcode: ""} //快速检索
    $scope.queryBean = {};//查询bean
    $scope.selectedPost = {};//当前选中岗位
    $scope.selectedDept = {};//当前选中部门
    $scope.selectedUsers = [];//当前选中的多个用户
    $scope.optionDeptId = ""//部门 下拉框 id value
    $scope.isUpdate = false; //岗位更新标识
    $scope.postList = [];//岗位表
    $scope.deptsTree = []; //部门树
    $scope.depts = [];//部门表
    $scope.postUsers = [];//用户
    $scope.allUsers = [];//所有用户
    $scope.allUsersRoot = {};//所有用户抽象根节点
    $scope.selectedDept.actived = true;
    $scope.selectedPost.actived = false;
    $scope.userModeOptions = [
        {id: 3, name: "单用户替代"},
        {id: 2, name: "单用户唯一"},
        {id: 1, name: "多用户登录"},
    ];
    $scope.collapsed = true;
    /*************************二、函数定义****************************/

    $scope.checkSelectDept = function () {
        if (SysUtils.isEmpty($scope.selectedDept.id)) {
            swal("请选择部门", "使用鼠标点击右侧部门节点", "info");
            return false;
        } else {
            return true;
        }
    }
    $scope.checkSelectPost = function () {
        if (!$scope.selectedPost.id) {
            swal("请选择岗位", "使用鼠标点击左侧岗位节点", "info");
            return false;
        } else {
            return true;
        }
    }

    $scope.showDialog = function (dialog, act, depart, e) {
        if (dialog === 'postDetailDialog' && act === 'insert') {
            $scope.deptFocus(depart, e);
            if (!$scope.checkSelectDept()) {
                return;
            }
            $("#postEditForm")[0].reset();
            $scope.selectedPost = {id:null};
            $scope.selectedPost.deptid = $scope.selectedDept.id;
        }

        $('#' + dialog).modal('show');
    }

    $('#postDetailDialog').on('hidden.bs.modal', function (e) {
        $("#postEditForm")[0].reset();
    })

    $scope.addPost = function () {
        if (!$scope.checkSelectDept()) {
            return;
        }
        $scope.selectedPost = {};
        $scope.selectedPost.deptid = $scope.selectedDept.id;
        $scope.isUpdate = true;
    }
    $scope.enterKeyup = function (e, act) {

        //IE 编码包含在window.event.keyCode中，Firefox或Safari 包含在event.which中


        var keycode = window.event ? e.keyCode : e.which;

        if (keycode == 13) {
            if ('pageAuto' == act) {
                $scope.pageAuto();
            } else if ('queryDeptsTree' == act) {
                $scope.filterPostTree();
            }
        } else {
            return;
        }
    };

    $scope.filterPostTree = function () {
        if ($scope.queryText.length > 0) {
            $scope.deptsTree.forEach(function (value) {
                value.visible = $scope.deptsTreeVisible(value)
            })
            $scope.$broadcast('angular-ui-tree:expand-all');
        } else {
            $scope.queryDeptsTree();
        }
    }

    $scope.deptsTreeVisible = function (node) {
        /*父亲 有关键字 自己可视*/
        var res = false;
        if (SysUtils.notEmpty(node.nodes,[])) {
            node.nodes.forEach(function (v) {
                v.visible = $scope.deptsTreeVisible(v);
                res = res || v.visible;
            });
        }
        if (SysUtils.notEmpty(node.posts,[])) {
            node.posts.forEach(function (v) {
                v.visible = $scope.deptsTreeVisible(v);
                res = res || v.visible;
            });
        }
        if (SysUtils.notEmpty(node.name,[])) {
            if (node.name.indexOf($scope.queryText) >= 0) {
                res = res || true;
            }
        }

        return res;
    };
    $scope.userVisible = function (item) {
        var result = true;
        prepareText = "";
        if ($scope.userFilterBean.name.length > 0) {
            prepareText = item.name || '';
            result = result && (prepareText.indexOf($scope.userFilterBean.name) >= 0);
        }
        if ($scope.userFilterBean.username.length > 0) {
            prepareText = item.username || '';
            result = result && (prepareText.indexOf($scope.userFilterBean.username) >= 0);
        }
        if ($scope.userFilterBean.workcode.length > 0) {
            prepareText = item.workcode || '';
            result = result && (prepareText.indexOf($scope.userFilterBean.workcode) >= 0);
        }

        return result;
    };

    $scope.delUsersFromPost = function () {
        /*去无效根节点*/
        $scope.selectedUsers = $scope.selectedUsers.filter(function (value) {
            return value != $scope.allUsersRoot;
        });
        if (!$scope.selectedUsers.length > 0) {
            SysUtils.swalForTips("未选中用户", "请先选择用户", "info", function (isConfirm) {

            });
            return;
        }
        var url = ENV.localapi + "/corePost/" + $scope.selectedPost.id + "/delUsers";
        SysUtils.swalConfirm("提示", "是否移除岗位下的人员", "info", function (isConfirm) {
            if (isConfirm) {
                $scope.allUsersRoot.checked = false;
                dataFactory.getlist(url, 'POST', {'Content-type': 'application/json'}, $scope.selectedUsers).then(
                    function (d) {
                        $scope.queryUserByPid();
                        /*清空已选中*/
                    },
                    function (data) {
                        console.log(JSON.stringify(data));
                    }
                )
            }
        });
    }

    $scope.addUsersToPost = function () {
        /*去无效根节点*/
        $scope.selectedUsers = $scope.selectedUsers.filter(function (value) {
            return value != $scope.allUsersRoot;
        });
        if ($scope.selectedUsers !== null && $scope.selectedUsers.length > 0) {
            var url = ENV.localapi + "/corePost/" + $scope.selectedPost.id + "/addUsers";
            SysUtils.swalConfirm("提示", "是否将选中人员配置到 " + $scope.selectedDept.name + " 部门 " + $scope.selectedPost.name + " 岗位", "info", function (isConfirm) {
                if (isConfirm) {
                    dataFactory.getlist(url, 'POST', {'Content-type': 'application/json'}, $scope.selectedUsers).then(
                        function (d) {
                            $scope.queryUserByPid();
                            $('#userList').modal('hide');
                        },
                        function (data) {
                            console.log(JSON.stringify(data));
                            $('#userList').modal('hide');
                        }
                    )
                } else {
                    $('#userList').modal('hide');
                }
            });
        } else {
            SysUtils.swalForTips("提示", "请选择需要加入岗位下的用户！", "info", function (isConfirm) {

            });
            return;
        }

    };

    $scope.showUsers = function () {
        if (!$scope.checkSelectPost()) {
            return;
        }

        /*清空对象*/
        $scope.selectedUsers = [];//当前选中的多个用户
        $scope.allUsersRoot = {};//所有用户抽象根节点

        /*先清空 自定义查询对象*/
        $scope.queryBean = {};
        //$scope.queryBean.paging = "No";

        //$scope.queryAllUsers('showUsers');

        /*初始化过滤条件*/
        //$scope.userFilterBean = {name: "", username: "", workcode: ""} //快速检索
        $scope.pageAuto();
        $('#userList').modal('show');

    };

    $scope.deptFocus = function (depart, target) {
        //点击数菜单变更背景颜色
        $scope.selectedPost = {};
        // depart.posts.forEach(function (v,i,a) {
        //     a[i]['visible'] = true;
        // });

        $(".angular-ui-tree-handle").removeClass("active");

        $scope.selectedDept.actived = true;
        $scope.selectedPost.actived = false;

        $scope.isUpdate = false;

        $scope.selectedDept = depart;
        $scope.optionDeptId = depart.id;
        $scope.selectedPost.deptid = $scope.optionDeptId;
    }

    /*取得所有用户*/
    $scope.queryAllUsers = function (from) {
        $.ajax({
            type: "POST",
            url: ENV.localapi + "/coreUser/searchUser",
            beforeSend: function (request) {
                request.setRequestHeader("Content-type", "application/json");
                //request.setRequestHeader("Authorization", "Bearer " + $cookies.getObject('user').token);
            },
            dataType: 'json',
            data: JSON.stringify($scope.queryBean),
            success: function (resultInfo) {
                SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                    /*bing 通知 与同步冲突 异步提高性能*/
                    $scope.$apply(function () {
                        $scope.allUsers = resultInfo.beanList;
                        /*if (from =='showUsers') {
                            	过滤当前部门
                            $scope.allUsers = $scope.allUsers.filter(function (x, index) {
                                var result = false;
                                $scope.postUsers.forEach(function (o) {
                                    result = result || x.name == o.name;
                                });
                                return !result;
                            });
                        }*/

                    });
                    $scope.paginationConf.totalItems = resultInfo.totalRows;
                })
            },
            error: function (XMLResponse) {
                console.log(JSON.stringify(XMLResponse));
            }
        });
    }

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
        //$scope.queryBean={};
        $scope.queryBean.paging = "Yes";
        $scope.queryBean.initType = "notInPost";
        $scope.queryBean.pageNo = $scope.paginationConf.currentPage;
        $scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
        $scope.queryBean.post = {"id": $scope.selectedPost.id};
        $scope.queryBean.flag = 1;
        if (SysUtils.nonEmptyCheck($scope.selectedPost.id))
            $scope.queryAllUsers('showUsers');
    };
    $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.pageAuto);
    /*部门岗位 下的用户*/
    $scope.queryUserByPid = function () {
        $.ajax({
            type: "POST",
            url: ENV.localapi + "/corePost/" + $scope.selectedPost.id + "/users",
            beforeSend: function (request) {
                request.setRequestHeader("Content-type", "application/json");
                //request.setRequestHeader("Authorization", "Bearer " + $cookies.getObject('user').token);
            },
            dataType: 'json',
            success: function (resultInfo) {
                SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                    $scope.postUsers = resultInfo.beanList;
                    $scope.selectedUsers = [];
                    $scope.$apply();
                })
            },
            error: function (XMLResponse) {
                console.log(JSON.stringify(XMLResponse));
            }
        });
    }

    $scope.nodeTrClick = function (parentNode, selfNode, siblingNodes, sonNodes, event, type) {
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
        if (selfNode.checked && type === 'radio') {
            //console.log("进来了"+JSON.stringify(selfNode));
            var str = "";
            angular.forEach(selfNode.userPostList, function (data) {
                //console.log(data.a);
                str += data.name + ",";
            });
            str = (str.substring(str.length - 1) == ',') ? str.substring(0, str.length - 1) : str;
            if (str !== "") {
                swal("提示", "该人员已经属于：" + str + " 下的岗位", "info");
            }
            //console.log(str);
        }
    }

    /* $scope.nodeTdClick = function (parentNode, selfNode, siblingNodes, sonNodes, event) {
         console.log("checkbox");
         console.log(event.currentTarget);
         console.log(selfNode.checked);
         SysUtils.nodeChangedHelper(parentNode, selfNode, siblingNodes, sonNodes);
         /!*阻止事件向父级上传*!/
         // event.currentTarget.stopEventPropagation;
     }*/

    $('#userList').on('hidden.bs.modal', function (e) {
        $scope.allUsersRoot.checked = false;
        $scope.$apply();
    })


// $scope.nodeCheckHelper = function (parentNode, selfNode, siblingNodes, sonNodes,event) {
//     SysUtils.nodeChangedHelper(parentNode, selfNode, siblingNodes, sonNodes);
//     console.log(event.currentTarget);
// }

    $scope.postFocus = function (currentDept, currentPost, target) {
        //点击数菜单变更背景颜色
        $scope.isUpdate = false;
        if(!SysUtils.isEmpty(target)){
            $(".angular-ui-tree-handle").removeClass("active");
            $(target.currentTarget).addClass("active");
        }

        $scope.selectedDept = currentDept;
        $scope.selectedDept.actived = false;
        $scope.selectedPost = currentPost;
        $scope.selectedPost.actived = true;
        $scope.optionDeptId = currentDept.id;

        $scope.queryUserByPid();
    }


    $scope.edit = function () {
        if (!$scope.selectedPost.id) {
            swal("请选择岗位", "使用鼠标点击左侧岗位节点", "info");
            return;
        }
        //console.log(JSON.stringify($scope.selectedPost));
        //$scope.optionDeptId = $scope.selectedPost.deptid;
        angular.forEach($scope.depts, function (d, index) {
            if (d.id === $scope.selectedPost.deptid) {
                $scope.optionDept = d;
            }
        });
        $scope.isUpdate = true;
    }


    $scope.delPost = function () {
        if (!$scope.selectedPost.id) {
            SysUtils.swalForTips("请选择岗位", "请先删除该岗位下用户", "info",function (isConfirm) {

            });
            return;
        } else {
            if ($scope.postUsers.length > 0) {
                SysUtils.swalForTips("该岗位下存在用户", "请先删除该岗位下用户", "info", function (isConfirm) {

                });
                return;
            }
            SysUtils.swalConfirm("提示", "是否删除该岗位？", "info", function (isConfirm) {
                if (isConfirm) {
                    //$(".postInfo span").text('');
                    $scope.selectedPost.flag = 0;
                    $scope.savePost();
                }
            });
        }
    }

    $scope.savePost = function () {
        var accUrl = null;
        if ($scope.selectedPost.id == null) {
            $scope.selectedPost.flag = 1;
            accUrl = ENV.localapi + "/corePost/create";
            $('#postDetailDialog').modal('hide');
        } else {
            accUrl = ENV.localapi + "/corePost/update";
        }

        $.ajax({
            type: "POST",
            url: accUrl,
            beforeSend: function (request) {
                request.setRequestHeader("Content-type", "application/json");
                //request.setRequestHeader("Authorization", "Bearer " + $cookies.getObject('user').token);
            },
            dataType: 'json',
            data: JSON.stringify($scope.selectedPost),
            success: function (resultInfo) {
                SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                    SysUtils.swalForTips("提示",resultInfo.message, "info", function (isConfirm) {
                    });
                    $scope.isUpdate = false;

                    if($scope.selectedPost.id == null){
                        $scope.selectedDept.posts.push(resultInfo.bean);
                    }else if($scope.selectedPost.id != null && $scope.selectedPost.flag == 1){
                        //$scope.selectedPost=resultInfo.bean;
                    }else if($scope.selectedPost.id != null && $scope.selectedPost.flag == 0){
                        $scope.selectedDept.posts.remove($scope.selectedPost);
                        $scope.selectedPost={};
                    }
                    $scope.$applyAsync();
                    //$scope.queryDeptsTree();
                    if($scope.selectedPost.id == null){
                        setTimeout(function () {
                            $(".angular-ui-tree-handle").removeClass("active");
                            $("#ps_"+ resultInfo.bean.id).addClass("active");
                            $scope.postFocus($scope.selectedDept,resultInfo.bean);
                        },500);
                    }
                })
            },
            error: function (XMLResponse) {
                console.log(JSON.stringify(XMLResponse));
            }
        });
    }


    $scope.queryDeptsTree = function () {
        accUrl = ENV.localapi + "/coreDepartment/postManage/deptMixPostTree";
        dataFactory.getlist(accUrl, 'POST', {'Content-type': 'application/json'}, {"initType":"notContainResponsiblePerson"}).then(
            function (resultInfo) {
                SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                    // console.log(resultInfo);
                    $scope.deptsTree = resultInfo.bean.treeDepts;
                    $scope.depts = resultInfo.bean.depts;
                    //console.log(JSON.stringify($scope.deptsTree));
                    //$scope.selectedDept = {};
                    //console.log(JSON.stringify($scope.depts));
                    $scope.queryText = "";
                })
            },
            function (d) {
                console.log(JSON.stringify(d));
            }
        )
    }

    $scope.queryPosts = function () {
        // console.log("queryPosts run");
        $.ajax({
            type: "POST",
            url: ENV.localapi + "/corePost/list",
            beforeSend: function (request) {
                request.setRequestHeader("Content-type", "application/json");
                //request.setRequestHeader("Authorization", "Bearer " + $cookies.getObject('user').token);
            },
            dataType: 'json',
            data: JSON.stringify($scope.queryBean),
            success: function (resultInfo) {
                SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                    $scope.postList = resultInfo.beanList;
                    $scope.$apply();
                })
            },
            error: function (XMLResponse) {
                console.log(JSON.stringify(XMLResponse));
            }
        });
    }
    $scope.selectOptionDept = function (d) {
        $scope.optionDeptId = d.id;
    }

    /*************************三、初始化调用****************************/
    $scope.queryDeptsTree();//拿到部门树

    /*计算布局高度*/
    $scope.calculatedHeight=function(){
        $('.content-wrapper').css('height', SysUtils.get_content_wrapper());
        //console.log("=ceter_p=="+$('#panel-heading').outerHeight(true));
        $('.gdt_cont').css('max-height',$('.content').height());
        $('.details').css('height',$('.content').height());
    }

    $scope.calculatedHeight();
}])
;