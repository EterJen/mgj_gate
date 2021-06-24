myApp.controller('cmsDetailsCtrl', ['$rootScope', '$scope', 'ENV', '$state', 'SysUtils', '$timeout', '$stateParams', 'sessionStorageService', function ($rootScope, $scope, ENV, $state, SysUtils, $timeout, $stateParams, sessionStorageService) {
    /*************************一、变量定义****************************/
    $scope.fc = {
        article: {},
        file: {},
        articleId: $stateParams.parameterId,
    };


    /*************************二、函数定义****************************/


    $scope.init = function () {
        if ("justShow" == $scope.fc.articleId) {
            console.log('justShow');
            return;
        }
        SysUtils.requestByJson('/article/read/' + $scope.fc.articleId, {}, function (resultInfo) {
            $scope.fc.article = resultInfo.bean;
            if (SysUtils.notEmpty($scope.fc.article, ['image'])) {
                $scope.fc.file = {
                    url: ENV.serverUri + $scope.fc.article.image,
                    openType: "image"
                };
            } else if (SysUtils.notEmpty($scope.fc.article, ['pdfpath'])) {
                pdfpath = $scope.fc.article.pdfpath;
                var fileSuffix = SysUtils.judgeSuffix(pdfpath).toLowerCase();
                let openType = SysUtils.docOpentMap[fileSuffix];
                $scope.fc.file = {
                    videoUrl: ENV.serverUri + "/fileOperation/trustedRequest/processRequest?video=" + pdfpath,
                    relativePath: pdfpath.replace("/fileOperation/trustedRequest/remoteRead/", ""),
                    url: ENV.serverUri + pdfpath,
                    openType: openType
                };
            }else if (SysUtils.notEmpty($scope.fc.article, ['content'])) {
                $scope.fc.file = {
                    openType: "content"
                };
            }

            let tskey = $stateParams.parameterId;
            sessionStorageService.set(tskey, $scope.fc.file);
            $state.go("cmsDetails." + $scope.fc.file.openType, {tskey: tskey});
        });

    };


    $scope.onlineOpenAble = function (pdfAtt) {
        let judgeSuffix = SysUtils.judgeSuffix(pdfAtt.uuidName);
        let openType = SysUtils.docOpentMap[judgeSuffix];
        if (SysUtils.notEmpty(openType, [])) {
            return true;
        }
        return false;
    };


    windowMap = {};
    $scope.onlineOpen = function (pdfAtt) {
        pdfpath = pdfAtt.uuidName;
        var fileSuffix = SysUtils.judgeSuffix(pdfpath).toLowerCase();

        let openType = SysUtils.docOpentMap[fileSuffix];

        if (!SysUtils.notEmpty(openType, [])) {
            SysUtils.swalForTips("提示", "目标文件不支持在线打开，请下载至本地后查看", "info", function () {
            });
            return;
        }

        if ("video" ==$scope.fc.file.openType && "video" ==openType) {
            $("#pdfContent").attr("src", ENV.serverUri + "/fileOperation/trustedRequest/processRequest?video=" + pdfpath);
            return;
        }

        newfile = {
            relativePath: pdfpath,
            url: ENV.serverUri + "/fileOperation/trustedRequest/remoteRead" + pdfpath,
            videoUrl: ENV.serverUri + "/fileOperation/trustedRequest/processRequest?video=" + pdfpath,
            openType: openType
        };



        let ts = new Date().getTime();
        sessionStorageService.set(ts, newfile);

        var oldWindow = windowMap[pdfAtt.id];
        if (SysUtils.notEmpty(oldWindow, [])) {
            oldWindow.close();
        }
        newWindow = window.open(ENV.serverUri + "/page/index.html#!/cmsDetails/justShow/" + newfile.openType + "/" + ts, pdfAtt.id);
        windowMap[pdfAtt.id] = newWindow;
    };


    $scope.hasAtt = false;
    $scope.showFileList = function (doc) {
        if (SysUtils.notEmpty(doc, ['simpleFiles'])) {
            $scope.hasAtt = true;
            return true;
        } else {
            $scope.hasAtt = false;
            return false;
        }
    };

    $scope.flieDownload = function (file) {
        var simpleFile = {};
        simpleFile.relativePath = file.uuidName;
        simpleFile.downloadName = file.originalName;
        SysUtils.remoteDownload(simpleFile);
    };


    /*************************三、自动执行函数****************************/
    $scope.init();

}]);
