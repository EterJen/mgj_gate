myApp.controller('purchaseGoodsCtl', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils', '$timeout','$stateParams', function ($rootScope, $scope, ENV, $state, SysUtils, $timeout,$stateParams) {
    console.log("purchaseGoodsCtl controller=="+$stateParams.parameterName);

    /*************************一、变量定义****************************/

    var myDate = new Date();
    /*isTypes代表是否是行政或者党委*/
    $scope.isTypes=$stateParams.parameterName;
    /*类型，不同类型增删改是不一样的*/
    $scope.editType='goodsManagement';
    $scope.queryBean = {
        flag:1,
        status:'NotPurchased',
        paging: "No",
        year:myDate.getFullYear()+"",
        month:(myDate.getMonth()+1)+"",
        productTypes:$scope.isTypes
        /*itemStatus:'NotPurchased'*/
    };
    /*各种函数调用*/
    $scope.fc={};
    $scope.dataObject={
        goodsList:[],
        dicTypeList:[],
        itemStatusDicTypeIdList:[
            {key:'NotPurchased',val:'未购买'},
            {key:'Bought',val:'已购买入库'}
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
        var url='/goods/listGroupByNameAndDicType';
        if($scope.queryBean.status=="Bought"){
            url='/goods/list';
        }
        SysUtils.requestByJson(url, $scope.queryBean, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                $scope.dataObject.goodsList = resultInfo.beanList;
                $scope.paginationConf.totalItems = resultInfo.totalRows;
                $scope.$apply();
            })
        });
    };

    /**
     * 打印
     */
    $scope.printCount = function () {
        var url='/goods/queryExport';
        var value = JSON.stringify($scope.queryBean);
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
     * 采购入库点击事件
     */
    $scope.purchaseWarehousing = function () {
        if($scope.dataObject.currentSelectBeanList!=null && $scope.dataObject.currentSelectBeanList.length>0){
            //console.log($scope.dataObject.currentSelectBeanList);
            var url='/goods/saveBatchStorage';
            var param={dbParams:{"goods":$scope.queryBean},productTypes:$scope.isTypes,goodsList:$scope.dataObject.currentSelectBeanList};
            SysUtils.requestByJson(url, param, function (resultInfo) {
                SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                    swal("提示",resultInfo.message,resultInfo.resultType);
                    $scope.searchGoods();
                })
            });
            //查询已经入库现有的商品列表
            /*$scope.dataObject.currentQueryStorageBean={
                flag:1,
                paging:'No',
                status:'Warehousing',
                name:$scope.dataObject.currentSelectBean.name,
                productTypes:$scope.isTypes
            };
            $scope.queryGoodsStorageList();*/
        }else {
            swal("提示","请选择需要采购入库的列表!","info");
            return;
        }

    }
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

    /**
     * 新增物品信息，这里是已入库的物品，并且不在未购买和已购买入库里面
     * 采购登记点击事件
     */
    $scope.addGoodsManagement = function () {
        if(SysUtils.notEmpty($scope.dataObject.currentSelectBean,['id'])){
            /*初始化增加商品信息bean*/
            $scope.dataObject.goodsInformation={
                flag:1,
                status:'Warehousing',
                quantity:0, //新增数量默认为0
                productTypes:$scope.isTypes,
                name:$scope.dataObject.currentSelectBean.name,
                specification:$scope.dataObject.currentSelectBean.specification,
                dicTypeId:$scope.dataObject.currentSelectBean.dicTypeId,
                unit:$scope.dataObject.currentSelectBean.unit,
                isApplicationItem:'否',
                isSpecialItem:'否',
            };
            $('#addgoodsModal').modal('show');
            $scope.$applyAsync();
        }else {
            swal("提示","请选择列表!","info");
        }
    }

    /**
     * 保存物品新增信息
     */
    $scope.saveGoodsManagement = function () {
        var url="/goods/create";
        if($('body').hasClass('modal-open')){
            $('#addgoodsModal').modal('hide');
        }
        SysUtils.requestByJsonSync(url, $scope.dataObject.goodsInformation, function (resultInfo) {

            $scope.dataObject.currentSelectStorageBean=resultInfo.bean;
            /*虚拟一个入库信息，只有直接入库才会调用*/
            $scope.dataObject.currentSelectBean = {
                id:0,//为了不被拦截虚拟一个id
                flag:1,
                status:'DirectStorage',
                productTypes:$scope.isTypes,
            };
            $scope.goodsInbound();
        })
    }

    /**
     * 选择物品状态
     */
    $scope.changeItemStatus = function (type) {
        $scope.queryBean.status=type;

        if($scope.queryBean.status=="NotPurchased"){
            $scope.queryBean.paging = "No";
            $scope.queryBean.year=myDate.getFullYear()+"";
            $scope.queryBean.month=(myDate.getMonth()+1)+"";
        }else if($scope.queryBean.status=="Bought"){
            $scope.queryBean.paging = "Yes";
            $scope.queryBean.name=null;
            $scope.queryBean.numbering = null;
        }
        $scope.searchGoods();
    }

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


    /**
     * 清空查询参数
     */
    $scope.initParmeByGoods = function () {
        $scope.queryBean.name=null;
        $scope.queryBean.numbering=null;
    };

    /**
     * 保存或者修改通用方法
     */
    $scope.saveOrUpdate = function () {
        var url="";
        if(SysUtils.notEmpty($scope.dataObject.submitBean,['id'])){
            url="/goods/update";
        }else {
            url="/goods/create";
        }

        SysUtils.requestByJson(url, $scope.dataObject.submitBean, function (resultInfo) {
            swal("提示",resultInfo.message,resultInfo.resultType);
            $('#goodsModal').modal('hide');
            $scope.searchGoods();
        })

    }

    /**
     * 删除通用方法
     */
    $scope.delete = function () {
        var url="";
        if(SysUtils.notEmpty($scope.dataObject.currentSelectBean,['id'])){
            url="/goods/delete/"+$scope.dataObject.currentSelectBean.id;
        }else {
            swal("提示","请选择列表!","info");
            return;
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


    /**
     * 商品入库选择，可多选
     * @param goods
     */
    $scope.goodsChecked = function (goods,type) {
        if(type!='Reverse'){
            if(goods.checked){
                goods.checked=false;
            }else {
                goods.checked=true;
            }
        }

        $scope.dataObject.currentSelectBeanList = $scope.dataObject.currentSelectBeanList.filter(function (value) {
            console.log(goods.initType+"==="+value.initType);
            console.log(goods.initType!=value.initType)
            return goods.initType!=value.initType;
        });
        if(goods.checked){
            $scope.dataObject.currentSelectBeanList.push(goods);
        }
        $scope.isCheckedAll();
    }

    $scope.isCheckedAll = function () {
            var ischeckedAll=true;
            angular.forEach($scope.dataObject.goodsList, function(data){
                if(!data.checked){
                    ischeckedAll=false;
                }
            });
        $scope.dataObject.selectStorageAll = ischeckedAll;

    }

    $scope.checkAllClk = function () {
        $scope.dataObject.currentSelectBeanList=[];
        angular.forEach($scope.dataObject.goodsList, function(data){
            if($scope.dataObject.selectStorageAll){
                $scope.dataObject.currentSelectBeanList.push(data);
            }
            data.checked=$scope.dataObject.selectStorageAll;
        });
        /*if($scope.dataObject.selectStorageAll){
            $scope.dataObject.currentSelectBeanList.push();
        }*/
    }

    /**
     * 已入库商品选择
     * @param goods
     */
    $scope.goodsStorageChecked = function (goods) {
        angular.forEach($scope.dataObject.StorageList, function(data){
            if(data.id==goods.id){
                data.checked=true;
                /*选中后赋值给currentSelectBean*/
                $scope.dataObject.currentSelectStorageBean=data;
            }else {
                data.checked=false;
            }
        });

    }

    /**
     * 所选的商品入库处理
     */
    $scope.goodsInbound = function () {
        if(SysUtils.notEmpty($scope.dataObject.currentSelectStorageBean,['id'])){
            $('#PurchaseModal').modal('hide');
            $('#inboundModal').modal('show');
            //根据所选已入库的商品同步当前已选中的采购商品
            $scope.dataObject.currentSelectBean.name=$scope.dataObject.currentSelectStorageBean.name;
            $scope.dataObject.currentSelectBean.specification=$scope.dataObject.currentSelectStorageBean.specification;
            $scope.dataObject.currentSelectBean.dicTypeId=$scope.dataObject.currentSelectStorageBean.dicTypeId;
            $scope.dataObject.currentSelectBean.dicTypeName=$scope.dataObject.currentSelectStorageBean.dicTypeName;
            $scope.dataObject.currentSelectBean.unit=$scope.dataObject.currentSelectStorageBean.unit;
            $scope.dataObject.currentSelectBean.unitPrice=$scope.dataObject.currentSelectStorageBean.unitPrice;
            $scope.dataObject.currentSelectBean.entityId=$scope.dataObject.currentSelectStorageBean.id;
            $scope.$applyAsync();
        }else {
            swal("提示","请选择列表!","info");
            return;
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

    $scope.addGoods = function (action) {
        console.log(action);
        if(action=='add'){
            $scope.dataObject.submitBean={
                flag:1,
                status:'NotPurchased',
                /*itemStatus:'NotPurchased',*/
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
        $('#goodsModal').modal('show');
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