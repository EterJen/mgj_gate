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
    <form class="layui-form" id="editUserForm" action=""><!-- -->
      <div class="layui-form-item">
	    <input type="hidden" name="id" value="${(user.id?c)!""}">
	    <input type="hidden" name="department" id="department" value="${(user.department)!""}">
	    <input type="hidden" name="isdelete" value="0">
	    <label class="layui-form-label">部门</label>
	    <div class="layui-input-inline">
		  <select name="departmentid" lay-filter="department" lay-verify="required">
		    <option value="">请选择</option> 
		    <#list  selectlist as list> 
	        <option value="${list.id?c}" <#if ((list.id!0) == (user.departmentid!0))  >selected="selected"</#if> >${list.departname}</option>
	        </#list>
	      </select>
	      
	      
	    </div>
	  </div>
	  <div class="layui-form-item">
	    <label class="layui-form-label">姓名</label>
	    <div class="layui-input-inline">
	      <input type="text" name="name" value="${(user.name)!""}" placeholder="请输入姓名" autocomplete="off" class="layui-input">
	    </div>
	    <div class="layui-input-inline" style="width:auto">
	      <!--<input type="checkbox" name="nameArray" value="left" <#if mergeMap.name_left!false>checked="checked"</#if> title="左侧">-->
          <input type="checkbox" name="nameArray" value="leftblank" <#if mergeMap.name_leftblank!false>checked="checked"</#if> title="左侧空白">
          <!--<input type="checkbox" name="nameArray" value="above" <#if mergeMap.name_above!false>checked="checked"</#if> title="上方">-->
          <input type="checkbox" name="nameArray" value="aboveblank" <#if mergeMap.name_aboveblank!false>checked="checked"</#if> title="上方空白">
	    </div>
	  </div>
	  <div class="layui-form-item">
	    <label class="layui-form-label">地址</label>
	    <div class="layui-input-inline">
	      <input type="text" name="address" value="${(user.address)!""}" placeholder="请输入地址" autocomplete="off" class="layui-input">
	    </div>
	    <div class="layui-input-inline" style="width:auto">
	      <!--<input type="checkbox" name="addressArray" value="left" <#if mergeMap.address_left!false>checked="checked"</#if> title="左侧">-->
          <input type="checkbox" name="addressArray" value="leftblank" <#if mergeMap.address_leftblank!false>checked="checked"</#if> title="左侧空白">
          <!--<input type="checkbox" name="addressArray" value="above" <#if mergeMap.address_above!false>checked="checked"</#if> title="上方">-->
          <input type="checkbox" name="addressArray" value="aboveblank" <#if mergeMap.address_aboveblank!false>checked="checked"</#if> title="上方空白">
	    </div>
	  </div>
	  <div class="layui-form-item">
	    <label class="layui-form-label">房间</label>
	    <div class="layui-input-inline">
	      <input type="text" name="room" value="${(user.room)!""}" placeholder="请输入房间" autocomplete="off" class="layui-input">
	    </div>
	    <div class="layui-input-inline" style="width:auto"> 
	      <!--<input type="checkbox" name="roomArray" value="left"  <#if mergeMap.room_left!false>checked="checked"</#if> title="左侧">-->
          <input type="checkbox" name="roomArray" value="leftblank" <#if mergeMap.room_leftblank!false>checked="checked"</#if> title="左侧空白">
          <!--<input type="checkbox" name="roomArray" value="above"  <#if mergeMap.room_above!false>checked="checked"</#if> title="上方">-->
          <input type="checkbox" name="roomArray" value="aboveblank" <#if mergeMap.room_aboveblank!false>checked="checked"</#if> title="上方空白">
	    </div>
	  </div>
	  <div class="layui-form-item">
	    <label class="layui-form-label">分机</label>
	    <div class="layui-input-inline">
	      <input type="text" name="extension" value="${(user.extension)!""}"  placeholder="请输入分机" autocomplete="off" class="layui-input">
	    </div>
	    <div class="layui-input-inline" style="width:auto">
	      <!--<input type="checkbox" name="extensionArray" value="left" <#if mergeMap.extension_left!false>checked="checked"</#if> title="左侧">-->
          <input type="checkbox" name="extensionArray" value="leftblank" <#if mergeMap.extension_leftblank!false>checked="checked"</#if> title="左侧空白">
          <!--<input type="checkbox" name="extensionArray" value="above" <#if mergeMap.extension_above!false>checked="checked"</#if> title="上方">-->
          <input type="checkbox" name="extensionArray" value="aboveblank" <#if mergeMap.extension_aboveblank!false>checked="checked"</#if> title="上方空白">
	    </div>
	  </div>
	  <div class="layui-form-item">
	    <label class="layui-form-label">红机</label>
	    <div class="layui-input-inline">
	      <input type="text" name="redphone" value="${(user.redphone)!""}" placeholder="请输入红机" autocomplete="off" class="layui-input">
	    </div>
	    <div class="layui-input-inline" style="width:auto">
	      <!--<input type="checkbox" name="redphoneArray" value="left"  <#if mergeMap.redphone_left!false>checked="checked"</#if> title="左侧">-->
          <input type="checkbox" name="redphoneArray" value="leftblank" <#if mergeMap.redphone_leftblank!false>checked="checked"</#if> title="左侧空白">
          <!--<input type="checkbox" name="redphoneArray" value="above" <#if mergeMap.redphone_above!false>checked="checked"</#if> title="上方">-->
          <input type="checkbox" name="redphoneArray" value="aboveblank" <#if mergeMap.redphone_aboveblank!false>checked="checked"</#if> title="上方空白">
	    </div>
	  </div>
	  <div class="layui-form-item">
	    <label class="layui-form-label">工作手机</label>
	    <div class="layui-input-inline">
	      <input type="text" name="mobile" value="${(user.mobile)!""}" placeholder="请输入工作手机" autocomplete="off" class="layui-input">
	    </div>
	    <div class="layui-input-inline" style="width:auto">
	      <!--<input type="checkbox" name="mobileArray" value="left"  <#if mergeMap.mobile_left!false>checked="checked"</#if> title="左侧">-->
          <input type="checkbox" name="mobileArray" value="leftblank" <#if mergeMap.mobile_leftblank!false>checked="checked"</#if> title="左侧空白">
          <!--<input type="checkbox" name="mobileArray" value="above"  <#if mergeMap.mobile_above!false>checked="checked"</#if> title="上方">-->
          <input type="checkbox" name="mobileArray" value="aboveblank" <#if mergeMap.mobile_aboveblank!false>checked="checked"</#if> title="上方空白">
	    </div>
	  </div>
	  <div class="layui-form-item">
	    <label class="layui-form-label">直线</label>
	    <div class="layui-input-inline">
	      <input type="text" name="directline" value="${(user.directline)!""}" placeholder="请输入直线" autocomplete="off" class="layui-input">
	    </div>
	    <div class="layui-input-inline" style="width:auto">
	      <!--<input type="checkbox" name="directlineArray" value="left"  <#if mergeMap.directline_left!false>checked="checked"</#if> title="左侧" >-->
          <input type="checkbox" name="directlineArray" value="leftblank" <#if mergeMap.directline_leftblank!false>checked="checked"</#if> title="左侧空白">
          <!--<input type="checkbox" name="directlineArray" value="above"  <#if mergeMap.directline_above!false>checked="checked"</#if> title="上方">-->
          <input type="checkbox" name="directlineArray" value="aboveblank" <#if mergeMap.directline_aboveblank!false>checked="checked"</#if> title="上方空白">
	    </div>
	  </div>
	  <div class="layui-form-item">
	    <label class="layui-form-label">用户排序</label>
	    <div class="layui-input-inline">
	      <input type="text" name="orderno" value="${(user.orderno)!""}"  lay-verify="required" placeholder="请输入用户排序" autocomplete="off" class="layui-input">
	    </div>
	  </div>
	  
	  <div class="layui-form-item">
	    <div class="layui-input-block">
	      <button type="button" class="layui-btn" lay-submit lay-filter="formDemo">保存人员</button>
	      <button type="button" class="layui-btn" lay-submit lay-filter="formDelete">删除人员</button>
	      <button type="reset" class="layui-btn layui-btn-primary">重置</button>
	    </div>
	  </div>
	</form>
    </div>  
    
</div>
</body>
<script type="text/javascript">
function addArray(fd,ArrayName)
{
     var arrayObject=$('input[name="'+ArrayName+'"]:checked');
     if(arrayObject.length> 0){
        arrayObject.each(function(){ 
            fd.append(ArrayName, $(this).val());
        }); 
     }
     else {
         fd.append(ArrayName, []);
     }
}

var form=layui.form;
form.render();

  //监听提交
  form.on('submit(formDemo)', function(data){
     var user={};
     user.id=data.field.id;
     user.department=data.field.department;
     user.isdelete=data.field.isdelete;
     user.departmentid=data.field.departmentid;
     user.name=data.field.name;
     user.address=data.field.address;
     user.room=data.field.room;
     user.extension=data.field.extension;
     user.redphone=data.field.redphone;
     user.mobile=data.field.mobile;
     user.directline=data.field.directline;
     user.orderno=data.field.orderno;
     var fd = new FormData();
     fd.append("json",JSON.stringify(user));
     addArray(fd,"nameArray");
     addArray(fd,"addressArray");
     addArray(fd,"roomArray");
     addArray(fd,"extensionArray");
     addArray(fd,"redphoneArray");
     addArray(fd,"mobileArray");
     addArray(fd,"directlineArray");
     
     $.ajax({
          type: "POST",
          url: '${springMacroRequestContext.contextPath}/cityAddressBook/saveUser',
          data:fd,
          dataType: 'json',
          //上传文件无需缓存
          cache: false,
          //用于对data参数进行序列化处理 这里必须false
          processData: false,
          //必须
          contentType: false, 
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
	          url: '${springMacroRequestContext.contextPath}/cityAddressBook/deleteUser',
	          dataType: 'json',
	          contentType:"application/json",
	          data:JSON.stringify(data.field),
	          success: function (resultInfo) {
	               layer.alert("删除成功",function(){
	                   window.parent.location.reload();
	               });
	          },
	          error: function (XMLResponse) {
	               layer.alert("保存失败");
	               console.log(JSON.stringify(XMLResponse));
	          }
	      })
      });
     
  });
  
  form.on('select(department)', function(data){
     $("#department").val($(data.elem).find("option:selected").text());
  });   
</script>
</html>