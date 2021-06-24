/*myApp.constant('ENV',{
    "debug": true,
    "version":"1.0.1",
    "localapi":"http://172.17.12.1",
    "templateLocate":"http://172.17.12.1"
});*/
/*myApp.constant('ENV', {
  "debug"         : true,
  "version"       : "1.0.1",
  "localapi"      : "http://localhost:8082",
  "templateLocate": "http://localhost:8082"
});*/
var uri = document.location.toString();
var end = uri.indexOf('/visualWF');
var HostUri = uri.substr(0,end);

myApp.constant('ENV', {
    "debug": true,
    "version": "1.0.1",
    "localapi": HostUri,
    "templateLocate": HostUri,
});
/*myApp.constant('ENV',{
 "debug": true,
 "version":"1.0.1",
 "localapi":"http://31.5.48.116/jxw3",
 "templateLocate":"http://31.5.48.116/jxw3"
 });*/
/*myApp.constant('ENV',{
    "debug": true,
    "version":"1.0.1",
    "localapi":"http://31.5.48.206:8080",
    "templateLocate":"http://31.5.48.206:8080"
});*/
/*myApp.constant('ENV',{
    "debug": true,
    "version":"1.0.1",
    "localapi":"http://172.17.12.1",
    "templateLocate":"http://172.17.12.1"
});*/
myApp.service('SysUtils', function (ENV) {

  var self = this;

  this.requestByJson = function (url, jsonObject, successFunc) {
    $(".flyover").show();
    $.ajax({
      type      : "POST",
      url       : ENV.localapi + url,
      beforeSend: function (request) {
        request.setRequestHeader("Content-type", "application/json");
        //request.setRequestHeader("Authorization", "Bearer " + $cookies.getObject('user').token);
      },
      dataType  : 'json',
      data      : JSON.stringify(jsonObject),
      success   : function (resultInfo) {
        $(".flyover").hide();
        self.handleResultWithResultInfo(resultInfo, {}, successFunc);
      },
      error     : function (XMLResponse) {
        $(".flyover").hide();
        console.log(JSON.stringify(XMLResponse));
      }
    })
  }
  this.deepCopy = function (obj) {
    if (Object.prototype.toString.call(obj) === '[object Array]') {
      var res = []
      for (var i = 0; i < obj.length; i++) {
        res.push(self.deepCopy(obj[i]))
      }
      return res
    }

    if (typeof obj != 'object' || obj === null || typeof obj === undefined) {
      return obj;
    }

    var newobj = {};
    for (var attr in obj) {
      newobj[attr] = self.deepCopy(obj[attr]);
    }
    return newobj;
  };

  this.handleResultWithResultInfo = function (resultInfo, params, callBack) {
    if (resultInfo.resultType == 'error' || resultInfo.resultType == 'fail') {
      swal("错误", resultInfo.message, "error");
    } else if (resultInfo.resultType == 'success') {
      callBack(resultInfo);
    } else if (resultInfo.resultType == 'sessionInvalid' || resultInfo.resultType == 'notLogin') {
      swal("错误", resultInfo.message, "error");
    }
  };

  /*对象为null 属性undfined 数组空*/
  this.notEmpty = function (obj, attr) {
    if (obj === null || obj === undefined || obj === '') {
      return false;
    } else if (Object.prototype.toString.call(obj) === '[object Array]') {
      return !(obj == false); //数组非空
    } else if (attr == false) {
      return true;
    } else {
      var newObj = obj[attr[0]];
      var newAttr = attr.slice(1);
      return self.notEmpty(newObj, newAttr);
    }
  };


  //只有确认按钮
  this.swalOnlyConfirm = function (title, text, type, resultHandler) {
    swal({
              title             : title,
              text              : text,
              type              : type,
              confirmButtonColor: '#DD6B55',
              confirmButtonText : '确定',
              cancelButtonColor : '#3c8dbc',
              cancelButtonText  : '取消',
              showCancelButton  : false,
              showConfirmButton : true,
              closeOnConfirm    : false,
              closeOnCancel     : false
            },
            function (isConfirm) {
              resultHandler(isConfirm);
              swal.close();
            });
  }

  //确认和取消按钮都有
  this.swalConfirmNotClose = function (title, text, type, resultHandler) {
    swal({
              title             : title,
              text              : text,
              type              : type,
              confirmButtonColor: '#DD6B55',
              confirmButtonText : '确定',
              cancelButtonColor : '#3c8dbc',
              cancelButtonText  : '取消',
              showCancelButton  : true,
              showConfirmButton : true,
              closeOnConfirm    : false,
              closeOnCancel     : false
            },
            function (isConfirm) {
              resultHandler(isConfirm);
            });
  }
});

/*移除第一次见到*/
Array.prototype.remove = function (val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};

/*移除第一次到*/
myApp.directive("listenModel", ['$parse', function ($parse, $scope) {
  return {
    restrict  : 'A',
    transclude: true,
    scope     : {
      modelCallBac: '&'
    },
    link      : function (scope, element, attrs) {
      var fn = $parse(scope.modelCallBac); //parse it as function
      fn();
    }

  };
}])


