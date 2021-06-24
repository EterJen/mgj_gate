myApp.controller('cityAddressBookCtl', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils', '$timeout','$stateParams','dataFactory', function ($rootScope, $scope, ENV, $state, SysUtils, $timeout,$stateParams,dataFactory) {
	console.log("cityAddressBookCtl controller==");
	
	$(document).ready(function(){
        $("#cityAddressBookFrame").width($(".content-wrapper").width());
        $("#cityAddressBookFrame").height(document.body.clientHeight-105);
        $("#cityAddressBookFrame").attr("src",ENV.templateLocate+$("#cityAddressBookFrame").attr("url"));
        $(window).resize(function(){
	       	 $("#cityAddressBookFrame").width($(".content-wrapper").width());
	       	 $("#cityAddressBookFrame").height(document.body.clientHeight-105);
        });
    });
	
	
	
	
	
	
	
	
}]);
