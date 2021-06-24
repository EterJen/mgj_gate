myApp.controller('categoryMaintenanceCtrl', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils', '$timeout','$stateParams', function ($rootScope, $scope, ENV, $state, SysUtils, $timeout,$stateParams) {
    console.log("categoryMaintenanceCtrl controller=="+$stateParams.parameterName);

    /*************************一、变量定义****************************/
    $scope.formTempPath = "apps/officeSupplies/categoryMaintenance/";
    /*isTypes代表是否是行政或者党委*/
    $scope.isTypes=$stateParams.parameterName;
    /*类型，不同类型增删改是不一样的*/
    $scope.editType='goods';
    $scope.queryBean = {
        flag:1,
        status:'Warehousing',
        productTypes:$scope.isTypes
    };
    /*各种函数调用*/
    $scope.fc={};
    $scope.dataObject={
        isFlwh:true,/*默认是展示分类维护按钮*/
        isFlwhTitle:'物品信息管理',
        formPath:$scope.formTempPath+$scope.editType+'.html',
        goodsList:[],
        dicTypeList:[],
        currentSelectBean:{},
        submitBean:{},
        submitModel:{},
        addGoods:{
            title:'新增物品信息',
            submitName:'增加',
        },
        editGoods:{
            title:'修改物品信息',
            submitName:'修改',
        },
        addClassification:{
            title:'新增分类',
            submitName:'增加',
        },
        editClassification:{
            title:'修改分类',
            submitName:'修改',
        },
    };

    $rootScope.reNewBtn = $scope.homeListRenewId;
    var childWindowMap = {};//存储已经打开的窗口



    /*************************二、函数定义****************************/
    if (!SysUtils.notEmpty($rootScope.currentUser, ['username'])) {
        SysUtils.silenceWithAuthAjax("/coreUser/currentUser", {}, function (resultInfo) {
            $rootScope.currentUser = resultInfo.bean;
            $scope.$applyAsync();
        });
    }

    $scope.queryGoodsList = function () {
        /*每次查询清空选择的bean*/
        $scope.dataObject.currentSelectBean={};
        var url='/goods/list';
        if($scope.editType=="classification"){
            url='/dicType/queryByModeDicTypeList';
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
        SysUtils.requestByJson("/dicType/queryByModeDicTypeList",{flag:1,initType:'typItem',paging:'No'}, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                /*获取字典列表*/
                $scope.dataObject.dicTypeList = resultInfo.beanList;
                console.log($scope.dataObject.dicTypeList);
            })
        });
    };

    /**
     * 保存或者修改通用方法
     */
    $scope.saveOrUpdate = function () {
        var url="";
        var model='#'+$scope.editType+'Modal';
        switch($scope.editType)
        {
            case 'goods':
                if(SysUtils.notEmpty($scope.dataObject.submitBean,['id'])){
                    url="/goods/update";
                    model='#'+$scope.editType+'editModal';
                }else {
                    url="/goods/create";
                    model='#'+$scope.editType+'addModal';
                }
                break;
            case 'classification':
                if(SysUtils.notEmpty($scope.dataObject.submitBean,['id'])){
                    url="/dicType/update";
                }else {
                    url="/dicType/createTypItem";
                }
                break;
            default:
                swal("提示","找不到商品或者分类模块!","info");
            //n 与 case 1 和 case 2 不同时执行的代码
        }
        SysUtils.requestByJson(url, $scope.dataObject.submitBean, function (resultInfo) {
            swal("提示",resultInfo.message,resultInfo.resultType);
            $(model).modal('hide');
            $scope.searchGoods();
        })

    }

    /**
     * 删除通用方法
     */
    $scope.delete = function () {
        var url="";
        switch($scope.editType)
        {
            case 'goods':
                if(SysUtils.notEmpty($scope.dataObject.currentSelectBean,['id'])){
                    url="/goods/delete/"+$scope.dataObject.currentSelectBean.id;
                }else {
                   swal("提示","请选择列表!","info");
                   return;
                }
                break;
            case 'classification':
                if(SysUtils.notEmpty($scope.dataObject.currentSelectBean,['id'])){
                    url="/dicType/delete/"+$scope.dataObject.currentSelectBean.id;
                }else {
                    swal("提示","请选择列表!","info");
                    return;
                }
                break;
            default:
                swal("提示","找不到商品或者分类模块!","info");
            //n 与 case 1 和 case 2 不同时执行的代码
        }
        SysUtils.swalConfirmNotClose("提示", "是否确认删除！", "info", function (isConfirm) {
            if (isConfirm) {
                //swal.close();
                SysUtils.requestByJson(url, {}, function (resultInfo) {
                    swal("提示",resultInfo.message,resultInfo.resultType);
                    $scope.searchGoods();
                })
            } else {
                swal.close();
            }
        });
    }


    $scope.goodsChecked = function (goods) {
        angular.forEach($scope.dataObject.goodsList, function(data){
            if(data.id==goods.id){
                data.checked=true;
                /*选中后赋值给currentSelectBean*/
                $scope.dataObject.currentSelectBean=data;
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
    $scope.fc.flwhClassification = function (type) {
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
            case 'classification':
                $scope.queryBean = {
                    flag:1,
                    initType:'typItem'
                };
                $scope.dataObject.isFlwh= false;
                break;
            default:
                swal("提示","找不到商品或者分类模块!","info");
            //n 与 case 1 和 case 2 不同时执行的代码
        }
        $scope.searchGoods();

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

    $scope.addGoods = function (action) {
        switch($scope.editType)
        {
            case 'goods':
                if(action=='add'){
                    $scope.dataObject.submitBean={
                        flag:1,
                        status:'Warehousing',
                        quantity:0, //新增数量默认为0
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
                $('#'+$scope.editType+action+'Modal').modal('show');
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

    }


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


    $timeout(function () {
        $('.content-wrapper').css('height', SysUtils.get_content_wrapper());
        $('#panel-body-table').css('height', $('.content').height() - $('#panel-heading').outerHeight(true));
        //console.log($('.content').height()+"=="+$('#panel-heading').outerHeight(true)+"==="+$('#ceter_p').height());
        $('.table_shadow').css('max-height', $('.content').height() - $('#panel-heading').outerHeight(true) - $('#ceter_p').outerHeight());
    });


}]);