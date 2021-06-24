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
       padding: 1px 1px;
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
<div class="layui-row layui-col-space10">
    <div class="layui-col-md12" style="padding-bottom:0px">
	<table class="layui-table" lay-skin="nob" style="padding-bottom:0px;margin-bottom:0px;display:none">
	  <tbody>
	    <tr>
	      <td width="333"></td>
	      <td width="333" style="text-align:center">
	      <font size=20 style="letter-spacing:20px;">电话表</font>
	      </td>
	      <td width="333"></td>
	    </tr>
	    <tr>
	      <td></td>
	      <td style="text-align:center">2020.03</td>
	      <td style="text-align:right">办公室制</td>
	    </tr>
	  </tbody>
	</table>
    </div>  
    <div class="layui-col-md6" style="padding-top:0px">
	<table class="layui-table" style="padding-top:0px;margin-top:0px">
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
	      <th style="text-align:justify;">姓名</th>
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
	           <tr class="tr_${value.id?c}">
			      <#if book?index == 0 >
			      <td rowspan="${value.bookList?size}">
			      <#if value.departname?length gt 2 >
				      ${value.departname?replace('','<br/>')?remove_beginning("<br/>")}
			      <#else>
			          ${value.departname}
			      </#if>
			      </td>
			      </#if>
			      <td>
			      <#if book.name?length==2 >
			      ${(book.name?substring(0,1))!''} ${(book.name?substring(1,2))!''}
			      <#else>
			      ${(book.name)!''}
			      </#if>
			      </td>
			      <td>${(book.room)!''}</td>
			      <td>${(book.extension)!''}</td>
			      <td>${(book.redphone)!''}</td>
			      <td>${(book.mobile)!''}</td>
			      <td>${(book.directline)!''}</td>
			    </tr>
			    </#list>
			    <#else>
			    <tr>
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
	      <th>姓名</th>
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
	           <tr class="tr_${value.id?c}">
			      <#if book?index == 0 >
			      <td rowspan="${value.bookList?size}">
			      <#if value.departname?length gt 3 >
				      ${value.departname?replace('','<br/>')?remove_beginning("<br/>")}
			      <#else>
			          ${value.departname}
			      </#if>
			      </td>
			      </#if>
			      <td>
			      <#if book.name?length==2 >
			      ${(book.name?substring(0,1))!''} ${(book.name?substring(1,2))!''}
			      <#else>
			      ${(book.name)!''}
			      </#if>
			      </td>
			      <td>${(book.address)!''}</td>
			      <td>${(book.room)!''}</td>
			      <td>${(book.extension)!''}</td>
			      <td>${(book.redphone)!''}</td>
			      <td>${(book.mobile)!''}</td>
			      <td>${(book.directline)!''}</td>
			    </tr>
			    </#list>
			    <#else>
			    <tr>
			      <td>${value.departname}</td>
			      <td colspan="6" style="text-align:center">${value.remarks?replace("\n","<br/>")!''}</td>
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
$(document).ready(function(){
     <#list treemap as key,value>
         <#if (value.bookList?size > 0)   >
              var tr_${value.id?c}=$(".tr_${value.id?c}");
              for(var i=1; i<tr_${value.id?c}.length; i++)
              { 
                   var row=tr_${value.id?c}[i];
                   //console.log("当前行==="+$(row).html());   
                   //console.log("当前行单元格个数==="+row.cells.length);
                   for(var j=0;j<row.cells.length;j++)
                   {
                       var now=row.cells[j];
                       //console.log("当前单元格==="+$(now).text());
                       for(var k=i-1;k>=0;k--)
                       {
                               var last=tr_${value.id?c}[k].cells[j];
                               if(k==0)
                                  last=tr_${value.id?c}[k].cells[j+1];
                               
                               //console.log("上一个单元格==="+$(last).parent().html());
                               
                               if($(now).text()=="" || $(now).text()!=$(last).text() )
                               {   
                                  break;    
                               }
                               else if($(now).text()==$(last).text())
                               {
                                   
                                   if(last.style.display=="none")
                                      continue;
                                   else
                                   {
                                      now.style.display="none";
                                      last.rowSpan +=1; 
                                   }
                               }  
                       }
                   }
              }
         </#if>        
     </#list>   
 });

</script>
</html>
