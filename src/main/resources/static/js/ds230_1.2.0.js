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
var m_szStatusMsg = "Scan Status ...";    // Status output messages

///////////////////////////////////////////////////
///
/// Start Scan ()
///
///////////////////////////////////////////////////
function scanandnotdownload() {
	MsgBox("\nScanning ...");

    $("#button2").attr('disabled',true);
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
            if(result.resultCode == 0)
            {
            	$("#jobid").val(result.msg);
            }   
            $("#button2").attr('disabled',false);         
        },
        error : function() {
            MsgBox("An error occurred: StartScan \n" + Error);
            $("#button2").attr('disabled',false);
        }
    });
}
function  downloadjob()
{
	var jobid=$("#jobid").val();
	window.open('http://127.0.0.1:3883/getimage?jobid='+jobid);
}

function scan() {
    MsgBox("\nScanning ...");

    $("#button1").attr('disabled',true);
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
            if(result.resultCode == 0)
            {
            	//uploadFile(result.msg);
                postDownloadFile(result.msg);
            }   

            $("#button1").attr('disabled',false);         
        },
        error : function() {
            MsgBox("An error occurred: StartScan \n" + Error);
            $("#button1").attr('disabled',false);
        }
    });
}

///////////////////////////////////////////////////
///
/// uploadFile()
///
///////////////////////////////////////////////////




function postDownloadFile(jobid) {
	$.ajax({
        type: 'GET',
        url: 'http://127.0.0.1:3883/getimage',
		async:true,//请求是否异步，默认为异步，这也是ajax重要特性
        data: {"jobid":jobid},
		dataType: "blob", //扩展出了blob类型
		}).done(function(data, status, jqXHR){
			$('#div1').append("[upload file: " + status + "]<br/>");
            if (status == "success") { // 请求成功
                // $("#remoteimg").attr("url", data);
                //将这个结果做附件上传处理
            	alert(data);
            	console.log(data);
            	uploadFileToServer(data);
            }
		}).fail(function(jqXHR, textStatus) {
		   console.log(textStatus);
	});
}



function uploadFile(jobid) {     
    $.ajax({
        type: 'GET',
        url: 'http://127.0.0.1:3883/getimage',
        // dataType:"json",   //返回格式默认
        async:true,//请求是否异步，默认为异步，这也是ajax重要特性
        data: {"jobid":jobid},
        timeout: 5000,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $("#div1").append("[state: " + textStatus + ", error: " + errorThrown + " ]<br/>");
            if (textStatus == "timeout") { // 请求超时
            // 其他错误，如网络错误等
            } 
            else { 
            }
        },
        success: function (data, textStatus) {
            $('#div1').append("[upload file: " + textStatus + "]<br/>");
            if (textStatus == "success") { // 请求成功
                // $("#remoteimg").attr("url", data);
                //将这个结果做附件上传处理
            	uploadFileToServer(data);
            }
        }
    });
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
        m_szStatusMsg = "Scan Status ...";
        document.getElementById("TextArea1").value= "";     
    }
}
