/*myApp.config(function($stateProvider,ENV) {

	$stateProvider.state('coreHome.moduleAuthManageList', {
        url: "/moduleAuthManageList",
        views:{
        	'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/moduleAuthManage/moduleAuthManageList.html?ts=" + timestamp,
				controller: "moduleAuthManageListCtrl",
				cache: false,
        	}	
        }
    });
	
}); */


myApp.controller('moduleAuthManageListCtrl', ['$scope', 'ENV', '$state', 'dataFactory', 'NodeTreeTool', 'SysUtils', function ($scope, ENV, $state, dataFactory, NodeTreeTool, SysUtils) {
    console.log("moduleAuthManageListCtrl controller");

    /*************************一、变量定义****************************/

    $scope.userList = {};
    $scope.selectedUser = {};//存放userlist请求参数
    $scope.selectPermissTreeData = [];//权限菜单已选对象
    $scope.selectDepartTreeData = "";//部门菜单已选对象
    $scope.elementtype = "R";//tab标签页默认是人员。
    $scope.showPermissUsers = true;//默认显示双击权限下所有人员
    $scope.searchName = "";
    $scope.searchPlaceholder = "请根据人员名称或者登录名搜索人员";
    /*************************二、函数定义****************************/
    /*计算布局高度*/
    /*var window_height = $(window).height();
    var heightList=[];
    heightList.push($('.main-header').outerHeight());
    $('.gdt_cont').css('max-height', maxHeigtTool.maxHeigt(window_height,heightList));
    $('.details').css('min-height', maxHeigtTool.maxHeigt(window_height,heightList));
    heightList.push($('.table_1').height());
    heightList.push(($('.bj').outerHeight()+($('#depart_tit').outerHeight(true)-$('#depart_tit').outerHeight()))*2);
    heightList.push(20);//.details的padding-top 20
    var resultHeight=maxHeigtTool.maxHeigt(window_height,heightList);
    $('#table_1').css('max-height', resultHeight);
    $('#sorttable').css('max-height', resultHeight);*/
    $scope.visible = function (item) {
        return !($scope.query && $scope.query.length > 0
            && item.title.indexOf($scope.query) == -1);
    };

    $scope.remove = function (scope) {
        scope.remove();
    };
    //初始化数据
    $scope.requstList = function (node, queryType) {
        var mpsModuleTreeUrl = ENV.localapi + "/coreMpsModule/moduleAuthManage/queryHavePromiss";
        var param = {};
        //console.log(node);
        if (node != null) {
            param.showAble = 1;
            param.id = node.id;
            param.initType = $scope.elementtype;
            if (queryType == "queryHavePermiss") {
                param.queryListType = queryType;
            }
            param = JSON.stringify(param);
        }
        dataFactory.getlist(mpsModuleTreeUrl, 'POST',
            {'Content-type': 'application/json'},
            param).then(
            function (d) {
                //console.log(JSON.stringify(d));
                if (queryType == "queryHavePermiss") {
                    $scope.havePermiss = d.beanList;
                } else {
                    $scope.premiss = d.beanList;
                }
            }, function (data) {
                console.log(JSON.stringify(data));
            })
    }
    /* $scope.requstInitParam = function() {
         var mpsModuleTreeUrl=ENV.localapi+"/coreMpsavailModule/init?initType=create";
         dataFactory.getlist(mpsModuleTreeUrl, 'POST',
                 { 'Content-type': 'application/json'},
                 {}).then(
                 function(d) {
                     $scope.savailModule=d.bean;
                 },function(data){
                     console.log(JSON.stringify(data));
         })
     }*/
    $scope.userList = function (param) {
        var mpsModuleTreeUrl = ENV.localapi + "/coreUser/searchUser";
        /*$scope.selectedUser.paging = "Yes";
        $scope.selectedUser.pageNo = $scope.paginationConf.currentPage;
        $scope.selectedUser.pageSize = $scope.paginationConf.itemsPerPage;*/
        dataFactory.getlist(mpsModuleTreeUrl, 'POST',
            {'Content-type': 'application/json'},
            param).then(
            function (d) {
                $scope.entityBeanList = d.beanList;
            }, function (data) {
                console.log(JSON.stringify(data));
            })
    }
    // $scope.userList({"paging":"No","flag":1});
    //$scope.requstInitParam();

    // $scope.requstList();

    $scope.authorization = function () {
        //var mpsModuleTreeUrl=ENV.localapi+"/coreMpsavailModule/savaMpsavailModulePermiss";
        var mpsModuleTreeUrl = "/coreMpsavailModule/savaMpsavailModulePermiss";
        var paramBean = {};
        paramBean.elementtype = $scope.elementtype;
        paramBean.elementid = $scope.selectDepartTreeData;
        var selectModuleList = [];
        /*查询已选权限列表*/
        selectModuleList = NodeTreeTool.addMpsavailModuleId($scope.premiss, selectModuleList);
        paramBean.ids = selectModuleList;
        //console.log(JSON.stringify(paramBean));
        if ($scope.elementtype === "U") {
            swal("提示", "人员下面禁止授权！", "info");
            return;
        }
        //console.log($scope.selectDepartTreeData+"==="+typeof($scope.selectPermissTreeData)+"***"+(typeof($scope.selectPermissTreeData)==='object'));
        if (!SysUtils.nonEmptyCheck($scope.selectDepartTreeData)) {
            swal("提示", "请选择授权对象！", "info");
            return;
        }
        if (selectModuleList === null && selectModuleList.length === 0) {
            swal("提示", "请选择权限列表的权限！", "info");
            return;
        }
        SysUtils.requestByJson(mpsModuleTreeUrl, paramBean, function (resultInfo) {
            swal("成功", "授权已成功！", "success");
        });
    }
    //查询权限菜单下的用户和相关组织
    $scope.queryPremissUsers = function (node) {
        //console.log(JSON.stringify(node));
        var postUrl = ENV.localapi + "/coreMpsModule/queryUserListByMpsmoduleId";
        SysUtils.httpFactory(postUrl, JSON.stringify(node), function (r) {
            //console.log(JSON.stringify(r));
            $scope.PremissBean = r.bean;
            $('#queryUserListByPermiss').modal('show');
        });
    }
    $scope.showPermissUsersClick = function () {
        $scope.showPermissUsers = !$scope.showPermissUsers;
    }
    //定位按钮事件
    $scope.searchByname = function () {
        $scope.tabClick($scope.elementtype, true);
    }
    //tab点击事件
    $scope.tabClick = function (status, action) {
        $scope.elementtype = status;
        $scope.selectPermissTreeData = [];//权限菜单已选对象
        $scope.selectDepartTreeData = null;//已选对象id
        var departmentTreeUrl = "";
        var param = {};
        if (action) {
            param.name = $scope.searchName;
        } else
            $scope.searchName = "";//初始化搜索定位名字
        if (status === "D" || status === "P") {
            if (status === "D") {
                $scope.comTitle = "部门基本信息";
                $scope.comName = "部门名称";
                $scope.searchPlaceholder = "请根据部门名称搜索";
            } else {
                $scope.searchPlaceholder = "请根据岗位名称搜索";
            }
            departmentTreeUrl = "/coreDepartment/departmentTree";
        } else if (status === "R") {
            departmentTreeUrl = "/coreRole/list";
            $scope.searchPlaceholder = "请根据角色名称搜索";
            param.paging = "No";
        } else if (status === "U") {
            $scope.searchPlaceholder = "请根据人员名称或者登录名搜索人员";
            param.paging = "No";
            param.flag = 1;
            $scope.userList(param);
            return;
        } else if (status === "G") {
            $scope.comTitle = "组基本信息";
            $scope.comName = "组名称";
            departmentTreeUrl = "/coreGroup/groupTree";
        }
        SysUtils.requestByJson(departmentTreeUrl, param, function (d) {
            $scope.data = d.beanList;
            $scope.$applyAsync();
        });
        /*dataFactory.getlist(departmentTreeUrl, 'POST',
            { 'Content-type': 'application/json'},
            param).then(
            function(d) {
                console.log(JSON.stringify(d));
                $scope.data=d.beanList;
            },function(data){
                console.log(JSON.stringify(data));
        });*/
    }

    $scope.searchPeople = function (user, index) {
        //console.log(JSON.stringify($scope.havePermiss));
        if ($scope.elementtype === "U") {
            //查询某个人拥有权限
            $scope.requstList(user, "queryHavePermiss");
            $('#queryHavePermissList').modal('show');
        } else if ($scope.elementtype === "D" || $scope.elementtype === "G") {
            //查询部门拥有权限
            $scope.requstList($scope.bindingclickTree, "queryHavePermiss");
            $('#queryHavePermissList').modal('show');
        } else if ($scope.elementtype === "P" || $scope.elementtype === "R") {
            //查询职级拥有权限
            $scope.selectPoset = user;
            //console.log("=1=="+JSON.stringify(user));
            //默认查看就选中单选按钮
            //$scope.postBean[index].checked=user.id;
            //获取选中职级id
            //$scope.selectDepartTreeData=user.id;
            //user.checkd=user.id;
            //console.log("==2="+JSON.stringify($scope.postBean[index]));
            var postUrl = ENV.localapi + "/corePost/" + user.id + "/users";
            if ($scope.elementtype === "R") {
                postUrl = ENV.localapi + "/coreRole/" + user.id + "/users";
            }
            dataFactory.getlist(postUrl, 'POST',
                {'Content-type': 'application/json'},
                {}).then(
                function (d) {
                    //console.log(JSON.stringify(d));
                    $scope.postUsers = d.beanList;
                    //$scope.requstList($scope.selectPoset);
                    $('#queryPostUserList').modal('show');
                }, function (data) {
                    console.log(JSON.stringify(data));
                });
        }
    }
    //tab标签页树形菜单点击事件
    $scope.toContent = function (node, target) {
        $(".auth-tab-tree").removeClass("active");
        $(target.currentTarget).addClass("active");
        $scope.bindingclickTree = node;
        var departmentDetailsUrl = ENV.localapi + "/coreDepartment/read/" + node.id;
        var param = {};
        if ($scope.elementtype === "P") {
            departmentDetailsUrl = ENV.localapi + "/coreDepartment/queryDept/posts";
            param = JSON.stringify({"id": node.id, "paging": "No"});
        } else if ($scope.elementtype === "G") {
            departmentDetailsUrl = ENV.localapi + "/coreGroup/" + node.id + "/users";
        }
        dataFactory.getlist(departmentDetailsUrl, 'POST',
            {'Content-type': 'application/json'},
            param).then(
            function (d) {
                //console.log(JSON.stringify(d));
                if ($scope.elementtype === "D") {
                    $scope.entityBean = d.bean;
                } else if ($scope.elementtype === "P" || $scope.elementtype === "G") {
                    $scope.postBean = d.beanList;
                }
            }, function (data) {
                console.log(JSON.stringify(data));
            });

        //$scope.requstList(node);
    }
    //查询已经拥有权限
    /*$scope.queryHavePermissClick=function(){
    	$scope.requstList($scope.bindingclickTree,"queryHavePermiss");
    	$('#queryHavePermissList').modal('show');
    }*/
    //权限树形菜单点击事件
    $scope.toPermissContent = function (node, target) {
        $(".auth-premiss-tree").removeClass("active");
        $(target.currentTarget).addClass("active");
        /*dataFactory.getlist("/apps/moduleAuthManage/person.json", 'GET',
                { 'Content-type': 'application/json'},
                {}).then(
                function(d) {
                    $scope.personList=d;
                },function(data){
                    console.log(JSON.stringify(data));
        });*/
    }

    $scope.changePostCurrentData = function (d) {
        $scope.selectPoset = d;
        //获取选中职级id
        $scope.selectDepartTreeData = d.id;
        $scope.requstList(d);
        //console.log("00000000000==="+JSON.stringify(d));
    }
    //全选和全不选操作
    $scope.select = function (action) {
        var isChecked = false;
        if (action === "all") {
            isChecked = true;
        } else if (action === "no") {
            isChecked = false;
        }
        NodeTreeTool.selectAll($scope.premiss, isChecked);
    }
    /**********************************表格树形复选框start***************************************************/

    $scope.changePremissCurrentTree = function (selfNode, sonNodes, event) {
        var resultList = [];
        //console.log("选中数集合==="+JSON.stringify($scope.premiss));
        /*查询当前节点的坐标*/
        resultList = NodeTreeTool.queryParentNodeIndexAndselfNodeIndex(selfNode, $scope.premiss, resultList);
        /*如果当前选择的节点有子节点就全部选中*/
        var child;
        console.log(JSON.stringify(resultList));
        /*if(resultList.length===1){
            child=$scope.premiss[resultList[0]];
        }else if(resultList.length===2){
            child=$scope.premiss[resultList[0]].nodes[resultList[1]];
        }else if(resultList.length===3){
            child=$scope.premiss[resultList[0]].nodes[resultList[1]].nodes[resultList[2]];
        }else if(resultList.length===4){
            child=$scope.premiss[resultList[0]].nodes[resultList[1]].nodes[resultList[2]].nodes[resultList[3]];
        }*/
        //console.log(selfNode.checked+"=="+child.checked+"=="+child.title);
        /*选中当前节点的子节点*/
        /*if(!NodeTreeTool.isEmpty(child)&&child.nodes.length>0){
            NodeTreeTool.selectAll(child.nodes,child.checked);
        }*/
        if (!NodeTreeTool.isEmpty(selfNode.nodes) && selfNode.nodes.length > 0) {
            NodeTreeTool.selectAll(selfNode.nodes, selfNode.checked);
        }
        /*当有一个子节点选中时，他的父节点都会被选中，只有当他的兄弟节点都未被选中时父节点才不被选中*/
        if (resultList !== null && resultList.length > 1) {
            NodeTreeTool.isSelectParent($scope.premiss, resultList, selfNode.checked);
        }
    }

    $scope.changeDepartCurrentTree = function (selfNode, sonNodes, event) {
        //console.log("************88("+$scope.selectDepartTreeData+")===="+selfNode.id);
        $scope.selectDepartTreeData = selfNode.id;
        $scope.requstList(selfNode);

        /*查询父节点和兄弟节点
        var result=NodeTreeTool.queryParentNodeAndSiblingNodes(selfNode,$scope.data);
        选中相关
        NodeTreeTool.relatedCheck(result.parentNode, selfNode, result.siblingNodes, sonNodes);

        根据需要统计选中结果
        $scope.selectDepartTreeData = NodeTreeTool.checkedCount(result.parentNode, selfNode, result.siblingNodes, sonNodes, $scope.selectDepartTreeData);
        console.log("选中数集合==="+JSON.stringify($scope.selectDepartTreeData));*/
    }


    /*var data={};
    //选择单个（取消选择单个树形菜单
    $scope.selectPermissTreeData = [];//权限菜单已选对象
    $scope.notselectPermissTreeData = [];//权限菜单未选对象
    
    $scope.selectTabTreeData = [];//tab标签页树形已选对象
    $scope.notselectTabTreeData = [];//tab标签页树形未选对象
*/
    /* $scope.changeCurrentTree = function(current, $event) {
         var beanList=$scope.data;
         //统计已选对象
         $scope.selectPermissTreeData = [];//已选对象
         $scope.notselectPermissTreeData = [];//未选对象
         angular.forEach(beanList, function(item) {
             if(item.checked){
                 $scope.selectPermissTreeData[$scope.selectPermissTreeData.length] = item.id;
             }else{
                 $scope.notselectPermissTreeData[$scope.notselectPermissTreeData.length]= item.id;
             }
             if(item.nodes!==null&&item.nodes.length>0){
                 $scope.foreach(item,current);
             }
         });
         //$event.stopPropagation();//阻止冒泡
     }; */

    /*$scope.foreach=function(node,current){
    	$scope.countTree = 0;//已选择数量 
    	angular.forEach(node.nodes, function(item) {//清空列表全选
    		if(current!==null&&current.id===node.id){
    			item.checked=node.checked;
    		}
    		//计算已选数量 true加， false减
            $scope.countTree += item.checked ? 1 : -1;
            //判断是否全选，选数量等于数据长度为true
            if($scope.countTree === node.nodes.length){
            	node.checked=true;
            }
    		if(item.checked){
    			$scope.selectPermissTreeData[$scope.selectPermissTreeData.length] = item.id;
            }else{
            	$scope.notselectPermissTreeData[$scope.notselectPermissTreeData.length]= item.id;
            }
    		if(item.nodes!==null&&item.nodes.length>0){
            	$scope.foreach(item,current);
            }
        });
    }*/
    /**********************************表格复选删除end***************************************************/

    /*计算布局高度*/
    $scope.calculatedHeight = function () {
        $('.content-wrapper').css('height', SysUtils.get_content_wrapper());
        //console.log("=ceter_p=="+$('#panel-heading').outerHeight(true));
        $('.gdt_cont').css('max-height', $('.content').height());
        $('.details').css('height', $('.content').height());
    }

    $scope.calculatedHeight();

    $scope.tabClick('R');
}]);