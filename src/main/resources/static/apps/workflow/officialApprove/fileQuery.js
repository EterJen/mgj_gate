myApp.controller('fileQueryManagerCtrl', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils', 'maxHeigtTool', function ($rootScope, $scope, ENV, $state, SysUtils, maxHeigtTool) {


    $rootScope.addBgground = true;
    $scope.queryBean = {paging: 'Yes'};
    $scope.queryPrintBean= {paging: 'Yes'};
    $scope.countQueryBean = {paging: 'Yes'};
    $scope.proInstList = [];
    $scope.currGroupId = 'shouwen';
    $scope.queryBean.groupId = 'shouwen';
    $scope.proInst = {};
    $scope.formPath = null;
    $scope.formTempPath = "apps/workflow/officialApprove/";
    $scope.orgNavType = "shouwen";
    $scope.homeListRenewId = "gwsp"+$scope.orgNavType;
    $rootScope.reNewBtn = "directQuery";
    var childWindowMap = {};//存储已经打开的窗口
	$scope.hasArchiveRole = false;//判断用户是否有"档案归档"角色
    $scope.rdzxTypy="rdzx";

    $scope.isFinisheds = [
        {key: '', val: '全部'},
        {key: 'Active', val: '在办'},
        {key: 'Finished', val: '已办结'}
    ];

    $scope.docTypelist = [         
        {id: 'shouwen', val: '收文审批'},
        {id: 'fawen', val: '发文审批'},
        {id: 'duwen', val: '督文审批'},
        {id: 'xinhan', val: '信函报批'}
    ];
    $scope.formDefId;
    $scope.formDefIds = [];
    $scope.formDefIdsObj = {
        shouwen:[
            {val: '全部', key: ''},
            {val: '长城电子党委收文', key: 'jxwdwshouwen'},
            {val: '长城电子收文', key: 'jxwshouwen'}
        ],
        fawen:[
            {val: '全部', key: ''},
            {val: '长城电子发文', key: 'fawen'},
            {val: '长城电子党委发文', key: 'jxwdwfawen'},
//            {val: '国防办发文', key: 'gfkgbfawen'},
            {val: '长城电子规范发文', key: 'hjxgffawen'}
        ],
        shangjilaiwen:[
            {val: '全部', key: ''},
            {val: '中央文件（甲）', key: 'jywjj'},
            {val: '市委文件（乙）', key: 'jywjy'},
            {val: '市府文件（丙）', key: 'jywjb'},
            {val: '国务院文件（国）', key: 'jywjg'}
        ],
        xinhan:[
            {val: '全部', key: ''},
            {val: '长城电子信函', key: 'jxwxinhan'},
            {val: '长城电子党委信函', key: 'jxwdwxinhan'},
            {val: '工作报批', key: 'workapproved'},
            {val: '党委工作报批', key: 'partyapproved'},
            {val: '外事报批', key: 'otherapproved'},
            {val: '合同报批', key: 'contractapproved'},
            {val: '委内文稿审核', key: 'draftapproved'},
        ],
        duwen:[
            {val: '全部', key: ''},
            {val: '长城电子督文', key: 'jxwduwen'},
        ],
        rdzx:[
            {val: '全部', key: ''},
            {val: '长城电子办理人', key: 'npcHandling'},
            {val: '长城电子办理协', key: 'dpComposedDeal'},
        ],
        rdbp:[
            {val: '全部', key: ''},
            {val: '人大报批', key: 'blyjbprd'},
            {val: '政协报批', key: 'blyjbpzx'},
        ],
        zxType:[
            {val: '人大政协', key: 'rdzx'},
            {val: '关联报批', key: 'rdbp'},
        ]
    };






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
        $rootScope.reNewBtn = "directQuery";
        var formDefId = task.belongingProInst.formDefId;
        var _window;
        //console.log(ENV.localapi + "/index.html#!/formEditGeneric/" + formDefId + "/" + task.id);
        if (!SysUtils.isEmpty(childWindowMap[task.id])) {
            childWindowMap[task.id].close();
        }
        if ($scope.orgNavType === "IndividualToDone") {
            _window = window.open(ENV.localapi + "/index.html#!/officialDocuments/" + formDefId + "/" + task.id);
        } else {
            _window = window.open(ENV.localapi + "/index.html#!/officialDocuments/" + formDefId + "/" + task.id);
        }
        childWindowMap[task.id] = _window;
    }

    $scope.setFormPath = function () {
        $scope.formPath = $scope.formTempPath + $scope.currGroupId + ".html";
    }




    $scope.queryProInstListChangeBean = function (type) {
        $scope.initPaging();
        $scope.queryBean.totalRows = $scope.paginationConf.totalItems;
        $scope.queryBean.pageNo = $scope.paginationConf.currentPage;
        $scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
        $('#'+type).modal('hide');
        $scope.queryProInstList();
    }


    $scope.enterKeyupAllTab = function (e) {
        var keycode = window.event ? e.keyCode : e.which;
        if (keycode == 13) {
            $scope.choseCandate($scope.orgNavType);
        }
    }

    $scope.queryProInstList = function () {
    	$scope.queryBean.groupId = $scope.orgNavType ;
        $scope.queryBean.titleDocFullName = $scope.titleDocFullName;
	    SysUtils.requestByJson('/rCurrentTaskInfo/getTodoAgentTask', $scope.queryBean, function (resultInfo) {
            $scope.currTaskList = resultInfo.beanList;
            console.log($scope.currTaskList)
            $scope.isleader = resultInfo.additionalInfo.isLeader;
            //console.log($scope.isleader);
            $scope.paginationConf.totalItems = resultInfo.totalRows;
            $scope.$apply();
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
        $scope.pageAuto();
    }

    $scope.setFormPath();

    $scope.pageAuto = function () {
        $scope.queryBean.totalRows = $scope.paginationConf.totalItems;
        $scope.queryBean.pageNo = $scope.paginationConf.currentPage;
        $scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
        $scope.queryProInstList();
    }

    $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.pageAuto);


    $scope.isFinishedChg = function () {
        if ($scope.queryBean.isFinished != 'Finished') {
            $scope.queryBean.finishedDate = "";
            $scope.queryBean.finishedDateZh = "";
            $scope.queryBean.finishedDateEnd = "";
            $scope.queryBean.finishedDateEndZh = "";
        }
    }


    $scope.currGroupIdChg = function () {
        if ($scope.currGroupId != 'all') {
            $scope.formDefIds = $scope.formDefIdsObj[$scope.currGroupId];
        }
    };

    $scope.formDefIds = $scope.formDefIdsObj['shouwen'];
    
    $scope.choseCandate = function (type) {
    	$scope.orgNavType = type;
        $scope.currGroupId = type;
        $scope.homeListRenewId = "gwsp"+$scope.orgNavType;
        $scope.$applyAsync();
        $scope.initParamsAndQuery(type);
        $scope.currGroupIdChg();
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

    $scope.collectionPros = function (index) {
        var pro = $scope.currTaskList[index].belongingProInst;
        if (pro.collection) {
            $scope.currTaskList[index].belongingProInst.collection = false;
        } else {
            $scope.currTaskList[index].belongingProInst.collection = true;

        }
        SysUtils.requestByJson('/rProcessInstance/insertMycollection', pro, function (r) {
            $scope.queryProInstList();
            /*if($scope.currTaskList[index].belongingProInst.collection){
                SysUtils.swalTimer("提示","关注成功！","success");
            }else{
                SysUtils.swalTimer("提示","取消关注成功！","success");
            }*/
        })
    }

    $scope.showModel = function(){   
    	
    	 $('#'+$scope.orgNavType+'Modal').modal('show');
    }

}]);
