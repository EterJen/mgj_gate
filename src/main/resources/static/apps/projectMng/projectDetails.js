myApp.config(function($stateProvider,ENV) {
	
	$stateProvider.state('projectDetails', {
        url: "/projectDetails/:mode/:manageType/:id",
        templateUrl: ENV.templateLocate+"apps/projectMng/projectDetails.html?ts="+timestamp,
        controller: 'ProjectDetailsCtrl'
    });
	
}); 

myApp.controller('ProjectDetailsCtrl', ['$scope','$rootScope','$state','$stateParams','ENV','ProjectInfoService',function($scope,$rootScope,$state,$stateParams,ENV,ProjectInfoService) {
    console.log('ProjectDetailsCtrl Controller'+ENV.templateLocate+"参数："+$stateParams.id);
    
    //1、变量定义；
    var mode = $stateParams.mode;
    var manageType = $stateParams.manageType;
    var projectInfoId = $stateParams.id;
    $scope.projectInfo = {};
    $scope.buildOfficeList = [];
    $scope.otherBuildOfficeList = [];
    console.log('project id:'+projectInfoId);
    
    //2、函数的定义
    $scope.calAllcountcost = function(){
    	$scope.projectInfo.allcountcost = 
    		Number($scope.projectInfo.projectcost)
    		.add(Number($scope.projectInfo.earlyPhaseCost))
    		.add(Number($scope.projectInfo.otherscost)).toFixed(3);
    	return $scope.projectInfo.allcountcost;
    }
    
    $scope.calThisYearFund = function(){
    	$scope.projectInfo.currentYearFunds = 
    		Number($scope.projectInfo.centralmoney)
    		.add(Number($scope.projectInfo.citymoney))
    		.add(Number($scope.projectInfo.esplees))
    		.add(Number($scope.projectInfo.sec_cityandgarden))
    		.add(Number($scope.projectInfo.sec_companyfinancing))
    		.add(Number($scope.projectInfo.othermoney))
    		.toFixed(3);
    	return $scope.projectInfo.currentYearFunds;
    }
    
    $scope.calPlanMoney = function(){
    	$scope.projectInfo.planmoney = 
    		Number($scope.projectInfo.allcountcost)
    		.add(Number(-$scope.projectInfo.currentYearFunds))
    		.add(Number(-$scope.projectInfo.lastYearTotalInvest));
    	return $scope.projectInfo.planmoney;
    }
    
    //3、初始化的逻辑
    if(mode=='add'){
    	$.ajax({
	  		  type : "GET",//
	  		  url : ENV.localapi+"AllInServlet?operation=getProjectInfoByParams&manageType="+manageType+"&mode="+mode,//要访问的后台地址  
	  		  dataType:'json',
	  		  success : function(result) {//data为返回的数据，在这里做数据绑定
	  			 $scope.projectInfo = result.projectInfo;
	  			 $scope.buildOfficeList = result.buildOfficeList;
	  			 $scope.$apply();
	  		  },
	  		  error : function(XMLResponse) {
	  			 console.log(JSON.stringify(XMLResponse));
	  		  }
    	}); 
    }else if(mode=='edit'){
    	if(projectInfoId==null){
    		alert("参数错误，请重新打开");
    		return;
    	}
    	$.ajax({
	  		  type : "GET",
	  		  url : ENV.localapi+"AllInServlet?operation=getProjectInfoByParams&projectInfoId="+projectInfoId+"&mode="+mode,//要访问的后台地址  
	  		  dataType:'json',
	  		  success : function(result) {//data为返回的数据，在这里做数据绑定
	  			 $scope.projectInfo = result.projectInfo;
	  			 $scope.buildOfficeList = result.buildOfficeList;
	  			 $scope.$apply();
	  		  },
	  		  error : function(XMLResponse) {
	  			 console.log(JSON.stringify(XMLResponse));
	  		  }
    	}); 
    }
    
    $scope.saveProjectInfo = function(){
    	$.ajax({
			  type : "POST",//
			  url : ENV.localapi+"AllInServlet?operation=saveProjectInfoByJsonStr",//要访问的后台地址  
			  dataType:'json',
			  data:"projectInfoStr="+JSON.stringify($scope.projectInfo),
			  success : function(result) {//data为返回的数据，在这里做数据绑定
				  alert(result.message);
				  window.close();
			  },
			  error : function(XMLResponse) {
				 console.log(JSON.stringify(XMLResponse));
			  }
    	}); 
    }
    
    
  /*  if(projectInfoIdParam==='0'){
    	$scope.projectInfo = {
    		buildcontent:"dsasdfasd阿斯顿发撒旦法f是电饭锅啥地方e",
    		projectname:"cccc11123",
    		cityMaintainList:[
    		   {label:"桥梁",value:"桥梁",selected:"No"},
    		   {label:"隧道",value:"隧道",selected:"No"},
    		   {label:"高架",value:"高架",selected:"No"}
    		],
    		keyFieldsList:[
               {label:"实事工程",value:"a",selected:"No"},
    		   {label:"社会事业三年行动计划",value:"b",selected:"No"},
    		   {label:"主体功能区",value:"c",selected:"No"}            
    		],
    		streetAndTownsList:[
               {label:"实事工程",value:"a",selected:"No"},
     		   {label:"社会事业三年行动计划",value:"b",selected:"No"},
     		   {label:"主体功能区",value:"c",selected:"No"}            
     		]
    	};
    }else{
    }
    */
  /*  $scope.moneyManageEdit = {};
    
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
    $scope.getMoneyManageInfoByProjectInfoId(projectInfoIdParam);*/
    
    
    
    
    
}]);   

