
    

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  <title>密码综合业务管理系统</title>
  <link rel="stylesheet" href="${springMacroRequestContext.contextPath}/js/layui/css/layui.css">
  <link rel="stylesheet" href="${jyjglurl}/css/layout_zmqjf.css">
  <link rel="stylesheet" href="${jyjglurl}/css/reset_zmqjf.css">
  
  <script type="text/javascript" src="${springMacroRequestContext.contextPath}/js/jquery.min.js"></script>
  <script src="${springMacroRequestContext.contextPath}/js/layui/layui.all.js"></script>
  <script type="text/javascript" src="${jyjglurl}/js/WdatePicker.js"></script>
  
  <link rel="stylesheet" href="${jyjglurl}/common/css/reset.css" />
  <link rel="stylesheet" href="${jyjglurl}/common/css/layout.css" />    
  <link rel="stylesheet" href="${jyjglurl}/common/css/owl.carousel.min.css"/>
  <link rel="stylesheet" href="${jyjglurl}/common/css/owl.theme.default.css"/>
    <link rel="stylesheet" href="${jyjglurl}/common/css/table.css" />    
    
  <style>
  	.layui-table-tool-temp {
    	padding-right: 0px;
	}
	.layui-table-view{
		border: 1px solid #e46660;
	}
	.layui-table-tool {
    	background:#fff;
	}
	.layui-form-checked[lay-skin=primary] i {
		border-color: #e46660!important;
		background-color: #e46660;
	}
	.layui-btn {
		background-color:#e46660;
	}
	.layui-btn-normal {
		background-color: #e46660
	}
	.layui-btn-warm {
		background-color: #e46660;
	}
	.layui-btn-checked {
		background-color: #e46660
	}
	.layui-form-checkbox[lay-skin=primary]:hover i {
		border-color: #e46660!important;
		color: #fff
	}
	.layui-btn-checked {
		background-color: #e46660
	}
	.layui-btn-primary:hover {
		border-color: #e46660!important;
	}
	.layui-btn-primary {
		background-color: #fff
	}
	.layui-laypage-skip input {
    	display: -webkit-inline-box;
	}
	
	.layui-laypage-limits select {
		padding:3px 5px;
	}
	.layui-table-header th {
    	background-color: #e46660; 
    	color: #fff;
    	height:46px
    }
    .layui-laypage-skip input {
    	padding: 0;
    }
    .layui-disabled, .layui-disabled:hover {
   	 	color: rgba(0,0,0,0.75) !important;
    	cursor: not-allowed !important;
	}
	.checkboxtrain input {
    	width: 20px !important;
    	display: inline-block;
    	vertical-align: middle;
	}
  </style>
  
  <script type="text/javascript">
  function goToUrl2(url,code,target) 
  {
	window.location.href="/jyjgl/"+url;
  }
  function spacetrim(str){
  	if(str==null||str==undefined){
  		return "";
  	}
  	var chr="";
  	for(i=0;i<str.length;i++){
  		chr+=str.charAt(i)!=" "?str.charAt(i):"";
  	}
  	return chr;
  }
  	
  function isExp(str,letters){
  	var i,c,result;
  	for(i=0;i<str.length;i++){
  		c=str.charAt(i);
  		if(letters.indexOf(c) < 0){
  			result=false;
  			break;
  		}else{
  			result=true;
  		}
  	}
  	return result;
  }
  </script>
<style>
/*
.layui-table-tool {
	min-height: 150px;
}*/
.layui-form-item {
  margin-bottom: 5px;
}

/* .layui-table-tool {
    padding: 5px 5px 0px 5px;
} */
</style>
</head>
<body class="layui-layout-body">
<div class="layui-body" id="body" style="bottom: 0px;left:0px;background-color:#fff;">
<!-- 应用信息表格 -->
<div class="table-main-right" style="padding: 0px 0px 0px 0px;">

      <div class="layui-tab-item layui-show">
        <div class="layui-main" style="width: auto">
          <div id="LAY_preview">
            <table  class="layui-hide"  id="applicationTable" lay-filter="applicationTable">
	
			</table>
          </div>
        </div>
      </div>
	</div>
	<script type="text/html" id="tabletool">

	<div class="layui-form" style="margin-bottom:0;">
		 	<div class="layui-form-item">
                 <label class="layui-form-label" >姓名</label>
                 <div class="layui-input-inline">
                       <input type="text" name="s_name" id="s_name" placeholder="请输入姓名" autocomplete="off" class="layui-input">
                 </div>
				<label class="layui-form-label" >所属单位</label>
                 <div class="layui-input-inline">
                       <input type="text" name="s_unitname" id="s_unitname" placeholder="请输入所属单位" autocomplete="off" class="layui-input">
                 </div>
                 <label class="layui-form-label" >职位</label>
                 <div class="layui-input-inline">
					   <select name="s_pos" id="s_pos" class="layui-input">
                    		<option value="">全部</option>
                    		<option value="部门负责人">部门负责人</option>
                    		<option value="分管领导">分管领导</option>
                    		<option value="操作使用人员">操作使用人员</option>
                    		<option value="nul">空</option>
                      </select>
                 </div>
            </div>
			
		
			<div class="layui-form-item">
	       	<div class="layui-inline" style="float:right">
	           	<button type="button" class="layui-btn layui-btn-sm"  lay-event="search">搜索</button>
    		  	<button type="reset" class="layui-btn layui-btn-sm layui-btn-normal" lay-event="resetGrid">重置</button>
	       	</div>
			<!--
			<div class="layui-inline" style="float:left">
				<button type="button" class="layui-btn layui-btn-sm layui-btn-checked" lay-event="allexport"><i class="layui-icon"></i> 全部导出</button>
			</div>
			-->
			</div>

	</div>
    </script>
              
<script type="text/javascript">

	 $.fn.serializeObject = function()   
	 {   
		   var o = {};   
		   var a = this.serializeArray();   
		   $.each(a, function() {   
		       if (o[this.name]) {   
		           if (!o[this.name].push) {   
		               o[this.name] = [o[this.name]];   
		           }   
		           o[this.name].push(this.value || '');   
		       } else {   
		           o[this.name] = this.value || '';   
		       }   
		   });   
		   return o;   
	  };
		
	  var form=layui.form;
	  var table = layui.table;
	  var layer=layui.layer;
	  //第一个实例
	 var applicationTable=table.render({
	    elem: '#applicationTable'
	    ,height:  'full-60'
	    ,url: '${jyjglurl}/operator/tableAddress' //数据接口
	    ,toolbar: '#tabletool'
	     ,defaultToolbar: []
	    //,page: true //开启分页
	    ,page: {theme:'#e46660'} //开启分页
	    ,cols: [[ //表头
	   	   {type: 'checkbox', fixed: 'left'}
	      ,{field: 'ID', title: 'ID',hide:true}
	      ,{field: 'OPERATOR_UNITNAME', title: '所属单位'}
	      ,{field: 'OPERATOR_NAME', title:'姓名',width:100}
	      ,{field: 'OPERATOR_ZW', title:'职务',width:150}
	      ,{field: 'OPERATOR_PHONE', title: '联系电话',width:150}
	      ,{field: 'OPERATOR_MOBILE',title:'手机',width:150}
	      ,{field: 'OPERATOR_STATUS',title:'在职情况',width:100}
	    ]]
	 ,done: function (res, curr, count) {
   	  		//findDeviceKind();
   	  		//findDeviceSystem();
   	  	}
	  });
	  //头工具栏事件
	  table.on('toolbar(applicationTable)', function(obj){
	    var checkStatus = table.checkStatus(obj.config.id);
	    switch(obj.event){
	      case 'search':
	    	     var searchWhere=$(".layui-input").serializeObject();
	    	     applicationTable.reload({
	    			     where: searchWhere //设定异步数据接口的额外参数
			    		 ,done: function(res, curr, count){
			    			 //findDeviceKind(res.s_kind);
			    	   	  	 //findDeviceSystem(res.s_devicetype);
			    			 $("#s_name").val(res.s_name);
			    			 $("#s_unitname").val(res.s_unitname);
			    			 $("#s_gww").val(res.s_gww);
			    			 $("#s_systemId").val(res.s_systemId);
			    			 $("#s_pos").val(res.s_pos);
			    			 $("#s_empId").val(res.s_empId);
			    			 $("#s_status").val(res.s_status);
			    			 $("#s_isemp").val(res.s_isemp);
			    			 //$("#s_devicetype").val(res.s_devicetype);
			    			 $("#s_dev").val(res.s_dev);
			    			 //$("#s_kind").val(res.s_kind);
			    			 //this.where={};
			    			 //form.render('select');
				         }
	    	    	  });
	    	  break;
	      case 'resetGrid':
	    	  $(".layui-input").val('');
	    	  var searchWhere=$(".layui-input").serializeObject();
	    	  applicationTable.reload({
 			         where: searchWhere //设定异步数据接口的额外参数
		    		 ,done: function(res, curr, count){
		    			 //findDeviceKind(res.s_kind);
		    	   	  	 //findDeviceSystem(res.s_devicetype);
		    			 $("#s_name").val(res.s_name);
		    			 $("#s_unitname").val(res.s_unitname);
		    			 $("#s_gww").val(res.s_gww);
		    			 $("#s_systemId").val(res.s_systemId);
		    			 $("#s_pos").val(res.s_pos);
		    			 $("#s_empId").val(res.s_empId);
		    			 $("#s_status").val(res.s_status);
		    			 $("#s_isemp").val(res.s_isemp);
		    			 //$("#s_devicetype").val(res.s_devicetype);
		    			 $("#s_dev").val(res.s_dev);
		    			 //$("#s_kind").val(res.s_kind);
		    			 this.where={};
		    			 //form.render('select');
			         }
 	    	  });
	    	  break;
	    };
	  });
	  
	  table.on('row(applicationTable)', function(obj){
		  	obj.tr.toggleClass('layui-table-click');//选中行样式
		 	var checkbox=obj.tr.find('input[name="layTableCheckbox"]');
		 	var checked=checkbox[0].checked;
		 	checkbox.prop("checked",!checked);
		 	form.render('checkbox');
		     var index = obj.tr.data('index');
		     var thisData = table.cache.applicationTable;  //tableName 表名
		     layui.each(thisData, function(i, item){
		       if(index === i){
		         item.LAY_CHECKED = !checked;
		       } else {
		         //delete item.LAY_CHECKED;
		       }
		     })
	  });
	  form.render();
	
	
	//格式化时间
    function createTime(v){
        if(v != '' && v != null){
            var date = new Date(v);
            var y = date.getFullYear();
            var m = date.getMonth()+1;
            m = m<10?'0'+m:m;
            var d = date.getDate();
            d = d<10?("0"+d):d;
            var str = y+"-"+m+"-"+d;
            return str;
        }else{
            return "";
        }
    }
	
	
	
	
</script>
</div>
</body>
</html>


