myApp.service('AttachUtils', function (dataFactory, ENV) {

  var self = this;

  this.getFileExt = function (fileFullName) {
    var rs = "";
    var index1 = fileFullName.lastIndexOf(".");
    var index2 = fileFullName.length;
    rs = fileFullName.substring(index1, index2);
    return rs;
  }

  this.getFileName = function (fileFullName) {
    var rs = "";
    var index1 = fileFullName.lastIndexOf(".");
    rs = fileFullName.substring(0, index1);
    return rs;
  }

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


  this.handleResult = function (resultInfo, params, callBack) {
    // console.log(JSON.stringify(resultInfo));
    var state = params.state;
    if (resultInfo.resultType == 'error' || resultInfo.resultType == 'fail') {
      swal("错误", resultInfo.message, "error");
    } else if (resultInfo.resultType == 'success') {
      callBack();
    } else if (resultInfo.resultType == 'sessionInvalid' || resultInfo.resultType == 'notLogin') {
      swal("错误", resultInfo.message, "error");
      state.go('login');
    }
  };
  /*服务器登录验证*/
  this.handleAction = function (bean, resultHandler) {
    if (bean.status && bean.status === 401) {
      swal("无权访问", "您没有相应权限或者用户名密码错误！", "error");
    } else if (bean.resultType === 'error') {
      swal(bean.resultType, bean.message, "error");
    } else if (bean.status === 500) {
      swal("服务器未开启", "请确认服务器已开启！", "error");
    } else {
      //swal("bean.resultType","bean.message","error");
      resultHandler();
    }
  };
  /*去掉HashKey 手动json映射时需要*/
  this.removeHashKey = function (obj) {
    return angular.copy(obj)
  };

  /*null undefined 判断*/
  this.isEmpty = function (object) {
    if (Object.prototype.toString.call(object) === "[object Array]") {
      var res = false;
      object.forEach(function (v) {
        if (!res) {
          res = res || self.isEmpty(v);
        }
      });
      return res;
    } else {
      if (object === null || object === undefined) {
        return true;
      } else {
        return false;
      }
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

  Array.prototype.contain = function (val) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] == val) {
        return true;
      }
    }
    return false;
  };

  /*兼容低版本ie*/
  this.isInArray = function (arr, value) {
    if (arr.indexOf && typeof(arr.indexOf) == 'function') {
      var index = arr.indexOf(value);
      if (index >= 0) {
        return true;
      }
    }
    return false;
  };
  /*包含*/
  Array.prototype.contains = function (obj) {
    var index = this.length;
    while (index--) {
      if (this[index] === obj) {
        return true;
      }
    }
    return false;
  };
  Date.prototype.format = function (format) {
    var date = {
      "M+": this.getMonth() + 1,
      "d+": this.getDate(),
      "h+": this.getHours(),
      "m+": this.getMinutes(),
      "s+": this.getSeconds(),
      "q+": Math.floor((this.getMonth() + 3) / 3),
      "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
      format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
      }
    }
    return format;
  };
  /*移除第一次见到*/
  Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
      this.splice(index, 1);
    }
  };


  /*对象深拷贝*/
  this.deepCopy = function (obj) {
    if (typeof obj != 'object' || obj === null || typeof obj === undefined) {
      return obj;
    }

    if (Object.prototype.toString.call(obj) === '[object Array]') {
      var newarr = obj.slice(0)
      return newarr;
    }

    var newobj = {};
    for (var attr in obj) {
      newobj[attr] = self.deepCopy(obj[attr]);
    }
    return newobj;
  };

  this.nonEmptyCheck = function (obj) {
    if (obj !== null && obj !== "" && obj !== undefined && obj !== "undefined") {
      if (typeof(obj) === "object" && obj.length > 0) {
        return true;
      } else if (typeof(obj) === "object" && obj.length <= 0) {
        return false;
      }
      return true;
    } else {
      return false;
    }
  };
  /*确认提示框操作用swal封装*/
  this.swalConfirm = function (title, text, type, resultHandler) {
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
              //if(isConfirm){
              resultHandler(isConfirm);
              //}
              swal.close();
            });
  }

  this.swalOnlyConfirmHasnext = function (title, text, type, resultHandler) {
    swal({
              title             : title,
              text              : text,
              type              : type,
              confirmButtonColor: '#DD6B55',
              confirmButtonText : '下个代办',
              cancelButtonColor : '#3c8dbc',
              cancelButtonText  : '返回',
              showCancelButton  : true,
              showConfirmButton : true,
              closeOnConfirm    : false,
              closeOnCancel     : false
            },
            function (isConfirm) {
              //if(isConfirm){
              resultHandler(isConfirm);
              //}
              swal.close();
            });
  }
  this.swalOnlyConfirm = function (title, text, type, resultHandler) {
    swal({
              title             : title,
              text              : text,
              type              : type,
              confirmButtonColor: '#DD6B55',
              confirmButtonText : '确定',
              cancelButtonColor : '#3c8dbc',
              cancelButtonText  : '返回列表',
              showCancelButton  : false,
              showConfirmButton : true,
              closeOnConfirm    : false,
              closeOnCancel     : false
            },
            function (isConfirm) {
              //if(isConfirm){
              resultHandler(isConfirm);
              //}
              swal.close();
            });
  }

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
              //if(isConfirm){
              resultHandler(isConfirm);
              //}
              //swal.close();
            });
  }


  this.httpFactory = function (postUrl, parameter, callback) {
    dataFactory.getlist(postUrl, 'POST',
            {'Content-type': 'application/json'},
            parameter).then(
            function (d) {
              callback(d);
            }, function (data) {
              console.log(JSON.stringify(data));
            })
  }
  //判断操作系统
  this.getOs = function () {
    var UserAgent = navigator.userAgent.toLowerCase();
    return {
      isIpad         : /ipad/.test(UserAgent),
      isIphone       : /iphone os/.test(UserAgent),
      isAndroid      : /android/.test(UserAgent),
      isWindowsCe    : /windows ce/.test(UserAgent),
      isWindowsMobile: /windows mobile/.test(UserAgent),
      isWin2K        : /windows nt 5.0/.test(UserAgent),
      isXP           : /windows nt 5.1/.test(UserAgent),
      isVista        : /windows nt 6.0/.test(UserAgent),
      isWin7         : /windows nt 6.1/.test(UserAgent),
      isWin8         : /windows nt 6.2/.test(UserAgent),
      isWin81        : /windows nt 6.3/.test(UserAgent),
      isMac          : /mac os/.test(UserAgent)
    };
  }
  //判断浏览器
  this.getBw = function () {
    var UserAgent = navigator.userAgent.toLowerCase();
    console.log("====" + UserAgent);
    return {
      isUc     : /ucweb/.test(UserAgent), // UC浏览器
      //isChrome  : /chrome/.test(UserAgent.substr(-33,6)), // Chrome浏览器
      isChrome : /chrome/.test(UserAgent), // Chrome浏览器
      isFirefox: /firefox/.test(UserAgent), // 火狐浏览器chrome
      isOpera  : /opera/.test(UserAgent),  // Opera浏览器
      isSafire : /safari/.test(UserAgent) && !/chrome/.test(UserAgent), // safire浏览器
      is360    : /360se/.test(UserAgent), // 360浏览器
      isBaidu  : /bidubrowser/.test(UserAgent), // 百度浏览器
      isSougou : /metasr/.test(UserAgent), // 搜狗浏览器
      isIE6    : /msie 6.0/.test(UserAgent), // IE6
      isIE7    : /msie 7.0/.test(UserAgent), // IE7
      isIE8    : /msie 8.0/.test(UserAgent), // IE8
      isIE9    : /msie 9.0/.test(UserAgent), // IE9
      isIE10   : /msie 10.0/.test(UserAgent), // IE10
      isIE11   : /msie 11.0/.test(UserAgent), // IE11
      isLB     : /lbbrowser/.test(UserAgent), // 猎豹浏览器
      isWX     : /micromessenger/.test(UserAgent), // 微信内置浏览器
      isQQ     : /qqbrowser/.test(UserAgent) // QQ浏览器

      //trident: u.indexOf('Trident') > -1, //IE内核
      //presto: u.indexOf('Presto') > -1, //opera内核
      //webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
      //gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
      //mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
      //ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      //android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
      //iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
      //iPad: u.indexOf('iPad') > -1, //是否iPad
      //webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
      //weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
      //qq: u.match(/\sQQ/i) == " qq" //是否QQ
    };
  }
  //判断操作系统是否是win7
  this.isWindows = function () {
    return this.getOs().isWin7;
  }
  /***************************************wps操作封装Start***********************/
  this.initWindows = function (tagID, width, height) {
    var iframe;
    var obj;
    iframe = document.getElementById(tagID);
    var codes = [];
    codes.push('<object id=DocFrame1 height=' + height + ' width=' + width + ' ');
    codes.push('data=data:application/x-oleobject;base64,7Kd9juwHQ0OBQYiirbY6XwEABAA7DwMAAgAEAB0AAAADAAQAgICAAAQABAD///8ABQBcAFgAAABLAGkAbgBnAHMAbwBmAHQAIABBAGMAdABpAHYAZQBYACAARABvAGMAdQBtAGUAbgB0ACAARgByAGEAbQBlACAAQwBvAG4AdAByAG8AbAAgADEALgAwAAAA ');
    codes.push('classid=clsid:8E7DA7EC-07EC-4343-8141-88A2ADB63A5F viewastext=VIEWASTEXT></object> ');
    iframe.innerHTML = codes.join("");
    obj = document.getElementById("DocFrame1");
    //以下方法二选一
    //添加事件方法1
    /*var fn = function(){
    function obj::OnRequireSave(){
        alert("用户请求保存文档");
    }

    function obj::OnDocumentOpened(){
        alert("文档打开");
    }

    function obj::OnDocumentCopy(){
        alert("用户复制");
    }

    function obj::OnDocumentBeforePrint(){
        alert("用户打印");

    }

    function obj::OnDocumentBeforeSave(){
        alert("用户保存");
    }
    };
    fn();*/
    //添加事件方法2
    if (obj.attachEvent) {
      console.log("attachEvent...");
      obj.attachEvent('OnRequireSave', function () {
        alert("用户请求保存文档");
        console.log("OnRequireSave..........222222222.....");
      });
    } else {
      console.error("该版本ie不支持attachEvent事件，请设置<meta http-equiv='X-UA-Compatible' content='IE=10' />");
    }
    return obj;
  }

  this.initLinux = function (tagID, w, h) {
    /*/opt/kingsoft/wps-office/office6/mui/default/templates/Normal.dotm在容器根目录模板*/
    var iframe;
    var obj;
    iframe = document.getElementById(tagID);
    var codes = [];
    //codes.push("");
    codes.push("<object  name='webwps' id='webwps_id' type='application/x-wps'  data='opt/kingsoft/wps-office/office6/mui/default/templates/Normal.dotm'  width='100%'  height='100%'> <param name='Enabled' value='1' />  </object>");

    iframe.innerHTML = codes.join("");
    obj = document.getElementById("webwps_id");


    window.onbeforeunload = function () {
      obj.Application.Quit();
    };


    //解决新建之后立马能输入--改为手动调用

    /*window.onblur = function () {
        console.log("onblur");
        obj.sltReleaseKeyboard();
    };


    window.onresize = function () {
        console.log("ondrag");
        obj.sltReleaseKeyboard();
    };*/


    return obj;
  }
  this.InitFrame = function (DocFrame, obj, app, tagID, width, height) {
    /*if(this.getBw.isIE10||this.getBw.isIE11){
        DocFrame = this.initWindows("wpsContent", "90%", "90%");
    }else{*/
    obj = this.initLinux(tagID, width, height);
    var Interval_control = setInterval(
            function () {
              app = obj.Application;
              if (app && app.IsLoad()) {
                clearInterval(Interval_control);
                createDocument();
              }
            }, 500);
    /*}*/
    //需要隐藏文件的平台可以在这里调用
    //DocFrame.MenuItems &= ~MenuItems.FILE;
  }
  //打开wps
  this.openWps = function (DocFrame, obj, app, tagID, width, height) {
    //console.log(this.getBw.isIE10+"===="+this.getBw.isIE11);
    if (this.isWindows()) {
      DocFrame = this.initWindows(tagID, width, height);
      return DocFrame;
    } else {
      //this.InitFrame(DocFrame,obj,app,tagID, width, height);
      obj = this.initLinux(tagID, width, height);
      return obj;
    }
    console.log('打开wps');
  }
  //创建文档
  this.createDocument = function (DocFrame, app) {
    if (this.isWindows()) {
      DocFrame.createDocument("uot");
    } else {
      app.createDocument("wps");
    }
  }
  this.FullScreen = function (DocFrame, app) {
    if (this.isWindows()) {
      DocFrame.FullScreen();
    } else {
      app.FullScreen();
    }
  }
  this.openDocumentRemote = function (DocFrame, app, url, isOnlyRead) {
    if (this.isWindows()) {
      return DocFrame.openDocumentRemote(url, isOnlyRead);
    } else {
      return app.openDocumentRemote(url, isOnlyRead);
    }
  }

  this.setDocumentField = function (DocFrame, app, fieldName, value) {
    if (this.isWindows()) {
      return DocFrame.setDocumentField(fieldName, value);
    } else {
      return app.setDocumentField(fieldName, value);
    }
  }

  this.insertDocument = function (DocFrame, app, fieldName, docUrl) {
    if (this.isWindows()) {
      return DocFrame.insertDocument(fieldName, docUrl);
    } else {
      return app.insertDocument(fieldName, docUrl);
    }
  }


  this.saveURL = function (DocFrame, app, saveUrl, name) {
    if (this.isWindows()) {
      return DocFrame.saveURL(saveUrl, name);
    } else {
      return app.saveURL(saveUrl, name);
    }
  }


});






