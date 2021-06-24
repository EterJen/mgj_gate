myApp.controller('doneListCtrl', ['$rootScope','$scope', 'ENV', '$state',  'SysUtils', 'maxHeigtTool','$timeout', function ($rootScope, $scope, ENV, $state,  SysUtils, maxHeigtTool,$timeout) {
    console.log("doneListCtrl controller");
    $rootScope.addBgground = true;
    $scope.doneList = [];
    var childWindowMap={};//存储已经打开的窗口

    $scope.gotoDetail = function (proInst) {
        $rootScope.reNewBtn = "directQuery";
        if(!SysUtils.isEmpty(childWindowMap[proInst.id])){
            childWindowMap[proInst.id].close();
        }
        var _window=window.open(ENV.localapi + "/index.html#!/officialDocuments/" + proInst.formDefId + "/-" + proInst.id);
        childWindowMap[proInst.id]=_window;
    };

    $scope.enterKey = function (e) {
        var keycode = window.event ? e.keyCode : e.which;
        if (keycode == 13) {
            $scope.paginationConf.totalItems = -1;
            $scope.pageAuto();
        }
    };
    $scope.changeNavType = function (stateId) {
        $scope.orgNavType = stateId;
        $scope.homeListRenewId ="doneTask"+ $scope.orgNavType;
      $rootScope.reNewBtn = "directQuery";
        $scope.paginationConf.totalItems = -1;
        $scope.titleDocFullName = "";
        $scope.pageAuto();
    };
    $scope.orgNavType = "";
    $scope.docTypelist = [
        {id: '', val: '已办理'},
        {id: 'canBeReturn', val: '可撤回'},
        {id: 'Finished', val: '已办结'},
    ];

    $scope.homeListRenewId ="doneTask"+ $scope.orgNavType;
  $rootScope.reNewBtn = "directQuery";


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

    $scope.proInst = {};
    $scope.cuTaskScroll = false;
    $scope.pageAuto = function () {
        $scope.proInst = {};
        $scope.proInst.paging = "Yes";
        $scope.proInst.pageNo = $scope.paginationConf.currentPage;
        $scope.proInst.pageSize = $scope.paginationConf.itemsPerPage;
        $scope.proInst.totalRows = $scope.paginationConf.totalItems;
        $scope.proInst.isFinished = $scope.orgNavType;
        $scope.proInst.docNameOrTitle = $scope.titleDocFullName;

        $scope.queryDoneList();
    };


    $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.pageAuto);
    //</editor-fold>


    $scope.backTask = function (task) {
        SysUtils.requestByJson("/rCurrentTaskInfo/backTask", task.id, function (resultInfo) {
            $scope.task = resultInfo.additionalInfo.task;
            window.open(ENV.localapi + "/index.html#!/officialDocuments/" + $scope.task.belongingProInst.formDefId + "/" + $scope.task.id);
            $scope.pageAuto();
        });
    };
    $scope.queryDoneList = function (proInst) {
        SysUtils.requestByJson("/rProcessInstance/doneList", $scope.proInst, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                $scope.doneList = resultInfo.beanList;
                console.log($scope.doneList);

                $scope.paginationConf.totalItems = resultInfo.totalRows;
                $scope.$apply();
            })
        });
    };

    $scope.collectionPros = function (index) {
        /*var text;
        if($scope.doneList[index].collection){
            text="是否取消收藏";
        }else{
            text="是否收藏";
        }*/
        var pro=$scope.doneList[index];
        if(pro.collection){
            $scope.doneList[index].collection=false;
        }else{
            $scope.doneList[index].collection=true;

        }
        SysUtils.requestByJson('/rProcessInstance/insertMycollection',pro,function(r){
            /*if($scope.doneList[index].collection){
                SysUtils.swalTimer("提示","关注成功！","success");
            }else{
                SysUtils.swalTimer("提示","消关注成功！","success");
            }*/
            $scope.queryDoneList();
        })
        /*SysUtils.swalConfirm("提示",text,"info",function(isConfirm){
            if(isConfirm){

            }
        });*/
    }

    /*var window_height = $(window).height();
    var heightList = [];
    heightList.push($('.main-header').outerHeight());
    // $('#table_dt').css('height', window_height - 191);
    $('#currentTaskContent').css('height', window_height );*/

    /*var window_height = $(window).height();
    var heightList=[];
    heightList.push($('.main-header').outerHeight());
    heightList.push($('.panel-heading').outerHeight(true));
    var resultHeight=maxHeigtTool.maxHeigt(window_height,heightList);
    $('.panel-body').css('max-height', resultHeight);
    $('.panel-body').css('height', resultHeight);*/
/*    $('.content-wrapper').css('height', SysUtils.get_content_wrapper());
    $('#panel-body-table').css('height',$('.content').height()-$('#panel-heading').outerHeight(true));
    $('.table_shadow').css('max-height',$('.content').height()-$('#panel-heading').outerHeight(true)-$('#ceter_p').outerHeight());*/

    $timeout(function(){
        $('.content-wrapper').css('height', SysUtils.get_content_wrapper());
        $('#panel-body-table').css('height',$('.content').height()-$('#panel-heading').outerHeight(true)-$('#bmxx_tit').outerHeight());
        $('.table_shadow').css('max-height',$('.content').height()-$('#panel-heading').outerHeight(true)-$('#bmxx_tit').outerHeight(true)-52);
    });
}])