myApp.controller('chinaAddressBookCtl', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils', '$timeout','$stateParams','dataFactory', function ($rootScope, $scope, ENV, $state, SysUtils, $timeout,$stateParams,dataFactory) {
	console.log("chinaAddressBookCtl controller==");
	
	$(document).ready(function(){
        $("#chinaAddressBookFrame").width($(".content-wrapper").width());
        $("#chinaAddressBookFrame").height(document.body.clientHeight-105);
        $("#chinaAddressBookFrame").attr("src",ENV.templateLocate+$("#chinaAddressBookFrame").attr("url"));
        
        $(window).resize(function(){
	       	 $("#chinaAddressBookFrame").width($(".content-wrapper").width());
	       	 $("#chinaAddressBookFrame").height(document.body.clientHeight-105);
        });
    });
	
	
	
	
	
}]);
