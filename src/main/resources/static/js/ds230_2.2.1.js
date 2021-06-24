///////////////////////////////////////////////////////////////////////////////////////
//
// PANTUMDS230SDK.TestBrowser
//
// PANTUM DS230 SDK - A COM visible API to SANE
//
///////////////////////////////////////////////////////////////////////////////////////
//  Author          Date            Version     Comment
//  zbb   2019/03/23      1.0.0.0     Tester program for PANTUMDS230SDK
//
///////////////////////////////////////////////////////////////////////////////////////

var timeout;                              // timeout value
var m_szStatusMsg = "扫描信息显示 ...";    // Status output messages

///////////////////////////////////////////////////
///
/// startScan ()
///
///////////////////////////////////////////////////
function startScan() {
    MsgBox("\n扫描中 ...");

    $("#button1").attr('disabled',true);
    $("#button3").attr('disabled',true);
    $("#button4").attr('disabled',true);
    $.ajax({
        type: 'GET',
        url: 'http://127.0.0.1:3883/scan',
        dataType:"json",   //返回格式为json
        async:true,//请求是否异步，默认为异步，这也是ajax重要特性
        data: {device:$("#device").val(),ip:$("#ip").val(),model:$('#model').val(),format:$("#format").val(),src:$("#src").val(),mode:$("#mode").val(),dpi:$("#dpi").val(),doctype:$("#doctype").val(),pages:$("#pages").val()}, 
        //$('#form1').serialize(), 不能传多余的参数
        success: function (result) {
            console.log(result);//打印服务端返回的数据(调试用)
            var status = "\n扫描准备完成,开始扫描";
            var statusstr = '{"-4":"不⽀持的扫描参数", "-2": "设备未找到", "-1": "失败，未知错误", "1": "不⽀持该操作", "2": "扫描被取消", "3": "扫描仪忙", "4": "扫描参数无效", "6": "卡纸", "7": "⽂档进纸器⽆纸", "8": "扫描仪上盖打开", "9": "读写错误", "10": "内存不足", "11": "请求资源被拒绝", "112": "http请求无参数", "113": "http请求参数不足", "114": "格式不支持", "115": "扫描来源设置错误", "116": "扫描格式设置错误", "117": "扫描分辨率设置错误", "118": "扫描页数设置错误", "119": "纸张类型设置错误", "120": "⽆效参数", "130": "动态库读取错误"}';
            if(result.resultCode!=0)
            {
            	var key=result.resultCode+"";
            	status=jQuery.parseJSON(statusstr)[key];
            }
            //var status = "\n扫描完成: "+result.resultCode+"\n"+result.msg+"\n"+result.docs;
            
            MsgBox(status);
            if(result.resultCode == 0)
            {
                var doc_array = result.docs;
                for(var i = 0; i < doc_array.length; i++)
                {
                    getScanFile(doc_array[i]); //获取扫描图像数据至浏览器
                    // getSnapshot(doc_array[i]); //获取图像快照，返回base64数据，仅限jpeg、png
                }
            }   

            $("#button1").attr('disabled',false);
            $("#button3").attr('disabled',false);
            $("#button4").attr('disabled',false);
        },
        error : function() {
            MsgBox("错误发生: 开始扫描 \n" + Error);
            $("#button1").attr('disabled',false);
            $("#button3").attr('disabled',false);
            $("#button4").attr('disabled',false);
        }
    });
}

///////////////////////////////////////////////////
///
/// startScanByBase64 ()
///
///////////////////////////////////////////////////
function startScanByBase64() {
    MsgBox("\nScanning ...");

    $("#button1").attr('disabled',true);
    $("#button3").attr('disabled',true);
    $("#button4").attr('disabled',true);
    $.ajax({
        type: 'GET',
        url: 'http://127.0.0.1:3883/scan',
        dataType:"json",   //返回格式为json
        async:true,//请求是否异步，默认为异步，这也是ajax重要特性
        data: $('#form1').serialize(),
        success: function (result) {
            console.log(result);//打印服务端返回的数据(调试用)
            var status = "\nStatus: "+result.resultCode+"\n"+result.msg+"\n"+result.docs;
            MsgBox(status);
            if(result.resultCode == 0)
            {
                var doc_array = result.docs;
                for(var i = 0; i < doc_array.length; i++)
                {
                    // getScanFile(doc_array[i]); //获取扫描图像数据至浏览器
                    getSnapshot(doc_array[i]); //获取图像快照，返回base64数据，仅限jpeg、png
                }
            }

            $("#button1").attr('disabled',false);
            $("#button3").attr('disabled',false);
            $("#button4").attr('disabled',false);
        },
        error : function() {
            MsgBox("错误发生: 开始扫描 \n" + Error);
            $("#button1").attr('disabled',false);
            $("#button3").attr('disabled',false);
            $("#button4").attr('disabled',false);
        }
    });
}

///////////////////////////////////////////////////
///
/// Start scan_to_tmp_path 只扫描并不调用uploadFile()
///
///////////////////////////////////////////////////
function scan_to_tmp_path() {
    MsgBox("\nScanning ...");

    $("#button1").attr('disabled',true);
    $("#button3").attr('disabled',true);
    $("#button4").attr('disabled',true);
    $.ajax({
        type: 'GET',
        url: 'http://127.0.0.1:3883/scan',
        dataType:"json",   //返回格式为json
        async:true,//请求是否异步，默认为异步，这也是ajax重要特性
        data: $('#form1').serialize(),
        success: function (result) {
            console.log(result);//打印服务端返回的数据(调试用)
            var status = "\nStatus: "+result.resultCode+"\n"+result.msg;
            MsgBox(status);

            $("#button1").attr('disabled',false);
            $("#button3").attr('disabled',false);
            $("#button4").attr('disabled',false);
        },
        error : function() {
            MsgBox("错误发生: 开始扫描 \n" + Error);
            $("#button1").attr('disabled',false);
            $("#button3").attr('disabled',false);
            $("#button4").attr('disabled',false);
        }
    });
}

///////////////////////////////////////////////////
///
/// getSnapshot(docid)
///
///////////////////////////////////////////////////
function getSnapshot(docid) {     
    if(docid <=0){
        console.error("docid not valid");
    }
    var xhr = new XMLHttpRequest();
    var url = "http://127.0.0.1:3883/getsnap?docid=" + docid;
    xhr.open('GET', url, true);
    xhr.responseType = 'json'; //设置返回响应数据的类型
    xhr.onload = function() {
    if (this.status === 200) {
            console.log(this.response);
            var base64Url = 'data:'+this.response.mimetype+';base64,'+this.response.base64;
            $('#images').append('<hr><p><b>' + this.response.filename + '</b></p><hr>');
            $('#images').append('<img src=' + base64Url + ' alt="image" />');
        }  
    }
    xhr.send();
}

///////////////////////////////////////////////////
///
/// getScanFile(docid)
///
///////////////////////////////////////////////////
function getScanFile(docid) {     
    if(docid <=0){
        console.error("docid not valid");
    }
    var xhr = new XMLHttpRequest();
    var url = "http://127.0.0.1:3883/getimage?docid=" + docid;
    xhr.open('GET', url, true);
    xhr.responseType = 'arraybuffer'; //设置返回响应数据的类型
    xhr.onload = function() {
      if (this.status === 200) {
            $('#div1').append("[上传文件成功]<br/>");
            console.log(this.response);
            let tp =xhr.getResponseHeader('Content-Type');
            console.log(tp);
            let blob = new Blob([this.response], {type: tp});
            //blob为获取到的文档或图像二进制数据，将此数据上传到您的服务端，以下代码是奔图测试代码，请替换为上传到您服务端的代码
            uploadScanFile(blob);
       }
       else
       {
            $('#div1').append("[上传文件失败]<br/>");
       }  
     }
    xhr.send();
}



//////////////////////////////////////////////////////////////////////////////////////////////
///
/// sleepn(n)
///
//////////////////////////////////////////////////////////////////////////////////////////////
function sleepn(n) {
    var start = new Date().getTime();
    while (true) if (new Date().getTime() - start > n) break;
} 
    
//////////////////////////////////////////////////////////////////////////////////////////////
///
/// MsgBox(m_szStatusMsg)
///
//////////////////////////////////////////////////////////////////////////////////////////////         
function MsgBox(m_szStatusMsg) {
    console.log(m_szStatusMsg);
    return;
    // document.getElementById("TextArea1").value=document.getElementById("TextArea1").innerText+m_szStatusMsg+"\n ";
    // document.getElementById("TextArea1").scrollTop = document.getElementById("TextArea1").scrollHeight;
}

//////////////////////////////////////////////////////////////////////////////////////////////
///
/// Window onload event
///
//////////////////////////////////////////////////////////////////////////////////////////////
window.onload = function () {
    window.clearTimeout(timeout);
    MsgBox(m_szStatusMsg);
}

//////////////////////////////////////////////////////////////////////////////////////////////
///
/// Window onbeforeunload event
///
//////////////////////////////////////////////////////////////////////////////////////////////
window.onbeforeunload = function () {   // Refresh or shut down before the operation
    var n = window.event.screenX - window.screenLeft;   
    var b = n > document.documentElement.scrollWidth-20;
    if (b && window.event.clientY < 0 || window.event.altKey) {
        //alert("This is a close operation rather than a refresh");   
        window.event.returnValue = ""; //Put here the code you want to return 
    }
    else {
        //alert("This is a refresh operation , rather than shut down");  
        m_szStatusMsg = "扫描信息显示 ...";
        document.getElementById("TextArea1").value= "";     
    }
}

///////////////////////////////////////////////////
///
/// get_device_list() 2019.7.25 add by cjl
///
///////////////////////////////////////////////////
function get_device_list() {
    MsgBox("\n获取设备信息 ...");

    $("#button2").attr('disabled',true);
    $.ajax({
        type: 'GET',
        url: 'http://127.0.0.1:3883/get_device_list',
        dataType:"json",   //返回格式为json
        async:true,//请求是否异步，默认为异步，这也是ajax重要特性
        //data: $('#form1').serialize(),
        success: function (result) {
            console.log(result);//打印服务端返回的数据(调试用)
            devices=result.msg.device_list;
            setDevices();
            //alert(devices.length);
            var status = "\n获取设备信息: "+result.resultCode+"\n"+result.msg;
            MsgBox(status);  
            $("#button2").attr('disabled',false);
        },
        error : function() {
            MsgBox("发送错误: 获取设备信息  \n" + Error);
            $("#button2").attr('disabled',false);
        }
    });
}
