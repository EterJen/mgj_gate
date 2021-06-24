myApp.controller('attendanceCtrlAll', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils', '$timeout', '$stateParams','sessionStorageService', function ($rootScope, $scope, ENV, $state, SysUtils, $timeout, $stateParams,sessionStorageService) {
    console.log("attendanceCtrlAll");
    /*************************一、变量定义****************************/
    $scope.cu = sessionStorageService.get(sessionStorageService.key_cu);
    $scope.mGetDate = function(year, month){
        var d = new Date(year, month, 0);
        return d.getDate();
    }

    $scope.fc = {
        years: [],
        month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        localDay : [],
        localDay2 : [],
        localeDayCount:0,
        localeDate : new Date().format("yyyy年MM月dd日"),
        deptName : "",
        deptId:"",
        usersprimary:{},
        users:{},
        userList:[],
        userList_:[],
        targ:"",
        sizes:[],
        deptList:{}
    };
    for (var i = 2020; i <= 2099; i++) {
        $scope.fc.years.push(i);
    }
    $scope.fc.currentYear = new Date().getFullYear();
    $scope.fc.currentMonth = new Date().getMonth() + 1;
    $scope.fc.localeDayCount = $scope.mGetDate($scope.fc.currentYear,$scope.fc.currentMonth);

    SysUtils.requestByJson2("/workday/getWorkday", {year:$scope.fc.currentYear, month:$scope.fc.currentMonth}, function (resultInfo) {
        SysUtils.handleResult(resultInfo, {'state': $state}, function () {
            for (var i = 1; i <= resultInfo.beanList.length; i++) {
                $scope.fc.localDay.push(i);
                $scope.fc.localDay2.push(resultInfo.beanList[i-1].iswork);
            }
        })
    })


/*    var url='/cityAddressBook/getDeptByUserName';
    SysUtils.requestByJson(url, {}, function (resultInfo) {
        SysUtils.handleResult(resultInfo, {'state': $state}, function () {
            $scope.fc.deptName = resultInfo.bean.department;
        })
    })*/

/*    var accUrl = ENV.templateLocate + "/../third/jyjoa/toGetDeptAll";
    SysUtils.requestByOaJsonSync(accUrl, {}, function (resultInfo) {
        SysUtils.handleResult(resultInfo, {'state': $state}, function () {
            $scope.fc.deptList =resultInfo.beanList;

            $scope.fc.usersprimary = resultInfo.beanList.users;
        })
    })*/

    $scope.explains = [
        '出勤 √',
        '事假 Δ',
        '病假 +',
        '工伤 z',
        '迟到 <',
        '早退 >',
        '旷工 ×',
        '休假 О',
        '探亲假т',
        '婚假 ☆',
        '产假 ⊥',
        '丧假 ∨',
        '值班 ∞',
        '调休 ⊙',
    ];

    $scope.choose = function (obj) {
        console.log(this.$index);
        if (this.$index < $scope.fc.userList[this.$parent.$index].length){
            $scope.flag =[];
            $scope.flag[this.$index +1 + 14*(this.$parent.$index)] = true;
            $scope.fc.targ = $scope.explains[this.$index].charAt($scope.explains[this.$index].length - 1);
        }else {

        }
    };
    $scope.choose2 = function (obj) {
        console.log(this.$index);
        if (this.$index < 14-$scope.fc.userList[this.$parent.$index].length){
            $scope.flag =[];
            $scope.flag[this.$index+$scope.fc.userList[this.$parent.$index].length+1 + 14*(this.$parent.$index)] = 1;
            $scope.fc.targ = $scope.explains[this.$index+$scope.fc.userList[this.$parent.$index].length].charAt($scope.explains[this.$index+$scope.fc.userList[this.$parent.$index].length].length - 1);
        }
    };

    $scope.choose3 = function(){
        $scope.flag =[];
        $scope.fc.targ="";
    }

    $scope.changeT = function (u,kq) {
        if(!SysUtils.isEmpty($scope.fc.targ)){
            u[kq.key] = $scope.fc.targ;
            kq.val =  u[kq.key];
        }
    };


    $scope.save = function () {
        var url = "/attendanceT/createList";
        SysUtils.requestByJson(url, $scope.item, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {

            })
        });
    }


    $scope.item={
        workday:$scope.fc.currentYear + "-" + $scope.fc.currentMonth,
    };

    $scope.query = function () {
        var url = "/attendanceT/getMore";
        SysUtils.requestByJson(url, $scope.item, function (resultInfo) {
            SysUtils.handleResult(resultInfo, {'state': $state}, function () {
                if(!SysUtils.isEmpty(resultInfo.beanList)){
                    $scope.item = resultInfo.beanList;
                    resultInfo.beanList.forEach(function (bean,j) {
                        $scope.fc.userList_ = bean.attendanceDList;
                        $scope.fc.userList_.forEach(function (u,i) {
                            u.vdays = [];
                            $scope.fc.localDay.forEach(function (n) {
                                tempObj = {
                                    key:'day'+n,
                                    val:u['day'+n],
                                    iswork:$scope.fc.localDay2[n-1]
                                };
                                u.vdays.push(tempObj);
                            });
                        });
                        $scope.fc.userList.push($scope.fc.userList_);
                    })
                }
                $scope.$apply();
            })
        });
    }

    $scope.query();

    $scope.export = function () {
        var url = '../attendanceT/exportAll';
        var form = $('<form method = "POST"  action = "' + url + '">');
        form.append($('<input type="hidden" name="attendanceRefId" value="' + $scope.fc.currentYear + '-' +$scope.fc.currentMonth +'">'))
        $('body').append(form);
        form.submit();
    }

}]);
