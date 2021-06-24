myApp.controller('todoListCtrl', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils', '$timeout', function ($rootScope, $scope, ENV, $state, SysUtils, $timeout) {
    console.log("todoListCtrl controller");


    /*var window_height = $(window).height();
    var heightList = [];
    heightList.push($('.main-header').outerHeight());
    $('#table_dt').css('height', window_height - 191);
    $('.content-wrapper').css('height', maxHeigtTool.maxHeigt(window_height, heightList));*/


    /*************************一、变量定义****************************/
    $rootScope.addBgground = true;
    $scope.currTaskList = [];//当前用户列表
    $scope.proInst = {};
    $scope.processVersionQueryBean = {};//流程版本的列表查询bean
    $scope.activeProcVersionList = {};//当前启用的流程版本列表
    $scope.titleDocFullName = '';
    $scope.homeListRenewId = "dbsycx";
  $rootScope.reNewBtn = $scope.homeListRenewId;
    var childWindowMap = {};//存储已经打开的窗口
    $scope.orgNavType = "IndividualToDone";
    $scope.isleader = false;
    $scope.docTypelist = [
        {id: 'IndividualToDone', val: '个人待办'},
        {id: 'OfficeToDone', val: '处室待办'}
    ];
    /*************************二、函数定义****************************/
    $scope.saySomthing = function () {
        console.log("动态刷新ok？");
    };

    $scope.saveProInst = function () {
        $(".flyover").show();
        $.ajax({
            type: "POST",
            url: ENV.localapi + "/rProcessInstance/create",
            beforeSend: function (request) {
                request.setRequestHeader("Content-type", "application/json");
                //request.setRequestHeader("Authorization", "Bearer " + $cookies.getObject('user').token);
            },
            dataType: 'json',
            data: JSON.stringify($scope.proInst),
            success: function (resultInfo) {
                $(".flyover").hide();
                SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                    SysUtils.swalOnlyConfirm("提示", resultInfo.message, "info", function (isConfirm) {
                        $('#createProInstDialog').modal('hide');
                        console.log(ENV.localapi + "/index.html#!/officialDocuments/" + resultInfo.additionalInfo.formDefId + "/" + resultInfo.additionalInfo.currentTuskId)
                        window.open(ENV.localapi + "/index.html#!/officialDocuments/" + resultInfo.additionalInfo.formDefId + "/" + resultInfo.additionalInfo.currentTuskId, resultInfo.additionalInfo.currentTuskId);
                        $scope.initCuTask();
                    });
                })
            },
            error: function (XMLResponse) {
                $(".flyover").hide();
                console.log(JSON.stringify(XMLResponse));
            }
        });
    }

    $scope.emergenceLevels = [];
    $scope.selectUserType = {id: "", name: '全部'};
    $scope.dimods = [
        {dictype: "Level"}
    ]

    $scope.emergenceLevels = [{id: "", name: '全部'},{"id": 102962, "name": "急件"}, {"id": 102964, "name": "加急"}, {"id": 102963, "name": "特急"}];
    /*    SysUtils.silenceWithAuthAjax("/dicMode/querybyArray",$scope.dimods,function (resultInfo) {
            if (SysUtils.notEmpty(resultInfo.additionalInfo,['Level','dicTypes'])) {
                $scope.emergenceLevels = resultInfo.additionalInfo.Level.dicTypes;
                $scope.emergenceLevels.push($scope.selectUserType);

                var simple = [];
                angular.forEach($scope.emergenceLevels, function (item) {
                    simple.push({id:item.id, name: item.name})
                });
                console.log(JSON.stringify(simple));

            }
            $scope.$applyAsync();
        })*/
    ;

    $scope.openCreateProInstDialog = function () {
        $scope.proInst = {};
        $scope.processVersionQueryBean = {paging: 'N0', isActive: '1', dbParams: {defManageFlag: '1'}};
        $(".flyover").show();
        $.ajax({
            type: "POST",
            url: ENV.localapi + "/processDefVersion/list",
            beforeSend: function (request) {
                request.setRequestHeader("Content-type", "application/json");
                //request.setRequestHeader("Authorization", "Bearer " + $cookies.getObject('user').token);
            },
            dataType: 'json',
            data: JSON.stringify($scope.processVersionQueryBean),
            success: function (resultInfo) {
                $(".flyover").hide();
                SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                    $scope.activeProcVersionList = resultInfo.beanList;
                    console.log($scope.processVersionQueryBean);
                    console.log($scope.activeProcVersionList);
                    $scope.$apply();
                    $('#createProInstDialog').modal('show');
                })
            },
            error: function (XMLResponse) {
                $(".flyover").hide();
                console.log(JSON.stringify(XMLResponse));
            }
        });
    }

    $scope.changeNavType = function (stateId) {
        $scope.orgNavType = stateId;
        $scope.paginationConf.totalItems = -1;
        //$scope.titleDocFullName = "";
        $scope.pageAuto();
    };

    $scope.closeCreateDialog = function () {
        $('#createProInstDialog').modal('hide');
    }

    $scope.collectionPros = function (index) {
        var pro = $scope.currTaskList[index].belongingProInst;
        if (pro.collection) {
            $scope.currTaskList[index].belongingProInst.collection = false;
        } else {
            $scope.currTaskList[index].belongingProInst.collection = true;

        }
        SysUtils.requestByJson('/rProcessInstance/insertMycollection', pro, function (r) {
            /*if($scope.currTaskList[index].belongingProInst.collection){
                SysUtils.swalTimer("提示","关注成功！","success");
            }else{
                SysUtils.swalTimer("提示","取消关注成功！","success");
            }*/
        })
    }

    $scope.gotoDetail = function (task, cIdx) {
        $rootScope.reNewBtn = $scope.homeListRenewId;
        var formDefId = task.belongingProInst.formDefId;
        var _window;
        //console.log(ENV.localapi + "/index.html#!/formEditGeneric/" + formDefId + "/" + task.id);
        if (!SysUtils.isEmpty(childWindowMap[task.id])) {
            childWindowMap[task.id].close();
        }
        if ($scope.orgNavType === "IndividualToDone") {
            _window = window.open(ENV.localapi + "/index.html#!/officialDocuments/" + formDefId + "/" + task.id);
        } else {
            _window = window.open(ENV.localapi + "/index.html#!/officialDocuments/" + formDefId + "/-" + task.belongingProInst.id);
        }
        childWindowMap[task.id] = _window;
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

    $scope.cuTaskScroll = false;




    $scope.pageAuto = function () {
        $scope.proInst = {};
        $scope.proInst.paging = "Yes";
        $scope.proInst.pageNo = $scope.paginationConf.currentPage;
        $scope.proInst.pageSize = $scope.paginationConf.itemsPerPage;
        $scope.proInst.titleDocFullName = $scope.titleDocFullName;
        //待办和已办类型
        $scope.proInst.initType = $scope.orgNavType;
        if (SysUtils.notEmpty($scope.selectUserType, ['name'])) {
            if ("全部" != $scope.selectUserType.name) {
                $scope.proInst.emergenceLevel = $scope.selectUserType.name;
            }
        }

        var cacheTasks = '';
        if (SysUtils.notEmpty($rootScope.currentUser, ['toDoTasksInf'])) {
            cacheTasks = $rootScope.currentUser.toDoTasksInf;
            $rootScope.currentUser.toDoTasksInf = '';

        }


        if (SysUtils.notEmpty($scope.titleDocFullName, [])) {
            $scope.initPaging();
            $scope.initCuTask();
            return;
        } else if (SysUtils.notEmpty(cacheTasks, [])) {
            //console.log(cacheTasks);
            $scope.currTaskList = cacheTasks.beanList;
            $scope.paginationConf.totalItems = cacheTasks.totalRows;
            $scope.isleader = cacheTasks.additionalInfo.isLeader;
            $scope.setDisable = cacheTasks.additionalInfo.setDisable;
            $scope.setPermissions = cacheTasks.additionalInfo.setPermissions;
            $scope.$applyAsync();
            return;
        } else {
            $scope.initCuTask();
        }
        $scope.$applyAsync();
    };


    $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.pageAuto);
    //</editor-fold>

    $scope.cleanCache = function () {
        //调用登出方法
        $(".flyover").show();
        $.ajax({
            type: "POST",
            url: ENV.localapi + "/cacheUser",
            beforeSend: function (request) {
                request.setRequestHeader("Content-type", "application/json");
                //request.setRequestHeader("Authorization", "Bearer " + $cookies.getObject('user').token);
            },
            dataType: 'json',
            success: function (resultInfo) {
                $(".flyover").hide();
                SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                    $scope.initCuTask();
                    swal("成功", resultInfo.message, "success");
                })
            },
            error: function (XMLResponse) {
                $(".flyover").hide();
                console.log(JSON.stringify(XMLResponse));
            }
        });

    }


    $scope.initCuTask = function () {
        SysUtils.requestByJson('/rCurrentTaskInfo/getTodoList', $scope.proInst, function (resultInfo) {
            $scope.currTaskList = resultInfo.beanList;
            $scope.isleader = resultInfo.additionalInfo.isLeader;
            $scope.setDisable = resultInfo.additionalInfo.setDisable;
            $scope.setPermissions = resultInfo.additionalInfo.setPermissions;
            //console.log($scope.isleader);
            $scope.paginationConf.totalItems = resultInfo.totalRows;
            $scope.$apply();
        })
        /*$.ajax({
            type: "POST",
            url: ENV.localapi + "/rCurrentTaskInfo/getTodoList",
            beforeSend: function (request) {
                request.setRequestHeader("Content-type", "application/json");
                //request.setRequestHeader("Authorization", "Bearer " + $cookies.getObject('user').token);
            },
            dataType: 'json',
            data: JSON.stringify($scope.proInst),
            success: function (resultInfo) {
                SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                    $scope.currTaskList = resultInfo.beanList;
                    $scope.paginationConf.totalItems = resultInfo.totalRows;
                    $scope.$apply();
                })
            },
            error: function (XMLResponse) {
                console.log(JSON.stringify(XMLResponse));
            }
        });*/
    }

    $scope.getOneClick = function () {
        SysUtils.requestByJson('/rCurrentTaskInfo/getOneClick', $scope.proInst, function (resultInfo) {
            swal("提示", resultInfo.message, "success");

            $scope.initCuTask();
        })
    }

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
    //$scope.initCuTask();


    $timeout(function () {
        $('.content-wrapper').css('height', SysUtils.get_content_wrapper());
        $('#panel-body-table').css('height', $('.content').height() - $('#panel-heading').outerHeight(true));
        //console.log($('.content').height()+"=="+$('#panel-heading').outerHeight(true)+"==="+$('#ceter_p').height());
        $('.table_shadow').css('max-height', $('.content').height() - $('#panel-heading').outerHeight(true) - $('#ceter_p').outerHeight());
    });

    $scope.initPaswordDis = function () {
        var fromCorse = SysUtils.getUrlParamByName("akCorsToken");
        if (!SysUtils.notEmpty(fromCorse,[])) {
            return;
        }
        SysUtils.silenceWithAuthAjax("/coreUser/initPaswordDis", {}, function (resultInfo) {
            if ("error" == resultInfo.message) {
                SysUtils.initPaswordDisTips("提示", "您当前正在使用系统初始密码\n请至【个人秘书-个人配置-密码设置】\n进行修改", "info", function (isConfirm) {
                    if (isConfirm) {
                        window.open(ENV.localapi + "/index.html#!/coreHome/personBasisSetting/userInfoModify");
                    }
                });
            }
        });
    };
    // $scope.initPaswordDis();
}]);