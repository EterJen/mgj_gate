myApp.service('ProjectInfoService', function($http,ENV) {
		  
    this.getBreakDownInfoByIdAndYear = function (projectInfoId,nd,resultHandler) {
    	$.ajax({
			  type : "GET",//
			  url : ENV.localapi+"coreController?operationName=getTaskBreakDownInfoByProjectId&projectInfoId="+projectInfoId+"&nd="+nd,//要访问的后台地址  
			  dataType:'json',
			  contentType: "application/x-www-form-urlencoded; charset=utf-8", 
			  success : function(result) {//data为返回的数据，在这里做数据绑定
			  	 resultHandler(result);
			  },
			  error : function(XMLResponse) {
				 console.log(JSON.stringify(XMLResponse));
			  }
    	}); 
    };
    
    
    this.saveMoneyManage = function (moneyManage,resultHandler) {
    	$.ajax({
			  type : "POST",//
			  url : ENV.localapi+"coreController?operationName=saveMoneyManage",//要访问的后台地址  
			  dataType:'json',
			  data:"moneyManageStr="+JSON.stringify(moneyManage),
			  success : function(result) {//data为返回的数据，在这里做数据绑定
			  	 resultHandler(result);
			  },
			  error : function(XMLResponse) {
				 console.log(JSON.stringify(XMLResponse));
			  }
    	}); 
    };
    
    this.fileUpload = function(fileElementId,resultHandler) {
    	  $.ajaxFileUpload({
            url: ENV.localapi+"coreController?operationName=getTaskBreakDownInfoByProjectId&projectInfoId="+projectInfoId+"&nd="+nd,//要访问的后台地址  , 
            secureuri: false,
            fileElementId: attachTypeName,
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success: function (data) {
            	resultHandler(data);
            },
            error: function (data) {
            	console.log(data);
            	alert('上传失败，请稍后重试');
            }
      	});
	};
});

