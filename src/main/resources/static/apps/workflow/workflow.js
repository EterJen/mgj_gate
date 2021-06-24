myApp.config(function ($stateProvider, ENV) {

    $stateProvider.state('coreHome.todoList', {
        url: "/todoList",
        views: {
            'rightContent@coreHome': {
                templateUrl: ENV.templateLocate + "/apps/workflow/todoList.html?ts=" + timestamp,
                controller: "todoListCtrl",
                cache: false,
            }
        }
    });

/*    $stateProvider.state('coreHome.processDefList', {
        url: "/processDefList",
        views: {
            'rightContent@coreHome': {
                templateUrl: ENV.templateLocate + "/apps/workflow/processDefList.html?ts=" + timestamp,
                controller: "processDefListCtrl",
                cache: false,
            }
        },
        resolve: {
            loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
                return $ocLazyLoad.load([
                    'css/processDefList/layout.css',
                    'css/formEditNew/reset.css'
                ]);
            }]
        }
    });*/
});


/*myApp.controller('processDefListCtrl', ['$scope', 'ENV', '$state', '$cookies', 'SysUtils', 'dataFactory', '$timeout', 'maxHeigtTool', function ($scope, ENV, $state, $cookies, SysUtils, dataFactory, $timeout, maxHeigtTool) {
    console.log("processDefListCtrl controller");

    /!*************************一、变量定义****************************!/
    $scope.processDefManage = {};
    $scope.postProcessPdm = {};
    $scope.processVersionEditBean = {};
    $scope.processDefList = [];
    $scope.processVersionList = [];
    $scope.mode = '';
    $scope.versionMode = '';
    $scope.processDefListParam = {paging: 'No', flag: '1'};//
    $scope.processVersionListParam = {paging: 'No'};//
    $scope.selectedProcessDefInfo = null;
    $scope.RFormCommon = {};
    $scope.attUploadInfo = null;
    $scope.uselessList = true;
    $scope.isAttachShow = false;
    $scope.showWps = true;
    $scope.processActionSetting = false;
    $scope.orgNavType = "usefulProcess";
    $scope.formActionMap = {};
    $scope.formActionList = {};

    //$scope.showWps = true;
    $scope.fc = {
        fujianMidAttList: [],
        attachHistoryList: [],
        currentGroupOwnerAttach: null
    };
    $scope.formDefOptions = [
        {id: 'fawen', name: "长城电子发文"},//长城电子发
        {id: 'hjxgffawen', name: "长城电子规范发文"},//长城电子规范发文
        {id: 'jxwdwfawen', name: "长城电子党工发文"},//长城电子党委发文
        {id: 'gfkgbfawen', name: "国防办发文"},//沪府国防办发

        {id: 'jxwshouwen', name: "长城电子收"},//长城电子收
        {id: 'jxwdwshouwen', name: "长城电子党工收文"}, //长城电子党委收文
        {id: 'jywjj', name: "机要文件甲"}, //中央文件（甲）
        {id: 'jywjy', name: "机要文件乙"}, //市委文件（乙）
        {id: 'jywjb', name: "机要文件丙"}, //市府文件（丙）
        {id: 'jywjg', name: "机要文件国"}, //国务院文件（国）

        {id: 'jxwxinhan', name: "信函"}  //信函
    ]
    /!*计算布局高度*!/
    var window_height = $(window).height();
    // $('.main-sidebar').css('height', window_height);
    var heightList = [];
    heightList.push($('.main-header').outerHeight());
    var resultHeight = maxHeigtTool.maxHeigt(window_height, heightList);
    // $('.sidebar').css('height', resultHeight);
    $('#rightContent').css('height', resultHeight);
    var window_height = $(window).height();
    $('.sidebar_right').css('min-height', window_height - $('.main-header').outerHeight());
    $('.panel').css('height', window_height - $('.main-header').outerHeight());
    $('#proDefTree').css('height', window_height - $('.main-header').outerHeight() - $('#toolBar').outerHeight());
    $('#processVersion').css('height', window_height - $('.main-header').outerHeight() - $('#toolBar').outerHeight()+40);
    /!*************************二、函数定义****************************!/
    $scope.addProcessDefInfo = function () {
        $scope.processDefManage = {};
        $scope.mode = 'create';
        $('#ProcessDefManageDialog').modal('show');
    }

    $scope.newPfa = function () {
        $("#formActionForm").get(0).reset();
        $scope.selectedActionForm = {};
        $scope.selectedActionForm.flag = "1";
        $scope.mode = 'create';
        $('#formActionDialog').modal('show');
    }


    $scope.delPfa = function (obj) {
        SysUtils.swalConfirm("提示", "是否删除此操作", "info", function (isConfirm) {
            if (isConfirm) {
                $scope.selectedActionForm =obj;
                $scope.mode = "update";
                $scope.selectedActionForm.flag = "0";
                $scope.saveProcessFormAction();
            }
        });
    }

    $scope.reusePfa = function (obj) {
        SysUtils.swalConfirm("提示", "是否恢复此操作使用", "info", function (isConfirm) {
            if (isConfirm) {
                $scope.selectedActionForm =obj;
                $scope.mode = "update";
                $scope.selectedActionForm.flag = "1";
                $scope.saveProcessFormAction();
            }
        });

    }

    $scope.updatePfa = function (obj) {
        $scope.selectedActionForm =obj;
        $scope.mode = "update";
        $('#formActionDialog').modal('show')
    }


    $scope.queryUselessPfa = function () {
        $scope.uselessList = false;
        $scope.queryFormActionMapAndList(0);
    }

    $scope.queryUsefulPfa = function () {
        $scope.uselessList = true;
        $scope.queryFormActionMapAndList(1);
    }

    $scope.queryFormActionMapAndList = function (flag) {
        var queryBean = {};
        queryBean.paging = "No";
        queryBean.flag = flag;
        SysUtils.requestByJson('/formAction/listAndMap', queryBean, function (resultInfo) {
            $scope.formActionMap = resultInfo.additionalInfo.dbParams;
            $scope.formActionList = resultInfo.beanList;
            $('#table_body').css('height', window_height - $('.main-header').outerHeight() - $('#toolBar').outerHeight()-$('#table_head').outerHeight()-20);
            $scope.processActionSetting = true;
            $scope.$applyAsync();
        });
    }




    $scope.saveProcessFormAction = function () {
        SysUtils.postWhithBackInf('/formAction/'+$scope.mode, $scope.selectedActionForm, function (resultInfo) {
            $('#formActionDialog').modal('hide');
            $scope.queryFormActionMapAndList('1');
            $scope.$applyAsync();
        });
    }




    $scope.initVars = function (type) {
        $scope.selectedProDef = {};
        $scope.selectedProDefGroup = {};
        $scope.isUpdate = false;
        $scope.processActionSetting = false;
        $scope.uselessList = true;
    }

    $scope.changeNav = function (type) {
        $scope.initVars();

        $scope.orgNavType = type;
        $scope.$applyAsync();
        if (type == 'usefulProcess') {
            $scope.processDefListParam.flag = 1;
        } else {
            $scope.processDefListParam.flag = 0;
        }
        $scope.queryProcessDefManage();
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

    $scope.isUpdate = false;

    $scope.updatePdmBefore = function () {
        $scope.postProcessPdm = $scope.selectedProDef;
        $scope.updatePdm();
    }

    $scope.updatePdm = function () {
        $.ajax({
            type: "POST",
            url: ENV.localapi + "/processDefManage/update",
            beforeSend: function (request) {
                request.setRequestHeader("Content-type", "application/json");
                //request.setRequestHeader("Authorization", "Bearer " + $cookies.getObject('user').token);
            },
            dataType: 'json',
            data: JSON.stringify($scope.postProcessPdm),
            success: function (resultInfo) {
                SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                    $scope.queryProcessDefManage();
                    $scope.initVars();
                    $scope.$apply();
                })
            },
            error: function (XMLResponse) {
                console.log(JSON.stringify(XMLResponse));
            }
        })
    }


    $scope.queryProcessDefManage = function () {
        $.ajax({
            type: "POST",
            url: ENV.localapi + "/processDefManage/groupingTree",
            beforeSend: function (request) {
                request.setRequestHeader("Content-type", "application/json");
                //request.setRequestHeader("Authorization", "Bearer " + $cookies.getObject('user').token);
            },
            dataType: 'json',
            data: JSON.stringify($scope.processDefListParam),
            success: function (resultInfo) {
                console.log(resultInfo);
                SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                    $scope.processDefList = resultInfo.beanList;
                    $scope.$applyAsync();
                })
            },
            error: function (XMLResponse) {
                console.log(JSON.stringify(XMLResponse));
            }
        })
    }

    $scope.closeProcessDefManageDialog = function () {
        $scope.mode = '';
        $('#ProcessDefManageDialog').modal('hide');
    }

    $('#ProcessDefManageDialog').on('hidden.bs.modal', function () {
        $("#pdmEditForm").get(0).reset();
        $scope.initVars();
        $scope.isUpdate = false;
        $scope.$applyAsync();
    });

    $scope.saveProcessDefManageInfo = function () {
        $scope.processDefManage.flag = 1;
        $.ajax({
            type: "POST",
            url: ENV.localapi + "/processDefManage/" + $scope.mode,
            beforeSend: function (request) {
                request.setRequestHeader("Content-type", "application/json");
                //request.setRequestHeader("Authorization", "Bearer " + $cookies.getObject('user').token);
            },
            dataType: 'json',
            data: JSON.stringify($scope.processDefManage),
            success: function (resultInfo) {
                SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                    SysUtils.swalOnlyConfirm("提示", resultInfo.message, "info", function (isConfirm) {
                        $('#ProcessDefManageDialog').modal('hide');
                        location.reload();
                    });
                })
            },
            error: function (XMLResponse) {
                console.log(JSON.stringify(XMLResponse));
            }
        });
    }

    $scope.selectedProDef = {};
    $scope.selectedProDefGroup = {};
    $scope.defGroupFocus = function (proDefGroup, target) {
        $(".angular-ui-tree-handle").removeClass("active");
        $(target.currentTarget).addClass("active");

        $scope.selectedProDefGroup = proDefGroup;
        $scope.selectedProDef = {};
        $scope.selectedProDefGroup.showToolBar = true;
        $scope.selectedProDef.showToolBar = false;
        $scope.isUpdate = false;
        $scope.$applyAsync();
    }

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

        $scope.selectedProDefGroup.showToolBar = false;
        $scope.selectedProDef.showToolBar = true;
        $scope.isUpdate = false;
        $scope.$applyAsync();
        $scope.loadVersionInfo(proDef);
    }


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

    $scope.closeProcessVersionDialog = function () {
        $('#ProcessVersionDialog').modal('hide');
    }

    $scope.saveProcessVersionInfo = function () {
        $.ajax({
            type: "POST",
            url: ENV.localapi + "/processDefVersion/" + $scope.versionMode,
            beforeSend: function (request) {
                request.setRequestHeader("Content-type", "application/json");
                //request.setRequestHeader("Authorization", "Bearer " + $cookies.getObject('user').token);
            },
            dataType: 'json',
            data: JSON.stringify($scope.processVersionEditBean),
            success: function (resultInfo) {
                SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                    SysUtils.swalOnlyConfirm("提示", resultInfo.message, "info", function (isConfirm) {
                        $('#ProcessVersionDialog').modal('hide');
                        $scope.loadVersionInfo($scope.selectedProcessDefInfo);
                    });
                })
            },
            error: function (XMLResponse) {
                console.log(JSON.stringify(XMLResponse));
            }
        });
    }

    $scope.loadVersionInfo = function (processDef) {
        $scope.selectedProcessDefInfo = processDef;
        $scope.processVersionListParam = {processDefId: $scope.selectedProcessDefInfo.id, paging: "No"};
        $.ajax({
            type: "POST",
            url: ENV.localapi + "/processDefVersion/list",
            beforeSend: function (request) {
                request.setRequestHeader("Content-type", "application/json");
                //request.setRequestHeader("Authorization", "Bearer " + $cookies.getObject('user').token);
            },
            dataType: 'json',
            data: JSON.stringify($scope.processVersionListParam),
            success: function (resultInfo) {
                SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                    $scope.processVersionList = resultInfo.beanList;
                    $scope.$apply();
                })
            },
            error: function (XMLResponse) {
                console.log(JSON.stringify(XMLResponse));
            }
        });
    }


    $scope.goToVisualEditor = function (processVersion) {
        /!*		var mode = '';
                if(processVersion.filePath==null)
                    mode = 'create';
                else
                    mode = 'update';
        *!/
        window.open(ENV.localapi + "/visualWF/index2.html?processVersionId=" + processVersion.id);
    }

    $scope.activeVersion = function (processVersion) {
        SysUtils.swalConfirmNotClose("提示", "是否确定启用该版本？", "info", function (isConfirm) {
            if (isConfirm) {
                $.ajax({
                    type: "POST",
                    url: ENV.localapi + "/processDefVersion/activiateVersion/" + processVersion.id,
                    beforeSend: function (request) {
                        request.setRequestHeader("Content-type", "application/json");
                        //request.setRequestHeader("Authorization", "Bearer " + $cookies.getObject('user').token);
                    },
                    data: "processVersionId=" + processVersion.id,
                    success: function (resultInfo) {
                        SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                            SysUtils.swalOnlyConfirm("提示", resultInfo.message, "info", function (isConfirm) {
                                $scope.loadVersionInfo($scope.selectedProcessDefInfo);
                            });
                        })
                    },
                    error: function (XMLResponse) {
                        console.log(JSON.stringify(XMLResponse));
                    }
                });
            } else {
                swal.close();
            }
        });
    }

    /!*************************三、初始化调用****************************!/
    $scope.queryProcessDefManage();

    $scope.$on('$viewContentLoaded', function () {
        /!*
        $("#processDefListTable").on("click-row.bs.table",function(e,row,ele){
            $(".danger").removeClass("danger");
            $(ele).addClass("danger");
        });*!/
    });
    /!*================wps初始化====start===================*!/
    var DocFrame;
    var obj = null;
    var app;
    var MenuItems = {
        FILE: 1 << 0,
        EDIT: 1 << 1,
        VIEW: 1 << 2,
        INSERT: 1 << 3,
        FORMAT: 1 << 4,
        TOOL: 1 << 5,
        CHART: 1 << 6,
        HELP: 1 << 7
    };
    var FileSubmenuItems = {
        NEW: 1 << 0,
        OPEN: 1 << 1,
        CLOSE: 1 << 2,
        SAVE: 1 << 3,
        SAVEAS: 1 << 4,
        PAGESETUP: 1 << 5,
        PRINT: 1 << 6,
        PROPERTY: 1 << 7
    };

    /!*
        $scope.openWps = function () {
            //$scope.fc.wpsDetail.middleContentType = 'form';
            if (SysUtils.isWindows()) {
                DocFrame = SysUtils.openWps(DocFrame, obj, app, "wpsContent", "100%", "100%");
                DocFrame.createDocument("uot");
            } else {
                obj = SysUtils.initLinux("wpsContent", "100%", "100%");
                //obj = this.initLinux(tagID, width, height);
                var Interval_control = setInterval(
                    function () {
                        app = obj.Application;
                        if (app && app.IsLoad()) {
                            clearInterval(Interval_control);
                            app.createDocument("wps");
                        }
                    }, 500);
            }
        }
    *!/

    $scope.fc.fileUpload = function () {
        accUrl = ENV.localapi + "/attachment/upload";
        if (SysUtils.isEmpty($scope.attUploadInfo.annexDescription)) {
            swal("提示", "附件说明必须填写", "info");
            return;
        }
        var fd = new FormData();
        var file = $scope.fc.headPortrait;
        if ($scope.fc.currentGroupOwnerAttach !== null)
            $scope.attUploadInfo.id = $scope.fc.currentGroupOwnerAttach.id;
        $scope.attUploadInfo.initType = "add";
        //console.log(JSON.stringify($scope.attUploadInfo));
        fd.append('file', file);
        //fd.append('fileType', "HeadPortrait");
        fd.append('selectedBean', JSON.stringify($scope.attUploadInfo));
        fd.append('isWindows', SysUtils.isWindows());
        dataFactory.getlist(accUrl, 'POST', {'Content-type': undefined}, fd).then(
            function (d) {
                console.log(JSON.stringify(d));
                SysUtils.handleResult(d, {'state': $state}, function () {
                    swal("提示", d.message, "success");
                    $('#uploadAttach').modal('hide');
                    //查询主附件所需要的参数
                    $scope.attUploadInfo = {
                        processInstanceId: $scope.fc.processDef.id,
                        bizAttachType: "taohongmoban",
                        bizFileType: "content"
                    }
                    $scope.fc.queryAttach($scope.attUploadInfo, "open");
                })
            },
            function (d) {
                console.log(JSON.stringify(d));
            }
        )
    };
    $scope.enclosureAction = function (action, attach) {
        var attachUrl;
        if (action === 'download') {
            attachUrl = ENV.localapi + "/attach/downloadWps?id=" + attach.attachment.id;
            var xhr = new XMLHttpRequest();
            xhr.open("get", attachUrl);
            xhr.responseType = "blob";
            xhr.setRequestHeader("Content-Type", "multipart/form-data");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var name = xhr.getResponseHeader("Content-disposition");
                    var filename = name.substring(20, name.length);
                    var blob = new Blob([xhr.response], {type: 'text/doc'});
                    var csvUrl = URL.createObjectURL(blob);
                    var link = $("#aa");
                    link.href = csvUrl;
                    link.download = attach.filename;
                    link.click();
                }
            };
            xhr.send(null);
        } else if (action === 'delete') {
            attachUrl = ENV.localapi + "/attachment/delete/" + attach.attachment.id;
            dataFactory.getlist(attachUrl, 'POST', {'Content-type': "application/json"}, JSON.stringify(attach)).then(
                function (d) {
                    SysUtils.handleResult(d, {'state': $state}, function () {
                        swal("提示", d.message, "success");
                        $scope.fc.queryHistoryAttach();
                        //$scope.fc.queryAttach($scope.fc.currentGroupOwnerAttach);
                    })
                },
                function (d) {
                    console.log(JSON.stringify(d));
                }
            )
        } else if (action === "open") {
            $scope.fc.currentAttach = attach;
            $scope.fc.wpsDetail.middleContentType = 'wps';
            console.log("地址==" + ENV.localapi + attach);
            /!*var aa = DocFrame.openDocumentRemote(ENV.localapi+attach.url,false);*!/
            var aa = SysUtils.openDocumentRemote(DocFrame, app, ENV.localapi + attach.url, false);

        }
    }
    $scope.fc.SendDataToServer = function () {
        console.log('附件信息：' + JSON.stringify($scope.attUploadInfo));
        var params = "";
        params += "processInstanceId=" + $scope.fc.processDef.id;
        params += "&bizAttachType=" + $scope.attUploadInfo.bizAttachType;
        params += "&bizFileType=" + $scope.attUploadInfo.bizFileType;
        params += "&fileExt=" + $scope.attUploadInfo.fileExt;
        params += "&isWindows=" + SysUtils.isWindows();
        params += "&userId=" + $cookies.getObject('user').beanId;
        var saveUrl = ENV.localapi + "/attach/uploadWps?" + params;
        if ($scope.fc.currentGroupOwnerAttach == null) {//新建
            var defaultText = $scope.fc.processDef.name + ".wps";
            var name = prompt("请输入要保存的名称", defaultText);
            if (name != null && name != "") {
                //var ret = DocFrame.saveURL(saveUrl, name);
                var ret = SysUtils.saveURL(DocFrame, app, saveUrl, name);
                if (ret) {
                    //$scope.fc.wpsDetail.middleContentType = 'form';
                    $scope.fc.queryAttach($scope.attUploadInfo);
                    alert('保存成功');
                }
            }
        } else {//更新
            saveUrl += "&id=" + $scope.fc.currentGroupOwnerAttach.id;
            var ret = SysUtils.saveURL(DocFrame, app, saveUrl, $scope.fc.currentGroupOwnerAttach.attachment.filename);
            if (ret) {
                //$scope.fc.wpsDetail.middleContentType = 'form';
                $scope.fc.queryAttach($scope.attUploadInfo);
                alert('保存成功');
            }
        }
    }
    $scope.loadVersionFormId = function (processDef) {
        $scope.isAttachShow = true;
        $scope.fc.processDef = processDef;
        $scope.attUploadInfo = {
            processInstanceId: $scope.fc.processDef.id,
            bizAttachType: "taohongmoban",
            bizFileType: "content"
        }
        $scope.fc.queryAttach($scope.attUploadInfo, "open");
        /!*$scope.attUploadInfo = {
                processInstanceId: processDef.id,
                bizAttachType: "taohongmoban",
                bizFileType:"content"
        };
        $scope.attUploadInfo = {
                id:datas.id,
                processInstanceId: datas.processInstanceId,
                bizAttachType: datas.bizAttachType,
                bizFileType:datas.bizFileType
            };
        $scope.task.belongingProInst.fujianMidAttList=[];//附件初始化
        $('#uploadAttach').modal('show');*!/
    }
    $scope.fc.returnForm = function () {
        $scope.isAttachShow = false;
    }
    //添加正文
    $scope.addAttachment = function (type) {
        $scope.fc.currentAttach = null;
        $scope.fc.currentGroupOwnerAttach = null;//组主信息
        $scope.showWps = false;
        if (type === "zhengwen") {
            $scope.attUploadInfo = {
                bizAttachType: 'zhengwen',//正文
                bizFileType: 'content',//内容
                fileExt: 'wps'//后缀
            }
            SysUtils.createDocument(DocFrame, app);
        } else if (type === "add") {
            $scope.attUploadInfo = {
                processInstanceId: $scope.fc.processDef.id,
                bizAttachType: "taohongmoban",
                bizFileType: "content",
                fileExt: 'wps'
            };
            $scope.fc.fujianMidAttList = [];//附件初始化
            //$scope.fc.queryAttach();//查询附件
            $('#uploadAttach').modal('show');
        }
    }
    //查询版本记录
    $scope.fc.queryAttach = function (middelAttach, action) {
        middelAttach.groupLeaderId = middelAttach.id;
        dataFactory.getlist(ENV.localapi + "/middleAttachment/gethistoricalVersion", 'POST', {'Content-type': "application/json"}, JSON.stringify(middelAttach)).then(
            function (d) {
                if (action === "history") {
                    $scope.fc.attachHistoryList = d.beanList;
                    $('#uploadAttach').modal('show');
                } else if (action === "open" && d.beanList !== null && d.beanList.length === 1) {
                    $scope.fc.attachList = d.beanList;
                    $scope.fc.openDocumentText($scope.fc.attachList[0], "groupOwner");
                } else if (d.beanList !== null && d.beanList.length === 1) {
                    $scope.fc.attachList = d.beanList;
                    $scope.fc.currentGroupOwnerAttach = d.beanList[0];
                } else
                    $scope.fc.attachList = d.beanList;

            },
            function (d) {
                console.log(JSON.stringify(d));
            }
        )
    };
    //查询历史按钮事件
    $scope.fc.queryHistoryAttach = function () {
        if ($scope.fc.currentGroupOwnerAttach === null) {
            swal("提示", "请先上传模板！", "info");
        } else {
            $scope.showWps = false;
            //console.log("=="+JSON.stringify($scope.fc.currentGroupOwnerAttach));
            $scope.fc.queryAttach($scope.fc.currentGroupOwnerAttach, "history");
        }
    }

    $scope.fc.openDocumentText = function (attachMiddle, type) {//打开正文或者附件
        $scope.fc.currentAttach = attachMiddle;
        //$scope.showWps=true;
        if (type === "groupOwner") {
            $scope.fc.currentGroupOwnerAttach = attachMiddle;
        }
        var fileType = SysUtils.getFileExt($scope.fc.currentAttach.attachment.filename);
        var bizFileType = $scope.fc.currentAttach.bizFileType;
        //$scope.fc.wpsDetail.middleContentType = 'wps';
        $scope.attUploadInfo = {
            processInstanceId: $scope.fc.processDef.id,
            bizAttachType: $scope.fc.currentAttach.bizAttachType,//正文
            bizFileType: bizFileType,//套红
            fileExt: 'wps'//后缀
        }
        var url = ENV.localapi + "/attach/downloadWps?id=" + $scope.fc.currentAttach.attachment.id;
        if (SysUtils.isWindows()) {
            $timeout(function () {
                console.log("windoes地址====" + url);
                SysUtils.openDocumentRemote(DocFrame, app, url, false);
            }, 1000);
        } else {
            obj = SysUtils.initLinux("wpsContent", "100%", "100%");
            $timeout(function () {
                console.log("linux地址====" + url);
                app = obj.Application;
                if (app && app.IsLoad()) {
                    SysUtils.openDocumentRemote(DocFrame, app, url, false);
                }
            }, 1000);
        }
    }
    // $scope.openWps();
    //liunx下面模态框不能遮盖wps控件，只能用显示和影藏的办法
    $('#uploadAttach').on('hidden.bs.modal', function (e) {
        // do something...
        $scope.showWps = true;
        $scope.$apply();
        //console.log("=uploadAttach===");
    });
    $('#saveDocDialog').on('hidden.bs.modal', function (e) {
        // do something...
        $scope.showWps = true;
        $scope.$apply();
        //console.log("==saveDocDialog==");
    })
}])*/;

/*myApp.controller('todoListCtrl', ['$scope', 'ENV', '$state', '$cookies', 'SysUtils', 'maxHeigtTool', function ($scope, ENV, $state, $cookies, SysUtils, maxHeigtTool) {
    console.log("todoListCtrl controller");

    var window_height = $(window).height();
    var heightList = [];
    heightList.push($('.main-header').outerHeight());
    heightList.push($('.panel-heading').outerHeight(true));
    var resultHeight = maxHeigtTool.maxHeigt(window_height, heightList);
    $('.panel-body').css('max-height', resultHeight);
    $('.panel-body').css('height', resultHeight);

    /!*************************一、变量定义****************************!/
    $scope.currTaskList = [];//当前用户列表
    $scope.proInst = {};
    $scope.processVersionQueryBean = {};//流程版本的列表查询bean
    $scope.activeProcVersionList = {};//当前启用的流程版本列表
    /!*************************二、函数定义****************************!/

    $scope.saveProInst = function () {
        $.ajax({
            type: "POST",
            url: ENV.localapi + "/rProcessInstance/create",
            beforeSend: function (request) {
                request.setRequestHeader("Content-type", "application/json");
                //request.setRequestHeader("Authorization", "Bearer " + $cookies.getObject('user').token);
            },
            dataType: 'json',
            data: JSON.stringify($scope.proInst),
            success: function (resultInfo) {
                SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                    SysUtils.swalOnlyConfirm("提示", resultInfo.message, "info", function (isConfirm) {
                        $('#createProInstDialog').modal('hide');
                        console.log(ENV.localapi + "/index.html#!/formEditGeneric/" + resultInfo.additionalInfo.formDefId + "/" + resultInfo.additionalInfo.currentTuskId)
                        window.open(ENV.localapi + "/index.html#!/formEditGeneric/" + resultInfo.additionalInfo.formDefId + "/" + resultInfo.additionalInfo.currentTuskId);
                        $scope.initCuTask();
                    });
                })
            },
            error: function (XMLResponse) {
                console.log(JSON.stringify(XMLResponse));
            }
        });
    }

    $scope.openCreateProInstDialog = function () {
        $scope.proInst = {};
        $scope.processVersionQueryBean = {paging: 'N0', isActive: '1', dbParams: {defManageFlag: '1'}};
        $.ajax({
            type: "POST",
            url: ENV.localapi + "/processDefVersion/list",
            beforeSend: function (request) {
                request.setRequestHeader("Content-type", "application/json");
                //request.setRequestHeader("Authorization", "Bearer " + $cookies.getObject('user').token);
            },
            dataType: 'json',
            data: JSON.stringify($scope.processVersionQueryBean),
            success: function (resultInfo) {
                SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                    $scope.activeProcVersionList = resultInfo.beanList;
                    console.log($scope.processVersionQueryBean);
                    console.log($scope.activeProcVersionList);
                    $scope.$apply();
                    $('#createProInstDialog').modal('show');
                })
            },
            error: function (XMLResponse) {
                console.log(JSON.stringify(XMLResponse));
            }
        });
    }

    $scope.closeCreateDialog = function () {
        $('#createProInstDialog').modal('hide');
    }

    $scope.gotoDetail = function (task, cIdx) {
        console.log(task);
        var formDefId = task.belongingProInst.formDefId
        window.open(ENV.localapi + "/index.html#!/formEditGeneric/" + formDefId + "/" + task.id);
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

    $scope.cuTaskScroll = false;
    $scope.pageAuto = function () {
        $scope.proInst = {};
        $scope.proInst.paging = "Yes";
        $scope.proInst.pageNo = $scope.paginationConf.currentPage;
        $scope.proInst.pageSize = $scope.paginationConf.itemsPerPage;
        $scope.proInst.totalRows = $scope.paginationConf.totalItems;
        // console.log($('#table_dt').height());
        if ($scope.proInst.pageSize > 10 ) {
            // $scope.cuTaskScroll = true;
            $('#table_dt').css('height', 500 );
        }else {
            // $scope.cuTaskScroll = false;
            $('#table_dt').css('height', 450 );
        }

        // console.log($('#table_dt').height());
        // console.log($scope.cuTaskScroll);

        $scope.initCuTask();
    };


    $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.pageAuto);
    //</editor-fold>

    $scope.initCuTask = function () {
        $.ajax({
            type: "POST",
            url: ENV.localapi + "/rCurrentTaskInfo/getTodoList",
            beforeSend: function (request) {
                request.setRequestHeader("Content-type", "application/json");
                //request.setRequestHeader("Authorization", "Bearer " + $cookies.getObject('user').token);
            },
            dataType: 'json',
            data: JSON.stringify($scope.proInst),
            success: function (resultInfo) {
                SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                    $scope.currTaskList = resultInfo.beanList;
                    $scope.paginationConf.totalItems = resultInfo.totalRows;
                    $scope.$apply();
                })
            },
            error: function (XMLResponse) {
                console.log(JSON.stringify(XMLResponse));
            }
        });
    }


    /!*************************三、初始化调用****************************!/
    // $scope.initCuTask();
}])*/;


myApp.controller('doneListCtrl', ['$scope', 'ENV', '$state',  'SysUtils', 'maxHeigtTool', function ($scope, ENV, $state,  SysUtils, maxHeigtTool) {
    console.log("doneListCtrl controller");
    $scope.doneList = [];


    $scope.gotoDetail = function (proInst) {
        window.open(ENV.localapi + "/index.html#!/officialDocuments/" + proInst.formDefId + "/-" + proInst.id);
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
        $scope.proInst.pageNo = $scope.paginationConf.currentPage;
        $scope.proInst.pageSize = $scope.paginationConf.itemsPerPage;
        $scope.proInst.totalRows = $scope.paginationConf.totalItems;
        console.log($('#table_dt').height());
        if ($scope.proInst.pageSize > 10 ) {
            // $scope.cuTaskScroll = true;
            $('#table_dt').css('height', 500 );
        }else {
            // $scope.cuTaskScroll = false;
            $('#table_dt').css('height', 450 );
        }

        console.log($('#table_dt').height());
        console.log($scope.cuTaskScroll);

        $scope.queryDoneList();
    };


    $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.pageAuto);
    //</editor-fold>


    $scope.queryDoneList = function (proInst) {
        SysUtils.requestByJson("/rProcessInstance/doneList", $scope.proInst, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                $scope.doneList = resultInfo.beanList;
                $scope.paginationConf.totalItems = resultInfo.totalRows;
                $scope.$apply();
            })
        })
        ;
    }

    var window_height = $(window).height();
    var heightList = [];
    heightList.push($('.main-header').outerHeight());
    heightList.push($('.panel-heading').outerHeight(true));
    var resultHeight = maxHeigtTool.maxHeigt(window_height, heightList);
    $('.panel-body').css('max-height', resultHeight);
    $('.panel-body').css('height', resultHeight);
}]);




