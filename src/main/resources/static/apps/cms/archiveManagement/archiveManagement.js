myApp.controller('archiveManagementCtl', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils', '$timeout','$stateParams','dataFactory', function ($rootScope, $scope, ENV, $state, SysUtils, $timeout,$stateParams,dataFactory) {
    console.log("archiveManagementCtl controller==");

    /*************************一、变量定义****************************/

    $scope.queryBean = {
        /*isdelete:0,*/
        paging: "Yes"
    };
    /*各种函数调用*/
    $scope.fc={};
    $scope.newBean={};
    $scope.dataObject={
        linktypeList:[{name:"C/S"},{name:"B/S"}]

    };

    /*************************二、函数定义****************************/

    /**
     * 初始化查查询
     */
    $scope.queryBeanList = function () {
        var url='/engine/list';
        SysUtils.requestByJson(url, $scope.queryBean, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                $scope.dataObject.beanList = resultInfo.beanList;
                $scope.paginationConf.totalItems = resultInfo.totalRows;
                $scope.$apply();
            })
        });
    };

    /**
     * 库查询
     */
    $scope.queryLiberyBeanList = function () {
        var url='/expertstype/list';
        var a = {
            isdelete:0,
            paging: "No"
        };
        SysUtils.requestByJson(url, a, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                $scope.dataObject.liberyBeanList = resultInfo.beanList;
                /*$scope.$apply();*/
            })
        });
    };

    /**
     * 专家查询
     */
    $scope.queryExpertBeanList = function () {
        var url='/experts/list';
        var a = {
            paging: "No"
        };
        SysUtils.requestByJson(url, a, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                $scope.dataObject.expertBeanList = resultInfo.beanList;
                /*$scope.$apply();*/
            })
        });
    };

    /**
     * 选择添加专家
     * @param expert
     */
    $scope.fc.addExpertList = function (expert) {
        if (SysUtils.isEmpty($scope.newBean.expertsMap[$scope.dataObject.currentExpertype])) {
            $scope.newBean.expertsMap[$scope.dataObject.currentExpertype]=[];
        }
        $scope.newBean.expertsMap[$scope.dataObject.currentExpertype].push(expert);
        $('#documentExpertModal').modal('hide');
    }

    /**
     * 添加专家按钮事件
     * @param expertype
     */
    $scope.fc.addExpert = function (expertype) {
        $scope.dataObject.currentExpertype=expertype.typename;
        //$scope.dataObject.expertCopyBeanList = angular.copy($scope.dataObject.expertBeanList);
        $scope.dataObject.newSerchName="";
        $scope.fc.searchExpert();
        $('#documentExpertModal').modal('show');
    }

    /**
     * 删除专家
     * @param expert
     * @param typename
     */
    $scope.fc.deleteExpert = function (expert,typename) {
        $scope.newBean.expertsMap[typename].remove(expert);
    }

    /**
     * 专家添加搜索查询
     */
    $scope.fc.searchExpert = function () {
        $scope.dataObject.expertCopyBeanList=$scope.dataObject.expertBeanList.filter(function (value) {
            var flag=true;
            if (SysUtils.notEmpty($scope.newBean.expertsMap[$scope.dataObject.currentExpertype],[])) {
                $scope.newBean.expertsMap[$scope.dataObject.currentExpertype].forEach(function (v) {
                    if(v.displayname==value.displayname){
                        flag=false;
                    }
                });
            }
            return value.displayname.indexOf($scope.dataObject.newSerchName)!=-1 && flag;
        })
    }

    /**
     * 新增资源管理
     * @param modl
     */
    $scope.fc.addBean = function (modal) {
        $scope.newBean={expertsMap:{}};
        $scope.fc.headPortrait = {};
        /*var obj = document.getElementById('fujian') ;
        obj.outerHTML=obj.outerHTML;*/
        if (!SysUtils.isEmpty(modal)) {
            $('#'+modal).modal('show');
        }
    }

    /**
     * 资源管理保存
     * @param modal
     */
    $scope.fc.saveBean = function (modal) {
        if(SysUtils.notEmpty($scope.newBean,['id'])){
            url="/engine/update";
        }else{
            url="/engine/create";
        }
        SysUtils.requestByJson(url, $scope.newBean, function (resultInfo) {
            swal("提示",resultInfo.message,resultInfo.resultType);
            if (!SysUtils.isEmpty(modal)) {
                $('#'+modal).modal('hide');
            }
            $scope.searchGoods();
        })
    }

    /**
     * 单项删除
     * @param bean
     */
    $scope.fc.deletBean = function (bean) {
        SysUtils.swalConfirm("提示",  "是否确定删除？", "info", function (isConfirm) {
            if (isConfirm) {
                SysUtils.requestByJson("/engine/delete/"+bean.id,{}, function (resultInfo) {
                    SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                        swal("提示",resultInfo.message,"info");
                        $scope.searchGoods();
                    })
                });
            }
        });
    }

    /**
     * 批量删除
     */
    $scope.fc.batchDelete = function () {
        if(!SysUtils.isEmpty($scope.dataObject.currentSelectBeanList)&&$scope.dataObject.currentSelectBeanList.length>0){
            SysUtils.swalConfirm("提示",  "是否确定批量删除？", "info", function (isConfirm) {
                if (isConfirm) {
                    //param.ids=$scope.dataObject.ids;
                    var param={ids:[]};
                    $scope.dataObject.currentSelectBeanList.forEach(function (value) {
                        param.ids.push(value.id);
                    });
                    SysUtils.requestByJson("/engine/batchDelete",param, function (resultInfo) {
                        SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                            swal("提示",resultInfo.message,"info");
                            $scope.searchGoods();
                        })
                    });
                }
            });
        }else{
            swal("请选择要删除的项","","info");
        }
    }

    Array.prototype.remove = function (val) {
        var index = this.indexOf(val);
        if (index > -1) {
            this.splice(index, 1);
        }
    };

    $scope.editBean = function (bean,modal) {
        $scope.newBean=angular.copy(bean);
        $scope.fc.headPortrait = {};
        if (!SysUtils.isEmpty(modal)) {
            $('#'+modal).modal('show');
        }
        $scope.$applyAsync();
    }

    $scope.goodsChecked = function (goods,type) {
        if(type=="reversion"){
            goods.checked=!goods.checked;
        }
        $scope.dataObject.currentSelectBeanList=[];
        var checkAll=true;
        angular.forEach($scope.dataObject.beanList, function(data){
            //console.log(data.checked);
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
            $scope.dataObject.currentSelectBeanList=$scope.dataObject.beanList;
        }else {
            $scope.dataObject.currentSelectBeanList=[];
        }
        angular.forEach($scope.dataObject.beanList, function(data){
            data.checked=$scope.dataObject.selectStorageAll;
        });
    }

    /*$scope.isCheckedAll = function () {
            var ischeckedAll=true;
            angular.forEach($scope.dataObject.goodsList, function(data){
                if(!data.checked){
                    ischeckedAll=false;
                }
            });
        $scope.dataObject.selectStorageAll = ischeckedAll;

    }*/

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
     * 搜索
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






    $scope.pageAuto = function () {
        //$scope.queryBean = {};
        //$scope.queryBean.paging = "Yes";
        $scope.queryBean.pageNo = $scope.paginationConf.currentPage;
        $scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
        $scope.queryBeanList();
        $scope.$applyAsync();
    };



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
    $scope.queryLiberyBeanList();
    $scope.queryExpertBeanList();

    $timeout(function () {
        $('.content-wrapper').css('height', SysUtils.get_content_wrapper());
        $('#panel-body-table').css('height', $('.content').height() - $('#panel-heading').outerHeight(true));
        //console.log($('.content').height()+"=="+$('#panel-heading').outerHeight(true)+"==="+$('#ceter_p').height());
        $('.table_shadow').css('max-height', $('.content').height() - $('#panel-heading').outerHeight(true) - $('#ceter_p').outerHeight());
    });


}]);