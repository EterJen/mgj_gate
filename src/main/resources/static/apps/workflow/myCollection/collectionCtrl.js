myApp.controller('collectionListCtrl', ['$rootScope','$scope', 'ENV', '$state',  'SysUtils', 'maxHeigtTool', function ($rootScope, $scope, ENV, $state,  SysUtils, maxHeigtTool) {
    console.log("collectionListCtrl controller");
    $rootScope.addBgground = true;
    $scope.doneList = [];
    var childWindowMap={};//存储已经打开的窗口
    $scope.homeListRenewId = "collectionSearch";
    $rootScope.reNewBtn = $scope.homeListRenewId;
    $scope.gotoDetail = function (proInst) {
        $rootScope.reNewBtn = $scope.homeListRenewId;
        if(!SysUtils.isEmpty(childWindowMap[proInst.id])){
            childWindowMap[proInst.id].close();
        }
        var _window = window.open(ENV.localapi + "/index.html#!/officialDocuments/" + proInst.formDefId + "/-" + proInst.id);
        childWindowMap[proInst.id]=_window;
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

    $scope.proInst = {};
    $scope.cuTaskScroll = false;
    $scope.pageAuto = function () {
        $scope.proInst = {};
        $scope.proInst.paging = "Yes";
        $scope.proInst.collection = true;
        $scope.proInst.title=$scope.titleDocFullName;
        $scope.proInst.pageNo = $scope.paginationConf.currentPage;
        $scope.proInst.pageSize = $scope.paginationConf.itemsPerPage;
        $scope.proInst.totalRows = $scope.paginationConf.totalItems;
        //alert($scope.proInst.title);
        console.log($('#table_dt').height());
        if ($scope.proInst.pageSize > 10 ) {
            // $scope.cuTaskScroll = true;
            $('#table_dt').css('height', 500 );
        }else {
            // $scope.cuTaskScroll = false;
            $('#table_dt').css('height', 450 );
        }

        //console.log($('#table_dt').height());
        //console.log($scope.cuTaskScroll);

        $scope.queryDoneList();
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

    $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.pageAuto);
    //</editor-fold>


    $scope.queryDoneList = function () {
        SysUtils.requestByJson("/rProcessInstance/collectionList", $scope.proInst, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                $scope.doneList = resultInfo.beanList;
                $scope.paginationConf.totalItems = resultInfo.totalRows;
                $scope.$apply();
            })
        })
        ;
    }

    $scope.collectionPros = function (index) {
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
                SysUtils.swalTimer("提示","取消关注成功！","success");
            }*/
            $scope.queryDoneList();
        })
        /*SysUtils.swalConfirm("提示","是否取消收藏","info",function(isConfirm){
            if(isConfirm){

            }
        });*/
    }

    $('.content-wrapper').css('height', SysUtils.get_content_wrapper());
    $('#panel-body-table').css('height',$('.content').height()-$('#panel-heading').outerHeight(true));
    $('.table_shadow').css('max-height',$('.content').height()-$('#panel-heading').outerHeight(true)-$('#ceter_p').outerHeight());


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
}])