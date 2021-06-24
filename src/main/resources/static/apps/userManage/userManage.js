/*myApp.config(function ($stateProvider, ENV) {

    $stateProvider.state('coreHome.userManageList', {
        url: "/userManageList",
        views: {
            'rightContent@coreHome': {
                templateUrl: ENV.templateLocate + "/apps/userManage/userList.html?ts=" + timestamp,
                controller: "userListCtrl",
                cache: false,
            }
        }
    });

});*/


myApp.controller('userListCtrl', ['$rootScope', '$scope', 'ENV', '$state', '$http', 'SysUtils', 'dataFactory', 'NodeTreeTool', 'maxHeigtTool', function ($rootScope, $scope, ENV, $state, $http, SysUtils, dataFactory, NodeTreeTool, maxHeigtTool) {
  // console.log("userListCtrl controller");

  /*************************一、变量定义****************************/
  $rootScope.addBgground = true;
  $scope.selectedUser = {};
  $scope.userList = [];
  //TODO:先静态写在这里，后期要从数据库动态获取
  $scope.userModeOptions = [
    {id: 3, name: "单用户替代"},
    // {id: 2, name: "单用户唯一"},
    {id: 1, name: "多用户登录"},
  ];
  $scope.userFlagOptions = [
    {id: 1, name: "正常用户"},
    // {id: 9, name: "管理员用户"},
    {id: 0, name: "失效用户"},
  ];
  $scope.selectUserType = '0';
  $scope.umoIndex = 0;
  $scope.ufoIndex = 0;
  $scope.userNameLike = ""; //用户名 登录名 模糊匹配
  $scope.allUsersRoot = {};//所有用户抽象根节点
  $scope.selectedUsers = [];//当前选中的多个用户
  $scope.copyRelationSrcUser = {};//授权复制源用户
  $scope.copyRelationDbUsers = {};//授权复制源用户
  $scope.copyRelationDstUsers = [];//授权复制目标用户
  $scope.Nodes = {};//组织树节点
  $scope.userOrg = {};//用户组织
  $scope.orgNavType = '';
  $scope.isUpdateUifo = false;
  /*组织导航条类型*/
  $scope.treeSK = "";//组织树检索关键字
  $scope.currentEditUser={};
  /*************************二、函数定义****************************/

  /* var window_height = $(window).height();
   var heightList = [];
   heightList.push($('.main-header').outerHeight());
   heightList.push($('.panel-heading').outerHeight(true));
   var resultHeight = maxHeigtTool.maxHeigt(window_height, heightList);
   $('.panel-body').css('max-height', resultHeight);
   $('.panel-body').css('height', resultHeight);*/


  $scope.nodeTrClick = function (parentNode, selfNode, siblingNodes, sonNodes, event) {
    /*选中自己*/
    /*   if (NodeTreeTool.isFalse(selfNode.checked)) {
           selfNode.checked = true;
       } else {
           selfNode.checked = false;
       }*/

    /*选中相关*/
    NodeTreeTool.relatedCheck(parentNode, selfNode, siblingNodes, sonNodes);

    /*根据需要统计选中结果*/
    $scope.selectedUsers = NodeTreeTool.checkedCount(parentNode, selfNode, siblingNodes, sonNodes, $scope.selectedUsers);
  }

  $scope.edit = function (user) {
    console.log(user);
    $scope.currentEditUser=user;
    $("#userEditForm")[0].reset();
    $scope.isUpdateUifo = true;
    $scope.selectedUser = SysUtils.deepCopy(user);
    console.log($scope.selectedUser);

    $scope.selectedUser.repassword = $scope.selectedUser.password;
    $('#userDetailDialog').modal('show');
    $scope.$applyAsync();
    // console.log(JSON.stringify($scope.selectedUser));
  };

  $scope.formValid = function (srcForm) {
    /*false 时表单提交不禁用*/
    /*        console.log($scope.selectedUser);
            console.log("srcForm");
            console.log(srcForm);
            console.log(srcForm.$invalid);
            console.log(srcForm.username.$error.pattern);
            console.log(srcForm.username.$valid);
            console.log(srcForm.username.$dirty);*/
    if ($scope.isUpdateUifo) {
      /*更新时初始假设已经通过验证*/
      var invalid = false;
      if (srcForm.ufusername.$viewValue === null) {
        invalid = true;
      }
      /*未改动的属性忽略验证*/
      if (srcForm.ufusername.$dirty) {
        invalid = invalid || srcForm.ufusername.$invalid;
      }
      if (!invalid && srcForm.ufname.$dirty) {
        invalid = invalid || srcForm.ufname.$invalid;
      }
      if (!invalid && srcForm.ufpassword.$dirty) {
        invalid = invalid || srcForm.ufpassword.$invalid;
      }
      if (!invalid && srcForm.ufrepassword.$dirty) {
        invalid = invalid || srcForm.ufrepassword.$invalid;
      }
      if (!invalid && srcForm.ufmobilephone.$dirty) {
        invalid = invalid || srcForm.ufmobilephone.$invalid;
      }
      if (!invalid && srcForm.ufemail.$dirty) {
        invalid = invalid || srcForm.ufemail.$invalid;
      }


      return invalid;
    } else {
      return srcForm.$invalid;
    }
  };


  $scope.copyRelation = function () {
    var url = ENV.localapi + "/coreUser/" + $scope.copyRelationSrcUser.id + "/copyRelationToOther/increment";
    dataFactory.getlist(url, 'POST', {'Content-type': 'application/json'}, $scope.copyRelationDstUsers).then(
            function (d) {
              $('#copyRelationModal').modal('hide');
            },
            function (data) {
              console.log(JSON.stringify(data));
            }
    )

  };
  $scope.clearRelation = function () {
    if ($scope.selectedUsers.length > 0) {
      $scope.selectedUsers = $scope.selectedUsers.filter(function (value) {
        return value != $scope.allUsersRoot;
      });
    } else {
      SysUtils.swalForTips("提示", "请选择人员", "info", function (isConfirm) {

      });
      return;
    }

    var url = ENV.localapi + "/coreUser/clearRelation";
    SysUtils.swalConfirm("提示", "是否清除授权？", "info", function (isConfirm) {
      if (isConfirm) {
        dataFactory.getlist(url, 'POST', {'Content-type': 'application/json'}, $scope.selectedUsers).then(
                function (d) {
                  //console.log(JSON.stringify(d));
                  SysUtils.swalForTips("提示", "清除成功", "info", function (isConfirm) {

                  });
                  return;
                },
                function (data) {
                  console.log(JSON.stringify(data));
                }
        )
      }
    });
  };

  $scope.orgTreeNavChange = function (orgTp) {
    /*  var ce = $(event.target);
      if (!SysUtils.isEmpty(ce)) {
          ce.parent().addClass('active');
          ce.parent().siblings().removeClass('active');
      }*/
    $scope.orgNavType = orgTp;
    $scope.copyRelationDbUsers = [];

    $scope.initNodes();
  };

  $scope.queryOrgNodeUsersByPid = function (node, target) {
    //点击数菜单变更背景颜色
    $scope.isUpdate = false;
    $(".angular-ui-tree-handle").removeClass("active");
    $(target.currentTarget).addClass("active");

    if ($scope.orgNavType == 'dept') {
      accUrl = ENV.localapi + "/coreDepartment/read/" + node.id;
    } else if ($scope.orgNavType == 'post') {
      accUrl = ENV.localapi + "/corePost/" + node.id + "/users";
    } else if ($scope.orgNavType == 'role') {
      accUrl = ENV.localapi + "/coreRole/read/" + node.id;
    } else if ($scope.orgNavType == 'group') {
      accUrl = ENV.localapi + "/coreDepartment/deptMixPostTree";
    }

    dataFactory.getlist(accUrl, 'POST', {'Content-type': 'application/json'}, {}).then(
            function (resultInfo) {
              SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                if ($scope.orgNavType == 'dept') {
                  $scope.copyRelationDbUsers = resultInfo.bean.users;
                } else if ($scope.orgNavType == 'post') {
                  $scope.copyRelationDbUsers = resultInfo.beanList;
                } else if ($scope.orgNavType == 'role') {
                  $scope.copyRelationDbUsers = resultInfo.bean.users;
                } else if ($scope.orgNavType == 'group') {
                  $scope.copyRelationDbUsers = resultInfo.beanList;
                }

                if (SysUtils.nonEmptyCheck($scope.copyRelationDbUsers)) {
                  $scope.copyRelationDbUsers = $scope.copyRelationDbUsers.filter(function (value) {
                    return value.id != $scope.copyRelationSrcUser.id;
                  });
                }

                if (SysUtils.nonEmptyCheck($scope.copyRelationDstUsers)) {
                  $scope.copyRelationDstUsers.forEach(function (value2) {
                    if (SysUtils.nonEmptyCheck($scope.copyRelationDbUsers)) {
                      $scope.copyRelationDbUsers = $scope.copyRelationDbUsers.filter(function (value) {
                        return value.id != value2.id;
                      });
                    }
                  })
                }

              })
            },
            function (d) {
              console.log(JSON.stringify(d));
            }
    )

  }


  $scope.initNodes = function () {

    if ($scope.orgNavType == 'dept') {
      accUrl = ENV.localapi + "/coreDepartment/departmentTree";
    } else if ($scope.orgNavType == 'post') {
      accUrl = ENV.localapi + "/coreDepartment/deptMixPostTree";
    } else if ($scope.orgNavType == 'role') {
      accUrl = ENV.localapi + "/coreRole/listAll";
    } else if ($scope.orgNavType == 'group') {
      accUrl = ENV.localapi + "/coreGroup/groupTree";
    }

    dataFactory.getlist(accUrl, 'POST', {'Content-type': 'application/json'}, {name: $scope.treeSK}).then(
            function (resultInfo) {
              SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                if ($scope.orgNavType == 'dept') {
                  $scope.Nodes = resultInfo.beanList;
                } else if ($scope.orgNavType == 'post') {
                  $scope.Nodes = resultInfo.bean.treeDepts;
                } else if ($scope.orgNavType == 'role') {
                  $scope.Nodes = resultInfo.beanList;
                } else if ($scope.orgNavType == 'group') {
                  $scope.Nodes = resultInfo.beanList;
                }
              })
            },
            function (d) {
              console.log(JSON.stringify(d));
            }
    )

  };

  $scope.delete = function (user) {
    accUrl = ENV.localapi + "/coreUser/delete/" + user.id;
    SysUtils.swalConfirm("提示", "是否删除该用户", "info", function (isConfirm) {
      if (isConfirm) {
        dataFactory.getlist(accUrl, 'POST', {'Content-type': 'application/json'}, {}).then(
                function (d) {
                  $scope.selectedUser.name = null;
                  $scope.userNameLike = null;
                  $scope.queryUsear();
                },
                function (d) {
                  console.log(JSON.stringify(d));
                }
        )
      }
    });
  };

  $scope.enterKeyup = function (e, act) {

    //IE 编码包含在window.event.keyCode中，Firefox或Safari 包含在event.which中


    var keycode = window.event ? e.keyCode : e.which;

    if (keycode == 13) {
      if ('pageAuto' == act) {
        $scope.pageAuto();
      } else if ('initNodes' == act) {
        $scope.initNodes();
      }

    } else {
      return;
    }
  };

  $scope.activeUser = function (user) {
    SysUtils.swalConfirm("提示", "是否恢复该用户", "info", function (isConfirm) {
      if (isConfirm) {
        $scope.selectedUser = SysUtils.deepCopy(user);
        $scope.selectedUser.flag = 1;
        $("#userEditForm")[0].reset();

        dataFactory.getlist(ENV.localapi + "/coreUser/findUser", 'POST', {'Content-type': 'application/json'}, JSON.stringify($scope.selectedUser)).then(
                function successCallback(data) {
                  // console.log(attrs.userid);
                  // console.log(Object.prototype.toString.call([data.beanList, data.beanList.length]));
                  if (!SysUtils.isEmpty([data.beanList, data.beanList.length]) && data.beanList.length > 0) {
                    var isSelf = false;
                    data.beanList.forEach(function (v) {
                      if (!isSelf) {
                        isSelf = isSelf || (v.id == user.id);
                      }
                    });
                    /*请求用户过滤*/
                    if (isSelf) {
                      $scope.saveUser();
                    } else {
                      $scope.selectedUser.username = null;
                      $scope.isUpdateUifo = true;
                      $scope.selectedUser.repassword = $scope.selectedUser.password;
                      SysUtils.swalConfirm("提示", "用户名已经存在，请先更改用户名", "info", function (isConfirm) {
                        if (isConfirm) {
                          $('#userDetailDialog').modal('show');
                        } else {
                          $scope.isUpdateUifo = false;
                        }
                      })
                    }
                  } else {
                    $scope.saveUser();
                  }
                },
                function errorCallback(data) {
                  $scope.saveUser();
                }
        )
      }
    })
  };


  $scope.addUser = function (user) {
    $scope.copyRelationDbUsers = $scope.copyRelationDbUsers.filter(function (value) {
      return value.id != user.id;
    })
    $scope.copyRelationDstUsers = $scope.copyRelationDstUsers.concat(user);
  };

  $scope.minusUser = function (user) {
    $scope.copyRelationDstUsers = $scope.copyRelationDstUsers.filter(function (value) {
      return value.id != user.id;
    })
    $scope.copyRelationDbUsers = $scope.copyRelationDbUsers.concat(user);
  };

  $scope.saveUser = function () {
    var accUrl = null;
    if ($scope.selectedUser.id == null) {
      accUrl = ENV.localapi + "/coreUser/create";
    } else {
      accUrl = ENV.localapi + "/coreUser/update";
    }

    /*更新重置为文件名 而不是路径*/
    if (!SysUtils.isEmpty($scope.selectedUser.photofilePath)) {
      photofilePathList = $scope.selectedUser.photofilePath.split("\\");
      $scope.selectedUser.photofilePath = photofilePathList[photofilePathList.length - 1];
    }

    $(".flyover").show();
    $.ajax({
      type      : "POST",
      url       : accUrl,
      beforeSend: function (request) {
        request.setRequestHeader("Content-type", "application/json");
        //request.setRequestHeader("Authorization", "Bearer " + $cookies.getObject('user').token);
      },
      dataType  : 'json',
      data      : JSON.stringify($scope.selectedUser),
      success   : function (resultInfo) {
        $(".flyover").hide();
        SysUtils.handleResult(resultInfo, {'state': $state}, function () {
          // $('#userDetailDialog').modal('hide');
          $scope.hideDialog('userDetailDialog');
          $scope.pageAuto();
        })
      },
      error     : function (XMLResponse) {
        $(".flyover").hide();
        console.log(JSON.stringify(XMLResponse));
      }
    });
  }


  /*    $("#userDetailDialog").on("show.bs.modal", function() {
          console.log("sdds");

          $(this).removeData("bs.modal");
      });*/
  // $('#userDetailDialog').modal({backdrop: 'static', keyboard: false});
  /*    $('#userDetailDialog').modal({backdrop: 'static', keyboard: false});
      $('#userDetailDialog').modal('hide');*/
  /* $scope.listenUserModeal = function () {

       console.log("ewew");
       $("#userDetailDialog").on("hidden.bs.modal", function() {
           $(this).removeData("modal");
       });
   }*/
  /*   $("#userDetailDialog").on("hidden.bs.modal", function() {
         $(this).removeData("modal");
     });*/

  $scope.uImgFileds = ["photofilePath"];
  $scope.uNomalFileds = ["username", "name", "password", "repassword", "mobilephone", "email", "timeout"];
  $("#userDetailDialog").on("show.bs.modal", function () {
    $scope.uImgFileds.forEach(function (field) {
      if (!SysUtils.notEmpty($scope.selectedUser, [field])) {
        $scope.selectedUser[field] = "";
      }
      $("#uf" + field).attr('src', $scope.selectedUser[field]);
    });
    $scope.uNomalFileds.forEach(function (field) {
      if (!SysUtils.notEmpty($scope.selectedUser, [field])) {
        $scope.selectedUser[field] = "";
      }
      $("#uf" + field).val($scope.selectedUser[field]);
    });
  });
  $("#userDetailDialog").on("hidden.bs.modal", function () {
    $scope.isUpdateUifo = false;
  });


  $scope.showDialog = function (dialog, user) {
    /*用户排序数据初始化*/
    if (dialog === 'userSortDialog') {
      $scope.selectedUser = {};
      $scope.selectedUser.paging = "No";
      $scope.selectedUser.flag = $scope.userFlagOptions[$scope.ufoIndex].id;
      $scope.selectedUser.usermode = $scope.userModeOptions[$scope.umoIndex].id;
      $scope.$applyAsync();

      $scope.queryUsear();
    } else if (dialog === 'userDetailDialog') {
      $("#userEditForm")[0].reset();
      $scope.selectedUser = {};
      $scope.selectedUser.flag = 1;
      $scope.selectedUser.gender = '1';
      console.log($scope.selectedUser);

      $scope.$applyAsync();
      // $scope.selectedUser.usermode = 3;
    } else if (dialog === 'copyRelationModal') {
      if ($scope.selectedUsers.length > 0) {
        $scope.selectedUsers = $scope.selectedUsers.filter(function (value) {
          return value != $scope.allUsersRoot;
        });
      }
      if (!$scope.selectedUsers.length > 0) {
        SysUtils.swalForTips("未选中用户", "请先选择用户", "info", function (isConfirm) {

        });
        return;
      }


      $scope.orgNavType = 'dept';
      $scope.copyRelationSrcUser = $scope.selectedUsers[0];
      $scope.copyRelationDbUsers = [];
      $scope.copyRelationDstUsers = [];
      $scope.initNodes();


    } else if (dialog === 'userOrg') {
      $scope.selectedUser = user;
      var url = ENV.localapi + "/coreUser/" + user.id + "/userOrg";
      dataFactory.getlist(url, 'POST', {'Content-type': 'application/json'}, {}).then(
              function (d) {
                $scope.userOrg = d.bean;
              },
              function (data) {
                console.log(JSON.stringify(data));
              }
      )
    }

    $('#' + dialog).modal('show');
  };

  $scope.hideDialog = function (dialog) {
    if ($scope.isUpdateUifo) {
      $scope.isUpdateUifo = false;
    }

    console.log(dialog);

    $scope.selectedUser = {};
    $('#' + dialog).modal('hide');
  };


  $scope.emptyRelation = function (dialog) {
    $scope.selectedUser = {};
    $('#' + dialog).modal('hide');
  };

  $scope.showIMG = function (src) {
    window.open(src);
  };


  //<editor-fold desc="文件上传">
  $scope.fileUpload = function (type) {
    console.log(type);

    if (!SysUtils.notEmpty(type, [])) {
      return;
    }
    console.log("11");


    accUrl = ENV.localapi + "/fileOperation/upload";
    var fd = new FormData();

    // console.log(JSON.stringify($scope.selectedUser));
    /*确保新增有效*/
    $scope.selectedUser.flag = 1;
    var file = $scope.headPortrait;
    fd.append('file', file);
    fd.append('fileType', "HeadPortrait");
    fd.append('selectedBean', JSON.stringify($scope.selectedUser));

    dataFactory.getlist(accUrl, 'POST', {'Content-type': undefined}, fd).then(
            function (d) {
              $scope.selectedUser.photofilePath = d.bean;
              $scope.selectedUser.id = d.beanId;
              $scope.currentEditUser.photofilePath=d.bean;
            },
            function (d) {
              console.log(JSON.stringify(d));
            }
    )


  };
  //</editor-fold>

  $scope.queryUsear = function () {
    var url = ENV.localapi + "/coreUser/userManage/searchUser";
    $scope.selectedUser.dbParams = {withDepart: 'true'};
    dataFactory.getlist(url, 'POST', {'Content-type': 'application/json'}, JSON.stringify($scope.selectedUser)).then(
            function (resultInfo) {
              SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                $scope.userList = resultInfo.beanList;
                $scope.paginationConf.totalItems = resultInfo.totalRows;
                // console.log(resultInfo);
                angular.forEach($scope.userList, function (item) {
                  if (item.usermode === 1) {
                    item.usermodeChinese = "多用户登录";
                  } else if (item.usermode === 2) {
                    item.usermodeChinese = "单用户唯一";
                  } else if (item.usermode === 3) {
                    item.usermodeChinese = "单用户替代";
                  } else if (item.usermode === 4) {
                    item.usermodeChinese = "系统账户";
                  }
                });
              })
            },
            function (data) {
              console.log(JSON.stringify(data));
            }
    )
  }


  //<editor-fold desc="分页配置">
  $scope.paginationConf = {
    currentPage   : 1,
    totalItems    : 80,
    itemsPerPage  : 10,
    pagesLength   : 13,
    perPageOptions: [10, 20, 30, 40, 50],
    onChange      : function () {
    }
  };

  $scope.pageAuto = function () {
    $scope.selectedUser = {};
    $scope.selectedUser.paging = "Yes";
    $scope.selectedUser.pageNo = $scope.paginationConf.currentPage;
    $scope.selectedUser.pageSize = $scope.paginationConf.itemsPerPage;
    $scope.selectedUser.flag = $scope.userFlagOptions[$scope.ufoIndex].id;
    // $scope.selectedUser.usermode = $scope.userModeOptions[$scope.umoIndex].id;
    $scope.selectedUser.name = $scope.userNameLike;
    $scope.queryUsear();
  };

  $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.pageAuto);
  //</editor-fold>

  $scope.dragControlListeners = {
    orderChanged: function (event) {
      console.log(event.source.index);
      console.log($scope.userList[event.source.index]);
      console.log(event.dest.index);
      console.log($scope.userList[event.dest.index]);
    }
  };

  //<editor-fold desc="用户分类导航 查询">
  $scope.mixBtnChange = function (idx, idxType) {
    /* var ce = $(event.target);
     if (!SysUtils.isEmpty(ce)) {
         ce.parent().addClass('active');
         ce.parent().siblings().removeClass('active');
     }*/
    console.log("==" + idx);
    if ('umoIdx' === idxType) {
      $scope.umoIndex = idx;
    } else if ('ufoIdx' === idxType) {
      $scope.ufoIndex = idx;
    }

    $scope.userNameLike = '';

    $scope.selectedUser = {};
    $scope.selectedUser.paging = "Yes";
    $scope.selectedUser.pageNo = 1;
    $scope.selectedUser.pageSize = 10;
    $scope.selectedUser.flag = $scope.userFlagOptions[$scope.ufoIndex].id;
    $scope.selectedUser.usermode = $scope.userModeOptions[$scope.umoIndex].id;

    $scope.queryUsear();
  };
  //</editor-fold>


  /*************************三、初始化调用****************************/
  /*计算布局高度*/
  $scope.calculatedHeight = function () {
    $('.content-wrapper').css('height', SysUtils.get_content_wrapper());
    //console.log("=ceter_p=="+$('#panel-heading').outerHeight(true));
    $('#panel-body-table').css('height', $('.content').height() - $('#panel-heading').outerHeight(true));
    $('.table_shadow').css('max-height', $('.content').height() - $('#panel-heading').outerHeight(true) - $('#ceter_p').outerHeight());
  }

  $scope.calculatedHeight();
}]);
