/*myApp.config(function ($stateProvider, ENV) {
    $stateProvider.state('coreHome.redTemplate', {
        url: "/redTemplate",
        views: {
            'rightContent@coreHome': {
                templateUrl: ENV.templateLocate + "/apps/workflow/redTemplate/redTemplate.html?ts=" + timestamp,
                controller: "redTemplateCtrl",
                cache: false,
            }
        },
        resolve: {
            loadFormEditResources: ['$ocLazyLoad', 'SysUtils', function ($ocLazyLoad, SysUtils) {
                return $ocLazyLoad.load([
                    //'css/processDefList/layout.css',
                    //'css/formEditNew/reset.css',
                    'js/contextMenu/jquery.contextMenu.min.css',
                    'js/contextMenu/jquery.ui.position.min.js',
                    'js/contextMenu/jquery.contextMenu.min.js'
                ]);
            }]
        }
    });
});*/


myApp.controller('redTemplateCtrl', ['$rootScope', '$scope', 'ENV', '$state',  'SysUtils', 'dataFactory', '$timeout', 'maxHeigtTool', function ($rootScope, $scope, ENV, $state,  SysUtils, dataFactory, $timeout, maxHeigtTool) {
    console.log("redTemplateCtrl controller");

    /*************************一、变量定义****************************/
    $scope.currentUser = $rootScope.currentUser;
    $rootScope.addBgground = true;
    $scope.selectedProcessDefInfo = null;
    $scope.attUploadInfo = null;
    $scope.isAttachShow = false;
    //$scope.showWps = true;

    //$scope.showWps = true;
    $scope.fc = {
        fujianMidAttList: [],
        attachHistoryList: [],
        upDownTypeList: [],
        currentTarget:null,
        currentGroupOwnerAttach: null
    };


    /*************************二、函数定义****************************/
    $scope.$on('$viewContentLoaded', function () {

    });
    /*================wps初始化====start===================*/
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

    $scope.openWps = function () {
        if (SysUtils.isWindows()) {
            DocFrame = SysUtils.openWps(DocFrame, obj, app, "wpsContent", "100%", "90%");
            DocFrame.createDocument("uot");
        } else {
            obj = SysUtils.initLinux("wpsContent", "100%", "90%");
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
    
    /*$scope.visible = function (item) {
        return !($scope.query && $scope.query.length > 0
        && item.title.indexOf($scope.query) == -1);
      };*/

    $scope.fc.queryUpDownType = function () {//查詢上下文類型
        var queryUrl = "/wfDocType/redTemplate/list";
        var param = {"paging": "No"};
        //console.log("queryUpDownType====");
        SysUtils.requestByJson(queryUrl, param, function (resultInfo) {
            $scope.fc.upDownTypeList = resultInfo.beanList;
            //console.log("queryUpDownType====resultInfo");
        })
    }

    $scope.fc.fileUpload = function () {
        accUrl = ENV.localapi + "/attachment/uploadRedTemplate";
        if (SysUtils.isEmpty($scope.attUploadInfo.annexDescription)) {
            swal("提示", "附件说明必须填写", "info");
            return;
        }
        if (SysUtils.isEmpty($scope.attUploadInfo.processInstanceId)) {
            swal("提示", "请选择绑定的文种", "info");
            return;
        }

        var fd = new FormData();
        var file = $scope.fc.headPortrait;
        /*if($scope.fc.currentGroupOwnerAttach!==null)
         $scope.attUploadInfo.id=$scope.fc.currentGroupOwnerAttach.id;*/
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
                        //processInstanceId: $scope.fc.processDef.id,
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
            var aa = SysUtils.openDocumentRemote(DocFrame, app, ENV.localapi + attach.url, false);

        }
    }
    $scope.fc.SendDataToServer = function () {
        console.log('附件信息：' + JSON.stringify($scope.attUploadInfo));
        var params = "";
        params += "processInstanceId=" + $scope.fc.currentGroupOwnerAttach.processInstanceId;
        params += "&bizAttachType=" + $scope.attUploadInfo.bizAttachType;
        params += "&bizFileType=" + $scope.attUploadInfo.bizFileType;
        params += "&fileExt=" + $scope.attUploadInfo.fileExt;
        params += "&isWindows=" + SysUtils.isWindows();
        params += "&userId=" + $scope.currentUser.id;
        var saveUrl = ENV.localapi + "/attach/uploadRedTemplate?" + params;
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
            	//没有上传和版本记录了
                //$scope.attUploadInfo.processInstanceId = null;
                //$scope.fc.queryAttach($scope.attUploadInfo);
                swal("提示", "保存成功！", "success");
                //window.location.reload();
                //alert('保存成功');
            }
        }
    }
    $scope.loadVersionFormId = function (processDef) {
        //$scope.showWps = true;
        $scope.hidenModel();
        $scope.attUploadInfo = {
            //processInstanceId: $scope.fc.processDef.id,
            bizAttachType: "taohongmoban",
            bizFileType: "content"
        }
        $scope.fc.queryAttach($scope.attUploadInfo);
    }
    $scope.fc.returnForm = function () {
        $scope.isAttachShow = false;
    }
    //添加正文
    $scope.addAttachment = function (type) {
        $scope.fc.currentAttach = null;
        $scope.fc.currentGroupOwnerAttach = null;//组主信息
        //$scope.showWps=false;
        $scope.hidenModel();
        if (type === "zhengwen") {
            $scope.attUploadInfo = {
                bizAttachType: 'zhengwen',//正文
                bizFileType: 'content',//内容
                fileExt: 'wps'//后缀
            }
            SysUtils.createDocument(DocFrame, app);
        } else if (type === "add") {
            $scope.attUploadInfo = {
                processInstanceId: null,
                bizAttachType: "taohongmoban",
                bizFileType: "content",
                fileExt: 'wps'
            };
            $scope.fc.attachHistoryList = [];//附件初始化

            $('#uploadAttach').modal('show');
        }
    }
    //查询版本记录
    $scope.fc.queryAttach = function (middelAttach, action) {
        middelAttach.groupLeaderId = middelAttach.id;
        middelAttach.paging="No";
        dataFactory.getlist(ENV.localapi + "/middleAttachment/gethistoricalVersion", 'POST', {'Content-type': "application/json"}, JSON.stringify(middelAttach)).then(
            function (d) {
                if (action === "history") {
                    $scope.fc.attachHistoryList = d.beanList;
                    $('#uploadAttach').modal('show');
                } else if (action === "open" && d.beanList !== null && d.beanList.length > 0) {
                    $scope.fc.attachList = d.beanList;
                    $scope.fc.openDocumentText($scope.fc.attachList[0], "groupOwner");
                    $scope.fc.currentGroupOwnerAttach = d.beanList[0];
                } else{
                	 $scope.fc.attachList = d.beanList;
                }
                $scope.data=d.beanList;
                if($scope.fc.currentTarget!==null){
                	//console.log("=="+$scope.fc.currentTarget);
                	$($scope.fc.currentTarget).addClass("active");
                }
                console.log("=="+$scope.data);
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
            //$scope.showWps = false;
            $scope.hidenModel();
            //console.log("=="+JSON.stringify($scope.fc.currentGroupOwnerAttach));
            $scope.fc.queryAttach($scope.fc.currentGroupOwnerAttach, "history");
        }
    }

    $scope.fc.saveDoc = function () {
        $scope.fc.currentGroupOwnerAttach.attachment.filename=$scope.fc.beforeExt+$scope.fc.behindExt;
        var url = ENV.localapi + "/attachment/update";
        SysUtils.httpFactory(url, JSON.stringify($scope.fc.currentGroupOwnerAttach.attachment), function (d) {
            swal("提示", d.message, "success");
            $('#saveDocDialog').modal('hide');
            $scope.attUploadInfo.processInstanceId = null;
            $scope.fc.queryAttach($scope.attUploadInfo);
        });
    }
    $scope.fc.openDocumentText = function (attachMiddle, type,target) {//打开正文或者附件
    	$(".angular-ui-tree-handle").removeClass("active");
		$(target.currentTarget).addClass("active");
    	$scope.openWps();
        $scope.fc.currentAttach = attachMiddle;
        $scope.fc.currentTarget=target.currentTarget;
        //$scope.showWps=true;
        $scope.showModel();
        if (type === "groupOwner") {
            $scope.fc.currentGroupOwnerAttach = attachMiddle;
        }
        var fileType = SysUtils.getFileExt($scope.fc.currentAttach.attachment.filename);
        var bizFileType = $scope.fc.currentAttach.bizFileType;
        //$scope.fc.wpsDetail.middleContentType = 'wps';
        $scope.attUploadInfo = {
            processInstanceId: attachMiddle.processInstanceId,
            bizAttachType: $scope.fc.currentAttach.bizAttachType,//正文
            bizFileType: bizFileType,//套红
            fileExt: 'wps'//后缀
        }
        var url = ENV.localapi + "/attach/downloadWps?id=" + $scope.fc.currentAttach.attachment.id+"&bizAttachType=taohongmoban";
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
    /*************************三、初始化调用****************************/
    //初始化 chrome
    //$scope.openWps();
    $scope.fc.queryUpDownType();//初始化上下文下拉選項

    //liunx下面模态框不能遮盖wps控件，只能用显示和影藏的办法
    $('#uploadAttach').on('hidden.bs.modal', function (e) {
        $scope.showModel();
    });
    $('#saveDocDialog').on('hidden.bs.modal', function (e) {
        $scope.showModel();
    });
    //对于插件模态框隐藏通用处理
    $scope.hidenModel = function () {
        document.getElementById("wpsContent").style.visibility = "hidden";
        //document.getElementById("objectdiv").style.visibility="hidden";
    }

    $scope.showModel = function () {
        document.getElementById("wpsContent").style.visibility = "visible";
        //document.getElementById("objectdiv").style.visibility="visible";
    }
    $scope.loadVersionFormId();
    /*************************五、右键菜单****************************/
    $.contextMenu('destroy'); //销毁以前实例
    $scope.mosaicContextMenu = function (datas) { //拼接右键菜单
        var subItems = {
            /*"banci": {name: "版次", icon: "add"},*/
            "editName": {name: "修改名称", icon: "edit"}

        };
        //console.log("右键菜单拼接==" + JSON.stringify(datas.allowedActionList));
        /*angular.forEach(datas.allowedActionList, function(d, index) {
         console.log(d.id + "!==");
         //if(d.type!==souce.status)
         subItems[d.id] = {
         name: d.name,
         icon: d.icon
         };
         });*/
        return subItems;
    }
    $scope.callMune = function (key, datas, actions) {
        if (key === "banci") {
            //$scope.fc.returnForm();
            //储存组主的当前附件
            //$scope.fc.currentGroupOwnerAttach = datas;
            $scope.attUploadInfo = {
                id: datas.id,
                processInstanceId: datas.processInstanceId,
                bizAttachType: datas.bizAttachType,
                bizFileType: datas.bizFileType
            };
            $scope.$apply();
            $scope.fc.queryAttach(datas, "history");
            $scope.hidenModel();
            $('#uploadAttach').modal('show');
        } else if (key === "editName") {
            $scope.fc.returnForm();
            $scope.fc.currentGroupOwnerAttach = datas;
            $scope.fc.beforeExt =$scope.fc.currentGroupOwnerAttach.attachment.filename.substring(0, $scope.fc.currentGroupOwnerAttach.attachment.filename.lastIndexOf("."));
            $scope.fc.behindExt =$scope.fc.currentGroupOwnerAttach.attachment.filename.substring($scope.fc.currentGroupOwnerAttach.attachment.filename.lastIndexOf("."),$scope.fc.currentGroupOwnerAttach.attachment.filename.length);
            $scope.hidenModel();
            $('#saveDocDialog').modal('show');
            $scope.$apply();
        }
    }
    $scope.onloadcontextMenu = function () {
        $.contextMenu({
            selector: '.tree-node',
            reposition: false,
            events: {
                show: function (options) {
                    // Add class to the menu
                    //this.addClass("backcolor").siblings("tr").removeClass("backcolor");
                },
                hide: function (options) {
                    //this.removeClass("backcolor");

                },
                activated: function (options) {

                }
            },
            build: function ($trigger, e) {
                var datas = $trigger.data('rowNode');
                var a = $scope.mosaicContextMenu(datas);
                console.log("===" + JSON.stringify(a) + "*********" + JSON.stringify(datas));
                /*if(datas.allowedActionList == null || datas.allowedActionList === undefined || datas.allowedActionList.length === 0) {
                 return false;
                 }*/
                return {
                    callback: function (key, options) {
                        //console.log("callback====" + options + "====");
                        var m = "clicked: " + key;
                        console.log(m);
                        /*angular.forEach(resources.menus[datas.basictype],function(d,index){
                         }*/
                        //操作url传过来a[k].url
                        $scope.callMune(key, datas, a);
                    },
                    items: a
                }

            }
        });
    }
    $scope.onloadcontextMenu();

    /*计算布局高度*/
    $scope.calculatedHeight=function(){
        $('.content-wrapper').css('height', SysUtils.get_content_wrapper());
        $('.content-wrapper').css('overflow', 'auto');
    }

    $scope.calculatedHeight();

}]);