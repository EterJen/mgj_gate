myApp.controller('workApprovedCtrl', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils', 'maxHeigtTool', function ($rootScope, $scope, ENV, $state, SysUtils, maxHeigtTool) {

    console.log('工作报批');
    $rootScope.addBgground = true;
    $scope.queryBean = {paging: 'Yes'};
    $scope.proInstList = [];
    $scope.currGroupId = 'workapproved';
    $scope.formPath = null;
    $scope.formTempPath = "apps/workflow/workApproved/";
    $scope.orgNavType = "workapproved";
    var childWindowMap = {};//存储已经打开的窗口
    $scope.hasArchiveRole = false;//判断用户是否有"档案归档"角色
    $scope.ngDisableDelete = false;
    $scope.dlDisableDelete = false;
    $scope.qzDisableDelete = false;
    $scope.ngHandled = false;

    $scope.hiddenStatus = 'Accepted';
    $scope.isFinisheds = [
        {key: '', val: '全部'},
        {key: 'Active', val: '在办'},
        {key: 'Finished', val: '已办结'}
    ];

    $scope.approvedTypelist = [
        {id: 'workapproved', val: '工作报批'},
        {id: 'otherapproved', val: '外事报批'},
        {id: 'contractapproved', val: '合同报批'},
    ];
    $scope.formDefIds = [];

    /*查询当前用户拟稿的发文*/
    $scope.queryProInstList = function (modal) {
        $scope.queryBean.groupId = $scope.currGroupId;
        $scope.queryBean.pNodeName = $scope.activeTab;
        SysUtils.requestByJson("/rProcessInstance/queryWorkApprovedList", $scope.queryBean, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                console.log(resultInfo.beanList);
                $scope.proInstList = resultInfo.beanList;
                $scope.paginationConf.totalItems = resultInfo.totalRows;
                $scope.hiddenStatus = $scope.queryBean.strStatus;
                if (SysUtils.notEmpty(modal))
                    $('#' + modal).modal('hide');
                $scope.$apply();
            })
        })
    };

    $scope.otherapprovedType= [
        {val: '外事报批', key: 'otherapproved'},
        {val: '因公出国政审报批', key: 'ygcgzsbaopi'},
    ],

    $scope.paginationConf = {
        currentPage: 1,
        totalItems: -1,
        itemsPerPage: 10,
        pagesLength: 13,
        perPageOptions: [10, 20, 30, 40, 50],

    };

    $scope.initPaging = function () {
        $scope.paginationConf.currentPage = 1;
        $scope.paginationConf.totalItems = -1;
        $scope.paginationConf.itemsPerPage = 10;

        $scope.$applyAsync();
    }
    //新增model
    $scope.openCreateProInstDialog = function () {
        $scope.proInst = {};
        $scope.processVersionQueryBean = {
            paging: 'No', isActive: '1', dbParams: {
                defManageFlag: '1', proDefGroupId: 'xinhan'
            }
        };
        if ($scope.currGroupId == 'contractapproved') {
            if ($scope.currGroupId == 'otherapproved') {
                $scope.proInst.processVersionId = 868473;
            } else {
                $scope.proInst.processVersionId = 868530;
            }
            $scope.saveWorkApproved();
        } else {
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
                        $scope.activeProcVersionList = new Array();
                        console.log($rootScope.currentUser)
                        angular.forEach(resultInfo.beanList, function (data) {
                            if ($scope.currGroupId == 'workapproved' && (data.processDefManage.formDefId == 'draftapproved' || data.processDefManage.formDefId == 'partyapproved' || data.processDefManage.formDefId == 'officepartyapproved')) {

                                $scope.activeProcVersionList.push(data);
                            } else if ($scope.currGroupId == 'otherapproved' && (data.processDefManage.formDefId == 'ygcgzsbaopi' )) {

                                $scope.activeProcVersionList.push(data);
                            }
                            if ($scope.currGroupId == data.processDefManage.formDefId) {
                                $scope.activeProcVersionList.push(data);
                            }
                        });
                        $scope.proInst.processVersionId = undefined;
                        $scope.activeProcVersionList.forEach(function (value) {
                            if (!SysUtils.notEmpty($scope.proInst, ["processVersionId"])) {
                                if ((true == $rootScope.currentUser.jgdwDept) && ("officepartyapproved" == value.processDefManage.formDefId)) {/*j机关党委*/
                                    $scope.proInst.processVersionId = value.id;
                                } else if ((false == $rootScope.currentUser.jgdwDept) && (true == $rootScope.currentUser.executive) && ("partyapproved" == value.processDefManage.formDefId)) {/*党委*/
                                    $scope.proInst.processVersionId = value.id;
                                } else if ((false == $rootScope.currentUser.executive) && ("workapproved" == value.processDefManage.formDefId)) {/*行政*/
                                    $scope.proInst.processVersionId = value.id;
                                }
                            }
                        })
                        if ($scope.currGroupId == 'otherapproved') {
                            $scope.proInst.processVersionId = $scope.activeProcVersionList[0].id;
                        }

                        //var tem = $scope.activeProcVersionList[2];
                        // $scope.activeProcVersionList.splice(2,1,$scope.activeProcVersionList[1]);
                        // $scope.activeProcVersionList.splice(1,1,tem);
                        // if (resultInfo.message == 'true') {
                        //     $scope.proInst.processVersionId = $scope.activeProcVersionList[1].id
                        // } else {
                        //     $scope.proInst.processVersionId = $scope.activeProcVersionList[0].id
                        //
                        // }
                        $scope.$apply();
                        $('#createApprovedtDialog').modal('show');
                    })
                },
                error: function (XMLResponse) {
                    $(".flyover").hide();
                    console.log(JSON.stringify(XMLResponse));
                }
            });
        }


    };

    $scope.queryWorkApproved = function () {
        $scope.initPaging();
        $('#queryApprovedtDialog').modal('hide');
        $scope.queryProInstList();
    }
    $scope.showDetail = function () {
        $('#queryApprovedtDialog').modal('show');
    }

    $scope.queryProInstAccepted = function () {
        $scope.ngDisableDelete = false;
        $scope.dlDisableDelete = false;
        $scope.qzDisableDelete = false;
        $scope.queryBean.strStatus = 'Accepted';
        $scope.ngHandled = true;
        $scope.queryProInstList($scope.activeTab)
    };

    $scope.queryProInstHandled = function () {
        $scope.ngDisableDelete = true;
        $scope.ngDisableDelete = true;
        $scope.dlDisableDelete = true;
        $scope.qzDisableDelete = true;
        $scope.ngHandled = false;
        $scope.queryBean.strStatus = 'Handled';
        $scope.queryProInstList($scope.activeTab);
    };

    $scope.checkStatus = function (status) {
        var flag = false;

        $scope.hiddenStatus.split(",").forEach(function (sta) {
            if (status == sta) {
                flag = true;
            }
        });
        return flag;
    };
    $scope.gotoDetail = function (task) {
        //console.log(task);
        $rootScope.reNewBtn = "directQuery";
        var formDefId = task.formDefId;
        if (!SysUtils.isEmpty(childWindowMap[task.id])) {
            childWindowMap[task.id].close();
        }

        var id;
        if (SysUtils.isEmpty(task.taskId)) {
            id = "-" + task.id
        } else {
            id = task.taskId
        }
        var _window = window.open(ENV.localapi + "/index.html#!/officialDocuments/" + formDefId + "/" + id);
        childWindowMap[task.id] = _window;
    }
    //修改
    $scope.updateProInstDialog = function () {
        var inputEle = angular.element("tr.clickTr");
        var itemValue;
        var formDefId;
        angular.forEach(inputEle, function (item) {
            //按需去对应的数据
            if (item.getAttribute('taskId') == "") {
                itemValue = "-" + item.id
            } else {
                itemValue = item.getAttribute('taskId')
            }
            //itemValue = SysUtils.isEmpty(item.getAttribute('taskId'))?item.id:item.getAttribute('taskId');//angular.fromJson(item.value);
            formDefId = item.getAttribute('name');
        })
        if (SysUtils.isEmpty(itemValue)) {
            swal("提示", "请选择！", "info");
            return;
        }

        var _window = window.open(ENV.localapi + "/index.html#!/officialDocuments/" + formDefId + "/" + itemValue);
    }

    //删除
    $scope.deleteProInstDialog = function (proInst) {
        SysUtils.swalConfirm("提示", "是否删除此记录", "info", function (isConfirm) {
            if (isConfirm) {
                SysUtils.requestByJson("/rProcessInstance/safeDelet", proInst, function (resultInfo) {
                    swal("提示", "删除成功！", "success");
                    $scope.queryProInstList();
                })
            }
        })
    }
    //保存一个流程
    $scope.saveWorkApproved = function () {
        var a = $scope.proInst.processVersionId;
        if ($scope.proInst.processVersionId == null || $scope.proInst.processVersionId == '' || $scope.proInst.processVersionId == undefined) {
            swal("提示", "请填写完整信息！", "info");
            return;
        }
        SysUtils.silenceWithAuthAjax("/rProcessInstance/create", $scope.proInst, function (resultInfo) {
            $('#createApprovedtDialog').modal('hide');
            window.open(ENV.localapi + "/index.html#!/officialDocuments/" + resultInfo.additionalInfo.formDefId + "/" + resultInfo.additionalInfo.currentTuskId, resultInfo.additionalInfo.currentTuskId);
            $scope.queryProInstList($scope.activeTab);
        });
    };

    $scope.setFormPath = function () {
        $scope.formPath = $scope.formTempPath + $scope.currGroupId + ".html";
    }


    $scope.queryProInstListChangeBean = function () {
        $scope.initPaging();
        $scope.queryBean.totalRows = $scope.paginationConf.totalItems;
        $scope.queryBean.pageNo = $scope.paginationConf.currentPage;
        $scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
        $scope.queryBean.strStatus = $scope.hiddenStatus;
        $scope.queryProInstList();
    }
    $scope.enterKeyupAllTab = function (e) {
        var keycode = window.event ? e.keyCode : e.which;
        if (keycode == 13) {
            $scope.choseCandate('workApproved');
        }
    }

    $scope.initParamsAndQuery = function (groupId) {
        $scope.queryBean = {paging: 'Yes'};//初始化查询参数
        $scope.currGroupId = groupId;
        $scope.setFormPath();
        $scope.$applyAsync();
        $scope.initPaging();
        $scope.pageAuto();
    }

    $scope.setFormPath();

    $scope.pageAuto = function () {
        $scope.queryBean.totalRows = $scope.paginationConf.totalItems;
        $scope.queryBean.pageNo = $scope.paginationConf.currentPage;
        $scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
        $scope.queryBean.strStatus = $scope.hiddenStatus;
        $scope.queryProInstList();
    }

    /*  $scope.$on('$includeContentLoaded', function () {
     $scope.pageAuto();
     });*/
    $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.pageAuto);


    $scope.choseCandate = function (type) {
        $scope.orgNavType = type;
        $scope.$applyAsync();
        $scope.initParamsAndQuery(type);
    };


}]);

