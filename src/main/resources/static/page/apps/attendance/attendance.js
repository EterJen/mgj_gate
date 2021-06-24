myApp.controller('attendanceCtrl', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils', '$timeout', '$stateParams', 'sessionStorageService', function ($rootScope, $scope, ENV, $state, SysUtils, $timeout, $stateParams, sessionStorageService) {
    console.log("attendanceCtrl");
    /*************************一、变量定义****************************/

    $scope.oaDeptWithUser = [];
    $scope.initAttendanceD = {};
    $scope.queryAttendanceTList = [];
    var hasRoleNeiQin = sessionStorageService.get(sessionStorageService.hasRoleNeiQin);
    ;


    $scope.hasRoleNeiQin = hasRoleNeiQin;

    $scope.cu = sessionStorageService.get(sessionStorageService.key_cu);
    $scope.mGetDate = function (year, month) {
        var d = new Date(year, month, 0);
        return d.getDate();
    }

    $scope.fc = {
        years: [],
        month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        localDay: [],
        localDay2: [],
        localeDayCount: 0,
        localeDate: new Date().format("yyyy年MM月dd日"),
        deptName: "",
        deptId: "",
        usersprimary: {},
        users: {},
        targ: "",
        sizes: []
    };
    $scope.fc.queryDeptIdChg = function () {
        $scope.queryAttendanceTList = [];
        $scope.queryAttendanceTDeptIds = [];
        if (-1 == $scope.fc.queryDeptId) {
            $scope.oaDeptWithUser.forEach(function (v) {
                if (v.id != $scope.fc.queryDeptId) {
                    $scope.queryAttendanceTList.push(v);
                    $scope.queryAttendanceTDeptIds.push(v.deptId)
                }
            });
        } else {
            $scope.oaDeptWithUser.forEach(function (v) {
                if (v.id == $scope.fc.queryDeptId) {
                    $scope.queryAttendanceTList.push(v);
                    $scope.queryAttendanceTDeptIds.push(v.deptId)
                }
            });
        }
    };
    $scope.changeDept = function () {
        $scope.fc.queryDeptIdChg();
        $scope.query();
    };

    for (var i = 2020; i <= 2023; i++) {
        $scope.fc.years.push(i);
    }
    $scope.fc.currentYear = new Date().getFullYear();
    $scope.fc.currentMonth = new Date().getMonth() + 1;
    $scope.fc.localeDayCount = $scope.mGetDate($scope.fc.currentYear, $scope.fc.currentMonth);

    $scope.fc.currentMonth = new Date().getMonth() + 1;
    var accUrl = ENV.serverUri + "/third/jyjoa/getJyjoaDeptWithUser";

    $scope.bgsnq = function () {
        return $scope.cu.bgsUser && $scope.cu.hasRoleNeiQin;
    };

    $scope.getOaOrgData = function () {
        SysUtils.requestByOaJsonSync(accUrl, {}, function (resultInfo) {
            $scope.oaDeptWithUser = JSON.parse(resultInfo.bean);
            console.log($scope.oaDeptWithUser)
            $scope.oaDeptWithUser.forEach(function (v, dIndex) {
                v.deptName = v.name;
                v.deptId = v.id;
                v.orderNum = 1 + dIndex;
                v.attendanceDList = [];
                v.users.forEach(function (u, uIndex) {
                    v.attendanceDList.push(
                        {
                            userId: u.id,
                            orderNum: 1 + uIndex,
                            username: u.name,
                            secondTo: u.secondTo
                        }
                    );
                });
            });
            $scope.initData = [];
            $scope.oaDeptWithUser.forEach(function (v, dIndex) {
                $scope.initData.push(v);
            });

            $scope.oaDeptWithUser.push({
                id: -1,
                name: "全局"
            })
            $scope.fc.queryDeptId = $scope.cu.oaDeptId;
            if ($scope.bgsnq()) {
                $scope.fc.queryDeptId = -1;
            }
            $scope.fc.queryDeptIdChg();
        })
    };


    $scope.getWorkday = function () {
        SysUtils.requestByJson2("/workday/getWorkday", {
            year: $scope.fc.currentYear,
            month: $scope.fc.currentMonth
        }, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                $scope.fc.localDay = [];
                $scope.initAttendanceD = {};
                $scope.fc.localDay2 = [];
                for (var i = 1; i <= resultInfo.beanList.length; i++) {
                    $scope.fc.localDay.push(i);
                    if ('1' == resultInfo.beanList[i - 1].iswork) {
                        $scope.initAttendanceD['day' + i] = '√';
                    }
                }
            })
        })
    }
    $scope.getWorkday();


    /*    var url='/cityAddressBook/getDeptByUserName';
        SysUtils.requestByJson(url, {}, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                $scope.fc.deptName = resultInfo.bean.department;
            })
        })*/

    /*    var accUrl = ENV.templateLocate + "/../third/jyjoa/toGetDept";
        SysUtils.requestByOaJsonSync(accUrl, {}, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                $scope.fc.deptName = resultInfo.bean.name;
                $scope.fc.deptId = resultInfo.bean.id;
                $scope.fc.usersprimary = resultInfo.bean.users;

                $scope.fc.usersprimary.forEach(function (us) {
                    $scope.fc.sizes.push(us.name);
                })
            })
        })*/


    $scope.list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

    $scope.explains = [
        {show: '出勤 &#10003', val: '√', sel: false},
        {show: '值班 ∞', val: '∞', sel: false},
        {show: '休假 О', val: 'О', sel: false},
        {show: '调休 ⊙', val: '⊙', sel: false},
        {show: '事假 Δ', val: 'Δ', sel: false},
        {show: '病假 +', val: '+', sel: false},
        {show: '探亲 т', val: 'т', sel: false},
        {show: '产假 ⊥', val: '⊥', sel: false},
        {show: '工伤 z', val: 'z', sel: false},
        {show: '迟到 <', val: '<', sel: false},
        {show: '早退 >', val: '>', sel: false},
        {show: '旷工 ×', val: '×', sel: false},
        {show: '婚假 ☆', val: '☆', sel: false},
        {show: '丧假 ∨', val: '∨', sel: false},
    ];

    $scope.explainsMark = [
        '√',
        '∞',
        'О',
        '⊙',
        'Δ',
        '+',
        'т',
        '⊥',
        'z',
        '<',
        '>',
        '×',
        '☆',
        '∨',
    ];

    /*
        $scope.explainsMark = [
            {show: '&#10003', val: '√'},
        ]
    */

    $scope.paste = function (atd, x) {
        atd['day' + x] = $scope.selExplain.val;
    };

    $scope.choose = function (x) {
        $scope.explains.forEach(function (v) {
            v.sel = false;
        });
        x.sel = true;
        $scope.selExplain = x;
    };
    $scope.choose2 = function (obj) {
        console.log(this.$index);
        if (this.$index < 14 - $scope.fc.users.length) {
            $scope.flag = [];
            $scope.flag[this.$index + $scope.fc.users.length + 1] = true;
            $scope.fc.targ = $scope.explains[this.$index + $scope.fc.users.length].charAt($scope.explains[this.$index + $scope.fc.users.length - 1].length - 1);
        } else {
            $scope.flag = [];
            $scope.fc.targ = "";
        }
    };

    $scope.changeT = function (u, kq) {

        if (!SysUtils.isEmpty($scope.fc.targ)) {
            u[kq.key] = $scope.fc.targ;
            kq.val = u[kq.key];
        }
    };

    $scope.upSend = function (cssb) {
        var postBean = {
            attendanceTList: $scope.attendanceTListVo,
        };
        if (cssb) {
            postBean.deptName = '1';/*表示处室上报*/
        }

        var url = "/attendanceT/upSend";
        SysUtils.requestByJson(url, postBean, function (resultInfo) {
            SysUtils.swalForTips("提示", "操作成功", "info", function (isConfirm) {
            });
            $scope.query();
        });
    };

    $scope.save = function (att, atd) {

        att.attendanceD = atd;
        var url = "/attendanceT/update";
        SysUtils.requestByJson(url, att, function (resultInfo) {
            SysUtils.swalForTips("提示", "修改成功", "info", function (isConfirm) {
            });
            $scope.query();
        });
    }

    $scope.attendanceTListVo = [];

    $scope.postBean = {};
    $scope.query = function () {
        $scope.postBean = {
            workday: $scope.fc.currentYear + "-" + $scope.fc.currentMonth,
            deptIds: $scope.queryAttendanceTDeptIds,
        };

        var url = "/attendanceT/getOne";
        SysUtils.requestByJson(url, $scope.postBean, function (resultInfo) {
            $scope.attendanceTListVo = resultInfo.beanList;
            if (!SysUtils.notEmpty($scope.attendanceTListVo, [])) {
                $scope.init();
            } else {
                $scope.cmDaySize = $scope.attendanceTListVo[0].daySize;
                $scope.$apply();
            }
        });
    }

    $scope.getOaOrgData();
    $scope.init = function () {
        $scope.getOaOrgData();
        $scope.postBean = {
            deptName: $scope.queryAttendanceTList[0].deptName,
            daySize: $scope.fc.localDay.length,
            workday: $scope.fc.currentYear + "-" + $scope.fc.currentMonth,
            attendanceD: $scope.initAttendanceD,
            attendanceTList: $scope.initData
        };

        var url = "/attendanceT/initData";
        SysUtils.requestByJson(url, $scope.postBean, function (resultInfo) {
            $scope.query();
        });
    }


    $scope.query();
    $scope.useinfo = function () {
        $('#jdedit').modal('show');
    };
    $scope.export = function () {
        postBean = {
            workday: $scope.fc.currentYear + "-" + $scope.fc.currentMonth,
            daySize: $scope.fc.localDay.length,
            deptIds: $scope.queryAttendanceTDeptIds,
        };
        var url = '../attendanceT/export';
        if ('-1' == $scope.fc.queryDeptId) {
            var url = '../attendanceT/exportAll';
        }
        var value = JSON.stringify(postBean);
        var form = $("<form>");   //定义一个form表单
        form.attr('style', 'display:none');   //在form表单中添加查询参数
        form.attr('target', '');
        form.attr('method', 'post');
        form.attr('action', url);
        var input1 = $('<input>');
        input1.attr('type', 'hidden');
        input1.attr('name', 'attendanceRefId');
        input1.attr('value', value);
        $('body').append(form);  //将表单放置在web中
        form.append(input1);   //将查询参数控件提交到表单上
        form.submit();
    };

    $scope.chnageMonth = function () {
        $scope.getWorkday();
        $scope.query();

    }


}]);
