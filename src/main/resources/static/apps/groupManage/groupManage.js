myApp.config(function($stateProvider, ENV) {

	$stateProvider.state('coreHome.groupManageList', {
		url : "/groupManageList",
		views : {
			'rightContent@coreHome' : {
				templateUrl : ENV.templateLocate
						+ "/apps/groupManage/groupManageList.html?ts="
						+ timestamp,
				controller : "groupManageListCtrl",
				cache : false,
			}
		}
	});

});

myApp.controller('groupManageListCtrl', [
		'$scope',
		'ENV',
		'$state',
		'Storage',
		'dataFactory',
		function($scope, ENV, $state, Storage, dataFactory) {
			console.log("groupManageListCtrl controller");
			/** ***********************一、变量定义*************************** */
			$scope.GroupTreeData = {};	//呈现树结构的数据
			$scope.GroupPlainData = {};	//呈现列表的数据
			$scope.SelectedGroup  = "";	//选中的节点数据
			$scope.SelectedParent = "";	//选中的节点的父节点数据
			$scope.UserList = {};		//选中的节点的用户列表数据
			$scope.isUpdate = true;			// 初始化组详情
			$scope.GroupInEdit;			//在编辑中的组
			$scope.ParentOfGroupInEdit;	//在编辑中的组的父节点
			$scope.GroupInCreate = {};	//在新增中的组
			/** ***********************二、函数定义*************************** */
			$scope.renderNode = function(item) {
				return !($scope.query && $scope.query.length > 0 && item.title
						.indexOf($scope.query) == -1);
			};

			$scope.remove = function(scope) {
				scope.remove();
			};

			// 初始化数据
			$scope.procRequstList = function() {
				var groupTreeUrl = ENV.localapi + "/coreGroup/groupTree";
				dataFactory.getlist(groupTreeUrl, 'POST', {
					'Content-type' : 'application/json'
				}, {}).then(function(dataResult) {
					console.log(JSON.stringify(dataResult));
					$scope.GroupTreeData_RR = dataResult.beanList;
				}, function(GroupTreeData_RR) {
					console.log(JSON.stringify(GroupTreeData_RR));
				});
				
				var groupListUrl = ENV.localapi + "/coreGroup/groupFullList";
				dataFactory.getlist(groupListUrl, 'POST', {
					'Content-type' : 'application/json'
				}, {}).then(function(dataResult) {
					console.log(JSON.stringify(dataResult));
					$scope.GroupListData = dataResult.beanList;
				}, function(GroupListData) {
					console.log(JSON.stringify(GroupListData));
				})
			}

			$scope.procRequstList();
			
			//新增获取部门信息
	    	$scope.ShowNewGroup=function(parentGroup){
	    		var groupDetailsUrl=ENV.localapi+"/coreGroup/init?initType=create";
	    		dataFactory.getlist(groupDetailsUrl, 'POST',
	        			{ 'Content-type': 'application/json'},
	        			{}).then(
	        			function(d) {
		        			$scope.GroupInCreate=d.bean;
		        			//console.log(depart);
		        			if(GroupInCreate===null||GroupInCreate===undefined){
		        				$scope.GroupInCreate.parentid=$scope.SelectedParent.id;
		        			}else
		        				$scope.GroupInCreate.parentid=parentGroup.id;
		        			$('#creatDepartment').modal('show');
	        			},function(data){  
	        				console.log(JSON.stringify(data));
	        			})
	    	}
			
	    	$scope.procConnectParent = function(parentid)
	    	{
	    		angular.forEach($scope.GroupListData, function(item) {// 清空列表全选
					if(item.id === parentid){
						$scope.SelectedParent = item;
						return;
					}
					else{
						$scope.SelectedParent = null;
					}
				})
	    	}
	    	
			// 点击部门获取组详情和组下的用户
			$scope.TreeNodeOnClick = function(theNode, target, action) {
				console.log(action);
				//alert('click node:' + action + ',' + target + ',' + theGroup.id + ',' + theGroup.parentid);
				// 点击数菜单变更背景颜色
				if (action === null || action === '' || action === undefined) {
					$(".angular-ui-tree-handle").removeClass("active");
					$(target.currentTarget).addClass("active");
					$scope.SelectedGroup = theNode;
					$scope.procConnectParent(theNode.parentid);
				}
				var groupDetailsUrl = ENV.localapi + "/coreGroup/read/"
						+ theNode.id;
				dataFactory.getlist(groupDetailsUrl, 'POST', {
					'Content-type' : 'application/json'
				}, {}).then(function(d) {
					console.log(JSON.stringify(d));
					$scope.entityBean = d.bean;

					$scope.count = 0;// 已选择数量
					$scope.GroupTreeData.selectData = [];// 已选对象
					$scope.GroupTreeData.notSelectData = [];// 未选对象
					$scope.userSelectAll = false;// 清空全选
					angular.forEach($scope.entityBean.users, function(item) {// 清空列表全选
						item.checked = false;
					});
				}, function(data) {
					console.log(JSON.stringify(data));
				})
			}
			
			// 监听添加用户界面modul消失，初始化复选框
//	    	$('#userList').on('hidden.bs.modal', function (e) {
//	    		$scope.count = 0;// 已选择数量
//		    	$scope.GroupTreeData.selectData = [];// 已选对象
//		    	$scope.GroupTreeData.notSelectData = [];// 未选对象
//		    	$scope.userSelectAll=false;// 清空全选
//		    	angular.forEach($scope.entityBean.users, function(item) {// 清空列表全选
//		    		item.checked=false;
//	            });
//		    	$scope.$apply();
//	    	})
	    	
	    	
	    	
	    	// 新增部门默认代表新增平级部门,修改部门,配置人员的按钮点击事件
	    	$scope.modiGroup=function(action)
	    	{
	    		//alert('selected:' + $scope.group.id + ';parentid:' + $scope.group.parentid);
	    		
	    		if((action==='add' || action==='addChild') && $scope.GroupTreeData.length===0)
	    		{
	    			swal("数据未初始化，无法操作！","数据未初始化","error");
	    			return;
	    		}
	    		
	    		if((action==='add' || action==='addChild') && $scope.SelectedGroup === '')
	    		{
	    			swal("请选择一个组","请选择一个组","info");
	    			return;
	    		}
	    		var groupDetailsUrl="";
	    		//alert($scope.group.parentid);
	    		if(action==='add')
	    		{
	    			if($scope.SelectedGroup.parentid == null)
	    			{	    				
	    				$scope.SelectedParent = null;
	    			}
	    			else
	    			{			
	    				angular.forEach($scope.data, function(item) {
				    		if(item.id === $scope.SelectedGroup.parentid)
				    		{
				    			$scope.SelectedParent = item;
				    			//alert('Found:' + item.id);
				    			return;
				    		}
			            });
	    			}
	    		}
	    		else if(action==='addChild')
	    		{
	    			$scope.funcShowNewGroup($scope.SelectedParent);
	    		}
	    		else if(action==='update')
	    		{
	    			$scope.isUpdate=false;
	    		}
	    		else if(action==='addUser')
	    		{
	    			// 初始化用户参数
	    			$scope.initUser();
	    		}
	    		else if(action==='deleteUser')
	    		{
	    			if(data.selectData===null||data.selectData.length===0)
	    			{
	    				swal("请选择用户","至少选择一个组下的用户","info");
	        			return;
	    			}
	    			$scope.operatingUserList('deleteUser');
	    		}
	    		else if(action==='delete')
	    		{
	    			if($scope.group.parentid==="-1"||$scope.group.parentid===""||$scope.group.parentid===null)
	    			{
	    				swal("禁止删除","请重新选择组，不允许删除根节点！","info");
	        			return;
	    			}
	    		
	    			var deleteGroupUrl=ENV.localapi+"/coreGroup/delete/"+$scope.group.id;
	    			
	    			swal({
	       	            title:'提示',
	       	            text:"确定要删除这个群组吗？",
	       	            type:"error",
	       	            confirmButtonColor:'#DD6B55',
	       	            confirmButtonText:'确定',
	       	            cancelButtonColor:'#3c8dbc',
	       	            cancelButtonText:'取消',
	       	            showCancelButton: true,
	       	            showConfirmButton: true,
	       	            closeOnConfirm:false,
	       	            closeOnCancel:false
	       	        },
	       	        function(isConfirm){
	       	            if(isConfirm){
	       	            	dataFactory.getlist(deleteGroupUrl, 'POST',
	       	            			{ 'Content-type': 'application/json'},
	       	            			{}).then(
	       	            			function(d) {
	       	            				$scope.requstList();
	       	            			},function(data){ 
	       	            				console.log(JSON.stringify(data));
	       	            	})
	       	            }
	       	            swal.close();
	       	        });
	    		}
	    	}
	    	

		} ]);