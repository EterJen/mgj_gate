myApp.controller('batchimportCtrl', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils', 'maxHeigtTool','dataFactory', function ($rootScope, $scope, ENV, $state, SysUtils, maxHeigtTool,dataFactory) {

    console.log('人大政协批量导入');
    /*************************一、变量定义****************************/
    $scope.queryBean = {paging: '1',entityType:'dpComposedDeal',dbParams:{}};

    $scope.dicMod={
        rdzx:[
            {name: '类型1', val: '1'},
            {name: '类型2', val: '2'}
            ],
        type:[
            {name: '政协提案办理', val: 'dpComposedDeal'},
            {name: '人大书面意见办理', val: 'npcHandling'}
        ]
    }

    $scope.fc={};

    /*************************二、函数定义****************************/
    /*$scope.showDetail = function (detail) {
        $scope.queryBean = {paging: 'Yes',groupId:'handlingwork',dbParams:{}};
        $('#' + detail).modal('show');
    };*/
    $scope.fc.fileUpload = function () {
        var accUrl = ENV.localapi + "/attachment/batchimport";
        var fd = new FormData();
        var file = $scope.fc.headPortrait;
        if(SysUtils.isEmpty(file)){
            swal("","请先上传附件！","info");
            return;
        }
        fd.append('file', file);
        //fd.append('fileType', "HeadPortrait");
        fd.append('selectedBean', JSON.stringify($scope.queryBean));
        fd.append('isWindows', SysUtils.isWindows());
        dataFactory.getlist(accUrl, 'POST', {'Content-type': undefined}, fd).then(
            function (d) {
                SysUtils.handleResult(d, {'state': $state}, function () {
                    swal("提示", d.message, "success");
                })
            },
            function (d) {
                console.log(JSON.stringify(d));
            }
        )
    };

    $scope.selectGroupId=function(){
        if($scope.queryBean.paging=='1'){
            $scope.queryBean.entityType='dpComposedDeal';
        }else if($scope.queryBean.paging=='2'){
            $scope.queryBean.entityType='npcHandling';
        }
        console.log($scope.queryBean.entityType)
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

        $scope.calculatedHeight();
    }, 500);


}]);

