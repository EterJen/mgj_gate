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
.layui-form-label{
  width:145px
}
/* .layui-table-tool {
    padding: 5px 5px 0px 5px;
} */
</style>
</head>
<body class="layui-layout-body">
<div class="layui-body" id="body" style="bottom: 0px;left:0px;background-color:#fff;">
<!-- 应用信息表格 -->
<div class="table-main-right">

<div class="fgx"></div>
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
				<label class="layui-form-label" >所属区县</label>
                <div class="layui-input-inline">
					<input type="text" name="s_qx" id="s_qx" placeholder="请输入区县" autocomplete="off" class="layui-input">
                </div>
            </div>
		
			<div class="layui-form-item">
	       	<div class="layui-inline" style="float:right">
	           	<button type="button" class="layui-btn layui-btn-sm"  lay-event="search">搜索</button>
    		  	<button type="reset" class="layui-btn layui-btn-sm layui-btn-normal" lay-event="resetGrid">重置</button>
	       	</div>
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
	    ,url: '${jyjglurl}/employee/tableAddress' //数据接口
	    ,toolbar: '#tabletool'
	     ,defaultToolbar: []
	    //,page: true //开启分页
	    ,page: {theme:'#e46660'} //开启分页
	    ,cols: [[ //表头
	   	 {type: 'checkbox', fixed: 'left'}
	   	  ,{field: 'ID', title: 'ID',hide:true}
	   	  ,{field: 'INTERBOROUGH', title: '所在区县'}
	      ,{field: 'NAME', title: '姓名'}
	      ,{field: 'POSITION', title: '职位'}
	      ,{field: 'POST', title: '现任职务'}
	      ,{field: 'SEX', title: '性别'}
	      ,{field: 'POSTTIME', title: '任职时间'}
	      ,{field: 'EMPLOYEE_STATUS', title: '在职情况'}
	    ]]
	    ,done: function (res, curr, count) {
	    	  getQx();
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
			    			 getQx(res.s_qx);
			    			 $("#s_name").val(res.s_name);
			    			 $("#s_qx").val(res.s_qx);
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
		    			 getQx(res.s_qx);
		    			 $("#s_name").val(res.s_name);
		    			 $("#s_status").val(res.s_status);
		    			 this.where={};
		    			 //form.render('select');
			         }
 	    	  });
	    	  break;
	    };
	  });
	  
	  //监听行工具事件
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
	
	function getQx(value){
		console.log(value);
	}
	
</script>
</div>
</body>
</html>


