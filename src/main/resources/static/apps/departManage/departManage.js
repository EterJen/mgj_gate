/*myApp.config(function($stateProvider,ENV) {

	$stateProvider.state('coreHome.departManageList', {
        url: "/departManageList",
        views:{
        	'rightContent@coreHome': {
				templateUrl: ENV.templateLocate + "/apps/departManage/departManageList.html?ts=" + timestamp,
				controller: "departManageListCtrl",
				cache: false,
        	}	
        }
    });
	
}); */


myApp.controller('departManageListCtrl', ['$rootScope', '$scope','ENV','$state','dataFactory','NodeTreeTool','$filter','SysUtils','maxHeigtTool','$timeout',function($rootScope, $scope, ENV,$state,dataFactory,NodeTreeTool,$filter,SysUtils,maxHeigtTool,$timeout) {
	console.log("departManageListCtrl controller");

    /*************************一、变量定义****************************/
    $rootScope.addBgground = true;
	$scope.userList=[];
	$scope.isUpdate=true;//初始化部门详情
	$scope.department={};//点击事件储存部门
	$scope.deoartmentOrder=false;//部门排序默认为false
	$scope.deoartmentOrderTitle="部门排序";//部门排序默认按钮文字
	$scope.userOrderTitle="排序";//用户排序默认按钮文字
	$scope.sortableIsdisabled=true;
	$scope.dragEnabled=false;
	$scope.paramUser = {};
    $scope.entityBean={};
	/*************************二、函数定义****************************/

	$scope.visible = function (item) {
        return !($scope.query && $scope.query.length > 0
        && item.title.indexOf($scope.query) == -1);
    };

    $scope.remove = function (scope) {
        scope.remove();
    };  
      //初始化数据
	$scope.requstList = function() {
		var departmentTreeUrl=ENV.localapi+"/coreDepartment/departManage/departmentTree";
		dataFactory.getlist(
			departmentTreeUrl, 'POST',{'Content-type': 'application/json'},{})
			.then(
				function(d) {
				var list=d.beanList;
				if($scope.deoartmentOrder){
                    NodeTreeTool.foreachDatas(list);
				}
				$scope.data=list;
				$scope.dataBac = SysUtils.deepCopy($scope.data);
				$scope.$applyAsync();

				if($scope.department!==null&&$scope.department!==""&&$scope.department!==undefined&&JSON.stringify($scope.department)!=="{}"){
                    $(".angular-ui-tree-handle").removeClass("active");
                    $("#dp_"+$scope.department.id).addClass("active");
                    $scope.toDepartContent($scope.department,null,"afterAdd");
                    $timeout(function () {
                        $("#dp_"+$scope.department.id).addClass("active");
                    },500);
				}


				//console.log(JSON.stringify(list));
				//$scope.data=d.beanList;
			},function(data){  
				console.log(JSON.stringify(data));
			})
	};
	
    $scope.requstList();
    //table表格排序
    $scope.sortableOptions = {
            containment: '#table-container',
            containerPositioning: 'relative'
    };
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
	    	SysUtils.swalConfirm("提示","是否确定移动位置？","info",function(isConfirm){
				if(isConfirm){
					//console.log(isConfirm);
					$scope.saveUserOrder();
				}else{
					//console.log("false");
					$scope.toDepartContent($scope.department,null,"refresh");
				}
			});
	　　}
    };
    //部门数拖拽
    $scope.dataBac = {};
    $scope.treeOptions = {
			//检查当前选择节点是否可以被拖动
			beforeDrag: function(sourceNodeScope) {
				//var a=sourceNodeScope.depth();
				var b = sourceNodeScope.node;
				if($scope.dragEnabled){
					if(SysUtils.nonEmptyCheck(b.parentid)) {
						return true;
					}
				}
				return false;
				
			},
			//拖拽操作 拖拽后会返回callback beforeDrop函数，我们可以重写这个函数，拖拽本质上是顺序的改变和层级的改变，所以是一个update操作
			beforeDrop: function(e) {
                // console.log($scope.data)
                // console.log("拖动后：");
                // console.log(e);
				// console.log(e.dest.nodesScope.depth());
				if(e.dest.nodesScope.depth()===1){
					return true;
				}else{
					return false;
				}
				//return;
			},
			dropped: function(e){
                // console.log($scope.dataBac);
                // console.log($scope.data);

                var contuneTag = true;
                angular.forEach($scope.dataBac, function (v,i,a) {
                    var tmp = $scope.data[i];
                    if (contuneTag && (tmp.nodes.length != v.nodes.length)) {
                        contuneTag = false;
                    }
                });

                if (!contuneTag) {
                    SysUtils.swalForTips("提示","不可跨部门调整顺序","info",function (isConfirm) {

                    });
                    $scope.data = SysUtils.deepCopy($scope.dataBac);
                    $scope.$applyAsync();
                    return;
                }


                // console.log(e.dest.nodesScope.depth()+"下降了");
				SysUtils.swalConfirm("提示","确定保存拖拽顺序？","info",function(isConfirm){
					if(isConfirm){
						var departmentDetailsUrl=ENV.localapi+"/coreDepartment/updateDepartOrderNum";
						var nodes={"nodes":$scope.data}
						$scope.requstService(departmentDetailsUrl,nodes,function(d){
							SysUtils.swalForTips("提示","顺序保存成功","info", function (isConfirm) {

                            });
						});
					}else{
						$scope.requstList();
					}
				});
			}
		};
    //点击部门获取部门详情和部门下的用户
	$scope.toDepartContent=function(depart,target,action){
		//console.log(action);
		//点击数菜单变更背景颜色
		if(action===null||action===''||action===undefined){
			$(".angular-ui-tree-handle").removeClass("active");
			$(target.currentTarget).addClass("active");
			$scope.department=depart;
		}
		var departmentDetailsUrl=ENV.localapi+"/coreDepartment/read/"+depart.id;
		dataFactory.getlist(departmentDetailsUrl, 'POST',
			{ 'Content-type': 'application/json'},
			{}).then(
			function(d) {
				//console.log(JSON.stringify(d.bean));
				$scope.entityBean=d.bean;
				
				$scope.count = 0;//已选择数量 
		    	data.selectData = [];//已选对象
		    	data.notSelectData = [];//未选对象
		    	$scope.userSelectAll=false;//清空全选
		    	angular.forEach($scope.entityBean.users, function(item) {//清空列表全选
		    		item.checked=false;
	            });
		    	$scope.$applyAsync();
			},function(data){  
				console.log(JSON.stringify(data));
			})
	};
    	//监听添加用户界面modul消失，初始化复选框
    	$('#userList').on('hidden.bs.modal', function (e) {
    		$scope.count = 0;//已选择数量 
	    	data.selectData = [];//已选对象
	    	data.notSelectData = [];//未选对象
	    	$scope.userSelectAll=false;//清空全选
	    	angular.forEach($scope.entityBean.users, function(item) {//清空列表全选
	    		item.checked=false;
            });
	    	$scope.$apply();
    	})
    	
    	//新增部门默认代表新增平级部门,修改部门,配置人员的按钮点击事件
    	$scope.addDepart=function(action,type,node){
            console.log(action);
    		//console.log("dianji===");
    		if(action==="editeDepartOrder"){
    			$scope.dragEnabled=!$scope.dragEnabled;
    			if($scope.dragEnabled){
    				$scope.deoartmentOrderTitle="关闭排序";
    			}else{
    				$scope.deoartmentOrderTitle="部门排序";
    			}
    			$scope.requstList();
    			return;
    		}
    		if(action==='add'&&$scope.data.length>0){
    			//$scope.department={"parentid":"-1"};
    			$scope.department=$scope.data[0];
    		}
    		if(type==="child"){
    			$scope.department=node;
    		}
    		if($scope.department.id===null||$scope.department.id===""||$scope.department.id===undefined){
    			SysUtils.swalForTips("请选择部门","至少选择一个部门","info", function (isConfirm) {

                });
    			return;
    		}
    		var departmentDetailsUrl="";
    		if(action==='add'){
                $scope.parentDepartment={};
    			if(SysUtils.nonEmptyCheck($scope.department.parentid)){
	    		departmentDetailsUrl=ENV.localapi+"/coreDepartment/read/"+$scope.department.parentid;
	    		dataFactory.getlist(departmentDetailsUrl, 'POST',
	        			{ 'Content-type': 'application/json'},
	        			{}).then(
	        			function(d) {
							$scope.parentDepartment=d.bean;
							$scope.initDepart(d.bean);
	        			},function(data){ 
	        				console.log(JSON.stringify(data));
	        			})
    			}else{
    				$scope.initDepart();
    			}
    		}else if(action==='addChild'){
    			$scope.parentDepartment=$scope.department;
    			$scope.initDepart($scope.department);
    		}else if(action==='update'){
    			//修改部门信息
    			angular.forEach($scope.entityBean.users,function(d,index){
    				if(d.id===$scope.entityBean.principalid){
    					$scope.principalUser=d;
    				}
    			});
    			$scope.isUpdate=false;
    		}else if(action==='addUser'){
    			//初始化用户参数
    			$scope.initUser();
    		}else if(action==='deleteUser'){
    			if(data.selectData===null||data.selectData.length===0){
    				SysUtils.swalForTips("请选择用户","至少选择一个部门下的用户","info", function (isConfirm) {

                    });
        			return;
    			}
    			SysUtils.swalConfirm("提示","是否确认移出部门下的人员列表","info",function(isConfirm){
    				if(isConfirm)
    				$scope.operatingUserList('deleteUser');
    			});
    		}else if(action==='deleteDepart'){
    			if($scope.department.parentid==="-1"||$scope.department.parentid===""||$scope.department.parentid===null){
    				SysUtils.swalForTips("禁止删除","请重新选择部门，不允许删除一级部门！","info", function (isConfirm) {

                    });
        			return;
    			}
    			var deleteDepartmentUrl=ENV.localapi+"/coreDepartment/delete/"+$scope.department.id;
    			SysUtils.swalConfirm("提示","删除部门会删除部门下的岗位，请谨慎操作！","error",function(isConfirm){
    				if(isConfirm)
                        //$(".departInfo span").text('');
    				    dataFactory.getlist(deleteDepartmentUrl, 'POST',
   	            			{ 'Content-type': 'application/json'},
   	            			{}).then(
   	            			function(d) {
                                $scope.department=null;
                                $scope.entityBean=null;
   	            				$scope.requstList();
                                swal({
                                    title: "操作成功",
                                    //text: "取消关注成功",
                                    timer: 500,
                                    showConfirmButton: false
                                });
   	            			},function(data){
   	            				console.log(JSON.stringify(data));
   	            	})
    			});
    		}
    	}
    	//新增获取部门信息
    	$scope.initDepart=function(depart){
    		var departmentDetailsUrl=ENV.localapi+"/coreDepartment/init?initType=create";
    		dataFactory.getlist(departmentDetailsUrl, 'POST',
        			{ 'Content-type': 'application/json'},
        			{}).then(
        			function(d) {
	        			$scope.newDepartment=d.bean;
	        			if(depart===null||depart===undefined){
	        				$scope.newDepartment.parentid=$scope.department.parentid;
	        			}else
	        				$scope.newDepartment.parentid=depart.id;
	        			//console.log(JSON.stringify($scope.newDepartment));
	        			$('#creatDepartment').modal('show');
        			},function(data){  
        				console.log(JSON.stringify(data));
        			})
    	};
    	//新增部门信息保存
    	$scope.saveDepartment=function(action){
    		var postUrl='';
    		var parameter={};
    		if(action==='add'){
    			postUrl="/coreDepartment/create";
    			parameter=($scope.newDepartment);
    		}else if(action==='update'){
    			postUrl="/coreDepartment/update";
    			parameter=($scope.entityBean);
    		}else if(action==='updateCancel'){
    			$scope.isUpdate=true;
    			return;
    		}
            SysUtils.postWhithBackInf(postUrl,parameter,function (resInf) {
                if(action==='add'){
                    $scope.department=resInf.bean;
                    $('#creatDepartment').modal('hide');
                }else if(action==='update'){
                    $scope.isUpdate=true;
                }
                $scope.requstList();
            });
/*
    		dataFactory.getlist(postUrl, 'POST',
        			{ 'Content-type': 'application/json'},
        			parameter).then(
        			function(d) {
	        			if(action==='add'){
	        				$('#creatDepartment').modal('hide');
                            swal("提示","新增部门成功","success");
	        			}else if(action==='update'){
	        				$scope.isUpdate=true;
                            swal("提示","部门信息修改成功","success");
	        			}
	        			$scope.requstList();
        			},function(data){  
        				console.log(JSON.stringify(data));
        			})
*/
    	};
    	//修改部门排序
    	$scope.editeOrder=function(user){
    		$scope.editeUser=user;
    		$('#editeUserOrder').modal('show');
    	}
    	//保存用户排序
    	$scope.saveUserOrder=function(){
    		var initUserUrl=ENV.localapi+"/coreDepartment/editeDepartUserSqe";
    		dataFactory.getlist(initUserUrl, 'POST',
        			{ 'Content-type': 'application/json'},
        			JSON.stringify($scope.entityBean)).then(
        			function(d) {
        				/*$scope.toDepartContent($scope.department,"","editeDepartUserSqe");
	        			$('#editeUserOrder').modal('hide');*/
        			},function(data){  
        				console.log(JSON.stringify(data));
        			})
    	};
    	//选中部门负责人
    	$scope.selectPrincipal=function(){
    		//console.log(JSON.stringify(u));
            //console.log(JSON.stringify($scope.principalUser));
			if($scope.principalUser!==null){
                $scope.entityBean.principal=$scope.principalUser.name;
                $scope.entityBean.principalid=$scope.principalUser.id;
			}
    	}
    	//初始化用户参数
    	$scope.initUser=function(){
    		var initUserUrl=ENV.localapi+"/coreUser/init?initType=create";
    		dataFactory.getlist(initUserUrl, 'POST',
        			{ 'Content-type': 'application/json'},
        			{}).then(
        			function(d) {
	        			$scope.paramUser=d.bean;
	        			$scope.pageAuto();
	        			$('#userList').modal('show');
        			},function(data){  
        				console.log(JSON.stringify(data));
        			})
    	};
    	//查询用户信息
    	$scope.userListClick=function(){
    		var initUserUrl=ENV.localapi+"/coreUser/queryUserListNotCurrentDepartment";
    		//$scope.paramUser.paging="No";
    		dataFactory.getlist(initUserUrl, 'POST',
        			{ 'Content-type': 'application/json'},
	        		JSON.stringify($scope.paramUser)).then(function(d) {
	        			$scope.userList=d.beanList;
	        			$scope.paginationConf.totalItems = d.totalRows;
	        	    	$scope.count = 0;//已选择数量 
	        	    	data.selectData = [];//已选对象
	        	    	data.notSelectData = [];//未选对象
	        	    	$scope.userSelectAll=false;//清空全选
	        	    	angular.forEach($scope.userList, function(item) {//清空列表全选
	        	    		item.checked=false;
	                    });
        			},function(data){  
    				    console.log(JSON.stringify(data));
        			})
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
        $scope.pageAuto =function() {
        	$scope.paramUser.paging = "Yes";
        	$scope.paramUser.pageNo = $scope.paginationConf.currentPage;
        	$scope.paramUser.pageSize = $scope.paginationConf.itemsPerPage;
        	$scope.paramUser.department={"id":$scope.department.id};
        	$scope.paramUser.flag = 1;
        	//$scope.paramUser.usermode = $scope.userModeOptions[$scope.umoIndex].id;
        	//$scope.paramUser.name = $scope.userNameLike;
        	//console.log(angular.toJson($scope.paramUser,true));
        	if(SysUtils.nonEmptyCheck($scope.department.id))
            $scope.userListClick();
        };
        $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.pageAuto);
    	//添加用户到部门
    	$scope.addUserToDepartment=function(saveUserToDepart){
    		SysUtils.swalConfirm("提示","是否添加用户到["+$scope.department.name+"]此部门下","info",function(isConfirm){
    			if(isConfirm)
    			$scope.operatingUserList(saveUserToDepart);
    		});
    	}
    	//操作用户列表
    	$scope.operatingUserList=function(action){
    		if(action==='query'){
    			$scope.userListClick();
    		}else if(action==='saveUserToDepart'||action==='deleteUser'){
    			$scope.department.ids=data.selectData;
    			var saveDepartmentUserUrl=ENV.localapi+"/coreDepartment/saveDepartmentUser";
    			if(action==='deleteUser'){
    				saveDepartmentUserUrl=ENV.localapi+"/coreDepartment/deleteDepartmentUser";
    			}
    			dataFactory.getlist(saveDepartmentUserUrl, 'POST',
            			{ 'Content-type': 'application/json'},
            			JSON.stringify($scope.department)).then(
            			function(d) {
	            			$('#userList').modal('hide');
	            			if(data.selectData!==null&&data.selectData.length>0){
	            				$scope.toDepartContent($scope.department,null,"getdepartUsers");
	            			}
            			},function(data){  
            				console.log(JSON.stringify(data));
            	})
    		}
    	};
    	//上下移动顺序
    	$scope.orderMove=function(node,action){
    		SysUtils.swalConfirm("提示","确定移动该部门排序吗？","info",function(isConfirm){
    			if(isConfirm){
	    			var dataNode=NodeTreeTool.queryParentNodeAndSiblingNodes(node,$scope.data);
	        		var siblingNodes=dataNode.siblingNodes;//获取兄弟部门
	        		var lastDepart={};/*上一个兄弟部门或者下一个兄弟部门*/
	        		var lastSq;/*上一个兄弟部门顺序或者下一个兄弟部门顺序*/
	        		var currentSq=node.orderNum;
	        		if(dataNode.index>0&&action==='up'){
	        			lastDepart=siblingNodes[dataNode.index-1];
	        			lastSq=lastDepart.orderNum;
	        		}else if(dataNode.index<siblingNodes.length-1&&action==='down'){
	        			lastDepart=siblingNodes[dataNode.index+1];
	        			lastSq=lastDepart.orderNum;
	        		}
	        		node.orderNum=lastSq;
	        		lastDepart.orderNum=currentSq;
	        		/*更新排序之后的部门*/
	        		var postUrl=ENV.localapi+"/coreDepartment/update";
	        		$scope.requstService(postUrl,JSON.stringify(node),function(d){
	        			$scope.requstService(postUrl,JSON.stringify(lastDepart),function(d){
	        				$scope.requstList();
	            		});
	        		});
    			}
    		});
    		
    	}
    	/*$scope.tableMove=function(index,action){
    		var lastDepart={};上一个兄弟部门或者下一个兄弟部门
    		var lastSq;上一个兄弟部门顺序或者下一个兄弟部门顺序
    		var currentSq=$scope.entityBean.users[index].inDepartSeq;
    		if(index>0&&action==='up'){
    			lastDepart=$scope.entityBean.users[index-1];
    			lastSq=lastDepart.inDepartSeq;
    		}else if(index<$scope.entityBean.users.length-1&&action==='down'){
    			lastDepart=$scope.entityBean.users[index+1];
    			lastSq=lastDepart.inDepartSeq;
    		}
    		更新排序之后的部门
    		var initUserUrl=ENV.localapi+"/coreDepartment/editeDepartUserSqe";
    		var currentparam={"id":$scope.department.id,"orderNum":lastSq,"userId":$scope.entityBean.users[index].id};
    		var lastparam={"id":$scope.department.id,"orderNum":currentSq,"userId":lastDepart.id};
    		$scope.requstService(initUserUrl,JSON.stringify(currentparam),function(d){
    			$scope.requstService(initUserUrl,JSON.stringify(lastparam),function(d){
    				$scope.toDepartContent($scope.department,"","editeDepartUserSqe");
        		});
    		});
    	}*/
    	$scope.requstService=function(postUrl,parameter,callback){
    		dataFactory.getlist(postUrl, 'POST',
        			{ 'Content-type': 'application/json'},
        			parameter).then(
        			function(d) {
        				callback(d);
        			},function(data){  
        				console.log(JSON.stringify(data));
        			})
    	};
    	/**********************************表格复选删除start***************************************************/
    	var data={};
    	//选择单个（取消选择单个
        $scope.changeCurrent = function(current, $event,action) {
        	var beanList=[];
        	//console.log("单选");
        	if(action==='addUser'){
        		beanList=$scope.userList;
        		/*if(SysUtils.nonEmptyCheck($scope.searchName)){
        			beanList=$filter('filter')($scope.userList,$scope.searchName);
        		}*/
        		if(current.checked&&current.userDepartList!==null&&current.userDepartList.length>0){
        			var str="";
                	angular.forEach(current.userDepartList, function(data){
                		//console.log(data.a);
                		str+=data.name+",";
                	});
                	str=(str.substring(str.length-1)==',')?str.substring(0,str.length-1):str;
                	if(str!==""){
                		swal("提示","该人员已经属于："+str+" 下的部门","info");
                	}
        		}
        	}else if(action==='deleteUser'){
        		beanList=$scope.entityBean.users;
        	}else
        		return;
        	//console.log(current.checked);
          //计算已选数量 true加， false减
            $scope.count += current.checked ? 1 : -1;
            //判断是否全选，选数量等于数据长度为true
            $scope.userSelectAll = $scope.count === beanList.length;
            //统计已选对象
            data.selectData = [];
            data.notSelectData = [];
            angular.forEach(beanList, function(item) {
                if(item.checked){
                	data.selectData[data.selectData.length] = item.id;
                }else{
                	data.notSelectData[data.notSelectData.length]= item.id;
                }
            });
          $event.stopPropagation();//阻止冒泡
        };
        
        //全选（取消全选
        $scope.changeAll = function(action) {
        	//console.log("多选"+$scope.userSelectAll);
        	data.selectData = [];
        	data.notSelectData = [];
        	var beanList=[];
        	if(action==='addUser'){
        		beanList=$scope.userList;
        		if(SysUtils.nonEmptyCheck($scope.searchName)){
        			beanList=$filter('filter')($scope.userList,$scope.searchName);
        		}
        	}else if(action==='deleteUser'){
        		beanList=$scope.entityBean.users;
        	}else
        		return;
        	//console.log("----"+JSON.stringify(beanList)+"==undefined="+$scope.searchName);
            $scope.count = $scope.userSelectAll ? beanList.length : 0;
        	angular.forEach(beanList, function(item) {
                item.checked = $scope.userSelectAll;
                if(item.checked){
                	data.selectData[data.selectData.length] = item.id;
                }else{
                	data.notSelectData[data.notSelectData.length]= item.id;
                }
            });
        };
        //选择单个（取消选择单个树形菜单
        $scope.countTree = 0;//已选择数量 
        $scope.selectTreeData = [];//已选对象
        $scope.notSelectTreeData = [];//未选对象
    	$scope.TreeSelectAll=false;//清空全选
        $scope.changeCurrentTree = function(current, $event) {
        	//console.log("0"+current.checked);
        	var beanList=$scope.data;
          //计算已选数量 true加， false减
           // $scope.count += current.checked ? 1 : -1;
            //判断是否全选，选数量等于数据长度为true
            //$scope.treeSelectAll = $scope.count === beanList.length;
            //统计已选对象
        	$scope.selectTreeData = [];//已选对象
            $scope.notSelectTreeData = [];//未选对象
            angular.forEach(beanList, function(item) {
                if(item.checked){
                	$scope.selectTreeData[$scope.selectTreeData.length] = item.id;
                }else{
                	$scope.notSelectTreeData[$scope.notSelectTreeData.length]= item.id;
                }
                if(item.nodes!==null&&item.nodes.length>0){
                	$scope.foreach(item,current);
                }
            });
          //$event.stopPropagation();//阻止冒泡
        };
        
        $scope.foreach=function(node,current){
        	$scope.countTree = 0;//已选择数量 
        	angular.forEach(node.nodes, function(item) {//清空列表全选
        		if(current.id===node.id){
        			item.checked=node.checked;
        		}
        		//计算已选数量 true加， false减
                $scope.countTree += item.checked ? 1 : -1;
                //判断是否全选，选数量等于数据长度为true
                if($scope.countTree === node.nodes.length){
                	node.checked=true;
                }
        		if(item.checked){
        			$scope.selectTreeData[$scope.selectTreeData.length] = item.id;
                }else{
                	$scope.notSelectTreeData[$scope.notSelectTreeData.length]= item.id;
                }
        		if(item.nodes!==null&&item.nodes.length>0){
                	$scope.foreach(item,current);
                }
            });
        }
    	/**********************************表格复选删除end***************************************************/
    /*计算布局高度*/
    $scope.calculatedHeight=function(){
        $('.content-wrapper').css('height', SysUtils.get_content_wrapper());
        //console.log("=ceter_p=="+$('#panel-heading').outerHeight(true));
        $('.gdt_cont').css('max-height',$('.content').height());
        $('.details').css('height',$('.content').height());
    }

    $scope.calculatedHeight();
   	
}]);