myApp.controller('holidayManagementCtl', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils', '$timeout','$stateParams','dataFactory', function ($rootScope, $scope, ENV, $state, SysUtils, $timeout,$stateParams,dataFactory) {
    console.log("holidayManagementCtl controller==");

    /*************************一、变量定义****************************/
    $scope.year="";
    $scope.month="";
    var y = new Date().getFullYear();
    var m= new Date().getMonth()+1;
    
    for (var i = y+5; i > (y-5); i--){
    	year.options.add(new Option(i,i));
    }
    year.value=y;
    month.value=m;
    
    /*************************二、函数定义****************************/
    


  




    $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.pageAuto);
    //</editor-fold>

    $scope.enterKeyup = function (e) {

        //IE 编码包含在window.event.keyCode中，Firefox或Safari 包含在event.which中
        var keycode = window.event ? e.keyCode : e.which;

        if (keycode == 13) {
            $scope.pageAuto();
        } else {
            return;
        }
    };


    /*************************三、初始化调用****************************/
    $scope.queryBean={
    		year:y,
    		month:m
    }
    var url='/workday/show';
    SysUtils.requestByJson(url, $scope.queryBean, function (resultInfo) {
        SysUtils.handleResult(resultInfo, {'state': $state}, function () {
            $scope.dataObject = resultInfo.additionalInfo;
            //console.log("dataObject="+resultInfo.additionalInfo.calendar);
            /*$scope.paginationConf.totalItems = resultInfo.totalRows;*/
            $scope.$apply();
        })
    });


    doSubmit = function () {
    	var year=$("#year").val();
    	var month=$("#month").val();
    	queryBean={
      			 year:year,
      			 month:month
      	  }
          	var url='/workday/show';
              SysUtils.requestByJson(url, queryBean, function (resultInfo) {
                  SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                      $scope.dataObject = resultInfo.additionalInfo;
                      $scope.$apply();
                      //console.log(JSON.stringify(resultInfo.additionalInfo));
                  })
              });
    }
    
    doSave = function () {
    	
    	var pids=new Array();
    	var checks=new Array();
    	var mustWorkdays=new Array();
    	$('input[name="pids"]').each(function(i){
    		   pids[i] = $(this).val();
    	})
    	   
    	$('input[name="checks"]').each(function(i){
    		if(this.checked==true){
    			
    			checks[i]=$(this).val();
    		}
    	});
    	$('select[name="mustWorkdays"]').each(function(i){
    		mustWorkdays[i]=$(this).val();
    	});
    	
    	queryBean={
    			pids:pids,
    			checks:checks,
    			mustWorkdays:mustWorkdays
      	  }
          	var url='/workday/save';
              SysUtils.requestByJson(url, queryBean, function (resultInfo) {
                  /*SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                	  SysUtils.swalForTips('提示', '保存成功！', 'info', function () {
                	  });*/
            	  		doSubmit();
                      //$scope.$apply();
                     
             /*     })*/
              });
    }
    
   
 

}]);