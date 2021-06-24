/*myApp.config(function ($stateProvider, ENV) {

 $stateProvider.state('coreHome.dicManage', {
 url: "/dicManage",
 views: {
 'rightContent@coreHome': {
 templateUrl: ENV.templateLocate + "/apps/dicManage/dicManage.html?ts=" + timestamp,
 controller: "dicManageCtrl",
 cache: false,
 }
 }
 });

 });*/


myApp.controller('dicManageCtrl', ['$rootScope', '$scope', 'ENV', '$state',  'SysUtils', 'dataFactory', 'NodeTreeTool', 'maxHeigtTool', function ($rootScope, $scope, ENV, $state,  SysUtils, dataFactory, NodeTreeTool, maxHeigtTool) {

    /*************************一、变量定义****************************/
    $rootScope.addBgground = true;
    $scope.queryBean = {};//查询bean
    $scope.dicCategoryList = []; //字典分类|编目
    // $scope.dicModeList = []; //字典
    $scope.dicTypeList = []; //字典项
    $scope.activeDicCategory = {}; //选中分类|编目
    $scope.activeDicMode = {}; //选中字典
    $scope.activeDicType = {}; //选中字典项
    $scope.allUsersRoot = {};//抽象根节点
    $scope.selectedUsers = [];//当前选中的字典
    $scope.queryText = "" //快速检索
    $scope.postBean = {} //快速检索
    /*************************二、函数定义****************************/


    $scope.queryDicCategory = function (callback) {
        accUrl = ENV.localapi + "/dicCategory/dicManage/list";
        dataFactory.getlist(accUrl, 'POST', {'Content-type': 'application/json'}, $scope.queryBean).then(
            function (resultInfo) {
                if (SysUtils.notEmpty(callback, [])) {
                    SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                        $scope.dicCategoryList = resultInfo.beanList;
                        callback();
                    })
                } else {
                    SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                        $scope.dicCategoryList = resultInfo.beanList;
                        $scope.$applyAsync();
                    })
                }
            },
            function (d) {
                console.log(JSON.stringify(d));
            }
        );
    };

    $scope.dcUpdateCancel = function () {
        $scope.activeDicCategory = $scope.queryBean;
        $scope.activeDicCategory.ngUpadte = false;
        $scope.activeDicCategory.ngUpadteBtn = true;
        $scope.activeDicCategory.ngnewBtn = true;
        $scope.activeDicCategory.ngdelBtn = true;
    };


    $scope.dicCategoryFocus = function (dicCategory, e) {
        dicCategory.dicModes.forEach(function (v, i, a) {
            a[i]['visible'] = true;
        });

        //点击数菜单变更背景颜色
        $(".angular-ui-tree-handle").removeClass("active");
        $(e.currentTarget).addClass("active");

        $scope.activeDicCategory = SysUtils.deepCopy(dicCategory);
        $scope.activeDicCategory.ngActived = true;


        $scope.activeDicMode = {};
        $scope.activeDicMode.ngActived = false;

        $scope.activeDicType = {};

        $scope.dicTypeList = []; //字典项

    };

    $scope.dicModeFocus = function (dicMode, e) {
        //点击数菜单变更背景颜色
        $scope.isUpdate = false;
        $(".angular-ui-tree-handle").removeClass("active");
        $(e.currentTarget).addClass("active");


        $scope.activeDicMode = SysUtils.deepCopy(dicMode);
        $scope.activeDicMode.ngActived = true;
        $scope.activeDicType = {};
        $scope.dicTypeList = []; //字典项

        $scope.activeDicCategory = {id: $scope.activeDicCategory.id}

        $scope.queryBean = {};
        $scope.queryBean.paging = 'No';
        $scope.queryDicTypeByModeId();


        /*计算布局高度*/
        /*var window_height = $(window).height();
        var heightList = [];
        heightList.push($('.main-header').outerHeight());
        $('.gdt_cont').css('height', maxHeigtTool.maxHeigt(window_height, heightList));
        $('.details').css('height', maxHeigtTool.maxHeigt(window_height, heightList));
        heightList.push($('.pdivdc').height() + 24);
        var resultHeight = maxHeigtTool.maxHeigt(window_height, heightList);
        $('#table_dt').css('max-height', resultHeight);*/
    };

    $scope.queryDicTypeByModeId = function () {
        accUrl = ENV.localapi + "/dicMode/" + $scope.activeDicMode.id + "/dicTypes";
        dataFactory.getlist(accUrl, 'POST', {'Content-type': 'application/json'}, $scope.queryBean).then(
            function (resultInfo) {
                SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                    $scope.dicTypeList = resultInfo.beanList;
                    $scope.dicTypeListBac =  SysUtils.deepCopy($scope.dicTypeList);
                    $scope.$applyAsync();
                })
            },
            function (d) {
                console.log(JSON.stringify(d));
            }
        );
    };

    $scope.delDicCategory = function () {
        if (!$scope.activeDicCategory.id) {
            SysUtils.swalForTips("提示", "请先选择需要删除的字典分类", "info", function (isConfirm) {

            });
        } else {
            if ($scope.activeDicCategory.dicModes.length > 0) {
                SysUtils.swalForTips("提示", "所选分类下存在字典，不可删除", "info", function (isConfirm) {

                });
                return;
            }
            SysUtils.swalConfirm("警告", "是否删除该字典分类", "warning", function (isConfirm) {
                if (isConfirm) {
                    $scope.activeDicCategory.flag = 0;
                    $scope.postDicCategory(function () {
                        $scope.activeDicCategory = {};
                        $scope.initDcPage();
                    });
                }
            });
        }
    };
    $scope.sortableOptions = {
        containment: '#table-container',
        containerPositioning: 'relative'
    };
    $scope.userOrderTitle="排序";//用户排序默认按钮文字
    $scope.sortableIsdisabled=true;
    $scope.isOrderUser=function(){
        $scope.sortableIsdisabled=!$scope.sortableIsdisabled;
        if(!$scope.sortableIsdisabled){
            $scope.userOrderTitle="取消";
        }else{
            $scope.userOrderTitle="排序";
        }
    }
    $scope.dragControlListeners = {
        // triggered when item order is changed with in the same column (what happens here)
        orderChanged: function (event) {
        }
    };

    $scope.saveDicTypeOrder = function () {
        $scope.dicTypeList.forEach(function (value ,index) {
            value.orderNum = index;
        })

        $scope.dicTypeListChangeOrder = [];
        $scope.dicTypeListBac.forEach(function (v1) {
            var v1For = true;
            $scope.dicTypeList.forEach(function (v2) {
                if (v1For && (v1.id == v2.id)) {
                    if (v1.orderNum != v2.orderNum) {
                        $scope.dicTypeListChangeOrder.push({id:v2.id,orderNum:v2.orderNum});
                        v1For = false;
                    }
                }
            });
        })
        if (SysUtils.notEmpty($scope.dicTypeListChangeOrder, [])) {
            SysUtils.requestByJson("/dicType/batchChangeOder", $scope.dicTypeListChangeOrder, function (resultInfo) {
                swal("提示", "当前字典项列表顺序修改成功", "info");
                $scope.queryDicTypeByModeId();
            });
        } else {
            swal("提示", "当前列表顺序无改变", "info");
        }
    };

    $scope.delDicMode = function () {
        if (!$scope.activeDicMode.id) {
            SysUtils.swalForTips("提示", "请先选择需要删除的字典", "info", function (isConfirm) {

            });
            return;
        } else {
            if (SysUtils.notEmpty($scope.dicTypeList, [])) {
                SysUtils.swalForTips("提示", "所选字典下存在字典项，不可删除", "info", function (isConfirm) {

                });
                return;
            }
            SysUtils.swalConfirm("警告", "是否删除该字典", "warning", function (isConfirm) {
                if (isConfirm) {
                    $scope.activeDicMode.flag = 0;
                    $scope.postBean = $scope.activeDicMode;
                    $scope.saveBean('dicMode', function () {
                        $scope.initDcPage();
                    })
                }
            });
        }
    };

    $scope.updateDicCategory = function () {
        $scope.postDicCategory(function () {
            $scope.activeDicCategory = {};
            $scope.queryBean = {};
            $scope.queryBean.paging = 'No';

            $scope.queryDicCategory(function () {
                $scope.activeDicCategory.ngActived = true;
            });
        });
    };

    $scope.newDicCategory = function () {
        $('#postDetailDialog').modal('hide');
        $scope.postDicCategory(function () {
            $scope.initDcPage();
        });
    };

    $scope.newDm = function () {
        console.log($scope.activeDicCategory);
        $('#dmModal').modal('hide');
        $scope.postBean = $scope.activeDicMode;
        $scope.postBean.categoryId = $scope.activeDicCategory.id;
        $scope.saveBean('dicMode', function () {
            $scope.initDcPage();
        })
    };
    $scope.newDt = function () {
        $('#dtModal').modal('hide');
        if (!SysUtils.notEmpty($scope.postBean, ['id'])) {
            $scope.saveBean('dicType', function () {
                $scope.dicTypeList.push($scope.postBean);
            })
        } else {
            $scope.saveBean('dicType', function () {
            })
        }
    };

    $scope.saveBean = function (rootPath, callback) {
        var accUrl = null;

        if ($scope.postBean.id == null) {
            accUrl = ENV.localapi + "/" + rootPath + "/create";
        } else {
            accUrl = ENV.localapi + "/" + rootPath + "/update";
        }

        dataFactory.getlist(accUrl, 'POST', {'Content-type': 'application/json'}, $scope.postBean).then(
            function (d) {
                SysUtils.handleResult(d, {'state': $state}, function () {
                    if (!SysUtils.notEmpty($scope.postBean, ['id'])) {
                        $scope.postBean.id = d.beanId;
                    }
                    callback();
                })
            },
            function (data) {
                console.log(JSON.stringify(data));
            }
        );
    };


    $scope.postDicCategory = function (callback) {
        var accUrl = null;

        if ($scope.activeDicCategory.id == null) {
            accUrl = ENV.localapi + "/dicCategory/create";
        } else {
            accUrl = ENV.localapi + "/dicCategory/update";
        }

        dataFactory.getlist(accUrl, 'POST', {'Content-type': 'application/json'}, $scope.activeDicCategory).then(
            function (d) {
                SysUtils.handleResult(d, {'state': $state}, callback)
            },
            function (data) {
                console.log(JSON.stringify(data));
            }
        );
    };

    $scope.dcnewCancel = function () {
        $scope.activeDicCategory = {id: $scope.activeDicCategory.id};
        $scope.activeDicCategory.ngActived = true;
        $scope.activeDicMode['ngActived'] = false;
        $(".angular-ui-tree-handle").removeClass("active");
    };

    $scope.dmnewCancel = function () {

        $scope.activeDicMode = {};
        $scope.activeDicMode.ngActived = true;
        $scope.activeDicCategory['ngActived'] = false;
        $(".angular-ui-tree-handle").removeClass("active");
    };

    $scope.showDialog = function (dialog, act, bean) {
        if (dialog === 'postDetailDialog') {
            if (act == 'new') {
                $scope.activeDicCategory = {};
                $scope.activeDicCategory.ngActived = true;
                $scope.activeDicMode['ngActived'] = false;
                $scope.activeDicCategory.flag = 1;
            } else if (act == 'update') {
                if (!SysUtils.notEmpty($scope.activeDicCategory, ['id'])) {
                    SysUtils.swalForTips("提示", "未选中任何字典分类", "info", function (isConfirm) {

                    });
                    return;
                }
            }
        } else if (dialog === 'dmModal') {
            if (act == 'new') {
                var ngActived = $scope.activeDicMode.ngActived;
                $scope.activeDicMode = {};
                $scope.activeDicMode.ngActived = ngActived;
                $scope.activeDicMode.flag = 1;
                $scope.activeDicMode.categoryId = $scope.activeDicCategory.id;
                console.log($scope.activeDicMode);
            } else if (act == 'update') {
                if (SysUtils.notEmpty(bean, [])) {
                    $scope.activeDicMode = bean;
                } else if (!SysUtils.notEmpty($scope.activeDicMode, ['id'])) {
                    SysUtils.swalForTips("提示", "未选中任何字典", "info", function (isConfirm) {

                    });
                    return;
                }
            }
        } else if (dialog === 'dtModal') {
            if (act == 'new') {
                $scope.postBean = {};
                $scope.postBean.flag = 1;
                $scope.postBean.dicModeId = $scope.activeDicMode.id;
            } else if (act == 'update') {
                if (SysUtils.notEmpty(bean, [])) {
                    $scope.postBean = bean;
                }
            }
        }

        $('#' + dialog).modal('show');
    };

    $scope.delUsersFromPost = function () {
        /*去无效根节点*/
        $scope.selectedUsers = $scope.selectedUsers.filter(function (value) {
            return value != $scope.allUsersRoot;
        });
        if (!$scope.selectedUsers.length > 0) {
            SysUtils.swalForTips("提示", "未选中任何字典项", "info", function (isConfirm) {

            });
            return;
        }
        var url = ENV.localapi + "/dicType/delDts";
        SysUtils.swalConfirm("警告", "确认删除选中字典项？", "warning", function (isConfirm) {
            if (isConfirm) {
                $scope.allUsersRoot.checked = false;
                dataFactory.getlist(url, 'POST', {'Content-type': 'application/json'}, $scope.selectedUsers).then(
                    function (d) {
                        SysUtils.handleResult(d, {'state': $state}, function () {
                            $scope.selectedUsers.forEach(function (value) {
                                $scope.dicTypeList.remove(value);
                            });
                            $scope.selectedUsers = [];//当前选中的字典
                            $scope.allUsersRoot = {};//当前选中的字典
                        })
                    },
                    function (data) {
                        console.log(JSON.stringify(data));
                    }
                )
            }
        });
    };

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
    };


    $scope.initDcPage = function () {
        $scope.queryBean = {};
        $scope.queryBean.paging = 'No';
        $scope.queryDicCategory(function () {
            $scope.activeDicCategory = {};
            $scope.activeDicCategory.ngActived = false;
            $scope.activeDicMode.ngActived = false;

            /*计算布局高度*/
           /* var window_height = $(window).height();
            var heightList = [];
            heightList.push($('.main-header').outerHeight());
            $('.gdt_cont').css('height', maxHeigtTool.maxHeigt(window_height, heightList));
            $('.details').css('height', maxHeigtTool.maxHeigt(window_height, heightList));
            heightList.push($('#pdivdc').height() + 20);
            var resultHeight = maxHeigtTool.maxHeigt(window_height, heightList);
            $('#table_dm').css('max-height', resultHeight);*/
        });
    };

    $scope.enterKeyup = function (e, act) {

        //IE 编码包含在window.event.keyCode中，Firefox或Safari 包含在event.which中


        var keycode = window.event ? e.keyCode : e.which;


        if ($scope.queryText.length >= 0) {
            $scope.calTreeVisible();
        } else {
            return;
        }
    };

    $scope.calTreeVisible = function () {
        if ($scope.queryText.length > 0) {
            $scope.dicCategoryList.forEach(function (value) {
                value.visible = $scope.deptsTreeVisible(value)
            });
            $scope.$broadcast('angular-ui-tree:expand-all');
        } else {
            $scope.initDcPage();
        }
        // if ($scope.queryText.length == 0) {
        //     $scope.$broadcast(' angular-ui-tree:collapse-all');
        // }else {
        //     $scope.$broadcast('angular-ui-tree:expand-all');
        // }
    };
    $scope.deptsTreeVisible = function (node) {
        /*父亲 有关键字 自己可视*/
        var res = false;
        if (!SysUtils.isEmpty(node.nodes)) {
            node.nodes.forEach(function (v) {
                v.visible = $scope.deptsTreeVisible(v);
                res = res || v.visible;
            });
        }
        if (!SysUtils.isEmpty(node.dicModes)) {
            node.dicModes.forEach(function (v) {
                v.visible = $scope.deptsTreeVisible(v);
                res = res || v.visible;
            });
        }

        if (SysUtils.notEmpty(node, ['name'])) {
            if (node.name.indexOf($scope.queryText) >= 0) {
                res = res || true;
            }
        } else if (SysUtils.notEmpty(node, ['cname'])) {
            if (node.cname.indexOf($scope.queryText) >= 0) {
                res = res || true;
            }
        }

        return res;
    };


    /*************************三、初始化调用****************************/
    /*计算布局高度*/
    $scope.calculatedHeight=function(){
        $('.content-wrapper').css('height', SysUtils.get_content_wrapper());
        //console.log("=ceter_p=="+$('#panel-heading').outerHeight(true));
        $('.gdt_cont').css('max-height',$('.content').height());
        $('.details').css('height',$('.content').height());
    }

    $scope.calculatedHeight();

    $scope.initDcPage();

}]);