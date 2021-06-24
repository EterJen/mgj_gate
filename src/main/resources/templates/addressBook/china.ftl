
        <#if book.id??>     
	    <img id="chinaAddressBook" src="${springMacroRequestContext.contextPath}/chinaAddressBook/downloadChina?fileid=${book.id?c}"/>
        </#if>

<script type="text/javascript">
$(document).ready(function(){
         
        $("#chinaAddressBook").width($(".tabcontentBG").width());
        $("#chinaAddressBook").height(window.parent.document.body.clientHeight-350);
        
        $(window).resize(function(){
	       	 $("#chinaAddressBook").width($(".tabcontentBG").width());
	       	 $("#chinaAddressBook").height(window.parent.document.body.clientHeight-350);
        });
});
</script>
