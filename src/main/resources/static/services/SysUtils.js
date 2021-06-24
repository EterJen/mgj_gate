myApp.service('SysUtils', function (dataFactory, ENV, $state, $timeout, $http) {
    /*cc*/
    var self = this;

    this.remoteDownload = function (simpleFile) {
        if (!self.notEmpty(simpleFile, ['downloadUrl'])) {
            simpleFile.downloadUrl = ENV.serverUri + "/fileOperation/trustedRequest/remoteDownload";
        }
        var form = $('<form method = "POST"  action = "' + simpleFile.downloadUrl + '">');
        $.each(simpleFile, function (k, v) {
            form.append($('<input type="hidden" name="' + k + '" value="' + v + '">'))
        });
        $('body').append(form);
        form.submit();
        // form.remove();
    };

    this.simpleInterval = function (timeout, bzFunc) {
        var timer = setTimeout(function () {
            bzFunc();
            timer = setTimeout(arguments.callee, timeout)//再次调用
        }, timeout)
    };

    /*带中文字符串长度转换*/
    this.cStrLength = function (str) {
        return str.replace(/[\u0391-\uFFE5]/g, "aa").length;   //先把中文替换成两个字节的英文，在计算长度
    };
    /*带中文字符串截取 基于英文字符 一个中文占两个英文字符*/
    this.cSubstr = function (str, from, len) {
        var blen = len;
        for (i = 0; i < len; i++) {
            if ((str.charCodeAt(i) & 0xff00) != 0) {
                blen -= 0.5;
            }
        }
        return str.substr(from, blen);
    };

    this.get_content_wrapper = function () {
        var window_height = $(window).height();
        console.log(window_height - $('.main-header').outerHeight(true) - ($('body').outerHeight(true) - $('body').height()));
        // return window_height-$('.main-header').outerHeight(true)-($('html').innerHeight()-$('html').height());
        return window_height - $('.main-header').outerHeight(true) - ($('body').outerHeight(true) - $('body').height());
    }
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

    this.requestByJsonSync = function (url, jsonObject, successFunc) {
        $(".flyover").show();
        $.ajax({
            type: "POST",
            async: false,
            url: ENV.localapi + url,
            beforeSend: function (request) {
                request.setRequestHeader("Content-type", "application/json");
                //request.setRequestHeader("Authorization", "Bearer " + $cookies.getObject('user').token);
            },
            dataType: 'json',
            data: JSON.stringify(jsonObject),
            success: function (resultInfo) {
                $(".flyover").hide();
                self.handleResultWithResultInfo(resultInfo, {}, successFunc);
            },
            error: function (XMLResponse) {
                $(".flyover").hide();
                console.log(JSON.stringify(XMLResponse));
            }
        })
    }

    this.requestByOaJsonSync = function (fullUrl, jsonObject, successFunc) {
        $(".flyover").show();
        $.ajax({
            type: "POST",
            async: false,
            dataType: 'json',
            url: fullUrl,
            beforeSend: function (request) {
                request.setRequestHeader("Content-type", "application/json");
                //request.setRequestHeader("Authorization", "Bearer " + $cookies.getObject('user').token);
            },
            //dataType: 'json',
            data: JSON.stringify(jsonObject),
            success: function (resultInfo) {
                $(".flyover").hide();
                // successFunc(resultInfo);
                self.handleResultWithResultInfo(resultInfo, {}, successFunc);
                //self.handleResultWithResultInfo(resultInfo, {}, successFunc);
            },
            error: function (XMLResponse) {
                $(".flyover").hide();
                //successFunc(XMLResponse);
                // self.handleResultWithResultInfo(resultInfo, {}, successFunc);
                console.log(JSON.stringify(XMLResponse));
            }
        })
    }
    this.commonPost = function (url, jsonObject, successFunc, ajaxParameter) {
        var akCorsToken = self.getUrlParamByName("akCorsToken");
        $(".flyover").show();
        ajaxBody = {
            type: "POST",
            url: ENV.serverUri + url,
            beforeSend: function (request) {
                request.setRequestHeader("Content-type", "application/json");
                if (self.notEmpty(akCorsToken, [])) {
                    request.setRequestHeader("Authorization", "akCorsToken " + akCorsToken);
                }
                //request.setRequestHeader("Authorization", "Bearer " + $cookies.getObject('user').token);
            },
            dataType: 'json',
            data: JSON.stringify(jsonObject),
            success: function (resultInfo) {
                $(".flyover").hide();
                self.handleResultWithResultInfo(resultInfo, {}, successFunc);
            },
            error: function (XMLResponse) {
                $(".flyover").hide();
                console.log(JSON.stringify(XMLResponse));
            }
        };
        if (self.notEmpty(ajaxParameter, [])) {
            Object.keys(ajaxParameter).forEach(function (key) {
                ajaxBody[key] = ajaxParameter[key];
            });
        }
        $.ajax(ajaxBody);
    };


    this.fileUpload = function (url, fd, successFunc) {
        $.ajax({
            url: ENV.serverUri + url,
            data: fd,
            processData: false, //因为data值是FormData对象，不需要对数据做处理。
            contentType: false,
            type: "POST",
            async: false,
            success: function (resultInfo) {
                $(".flyover").hide();
                self.handleResultWithResultInfo(resultInfo, {}, successFunc);
            },
            error: function (XMLResponse) {
                $(".flyover").hide();
                console.log(JSON.stringify(XMLResponse));
            }
        });
    };

    this.parseFiel = function (orinName) {
        var ret = {};
        ret.name = orinName;
        ret.ext = '';
        suffixIdx = orinName.lastIndexOf(".");
        if (suffixIdx > 0) {
            ret.name = orinName.substring(0, suffixIdx);
            ret.ext = orinName.substring(suffixIdx+1);
        }
        return ret;
    }

    this.querySysTime = function (pattern, callbac) {
        self.requestByJson("/comonDate/trustedRequest/today", pattern, function (res) {
            callbac(res);
        });

    };

    this.requestByJson = function (url, jsonObject, successFunc) {
        var akCorsToken = self.getUrlParamByName("akCorsToken");
        $(".flyover").show();
        $.ajax({
            type: "POST",
            url: ENV.serverUri + url,
            beforeSend: function (request) {
                request.setRequestHeader("Content-type", "application/json");
                if (self.notEmpty(akCorsToken, [])) {
                    request.setRequestHeader("Authorization", "akCorsToken " + akCorsToken);
                }
                //request.setRequestHeader("Authorization", "Bearer " + $cookies.getObject('user').token);
            },
            dataType: 'json',
            data: JSON.stringify(jsonObject),
            success: function (resultInfo) {
                $(".flyover").hide();
                self.handleResultWithResultInfo(resultInfo, {}, successFunc);
            },
            error: function (XMLResponse) {
                $(".flyover").hide();
                console.log(JSON.stringify(XMLResponse));
            }
        })
    };

    this.requestByJson2 = function (url, jsonObject, successFunc) {
        var akCorsToken = self.getUrlParamByName("akCorsToken");
        $(".flyover").show();
        $.ajax({
            type: "POST",
            async: false,
            url: ENV.serverUri + url,
            beforeSend: function (request) {
                request.setRequestHeader("Content-type", "application/json");
                if (self.notEmpty(akCorsToken, [])) {
                    request.setRequestHeader("Authorization", "akCorsToken " + akCorsToken);
                }
                //request.setRequestHeader("Authorization", "Bearer " + $cookies.getObject('user').token);
            },
            dataType: 'json',
            data: JSON.stringify(jsonObject),
            success: function (resultInfo) {
                $(".flyover").hide();
                self.handleResultWithResultInfo(resultInfo, {}, successFunc);
            },
            error: function (XMLResponse) {
                $(".flyover").hide();
                console.log(JSON.stringify(XMLResponse));
            }
        })
    };

    this.requestByJsonNoResultHandle = function (url, jsonObject, successFunc) {
        $(".flyover").show();
        $.ajax({
            type: "POST",
            url: ENV.localapi + url,
            beforeSend: function (request) {
                request.setRequestHeader("Content-type", "application/json");
                //request.setRequestHeader("Authorization", "Bearer " + $cookies.getObject('user').token);
            },
            dataType: 'json',
            data: JSON.stringify(jsonObject),
            success: function (resultInfo) {
                $(".flyover").hide();
                successFunc(resultInfo);
            },
            error: function (XMLResponse) {
                $(".flyover").hide();
                console.log(JSON.stringify(XMLResponse));
            }
        })
    };


    this.postWhithBackInf = function (url, jsonObject, successFunc) {
        $(".flyover").show();
        $.ajax({
            type: "POST",
            url: ENV.localapi + url,
            beforeSend: function (request) {
                request.setRequestHeader("Content-type", "application/json");
                //request.setRequestHeader("Authorization", "Bearer " + $cookies.getObject('user').token);
            },
            dataType: 'json',
            data: JSON.stringify(jsonObject),
            success: function (resultInfo) {
                $(".flyover").hide();
                self.handleResultWithBackinfo(resultInfo, {}, successFunc);
            },
            error: function (XMLResponse) {
                $(".flyover").hide();
                self.swalForTips("错误", JSON.stringify(XMLResponse.responseJSON), "error", function (isConfirm) {
                });
                console.log(JSON.stringify(XMLResponse));
            }
        })
    }


    /*自动校验登陆权限 无自动回显*/
    this.silenceWithAuthAjax = function (url, jsonObject, successFunc) {
        var akCorsToken = self.getUrlParamByName("akCorsToken");

        $(".flyover").show();
        $.ajax({
            type: "POST",
            url: ENV.localapi + url,
            beforeSend: function (request) {
                request.setRequestHeader("Content-type", "application/json");

//        request.setRequestHeader("Authorization", "Bearer " + $cookies.getObject('user').token);
                if (self.notEmpty(akCorsToken, [])) {
                    request.setRequestHeader("Authorization", "akCorsToken " + akCorsToken);
                }
            },
            dataType: 'json',
            data: JSON.stringify(jsonObject),
            success: function (resultInfo) {
                $(".flyover").hide();
                self.silenceResultInfoCallBack(resultInfo, {}, successFunc);
            },
            error: function (XMLResponse) {
                $(".flyover").hide();
                self.swalForTips("错误", JSON.stringify(XMLResponse.responseJSON), "error", function (isConfirm) {
                });
                console.log(JSON.stringify(XMLResponse));
            }
        })
    };

    this.handleResultWithBackinfo = function (resultInfo, params, callBack) {
        if (resultInfo.resultType == 'error' || resultInfo.resultType == 'fail') {
            this.swalForTips("错误", resultInfo.message, "error", function (isConfirm) {
            });
        } else if (resultInfo.resultType == 'noUriAuth') {
            window.location.href = ENV.localapi + '/mng';
        } else if (resultInfo.resultType == 'success') {
            this.swalForTips("成功", resultInfo.message, "success", function (isConfirm) {
            });
            callBack(resultInfo);
        } else if (resultInfo.resultType == 'sessionInvalid' || resultInfo.resultType == 'notLogin') {
            this.swalForTips("错误", resultInfo.message, "error", function (isConfirm) {
            });
        }
    };

    this.handleResultWithResultInfo = function (resultInfo, params, callBack) {
        if (resultInfo.resultType == 'error' || resultInfo.resultType == 'fail') {
            this.swalForTips("错误", resultInfo.message, "error", function (isConfirm) {
            });
            $timeout(function () {
                swal.close();
                $('#loginUserId').focus();
            }, 1200);
        } else if (resultInfo.resultType == 'needDmyj') {
            this.swalForTips("错误", resultInfo.message, "error", function (isConfirm) {
            })
            callBack(resultInfo);
        } else if (200 == resultInfo.code || resultInfo.resultType == 'success' || resultInfo.resultType == 'saveFormValidFail') {
            callBack(resultInfo);
        } else if (resultInfo.resultType == 'sessionInvalid' || resultInfo.resultType == 'notLogin' || resultInfo.resultType == 'noUriAuth') {

            window.location.href = ENV.localapi + '/mng';


        } else if (resultInfo.resultType == 'info') {
            this.swalForTips("提示", resultInfo.message, "info", function (isConfirm) {
            });
        }
    };

    this.silenceResultInfoCallBack = function (resultInfo, params, callBack) {
        if (resultInfo.resultType == 'success' || resultInfo.resultType == 'info') {
            callBack(resultInfo);
        } else if (resultInfo.resultType == 'error' || resultInfo.resultType == 'fail') {
            this.swalForTips("错误", resultInfo.message, "error", function (isConfirm) {
            });
        } else if (resultInfo.resultType == 'sessionInvalid' || resultInfo.resultType == 'notLogin') {

            window.location.href = ENV.localapi + '/mng';
        } else if (resultInfo.resultType == 'noUriAuth') {

            window.location.href = ENV.localapi + '/mng';
        }
    };

    this.loginhandleResult = function (resultInfo, scope, params, callBack) {
        var state = params.state;
        if (resultInfo.resultType == 'success') {
            callBack();
            return;
        } else {
            this.swalForTips("错误", resultInfo.message, "error", function (isConfirm) {
            });
            $timeout(function () {
                $(".flyover").hide();
                scope.loginEnable = true;
                swal.close();
                $('#loginUserId').focus();
            }, 1200);
        }
    }
    this.handleResult = function (resultInfo, params, callBack) {
        $(".flyover").hide();
        var state = params.state;
        if (resultInfo.resultType == 'error' || resultInfo.resultType == 'fail') {
            this.swalForTips("错误", resultInfo.message, "error", function (isConfirm) {
            });
        } else if (resultInfo.resultType == 'success') {
            callBack();
            return;

        } else if (resultInfo.resultType == 'sessionInvalid' || resultInfo.resultType == 'notLogin' || resultInfo.resultType == 'noUriAuth') {
            window.open(ENV.localapi + '/mng', "_self");
            // state.go('login');
        }
    };
    /*服务器登录验证*/
    this.handleAction = function (bean, resultHandler) {
        if (bean.status && bean.status === 401) {
            this.swalForTips("无权访问", "您没有相应权限或者用户名密码错误！", "error", function (isConfirm) {
            });
        } else if (resultInfo.resultType == 'noUriAuth') {

            window.location.href = ENV.localapi + '/mng';
        } else if (bean.status === 500) {
            this.swalForTips("服务器未开启", "请确认服务器已开启！", "error", function (isConfirm) {
            });
        } else {
            //swal("bean.resultType","bean.message","error");
            resultHandler();
        }
    };
    /*去掉HashKey 手动json映射时需要*/
    this.removeHashKey = function (obj) {
        return angular.copy(obj)
    };

    /**
     *
     * @param fmt 时间格式
     * @param date 时间
     * @returns {*}
     */
    this.dateFtt = function (fmt, date) { //author: meizz
        var o = {
            "M+": date.getMonth() + 1,     //月份
            "d+": date.getDate(),     //日
            "h+": date.getHours(),     //小时
            "m+": date.getMinutes(),     //分
            "s+": date.getSeconds(),     //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds()    //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

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
            if (object == null || object == undefined || object == "") {
                return true;
            } else {
                return false;
            }
        }
    };

    this.map2Ary = function (map) {
        var list = [];
        for (var key in map) {
            list.push([key, map[key]]);
        }
        return list;
    };

    this.PrefixInteger = function (num, length) {
        return (Array(length).join('0') + num).slice(-length);
    }
    this.strNumCompare = function (x, y) {
        if (x < y) {
            return -1;
        } else if (x > y) {
            return 1;
        } else {
            return 0;
        }
    }

    /*数字数组压缩*/
    this.numArrCompress = function (baseArr) {
        var resultArr = [];
        if (!self.notEmpty(baseArr, [])) {
            return resultArr;
        }
        baseArr.forEach(function (v) {
            resultArr.push(parseInt(v, 10))
        });
        baseArr = resultArr;
        baseArr.sort(self.strNumCompare);
        resultArr = [];

        resultArr.push(baseArr[0]);
        baseArr.forEach(function (v, i, a) {
            if (i > 0) {
                var preNum = a[i - 1]
                if (1 != (v - preNum)) {
                    resultArr.push(preNum);
                    resultArr.push(v);
                }
            }
        });
        resultArr.push(baseArr[baseArr.length - 1]);

        resultArr.sort(self.strNumCompare);
        return resultArr;
    }
    /*数字数组解压*/
    this.numArrDeCompress2StrArr = function (baseArr, length) {

        var resultArr = [];
        baseArr.forEach(function (v, i, a) {
            if (1 == (i % 2)) {
                console.log(i);
                var preNum = a[i - 1];
                for (i = preNum; i <= v; i++) {
                    resultArr.push(i);
                }
            }
        });
        resultArr2 = [];

        resultArr.forEach(function (v) {
            resultArr2.push(self.PrefixInteger(v, length));
        });
        return resultArr2;
    };
    this.sysDate = function () {
        var sysDate;
        $.ajax({
            type: "POST",
            async: false,
            url: ENV.localapi + "/coreUser/sysDate",
            beforeSend: function (request) {
                request.setRequestHeader("Content-type", "application/json");
            },
            dataType: 'json',
            success: function (resultInfo) {
                sysDate = resultInfo.bean;
            },
            error: function (XMLResponse) {
                console.log(JSON.stringify(XMLResponse));
            }
        })
        return sysDate;
    };
    /*空判断*/
    /*
    * console.log(Object.prototype.toString.call("jerry"));//[object String]
  console.log(Object.prototype.toString.call(12));//[object Number]
  console.log(Object.prototype.toString.call(true));//[object Boolean]
  console.log(Object.prototype.toString.call(undefined));//[object Undefined]
  console.log(Object.prototype.toString.call(null));//[object Null]
  console.log(Object.prototype.toString.call({name: "jerry"}));//[object Object]
  console.log(Object.prototype.toString.call(function(){}));//[object Function]
  console.log(Object.prototype.toString.call([]));//[object Array]
  console.log(Object.prototype.toString.call(new Date));//[object Date]
  console.log(Object.prototype.toString.call(/\d/));//[object RegExp]
  function Person(){};
  console.log(Object.prototype.toString.call(new Person));//[object Object]*/
    /* 变量undefined、null 对象空 数组空 字符串空*/
    this.notEmpty = function (obj, attr) {
        if (obj === null || obj === undefined || obj === "") {
            return false;
        } else if (Object.prototype.toString.call(obj) === '[object Array]') {
            if (attr == false) {
                return !(obj == false); //数组非空
            } else {
                var newObj = obj[attr[0]];
                var newAttr = attr.slice(1);
                return self.notEmpty(newObj, newAttr);
            }
        } else if (Object.prototype.toString.call(obj) === '[object Object]') {
            var arr = Object.getOwnPropertyNames(obj);
            if (arr.length == 0) {
                return false;
            } else if (attr == false) {
                return true;
            } else {
                var newObj = obj[attr[0]];
                var newAttr = attr.slice(1);
                return self.notEmpty(newObj, newAttr);
            }
        } else if (Object.prototype.toString.call(obj) === '[object Boolean]') {
            if (!obj) {
                return false;
            }
        }

        return true;
    };

    this.strIsTrue = function (obj, attr) {
        if (obj === null || obj === undefined) {
            return false;
        } else if (Object.prototype.toString.call(obj) === '[object String]') {
            if ("true" === obj) {
                return true;
            }
        } else if (Object.prototype.toString.call(obj) === '[object Boolean]') {
            if (!obj) {
                return false;
            }
        } else if (Object.prototype.toString.call(obj) === '[object Array]') {
            if (attr == false) {
                return false;
            } else {
                var newObj = obj[attr[0]];
                var newAttr = attr.slice(1);
                return self.strIsTrue(newObj, newAttr);
            }
        } else if (Object.prototype.toString.call(obj) === '[object Object]') {
            var arr = Object.getOwnPropertyNames(obj);
            if (arr.length == 0) {
                return false;
            } else if (attr == false) {
                return false;
            } else {
                var newObj = obj[attr[0]];
                var newAttr = attr.slice(1);
                return self.strIsTrue(newObj, newAttr);
            }
        }

        return true;
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
        if (arr.indexOf && typeof (arr.indexOf) == 'function') {
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
    Date.prototype.format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
            "H+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        var week = {
            "0": "/u65e5",
            "1": "/u4e00",
            "2": "/u4e8c",
            "3": "/u4e09",
            "4": "/u56db",
            "5": "/u4e94",
            "6": "/u516d"
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        if (/(E+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
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

    /*确认提示框操作用swal封装*/
    this.swalConfirm = function (title, text, type, resultHandler) {
        swal({
                title: title,
                text: text,
                type: type,
                confirmButtonColor: '#8CD4F5',
                confirmButtonText: '确定',
                cancelButtonColor: '#3c8dbc',
                cancelButtonText: '取消',
                showCancelButton: true,
                showConfirmButton: true,
                closeOnConfirm: false,
                closeOnCancel: false
            },
            function (isConfirm) {
                resultHandler(isConfirm);
                swal.close();
            });
    }
    this.moveEnd = function (obj) {
        obj.focus();
        var len = obj.value.length;
        alert(len);
        if (document.selection) {
            var sel = obj.createTextRange();
            sel.moveStart('character', len); //设置开头的位置
            sel.collapse();
            sel.select();
        } else if (typeof obj.selectionStart == 'number' && typeof obj.selectionEnd == 'number') {
            obj.selectionStart = obj.selectionEnd = len;
        }
    }

    this.nonEmptyCheck = function (obj) {
        if (obj !== null && obj !== "" && obj !== undefined && obj !== "undefined") {
            if (typeof (obj) === "object" && obj.length > 0) {
                return true;
            } else if (typeof (obj) === "object" && obj.length <= 0) {
                return false;
            }
            return true;
        } else {
            return false;
        }
    };

    this.judgeSuffix = function (name) {
        return name.substring(name.lastIndexOf(".") + 1, name.length);
    };

    /**
     * 计算百分比
     * @param   {number} num   分子
     * @param   {number} total 分母
     * @returns {number} 返回数百分比
     */
    this.percentage = function Percentage(num, total) {
        if (num == 0 || total == 0) {
            return 0;
        }
        return (Math.round(num / total * 10000) / 100.00);// 小数点后两位百分比
    };

    this.docOpentMap = {
        "pdf": "pdf",
        "ofd": "ofd",

        "doc": "wps",
        "docx": "wps",
        "wps": "wps",
        "txt": "wps",
        "sql": "wps",


        "xls": "excl",
        "xlsx": "excl",
        "et": "excl",

        "ppt": "ppt",
        "pptx": "ppt",
        "dps": "ppt",
        "dpt": "ppt",

        "bmp": "image",
        "gif": "image",
        "jpeg": "image",
        "png": "image",
        "jpg": "image",
        "tif": "image",
        "pcx": "image",
        "tga": "image",


        "wmv": "video",
        "avi": "video",
        "dat": "video",
        "asf": "video",
        "mpeg": "video",
        "mpg": "video",
        "rm": "video",
        "rmvb": "video",
        "ram": "video",
        "flv": "video",
        "mp4": "video",
        "3gp": "video",
        "mov": "video",
        "divx": "video",
        "dv": "video",
        "vob": "video",
        "mkv": "video",
        "qt": "video",
        "cpk": "video",
        "fli": "video",
        "flc": "video",
        "f4v": "video",
        "m4v": "video",
        "mod": "video",
        "m2t": "video",
        "swf": "video",
        "webm": "video",
        "mts": "video",
        "m2ts": "video",
    };

    /*填充字符value原值，digit填充位数，character填充字符*/
    this.fillCharacter = function (value, digit, character) {
        var length = 0;
        var str = "";
        if (typeof (value) === "string") {
            length = value.length;
        } else if (typeof (value) === "number") {
            length = value.toString().length;
        }
        if (length === 0)
            return value;
        if (digit - length > 0) {
            for (var i = 0; i < (digit - length); i++) {
                str += character;
            }
            value = str + value;
        }
        return value;
        //console.log(typeof(value)+"="+length);
    };

    Array.prototype.remove = function (val) {
        var index = this.indexOf(val);
        if (index > -1) {
            this.splice(index, 1);
        }
    };

    /*
  * 给传入数组排序，排序后相同值相邻，
  * 然后遍历时,新数组只加入不与前一值重复的值。
  * 会打乱原来数组的顺序
  * */
    this.uniq = function (arr) {
        var hash = [];
        for (var i = 0; i < arr.length; i++) {
            for (var j = i + 1; j < arr.length; j++) {
                if (arr[i] === arr[j]) {
                    ++i;
                }
            }
            hash.push(arr[i]);
        }
        return hash;
    };
    this.arrChange = function (a, b) {
        for (var i = 0; i < b.length; i++) {
            for (var j = 0; j < a.length; j++) {
                if (a[j] == b[i]) {//如果是id相同的，那么a[ j ].id == b[ i ].id
                    a.splice(j, 1);
                    j = j - 1;
                }
            }
        }
        return a;
    };


    this.swalForTips = function (title, text, type, resultHandler) {
        swal({
                title: title,
                text: text,
                type: type,
                confirmButtonColor: '#8CD4F5',
                confirmButtonText: '确定',
                showConfirmButton: true,
                closeOnConfirm: false,
            },
            function (isConfirm) {
                //if(isConfirm){
                resultHandler(isConfirm);
                //}
                swal.close();
            });
        $timeout(function () {
            swal.close();
            $('#loginUserId').focus();
        }, 1800);
    }

    this.initPaswordDisTips = function (title, text, type, resultHandler) {
        swal({
                title: title,
                text: text,
                type: type,
                confirmButtonColor: '#e97066',
                confirmButtonText: '去修改',
                cancelButtonColor: '#3c8dbc',
                cancelButtonText: '暂不改',
                showCancelButton: true,
                showConfirmButton: true,
                closeOnConfirm: false,
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
                title: title,
                text: text,
                type: type,
                confirmButtonColor: '8CD4F5',
                confirmButtonText: '下个待办',
                cancelButtonColor: '#3c8dbc',
                cancelButtonText: '返回',
                showCancelButton: true,
                showConfirmButton: true,
                closeOnConfirm: false,
                closeOnCancel: false
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
                title: title,
                text: text,
                type: type,
                confirmButtonColor: "#8CD4F5",
                confirmButtonText: '确定',
                cancelButtonColor: '#3c8dbc',
                cancelButtonText: '返回列表',
                showCancelButton: false,
                showConfirmButton: true,
                closeOnConfirm: false,
                closeOnCancel: false
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
                title: title,
                text: text,
                type: type,
                confirmButtonColor: '#8CD4F5',
                confirmButtonText: '确定',
                cancelButtonColor: '#3c8dbc',
                cancelButtonText: '取消',
                showCancelButton: true,
                showConfirmButton: true,
                closeOnConfirm: false,
                closeOnCancel: false
            },
            function (isConfirm) {
                //if(isConfirm){
                resultHandler(isConfirm);
                //}
                //swal.close();
            });
    }

    this.swalConfirmNotCloseBanJie = function (title, text, type, resultHandler) {
        swal({
                title: title,
                text: text,
                type: type,
                confirmButtonColor: '#8CD4F5',
                confirmButtonText: '确定办结',
                cancelButtonColor: '#3c8dbc',
                cancelButtonText: '取消',
                showCancelButton: true,
                showConfirmButton: true,
                closeOnConfirm: false,
                closeOnCancel: false
            },
            function (isConfirm) {
                //if(isConfirm){
                resultHandler(isConfirm);
                //}
                //swal.close();
            });
    }

    this.swalOnlyShow = function (title, text, type) {
        swal({
            title: title,
            text: text,
            type: type,
            showCancelButton: false,
            showConfirmButton: false,
            closeOnConfirm: true,
            closeOnCancel: true
        });
    }

    /*swal封装定时关闭对话框，不用点击确认按钮*/
    this.swalTimer = function (title, text, type) {
        swal({
            title: title,
            text: text,
            type: type,
            timer: 900,
            showConfirmButton: false
        });
    }

    this.makeObj = function (obj, arr) {
        arr.forEach(function (field) {
            obj = obj[field];
        });
        return obj;
    }
    /*对于密级特殊处理，后面需求可能会变*/
    this.secretLevelIsNull = function (obj, arr) {
        if (self.notEmpty(obj, arr)) {
            value = self.makeObj(obj, arr);
            if (value == "无") {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
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

    this.containExt = function (value, type) {
        var wpsExts = ["doc", "docx", "wps", "txt"];
        var ofdExts = ["ofd", "pdf"];
        var exclExts = ["xls", "xlsx", "et"];
        if (type === "wps") {
            return wpsExts.contain(value);
        } else if (type === "ofd") {
            return ofdExts.contain(value);
        } else if (type === "excl") {
            return exclExts.contain(value);
        }
    }
    //判断操作系统
    this.getOs = function () {
        var UserAgent = navigator.userAgent.toLowerCase();
        // console.log(UserAgent);
        return {
            isIpad: /ipad/.test(UserAgent),
            isIphone: /iphone os/.test(UserAgent),
            isAndroid: /android/.test(UserAgent),
            isWindowsCe: /windows ce/.test(UserAgent),
            isWindowsMobile: /windows mobile/.test(UserAgent),
            isWin2K: /windows nt 5.0/.test(UserAgent),
            isXP: /windows nt 5.1/.test(UserAgent),
            isVista: /windows nt 6.0/.test(UserAgent),
            isWin7: /windows nt 6.1/.test(UserAgent),
            isWin8: /windows nt 6.2/.test(UserAgent),
            isWin81: /windows nt 6.3/.test(UserAgent),
            isWin10: /windows nt 10.0/.test(UserAgent),
            isMac: /mac os/.test(UserAgent)
        };
    }
    //判断浏览器
    this.getBw = function () {
        var UserAgent = navigator.userAgent.toLowerCase();
        console.log("====" + UserAgent);
        return {
            isUc: /ucweb/.test(UserAgent), // UC浏览器
            //isChrome  : /chrome/.test(UserAgent.substr(-33,6)), // Chrome浏览器
            isChrome: /chrome/.test(UserAgent), // Chrome浏览器
            isFirefox: /firefox/.test(UserAgent), // 火狐浏览器chrome
            isOpera: /opera/.test(UserAgent),  // Opera浏览器
            isSafire: /safari/.test(UserAgent) && !/chrome/.test(UserAgent), // safire浏览器
            is360: /360se/.test(UserAgent), // 360浏览器
            isBaidu: /bidubrowser/.test(UserAgent), // 百度浏览器
            isSougou: /metasr/.test(UserAgent), // 搜狗浏览器
            isIE6: /msie 6.0/.test(UserAgent), // IE6
            isIE7: /msie 7.0/.test(UserAgent), // IE7
            isIE8: /msie 8.0/.test(UserAgent), // IE8
            isIE9: /msie 9.0/.test(UserAgent), // IE9
            isIE10: /msie 10.0/.test(UserAgent), // IE10
            isIE11: /msie 11.0/.test(UserAgent), // IE11
            isLB: /lbbrowser/.test(UserAgent), // 猎豹浏览器
            isWX: /micromessenger/.test(UserAgent), // 微信内置浏览器
            isQQ: /qqbrowser/.test(UserAgent) // QQ浏览器

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
        return this.getOs().isWin7 || this.getOs().isWin10;
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

    this.initLinuxEt = function (tagID) {
        /*if (office != undefined)
            return;*/
        var iframe;
        iframe = document.getElementById(tagID);
        var codes = [];
        codes.push('<object name="rpcet" id="rpcet_id" type="application/x-et" wpsshieldbutton="false" data="opt/kingsoft/wps-office/office6/mui/default/templates/newfile.et" width="100%" height="100%">');
        codes.push('<param name="quality" value="high" />');
        codes.push('<param name="bgcolor" value="#ffffff" />');
        codes.push('<param name="Enabled" value="1" />');
        codes.push('<param name="allowFullScreen" value="true" />');
        codes.push('</object>');
        iframe.innerHTML = codes.join("");
        office = document.getElementById("rpcet_id");
        /*window.onbeforeunload = function() {
                        obj.Application.Quit();
                    }; */
        return office;
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
            if (value === null)
                return DocFrame.setDocumentField(fieldName, fieldName);
            return DocFrame.setDocumentField(fieldName, value);
        } else {
            if (value === null)
                return app.setDocumentField(fieldName, fieldName);
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

    this.getAllDocumentField = function (DocFrame, app) {
        if (this.isWindows()) {
            return DocFrame.getAllDocumentField();
        } else {
            return app.getAllDocumentField();
        }
    }

    this.insertDocumentField = function (DocFrame, app, field) {
        if (this.isWindows()) {
            return DocFrame.insertDocumentField(field);
        } else {
            return app.insertDocumentField(field);
        }
    }

    this.showDocumentField = function (DocFrame, app, field, enable) {
        if (this.isWindows()) {
            return DocFrame.showDocumentField(field, enable);
        } else {
            return app.showDocumentField(field, enable);
        }
    }

    this.deleteDocumentField = function (DocFrame, app, field) {
        if (this.isWindows()) {
            return DocFrame.deleteDocumentField(field);
        } else {
            return app.deleteDocumentField(field);
        }
    }


    this.cursorToDocumentField = function (DocFrame, app, fieldName, value) {
        if (this.isWindows()) {
            return DocFrame.cursorToDocumentField(fieldName, value);
        } else {
            return app.cursorToDocumentField(fieldName, value);
        }
    }

    this.selectGongwen = function (DocFrame, app) {
        if (this.isWindows()) {
            DocFrame.ActiveDocument.ActiveWindow.Selection.SetRange(DocFrame.ActiveDocument.ActiveWindow.Selection.Start - 1, DocFrame.ActiveDocument.ActiveWindow.Selection.End + 1);
            DocFrame.ActiveDocument.ActiveWindow.Selection.Delete();
        } else {
            app.ActiveDocument.ActiveWindow.Selection.SetRange(app.ActiveDocument.ActiveWindow.Selection.Start - 1, app.ActiveDocument.ActiveWindow.Selection.End + 1);
            app.ActiveDocument.ActiveWindow.Selection.Delete();
        }
    }

    this.showDocumentField = function (DocFrame, app, id, type) {
        if (this.isWindows()) {
            DocFrame.showDocumentField(id, type);
        } else {
            app.showDocumentField(id, type);
        }
    }


    this.saveURL = function (DocFrame, app, saveUrl, name) {
        if (this.isWindows()) {
            return DocFrame.saveURL(saveUrl, name);
        } else {
            return app.saveURL(saveUrl, name);
        }
    }

    /*
     * enableRevision打开或者关闭wps修订功能
     * @param value为true打开修订功能，为false关闭功能
     *
     */
    this.enableRevision = function (DocFrame, app, value) {
        if (this.isWindows()) {
            var returnV = DocFrame.enableRevision(value);
            DocFrame.enableRevisionAcceptCommand(false);//禁用工具栏中接受修订按钮
            DocFrame.enableRevisionRejectCommand(false);//禁用拒绝修订按钮
            return returnV;
        } else {
            var returnV = app.enableRevision(value);
            app.enableRevisionAcceptCommand(false);
            app.enableRevisionRejectCommand(false);
            return returnV;
        }
    }

    /*
     * showRevision是否显示修订信息
     * @param number 0显示修订状态。1修订前状态，2修订后状态
     *
     */
    this.showRevision = function (DocFrame, app, number) {
        if (this.isWindows()) {
            return DocFrame.showRevision(number);
        } else {
            return app.showRevision(number);
        }
    }

    /*
     * setUserName设置修订者信息
     * @param usrname 修订者姓名
     *
     */
    this.setUserName = function (DocFrame, app, usrname) {
        if (this.isWindows()) {
            return DocFrame.setUserName(usrname);
        } else {
            return app.setUserName(usrname);
        }
    }

    /*
     * revisionAcceptCommand wps功能-接受对文档所有修订信息
     * @retrun true代表接受成功，false代表没有修订的信息
     */
    this.revisionAcceptCommand = function (DocFrame, app) {
        if (this.isWindows()) {
            if (DocFrame.ActiveDocument.Revisions.Count > 0) {
                DocFrame.ActiveDocument.AcceptAllRevisions;
                return true;
            } else
                return false;
        } else {
            if (app.ActiveDocument.get_Revisions().get_Count() > 0) {
                app.ActiveDocument.AcceptAllRevisions();
                return true;
            } else
                return false;
        }
    }

    /*
     * encapsulationRevision 封装打开正文默认修订设置
     * @retrun true代表接受成功，false代表没有修订的信息
     */
    this.encapsulationRevision = function (DocFrame, app, currNodeIsShowRevise, username) {
        this.enableRevision(DocFrame, app, true);
        if (currNodeIsShowRevise) {
            this.showRevision(DocFrame, app, 0);//0显示修订状态。1修订前状态，2修订后状态
        } else {
            this.showRevision(DocFrame, app, 2);
        }
        this.setUserName(DocFrame, app, username);
    }

    /*
     * closeWps 关闭wps文档
     */
    this.closeWps = function () {
        if (this.isWindows()) {
            DocFrame.close();
        } else {
            app.close();
        }
    }

    /*
     * isDocType 根据文中名称判断返回类型
     * 通知为2，纪要和函为1，其他文中为3
     */
    this.isDocType = function (value) {
        if (this.isEmpty(value)) {
            return 0;
        }
        if (value === "通知") {
            return 2;
        } else if (value === "纪要" || value === "函") {
            return 1;
        } else {
            return 3;
        }

    }

    this.getUri = function () {
        var parsePrifix = "/index.html#!";
        var url = document.location.toString();
        parse_url_str = parsePrifix + "[\/\\w*]*/";
        var parse_url = eval(parse_url_str);
        return parse_url.exec(url)[0].slice(parsePrifix.length - 1);
    }

    this.getUrlParamByName = function (paraName) {
        // var url = window.location.href;
        var url = document.location.toString();
        var arrObj = url.split("?");

        if (arrObj.length > 1) {
            var arrPara = arrObj[1].split("&");
            var arr;

            for (var i = 0; i < arrPara.length; i++) {
                arr = arrPara[i].split("=");

                if (arr != null && arr[0] == paraName) {
                    return arr[1];
                }
            }
            return "";
        } else {
            return "";
        }
    };
    this.corsLogin = function (successCallBack) {
        var operation = this.getUrlParamByName("operation");
        var sessionid = this.getUrlParamByName("sessionid");
        var loginBody = {};
        loginBody.operation = operation;
        loginBody.sessionid = sessionid;
        $(".flyover").show();
        $.ajax({
            type: "POST",
            url: ENV.localapi + "/cors/akGateHost/login",
            beforeSend: function (request) {
                request.setRequestHeader("Content-type", "application/json");
            },
            dataType: 'json',
            data: JSON.stringify(loginBody),
            success: function (resultInfo) {
                $(".flyover").hide();
                successCallBack(resultInfo);
            },
            error: function (XMLResponse) {
                $(".flyover").hide();
                console.log(JSON.stringify(XMLResponse));
            }
        })
    };


    /***************************************wps操作封装end***********************/

});
myApp.directive('ngFileModel', function () {
    return {
        restrict: 'ACE',
        require: 'ngModel',
        link: function (scope, element, attr, ngModel) {
            element.on('change', function () {
                scope.file = this.files[0];
                //console.log(scope.file.name);
                ngModel.$setViewValue(scope.file.name);
                ngModel.$render();
                scope.$apply();
            })
        },
        scope: {
            file: '=ngFileModel'
        }
    }
});

myApp.directive('ngFileNgModel', function () {
    return {
        restrict: 'ACE',
        require: 'ngModel',
        link: function (scope, element, attr, ngModel) {
            element.on('change', function () {
                scope.file = this.files[0];
                //console.log(scope.file.name);
                ngModel.$setViewValue(scope.file.name.substring(0, scope.file.name.lastIndexOf(".")));
                ngModel.$render();
                scope.$apply();
            })
        },
        scope: {
            file: '=ngFileNgModel'
        }
    }
});
myApp.directive('elementLoad', function ($window) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('load', function () {
                scope.$apply(attrs.elementLoad);
            });
        }
    }
});
myApp.directive('ngLastRept', function ($window, $timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            if (scope.$last == true) {
                $timeout(function () {
                    scope.$apply(attrs.ngLastRept);
                });
            }
        }
    }
});

myApp.directive('ngFile', function (SysUtils, $timeout, ENV) {
    return {
        restrict: 'ACE',
        link: function (scope, element) {
            element.on('change', function () {

                var clientFile = this.files[0];
                if (scope.fileUploadBefore) {
                    scope.fileUploadBefore(clientFile)
                }
                if (undefined == clientFile) {
                    return;
                }
                scope.fileUploadProgress.progress = 0;
                scope.$apply();
                $("#simpleProgressModal").modal({
                    backdrop: "static",        //点击空白处不关闭对话框
                    keyboard: false // 按esc键盘不关闭.
                });
                var fileChunkUploadClent = new FileChunkUploadClent(
                    clientFile,
                    ENV.serverUri + "/fileOperation/trustedRequest/chunkUpload/part",
                    ENV.serverUri + "/fileOperation/trustedRequest/chunkUpload/merge",
                    function (status, chunks) {
                        // $('#createdAutomaticallyModal').modal('hide');

                        scope.fileUploadProgress.progress = SysUtils.percentage(status, chunks);
                        console.log(scope.fileUploadProgress.progress);
                        scope.$apply();
                    },
                    function (res) {
                        $('#simpleProgressModal').modal('hide');
                        // $('#createdAutomaticallyModal').modal('show');
                        simpleFile = {
                            showName: clientFile.name,
                            originalName: clientFile.name,
                            uuidName: res.data.relativePath,
                        };
                        SysUtils.requestByJson('/simpleFile/create', simpleFile, function (resultInfo) {
                            scope.file.showName = resultInfo.bean.showName;
                            scope.file.originalName = resultInfo.bean.originalName;
                            scope.file.uuidName = resultInfo.bean.uuidName;
                            scope.file.id = resultInfo.bean.id;
                            scope.$apply();
                        });
                    }
                );
                fileChunkUploadClent.upload();
            });
        },
        scope: {
            file: '=ngFile',
            fileUploadBefore: '=fileUploadBefore',
            fileUploadProgress: '=loadInfo'
        }
    }
});
myApp.directive('ngImgDyn', function ($window, $timeout, ENV) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            attrs.$observe("ngImgDyn", function (html) {
                if (attrs.ngImgDyn) {
                    element.attr('src', ENV.serverUri + "/fileOperation/trustedRequest/remoteRead/" + attrs.ngImgDyn);
                }
            });
        }
    }
});
myApp.directive('ngSetTextarea', function () {
    return {
        restrict: 'ACE',
        /*require : 'ngModel',*/
        link: function (scope, element, attr) {
            var cutLen = attr.ngSetTextarea;
            var arr = [];
            if (cutLen != null && cutLen != "") {
                arr = cutLen.split(".");
            }
            element.on('keyup', function () {
                if (arr.length == 2) {
                    scope[arr[0]][arr[1]] = element.val();
                } else if (arr.length == 1) {
                    scope[arr[0]] = element.val();
                } else if (arr.length == 3) {
                    scope[arr[0]][arr[1]][arr[2]] = element.val();
                }
                //scope.activeOption.opinion=element.val();
                /*ngModel.$setViewValue(element.val());
                ngModel.$render();*/
            })
        },
    }
});

myApp.directive('lengthCheck', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attr, ngModel) {
            var cutLen = attr.lengthCheck;
            element.on('keyup', function () {
                var len = element.val().length;
                if (len > cutLen) {
                    ngModel.$setViewValue(element.val().substring(0, cutLen));
                    ngModel.$render();
                    swal("提示", "请确保输入信息在" + cutLen + "字以内", "info");
                }
            })
        },
        scope: {
            file: '=lengthCheck'
        }
    }
});

myApp.directive('radioClick', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attr, ngModel) {
            element.on('click', function ($event) {
                var radioModel = scope.$eval(attr.radioClick);
                if ("checkbox" == attr.type) {
                    if (radioModel.isAbleEdit) {
                        var itemVal = radioModel[attr.radioClickVal];
                        if (radioModel.notNull) {
                            itemVal = true;
                        }
                        radioModel.types.forEach(function (value) {
                            radioModel[value] = false;
                        });
                        radioModel[attr.radioClickVal] = itemVal;
                        if (radioModel.cleanModel) {
                            $parse(radioModel.cleanModel).assign(scope, '');
                        }
                        if (itemVal) {
                            if (attr.radioClickVal === scope.$eval(radioModel.bindAtt)) {
                            } else {
                                $parse(radioModel.bindAtt).assign(scope, attr.radioClickVal);
                                if (radioModel.bindAttChange) {
                                    scope.$eval(radioModel.bindAttChange)();
                                }
                            }
                        } else {
                            $parse(radioModel.bindAtt).assign(scope, '');
                        }
                        $parse(attr.radioClick).assign(scope, radioModel);
                        $event.stopPropagation();
                        scope.$apply();
                    } else {
                        var itemVal = !radioModel[attr.radioClickVal];
                        radioModel[attr.radioClickVal] = itemVal;
                        $parse(attr.radioClick).assign(scope, radioModel);
                        $event.stopPropagation();
                        scope.$apply();
                    }
                } else {
                    if (radioModel.isAbleEdit) {
                        var itemVal = !radioModel[attr.radioClickVal];
                        if (radioModel.notNull) {
                            itemVal = true;
                        }
                        radioModel.types.forEach(function (value) {
                            radioModel[value] = false;
                        });
                        radioModel[attr.radioClickVal] = itemVal;
                        if (radioModel.cleanModel) {
                            $parse(radioModel.cleanModel).assign(scope, '');
                        }
                        if (itemVal) {
                            if (attr.radioClickVal === scope.$eval(radioModel.bindAtt)) {
                            } else {
                                $parse(radioModel.bindAtt).assign(scope, attr.radioClickVal);
                                if (radioModel.bindAttChange) {
                                    scope.$eval(radioModel.bindAttChange)();
                                }
                            }
                        } else {
                            $parse(radioModel.bindAtt).assign(scope, '');
                        }
                        $parse(attr.radioClick).assign(scope, radioModel);
                        $event.stopPropagation();
                        scope.$apply();
                    }
                }
            })
        },
    }
});


myApp.directive('numberCheck', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attr, ngModel) {
            element.on('keyup', function () {
                ngModel.$setViewValue(parseInt(element.val(), 10));
                ngModel.$render();
            })
        },
    }
});

myApp.directive('draggable', ['$document', function ($document) {
    return function (scope, element, attr) {
        var startX = 0, startY = 0, x = 0, y = 0;
        element = angular.element(document.getElementsByClassName("modal-dialog"));
        element.css({
            position: 'relative',
            cursor: 'move'
        });

        element.on('mousedown', function (event) {
            // Prevent default dragging of selected content
            event.preventDefault();
            startX = event.pageX - x;
            startY = event.pageY - y;
            $document.on('mousemove', mousemove);
            $document.on('mouseup', mouseup);
        });

        function mousemove(event) {
            y = event.pageY - startY;
            x = event.pageX - startX;
            element.css({
                top: y + 'px',
                left: x + 'px'
            });
        }

        function mouseup() {
            $document.off('mousemove', mousemove);
            $document.off('mouseup', mouseup);
        }
    };
}]);

myApp.directive('numberic', function () {
    return {
        require: 'ngModel',
        restrict: "EA",
        scope: {
            max: '@',
            maxLength: '@',
            min: '@'
        },
        link: function (scope, ele, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function (inputValue) {
                if (inputValue == undefined) {
                    return '';
                }
                var max = +scope.max;
                var maxLength = +scope.maxLength;
                var min = +scope.min;
                var transformedInput = inputValue.replace(/[^^\d+(\.\d)?$]/g, '');
                if (maxLength && inputValue.length > maxLength) {
                    transformedInput = inputValue.slice(0, maxLength);
                }
                if (max && +transformedInput > max) {
                    transformedInput = max + '';
                }
                if (min && +transformedInput < min) {
                    transformedInput = min + '';
                }
                if (transformedInput != inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }
                return transformedInput;
            })
        }
    }
});


myApp.directive('pwdValid', function () {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            var firstPassword = '#' + attrs.pwdValid;
            // 网上好多例子都掉了$(elem) 美元符号和括号
            $(elem).add(firstPassword).on('keyup', function () {
                // $(elem).on('keyup', function () {
                if (Object.prototype.toString.call(elem.val()) === "[object String]" && elem.val().length > 0) {
                    var v = elem.val() === $(firstPassword).val();
                    ctrl.$setValidity('difPwd', v);
                } else {
                    ctrl.$setValidity('difPwd', true);
                }

            });
        }
    };
});

myApp.directive('oldPwdCheck', function () {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            var oldPwd = '#' + attrs.oldPwdCheck;
            var firstPassword = '#' + attrs.firstPwd;
            var scope = angular.element(elem).scope();
            $(elem).add(firstPassword).on('keyup', function () {
                if (Object.prototype.toString.call(elem.val()) === "[object String]" && elem.val().length > 0) {
                    var v = elem.val() === $(firstPassword).val();
                    scope.disableForm = !v;
                    ctrl.$setValidity('difPwd', v);
                } else {
                    console.log('2')
                    scope.disableForm = true;
                    ctrl.$setValidity('difPwd', true);
                }

                if (!scope.disableForm) {
                    if ($(oldPwd).val()) {
                        scope.disableForm = false;
                        ctrl.$setValidity('noOldPwd', true);
                    } else {
                        scope.disableForm = true;
                        ctrl.$setValidity('noOldPwd', false);
                    }
                }
                scope.$applyAsync();
            });
        }
    };
});

/*
使用案例
<div class="form-group" align="center">
				<label for="timepickerTest" class="col-sm-2 control-label">发文日期</label>
				<div id='timepickerTest' class="col-sm-10">
					<div  ng-model="queryBean.createTimed"  ng-time class="input-group date form_datetime " data-date="" data-date-format="yyyy年mm月dd日 hh:ii:ss" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd hh:ii:ss">
						<input   class="form-control" size="16" type="text" value="" readonly>
						<input id="dtp_input2"  ng-model="queryBean.createTime" ng-hide="true"  class="form-control" size="16" type="text" value="" readonly>
						<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
						<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
					</div>
				</div>
			</div>
* */
myApp.directive('ngTime', function () {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function ($scope, $element, $attrs, $ngModel) {
            if (!$ngModel) {
                return;
            }
            $('.form_datetime').datetimepicker({
                language: 'zh-CN',
                weekStart: 1,
                todayBtn: 1,
                autoclose: 1,
                todayHighlight: 1,
                startView: 2,
                forceParse: 0,
                // stepHour: 1,//设置步长
                // minView: 0,
                // minuteStep: 1
                // showMeridian: 1
            });

            $('.form_date').datetimepicker({
                language: 'zh-CN',
                weekStart: 1,
                todayBtn: 1,
                autoclose: 1,
                todayHighlight: 1,
                startView: 2,
                minView: 2,
                forceParse: 0,
            });
            $('.form_date_tr').datetimepicker({
                language: 'zh-CN',
                weekStart: 1,
                todayBtn: 1,
                autoclose: 1,
                todayHighlight: 1,
                startView: 2,
                minView: 2,
                forceParse: 0,
                pickerPosition: "top-right",
            });
            $('.form_time').datetimepicker({
                language: 'zh-CN',
                weekStart: 1,
                todayBtn: 1,
                autoclose: 1,
                todayHighlight: 1,
                startView: 1,
                minView: 0,
                maxView: 1,
                forceParse: 0,
            });
        },
    };
});


myApp.directive('focusHiden', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            element.on('click', function () {
                $('#' + attr.focusHiden).focus();
            })
        },
        scope: {
            file: '=ngFileModel'
        }
    }
});

myApp.directive('autoScroll', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            element.scrollTop(element.height());
            element.bind('DOMNodeInserted', function () {
                element.scrollTop(element.height());
            });
        },
    }
});

myApp.directive('usernameUnique', function ($http, ENV, dataFactory, SysUtils) {
    return {
        require: 'ngModel',
        link: function (scope, ele, attrs, c) {
            scope.$watch(attrs.ngModel, function (n) {
                if (!n) return;


                var user = {};
                user.name = n;
                user.paging = 'No';
                user.isdelete = 0;

                dataFactory.getlist(ENV.localapi + "/administrator/findUser", 'POST', {'Content-type': 'application/json'}, JSON.stringify(user)).then(
                    function successCallback(data) {
                        // console.log(attrs.userid);
                        // console.log(Object.prototype.toString.call([data.beanList, data.beanList.length]));
                        if (SysUtils.notEmpty(data.beanList, [])) {
                            var isSelf = false;
                            data.beanList.forEach(function (v) {
                                if (!isSelf) {
                                    isSelf = isSelf || (v.id == attrs.userid);
                                }
                            });
                            /*请求用户过滤*/
                            if (isSelf) {
                                c.$setValidity('userNameExist', true);
                            } else {
                                c.$setValidity('userNameExist', false);
                            }
                        } else {
                            c.$setValidity('userNameExist', true);
                        }
                    },
                    function errorCallback(data) {
                        c.$setValidity('userNameExist', true);
                    }
                )
            });
        }

    };
});

myApp.directive('enlargePic', function () {//enlargePic指令名称，写在需要用到的地方img中即可实现放大图片
    return {
        restrict: "AE",
        link: function (scope, elem) {
            elem.bind('click', function ($event) {
                var img = $event.srcElement || $event.target;
                angular.element(document.querySelector(".mask"))[0].style.display = "block";
                angular.element(document.querySelector(".bigPic"))[0].src = img.src;
            })
        }
    }
});

myApp.directive('closePic', function () {
    return {
        restrict: "AE",
        link: function (scope, elem) {
            elem.bind('click', function ($event) {
                angular.element(document.querySelector(".mask"))[0].style.display = "none";
            })
        }
    }
});

/*动态加载模板时动态为页面中的modal注入监听*/
myApp.directive("listenModel", ['$parse', function ($parse, $scope) {
    return {
        restrict: 'A',
        transclude: true,
        scope: {
            modelCallBac: '&'
        },
        link: function (scope, element, attrs) {
            var fn = $parse(scope.modelCallBac); //parse it as function
            fn();
        }

    };
}])



