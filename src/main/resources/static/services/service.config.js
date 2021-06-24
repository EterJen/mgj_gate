myApp.factory('dataFactory', function (ENV, $http, $q, $state) {
    var factory = {};
    factory.getlist = function (endpoint, method, headers, params) {
        $(".flyover").show();
        var defer = $q.defer();
        // headers.Content = "application/x-www-form-urlencoded;charset=UTF-8";
        // headers.Authorization = "Bearer " + user.token;
        if (method == 'GET') {
            $http({
                url: endpoint,
                method: "GET",
                headers: headers,
                params: params,
            }).then(
                function successCallback(data) {
                    $(".flyover").hide();
                    if (data.data.resultType == 'sessionInvalid' || data.data.resultType == 'notLogin') {
                        window.location.href = ENV.serverUri;
                    } else if (data.data.resultType == 'noUriAuth') {
                        window.location.href = ENV.serverUri;
                    }
                    defer.resolve(data.data);
                },
                function errorCallback(data) {
                    $(".flyover").hide();
                    defer.resolve(data);
                });
        } else {
            $http({
                method: method,
                url: endpoint,
                dataType: 'json',
                headers: headers,
                data: params,
            }).then(
                function successCallback(data) {
                    $(".flyover").hide();
                    if (data.data.resultType == 'sessionInvalid' || data.data.resultType == 'notLogin') {
                        window.location.href = ENV.serverUri;
                    } else if (data.data.resultType == 'noUriAuth') {
                        window.location.href = ENV.serverUri;
                    }
                    //console.log(data)
                    defer.resolve(data.data);
                },
                function errorCallback(data) {
                    $(".flyover").hide();
                    defer.resolve(data);
                }
            )
        }
        return defer.promise;
    };
    return factory;
});