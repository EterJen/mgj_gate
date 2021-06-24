
	<div class="phone-book-cont clearfix">
        
		<div class="tit"></div>
		<div class="bt-dc"></div>
		<#if isTxlMgr>
		<div class="txl-gl"></div>
		</#if>
		<div class="container">
			<div class="BG">
				<div class="list">市委机要局</div>
				<div class="list">各区委机要局</div>
				<div class="list">各密码装机单位</div>
				<div class="list">中办机要局</div>
				<div id="active"></div>
			</div>
		</div>
		<!--container-end-->
		<div class="tabcontentBG">
		<div class="phone-book-main">
			<div class="mask"
				style="position: absolute; width: 10px; background: #fff; height: 18px; margin-left: 10px;"></div>
			<!--勿删-->
			<div class="mask"
				style="position: absolute; width: 10px; background: #fff; height: 18px; margin-left: 10px; bottom: 0"></div>
			<!--勿删-->
			<#list treemap as key,value>
			<#if (value.bookList?size > 0) >
			<div <#if key?index==0 || key?index==1 >class="item sel"<#else>class="item"</#if>>
			    <div class="head">
					<div class="i-l"></div>
					<div class="mid">${value.departname}</div>
					<div class="i-r"></div>
				</div> 
			<div <#if key?index==0 || key?index==1 >class="card-cont card-cont-2 clearfix"<#else>class="card-cont dn clearfix"</#if>>
			<#list value.bookList as book>
			    <div <#if book.address?length gt 1>class="cardB"<#else>class="card"</#if>>
						<div class="name">
							${(book.name)!''}
							<div class="room">
								<b>房间</b>：
							<#if book.room?length gt 1>
							   ${(book.room)!''}    
							<#else>
							   &#x3000;&#x3000;
							</#if>	
							</div>
						</div>
						<div class="l">
							<b>分 机</b>：
							<#if book.extension?length gt 1>
							   ${(book.extension)!''}    
							<#else>
							   &#x3000;&#x3000;
							</#if>
						</div>
						<div class="l">
							<b>红 机</b>：
							<#if book.redphone?length gt 1>
							   ${(book.redphone)!''}    
							<#else>
							   &#x3000;&#x3000;
							</#if>
						</div>
						<div>
							<b>直 线</b>：${(book.directline)!''}
						</div>
						<div>
							<b>工作手机</b>：${(book.mobile)!''}
						</div>
						<#if book.address?length gt 1>
						<div>
							<b>地址</b>：${(book.address)!''}
						</div>
						</#if>
				</div>
			</#list>
			</div>
			</div>
			</#if>
			</#list>
			
			<#list treemap as key,value>
			<#if (value.bookList?size == 0) >
			<div <#if key?index==0 || key?index==1 >class="item sel"<#else>class="item"</#if>>
			    <div class="head">
					<div class="i-l"></div>
					<div class="mid">${value.departname}</div>
					<div class="i-r"></div>
				</div>
			    <div <#if key?index==0 || key?index==1 >class="card-cont card-cont-2 clearfix"<#else>class="card-cont dn clearfix"</#if>>
			        <div class="cardA">
						<div>
							<b>${value.remarks?replace("\n","<br/>")!''}</b>
						</div>
			        </div>	 
			    </div>
			</div>    
			</#if>
			</#list>
			
		</div>
		<div style="display:none;text-align:center" urlA="${springMacroRequestContext.contextPath}/page/addressBook/district?page=1">
	    <img src="${springMacroRequestContext.contextPath}/page/images/wh.png" />
		</div>
		<div style="display:none;text-align:center" urlA="${springMacroRequestContext.contextPath}/page/addressBook/unit?page=1">
		<img src="${springMacroRequestContext.contextPath}/page/images/wh.png" />
		</div>
		<div style="display:none;text-align:center" url="${springMacroRequestContext.contextPath}/page/addressBook/china">
			<img src="${springMacroRequestContext.contextPath}/page/images/wh.png" />
        </div>
		<!--phone-book-main-end-->
        </div>
        



	</div>
	<!--phone-book-cont-end-->

	
	<!--footer-bar-end-->


