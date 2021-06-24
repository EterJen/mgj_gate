myApp.controller('yscgMngCtrl', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils', 'maxHeigtTool', 'NodeTreeTool', function ($rootScope, $scope, ENV, $state, SysUtils, maxHeigtTool, NodeTreeTool) {

    $rootScope.addBgground = true;
    $scope.queryBean = {paging: 'Yes',pNodeName:'allNode', formDefId: 'yscgjshengpi', formDefIds: ['yscgjshengpi'], dbParams: {}};
    $scope.proInstList = [];
    $scope.currGroupId = 'personnel';
    var childWindowMap = {};//存储已经打开的窗口
    $scope.proInst = {};
    $rootScope.reNewBtn = "directQuery";
    $scope.isFinished = 'Active';

    $scope.temporaryHireTypes = [
        {key: '', val: '全部'},
        {key: 'borrow', val: '临时借用'},
        {key: 'engage', val: '临时聘用'}
    ];
    $scope.deleteProInst = function (inst) {
        SysUtils.swalConfirm("提示", "是否删除选中公文", "info", function (isConfirm) {
            if (isConfirm) {
                SysUtils.requestByJson("/rProcessInstance/safeDelet", inst, function (resultInfo) {
                    $scope.queryProInstList();
                })
            }
        });

    };
    $scope.paginationConf = {
        currentPage: 1,
        totalItems: -1,
        itemsPerPage: 10,
        pagesLength: 13,
        perPageOptions: [10, 20, 30, 40, 50]
    };

    $scope.openCreateProInstDialog = function () {
        $scope.proInst = {};
        $scope.proInst.processVersionId = 946208;
        if (true) {
            $scope.saveProInst();
            return;
        } else {
            $scope.processVersionQueryBean = {
                paging: 'No', isActive: '1', dbParams: {
                    defManageFlag: '1', proDefGroupId: $scope.currGroupId
                }
            };
            SysUtils.requestByJson('/processDefVersion/list', $scope.processVersionQueryBean, function (resultInfo) {
                SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                    $scope.activeProcVersionList = resultInfo.beanList;
                    $scope.proInst.processVersionId = $scope.activeProcVersionList[0].id;
                    $scope.$apply();
                    $('#createProInstDialog').modal('show');
                });
            });
        }
    };

    $scope.saveProInst = function () {
        SysUtils.silenceWithAuthAjax("/rProcessInstance/create", $scope.proInst, function (resultInfo) {
            $('#createProInstDialog').modal('hide');

            window.open(ENV.localapi + "/index.html#!/officialDocuments/" + resultInfo.additionalInfo.formDefId + "/" + resultInfo.additionalInfo.currentTuskId, resultInfo.additionalInfo.currentTuskId);
        });
    };

    $scope.initPaging = function () {
        $scope.paginationConf.currentPage = 1;
        $scope.paginationConf.totalItems = -1;
        $scope.paginationConf.itemsPerPage = 10;

        $scope.$applyAsync();
    };

    $scope.gotoDetail = function (proInst) {
        var formDefId = proInst.formDefId;
        if (!SysUtils.isEmpty(childWindowMap[proInst.id])) {
            childWindowMap[proInst.id].close();
        }
        var url = "";
        if ("Active" == $scope.isFinished) {
            url = ENV.localapi + "/index.html#!/officialDocuments/" + formDefId + "/" + proInst.taskId;
        } else {
            url = ENV.localapi + "/index.html#!/officialDocuments/" + formDefId + "/-" + proInst.id;
        }
        var _window = window.open(url);
        childWindowMap[proInst.id] = _window;
    };

    /**
     * 搜索框查询
     * @param modal
     */
    $scope.queryProInstListChangeBean = function (modal) {
        $scope.initPaging();
        $scope.queryBean.totalRows = $scope.paginationConf.totalItems;
        $scope.queryBean.pageNo = $scope.paginationConf.currentPage;
        $scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;

        $scope.queryProInstList(modal);
    };

    $scope.queryProInstList = function (modal) {
        $scope.proInstList = [];
        SysUtils.requestByJson("/rProcessInstance/yscgjshengpi", $scope.queryBean, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                $scope.proInstList = resultInfo.beanList;
                $scope.paginationConf.totalItems = resultInfo.totalRows;
                // $scope.paginationConf.currentPage = resultInfo.bean.pageNo;
                if (!SysUtils.isEmpty(modal)) {
                    $('#' + modal).modal('hide');
                }
                $scope.$apply();
            })
        });
    };

    $scope.initParams = function () {
        $scope.queryBean = {paging: 'Yes',pNodeName:'allNode',formDefId: 'yscgjshengpi', formDefIds: ['yscgjshengpi'], dbParams: {}};
        $scope.$applyAsync();
        $scope.initPaging();
    };

    $scope.initParamsAndQuery = function () {
        $scope.initParams();
        $scope.pageAuto();
    };

    $scope.pageAuto = function () {
        $scope.queryBean.totalRows = $scope.paginationConf.totalItems;
        $scope.queryBean.pageNo = $scope.paginationConf.currentPage;
        $scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
        $scope.setStatus();
        $scope.queryProInstList();
    };

    $scope.queryProInstListByCondition = function (isFinished) {
        $scope.isFinished = isFinished;
        $scope.initParamsAndQuery();
    };

    $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.pageAuto);

    $scope.openQueryModal = function (modal) {
        $scope.queryBean.dbParams = {};
        $scope.queryBean.paging = "Yes";
        $scope.queryBean.docFullName = null;
        $scope.queryBean.pageNo = 1;
        $scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
        $('#' + modal).modal('show');
    };

    $scope.setStatus = function () {
        if ("Active" === $scope.isFinished) {
            $scope.queryBean.strStatus = 'NotAccepted,Accepted';
        } else {
            $scope.queryBean.strStatus = "Handled";
        }
    };

    /**
     * 借聘用取消
     * @param proInst
     */
    $scope.personnelCancel = function (proInst) {
        console.log(proInst);
        SysUtils.swalConfirm('提示', '确认删除该报批吗?', 'info', function (isConfirm) {
            if (isConfirm) {
                SysUtils.requestByJson('/rProcessInstance/personnelCancel', proInst, function (resultInfo) {
                    SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                        $scope.queryProInstList();
                    });
                });
            }
        });
    };

    $('#queryModal').on('shown.bs.modal', function () {
        $('#temporaryHireStartDate').datepicker({
            format: 'yyyy-mm-dd',
            autoclose: true,
            clearBtn: true
        }).on('show', function (e) {
            if ($('#temporaryHireEndDate').val() == '') {
                $('#temporaryHireStartDate').datepicker('setEndDate', null);
            }
        }).on('changeDate', function (e) {
            if (e.date) {
                $('#temporaryHireEndDate').datepicker('setStartDate', new Date(e.date.valueOf()));
            } else {
                $('#temporaryHireEndDate').datepicker('setStartDate', null);
            }
        });
        $('#temporaryHireEndDate').datepicker({
            format: 'yyyy-mm-dd',
            autoclose: true,
            clearBtn: true
        }).on('show', function (e) {
            if ($('#temporaryHireStartDate').val() == '') {
                $('#temporaryHireEndDate').datepicker('setStartDate', null);
            }
        }).on('changeDate', function (e) {
            if (e.date) {
                $('#temporaryHireStartDate').datepicker('setEndDate', new Date(e.date.valueOf()));
            } else {
                $('#temporaryHireStartDate').datepicker('setEndDate', null);
            }
        });
    });

    /*************************三、初始化调用****************************/
    /*计算布局高度*/
    $scope.calculatedHeight = function () {
        $('.content-wrapper').css('height', SysUtils.get_content_wrapper());
        $('#panel-body-table').css('height', $('.content').height() - $('#panel-heading').outerHeight(true) - $('#bmxx_tit').height());
        $('.table_shadow').css('max-height', $('.content').height() - $('#panel-heading').outerHeight(true) - $('#ceter_p').outerHeight() - $('#bmxx_tit').height());
    };

    setTimeout(function () {
        $scope.calculatedHeight();
    }, 500);

}]);
