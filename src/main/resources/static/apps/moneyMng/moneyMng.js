myApp.config(function($stateProvider,ENV) {
	
	$stateProvider.state('moneyMng', {
        url: "/moneyMng/:id",
        templateUrl: ENV.templateLocate+"apps/moneyMng/moneyMng.html?ts="+timestamp,
        controller: 'MoneyMngCtrl'
    });
	
}); 

myApp.controller('MoneyMngCtrl', ['$scope','$rootScope','$state','$stateParams','ENV','ProjectInfoService',function($scope,$rootScope,$state,$stateParams,ENV,ProjectInfoService) {
    console.log('MoneyMngCtrl Controller'+ENV.templateLocate+"参数："+$stateParams.id);
    
    //1、变量定义；
    var projectInfoIdParam = $stateParams.id;
    $scope.projectInfo = {};
    $scope.moneyManageEdit = {};
    
    //2、方法定义
    $scope.saveMoneyManage = function() {
    	ProjectInfoService.saveMoneyManage($scope.moneyManageEdit,function(result){
	       	console.log(result);
	       	alert(result.message);
	       	$('#addAndEditMoneyDialog').modal('hide');
	       	location.reload();
       });
    };
    
    $scope.getMoneyManageInfoByProjectInfoId = function(projectInfoId) {
    	$.ajax({
			  type : "GET",//
			  url : ENV.localapi+"coreController?operationName=getMoneyManageInfoByProjectInfoId&projectInfoId="+projectInfoId,//要访问的后台地址  
			  dataType:'json',
			  success : function(result) {//data为返回的数据，在这里做数据绑定
				  console.log(result.bean.moneyManageList);
				  $scope.$apply($scope.projectInfo = result.bean);
				  $scope.$apply($scope.projectInfo.moneyManageList = result.bean.moneyManageList);
			  },
			  error : function(XMLResponse) {
				 console.log(JSON.stringify(XMLResponse));
			  }
    	}); 
    };
    
    $scope.openAddAndEditMoneyDialog = function(mode,row){
    	if(mode=='add'){
    		$scope.moneyManageEdit ={};
    		$scope.moneyManageEdit.projectInfoId = projectInfoIdParam;
    		$scope.moneyManageEdit.currentState = 'mmDraft';
    	}else if(mode=='edit'){
    		$scope.moneyManageEdit =row;
    	}
    	$('#addAndEditMoneyDialog').modal('show');
    };
    
    $scope.deleteMoneyManage = function(moneyManageId){
    	var r=confirm("确定要删除该记录吗")
    	if (r==true){
    		$.ajax({
	  			  type : "POST",//
	  			  url : ENV.localapi+"coreController?operationName=deleteMoneyManage&moneyManageId="+moneyManageId,//要访问的后台地址  
	  			  dataType:'json',
	  			  success : function(result) {//data为返回的数据，在这里做数据绑定
	  				  alert(result.message);
	  				  location.reload();
	  			  },
	  			  error : function(XMLResponse) {
	  				 console.log(JSON.stringify(XMLResponse));
	  			  }
	      	}); 
    	}
    }
    
    $scope.smAction = function(actionDef,row){
    	var r=confirm("确定要进行"+actionDef.actionChinese+"操作吗？")
    	if (r==true){
    		$.ajax({
	  			  type : "POST",//
	  			  url : ENV.localapi+"coreController",//要访问的后台地址  
	  			  dataType:'json',
	  			  data:"operationName=handleMoneyManageSmAction&moneyManageId="+row.id+"&actionName="+actionDef.actionName,
	  			  success : function(result) {//data为返回的数据，在这里做数据绑定
	  				  alert(result.message);
	  				  location.reload();
	  			  },
	  			  error : function(XMLResponse) {
	  				 console.log(JSON.stringify(XMLResponse));
	  			  }
	      	}); 
    	}
    }
    
    $scope.handleBeanActions = function(actionDef,row){
    	if(actionDef.actionName=='maEdit'){
    		$scope.openAddAndEditMoneyDialog('edit',row);
    	}else if(actionDef.actionName=='maDelete'){
    		$scope.deleteMoneyManage(row.id); 
    	}else if(actionDef.actionName=='maSubmit'||actionDef.actionName=='maBack'||actionDef.actionName=='maPass'){
    		$scope.smAction(actionDef,row);
    	}
    }
    
    $scope.closeAddAndEditMoneyDialog = function(){
    	$('#addAndEditMoneyDialog').modal('hide');
    }
    
    //3、初始化调用；
    $scope.getMoneyManageInfoByProjectInfoId(projectInfoIdParam);
    
}]);   

