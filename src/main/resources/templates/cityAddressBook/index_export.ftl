<!DOCTYPE html>
<html>
<head>
     <meta http-equiv="X-UA-Compatible" content="IE=8" ></meta>
     <meta charset="utf-8"></meta>
     <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
     <meta http-equiv="pragma" content="no-cache"></meta>
     <meta http-equiv="cache-control" content="no-cache"></meta>
     <meta http-equiv="expires" content="0"></meta>
     <style>
	 @page{size:297mm 210mm;margin-left:0px;margin-right:0px}
	 body {
		     overflow-x:hidden;  
		     /*overflow-y:hidden;*/
		     width:100%;
		     height:100%;
		     
	 }
	 .layui-table td, .layui-table th {
       position: relative;
       padding: 2px 5px;
       /* min-height: 20px; */
       /* line-height: 20px; */
       text-align: center;
       font-size: 14px;
     }
     .td_first_begin{
        border-top:2px solid #000;
        border-left:2px solid #000;
        border-right:2px solid #000;
     }
     .td_first_other{
        border-top:2px solid #000;
        border-right:1px solid #000;
     }
     .td_first_end{
        border-top:2px solid #000;
        border-right:2px solid #000;
     }
     .td_other{
        border-top:1px solid #000;
        border-right:1px solid #000;
     }
     .td_end{
        border-top:1px solid #000;
        border-right:2px solid #000;
     }
     .td_end_first{
        border:2px solid #000;
     }
     .td_end_other{
        border-top:2px solid #000;
        border-right:2px solid #000;
        border-bottom:2px solid #000;
     }
     .layui-table th {
        font-weight: 400;
     }
     .div_10535 {
         /*letter-spacing:14px;
         text-indent:14px;*/
     }
     
     .div_10537 {
         margin:0 auto;width:14px;
     }
     
     .div_10539 {
         margin:0 auto;width:20px;line-height:24px;
     }
     .div_10541 {
         margin:0 auto;width:20px;
     }
     .div_10543 {
         margin:0 auto;width:20px;
     }
     .div_10545{
         margin:0 auto;width:40px;line-height:24px;
     }
     
     .div_10547{
         margin:0 auto;width:20px;line-height:30px;
     }
     .div_10549_1{
         margin:0 auto;width:20px;line-height:27px;float:left;padding-left:4px
     }
     .div_10549_2{
         margin:0 auto;width:20px;line-height:24px;float:left;
     }
     .div_10551{
         margin:0 auto;width:20px;
     }
     .address_10547{
         margin:0 auto;width:20px;
     }
     .address_10549{
         margin:0 auto;width:20px;
     }
	 </style>
</head>
<body>
    
    <table width="98%" border="0" cellpadding="0" cellspacing="0" style="margin-top:100px">
    <tr>
          <td width="33%"></td>
	      <td width="33%" style="text-align:center">
	      <font style="font-family:KaiTi_GB2312;font-size:40px;letter-spacing:20px;">电话表</font>
	      </td>
	      <td width="33%"></td>
	</tr>
	<tr>
	      <td></td>
	      <td style="text-align:center">${date}</td>
	      <td style="font-family:KaiTi_GB2312;text-align:right">办公室制</td>
	</tr>
	</table>
	<table width="98%" border="0" cellpadding="0" cellspacing="0" >
	<tr>
    <td width="49%">
      <table class="layui-table" border="0" cellpadding="0" cellspacing="0" style="padding-top:0px;margin-top:0px;width:100%" lay-filter="cityAddressBook">
	  <thead>
	    <tr style="height:50px">
	      <th width="12%" style="background-color:#FFCC00;font-family:KaiTi_GB2312;" class="td_first_begin">部&#x3000;门</th>
	      <th width="12%" style="font-family:KaiTi_GB2312;" class="td_first_other">姓&#x3000;名</th>
	      <th width="18%" style="font-family:KaiTi_GB2312;" class="td_first_other">房&#x3000;间</th>
	      <th width="12%" style="font-family:KaiTi_GB2312;" class="td_first_other">分&#x3000;机</th>
	      <th width="10%" style="font-family:KaiTi_GB2312;" class="td_first_other">红&#x3000;机</th>
	      <th width="18%" style="font-family:KaiTi_GB2312;" class="td_first_other">工&#x0020;作&#x0020;手&#x0020;机</th>
	      <th width="18%" style="font-family:KaiTi_GB2312;" class="td_first_end">直&#x3000;线</th>
	    </tr> 
	  </thead>
	  <tbody>
	    <#list treemap as key,value>
	        <#if key?index lt 6 > 
	           <#if (value.bookList?size > 0) >
	           <#list value.bookList as book>
	           <tr class="tr_${value.id?c}" style="cursor:pointer">
			      <#if book?index == 0 >
			      <td class="td_first_begin" rowspan="${value.bookList?size}" style="text-align:center;background-color:#FFCC00;font-family:KaiTi_GB2312;">
			      <div class="div_${value.id?c}"><#if value.departname?length==2 >${value.departname?substring(0,1)}&#x3000;${value.departname?substring(1,2)}<#else>${value.departname}</#if></div>
			      </td>
			      </#if>
			      <td colspan="${book.colspanMap.name!1}" rowspan="${book.rowspanMap.name!1}"  style="font-family:KaiTi_GB2312;${("display:"+book.displayMap.name)!""}" <#if book?index == 0>class="td_first_other"<#else>class="td_other"</#if>>
			      <#if book.name?length==2 >
			      ${book.name?substring(0,1)}&#x3000;${book.name?substring(1,2)}
			      <#else>
			      ${(book.name)!''}
			      </#if>
			      </td>
			      <td colspan="${book.colspanMap.room!1}" rowspan="${book.rowspanMap.room!1}" style="font-family:KaiTi_GB2312;${("display:"+book.displayMap.room)!""}" <#if book?index == 0 >class="td_first_other"<#else>class="td_other"</#if>>${(book.room)!''}</td>
			      <td colspan="${book.colspanMap.extension!1}" rowspan="${book.rowspanMap.extension!1}" style="font-family:KaiTi_GB2312;${("display:"+book.displayMap.extension)!""}" <#if book?index == 0 >class="td_first_other"<#else>class="td_other"</#if>>${(book.extension)!''}</td>
			      <td colspan="${book.colspanMap.redphone!1}" rowspan="${book.rowspanMap.redphone!1}" style="font-family:KaiTi_GB2312;${("display:"+book.displayMap.redphone)!""}" <#if book?index == 0 >class="td_first_other"<#else>class="td_other"</#if>>${(book.redphone)!''}</td>
			      <td colspan="${book.colspanMap.mobile!1}" rowspan="${book.rowspanMap.mobile!1}" style="font-family:KaiTi_GB2312;${("display:"+book.displayMap.mobile)!""}" <#if book?index == 0 >class="td_first_other"<#else>class="td_other"</#if>>${(book.mobile)!''}</td>
			      <td colspan="${book.colspanMap.directline!1}" rowspan="${book.rowspanMap.directline!1}" style="font-family:KaiTi_GB2312;${("display:"+book.displayMap.directline)!""}" <#if book?index == 0 >class="td_first_end"<#else>class="td_end"</#if>>${(book.directline)!''}</td>
			    </tr>
			    </#list>
			    <#else>
			    <tr style="height:65px;">
			      <td style="background-color:#FFCC00;font-family:KaiTi_GB2312;" class="td_end_first">
			      <div class="div_${value.id?c}" >
			      ${value.departname}
			      </div>
			      </td>
			      <td colspan="6" style="text-align:center;font-family:FangSong_GB2312;" class="td_end_other">${value.remarks?replace("\n","<br/>")!''}</td>
			    </tr>  
	           </#if>
	           </#if>
	    </#list>   
	  </tbody>
	</table>      
    </td>
    <td width="2%">
    </td>
    <td width="49%">
	<table class="layui-table" border="0" cellpadding="0" cellspacing="0"  style="padding-top:0px;margin-top:0px;width:100%">
	  <thead>
	    <tr style="height:50px">
	      <th width="12%" style="background-color:#FFCC00;font-family:KaiTi_GB2312;" class="td_first_begin">部&#x3000;门</th>
	      <th width="12%" style="font-family:KaiTi_GB2312;" class="td_first_other">姓&#x3000;名</th>
	      <th colspan="2" width="18%" style="font-family:KaiTi_GB2312;" class="td_first_other">房&#x3000;间</th>
	      <th width="12%" style="font-family:KaiTi_GB2312;" class="td_first_other">分&#x3000;机</th>
	      <th width="10%" style="font-family:KaiTi_GB2312;" class="td_first_other">红&#x3000;机</th>
	      <th width="18%" style="font-family:KaiTi_GB2312;" class="td_first_other">工&#x0020;作&#x0020;手&#x0020;机</th>
	      <th width="18%" style="font-family:KaiTi_GB2312;" class="td_first_end">直&#x3000;线</th>
	    </tr> 
	  </thead>
	  <tbody>
	    <#list treemap as key,value>
	        <#if key?index gt 5 > 
	           <#if (value.bookList?size > 0) >
	           <#list value.bookList as book>
	           <tr class="tr_${value.id?c}">
			      <#if book?index == 0 >
			      <td class="td_first_begin" rowspan="${value.bookList?size}" style="background-color:#FFCC00;font-family:KaiTi_GB2312;" >
			      <#if value.departname?length gt 7 >
				      <div class="div_${value.id?c}_1" >${value.departname?substring(0,7)}</div>
				      <div class="div_${value.id?c}_2" >${value.departname?substring(7)}</div>
				  <#else>
			          <div class="div_${value.id?c}" >${value.departname}</div>
			      </#if>
			      
			      </td>
			      </#if>
			      <td colspan="${book.colspanMap.name!1}" rowspan="${book.rowspanMap.name!1}" style="font-family:KaiTi_GB2312;${("display:"+book.displayMap.name)!""}" <#if book?index == 0 >class="td_first_other"<#else>class="td_other"</#if>>
			      <#if book.name?length==2 >
			      ${(book.name?substring(0,1))!''}&#x3000;${(book.name?substring(1,2))!''}
			      <#else>
			      ${(book.name)!''}
			      </#if>
			      </td>
			      <td colspan="${book.colspanMap.address!1}" rowspan="${book.rowspanMap.address!1}" width="9%" style="font-family:KaiTi_GB2312;${("display:"+book.displayMap.address)!""}" <#if book?index == 0 >class="td_first_other"<#else>class="td_other"</#if>><div class="address_${value.id?c}" >${(book.address)!''}</div></td>
			      <td colspan="${book.colspanMap.room!1}" rowspan="${book.rowspanMap.room!1}" width="9%" style="font-family:KaiTi_GB2312;${("display:"+book.displayMap.room)!""}" <#if book?index == 0 >class="td_first_other"<#else>class="td_other"</#if>>${(book.room)!''}</td>
			      <td colspan="${book.colspanMap.extension!1}" rowspan="${book.rowspanMap.extension!1}" style="font-family:KaiTi_GB2312;${("display:"+book.displayMap.extension)!""}" <#if book?index == 0 >class="td_first_other"<#else>class="td_other"</#if>>${(book.extension)!''}</td>
			      <td colspan="${book.colspanMap.redphone!1}" rowspan="${book.rowspanMap.redphone!1}" style="font-family:KaiTi_GB2312;${("display:"+book.displayMap.redphone)!""}" <#if book?index == 0 >class="td_first_other"<#else>class="td_other"</#if>>${(book.redphone)!''}</td>
			      <td colspan="${book.colspanMap.mobile!1}" rowspan="${book.rowspanMap.mobile!1}" style="font-family:KaiTi_GB2312;${("display:"+book.displayMap.mobile)!""}" <#if book?index == 0 >class="td_first_other"<#else>class="td_other"</#if>>${(book.mobile)!''}</td>
			      <td colspan="${book.colspanMap.directline!1}" rowspan="${book.rowspanMap.directline!1}" style="font-family:KaiTi_GB2312;${("display:"+book.displayMap.directline)!""}" <#if book?index == 0 >class="td_first_end"<#else>class="td_end"</#if>>${(book.directline)!''}</td>
			    </tr>
			    </#list>
			    <#else>
			    <tr style="height:65px;">
			      <td style="background-color:#FFCC00;font-family:KaiTi_GB2312;" class="td_end_first">
			      <div class="div_${value.id?c}"><#if value.departname?length==2 >${value.departname?substring(0,1)}&#x3000;${value.departname?substring(1,2)}<#else>${value.departname}</#if></div>
			      </td>
			      <td colspan="7" style="text-align:center;font-family:FangSong_GB2312;" class="td_end_other">${value.remarks?replace("\n","<br/>")!''}</td>
			    </tr>  
	           </#if>
	           </#if>
	    </#list>
	    
	  </tbody>
	</table>
    </td>
    </tr>
    </table>
</body>
</html>