myApp.controller('itemStatisticsCtl', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils', '$timeout','$stateParams','$filter', function ($rootScope, $scope, ENV, $state, SysUtils, $timeout,$stateParams,$filter) {
    console.log("itemStatisticsCtl controller=="+$stateParams.parameterName);

    /*************************一、变量定义****************************/
    $scope.formTempPath = "apps/officeSupplies/itemStatistics/";
    /*isTypes代表是否是行政或者党委*/
    $scope.isTypes=$stateParams.parameterName;
    /*类型，不同类型增删改是不一样的*/
    $scope.editType='goodsManagement';
    $scope.queryBean = {
        flag:1,
        status:'Warehousing',
        productTypes:$scope.isTypes
    };
    /*各种函数调用*/
    $scope.fc={};
    $scope.dataObject={
        formPath:$scope.formTempPath+$scope.editType+'.html',
        goodsList:[],
        dicTypeList:[],
        currentSelectBean:{},
        submitBean:{},
        submitModel:{},
        years:["2017","2018","2019","2020","2021","2022","2023","2024","2025","2026","2027","2028","2029","2030"],
        months:["1","2","3","4","5","6","7","8","9","10","11","12"],
        total:0,
        departmentList:[],
    };

    $rootScope.reNewBtn = $scope.homeListRenewId;
    var childWindowMap = {};//存储已经打开的窗口



    /*************************二、函数定义****************************/

    $scope.queryGoodsList = function () {
        /*每次查询清空选择的bean*/
        $scope.dataObject.currentSelectStorageBean={};
        var url='/goods/list';
        if($scope.editType=="inboundStatistics"){
            url='/goods/inboundStatistics';
        }
        SysUtils.requestByJson(url, $scope.queryBean, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                $scope.dataObject.goodsList = resultInfo.beanList;
                //console.log($scope.doneList);
                if($scope.editType=="inboundStatistics"){
                    $scope.dataObject.total = resultInfo.additionalInfo.total;
                }
                $scope.paginationConf.totalItems = resultInfo.totalRows;
                $scope.$apply();
            })
        });
    };


    /**
     * 清空查询参数
     */
    $scope.initParmeByGoods = function () {
        $scope.queryBean.name=null;
        $scope.queryBean.numbering=null;
    };

    /**
     * 保存或者修改通用方法$scope.editType='goodsManagement';
     */
    $scope.cutoverTable = function (type) {
        $scope.editType=type;
        var url="";
        switch($scope.editType)
        {
            case 'goodsManagement':
                $scope.queryBean = {
                    flag:1,
                    status:'Warehousing',
                    productTypes:$scope.isTypes
                };
                break;
            case 'inboundStatistics':
                var myDate = new Date();
                $scope.queryBean = {
                    flag:1,
                    status:'Bought',
                    productTypes:$scope.isTypes
                };
                //初始化查询日期

                break;
            case 'claimStatistics':
                /*var myDate = new Date();
                var thisyear = myDate.getYear();
                var thismonth = myDate.getMonth()+1;*/
                var Nowdate=new Date();
                var MonthFirstDay=new Date(Nowdate.getFullYear(),Nowdate.getMonth(),1);
                $scope.queryBean = {
                    flag:1,
                    status:'Bought',
                    productTypes:$scope.isTypes,
                    createTimeStart:$filter('date')(MonthFirstDay, "yyyy-MM-dd 00:00:00") ,
                    createTimeEnd:$filter('date')(Nowdate, "yyyy-MM-dd 23:59:59")
                };
                break;
            default:
                swal("提示","找不到商品或者分类模块!","info");
            //n 与 case 1 和 case 2 不同时执行的代码
        }
        $scope.dataObject.formPath=$scope.formTempPath+$scope.editType+'.html';
        if(type=="claimStatistics"){
            $scope.claimStatisticsCount();
        }else {
            $scope.searchGoods();
        }
    }

    $scope.claimStatisticsCount=function () {
        SysUtils.requestByJson('/goods/claimStatistics', $scope.queryBean, function (resultInfo) {
            if(SysUtils.notEmpty(resultInfo.additionalInfo,['departList'])){
                $scope.dataObject.departmentList=resultInfo.additionalInfo.departList;
                $scope.dataObject.goodsList=resultInfo.beanList;
                $scope.$applyAsync($scope.dataObject.departmentList);
            }else{
                $scope.dataObject.departmentList=[];
                $scope.dataObject.goodsList=[];
                $scope.$applyAsync($scope.dataObject.departmentList);
            }
            //console.log($scope.dataObject.departmentList);
        })
    }


    /**
     * 打印
     */
    $scope.printCount = function (type) {
        var url='/goods/queryExport';
        if(type=="claimingStatistics"){
            url='/goods/claimingStatistics';
        }
        var param= $scope.queryBean;
        param.status=type;
        var value = JSON.stringify(param);
        var form = $("<form>");   //定义一个form表单
        form.attr('style', 'display:none');   //在form表单中添加查询参数
        form.attr('target', '');
        form.attr('method', 'post');
        form.attr('action', url);
        var input1 = $('<input>');
        input1.attr('type', 'hidden');
        input1.attr('name', 'selectedBean');
        input1.attr('value', value);
        $('body').append(form);  //将表单放置在web中
        form.append(input1);   //将查询参数控件提交到表单上
        form.submit();
    }













    /**
     * 搜索商品
     */
    $scope.searchGoods = function () {
        $scope.initPaging();
        $scope.pageAuto();
    }




    $scope.closeCreateDialog = function () {
        $('#createProInstDialog').modal('hide');
    }






    //<editor-fold desc="分页配置">
    $scope.paginationConf = {
        currentPage: 1,
        totalItems: -1,
        itemsPerPage: 10,
        pagesLength: 13,
        perPageOptions: [10, 20, 30, 40, 50],
        onChange: function () {
        }
    };

    $scope.initPaging = function () {
        $scope.paginationConf.currentPage = 1;
        $scope.paginationConf.totalItems = -1;
        $scope.paginationConf.itemsPerPage = 10;

        $scope.$applyAsync();
    };






    $scope.pageAuto = function () {
        //$scope.queryBean = {};
        $scope.queryBean.paging = "Yes";
        $scope.queryBean.pageNo = $scope.paginationConf.currentPage;
        $scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
        $scope.queryGoodsList();
        $scope.$applyAsync();
    };




    $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.pageAuto);
    //</editor-fold>

    $scope.showDetail = function (modal) {
        $scope.proInst.pageNo = 1;
        $scope.proInst.pageSize = $scope.paginationConf.itemsPerPage;
        $('#' + modal).modal('show');
    }

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
    //$scope.querySelDicModesForBusiness();


    $timeout(function () {
        $('.content-wrapper').css('height', SysUtils.get_content_wrapper());
        $('#panel-body-table').css('height', $('.content').height() - $('#panel-heading').outerHeight(true));
        //console.log($('.content').height()+"=="+$('#panel-heading').outerHeight(true)+"==="+$('#ceter_p').height());
        $('.table_shadow').css('max-height', $('.content').height() - $('#panel-heading').outerHeight(true) - $('#ceter_p').outerHeight());
    });


}]);