<!DOCTYPE html>
<html>
<head>
     <meta http-equiv="X-UA-Compatible" content="IE=8" />   
     <meta charset="utf-8">
     <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
     <meta http-equiv="pragma" content="no-cache">
     <meta http-equiv="cache-control" content="no-cache">
     <meta http-equiv="expires" content="0">
     <script type="text/javascript" src="${springMacroRequestContext.contextPath}/js/jquery.min.js"></script>
     <script type="text/javascript" src="${springMacroRequestContext.contextPath}/js/layui/layui.all.js"></script>
     <link rel="stylesheet" href="${springMacroRequestContext.contextPath}/js/layui/css/layui.css">
	 <style>
	 body {
		     overflow-x:hidden;  
		     /*overflow-y:hidden;*/
		     width:100%;
		     height:100%;   
	 }
	 </style>
</head>
<body>
<div class="layui-row layui-col-space10">
    <div class="layui-col-md12" >
    <table class="layui-table" lay-skin="nob" >
	  <tbody>
	    <tr>
	      <td width="333"></td>
	      <td width="333" style="text-align:center"></td>
	      <td width="333" style="text-align:right">
	      <button type="button"  id="china1" lay-data="{url:'${springMacroRequestContext.contextPath}/chinaAddressBook/uploadChina'}" class="layui-btn" >上传图片</button>
	      <button type="button"  id="china2" class="layui-btn layui-btn-normal" onclick="doScanUpload()">扫描上传</button>
	      </td>
	    </tr>
	  </tbody>
	</table>
    </div>  
    <div class="layui-col-md12" >
        <#if book.id??>
	    <img id="chinaAddressBook" src="${springMacroRequestContext.contextPath}/chinaAddressBook/downloadChina?fileid=${book.id?c}"/>
	    </#if>
    </div>

</div>
</body>
<script type="text/javascript">
var upload = layui.upload;
var uploadInst1 = upload.render({
    elem: '#china1' //绑定元素
    ,accept:'images'
    ,acceptMime:'image/jpeg,image/jpeg,image/gif,image/png,image/bmp,image/tiff'
    ,exts:'jpg|jpeg|gif|png|tiff|bmp'
    ,before: function(obj){ //obj参数包含的信息，跟 choose回调完全一致，可参见上文。
       layer.load(); //上传loading
    }
    ,done: function(res){
      console.log(res.resultType);
      layui.element.tabChange('monthlyreport', 'person');
      layer.closeAll('loading'); //关闭loading 
    }
    ,error: function(){
      //请求异常回调
      layer.closeAll('loading'); //关闭loading
    }
});
$(document).ready(function(){
         
        $("#chinaAddressBook").width($(".content-wrapper",window.parent.document).width());
        $("#chinaAddressBook").height(window.parent.document.body.clientHeight-205);
        $(window).resize(function(){
	       	 $("#chinaAddressBook").width($(".content-wrapper",window.parent.document).width());
	       	 $("#chinaAddressBook").height(window.parent.document.body.clientHeight-205);
        });
});
function doScanUpload()
{
   var url="${springMacroRequestContext.contextPath}/scanAttach/?saveurl=/chinaAddressBook/uploadChina&format=.jpeg,.png,.tiff"; 
   layer.open({
	  type: 2,
	  area: ['1000px', '80%'],
	  fixed: false, //不固定
	  maxmin: false,
	  content: url
	}); 
}

</script>
</html>