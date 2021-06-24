myApp.controller('cmsDetailshow_pdf', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils', '$timeout', '$stateParams', 'sessionStorageService', function ($rootScope, $scope, ENV, $state, SysUtils, $timeout, $stateParams, sessionStorageService) {
    $scope.fc.file = sessionStorageService.get($stateParams.tskey);
    $("#pdfContent").attr("src", ENV.serverUri + '/pdf/web/viewer.html?file=' + $scope.fc.file.url);
}]);
