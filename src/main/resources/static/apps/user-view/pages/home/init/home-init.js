/*home 用户查看主页*/
gwNgApp.controller('homeInitCtl', ['$scope', 'mgjgateUserviewHttp','$rootScope','$state', '$timeout','NgLoading', function ($scope,mgjgateUserviewHttp,$rootScope,$state, $timeout,NgLoading) {
    $scope.bean = {};
    $scope.bean.bayWindow = {};
    $scope.fc.activeTopBar = $scope.fc.topBarMap.home.en;
    $scope.fc.articleNameLike = '';
    $scope.openlink = function (l) {
        if (gwObjectUtils.notEmpty(l.link,[])) {
            window.open(l.link)
        }
    };
    mgjgateUserviewHttp.jsonPost("/trustedRequest/gateFirstPage/init", {}).then(
        function (res) {
            $scope.bean = res.bean;

            $scope.bean.activeZfbmLink = $scope.bean.zfbmLinks[0];
            $scope.bean.activeMmglbmLink = $scope.bean.mmglbmLinks[0];
            $scope.bean.activeXgbmLink = $scope.bean.xgbmLinks[0];
        }
    );
    console.log('homeInitCtl')
    $scope.lastLoad = function ($last, id) {
            NgLoading.ngLoadingEnd();
            $('#' + id).owlCarousel({
                items: 1,
                autoPlay: 2500,
                loop: true,
                startDragging: true,
            });

    };

    $scope.bayWindow = {};
    $scope.bayWindowClose = function ($event) {
        $event.stopPropagation();
        $scope.bayWindow.bayClose();
    }
    $scope.bayWindowInit = function () {
        $scope.bayWindow = $('#mgj-bay-window').autoMove({angle:-Math.PI/4, speed:400});
        $scope.bayWindow.bayStart();
    };


}]);
