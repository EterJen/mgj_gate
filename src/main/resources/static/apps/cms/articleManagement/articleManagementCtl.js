myApp.controller('articleManagementCtrl', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils', '$timeout', '$stateParams', '$filter', 'NodeTreeTool', 'dataFactory', function ($rootScope, $scope, ENV, $state, SysUtils, $timeout, $stateParams, $filter, NodeTreeTool, dataFactory) {
    console.log("articleManagementCtrl controller==" + $stateParams.parameterName);

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
        isdelete: 0

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


    /**
     * 一级栏目选择
     * @param column
     */
    $scope.fc.atouChangeColumu = function (x) {
        var flag = $scope.newBean.flag;
        var typeNoval = true;
        $scope.dataObject.autoCreateColumns.forEach(function (value) {
            if (typeNoval && (flag == value.id)) {
                $scope.newBean.type = value.parentid;
                typeNoval = false;
            }
        });
    };


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
        if (40 == $scope.queryBean.twolevelcolumnId) {
            $scope.queryBean.twolevelcolumnId = undefined;
            $scope.queryBean.ifShowInNewList = 1;
        } else {
            $scope.queryBean.ifShowInNewList = undefined;
        }
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

        $scope.queryBean.twolevelcolumnId = bean.id;
        //$scope.queryBean.ids=[];
        //迭代查询
        //1.如果是末尾菜单
        /*if (!SysUtils.isEmpty(bean.parentid)&&(bean.nodes==null||bean.nodes.length==0)) {
            $scope.queryBean.type= null;
            $scope.queryBean.flag=bean.id;
        }else{
            //叠加查询，如果是一级菜单或者中间菜单，即不是末尾菜单
            $scope.queryBean.ids.push(bean.id);
            if (bean.nodes != null || bean.nodes.length > 0) {
                $scope.fc.iterativeNodes(bean.nodes);
            }
            $scope.queryBean.type= null;
            $scope.queryBean.flag=null;

        }*/

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

    /**
     * 新增文章
     * @param type
     */
    $scope.fc.addBean = function () {
        if (SysUtils.isEmpty($scope.queryBean.currentNode)) {
            swal("请先选择栏目列表", "", "info");
            return;
        }
        $scope.newBean = {initType: "isImage"};
        //查询出父节点
        $scope.fc.parentNodes = {};
        if (!SysUtils.isEmpty($scope.queryBean.currentNode.parentid)) {
            $scope.fc.parentNodes = NodeTreeTool.foreachQueryParentNodes($scope.dataObject.dicTypeList, $scope.queryBean.currentNode, $scope.fc.parentNodes);
            //console.log($scope.fc.parentNodes);
            $scope.dataObject.oneColumn.forEach(function (value) {
                if (value.id == $scope.fc.parentNodes.id) {
                    //$scope.newBean.type=value.id;
                    $scope.newBean.flag = $scope.queryBean.currentNode.id;
                    $scope.fc.type = value;
                    $scope.fc.changeColumu(value);

                }
            })
        } else {
            $scope.dataObject.oneColumn.forEach(function (value) {
                if (value.id == $scope.queryBean.currentNode.id) {
                    //$scope.newBean.type=value.id;
                    $scope.fc.type = value;
                    $scope.fc.changeColumu(value);
                }
            })
        }

        $scope.fc.isEdit = true;
        //$('#'+type).modal('show');
    }

    /**
     * 自动创建文章
     * @param type
     */
    $scope.fc.createdAutomatically = function (modal) {
        $scope.articleAttCtl.fileds.attVoList = [];
        $scope.newBean = {initType: "isAttach", ifShowInNewList: 1, docNeed2Pdf: false};

        if (SysUtils.notEmpty($scope.articleMng.chosedBeanByTree, ['id'])) {
            $scope.newBean.flag = '' + $scope.articleMng.chosedBeanByTree.id;
            $scope.fc.atouChangeColumu();
        }

        //$scope.fc.docmentAttach=null;
        $("#fujian1").val("");

        //$scope.fc.isEdit = true;
        $('#' + modal).modal('show');
    }

    $scope.fc.downloadPdf = function (bean) {
        var simpleFile = {};
        simpleFile.downloadUrl = ENV.serverUri + "/fileOperation/trustedRequest/remoteDownload";
        simpleFile.relativePath = "" + bean.pdfpath.replace("/fileOperation/trustedRequest/remoteRead", "");
        simpleFile.downloadName = "" + bean.pdffileOriginalName;
        SysUtils.remoteDownload(simpleFile);
    };

    $scope.fc.initTitle = function () {
        $scope.newBean.title = $scope.newBean.originalTitle;
    };

    /**
     * 修改文章
     * @param type
     */
    $scope.fc.editBean = function (type, bean) {
        /*if (SysUtils.isEmpty($scope.dataObject.selectBean.id)) {
            swal("提示","请先选择文章！","info");
            return;
        }*/
        $scope.newBean = bean;
        SysUtils.commonPost('/article/read/' + bean.id, {}, function (ret) {
            $scope.newBean = ret.bean;
            if (SysUtils.notEmpty($scope.newBean.simpleFiles, [''])) {
                $scope.articleAttCtl.fileds.attVoList = $scope.newBean.simpleFiles;
                $scope.articleAttCtl.func.renewOrder();
            } else {
                $scope.articleAttCtl.fileds.attVoList = [];
            }
        }, {async: false});

        if (!SysUtils.isEmpty(bean.image)) {
            bean.initType = "isImage";
        } else if (!SysUtils.isEmpty(bean.pdfpath)) {
            bean.initType = "isAttach";
        }

        if (SysUtils.notEmpty($("#fujian1")[0], [])) {
            $("#fujian1")[0].value = '';
        }
        if (SysUtils.notEmpty($("#photo")[0], [])) {
            $("#photo")[0].value = '';
        }

        $scope.fc.docmentAttach = undefined;
        $scope.newBean.isUpdate = true
        $('#createdAutomaticallyModal').modal('show');
        return;

        if (type == "edit") {
            $scope.fc.isEdit = true;
            /*select回选*/
            $scope.dataObject.oneColumn.forEach(function (value) {
                if ($scope.newBean.type == value.id) {
                    $scope.fc.type = value;
                    $scope.fc.changeColumu($scope.fc.type);
                }
            });
        } else {
            $('#' + type).modal('show');
        }

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

    /**
     * 查询栏目列表
     */
    $scope.querySelDicModesForBusiness = function (callBack) {
        SysUtils.requestByJson("/twolevelcolumn/findColumns", {isdelete: 0, paging: 'No'}, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                /*获取字典列表*/
                $scope.dataObject.dicTypeList = resultInfo.beanList;
                $scope.dataObject.oneColumn = resultInfo.additionalInfo.beanList;
                /*一级菜单过滤*/
                $scope.dataObject.autoCreateColumns = [];
                $scope.dataObject.oneColumn.forEach(function (value) {
                    if (!SysUtils.notEmpty(value, ['nodes'])) {
                        $scope.dataObject.autoCreateColumns.push(value);
                    }
                });

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
                $scope.articleAttCtl.fileds.attVoList.forEach(function (value, index, array) {
                    value.orderNum = index + 1;
                });
            },
            resort: function () {
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
            download: function (file) {
                var simpleFile = {};
                simpleFile.relativePath = file.uuidName;
                simpleFile.downloadName = file.originalName;
                SysUtils.remoteDownload(simpleFile);
            }
        }
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

        /*if(SysUtils.notEmpty($scope.newBean,['id'])){
            url="/article/update";
        }*/
        //处理图片上传和附件
        if (!SysUtils.isEmpty($scope.fc.headPortrait) || !SysUtils.isEmpty($scope.fc.docmentAttach)) {
            var fd = new FormData();
            var parent = {};
            if (!SysUtils.isEmpty($scope.fc.headPortrait)) {
                var file = $scope.fc.headPortrait;
                $scope.newBean.initType = 'isImage';
                fd.append('file', file);
            } else if (!SysUtils.isEmpty($scope.fc.docmentAttach)) {
                var file = $scope.fc.docmentAttach;
                $scope.newBean.initType = 'isAttach';
                fd.append('file', file);
            }

            fd.append('selectedBean', JSON.stringify($scope.newBean));
            dataFactory.getlist(url, 'POST', {'Content-type': undefined}, fd).then(
                function (d) {
                    //console.log(JSON.stringify(d));
                    SysUtils.handleResult(d, {'state': $state}, function () {
                        swal("提示", d.message, d.resultType);
                        if (!SysUtils.isEmpty(type)) {
                            console.log(type);
                            $('#' + type).modal('hide');
                        }
                        $scope.fc.isEdit = false;
                        $timeout(function () {
                            //console.log($scope.fc.flag);
                            if (!SysUtils.isEmpty($scope.newBean.flag)) {
                                $scope.toModeContent(null, {id: $scope.newBean.flag});
                            } else {
                                $scope.toModeContent(null, {id: $scope.newBean.type});
                            }

                        }, 500);

                    })
                },
                function (d) {
                    console.log(JSON.stringify(d));
                }
            )
        } else {
            if (SysUtils.notEmpty($scope.newBean, ['id'])) {
                url = "/article/update";
            } else {
                url = "/article/create";
            }
            SysUtils.requestByJson(url, $scope.newBean, function (resultInfo) {
                swal("提示", resultInfo.message, resultInfo.resultType);
                if (!SysUtils.isEmpty(type)) {
                    $('#' + type).modal('hide');
                }
                $scope.fc.isEdit = false;
                $timeout(function () {
                    if (!SysUtils.isEmpty($scope.newBean.flag)) {
                        $scope.toModeContent(null, {id: $scope.newBean.flag});
                    } else {
                        $scope.toModeContent(null, {id: $scope.newBean.type});
                    }
                    //$scope.toModeContent(null,$scope.fc.type);
                }, 500);

            })
        }


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
        var param = {subtype: "top", paging: 'No', isdelete: 0};
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

    $timeout(function () {
        $('.content-wrapper').css('height', SysUtils.get_content_wrapper());
        $('#panel-body-table').css('height', $('.content').height() - $('#panel-heading').outerHeight(true));
        //console.log($('.content').height()+"=="+$('#panel-heading').outerHeight(true)+"==="+$('#ceter_p').height());
        $('.table_shadow').css('max-height', $('.content').height() - $('#panel-heading').outerHeight(true) - $('#ceter_p').outerHeight());
    });


}]);