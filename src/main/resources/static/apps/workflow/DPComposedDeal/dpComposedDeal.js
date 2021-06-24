myApp.controller('DPComposedDealListCtrl', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils', 'maxHeigtTool', function ($rootScope, $scope, ENV, $state, SysUtils, maxHeigtTool) {

    console.log('人大政协');
    /*************************一、变量定义****************************/
    $rootScope.addBgground = true;
    $scope.queryBean = {paging: 'Yes',groupId:'handlingwork',dbParams:{}};
    $scope.proInstList = [];
    //$scope.currGroupId = 'handlingwork';
    $scope.formPath = null;
    $scope.formTempPath = "apps/workflow/DPComposedDeal/";
    $scope.activeTab = "bn";
    $scope.homeListRenewId = $scope.activeTab;
    $rootScope.reNewBtn = "directQuery";
    $scope.hiddenStatus = '';
    $scope.selectedDocType = true;
    $scope.modeName = 'SelectModalRsv1';
    $scope.sjlw = 'handlingwork';
    $scope.formDefId = '';
    $scope.ommonField={
        wenyin:false
    };
    var childWindowMap = {};//存储已经打开的窗口

    $scope.paginationConf = {
        currentPage: 1,
        totalItems: -1,
        itemsPerPage: 10,
        pagesLength: 13,
        perPageOptions: [10, 20, 30, 40, 50]
    };
    /**
     * 字典初始化
     */
    $scope.dicMod={
        leibie:[
                {name: '全部', val: ''},
                {name: '财经', val: 'caijing'},
                {name: '工业', val: 'gongye'}
                ],
        wenleibie:[
            {name: '全部', val: ''},
            {name: '长城电子办理人', val: 'npcHandling'},
            {name: '长城电子办理协', val: 'dpComposedDeal'}
        ],
        banjie:[
            {name: '全部', val: ''},
            {name: '分办', val: 'npcHandling'},
            {name: '审核', val: 'npcHandling'},
            {name: '承办', val: 'npcHandling'},
            {name: '协办', val: 'dpComposedDeal'},
            {name: '文印', val: 'npcHandling'}
        ],
        jieguo:[
            {name: '全部', val: ''},
            {name: '解决采纳', val: 'npcHandling'},
            {name: '正在解决', val: 'npcHandling'},
            {name: '计划解决', val: 'npcHandling'},
            {name: '留作参考', val: 'dpComposedDeal'},
            {name: '难以解决', val: 'npcHandling'}
        ],
        rdzhuangtai:[
            {name: '全部', val: ''},
            {name: '登录', val: '登录'},
            {name: '审核', val: '审核'},
            {name: '审批', val: '审批'},
            {name: '办理', val: '办理'},
            {name: '转报批', val: '转报批'}
        ],
        bpzhuangtai:[
            {name: '全部', val: ''},
            {name: '拟稿', val: '拟稿'},
            {name: '处长意见', val: '处长意见'},
            {name: '预审', val: '预审'},
            {name: '审核', val: '审核'},
            {name: '审批', val: '审批'},
            {name: '排版', val: '排版'},
            {name: '签章', val: '签章'},
            {name: '文印', val: '文印'}
        ],
    }
    /*************************二、函数定义****************************/
    /*查询当前用户登录的收文*/
    $scope.queryProInstList = function (detail) {
        console.log($scope.formDefId);
        $scope.proInstList = [];
        //$scope.queryBean.groupId = $scope.currGroupId;
        //$scope.queryBean.formDefId = $scope.formDefId;
        /*if ($scope.sjlw == $scope.queryBean.groupId) {
            $scope.selectedDocType = false;
        } else {
            $scope.queryBean.formDefId = '';
            $scope.selectedDocType = true;
        }*/

        SysUtils.requestByJson("/rProcessInstance/queryHandlingworkList", $scope.queryBean, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                $scope.proInstList = resultInfo.beanList;
                console.log($scope.proInstList);
                $scope.paginationConf.totalItems = resultInfo.totalRows;
                $scope.hiddenStatus = $scope.queryBean.strStatus;
                if (!SysUtils.isEmpty(detail)){
                    $('#' + detail).modal('hide');
                }
                $scope.$apply();
            })
        })
    };

    $scope.openCreateProInstDialog = function () {

        $scope.proInst = {};

        var param = {ids: []};
        if (SysUtils.isEmpty($scope.handlingWorkTypes) || $scope.handlingWorkTypes.length === 0) {
            swal("您没有权限创建，请联系管理员", "", "info");
            return;
        }
        angular.forEach($scope.handlingWorkTypes, function (data) {
            param.ids.push(data.id);
        });
        SysUtils.silenceWithAuthAjax("/processDefVersion/querySwdlTemplate", param, function (resultInfo) {
            $scope.activeProcVersionList = resultInfo.beanList;
            $scope.proInst.processVersionId = $scope.activeProcVersionList[0].id;
            $scope.$apply();
            $('#createProInstDialog').modal('show');
        });
    };

    $scope.saveProInst = function () {
        SysUtils.silenceWithAuthAjax("/rProcessInstance/create", $scope.proInst, function (resultInfo) {
            $rootScope.reNewBtn = "directQuery";
            window.open(ENV.localapi + "/index.html#!/officialDocuments/" + resultInfo.additionalInfo.formDefId + "/" + resultInfo.additionalInfo.currentTuskId, resultInfo.additionalInfo.currentTuskId);
            $('#createProInstDialog').modal('hide');
        });
    };


    $scope.gotoDetail = function (proInst) {
        $rootScope.reNewBtn = "directQuery";
        var defId = proInst.formDefId;
        var _window;
        if (!SysUtils.isEmpty(childWindowMap[proInst.id])) {
            childWindowMap[proInst.id].close();
        }
        if ($scope.hiddenStatus.indexOf('NotAccepted') >= 0 || $scope.hiddenStatus.indexOf('Accepted') >= 0) {
            //console.log(ENV.localapi + "/index.html#!/formEditGeneric/" + defId + "/" + proInst.taskId);
            _window = window.open(ENV.localapi + "/index.html#!/officialDocuments/" + defId + "/" + proInst.taskId,proInst.taskId);
        } else {
            _window = window.open(ENV.localapi + "/index.html#!/officialDocuments/" + defId + "/-" + proInst.id,proInst.id);
        }
        childWindowMap[proInst.id] = _window;
    };


    $scope.showDetail = function (detail) {
        $scope.queryBean = {paging: 'Yes',groupId:'handlingwork',dbParams:{}};
        $('#' + detail).modal('show');
    };

    /*$scope.queryProInstListChangeBean = function (detail) {
        $scope.initPaging();
        $scope.queryBean.strStatus = $scope.hiddenStatus;
        $scope.queryProInstList(detail)
    };*/

    $scope.delete = function (proInst) {
        SysUtils.swalConfirm("提示", "是否删除此记录", "info", function (isConfirm) {
            if (isConfirm) {
                $scope.queryBean = proInst;
                $scope.queryBean.state = 'Delete';
                SysUtils.requestByJson('/rProcessInstance/update', $scope.queryBean, function (resultInfo) {
                    SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                        $scope.choseCandate($scope.activeTab);
                    })
                })
            }
        });
    };

    $scope.choseCandate = function (currNode) {
        /*if ('swcl' == currNode) {
            $scope.formDefId = '';
        }*/
        $scope.activeTab = currNode;
        $scope.homeListRenewId = currNode;
        $rootScope.reNewBtn = "directQuery";
        $scope.$applyAsync();
        $scope.initParamsAndQuery();
        $scope.calculatedHeight();
    };

    $scope.initParamsAndQuery = function () {
        $scope.queryBean = {paging: 'Yes',groupId:'handlingwork',dbParams:{}};//初始化查询参数
        $scope.setFormPath();
        $scope.$applyAsync();
        $scope.initPaging();
        $scope.pageAuto();
    };

    $scope.setFormPath = function () {
        $scope.formPath = $scope.formTempPath + $scope.activeTab + ".html";
        console.log($scope.formPath);
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
        $scope.setStatusAndPNodeName($scope.activeTab);
        $scope.queryProInstList($scope.activeTab);
    };

    $scope.queryWorkApproved = function (detail) {
        $scope.initPaging();
        $scope.queryBean.totalRows = $scope.paginationConf.totalItems;
        $scope.queryBean.pageNo = $scope.paginationConf.currentPage;
        $scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
        $scope.setStatusAndPNodeName($scope.activeTab);
        $scope.queryProInstList(detail);

    }

    $scope.queryProInstNotAccepted = function () {
        $scope.ngDisableDelete = false;
        $scope.dlDisableDelete = false;
        $scope.qzDisableDelete = false;
        $scope.queryBean.strStatus = 'NotAccepted';
        $scope.queryProInstList($scope.activeTab)
    };

    $scope.queryProInstAccepted = function () {
        $scope.ngDisableDelete = false;
        $scope.dlDisableDelete = false;
        $scope.qzDisableDelete = false;
        $scope.queryBean.strStatus = 'Accepted,NotAccepted';
        $scope.ngHandled = true;
        $scope.queryProInstList($scope.activeTab)
    };

    $scope.queryProInstHandled = function () {
        $scope.disabled = true;
        $scope.queryBean = {paging: 'Yes',groupId:'handlingwork',dbParams:{}};//初始化查询参数
        $scope.ngDisableDelete = true;
        $scope.dlDisableDelete = true;
        $scope.qzDisableDelete = true;
        $scope.qzReForm = false;
        $scope.qfTime = '办结时间';
        $scope.ngHandled = false;
        $scope.queryBean.strStatus = 'Handled';
        $scope.hiddenStatus='Handled';
        $scope.queryWorkApproved();
    };

    /*$scope.showExportDialog = function () {
        $scope.proInst = {};
        SysUtils.requestByJson('/dicType/getDicTypesByDicModeName/' + $scope.modeName, {}, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                $scope.dicTypes = resultInfo.beanList;
                $scope.$apply();
                $("#exportDialog").modal('show');
            })
        })
    };*/



    $scope.setStatusAndPNodeName = function (currNode) {
        var hiddenStatus = $scope.hiddenStatus;

        switch (currNode) {
            case 'bn':
                $scope.queryBean.strStatus = hiddenStatus == '' ? 'NotAccepted,Accepted' : hiddenStatus;
                $scope.queryBean.pNodeName = 'swcl';
                break;
            case 'dl':
                $scope.queryBean.strStatus = hiddenStatus == '' ? 'Accepted' : hiddenStatus;
                $scope.queryBean.pNodeName = 'swdl';
                break;
            case 'wy':
                $scope.queryBean.strStatus = "";
                $scope.queryBean.pNodeName = 'swcl';
                break;

        }
    };
    

    $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.pageAuto);

    $scope.initShouWenTypes = function () {
        SysUtils.requestByJson("/processDefManage/initCreateRecordByRole", {proDefGroupId:"handlingwork",flag:'1'}, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                $scope.handlingWorkTypes = resultInfo.beanList;
                if(resultInfo.additionalInfo!=null&&resultInfo.additionalInfo.containWenyin){
                    /*给文印单独角色开一个查询，只能查看文的权限*/
                    $scope.ommonField.wenyin=true;
                }else{
                    $scope.ommonField.wenyin=false;
                }

                //console.log($scope.handlingWorkTypes);
                $scope.$apply();
            })
        })
    };

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
        $scope.hiddenStatus.split(",").forEach(function (sta) {
            if (status == sta) {
                flag = true;
            }
        });
        return flag;
    };

    $scope.initDetaiTable = function (theCommonFormInfo) {
        var str = theCommonFormInfo.formDetailType;
        /*if(str=="npcHandling"){
            str = "dpComposedDeal";
        }*/
        return ('form' + str[0].toUpperCase() + str.substring(1, str.length));
    }

    /*************************三、初始化调用****************************/
    /*计算布局高度*/
    $scope.calculatedHeight = function () {
        $('.content-wrapper').css('height', SysUtils.get_content_wrapper());
        //console.log("=ceter_p=="+$('#ceter_p').height());
        $('#panel-body-table').css('height', $('.content').height() - $('#panel-heading').outerHeight(true) - $('#bmxx_tit').height());
        $('.table_shadow').css('max-height', $('.content').height() - $('#panel-heading').outerHeight(true) - $('#ceter_p').outerHeight() - $('#bmxx_tit').height());
    }

    setTimeout(function () {
        //console.log("第三次"+$('#bmxx_tit').innerHeight());
        $scope.calculatedHeight();
    }, 500);
    $scope.initShouWenTypes();

}]);

