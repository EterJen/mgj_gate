myApp.controller('processDefListCtrl', ['$rootScope', '$scope', 'ENV', '$state',  'SysUtils', 'dataFactory', '$timeout', 'maxHeigtTool', function ($rootScope, $scope, ENV, $state,  SysUtils, dataFactory, $timeout, maxHeigtTool) {
    /*************************一、变量定义****************************/
    $rootScope.addBgground = true;
    $scope.processDefListParam = {paging: 'No'};//
    $scope.selectedProDef = {};
    $scope.selectedProDefGroup = {};
    $scope.processVersionListParam = {paging: 'No'};//
    $scope.mode = '';
    $scope.postProcessPdm = {};
    $scope.selectedProcessDefInfo = {};
    $scope.versionMode = '';
    $scope.processVersionEditBean = {};

    /*************************二、函数定义****************************/
    $scope.initVars = function (type) {
        $scope.selectedProDef = {};
        $scope.selectedProDefGroup = {};
        $scope.isUpdate = false;
    }

    $scope.changeNav = function () {
        $scope.initVars();
        $scope.queryProcessDefManage();
    };

    $scope.queryProcessDefManage = function () {
        SysUtils.silenceWithAuthAjax("/processDefManage/processDefCtl/groupingTree",$scope.processDefListParam,function (resultInfo) {
            $scope.processDefList = resultInfo.beanList;
            $scope.$applyAsync();
        });
    };

    $scope.defGroupFocus = function (proDefGroup, target) {
        $(".angular-ui-tree-handle").removeClass("active");
        $(target.currentTarget).addClass("active");

        $scope.selectedProDefGroup = proDefGroup;
        $scope.selectedProDef = {};
        $scope.isUpdate = false;
        $scope.$applyAsync();
    }

    $scope.proDefFocus = function (proDef, target) {
        $(".angular-ui-tree-handle").removeClass("active");
        $(target.currentTarget).addClass("active");

        var keepGoing = true;
        angular.forEach($scope.processDefList, function (item) {
            if (keepGoing) {
                if (item.formEnName == proDef.proDefGroupId) {
                    $scope.selectedProDefGroup = item;
                    keepGoing = false;
                }

            }
        });

        $scope.selectedProDef = proDef;

        $scope.isUpdate = false;
        $scope.$applyAsync();
        $scope.loadVersionInfo(proDef);
    };

    $scope.loadVersionInfo = function (processDef) {
        $scope.selectedProcessDefInfo = processDef;
        $scope.processVersionListParam = {processDefId: $scope.selectedProcessDefInfo.id, paging: "No"};
        SysUtils.silenceWithAuthAjax("/processDefVersion/list",$scope.processVersionListParam,function (resultInfo) {
            $scope.processVersionList = resultInfo.beanList;
            $scope.$applyAsync();
        });
    };

    $scope.addProcessDefInfo = function () {
        $scope.processDefManage = {};
        $scope.mode = 'create';
        $('#ProcessDefManageDialog').modal('show');
    };
    $scope.changeProcessGroup = function () {
        var keepGoing = true;
        angular.forEach($scope.processDefList, function (item) {
            if (keepGoing) {
                if (item.formEnName == $scope.processDefManage.proDefGroupId) {
                    $scope.selectedProDefGroup = item;
                    keepGoing = false;
                }

            }
        });
        $scope.$applyAsync();
    };
    $scope.saveProcessDefManageInfo = function () {
        $scope.processDefManage.flag = 1;
        SysUtils.postWhithBackInf("/processDefManage/" + $scope.mode,$scope.processDefManage,function (resultInfo) {
            $scope.changeNav();
            $scope.closeProcessDefManageDialog();
        });
    };
    $scope.delPdm = function (p) {
        SysUtils.swalConfirm("提示", "是否删除此流程", "info", function (isConfirm) {
            if (isConfirm) {
                p.flag = 0;
                $scope.postProcessPdm = p;
                $scope.updatePdm();
            }
        });
    }
    $scope.bacUsePdm = function (p) {
        SysUtils.swalConfirm("提示", "是否恢复此流程使用", "info", function (isConfirm) {
            if (isConfirm) {
                p.flag = 1;
                $scope.postProcessPdm = p;
                $scope.updatePdm();
            }
        });
    }

    $scope.updatePdmBefore = function () {
        $scope.postProcessPdm = $scope.selectedProDef;
        $scope.updatePdm();
    }

    $scope.updatePdm = function () {
        SysUtils.postWhithBackInf("/processDefManage/update" + $scope.mode,$scope.postProcessPdm,function (resultInfo) {
            $scope.changeNav();
        });
    };
    $scope.saveProcessVersionInfo = function () {
        SysUtils.postWhithBackInf("/processDefVersion/" + $scope.versionMode, $scope.processVersionEditBean,function (resultInfo) {
            $('#ProcessVersionDialog').modal('hide');
            $scope.loadVersionInfo($scope.selectedProcessDefInfo);
        });
    }

    $scope.activeVersion = function (processVersion) {
        SysUtils.swalConfirmNotClose("提示", "是否确定启用该版本？", "info", function (isConfirm) {
            if(isConfirm){
                SysUtils.postWhithBackInf("/processDefVersion/activiateVersion/" + processVersion.id, {},function (resultInfo) {
                    $scope.loadVersionInfo($scope.selectedProcessDefInfo);
                });
            }else{
                swal.close();
            }
        });
    }

    $scope.closeProcessDefManageDialog = function () {
        $scope.mode = '';
        $('#ProcessDefManageDialog').modal('hide');
    };

    $scope.goToVisualEditor = function (processVersion) {
        window.open(ENV.localapi + "/visualWF/index2.html?processVersionId=" + processVersion.id);
    };


    $scope.addProcessVersionInfo = function () {
        if ($scope.selectedProcessDefInfo == null) {
            SysUtils.swalOnlyConfirm("提示", '请选择流程定义', "info", function (isConfirm) {

            });
            return;
        }
        $scope.processVersionEditBean = {processDefId: $scope.selectedProcessDefInfo.id, isActive: '0'};
        $scope.versionMode = 'create';
        $('#ProcessVersionDialog').modal('show');
    }

    /*计算布局高度*/
    $scope.calculatedHeight=function(){
        $('.content-wrapper').css('height', SysUtils.get_content_wrapper());
        //console.log("=ceter_p=="+$('#panel-heading').outerHeight(true));
        $('.gdt_cont').css('max-height',$('.content').height());
        $('.details').css('height',$('.content').height());
    }

    $scope.calculatedHeight();
    /*计算布局高度*/
    /*var window_height = $(window).height();
    var heightList = [];
    heightList.push($('.main-header').outerHeight());
    $('.gdt_cont').css('height', maxHeigtTool.maxHeigt(window_height, heightList));
    $('.details').css('height', maxHeigtTool.maxHeigt(window_height, heightList));
    heightList.push($('.pdivdc').height() + 24);
    var resultHeight = maxHeigtTool.maxHeigt(window_height, heightList);
    $('#table_dt').css('max-height', resultHeight);*/

    /*************************三、初始定义****************************/
    $scope.queryProcessDefManage();
}])