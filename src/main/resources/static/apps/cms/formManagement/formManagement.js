myApp.controller('formManagementCtl', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils', '$timeout','$stateParams','dataFactory', function ($rootScope, $scope, ENV, $state, SysUtils, $timeout,$stateParams,dataFactory) {
    console.log("formManagementCtl controller==");

    /*************************一、变量定义****************************/

    $scope.queryBean = {
        isdelete:0,
        paging: "Yes"
    };
    /*各种函数调用*/
    $scope.fc={};
    $scope.newBean={};
    $scope.dataObject={


    };

    /*************************二、函数定义****************************/

    /**
     * 初始化查查询
     */
    $scope.queryBeanList = function () {
        var url='/comform/list';
        SysUtils.requestByJson(url, $scope.queryBean, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                $scope.dataObject.beanList = resultInfo.beanList;
                $scope.paginationConf.totalItems = resultInfo.totalRows;
                $scope.$apply();
            })
        });
    };

    /**
     * 新增文件
     * @param modl
     */
    $scope.fc.addBean = function (modal) {
        $scope.newBean={};
        $scope.fc.headPortrait = {};
        /*var obj = document.getElementById('fujian') ;
        obj.outerHTML=obj.outerHTML;*/
        if (!SysUtils.isEmpty(modal)) {
            $('#'+modal).modal('show');
        }
    }

    $scope.fc.initTitle = function () {
        $scope.newBean.name = $scope.newBean.originName;
    };
    $scope.fc.downloadPdf = function (bean) {
        var simpleFile = {};
        simpleFile.relativePath = "" + bean.file;
        simpleFile.downloadName = "" + bean.originalName;
        SysUtils.remoteDownload(simpleFile);
    };
    /**
     * 文件保存
     * @param modal
     */
    $scope.fc.saveBean = function (modal) {
        if (SysUtils.isEmpty($scope.fc.headPortrait)&&SysUtils.isEmpty($scope.newBean.file)) {
            swal("请选择上传的文件","","info");
            return;
        }
        var  url=ENV.serverUri + "/comform/saveOrupdateAttachment";
        var fd = new FormData();
        var file = $scope.fc.headPortrait;
        console.log(file);
        fd.append('file', file);
        fd.append('selectedBean', JSON.stringify($scope.newBean));
        dataFactory.getlist(url, 'POST', {'Content-type': undefined}, fd).then(
            function (d) {
                //console.log(JSON.stringify(d));
                SysUtils.handleResult(d, {'state': $state}, function () {
                    swal("提示",d.message,d.resultType);
                    if (!SysUtils.isEmpty(modal)) {
                        $('#'+modal).modal('hide');
                    }
                    //清空input的file值
                    $scope.fc.headPortrait = {};
                    document.getElementById('fujian').value="";
                    //$("#fujian").val();
                    //保存成功后查询数据
                    $scope.searchGoods();
                })
            },
            function (d) {
                console.log(JSON.stringify(d));
            }
        )
    }

    /**
     * 单项删除
     * @param bean
     */
    $scope.fc.deletBean = function (bean) {
        SysUtils.swalConfirm("提示",  "是否确定删除？", "info", function (isConfirm) {
            if (isConfirm) {
                SysUtils.requestByJson("/comform/delete/"+bean.id,{}, function (resultInfo) {
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
                    SysUtils.requestByJson("/comform/batchDelete",param, function (resultInfo) {
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

    $scope.editBean = function (bean,modal) {
        $scope.newBean=angular.copy(bean);
        $scope.fc.headPortrait = {};
       /* var obj = document.getElementById('fujian') ;
        obj.outerHTML=obj.outerHTML;*/
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
    //$scope.querySelDicModesForBusiness();


    $timeout(function () {
        $('.content-wrapper').css('height', SysUtils.get_content_wrapper());
        $('#panel-body-table').css('height', $('.content').height() - $('#panel-heading').outerHeight(true));
        //console.log($('.content').height()+"=="+$('#panel-heading').outerHeight(true)+"==="+$('#ceter_p').height());
        $('.table_shadow').css('max-height', $('.content').height() - $('#panel-heading').outerHeight(true) - $('#ceter_p').outerHeight());
    });


}]);