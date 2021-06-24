myApp.controller('cmsDetailshow_video', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils', '$timeout', '$stateParams', 'sessionStorageService', function ($rootScope, $scope, ENV, $state, SysUtils, $timeout, $stateParams, sessionStorageService) {
    $scope.fc.file = sessionStorageService.get($stateParams.tskey);
    $("#pdfContent").attr("src", $scope.fc.file.videoUrl);

    // $("#videoContent").attr("src", $scope.fc.file.videoUrl);
    // new videoOk();

}]);
