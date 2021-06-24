myApp.controller('itemDistributionCtl', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils', '$timeout','$stateParams', function ($rootScope, $scope, ENV, $state, SysUtils, $timeout,$stateParams) {
    console.log("itemDistributionCtl controller=="+$stateParams.parameterName);

    /*************************一、变量定义****************************/

    var myDate = new Date();
    /*isTypes代表是否是行政或者党委*/
    $scope.isTypes=$stateParams.parameterName;
    /*类型，不同类型增删改是不一样的*/
    $scope.editType='goodsManagement';
    $scope.queryBean = {
        status:'DistributionGoods',
        paging: "No",
        goodsApplication:{year:myDate.getFullYear()+"",month:(myDate.getMonth()+1)+""},
        goods:{productTypes:$scope.isTypes}
        /*itemStatus:'NotPurchased'*/
    };
    /*各种函数调用*/
    $scope.fc={};
    $scope.dataObject={
        goodsList:[],
        dicTypeList:[],
        itemStatusDicTypeIdList:[
            {key:'DistributionGoods',val:'待分发'},
            {key:'PendingConfirmation',val:'未申领'},
            {key:'ConfirmedClaim',val:'已确认申领'}
        ],
        currentSelectBean:{},
        submitBean:{},
        submitModel:{},
        addGoods:{
            title:'新增物品采购信息',
            submitName:'增加',
        },
        editGoods:{
            title:'修改物品采购信息',
            submitName:'修改',
        },
        currentSelectStorageBean:{},//当前选中已入库bean
        StorageList:[],//当前选中已入库bean
        goodsInformation:{},//新增商品信息实体bean
        years:["2017","2018","2019","2020","2021","2022","2023","2024","2025","2026","2027","2028","2029","2030"],
        months:["1","2","3","4","5","6","7","8","9","10","11","12"],
        selectStorageAll:false,//当前复选框默认未选中
        currentSelectBeanList:[],

    };

    $rootScope.reNewBtn = $scope.homeListRenewId;
    var childWindowMap = {};//存储已经打开的窗口



    /*************************二、函数定义****************************/

    $scope.queryGoodsList = function () {
        /*每次查询清空选择的bean*/
        $scope.dataObject.currentSelectBean={};
        $scope.dataObject.currentSelectBeanList=[];
        var url='/goodsAG/list';
        /*if($scope.queryBean.status=="Bought"){
            url='/goods/list';
        }*/
        SysUtils.requestByJson(url, $scope.queryBean, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                $scope.dataObject.goodsList = resultInfo.beanList;
                //$scope.paginationConf.totalItems = resultInfo.totalRows;
                $scope.$apply();
            })
        });
    };

    /**
     * 查询已入库的信息
     */
    $scope.queryGoodsStorageList = function () {
        /*每次清空选择的当前入库信息bean*/
        $scope.dataObject.currentSelectStorageBean={};
        var url='/goods/list';
        SysUtils.requestByJson(url, $scope.dataObject.currentQueryStorageBean, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                $scope.dataObject.StorageList = resultInfo.beanList;
                $('#PurchaseModal').modal('show');
                //$scope.paginationConf.totalItems = resultInfo.totalRows;
                $scope.$apply();
            })
        });
    };


    /**
     * 查询物品管理字典
     */
    $scope.querySelDicModesForBusiness = function () {
        SysUtils.requestByJson("/dicMode/findDicMod",{flag:1,dictype:'typItem'}, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                /*获取字典列表*/
                $scope.dataObject.dicTypeList[0] = resultInfo.bean;
                $scope.currentMode = resultInfo.bean;
                $scope.$applyAsync();
                console.log($scope.dataObject.dicTypeList);
            })
        });
    };


    $scope.goodsChecked = function (goods,type) {
        if(type=="reversion"){
            goods.checked=!goods.checked;
        }
        $scope.dataObject.currentSelectBeanList=[];
        var checkAll=true;
        angular.forEach($scope.dataObject.goodsList, function(data){
            if(data.checked){
                $scope.dataObject.currentSelectBeanList.push(data);
            }else {
                checkAll=false;
            }
        });
        $scope.dataObject.selectStorageAll=checkAll;
    }

    $scope.checkAllClk = function () {
        if($scope.dataObject.selectStorageAll){
            $scope.dataObject.currentSelectBeanList=$scope.dataObject.goodsList;
        }else {
            $scope.dataObject.currentSelectBeanList=[];
        }
        angular.forEach($scope.dataObject.goodsList, function(data){
            data.checked=$scope.dataObject.selectStorageAll;
        });
    }





    /**
     * 清空查询参数
     */
    $scope.initParmeByGoods = function () {
        $scope.queryBean.name=null;
        $scope.queryBean.numbering=null;
    };






    $scope.isCheckedAll = function () {
            var ischeckedAll=true;
            angular.forEach($scope.dataObject.goodsList, function(data){
                if(!data.checked){
                    ischeckedAll=false;
                }
            });
        $scope.dataObject.selectStorageAll = ischeckedAll;

    }

    /*$scope.checkAllClk = function () {
        $scope.dataObject.currentSelectBeanList=[];
        angular.forEach($scope.dataObject.goodsList, function(data){
            if($scope.dataObject.selectStorageAll){
                $scope.dataObject.currentSelectBeanList.push(data);
            }
            data.checked=$scope.dataObject.selectStorageAll;
        });

    }*/

    /**
     * 确认分发
     */
    $scope.fc.applicationList = function() {
        if($scope.dataObject.currentSelectBeanList!=null && $scope.dataObject.currentSelectBeanList.length>0){
            SysUtils.requestByJson("/goodsAG/batchDistribution",$scope.dataObject.currentSelectBeanList, function (resultInfo) {
                SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                    swal("提示","分发成功！","success");
                    $scope.searchGoods();
                })
            });
        }else {
            swal("提示","请选择分发列表","info");
        }
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
        //$scope.queryBean.paging = "Yes";
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