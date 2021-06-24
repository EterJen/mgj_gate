myApp.controller('itemManagementCtl', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils', '$timeout','$stateParams','$filter', function ($rootScope, $scope, ENV, $state, SysUtils, $timeout,$stateParams,$filter) {
    console.log("itemManagementCtl controller=="+$stateParams.parameterName);

    /*************************一、变量定义****************************/
    $scope.formTempPath = "apps/officeSupplies/itemManagement/";
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

    };

    $rootScope.reNewBtn = $scope.homeListRenewId;
    var childWindowMap = {};//存储已经打开的窗口



    /*************************二、函数定义****************************/

    $scope.queryGoodsList = function () {
        /*每次查询清空选择的bean*/
        $scope.dataObject.currentSelectStorageBean={};
        var url='/goods/list';
        if($scope.editType=="itemApproval"){
            url='/goodsApplication/queryDepartOrSelfList';
        }
        SysUtils.requestByJson(url, $scope.queryBean, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                $scope.dataObject.goodsList = resultInfo.beanList;
                //console.log($scope.doneList);

                $scope.paginationConf.totalItems = resultInfo.totalRows;
                $scope.$apply();
            })
        });
    };

    $scope.querySelDicModesForBusiness = function () {
        SysUtils.requestByJson("/dicMode/findDicMod",{flag:1,dictype:'typItem'}, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                /*获取字典列表*/
                $scope.dataObject.dicTypeList[0] = resultInfo.bean;
                $scope.currentMode = resultInfo.bean;
                console.log($scope.dataObject.dicTypeList);
                $scope.$applyAsync();
            })
        });
    };

    $scope.queryAllDepart = function () {
        SysUtils.requestByJson("/coreDepartment/list",{flag:1,paging:'No'}, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                $scope.dataObject.departList=resultInfo.beanList;

            })
        });
    };

    /*点击字典菜单查询*/
    $scope.toModeContent = function (e,dicType) {
        //点击数菜单变更背景颜色
        $(".angular-ui-tree-handle").removeClass("active");
        $(e.currentTarget).addClass("active");
        if(SysUtils.isEmpty(dicType)){
            /*查询物品管理*/
            $scope.queryBean.dicTypeId=null;
        } else {
            /*查询分类*/
            $scope.queryBean.dicTypeId=dicType.id;
        }
        $scope.initParmeByGoods();
        $scope.searchGoods();
    }

    $scope.storage= function () {
        if(SysUtils.notEmpty($scope.dataObject.currentSelectStorageBean,['id'])){
            //根据所选已入库的商品同步当前已选中的采购商品
            $scope.dataObject.currentSelectBean.name=$scope.dataObject.currentSelectStorageBean.name;
            $scope.dataObject.currentSelectBean.specification=$scope.dataObject.currentSelectStorageBean.specification;
            $scope.dataObject.currentSelectBean.dicTypeId=$scope.dataObject.currentSelectStorageBean.dicTypeId;
            $scope.dataObject.currentSelectBean.dicTypeName=$scope.dataObject.currentSelectStorageBean.dicTypeName;
            $scope.dataObject.currentSelectBean.unit=$scope.dataObject.currentSelectStorageBean.unit;
            $scope.dataObject.currentSelectBean.unitPrice=$scope.dataObject.currentSelectStorageBean.unitPrice;
            $scope.dataObject.currentSelectBean.entityId=$scope.dataObject.currentSelectStorageBean.id;
            $('#inboundModal').modal('show');
        }else {
            swal("提示","请选择物品列表!","info");
        }

    }


    $scope.saveStorage = function () {
        var url='/goods/saveStorage';
        SysUtils.requestByJson(url, $scope.dataObject.currentSelectBean, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                $('#inboundModal').modal('hide');
                $scope.searchGoods();
            })
        });
    }

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
                $scope.dataObject.currentSelectBean = {
                    id:0,//为了不被拦截虚拟一个id
                    flag:1,
                    status:'DirectStorage',
                    productTypes:$scope.isTypes,
                };
                $scope.dataObject.currentSelectStorageBean={};
                $scope.queryBean = {
                    flag:1,
                    status:'Warehousing',
                    productTypes:$scope.isTypes
                };
                break;
            case 'itemApproval':
                var myDate = new Date();
                $scope.queryBean = {
                    flag:1,
                    status:'DirectorApproved',
                    productTypes:$scope.isTypes,
                    isLeader:'0',
                    year:myDate.getFullYear()+"",
                    month:(myDate.getMonth()+1)+"",
                };
                //初始化查询日期

                break;
            default:
                swal("提示","找不到商品或者分类模块!","info");
            //n 与 case 1 和 case 2 不同时执行的代码
        }
        $scope.dataObject.formPath=$scope.formTempPath+$scope.editType+'.html';
        $scope.searchGoods();
        /*SysUtils.requestByJson(url, $scope.dataObject.submitBean, function (resultInfo) {
            swal("提示",resultInfo.message,resultInfo.resultType);
            $('#'+$scope.editType+'Modal').modal('hide');
            $scope.searchGoods();
        })*/

    }


    $scope.applicationClk = function(goods){
        $scope.dataObject.currentSelectApplicationBean=goods;
        angular.forEach($scope.dataObject.currentSelectApplicationBean.goodsList, function (item) {
            if(SysUtils.notEmpty(item.initType,[])){
                item.checked=true;
            }
        });
        $('#confirmationApplicationModal').modal('show');
    }


    $scope.currentSelectAppcheck = function () {
        var check=true;
        angular.forEach($scope.dataObject.currentSelectApplicationBean.goodsList, function(data){
            if(!data.checked){
                check=false;
            }
        });
        if(check){
            $scope.dataObject.currentSelectApplicationBean.checkedAll=true;
        }else {
            $scope.dataObject.currentSelectApplicationBean.checkedAll=false;
        }
    }

    $scope.currentSelectAppAll = function () {
        angular.forEach($scope.dataObject.currentSelectApplicationBean.goodsList, function(data){
            data.checked=$scope.dataObject.currentSelectApplicationBean.checkedAll;
        });
    }

    $scope.currentSelectAppTr = function (goods) {
        if(goods.checked){
            goods.checked=false;
        }else{
            goods.checked=true;
        }
        $scope.currentSelectAppcheck();
    }

    $scope.currentSelectAppInputcheck = function (goods) {
        goods.checked=true;
        $scope.currentSelectAppcheck();
    }

    /**
     * 点击申请通过按钮事件
     */
    $scope.passedApplication = function () {
        var url='';
        //判单是否有选中
        if(SysUtils.notEmpty($scope.dataObject.currentSelectApplicationBean,['id'])){
            if($scope.dataObject.currentSelectApplicationBean.checkedAll){
                $scope.dataObject.currentSelectApplicationBean.status='Review';//通过
                angular.forEach($scope.dataObject.currentSelectApplicationBean.goodsList, function(data){
                    data.applicationStatus='Review';
                });
            }else {
                $scope.dataObject.currentSelectApplicationBean.status='PartiallyPassed';//部分通过
                var goodsList=$filter('filter')($scope.dataObject.currentSelectApplicationBean.goodsList, { checked: 'true'});
                if(goodsList==null || goodsList.length==0){
                    swal("提示","请选择需要通过的列表!","info");
                    return;
                }
                angular.forEach($scope.dataObject.currentSelectApplicationBean.goodsList, function(data){
                    if(data.checked){
                        data.applicationStatus='Review';
                    }
                });
            }
            url="/goodsApplication/passedApplication";
        }else {
            swal("提示","请选择列表!","info");
            return;
        }
        SysUtils.requestByJson(url,$scope.dataObject.currentSelectApplicationBean, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                $('#confirmationApplicationModal').modal('hide');
                swal("提示",resultInfo.message,"info");
                $scope.searchGoods();
            })
        });
    }



    $scope.goodsChecked = function (goods) {
        angular.forEach($scope.dataObject.goodsList, function(data){
            if(data.id==goods.id){
                data.checked=true;
                /*选中后赋值给currentSelectBean*/
                $scope.dataObject.currentSelectStorageBean=data;
            }else {
                data.checked=false;
            }
        });

    }
    /*$scope.queryByPageNumber = function () {
        //如果当前是第一页，则不需要处理
        if($scope.paginationConf.currentPage==1){

        }
    }*/

    /**
     * 搜索商品
     */
    $scope.searchGoods = function () {
        $scope.initPaging();
        $scope.pageAuto();
    }


    /**
     * 点击分类维护或者返回按钮事件
     */
    /*$scope.fc.flwhClassification = function (type) {
        $scope.editType=type;
        $scope.dataObject.formPath=$scope.formTempPath+$scope.editType+'.html';
        switch($scope.editType)
        {
            case 'goods':
                $scope.queryBean = {
                    flag:1,
                    status:'Warehousing',
                    productTypes:$scope.isTypes
                };
                $scope.dataObject.isFlwh= true;
                break;
            case 'itemApproval':
                $scope.queryBean = {
                    flag:1,
                    initType:$scope.isTypes
                };
                $scope.dataObject.isFlwh= false;
                break;
            default:
                swal("提示","找不到商品或者分类模块!","info");
            //n 与 case 1 和 case 2 不同时执行的代码
        }
        $scope.searchGoods();

    }*/

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

    /*$scope.addGoods = function (action) {
        switch($scope.editType)
        {
            case 'goods':
                if(action=='add'){
                    $scope.dataObject.submitBean={
                        flag:1,
                        status:'Warehousing',
                        productTypes:$scope.isTypes
                    };
                    $scope.dataObject.submitModel=$scope.dataObject.addGoods;
                }else if(action=='edit'){
                    if(SysUtils.notEmpty($scope.dataObject.currentSelectBean,['id'])){
                        $scope.dataObject.submitBean=$scope.dataObject.currentSelectBean;
                    }else {
                        swal("提示","请选择需要修改的列表!","info");
                        return;
                    }
                    $scope.dataObject.submitModel=$scope.dataObject.editGoods;
                }
                $('#'+$scope.editType+'Modal').modal('show');
                break;
            case 'classification':
                if(action=='add'){
                    $scope.dataObject.submitBean={
                        flag:1,
                    };
                    $scope.dataObject.submitModel=$scope.dataObject.addClassification;
                }else if(action=='edit'){
                    if(SysUtils.notEmpty($scope.dataObject.currentSelectBean,['id'])){
                        $scope.dataObject.submitBean=$scope.dataObject.currentSelectBean;
                    }else {
                        swal("提示","请选择需要修改的列表!","info");
                        return;
                    }
                    $scope.dataObject.submitModel=$scope.dataObject.editClassification;
                }
                $('#'+$scope.editType+'Modal').modal('show');
                break;
            default:
                //n 与 case 1 和 case 2 不同时执行的代码
        }

    }*/


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
    $scope.querySelDicModesForBusiness();
    $scope.queryAllDepart();

    $timeout(function () {
        $('.content-wrapper').css('height', SysUtils.get_content_wrapper());
        $('#panel-body-table').css('height', $('.content').height() - $('#panel-heading').outerHeight(true));
        //console.log($('.content').height()+"=="+$('#panel-heading').outerHeight(true)+"==="+$('#ceter_p').height());
        $('.table_shadow').css('max-height', $('.content').height() - $('#panel-heading').outerHeight(true) - $('#ceter_p').outerHeight());
    });


}]);