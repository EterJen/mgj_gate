/*myApp.config(function($stateProvider,ENV) {

	$stateProvider.state('coreHome.formConfig', {
	    url: "/formConfig",
	    views: {
	        'rightContent@coreHome': {
	            templateUrl: ENV.templateLocate + "/apps/workflow/formConfig.html?ts=" + timestamp,
	            controller: "formConfigCtrl",
	            cache: false,
	        }
	    }
	});
}); */


myApp.controller('formConfigCtrl', ['$rootScope','$scope', 'ENV', '$state',  'SysUtils', function ($rootScope,$scope, ENV, $state,  SysUtils) {
    console.log('formConfigCtrl 1');
    $rootScope.addBgground = true;
    $scope.activeProcVersionList =[];
    $scope.selectedProVersionId ={};
    $scope.selectedNode = null;
    $scope.nodeList = [];
    $scope.fieldList = [];
    $scope.isAllSelected = false;
    $scope.isRequiredAllSelected = false;

    $scope.getTemplatePath = function(formDefId){
    	if(formDefId=='fawen'){
    		return 'apps/workflow/formTemplates/jxw_fawen.html';
    	}else if(formDefId=='workapproved'){
    		return 'apps/workflow/formTemplates/workApproved.html';
    	}else if(formDefId=='contractapproved'){
    		return 'apps/workflow/formTemplates/contractApproved.html';
    	}else if(formDefId=='otherapproved'){
    		return 'apps/workflow/formTemplates/otherApproved.html';
    	}else if(formDefId=='draftapproved'){
    		return 'apps/workflow/formTemplates/draftApproved.html';
    	}else if(formDefId=='partyapproved'){
    		return 'apps/workflow/formTemplates/partyApproved.html';
    	}else if(formDefId=='officepartyapproved'){
    		return 'apps/workflow/formTemplates/officepartyApproved.html';
    	}else if (formDefId=='blyjbprd' || formDefId=='blyjbpzx') {
          return 'apps/workflow/formTemplates/blyjbp.html';
        } else {
          return 'apps/workflow/formTemplates/' + formDefId + '.html';
        }
    }
  $scope.hisEditcheckAll = function(){

    if($scope.isAllSelectedHis){
      $scope.fieldList.forEach(function (value, index, array) {
        value.isAbleEditHis = 'true';
      })
    }else{
      $scope.fieldList.forEach(function (value, index, array) {
        value.isAbleEditHis = 'false';
      })
    }

  }


  $scope.selectedAll = function(){

    	if($scope.isAllSelected){
    		 $scope.fieldList.forEach(function (value, index, array) {
    			 value.isAbleEdit = 'true';
             })
    	}else{
    		 $scope.fieldList.forEach(function (value, index, array) {
    			 value.isAbleEdit = 'false';
             })
    	}

    }

    $scope.requiredSelectAll = function () {
        if($scope.isRequiredAllSelected){
            $scope.fieldList.forEach(function (value, index, array) {
                value.isRequired = 'true';
            })
        }else{
            $scope.fieldList.forEach(function (value, index, array) {
                value.isRequired = 'false';
            })
        }

    };

    $scope.saveCtrlConfig=function(){

    	SysUtils.requestByJson("/wfFormFieldControl/saveConfig?processVersionId="+$scope.selectedProVersionId.id+"&nodeId="+$scope.selectedNode.id,$scope.fieldList,function(resultInfo){
    		SysUtils.handleResult(resultInfo, {'state': $state}, function () {
    			 SysUtils.swalOnlyConfirm("提示", resultInfo.message, "info", function (isConfirm) {
    				 $scope.showConfigDetail($scope.selectedNode);
    				 $('#nodeConfigDialog').modal('hide');
                     $scope.initStyle();

                     return;
                 });
            })
    	})
    }
    
    $scope.showNodeConfigDialog = function(node){
    	//var tableName = "wf_form_"+$scope.selectedProVersionId.processDefManage.formDefId;
    	$scope.selectedNode = node; 
    	var tempFieldList = [];
    	$('input[name],textarea[name]').each(function(){
    		var ele = $(this);
    		var tf = {processVersionId:$scope.selectedProVersionId.id,nodeId:node.id,fieldName:ele.attr('name')};
    		tempFieldList.push(tf);
    	})
    	SysUtils.requestByJson("/wfFormFieldControl/getFL?processVersionId="+$scope.selectedProVersionId.id+"&nodeId="+node.id,tempFieldList,function(resultInfo){
    		SysUtils.handleResult(resultInfo, {'state': $state}, function () {
    			$scope.fieldList = resultInfo.beanList;
    			//console.log(JSON.stringify($scope.fieldList));
                $scope.initStyle();
                //$scope.isAllSelected = false;
                $scope.$apply();
                $('#nodeConfigDialog').modal('show');
            })
    	})
    }
    
    $scope.showConfigDetail = function(node){
    	$scope.selectedNode = node; 
    	var tempFieldList = [];
    	$('input[name],textarea[name]').each(function(){
    		var ele = $(this);
    		var tf = {processVersionId:$scope.selectedProVersionId.id,nodeId:node.id,fieldName:ele.attr('name')};
    		tempFieldList.push(tf);
    	})
    	SysUtils.requestByJson("/wfFormFieldControl/getFL?processVersionId="+$scope.selectedProVersionId.id+"&nodeId="+node.id,tempFieldList,function(resultInfo){
    		SysUtils.handleResult(resultInfo, {'state': $state}, function () {
    			$scope.fieldList = resultInfo.beanList;
    			console.log(JSON.stringify($scope.fieldList));
                $scope.initStyle();
                $scope.$apply();
            })
    	})
    }

  $scope.changePermHis=function(field,index){
    if(field.isAbleEditHis=='false')
      field.isAbleEditHis = 'true';
    else if(field.isAbleEditHis=='true')
      field.isAbleEditHis = 'false';
    var isAllSelectedHis=true;
    angular.forEach($scope.fieldList, function(data){
      if(data.isAbleEditHis==='false'){
        isAllSelectedHis=false;
      }
    });
    $scope.isAllSelectedHis=isAllSelectedHis;
  }


  $scope.changePerm=function(field,index){
    	if(field.isAbleEdit=='false')
    		field.isAbleEdit = 'true';
    	else if(field.isAbleEdit=='true')
    		field.isAbleEdit = 'false';
    	var isAllSelect=true;
        angular.forEach($scope.fieldList, function(data){
            if(data.isAbleEdit==='false'){
                isAllSelect=false;
            }
        });
        $scope.isAllSelected=isAllSelect;

    	/*$('.formCtrlField').each(function(){
    		var ele = $(this);
    		var ngModelStr =ele.attr('ng-model');
    		$scope.fieldList.forEach(function(field){
    			if(field.id==ngModelStr){
    				if(field.perm){
    					ele.addClass('editable');
    				}else{
    					ele.removeClass('editable');
    				}
                }
            });
    	})*/
    }

    $scope.changeRequired = function (field) {
        if(field.isRequired=='false' || field.isRequired == null || field.isRequired == '')
            field.isRequired = 'true';
        else if(field.isRequired=='true')
            field.isRequired = 'false';
        var isAllSelect=true;
        angular.forEach($scope.fieldList, function(data){
            if(data.isRequired==='false'){
                isAllSelect=false;
            }
        });
        $scope.isRequiredAllSelected=isAllSelect;

    };
    
    $scope.initStyle = function(){
    	var editAllSelected = true;
    	var requiredAllSelected = true;
      var requiredAllSelectedHis = true;
        $scope.fieldList.forEach(function (field) {
    		if (editAllSelected) {
                if (field.isAbleEdit == 'false' || field.isAbleEdit == null || field.isAbleEdit == '') {
					editAllSelected = false;
                }
            }
            if (requiredAllSelected) {
                if (field.isRequired == 'false' || field.isRequired == null || field.isRequired == '') {
                    requiredAllSelected = false;
                }
            }
          if (requiredAllSelectedHis) {
            if (field.isAbleEditHis == 'false' || field.isAbleEditHis == null || field.isAbleEditHis == '') {
              requiredAllSelectedHis = false;
            }
          }
		});
        if (editAllSelected) {
            $scope.isAllSelected = true;
        }
        if (requiredAllSelected) {
            $scope.isRequiredAllSelected = true;
        }
      if (requiredAllSelectedHis) {
        $scope.isAllSelectedHis = true;
      }
    	$scope.fieldList.forEach(function(field){
    		var fieldName = field.fieldName;
    		var theinput = $("[name='"+fieldName+"']");
    		if(theinput!=null&&theinput.length==1){
    			if(field.isAbleEdit=='true'){
    				theinput.removeClass('notEditable');
    				theinput.addClass('editable');
    			}else{
    				theinput.removeClass('editable');
    				theinput.addClass('notEditable');
    			}
    			if (field.isRequired == 'true') {
                    theinput.attr('placeholder', '*');
                }else{
                    theinput.attr('placeholder', '');
                }
    		}
        });
    };
    
    $scope.initWorkflowList = function(){
        $scope.processVersionListParam = {paging: "No"};
        $scope.processVersionListParam.isActive = 1;
        $scope.processVersionListParam.dbParams = {};
        $scope.processVersionListParam.dbParams.defManageFlag = 1;
    	SysUtils.requestByJson("/processDefVersion/formConfig/list",$scope.processVersionListParam,function(resultInfo){
    		SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                $scope.activeProcVersionList = resultInfo.beanList;
                $scope.$apply();
                $('#createProInstDialog').modal('show');
            })
    	})
    }
    
    $scope.queryNodeListByVersion=function(){
    	$scope.selectedNode = null;

    	SysUtils.requestByJson("/rProcessInstance/getNodeListByVersionId/"+$scope.selectedProVersionId.id,{},function(resultInfo){
    		SysUtils.handleResult(resultInfo, {'state': $state}, function () {
				$scope.nodeList = resultInfo.beanList;
				/*收发文登陆角色 需要在任意阶段操作任何节点*/
				var allNode = {
                  id: "999",
                  orderNum:999,
                  name:"全部节点"
                }
              $scope.nodeList.push(allNode);

              $scope.$apply();
            })
    	});
    }
    
    //include的元素加载完成
    $scope.$on('$includeContentLoaded', function () {
    	//$scope.initStyle();
    });
    
    $scope.initWorkflowList();

    /*计算布局高度*/
    $scope.calculatedHeight=function(){
        $('.content-wrapper').css('height', SysUtils.get_content_wrapper());
        $('.content-wrapper').css('overflow', 'auto');
        //console.log("=ceter_p=="+$('#panel-heading').outerHeight(true));
        //$('#panel-body-table').css('height',$('.content').height()-$('#panel-heading').outerHeight(true));
        //$('.table_shadow').css('max-height',$('.content').height()-$('#panel-heading').outerHeight(true)-$('#ceter_p').outerHeight());
    }

    $scope.calculatedHeight();
    
}]); 