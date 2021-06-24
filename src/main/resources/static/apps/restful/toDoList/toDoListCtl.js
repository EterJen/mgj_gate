myApp.controller('todoListCtrl', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils', '$timeout', '$stateParams', function ($rootScope, $scope, ENV, $state, SysUtils, $timeout, $stateParams) {
    console.log("todoListCtrl controller");


    /*var window_height = $(window).height();
    var heightList = [];
    heightList.push($('.main-header').outerHeight());
    $('#table_dt').css('height', window_height - 191);
    $('.content-wrapper').css('height', maxHeigtTool.maxHeigt(window_height, heightList));*/


    /*************************一、变量定义****************************/
    $rootScope.addBgground = false;
    $rootScope.indexNoMagin = true;
    $scope.currTaskList = [];//当前用户列表
    $scope.proInst = {};
    $scope.processVersionQueryBean = {};//流程版本的列表查询bean
    $scope.activeProcVersionList = {};//当前启用的流程版本列表
    $scope.titleDocFullName = '';
    $scope.homeListRenewId = "dbsycx";
    var childWindowMap = {};//存储已经打开的窗口
    $scope.orgNavType = "IndividualToDone";
    $scope.isleader = false;
    $scope.docTypelist = [
        {id: 'IndividualToDone', val: '个人待办'},
        {id: 'OfficeToDone', val: '处室待办'}
    ];
    /*************************二、函数定义****************************/
    $scope.saySomthing = function () {
        if (Boolean($stateParams.emergency)) {
            console.log('加急');
        }
        console.log($stateParams.id);
        console.log("动态刷新ok？");
    };

    $scope.saySomthing();

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
    };

    /*$scope.collectionPros = function (index) {
        var pro = $scope.currTaskList[index].belongingProInst;
        if (pro.collection) {
            $scope.currTaskList[index].belongingProInst.collection = false;
        } else {
            $scope.currTaskList[index].belongingProInst.collection = true;

        }
        SysUtils.requestByJson('/rProcessInstance/insertMycollection', pro, function (r) {
            /!*if($scope.currTaskList[index].belongingProInst.collection){
                SysUtils.swalTimer("提示","关注成功！","success");
            }else{
                SysUtils.swalTimer("提示","取消关注成功！","success");
            }*!/
        })
    }
*/
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
        $scope.proInst.restEmergency = Boolean($stateParams.emergency);
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


        if (SysUtils.notEmpty($scope.titleDocFullName, '')) {
            $scope.initPaging();
            $scope.initCuTask();
            return;
        } else if (SysUtils.notEmpty(cacheTasks, [])) {
            //console.log(cacheTasks);
            $scope.currTaskList = cacheTasks.beanList;
            $scope.paginationConf.totalItems = cacheTasks.totalRows;
            $scope.isleader = cacheTasks.additionalInfo.isLeader;
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
            //console.log($scope.isleader);
            $scope.paginationConf.totalItems = resultInfo.totalRows;
            $scope.$apply();
        })
    };

    $scope.showDetail = function (modal) {
        $scope.proInst.pageNo = 1;
        $scope.proInst.pageSize = $scope.paginationConf.itemsPerPage;
        $('#' + modal).modal('show');
    };

    $scope.enterKeyup = function (e) {

        //IE 编码包含在window.event.keyCode中，Firefox或Safari 包含在event.which中
        var keycode = window.event ? e.keyCode : e.which;

        if (keycode == 13) {
            $scope.pageAuto();
        } else {
            return;
        }
    };

	window.renwPage = function () {
		$scope.pageAuto();
	};
    /*************************三、初始化调用****************************/
    //$scope.initCuTask();

    // $scope.initPaswordDis();

    $timeout(function () {
        $('.content-wrapper').css('height', SysUtils.get_content_wrapper());
        $('#panel-body-table').css('height', $('.content').height() - $('#panel-heading').outerHeight(true));
        //console.log($('.content').height()+"=="+$('#panel-heading').outerHeight(true)+"==="+$('#ceter_p').height());
        $('.table_shadow').css('max-height', $('.content').height() - $('#panel-heading').outerHeight(true) - $('#ceter_p').outerHeight());
    });
}]);