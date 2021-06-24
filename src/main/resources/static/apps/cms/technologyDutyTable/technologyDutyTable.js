myApp.controller('technologyDutyTableCtl', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils', '$timeout','$stateParams','dataFactory', function ($rootScope, $scope, ENV, $state, SysUtils, $timeout,$stateParams,dataFactory) {
    console.log("technologyDutyTableCtl controller==");

    /*************************一、变量定义****************************/
    var currentYear=new Date().getFullYear();
    var currentMonth=new Date().getMonth()+1;
    $scope.queryBean = {
        //datelong:SysUtils.dateFtt("yyyy-MM-dd",new Date()),
        datelong:currentYear+"-"+currentMonth+"-01",
        year:currentYear,
        paging: "Yes"
    };
    $scope.queryUserBean={paging: "Yes",isdelete:0};
    /*各种函数调用*/
    $scope.fc={currentSelectUser:{}};
    $scope.newBean={};
    $scope.dataObject={


    };

    /*************************二、函数定义****************************/

    /**
     * 初始化查查询
     */
    $scope.queryBeanList = function () {
        var url='/dutytable/queryMonth';
        SysUtils.requestByJson(url, $scope.queryBean, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                $scope.dataObject.beanList = resultInfo.beanList;
                $scope.$apply();
            })
        });
    };

    /**
     * 查询上个月值班表
     */
    $scope.fc.getLastMonth = function () {
        currentMonth=currentMonth-1;
        if (currentMonth > 0) {
            //如果上个月是本年度，则不需要处理年份
        }else {
            //如果上个月是去年0月，则跨年为去年12月
            currentMonth=12;
            currentYear=currentYear-1;
        }
        $scope.queryBean.datelong=currentYear+"-"+currentMonth+"-01";
        $scope.queryBeanList();
    }

    /**
     * 查询下个月值班表
     */
    $scope.fc.getNextMonth = function () {
        currentMonth=currentMonth+1;
        if (currentMonth > 12) {
            //如果下个月是13月，则跨年为明年年1月
            currentMonth=1;
            currentYear=currentYear+1;
        }
        $scope.queryBean.datelong=currentYear+"-"+currentMonth+"-01";
        $scope.queryBeanList();
    }
    
    /**
     * 导出当月排班表
     */
    $scope.fc.exportMonth = function () {
    	if(currentMonth<10){
    		currentMonth="0"+currentMonth;
    	}
    	console.log("currentMonth"+currentYear+"-"+currentMonth+"-01");
        //$scope.queryBean.datelong=currentYear+"-"+currentMonth+"-01";
        
        //console.log("url=="+url);
        //window.open(url);
        //SysUtils.remoteDownload(url);
       // SysUtils.requestByJson(url, $scope.queryBean, function (resultInfo) {
           /* SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                
            })*/
       // });
    	var url='dutytable/exportMonth';
        var form = $('<form method = "POST"  action = "' + url + '">');
        form.append($('<input type="hidden" name="datelong" value="' + currentYear+"-"+currentMonth+"-01" + '">'))
        $('body').append(form);
        form.submit();
    }
    
    /**
     * 新增选择用户
     * @param user
     */
    $scope.fc.selectUser = function (user) {
        $scope.fc.currentSelectUser = user;
    }

    /**
     * 新增资源管理
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

    /**
     * 资源管理保存
     * @param modal
     */
    $scope.fc.saveBean = function (modal) {
        if(SysUtils.notEmpty($scope.newBean,['id'])){
            url="/linked/update";
        }else{
            url="/linked/create";
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
    $scope.fc.deletBean = function (bean,type) {
        SysUtils.swalConfirm("提示",  "是否确定删除？", "info", function (isConfirm) {
            if (isConfirm) {
                //$scope.fc.currentSelectDuty.user1=$scope.fc.currentSelectUser.id;
                
                SysUtils.requestByJson("/dutytable/deleteUser",bean, function (resultInfo) {
                    SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                    	$scope.queryBeanList();
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
                    SysUtils.requestByJson("/linked/batchDelete",param, function (resultInfo) {
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

    /**
     * 添加人员
     * @param bean
     * @param modal
     * @param type 1,2,3 分别对应3个user
     */
    $scope.editBean = function (bean,modal,type) {
        //$scope.newBean=bean;
        $scope.fc.currentSelectDuty=bean;
        $scope.fc.currentSelectDuty.type=type;
        if (type == 1) {
            $scope.fc.currentSelectUser=bean.administrator1;
        }else if(type == 2) {
            $scope.fc.currentSelectUser=bean.administrator2;
        } else if(type == 3) {
            $scope.fc.currentSelectUser=bean.administrator3;
        }
        //$scope.fc.currentSelectUser=bean.administrator1;

        /*查询用户*/
        $scope.queryUserBeanList();
        if (!SysUtils.isEmpty(modal)) {
            $('#'+modal).modal('show');
        }

        $scope.$applyAsync();
    }

    /**
     * 保存修改的用户
     * @param modal
     */
    $scope.saveUserInDuty = function (modal) {
        // $scope.fc.currentSelectDuty.user1=$scope.fc.currentSelectUser.id;
        SysUtils.requestByJson("/dutytable/updateUsers",$scope.fc.currentSelectDuty, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
            	
            	$scope.queryBeanList();
            	
                if (!SysUtils.isEmpty(modal)) {
                    $('#'+modal).modal('hide');
                }
                //$scope.$apply();
            })
        });


    }

    /***
     * 修改当前值班人员信息
     */
    $scope.updateUserInDuty = function (modal) {
       
        SysUtils.requestByJson("/dutytable/update",$scope.fc.currentSelectDuty, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
            	
            	$scope.queryBeanList();
            	
                if (!SysUtils.isEmpty(modal)) {
                    $('#'+modal).modal('hide');
                }
            })
        });
    }

    $scope.queryUserBeanList = function () {
    	
    	queryUserBean={department:1};
        SysUtils.requestByJson("/dutyuser/getUsers",queryUserBean, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                $scope.fc.userList = resultInfo.beanList;
                //fc.currentSelectDuty.user1 = 
                $scope.paginationConf.totalItems = resultInfo.totalRows;
                $scope.$apply();

            })
        });
    }




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
        $scope.queryUserBean.pageNo = $scope.paginationConf.currentPage;
        $scope.queryUserBean.pageSize = $scope.paginationConf.itemsPerPage;
        $scope.queryUserBeanList();
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
    $scope.queryBeanList();


    $timeout(function () {
        $('.content-wrapper').css('height', SysUtils.get_content_wrapper());
        $('#panel-body-table').css('height', $('.content').height() - $('#panel-heading').outerHeight(true));
        //console.log($('.content').height()+"=="+$('#panel-heading').outerHeight(true)+"==="+$('#ceter_p').height());
        // $('.table_shadow').css('max-height', $('.content').height() - $('#panel-heading').outerHeight(true) - $('#ceter_p').outerHeight());
    });


}]);