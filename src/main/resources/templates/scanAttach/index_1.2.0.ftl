<!DOCTYPE html>
<html>
<head>
     <meta http-equiv="X-UA-Compatible" content="IE=8" />   
     <meta charset="utf-8">
     <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
     <meta http-equiv="pragma" content="no-cache">
     <meta http-equiv="cache-control" content="no-cache">
     <meta http-equiv="expires" content="0">
     <script type="text/javascript" src="${springMacroRequestContext.contextPath}/js/jquery-2.2.0.js"></script>
     <script type="text/javascript" src="${springMacroRequestContext.contextPath}/js/layui/layui.all.js"></script>
     <link rel="stylesheet" href="${springMacroRequestContext.contextPath}/js/layui/css/layui.css">
     <script type="text/javascript" src="${springMacroRequestContext.contextPath}/js/ds230_1.2.0.js"></script>
     <script type="text/javascript" src="${springMacroRequestContext.contextPath}/js/jquery-ajax-blob-arraybuffer.js"></script>
     
      
	 <style>
	 body {
		     overflow-x:hidden;  
		     overflow-y:hidden;
		     width:100%;
		     height:100%;   
	  }
	 </style>
</head>
<body>

<div id="form-div">
    jobid:<input name="jobid" id="jobid" value=""/>
    <input id="button2" type="button" value="dwonload" onclick="downloadjob()">&nbsp; 
	<form id="form1" onsubmit="return false" action="##" method="GET">	
	    Params:
	    <select id="format" name="format">
	        <option value=".jpeg">.jpeg</option>
	        <option value=".pdf" selected="selected">.pdf</option>
	        <option value=".ofd">.ofd</option>
	        <option value=".tiff">.tiff</option>
	    </select>

	    <select id="src" name="src">
	        <option value="0">Flatbed</option>
	        <option value="1" selected="selected">ADF</option>
	        <option value="2">ADF Duplex</option>
	    </select>

	    <select id="mode" name="mode">
	        <option value="0">Color</option>
	        <option value="1">Gray</option>
		</select>
		
		<select id="dpi" name="dpi">
	        <option value="0">150dpi</option>
	        <option value="1" selected="selected">300dpi</option>
		</select>
		
		<select id="doctype" name="doctype">
	        <option value="0">Auto</option>
			<option value="1" selected="selected">A4</option>
	        <option value="2">A5</option>
	        <option value="3">A3</option>			
	    </select>
		<br><br>
		Pages: <input id="pages" type="number" name="pages" value='0'/><br/><br/>		
	    <p>
	        <input type="file" name="upload" id="upload" onchange="handle_files(this.files)"/>
	        <input id="button2" type="submit" value="scan1" onclick="scanandnotdownload()">&nbsp;
	    	<input id="button1" type="submit" value="scan" onclick="scan()">&nbsp;
	    	<input type="reset" value="reset">
	    </p>

	</form>
</div>
<textarea id="TextArea1" rows="4" cols="40" readonly="readonly"></textarea>
<div>
	说明：
	<p>
		1、确保 dssServiced 服务已开启：$ systemctl status dssServiced <br>
	    2、jpeg格式扫描只返回第一张图片 <br>
	    3、jpeg tiff pdf返回图像数据；ofd返回二进制数据 <br>
	    4、扫描url(示例)：http://127.0.0.1:3883/scan?format=.pdf&src=1&mode=0&dpi=1&doctype=1&pages=0 <br>
	    5、上传url(示例)：http://127.0.0.1:3883/getimage?jobid=1</p>
</div>
<br><br>
<div id="div1"></div>
</body>
<script type="text/javascript">
var app = parent.angular.element($(".app-body",parent.document)[0]);  
var attUploadInfo=app.scope().$$childHead.attUploadInfo;


this.isWindows = function () {
        return this.getOs().isWin7 || this.getOs().isWin10;
}
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
function setAttachBean(attachBean)
{
   attUploadInfo=attachBean;
}
function handle_files(files) {
  for (i = 0; i < files.length; i++) {
    file = files[i]
    console.log(file)
    var reader = new FileReader()
    ret = []
    reader.onload = function(e) {
      uploadFileToServer_file(e.target.result)
    }
    reader.onerror = function(stuff) {
      console.log("error",stuff)
      console.log (stuff.getMessage())
    }
    reader.readAsBinaryString(file) //readAsdataURL
  }
 
}


function uploadFileToServer2(blob)
{
    try{
    
        var fd = new FormData();
        fd.append('file', blob,"扫描"+$("#format").val());
        //var selectedBean = {};
        //selectedBean.id= "1";
        //selectedBean.initType = "add";
        //selectedBean.creatorId = ${currentUser.id?c};
        fd.append('selectedBean', JSON.stringify(attUploadInfo));
        fd.append('isWindows', isWindows());
        $.ajax({
             url:'${springMacroRequestContext.contextPath}/attachment/upload',
             data: fd,
             type: "POST",
             dataType: "json",
             //上传文件无需缓存
             cache: false,
             //用于对data参数进行序列化处理 这里必须false
              processData: false,
             //必须
             contentType: false, 
             success: function (res) {
                console.log(res);
                if(res.resultType === 'success'){
                    var app = parent.angular.element($(".app-body",parent.document)[0]);  
                    app.scope().$$childHead.fc.closeScanFile($("#format").val(),res.bean.attachmentid);

                    
                }else{
                   alert("AAA=="+res.resultType)   
                }
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){
                alert(XMLHttpRequest);
                alert(textStatus);
                alert(errorThrown);
                
            }
         });
   }
   catch(e)
   {
       alert(e);
   }
}

function uploadFileToServer(data)
{
    /*  本地下载测试
    var localHref1 = window.URL.createObjectURL(
          data
    );
    var ele1 = document.createElement('a');
    ele1.href = localHref1;
    ele1.download = "测试"+$("#format").val();
    ele1.appendChild(document.createTextNode("生成的文件3")); 
    $("#div1")[0].appendChild(ele1);
    */
    uploadFileToServer2(data);
}


function uploadFileToServer_file(data)
{
    var ia = new Uint8Array(data.length);
    for (var i = 0; i < data.length; i++) {
        ia[i] = data.charCodeAt(i);
    };
    var blob=new Blob([ia],{type:"application/pdf"});
    var localHref = window.URL.createObjectURL(
          blob
    );
    var ele = document.createElement('a');
    ele.href = localHref;
    ele.download = "测试1"+$("#format").val();
    ele.appendChild(document.createTextNode("生成的文件1")); 
    $("#div1")[0].appendChild(ele);
    
    //将blob 传输到后台 测试
    uploadFileToServer2(blob)
    
    
}
</script>
</html>