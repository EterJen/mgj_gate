
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" Content="text/html; Charset=utf-8">
    <title>testScanner.html</title>
    <script type="text/javascript" src="${springMacroRequestContext.contextPath}/js/jquery-2.2.0.js"></script>
    <script type="text/javascript" src="${springMacroRequestContext.contextPath}/js/layui/layui.all.js"></script>
	<script type="text/javascript" charset="UTF-8" src="${springMacroRequestContext.contextPath}/js/ds230_2.2.1.js"></script>
	<script type="text/javascript" src="${springMacroRequestContext.contextPath}/js/jquery.cookie-1.4.1.min.js"></script>
	<link rel="stylesheet" href="${springMacroRequestContext.contextPath}/js/layui/css/layui.css">
</head>
<body>

<div id="form-div">
<form id="form1" onsubmit="return false" action="##" method="GET" class="layui-form"> <!-- 提示：如果你不想用form，你可以换成div等任何一个普通元素 -->
  <div class="layui-form-item">
    <label class="layui-form-label">扫描方式</label>
    <div class="layui-input-inline" style="width:240px">
      <input type="radio" name="scantype" value="0" lay-filter="scantype" title="本地扫描">
      <input type="radio" name="scantype" value="1" lay-filter="scantype" title="网络扫描">
    </div>
    
    <div class="scantype0" style="display: none">
    <div class="layui-input-inline scantype0" style="width:130px;">
        <select id="device" name="device" lay-filter="device">
        </select>
    </div>
    </div>
    
    <div class="scantype1" style="display: none">
    <label class="layui-form-label " style="width:90px;">网络扫描仪:</label>
    <div class="layui-input-inline" style="width:130px">
        <input id="ip" type="hidden" name="ip" value='' />
        <input id="model" type="hidden" name="model" value='' />
        
        <select id="netdevice" name="netdevice" lay-filter="netdevice">
        <option value="" model="">请选择</option>
        <#list netScan as netdevice>
        ${netdevice}
        <option value="${netdevice.ename}" model="${netdevice.ext}"> ${netdevice.name}</option>
        </#list>
        </select>
    </div>
    </div>
    <!--
    <div class="layui-input-inline" style="width:130px">
         <input id="ip" type="text" name="ip" value='192.168.1.150' placeholder="请输入" autocomplete="off" class="layui-input"/>
    </div>
    <div class="layui-input-inline" style="width:150px">
      <select id="model" name="model">
			<option value="M7100DN" >M7100DN</option>
			<option value="CM7000FDN" selected="selected">CM7000FDN</option>
			<option value="CM7115">CM7115</option>
			<option value="CM7000">CM7000</option>
			<option value="CM8505DN">CM8505DN</option>
			<option value="M9005DN">M9005DN</option>
		</select>
    </div>
    -->
    
    
  </div>
  <div class="layui-form-item">
    <label class="layui-form-label">文件格式</label>
    <div class="layui-input-inline" style="width:100px">
        <select id="format" name="format">
            <#list formats as format>
	        <option value="${format}" <#if format?index==0 > selected="selected" </#if> >${format}</option>
	        </#list>
	        <!--
	        <option value=".jpeg">.jpeg</option>
			<option value=".tiff">.tiff</option>
			<option value=".docx">.docx</option>
			<option value=".png">.png</option>
			-->
	    </select>
    </div>
    <!-- <label class="layui-form-label">进纸选择</label> -->
    <div class="layui-input-inline" style="width:150px">
        <select id="src" name="src">
	        <option value="Flatbed">平板</option>
	        <option value="Automatic Document Feeder" selected="selected">自动送纸器</option>
	        <option value="Automatic Document Feeder(Duplex)">自动送纸器(双面扫描)</option>
	    </select>
    </div>
    <!-- <label class="layui-form-label">模式</label> -->
    <div class="layui-input-inline" style="width:70px">
        <select id="mode" name="mode">
	        <option value="Color">色彩</option>
	        <option value="Gray">灰色</option>
	    </select>
	</div>
    <!-- <label class="layui-form-label">分辨率</label> -->
    <div class="layui-input-inline" style="width:150px">
		<select id="dpi" name="dpi">
	        <option value="150">150dpi</option>
	        <option value="300" selected="selected">300dpi</option>
		</select>
	</div>	
    <!-- <label class="layui-form-label">纸张大小</label> -->
    <div class="layui-input-inline" style="width:150px">
        <select id="doctype" name="doctype">
	        <option value="自动检测">自动检测</option>
			<option value="A4" selected="selected">A4</option>
	        <option value="A5">A5</option>
	        <option value="A3">A3</option>			
	    </select>
    </div>

  </div>
  <div class="layui-form-item">
        <label class="layui-form-label">页数</label>
        <div class="layui-input-inline" style="width:150px">
        <input id="pages" type="text" name="pages" value='0' placeholder="请输入" autocomplete="off" class="layui-input"/>
        </div>
    
  </div>
  
  
  
  <div class="layui-form-item">
    <div class="layui-input-block">
      <input id="button2" class="layui-btn" type="submit" value="获取设备信息" onclick="get_device_list()">&nbsp;
	  <input id="button1" class="layui-btn" type="submit" value="开始扫描" onclick="startScanBefore()">&nbsp;
	  <!--
			<input id="button4" type="submit" value="scan_and_getbase64" onclick="startScanByBase64()">&nbsp;
			<input id="button3" type="submit" value="scan_to_tmp_path" onclick="scan_to_tmp_path()">&nbsp;
	  		<input type="file" name="upload" id="upload" onchange="handle_files(this.files)"/>
	  -->
	  <input type="reset" class="layui-btn"  value="扫描重置">&nbsp;
      
    </div>
  </div>
  <div class="layui-form-item layui-form-text">
    <label class="layui-form-label">扫描信息提示</label>
    <div class="layui-input-block">
      <textarea id="TextArea1" placeholder="" class="layui-textarea" style="resize:none;width:90%"></textarea>
    </div>
  </div>
  
  <!-- 更多表单结构排版请移步文档左侧【页面元素-表单】一项阅览 -->
</form>
</div>
<div id="div1"></div>
<span id="images"></span>

<!--
<div>
	说明：
	<p>
		1、确保 dssServiced 服务已开启：$ systemctl status dssServiced <br>
		2、jpeg返回image/jpeg类型数据； tiff返回image/tiff类型数据； pdf返回application/pdf类型数据；ofd和docx返回二进制数据 <br>
		3、scan_and_getimage：扫描并获取图像数据，具体请参考文档说明和js代码；scan_to_tmp_path：只扫描文件到系统/tmp目录，名称以时间戳命名。<br>
		4、扫描url(示例)：http://127.0.0.1:3883/scan?format=.pdf&src=Automatic Document Feeder&mode=Color&dpi=300&doctype=A4&pages=0&device=pantum_ds230:libusb:003:006  <br>
		   scan接口可以不传参数，不传的参数将使用默认值，如format会使用".ofd"，mode是"Color"，dpi是300，doctype是"A4"，source是"Automatic Document Feeder"，device将使用第一个搜索到的设备<br>
		   如果需要指定IP地址进行网络扫描，不填充device，填充IP地址和机型：如ip=10.10.0.40&model=M7100DN<br>
	    5、上传url(示例)：http://127.0.0.1:3883/getimage?docid=1</p>
</div>
-->
</body>
</html>
<script type="text/javascript">
//var app = parent.angular.element($(".app-body",parent.document)[0]);  
//var attUploadInfo=app.scope().$$childHead.attUploadInfo;
var devices;
function isWindows() {
   return getOs().isWin7 || getOs().isWin10;
}
function getOs() {
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
function startScanBefore()
{
   if($('input[name="scantype"]:checked').length==0)
   {
       layer.alert('请先选择扫描方式');
   }
   else
   {
      var scantype=$('input[name="scantype"]:checked').val();
      if(scantype=='0')
      {
          if(devices==undefined || devices.length==0)
          {
              layer.alert('没找到本地扫描仪,请检查');
          }
          else if($("#device").val()=='')
          {
              layer.alert('请选择扫描仪');
          }
          else
              startScan();
      }
      else if(scantype=='1')
      {
          if($("#netdevice option").length==0)
          {
              layer.alert('未配置网络扫描仪,请联系管理员');
          }
          else if($("#netdevice").val()=='')
          {
              layer.alert('请选择网络扫描仪');
          }
          else
              startScan();
      }
   
   }
   
   //startScan();
}
function uploadScanFile(blob)
{
    try{
        var fd = new FormData();
        fd.append('file', blob,"扫描"+$("#format").val());
        //fd.append('selectedBean', JSON.stringify(attUploadInfo));
        fd.append('isWindows', isWindows());
        $.ajax({
             url:'${springMacroRequestContext.contextPath}${saveurl!""}',
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
                    window.parent.location.reload();
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
function handle_files(files) {
  for (i = 0; i < files.length; i++) {
    file = files[i];
    var reader = new FileReader();
    ret = [];
    reader.onload = function(e) {
      uploadScanFile_file(e.target.result);
    }
    reader.onerror = function(stuff) {
      console.log("error",stuff);
      console.log (stuff.getMessage());
    }
    reader.readAsBinaryString(file); //readAsdataURL
  }
}
function uploadScanFile_file(data)
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
    uploadScanFile(blob);
    
    
}
function setDevices()
{
   //console.log(devices);
   for(var i=0;i<devices.length;i++)
   {
      var device=devices[i];
      $("#device").append("<option value='"+device.device_name+"'>"+device.device_name+"</option>");
      if(i==0)
      {
         changeDevice(0);
      }
   }
}


function changeDevice(selectedIndex)
{
      var device=devices[selectedIndex]; 
         
      $("#dpi").empty();
      var nums=device.capability.resolution;
      nums = nums.sort(function(a,b){
        return b-a;
      });
      
      $(nums).each(function(index,value){
           $("#dpi").append("<option value='"+value+"'>"+value+"dpi</option>");
       });  
         
       $("#mode").empty();
       $(device.capability.mode).each(function(index,value){
              var valuename='';
              if(value=='Color')
                  valuename='色彩';
              else if(value=='Gray')
                  valuename='灰色';
              $("#mode").append("<option value='"+value+"'>"+valuename+"</option>");
       });
          
      $("#source").empty();
      $(device.capability.source).each(function(index,value){
              var valuename='';
              if(value=='Flatbed')
                  valuename='平板';
              else if(value=='Automatic Document Feeder')
                  valuename='自动送纸器';
              else if(value=='Automatic Document Feeder(Duplex)')
                  valuename='自动送纸器(双面扫描)';
              $("#source").append("<option value='"+value+"'>"+valuename+"</option>");
      });
         
         
     $("#doctype").empty();
     $(device.capability.geometry).each(function(index,value){
              $("#doctype").append("<option value='"+value+"'>"+value+"</option>");
     });
     layui.form.render(); 
}

layui.use('form', function(){
  var form = layui.form;
  form.render();
  //各种基于事件的操作，下面会有进一步介绍
  form.on('radio(scantype)', function(data){
     //console.log(data.value); //被点击的radio的value值
     if(data.value=='0')
     {
        $(".scantype1").hide();
        $("#netdevice").val('');
        $("#ip").val('');
        $("#model").val('');
        
        $.cookie('scantype', '0');
        $(".scantype0").show();
        if(devices==undefined)
        {
            get_device_list();
        }
     }
     else if(data.value=='1')
     {
        $(".scantype0").hide(); 
        $("#device").empty();
        $.cookie('scantype', '1');
        $(".scantype1").show();
        
        
     }
     
  });
  
  form.on('select(device)', function(data){
     changeDevice(data.elem.selectedIndex) 
  });
  form.on('select(netdevice)', function(data){
      $("#ip").val(data.elem.value);
      $("#model").val($(data.elem).find("option:selected").attr("model"));
  });
  
  
  
});
if('${scantype!''}'!='' && '${scantype!''}'!='undefined')
{
   //alert($('input[name="scantype"][value="${scantype!''}"]').next().length);
   $('input[name="scantype"][value="${scantype!''}"]').next().click();  
}
</script>
