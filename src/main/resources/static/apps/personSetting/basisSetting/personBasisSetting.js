/*myApp.config(function($stateProvider,ENV) {

 $stateProvider.state('coreHome.roleManageList', {
 url: "/roleManageList",
 views:{
 'rightContent@coreHome': {
 templateUrl: ENV.templateLocate + "/apps/roleManage/roleManageList.html?ts=" + timestamp,
 controller: "roleManageListCtrl",
 cache: false,
 }
 }
 });

 }); */


myApp.controller('personBasisSettingCtrl', ['$rootScope','$scope', 'ENV', '$state', 'dataFactory', 'NodeTreeTool', '$filter', 'SysUtils', 'maxHeigtTool','$timeout', function ($rootScope, $scope, ENV, $state, dataFactory, NodeTreeTool, $filter, SysUtils, maxHeigtTool,$timeout) {
    console.log("personBasisSetting controller");

    /*************************一、变量定义****************************/
    $rootScope.addBgground = true;
    $scope.userList = [];
    $scope.isUpdate = true;//初始化角色详情
    $scope.role = "";//点击事件储存角色
    /*************************二、函数定义****************************/
    /*计算布局高度*/
    var window_height = $(window).height();
    var heightList = [];
    heightList.push($('.main-header').outerHeight());
    $('.gdt_cont').css('max-height', maxHeigtTool.maxHeigt(window_height, heightList));
    $('.details').css('min-height', maxHeigtTool.maxHeigt(window_height, heightList));
    heightList.push($('.table_1').height());
    heightList.push(($('.bj').outerHeight() + ($('#depart_tit').outerHeight(true) - $('#depart_tit').outerHeight())) * 2);
    heightList.push(20);//.details的padding-top 20
    var resultHeight = maxHeigtTool.maxHeigt(window_height, heightList);
    $('#table_1').css('max-height', resultHeight);
    $('#sorttable').css('max-height', resultHeight);

    $scope.cleanCache = function () {
        console.log("dfsd");
        SysUtils.silenceWithAuthAjax("/cacheUser",$scope.processVersionListParam,function (resultInfo) {
            swal("成功", resultInfo.message, "success");
        });
    }


    $scope.requstList = function () {
        accUrl = ENV.localapi + "/dicMode/basisSettingTree";
        // var roleListUrl=ENV.localapi+"/coreRole/listTopClick";
        dataFactory.getlist(accUrl, 'POST',
            {'Content-type': 'application/json'}).then(
            function (d) {
                //console.log(JSON.stringify(d));
                $scope.data = d.beanList;
            }, function (data) {
                console.log(JSON.stringify(data));
            })
    };


    $scope.changeSettingIterm = function (item,e) {
        $(".angular-ui-tree-handle").removeClass("active");
        $(e.currentTarget).addClass("active");
        $state.go(item.ext);
        $scope.$applyAsync();
    };

    $scope.visible = function (item) {
        return !($scope.query && $scope.query.length > 0
        && item.title.indexOf($scope.query) == -1);
    };

    /**********************************初始化调用***************************************************/
    $scope.requstList();
    $timeout(function(){
        $('.content-wrapper').css('height', SysUtils.get_content_wrapper());
        $('#panel-body-table').css('height',$('.content').height()-$('#panel-heading').outerHeight(true));
        //console.log($('.content').height()+"=="+$('#panel-heading').outerHeight(true)+"==="+$('#ceter_p').height());
        $('.table_shadow').css('max-height',$('.content').height()-$('#panel-heading').outerHeight(true)-$('#ceter_p').outerHeight());
    });
}]);