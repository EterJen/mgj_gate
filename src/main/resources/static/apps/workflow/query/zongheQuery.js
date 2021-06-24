myApp.controller('zongheQueryCtrl', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils', '$timeout', 'maxHeigtTool', function ($rootScope, $scope, ENV, $state, SysUtils, $timeout, maxHeigtTool) {

    console.log('综合查询');
    $rootScope.addBgground = true;
    $scope.queryBean = {paging: 'Yes'};
    $scope.queryPrintBean = {paging: 'Yes'};
    $scope.countQueryBean = {paging: 'Yes'};
    $scope.proInstList = [];
    $scope.currGroupId = 'difcommitteeShouWen';
    $scope.formPath = null;
    $scope.formTempPath = "apps/workflow/query/";
    $scope.orgNavType = "difcommitteeShouWen";
    $scope.homeListRenewId = "zhcx" + $scope.orgNavType;
    // $rootScope.reNewBtn = $scope.homeListRenewId;
    $rootScope.reNewBtn = "directQuery";
    var childWindowMap = {};//存储已经打开的窗口
    $scope.hasArchiveRole = false;//判断用户是否有"档案归档"角色
    $scope.rdzxTypy = "all";
    $scope.pro = null;

    $scope.isFinisheds = [
        {key: '', val: '全部'},
        {key: 'Active', val: '在办'},
        {key: 'Finished', val: '已办结'}
    ];
    $scope.duwenisFinisheds = [
        {key: '', val: '全部'},
        {key: 'Active', val: '未完成'},
        {key: 'Finished', val: '已完成'}
    ];
    $scope.duwenImportance = [
        {key: '', val: '全部'},
        {key: 'true', val: '重要'},
        {key: 'false', val: '不重要'}
    ];

    $scope.docTypelist = [
        {id: 'difcommitteeShouWen', val: '全部公文'},
        {id: 'xzAll', val: '行政公文'},
        {id: 'dwAll', val: '党委公文'},
        {id: 'shouwen', val: '收文查询'},
        {id: 'fawen', val: '发文查询'},
        {id: 'duwen', val: '督文查询'},
        {id: 'lhfawen', val: '联合发文'},
        {id: 'xinhan', val: '信函报批'},
        {id: 'rdzx', val: '人大政协'},
        {id: 'shangjilaiwen', val: '上级来文'},
    ];
    $scope.formDefIds = [];
    $scope.formDefIdsObj = {
        shouwen: [
            {val: '全部', key: ''},
            {val: '长城电子党委收文', key: 'jxwdwshouwen'},
            {val: '长城电子收文', key: 'jxwshouwen'}
        ],
        xzAll: [
            {val: '长城电子收文', key: 'jxwshouwen'},
            {val: '长城电子发文', key: 'fawen'},
            {val: '长城电子信函', key: 'jxwxinhan'},
            {val: '工作报批', key: 'workapproved'},
            {val: '长城电子督文', key: 'jxwduwen'},
        ],
        dwAll: [
            {val: '长城电子党委收文', key: 'jxwdwshouwen'},
            {val: '长城电子党委发文', key: 'jxwdwfawen'},
            {val: '长城电子党委信函', key: 'jxwdwxinhan'},
            {val: '党委工作报批', key: 'partyapproved'},
            {val: '长城电子党委督文', key: 'jxwdwduwen'},
        ],
        fawen: [
            {val: '全部', key: ''},
            {val: '长城电子发文', key: 'fawen'},
            {val: '长城电子党委发文', key: 'jxwdwfawen'},
            {val: '长城电子规范发文', key: 'hjxgffawen'},
            {val: '无管局发文', key: 'wuguanju'},
        ],
        shangjilaiwen: [
            {val: '全部', key: ''},
            {val: '中央文件（甲）', key: 'jywjj'},
            {val: '市委文件（乙）', key: 'jywjy'},
            {val: '市府文件（丙）', key: 'jywjb'},
            {val: '国务院文件（国）', key: 'jywjg'}
        ],
        xinhan: [
            {val: '全部', key: ''},
            {val: '长城电子信函', key: 'jxwxinhan'},
            {val: '长城电子党委信函', key: 'jxwdwxinhan'},
            {val: '工作报批', key: 'workapproved'},
            {val: '党委工作报批', key: 'partyapproved'},
            {val: '机关党委工作报批', key: 'officepartyapproved'},
            {val: '外事报批', key: 'otherapproved'},
            {val: '合同报批', key: 'contractapproved'},
            {val: '委内文稿审核', key: 'draftapproved'},
            {val: '因公出国政审报批', key: 'ygcgzsbaopi'},
            {val: '因私出国(境)审批', key: 'yscgjshengpi'},
        ],
        lhfawen: [
            {val: '全部', key: ''},
            {val: '联合发文', key: 'lhfawen'},
        ],
        duwen: [
            {val: '全部', key: ''},
            {val: '长城电子督文', key: 'jxwduwen'},
            {val: '长城电子党委督文', key: 'jxwdwduwen'},
        ],
        rdzx: [
            {val: '全部', key: ''},
            {val: '长城电子办理人', key: 'npcHandling'},
            {val: '长城电子办理协', key: 'dpComposedDeal'},
        ],
        rdbp: [
            {val: '全部', key: ''},
            {val: '人大报批', key: 'blyjbprd'},
            {val: '政协报批', key: 'blyjbpzx'},
        ],
        zxType: [
            {val: '人大政协', key: 'rdzx'},
            {val: '关联报批', key: 'rdbp'},
        ]
    };
    $scope.countformDefIdsObj = {
        SecurityLevelList: [],
        proInstPrintList: [],
        countNumber: {},
        shouwen: {
            title: '收文统计',
            situation: '收文情况统计'
        },
        fawen: {
            title: '发文统计',
            situation: '发文情况统计'
        },
        shangjilaiwen: {
            title: '收文统计',
            situation: '收文情况统计'
        },
        wngk: [
            {val: '所有', key: ''},
            {val: '是', key: 'yes'},
            {val: '否', key: 'no'},
        ],
        dwgk: [
            {val: '所有', key: ''},
            {val: '主动公开', key: 'zdgk'},
            {val: '依法申请公开', key: 'ysqgk'},
            {val: '不予公开', key: 'bygk'},
        ]

    };

    $scope.showSecondLevel = {
        export: ["shouwen", "fawen", "shangjilaiwen", "xinhan", "lhfawen"],
        statistics: ["shouwen", "fawen", "shangjilaiwen"],
        printing: ["shouwen", "fawen", "rdzx"]/*,"shangjilaiwen"*/,
        renewInstance: ["lhfawen"]/*,"shangjilaiwen"*/
    };

    $scope.currGroupIdChg = function () {
        if ($scope.currGroupId != 'all') {
            $scope.formDefIds = $scope.formDefIdsObj[$scope.currGroupId];
        }
    };
    $scope.renewInstance = function () {
        if (SysUtils.notEmpty($scope.activeProinst, [])) {
            $scope.postInstance = {};
            $scope.postInstance.id = $scope.activeProinst.id;
            $scope.postInstance.title = $scope.activeProinst.title;
            $scope.postInstance.docFullName = $scope.activeProinst.docFullName;

            $('#' + $scope.orgNavType + 'rim').modal('show');
        } else {
            swal("提示", "请先选中一条公文记录在进行修改操作", "info");
        }
    }
    $scope.renewInstanceBz = function () {
        SysUtils.requestByJson("/rProcessInstance/updateSelective", $scope.postInstance, function (resultInfo) {
            $scope.queryProInstList();
            $('#' + $scope.orgNavType + 'rim').modal('hide');
        })
    }
    /**
     * 二级按钮展示或者隐藏
     * @param type
     */
    $scope.isShowButton = function (type) {
        if ($scope.showSecondLevel[type].indexOf($scope.orgNavType) >= 0) {
            return true;
        } else {
            return false;
        }
    };
    $scope.showBtn = function (type) {
        switch (type) {
            case "delete":
                if (SysUtils.notEmpty($scope.currentUser, ['fawenDenLu']) && $scope.orgNavType == "fawen") {
                    return true;
                } else if (SysUtils.notEmpty($scope.currentUser, ['shouWenDenLu']) && ($scope.orgNavType == "xinhan" || $scope.orgNavType == "duwen" || $scope.orgNavType == "shouwen")) {
                    return true;
                }
                return false;
                break;
            case "wngkSearch":
                if ("lhfawen" == $scope.currGroupId) {
                    return false;
                } else if (SysUtils.notEmpty($scope.currentUser, ['secretRelated'])) {
                    return true;
                } else {
                    return false;
                }
                break;
        }
    };

    $scope.wngkSearchBtn = {no: {show: "未发布", val: "否"}, yes: {show: "发布", val: "是"}};
    $scope.wngkSearchBtnKey = "no";
    $scope.ngWngkSearchBtn = $scope.wngkSearchBtn[$scope.wngkSearchBtnKey];
    $scope.wngkSearch = function () {
        $scope.queryBean.wngk = $scope.ngWngkSearchBtn.val;
        $scope.queryProInstList();
        if ("no" == $scope.wngkSearchBtnKey) {
            $scope.wngkSearchBtnKey = "yes";
        } else {
            $scope.wngkSearchBtnKey = "no";
        }
        $scope.ngWngkSearchBtn = $scope.wngkSearchBtn[$scope.wngkSearchBtnKey];
    };


    $scope.activeProinst = {};
    $scope.cbClick = function (proInst) {
        $scope.proInstList.forEach(function (v) {
            if (v.id != proInst.id) {
                v.cbChosed = false;
            }
        });
        if (proInst.cbChosed) {
            proInst.cbChosed = false;
        } else {
            proInst.cbChosed = true;
        }
        if (proInst.cbChosed) {
            $scope.activeProinst = proInst;
        } else {
            $scope.activeProinst = {};
        }
    };
    $scope.deleteProInst = function () {
        SysUtils.swalConfirm("提示", "是否删除选中公文", "info", function (isConfirm) {
            if (isConfirm) {
                SysUtils.requestByJson("/rProcessInstance/safeDelet", $scope.activeProinst, function (resultInfo) {
                    $scope.queryProInstList();
                })
            }
        });

    };
    $scope.deleteProInstAble = function () {
        if (SysUtils.notEmpty($scope.activeProinst, [])) {
            return true;
        } else {
            return false;
        }
    }
    /**
     *统计类别类型
     * 类别查询现在只有收发文查询，后期可以扩展
     */
    $scope.countCategory = function (proDefGroupId) {
        var param = {paging: 'no', proDefGroupId: proDefGroupId, flag: 1};
        if (proDefGroupId === 'shouwen' || proDefGroupId === 'shangjilaiwen') {
            param.proDefGroupId = 'shouwenOrshangjilaiwen';
        }
        SysUtils.requestByJson("/processDefManage/list", param, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                $scope.countCategoryList = resultInfo.beanList;
                /*if (!SysUtils.isEmpty(detail)) {
                    $('#' + detail).modal('hide');
                }*/

                $scope.$apply();
            })
        });
    }

    $scope.showDetailCount = function () {
        $scope.countQueryBean = {paging: 'no'};
        $('#fawenCountModal').modal('show');
    }

    /**
     * 查询统计人大政协
     *
     */
    $scope.showRdzxCountModal = function () {
        SysUtils.requestByJson("/formDpComposedDeal/rdzxCount", $scope.queryBean, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                $('#rdzxCountModal').modal('show');
                $scope.countformDefIdsObj.rdzxCount = resultInfo.additionalInfo;
                //console.log(JSON.stringify(resultInfo.additionalInfo));
                $scope.$applyAsync();
            })
        });

    };

    /**
     * 查询统计对外公开和密集的字典项
     *
     */
    $scope.initDicType = function (modelName) {
        SysUtils.requestByJson("/dicMode/qTypesByModeName/" + modelName, {}, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                $scope.countformDefIdsObj.SecurityLevelList = resultInfo.beanList;
                $scope.$applyAsync();
            })
        });
    };
    $scope.initDicType('SecurityLevel');//密级

    /**
     * 统计文种信息
     */
    $scope.countDoctypeInformation = function () {
        //清空以前的数据
        $scope.countformDefIdsObj.countNumber = {};
        //如果选择全部则特殊处理
        console.log($scope.countQueryBean.formDefId);
        if ($scope.countQueryBean.formDefId == undefined || $scope.countQueryBean.formDefId == '' || $scope.countQueryBean.formDefId == null) {
            $scope.countQueryBean.proDefGroupId = $scope.orgNavType;
        } else {
            $scope.countQueryBean.proDefGroupId = null;
        }
        SysUtils.requestByJson("/rProcessInstance/countDoctypeInformation", $scope.countQueryBean, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                $scope.countformDefIdsObj.countNumber = resultInfo.bean;
                console.log($scope.countformDefIdsObj.countNumber);
                $('#fawenCountSituationModal').modal('show');
                $scope.$apply();
                //$scope.$applyAsync();
            })
        });
    }

    /**
     * 导出结果集
     */
    $scope.exportDoctypeInformation = function (type) {
        var url = "";
        var value = "";
        if (type == "InformationExport") {
            url = ENV.localapi + "/rProcessInstance/doCountDoctypeInformationExport";
            value = JSON.stringify($scope.countQueryBean);
        } else if (type == "ConditionListExport") {
            if ("lhfawen" == $scope.queryBean.groupId) {
                url = ENV.localapi + "/rProcessInstance/lhfwExport";
            } else {
                url = ENV.localapi + "/rProcessInstance/queryConditionListExport";
            }
            value = JSON.stringify($scope.queryBean);
        }
        var form = $("<form>");   //定义一个form表单
        form.attr('style', 'display:none');   //在form表单中添加查询参数
        form.attr('target', '');
        form.attr('method', 'post');
        form.attr('action', url);
        var input1 = $('<input>');
        input1.attr('type', 'hidden');
        input1.attr('name', 'selectedBean');
        input1.attr('value', value);
        $('body').append(form);  //将表单放置在web中
        form.append(input1);   //将查询参数控件提交到表单上
        form.submit();
    }

    $scope.paginationConf = {
        currentPage: 1,
        totalItems: -1,
        itemsPerPage: 10,
        pagesLength: 13,
        perPageOptions: [10, 20, 30, 40, 50],
        /*    onChange: function (event) {
         console.log(event);
         if (event == 'currentPage') {
         $scope.pageAuto();
         }
         }*/
    };

    $scope.paginationPrintConf = {
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

    $scope.initPrintPaging = function () {
        $scope.paginationPrintConf.currentPage = 1;
        $scope.paginationPrintConf.totalItems = -1;
        $scope.paginationPrintConf.itemsPerPage = 10;
        $scope.$applyAsync();
    }


    $scope.gotoDetail = function (task) {
        $scope.pro = task;
        // $rootScope.reNewBtn = $scope.homeListRenewId;
        $rootScope.reNewBtn = "directQuery";
        var formDefId = task.formDefId;
        if (!SysUtils.isEmpty(childWindowMap[task.id])) {
            childWindowMap[task.id].close();
        }
        var _window = window.open(ENV.localapi + "/index.html#!/officialDocuments/" + formDefId + "/-" + task.id);
        childWindowMap[task.id] = _window;
    }

    $scope.setFormPath = function () {
        var tempHtml = $scope.currGroupId;
        if ('difcommitteeShouWen' == $scope.currGroupId) {
            tempHtml = "all";
        }
        $scope.formPath = $scope.formTempPath + tempHtml + ".html";
    }

    $scope.xzAllFormDefIds = [
        'jxwshouwen', 'fawen', 'jxwxinhan', 'workapproved', 'jxwduwen'
    ];
    $scope.dwAllFormDefIds = [
        'jxwdwshouwen', 'jxwdwfawen', 'jxwdwxinhan', 'partyapproved', 'jxwdwduwen'
    ];
    $scope.queryBeanSwitch = function () {
        var groupId = $scope.currGroupId;
        switch (groupId) {
            case "xzAll":
                $scope.queryBean.formDefIds = $scope.xzAllFormDefIds;
                $scope.currGroupId = '';
                break;
            case "dwAll":
                $scope.queryBean.formDefIds = $scope.dwAllFormDefIds;
                $scope.currGroupId = '';
                break;
        }
    }


    $scope.queryProInstListChangeBean = function () {
        $scope.initPaging();
        $scope.queryBean.totalRows = $scope.paginationConf.totalItems;
        $scope.queryBean.pageNo = $scope.paginationConf.currentPage;
        $scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;

        $scope.queryBeanSwitch();

        $scope.queryProInstList();
    }

    /*$scope.queryProInstListPrintBean = function () {
        $scope.initPrintPaging();
        $scope.queryPrintBean.totalRows = $scope.paginationPrintConf.totalItems;
        $scope.queryPrintBean.pageNo = $scope.paginationPrintConf.currentPage;
        $scope.queryPrintBean.pageSize = $scope.paginationPrintConf.itemsPerPage;

        $scope.queryPrintProInstList();
    }*/

    $scope.enterKeyupAllTab = function (e) {
        var keycode = window.event ? e.keyCode : e.which;
        if (keycode == 13) {
            $scope.activeTypeDocs($scope.orgNavType);
        }
    }
    $rootScope.docNameOrTitle.aSearch = function (type) {
        $scope.choseCandate('all');
    }

    $scope.pageAutoInit = false;
    $scope.queryProInstList = function () {
        if (!$scope.pageAutoInit) {
            return;
        }
        $scope.proInstList = [];
        var detail = $scope.orgNavType + "Modal";
        if (detail == 'rdzx') {
            detail = $scope.rdzxTypy;
        }
        if (!($scope.currGroupId == 'all') && !($scope.currGroupId == 'difcommitteeShouWen')) {
            $scope.queryBean.groupId = $scope.currGroupId;
        } else {
            if (!SysUtils.notEmpty($rootScope.docNameOrTitle.b, [])) {
                if (SysUtils.notEmpty($rootScope.docNameOrTitle.a, [])) {
                    $rootScope.docNameOrTitle.b = $rootScope.docNameOrTitle.a;
                } else {
                    var docKey = SysUtils.getUrlParamByName("docKey");
                    if (SysUtils.notEmpty(docKey, [])) {
                        $rootScope.docNameOrTitle.b = decodeURI(docKey);
                        var shortURL = top.location.href.substring(0, top.location.href.indexOf('?'));
                        history.replaceState(null, null, shortURL)
                        $rootScope.docNameOrTitle.aSearch('all');
                    }
                }
            }
            $scope.$applyAsync();
        }

        if ($scope.rdzxTypy == "rdzx") {
            $scope.queryBean.formDefIds = ["npcHandling", "dpComposedDeal"];
            $scope.queryBean.groupId = "handlingwork";
        } else if ($scope.rdzxTypy == "rdbp") {
            $scope.queryBean.formDefIds = ["blyjbpzx", "blyjbprd"];
            $scope.queryBean.groupId = "handlingwork";
        }
        if (!SysUtils.notEmpty($scope.queryBean.docNameOrTitle)){
            $scope.queryBean.docNameOrTitle = $rootScope.docNameOrTitle.b;
        }

        /*本分类所有公文*/
        if ('thisTypeall'==$scope.docQueryType) {
            $scope.queryBean.formDefId = undefined;
        }
        SysUtils.requestByJson("/rProcessInstance/list", $scope.queryBean, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
//                console.log(resultInfo.bean);
                $scope.hasArchiveRole = resultInfo.bean.hasArchiveRole;
                $scope.proInstList = resultInfo.beanList;
                $scope.paginationConf.totalItems = resultInfo.totalRows;
                $scope.paginationConf.currentPage = resultInfo.bean.pageNo;
                if (!SysUtils.isEmpty(detail)) {
                    if ("difcommitteeShouWenModal" == detail) {
                        $('#' + 'allModal').modal('hide');
                    } else {
                        $('#' + detail).modal('hide');
                    }
                }
                $scope.$apply();
            })
        });
        $scope.docQueryType = '';
    }

    $scope.queryPrintProInstList = function () {
        if ($scope.currGroupId == 'difcommitteeShouWen') {
            return;
        }
        $scope.countformDefIdsObj.proInstPrintList = [];
        var detail = $scope.orgNavType + "PrintModal";
        if ($scope.currGroupId != 'all') {
            $scope.queryPrintBean.groupId = $scope.currGroupId;
        }
        SysUtils.requestByJson("/rProcessInstance/queryPrintProInstList", $scope.queryPrintBean, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                $scope.countformDefIdsObj.proInstPrintList = resultInfo.beanList;
                $scope.paginationPrintConf.totalItems = resultInfo.totalRows;
                $scope.paginationPrintConf.currentPage = resultInfo.bean.pageNo;
                $('#' + detail).modal('show');
                $scope.$apply();
            })
        });
    }

    $scope.collectionPros = function (index) {
        var pro = $scope.proInstList[index];
        if (pro.collection) {
            $scope.proInstList[index].collection = false;
        } else {
            $scope.proInstList[index].collection = true;

        }
        SysUtils.requestByJson('/rProcessInstance/insertMycollection', pro, function (r) {
            /*if($scope.proInstList[index].collection){
                SysUtils.swalTimer("提示","关注成功！","success");
            }else{
                SysUtils.swalTimer("提示","取消关注成功！","success");
            }*/
            $scope.queryProInstList();
        })
        /*SysUtils.swalConfirm("提示","是否取消收藏","info",function(isConfirm){
            if(isConfirm){

            }
        });*/
    }

    $scope.createBatch = function () {
        SysUtils.requestByJson("/rProcessInstance/createBatch", $scope.queryBean, function (resultInfo) {
        })
    }
    $scope.initParamsAndQuery = function (groupId) {
        $scope.activeProinst = {}
        $scope.queryBean = {paging: 'Yes'};//初始化查询参数
        $scope.currGroupId = groupId;
        $scope.setFormPath();
        $scope.$applyAsync();
        $scope.initPaging();
        $scope.initPrintPaging();
        $scope.queryBeanInitAuto();
        $scope.pageAuto();
    }

    $scope.setFormPath();

    $scope.queryBeanInitAuto = function () {
        if (SysUtils.notEmpty($scope.tempQueryBean, ['formDefId'])) {
            $scope.queryBean.formDefId = $scope.tempQueryBean.formDefId;
        }
        ;
    };

    $scope.pageAuto = function () {
        $scope.queryBean.totalRows = $scope.paginationConf.totalItems;
        $scope.queryBean.pageNo = $scope.paginationConf.currentPage;
        $scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
        $scope.queryProInstList();
    }

    $scope.pagePrintAuto = function () {
        $scope.queryPrintBean.totalRows = $scope.paginationPrintConf.totalItems;
        $scope.queryPrintBean.pageNo = $scope.paginationPrintConf.currentPage;
        $scope.queryPrintBean.pageSize = $scope.paginationPrintConf.itemsPerPage;
        $scope.queryPrintProInstList();
    }

    /*  $scope.$on('$includeContentLoaded', function () {
     $scope.pageAuto();
     });*/
    $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.pageAuto);
    $scope.$watch('paginationPrintConf.currentPage + paginationPrintConf.itemsPerPage', $scope.pagePrintAuto);

    $scope.showDetail = function (detail) {
        // SysUtils.requestByJson("/rProcessInstance/init?initType=query", {}, function (resultInfo) {
        if ("difcommitteeShouWen" == detail) {
            if (false == $rootScope.currentUser.executive) {/*行政*/
                $scope.currGroupId = "xzAll";
            } else {
                $scope.currGroupId = "dwAll";
            }
        }
        $scope.queryBean = {};
        $scope.docNameOrTitle.b = "";

        if (detail == 'rdzx') {
            detail = $scope.rdzxTypy;
        }
        $scope.queryBean.paging = "Yes";
        $scope.queryBean.pageNo = 1;
        $scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
        var tempModal = detail;
        if ("difcommitteeShouWen" == detail) {
            tempModal = "all";
        }
        $('#' + tempModal + 'Modal').modal('show');
        // $('#'+detail+"Id")[0].reset();
        // });
    }


    /*    $scope.docCreateTimeModify = function () {
            console.log($scope.queryBean.createTime);

            var t1 = moment($scope.queryBean.createTime).format("YYYY-mm-DD hh:mm:ss")
            console.log(t1);

            $scope.queryBean.createTimeEndZh = t1;
        }*/
    $scope.isFinishedChg = function () {
        if ($scope.queryBean.isFinished != 'Finished') {
            $scope.queryBean.finishedDate = "";
            $scope.queryBean.finishedDateZh = "";
            $scope.queryBean.finishedDateEnd = "";
            $scope.queryBean.finishedDateEndZh = "";
        }
    }

    $scope.tpsChg = function (bean, tp, tpas, tpbs) {
        if (!SysUtils.notEmpty(bean, [tp])) {
            return;
        }
        if (SysUtils.notEmpty(tpas, [])) {
            tpas.forEach(function (tpa) {
                if (SysUtils.notEmpty(bean, [tpa])) {
                    if (bean[tp] > bean[tpa]) {
                        bean[tpa] = "";
                        bean[tpa + 'Zh'] = "";
                    }
                }
            });
        }
        if (SysUtils.notEmpty(tpbs, [])) {
            tpbs.forEach(function (tpb) {
                if (SysUtils.notEmpty(bean, [tpb])) {
                    if (bean[tp] < bean[tpb]) {
                        bean[tpb] = "";
                        bean[tpb + 'Zh'] = "";
                    }
                }
            });
        }

        $scope.$applyAsync();
    };

    $('#fawenCountSituationModal').on('hide.bs.modal', function (e) {
        $('#fawenCountModal').modal('hide');
    });

    $scope.timeChga = function () {
        $scope.tpsChg($scope.queryBean, 'createTime', ['createTimeEnd', 'finishedDate', 'finishedDateEnd'], []);
    }
    $scope.timeChgb = function () {
        $scope.tpsChg($scope.queryBean, 'createTimeEnd', ['finishedDate', 'finishedDateEnd'], ['createTime']);
    }
    $scope.timeChgc = function () {
        $scope.tpsChg($scope.queryBean, 'finishedDate', ['finishedDateEnd'], ['createTime', 'createTimeEnd']);
    }
    $scope.timeChgd = function () {
        $scope.tpsChg($scope.queryBean, 'finishedDateEnd', [], ['createTime', 'createTimeEnd', 'finishedDate']);
    }

    $scope.tempQueryBean = {};
    $scope.tempQueryBeanInit = function (type) {
        switch (type) {
            case 'shouwen':
            case 'difcommitteeShouWen':
                if (false == $rootScope.currentUser.executive) {/*行政*/
                    $scope.tempQueryBean.formDefId = "jxwshouwen";
                } else {
                    $scope.tempQueryBean.formDefId = "jxwdwshouwen";
                }
                break;
            case 'fawen':
                if (false == $rootScope.currentUser.executive) {/*行政*/
                    $scope.tempQueryBean.formDefId = "fawen";
                } else {
                    $scope.tempQueryBean.formDefId = "jxwdwfawen";
                }
                break;
            case "xinhan":
                if (false == $rootScope.currentUser.executive) {/*行政*/
                    $scope.tempQueryBean.formDefId = "jxwxinhan";
                } else {
                    $scope.tempQueryBean.formDefId = "jxwdwxinhan";
                }
                break;
            case "duwen":
                if (false == $rootScope.currentUser.executive) {/*行政*/
                    $scope.tempQueryBean.formDefId = "jxwduwen";
                } else {
                    $scope.tempQueryBean.formDefId = "jxwdwduwen";
                }
                break;
            default:
                $scope.tempQueryBean.formDefId = undefined;
                break;
        }
    }

    $scope.docQueryType = '';
    $scope.activeTypeDocs = function (type) {
        $scope.docQueryType = 'thisTypeall';
        $scope.choseCandateJustQuery(type);
    }
    $scope.choseCandateJustQuery = function (type) {
        $scope.pro = null;
        /*  if ($scope.orgNavType == type) {
         return;
         }*/
        //初始化统计查询参数
        $scope.countQueryBean = {paging: 'no'};
        $scope.countCategory(type);
        $scope.orgNavType = type;
        $scope.homeListRenewId = "zhcx" + $scope.orgNavType;
        $rootScope.reNewBtn = "directQuery";
        if ($scope.orgNavType != 'all') {
            $scope.formDefIds = $scope.formDefIdsObj[$scope.orgNavType];
        }
        $scope.rdzxTypy = type;
        // $("#candateNav" + type).addClass("active").siblings(".active").removeClass("active");
        $scope.wngkSearchBtnKey = "no";
        $scope.ngWngkSearchBtn = $scope.wngkSearchBtn[$scope.wngkSearchBtnKey];
        $scope.$applyAsync();
        $scope.initParamsAndQuery(type);
    }
    $scope.choseCandate = function (type) {
        if ("all" != type) {
            $scope.docNameOrTitle.b = "";
        }
        $scope.tempQueryBeanInit(type);
        $scope.choseCandateJustQuery(type);
    };

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

    /* var window_height = $(window).height();
     var heightList = [];
     heightList.push($('.main-header').outerHeight());
     heightList.push($('.panel-heading').outerHeight(true));
     var resultHeight = maxHeigtTool.maxHeigt(window_height, heightList);
     $('.panel-body').css('max-height', resultHeight);
     $('.panel-body').css('height', resultHeight);*/

    /**
     * 归档操作
     * @param proInst
     */
    $scope.doArchive = function (proInst) {
        $scope.queryBean = proInst;
        SysUtils.swalConfirm("提示", "确定归档吗？", "info", function (isConfirm) {
            if (isConfirm) {
                SysUtils.requestByJson("/rProcessInstance/doArchive", $scope.queryBean, function (resultInfo) {
                    SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                        console.log(resultInfo);
                        $scope.queryBean = {paging: 'Yes'};
                        $scope.queryBean.pageNo = $scope.paginationConf.currentPage;
                        $scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
                        $scope.queryProInstList();
                    })
                })
            }
        })
    }

    /**
     * 获取个性表单
     *
     */
    $scope.initDetaiTable = function (pinstance) {
        var str = pinstance.theCommonFormInfo.formDetailType;
        //return ('form' + str[0].toUpperCase() + str.substring(1, str.length))
        var detaiTable = ('form' + str[0].toUpperCase() + str.substring(1, str.length));
        console.log(detaiTable);
        /* console.log(detaiTable);
         console.log(pinstance.theCommonFormInfo);
         console.log(pinstance.theCommonFormInfo[detaiTable]);*/
        /*if(pinstance.theCommonFormInfo[detaiTable]!=null){
//            console.log("=="+pinstance.theCommonFormInfo[detaiTable].sendToMain);
            return pinstance.theCommonFormInfo[detaiTable].sendToMain;
        }*/
        return detaiTable;
    }

    /**
     * 打印表单
     */
    $scope.printSecretConfirm = function () {
        $("#printTable").printArea();
        /*SysUtils.swalConfirm('提示', '要打印吗？', 'info', function (isConfirm) {
            if (isConfirm) {
                $("#secretFormPrint").printArea();
            } else {
                swal.close();
            }
        })*/
    };

    /**
     * 人大政协或者报批类型  console.log($scope.rdzxTypy);
     //$scope.choseCandate($scope.rdzxTypy);
     */
    $scope.isRdzxChg = function () {
        $scope.choseCandate($scope.rdzxTypy);
    }

    $timeout(function () {
        $scope.pageAutoInit = true;
        $scope.choseCandate($scope.orgNavType);
    }, 500);
}]);
