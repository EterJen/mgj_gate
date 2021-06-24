gwNgApp.service("mgjgateUserviewHttp", function ($q, ngHttp,ENV) {
    var self = this;
    this.jsonPost = function (uri, postBean) {
        var defer = $q.defer();

        ngHttp.jsonPost(SysInfo.activeEnv.sourcePrefix + uri, postBean).then(
            function success(res) {
                defer.resolve(res);
            },
            function error(res) {
                defer.reject(res);
            }
        );

        return defer.promise;
    };
    this.jsonPostWithCache = function (uri, postBean, sessionKey) {
        var defer = $q.defer();

        var cacheVal = gwSessionStorge.get(sessionKey);
        if (gwObjectUtils.objNotEmpty(cacheVal,[])) {
            defer.resolve(cacheVal);
        } else {
            ngHttp.jsonPost(SysInfo.activeEnv.sourcePrefix + uri, postBean).then(
                function success(res) {
                    gwSessionStorge.set(sessionKey, res)
                    defer.resolve(res);
                },
                function error(res) {
                    defer.reject(res);
                }
            );
        }

        return defer.promise;
    };

    this.fileUpload = function (url, fd, successFunc) {
        $.ajax({
            url: ENV.serverUri + url,
            data: fd,
            processData: false, //因为data值是FormData对象，不需要对数据做处理。
            contentType: false,
            type: "POST",
            async: false,
            success: function (resultInfo) {
                $(".flyover").hide();
                successFunc(resultInfo);
            },
            error: function (XMLResponse) {
                $(".flyover").hide();
                console.log(JSON.stringify(XMLResponse));
            }
        });
    };

});


