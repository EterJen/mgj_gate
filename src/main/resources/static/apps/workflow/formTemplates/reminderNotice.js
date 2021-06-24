myApp.controller('reminderNoticeCtrl', ['$scope', 'ENV', '$state', '$stateParams', 'SysUtils', function ($scope, ENV, $state, $stateParams, SysUtils) {

    /*************************一、变量定义****************************/
    $scope.fc.reminderNoticeList={
        agree:false,
        opinions:false,
        progress:false,
        result:false,
        otherResult:false
    }
    var typeList=["agree","opinions","progress","result","otherResult"];
    var departNoticeTypeList=["chenBanDepart","incomingDocDepart","authorshipService"];
    $scope.title2="";
    $scope.fc.currentDepartType="";
    $scope.fc.searchDepartName={name:""};
    $scope.fc.departNoticeType={
        chenBanDepart: {
            choseType: 'Exclusive',  // Exclusive Choice(单选)            // Multiple Choice (多选)
            dbobj: "instance",
            dbColumn: 'chenBanDepart',
            title: '请选择等级',
            th1: '等级',
            addFooter: false,
            addSearch: false,
            mbcss: "mbcss-ns-nf",
            dicTypeList: []
        },
        incomingDocDepart: {
            choseType: 'Exclusive',  // Exclusive Choice(单选)            // Multiple Choice (多选)
            dbobj: "instance",
            dbColumn: 'incomingDocDepart',
            title: '请选择等级',
            th1: '等级',
            addFooter: false,
            addSearch: false,
            mbcss: "mbcss-ns-nf",
            dicTypeList: []
        },
        authorshipService: {
            choseType: 'Multiple',  // Exclusive Choice(单选)            // Multiple Choice (多选)
            dbobj: "instance",
            dbColumn: 'authorshipService',
            title: '请选择等级',
            th1: '等级',
            addFooter: false,
            addSearch: false,
            mbcss: "mbcss-ns-nf",
            dicTypeList: []
        },
    };
    /*************************二、函数定义****************************/

    $scope.fc.mattersClk = function (val) {
        /*$scope.fc.reminderNoticeList={
            agree:false,
            opinions:false,
            progress:false,
            result:false,
            otherResult:false
        }*/
        $scope.task.theCommonFormInfo.belongProInst.bulletinType=null;
        $scope.fc.reminderNoticeList[val]=!$scope.fc.reminderNoticeList[val];
        angular.forEach(typeList, function(data){
            if($scope.fc.reminderNoticeList[data]){
                if ($scope.task.theCommonFormInfo.belongProInst.bulletinType==null) {
                    $scope.task.theCommonFormInfo.belongProInst.bulletinType=data;
                }else {
                    $scope.task.theCommonFormInfo.belongProInst.bulletinType+="|"+data;
                }
            }
        });
        //$scope.task.theCommonFormInfo.belongProInst.bulletinType=val;
    }

    $scope.fc.matterscheckBox = function (val) {
        $scope.task.theCommonFormInfo.belongProInst.bulletinType=null;
        //$scope.fc.reminderNoticeList[val]=!$scope.fc.reminderNoticeList[val];
        angular.forEach(typeList, function(data){
            if($scope.fc.reminderNoticeList[data]){
                if ($scope.task.theCommonFormInfo.belongProInst.bulletinType==null) {
                    $scope.task.theCommonFormInfo.belongProInst.bulletinType=data;
                }else {
                    $scope.task.theCommonFormInfo.belongProInst.bulletinType+="|"+data;
                }
            }
            /*if(data===val){
                if(!$scope.fc.reminderNoticeList[data]&&data=='agree'){
                    $scope.task.theCommonFormInfo.belongProInst.authorshipService=null;
                }else if(!$scope.fc.reminderNoticeList[data]&&data=='otherResult'){
                    $scope.task.theCommonFormInfo.belongProInst.cityApproval=null;
                }
            }else{
                $scope.fc.reminderNoticeList[data]=false;
            }
            if($scope.fc.reminderNoticeList[data]){
                $scope.task.theCommonFormInfo.belongProInst.bulletinType=data;
            }*/
        });
    }

    $scope.fc.initCurrTask = function () {
        /*处理标题过长的情况*/
        if ($scope.task.theCommonFormInfo.belongProInst.title.length>=42) {
            $scope.title1= $scope.task.theCommonFormInfo.belongProInst.title.substring(0,42);
            $scope.title2=$scope.task.theCommonFormInfo.belongProInst.title.substring(42);
        }else {
            $scope.title1= $scope.task.theCommonFormInfo.belongProInst.title;
        }

        if (SysUtils.notEmpty($scope.task.theCommonFormInfo.belongProInst.bulletinType, [])) {
            var arr=$scope.task.theCommonFormInfo.belongProInst.bulletinType.split("|");
            angular.forEach(arr, function(data){
                $scope.fc.reminderNoticeList[data]=true;
            });
        }
        SysUtils.requestByJson("/coreDepartment/list", {paging:'No',initType:'noticeDepartList'}, function (resultInfo) {
            angular.forEach(departNoticeTypeList, function(data){
                $scope.fc.departNoticeType[data].dicTypeList=resultInfo.beanList;
            });
        });


    }

    $scope.fc.mClickRowBtnNotice = function (depart) {
        $scope.task.theCommonFormInfo.belongProInst[$scope.fc.currentDepartType]=depart.name;
        $('#'+$scope.fc.departNoticeType[$scope.fc.currentDepartType].choseType+'Modal').modal('hide');
    }

    $scope.fc.bindDepartType = function () {
        $scope.task.theCommonFormInfo.belongProInst[$scope.fc.currentDepartType]="";
        angular.forEach($scope.fc.departNoticeType[$scope.fc.currentDepartType].dicTypeList, function(data){
            if (data.checked) {
                if($scope.task.theCommonFormInfo.belongProInst[$scope.fc.currentDepartType]==""){
                    $scope.task.theCommonFormInfo.belongProInst[$scope.fc.currentDepartType]=data.name
                }else {
                    $scope.task.theCommonFormInfo.belongProInst[$scope.fc.currentDepartType]+="，"+data.name;
                }
            }
        });
        $('#'+$scope.fc.departNoticeType[$scope.fc.currentDepartType].choseType+'Modal').modal('hide');
    }

    $scope.fc.chooseDeparName = function (type) {
        $scope.fc.currentDepartType=type;
        $('#'+$scope.fc.departNoticeType[type].choseType+'Modal').modal('show');
    }

    /*保存之前校验*/
    $scope.fc.preSaveForm = function () {
        var thisValid = this;
        $scope.task.theCommonFormInfo.belongProInst.title=$scope.title1+$scope.title2;
        if ($scope.task.theCommonFormInfo.belongProInst.bulletinType==null || $scope.task.theCommonFormInfo.belongProInst.bulletinType=="") {
            SysUtils.swalForTips("提示", "办理事项5个必须选中一个！", "info", function (isConfirm) {
                return $scope.saveFormBz();
            });
        }else {
            return thisValid.nextValidRun();
        }
    };

    /*监听标题，如果大于42则截取掉*/
    $scope.$watch('title',function(newValue,oldValue) {
        if(newValue&& !oldValue && newValue.toString().length>=42){
            $scope.title1= newValue.toString().substring(0,42);
            $scope.title2=newValue.toString().substring(42);
            $("#title2").focus();
        }
    }, true);

}]);


