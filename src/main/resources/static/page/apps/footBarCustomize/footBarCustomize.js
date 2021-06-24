
myApp.controller('footBarCustomizeCtrl',['$rootScope','$scope','ENV','$state', 'SysUtils','$timeout','$stateParams','sessionStorageService',function ($rootScope,$scope,ENV,$state,SysUtils,$timeout,$stateParams,sessionStorageService) {
    $scope.cu = sessionStorageService.get(sessionStorageService.key_cu);
    console.log("footBarCustomizeCtrl");
    /*************************一、变量定义****************************/

    $scope.fc = {
        queryBean:{isdelete:0}
    };


    /*************************二、函数定义****************************/

    /**
     * 初始化查询
     */
    $scope.queryBeanList = function () {
        var url='/indexIcon/queryIcons';
        SysUtils.requestByJson(url,  $scope.fc.queryBean, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                $scope.fc.topList=resultInfo.additionalInfo.topList;
                $scope.fc.userIcons=resultInfo.additionalInfo.userIcons;
                //console.log($scope.fc.topList);
                $scope.$applyAsync();
                $timeout(function () {
                    //拖拽插件
                    $('.icon-wrapper.sort-drag').arrangeable();
                    $('body').on('dragstart', function () {
                        return false
                    }).on('selectstart', function (e) {
                    })
                }, 1200);
            })
        })
    };


    $scope.fc.addIcon = function(icon) {
        var url='/indexUserIcon/create';
        SysUtils.requestByJson(url,{iconid:icon.id}, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                //添加icon
                var userIcon=resultInfo.bean;
                userIcon.indexIcon=angular.copy(icon);
                $scope.fc.userIcons.push(userIcon);
                $scope.$applyAsync();
            })
        })
        /*$.ajax({
            type: "POST",
            url: "addIconIndexUserIcon.action",
            data:{"iconid":iconid},
            cache:false,
            async: false,
            dataType:"json",
            success: function(msg){
                $("input[name='indexUserIcon.id']").last().val(msg.id);

            }
        });*/
    }

    $scope.fc.deleteicon = function(id){
        var url='/indexUserIcon/delete/'+id;
        SysUtils.requestByJson(url,{}, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                /*$scope.fc.topList=resultInfo.additionalInfo.topList;
                $scope.fc.userIcons=resultInfo.additionalInfo.userIcons;
                $scope.$apply();*/
            })
        })
        /*$.ajax({
            type: "POST",
            url: "deleteIconIndexUserIcon.action",
            data:{"id":id},
            cache:false,
            async: false,
            dataType:"json",
            success: function(msg){
            }
        });*/
    }



    $scope.fc.doSave = function(){
        var ids = $("input[name='indexUserIcon.id']").serializeArray();
        var param=[];
        ids.forEach(function (val) {
            param.push(JSON.parse(val.value));
        })
        console.log(param[0].id);
        var url='/indexUserIcon/saveconfig';
        SysUtils.requestByJson(url,param, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                swal("保存成功!","","info");
            })
        })
    }

    $scope.fc.openApp = function(url){
        //window.open(url);
        //console.log(url);
        var uri=$state.href(url);
        window.open(uri);
        //$state.go(url);
    }

    $scope.fc.doReturn = function(){
        $state.go('menu.coreHome');
    }


    //$('.list-wrapper.mswrapper .icon-list-container').mCustomScrollbar();//自定义滚动条




    $scope.fc.addEvent = function(icon,target) {
        if ($(target.currentTarget).hasClass('add-btn')) {
            if ($scope.fc.userIcons.length > 9) {
                swal("导航菜单不能超过10个!","","info");
                return;
            }
            $("#"+icon.id).addClass("on");
            //$(target.currentTarget).addClass('on');
            //增加下发内容

            $scope.fc.addIcon(icon);
        }
        /*var $iconList = $('.icon-list');
        var $sortdragwrapper = $('.sort-drag-wrapper');
        $iconList.on('click', function (e) {
            var $target = $(e.target)
            if ($target.hasClass('add-btn')) {
                var $delElement = $target.parents('.list-context')
                if ($sortdragwrapper.children().length > 10) {
                    layer.alert("导航菜单不能超过11个");
                    return;
                }
                var iconid=$delElement.attr("id");
                var iconname=$delElement.attr("iconname");
                var classname=$delElement.attr("classname");
                var imgname=$delElement.attr("imgname");

                $delElement.addClass('on');
                //增加下发内容
                var li="<li class=\"icon-wrapper sort-drag\"><input type=\"hidden\" name=\"indexUserIcon.id\" value=\"\">";
                li+="<input type=\"hidden\" name=\"indexUserIcon.iconid\" value=\""+iconid+"\">";
                li+="<span class=\"icon-box\"><div class=\"name\" title=\""+iconname+"\">"+iconname+"</div>";
                li+="<div class=\"icon-bg "+classname+"\"><div class=\"icon "+imgname+"\"></div>";
                li+="<div class=\"del-btn\"></div></div></span></li>";
                $(".am-avg-sm-11").append(li);
                $scope.fc.addIcon(iconid);
            }
        })*/
    }


    $scope.fc.delEvent = function(indexUserIcon,target) {

        if ($(target.currentTarget).hasClass('del-btn')) {
            if ($scope.fc.userIcons.length <2) {
                swal("导航菜单不能少于1个!","","info");
                return;
            }
            var $delElement = $(target.currentTarget).parents('.icon-wrapper.sort-drag')
            $("#"+indexUserIcon.indexIcon.id).removeClass("on");

            //对应的元素没有恢复原来的加号
            $scope.fc.userIcons=$scope.fc.userIcons.filter(function (value) {
                return value.id!=indexUserIcon.id;
            });
            //$(target.currentTarget).remove();

            //执行保存 操作
            $scope.fc.deleteicon(indexUserIcon.id);

        }
        /*var $sortdragwrapper = $('.sort-drag-wrapper');
            $sortdragwrapper.on('click', function (e) {
                    var $target = $(e.target)
                    var $self = $(this)
                    if ($target.hasClass('del-btn')) {
                        var $delElement = $target.parents('.icon-wrapper.sort-drag')
                        if ($sortdragwrapper.children().length <2) {
                            layer.alert("导航菜单不能少于1个");
                            return;
                        }
                        var id=$delElement.find("input[name='indexUserIcon.id']").val();
                        var iconid=$delElement.find("input[name='indexUserIcon.iconid']").val();
                        $("#"+iconid).removeClass("on");

                        //对应的元素没有恢复原来的加号
                        $delElement.remove();

                        //执行保存 操作
                        $scope.fc.deleteicon(id);

                    }
            })*/
    }
    $scope.fc.sortEvent = function() {

        $scope.fc.addEvent()
        $scope.fc.delEvent()
    }



    /*************************三、自动执行函数****************************/
    //$scope.fc.sortEvent();
    $scope.queryBeanList();




}]);
