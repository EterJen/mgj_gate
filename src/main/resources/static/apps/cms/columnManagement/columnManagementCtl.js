myApp.controller('columnManagementCtl', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils', '$timeout','$stateParams', function ($rootScope, $scope, ENV, $state, SysUtils, $timeout,$stateParams) {
    console.log("columnManagementCtl controller=="+$stateParams.parameterName);

    /*************************一、变量定义****************************/

    var myDate = new Date();
    /*isTypes代表是否是行政或者党委*/
    $scope.isTypes=$stateParams.parameterName;
    /*类型，不同类型增删改是不一样的*/
    $scope.editType='goodsManagement';
    $scope.queryBean = {
        isdelete:0,
        paging: "Yes"
    };
    /*各种函数调用*/
    $scope.fc={};
    $scope.dataObject={
        goodsList:[],
        dicTypeList:[],
        currentSelectBean:{},
        submitBean:{},
        submitModel:{},


    };

    var childWindowMap = {};//存储已经打开的窗口



    /*************************二、函数定义****************************/

    /*$scope.queryGoodsList = function () {
        var url='/twolevelcolumn/list';
        SysUtils.requestByJson(url, $scope.queryBean, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                $scope.dataObject.goodsList = resultInfo.beanList;
                //$scope.paginationConf.totalItems = resultInfo.totalRows;
                $scope.$apply();
            })
        });
    };*/



    /**
     * 查询栏目列表
     */
    $scope.querySelDicModesForBusiness = function (callBack) {
        SysUtils.requestByJson("/twolevelcolumn/findColumns",{isdelete:0,paging:'No'}, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                /*获取字典列表*/
                $scope.dataObject.dicTypeList = resultInfo.beanList;
                $scope.dataObject.oneColumn=resultInfo.additionalInfo.beanList;
                $scope.$applyAsync();
                if (!SysUtils.isEmpty(callBack)) {
                    callBack();
                }
                //console.log($scope.dataObject.dicTypeList);
            })
        });
    };


    /**
     * 树形菜单选中
     * @param target
     * @param bean
     */
    $scope.toModeContent = function (target,bean) {
        //选择树形菜单
        $(".angular-ui-tree-handle").removeClass("active");

        $scope.dataObject.submitBean= angular.copy(bean);
        if (SysUtils.isEmpty($scope.dataObject.submitBean.pictureArticle)) {
            $scope.dataObject.submitBean.pictureArticle="false";
        }

        console.log(bean);
        $timeout(function () {
            if (SysUtils.isEmpty(target)) {
                $("#dp_"+bean.id).addClass("active");
            }else {
                $(target.currentTarget).addClass("active");
            }
        },100);
        $scope.$applyAsync();

    }



    /**
     * 删除通用方法
     */
    $scope.deleteBean = function () {
        var url="";
        if(SysUtils.notEmpty($scope.dataObject.submitBean,['id'])){
            url="/twolevelcolumn/delete/"+$scope.dataObject.submitBean.id;
        }else {
            swal("提示","请选择删除栏目!","info");
            return;
        }
        SysUtils.swalConfirmNotClose("提示", "是否确认删除！", "info", function (isConfirm) {
            if (isConfirm) {
                //swal.close();
                SysUtils.requestByJson(url, {}, function (resultInfo) {
                    swal("提示",resultInfo.message,resultInfo.resultType);
                    $scope.querySelDicModesForBusiness(function () {
                        if ($scope.dataObject.dicTypeList != null && $scope.dataObject.dicTypeList.length > 0) {
                            $scope.toModeContent(null,$scope.dataObject.dicTypeList[0]);
                        }
                    });
                })
            } else {
                swal.close();
            }
        });
    }


    /**
     * 栏目保存
     */
    $scope.saveBean = function () {
        if ($scope.dataObject.submitBean.id == $scope.dataObject.submitBean.parentlev) {
            swal("提示","不能选择自己为父栏目！","info");
            return;
        }
        //console.log($scope.dataObject.submitBean);
        var url='/twolevelcolumn/update';
        SysUtils.requestByJson(url, $scope.dataObject.submitBean, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                $scope.querySelDicModesForBusiness(function () {
                    $scope.toModeContent(null,$scope.dataObject.submitBean);
                });
            })
        });
    }

    /**
     * 新增栏目
     */
    $scope.addBean = function () {
        var url='/twolevelcolumn/create';
        $scope.dataObject.submitBean.id=null;

        SysUtils.requestByJson(url, $scope.dataObject.submitBean, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                $scope.querySelDicModesForBusiness();

                //$("#dp_"+resultInfo.beanId).addClass("active");

                $scope.toModeContent(null,resultInfo.bean);
                /*$timeout(function () {
                    $("#dp_"+resultInfo.beanId).addClass("active");
                },500);*/
            })
        });
    }

    /**
     * 搜索商品
     */
    $scope.searchGoods = function () {
        $scope.initPaging();
        $scope.pageAuto();
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






    /*$scope.pageAuto = function () {
        $scope.queryBean.pageNo = $scope.paginationConf.currentPage;
        $scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
        $scope.queryGoodsList();
        $scope.$applyAsync();
    };*/



    //$scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.pageAuto);




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