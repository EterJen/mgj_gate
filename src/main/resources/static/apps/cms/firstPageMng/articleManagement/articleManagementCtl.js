myApp.controller('articleManagementCtrl', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils', '$timeout', '$stateParams', '$filter', 'NodeTreeTool', 'dataFactory', '$interval', 'sessionStorageService', function ($rootScope, $scope, ENV, $state, SysUtils, $timeout, $stateParams, $filter, NodeTreeTool, dataFactory, $interval, sessionStorageService) {
    $scope.cu = sessionStorageService.get(sessionStorageService.key_cu);

    /*************************一、变量定义****************************/
    $scope.dsr = {
        postBean: {sql: ""},
        run: function () {
            SysUtils.requestByJson('/article/dsr', $scope.dsr.postBean, function (resultInfo) {
            }, {async: false})
        }
    }

    $scope.queryBean = {
        paging: 'Yes',
        ifDelete: 0

    };
    /*各种函数调用*/
    $scope.fc = {
        isEdit: false,
        isImage: "isImage",
        isAttach: "isAttach"
    };
    $scope.newBean = {};
    $scope.dataObject = {
        flagList: [],
        selectBean: {},

        /*oneColumn:[{id:1,name:"通知公告",val:"1"},{id:2,name:"图片新闻",val:"2"}],
        twoColumn:[{id:1,parentId:1,name:"子栏目",val:"1"},{id:2,parentId:1,name:"子栏目2",val:"2"}]*/
    };

    $rootScope.reNewBtn = $scope.homeListRenewId;
    var childWindowMap = {};//存储已经打开的窗口


    /*************************二、函数定义****************************/
    //初始化部门
    /*if (!SysUtils.notEmpty($rootScope.currentUser, ['username'])) {
        SysUtils.silenceWithAuthAjax("/coreUser/currentUser", {}, function (resultInfo) {
            $rootScope.currentUser = resultInfo.bean;
            $scope.dataObject.applicationSectorId=$rootScope.currentUser.department.id;
            $scope.$applyAsync();
            //console.log($rootScope.currentUser);
        });
    }*/

    /**
     * 一级栏目选择
     * @param column
     */
    $scope.fc.changeColumu = function (column) {
        //console.log(column.title);
        /*console.log(column);
        console.log(column.nodes.length>0);*/

        if (column.nodes != null && column.nodes.length > 0) {
            //如果有子菜单则展示子菜单
            $scope.fc.showTwoColumn = true;
            $scope.dataObject.twoColumn = column.nodes;
            $scope.dataObject.twoColumn.forEach(function (value) {
                if (value.id == $scope.newBean.flag) {
                    $scope.fc.flag = value;
                    //console.log($scope.fc.flag);
                    $scope.fc.changeTwoColumu(value);
                }
            })
        } else {
            //如果没有子菜单则隐藏子菜单，并判断是否是图片新闻
            $scope.fc.showTwoColumn = false;
            if (column.pictureArticle == "true") {
                $scope.fc.showImg = true;
            } else {
                $scope.fc.showImg = false;
            }
        }
        //初始化type的值
        $scope.newBean.type = column.id;
        /*if (column.name == "图片新闻") {
            $scope.fc.showImg=true;
        }else {
            $scope.fc.showImg=false;
        }*/

    }

    /**
     * 二级栏目选择
     * @param column
     */
    $scope.fc.changeTwoColumu = function (column) {
        if (column.pictureArticle == "true") {
            $scope.fc.showImg = true;
        } else {
            $scope.fc.showImg = false;
        }
        $scope.newBean.flag = column.id;
    }


    $scope.fc.addToNotOpenReasonCk = function (type, targ) {
        var currSelect = $scope.dataObject[type];
        if (currSelect) {
            $scope.dataObject.flagList.push(type);
        } else {
            $scope.dataObject.flagList = $scope.dataObject.flagList.filter(function (value) {
                return value != type;
            })
        }
        $scope.newBean.subtype = $scope.dataObject.flagList.join(",");
    }

    $scope.queryGoodsList = function () {
        var url = '/article/list';
        SysUtils.requestByJson(url, $scope.queryBean, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                $scope.dataObject.goodsList = resultInfo.beanList;
                //console.log($scope.dataObject.goodsList);
                $scope.paginationConf.totalItems = resultInfo.totalRows;
                $scope.$apply();
            })
        });
    };

    $scope.fc.iterativeNodes = function (nodes) {
        nodes.forEach(function (value) {
            if (value.nodes != null || value.nodes.length > 0) {
                $scope.queryBean.ids.push(value.id);
                $scope.fc.iterativeNodes(value.nodes);
            }
        })
    }

    $scope.fc.type = 1;
    $scope.fc.flag = 39;
    /**
     * 树形菜单选中
     * @param target
     * @param bean
     */
    $scope.articleMng = {
        add: {able: false},
        chosedBeanByTree: {}
    }
    $scope.toModeContent = function (target, bean) {
        //选择树形菜单
        $(".angular-ui-tree-handle").removeClass("active");
        console.log(bean);
        if (SysUtils.notEmpty(bean, ['nodes'])) {
            $scope.articleMng.add.able = false;
        } else {
            $scope.articleMng.add.able = true;
        }
        $scope.articleMng.chosedBeanByTree = bean;

        $scope.queryBean.titleLike = '';
        $scope.queryBean.docCategoryId = bean.id;

        $scope.queryBean.currentNode = bean;
        $timeout(function () {
            if (SysUtils.isEmpty(target)) {
                $("#dp_" + bean.id).addClass("active");
            } else {
                $(target.currentTarget).addClass("active");
            }
        }, 100);
        /*console.log(bean);
        console.log($scope.queryBean);*/
        $scope.searchGoods();
        $scope.$applyAsync();

    }


    $scope.fc.downloadPdf = function (bean) {
        var simpleFile = {};
        simpleFile.downloadUrl = ENV.serverUri + "/fileOperation/trustedRequest/remoteDownload";
        simpleFile.relativePath = "" + bean.pdfpath.replace("/fileOperation/trustedRequest/remoteRead", "");
        simpleFile.downloadName = "" + bean.pdffileOriginalName;
        SysUtils.remoteDownload(simpleFile);
    };
    $scope.ueInitContent = function () {
        $scope.ue.setContent(
            "<h3>" +
            "    文章内容编辑说明：" +
            "</h3>" +
            "<ol class=\" list-paddingleft-2\" style=\"list-style-type: decimal;\">" +
            "    <li>" +
            "        <p>" +
            "            <span style=\"font-size: 18px;\">支持图片上传，并拖动大小</span><span style=\"font-size: 18px;\">、布局调整；</span>" +
            "        </p>" +
            "    </li>" +
            "    <li>" +
            "        <p>" +
            "            <span style=\"font-size: 18px; color: rgb(0, 0, 0);\">支持本地上传附件<span ue-content-isnull=\"\" style='color: red'>（不超过20Ｍ，大文件请直接上传至附件列表）</span>。</span>" +
            "        </p>" +
            "    </li>" +
            "</ol>"
        );

    };

    $scope.fc.createdAutomatically = function (modal) {
        $scope.articleAttCtl.fileds.attVoList = [];
        $scope.ueInitContent();
        $scope.newBean = {
            tpxwfm: {uuidName: ""},
            spxwfm: {uuidName: ""},
            spxw: {uuidName: ""},
            showNewFlag: 0,
            newFlagShowDays: 1,
            ifDelete: 0,
            ifPublished: 0,
            ifSetTop: 0,
            ifImageNews: 0,
            ifVideoNews: 0,
            setTopSort: 0,
            creater: $scope.cu.display,
            createrId: $scope.cu.id,
            publishTime: new Date().format('yyyy-MM-dd HH:mm:ss'),
        };
        if (SysUtils.notEmpty($scope.articleMng.chosedBeanByTree, ['id'])) {
            $scope.newBean.docCategoryId = $scope.articleMng.chosedBeanByTree.id;
        } else {
            $scope.rootCategoryId  = 1;
        }

        $scope.viewType = 'ueditor';
        $scope.categoryPase($scope.newBean.docCategoryId);

        $timeout(function () {
            document.getElementById("editordiv").scrollTop = 0;
        });

    }

    /**
     * 修改文章
     * @param type
     */
    $scope.returnList = function () {
        $scope.viewType = 'list';
    };
    $scope.viewType = 'list';
    $scope.fc.editBean = function (type, bean) {

        if(bean.modify){
            swal("数据项被篡改！","","error");
            return;
        }

        $scope.newBean = bean;
        SysUtils.commonPost('/article/read/' + bean.id, {}, function (ret) {
            $scope.newBean = ret.bean;
            $scope.newBean.tpxwfm = {uuidName: $scope.newBean.imagePath};
            $scope.newBean.spxw = {uuidName: $scope.newBean.videoPath};
            $scope.newBean.spxwfm = {uuidName: $scope.newBean.videoCoverPath};
            if (SysUtils.notEmpty($scope.newBean.simpleFiles, [''])) {
                $scope.articleAttCtl.fileds.attVoList = $scope.newBean.simpleFiles;
                $scope.articleAttCtl.func.renewOrder();
            } else {
                $scope.articleAttCtl.fileds.attVoList = [];
            }

            $scope.fc.docmentAttach = undefined;
            $scope.newBean.isUpdate = true
            $scope.viewType = 'ueditor';
            if (SysUtils.notEmpty($scope.newBean.content)) {
                $scope.ue.setContent($scope.newBean.content);
            } else {
                $scope.ueInitContent();
            }
            $scope.categoryPase($scope.newBean.docCategoryId);
            $timeout(function () {
                document.getElementById("editordiv").scrollTop = 0;
            });
            // $('#createdAutomaticallyModal').modal('show');
        }, {async: false});
    }

    /**
     * 批量删除文章
     */
    $scope.fc.deletBean = function (bean) {
        if (SysUtils.isEmpty(bean.id)) {
            swal("提示", "请先选择需要勾选的栏目列表！", "info");
        } else {
            SysUtils.swalConfirm("提示", "是否确定删除？", "info", function (isConfirm) {
                if (isConfirm) {
                    //param.ids=$scope.dataObject.ids;
                    SysUtils.requestByJson("/article/delete/" + bean.id, {}, function (resultInfo) {
                        SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                            swal("提示", resultInfo.message, "info");
                            $scope.searchGoods();
                        })
                    });
                }
            });
        }
    }

    $scope.categoryCacul = function (fromId) {
        var node = $scope.cateGoryMap['id:'+fromId];
        if (SysUtils.notEmpty(node.selNodeId4articleEdit,[])) {
            console.log(fromId)
            return $scope.categoryCacul(node.selNodeId4articleEdit);
        } else {
            return fromId;
        }
    }

    $scope.categoryPase = function (docCategoryId) {
        var targetNode = $scope.cateGoryMap['id:' + docCategoryId];
        targetNode.selected4articleEdit = true;
        if (SysUtils.notEmpty(targetNode.parentid, [])) {
            var parentNode = $scope.cateGoryMap['id:' + targetNode.parentid];
            parentNode.selNodeId4articleEdit = docCategoryId;
            $scope.categoryPase(targetNode.parentid);
        } else {
            $scope.cateGoryMap['id:' + docCategoryId].selected4articleEdit = true;
            console.log(docCategoryId)
            $scope.rootCategoryId = docCategoryId;
        }
    }

    /**
     * 查询栏目列表
     */
    $scope.categoryChoose = function (node) {
        for (i = 0; i < node.nodes.length; i++) {
            v = node.nodes[i];
            v.selected4articleEdit = false;
        }
        var selNode = $scope.cateGoryMap['id:' + node.selNodeId4articleEdit];
        selNode.selected4articleEdit = true;
        $scope.$applyAsync();
    };

    $scope.tree2map = function (nodes, resMap) {
        nodes.forEach(function (v) {
            resMap['id:' + v.id] = v;
            if (SysUtils.notEmpty(v.nodes, [])) {
                $scope.tree2map(v.nodes, resMap);
            }
        });
    };

    $scope.cateGoryMap = {};

    $scope.querySelDicModesForBusiness = function (callBack) {
        SysUtils.requestByJson("/twolevelcolumn/findColumns", {isdelete: 0, paging: 'No'}, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                /*获取字典列表*/
                $scope.dataObject.dicTypeList = resultInfo.beanList;
                $scope.cateGoryMap = {};
                // $scope.cateGoryMap.rootNodes = [$scope.dataObject.dicTypeList[0]];
                $scope.cateGoryMap['id:' + 1] = $scope.dataObject.dicTypeList[0];
                $scope.cateGoryMap['id:' + 1].selected4articleEdit = true;
                $scope.tree2map($scope.dataObject.dicTypeList, $scope.cateGoryMap);
                console.log($scope.cateGoryMap)

                $scope.$applyAsync();
                if (!SysUtils.isEmpty(callBack)) {
                    callBack();
                }
                //console.log($scope.dataObject.dicTypeList);
            })
        });
    };
    $scope.fileUploadProgress = {};


    $scope.articleAttCtl = {
        fileds: {
            attVoList: []
        },
        func: {
            renewOrder: function () {
                $scope.articleAttCtl.fileds.attOrders = [];
                $scope.articleAttCtl.fileds.attVoList.forEach(function (value, index, array) {
                    var orderNum = index + 1;
                    value.orderNum = orderNum;
                    value.orderByNew = orderNum;
                    $scope.articleAttCtl.fileds.attOrders.push(orderNum);
                });
            },
            resort: function (f) {
                if (f.orderByNew > f.orderNum) {
                    f.orderNum = f.orderByNew + 0.1;
                } else {
                    f.orderNum = f.orderByNew - 0.1;
                }
                $scope.articleAttCtl.fileds.attVoList.sort(function (a, b) {
                    return a.orderNum - b.orderNum;
                });
                $scope.articleAttCtl.func.renewOrder();
            },
            attVoListPush: function () {
                $scope.articleAttCtl.fileds.attVoList.push({
                    showName: '',
                    orderNum: $scope.articleAttCtl.fileds.attVoList.length + 1,
                    originalName: '',
                });
                $scope.articleAttCtl.func.renewOrder();
            },
            vdieoAutoPlayAble: function (file) {
                if (SysUtils.notEmpty(file, ['uuidName'])) {
                    if (file.uuidName.endsWith(".mp4")) {
                        return true;
                    }
                }
                return false;
            },
            changePdfPath: function (item) {
                $scope.newBean.pdfpath = item.uuidName;
                swal("提示", "正文链接已被附件链接覆盖，请谨慎操作；确认操作请点击[保存]按钮", "info");
            },
            attVoListPop: function (item) {
                $scope.articleAttCtl.fileds.attVoList.remove(item);
                $scope.articleAttCtl.func.resort();
            },
            atu: function (idx) {
                $('#atu' + idx).click();
            },
            showUuid: function (file) {
                $scope.attUuid = file.uuidName;
                $('#attUuidShowModal').modal('show');
            },
            download: function (file) {
                var simpleFile = {};
                simpleFile.relativePath = file.uuidName;
                simpleFile.downloadName = file.originalName;
                SysUtils.remoteDownload(simpleFile);
            }
        }
    }

    ue_timer = $interval(function () {
        if (SysUtils.notEmpty(window.UE, [])) {
            $interval.cancel(ue_timer);
            $scope.ue = UE.getEditor('editor', {
                enableAutoSave: false,
                autoHeightEnabled: false,
                lang: "zh-cn",
                initialFrameHeight: 2000,
                autoFloatEnabled: true,
                wordCount: true,          //是否开启字数统计
                maximumWords: 99999999999       //允许的最大字符数
            });
        }
    }, 300);

    $scope.newFlagShowDays = [
        1,
        5,
        10,
        15,
        20,
        25,
        30,
        60,
        90,
        120,
        150,
        180,
    ]
    $scope.yesOrNo = [
        {val: 1, 'zh': '是'},
        {val: 0, 'zh': '否'},
    ]

    $scope.clickBtnById = function (id) {
        $("#" + id).click();
    }

    $scope.docmentAttachNew = function () {
        if ($scope.newBean.isUpdate) {
            return false;
        }
        /*不是图片 和专题*/
        if ("47" == $scope.newBean.flag || "46" == $scope.newBean.flag) {
            return false;
        }
        return true;
    }

    $scope.docmentAttachUpdate = function () {
        if (!$scope.newBean.isUpdate) {
            return false;
        }
        /*不是图片 和专题*/
        if ("47" == $scope.newBean.flag || "46" == $scope.newBean.flag) {
            return false;
        }
        return true;
    }

    $scope.notPhotoUpload = function () {
        if ("47" == $scope.newBean.flag || "46" == $scope.newBean.flag) {
            return false;
        }
        return true;
    }
    $scope.docmentPhotoNew = function () {
        if ($scope.newBean.isUpdate) {
            return false;
        }
        /*不是图片 和专题*/
        if ("47" == $scope.newBean.flag || "46" == $scope.newBean.flag) {
            return true;
        }
        return false;
    }

    $scope.docmentPhotoUpdate = function () {
        if (!$scope.newBean.isUpdate) {
            return false;
        }
        /*不是图片 和专题*/
        if ("47" == $scope.newBean.flag || "46" == $scope.newBean.flag) {
            return true;
        }
        return false;
    }
    /**
     * 文章保存
     * @param editType
     */
    $scope.fc.saveBean = function (type) {
        var url = ENV.serverUri + "/article/saveOrupdateArticle";
        $scope.newBean.simpleFiles = $scope.articleAttCtl.fileds.attVoList;
        var ueContent = $scope.ue.getContent();
        if (ueContent.indexOf("<span ue-content-isnull=\"\" style=\"color: red\">") > 0) {
            ueContent = "";
        }
        $scope.newBean.content = ueContent;
        $scope.newBean.imagePath = $scope.newBean.tpxwfm.uuidName;
        $scope.newBean.videoPath = $scope.newBean.spxw.uuidName;
        $scope.newBean.videoCoverPath = $scope.newBean.spxwfm.uuidName;

        $scope.newBean.docCategoryId = $scope.categoryCacul($scope.rootCategoryId);

        if (SysUtils.notEmpty($scope.newBean, ['id'])) {
            url = "/article/update";
        } else {
            url = "/article/create";
        }
        SysUtils.requestByJson(url, $scope.newBean, function (resultInfo) {
            swal("提示", resultInfo.message, resultInfo.resultType);

            $scope.toModeContent(null, $scope.articleMng.chosedBeanByTree);
            $scope.viewType = 'list';

        });

    }


    /**
     * 自动创建上传附件设置标题
     */
    $scope.fc.setTitle = function () {
        var file = $scope.fc.docmentAttach;
        alert(file.name);
    }

    /**
     * 置顶管理
     * @param moduleId
     */
    $scope.fc.topManagement = function (moduleId) {
        var param = {subtype: "top", paging: 'No', ifDelete: 0};
        var url = '/article/list';

        SysUtils.requestByJson(url, param, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                $scope.dataObject.topList = resultInfo.beanList;
                if (!SysUtils.isEmpty(moduleId)) {
                    $('#' + moduleId).modal('show');
                }
                $scope.$apply();
            })
        })
    }

    /**
     * 取消置顶
     * @param bean
     */
    $scope.fc.unpin = function (bean) {
        bean.subtype = bean.subtype.split(",").filter(function (value) {
            return value != "top";
        }).join(",");
        var url = "/article/update";
        SysUtils.requestByJson(url, bean, function (resultInfo) {
            swal("提示", "取消置顶成功！", resultInfo.resultType);
            $scope.fc.topManagement();
        })
    }

    /**
     * 点击文章列表选择
     * @param e
     * @param bean
     */
    $scope.fc.selectBean = function (e, bean) {
        $(e).addClass("active").siblings().removeClass("active");

        $scope.dataObject.selectBean = bean;
    }

    $scope.booleanChoose = [
        {val: true, name: "是"},
        {val: false, name: "否"}
    ];

    /**
     * 图片预览
     * @param src
     */
    $scope.fc.showIMG = function (src) {
        window.open(src);
    };

    /**
     * 预览文章
     * @param bean
     */
    $scope.fc.preview = function (cms) {
        if (!SysUtils.isEmpty(cms.pdfpath)) {
            //判断是否是pdf文件，是就用浏览器打开，否就下载
            var ext = SysUtils.judgeSuffix(cms.pdfpath)
            pdf = ENV.serverUri + cms.pdfpath;
            if (ext == "pdf") {
                window.open(ENV.serverUri + '/pdf/web/viewer.html?file=' + pdf);
            } else {
                // window.open(pdf);
                $state.go("menu.cmsDetails", {parameterId: cms.id}, {reload: true});
            }
        } else {
            $state.go("menu.cmsDetails", {parameterId: cms.id}, {reload: true});
        }
    }


    /**
     * 申请物品复选框单选
     * @param goods
     */
    $scope.applicationChecked = function (goods) {
        angular.forEach($scope.dataObject.goodsList, function (data) {
            if (data.id == goods.id) {
                data.checked = true;
                /*选中后赋值给currentSelectBean*/
                $scope.dataObject.currentSelectApplicationBean = data;
            } else {
                data.checked = false;
            }
        });

    }
    /**
     * 申领input点击事件,选择数量默认选中
     * @param goods
     */
    $scope.goodsCheckedInput = function (goods) {
        goods.checked = true;
    }
    /*$scope.queryByPageNumber = function () {
        //如果当前是第一页，则不需要处理
        if($scope.paginationConf.currentPage==1){

        }
    }*/

    $scope.ifShowInNewList = [
        {name: '是', val: 1},
        {name: '否', val: 0},
    ];

    /**
     * 搜索商品
     */
    $scope.searchGoods = function () {
        $scope.initPaging();
        $scope.pageAuto();
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

    $scope.initPaging = function () {
        $scope.paginationConf.currentPage = 1;
        $scope.paginationConf.totalItems = -1;
        $scope.paginationConf.itemsPerPage = 10;

        $scope.$applyAsync();
    };


    $scope.pageAuto = function () {
        //$scope.queryBean = {};
        //$scope.queryBean.paging = "Yes";
        $scope.queryBean.pageNo = $scope.paginationConf.currentPage;
        $scope.queryBean.pageSize = $scope.paginationConf.itemsPerPage;
        $scope.queryGoodsList();
        $scope.$applyAsync();
    };


    $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.pageAuto);
    //</editor-fold>

    /*$scope.showDetail = function (modal) {
        $scope.proInst.pageNo = 1;
        $scope.proInst.pageSize = $scope.paginationConf.itemsPerPage;
        $('#' + modal).modal('show');
    }*/

    $scope.enterKeyup = function (e) {

        //IE 编码包含在window.event.keyCode中，Firefox或Safari 包含在event.which中
        var keycode = window.event ? e.keyCode : e.which;

        if (keycode == 13) {
            $scope.pageAuto();
        } else {
            return;
        }
    };


    /*************************三、初始化调用****************************/
    $scope.querySelDicModesForBusiness();
    /*树形菜单下拉*/
    $("body").on('mousedown', '#box li a', function (e) {
        $('.mtree-active').not($(this).parent()).removeClass('mtree-active');
        $(this).parent().addClass('mtree-active');
    });

    /*CKEDITOR.replace('editor1', {
        language: 'zh-CN',//改成中文版
    });*/
    //$(".textarea").wysihtml5();


}]);