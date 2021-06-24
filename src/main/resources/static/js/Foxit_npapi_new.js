/*
 * OFD的ActiveX控件使用的js，负责加载和提供接口。
 * js压缩：http://tool.css-js.com/ 
 */
//通用对象
var OFD = {
    // 保存页面中所有的OCX实例
    _OCX_Array: [],
    // 使用id查找实例
    find: function (id) {
        var ocx = null;
        this._each(this._OCX_Array, function (i, e) {
            if (e._id == id) {
                ocx = e;
                return false;
            }
        });
        return ocx;
    },
    // 合并对象
    _extend: function (defs, target) {
        var r = target;
        if (this._isNull(r)) {
            if (this._isArray(defs)) {
                r = [];
            } else {
                r = {};
            }
        }
        this._each(defs, function (n, v) {
            if (!(n in r)) {
                r[n] = v;
            }
        });
        return r;
    },
    // 判断参数是否是数组
    _isArray: function (v) {
        return Object.prototype.toString.call(v) === "[object Array]";
    },
    // 判断是否为纯粹对象,like jquery.isPlainObject
    _isPlainObject: function (v) {
        // Must be an Object.
        // Because of IE, we also have to check the presence of the constructor
        // property.
        // Make sure that DOM nodes and window objects don't pass through, as
        // well
        if (!v || v.toString() !== "[object Object]" || v.nodeType
				|| "setInterval" in v) {
            return false;
        }
        try {
            // Not own constructor property must be Object
            if (v.constructor && !v.hasOwnProperty("constructor")
					&& !v.constructor.prototype.hasOwnProperty("isPrototypeOf")) {
                return false;
            }
        } catch (e) {
            // IE8,9 Will throw exceptions on certain host objects #9897
            return false;
        }
        // Own properties are enumerated firstly, so to speed up,
        // if last one is own, then all properties are own.
        var key;
        for (key in v) {
        }
        return key === undefined || v.hasOwnProperty(key);
    },
    // 判断参数是否是undefined或null
    _isNull: function (v) {
        return typeof v == "undefined" || (v != 0 && !v);
    },
    // 判断参数是有有效
    _isValid: function (v) {
        return !this._isNull(v);
    },
    // getElementById
    _$: function (id) {
        return document.getElementById(id);
    },
    // createElement
    _new: function (tag) {
        return document.createElement(tag);
    },
    // for each like jquery
    _each: function (o, fn) {
        if (this._isArray(o)) {
            for (var i = 0, ol = o.length, val = o[0]; i < ol
					&& fn.call(val, i, val) !== false; val = o[++i]) {
            }
        } else {
            for (var i in o) {
                if (fn.call(o[i], i, o[i]) === false) {
                    break;
                }
            }
        }
        return o;
    },
    // 一些页面方法
    Page: {
        // 获取窗口宽度
        width: function () {
            var w = 0;
            if (window.innerWidth) {
                w = window.innerWidth;
            } else if ((document.body) && (document.body.clientWidth)) {
                w = document.body.clientWidth;
            }
            // 通过深入Document内部对body进行检测，获取窗口大小
            if (document.documentElement
					&& document.documentElement.clientHeight
					&& document.documentElement.clientWidth) {
                w = document.documentElement.clientWidth;
            }
            return w;
        },
        // 获取窗口高度
        height: function () {
            var h = 0;
            if (window.innerHeight) {
                h = window.innerHeight;
            } else if ((document.body) && (document.body.clientHeight)) {
                h = document.body.clientHeight;
            }
            // 通过深入Document内部对body进行检测，获取窗口大小
            if (document.documentElement
					&& document.documentElement.clientHeight
					&& document.documentElement.clientWidth) {
                h = document.documentElement.clientHeight;
            }
            return h;
        },
        // 兼容FF和IE的事件，当e未定义的时候返回window.event
        dEvent: function (e) {
            if (!e) {
                return window.event;
            } else {
                return e;
            }
        }
    }
};

//OCX类型及方法
OFD.OCX = function (options) {
    // OCX的Object ID
    this._id;
    // 配置
    this.opts = OFD._extend({
        div: null,
        width: "100%",
        height: OFD.Page.height() + "px",

        loadMsg: "<span>正在加载控件，请稍候....</span>",
        // 控件安装程序的下载路径
        //downURL : "res/ocx/FoxitOFDReaderSetup_1.4.1.26.exe",
        // 是否检查控件已经安装װ
        checkInstalled: true
    }, options);
    // 控件对象
    this.ax;
    // 缓存用户操作.因为某些情况下,用户操作时,控件还没有初始化完毕
    this._optCache = {
        compsite: [],
        callback: [],
        convert: [],
        perform: [],
        svcaddr: [],
        savefile: [],
		savefileoffsystem:[],
        closefile: [],
        open: [],
        enable: [],
        sealname: [],
        sealid: [],
        sealmethod: [],
        opts: {// 属性名称和方法的映射
            "compsite": "setCompositeVisible",
            "callback": "setCallback",
            "convert": "convertFile",
            "perform": "performClick",
            "svcaddr": "setServiceAddr",
            "open": "_open",
            "enable": "setCompsiteEnable",
            "savefile": "saveFile",
            "closefile": "closeFile",
            "sealname": "setSealName",
            "sealid": "setSealId",
            "sealmethod": "setSealSignMethod",
			"savefileoffsystem": "saveFileOffSystem"
        }
    };

    // 加载控件
    this.load = function () {
        var rand = this._randomString(10);
        if (OFD._isNull(this.opts.div)) {
            div.innerHTML = "<span style='color:red;'>启动FireFox控件环境未准备好!</span>";
        }
        var div = OFD._$(this.opts.div);
        div.innerHTML = this.opts.loadMsg;
        this._id = "ofd_ocx_" + rand;
        OFD._OCX_Array.push(this); // 放入队列,以方便查找使用
        this._writeOCX();
        this.ready();

        return this;
    };

    // 加载配置,完成准备工作,只执行一次
    this.ready = function () {
        if (this.ax) {// 已经初始化
            return this;
        }
        var o = OFD._$(this._id);
        if (!o)//|| !("openURL" in o)) 
        {
            div.innerHTML = "<span>ActiveX控件未正确初始化!</span>";
            return;
        }
        this.ax = o; // 赋值,很重要
        var _me = this;
        // 控制初始化时的组件显示
        var compsite = this.opts.compsite;
        if (compsite) {
            OFD._each(compsite, function (n, v) {
                //_me.setCompositeVisible(n, v);
            });
        }

        // 加载完毕前的动作都执行一遍
        OFD._each(this._optCache, function (n, v) {
            if (OFD._isArray(v) && v.length > 0) {
                var fn = _me[_me._optCache.opts[n]];
                if (fn) {
                    OFD._each(v, function (i, e) {
                        var args = [];
                        OFD._each(e, function (ni, vi) {
                            args.push(vi);
                        });
                        try {
                            fn.apply(_me, args);
                        } catch (e) {
                        }
                    });
                }

                v.length = 0; // clear
            }
        });
        return this;
    };

    // 内部函数请勿调用-生成随机串
    this._randomString = function (l) {
        var x = "0123456789qwertyuioplkjhgfdsazxcvbnm";
        var tmp = "";
        for (var i = 0; i < l; i++) {
            tmp += x.charAt(Math.ceil(Math.random() * 100000000) % x.length);
        }
        return tmp;
    };


    // 内部函数请勿调用-输出控件的html
    this._writeOCX = function () {
        var w = this.opts.width;
        if (OFD._isNull(w) || w == "auto") {
            w = "100%";
        }
        var h = this.opts.height;
        if (OFD._isNull(h) || h == "auto") {
            h = OFD.Page.height() + "px";
        }

        OFD._$(this.opts.div).innerHTML = "<embed id='" + this._id // id
				+ "' width='" + w// width
				+ "' height='" + h// heigth
				+ "' type='application/ofd"
                + "'>";
    };

    // 内部函数请勿调用-检查组件是否准备完毕
    this._check = function () {
        return OFD._isValid(this.ax);
    };

    // 内部函数请勿调用-打开文件
    this._open = function (type, path, name, breadonly) {
        if (type == "file") {
           return  this.ax.openFile(path, breadonly);
        }
    };

    // 显示和隐藏组件
    this.setCompositeVisible = function (name, visible) {
        if (this._check()) {
            var o = this.ax;
            if (OFD._isArray(name)) {
                OFD._each(name, function (i, n) {
                    o.setCompositeVisible(n, visible);
                });
            } else {
                o.setCompositeVisible(name, visible);
            }
        } else {
            this._optCache.compsite.push(
			{
			    n: name,
			    v: visible
			});
        }
        return this;
    };

    // 打开本地计算机上的文件，URL可取值如C:/123.ofd
    this.openFile = function (path, breadonly) {
        return this._open("file", path, name, breadonly);
    };

    // 将加载或缓存的文件保存到本地磁盘
    this.saveFile = function (path) {
        if (this._check()) {
            return this.ax.saveFile(path);
        } else {
            this._optCache.savefile.push(
			{
			    p: path
			});
        }
    };
	//脱密处理
    this.saveFileOffSystem = function (path) {
        if (this._check()) {
            return this.ax.saveFileOffSystem(path);
        } else {
            this._optCache.savefileoffsystem.push(
			{
			    p: path
			});
        }
    };
    // 关闭当前文件
    this.closeFile = function () {
        if (this._check()) {
            return this.ax.closeFile();
        } else {
            this._optCache.closefile.push({});
        }
    };
    // 设置印章名称
    this.setSealName = function (path) {
        if (this._check()) {
            this.ax.setSealName(path);
        } else {
            this._optCache.setSealName.push({
                p: path
            });
        }
        return this;
    };
    // 设置印章标识
    this.setSealId = function (strSealId) {
        if (this._check()) {
            this.ax.setSealId(strSealId);
        } 
    };
	  // 外交部套件激活接口
    this.installKey = function (strinstallKey) {
        if (this._check()) {
            this.ax.installKey(strinstallKey);
        } 
    };
	// 新增查询20170419
    this.searchFull = function (strSearchFull) {
        if (this._check()) {
            this.ax.searchFull(strSearchFull);
        } 
    };
    // 设置签名算法
    this.setSealSignMethod = function (path) {
        if (this._check()) {
            this.ax.setSealSignMethod(path);
        } else {
            this._optCache.setSealSignMethod.push({
                p: path
            });
        }
        return this;
    };
    this.setViewPreference = function (key, value) {
        if (this._check()) {
            var o = this.ax;

            o.setViewPreference(key, value);

        }
        return this;
    };
    //
    this.setLogURL = function (strurl, oid) {
        if (this._check()) {
            var ox = this.ax;
            ox.setLogURL(strurl, oid);
        }
        return this;
    };
    this.addTrackInfo = function (xmlParam) {
        if (this._check()) {
            var ox = this.ax;
            ox.addTrackInfo(xmlParam);
        }
        return this;
    };
    this.setPrintInfo = function (num) {
        if (this._check()) {
            var ox = this.ax;
            ox.setPrintInfo(parseInt(num));
        }
        return this;
    };
    //正常打印
    this.printFile = function (docname, bgray) {
        if (this._check()) {
            var ox = this.ax;
            ox.PrintFile(docname, bgray, 0);
        }
    }
    //静默打印
    this.quietPrintFile = function (docname, bgray, isquietprint) {
        if (this._check()) {
            var ox = this.ax;
            ox.PrintFile(docname, bgray, isquietprint);
        }
    }
	//pdf打印
    this.printPdfFile = function (docname, bgray,isquiet) {
        if (this._check()) {
            var ox = this.ax;
            ox.PrintFile(docname, bgray, 0);
        }
    }
	
	//获取打印日志
     this.getLogFileContent = function () {
        if (this._check()) {
            var ox = this.ax;
            return ox.getLogFileContent();
        }
    }
	//获取打印日志路径----新增
    this.getLogFilePath = function () {
        if (this._check()) {
            var ox = this.ax;
            return ox.getLogFilePath();
        }
    }
	
	
	//设置组件是否可用setCompositeEnable  -----新增
	this.setCompositeEnable = function (scmpname, bisenable) {
        if (this._check()) {
            var o = this.ax;
            if (OFD._isArray(scmpname)) {
                OFD._each(scmpname, function (i, n) {
                    o.setCompositeEnable(n, bisenable);
                });
            } else {
                o.setCompositeEnable(scmpname, bisenable);
            }
        } else {
            this._optCache.enable.push(
			{
			    n: scmpname,
			    v: bisenable
			});
        }
        return this;
    };
	
	
    //设置阅读模式
    this.setDisPlayMode = function (disPlayMode) {
        if (this._check()) {
            var ox = this.ax;
            ox.setDisPlayMode(parseInt(disPlayMode));
        }
    }
    //设置显示宽度
    this.setZoomMode = function (zoomMode) {
        if (this._check()) {
            var ox = this.ax;
            ox.setZoomMode(parseInt(zoomMode));
        }
    }
    //获取版本号
    this.getPluginVersion = function () {
        if (this._check()) {
            var ox = this.ax;
            return ox.getPluginVersion();
        }
    }
    //注销
    this.destroyOCX = function () {
        if (this._check()) {
            var ox = this.ax;
            return ox.DestroyOCX();
        }
    }
    //获取公文域位置
    this.getTaggedPosition = function (docdomain) {
        if (this._check()) {
            var ox = this.ax;
            return ox.getTaggedPosition(docdomain);
        }
    }
    //获取公文域内容
    this.getTaggedText = function (docdomain) {
        if (this._check()) {
            var ox = this.ax;
            return ox.getTaggedText(docdomain);
        }
    }
    //设置打开文档权限
    this.removeAppPermission = function (permission) {
        if (this._check()) {
            var ox = this.ax;
            return ox.removeAppPermission(permission);
        }
    }
    //判断是否正在打印
    this.isQuietPrinting = function () {
        if (this._check()) {
            var ox = this.ax;
            return ox.IsQuietPrinting();
        }
    }
    //判断是否正在签章
    this.isSigning = function () {
        if (this._check()) {
            var ox = this.ax;
            return ox.IsSigning();
        }
    }
    //静默打印设置
    this.printSetting = function () {
        if (this._check()) {
            var ox = this.ax;
            ox.printSetting();
        }
    }
    //
    this.saveToLocal = function (path) {
        if (this._check()) {
            var ox = this.ax;
            return ox.saveToLocal(path);
        }
    }
    //获取文件包内文档数量
    this.getDocumentCount = function () {
        if (this._check()) {
            var ox = this.ax;
            return ox.getDocumentCount();
        }
    }
    //获取指定文档的页面数量
    this.getPageCount = function (docIndex) {
        if (this._check()) {
            var ox = this.ax;
            return ox.getPageCount(parseInt(docIndex));
        }
    }
    //渲染指定页面
    this.saveImage = function (docIndex, pageIndex, dpi, filepath) {
        if (this._check()) {
            var ox = this.ax;
			//filepath
            return ox.saveImage(parseInt(docIndex), parseInt(pageIndex), parseInt(dpi), filepath);
        }
    }
    //渲染文件包内所有页面
    this.saveAllImage = function (dpi, filepath) {
        if (this._check()) {
            var ox = this.ax;
            return ox.saveAllImage(parseInt(dpi), filepath);
        }
    }
    //设置当前套件版本作用
    this.setPerformanceTesting = function (bPerformanceTesting) {
        if (this._check()) {
            var ox = this.ax;
            ox.setPerformanceTesting(parseInt(bPerformanceTesting));
        }
    }
    //获取当前页的页码
    this.getCurPageIndex = function () {
        if (this._check()) {
            var ox = this.ax;
            return ox.GetCurPageIndex();
        }
    }
    //获取当前文档页数
    this.getPageCount = function () {
        if (this._check()) {
            var ox = this.ax;
            return ox.getPageCount();
        }
    }
    //翻页
    this.gotoPage = function (index) {
        if (this._check()) {
            var ox = this.ax;
            return ox.GotoPage(parseInt(index));
        }
    }
    //打开首页上半部分盖有多个印章的文档
    this.openSignFile = function (url) {
        if (this._check()) {
            var ox = this.ax;
            return ox.openSignFile(url);
        }
     }
	 //设置套件版本作用
	 this.setPerformanceTesting=function(bPerformanceTesting){
		         if (this._check()) {
            var ox = this.ax;
            ox.setPerformanceTesting(bPerformanceTesting);
        }
	 }
	 //回调
	 this.jsCallbackFun_ElapsedTime=function(){
		    if (this._check()) {
            var ox = this.ax;
            ox.JsCallbackFun_ElapsedTime=ElapsedTime;
        }
	 }
	 //回调initSetting
	 this.jsCallbackFun_InitSetting=function(){
		    if (this._check()) {
            var ox = this.ax;
            ox.JsCallbackFun_InitSetting=initSetting;
        }
	 }
	 //回调UpdateInfo
	 this.jsCallbackFun_UpdateInfo=function(){
		    if (this._check()) {
            var ox = this.ax;
            ox.JsCallbackFun_UpdateInfo=UpdateInfo;
        }
	 }
	 //隐藏侧边栏
	 this.hidePanels = function (nHide) {
			if (this._check()) {
				var ox = this.ax;
				ox.HidePanels(parseInt(nHide));
			}
		}
	 //获取签章个数
	    this.countSignatures = function () {
        if (this._check()) {
            var ox = this.ax;
            return ox.CountSignatures();
        }
    }
    //增加元数据
    this.setMetaData = function (key, value) {
        if (this._check()) {
            var ox = this.ax;
            return ox.setMetaData(key, value);
        }
       
    }
    //获取元数据
    this.getMetaData = function (key) {
        if (this._check()) {
            var ox = this.ax;
            return ox.getMetaData(key);
        }
       
    }
    //添加用户名
    this.setUserName = function (uname) {
        if (this._check()) {
            var ox = this.ax;
            return ox.setUserName(uname);
        }
       
    }
    //获取用户名
    this.getUserName = function () {
        if (this._check()) {
            var ox = this.ax;
            return ox.getUserName();
        }
       
    }
    //清除水印
    this.clearTrackInfo = function () {
        if (this._check()) {
            var ox = this.ax;
            return ox.clearTrackInfo();
        }
    }
    //设置缩放比例
    this.setZoomRadio = function (zoomvalue) {
        if (this._check()) {
            var ox = this.ax;
            ox.setZoomRadio(zoomvalue);
        }
    }
    //获取缩放比例
    this.getZoomRadio = function () {
        if (this._check()) {
            var ox = this.ax;
            return ox.getZoomRadio();
        }
    }
    //设置上传地址
    this.setLogSvrURL = function (url) {
        if (this._check()) {
            var ox = this.ax;
            ox.setLogSvrURL(url);
        }
    }
	//导入表单数据
	this.importFormData = function (formdata) {
        if (this._check()) {
            var ox = this.ax;
            ox.importFormData(formdata);
        }
    }
		//显示工具栏
	this.showToolbar=function(isVisible){
		if (this._check()) {
            var ox = this.ax;
            ox.showToolbar(isVisible);
        }
	}
	//显示右键工具菜单
	this.showContextMenu=function(isVisible){
		if (this._check()) {
            var ox = this.ax;
            ox.showContextMenu(isVisible);
        }
	}
	//设置阅读模式
	this.setReadMode=function(bReadMode){
		if (this._check()) {
            var ox = this.ax;
            ox.setReadMode(bReadMode);
        }
	}
		//获取打印机状态
		this.getPrintJobStatus = function (jobid) {
        if (this._check()) {
            var ox = this.ax;
            return ox.getPrintJobStatus(jobid);
        }
    }
		 //设置窗口激活状态
    this.SetActivateWindow = function (bactive) {
        if (this._check()) {
            var ox = this.ax;
            ox.SetActivateWindow(bactive);
        }
    }
	
	this.addSign = function(signURL, certURL, passwd){
        var ocx = this.ax;
        return ocx.addSign(signURL, certURL, passwd);
    }
    this.clearSign = function(){
        var ocx = this.ax;
        return ocx.clearSign();
    }
    this.applySign = function(){
        var ocx = this.ax;
        return ocx.applySign();
    }
    this.getSignList = function(){
        var ocx = this.ax;
        return ocx.getSignList();
    }
    this.addWaterMark = function(n1,n2,n3,n4,n5,n6,n7){
        var ocx = this.ax;
		  if(arguments.length == 1){ 
			return ocx.addWaterMark(n1);}
		  else if(arguments.length == 6){
			//  alert(6);
			ocx.addWaterMark(n1,n2,n3,n4,n5,n6);  
		  }
		  else if(arguments.length == 7){
			  // alert(7);
			ocx.addWaterMark(n1,n2,n3,n4,n5,n6,n7); 
		  }
		  
    }
	
	//this.addWaterMark = function(sPicData,nPageIndex,fPosX,fPosY,fWidth,fHeight){
     //   var ocx = this.ax;
		/*var sPicData = "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";*/
         //ocx.addWaterMark(sPicData,1,10.1,20.1,30.1,30.1);
	//	ocx.addWaterMark(sPicData,sPicData,nPageIndex,fPosX,fPosY,fWidth,fHeight)
   // }
  // this.addWaterMark = function(scontent,nPageIndex,fPosX,fPosY,fontname,fontsize,color){
     //   var ocx = this.ax;
		/*var sPicData = "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";*/
         //ocx.addWaterMark(sPicData,1,10.1,20.1,30.1,30.1);
	//	ocx.addWaterMark(scontent,nPageIndex,fPosX,fPosY,fontname,fontsize,color)
   // }
};

/**
 * 快速加载并初始化OCX控件,返回OCX实例
 * 
 * @param div
 *            div的id,ocx放置于此div内.如果为null,则自动创建一个div并追加于body的最后
 * @param width
 *            宽度,如果为null或auto,则设置为100%,也可以设置为具体像素(如500px)
 * @param width
 *            高度,如果为null或auto,则设置为100%,也可以设置为具体像素(如500px)
 * @param downURL
 *            控件安装程序的下载地址,只有在检查到控件未安装时才有用.若未设置,则不会出现下载地址.
 */
OFD.OCX.init = function (div, width, height, downURL) {
    var config = {};
    var tmp = arguments.callee.toString().match(/\(.*?\)/)[0];
    var names = tmp.replace(/[()\s]/g, '').split(',');
    var array = Array.prototype.slice.call(arguments, 0);
    OFD._each(array, function (i, e) {
        if (OFD._isValid(e)) {
            if (OFD._isPlainObject(e)) {
                OFD._extend(e, config);
            } else {
                config[names[i]] = e;
            }
        }
    });
    return new OFD.OCX(config).load();
};

var foxit = {};
//加载并初始化阅读器OCX控件
foxit.ofdReaderInit = function (divID, width, height) {
    return OFD.OCX.init(divID, width, height);
};
//加载并初始化转换器OCX控件
foxit.ofdCreatorInit = function (divID, width, height) {
    return OFD.OCX.init(divID, width, height);
};
