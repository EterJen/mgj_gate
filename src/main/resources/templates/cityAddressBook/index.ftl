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
	 .layui-table td, .layui-table th {
       position: relative;
       padding: 4px 5px;
       /* min-height: 20px; */
       /* line-height: 20px; */
       text-align: center;
       font-size: 14px;
     }
     .layui-table th {
        
        letter-spacing:10px;
        font-weight: 400;
     }
	 </style>
</head>
<body>
    <!--
    <div style="font-family:KaiTi_GB2312;position:absolute;left:10%;top:10px;z-index:9999;opacity:0.3;font-size:500px">
    保
    </div>
    <div style="font-family:KaiTi_GB2312;position:absolute;left:60%;top:10px;z-index:9999;opacity:0.3;font-size:500px">
    密
    </div>
    -->
<div class="layui-row layui-col-space10">
    <div class="layui-col-md12" style="padding-bottom:0px">
    <table class="layui-table" lay-skin="nob" style="padding-bottom:0px;margin-bottom:0px;">
	  <tbody>
	    <tr>
	      <td width="333"></td>
	      <td width="333" style="text-align:center"></td>
	      <td width="333" style="text-align:right">
	      <button type="button" class="layui-btn" onclick="editDepart()">新增部门</button>
	      <button type="button" class="layui-btn layui-btn-normal" onclick="editUser()">新增人员</button>
	      <button type="button" class="layui-btn layui-btn-normal" onclick="exportPDF()">导出</button>
	      </td>
	    </tr>
	  </tbody>
	</table>
    </div>  
    <div class="layui-col-md6" style="padding-top:0px">
	<table class="layui-table" style="padding-top:0px;margin-top:0px" lay-filter="cityAddressBook">
	  <colgroup>
	    <col width="100">
	    <col width="100">
	    <col width="150">
	    <col width="100">
	    <col width="100">
	    <col width="150">
	    <col width="150">
	  </colgroup>
	  <thead>
	    <tr>
	      <th>部门</th>
	      <th>姓名</th>
	      <th>房间</th>
	      <th>分机</th>
	      <th>红机</th>
	      <th>工作手机</th>
	      <th>直线</th>
	    </tr> 
	  </thead>
	  <tbody>
	    <#list treemap as key,value>
	        <#if key?index lt 6 > 
	           <#if (value.bookList?size > 0) >
	           <#list value.bookList as book>
	           <tr onclick="editUser('${book.id?c}');" class="tr_${value.id?c}" style="cursor:pointer">
			      <#if book?index == 0 >
			      <td rowspan="${value.bookList?size}" style="text-align:center" onclick="editDepart('${value.id?c}');event.stopPropagation();">
			      <#if value.departname?length gt 2 >
				      ${value.departname?replace('','<br/>')?remove_beginning("<br/>")}
			      <#else>
			          ${value.departname}
			      </#if>
			      </td>
			      </#if>
			      <td colspan="${book.colspanMap.name!1}" rowspan="${book.rowspanMap.name!1}" style="${("display:"+book.displayMap.name)!""}">
			      <#if book.name?length==2 >
			      ${(book.name?substring(0,1))!''} ${(book.name?substring(1,2))!''}
			      <#else>
			      ${(book.name)!''}
			      </#if>
			      </td>
			      <td colspan="${book.colspanMap.room!1}" rowspan="${book.rowspanMap.room!1}" style="${("display:"+book.displayMap.room)!""}">${(book.room)!''}
			      </td>
			      <td colspan="${book.colspanMap.extension!1}" rowspan="${book.rowspanMap.extension!1}" style="${("display:"+book.displayMap.extension)!""}">${(book.extension)!''}</td>
			      <td colspan="${book.colspanMap.redphone!1}" rowspan="${book.rowspanMap.redphone!1}" style="${("display:"+book.displayMap.redphone)!""}">${(book.redphone)!''}</td>
			      <td colspan="${book.colspanMap.mobile!1}" rowspan="${book.rowspanMap.mobile!1}" style="${("display:"+book.displayMap.mobile)!""}">${(book.mobile)!''}</td>
			      <td colspan="${book.colspanMap.directline!1}" rowspan="${book.rowspanMap.directline!1}" style="${("display:"+book.displayMap.directline)!""}">${(book.directline)!''}</td>
			    </tr>
			    </#list>
			    <#else>
			    <tr onclick="editDepart('${value.id?c}');event.stopPropagation();"  style="cursor:pointer">
			      <td>${value.departname}</td>
			      <td colspan="6" style="text-align:center">${value.remarks?replace("\n","<br/>")!''}</td>
			    </tr>  
	           </#if>
	           </#if>
	    </#list>   
	  </tbody>
	</table>      
    </div>
    <div class="layui-col-md6" style="padding-top:0px">
	<table class="layui-table" style="padding-top:0px;margin-top:0px">
	  <colgroup>
	    <col width="150">
	    <col width="200">
	    <col width="100">
	    <col width="100">
	    <col width="200">
	    <col width="200">
	    <col width="200">
	    <col width="200">
	  </colgroup>
	  <thead>
	    <tr>
	      <th>部门</th>
	      <th style="text-align:justify;">姓名</th>
	      <th colspan="2">房间</th>
	      <th>分机</th>
	      <th>红机</th>
	      <th>工作手机</th>
	      <th>直线</th>
	    </tr> 
	  </thead>
	  <tbody>
	    <#list treemap as key,value>
	        <#if key?index gt 5 > 
	           <#if (value.bookList?size > 0) >
	           <#list value.bookList as book>
	           <tr onclick="editUser('${book.id?c}');" class="tr_${value.id?c}" style="cursor:pointer">
			      <#if book?index == 0 >
			      <td rowspan="${value.bookList?size}" onclick="editDepart('${value.id?c}');event.stopPropagation();">
			      <#if value.departname?length gt 3 >
				      ${value.departname?replace('','<br/>')?remove_beginning("<br/>")}
			      <#else>
			          ${value.departname}
			      </#if>
			      </td>
			      </#if>
			      <td colspan="${book.colspanMap.name!1}" rowspan="${book.rowspanMap.name!1}" style="${("display:"+book.displayMap.name)!""}">
			      <#if book.name?length==2 >
			      ${(book.name?substring(0,1))!''} ${(book.name?substring(1,2))!''}
			      <#else>
			      ${(book.name)!''}
			      </#if>
			      </td>
			      <td colspan="${book.colspanMap.address!1}" rowspan="${book.rowspanMap.address!1}" style="${("display:"+book.displayMap.address)!""}">${(book.address)!''}</td>
			      <td colspan="${book.colspanMap.room!1}" rowspan="${book.rowspanMap.room!1}" style="${("display:"+book.displayMap.room)!""}">${(book.room)!''}</td>
			      <td colspan="${book.colspanMap.extension!1}" rowspan="${book.rowspanMap.extension!1}" style="${("display:"+book.displayMap.extension)!""}">${(book.extension)!''}</td>
			      <td colspan="${book.colspanMap.redphone!1}" rowspan="${book.rowspanMap.redphone!1}" style="${("display:"+book.displayMap.redphone)!""}">${(book.redphone)!''}</td>
			      <td colspan="${book.colspanMap.mobile!1}" rowspan="${book.rowspanMap.mobile!1}" style="${("display:"+book.displayMap.mobile)!""}">${(book.mobile)!''}</td>
			      <td colspan="${book.colspanMap.directline!1}" rowspan="${book.rowspanMap.directline!1}" style="${("display:"+book.displayMap.directline)!""}">${(book.directline)!''}</td>
			    </tr>
			    </#list>
			    <#else>
			    <tr onclick="editDepart('${value.id?c}');event.stopPropagation();"  style="cursor:pointer">
			      <td>${value.departname}</td>
			      <td colspan="7" style="text-align:center">${value.remarks?replace("\n","<br/>")!''}</td>
			    </tr>  
	           </#if>
	           </#if>
	    </#list>
	    
	  </tbody>
	</table>
    </div>
</div>
</body>
<script type="text/javascript">
 function compareNext()
 {
     
 }  

 $(document).ready(function(){
        
 });


 function editUser(userid)
 {
    //修改用户
    //alert("点击修改用户");
    var url="${springMacroRequestContext.contextPath}/cityAddressBook/editUser";
    if(userid!=undefined)
    {
       url+="?userid="+userid;
    }
    layer.open({
	  type: 2,
	  area: ['800px', '80%'],
	  fixed: false, //不固定
	  maxmin: true,
	  content: url
	}); 
 }
 function editDepart(departid)
 {
    //修改部门
    //alert("点击修改部门");
    var url="${springMacroRequestContext.contextPath}/cityAddressBook/editDepart";
    if(departid!=undefined)
    {
       url+="?departid="+departid;
    }
    
	layer.open({
	  type: 2,
	  area: ['700px', '450px'],
	  fixed: false, //不固定
	  maxmin: true,
	  content: url
	}); 
 }
 function exportPDF()
 {
    window.open('${springMacroRequestContext.contextPath}/cityAddressBook/export');
 }
</script>
</html>