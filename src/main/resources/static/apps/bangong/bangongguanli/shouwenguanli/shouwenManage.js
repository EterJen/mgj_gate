/*
myApp.config(function ($stateProvider, ENV) {

    $stateProvider.state('coreHome.shouwenManage', {
        url: "/shouwenManage",
        views: {
            'rightContent@coreHome': {
                templateUrl: ENV.templateLocate + "/apps/bangong/bangongguanli/shouwenguanli/shouwenManage.html?ts=" + timestamp,
                controller: "shouwenManageCtrl",
                cache: false,
            }
        }
    });

});
*/


myApp.controller('shouwenManageCtrl', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils', 'dataFactory', 'NodeTreeTool', 'maxHeigtTool', '$http', function ($rootScope, $scope, ENV, $state, SysUtils, dataFactory, NodeTreeTool, maxHeigtTool, $http) {

    /*************************一、变量定义****************************/
    $rootScope.addBgground = true;
    $scope.queryBean = {paging: 'Yes', strStatus: 'NotAccepted,Accepted'};
    $scope.proInstList = [];
    $scope.currGroupId = 'shouwen';
    $scope.formpath = null;
    $scope.formTempPath = "apps/bangong/bangongguanli/shouwenguanli/";
    $scope.activeTab = "swcl";
    $scope.homeListRenewId = $scope.activeTab;
    $rootScope.reNewBtn = "directQuery";
    $scope.selectedDocType = true;
    $scope.modeName = 'SelectModalRsv1';
    $scope.sjlw = 'shangjilaiwen';
    $scope.formDefId = '';
    var childWindowMap = {};//存储已经打开的窗口


    $scope.paginationConf = {
        currentPage: 1,
        totalItems: -1,
        itemsPerPage: 10,
        pagesLength: 13,
        perPageOptions: [10, 20, 30, 40, 50]
    };
    $scope.shouwenFormDefIdOptions = [
        {name: '全部', val: ''},
        {name: '长城电子党委', val: 'jxwdwshouwen'},
        {name: '长城电子', val: 'jxwshouwen'}
    ];

    /*************************二、函数定义****************************/
    /*查询当前用户登录的收文*/
    $scope.queryProInstList = function (detail) {
        if (!SysUtils.notEmpty($scope.formDefIdall, [])) {
            return;
        }
        $scope.proInstList = [];
        $scope.queryBean.groupId = $scope.formDefId == '' ? $scope.currGroupId : $scope.formDefId.split('-')[2];
        $scope.queryBean.formDefId = $scope.formDefId.split('-')[1];
        $scope.queryBean.pNodeName = $scope.activeTab;
        if ($scope.sjlw == $scope.queryBean.groupId) {
            $scope.selectedDocType = false;
        } else {
            $scope.selectedDocType = true;
        }
        $scope.queryBean.formDefIds = [];
        if ('xxx-xxx-allshouwen' == $scope.formDefId) {
            $scope.queryBean.formDefId = $scope.formDefIdall;
            $scope.queryBean.formDefIds = $scope.formDefIdall.split('|');
        } else {
            $scope.queryBean.formDefIds.push($scope.queryBean.formDefId);
        }

        SysUtils.requestByJson("/rProcessInstance/queryListShouWen", $scope.queryBean, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                $scope.proInstList = resultInfo.beanList;
                console.log($scope.proInstList);
                $scope.paginationConf.totalItems = resultInfo.totalRows;
                if ("shouwenDW" == detail) {
                    $('#' + detail).modal('hide');
                    var bacStrStatus = $scope.queryBean.strStatus;
                    $scope.queryBean = {paging: 'Yes', strStatus: bacStrStatus};
                }
                $scope.$apply();
                $scope.calculatedHeight();
            })
        });
    };


    $scope.openCreateProInstDialog = function () {
        $scope.proInst = {};
        var param = {ids: []};
        if (SysUtils.isEmpty($scope.shouwenTypes) || $scope.shouwenTypes.length === 0) {
            swal("您没有权限创建，请联系管理员", "", "info");
            return;
        }
        angular.forEach($scope.shouwenTypes, function (data) {
            param.ids.push(data.id);
        });

        SysUtils.silenceWithAuthAjax("/processDefVersion/querySwdlTemplate", param, function (resultInfo) {
            $scope.activeProcVersionList = resultInfo.beanList;
            $scope.activeProcVersionList.forEach(function (v) {
                if (-1 != $scope.formDefId.indexOf(v.processDefId)) {
                    $scope.proInst.processVersionId = v.id;
                }
            });

            if (!SysUtils.notEmpty($scope.proInst, ['processVersionId'])) {
                $scope.proInst.processVersionId = $scope.activeProcVersionList[0].id;
            }

            $scope.$apply();
            $('#createProInstDialog').modal('show');
        });
    };

    $scope.processVersionIdCg = function () {
        var tempformDefId = "empt_";
        $scope.activeProcVersionList.forEach(function (v) {
            if (v.id == $scope.proInst.processVersionId) {
                tempformDefId = v.processDefId;
            }
        })
        $scope.shouwenTypes.forEach(function (v) {
            if (-1 != v.idDefIdGroupId.indexOf(tempformDefId)) {
                $scope.formDefId = v.idDefIdGroupId;
            }
        });
        $scope.$applyAsync();
    };

    $scope.saveProInst = function () {
        SysUtils.silenceWithAuthAjax("/rProcessInstance/create", $scope.proInst, function (resultInfo) {
            $rootScope.reNewBtn = "directQuery";
            window.open(ENV.localapi + "/index.html#!/officialDocuments/" + resultInfo.additionalInfo.formDefId + "/" + resultInfo.additionalInfo.currentTuskId, resultInfo.additionalInfo.currentTuskId);
            $('#createProInstDialog').modal('hide');
            $scope.initPaging();
        });
    };


    $scope.gotoDetail = function (proInst) {
        $rootScope.reNewBtn = "directQuery";
        var defId = proInst.formDefId;
        var _window;
        if (!SysUtils.isEmpty(childWindowMap[proInst.id])) {
            childWindowMap[proInst.id].close();
        }
        if ("currentTask" == proInst.initType) {
            //console.log(ENV.localapi + "/index.html#!/formEditGeneric/" + defId + "/" + proInst.taskId);
            _window = window.open(ENV.localapi + "/index.html#!/officialDocuments/" + defId + "/" + proInst.taskId, proInst.taskId);
        } else {
            _window = window.open(ENV.localapi + "/index.html#!/officialDocuments/" + defId + "/-" + proInst.id, proInst.id);
        }
        childWindowMap[proInst.id] = _window;
    };


    $scope.showDetail = function (detail) {
        $('#' + detail).modal('show');
        // SysUtils.requestByJson("/rProcessInstance/init?initType=query", {}, function (resultInfo) {
        //     $scope.queryBean = resultInfo.bean;
        //     $scope.queryBean.pageNo = 1;
        //     $scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
        //     $('#' + detail).modal('show');
        // });
    };

    $scope.queryProInstListChangeBean = function (detail) {
        $scope.initPaging();
        $scope.queryProInstList(detail)
    };

    $scope.delete = function (proInst) {
        proInst.state = 'Delete';
        SysUtils.swalConfirm("提示", "是否删除此记录", "info", function (isConfirm) {
            if (isConfirm) {
                SysUtils.requestByJson('/rProcessInstance/update', proInst, function (resultInfo) {
                    SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                        $scope.queryProInstList();
                    })
                })
            }
        });
    };

    $scope.formDefId = 'xxx-xxx-allshouwen';
    $scope.choseCandate = function (currNode) {
        $scope.activeTab = currNode;

        switch (currNode) {
            case 'swcl':
                $scope.queryBean.strStatus = 'NotAccepted,Accepted';
                break;
            case 'swdl':
                $scope.queryBean.strStatus = 'Accepted';
                break;
        }

        $scope.formDefId = 'xxx-xxx-allshouwen';

        $scope.formDefIdall = $scope.shouwenTypes[$scope.shouwenTypes.length - 1].formDefId;
        $scope.homeListRenewId = currNode;
        $rootScope.reNewBtn = "directQuery";
        $scope.$applyAsync();
        $scope.initShouWenTypes();
    };

    $scope.initParamsAndQuery = function () {
        $scope.setFormPath();
        $scope.$applyAsync();
        $scope.initPaging();
        $scope.pageAuto();
    };

    $scope.setFormPath = function () {
        $scope.formpath = $scope.formTempPath + $scope.activeTab + ".html";
    };

    $scope.initPaging = function () {
        $scope.paginationConf.currentPage = 1;
        $scope.paginationConf.totalItems = -1;
        $scope.paginationConf.itemsPerPage = 10;

        $scope.$applyAsync();
    };

    $scope.setFormPath();

    $scope.pageAuto = function () {
        $scope.queryBean.totalRows = $scope.paginationConf.totalItems;
        $scope.queryBean.pageNo = $scope.paginationConf.currentPage;
        $scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
        // $scope.setStatus($scope.activeTab);
        $scope.queryProInstList($scope.activeTab);
    };

    /**
     * 未办
     */
    $scope.queryProInstNotAccepted = function () {
        $scope.initPaging();
        $scope.queryBean.totalRows = $scope.paginationConf.totalItems;
        $scope.queryBean.pageNo = $scope.paginationConf.currentPage;
        $scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
        $scope.ngDisableDelete = false;
        $scope.dlDisableDelete = false;
        $scope.qzDisableDelete = false;
        $scope.queryBean.strStatus = 'NotAccepted';
        $scope.queryProInstList($scope.activeTab)
    };

    /**
     * 在办
     */
    $scope.queryProInstAccepted = function () {
        $scope.initPaging();
        $scope.queryBean.totalRows = $scope.paginationConf.totalItems;
        $scope.queryBean.pageNo = $scope.paginationConf.currentPage;
        $scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
        $scope.ngDisableDelete = false;
        $scope.dlDisableDelete = false;
        $scope.qzDisableDelete = false;
        $scope.queryBean.strStatus = 'Accepted';
        $scope.ngHandled = true;
        $scope.queryProInstList($scope.activeTab)
    };

    /**
     * 已办
     */
    $scope.queryProInstHandled = function () {
        $scope.initPaging();
        $scope.disabled = true;
        $scope.queryBean.totalRows = $scope.paginationConf.totalItems;
        $scope.queryBean.pageNo = $scope.paginationConf.currentPage;
        $scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
        $scope.ngDisableDelete = true;
        $scope.dlDisableDelete = true;
        $scope.qzDisableDelete = true;
        $scope.qzReForm = false;
        $scope.qfTime = '办结时间';
        $scope.ngHandled = false;
        $scope.queryBean.strStatus = 'Handled';
        $scope.queryProInstList($scope.activeTab);
    };

    $scope.showExportDialog = function () {
        $scope.proInst = {};
        SysUtils.requestByJson('/dicType/getDicTypesByDicModeName/' + $scope.modeName, {}, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                $scope.dicTypes = resultInfo.beanList;
                $scope.$apply();
                $("#exportDialog").modal('show');
            })
        })
    };

    /**
     * 上级来文导出
     */
    $scope.doExport = function () {
        console.log($scope.proInst.dicTypeId);
        $scope.queryBean = {paging: 'No'};
        $scope.queryBean.dicTypeId = $scope.proInst.dicTypeId;
        if (typeof $scope.queryBean.dicTypeId == 'undefined' || $scope.queryBean.dicTypeId == '') {
            SysUtils.swalForTips("提示", "请选择模板", "info", function (isConfirm) {
            });
            return;
        }
        $("#exportDialog").modal('hide');
        $scope.queryBean.groupId = $scope.sjlw;
        $scope.queryBean.pdmId = $scope.formDefId.split('-')[0];
        $http({
            url: "/rProcessInstance/doExport",
            method: "POST",
            data: $scope.queryBean,
            headers: {
                "Content-type": "application/json"
            },
            responseType: "arraybuffer"
        }).then(function (data, status, headers, config) {
            var blob = new Blob([data.data], {type: "application/vnd.ms-excel"});
            var filename = "上级来文记录.xls";
            if (window.navigator.msSaveOrOpenBlob) {// For IE:
                navigator.msSaveBlob(blob, filename);
            } else {
                var objectUrl = URL.createObjectURL(blob);
                var a = document.createElement('a');
                document.body.appendChild(a);
                a.setAttribute('style', 'display:none');
                a.setAttribute('href', objectUrl);
                a.setAttribute('download', filename);
                a.click();
                URL.revokeObjectURL(objectUrl);
            }
        })
    };

    $scope.setStatus = function (currNode) {
        switch (currNode) {
            case 'swcl':
                $scope.queryBean.strStatus = 'NotAccepted,Accepted';
                break;
            case 'swdl':
                $scope.queryBean.strStatus = 'Accepted';
                break;
        }
    };


    $scope.shouwenTypesSwcl = [];
    $scope.shouwenTypesSwdl = [];
    $scope.initShouWenTypes = function () {
        if ("swcl" == $scope.activeTab && SysUtils.notEmpty($scope.shouwenTypesSwcl, [])) {
            $scope.shouwenTypes = $scope.shouwenTypesSwcl;
            $scope.formDefIdall = $scope.shouwenTypes[$scope.shouwenTypes.length - 1].formDefId;
            $scope.initParamsAndQuery();

        } else if ("swdl" == $scope.activeTab && SysUtils.notEmpty($scope.shouwenTypesSwdl, [])) {
            $scope.shouwenTypes = $scope.shouwenTypesSwdl;
            $scope.formDefIdall = $scope.shouwenTypes[$scope.shouwenTypes.length - 1].formDefId;
            $scope.initParamsAndQuery();

        } else {
            SysUtils.requestByJson("/processDefManage/initShouWenTypes", {pNodeName: $scope.activeTab}, function (resultInfo) {
                SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                    $scope.shouwenTypes = resultInfo.beanList;
                    $scope.formDefIdall = $scope.shouwenTypes[$scope.shouwenTypes.length - 1].formDefId;
                    if ("swdl" == $scope.activeTab) {
                        $scope.shouwenTypesSwdl = resultInfo.beanList;
                    } else {
                        $scope.shouwenTypesSwcl = resultInfo.beanList;
                    }
                    $scope.initParamsAndQuery();
                });
            });
        }
    };
    $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.pageAuto);
    /**
     * 允许来文重复
     * @param proInst
     */
    $scope.doAllowRepeated = function (proInst) {
        $scope.queryBean = proInst;
        $scope.queryBean.allowRepeated = 'Allow';
        SysUtils.requestByJson('/rProcessInstance/update', $scope.queryBean, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                $scope.queryProInstList($scope.activeTab);
            })
        })
    };

    $scope.checkStatus = function (status) {
        var flag = false;
        if ($scope.selectedDocType) {
            $scope.queryBean.strStatus.split(",").forEach(function (sta) {
                if (status == sta) {
                    flag = true;
                }
            });
        }
        return flag;
    };

    $scope.selectProInst = function () {
        var groupId = $scope.formDefId == '' ? $scope.currGroupId : $scope.formDefId.split('-')[2];

        $scope.initPaging();
        $scope.queryBean.totalRows = $scope.paginationConf.totalItems;
        $scope.queryBean.pageNo = $scope.paginationConf.currentPage;
        $scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;

        if ($scope.sjlw == groupId) {
            $scope.queryBean.strStatus = "Accepted,Handled";
        } else {
            $scope.queryBean.strStatus = "Accepted";
        }

        $scope.queryProInstList();
    };

    /*************************三、初始化调用****************************/
    /*计算布局高度*/
    $scope.calculatedHeight = function () {
        $('.content-wrapper').css('height', SysUtils.get_content_wrapper());
        //console.log("=ceter_p=="+$('#ceter_p').height());
        $('#panel-body-table').css('height', $('.content').height() - $('#panel-heading').outerHeight(true) - $('#bmxx_tit').height());
        $('.table_shadow').css('max-height', $('.content').height() - $('#panel-heading').outerHeight(true) - $('#ceter_p').outerHeight() - $('#bmxx_tit').height());
    }
/*
    setTimeout(function () {
        //console.log("第三次"+$('#bmxx_tit').innerHeight());
        $scope.calculatedHeight();
    }, 500);*/

    /* var window_height = $(window).height();
     var heightList=[];
     heightList.push($('.main-header').outerHeight());
     heightList.push($('.panel-heading').outerHeight(true));
     var resultHeight=maxHeigtTool.maxHeigt(window_height,heightList);
     console.log(heightList);
     console.log(resultHeight);
     $('.panel-body').css('max-height', resultHeight);
     $('.panel-body').css('height', resultHeight);*/
    $scope.initShouWenTypes();
}]);