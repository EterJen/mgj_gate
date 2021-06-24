function WpsWebClient(domID, islinuxClient, clientType) {
    this.domID = domID;
    this.islinuxClient = islinuxClient;
    this.clientType = clientType;


    if (islinuxClient) {
        var obj;
        if ("wps" == clientType) {
            obj = this.initLinuxWps(domID);
        } else if ("excl" == clientType) {
            obj = this.initLinuxExcl(domID);
        } else if ("ppt" == clientType) {
            obj = this.initLinuxPpt(domID);
        }
        this.domObj = obj;
        this.app = obj.Application;
        this.commonApp = this.app;
    } else {
        this.DocFrame = this.initWinClient(domID, "100%", "100%");
        this.commonApp = this.DocFrame;
    }

}
WpsWebClient.prototype.InsertParagraphAfter = function () {
    this.commonApp.ActiveDocument.Content.InsertParagraphAfter();
};

WpsWebClient.prototype.setToolbarAllVisible = function (Enable) {
    this.commonApp.setToolbarAllVisible(Enable);
};

WpsWebClient.prototype.tailAddFile = function (file) {
    if (this.islinuxClient) {
        this.app.ActiveDocument.Paragraphs.Last.Range.InsertFile(file);
    } else {
        this.DocFrame.ActiveDocument.Paragraphs(this.DocFrame.ActiveDocument.Paragraphs.Count).Range.InsertFile(file)
    }
};
WpsWebClient.prototype.tailAddText = function (text) {
    if (this.islinuxClient) {
        this.app.ActiveDocument.Paragraphs.Last.Range.InsertAfter(text);
    } else {
        this.DocFrame.ActiveDocument.Paragraphs(this.DocFrame.ActiveDocument.Paragraphs.Count).Range.InsertAfter(text);
    }
};


WpsWebClient.prototype.saveURL = function (saveUrl, name) {
    if (this.islinuxClient) {
        return this.app.saveURL(saveUrl, name);
    } else {
        return this.DocFrame.saveURL(saveUrl, name);
    }
};

WpsWebClient.prototype.openDocumentFromBase64Str = function (Base64data, ReadOnly, Password) {
    if (this.islinuxClient) {
        return this.app.openDocumentFromBase64Str(Base64data, ReadOnly, Password);
    } else {
        return this.DocFrame.openDocumentFromBase64Str(Base64data, ReadOnly, Password);
    }
};
WpsWebClient.prototype.openDocumentRemote = function (url, isOnlyRead) {
    if (this.islinuxClient) {
        return this.app.openDocumentRemote(url, isOnlyRead);
    } else {
        return this.DocFrame.openDocumentRemote(url, isOnlyRead);
    }
};
WpsWebClient.prototype.initLinuxPpt = function (tagID) {
    /*if (office != undefined)
        return;*/
    var iframe;
    iframe = document.getElementById(tagID);
    var codes = [];
    // codes.push('<object name="rpcwpp" id="rpcwpp_id" type="application/x-wpp" wpsshieldbutton="false" data="opt/kingsoft/wps-office/office6/mui/default/templates/newfile.ppt" width="100%" height="100%">');
    codes.push('<object name="rpcwpp" id="rpcwpp_id" type="application/x-wpp" wpsshieldbutton="false"  width="100%" height="100%">');
    codes.push('<param name="quality" value="high" />');
    codes.push('<param name="bgcolor" value="#ffffff" />');
    codes.push('<param name="Enabled" value="1" />');
    codes.push('<param name="allowFullScreen" value="true" />');
    codes.push('</object>');
    iframe.innerHTML = codes.join("");
    office = document.getElementById("rpcwpp_id");
    /*window.onbeforeunload = function() {
                    obj.Application.Quit();
                }; */
    return office;
};
WpsWebClient.prototype.initLinuxExcl = function (tagID) {
    /*if (office != undefined)
        return;*/
    var iframe;
    iframe = document.getElementById(tagID);
    var codes = [];
    // codes.push('<object name="rpcet" id="rpcet_id" type="application/x-et" wpsshieldbutton="false" data="opt/kingsoft/wps-office/office6/mui/default/templates/newfile.et" width="100%" height="100%">');
    codes.push('<object name="rpcet" id="rpcet_id" type="application/x-et" wpsshieldbutton="false"  width="100%" height="100%">');
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
};
WpsWebClient.prototype.initLinuxWps = function (tagID) {
    /*/opt/kingsoft/wps-office/office6/mui/default/templates/Normal.dotm在容器根目录模板*/
    var iframe;
    var obj;
    iframe = document.getElementById(tagID);
    var codes = [];
    //codes.push("");
    // codes.push("<object  name='webwps' id='webwps_id' type='application/x-wps'  data='opt/kingsoft/wps-office/office6/mui/default/templates/Normal.dotm'  width='100%'  height='100%'> <param name='Enabled' value='1' />  </object>");
    codes.push("<object  name='webwps' id='webwps_id' type='application/x-wps'    width='100%'  height='100%'> <param name='Enabled' value='1' />  </object>");

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
};
WpsWebClient.prototype.initWinClient = function (tagID, width, height) {
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

};
