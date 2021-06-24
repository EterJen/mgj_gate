myApp.controller('approvalAttachManageCtrl', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils', 'maxHeigtTool','dataFactory', function ($rootScope, $scope, ENV, $state, SysUtils, maxHeigtTool,dataFactory) {

    console.log('人大政协附件管理');
    /*************************一、变量定义****************************/
    $scope.queryBean = {paging: 'Yes',bizAttachType:'rdzx',dbParams:{}};


    $scope.paginationConf = {
        currentPage: 1,
        totalItems: -1,
        itemsPerPage: 10,
        pagesLength: 13,
        perPageOptions: [10, 20, 30, 40, 50]
    };

    $scope.dicMod={
        rdzx:[
            {name: '代表建议主(合)办', val: 'dbzb'},
            {name: '代表建议会办', val: 'dbhb'},
            {name: '提案主(合)办', val: 'tazb'},
            {name: '提案会办', val: 'tahb'},
            {name: '其他类型', val: 'other'},
            ]
    }

    $scope.fc={showBizFileType:false};

    /*************************二、函数定义****************************/
    /*查询当前用户登录的收文*/
    $scope.queryProInstList = function (detail) {
        $scope.queryBean = {paging: 'Yes',bizAttachType:'rdzx',finalVersion:1,dbParams:{}};
        SysUtils.requestByJson("/middleAttachment/list", $scope.queryBean, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                $scope.fc.middleAttachList = resultInfo.beanList;
                //console.log($scope.proInstList);
                $scope.paginationConf.totalItems = resultInfo.totalRows;
                //$scope.hiddenStatus = $scope.queryBean.strStatus;
                if (!SysUtils.isEmpty(detail)){
                    $('#' + detail).modal('hide');
                }
                $scope.$apply();
            })
        })
    };

    $scope.showDetail = function (detail) {
        $scope.queryBean = {paging: 'Yes',groupId:'handlingwork',dbParams:{}};
        $('#' + detail).modal('show');
    };

    $scope.addAttach=function(detail){
        $scope.queryBean = {paging: 'Yes',bizAttachType:'rdzx',dbParams:{}};
        $scope.fc.showBizFileType=false;
        $('#' + detail).modal('show');
    }

    $scope.addGroupAttach=function(mAttach,detail){
        $scope.queryBean = mAttach;
        $scope.fc.showBizFileType=true;
        $('#' + detail).modal('show');
    }

    $scope.fc.fileUpload = function () {
        var accUrl = ENV.localapi + "/attachment/upload";
        /*if (SysUtils.isEmpty($scope.attUploadInfo.annexDescription)) {
            swal("提示", "附件说明必须填写", "info");
            return;
        }
        if (SysUtils.isEmpty($scope.attUploadInfo.processInstanceId)) {
            swal("提示", "请选择绑定的文种", "info");
            return;
        }*/
        if (SysUtils.isEmpty($scope.fc.headPortrait)) {
            swal("提示", "必须上传附件！", "info");
            return;
        }
        var fd = new FormData();
        var file = $scope.fc.headPortrait;

        $scope.queryBean.initType = "add";
        //console.log(JSON.stringify($scope.queryBean));
        fd.append('file', file);
        //fd.append('fileType', "HeadPortrait");
        fd.append('selectedBean', JSON.stringify($scope.queryBean));
        fd.append('isWindows', SysUtils.isWindows());
        dataFactory.getlist(accUrl, 'POST', {'Content-type': undefined}, fd).then(
            function (d) {
                console.log(JSON.stringify(d));
                SysUtils.handleResult(d, {'state': $state}, function () {
                    swal("提示", "上传成功!", "success");
                    $('#addModel').modal('hide');
                    $scope.queryProInstList();
                })
            },
            function (d) {
                console.log(JSON.stringify(d));
            }
        )
    };

    $scope.delete = function (mAttach) {
        SysUtils.swalConfirm("提示", "是否删除此记录", "info", function (isConfirm) {
            if (isConfirm) {
                SysUtils.requestByJson('/middleAttachment/delete/'+mAttach.id, {}, function (resultInfo) {
                    SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                        swal("提示", resultInfo.message, "success");
                        $scope.queryProInstList();
                    })
                })
            }
        });
    };

    $scope.download=function(mAttach){
        var url = ENV.localapi + "/attach/downloadWps?id=" + mAttach.attachment.id;
        var form = $("<form>");   //定义一个form表单
        form.attr('style', 'display:none');   //在form表单中添加查询参数
        form.attr('target', '');
        form.attr('method', 'post');
        form.attr('action', url);
        /*var input1 = $('<input>');
              input1.attr('type', 'hidden');
              input1.attr('name', 'strUrl');
              input1.attr('value', strUrl);*/
        $('body').append(form);  //将表单放置在web中
        //form.append(input1);   //将查询参数控件提交到表单上
        form.submit();
    }

    $scope.pageAuto = function () {
        $scope.queryBean.totalRows = $scope.paginationConf.totalItems;
        $scope.queryBean.pageNo = $scope.paginationConf.currentPage;
        $scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
        $scope.queryProInstList();
    };


    

    $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.pageAuto);


    //$scope.queryProInstList();
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

