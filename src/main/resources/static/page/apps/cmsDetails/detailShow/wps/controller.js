myApp.controller('cmsDetailshow_wps', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils', '$timeout', '$stateParams', 'sessionStorageService', function ($rootScope, $scope, ENV, $state, SysUtils, $timeout, $stateParams, sessionStorageService) {
    $scope.fc.file = sessionStorageService.get($stateParams.tskey);
    console.log($scope.fc.file);
    $scope.wpsClient = new WpsWebClient("wps_plugin", !SysUtils.isWindows(), $scope.fc.file.openType);

    if ("ppt" == $scope.fc.file.openType) {
        SysUtils.requestByJson("/fileOperation/trustedRequest/localRead4Base64Str", {relativePath: $scope.fc.file.relativePath}, function (result) {
            var stringContent = result.data.stringContent;
            console.log(stringContent);
            $scope.wpsClient.openDocumentFromBase64Str(stringContent);
            $scope.wpsClient.setToolbarAllVisible(false);
        });
    } else {
        $scope.wpsClient.openDocumentRemote($scope.fc.file.url, true);
        $scope.wpsClient.setToolbarAllVisible(false);
    }

}]);
