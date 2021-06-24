myApp.controller('addressBookCtrl', ['$rootScope', '$scope', 'ENV', '$state',  'SysUtils', '$timeout','$stateParams', function ($rootScope, $scope, ENV, $state, SysUtils, $timeout,$stateParams) {
    

	$('.phone-book-main .head').click(function(){		
		$(this).parent().toggleClass("sel");
		$(this).next(".card-cont").toggle("fast");
	});// 队伍建设tab
	
	$(document).ready(function(){
    	/*设置默认激活的选项卡eq(i)*/
        var aL = $(".list:eq(0)");
        $("#active").width(aL.innerWidth());
        $("#active").offset(aL.offset());
        aL.addClass("listA");

        /*为每个按钮添加点击事件*/
        $(".list").click(function() {
            $("#active").offset($(this).offset());   //设置位置
            $(this).addClass("listA");
            $(".list").not(this).removeClass("listA");
            var div=$(".tabcontentBG > div").eq($(this).index());
            //alert(div.html().length)
            if(div.html().length==0)
            	div.load(div.attr("url"));
            div.show().siblings().hide();
        });

        /*hover效果*/
        $(".list").hover(function () {
            $(this).addClass("listH")
        },function () {
            $(this).removeClass("listH")
        })
    });
	
	
	$('.bt-dc').click(function(){		
		var uri = document.location.toString();
        var end = uri.indexOf('/page/index.html');
        var HostUri = uri.substr(0,end);
	    window.open(HostUri+'/cityAddressBook/export');
	});// 队伍建设tab
	
	$('.txl-gl').click(function(){
		var uri = document.location.toString();
        var end = uri.indexOf('/page/index.html');
        var HostUri = uri.substr(0,end);
	    window.open(HostUri+'/index.html#!/coreHome/cityAddressBook');
	});// 队伍建设tab
}]);
