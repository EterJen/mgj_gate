myApp.controller('formEditGeneric', ['LeaveService', 'PersonnelService', '$rootScope', '$location', '$timeout', '$scope', 'ENV', '$state', '$stateParams', 'SysUtils', 'dataFactory', '$document', function (LeaveService, PersonnelService, $rootScope, $location, $timeout, $scope, ENV, $state, $stateParams, SysUtils, dataFactory, $document) {

    $rootScope.indexNoMagin = true;
    $scope.currentUser = {};
    $scope.fc = {};
    $scope.task = {};
    $scope.taskId = $stateParams.taskInfoId;
    $scope.fc.reRunCuAct = false;
    /*再次执行当前操作*/
    $scope.task = null;
    $scope.availableOps = [];
    $scope.departTreeData = [];//部门候选数据
    $scope.selectedDepart = {};
    $scope.selectedCanditList = [];//选中的Assignee的列表
    $scope.selectedOp = {};
    $scope.fc.wpsDetail = {middleContentType: 'form'};//wps控制的信息
    $scope.fc.params = 'ddd';
    $scope.fc.actionDef = '$scope.saveForm()';
    $scope.fc.annexDescription = null;//附件说明
    $scope.fc.printMiddattachIds = [];//打印附件id存储
    $scope.fc.printMiddattachNumber = 0;//初始化打印次数
    $scope.fc.notDomain = {};//储存表单上没有的公文域，让用户自己填写，并保存在数据库
    $scope.fc.queryDomain = {};//储存表单上没有的公文域，已经存在数据库里查询出来的

    $scope.hasSave = false;

    $scope.wf = {};
    $scope.wf.nextTask = {};
    $scope.wf.nextTask.userOptin = '';

    $scope.wf.hisView = {};
    $scope.wf.hisView.fun = {};


    //$scope.fc.wpsOfdDetail=true;//对于linux特殊处理模态框被遮蔽问题
    $scope.ENV = ENV;
    $scope.showtimes = false;
    var viewValue;
    var xmlparam = "";
    // var ocx;//linux
    $scope.$on('$includeContentLoaded', function () {
        $scope.onloadcontextMenu();
        $scope.fc.init();
    });
    $scope.candidatMapKeyList = [];
    $scope.relatedReceiveDocIdPrefix = "长城电子收";
    //文号年份选择，通用年份
    $scope.fc.receiptYears = [];
    for (var i = 2018; i <= 2025; i++) {
        $scope.fc.receiptYears.push(i);
    }

    /************************关于工作流的新修改**************************/
    $scope.participantTypeName = {
        NodeSetting: '可选人员',
    };

    $scope.candidatListMap = {
        ByCaculat: '智能推荐',
        TaskCreater: '上个处理人',
        History: '历史参与者',
        Person: '人员',
        Role: '角色',
        Post: '岗位',
        Department: '部门',
    };

    $scope.type = '';
    $scope.orgNavType = 'Person';
    $scope.treeData = [];
    $scope.huiyiChooseCandidate = function (type) {
        $scope.fc.huiyiChooseCandidate(type);
    };

    /**
     * 会议流程表单选择参与者模态框点击tab页
     * @param tab
     */
    $scope.selectTab = function (tab) {
        $scope.fc.selectTab(tab);
    };

    $scope.currDepartUserList = [];
    $scope.nodeId = '';
    $scope.selectCandidate = function (node) {
        $scope.fc.selectCandidate(node);

    };

    $scope.candidateMap = {};
    $scope.selectUserCandidate = function (user) {
        $scope.fc.selectUserCandidate(user);

    };

    $scope.huiyiRemoveFromSelected = function ($index) {
        $scope.fc.huiyiRemoveFromSelected($index);
    };

    $scope.informMeeting = function () {
        $scope.fc.informMeeting();
    };

    /**
     * 会议流程表单关闭选择参与者模态框
     */
    $scope.saveHuiyiCandidate = function () {
        $scope.fc.saveHuiyiCandidate();

    };
    /**
     * 点击会议室弹出选择会议室模态框
     * @param modal
     */
    $scope.chooseMeetingRoom = function (modal) {
        $scope.formJxwhuiyi = $scope.task.theCommonFormInfo.formJxwhuiyi;
        var valid = $scope.fc.attendantNameCheck();
        if (valid.flag) {
            SysUtils.swalForTips("提示", valid.msg, "info", function (isConfirm) {
                if (isConfirm) {
                    if (SysUtils.notEmpty(valid.errorCallFun, [])) {
                        eval(valid.errorCallFun);
                    }
                }
            });
            return;
        }
        SysUtils.requestByJson('/formJxwhuiyi/getAvailableMeetingRoom', $scope.task.theCommonFormInfo.formJxwhuiyi, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {state: '$state'}, function () {
                console.log(resultInfo);
                $scope.meetingRoomSelectList = resultInfo.beanList;
                if ($scope.task.theCommonFormInfo.formJxwhuiyi.meetingRoomName != '') {
                    $scope.meetingRoomSelectList.forEach(function (value, index, array) {
                        if (value.meetingroomName == $scope.task.theCommonFormInfo.formJxwhuiyi.meetingRoomName) {
                            array[index].checked = true;
                        }
                    });
                }
                $scope.$apply();
                $("#" + modal).modal('show');
            })
        });
    };

    $scope.selectedMeetingRoom = {};
    /**
     * 选择会议室模态框列表单击每一行的操作
     * @param mr
     */
    $scope.selectMeetingRoom = function (mr) {
        $scope.meetingRoomSelectList.forEach(function (value, index, array) {
            if (mr.id == value.id) {
                array[index].checked = true;
                $scope.selectedMeetingRoom = mr;
            } else {
                array[index].checked = false;
            }
        })
    };

    /**
     * 选择会议室模态框"确定"操作
     * @param modal
     */
    $scope.doSelectMeetingRoom = function (modal) {
        $scope.task.theCommonFormInfo.formJxwhuiyi.meetingRoomName = $scope.selectedMeetingRoom.meetingroomName;
        $scope.task.theCommonFormInfo.formJxwhuiyi.meetingRoomId = $scope.selectedMeetingRoom.id;
        console.log($scope.task.theCommonFormInfo.formJxwhuiyi);
        if (!SysUtils.isEmpty(modal)) {
            $("#" + modal).modal('hide');
        }
    };

    /**
     * 会议申请表单"查看会议室安排"操作
     */
    $scope.meetingRoomArrangeList = [];
    $scope.dateList = [];
    $scope.checkMeetingroomArrange = function (currentDate) {
        var huiyiQuery = {paging: 'No', flag: "1", id: $scope.task.theCommonFormInfo.formJxwhuiyi.id};
        if (SysUtils.notEmpty(currentDate)) {
            huiyiQuery.meetingStartTime = currentDate;
        } else {
            huiyiQuery.meetingStartTime = new Date().format('yyyy-MM-dd HH:mm');
        }
        SysUtils.requestByJson('/formJxwhuiyi/checkMeetingRoomArrange', huiyiQuery, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {state: '$state'}, function () {
                console.log(resultInfo.beanList);
                $scope.meetingRoomArrangeList = resultInfo.beanList;
                $scope.dateList = resultInfo.bean.dateList;
                $scope.meetingDateQueryStr = resultInfo.additionalInfo.current;
                $scope.meetingDateQueryPre = resultInfo.additionalInfo.pre;
                $scope.meetingDateQueryNext = resultInfo.additionalInfo.next;
                $scope.$apply();
                $("#meetingRoomArrangeModal").modal('show');
            })
        });
    };


    $scope.viewHistory = function () {
        $('#viewHistoryDialog').modal('show');
    }

    $scope.fc.currentTask = {};
    $scope.fc.currentTask.beforeFlowDeal = function () {
        var valid = $scope.fc.perBeforeFlowDeal(); //个性化校验
        return valid;
    };
    $scope.fc.perBeforeFlowDeal = function () {
        var obj = {
            flag: false,
            msg: '',
            errorCallFun: null,
        };
        //为了寺院测试先关闭正文校验
        if (wpsCustom.isUploadcontentCheck(SysUtils, $scope, ENV)) {
            $scope.fc.attachUploaType = 'zhengwen';
            $scope.$applyAsync();
            obj.flag = true;
            obj.msg = "拟稿阶段必须上传正文";
            obj.errorCallFun = "$scope.addAttachment('zhengwen')";
        }

        return obj;
    };


    $scope.fc.openMoveWorkflowDialog = function () {
        $scope.fc.flowAction = $scope.changeWorkflow;
        if (!SysUtils.notEmpty($scope.task.belongingProInst.zhengwenMidAttList, []) && $scope.task.belongingProInst.formDefId == 'contractapproved') {
            swal("提示", "请上传附件！", "info");
            return;
        }
        var valid = $scope.fc.currentTask.beforeFlowDeal();
        if (valid.flag) {
            SysUtils.swalConfirm("提示", valid.msg, "info", function (isConfirm) {
                if (isConfirm) {
                    if (SysUtils.notEmpty(valid.errorCallFun, [])) {
                        eval(valid.errorCallFun);
                    }
                }
            });
            return;
        }

        $('#moveWorkflowDialog').modal('show');
        $(".coop div:last").css('height', $(".yxzry_cont").outerHeight());
        $(".coop div:last").css('max-height', $(".yxzry_cont").outerHeight());
        SysUtils.requestByJson("/rCurrentTaskInfo/getOpAndCandit/" + $scope.taskId, $scope.activeOption, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                //console.log(resultInfo.beanList);
                //可以进行操作的迁移列表；
                $scope.availableOps = resultInfo.beanList;
                //返回的结构：每个节点由多个操作，每个操作有多个候选类型(暂时只考虑一个)，每个候选类型有多个候选值，每个候选值下有多个用户
                $scope.showOperCandidates($scope.availableOps[0]);
                $scope.$apply();
                //根据当前tab获取智能配置人员信息
                // $scope.getRecomSelectedUser($scope.taskId, $scope.availableOps[0]);
            })
        })
    }
    $scope.getRecomSelectedUser = function (taskid, availableOp) {
        SysUtils.requestByJson("/rCurrentTaskInfo/getRecomSelectedUser/" + taskid, availableOp, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                $scope.selectedOp.recomSelectedUsers = resultInfo.bean.recomSelectedUsers;
                //console.log($scope.selectedOp.recomSelectedUsers);
                $scope.$apply();

            })
        })
    }
    $scope.changeCandidate = function (candidateKey) {
        $scope.currCandidateKey = candidateKey;
        $scope.$applyAsync();
    }


    $scope.showOperCandidates = function (oper) {
        $scope.selectedOp = oper;

        if (!oper.preConditionPass) {
            $scope.fc.reRunCuAct = true;
            if (
                "处长需为涉密公文填写处长意见" == oper.preConditionFalseMessage
                || "定密责任人必须填写定密意见" == oper.preConditionFalseMessage
            ) {
                $scope.openSecretForm();
            } else if (oper.preConditionFalseMessage.indexOf("填写意见") >= 0) {
                $scope.inputOption();
            }
            $scope.$applyAsync();
            return;
        }

        $scope.selectedCanditList = [];
        if (SysUtils.notEmpty(oper, ['sysCaculteCandidates'])) {
            $scope.selectedCanditList = SysUtils.deepCopy(oper.sysCaculteCandidates);
            $scope.selectedCanditList.forEach(function (value) {
                value.participantName = value.participantName.split(" ")[0];
            })
        }

        angular.forEach($scope.availableOps, function (op, index) {
            op.selectStatus = '';
        });
        $scope.selectedOp.selectStatus = 'on';

        var keyList = ['NodeSetting'];

        $scope.candidatMapKeyList = keyList;
        $scope.currCandidateKey = keyList[0];
        $scope.changeCandidate($scope.currCandidateKey);
        $scope.getRecomSelectedUser($scope.taskId, oper);
        //$scope.$apply();
    }

    $scope.candidateMapClick = function (selectedCandid) {
        console.log($scope.selectedOp);
        if (selectedCandid.expand) {
            selectedCandid.expand = false;
        } else {
            selectedCandid.expand = true;
        }
    }

    $scope.showCandidateUserList = function (selectedCandid) {
        if (selectedCandid.expand) {
            selectedCandid.expand = false;
        } else {
            selectedCandid.expand = true;
        }
        console.log(selectedCandid);

        if (selectedCandid.childrenParticipants != null) {
            return;
        }
        var accessUrl = null;
        console.log("=当前55==" + selectedCandid.participantType);
        $scope.currCandidateKey = selectedCandid.participantType;

        if ($scope.currCandidateKey == 'Department')
            accessUrl = "/coreDepartment/read/" + selectedCandid.participantId;
        else if ($scope.currCandidateKey == 'Role')
            accessUrl = "/coreRole/read/" + selectedCandid.participantId;
        else if ($scope.currCandidateKey == 'Post')
            accessUrl = "/corePost/" + selectedCandid.participantId + "/users";

        SysUtils.requestByJson(accessUrl, {}, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                if ($scope.currCandidateKey == 'Department') {
                    selectedCandid.childrenParticipants = resultInfo.bean.users;
                } else if ($scope.currCandidateKey == 'Role') {
                    selectedCandid.childrenParticipants = resultInfo.bean.users;
                } else if ($scope.currCandidateKey == 'Post') {
                    selectedCandid.childrenParticipants = resultInfo.beanList;
                }

                /*if(($scope.currCandidateKey == 'Department'||$scope.currCandidateKey == 'Post')&&selectedCandid.childrenParticipants.length===1){
                    //如果只有一个人员则默认选中,只有在部门和岗位下才请求后天拿人员列表

                    $scope.moveUserToSelectedAssignee(selectedCandid.childrenParticipants[0]);
                }*/
                $scope.$apply();
            })
        })
    }

    $scope.removeFromSelected = function ($index) {
        $scope.selectedCanditList.splice($index, 1);
    }

    $scope.moveUserToSelectedAssignee = function (selectedUser) {
        //处理接收者类型为单个用户的情况;
        if (SysUtils.notEmpty($scope.selectedOp, ['taskInitType'])) {
            if ($scope.selectedOp.taskInitType == 'single') {
                $scope.selectedCanditList = [];
            }
        } else {
            $scope.selectedCanditList = [];

        }

        console.log(selectedUser);

        if (SysUtils.notEmpty($scope.selectedOp, ['taskInitType'])) {
            if ($scope.selectedOp.taskInitType == 'multiple') {
                $scope.selectedCanditList = $scope.selectedCanditList.filter(function (value) {
                    return !((value.participantId == selectedUser.participantId) && (value.participantType == selectedUser.participantType));
                });
            }
        }

        $scope.selectedCanditList.push({
            participantId: selectedUser.participantId,
            participantName: selectedUser.participantName.split(" ")[0],
            participantType: selectedUser.participantType,
        });


    }

    //办结任务
    $scope.finishTask = function () {
        var finishTaskInfo = {
            id: $scope.taskId
        }
        /*督文在承办办结任务的时候，判单是否是重点督办，如果是重点督办则必须上传附件*/
        if ($scope.task.belongingProInst.formDefId == "jxwduwen" && $scope.task.belongingNodeId == "5"
            && ($scope.task.theCommonFormInfo.belongProInst.pointSupervise == "true" || $scope.task.theCommonFormInfo.belongProInst.pointSupervise)
        ) {
            var chacked = false;
            for (var i = 0; i < $scope.task.belongingProInst.zhengwenMidAttList.length; i++) {
                if ($scope.task.belongingProInst.zhengwenMidAttList[i].currentNodeId == "5" && $scope.task.belongingProInst.zhengwenMidAttList[i].creatorId == $scope.currentUser.id) {
                    chacked = true;
                    break;
                }
            }
            if (!chacked) {
                swal("提示", "督文对于领导重点督办的文，办结之前必须上传附件！", "info");
                return;
            }
        }
        if ($scope.task.belongingProInst.formDefId === "dpComposedDeal" || $scope.task.belongingProInst.formDefId === "npcHandling") {
            SysUtils.swalConfirmNotCloseBanJie("提示", "除无需书面答复件可直接办结，其他办理请先生成报批！", "info", function (isConfirm) {
                if (isConfirm) {
                    swal.close();
                    SysUtils.requestByJson("/rCurrentTaskInfo/finishTask", finishTaskInfo, function (resultInfo) {
                        $scope.returnTasklist();
                    })
                } else {
                    swal.close();
                }
            });
        } else {
            SysUtils.swalConfirmNotClose("提示", "确定办结该任务吗？", "info", function (isConfirm) {
                if (isConfirm) {
                    swal.close();
                    SysUtils.requestByJson("/rCurrentTaskInfo/finishTask", finishTaskInfo, function (resultInfo) {
                        $scope.returnTasklist();
                    })
                } else {
                    swal.close();
                }
            });
        }
    }

    //办结任务--特殊处理，在一个节点最后一个办结任务，就办结所有任务和流程
    $scope.finishAllTaskInstance = function () {
        var finishTaskInfo = {
            id: $scope.taskId
        }

        SysUtils.swalConfirmNotClose("提示", "确定办结该任务吗？", "info", function (isConfirm) {
            if (isConfirm) {
                swal.close();
                SysUtils.requestByJson("/rCurrentTaskInfo/finishAllTaskInstance", finishTaskInfo, function (resultInfo) {
                    $scope.returnTasklist();
                })
            } else {
                swal.close();
            }
        });
    }
    //办结流程
    $scope.finishInstance = function () {
        //只传需要的东西
        var taskInfo = {
            id: $scope.task.id,
            proInstId: $scope.task.proInstId
        }

        SysUtils.swalConfirmNotClose("提示", "确定办结该流程吗？", "info", function (isConfirm) {
            if (isConfirm) {
                $timeout(function () {
                    swal.close();
                }, 2500);
                SysUtils.requestByJson("/rCurrentTaskInfo/finishInstance", taskInfo, function (resultInfo) {
                    $scope.returnTasklist();
                })
            } else {
                swal.close();
            }
        });
    }

    //确定进行流转：送至工作流
    $scope.fc.flowAction = {};
    $scope.changeWorkflow = function () {
        //判断已选列表是否为空
        if ($scope.selectedCanditList === null || $scope.selectedCanditList.length === 0) {
            return;
        }
        var tab = $location.search().tab;
        var workflowInfo = {
            id: $scope.taskId,
            operationId: $scope.selectedOp.id,
            assigneeList: $scope.selectedCanditList,
            taskCreateMode: $scope.selectedOp.taskCreateMode
        }


        var _agentUserOption = false;
        if (SysUtils.notEmpty($scope.wf.nextTask.userOptin, []) && SysUtils.notEmpty($scope.selectedCanditList, [])) {
            _agentUserOption = true;
        }


        SysUtils.requestByJson("/rCurrentTaskInfo/changeWorkflow", workflowInfo, function (resultInfo) {
            $('#moveWorkflowDialog').modal('hide');
            if (_agentUserOption) {
                var optionss = [];
                $scope.selectedCanditList.forEach(function (v) {
                    if (v.participantType == "Person") {
                        var options = {};

                        var t = new Date(SysUtils.sysDate());
                        options.approveTime = t.format("yyyy-MM-dd HH:mm:ss");
                        options.taskId = $scope.task.id;
                        options.stepId = $scope.selectedOp.targetNode.id;
                        options.flowId = $scope.task.belongingProInst.id;
                        options.dealerId = $scope.currentUser.id;
                        options.dealerName = $scope.currentUser.name;
                        options.showField = "normal";
                        options.approverId = v.participantId;
                        options.assigneeName = v.participantName;
                        /*页面显示名字*/
                        options.approverName = options.assigneeName;
                        options.opinion = $scope.wf.nextTask.userOptin;
                        optionss.push(options);
                    }
                })

                /*任务意见拥有者与操作者不同为代理 代理不签章*/
                if (optionss[0].approverId != $scope.currentUser.id) {
                    /*0:本人  1:代理人用自己名字代签  2代理人用任务拥有者名字代签*/
                    if (optionss[0].dealerName == $scope.currentUser.name) {
                        optionss[0].agentFlag = 1;
                    } else {
                        optionss[0].agentFlag = 2;
                    }
                } else {
                    optionss[0].agentFlag = 0;
                }
                /*暂时针对单人代签*/
                SysUtils.requestByJson("/wfOpinion/create", optionss[0], function (resultInfo) {
                    SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                        /*window.opener.location.reload();*/
                        window.location = ENV.localapi + "/index.html#!/officialDocuments/" + $scope.task.belongingProInst.formDefId + "/-" + $scope.task.belongingProInst.id;
                        window.location.reload();
                    })
                })
                SysUtils.swalOnlyConfirm("提示", "流转成功", "info", function (isConfirm) {
                });
            } else if ($scope.selectedOp.taskCreateMode == 'KeepCurrTask') {//如果保留当前任务，则不进行跳转；
                SysUtils.swalOnlyConfirm("提示", "流转成功", "info", function (isConfirm) {
                    $scope.fc.initTask();
                    // window.location = ENV.localapi + "/index.html#!/officialDocuments/" + $scope.task.belongingProInst.formDefId + "/" + $scope.task.id;
                    // window.location.reload();
                });
            } else {
                $scope.returnTasklist();
                /*
                                    if ($scope.fc.nextTusk != null) {//如果还有下一个
                                        SysUtils.swalOnlyConfirmHasnext("提示", "流转成功", "info", function (isConfirm) {
                                            if (isConfirm) {
                                                window.location = ENV.localapi + "/index.html#!/officialDocuments/" + $scope.fc.nextTusk.belongingProInst.formDefId + "/" + $scope.fc.nextTusk.id;
                                                window.location.reload();
                                                if (!SysUtils.nonEmptyCheck(tab)) {
                                                    window.opener.location.reload();
                                                } else {
                                                    window.opener.document.getElementById(tab).click();
                                                }
                                                return;
                                            } else {
                                                if (!SysUtils.nonEmptyCheck(tab)) {
                                                    window.opener.location.reload();
                                                } else {
                                                    window.opener.document.getElementById(tab).click();
                                                }
                                                window.close();
                                                return;
                                            }
                                        });
                                    } else {
                                        SysUtils.swalOnlyConfirm("提示", "操作成功", "info", function (isConfirm) {
                                            if (!SysUtils.nonEmptyCheck(tab)) {
                                                window.opener.location.reload();
                                            } else {
                                                window.opener.document.getElementById(tab).click();
                                            }
                                            window.close();
                                            return;
                                        });
                                    }
                */
            }
        })

    }


    $scope.fc.zwUpload = function () {
        $scope.fc.attachUploaType = 'zhengwen';
        $scope.addAttachment($scope.fc.attachUploaType);
        $scope.$applyAsync();
    };
    $scope.fc.fjUpload = function () {
        $scope.fc.attachUploaType = 'fujian';
        $scope.addAttachment($scope.fc.attachUploaType);
        $scope.$applyAsync();
    };
    $scope.fc.cuAct = {};
    $scope.fc.handleFormAction = function (act) {
        var actId = act.actionId;
        var func = act.actionToPerform;
        $scope.fc.cuAct = act;
        /*保存或流转 才正式创建公文*/
        if ("changeWorkflow" == actId
            || "hisSaveForm" == actId
            || "saveForm" == actId
            || "finishInstance" == actId
            || "finishTask" == actId
            || "transfeGovernorHistory" == actId
            || "transfeGovernor" == actId
            || "convertType" == actId
            || "convertTypeHistory" == actId
            || "dmTaskFinish" == actId
            || "transBlyjbp" == actId
            || "returnTasksInHis" == actId
            || "conversionTypeHistory" == actId
            || "acceptTask" == actId
        ) {
            $scope.hasSave = true;

            $scope.task.theCommonFormInfo.belongProInst.state = "Useful";
            $scope.task.theCommonFormInfo.proInstFlag = 1;
            $scope.task.theCommonFormInfo.currentTaskInfo = {id: $scope.task.id, proInstFlag: 1};
        }

        if ($scope.fc.wpsDetail.middleContentType == 'form' && ($scope.task.selFormActIdListOfBelNode.contains("hisSaveForm") || $scope.task.selFormActIdListOfBelNode.contains("saveForm"))) {
            if ("changeWorkflow" == actId
                || "finishInstance" == actId
                || "finishTask" == actId
                || "transfeGovernorHistory" == actId
                || "transfeGovernor" == actId
                || "convertType" == actId
                || "convertTypeHistory" == actId
                || "dmTaskFinish" == actId
                || "transBlyjbp" == actId
                || "returnTasksInHis" == actId
                || "conversionTypeHistory" == actId
                || "transYgcgzsbp" == actId

                || "inputOpinion" == actId/*以下保存表单 但不触发首页刷新 也不新建实例*/
                || "changeWorkflow" == actId
                || "uploadFileHis" == actId
                || "uploadFile" == actId
                || "adjustOpinions" == actId
                || "transfeGovernorHistory" == actId
                || "transfeGovernor" == actId
                || "duwenJdOpinions" == actId
                || "duwenJdPerOpinions" == actId) {
                $scope.fc.initTaskFinish = func;
                $scope.saveForm();
            } else {
                eval(func);
            }
        } else {
            eval(func);
        }
        $scope.$applyAsync();
    }


    $scope.fc.evalFormActionPreCon = function (exp) {
//    console.log((exp))
//    console.log(eval(exp))
        return eval(exp);
    }


    /*************************************************************************************************************************/


    $scope.selectZntj = function (selRecUser) {
        if ($scope.candidateInfo.assigneeType == 'SinglePerson') {
            $scope.selectedCanditList = [];
            $scope.selectedCanditList.push(selRecUser);
        }
    }

    function UpdateInfo(strkey) {
        if (strkey == "Print") {
            $scope.fc.openedPrintC();
        }
    }

    //}

    //<editor-fold desc="ofd二次开发">
    $scope.ocx = {};
    $scope.ofdPrintPostition = [];
    $scope.printCtlInfoObj = {};
    /*文件打开监听*/
    $scope.openPerformedExt = function (div) {
        //1.1 设置最大可打印份数。
        $scope.ocx.setPrintCopies(2000);

        //以下内容亦可设置在打印的事前监听里。在打印的事前监听中设置只有打印是效果生效。如果是可视的水印请在此实现。
        //1.1.打印水印。可用于打印时自动插入份号等场景。例：后台获取的份号为000022
        //1.2获取份号的位置。语义标识以"电子公文/"开头。例："电子公文/公文体/版头/份号"
        var tagPos = $scope.ocx.getTaggedPosition("电子公文/公文体/版头/份号");
        // var tagPos = $scope.ocx.getTaggedPosition("电子公文/公文体/主体/标题");
        $scope.ofdPrintPostition = tagPos.split(",");
    }

    /*每打印成功一个文件触发监听 回调*/
    $scope.pPerformedExt = function () {
        /*修改水印添加水印*/
        $scope.printCtlInfoObj.ofdPrintedNums.push($scope.printCtlInfoObj.ofdPrintNums[0]);
        $scope.printCtlInfoObj.ofdPrintNums.splice(0, 1);

        // alert("当前打印号" + $scope.printCtlInfoObj.ofdPrintNums[0]);

        if ($scope.printCtlInfoObj.ofdPrintNums.length > 0) {
            x = parseFloat($scope.ofdPrintPostition[1]) + 1;
            y = parseFloat($scope.ofdPrintPostition[2]);
            $scope.ocx.setBarcodeInfo("<setinfo type='barinfo'><parameter name='pages' value=\"" + 1 + "\"/><parameter name=\"rotate\" value=\"0\"/><parameter name=\"visible\" value=\"true\"/><parameter name=\"printable\" value=\"true\"/><parameter name=\"xpostype\" value=\"left\"/><parameter name=\"ypostype\" value=\"top\"/><parameter name=\"x\" value=\"" + x + "\"/><parameter name=\"y\" value=\"" + y + "\"/><parameter name=\"w\" value=\"" + $scope.ofdPrintPostition[3] + "\"/><parameter name=\"h\" value=\"" + $scope.ofdPrintPostition[4] + "\"/><parameter name=\"strcont\" font=\"仿宋_GB2312\" size=\"16\" bold=\"false\" italic=\"false\" opaque=\"true\" color= \"black\">" + $scope.printCtlInfoObj.ofdPrintNums[0] + "</parameter></setinfo>");
            alert($scope.printCtlInfoObj.ofdPrintNums[0]);
        }
    }

    $scope.printControlNum = 0;
    $scope.printControlNumEner = function (e) {
        var keycode = window.event ? e.keyCode : e.which;
        if (keycode == 13) {
            $("#printControlNumId").blur();
        } else {
            return;
        }
    };
    $scope.printControlNumBlur = function () {
        if ($scope.printControlNum == $scope.printCtlInfoObj.ofdPrintNums.length) {
            return;
        }

        var srcAttr = $scope.printCtlInfoObj.ofdWaitPrintNums;
        var descAttr = $scope.printCtlInfoObj.ofdPrintNums;
        srcAttr = srcAttr.concat(descAttr);
        srcAttr.sort($scope.strNumCompare);
        descAttr = [];
        $scope.printCtlInfoObj.ofdPrintNums = descAttr;
        $scope.printCtlInfoObj.ofdWaitPrintNums = srcAttr;

        if ($scope.printControlNum < 0) {
            $scope.printControlNum = 0;
        } else if ($scope.printControlNum > srcAttr.length) {
            $scope.printControlNum = srcAttr.length;
        }

        for (i = 0; i < $scope.printControlNum; i++) {
            var item = srcAttr[0];
            srcAttr.remove(item);
            descAttr.push(item);
        }
        srcAttr.sort($scope.strNumCompare);
        descAttr.sort($scope.strNumCompare);

        $scope.printControlNum = descAttr.length;
        $scope.$applyAsync();
    };


    /*打印完成后 触发*/
    $scope.printPerformedExt = function (div) {
        /*成功后修改数据库打印控制信息*/
        $scope.printCtlInfoObj.ofdPrintedNums.sort($scope.strNumCompare);
        $scope.fc.currentAttach.printCtlInfo = JSON.stringify($scope.printCtlInfoObj);
        console.log($scope.fc.currentAttach);
//    $scope.$applyAsync();
        /*ajax更新后台数据*/
        SysUtils.requestByJson("/middleAttachment/updatePrintCtlInfo", $scope.fc.currentAttach, function (resultInfo) {
            swal("提示", "打印结束", "success");
        });
    };
    //初始化插件
    $scope.fx_init = function (div) {
        openPerformed = function () {
            $scope.openPerformedExt();
        }

        pPerformed = function () {
            $scope.pPerformedExt();
        }

        printPerformed = function () {
            $scope.printPerformedExt();
        }

        savePerformed = function () {
            $scope.savePerformed();
        }
        $scope.ocx = suwell.ofdReaderInit(div, '100%', '100%');
//    $scope.ocx.registListener("f_open", "openPerformed", true);/*打开文件后执行*/
//    $scope.ocx.registListener("f_printengine", "pPerformed", true);/*每次打印成功后执行*/
//    $scope.ocx.registListener("print", "printPerformed", true);/*打印完后执行*/
//    $scope.ocx.ocxExists = 'exists';
        $scope.ocx.registListener("f_saveurl", "savePerformed", true);
        $scope.ocx.setScale(100);

        //此监听用于判断远程保存文件的成败。如果此监听被触发说明文件保存成功。如果不被触发说明文件保存失败。
        /*
                if ($scope.ocx) {
                    //console.log("注册保存监听");
                    $scope.ocx.registListener("f_saveurl", "savePerformed", true);
                }
        */
    }

    $scope.savePerformed = function () {
        //$scope.showModel();
        //注意监听处理里最好不用alert方法，一个控件处于监听状态触发另一个控件可能会有问题。目前我方测试某些firefox，alert中会卡死.chrome弹出窗口位置异常。
        //建议通过ajax后台处理后回弹信息，或使用iframe方法重构提示窗口。
        //swal("保存成功!","","success");
        $scope.fc.initTask(function () {
            $scope.task.belongingProInst.zhengwenMidAttList.forEach(function (v) {
                if ($scope.fc.currentGroupOwnerAttach.groupLeaderId == v.groupLeaderId) {
                    $scope.fc.openDocumentText(v, 'groupOwner');//保存成功后打开该文件
                }
            });
        });
        // $(".flyover").hide();
        // alert("保存成功!");
    }

    /*打印*/
    $scope.ofdPrint = function () {
        /*设置批量打印份数 但受限于初始化设置的最大打印份数*/
        $scope.hidenModel();
        $('#printCtlInfo').modal('show');

        /*计算打印控制信息*/
        $scope.printCtlInfoObj = JSON.parse($scope.fc.currentAttach.printCtlInfo);
        $scope.printCtlInfoObj.ofdPrintedNums = SysUtils.numArrDeCompress2StrArr($scope.printCtlInfoObj.ofdPrintedNums, 6);
        $scope.printCtlInfoObj.ofdWaitPrintNums = SysUtils.numArrDeCompress2StrArr($scope.printCtlInfoObj.ofdWaitPrintNums, 6);
        $scope.printControlNum = $scope.printCtlInfoObj.ofdWaitPrintNums.length;
        $scope.printControlNumBlur($scope.printControlNum);
        $scope.$applyAsync();
    };

    $('#printCtlInfo').on('hidden.bs.modal', function (e) {
        $scope.showModel();
    });


    $scope.strNumCompare = function (x, y) {
        if (x < y) {
            return -1;
        } else if (x > y) {
            return 1;
        } else {
            return 0;
        }
    }
    $scope.moveArrayItem = function (src, desc, item) {
        if (src == null) {
            src = [];
        }
        if (desc == null) {
            desc = [];
        }
        src.remove(item);
        // console.log($scope.printCtlInfoObj);
        desc.push(item);
        src.sort($scope.strNumCompare);
        desc.sort($scope.strNumCompare);
        $scope.printControlNum = $scope.printCtlInfoObj.ofdPrintNums.length;
        $scope.$applyAsync();
    };

    $scope.ofdPrintConfirm = function () {
        if (SysUtils.notEmpty($scope.printCtlInfoObj, ['ofdPrintNums'])) {
            $('#printCtlInfo').modal('hide');

            if (!SysUtils.isEmpty($scope.task.theCommonFormInfo.wfSecretConfirm.dicTypeRef) && !SysUtils.isEmpty($scope.task.theCommonFormInfo.wfSecretConfirm.dicTypeRef.name)) {//如果不是涉密信息则隐藏开头三个公文域
                var tagPos = $scope.ocx.getTaggedPosition("电子公文/公文体/版头/份号");
                $scope.ofdPrintPostition = tagPos.split(",");
                x = parseFloat($scope.ofdPrintPostition[1]) + 1;
                y = parseFloat($scope.ofdPrintPostition[2]);
                $scope.printCtlInfoObj.ofdPrintNums.forEach(function (v) {
                    $scope.ocx.setBarcodeInfo("<setinfo type='barinfo'><parameter name='pages' value=\"" + 1 + "\"/><parameter name=\"rotate\" value=\"0\"/><parameter name=\"visible\" value=\"true\"/><parameter name=\"printable\" value=\"true\"/><parameter name=\"xpostype\" value=\"left\"/><parameter name=\"ypostype\" value=\"top\"/><parameter name=\"x\" value=\"" + x + "\"/><parameter name=\"y\" value=\"" + y + "\"/><parameter name=\"w\" value=\"" + $scope.ofdPrintPostition[3] + "\"/><parameter name=\"h\" value=\"" + $scope.ofdPrintPostition[4] + "\"/><parameter name=\"strcont\" font=\"仿宋_GB2312\" size=\"16\" bold=\"false\" italic=\"false\" opaque=\"true\" color= \"black\">" + v + "</parameter></setinfo>");
                    $scope.ocx.printFileCopies(1);
                    $scope.printCtlInfoObj.ofdPrintedNums.push(v);
                });
            } else {
                $scope.printCtlInfoObj.ofdPrintNums.forEach(function (v) {
                    $scope.ocx.printFileCopies(1);
                    $scope.printCtlInfoObj.ofdPrintedNums.push(v);
                });
            }
            $scope.printCtlInfoObj.ofdPrintNums = [];
            /*保存本次打印控制信息*/

            $scope.printCtlInfoObj.ofdPrintedNums = SysUtils.numArrCompress($scope.printCtlInfoObj.ofdPrintedNums);
            $scope.printCtlInfoObj.ofdWaitPrintNums = SysUtils.numArrCompress($scope.printCtlInfoObj.ofdWaitPrintNums);

            $scope.fc.currentAttach.printCtlInfo = JSON.stringify($scope.printCtlInfoObj);


            SysUtils.requestByJson("/middleAttachment/updatePrintCtlInfo", $scope.fc.currentAttach, function (resultInfo) {
//        swal("提示", "打印就绪，等待打印机完成打印", "success");
            });
        } else {
            swal("提示", "请选择需打印份号", "error");
            return;
        }
    };

    //</editor-fold>


    /*    $scope.fc.openedPrintC = function () {
     if ($scope.fc.printMiddattachNumber <= $scope.fc.printMiddattachIds.length) {
     ocx.closeFile();
     var url = ENV.localapi + "/attach/downloadWps?id=" + $scope.fc.printMiddattachIds[$scope.fc.printMiddattachNumber - 1];
     var res = ocx.openFile(url, true);
     $scope.fc.printMiddattachNumber++;
     } else {
     $scope.fc.printMiddattachNumber = 0;
     swal("提示", "打印成功！", "success");
     }
     }*/


    /*  $scope.returnTasklist = function () {
          if (!SysUtils.notEmpty($scope.homeListRenewId, [])) {
              if (!SysUtils.notEmpty(window.opener, [])) {
                  window.opener.location.reload();
              }
          } else {
              if (!SysUtils.notEmpty(window.opener, [])) {
                  var bacBtn = window.opener.document.getElementById($scope.homeListRenewId);
                  if (SysUtils.notEmpty(bacBtn, [])) {
                      bacBtn.click();
                  }
              }
          }
          window.close();
          return;
      };*/
    /*  $scope.returnTasklist = function () {
    try {
      var elementById = window.opener.document.getElementById('dbsycx');
      if (elementById != null) {
        elementById.click();
      }
    } finally {
      window.opener.location.reload();
      window.close();
    }

  };*/
    $scope.returnTasklist = function () {
        try {
            if ($scope.hasSave) {
                window.opener.renwPage();
            }
        } finally {
            window.close();
        }
    };

    $scope.fc.goToNextTask = function () {
        if ($scope.fc.nextTusk != null) {//如果还有下一个
            window.location = ENV.localapi + "/index.html#!/officialDocuments/" + $scope.fc.nextTusk.belongingProInst.formDefId + "/" + $scope.fc.nextTusk.id;
            window.location.reload();
        } else {
            SysUtils.swalOnlyConfirm("提示", "已经没有待办任务了", "info", function (isConfirm) {
                $scope.returnTasklist();
            });
        }
    };


    $scope.hideWorkflowDialog = function () {
        $('#moveWorkflowDialog').modal('hide');
    };


    $scope.fc.queryNextTusk = function () {
        SysUtils.silenceWithAuthAjax("/rCurrentTaskInfo/" + $scope.taskId + "/nextTusk", {}, function (resultInfo) {
            $scope.fc.nextTusk = resultInfo.bean;
            $scope.fc.remainTusksNum = resultInfo.totalRows;
            $scope.$applyAsync();
        });
    };


    $scope.publicityLevelDetail = {
        yesVal: '是',
        noVal: ' ',
        allLevel: ['ysqgk', 'bygk', 'zdgk', 'wngk'],
        currentLevel: [], //当前等级
        wngk: '', //委内公开
        zdgk: '', //主动公开
        bygk: '', //不予公开
        ysqgk: '' //依申请公开
    };

    $scope.fc.publicityLevelClick = function (newlevel, cb) {
        SysUtils.swalConfirm("提示", "确定修改文档公开等级吗？", "info", function (isConfirm) {
            if (isConfirm) {
                $scope.publicityLevelUpdate(newlevel);
                $scope.publicityLevelShow();
                if (cb) {
                    cb();
                }
            } else {
                return;
            }
        });

        /*
                if (newlevel == 'wngk' || !SysUtils.isInArray($scope.publicityLevelDetail.currentLevel, newlevel)) {
                    SysUtils.swalConfirm("提示", "确定修改文档公开等级吗？", "info", function (isConfirm) {
                        if (isConfirm) {
                            $scope.publicityLevelUpdate(newlevel);
                            $scope.publicityLevelShow();
                            if (cb) {
                                cb();
                            }
                        } else {
                            return;
                        }
                    });
                }
        */

    };


    $scope.publicityLevelClickCb = function () {
        if ($scope.publicityLevelDetail.currentLevel.contains('wngk')) {
            $scope.task.theCommonFormInfo.belongProInst.wngk = '1';
        } else {
            $scope.task.theCommonFormInfo.belongProInst.wngk = '0';
        }
    }

    $scope.publicityLevelClick = function (newlevel) {
//    $scope.fc.publicityLevelClick(newlevel, $scope.publicityLevelClickCb);
        $scope.fc.publicityLevelClick(newlevel);
        $scope.$applyAsync();
    };

    $scope.publicityLevelShow = function () {
        if (SysUtils.notEmpty($scope.publicityLevelDetail, ['currentLevel'])) {
            $scope.publicityLevelDetail.allLevel.forEach(function (v) {
                $scope.publicityLevelDetail[v] = $scope.publicityLevelDetail.noVal;
            });
            $scope.publicityLevelDetail.currentLevel.forEach(function (v) {
                $scope.publicityLevelDetail[v] = $scope.publicityLevelDetail.yesVal;
            });
        } else {
            $scope.publicityLevelDetail.allLevel.forEach(function (v) {
                $scope.publicityLevelDetail[v] = $scope.publicityLevelDetail.noVal;
            });
        }
        $scope.$applyAsync();
    };

    $scope.publicityLevelUpdate = function (newlevel) {
        if (newlevel == 'wngk') {
            if ($scope.publicityLevelDetail.currentLevel.contains(newlevel)) {
                $scope.publicityLevelDetail.currentLevel.remove(newlevel);
            } else {
                $scope.publicityLevelDetail.currentLevel = $scope.publicityLevelDetail.currentLevel.concat(newlevel);
            }
        } else {
            if ($scope.publicityLevelDetail.currentLevel.contains(newlevel)) {
                $scope.publicityLevelDetail.currentLevel.remove(newlevel);
            } else {
                if ($scope.publicityLevelDetail.currentLevel.contains('wngk')) {
                    $scope.publicityLevelDetail.currentLevel = [].concat('wngk', newlevel);
                } else {
                    $scope.publicityLevelDetail.currentLevel = [].concat(newlevel);
                }
            }
        }

        if (!$scope.publicityLevelDetail.currentLevel.contains('bygk') && !$scope.publicityLevelDetail.currentLevel.contains('ysqgk')) {
            $scope.notOpenReason.allType.forEach(function (value) {
                $scope.notOpenReason[value] = false;
            });
            $scope.task.theCommonFormInfo.notOpenReason = null;
            $scope.task.theCommonFormInfo.otherReason = null;
        }


        $scope.task.theCommonFormInfo.publicityLevel = $scope.publicityLevelDetail.currentLevel.join('|');

        $scope.$applyAsync();
    };

    $scope.notOpenReason = {
        allType: ['gjmm', 'grys', 'nbglxx', 'symm', 'wjsaywd', 'gcxxx', 'otherReson'],
        gjmm: false,
        grys: false,
        nbglxx: false,
        symm: false,
        wjsaywd: false,
        gcxxx: false,
        otherReson: false
    };

    $scope.dicChoseModals = {
        emergenceLevel: {
            choseType: 'Exclusive',  // Exclusive Choice(单选)            // Multiple Choice (多选)
            dbobj: "common",
            dbColumn: 'emergenceLevel',
            title: '请选择等级',
            th1: '等级',
            addFooter: false,
            addSearch: false,
            mbcss: "mbcss-ns-nf",
            dicTypeList: []
        },
        wngk: {
            choseType: 'Exclusive',  // Exclusive Choice(单选)            // Multiple Choice (多选)
            dbobj: "instance",
            dbColumn: 'wngk',
            title: '请选择等级',
            th1: '等级',
            addFooter: false,
            addSearch: false,
            mbcss: "mbcss-ns-nf",
            dicTypeList: []
        },
        xxgk: {
            choseType: 'Exclusive',  // Exclusive Choice(单选)            // Multiple Choice (多选)
            dbobj: "common",
            dbColumn: 'xxgk',
            title: '请选择等级',
            th1: '等级',
            addFooter: false,
            addSearch: false,
            mbcss: "mbcss-ns-nf",
            dicTypeList: []
        },
        docType: {
            choseType: 'Exclusive',  // Exclusive Choice(单选)            // Multiple Choice (多选)
            dbobj: "common",
            dbColumn: 'docType',
            title: '请选择文种',
            th1: '文种',
            type: '类型',
            addFooter: false,
            addSearch: false,
            mbcss: "mbcss-ns-nf",
            dicTypeList: []
        },
        sendToMain: {
            choseType: 'Multiple',  // Exclusive Choice(单选)            // Multiple Choice (多选)
            dbobj: "especial",
            dbColumn: 'sendToMain',
            title: '请选择主送单位',
            th1: '主送单位',
            addFooter: true,
            addSearch: true,
            mbcss: "mbcss-s-f",
            dicTypeList: []
        },
        sendToCc: {
            choseType: 'Multiple',  // Exclusive Choice(单选)            // Multiple Choice (多选)
            dbobj: "especial",
            dbColumn: 'sendToCc',
            title: '请选择主抄单位',
            th1: '抄送单位',
            addFooter: true,
            addSearch: true,
            mbcss: "mbcss-s-f",
            dicTypeList: []
        },
        fwSecurityLevel: {
            choseType: 'Exclusive',  // Exclusive Choice(单选)            // Multiple Choice (多选)
            dbobj: "common",
            dbColumn: 'secretLevel',
            title: '请选择密级',
            th1: '密级',
            addFooter: false,
            addSearch: false,
            mbcss: "mbcss-ns-nf",
            dicTypeList: []
        },
        SecurityLevel: {
            choseType: 'Exclusive',  // Exclusive Choice(单选)            // Multiple Choice (多选)
            dbobj: "common",
            dbColumn: 'secretLevel',
            title: '请选择密级',
            th1: '密级',
            addFooter: false,
            addSearch: false,
            mbcss: "mbcss-ns-nf",
            dicTypeList: []
        },
        SendDept: {
            choseType: 'Multiple',  // Exclusive Choice(单选)            // Multiple Choice (多选)
            dbobj: "instance",
            dbColumn: 'incomingDocDepart',
            title: '请选择来文单位',
            th1: '来文单位',
            addFooter: true,
            addSearch: true,
            mbcss: "mbcss-s-f",
            dicTypeList: []
        },
        duwenDept: {
            choseType: 'Multiple',  // Exclusive Choice(单选)            // Multiple Choice (多选)
            dbobj: "instance",
            dbColumn: 'chenBanDepart',
            title: '请选择承办部门',
            th1: '部门',
            addFooter: true,
            addSearch: true,
            mbcss: "mbcss-s-f",
            dicTypeList: []
        },
        RsvPaperJia: {
            choseType: 'Exclusive',  // Exclusive Choice(单选)            // Multiple Choice (多选)
            dbobj: "instance",
            dbColumn: 'incomingDocDepart',
            title: '请选择来文单位',
            th1: '来文单位',
            addFooter: true,
            addSearch: true,
            mbcss: "mbcss-s-f",
            dicTypeList: []
        },
        RsvPaperYi: {
            choseType: 'Exclusive',  // Exclusive Choice(单选)            // Multiple Choice (多选)
            dbobj: "instance",
            dbColumn: 'incomingDocDepart',
            title: '请选择来文单位',
            th1: '来文单位',
            addFooter: true,
            addSearch: true,
            mbcss: "mbcss-s-f",
            dicTypeList: []
        },
        RsvPaperBing: {
            choseType: 'Exclusive',  // Exclusive Choice(单选)            // Multiple Choice (多选)
            dbobj: "instance",
            dbColumn: 'incomingDocDepart',
            title: '请选择来文单位',
            th1: '来文单位',
            addFooter: true,
            addSearch: true,
            mbcss: "mbcss-s-f",
            dicTypeList: []
        },
        RsvPaperGuo: {
            choseType: 'Exclusive',  // Exclusive Choice(单选)            // Multiple Choice (多选)
            dbobj: "instance",
            dbColumn: 'incomingDocDepart',
            title: '请选择来文单位',
            th1: '来文单位',
            addFooter: true,
            addSearch: true,
            mbcss: "mbcss-s-f",
            dicTypeList: []
        },
        RsvLetter: {
            choseType: 'Exclusive',  // Exclusive Choice(单选)            // Multiple Choice (多选)
            dbobj: "especial",
            dbColumn: 'docType',
            title: '请选择信函类型',
            th1: '信函类型',
            addFooter: false,
            addSearch: false,
            mbcss: "mbcss-ns-nf",
            dicTypeList: []
        },
        ReceiveDept: {
            choseType: 'Multiple',  // Exclusive Choice(单选)            // Multiple Choice (多选)
            dbobj: "instance",
            dbColumn: 'incomingDocDepart',
            title: '请选择来文处室',
            th1: '来文处室',
            addFooter: true,
            addSearch: true,
            mbcss: "mbcss-s-f",
            dicTypeList: []
        },
        ApprovedSecret: {
            choseType: 'Exclusive',  // Exclusive Choice(单选)            // Multiple Choice (多选)
            dbobj: "common",
            dbColumn: 'secretLevel',
            title: '请选择密级',
            th1: '密级',
            addFooter: false,
            addSearch: false,
            mbcss: "mbcss-ns-f",
            dicTypeList: []
        },
        otherApprovedSecret: {
            choseType: 'Exclusive',  // Exclusive Choice(单选)            // Multiple Choice (多选)
            dbobj: "common",
            dbColumn: 'secretLevel',
            title: '请选择等级',
            th1: '等级',
            addFooter: true,
            addSearch: true,
            mbcss: "mbcss-ns-f",
            dicTypeList: []

        },
        Require: {
            choseType: 'Exclusive',  // Exclusive Choice(单选)            // Multiple Choice (多选)
            dbobj: "especial",
            dbColumn: 'handRequirement',
            title: '请选择办理要求',
            th1: '办理要求',
            addFooter: false,
            addSearch: false,
            mbcss: "mbcss-ns-nf",
            dicTypeList: []
        },
        blyjbpzx: {
            choseType: 'Exclusive',  // Exclusive Choice(单选)            // Multiple Choice (多选)
            dbobj: "common",
            dbColumn: 'bulletinRemark',
            title: '请选择办理结果',
            th1: '办理结果',
            addFooter: false,
            addSearch: false,
            mbcss: "mbcss-ns-nf",
            dicTypeList: []
        },
        blyjbprd: {
            choseType: 'Exclusive',  // Exclusive Choice(单选)            // Multiple Choice (多选)
            dbobj: "common",
            dbColumn: 'bulletinRemark',
            title: '请选择办理结果',
            th1: '办理结果',
            addFooter: false,
            addSearch: false,
            mbcss: "mbcss-ns-nf",
            dicTypeList: []
        }
    };


    $scope.wf.hisView.fun.returnTasks = function () {
        $scope.wf.hisView.fun.hisBackTask($scope.task.canReturnTasks[0]);
    }

    $scope.wf.hisView.fun.hisBackTask = function (task) {
        SysUtils.requestByJson("/rCurrentTaskInfo/backTask", task.id, function (resultInfo) {
            $scope.taskId = resultInfo.additionalInfo.task.id;
            var shortURL = ENV.localapi + "/index.html#!/officialDocuments/" + $scope.task.belongingProInst.formDefId + "/" + $scope.taskId;
            history.replaceState(null, null, shortURL)
            $scope.fc.initTask();

        });
    }
    $scope.addToNotOpenReasonCk = function (reson, $event) {
        if (SysUtils.notEmpty($scope.fc.formFieldControlMap, [])) {
            if (("false" == $scope.fc.formFieldControlMap.不予公开.isAbleEdit) && ("false" == $scope.fc.formFieldControlMap.依申请公开.isAbleEdit)) {
                swal("提示", "不予公开理由不可编辑", "info");
                $scope.notOpenReason[reson] = !$scope.notOpenReason[reson];
                return;
            }
            if (!$scope.publicityLevelDetail.currentLevel.contains('bygk') && !$scope.publicityLevelDetail.currentLevel.contains('ysqgk')) {
                swal("提示", "请先确定公文公开等级（不予公开/依申请公开）", "info");
                $scope.notOpenReason[reson] = !$scope.notOpenReason[reson];
                return;
            }
        } else {
            swal("提示", "不予公开理由不可编辑", "info");
            $scope.notOpenReason[reson] = !$scope.notOpenReason[reson];
            return;
        }
        var currSelect = $scope.notOpenReason[reson];
        if (currSelect) {
            $($event.target).removeClass("checked");
        } else {
            $($event.target).addClass("checked");
        }
        $scope.notOpenReason.allType.forEach(function (value) {
            $scope.notOpenReason[value] = false;
        });
        if (currSelect) {
            $scope.notOpenReason[reson] = true;
            $scope.task.theCommonFormInfo.notOpenReason = reson;
        } else {
            $scope.task.theCommonFormInfo.notOpenReason = null;
        }
        if (!$scope.notOpenReason.otherReson) {
            $scope.task.theCommonFormInfo.otherReason = null;
        }
        return;
    }
    $scope.addToNotOpenReason = function (reson) {
        if (SysUtils.notEmpty($scope.fc.formFieldControlMap, [])) {
            if (("false" == $scope.fc.formFieldControlMap.不予公开.isAbleEdit) && ("false" == $scope.fc.formFieldControlMap.依申请公开.isAbleEdit)) {
                swal("提示", "不予公开理由不可编辑", "info");
                return;
            }
            if (!$scope.publicityLevelDetail.currentLevel.contains('bygk') && !$scope.publicityLevelDetail.currentLevel.contains('ysqgk')) {
                swal("提示", "请先确定公文公开等级（不予公开/依申请公开）", "info");
                return;
            }
        } else {
            swal("提示", "不予公开理由不可编辑", "info");
            return;
        }
        var currSelect = $scope.notOpenReason[reson];

        $scope.notOpenReason.allType.forEach(function (value) {
            $scope.notOpenReason[value] = false;
        });
        if (currSelect) {
            $scope.task.theCommonFormInfo.notOpenReason = null;
            return;
        }

        $scope.notOpenReason[reson] = true;


        $scope.task.theCommonFormInfo.notOpenReason = reson;

        if (!$scope.notOpenReason.otherReson) {
            $scope.task.theCommonFormInfo.otherReason = null;
        }
    };

    $scope.activeDicModal = {dicTypeList: []};

    $scope.choseDicType = function (dicType) {
        if (dicType == 'ApprovedSecret' || dicType == 'draftapproved') {//工作报批【密级】
            if (!SysUtils.notEmpty($scope.dicChoseModals, [dicType, 'dicTypeList'])) {
                $scope.dicChoseModals[dicType].dicTypeList = $scope.dicChoseModals['SecurityLevel'].dicTypeList;
                $scope.dicChoseModals[dicType].dicTypeList[0].name = null;
            }
        }
        $scope.activeDicModal = ($scope.dicChoseModals[dicType]);

        if (!SysUtils.notEmpty($scope.activeDicModal, ['dicTypeList'])) {
            SysUtils.swalConfirm("提示", "获取字典失败，请稍后重试", "info", function (isConfirm) {
                breakFunc = true;
            })
        } else {
            var rstr = "";
            if ('instance' == $scope.activeDicModal.dbobj) {
                rstr = $scope.task.theCommonFormInfo.belongProInst[$scope.activeDicModal.dbColumn];
            } else if ('common' == $scope.activeDicModal.dbobj) {
                rstr = $scope.task.theCommonFormInfo[$scope.activeDicModal.dbColumn];
            } else {
                rstr = $scope.task.theCommonFormInfo[$scope.queryDetaiTable()][$scope.activeDicModal.dbColumn];
            }

            if (!SysUtils.notEmpty(rstr, []) && dicType != "ApprovedSecret" && dicType != "draftapproved") {
                $scope.activeDicModal.dicTypeList.forEach(function (value, index, array) {
                    array[index].checked = false;
                    array[index].showAble = true;
                    //主送机关和抄送机关最好选择不重复
                    if (dicType == "sendToMain" && SysUtils.notEmpty($scope.task.theCommonFormInfo[$scope.queryDetaiTable()]["sendToCc"], []) && $scope.task.theCommonFormInfo[$scope.queryDetaiTable()]["sendToCc"].indexOf(value.name) !== -1) {
                        array[index].showAble = false;
                    } else if (dicType == "sendToCc" && SysUtils.notEmpty($scope.task.theCommonFormInfo[$scope.queryDetaiTable()]["sendToMain"], []) && $scope.task.theCommonFormInfo[$scope.queryDetaiTable()]["sendToMain"].indexOf(value.name) !== -1) {
                        array[index].showAble = false;
                    }

                })
            } else {
                if ($scope.activeDicModal.choseType == 'Exclusive') {
                    $scope.activeDicModal.dicTypeList.forEach(function (value, index, array) {
                        array[index].showAble = true;
                        array[index].checked = false;
                        if ((SysUtils.isEmpty(rstr) && SysUtils.isEmpty(array[index].name)) || (SysUtils.notEmpty(rstr, []) && rstr.indexOf(array[index].name) != -1)) {
                            array[index].checked = true;
                        }
                    })
                } else {
                    $scope.activeDicModal.dicTypeList.forEach(function (value, index, array) {
                        if (rstr.indexOf(array[index].name) != -1) {
                            array[index].checked = false;
                            array[index].showAble = false;
                        } else {
                            array[index].showAble = true;
                        }
                        //主送机关和抄送机关最好选择不重复
                        if (dicType == "sendToMain" && SysUtils.notEmpty($scope.task.theCommonFormInfo[$scope.queryDetaiTable()]["sendToCc"], []) && $scope.task.theCommonFormInfo[$scope.queryDetaiTable()]["sendToCc"].indexOf(value.name) !== -1) {
                            array[index].showAble = false;
                        } else if (dicType == "sendToCc" && SysUtils.notEmpty($scope.task.theCommonFormInfo[$scope.queryDetaiTable()]["sendToMain"], []) && $scope.task.theCommonFormInfo[$scope.queryDetaiTable()]["sendToMain"].indexOf(value.name) !== -1) {
                            array[index].showAble = false;
                        }
                    })
                }
            }

            $('#dicTypeChoseModal').modal('show');
            $scope.$applyAsync();
        }
    };

    $scope.initDicType = function (dicType, modelName) {
        accUrl = ENV.localapi + "/dicMode/qTypesByModeName/" + modelName;
        dataFactory.getlist(accUrl, 'POST', {'Content-type': 'application/json'}, {}).then(
            function (resultInfo) {
                SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                    /*回调自动处理脏数据 不放心可加*/
                    $scope.dicChoseModals[dicType].dicTypeList = resultInfo.beanList;
                    $scope.$applyAsync();
                })
            },
            function (d) {
                console.log(JSON.stringify(d));
            }
        );
    };

    $scope.activeOption = {};
    $scope.userOptions = {};
    $scope.CUserOptionList = [];
    $scope.docSearchKey = "" //快速检索

    $scope.querySysTime = function (pattern, callbac) {
        accUrl = ENV.localapi + "/coreUser/querySysTime/" + pattern;
        dataFactory.getlist(accUrl, 'Get', {'Content-type': 'application/json'}, {}).then(
            function (resultInfo) {
                callbac(resultInfo);
            },
            function (d) {
                console.log(JSON.stringify(d));
            }
        );
    };

    $scope.activeOptionDblClick = function (o) {
        if (SysUtils.notEmpty($scope.CUserOptionList, [])) {
            $scope.CUserOptionList.forEach(function (value, index, array) {
                array[index].disDel = false;
            });
        }
        $scope.activeOption = o;
        $('#opinionId').val($scope.activeOption.opinion);
        $scope.activeOption.editAble = true;
        $scope.activeOption.hisOpTip = "历史意见，双击选中后可进行修改或删除";
        $scope.activeOption.editTip = "修改意见";
        $scope.activeOption.okBtn = "确定";
        o.disDel = true;
        $scope.$applyAsync();
    };


    $scope.initUserOption = function () {
        $scope.userOptions = {};
        if ($scope.task.userOpinions == null)
            return;
        $scope.task.userOpinions.forEach(function (v) {
            if (!SysUtils.notEmpty($scope.userOptions, ["step" + v.stepId])) {
                $scope.userOptions['step' + v.stepId] = {};
            }
            if (!SysUtils.notEmpty($scope.userOptions, ["step" + v.stepId, 'user' + v.approverId])) {
                $scope.userOptions['step' + v.stepId]['user' + v.approverId] = [];
            }
            if (!SysUtils.notEmpty($scope.userOptions, ["step" + v.stepId, 'options'])) {
                $scope.userOptions['step' + v.stepId]['options'] = [];
            }
            // t = SysUtils.deepCopy(v);
            // $scope.userOptions['step' + v.stepId]['user' + v.approverId] = $scope.userOptions['step' + v.stepId]['user' + v.approverId].concat(t);
            // v.approveTime = v.approveTime.slice(5);
            $scope.userOptions['step' + v.stepId]['options'] = $scope.userOptions['step' + v.stepId]['options'].concat(v);
        });
        // console.log("==" + $scope.userOptions);
        $scope.$applyAsync();
    };


    $scope.optionShowNameChange = function () {
        if ($scope.activeOption.otherNameCK) {
            $scope.activeOption.approverName = $scope.task.assigneeName;
            $scope.activeOption.agentFlag = 2;
        } else {
            $scope.activeOption.approverName = $scope.currentUser.name;
            $scope.activeOption.agentFlag = 1;
        }
    };

    /*制定显示字段 全局意见*/
    $scope.duwenJdOpinions = function (opShowField) {
        $scope.initActiveOption(opShowField);
        $scope.CUserOptionList = $scope.task.userOpinions[opShowField];
        $('#OptionModal').modal('show');
        $scope.$applyAsync();
    };

    /*制定显示字段 个人意见*/
    $scope.duwenJdPerOpinions = function (opShowField) {
        $scope.initActiveOption(opShowField);
        opShowField = "per" + opShowField;
        $scope.CUserOptionList = $scope.task.userOpinions[opShowField];
        $('#OptionModal').modal('show');
        $scope.$applyAsync();
    };

    $scope.initSldpsActiveOption = function (opShowField) {
        $scope.activeOption = {};
        $('#opinionId').val($scope.activeOption.opinion);
        $scope.activeOption.editAble = true;
        $scope.activeOption.showField = opShowField;
        $scope.activeOption.hisOpTip = "历史意见，双击选中后可进行修改或删除";
        $scope.activeOption.editTip = "新意见";
        $scope.activeOption.okBtn = "确定";
        var t = new Date(SysUtils.sysDate());
        $scope.activeOption.approveTime = t.format("yyyy-MM-dd HH:mm:ss");

        $scope.activeOption.editAble = true;
        $scope.activeOption.taskId = $scope.task.id;

        $scope.activeOption.stepId = $scope.task.theCommonFormInfo.belongProInst.duwenHandleAgainNum;
        $scope.activeOption.flowId = $scope.task.belongingProInst.id;

        $scope.activeOption.dealerId = $scope.currentUser.id;
        $scope.activeOption.dealerName = $scope.currentUser.name;

        $scope.activeOption.approverId = $scope.currentUser.id;
        $scope.activeOption.assigneeName = $scope.currentUser.name;


        /*页面显示名字*/
        $scope.activeOption.approverName = $scope.activeOption.assigneeName;

        $scope.CUserOptionList = $scope.task.userOpinions[opShowField];

        var option = {};
        option.taskAssigneeId = $scope.activeOption.dealerId;
        option.flowDefId = $scope.task.belongingProInst.processDefVersion.processDefId;
        option.flowNodeId = $scope.activeOption.stepId;
        option.showPosition = $scope.activeOption.showField;
        SysUtils.requestByJsonSync('/wfPersonFlowOption/queryAll', option, function (resultInfo) {
            $scope.task.wfPersonFlowOptions = resultInfo.beanList;
        });
    };

    $scope.initActiveOption = function (opShowField, editAble) {
        $scope.activeOption = {};
        $('#opinionId').val($scope.activeOption.opinion);
        $scope.activeOption.editAble = true;
        $scope.activeOption.showField = opShowField;
        $scope.activeOption.hisOpTip = "历史意见，双击选中后可进行修改或删除";
        $scope.activeOption.editTip = "新意见";
        $scope.activeOption.okBtn = "确定";
        var t = new Date(SysUtils.sysDate());
        $scope.activeOption.approveTime = t.format("yyyy-MM-dd HH:mm:ss");
        if (!SysUtils.notEmpty($scope.task.belongingNodeId, [])) {
            $scope.activeOption.editAble = false;
        }
        if (SysUtils.notEmpty(editAble, [])) {
            $scope.activeOption.editAble = editAble;
        }
        if (!$scope.activeOption.editAble) {
            return $scope.activeOption;
        }

        $scope.activeOption.editAble = true;
        $scope.activeOption.taskId = $scope.task.id;
        $scope.activeOption.stepId = $scope.task.belongingNodeId;
        $scope.activeOption.flowId = $scope.task.belongingProInst.id;

        $scope.activeOption.dealerId = $scope.currentUser.id;/*实际处理人id*/
        $scope.activeOption.dealerName = $scope.currentUser.name;/*实际处理人名字*/

        $scope.activeOption.approverId = $scope.task.assignee;/*任务拥有者id*/
        $scope.activeOption.assigneeName = $scope.task.assigneeName;/*任务拥有者名字*/

        $scope.activeOption.otherNameCK = true;


        $scope.activeOption.approverName = $scope.activeOption.assigneeName;/*页面显示名字*/

        if ($scope.activeOption.approverId != $scope.activeOption.dealerId) {
            $scope.activeOption.otherNameCkShow = true;
            $scope.activeOption.agentFlag = 1;
            /*0:本人  1:代理人用自己名字代签  2代理人用任务拥有者名字代签*/
        } else {
            $scope.activeOption.otherNameCkShow = false;
            $scope.activeOption.agentFlag = 0;
        }
    };

    $scope.inputOption = function () {
        $scope.initActiveOption("normal");
        $scope.CUserOptionList = $scope.task.userOpinions.cuCnOption;
        $('#OptionModal').modal('show');
        $scope.$applyAsync();
    };

    $scope.adjustOpinions = function () {
        $scope.initActiveOption("normal", false);
        $scope.CUserOptionList = $scope.task.userOpinions.allOption;
        $('#OptionModal').modal('show');
        $scope.$applyAsync();
    }

    $scope.adjustOpinionsFirst = function () {
        $scope.initActiveOption("normal", false);
        $scope.CUserOptionList = $scope.task.userOpinions.firstOption;
        $('#OptionModal').modal('show');
        $scope.$applyAsync();
    }


    $scope.cuOptionsAutoPageConf = {
        currentPage: 1,
        totalItems: 80,
        itemsPerPage: 10,
        pagesLength: 13,
        perPageOptions: [10, 20, 30, 40, 50],
        onChange: function () {
        }
    };

    $scope.cuOptionsPageAuto = function () {
        $scope.queryBean = {};
        $scope.qCuOptions();
    };

    $scope.qCuOptions = function () {
        var url = ENV.localapi + "/coreUser/searchUser";
        dataFactory.getlist(url, 'POST', {'Content-type': 'application/json'}, $scope.queryBean).then(
            function (resultInfo) {
                SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                    $scope.CUserOptionList = resultInfo.beanList;
                    $scope.cuOptionsAutoPageConf.totalItems = resultInfo.totalRows;
                    $scope.$applyAsync();
                })
            },
            function (data) {
                console.log(JSON.stringify(data));
            }
        )
    }

    $scope.assigneeFlowOptions = [];
    $scope.savePersonFlowOption = function () {
        var option = {};
        option.showPosition = $scope.activeOption.showField;
        option.opinion = $scope.activeOption.opinion;
        option.flowDefId = $scope.task.belongingProInst.processDefVersion.processDefId;
        if ($scope.fc.cityApprovalCtlEdit) {
            option.taskAssigneeId = $scope.activeOption.dealerId;
            option.flowNodeId = $scope.activeOption.stepId;
        } else {
            option.taskAssigneeId = $scope.task.assignee;
            option.flowNodeId = $scope.task.belongingNodeId;
        }
        SysUtils.silenceWithAuthAjax("/wfPersonFlowOption/queryAfterCreate", option, function (resultInfo) {
            $scope.task.wfPersonFlowOptions = resultInfo.beanList;
            $scope.fc.remainTusksNum = resultInfo.totalRows;
            $scope.$applyAsync();
        });
    };

    $scope.fc.delPersonOption = function (o) {
        SysUtils.swalConfirm("提示", "确认删除该条常用意见？", "info", function (isConfirm) {
            if (isConfirm) {
                SysUtils.silenceWithAuthAjax("/wfPersonFlowOption/queryAfterDel", o, function (resultInfo) {
                    $scope.task.wfPersonFlowOptions = resultInfo.beanList;
                    $scope.fc.remainTusksNum = resultInfo.totalRows;
                    $scope.$applyAsync();
                });
            }
        });
    }

    $scope.fc.personOptionUse = function (o) {
        $scope.activeOption.opinion = o.opinion;
        $('#opinionId').val($scope.activeOption.opinion);
        $scope.$applyAsync();
    };

    $scope.saveUserOption = function () {
        console.log($scope.activeOption);
        if ($scope.task.belongingProInst.formDefId == "jxwshouwen" || $scope.task.belongingProInst.formDefId == "jxwxinhan") {
            if ("1" == $scope.activeOption.stepId) {
                var subStr = new RegExp('\n    ', 'ig');//创建正则表达式对象,不区分大小写,全局查找
                $scope.activeOption.opinion = $scope.activeOption.opinion.replace(subStr, "\n　　");//4个半角替换为两个全角
            }
        }

        postBean = $scope.activeOption;
        if (postBean.id == null) {
            accUrl = ENV.localapi + "/wfOpinion/create";
        } else {
            accUrl = ENV.localapi + "/wfOpinion/update";

        }
        /*任务意见拥有者与操作者不同为代理 代理不签章*/
        if ($scope.activeOption.approverId != $scope.currentUser.id) {
            /*0:本人  1:代理人用自己名字代签  2代理人用任务拥有者名字代签*/
            if ($scope.activeOption.approverName == $scope.currentUser.name) {
                $scope.activeOption.agentFlag = 1;
            } else {
                $scope.activeOption.agentFlag = 2;
            }
        } else {
            $scope.activeOption.agentFlag = 0;
        }
//    $scope.activeOption.opinion =  $scope.activeOption.opinion.replace(/\n|\r\n/g,"</br>");
        dataFactory.getlist(accUrl, 'POST', {'Content-type': 'application/json'}, $scope.activeOption).then(
            function (resultInfo) {
                SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                    $scope.fc.initTask();
                    $('#OptionModal').modal('hide');
                    if ($scope.fc.reRunCuAct) {
                        $scope.fc.reRunCuAct = false;
                        /*消费本次标记*/
                        $scope.fc.handleFormAction($scope.fc.cuAct);
                    }
                    /*本人或代理操作才自动调用燕托意见签章*/
                    if ($scope.activeOption.agentFlag == 0 || $scope.activeOption.agentFlag == 2) {
                        if ($scope.activeOption.agentFlag == 2) {
                            $('#userId').val(resultInfo.additionalInfo.agentName);
                            //$scope.currentUser.username = resultInfo.additionalInfo.agentName;
                            //$scope.$applyAsync();
                        }
                        try {
                            sgn();
                        } catch (err) {
                            if ("dwr is not defined" == err.message) {
                                console.log("个人签章插件未启动 ");
                            } else {
                                console.log("个人签章插件异常");
                            }
                        }
                    }
                    $scope.$applyAsync();
                })
            },
            function (d) {
                console.log(JSON.stringify(d));
            }
        );
    };


    $scope.fc.updateDocFullName = function () {
    }
    $scope.fc.updateDocPrefix = function () {
    }

    $scope.checkRequired = function () {
        var thisValid = this;
        var obj = {
            flag: false,
            msg: '',
            errorCallFun: "$scope.decorateRequired()",
        };
        $('input[isRequired="req"],textarea[isRequired="req"]').each(function () {
            var _this = $(this);
            if (_this.val() == '') {
                obj.flag = true;
                obj.msg += _this.attr('name') + "、";
            }
        });
        if (obj.msg != '') {
            obj.msg = obj.msg.substring(0, obj.msg.length - 1) + '必填';
            SysUtils.swalForTips("提示", obj.msg, "info", function (isConfirm) {
                $scope.saveFormByValidState = true;
                $scope.fc.initTaskFinish = obj.errorCallFun;
                return $scope.saveFormBz();
            });
        } else {
            return thisValid.nextValidRun();
        }
    };

    $scope.decorateRequired = function () {
        $('input[isRequired="req"],textarea[isRequired="req"]').each(function () {
            var _this = $(this);
            if (_this.val() == '') {
                _this.attr('placeholder', '*');
            }
        });
    };
    $scope.fc.closeCurrentForm = function () {
        $scope.returnTasklist();

    };

    $scope.fc.preSaveForm = function () {
        var thisValid = this;
        return thisValid.nextValidRun();
    }


    $scope.fc.parseDocFullName = function () {
        var str = $scope.task.theCommonFormInfo.belongProInst.docFullName;
        var len = str.length;
        $scope.task.theCommonFormInfo.docYear = parseInt(str.substring(str.indexOf("（") + 1, str.indexOf("）")));
        $scope.task.theCommonFormInfo.docNumber = parseInt(str.substring(str.indexOf("）") + 1, len));
        $scope.$applyAsync();
    };
    /**
     * 收文文号docFullName双击事件，弹出框
     */
    $scope.fc.dubDocFullName = function () {
        $('#receiptYearsDialog').modal('show');
    };

    /**
     * 根据选择年份重新生成收文编号-通用方法
     */
    $scope.fc.receiptYearSelect = function (Dialog) {
        SysUtils.requestByJson("/formDpComposedDeal/initIncomingDocNum", {
            docYear: $scope.task.theCommonFormInfo.docYear,
            id: $scope.task.theCommonFormInfo.id,
            formDetailType: $scope.task.theCommonFormInfo.formDetailType,
            docPrefix: $scope.task.theCommonFormInfo.docPrefix
        }, function (resultInfo) {
            $scope.task.theCommonFormInfo.docNumber = resultInfo.beanId;
            $scope.$applyAsync();
            $scope.fc.generateDocfullName()
            if (Dialog) {
                $("#" + Dialog + "Dialog").modal('hide');
            }
        });
    }


    //<editor-fold desc="保存文档时校验">
    /**
     * 发文校验文号
     */
    $scope.fc.generateDocfullName = function () {
    };
    $scope.fc.checkDocNum_bacId = "";
    $scope.fc.checkDocNum_bacYear = "";
    $scope.fc.checkDocNum_docPrefixBac = "";
    $scope.checkDocNum = function () {
        var thisValid = this;
        $scope.fc.generateDocfullName();

        if (!SysUtils.notEmpty($scope.task.theCommonFormInfo, ['docNumber'])) {
            return thisValid.nextValidRun();
        } else if (($scope.fc.checkDocNum_bacId == $scope.task.theCommonFormInfo.docNumber) && ($scope.fc.checkDocNum_bacYear == $scope.task.theCommonFormInfo.docYear) && ($scope.fc.checkDocNum_docPrefixBac == $scope.task.theCommonFormInfo.docPrefix)) {
            return thisValid.nextValidRun();
        }
        SysUtils.requestByJsonSync('/rFormCommon/checkDocNum', $scope.task.theCommonFormInfo, function (resultInfo) {
            if (resultInfo.resultType == 'saveFormValidFail') {
                SysUtils.swalConfirm("提示", resultInfo.message + "，系统推荐文号为:" + resultInfo.beanId + "，是否采用？", "info", function (isConfirm) {
                    if (isConfirm) {
                        /*年份不会推荐*/
                        $scope.task.theCommonFormInfo.docNumber = resultInfo.beanId;
                        // $scope.fc.checkDocNum_bacYear = $scope.task.theCommonFormInfo.docYear;
                        // $scope.fc.checkDocNum_bacId = $scope.task.theCommonFormInfo.docNumber;
                        $scope.fc.checkDocNum_bacYear = '';
                        $scope.fc.generateDocfullName();
                        // return thisValid.nextValidRun();
                        $scope.saveFormBz();
                    } else {
                        // $scope.fc.checkDocNum_bacYear = $scope.task.theCommonFormInfo.docYear;
                        // $scope.fc.checkDocNum_bacId = $scope.task.theCommonFormInfo.docNumber;
                        $scope.fc.generateDocfullName();
                        $scope.fc.checkDocNum_bacYear = '';
                        // return thisValid.nextValidRun();
                        $scope.saveFormBz();
                    }
                });
            } else {
                return thisValid.nextValidRun();
            }
        });
    };

    /**
     * 校验关联文号的准确性
     * @param value
     */
    $scope.fc.currentTask.relatedShouwenIdBack = "";
    $scope.checkRelatedDoc = function () {
        var thisValid = this;
        $scope.fc.currentTask.relatedShouwenIdNow = $scope.task.theCommonFormInfo.belongProInst.relatedReceiveDocId;

        var nowArr = $scope.fc.currentTask.relatedShouwenIdNow.split(/\s+/);
        var baseArr = $scope.fc.currentTask.relatedShouwenIdBack.split(/\s+/);
        var nowArrb = $scope.fc.currentTask.relatedShouwenIdNow.split(/\s+/);

        var emptArr = [""];
        SysUtils.arrChange(nowArr, emptArr);
        SysUtils.arrChange(baseArr, emptArr);
        SysUtils.arrChange(nowArrb, emptArr);

        if (nowArrb) {
            nowArrb = SysUtils.uniq(nowArrb);
        }
        $scope.task.theCommonFormInfo.belongProInst.relatedReceiveDocId = nowArrb.join(" ");

        /*新增*/
        SysUtils.arrChange(nowArr, baseArr);
        if (nowArr.length == 0) {/*无增*/
            return thisValid.nextValidRun();
        }

        SysUtils.requestByJsonSync('/rProcessInstance/checkDocByDocFullName', nowArr, function (resultInfo) {
            errArr = resultInfo.additionalInfo.notExistDocs;/*无效新增*/
            if (errArr.length > 0) {
                SysUtils.swalForTips("提示", "以下关联文号不存在：" + errArr.join("、"), "info", function (isConfirm) {
                    $scope.fc.currentTask.relatedShouwenIdBack = $scope.fc.currentTask.relatedShouwenIdNow;
                    if (isConfirm) {
                        // return thisValid.nextValidRun();
                        $scope.fc.currentTask.relatedShouwenIdBack = '';
                        $scope.saveFormBz();
                    } else {
                        // return thisValid.nextValidRun();
                        $scope.fc.currentTask.relatedShouwenIdBack = '';
                        $scope.saveFormBz();
                    }
                });
            } else {
                return thisValid.nextValidRun();
            }
        });
    };


    /*来文重复校验*/
    $scope.fc.currentTask.incomingDocNumIdBack = "";
    $scope.checkIncomingDocNum = function () {
        var thisValid = this;

        if ($scope.fc.currentTask.incomingDocNumIdBack == $scope.task.theCommonFormInfo.belongProInst.incomingDocNum) {/*无修改*/
            return thisValid.nextValidRun();
        }
        $scope.fc.currentTask.incomingDocNumIdBack = $scope.task.theCommonFormInfo.belongProInst.incomingDocNum;

        SysUtils.requestByJsonSync('/rProcessInstance/checkIncomingDocNum', $scope.task.theCommonFormInfo.belongProInst, function (resultInfo) {
            if ("repeat" == resultInfo.additionalInfo.incomingDocNum) {
                SysUtils.swalForTips("提示", "来文文号重复", "info", function (isConfirm) {
                    if (isConfirm) {
                        $scope.fc.currentTask.incomingDocNumIdBack = '';
                        $scope.saveFormBz();
                    } else {
                        $scope.fc.currentTask.incomingDocNumIdBack = '';
                        $scope.saveFormBz();
                    }
                });
            } else {
                return thisValid.nextValidRun();
            }
        });
    };

    function saveFormValid(validBzFunc) {
        this.validBzFunc = validBzFunc;
        this.nextValid = undefined;
        this.nextValidRun = function () {
            if (SysUtils.notEmpty(this, ['nextValid', 'validBzFunc'])) {
                this.nextValid.validBzFunc();
            }
        };
        this.chainJection = function (nextValidP) {
            if (SysUtils.notEmpty(nextValidP, [])) {
                this.nextValid = nextValidP;
            }
            return this.nextValid;
        }
    }

    $scope.saveFormBzNoRenew = function () {
        $scope.saveFormByValidState = true;
        $scope.fc.initTaskFinish = '';
        $scope.saveFormBz()
    };
    $scope.saveFormBz = function () {
        /*common 表数据像inst表传递*/
        $scope.task.theCommonFormInfo.belongProInst.docYear = $scope.task.theCommonFormInfo.docYear;
        $scope.task.theCommonFormInfo.belongProInst.docNumber = $scope.task.theCommonFormInfo.docNumber;

        if ($scope.task.taskType == 'SecretResponse') {
            taskBean = {id: $scope.task.id};
            SysUtils.requestByJson("/rCurrentTaskInfo/handleSecretResponse", taskBean, function (resultInfo) {
                if (resultInfo.resultType == 'needDmyj') {
                    $scope.fc.reRunCuAct = true;
                    $scope.openSecretForm();
                } else {
                    $scope.returnTasklist();
                }
            })
        } else {
            SysUtils.requestByJson("/rFormCommon/update", $scope.task.theCommonFormInfo, function (resultInfo) {
                SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                    $scope.fc.initTask();
                })
            })
        }
    }
    $scope.saveFormByValidState = false;
    $scope.saveFormByValid = function () {
        $scope.saveFormByValidState = true;
        $scope.saveFormBz();
    }


    $scope.checkDocNumV = new saveFormValid($scope.checkDocNum);
    //</editor-fold>
    $scope.saveForm = function () {
        /*保存表单前 数据处理 辅助逻辑*/
        $scope.fc.updateDocFullName();

        /*表达校验 并保存*/
        $scope.checkDocNumV.validBzFunc();
    }


    $scope.dblClickRow = function (u) {
        if ($scope.activeDicModal.choseType == 'Exclusive') {
            $scope.activeDicModal.dicTypeList.forEach(function (value, index, array) {
                if (u.name != value.name) {
                    array[index].checked = false;
                } else {
                    array[index].checked = true;
                    $scope.activeDicModal.checked = u.name;
                }
            });
        }
        // $scope.selectDocType(u);//只对文中选择有效--会自动选择文中对应模板
        $scope.bindDicType();
    };
    $scope.mClickRowBtn = function (u) {
    };
    $scope.mClickRow = function (u) {
        if (u.checked) {
            u.checked = false;
        } else {
            u.checked = true;
        }
    };

    $scope.selectDocType = function (u) {
        /*这里为了方便，党委模板id写死*/
        var dicTypeId = u.id;
        if ($scope.task.theCommonFormInfo.belongProInst.formDefId == 'jxwdwfawen' && $scope.task.theCommonFormInfo.docType == '请示') {
            dicTypeId = 943389;
        } else if ($scope.task.theCommonFormInfo.belongProInst.formDefId == 'jxwdwfawen' && $scope.task.theCommonFormInfo.docType == '纪要') {

        } else if ($scope.task.theCommonFormInfo.belongProInst.formDefId == 'jxwdwfawen') {
            dicTypeId = 943390;//取党委通知的模板
        }
        SysUtils.requestByJson("/wfDocType/queryByDicTypeId/" + dicTypeId, {}, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                if (resultInfo.beanList != null && resultInfo.beanList.length === 1) {
                    $scope.task.theCommonFormInfo.wfDocTypeId = resultInfo.beanList[0].id;
                } else if (resultInfo.beanList != null && resultInfo.beanList.length > 1) {
                    $scope.task.theCommonFormInfo.wfDocTypeId = null;
                }

            })
        })

        // console.log("选择后的==" + $scope.task.theCommonFormInfo.wfDocTypeId);
    }

    $scope.enterKeyup = function (e) {
        var keycode = window.event ? e.keyCode : e.which;
        if (keycode == 13 && $scope.docSearchKey.length > 0) {
            $scope.activeDicModal.dicTypeList.forEach(function (value, index, array) {
                if (value.name.indexOf($scope.docSearchKey) >= 0) {
                    array[index].showAble = true;
                    array[index].checked = false;
                } else {
                    array[index].checked = false;
                    array[index].showAble = false;
                }
            });
        } else {
            return;
        }
    };

    $scope.deleteOption = function (o) {
        SysUtils.swalConfirmNotClose("提示", "确定要删除本条意见吗", "info", function (isConfirm) {
            if (isConfirm) {
                swal.close();
                accUrl = ENV.localapi + "/wfOpinion/delete/" + o.id;
                dataFactory.getlist(accUrl, 'POST', {'Content-type': 'application/json'}, {}).then(
                    function (resultInfo) {
                        SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                            $scope.fc.initTask();
                            $scope.initActiveOption("normal", false);
                            $scope.CUserOptionList.remove(o);
                            $scope.$applyAsync();
                        })
                    },
                    function (d) {
                        console.log(JSON.stringify(d));
                    }
                );
            } else {
                swal.close();
            }
        });
    };

    $scope.detaiTable = '';
    $scope.initDetaiTable = function () {
        var str = $scope.task.theCommonFormInfo.formDetailType;
        /*if(str=="npcHandling"){
        str = "dpComposedDeal";
    }*/
        $scope.detaiTable = ('form' + str[0].toUpperCase() + str.substring(1, str.length));
    }


    $scope.queryDetaiTable = function () {
        return $scope.detaiTable;
    }
    $scope.allselectTJ = function () {
        $scope.selectedOp.recomSelectedUsers.forEach(function (v) {
            $scope.moveUserToSelectedAssignee(v);
        })
    }

    $scope.fc.initModealDialogs = function () {
        $('.modal').on('hidden.bs.modal', function () {
            $(this).removeData("bs.modal");
            if (SysUtils.notEmpty($scope.CUserOptionList, [])) {
                $scope.CUserOptionList.forEach(function (value, index, array) {
                    array[index].disDel = false;
                });
            }
        });
        $('.modal').on('show.bs.modal', function () {
            $(this).draggable({
                handle: ".modal-header,.yjcl_cont_tit",   // 只能点击头部拖动
            });
            var $modal_head = $(this).find('.modal-header');
            if (!SysUtils.notEmpty($modal_head, [])) {
                $modal_head = $(this).find('.yjcl_cont_tit');
            }
            $modal_head.css('cursor', 'move');

            $(this).css("overflow", "hidden"); // 防止出现滚动条，出现的话，你会把滚动条一起拖着走的
            $(this).css("top", "0px");
            $(this).css("left", "0px");
        });

    }

    $scope.bindDicType = function () {
        //console.log($scope.task.theCommonFormInfo.docPrefix);
        var rstr = "";
        if ($scope.activeDicModal.choseType == 'Exclusive') {
            rstr = $scope.activeDicModal.checked;
            /*长城电子发/规范 公告文中前缀会改变 特殊需求*/
            /*if ('docType' == $scope.activeDicModal.dbColumn) {
                $scope.task.theCommonFormInfo[$scope.queryDetaiTable()][$scope.activeDicModal.dbColumn] = rstr;
                $scope.fc.updateDocPrefix();
            }*/
        } else {
            var arr = [];
            $scope.activeDicModal.dicTypeList.forEach(function (value) {
                if (value.checked) {
                    arr = arr.concat(value.name);
                }
            });

            /*主抄,送采,来文单位用追加*/
            if ('sendToCc' == $scope.activeDicModal.dbColumn || $scope.activeDicModal.dbColumn == 'sendToMain') {
                if (SysUtils.notEmpty($scope.task.theCommonFormInfo[$scope.queryDetaiTable()][$scope.activeDicModal.dbColumn], [])) {
                    rstr = $scope.task.theCommonFormInfo[$scope.queryDetaiTable()][$scope.activeDicModal.dbColumn] + '，' + arr.join('，');
                } else {
                    rstr = arr.join('，');
                }
            } else if ('incomingDocDepart' == $scope.activeDicModal.dbColumn || 'chenBanDepart' == $scope.activeDicModal.dbColumn) {
                if (SysUtils.notEmpty($scope.task.theCommonFormInfo.belongProInst[$scope.activeDicModal.dbColumn], [])) {
                    rstr = $scope.task.theCommonFormInfo.belongProInst[$scope.activeDicModal.dbColumn] + '，' + arr.join('，');
                } else {
                    rstr = arr.join('，');
                }
            } else {
                rstr = arr.join('，');
            }
        }

        if ('instance' == $scope.activeDicModal.dbobj) {
            $scope.task.theCommonFormInfo.belongProInst[$scope.activeDicModal.dbColumn] = rstr;
        } else if ('common' == $scope.activeDicModal.dbobj) {
            $scope.task.theCommonFormInfo[$scope.activeDicModal.dbColumn] = rstr;
        } else {
            $scope.task.theCommonFormInfo[$scope.queryDetaiTable()][$scope.activeDicModal.dbColumn] = rstr;
        }
        /*长城电子发/规范 公告文中前缀会改变 特殊需求*/
//    if ('docType' == $scope.activeDicModal.dbColumn) {
//      $scope.fc.updateDocPrefix();
//    }

        $scope.$applyAsync();
        $('#dicTypeChoseModal').modal('hide');
        console.log("bindDicType==" + JSON.stringify($scope.dicTypeList));
    };

    $scope.uOpinionCk = function () {
        if ($scope.activeOption.opinion.length > 999) {
            SysUtils.swalConfirmNotClose("提示", "意见内容限制1000字", "info", function (isConfirm) {
                $scope.activeOption.opinion = $scope.activeOption.opinion.substring(0, 999);
                $scope.$applyAsync();
                swal.close();
            });
        }
    };

    $scope.acceptTask = function () {
        //接收操作
        var workflowInfo = {
            id: $scope.taskId,
            operationId: 'Accept',
            assigneeIdList: []
        }
        SysUtils.requestByJson("/rCurrentTaskInfo/changeWorkflow", workflowInfo, function (resultInfo) {
            $scope.fc.initTask();
        });
    };


    $scope.fmtNum = function (bit, taget) {
        var num = parseInt($scope.task.theCommonFormInfo[$scope.queryDetaiTable()][taget]);
        if (isNaN(num)) {
            num = 1;
        }
        var t = (num + '').length,
            s = '';

        /*    for (var i = 0; i < bit - t; i++) {
                s += '0';
            }*/
        if (t > bit) {
            $scope.task.theCommonFormInfo[$scope.queryDetaiTable()][taget] = (s + num).slice(t - bit, t);
        } else {
            $scope.task.theCommonFormInfo[$scope.queryDetaiTable()][taget] = (s + num).slice(0, bit);
        }
        $scope.$applyAsync();
    }

    //查询历史版本记录
    $scope.fc.queryAttach = function (middelAttach) {
        // middelAttach.groupLeaderId = middelAttach.id;
        dataFactory.getlist(ENV.localapi + "/middleAttachment/gethistoricalVersion", 'POST', {'Content-type': "application/json"}, JSON.stringify(middelAttach)).then(
            function (d) {
                $scope.fc.attachList = d.beanList;
                //console.log("==="+JSON.stringify($scope.fc.attachList));
            },
            function (d) {
                console.log(JSON.stringify(d));
            }
        )
    };


    /*表单校验*/
    $scope.initFormCtrlInfo = function () {
        var tempFieldList = [];
        var processVersionId = $scope.task.belongingProInst.processVersionId;
        var nodeId = $scope.task.belongingNodeId;
        $('input[name],textarea[name]').each(function () {
            var ele = $(this);
            var tf = {processVersionId: processVersionId, nodeId: nodeId, fieldName: ele.attr('name')};
            tempFieldList.push(tf);
        })
        SysUtils.requestByJson("/wfFormFieldControl/getFL?processVersionId=" + processVersionId + "&nodeId=" + nodeId, tempFieldList, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                console.log(resultInfo.beanList);
                var fieldCtrlInfoList = resultInfo.beanList;
                fieldCtrlInfoList.forEach(function (field) {
                    var fieldName = field.fieldName;
                    var theinput = $("[name='" + fieldName + "']");
                    if (theinput != null && theinput.length == 1) {
                        if (field.isAbleEdit == 'false') {
                            theinput.attr("readonly", true);
                        }
                        if (field.isRequired == 'true') {
                            theinput.attr('isRequired', 'req');
                        }
                    }
                })
            })
        })
    }

    /*================wps初始化====start===================*/
    var DocFrame, WpsObject;
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


    /*$scope.openWps = function (createType) {
        if (SysUtils.isWindows()) {
            DocFrame = SysUtils.initWindows("wpsContent", "100%", "100%");
            DocFrame.createDocument(createType);
            WpsObject = new Wps(DocFrame);
        } else {
            if(createType=="uot"){
                obj = SysUtils.initLinux("wpsContent", "100%", "100%");
                var Interval_control = setInterval(
                    function () {
                        app = obj.Application;
                        if (app && app.IsLoad()) {
                            clearInterval(Interval_control);
                            app.createDocument("wps");
                            WpsObject = new Wps(app);
                        }
                    }, 500);
            }else{
                obj = WpsObject.initLinuxEt("wpsContent");
            }
        }
    }*/

    $scope.FullScreen = function () {
        SysUtils.FullScreen(WpsObject.DocFrame, app);
    }

    $scope.secretConfirm = {};
    $scope.openSecretForm = function () {
        if (SysUtils.notEmpty($scope.secretConfirm, ['secretLevel'])) {
            if (2 == $scope.dicChoseModals.fwSecurityLevel.dicTypeList.length) {
                $scope.dicChoseModals.fwSecurityLevel.dicTypeList.push({"name": ""});
            }
        } else {
            $scope.secretConfirm.secretLevel = "" + $scope.dicChoseModals.fwSecurityLevel.dicTypeList[0].id;
        }
        $scope.secretConfirm.resonEditAble = false;
        $scope.secretConfirm.supervisorEditAble = false;
        $scope.secretConfirm.authorizorEditAble = false;
        switch ($scope.task.belongingNodeId) {
            case '1': /*定密理由*/
                $scope.secretConfirm.resonEditAble = true;
                break;
            case '2':/*处长意见*/
                if ($scope.currentUser.postChuzhang) {
                    $scope.secretConfirm.supervisorEditAble = true;
                }
                break;
            case '5':/*定密负责人*/
                if ($scope.currentUser.roleDMFZ) {
                    $scope.secretConfirm.authorizorEditAble = true;
                }
                break;
        }

        $('#secretFormModal').modal('show');
    }


    /*保存密级表单*/
    $scope.saveSecretForm = function () {
        if (SysUtils.notEmpty($scope.secretConfirm.authorizor, [])) {
            $scope.task.theCommonFormInfo.belongProInst.setSceretTaskFlag = "1";
        } else {
            $scope.task.theCommonFormInfo.belongProInst.setSceretTaskFlag = "0";
        }

        if (!SysUtils.notEmpty($scope.secretConfirm, ['secretLevel'])) {
            $scope.task.theCommonFormInfo.belongProInst.setSceretTaskFlag = "0";
            $scope.task.theCommonFormInfo.secretFormId = '';
            $scope.task.theCommonFormInfo.wfSecretConfirm = {};
            $scope.secretConfirm = {};
            $scope.dicChoseModals.fwSecurityLevel.dicTypeList.pop($scope.dicChoseModals.fwSecurityLevel[2]);
            $('#secretFormModal').modal('hide');
        }

        SysUtils.requestByJson("/rFormCommon/update", $scope.task.theCommonFormInfo, function (resultInfo) {
            if (!SysUtils.notEmpty($scope.secretConfirm, ['secretLevel'])) {
                return;
            }
            var saveSecretFormUrl = "";
            if (!SysUtils.isEmpty($scope.secretConfirm.secretLevel) && SysUtils.isEmpty($scope.secretConfirm.reson)) {
                swal("提示", "定密依据和理由必须填写", "info");
                return;
            }
            $scope.secretConfirm.processId = $scope.task.belongingProInst.id;
            $scope.secretConfirm.taskInfoId = $scope.task.id;
            $scope.secretConfirm.theCommonFormInfo = {"id": $scope.task.theCommonFormInfo.id};
            if (SysUtils.notEmpty($scope.secretConfirm, ['id'])) {
                saveSecretFormUrl = ENV.localapi + "/wfSecretConfirm/update";
            } else {
                saveSecretFormUrl = ENV.localapi + "/wfSecretConfirm/create";

            }
            $(".flyover").show();
            $.ajax({
                type: "POST",
                url: saveSecretFormUrl,
                beforeSend: function (request) {
                    request.setRequestHeader("Content-type", "application/json");
                    //request.setRequestHeader("Authorization", "Bearer " + $cookies.getObject('user').token);
                },
                dataType: 'json',
                data: JSON.stringify($scope.secretConfirm),
                success: function (resultInfo) {
                    $(".flyover").hide();
                    SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                        //保存密级表单成功后，跟新common表外键id
                        $scope.task.theCommonFormInfo.secretFormId = resultInfo.baeanId;
                        $scope.task.theCommonFormInfo.wfSecretConfirm = resultInfo.bean;
                        $scope.secretConfirm = resultInfo.bean;
                        $scope.$applyAsync();
                        if ($scope.fc.reRunCuAct) {
                            $scope.fc.reRunCuAct = false;
                            /*消费本次标记*/
                            $scope.fc.handleFormAction($scope.fc.cuAct);
                        }
                        /**
                         * 如果有密级则委内公开为否
                         */
                        // if ($scope.publicityLevelDetail.currentLevel.contains('wngk') && !SysUtils.secretLevelIsNull($scope.task.theCommonFormInfo, ['wfSecretConfirm', 'dicTypeRef', 'name'])) {
                        //     $scope.publicityLevelDetail.currentLevel.remove('wngk');
                        //     $scope.task.theCommonFormInfo.publicityLevel = $scope.publicityLevelDetail.currentLevel.join('|');
                        //     $scope.publicityLevelShow();
                        // }
                        $scope.$applyAsync();
                        $('#secretFormModal').modal('hide');
                    })
                },
                error: function (XMLResponse) {
                    $(".flyover").hide();
                    console.log(JSON.stringify(XMLResponse));
                }
            });

        });
    };


    $scope.fc.savePringtNumber = function () {
        $('#printNumber').modal('hide');
        $scope.fc.printMiddattachIds = [];
        $scope.fc.printMiddattachNumber = 1;
        SysUtils.swalOnlyShow("提示", "正在打印，请稍等...", "info");
        var paramList = [];
        angular.forEach($scope.fc.printNumberList, function (d, i, a) {
            paramList = paramList.concat(d);
        });
        //console.log("paramList=="+paramList.length);
        SysUtils.requestByJson("/middleAttachment/batchUpdate", paramList, function (result) {
            $scope.fc.quietPrintFile();
        });
    }

    $scope.fc.quietPrintFile = function () {
        angular.forEach($scope.fc.printNumberList, function (data, index, array) {
            angular.forEach(data, function (d, i, a) {
                if (d.isPrint === 1) {
                    //var url = ENV.localapi+"/attach/downloadWps?id="+d.attachmentid;
                    $scope.fc.printMiddattachIds.push(d.attachmentid);
                }
            });
        });
        if ($scope.fc.printMiddattachIds.length > 0) {
            $scope.fc.openedPrintC();
        } else {
            SysUtils.swalConfirm("提示", "请选择要打印的份号！", "info", function (isConfirm) {
            });
        }
    }


    /*   $scope.fx_printInfo = function (title, color) {
     //$scope.fc.currentSelectMiddattach=null;
     $scope.requsetPrintNumberList();
     ocx.printSetting();
     //console.log($scope.task.belongingProInst.id);
     // ocx.printFile(title,color);
     }*/

    //版本管理下载显示和隐藏
    $scope.fc.isShowDownloud = function (middelAttach) {
        //task.formActionMap[]
        if (middelAttach.creatorName === $scope.currentUser.name && middelAttach.currentNodeId === $scope.task.belongingNodeId) {
            return true;
        } else {
            return false;
        }

    }

    $scope.requsetPrintNumberList = function (status) {
        var param = {
            processInstanceId: $scope.task.belongingProInst.id,
            bizAttachType: 'zhengwen',//正文
            bizFileType: 'zhuanban',//套红
            fileExt: 'ofd'

        };
        SysUtils.requestByJson("/middleAttachment/list", param, function (result) {
            $scope.fc.printNumberList = result.additionalInfo.beanList;
            $scope.$apply();
            $scope.hidenModel();
            $('#printNumber').modal('show');
        });
        /*SysUtils.requestByJson("/wfInstanceNumber/list", param, function (result) {
         $scope.fc.printNumberList = result.beanList;
         $scope.$apply();
         $scope.hidenModel();
         $('#printNumber').modal('show');
         });*/
    }
    var wpsCustom = new WpsExtend();
    $scope.fc.openDocumentText = function (attachMiddle, type) {//打开正文或者附件
        //console.log($scope.fc.currentAttach);

        if (1 == attachMiddle.finalVersion) {
            $scope.task.attIsFinalVersion = true;
        } else {
            $scope.task.attIsFinalVersion = false;
        }

        $scope.$applyAsync();
        $scope.task.currentAttach = attachMiddle;
        $scope.fc.currentAttach = attachMiddle;
        //console.log("----"+$scope.task.currNodeIsShowRevise+"=="+$scope.fc.wpsDetail.middleContentType+"==="+$scope.fc.currentAttach.attachment.id+"=="+$scope.fc.currentAttach.bizFileType);
        WpsObject = wpsCustom.openDocumentText(WpsObject, SysUtils, $scope, attachMiddle, type, ENV, $timeout);
        if (!SysUtils.isWindows()) {
            var url = ENV.localapi + "/attach/downloadWps?id=" + attachMiddle.attachment.id;
            $timeout(function () {
                app = WpsObject.Application;
                if (app && app.IsLoad()) {
                    WpsObject = new Wps(app);
                    app.openDocumentRemote(url, false);
                    if (SysUtils.containExt(SysUtils.judgeSuffix(attachMiddle.attachment.filename), "wps")) {
                        WpsObject.encapsulationRevision($scope.task, $scope.currentUser.name);
                    }
                    wpsCustom.isContentOrAttachWps(WpsObject, SysUtils, $scope, SysUtils.judgeSuffix(attachMiddle.attachment.filename));
                }
            }, 1000);
        }
    }

    $scope.fc.isRevise = function (number) {
        SysUtils.showRevision(WpsObject.DocFrame, app, number);
        $scope.task.currNodeIsShowRevise = !$scope.task.currNodeIsShowRevise;
    }

    /**
     * 保存和接收修订
     */
    $scope.fc.saveEnableRevision = function () {
        $scope.fc.revisionAcceptCommand();
        $scope.fc.SendDataToServer();
    }

    $scope.fc.revisionAcceptCommand = function () {
        if (SysUtils.revisionAcceptCommand(WpsObject.DocFrame, app)) {
            swal("接受成功", "", "success");
        } else {
            swal("页面没有需要接受的信息", "", "error");
        }
    }

    $scope.fc.SendDataToServer = function () {
        wpsCustom.SendDataToServer(WpsObject, SysUtils, $scope, ENV);
    }


    $scope.fc.saveInstanceNumber = function () {
        $('#instanceNumber').modal('hide');
        SysUtils.requestByJson("/wfInstanceNumber/batchUpdate", $scope.task.belongingProInst.wfInstanceNumberList, function (result) {
            swal("提示", "保存成功！", "success");
            //$scope.fc.isConvertToOfd();
        });
    }

    $scope.fc.componentsNum = function (wfInstanceNumber) {
        wfInstanceNumber.total = wfInstanceNumber.endNumber - (wfInstanceNumber.startNumber - 1);
    }

    $scope.fc.openInstanceNumber = function () {
        //if (SysUtils.notEmpty($scope.task.theCommonFormInfo.wfSecretConfirm.dicTypeRef) && SysUtils.notEmpty($scope.task.theCommonFormInfo.wfSecretConfirm.dicTypeRef.name)) {
        $scope.hidenModel();
        $('#instanceNumber').modal('show');
        /*} else {
         $scope.fc.isConvertToOfd();
         }*/
    }

    $scope.fc.convertToOfd = function () {
        $scope.hidenModel();
        $(".flyover").show();
        $timeout(function () {
            wpsCustom.convertToOfd(WpsObject, SysUtils, $scope, ENV);
        }, 500);
    }

    $scope.attUploadInfo = null;

    //添加正文
    $scope.addAttachment = function (type) {
        wpsCustom.addAttachment(WpsObject, SysUtils, $scope, ENV, type);
    }

    //返回表单
    $scope.fc.returnForm = function () {
        // $scope.ocx.closeFile();
        $scope.fc.wpsDetail.middleContentType = 'form';
        $scope.$applyAsync();
    }

    $scope.fc.fileUpload = function () {
        wpsCustom.fileUpload(WpsObject, SysUtils, $scope, ENV, dataFactory, $state);
    };

    $scope.fc.addWpsContent = function () {
        if (null === $scope.task.currentAttach || undefined === $scope.task.currentAttach) {
            $scope.task.currentAttach = {};
        }
        $('#uploadAttach').modal('hide');
        WpsObject = wpsCustom.greatDocumentText(WpsObject, SysUtils, $scope, ENV, $timeout);
        $scope.task.attIsFinalVersion = true;
        if (!SysUtils.isWindows()) {
            $timeout(function () {
                app = WpsObject.Application;
                app.createDocument("wps");
                if (app && app.IsLoad()) {
                    WpsObject = new Wps(app);
                    //app.openDocumentRemote(url, false);
                    WpsObject.encapsulationRevision($scope.task, $scope.currentUser.name);
                    WpsObject.set_line_spacing();
                    /*$scope.showModel();
                    $(".flyover").hide();*/
                }
            }, 500);
        }
    };

    $scope.fc.downLoadCurrentAtt = function () {
        var elemIF = document.createElement("iframe");
        elemIF.src = ENV.localapi + "/attach/downloadWps?id=" + $scope.task.currentAttach.attachment.id;
        elemIF.style.display = "none";
        document.body.appendChild(elemIF);
        // window.open(ENV.localapi + "/attach/downloadWps?id=" + $scope.task.currentAttach.attachment.id);
    }

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
                        $scope.fc.queryAttach($scope.fc.currentGroupOwnerAttach);
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
            /*var aa = DocFrame.openDocumentRemote(ENV.localapi+attach.url,false);*/
            var aa = SysUtils.openDocumentRemote(DocFrame, app, ENV.localapi + attach.url, false);

        }
    }

    $scope.fc.saveDoc = function () {
        $scope.fc.currentGroupOwnerAttach.attachment.filename = $scope.fc.beforeExt + $scope.fc.behindExt;
        var url = ENV.localapi + "/attachment/update";
        SysUtils.httpFactory(url, JSON.stringify($scope.fc.currentGroupOwnerAttach.attachment), function (d) {
            swal("提示", d.message, "success");
            $('#saveDocDialog').modal('hide');
            $scope.fc.initTask();
        });
    }

    $scope.fc.addOrDeleteSelectRed = function (id, deleteRed, addRed) {
        $scope.fc.selectRedAttachList[deleteRed].forEach(function (value, index, array) {
            if (value.id === id) {

                var deleteObj = $scope.fc.selectRedAttachList[deleteRed].splice(index, 1);
//        console.log(JSON.stringify(deleteObj) + "=" + addRed);
                $scope.fc.selectRedAttachList[addRed].push(deleteObj[0]);
                $scope.$applyAsync();
                return;
            }
        });
    }

    $scope.fc.openWithTemplate = function () {
        //查询当前实例绑定的套红模板
        // console.log("查询当前实例绑定的套红模板" + JSON.stringify($scope.task.theCommonFormInfo));//.wfDocTypeId
        if ($scope.task.theCommonFormInfo.wfDocTypeId === null) {
            //swal("提示","请先绑定套红模板！","info");
            //alert("请先绑定套红模板！");
            swal({
                title: "提示",
                text: "请先选择文种！",
                type: "warning"
            })
            return;
        }
        $scope.task.belongingProInst.fujianMidAttList = [];
        $scope.task.belongingProInst.zhengwenMidAttList.forEach(function (v, i, a) {
            if (("fujian" == v.bizAttachType) && ($scope.task.currentAttach.id != v.id)) {
                $scope.task.belongingProInst.fujianMidAttList.push(v);
            }
        });

        //拿到模板所有内容
        var tmp = {
            title: [],//标题
            attachment: [],//附件
            //contents:[],//附件正文
            content: '',//正文
            conTitle: '',//正文标题
            mainSend: '',//主送
            contact: '',//联系人
            hengOrShu: '',//横向或者纵向（true 横向）
            allContent: ''//附件所有内容
        };
        //获取原文所有内容
        $scope.fc.getAllContent(tmp);
        /*    var t = [];
    for(var i=0;i<tmp.title.length;i++){
    	var attach = {'title':tmp.title[i],'content':tmp.contents[i]}
    	t.push(attach);
    }
    //封装附件list
    $scope.fc.selectRedAttachList = t;*/
        //正文标题
        $scope.task.belongingProInst.title = tmp.conTitle;
        //正文
        $scope.fc.currentGroupOwnerAttach.attachmentid = tmp.content;
        //主送
        $scope.task.theCommonFormInfo[$scope.detaiTable].sendToMain = tmp.mainSend;
        //联系人
        $scope.contactPerson = tmp.contact;
        //附件所有内容
        $scope.allContent = tmp.allContent;
        //横向还是纵向
        $scope.hengOrShu = tmp.hengOrShu;
        //查询是否有附件，如果有附件请选择
        if ($scope.task.belongingProInst.fujianMidAttList !== null && $scope.task.belongingProInst.fujianMidAttList.length > 0) {
            $scope.hidenModel();
            $scope.fc.selectRedAttachList = {
                "unselected": angular.copy($scope.task.belongingProInst.fujianMidAttList),
                "selected": []
            };
            $('#selectRedAttachment').modal('show');
        } else {
            $scope.fc.openWithRedTemplate();
        }
    }

    $scope.fc.openWithRedTemplate = function () {
        $('#selectRedAttachment').modal('hide');
        //查询当前实例绑定的套红模板
        var param = {
            processInstanceId: $scope.task.theCommonFormInfo.wfDocTypeId,
            bizAttachType: "taohongmoban",
            bizFileType: "content"
        }
        dataFactory.getlist(ENV.localapi + "/middleAttachment/gethistoricalVersion", 'POST', {'Content-type': "application/json"}, JSON.stringify(param)).then(
            function (d) {
                //console.log(JSON.stringify(d.beanList));
                if (d.beanList !== null && d.beanList.length === 1) {//点击管理模板如果有模板
                    var downUrl = ENV.localapi + "/attach/downloadWps?bizAttachType=taohongmoban&id=" + d.beanList[0].attachment.id;
                    $scope.fc.openWithTemplateRed(downUrl);
                } else {
                    swal({
                        title: "提示",
                        text: "系统未找到当前文种对应的模板",
                        type: "warning"
                    })
                }
            },
            function (d) {
                console.log(JSON.stringify(d));
            }
        )

    }

    $scope.fc.openWithTemplateRed = function (url) {
        var param = {processId: $scope.task.belongingProInst.id, dicTypeId: $scope.task.theCommonFormInfo.wfDocTypeId};
        SysUtils.requestByJson("/wfOtherDomain/listToMap", param, function (r) {
            $scope.fc.wfOtherDomainMap = r.additionalInfo;
            // $scope.hidenModel();
            // $(".flyover").show();
            $timeout(function () {
                wpsCustom.openWithTemplateRed(
                    WpsObject,
                    SysUtils, $scope, url, ENV);
            }, 500);
        });
    }

    $scope.showActionatach = function () {
        $(".ej_menu").css("display", "block");
    }
    //console.log(SysUtils.getBw().isChrome + "==" + SysUtils.getBw().isFirefox);

    /*if (SysUtils.isWindows()) {
        if (SysUtils.getBw().isChrome || SysUtils.getBw().isFirefox) {

        } else
            $scope.openWps("uot");
    } else {
        $scope.openWps("uot");
    }*/
    //console.log("===="+SysUtils.getBw());


    $scope.fc.fieldCtrlInfoList = [];
    $scope.fc.formFieldControlMap = {};
    /*加载任务后*/
    $scope.fc.afterTaskReNew = function () {
        if (!SysUtils.notEmpty($scope.task.theCommonFormInfo, ['belongProInst', 'relatedReceiveDocId'])) {
            $scope.task.theCommonFormInfo.belongProInst.relatedReceiveDocId = "";
        }

        if (!SysUtils.notEmpty($scope.fc.currentTask.relatedShouwenIdBack, [])) {
            $scope.fc.currentTask.relatedShouwenIdBack = $scope.task.theCommonFormInfo.belongProInst.relatedReceiveDocId;
        }
        if (!SysUtils.notEmpty($scope.fc.currentTask.incomingDocNumIdBack, [])) {
            $scope.fc.currentTask.incomingDocNumIdBack = $scope.task.theCommonFormInfo.belongProInst.incomingDocNum;
        }
        if (!SysUtils.notEmpty($scope.fc.checkDocNum_bacYear, [])) {
            $scope.fc.checkDocNum_bacYear = $scope.task.theCommonFormInfo.docYear;
            $scope.fc.checkDocNum_bacId = $scope.task.theCommonFormInfo.docNumber;
            $scope.fc.checkDocNum_docPrefixBac = $scope.task.theCommonFormInfo.docPrefix;
        }

        $scope.initDetaiTable();
        // $scope.fc.initRigthMenu();

        /*表单控制*/
        $scope.fc.fieldCtrlInfoList = $scope.task.formFieldControls;
        $scope.fc.formFieldControlMap = $scope.task.formFieldControlMap;
        $scope.fc.initCurrTask();

        $scope.checkRelatedDocV = new saveFormValid($scope.checkRelatedDoc);
        $scope.checkIncomingDocNumV = new saveFormValid($scope.checkIncomingDocNum);
        $scope.preSaveFormV = new saveFormValid($scope.fc.preSaveForm);
        $scope.checkRequiredV = new saveFormValid($scope.checkRequired);
        $scope.saveFormBzV = new saveFormValid($scope.saveFormByValid);

        $scope.checkDocNumV/*文号修改校验*/
            .chainJection($scope.checkRelatedDocV) /*关联收文校验 暂时去掉*/
            .chainJection($scope.checkIncomingDocNumV) /*来文文号重复校验*/
            .chainJection($scope.preSaveFormV) /*个性表单校验*/
            .chainJection($scope.checkRequiredV) /*必填校验*/
            .chainJection($scope.saveFormBzV);/*执行保存*/

        /*
                if (!SysUtils.notEmpty($scope.fc.fieldCtrlInfoList, [])) {
                    /!*表单控制 从页面获取*!/
                    var tempFieldList = [];
                    $('input[name],textarea[name]').each(function () {
                        var ele = $(this);
                        var tf = {fieldName: ele.attr('name')};
                        if ("密级" == tf.fieldName) {
                            if (!SysUtils.notEmpty($scope.task.theCommonFormInfo, ['wfSecretConfirm', 'dicTypeRef', 'name'])) {
                                tf.isAbleEdit = 'false';
                            }
                        } else {
                            tf.isAbleEdit = 'false';
                        }
                        tempFieldList.push(tf);
                    })
                    $scope.fc.fieldCtrlInfoList = tempFieldList;
                }
        */


        $scope.fc.fieldCtrlInfoList.forEach(function (field) {
            var fieldName = field.fieldName;
            var theinput = $("[name='" + fieldName + "']");
            if (theinput != null && theinput.length == 1) {
                if ($scope.task.status == 'NotAccepted' || field.isAbleEdit == 'false') {
                    theinput.attr("readonly", true);
                    if (theinput.attr("data-link-format")) {
                        theinput.attr("disabled", true);
                    }
                } else {
                    theinput.removeAttr("readonly");
                }

                if (field.isRequired == 'true') {
                    theinput.attr('isRequired', 'req');
                } else {
                    theinput.removeAttr("isRequired");
                }
            }
        })

        /*左边流程树*/
        //<editor-fold desc="zTree">
        var setting = {
            data: {
                key: {
                    title: "title"
                },
                simpleData: {
                    enable: true
                }
            }
        };
        var zNodes = [];
        var zt_root = {
            open: true,
            click: false,
            // icon: "css/ztree/img/diy/doc.svg",
        }
        // <ul id="treeDemo_7_ul" class="level1 line" style="display: block;height: 20px;"></ul>
        var zt_root_name = $scope.task.theCommonFormInfo.belongProInst.docFullName;
        /* if ($scope.task.theCommonFormInfo.docPrefix == null) {
             zt_root_name = "合同报批";
         }*/
        /*
        var zt_root_name = $scope.task.theCommonFormInfo.docPrefix == null?"合同报批":$scope.task.theCommonFormInfo.docPrefix + " ";
        if ("fawen" == $scope.task.belongingProInst.proDefGroupId) {
          zt_root_name += $scope.task.theCommonFormInfo.departName;
        }
        zt_root_name += "(" + $scope.task.theCommonFormInfo.docYear + ")";
        if (SysUtils.notEmpty($scope.task.theCommonFormInfo.docNumber, [])) {
          zt_root_name += $scope.task.theCommonFormInfo.docNumber;
        }
        zt_root_name += "号";*/
        zt_root.title = zt_root_name;
        zt_root.name = zt_root_name;
        zNodes.push(zt_root);

        var zt_root_sonNodes = [];
        $scope.task.historyList.forEach(function (defNode) {
            var sonNode = {};
            sonNode.name = defNode.name;
            sonNode.chkDisabled = true;
            sonNode.click = false
            sonNode.title = "";
            // sonNode.icon = "css/ztree/img/diy/node.svg";
            if (SysUtils.notEmpty(defNode, ['usersInTheNode'])) {
                sonNode.open = true;
                sonNode.isParent = true;
                sonNode.children = [];
                defNode.usersInTheNode.forEach(function (user) {
                    var selfSonNode = {};
                    selfSonNode.name = user.name;
                    selfSonNode.title = "";
                    if (SysUtils.notEmpty(user, ["workflowParamMap", "opinion"])) {
                        selfSonNode.title += user.name + "：\n";
                        user.workflowParamMap.opinion.forEach(function (option) {
                            selfSonNode.title += option.approveTime.substr(5, 5) + "：";
                            selfSonNode.title += option.opinion + "\n";
                        })
                    }
                    selfSonNode.icon = "css/ztree/img/diy/task_" + user.taskStatus + ".svg";
                    sonNode.children.push(selfSonNode);
                })
            }
            zt_root_sonNodes.push(sonNode)
        });
        zt_root.children = zt_root_sonNodes;
        $.fn.zTree.init($("#treeDemo"), setting, zNodes);
        //</editor-fold>

        $scope.$apply();
        try {
            dwr.util.setAction("http://31.5.48.107:8080/cmsbackend/dwr");
        } catch (err) {
            if ("dwr is not defined" == err.message) {
                console.log("个人签章插件未启动 ");
            } else {
                console.log("个人签章插件异常");
            }
        }
    };

    $scope.fc.checkSecretForm = function (successFunc) {
        /*    var belongingNodeId = $scope.task.belongingNodeId;
            if ("1" == belongingNodeId &&  $scope.secretConfirm.secretLevel.length>=0 && $scope.secretConfirm.reson.length>=0) {
                return false;
            }*/

        return false;
    };

    $scope.fc.initTaskFinish = undefined;
    $scope.fc.initTask = function (successFunc) {
        SysUtils.requestByJson("/rCurrentTaskInfo/" + $scope.taskId, {}, function (resultInfo) {
            $scope.task = resultInfo.additionalInfo.task;
            // $scope.fc.nextTusk = resultInfo.additionalInfo.nextTusk;
            // $scope.fc.remainTusksNum = resultInfo.additionalInfo.remainTusksNum;
            $scope.fc.afterTaskReNew();

            if (!SysUtils.isEmpty(successFunc)) {
                successFunc();//回调函数
            } else if (!$scope.saveFormByValidState) {
                $scope.fc.initTaskFinish = undefined;
            } else if ($scope.saveFormByValidState) {
                $scope.saveFormByValidState = false;
                if (!SysUtils.isEmpty($scope.fc.initTaskFinish)) {
                    eval($scope.fc.initTaskFinish);
                    $scope.fc.initTaskFinish = undefined;
                }
            }
        })
    }

    $scope.fc.beforeExtCheck = function () {
        return !SysUtils.notEmpty($scope.fc.beforeExt, []);
    }
    $scope.fc.headPortraitCheck = function () {
        if ("banci" == $scope.fujianBtn) {
            return ((!SysUtils.notEmpty($scope.fc.headPortrait, [])) || (!SysUtils.notEmpty($scope.attUploadInfo, ['annexDescription'])));
        } else {
            return !SysUtils.notEmpty($scope.fc.headPortrait, []);
        }
    }
    $scope.fc.initRigthMenu = function () {

        var TopListOfBelNode = $scope.task.selFormActIdListOfBelNode.filter(function (v) {
            var notShow = ["isShowRevise", "isHideRevise", "revisionAcceptCommand"];
            for (var i = 0; i < notShow.length; i++) {
                if (notShow[i] === v) {
                    return false;
                }
            }
            return true;
        });

        var ButtonListOfBelNode = $scope.task.selFormActIdListOfBelNode.filter(function (v) {
            var notShow = ["isShowRevise", "isHideRevise", "revisionAcceptCommand"];
            for (var i = 0; i < notShow.length; i++) {
                if (notShow[i] === v) {
                    return true;
                }
            }
            return false;
        });
        $scope.task.selFormActIdListOfBelNode = TopListOfBelNode;
        $scope.fc.rightFormActIdListOfBelNode = ButtonListOfBelNode;
    }

    /*$scope.fc.initTask = function () {
     SysUtils.requestByJson("/rCurrentTaskInfo/read/withHistory/" + $scope.taskId, {}, function (resultInfo) {
     $scope.task = resultInfo.bean;
     $scope.fc.queryAttach();
     $scope.initCurrTask();
     $scope.fc.queryNextTusk();
     $scope.initCurrentUser();
     $scope.initFormCtrlInfo();
     })
     }*/


    /*************************四、js****************************/

    /**
     * 初始化关联收文号前缀
     * @returns {string}
     */
    $scope.initRelatedReceiveDocIdPrefix = function (relatedReceiveDocIdPrefix) {
        var date = new Date(SysUtils.sysDate());
        return relatedReceiveDocIdPrefix + "（" + date.getFullYear() + "）";
        // return relatedReceiveDocIdPrefix + "〔" + date.getFullYear() + "〕";
    };


    /**
     * 收文校验收文文号
     */
    docFullNameChange = function () {
        var fullName = $scope.task.theCommonFormInfo.belongProInst.docFullName;
        console.log("docFullNameChange: " + fullName);
        $scope.task.theCommonFormInfo.docNumber = parseInt(fullName.substring(fullName.length - 4));
        accUrl = ENV.localapi + "/rFormCommon/checkDocNum";
        dataFactory.getlist(accUrl, 'POST', {'Content-type': 'application/json'}, $scope.task.theCommonFormInfo).then(
            function (resultInfo) {
                if (resultInfo.resultType == 'fail') {
                    SysUtils.swalConfirm("提示", resultInfo.message + "，是否继续采用？", "info", function (isConfirm) {
                        if (isConfirm) {
                        } else {
                            $scope.task.theCommonFormInfo.docNumber = resultInfo.bean.docNumber;
                        }
                        $scope.task.theCommonFormInfo.belongProInst.docFullName = $scope.task.theCommonFormInfo.docPrefix + "（" + $scope.task.theCommonFormInfo.docYear + "）" + SysUtils.PrefixInteger($scope.task.theCommonFormInfo.docNumber, 4);
                        $scope.$applyAsync();
                    });
                } else {
                    SysUtils.handleResult(resultInfo, {'state': $state}, function () {

                    })
                }
            },
            function (d) {
                console.log(JSON.stringify(d));
            }
        );
    };

    /**
     * 关联收文号单击弹出模态框
     * @param modal
     */
    $scope.relateReceiveDocId = function () {
        var map = {
            "fawen": "长城电子收",
            "jxwduwen": "长城电子收",
            "wuguanju": "长城电子收",
            "gfkgbfawen": "长城电子收",
            "jxwdwfawen": "长城电子工委收",
            "otherapproved": "长城电子政审",
            "ygcgzsbaopi": "沪长城电子组",
            "hjxgffawen": null,
            "jxwshouwen": "长城电子"
        };
        //console.log(map[$scope.task.theCommonFormInfo.belongProInst.formDefId]);
        if (map[$scope.task.theCommonFormInfo.belongProInst.formDefId] !== null) {
            if (SysUtils.isEmpty($scope.task.theCommonFormInfo.belongProInst.relatedReceiveDocId) || $scope.task.theCommonFormInfo.belongProInst.relatedReceiveDocId === "") {
                $scope.task.theCommonFormInfo.belongProInst.relatedReceiveDocId = $scope.initRelatedReceiveDocIdPrefix(map[$scope.task.theCommonFormInfo.belongProInst.formDefId]);
            } else {
                $scope.task.theCommonFormInfo.belongProInst.relatedReceiveDocId += "  " + $scope.initRelatedReceiveDocIdPrefix(map[$scope.task.theCommonFormInfo.belongProInst.formDefId]);
            }
        } else {
            return;
        }
    };
    /**
     * 关联收文号单击弹出模态框
     * @param modal
     */
    $scope.relateDuWenDocId = function () {
        var map = {
            "jxwshouwen": "长城电子督",
        };
        //console.log(map[$scope.task.theCommonFormInfo.belongProInst.formDefId]);
        if (map[$scope.task.theCommonFormInfo.belongProInst.formDefId] !== null) {
            if (SysUtils.isEmpty($scope.task.theCommonFormInfo.belongProInst.relateDuWenDocId) || $scope.task.theCommonFormInfo.belongProInst.relateDuWenDocId === "") {
                $scope.task.theCommonFormInfo.belongProInst.relateDuWenDocId = $scope.initRelatedReceiveDocIdPrefix(map[$scope.task.theCommonFormInfo.belongProInst.formDefId]);
            } else {
                $scope.task.theCommonFormInfo.belongProInst.relateDuWenDocId += "  " + $scope.initRelatedReceiveDocIdPrefix(map[$scope.task.theCommonFormInfo.belongProInst.formDefId]);
            }
        } else {
            return;
        }
    };


    /**
     * 关联收文号模态框新增操作
     * @param modal 关联收文弹出模态框
     */
    $scope.fc.currentTask.relateShouWenExits = [];
    $scope.fc.currentTask.relateShouWenNotExits = [];
    $scope.fc.relationReciveDoc = function (modal, docFiled) {
        if (!SysUtils.notEmpty($scope.task.theCommonFormInfo.belongProInst, ['' + docFiled])) {
            SysUtils.swalForTips("提示", "本公文未关联其他公文", "info", function (isConfirm) {
            });
            return;
        }

        var nowArr = $scope.task.theCommonFormInfo.belongProInst[docFiled].split(/\s+/);
        SysUtils.requestByJsonSync('/rProcessInstance/listDocByDocFullName', nowArr, function (resultInfo) {
            $scope.fc.currentTask.relateShouWenExits = resultInfo.additionalInfo.existDocs;
            $scope.fc.currentTask.relateShouWenNotExits = resultInfo.additionalInfo.notExistDocs;

            if (($scope.fc.currentTask.relateShouWenNotExits.length == 0) && ($scope.fc.currentTask.relateShouWenExits.length == 1)) {
                $scope.fc.docHisview($scope.fc.currentTask.relateShouWenExits[0]);
            } else {
                $('#' + modal).modal('show');
            }
        });
    };

    $scope.fc.docHisview = function (doc) {
        window.open(ENV.localapi + "/index.html#!/officialDocuments/" + doc.formDefId + "/-" + doc.id)
    };


    /**
     * 关联文件，如果该文被被其他文关联，则自动填写关联文号
     *
     */
    $scope.fc.queryReciveDoc = function (mode) {
        $scope.docIds = [];
        var ids = $scope.task.theCommonFormInfo.belongProInst.relatedReceiveDocId;
        //首先查询该文是否被关联，如果被关联则自动获取关联文号。
        if (!SysUtils.isEmpty($scope.task.theCommonFormInfo.docNumber) && $scope.task.theCommonFormInfo.belongProInst.docFullName !== null && $scope.task.theCommonFormInfo.belongProInst.docFullName !== "") {
            var proInst = {};
            proInst.docFullName = $scope.task.theCommonFormInfo.belongProInst.docFullName;
            SysUtils.requestByJson('/rProcessInstance/queryRelatedDoc', proInst, function (resultInfo) {
                SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                    angular.forEach(resultInfo.beanList, function (data) {
                        if ($scope.task.theCommonFormInfo.belongProInst.relatedReceiveDocId === null || $scope.task.theCommonFormInfo.belongProInst.relatedReceiveDocId === "") {
                            $scope.task.theCommonFormInfo.belongProInst.relatedReceiveDocId = data.docFullName;
                        } else if ($scope.task.theCommonFormInfo.belongProInst.relatedReceiveDocId.indexOf(data.docFullName) < 0) {
                            /*console.log($scope.task.theCommonFormInfo.belongProInst.relatedReceiveDocId.indexOf(data.docFullName)<0);
                              console.log($scope.task.theCommonFormInfo.belongProInst.relatedReceiveDocId);
                              console.log(data.docFullName);*/
                            $scope.task.theCommonFormInfo.belongProInst.relatedReceiveDocId += "  " + data.docFullName;
                        }
                    });
                    $scope.fc.relationReciveDoc(mode);
                    $scope.$applyAsync();
                })
            })
        } else {
            swal("该文文号不存在，请先生成文号！", "", "info");
        }
        /*if (null != ids && '' != ids) {
            $scope.docIds=ids.split('  ');
            if($scope.docIds.length===1){
                $scope.queryDetail($scope.docIds[0]);
            }else{
                $('#' + modal).modal('show');
            }
        } else {
            swal("请输入关联文号","","info");
        }*/
    };

    /**
     * 关联收文号模态框新增操作
     * @param value
     */
    $scope.appendReceiveDocId = function (value) {
        if (typeof value != 'undefined' && '' != value) {
            $scope.docIds.push(value);
        }
        /*else {
             $scope.docIds.push($scope.initRelatedReceiveDocIdPrefix());
           }*/
        /*$scope.receiveDocIds.push('');*/
    };

    /**
     * 关联收文号模态框删除操作
     * @param value
     */
    $scope.removeReceiveDocId = function (idx) {
        $scope.receiveDocIds.splice(idx, 1);
        $scope.docIds.forEach(function (val, index) {
            if (idx == index) {
                $scope.docIds.remove(val);
            }
        })
    };

    /**
     * 关联收文号模态框查看操作
     * @param value
     */
    $scope.queryDetail = function (relatedReceiveDocId) {
        $scope.proInst = {};
        $scope.proInst.docFullName = relatedReceiveDocId;
        if (typeof relatedReceiveDocId == 'undefined' || relatedReceiveDocId == '') {
            swal('提示', "请填写收文号!", "info");
            return;
        }
        SysUtils.requestByJson('/rProcessInstance/relatedReceiveDocId', $scope.proInst, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                window.open(ENV.localapi + "/index.html#!/officialDocuments/" + resultInfo.bean.formDefId + "/-" + resultInfo.bean.id)
            })
        })
    };


    /**
     * 关联收文号模态框确定操作
     * @param value
     */
    $scope.saveReceiveDocIds = function (modal) {
        console.log($scope.docIds);
        $scope.proInst = $scope.task.theCommonFormInfo.belongProInst;
        var id = '';
        $scope.docIds.forEach(function (value) {
            id += value + ' ';
        });
        $scope.task.theCommonFormInfo.belongProInst.relatedReceiveDocId = id.trim();
        $scope.proInst.relatedReceiveDocId = $scope.task.theCommonFormInfo.belongProInst.relatedReceiveDocId;
        /*if ($scope.task.theCommonFormInfo.belongProInst.relatedReceiveDocId == ''){
            swal('提示', "请填写收文号!", "info");
            return;
        }*/
        SysUtils.requestByJson('/rProcessInstance/update', $scope.proInst, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                $("#" + modal).modal('hide');
            });
        });

    };

    /**
     * 套红操作填写公文域模态框关闭操作
     * @param modal
     */
    $scope.closeDomainDialog = function (modal) {
        $('#' + modal).modal('hide');
        $scope.showModel();
        $scope.fc.notDomain = {}; //初始化未选的公文域;
        /**
         * 打开第一个正文
         */
        $scope.fc.openDocumentText($scope.task.belongingProInst.zhengwenMidAttList[$scope.task.belongingProInst.zhengwenMidAttList.length - 1], "groupOwner");
    };

    /**
     * 套红保存填写的公文域
     */
    $scope.saveDomain = function () {
        $('#domainDialog').modal('hide');
        $scope.showModel();
        var param = {
            processId: $scope.task.belongingProInst.id, dicTypeId: $scope.task.theCommonFormInfo.wfDocTypeId,
            workflowParamMap: $scope.fc.notDomain
        };
        SysUtils.requestByJson('/wfOtherDomain/insertByMap', param, function (resultInfo) {
            //成功后自动进行套红操作
            $scope.fc.notDomain = {};
            $scope.fc.openWithRedTemplate();
        });
    }

    /**
     * 份号登记删除事件
     */
    $scope.deleteCurrentRow = function (index) {
        $scope.task.belongingProInst.wfInstanceNumberList.splice(index, 1);
    }

    /**
     * 份号登记添加
     */
    $scope.addInstanceNumber = function (index) {
        $scope.task.belongingProInst.wfInstanceNumberList.push({processInstanceId: $scope.task.belongingProInst.id});
    }

    /**
     * 附件权限控制
     */
    $scope.fc.attachmentPermissionShow = function () {
        if (!SysUtils.isEmpty($scope.task) && SysUtils.notEmpty($scope.task.belongingProInst, ['dbParams', 'actionDefMap', 'add'])) {
            return true;
        } else {
            return false;
        }
    }

    $scope.fc.convertTypeRelate = {};
    $scope.fc.convertTypeRelate.allShouWenFlow = [];
    $scope.fc.convertTypeRelate.activeType = {};
    $scope.fc.convertTypeRelate.flowCreater = {};
    $scope.fc.convertTypeRelate.newDocFullNameTask = {};
    $scope.fc.convertTypeRelate.newDocFullName = "";
    $scope.fc.convertTypeRelate.newDocFullNameDisEdit = true;
    $scope.fc.convertTypeRelate.inputNewDocFullName = function () {
        if (!SysUtils.notEmpty($scope.fc.convertTypeRelate.activeType, ['id'])) {
            SysUtils.swalConfirm("提示", "请先选择要转换的目标公文类型!", "info", function (isConfirm) {
            });
            return;
        }
        $scope.fc.convertTypeRelate.newDocFullNameDisEdit = false;
        SysUtils.requestByJson('/rFormCommon/sysDocNum', $scope.fc.convertTypeRelate.activeType, function (resultInfo) {
            $scope.fc.convertTypeRelate.newDocFullNameTask = resultInfo.bean;
            $scope.fc.convertTypeRelate.newDocFullName = resultInfo.bean.docPrefix + "（" + resultInfo.bean.docYear + "）" + SysUtils.PrefixInteger(resultInfo.bean.docNumber, 4);
            $scope.$applyAsync();
        });
    };
    $scope.fc.convertTypeRelate.newDocFullNameCheck = function () {
        $scope.fc.convertTypeRelate.newDocFullNameDisEdit = true;
        if (!SysUtils.notEmpty($scope.fc.convertTypeRelate.newDocFullName, [])) {
            return;
        }
        $scope.fc.convertTypeRelate.newDocFullNameTask.docNumber = parseInt($scope.fc.convertTypeRelate.newDocFullName.substring($scope.fc.convertTypeRelate.newDocFullName.length - 4));
        SysUtils.requestByJsonNoResultHandle('/rFormCommon/checkDocNum', $scope.fc.convertTypeRelate.newDocFullNameTask, function (resultInfo) {
            if (resultInfo.resultType == 'fail') {
                SysUtils.swalConfirm("提示", resultInfo.message + "，是否继续采用？", "info", function (isConfirm) {
                    if (isConfirm) {
                    } else {
                        $scope.fc.convertTypeRelate.newDocFullNameTask.docNumber = resultInfo.beanId;
                        $scope.fc.convertTypeRelate.newDocFullName = $scope.fc.convertTypeRelate.newDocFullNameTask.docPrefix + "（" + $scope.fc.convertTypeRelate.newDocFullNameTask.docYear + "）" + SysUtils.PrefixInteger($scope.fc.convertTypeRelate.newDocFullNameTask.docNumber, 4);
                        $scope.$applyAsync();
                    }
                });
            } else {
                SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                })
            }
        });
    };
    $scope.fc.convertType = function () {
        $scope.fc.convertTypeRelate.flowCreater = {
            participantId: $scope.task.assignee,
            participantName: $scope.task.assigneeName,
        };
        $('#convertTypeDialog').modal('show');
        SysUtils.requestByJson('/processDefManage/allShouWenFlow', {}, function (resultInfo) {
            $scope.fc.convertTypeRelate.allShouWenFlow = resultInfo.beanList;
            $scope.$applyAsync();
            console.log($scope.fc.convertTypeRelate.allShouWenFlow);
        });
    };
    $scope.fc.convertTypeFx = function () {
        var workflowInfo = {
            id: $scope.taskId,
            transDocType: "tranInAllShouWen",
            assignee: $scope.fc.convertTypeRelate.flowCreater.participantId,
            titleDocFullName: $scope.fc.convertTypeRelate.newDocFullName,
            processDefManage: $scope.fc.convertTypeRelate.activeType,
        }

        SysUtils.requestByJson('/rCurrentTaskInfo/transDoc', workflowInfo, function (resultInfo) {
            /*本人转换的默认打开*/
            if ($scope.fc.convertTypeRelate.flowCreater.participantId == $scope.currentUser.participantId) {
                $scope.task = resultInfo.bean;
                window.location = ENV.localapi + "/index.html#!/officialDocuments/" + $scope.task.belongingProInst.formDefId + "/-" + $scope.task.belongingProInst.id;
                window.location.reload();
                $scope.$applyAsync();
            } else {
                $scope.fc.closeCurrentForm();
                window.opener.location.reload();
            }
        });
    };

    /*转督文*/
    $scope.fc.transfeGovernor = function () {
        $scope.fc.flowAction = $scope.fc.transfeGovernorTx;
        SysUtils.requestByJson('/rCurrentTaskInfo/transfeGovernor', {}, function (resultInfo) {
            $('#moveWorkflowDialog').modal('show');
            $scope.availableOps = resultInfo.beanList;
            $scope.showOperCandidates($scope.availableOps[0]);
            $scope.$applyAsync();
        });

    };
    /*转报批*/
    $scope.fc.transBlyjbp = function (transDocTypeSrc) {
        var workflowInfo = {
            id: $scope.taskId
        }
        if (SysUtils.notEmpty(transDocTypeSrc, [])) {
            workflowInfo.transDocType = transDocTypeSrc;
        } else {
            workflowInfo.transDocType = "transBlyjbp";
        }
        SysUtils.requestByJson('/rCurrentTaskInfo/transDoc', workflowInfo, function (resultInfo) {
            $scope.task = resultInfo.bean;
            window.location = ENV.localapi + "/index.html#!/officialDocuments/" + $scope.task.belongingProInst.formDefId + "/" + $scope.task.id;
            window.location.reload();
        });
    };

    $scope.fc.transfeGovernorTx = function () {
        var workflowInfo = {
            id: $scope.taskId,
            operationId: $scope.selectedOp.id,
            assigneeList: $scope.selectedCanditList,
            taskCreateMode: $scope.selectedOp.taskCreateMode,
            transDocType: "jxwShouwen2duWen"
        }


        workflowInfo.createTime = $scope.task.theCommonFormInfo.formJxwshouwen.receiveDate + " 00:00:00";
        if (SysUtils.notEmpty($scope.wf.nextTask.userOptin, []) && SysUtils.notEmpty($scope.selectedCanditList, [])) {
            var v = $scope.selectedCanditList[0];

            if (v.participantType == "Person") {
                var options = {};
                var t = new Date(SysUtils.sysDate());
                options.approveTime = t.format("yyyy-MM-dd HH:mm:ss");
                options.dealerId = $scope.currentUser.id;
                options.dealerName = $scope.currentUser.name;
                options.showField = "normal";
                options.approverId = v.participantId;
                options.assigneeName = v.participantName;
                /*页面显示名字*/
                options.approverName = options.assigneeName;
                options.opinion = $scope.wf.nextTask.userOptin;
                options.agentFlag = '1';
                workflowInfo.agentOption = options;
            }
            ;
        }

        SysUtils.requestByJson('/rCurrentTaskInfo/transDoc', workflowInfo, function (resultInfo) {
            $scope.task = resultInfo.bean;
            window.location = ENV.localapi + "/index.html#!/officialDocuments/" + $scope.task.belongingProInst.formDefId + "/-" + $scope.task.belongingProInst.id;
            window.location.reload();
        });
    };

    /**
     * 转重点督办
     */
    $scope.fc.transmitInfo = function () {
        SysUtils.requestByJson('/rCurrentTaskInfo/transmitInfo/' + $scope.task.id, {}, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                $scope.returnTasklist();
            });
        });
    };

    //手动将所有领导重点督办的督文一次性推送到重点督查系统
    $scope.fc.transmitInfoNewManualOnce = function () {
        console.log("transmitInfoNewManualOnce");
        SysUtils.requestByJson('/restful/cors/transmitInfoNew', {}, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                $scope.returnTasklist();
            });
        });
    };

    silenceOpenPerformed = function () {
        $scope.fc.silenceOpenPerformedExt();
    };
    $scope.fc.silenceOpenPerformedExt = function () {
        $scope.ocx.printFileCopies(1);
        $scope.fc.returnForm();
    };
    /*
    * 静默打印表单
    * */
    $scope.fc.silencePrintForm = function () {
//    if (!SysUtils.notEmpty($scope.ocx, ['ocxExists'])) {
//      $scope.fx_init("objectdiv");
        $scope.ocx = suwell.ofdReaderInit("objectdiv", '100%', '100%');
        $scope.ocx.registListener("f_open", "silenceOpenPerformed", true);/*打开文件后执行*/
//    $scope.ocx.ocxExists = 'exists';
        $scope.ocx.setScale(100);
//    }
        var url = "/rCurrentTaskInfo/downloadPdf/" + $stateParams.taskInfoId;
        SysUtils.requestByJsonSync(url, {}, function (resultInfo) {
            $scope.fc.wpsDetail.middleContentType = 'ofd';
            $scope.showModel();
            var url = ENV.localapi + "/attach/downloadWps?downloadType=pfdForm&id=" + resultInfo.bean.url;
            console.log(url);

            var res = $scope.ocx.openFile(url, false);

//      $scope.ocx.setScale(100);
//      $scope.$applyAsync();
        });
    };


    /**
     * 打印表单
     */
    $scope.fc.printForm = function () {
        /*$("#middelForm").print({
            globalStyles:true,//是否包含父文档的样式，默认为true
            mediaPrint:false,//是否包含media='print'的链接标签。会被globalStyles选项覆盖，默认为false
            stylesheet:"http://localhost/css/processForm.css",//外部样式表的URL地址，默认为null
            noPrintSelector:".no-print",//不想打印的元素的jQuery选择器，默认为".no-print"
            iframe:true,//是否使用一个iframe来替代打印表单的弹出窗口，true为在本页面进行打印，false就是说新开一个页面打印，默认为true
            append:null,//将内容添加到打印内容的后面
            prepend:null,//将内容添加到打印内容的前面，可以用来作为要打印内容
            deferred: $.Deferred().done(function () {
                console.log('Printing done', arguments);
            })//回调函数
        });*/
        //var url = "/rCurrentTaskInfo/downloadPdf/"+ $stateParams.taskInfoId;
        //获得窗口的垂直位置
        //var iTop = (window.screen.availHeight - 30 - 900) / 2;
        //获得窗口的水平位置
        //var iLeft = (window.screen.availWidth - 10 - 800) / 2;
        $('body').focus();
        window.open($scope.ENV.localapi + '/apps/workflow/pdfTemplates/pdfContent.html?id=' + $stateParams.taskInfoId, 'newWindow', 'height=800,width=900,top=1000,left=1000,toolbar=no,menubar=no,scrollbars=yes, resizable=no,location=no, status=no');
        $('body').focus();
        /*        SysUtils.requestByJson(url, {}, function (resultInfo) {
                    if(resultInfo.bean.flag){
                        //获得窗口的垂直位置
                        var iTop = (window.screen.availHeight - 30 - 900) / 2;
                        //获得窗口的水平位置
                        var iLeft = (window.screen.availWidth - 10 - 800) / 2;
                        //新窗口打开PDF
                        window.open($scope.ENV.localapi+resultInfo.bean.url,'newWindow','height=900,width=800,top='+iTop+',left='+iLeft+',toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
                        //$('body').append('<iframe src="'+$scope.ENV.localapi+resultInfo.bean.url+'" class="printFrame" frameborder="0" id="printIframe"></iframe>');
                    }

                });*/
        /*        var form = $("<form>");   //定义一个form表单
                form.attr('style', 'display:none');   //在form表单中添加查询参数
                form.attr('target', '');
                form.attr('method', 'post');
                form.attr('action', url);
                $('body').append(form);  //将表单放置在web中
                form.submit();*/
    }

    /**
     * ofd保存签章
     */
    $scope.fc.saveOfdSignature = function () {
        var params = "";
        params += "middattachmentId=" + $scope.fc.currentAttach.id;
        params += "&currentNodeId=" + $scope.task.belongingNodeId;
        params += "&userId=" + $scope.currentUser.id;
        $scope.ocx.saveFile($scope.ENV.localapi + "/attach/updateOfd?" + params);
    }
    $scope.fc.delofdSign = function () {
        SysUtils.requestByJson("/attachment/backRoot", $scope.task.currentAttach, function (resultInfo) {
            $scope.fc.initTask(function () {
                $scope.fc.openDocumentText($scope.task.belongingProInst.zhengwenMidAttList[0], "groupOwner");
            });
        })
    }
    /*************************五、右键菜单****************************/
    $.contextMenu('destroy'); //销毁以前实例
    $scope.mosaicContextMenu = function (datas) { //拼接右键菜单
        //console.log("88"+JSON.stringify(datas.dbParams.rightMenu));
        /*var subItems = {
            "banci": {"name": "版次", "icon": "fa-plus fa-lg","condition":null},
            "editName": {"name": "修改名称", "icon": "fa-edit fa-lg","condition":null},
            "download": {"name": "下载", "icon": "fa-download fa-lg","condition":null}
        };
        if($scope.fc.isShowDownloud(datas)){
            subItems['delete']={name: "删除", icon: "fa-times fa-lg","condition":null};
        }*/
        //return subItems;
        return datas.dbParams.rightMenu;
    }
    $scope.fujianBtn = '';
    $scope.callMune = function (key, datas, actions) {
        $scope.fujianBtn = key;
        if (key === "banci") {
            //$scope.fc.returnForm();
            //储存组主的当前附件
            $scope.fc.currentGroupOwnerAttach = datas;
            $scope.attUploadInfo = {
                id: datas.id,
                processInstanceId: datas.processInstanceId,
                currentNodeId: $scope.task.belongingNodeId,
                bizAttachType: datas.bizAttachType,
                fileExt: datas.fileExt,
                bizFileType: datas.bizFileType
            };
            $scope.$apply();
            $scope.fc.queryAttach(datas);
            //$scope.fc.wpsOfdDetail=false;//隐藏插件
            $scope.hidenModel();
            $('#uploadAttach').modal('show');
        } else if (key === "editName") {
            $scope.fc.returnForm();
            $scope.fc.currentGroupOwnerAttach = datas;
            if (datas.bizAttachType === "zhengwen" && datas.bizFileType !== "content") {
                $scope.fc.beforeExt = $scope.fc.currentGroupOwnerAttach.attachment.filename.substring(0, $scope.fc.currentGroupOwnerAttach.attachment.filename.lastIndexOf("."));
                $scope.fc.behindExt = $scope.fc.currentGroupOwnerAttach.attachment.filename.substring($scope.fc.currentGroupOwnerAttach.attachment.filename.lastIndexOf("."), $scope.fc.currentGroupOwnerAttach.attachment.filename.length);
            } else {
                $scope.fc.beforeExt = $scope.fc.currentGroupOwnerAttach.attachment.filename.substring(0, $scope.fc.currentGroupOwnerAttach.attachment.filename.lastIndexOf("."));
                $scope.fc.behindExt = $scope.fc.currentGroupOwnerAttach.attachment.filename.substring($scope.fc.currentGroupOwnerAttach.attachment.filename.lastIndexOf("."), $scope.fc.currentGroupOwnerAttach.attachment.filename.length);
            }
            //$scope.fc.wpsOfdDetail=false;//隐藏插件
            $scope.hidenModel();
            $('#saveDocDialog').modal('show');
        } else if (key === "download") {
            //alert(0);
            var url = $scope.ENV.localapi + "/attach/downloadWps?id=" + datas.attachment.id;
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

        } else if (key === "delete") {
            var url = "/attachment/delete/" + datas.attachment.id;
            SysUtils.swalConfirmNotClose("提示", "是否删除？", "info", function (isConfirm) {
                if (isConfirm) {
                    swal.close();
                    SysUtils.requestByJson(url, datas, function (r) {
                        $scope.fc.initTask();
                        $scope.fc.wpsDetail.middleContentType = 'form';
                        $scope.$applyAsync();
                        // swal("提示", r.message, "success");
                    });
                } else {
                    swal.close();
                }
            });
            //$scope.enclosureAction('delete',datas);
        } else if (key === "topping") {
            var url = "/middleAttachment/topping";
            SysUtils.requestByJson(url, datas, function (r) {
                $scope.fc.initTask();
                $scope.fc.wpsDetail.middleContentType = 'form';
                $scope.$applyAsync();
                // swal("提示", r.message, "success");
            });

        }
    }

    $scope.onloadcontextMenu = function () {
        $.contextMenu({
            selector: '.demo3TableRow',
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
                //console.log("===" + JSON.stringify(a) + "*********" + JSON.stringify(datas));
                /*if(datas.allowedActionList == null || datas.allowedActionList === undefined || datas.allowedActionList.length === 0) {
                 return false;
                 }*/
                if (SysUtils.isEmpty(a) || JSON.stringify(a) == "{}") {
                    return false;
                }
                //alert(JSON.stringify(a));
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
    };

    /********************************************模态框监听***********************************************/
    $('#uploadAttach').on('hidden.bs.modal', function (e) {
        $scope.fujianBtn = '';
        $scope.showModel();
    });
    $('#uploadAttach').on('show.bs.modal', function (e) {
        $scope.fc.headPortrait = {};
    });

    $('#saveDocDialog').on('hidden.bs.modal', function (e) {
        $scope.showModel();
    });

    $('#instanceNumber').on('hidden.bs.modal', function (e) {
        $scope.showModel();
    });

    $('#printNumber').on('hidden.bs.modal', function (e) {
        $scope.showModel();
    });

    $('#selectRedAttachment').on('hidden.bs.modal', function (e) {
        $scope.showModel();
    });

//对于插件模态框隐藏通用处理
    $scope.wpsDivHiden = function () {
        document.getElementById("wpsContent").style.visibility = "hidden";
        $(".flyover").show();
        $scope.$applyAsync();
    }
    $scope.wpsDivShow = function () {
        $scope.fc.wpsDetail.middleContentType = 'wps';
        document.getElementById("objectdiv").style.visibility = "hidden";
        document.getElementById("wpsContent").style.visibility = "visible";
        $scope.$applyAsync();
    }

    $scope.ofdDivShow = function () {
        $scope.fc.wpsDetail.middleContentType = 'ofd';
        document.getElementById("wpsContent").style.visibility = "hidden";
        document.getElementById("objectdiv").style.visibility = "visible";
        $scope.$applyAsync();
    }

    $scope.hidenModel = function () {
        document.getElementById("wpsContent").style.visibility = "hidden";
        document.getElementById("objectdiv").style.visibility = "hidden";
        $scope.$applyAsync();
    }

    $scope.showModel = function () {
        document.getElementById("wpsContent").style.visibility = "visible";
        document.getElementById("objectdiv").style.visibility = "visible";
    }

    /*************************三、初始化调用****************************/
    $scope.initData = function () {
        dataFactory.getlist(ENV.localapi + "/attachment/init?initType=create", 'POST', {'Content-type': "application/json"}, {}).then(
            function (d) {
                $scope.attachmentBean = d.bean;
            },
            function (d) {
                console.log(JSON.stringify(d));
            }
        )
        $scope.initDicType('emergenceLevel', 'Level'); //紧急程度
        $scope.initDicType('docType', 'DocumentType'); //文种
        $scope.initDicType('sendToMain', 'SendDept'); //主送单位
        $scope.initDicType('sendToCc', 'SendDept'); //抄送单位
        $scope.initDicType('fwSecurityLevel', 'fwSecurityLevel');//发文单密级
        $scope.initDicType('SecurityLevel', 'SecurityLevel');//密级
        $scope.initDicType('SendDept', 'SendDept');//来文单位
        $scope.initDicType('RsvPaperJia', 'RsvPaperJia');//机要文件甲
        $scope.initDicType('RsvPaperYi', 'RsvPaperYi');//机要文件乙
        $scope.initDicType('RsvPaperBing', 'RsvPaperBing');//机要文件丙
        $scope.initDicType('RsvPaperGuo', 'RsvPaperGuo');//机要文件丙
        $scope.initDicType('RsvLetter', 'RsvLetter');//机要文件丙
        $scope.initDicType('ReceiveDept', 'ReceiveDept');//机要文件丙


    }


    $scope.fc.init = function () {

        var connSessionid = SysUtils.getUrlParamByName("sessionid");
        var successFunc = function (resultInfo) {
            $scope.currentUser = resultInfo.additionalInfo.user;
            var dicModes = resultInfo.additionalInfo.dicModes;
            if (SysUtils.notEmpty(dicModes, [])) {
                dicModes.forEach(function (dicMode) {
                    $scope.dicChoseModals[dicMode.dictype].dicTypeList = dicMode.dicTypes;
                });
            }
            $scope.task = resultInfo.additionalInfo.task;
            console.log($scope.task);
            // $scope.fc.nextTusk = resultInfo.additionalInfo.nextTusk;
            // $scope.fc.remainTusksNum = resultInfo.additionalInfo.remainTusksNum;
            $scope.fc.afterTaskReNew();
            //console.log("===="+$scope.task.belongingProInst.dbParams.actionDefMap);
            //储存docfullname
            firstDocFullName = $scope.task.theCommonFormInfo.belongProInst.relatedReceiveDocId;
            basePath = resultInfo.token;
            $scope.$applyAsync();
        };
        if (SysUtils.notEmpty(connSessionid, [])) {

            /*跨域登陆 并获取所有初始数据*/
            var operation = SysUtils.getUrlParamByName("operation");
            var sessionid = SysUtils.getUrlParamByName("sessionid");
            var loginBody = {};
            loginBody.operation = operation;
            loginBody.sessionid = sessionid;

            /*表单控制*/
            /*   var tempFieldList = [];
            $('input[name],textarea[name]').each(function () {
                var ele = $(this);
                var tf = {fieldName: ele.attr('name')};
                tempFieldList.push(tf);
            })
            loginBody.formFields = tempFieldList;*/

            SysUtils.requestByJson("/cors/akGateHost/handleTask/" + $stateParams.taskInfoId, loginBody, function (resultInfo) {
                successFunc(resultInfo);
            });
        } else {
            /*本地已登录 获取所有初始数据*/
            SysUtils.requestByJson("/rCurrentTaskInfo/officialDocuments/" + $stateParams.taskInfoId, {}, function (resultInfo) {
                successFunc(resultInfo);
            });
        }
    };
    $scope.checkSelectedOp = function (selectedOp) {
        if (selectedOp.name == '法规处办理' && selectedOp.id == '5_6') {
            return true;
        } else {
            return false;
        }
    }
    //wps储存类型
    $scope.wpstypeList = ['File', 'text'];
    var basePath;
    /**
     * 获取wps原文所有内容
     */
    $scope.fc.getAllContent = function (tem) {
        //匹配关键字获取匹配元素集合
        //var ret =  WpsObject.findByKeyWord('附件');
        //$scope.fc.forMatRet(ret);//格式化
        //var title = [];//标题集合
        //var contents = [];//正文集合
        var content;//原文正文
        var conTitle = '';//原文标题
        var cn = [];
        var mainSend = '';//主送
        var contact = '';//联系人
        var allContent = '';//附件所有内容
        var hengOrShu = false;//横向和纵向  默认纵向
        /*	  for(var i=0;i<ret.length;i++){
              //匹配附件下一行（标题）规则： 附件下一行至读取为空 判定为标题
              var tit = '';
              var j = 0;
              var c = 1;
              if(ret[i].row==1&&ret[i].column==1){
                  while(true){
                      c++,j++;
                      var te = WpsObject.getContentByConditions(ret[i].page,ret[i].row+j,ret[i].page,(ret[i].row+c),$scope.wpstypeList[1],null);
                      if(te.trim()==''){
                          break;
                      }
                      tit +=  te;
                  }
                  title.push(tit.replace(/[\n\r]/g,''));

                  //匹配附件正文 规则标题下一行至下一个附件前一行
                  var cont;
                  //生成文件路径
                  var path = WpsObject.getBasePath(i);
                  if(i==ret.length-1){
                       //获取最后页码
                      var endPage = WpsObject.getEndPage();
                           //获取最后页码行数
                      var endRow = WpsObject.getEndRow();

                      cont = WpsObject.getContentByConditions(ret[i].page,(ret[i].row+j),endPage,endRow,$scope.wpstypeList[0],path);

                  }else{

                      cont = WpsObject.getContentByConditions(ret[i].page,(ret[i].row+j),ret[i+1].page,ret[i+1].row,$scope.wpstypeList[0],path);

                  }
                  contents.push(cont);
                  cn.push(i);
                  //获取正文
                  if(cn.length==1){
                      var c = 0;
                      var j = 1;
                      while(true){
                          c++,j++;
                          var te = WpsObject.getContentByConditions(1,c,1,j,$scope.wpstypeList[1],null);
                          if(te.trim()==''){
                              break;
                          }
                          conTitle +=  te;
                      }
                      var path = WpsObject.getBasePath("");

                      //匹配关键字获取匹配元素集合（：）
                      var mainSendRet =  WpsObject.findByKey('：');

                      mainSend = WpsObject.getContentByConditions(1,j,mainSendRet[0].page,mainSendRet[0].row+1,$scope.wpstypeList[1],null);

                      //匹配（上海市长城电子）
                      var luokuan =  WpsObject.findByKeyWord('附件：');

                      content = WpsObject.getContentByConditions(1,j+1,luokuan[0].page,luokuan[0].row-1==0?1:luokuan[0].row-1,$scope.wpstypeList[0],path);
                  }
              }

          }*/
        /*if(ret.length==0){//无附件
        var c = 0;
        var j = 1;
        while(true){
            c++,j++;
            var te = WpsObject.getContentByConditions(1,c,1,j,$scope.wpstypeList[1],null);
            if(te.trim()==''){
                break;
            }
            conTitle +=  te;
        }
        var endPage = WpsObject.getEndPage();
         //获取最后页码行数
        var endRow = WpsObject.getEndRow();

        var path = WpsObject.getBasePath("");

        //匹配关键字获取匹配元素集合（：）
        var mainSendRet =  WpsObject.findByKey('：');

        mainSend = WpsObject.getContentByConditions(1,j,mainSendRet[0].page,mainSendRet[0].row+1,$scope.wpstypeList[1],null);

        //匹配（上海市长城电子）
        var luokuan =  WpsObject.findByKeyWord('上海市长城电子');
        //获取正确的那一个
        var l = $scope.fc.getCorrectOne(luokuan);
        content = WpsObject.getContentByConditions(1,j+1,luokuan[l].page,luokuan[l].row-3,$scope.wpstypeList[0],path);

        allContent = '';
    }else{//有附件抓取所有内容

        var c = 0;
        var j = 1;
        while(true){
            c++,j++;
            var te = WpsObject.getContentByConditions(1,c,1,j,$scope.wpstypeList[1],null);
            if(te.trim()==''){
                break;
            }
            conTitle +=  te;
        }
        var path = WpsObject.getBasePath("");

        //匹配关键字获取匹配元素集合（：）
        var mainSendRet =  WpsObject.findByKey('：');

        mainSend = WpsObject.getContentByConditions(1,j,mainSendRet[0].page,mainSendRet[0].row+1,$scope.wpstypeList[1],null);

        //匹配（上海市长城电子）
        var luokuan =  WpsObject.findByKeyWord('附件：');

        content = WpsObject.getContentByConditions(1,j+1,luokuan[0].page,luokuan[0].row-1==0?1:luokuan[0].row-1,$scope.wpstypeList[0],path);

        var endPage = WpsObject.getEndPage();
         //获取最后页码行数
        var endRow = WpsObject.getEndRow();

        var allContentPath = WpsObject.getBasePath(0);

        allContent = WpsObject.getContentByConditions(ret[0].page,ret[0].row,endPage,endRow,$scope.wpstypeList[0],allContentPath);
    }*/

        //匹配（上海市长城电子）
        //var luokuan =  WpsObject.findByKeyWord('上海市长城电子');
        //获取正确的那一个
        //var l = $scope.fc.getCorrectOne(luokuan);

        var endPage = WpsObject.getEndPage();
        //获取最后页码行数
        var endRow = WpsObject.getEndRow();

        var c = 0;
        var j = 1;
        while (true) {
            c++, j++;
            var te = WpsObject.getContentByConditions(1, c, 1, j, $scope.wpstypeList[1], null);
            if (te.trim() == '') {
                break;
            }
            conTitle += te;
        }
        var path = WpsObject.getBasePath("");

        if ($scope.task.theCommonFormInfo.docType == '公告') {//公告没有主送

            content = WpsObject.getContentByConditions(1, j, endPage, endRow, $scope.wpstypeList[0], path);
        } else {
            //匹配关键字获取匹配元素集合（：）
            var mainSendRet = WpsObject.findByKey('：');

            if (mainSendRet.length > 0) {
                mainSend = WpsObject.getContentByConditions(1, j, mainSendRet[0].page, mainSendRet[0].row + 1, $scope.wpstypeList[1], null);
                content = WpsObject.getContentByConditions(1, j + 1, endPage, endRow, $scope.wpstypeList[0], path);

            } else {
                content = WpsObject.getContentByConditions(1, j, endPage, endRow, $scope.wpstypeList[0], path);

            }
        }


        // content = WpsObject.getContentByConditions(1,j+1,luokuan[l].page,luokuan[l].row-1==0?1:luokuan[l].row-1,$scope.wpstypeList[0],path);

        //var allContentPath = WpsObject.getBasePath(0);

        /*	  if(luokuan[l].page<endPage){

              allContent = WpsObject.getContentByConditions(luokuan[l].page+1,1,endPage,endRow,$scope.wpstypeList[0],allContentPath);
              hengOrShu = false;
              if(WpsObject.getPageType==1){
                  hengOrShu = true;
              }
          }*/

        //匹配（匹配联系人）
        // var contactPerson =  WpsObject.findByKeyWord('联系人：');
        /*  if(contactPerson.length!=0){
          contact = WpsObject.getContentByConditions(contactPerson[0].page,contactPerson[0].row,contactPerson[0].page,contactPerson[0].row+3,$scope.wpstypeList[1],null);
      }*/
        //tem.title = title;
        //tem.contents = contents;
        tem.content = content;
        tem.conTitle = conTitle;
        if (mainSend.trim() != '') {
            mainSend = mainSend.substring(0, mainSend.length - 1);
        }
        tem.mainSend = mainSend;
        tem.contact = contact;
        tem.allContent = allContent;
        tem.hengOrShu = hengOrShu;
        return tem;
    }
    /**
     * 根据关键字匹配WPS文档
     * @param app(wps)
     * @param word(关键字)
     */
    $scope.fc.findByKeyWord = function (app, word) {
        var page, row, column;
        var ret = [];

        var a = app.ActiveDocument;
        var b = a.Range(0, 0)
        var c = b.Select();
        while (true) {
            if (app.Selection.Find.Execute(word, true, false)) {
                page = app.Application.Selection.Information(3);
                row = app.Application.Selection.Information(10);
                column = app.Application.Selection.Information(9);

                var t = {'page': page, 'row': row, 'column': column};
                ret.push(t);
            } else
                break;
        }
        return ret;
    }
    /**
     * 该函数获取内容包括开始行，但是不包含结束行
     * 例：获取第一页第三行内容
     * getContentByConditions(1,3,1,4)
     * 获取第一页第一行到第三页第五行内容
     * getContentByConditions(1,3,3,5)
     * @param app(wps)
     * @param startPage(开始页)
     * @param startRow(开始行)
     * @param endPage(结束页)
     * @param endRow(结束行)
     * @param textOrFile(返回类型)
     * @param url(保存地址)
     * @return
     */
    $scope.fc.getContentByConditions = function (app, startPage, startRow, endPage, endRow, textOrFile, url) {
        if (startPage < 1 || startRow < 1 || endPage < 1 || endRow < 1)
            return false;

        var start, end, ret;
        ;

        // 选中起始页并定位到起始页的当前行
        app.Selection.GoTo(1, 1, startPage).Select();
        if (startRow > 1)
            start = app.Selection.GoTo(3, 2, startRow - 1).Start;
        else
            start = app.Selection.Start;

        // 选中结束页页并定位到结束页页的当前行
        app.Selection.GoTo(1, 1, endPage).Select();
        if (endRow > 1)
            end = app.Selection.GoTo(3, 2, endRow - 1).Start;
        else
            end = app.Selection.Start;
        if (textOrFile == 'File') {
            var a = app.ActiveDocument;
            var b = a.Range(start, end);
            var c = b.ExportFragment(url, 12);
        } else {
            var ret = app.ActiveDocument.Range(start, end).Text
            return ret;
        }
        return url;
    }

    /**
     * 格式化ret
     * @param ret
     */
    $scope.fc.forMatRet = function (ret) {
        for (var i = 0; i < ret.length; i++) {
            if (ret[i].row != 1 || ret[i].column != 1) {
                ret.splice(i, 1);
                i--;
            }
        }
        if (ret.length > 0) {
            //剔除第一个附件：（特殊情况为第一行第一列）
            var content = WpsObject.getContentByConditions(ret[0].page, ret[0].row, ret[0].page, ret[0].row + 1, $scope.wpstypeList[1], null);
            if (content.indexOf("附件：") >= 0) {
                ret.splice(0, 1);
            }
        }
        return ret;
    }

    /**
     * 匹配落款（约定规则 下一行同时包含年月日）
     * @param ret
     */
    $scope.fc.getCorrectOne = function (luokuan) {
        var l;
        for (var i = 0; i < luokuan.length; i++) {
            if (luokuan[i].row <= 4) {
                continue;
            }
            var content = WpsObject.getContentByConditions(luokuan[i].page, luokuan[i].row - 3, luokuan[i].page, luokuan[i].row, $scope.wpstypeList[1], null);
            if (content.trim() == '') {
                l = i;
                break;
            }

        }
        return l;
    }

    /**
     * 打印密级
     */
    $scope.printSecretConfirm = function () {
        SysUtils.swalConfirm('提示', '要打印吗？', 'info', function (isConfirm) {
            if (isConfirm) {
                $("#secretFormPrint").printArea();
            } else {
                swal.close();
            }
        })
    };

    /**
     * 催办通知单申报
     */
    $scope.createReminderNotice = function (actionId) {
        SysUtils.requestByJson("/processDefVersion/queryVersionByFormDefId", {"formDefId": actionId}, function (resultInfoId) {
            /*拿到模板id后，创建表单*/
            $scope.task.theCommonFormInfo.belongProInst.processVersionId = resultInfoId.bean.id;
            SysUtils.requestByJson("/rProcessInstance/create", $scope.task.theCommonFormInfo.belongProInst, function (resultInfo) {
                window.open(ENV.localapi + "/index.html#!/officialDocuments/" + resultInfo.additionalInfo.formDefId + "/" + resultInfo.additionalInfo.currentTuskId, resultInfo.additionalInfo.currentTuskId);
            });
        });
    }

    /************************************请假报批start**********************************/
    $scope.departure = false;
    $scope.leaveTypes = LeaveService.getLeaveTypes();

    $scope.choseLeaveType = function (type, $event) {
        LeaveService.choseLeaveType($scope.task, type, $event);
    };

    $scope.choseDeparture = function ($event) {
        LeaveService.choseDeparture($scope.task, $event);
        $scope.$applyAsync();
        console.log($scope.task);
        if ($scope.task.theCommonFormInfo.formJxwLeave.departure === 'Yes') {
            $scope.departure = true;
        }
    };
    //请假转因私出国
    $scope.transmitAbroadPrivate = function () {
        console.log($scope.taskId);
        var workflowInfo = {
            id: $scope.taskId,
            transDocType: "transAbroadPrivate",
            formDefId: 'yscgjshengpi'
        };
        SysUtils.requestByJson('/rCurrentTaskInfo/transDoc', workflowInfo, function (resultInfo) {
            $scope.task = resultInfo.bean;
            window.opener.renwPage();
            window.location = ENV.localapi + "/index.html#!/officialDocuments/" + $scope.task.belongingProInst.formDefId + "/" + $scope.task.id;
            window.location.reload();
        });
    };
    //查看因私出国
    $scope.viewAbroadPrivate = function () {
        window.open(ENV.localapi + "/index.html#!/officialDocuments/yscgjshengpi/-" + $scope.task.theCommonFormInfo.formJxwLeave.abroadPrivateId, $scope.task.belongingProInst.id);
    };
    /************************************请假报批end**********************************/

    /************************************临时借聘报批start**********************************/
    $scope.personnelChk = PersonnelService.getPersonnelChk();

    $scope.choseCK = function (chkName, type, $event) {
        PersonnelService.choseCK($scope.task, chkName, type, $event);
    };

    $scope.chose = function (chkName, type) {
        PersonnelService.chose($scope.task, chkName, type);
    };
    /************************************临时借聘报批end**********************************/

}])
;
