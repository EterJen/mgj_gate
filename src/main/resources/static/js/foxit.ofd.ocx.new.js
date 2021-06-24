var OFD = {
    _OCX_Array: [],
    find: function (id) {
        var ocx;
        this._each(this._OCX_Array, function (i, e) {
            if (e._id == id) {
                ocx = e;
                return false;
            }
        });
        return ocx;
    },
    _extend: function (defs, target) {
        if (!target) {
            return defs;
        }
        this._each(defs, function (n, v) {
            if (!(n in target)) {
                target[n] = v;
            }
        });
        return target;
    },
    // 判断参数是否是数组
    _isArray: function (v) {
        return Object.prototype.toString.call(v) === "[object Array]";
    },
    // 判断参数是否是undefined或null
    _isNull: function (v) {
        return typeof v == "undefined" || (v != 0 && !v);
    },
    // 判断参数是有有效值
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
// 定义提示框对象
OFD.MsgBox = {
    // 创建一个元素，并赋予其各种属性
    _new: function (tag, id, css, type, value, style) {
        var e = OFD._new(tag);
        if (OFD._isValid(id)) {
            e.id = id;
        }
        this._css(e, css);
        if (OFD._isValid(type)) {
            e.type = type;
        }
        if (OFD._isValid(value)) {
            e.value = value;
        }
        if (OFD._isValid(style)) {
            OFD._each(style, function (n, v) {
                e.style[n] = v;
            });
        }
        return e;
    },
    // 对象转为字符串,用;号分割
    _o2s: function (obj) {
        var r = [];
        OFD._each(obj, function (n, v) {
            r.push(n + ":" + v);
        });
        if (r.length > 0) {
            return r.join(";");
        }
        return "";
    },
    // 设置元素的css
    _css: function (e, css) {
        if (OFD._isValid(css)) {
            if (typeof css == "string") {
                e.style.cssText = css;
            } else {
                var text = this._o2s(css);
                e.style.cssText = text;
            }
        }
    },
    // 初始化对话框的DOM对象，并设置相关的样式
    init: function (msg, title) {
        // 覆盖背景，将当前页面其他内容覆盖
        this.background = this._new("div", "maskDiv", {
            "position": "absolute",
            "top": "0",
            "left": "0",
            "filter": "alpha(opacity = 30)",
            "-moz-opacity": "0.3",
            "opacity": "0.3",
            "background": "#000",
            "z-index": "9990"
        }, null, null, {
            "width": OFD.Page.width() + "px",
            "height": OFD.Page.height() + "px"
        });
        // 标题，对话框标题容器
        this.titleContainer = this._new("div", "messageBoxTitle", {
            "height": "20px",
            "padding": "4px",
            "cursor": "move"
        });
        // 对话框标题内容，如果为空则自动显示“消息”
        var titleText;
        if (!title) {
            titleText = "提示";
        } else {
            titleText = title;
        }
        this.titleObj = document.createTextNode(titleText);
        this.titleSpan = this._new("span", null, {
            "float": "left"
        });
        this.titleSpan.appendChild(this.titleObj);
        this.titleContainer.appendChild(this.titleSpan);

        var closeBtnCSS = {
            "float": "right",
            "background": "#e3f1ff",
            "border": "none",
            "color": "#96caff",
            "font-size": "12px"
        };
        var closeBtnHover = OFD._extend(closeBtnCSS, {
            "background": "#f00",
            "color": "#fff",
            "-moz-border-radius": "3px",
            "-webkit-border-radius": "3px"
        });
        this.closeBtn = this._new("input", "closeBtn", closeBtnCSS, "button",
				"X");
        var cb = this.closeBtn;
        this.closeBtn.onmouseover = function () {
            OFD.MsgBox._css(cb, closeBtnHover);
        };
        this.closeBtn.onmouseout = function () {
            OFD.MsgBox._css(cb, closeBtnCSS);
        };
        this.titleContainer.appendChild(this.closeBtn);

        // 消息内容
        this.messageContainer = this._new("div", "messageContainer", {
            "padding": "12px 4px",
            /* "padding-left":"90px", */
            "background": "#eef7ff",
            "margin": "0 4px",
            "border": "1px solid #fff",
            "-moz-border-radius": "2px",
            "-webkit-border-radius": "2px"
        });
        this.messageStr = msg;
        // this.messageObj = document.createTextNode(msg);
        this.messageObj = OFD._new("div");
        this.messageObj.innerHTML = this.messageStr;
        this.messageContainer.appendChild(this.messageObj);
        this.footContainer = this._new("div", "messageBoxFoot", {
            "position": "relative",
            "height": "20px",
            "padding": "4px"
        });
        // 确定按钮
        this.confirmBtn = this._new("input", "okBtn", {
            "float": "right",
            "border": "1px solid #fff",
            "-moz-border-radius": "3px",
            "-webkit-border-radius": "3px",
            "background": "#c0ddfb",
            "line-height": "24px"
        }, "button", "确定");
        this.footContainer.appendChild(this.confirmBtn);
        // 消息框的整体
        this.messageBox = this._new("div", "messageBox", {
            "width": "308px",
            "position": "absolute",
            "background": "#e3f1ff",
            "border": "solid 1px #b3d7ff",
            "opacity": "1",
            "z-index": "9999",
            "-moz-border-radius": "3px",
            "-webkit-border-radius": "3px",
            "font-size": "12px",
            "line-height": "24px"
        }, null, null, {// 对话框的定位，根据宽度和高度自动生成定位
            "top": parseInt(OFD.Page.height()) / 2 - 100 + "px",
            "left": parseInt(OFD.Page.width()) / 2 - 150 + "px"
        });
        // 将元素添加到对话框中
        this.messageBox.appendChild(this.titleContainer);
        this.messageBox.appendChild(this.messageContainer);
        this.messageBox.appendChild(this.footContainer);
    },
    // 对话框释放函数
    dispose: function () {
        var background = OFD._$("maskDiv");
        var messageBox = OFD._$("messageBox");
        document.body.removeChild(background);
        document.body.removeChild(messageBox);
    },
    // 对话框显示的主方法
    show: function (msg, title) {
        // 初始化对话框基本元素
        this.init(msg, title);
        // 将对话框以及背景加入到body中
        document.body.appendChild(this.background);
        document.body.appendChild(this.messageBox);
        // 定义按钮，当点击按钮的时候关闭对话框
        this.confirmBtn.onclick = this.dispose;
        this.closeBtn.onclick = this.dispose;
        // 定义对话框的拖动事件
        var nowTitleContainer = this.titleContainer;
        // 当在标题上点击的时候开始实现拖动
        this.titleContainer.onmousedown = function (e) {
            var messageBox = OFD._$("messageBox");
            var startX = OFD.Page.dEvent(e).clientX;
            var startY = OFD.Page.dEvent(e).clientY;
            var offsetLeft = messageBox.offsetLeft;
            var offsetTop = messageBox.offsetTop;
            // 当鼠标移动到时候对话框跟随鼠标移动，为了防止作用的区域过小对话框移动出问题，这个地方选择了对body对象注册mousemove事件
            document.body.onmousemove = function (e) {
                // 设置对话框的具体坐标
                messageBox.style.top = offsetTop + OFD.Page.dEvent(e).clientY
						- startY + "px";
                messageBox.style.left = offsetLeft + OFD.Page.dEvent(e).clientX
						- startX + "px";
            };
            // 当鼠标释放即mouseup事件触发后注销body的mousemove事件同时注销body的mouseup事件自身，以防止事件污染
            document.body.onmouseup = function () {
                document.body.onmousemove = null;
                document.body.onmouseup = null;
            };
        };
    }
};

// OCX类型及方法
OFD.OCX = function (options) {
    // OCX的CLSID
    this.clsid = "9A9F603B-51A8-4630-AE99-4BBF01675575";
    // OCX的Object ID
    this._id;
    // 配置
    this.opts = OFD._extend({
        width: "100%",
        height: OFD.Page.height() + "px",
        compsite: {
            "toolstate handtool": false,
            "toolstate selecttext": false,
            "vnavigator outline": false,
            "ExportStream": false,
            "open": false,
            "print": false
        },
        loadMsg: "<span>正在加载控件，请稍候....</span>",
        // 控件安装程序的下载路径
        downURL: null
    }, options);
    // 控件对象
    this.ax;
    // 缓存用户操作.因为某些情况下,用户操作时,控件还没有初始化完毕
    this._optCache = {
        compsite: [],
        callback: [],
        open: []
    };

    // 加载控件
    this.load = function () {
        if (!("div" in this.opts)) {
            // OFD.MsgBox.show("请指定一个div,以便写入ActiveX!","错误信息");
            // return;
            // 新建一个div放置控件,并追加到body的最后
            var newDiv = OFD._new("div");
            newDiv.id = "ofd_div_" + this._randomString(5);
            document.body.appendChild(newDiv);
            this.opts.div = newDiv.id;
        }
        var div = OFD._$(this.opts.div);
       // if (this._hasActiveX()) {
            div.innerHTML = this.opts.loadMsg;
            this._id = "ofd_ocx_" + this._randomString(10);
            OFD._OCX_Array.push(this); // 放入队列,以方便查找使用
            this._writeOCX(div);
       // } else {
        //    div.innerHTML = "<span style='color:red;'>加载ActiveX控件失败!</span>";
       // }
        return this;
    };

    // 加载配置,完成准备工作,只执行一次
    this.ready = function () {
        if (this.ax) {// 已经初始化
            return this;
        }
        var o = OFD._$(this._id);
        if (!o || !("openFile" in o)) {
            OFD.MsgBox.show("控件没有正确初始化!");
            div.innerHTML = "<span>ActiveX控件未正确初始化!</span>";
            return;
        }
        this.ax = o; // 赋值,很重要	
        return this;
    };

    // 生成随机串
    this._randomString = function (l) {
        var x = "0123456789qwertyuioplkjhgfdsazxcvbnm";
        var tmp = "";
        for (var i = 0; i < l; i++) {
            tmp += x.charAt(Math.ceil(Math.random() * 100000000) % x.length);
        }
        return tmp;
    };

    // 判断是否安装了OFD控件
    this._hasActiveX = function () {
        if ("ActiveXObject" in window) {// 判断是否IE
            try {// 判断是否安装OFD阅读器
                return new ActiveXObject(
						"FoxitReader.FoxitReaderCtl");
            } catch (e) {
                var html = "OFD阅读控件没有正确安装，请下载安装！";
                if (OFD._isValid(this.opts.downURL)) {
                    html += "<br><a href='"// 
							+ this.opts.downURL //
							+ "' target='_blank'>下载</a>";
                }
                html += "<br>由于安装程序会更改IE的安全设置并注册dll文件，一些安全软件（如360安全卫士）可能会弹出安全警告，允许本软件继续即可。<br>建议使用管理员权限运行本软件。";
                OFD.MsgBox.show(html);
            }
        } else {
            OFD.MsgBox.show("无法显示ActiveX控件,请使用IE访问");
        }
        return false;
    };

    // 输出OCX的Object HTML
        this._writeOCX = function (div) {
		if ("ActiveXObject" in window) {
		
			 OFD._$(this.opts.div).innerHTML = "<object name='ht_foxit' id='" + this._id //
				+ "' width='"//
				+ this.opts.width//
				+ "' height='"//
				+ this.opts.height//
				+ "' classid='CLSID:" + this.clsid + "'>"
				+ "<param name='object_id' value = '" + this._id + "'> "//				
				+ "</object>";
		}
		else{
			 OFD._$(this.opts.div).innerHTML = "<embed id='" + this._id // id
				+ "' width='" + this.opts.width// width
				+ "' height='" + this.opts.height// heigth
				+ "' type='application/ofd"
                + "'>";
		}
       
    };

    // 检查组件是否准备完毕
    this._check = function () {
        return OFD._isValid(this.ax);
    };

    // 显示和隐藏组件
   /* this.setCompositeVisible = function (name, visible) {
        if (this._check()) {
            if (OFD._isArray(name)) {
                for (var i in name) {
                    var n = name[i];
                    this.ax.setCompositeVisible(n, visible);
                }
            } else {
                this.ax.setCompositeVisible(name, visible);
            }
        } else {
            this._optCache.compsite.push({
                n: name,
                v: visible
            });
        }
        return this;
    };*/

    // 设置回调
    this.setCallback = function (name, func, after) {
        if (this._check()) {
            this.ax.setCallback(name, func, after);
        } else {
            this._optCache.callback.push({
                n: name,
                f: func,
                a: after
            });
        }
        return this;
    };

    // 打开文件
    this._open = function (path, breadonly) {
        if (this._check()) {
            try {
                return this.ax.openFile(path);
            } catch (e) {
                return this.ax.openFile(path, breadonly);
            }

        } else {
            this._optCache.open.push({
                p: path
            });
            return false;
        }

    };
	
	// 打开Ps文件
    this._openPSFile = function (path, breadonly, nPageWidth, nPageHeight, nMarginLeft, nMarginTop, nMarginRight, nMarginBottom) {
        if (this._check()) {
            try {
                return this.ax.openPSFile(path, breadonly, nPageWidth, nPageHeight, nMarginLeft, nMarginTop, nMarginRight, nMarginBottom);
            } catch (e) {
                
            }
        } else {
            this._optCache.open.push({
                p: path
            });
            return false;
        }

    };
	
    this._save = function (path) {

        if (this._check()) {
            try {
            	/*
                if (this.ax.saveFile(path) == 1)
                    return false;
                else
                    return true;*/
            	return this.ax.saveFile(path);
            } catch (e) {
            	return this.ax.saveFile(path);
            }

        }
        else
            return false;
    }
    this._close = function () {
        /*
        if (this._check()) {
            if (this.ax.closeFile() == 1)
                return false;
            else
                return true;
        }
        else
            return false;*/
		if (this._check()) {
			return this.ax.closeFile();
		}
    }
    this._setSealName = function (strSealName) {
        if (this._check()) {
            this.ax.setSealName(strSealName);
        }
    }
    this._setSealId = function (strSealId) {
        if (this._check()) {
            this.ax.setSealId(strSealId);
        }
    }
	this._searchFull = function (strSearchFull) {
        if (this._check()) {
            this.ax.searchFull(strSearchFull);
        }
    }
	
    this._setSealSignMethod = function (strSignMethod) {
        if (this._check()) {
            this.ax.setSealSignMethod(strSignMethod);
        }
    }
    this._setCompositeVisible = function (strCompName, bVisible) {
        if (this._check()) {
            this.ax.setCompositeVisible(strCompName, bVisible);
        }
    }
    this._setViewPreference = function (key, value) {
        if (this._check()) {
            this.ax.setViewPreference(key, value);
        }
    }
    this._setLogURL = function (logurl, oid) {
        if (this._check()) {
            this.ax.setLogURL(logurl, oid);
        }
    }
    this._addTrackInfo = function (xmlParam) {
        if (this._check()) {
            this.ax.addTrackInfo(xmlParam);
        }
    }
    this._setPrintInfo = function (num) {
        if (this._check()) {
            this.ax.setPrintInfo(num);
        }
    }
	
	this.setPrintScale = function (value) {
        if (this._check()) {
            this.ax.setPrintScale(value);
        }
    }
    this._printFile = function (title, bgray) {
        if (this._check()) {
            this.ax.PrintFile(title, bgray, 0);
        }
    }
    this._quietPrintFile = function (title, bgray, isquietprint) {
        if (this._check()) {
            this.ax.PrintFile(title, bgray, isquietprint);
        }
    }
    this._getLogFilePath = function () {
        if (this._check()) {
            return this.ax.getLogFilePath();
        }
    }
	this._getLogFileContent = function () {
        if (this._check()) {
            return this.ax.getLogFileContent();
        }
    }
	
    this._setDisPlayMode = function (disPlayMode) {
        if (this._check()) {
            this.ax.setDisPlayMode(disPlayMode);
        }
    }
    this._setZoomMode = function (zoomMode) {
        if (this._check()) {
            this.ax.setZoomMode(zoomMode);
        }
    }
    this._getAppVersion = function () {
        if (this._check()) {
            return this.ax.getAppVersion();
        }
    }
    //获取公文域位置
    this._getTaggedPosition = function (docdomain) {
        if (this._check()) {
            return this.ax.getTaggedPosition(docdomain);
        }
    }
    //获取公文域内容
    this._getTaggedText = function (docdomain) {
        if (this._check()) {
            return this.ax.getTaggedText(docdomain);
        }
    }
    this._removeAppPermission = function (permission) {
        if (this._check()) {
            this.ax.removeAppPermission(permission);
        }
    }
    this._isQuietPrinting = function () {
        if (this._check()) {
            return this.ax.isQuietPrinting();
        }
    }
    this._isSigning = function () {
        if (this._check()) {
            return this.ax.isSigning();
        }
    }
    this._printSetting = function () {
        if (this._check()) {
            return this.ax.printSetting();
        }
    }
    this._getPluginVersion = function () {
        if (this._check()) {
            return this.ax.getPluginVersion();
        }
    }
    this._setMetaData = function (key,value) {
        if (this._check()) {
            this.ax.setMetaData(key, value);
        }
    }
    this._getMetaData = function (key) {
        if (this._check()) {
           return this.ax.getMetaData(key);
        }
   }
   this._setUserName = function (uname) {
        if (this._check()) {
            return this.ax.setUserName(uname);
        }
    }
    this._getUserName = function () {
        if (this._check()) {
            return this.ax.getUserName();
        }
    }
    this._clearTrackInfo = function () {
        if (this._check()) {
            this.ax.clearTrackInfo();
        }
    }
    this._setZoomRadio = function (value) {
        if (this._check()) {
            this.ax.setZoomRadio(value);
        }
    }
    this._getZoomRadio = function () {
        if (this._check()) {
            return this.ax.getZoomRadio();
        }
    }
    this._setLogSvrURL = function (url) {
        if (this._check()) {
            this.ax.setLogSvrURL(url);
        }
    }
	this._countSignatures = function () {
        if (this._check()) {
            return this.ax.CountSigns();
        }
    }
    this._verifySignature = function (index ,nFlag) {
        if (this._check()) {
            return this.ax.verifySignature(index ,nFlag);
        }
    }
    this._isSignVerify = function () {
        if (this._check()) {
            return this.ax.isSignVerify();
        }
    }
	this._setCompositeEnable  = function (strcmpName,bisEnable) {
        if (this._check()) {
			//alert(strcmpName)
            return this.ax.setCompositeEnable (strcmpName,bisEnable);
        }
    }
	this._importFormData  = function (formdata) {
        if (this._check()) {
			//alert(strcmpName)
            return this.ax.importFormData (formdata);
        }
    }
	this._showToolbar  = function (isVisible) {
        if (this._check()) {
			//alert(strcmpName)
            return this.ax.showToolbar (isVisible);
        }
    }
	this._showContextMenu  = function (isVisible) {
        if (this._check()) {
			//alert(strcmpName)
            return this.ax.showContextMenu (isVisible);
        }
    }
	this._showViewContextMenu  = function (isVisible) {
        if (this._check()) {
            return this.ax.showViewContextMenu (isVisible);
        }
    }
	this._setReadMode  = function (bReadMode) {
        if (this._check()) {
			//alert(strcmpName)
            return this.ax.setReadMode (bReadMode);
        }
    }
	
	
	
    // 打开文件
    this.openFile = function (url, breadonly) {
        return this._open(url, breadonly);
    };
		//打开Ps文件
    this.openPSFile  = function (url, breadonly, nPageWidth, nPageHeight, nMarginLeft, nMarginTop, nMarginRight, nMarginBottom) {
        return this._openPSFile(url, breadonly, nPageWidth, nPageHeight, nMarginLeft, nMarginTop, nMarginRight, nMarginBottom);
    }
    //保存文件
    this.saveFile = function (url) {
        return this._save(url);
    }
    //关闭文件
    this.closeFile = function () {
        return this._close(false);
    }
    //设置将要应用的印章名称
    this.setSealName = function (strSealName) {
        return this._setSealName(strSealName);
    }
    //设置将要应用的印章标识
    this.setSealId = function (sealid) {
        return this._setSealId(sealid);
    }
	 //查询  searchFull。。。。。。。。。
    this.searchFull = function (searchfull) {
        return this._searchFull(searchfull);
    }
    //设置将要应用的签名算法
    this.setSealSignMethod = function (strSignMethod) {
        return this._setSealSignMethod(strSignMethod);
    }
    //设置Reader界面按钮或组件是否可见
    this.setCompositeVisible = function (strCompName, bVisible) {
        return this._setCompositeVisible(strCompName, bVisible);
    }
    //导航栏
    this.setViewPreference = function (key, value) {
        return this._setViewPreference(key, value);
    }
    //日志上传
    this.setLogURL = function (logurl, oid) {
        return this._setLogURL(logurl, oid);
    }
    //二维码
    this.addTrackInfo = function (xmlParam) {
        return this._addTrackInfo(xmlParam);
    }
    //打印控制
    this.setPrintInfo = function (num) {
        return this._setPrintInfo(num);
    }
    //打印
    //title文档标题，
    this.printFile = function (title, bgray) {
        return this._printFile(title, bgray);
    }
    //静默打印
    this.quietPrintFile = function (title, bgray, isquietprint) {
        return this._quietPrintFile(title, bgray, isquietprint);
    }
    //获取打印日志路径
    this.getLogFilePath = function () {
        return this._getLogFilePath();
    }
	//获取日志打印内容      ----新增
	 this.getLogFileContent = function () {
        return this._getLogFileContent();
    }
	
	//  setCompositeEnable   --新增
	this.setCompositeEnable = function (strcmpName,bisEnable) {
        return this._setCompositeEnable(strcmpName,bisEnable);
    }
	
	
	
    //设置阅读模式
    this.setDisPlayMode = function (disPlayMode) {
        return this._setDisPlayMode(disPlayMode);
    }
    //设置显示宽度
    this.setZoomMode = function (zoomMode) {
        return this._setZoomMode(zoomMode);
    }
    //获取版本号
    this.getAppVersion = function () {
        return this._getAppVersion();
    }
    //获取公文域位置
    this.getTaggedPosition = function (docdomain) {
        return this._getTaggedPosition(docdomain);
    }
    //获取公文域内容
    this.getTaggedText = function (docdomain) {
        return this._getTaggedText(docdomain);
    }
    //设置打开文档权限
    this.removeAppPermission = function (permission) {
        return this._removeAppPermission(permission);
    }
    //判断是否正在打印
    this.isQuietPrinting = function () {
        return this._isQuietPrinting();
    }
    //判断是否正在签章
    this.isSigning = function () {
        return this._isSigning();
    }
    //静默打印设置
    this.printSetting = function () {
        return this._printSetting();
    }
    //获取插件版本
    this.getPluginVersion = function () {
        return this._getPluginVersion();
    }
    //增加元数据
    this.setMetaData = function (key,value) {
        this._setMetaData(key,value);
    }
    //获取元数据
    this.getMetaData = function (key) {
        return this._getMetaData(key);
    }
    //添加用户名
    this.setUserName = function (uname) {
        return this._setUserName(uname);
    }
    //获取用户名
    this.getUserName = function () {
        return this._getUserName();
    }
    //清除水印
    this.clearTrackInfo = function () {
        this._clearTrackInfo();
    }
    //设置缩放比例
    this.setZoomRadio = function (zoomvalue) {
        this._setZoomRadio(zoomvalue);
    }
    //获取缩放比例
    this.getZoomRadio = function () {
        return this._getZoomRadio();
    }
    //设置上传地址
    this.setLogSvrURL = function (url) {
        this._setLogSvrURL(url);
    }
	//获取签章个数
    this.countSignatures = function () {
           return this._countSignatures();
    }
    //根据索引验章
    this.verifySignature  = function (index ,nFlag) {
           return this._verifySignature(index ,nFlag);
    }
    //全部验章
    this.isSignVerify  = function () {
           return this._isSignVerify();
    }
	//导入表单数据
	this.importFormData=function(fromdata){
		return this._importFormData(fromdata);
	}
	//显示工具栏
	this.showToolbar=function(isVisible){
		return this._showToolbar(isVisible);
	}
	//火狐显示右键工具菜单
	this.showContextMenu=function(isVisible){
		return this._showContextMenu(isVisible);
	}
	//IE显示右键工具菜单
	this.showViewContextMenu=function(isVisible){
		return this._showViewContextMenu(isVisible);
	}
	//设置阅读模式
	this.setReadMode=function(bReadMode){
		return this._setReadMode(bReadMode);
	}
	//获取当前页的页码
    this.getCurrentPageIndex = function () {
       if (this._check()) {
           return this.ax.getCurrentPageIndex();
        }
    }
    //获取当前文档页数
    this.getPageCount = function (Index) {
        if (this._check()) {
            return this.ax.getPageCount(Index);
        }
    }
	//获取当前文档个数
    this.getDocumentCount = function () {
       if (this._check()) {
           return this.ax.getDocumentCount();
        }
    }
	//外交部激活码激活
    this.installKey = function (installKey) {
        if (this._check()) {
            this.ax.installKey(installKey);
        }
    }
	
	//设置线宽
    this.setThickness = function (thickness) {
        if (this._check()) {
            this.ax.setThickness(thickness);
        }
    }
	//设置线条颜色
    this.setColor = function (a,r,g,b) {
        if (this._check()) {
            this.ax.setColor(a,r,g,b);
        }
    }
	
	//设置签批区域
    this.setForm = function (setForm) {
        if (this._check()) {
            this.ax.setForm(setForm);
        }
    }
	
	//设置签批区域颜色
    this.setFormHighlightColor = function (a,r,g,b) {
        if (this._check()) {
            this.ax.setFormHighlightColor(a,r,g,b);
        }
    }
	
	//设置哪些签批区域可用
    this.setAvalibleFieldNames = function (setavalible) {
        if (this._check()) {
            this.ax.setAvalibleFieldNames(setavalible);
        }
    }
	
	//设置绘板空白区域的颜色。
    this.setMaskLayerColor = function (a,r,g,b) {
        if (this._check()) {
            this.ax.setMaskLayerColor(a,r,g,b);
        }
    }
	//获取签批的图片内容
	this.getRuntimeFormImage = function (name) {
        if (this._check()) {
           return this.ax.getRuntimeFormImage(name);
        }
    }
	//设置铅笔线宽
    this.setPencilThickness = function (thickness) {
        if (this._check()) {
            this.ax.setPencilThickness(thickness);
        }
    }
	//设置铅笔颜色
    this.setPencilColor = function (r,g,b) {
        if (this._check()) {
            this.ax.setPencilColor(r,g,b);
        }
    }
	//设置铅笔工具
	this.setCurrentTool = function (pencil) {
        if (this._check()) {
            this.ax.setCurrentTool(pencil);
        }
    }
	//添加手写签批
	this.AddSign = function (certurl,signurl) {
        if (this._check()) {
            this.ax.AddSign(certurl,signurl);
        }
    }
	//获取证书列表
	this.GetCertList = function () {
        if (this._check()) {
           return this.ax.GetCertList();
        }
    }
	
	//获取笔记列表
	this.GetSignList = function () {
        if (this._check()) {
           return this.ax.GetSignList();
        }
    }
	//删除书写的内容或笔记
	this.ClearSign = function () {
        if (this._check()) {
            this.ax.ClearSign();
        }
    }
	//应用手写签批
	this.ApplySign = function () {
        if (this._check()) {
            this.ax.ApplySign();
        }
    }
	//签名上添加水印
	this.AddWaterMark = function (wmInfo) {
        if (this._check()) {
            this.ax.AddWaterMark(wmInfo);
        }
    }

	this.addWaterMark = function(n1,n2,n3,n4,n5,n6,n7){
		if (this._check()) {
		  if(arguments.length == 1){ 
			return this.ax.addWaterMark(n1);}
		  else if(arguments.length == 6){
			//  alert(6);
			this.ax.addWaterMark(n1,n2,n3,n4,n5,n6);  
		  }
		  else if(arguments.length == 7){
			  // alert(7);
			this.ax.addWaterMark(n1,n2,n3,n4,n5,n6,n7); 
		  }
		}
    }
	
	//火狐回调
	this.jsCallbackFun_InitSetting=function(){
		 if (this._check()) {
            return this.ax.JsCallbackFun_InitSetting=initSetting;
        }
	 }
	 this.jsCallbackFun_UpdateInfo=function(){
            return this.ax.JsCallbackFun_UpdateInfo=UpdateInfo;
	 }
};

// 控件加载完毕后的回调方法
var onOFDLoaded = function (objID) {
    if (OFD._isValid(objID)) {
        var ocx = OFD.find(objID);
        if (ocx) {
            ocx.ready();
        }
    }
};
// 快速加载并初始化OCX控件
OFD.OCX.init = function (divID, width, height) {
    var config = {};
    if (OFD._isValid(divID)) {
        config.div = divID;
    }
    if (OFD._isValid(width)) {
        config.width = width;
    }
    if (OFD._isValid(height)) {
        config.height = height;
    }
    return new OFD.OCX(config).load();
};
