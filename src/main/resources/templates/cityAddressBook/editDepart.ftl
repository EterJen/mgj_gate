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
    <div class="layui-col-md12" style="padding-bottom:0px">
	<form class="layui-form" action=""><!-- -->
	  <div class="layui-form-item">
	    <input type="hidden" name="id" value="${(depart.id?c)!""}">
	    <input type="hidden" name="isdelete" value="0">
	    
	    <label class="layui-form-label">部门名称</label>
	    <div class="layui-input-inline">
	      <input type="text" name="departname" value="${(depart.departname)!""}" lay-verify="required" placeholder="请输入部门名称" autocomplete="off" class="layui-input">
	    </div>
	  </div>
	  <div class="layui-form-item">
	    <label class="layui-form-label">部门备注</label>
	    <div class="layui-input-block" >
	      <textarea name="remarks" placeholder="请输入部门备注" class="layui-textarea" style="width:99%;resize:none">${(depart.remarks)!""}</textarea>
	    </div>
	  </div>
	  <div class="layui-form-item">
	    <label class="layui-form-label">部门排序</label>
	    <div class="layui-input-inline">
	      <input type="text" name="orderno" value="${(depart.orderno)!""}"  lay-verify="required" placeholder="请输入部门排序" autocomplete="off" class="layui-input">
	    </div>
	  </div>
	  <div class="layui-form-item">
	    <div class="layui-input-block">
	      <button type="button" class="layui-btn" lay-submit lay-filter="formDemo">保存部门</button>
	      <button type="button" class="layui-btn" lay-submit lay-filter="formDelete">删除部门</button>
	      <button type="reset" class="layui-btn layui-btn-primary">重置</button>
	    </div>
	  </div>
	</form>
    </div>
</div>
</body>
<script type="text/javascript">
  var form = layui.form;
  
  //监听提交
  form.on('submit(formDemo)', function(data){
     //layer.msg(JSON.stringify(data.field));
     console.log(data.field);
     //JSON.stringify(data.field)
     //return false;
     $.ajax({
          type: "POST",
          url: '${springMacroRequestContext.contextPath}/cityAddressBook/saveDepart',
          dataType: 'json',
          contentType:"application/json",
          data:JSON.stringify(data.field),
          success: function (resultInfo) {
               layer.alert("保存成功",function(){
                   window.parent.location.reload();
               });
          },
          error: function (XMLResponse) {
               layer.alert("保存失败");
               console.log(JSON.stringify(XMLResponse));
          }
      })
     
  });
  
  form.on('submit(formDelete)', function(data){
     
     layer.confirm("是否确认删除?",function(index){
        $.ajax({
          type: "POST",
          url: '${springMacroRequestContext.contextPath}/cityAddressBook/deleteDepart',
          dataType: 'json',
          contentType:"application/json",
          data:JSON.stringify(data.field),
          success: function (resultInfo) {
               layer.alert("删除成功",function(){
                   window.parent.location.reload();
               });
          },
          error: function (XMLResponse) {
               console.log(JSON.stringify(XMLResponse));
               layer.alert("保存失败",function(){
                  layer.closeAll();
               });
               
          }
        })
     })
     
     
     
  });
 
</script>
</html>