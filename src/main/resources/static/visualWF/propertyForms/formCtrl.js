myApp.controller('formCtrl', ['$scope', 'SysUtils', 'ENV', '$filter', function ($scope, SysUtils, ENV, $filter) {

    $scope.ngSelectedCell = {};
    $scope.activeTab = 1;
    $scope.treeData = null;
    $scope.formActionEditBean = null;
    $scope.editMode = 'workflow';
    $scope.editMode.formConfigPath = null;
    $scope.formPath = null;
    $scope.formConfigPath = null;

    $scope.dbOrderActions = [];
    $scope.queryBeanU = {}; //用户 查询bean
    $scope.optionalCandidateU = {}; //当前节点 可选参与者 用户
    $scope.optionalCandidateD = {}; //当前节点 可选参与者 部门
    $scope.optionalCandidateP = {}; //当前节点 可选参与者 岗位
    $scope.optionalCandidateR = {}; //当前节点 可选参与者 角色
    $scope.orgNavType = "Person"; //默认导航条类型 用户

    //$scope.candidateSelectPathBase = "propertyForms/candidateSelectTabs/";
    //$scope.candidateSelectPath = $scope.candidateSelectPathBase + $scope.orgNavType + '.html' ;
    $scope.currDepart = {};
    $scope.currDepartUserList = {};
    $scope.formActionMap = {};
    $scope.formActionList = [];

    $scope.contentType = {};//正文展示

    /************************************变量定义结束*************************************/
    //布尔选项
    $scope.booleanOptions = [
        {value: true, name: '是'},
        {value: false, name: '否'}
    ];

    //参与者类型
    $scope.dynamicExpTypeOptions = [
        {value: 'Person', name: '人员'},
        {value: 'Department', name: '部门'},
        {value: 'Role', name: '角色'},
        {value: 'Post', name: '岗位'}
    ];

    //接收者类型
    $scope.assigneeTypeOptions = [
        {value: 'SinglePerson', name: '单个人员'},
        {value: 'SingleRole', name: '单个角色'}
    ];
    $scope.menuList = [
        {id: 'nodePropertyForm', name: '节点属性', isActive: true},
        {id: 'operationConfigForm', name: '表单操作', isActive: false},
        {id: 'styleAdjustForm', name: '样式调整', isActive: false}
    ];
    //主接收者
    $scope.mainmenuList = [
        {id: 'workflow', name: '流程定制', isActive: true},
        {id: 'formConfig', name: '表单管理', isActive: false},
        {id: 'global', name: '全局配置', isActive: false}
    ];
    //任务类型
    $scope.taskInitType = [
        {id: 'single', name: '单任务'},
        {id: 'multiple', name: '多任务'}
    ];
    //任务创建模式
    $scope.taskCreateMode = [
        {id: 'DeleteCurrTask', name: '办结当前任务'},
        {id: 'KeepCurrTask', name: '保留当前任务'}
    ];

    //任务回退
    $scope.taskReturnMode = [
        {id: 'orgDef', label: '组织机构配置'},
        {id: 'exDef', label: '动态表达式'},
        {id: 'returnSender', label: '任务发起者'},
        {id: 'returnPass', label: '本阶段历史参与者'},
    ];
    /*当前节点参与者自动展开模式*/
    $scope.candidatesExpandTypes = [
        {id: 'all', label: '所有'},
        {id: 'selfDept', label: '本部门'},
        {id: 'sameParentDept', label: '同委办部门'},
        {id: 'manageDepart', label: '分管部门'},
        {id: 'secondPost', label: '顺序第二岗位'},
        {id: 'delCands', label: '清空候选人'},
    ];

    /*候选类型排序*/
    $scope.candiTypeOrder = [
        {id: 'ByCaculat', label: '系统推荐'},
        {id: 'History', label: '历史操作人'},
        {id: 'TaskCreater', label: '任务创建者'},
        {id: 'Person', label: '人员'},
        {id: 'Role', label: '角色'},
        {id: 'Department', label: '部门'},
        {id: 'Post', label: '岗位'},
    ];

    /*候选项排序*/
    $scope.candidatesOrder = [
        {id: 'selfDept', label: '本部门'},
        {id: 'sameParentDept', label: '同委办部门'},
        {id: 'manageDept', label: '分管部门'},
    ];

    //任务回退
    $scope.taskReturnMode = [
        {id: 'orgDef', label: '组织机构配置'},
        {id: 'exDef', label: '动态表达式'},
        {id: 'returnSender', label: '任务发起者'},
        {id: 'returnPass', label: '本阶段历史参与者'},
    ];

    $scope.candidateSettingType = [
        {key: 'ConstantValue', val: '组织机构选择'},
        {key: 'DynamicExp', val: '动态表达式'},
    ]

    $scope.roleCandidateAccurateType = [
        {key: 'Person', val: '人员'},
        {key: 'Role', val: '角色'},
    ]

    $scope.candidateTypeChinese = {
        ConstantValue: '组织机构选择',
        DynamicExp: '动态表达式'
    }

    $scope.addNodeContentType = function (type) {
        if ($scope.contentType[type]) {
            if ($scope.ngSelectedCell.data.contentType === null || $scope.ngSelectedCell.data.contentType === "")
                $scope.ngSelectedCell.data.contentType = type;
            else
                $scope.ngSelectedCell.data.contentType = $scope.ngSelectedCell.data.contentType + "," + type;
        } else {
            var arr = $scope.ngSelectedCell.data.contentType.split(',');
            arr.forEach(function (value, index, array) {
                if (type === value) {
                    arr.splice(index, 1);
                }
            });
            $scope.ngSelectedCell.data.contentType = arr.join(",");
        }
        console.log(JSON.stringify($scope.ngSelectedCell.data.contentType));
    }

    $scope.initContentType = function () {
        //var arr;
        var checked = ["content", "taohong", "zhuanban"];
//    	/console.log(JSON.stringify($scope.ngSelectedCell.data.contentType));
        if ($scope.ngSelectedCell.data.contentType !== null && $scope.ngSelectedCell.data.contentType !== undefined && $scope.ngSelectedCell.data.contentType !== "") {
            //arr=$scope.ngSelectedCell.data.contentType.split(',');
            checked.forEach(function (value, index, array) {
                console.log(value);
                if (value !== null && value !== "" && $scope.ngSelectedCell.data.contentType.indexOf(value) > -1)
                    $scope.contentType[value] = true;
                else
                    $scope.contentType[value] = false;
            });
        } else {
            $scope.ngSelectedCell.data.contentType = "";
            checked.forEach(function (value, index, array) {
                $scope.contentType[value] = false;
            });
        }
    }

    /*
        $scope.showFormActionDialog = function(){
            SysUtils.requestByJson('/rProcessInstance/getFormActionMap', {}, function (resultInfo) {
                $scope.formActionMap = resultInfo.bean;

                $scope.$apply();
                $('#formActionDialg').modal('show');
            });
        }
    */

    $scope.showFormActionDialog = function () {
        var queryBean = {};
        queryBean.paging = "No";
        queryBean.flag = "1";
        queryBean.actionType = "currentTaskDeal";
        SysUtils.requestByJson('/formAction/listAndMap', queryBean, function (resultInfo) {
            $scope.formActionMap = resultInfo.additionalInfo.dbParams;
            $scope.formActionList = resultInfo.beanList;
            $scope.dbOrderActions = SysUtils.deepCopy($scope.formActionList);

            $scope.$applyAsync();
            angular.forEach($scope.ngSelectedCell.data.selectedFormActIdList, function (outItem) {
                angular.forEach($scope.formActionList, function (v, i, a) {
                    if (v.actionId == outItem) {
                        a.remove(a[i]);
                    }
                });
            });

            $scope.ngSelectedCell.data.selectedFormActIdList = $scope.orderByDb($scope.ngSelectedCell.data.selectedFormActIdList);
            $scope.$apply();
            $('#formActionDialg').modal('show');
        });
    }

    $scope.showAttachmentDialog = function () {
        var queryBean = {};

        /*queryBean.paging = "No";
        queryBean.flag = "1";
        queryBean.actionType = "currentTaskDeal";*/
        SysUtils.requestByJson('/actionDef/list', queryBean, function (resultInfo) {
            $scope.actionDefMap = resultInfo.additionalInfo;
            $scope.actionDefList = resultInfo.beanList;
            $scope.$applyAsync();
            angular.forEach($scope.ngSelectedCell.data.actionDefList, function (outItem) {
                angular.forEach($scope.actionDefList, function (v, i, a) {
                    if (v.id == outItem.id) {
                        a.remove(a[i]);
                    }
                });
            });
            //alert(0);
            console.log(JSON.stringify(resultInfo));
            $scope.$apply();
            $('#actionDefDialg').modal('show');
        });
    }

    $scope.showAttachmentHistoryDialog = function () {
        var queryBean = {};

        SysUtils.requestByJson('/actionDef/list', queryBean, function (resultInfo) {
            //$scope.actionDefMap = resultInfo.additionalInfo;
            $scope.actionDefList = resultInfo.beanList;
            $scope.$applyAsync();
            angular.forEach($scope.ngSelectedCell.data.actionDefHistoryList, function (outItem) {
                angular.forEach($scope.actionDefList, function (v, i, a) {
                    if (v.id == outItem.id) {
                        a.remove(a[i]);
                    }
                });
            });
            //alert(0);
            console.log(JSON.stringify(resultInfo));
            $scope.$apply();
            $('#actionDefHistoryDialg').modal('show');
        });
    }

    //智能提醒
    $scope.intelligenceSetting = function () {
        //$scope.ngSelectedCell.data.colNode ="";
        $scope.ngSelectedCell.data.departPerson = [{name:'onlyPerson',value:'人员'},
            {name:'onlyDepart',value:'部门'},
            {name:'both',value:'两者都可'}]
        var queryBean = {'id':urlParams.processVersionId};
        queryBean.paging = "No";
        queryBean.flag = "1";
        queryBean.actionType = "intelligence";
        SysUtils.requestByJson('/visualWF/getNodeList', queryBean, function (resultInfo) {
            $scope.ngSelectedCell.data.intelligenceList = resultInfo.beanList;
            console.log($scope.ngSelectedCell.data.departPerson)
            $scope.$applyAsync();
            $scope.$apply();
            $('#intelligenceSettingMoadal').modal('show');
        });
    }

    $scope.orderByDb = function (baseArr) {
        tempArr = [];
        if (!SysUtils.notEmpty(baseArr,[])) {
            return tempArr;
        }
        $scope.dbOrderActions.forEach(function (v) {
            var goOn = true;
            if (goOn) {
                baseArr.forEach(function (v2) {
                    if (v.actionId == v2) {
                        tempArr.push(v2)
                        goOn = false;
                    }
                });
            }
        });
        return tempArr;
    }
    $scope.hisViewActionSetting = function () {
        var queryBean = {};
        queryBean.paging = "No";
        queryBean.flag = "1";
        queryBean.actionType = "hisView";
        SysUtils.requestByJson('/formAction/listAndMap', queryBean, function (resultInfo) {
            $scope.formActionMap = resultInfo.additionalInfo.dbParams;
            $scope.dbOrderActions = SysUtils.deepCopy(resultInfo.beanList);
            $scope.formActionList = resultInfo.beanList;

            $scope.$applyAsync();
            angular.forEach($scope.ngSelectedCell.data.insHisShowAvilableActions, function (outItem) {
                angular.forEach($scope.formActionList, function (v, i, a) {
                    if (v.actionId == outItem) {
                        a.remove(a[i]);
                    }
                });
            });

            $scope.ngSelectedCell.data.insHisShowAvilableActions = $scope.orderByDb($scope.ngSelectedCell.data.insHisShowAvilableActions);

            $scope.$apply();
            $('#hisViewActionSettingMoadal').modal('show');
        });
    }

    $scope.moveToSelectedAction = function (key) {
        if ($scope.ngSelectedCell.data.selectedFormActIdList == null) {
            $scope.ngSelectedCell.data.selectedFormActIdList = [];
        }
        $scope.formActionList.remove(key);
        $scope.ngSelectedCell.data.selectedFormActIdList.push(key.actionId);
        $scope.ngSelectedCell.data.selectedFormActIdList = $scope.orderByDb($scope.ngSelectedCell.data.selectedFormActIdList);
        $scope.$applyAsync();
    }


    $scope.moveToSelectedAttachAction = function (actionDef) {
        if ($scope.ngSelectedCell.data.actionDefList == null) {
            $scope.ngSelectedCell.data.actionDefList = [];
        }
        $scope.actionDefList.remove(actionDef);
        $scope.ngSelectedCell.data.actionDefList.push(actionDef);
        $scope.$applyAsync();
    }

    $scope.moveToSelectedAttachHistoryAction = function (actionDef) {
        if ($scope.ngSelectedCell.data.actionDefHistoryList == null) {
            $scope.ngSelectedCell.data.actionDefHistoryList = [];
        }
        $scope.actionDefList.remove(actionDef);
        $scope.ngSelectedCell.data.actionDefHistoryList.push(actionDef);
        $scope.$applyAsync();
    }

    $scope.moveToSelectedActionHisViw = function (key) {
        if ($scope.ngSelectedCell.data.insHisShowAvilableActions == null) {
            $scope.ngSelectedCell.data.insHisShowAvilableActions = [];
        }
        $scope.formActionList.remove(key);
        $scope.ngSelectedCell.data.insHisShowAvilableActions.push(key.actionId);

        $scope.ngSelectedCell.data.insHisShowAvilableActions = $scope.orderByDb($scope.ngSelectedCell.data.insHisShowAvilableActions);
        $scope.$applyAsync();
    }
    $scope.removeFromSelectedActionHisView = function (actionId) {
        if ($scope.formActionList == null) {
            $scope.formActionList = [];
        }
        $scope.ngSelectedCell.data.insHisShowAvilableActions.remove(actionId);

        $scope.formActionList.remove($scope.formActionMap[actionId]);

        var keepGoing = false;
        angular.forEach($scope.formActionList, function (item) {
            if (!keepGoing) {
                if (item.actionId == actionId) {
                    keepGoing = true;
                }

            }
        });

        if (!keepGoing) {
            $scope.formActionList.push($scope.formActionMap[actionId]);
        }

        $scope.$applyAsync();
    }


    $scope.removeFromSelectedAction = function (actionId) {
        if ($scope.formActionList == null) {
            $scope.formActionList = [];
        }
        $scope.ngSelectedCell.data.selectedFormActIdList.remove(actionId);

        $scope.formActionList.remove($scope.formActionMap[actionId]);

        var keepGoing = false;
        angular.forEach($scope.formActionList, function (item) {
            if (!keepGoing) {
                if (item.actionId == actionId) {
                    keepGoing = true;
                }

            }
        });

        if (!keepGoing) {
            $scope.formActionList.push($scope.formActionMap[actionId]);
        }

        $scope.$applyAsync();
    }

    $scope.removeAttachSelectedAction = function (actionDef) {
        if ($scope.actionDefList == null) {
            $scope.actionDefList = [];
        }
        $scope.ngSelectedCell.data.actionDefList.remove(actionDef);

        $scope.actionDefList.forEach(function (value, index, array) {
            if (value.id == actionDef.id) {
                this.splice(index, 1);
            }
            //code something

        });
        //$scope.actionDefList.remove($scope.formActionMap[actionDef.id]);
        var keepGoing = false;
        angular.forEach($scope.formActionList, function (item) {
            if (!keepGoing) {
                if (item.id == actionDef.id) {
                    keepGoing = true;
                }

            }
        });

        if (!keepGoing) {
            $scope.actionDefList.push(actionDef);
        }

        $scope.$applyAsync();
    }

    $scope.removeAttachSelectedHistoryAction = function (actionDef) {
        if ($scope.actionDefList == null) {
            $scope.actionDefList = [];
        }
        $scope.ngSelectedCell.data.actionDefHistoryList.remove(actionDef);

        $scope.actionDefList.forEach(function (value, index, array) {
            if (value.id == actionDef.id) {
                this.splice(index, 1);
            }
            //code something

        });
        //$scope.actionDefList.remove($scope.formActionMap[actionDef.id]);
        var keepGoing = false;
        angular.forEach($scope.formActionList, function (item) {
            if (!keepGoing) {
                if (item.id == actionDef.id) {
                    keepGoing = true;
                }

            }
        });

        if (!keepGoing) {
            $scope.actionDefList.push(actionDef);
        }

        $scope.$applyAsync();
    }
    $scope.closeCandidateExpDialog = function () {
        $('#candidateExpDialog').modal('hide');
    }

    $scope.candidateExpTypeSetting = function () {
        if ($scope.ngSelectedCell.data.candidateExpType == 'ConstantValue') {
            $scope.showCandidateMultiSelDialog();
        } else if ($scope.ngSelectedCell.data.candidateExpType == 'DynamicExp') {
            $scope.addCandidateExp();
        }
    }
    $scope.addCandidateExp = function () {
        $('#candidateExpDialog').modal('show');
    }


    $scope.setCandidateExp = function () {
        $scope.ngSelectedCell.data.candidateExpType = 'DynamicExp';
        $('#candidateExpDialog').modal('hide');
    }

    $scope.selectTab = function (type) {
        $scope.$applyAsync();
        $scope.orgNavType = type;
        if(type=='HoleDepartment'){
        	type = 'Department';
        }
        $scope.queryByType(type);
    };


    $scope.closeMultiSelDialog = function () {
        $scope.ngSelectedCell.data.candidateExpType = 'ConstantValue';
        $('#candidateMultiSelDialog').modal('hide');
    }

    $scope.selectUserCandidate = function (user) {
        $scope.ngSelectedCell.data.candidatMap[$scope.orgNavType] = $scope.ngSelectedCell.data.candidatMap[$scope.orgNavType].filter(function (value) {
            return !(value.participantId == user.id);
        });
        //TODO:去重复的；
        $scope.ngSelectedCell.data.candidatMap[$scope.orgNavType].push({
            participantId: user.id,
            participantName: user.name + ' ' + $scope.currDepart.name,
            isParent: false,
            participantType: 'Person'
        })
        $scope.$applyAsync();
    }

    //参与者选择
    $scope.selectCandidate = function (node, post) {
        //console.log(node);
        if ($scope.orgNavType == 'Post') {
            if (!$scope.alreadySelected(post)) {
                $scope.ngSelectedCell.data.candidatMap[$scope.orgNavType].push({
                    participantId: post.id,
                    participantName: node.name + post.name,
                    isParent: false,
                    participantType: $scope.orgNavType
                });
            }
        } else if ($scope.orgNavType == 'Department' || $scope.orgNavType == 'Role'||$scope.orgNavType == 'HoleDepartment') {
            if (!$scope.alreadySelected(node) && (node.nodes === null || node.nodes.length === 0)) {
                var selectValue = {
                    participantId: node.id,
                    participantName: node.name,
                    isParent: false,
                    participantType: $scope.orgNavType
                };
                if ($scope.orgNavType == 'Department') {
                    selectValue.orderBy = node.orderNum;
                    selectValue.parentId = node.parentid;
                }
                $scope.ngSelectedCell.data.candidatMap[$scope.orgNavType].push(selectValue);
            }
        } else if ($scope.orgNavType == 'Person') {
            $scope.currDepart = node;
            var readUrl = "/coreDepartment/read/" + node.id;
            SysUtils.requestByJson(readUrl, {}, function (resultInfo) {
                $scope.currDepartUserList = resultInfo.bean.users;
                $scope.$apply();
            });
        }
    }

    $scope.queryByType = function (type) {
        if ($scope.ngSelectedCell.data.candidatMap == null)
            $scope.ngSelectedCell.data.candidatMap = {};
        if ($scope.ngSelectedCell.data.candidatMap[$scope.orgNavType] == null) {
            $scope.ngSelectedCell.data.candidatMap[$scope.orgNavType] = [];
        }
        if (type == 'Person') {
            url = '/coreDepartment/departmentTree';
        } else if (type == 'Department') {
            url = '/coreDepartment/departmentTree';
        } else if (type == 'Role') {
            url = '/coreRole/listTopClick';
        } else if (type == 'Post') {
            url = '/coreDepartment/deptMixPostTree';
        }
        SysUtils.requestByJson(url, {paging: 'No'}, function (resultInfo) {
            if (type == 'Person' || type == 'Department' || type == 'Role') {
                $scope.treeData = resultInfo.beanList;
            } else if (type == 'Post') {
                $scope.treeData = resultInfo.bean.treeDepts;
            }
            console.log($scope.treeData);
            //临时初始化部门顺序
            var departments = [];
            if (type == 'Department') {
                departments = $scope.treeData[0].nodes.concat($scope.treeData[1].nodes);
                angular.forEach(departments, function (item) {
                    angular.forEach($scope.ngSelectedCell.data.candidatMap[type], function (items) {
                        if (items.participantId === item.id) {
                            items.orderBy = item.orderNum;
                            items.parentId = item.parentid;
                            //console.log($scope.ngSelectedCell.data.candidatMap[type][index]);
                        }
                    });
                });
            }
            $scope.$apply();
        });
    }

    $scope.removeFromSelected = function ($index) {
        $scope.ngSelectedCell.data.candidatMap[$scope.orgNavType].splice($index, 1);
    }

    $scope.alreadySelected = function (node) {
        var result = false;
        angular.forEach($scope.ngSelectedCell.data.candidatMap[$scope.orgNavType], function (temp) {
            if (temp.id == node.id) {
                result = true;
            }
        });
        return result;
    }


    $scope.showCandidateMultiSelDialog = function () {

        if ($scope.ngSelectedCell.data.candidatMap == null)
            $scope.ngSelectedCell.data.candidatMap = {};
        if ($scope.ngSelectedCell.data.candidatMap[$scope.orgNavType] == null) {
            $scope.ngSelectedCell.data.candidatMap[$scope.orgNavType] = [];
        }
        $scope.queryByType($scope.orgNavType);
        $('#candidateMultiSelDialog').modal('show');
    }

    $scope.showFormActionList = function () {
        $scope.editMode = 'formAction';
    }

    $scope.addFormAction = function () {
        $scope.formActionEditBean = {};
        $('#formActionMngDialog').modal('show');
    }

    $scope.saveFormAction = function () {
        SysUtils.requestByJson('/wfFormAction/create', $scope.formActionEditBean, function (resultInfo) {
            SysUtils.swalOnlyConfirm("信息", resultInfo.message, "info", function (isConfirm) {
                if (isConfirm) {
                    swal.close();
                    $('#formActionMngDialog').modal('hide');
                }
            });
        })
    }

    $scope.handleMenu = function (selectedMenu) {
        angular.forEach($scope.menuList, function (temp) {
            if (temp.id == selectedMenu.id) {
                temp.isActive = true;
            } else
                temp.isActive = false;
        });
        $scope.showNodeTab();
    }

    $scope.handleMainMenu = function (selectedMenu) {
        angular.forEach($scope.mainmenuList, function (temp) {
            if (temp.id == selectedMenu.id) {
                temp.isActive = true;
            } else
                temp.isActive = false;
        });
        $scope.editMode = selectedMenu.id;
        if ($scope.editMode == 'formConfig')
            $scope.formConfigPath = 'propertyForms/formConfig.html';
    }

    $scope.getActiveMenu = function () {
        var result = null;
        angular.forEach($scope.menuList, function (temp) {
            if (temp.isActive) {
                result = temp;
            }
        });
        return result;
    }

    $scope.showNodeTab = function () {
        var activeTab = $scope.getActiveMenu();
        $scope.formPath = 'propertyForms/' + activeTab.id + ".html";
        $scope.initContentType();
    }

    //保存操作；
    $scope.saveAndUpdateProperties = function () {

        $(".flyover").show();
        var encoder = new mxCodec();
        var node = encoder.encode(theUiEditor.editor.graph.getModel());
        theUiEditor.editor.graph.getModel().beginUpdate();
        try {
            //调整部门顺序
            /*if (SysUtils.notEmpty($scope.ngSelectedCell.data.candidatMap, ['Department'])) {
              $scope.ngSelectedCell.data.candidatMap['Department'] = $filter('orderBy')($scope.ngSelectedCell.data.candidatMap['Department'], ['-parentId', 'orderBy']);
              angular.forEach($scope.ngSelectedCell.data.candidatMap['Department'], function (item) {
                delete item.orderBy;
                delete item.parentId;
              });
            }*/
            //console.log($scope.ngSelectedCell.data.candidatMap['Department']);
            //把节点的值设置为节点名称的值
            /* $scope.ngSelectedCell.value = $scope.ngSelectedCell.data.orderNum + '.' + $scope.ngSelectedCell.data.name; */
            /*节点才更名 线条不要命名*/
            if ('DNode' == $scope.ngSelectedCell.data.constructor.name) {
                $scope.ngSelectedCell.value = $scope.ngSelectedCell.data.name;
            }
            theUiEditor.editor.graph.refresh();
        }
        finally {
            theUiEditor.editor.graph.getModel().endUpdate();
        }

        if (theUiEditor.editor.graph.isEditing()) {
            theUiEditor.editor.graph.stopEditing();
        }
        var xml = mxUtils.getXml(theUiEditor.editor.getGraphXml());
        //console.log(xml);
        $(".flyover").show();
        $.ajax({
            type: "POST",
            url: ENV.localapi + "/visualWF/save?processVersionId=" + urlParams.processVersionId + "&mode=" + urlParams.mode,
            data: 'filename=' + encodeURIComponent(name) + '&xml=' + encodeURIComponent(xml),
            success: function (resultInfo) {
                $(".flyover").hide();
                $(".flyover").hide();
                SysUtils.swalOnlyConfirm("信息", resultInfo, "info", function (isConfirm) {
                    if (isConfirm) {
                        swal.close();
                    }
                });
            },
            error: function (XMLResponse) {
                $(".flyover").hide();
                console.log(JSON.stringify(XMLResponse));
            }
        });
    }

    //参与者的选择框
    $scope.showCandidateSelect = function () {
        if ($scope.ngSelectedCell.data.candidateType == 'All') {
            SysUtils.swalOnlyConfirm("信息", "参与者类型为所有部门时无需选择参与者", "info", function (isConfirm) {
                if (isConfirm) {
                    swal.close();
                }
            });
            return;
        }

        //单个部门，只能填写表达式
        if ($scope.ngSelectedCell.data.candidateType == 'SingleDepart') {
            $('#expressionDialog').modal('show');
        }

        var url = "";
        //TODO:在后台配置url
        if ($scope.ngSelectedCell.data.candidateType == 'ListOfDepart') {
            url = '/coreDepartment/departmentTree';
        } else if ($scope.ngSelectedCell.data.candidateType == 'SingleRole') {
            url = '/coreRole/listTopClick';
        } else if ($scope.ngSelectedCell.data.candidateType == 'ListOfPost') {
            url = '/coreDepartment/deptMixPostTree';
        } else if ($scope.ngSelectedCell.data.candidateType == 'mixedType') {
            $('#candidateSelectDialogMix').modal('show');
            return;
        }
        SysUtils.requestByJson(url, {paging: 'No'}, function (resultInfo) {
            if ($scope.ngSelectedCell.data.candidateType == 'ListOfDepart' || $scope.ngSelectedCell.data.candidateType == 'SingleRole' || $scope.ngSelectedCell.data.candidateType == 'SingleDepart') {
                $scope.treeData = resultInfo.beanList;
            } else if ($scope.ngSelectedCell.data.candidateType == 'ListOfPost') {
                $scope.treeData = resultInfo.bean.treeDepts;
            }
            $scope.$apply();
            $('#candidateSelectDialog').modal('show');
        })
    }

    $scope.changeCandidateType = function () {
        $scope.ngSelectedCell.data.candidateExp = '';
        $scope.ngSelectedCell.data.candidateExpStr = '';
        $scope.ngSelectedCell.data.selectedCandidateList = [];
    }

    $scope.modalCSDMsh = function () {
        $('#candidateSelectDialogMix').on('show.bs.modal', function () {
        });

        $('#candidateSelectDialogMix').on('hidden.bs.modal', function () {
        });
    };

    //<editor-fold desc="分页配置">
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 10,
        pagesLength: 5,
        perPageOptions: [10, 20, 30, 40, 50]
    };

    $scope.pageAutoU = function () {
        $scope.queryBeanU = {};
        $scope.queryBeanU.paging = "Yes";
        $scope.queryBeanU.pageNo = $scope.paginationConf.currentPage;
        $scope.queryBeanU.pageSize = $scope.paginationConf.itemsPerPage;
        $scope.queryBeanU.flag = '1';
        $scope.queryBeanU.name = $scope.searchKey;
        $scope.queryUsear();
    };

    $scope.candidateTypeObj = {
        D: {c: "部门"},
        P: {c: "岗位"},
        R: {c: "角色"},
        U: {c: "用户"},
    }

    $scope.addToScs = function (obj, candidateType, e) {
        if (obj.pushAble) {
            obj.pushAble = false;
            var mixedCandidateList = $scope.ngSelectedCell.data.mixedCandidateList; //节点配置混合参与者列表
            if (!SysUtils.notEmpty(mixedCandidateList, [])) {
                mixedCandidateList = [];
            }
            console.log("mixedCandidateList: " + mixedCandidateList);
            console.log(mixedCandidateList);
            console.log("e: " + e);
            console.log(e);

            var mixedCandidate = {};
            mixedCandidate.positionPath = ['s', 'b', 'c'];
            mixedCandidate.candidateType = candidateType;
            mixedCandidate.candidateTypec = $scope.candidateTypeObj[candidateType].c;
            mixedCandidate.candidateId = obj.id;
            mixedCandidate.candidateName = obj.name;
            mixedCandidate.taskRecipientChoseScheme = 'both';
            mixedCandidate.taskTransformScheme = 'TfCdDelOldTask';

            mixedCandidateList.push(mixedCandidate);
            $scope.ngSelectedCell.data.mixedCandidateList = mixedCandidateList;
            $scope.$applyAsync();
        }
    };

    $scope.minusUser = function (user) {
        $scope.ngSelectedCell.data.mixedCandidateList = $scope.ngSelectedCell.data.mixedCandidateList.filter(function (value) {
            return value.candidateId != user.candidateId;
        });
        angular.forEach($scope['optionalCandidate' + user.candidateType], function (temp, i, a) {
            if (temp.id == user.candidateId) {
                a[i].pushAble = true;
            }
        });
        $scope.$applyAsync();
    };

    $scope.queryUsear = function () {
        var url = "/coreUser/searchUser";
        SysUtils.requestByJson(url, $scope.queryBeanU, function (resultInfo) {
            $scope.optionalCandidateU = resultInfo.beanList;
            angular.forEach($scope.optionalCandidateU, function (temp) {
                temp.pushAble = true;
            });
            $scope.paginationConf.totalItems = resultInfo.totalRows;
            $scope.$applyAsync();
        });

    };

    $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.pageAutoU);

    $scope.loginout = function () {
        window.close();
    }
    /* $scope.setCandidateExpMixCd = function () {
         var resultStr = "";*/

    /* $scope.setCandidateExp = function () {
         if ($scope.ngSelectedCell.data.candidateType == 'SingleDepart') {
             $scope.ngSelectedCell.data.selectedCandidateList = [];
             $scope.ngSelectedCell.data.candidateExpStr = $scope.ngSelectedCell.data.candidateExp;
             $('#expressionDialog').modal('hide');
             return;
         }

         var resultStr = "";
         var idStr = "";
         var length = $scope.ngSelectedCell.data.selectedCandidateList.length;
         angular.forEach($scope.ngSelectedCell.data.selectedCandidateList, function (node, index) {
             resultStr += node.name + "\n";
             //最后一个不需要，号
             if (index == length - 1)
                 idStr += node.id;
             else
                 idStr += node.id + ",";
         });
         $scope.ngSelectedCell.data.candidateExp = "'" + idStr + "'";
         $scope.ngSelectedCell.data.candidateExpStr = resultStr;
         $('#candidateSelectDialog').modal('hide');
     }*/

    /***************************初始化**********************************/


}]);