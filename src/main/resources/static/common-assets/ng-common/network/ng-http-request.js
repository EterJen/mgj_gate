gwNgApp.service("ngHttp", function ($q, $http) {
    var self = this;
    this.jsonPost = function (url, postBean) {
        var defer = $q.defer();
        headers = {
            'Content-Type': 'application/json;charset=utf8'
        };
        var httpBody = {
            url: url,
            method: "POST",
            headers: headers,
            dataType: 'json',
            data: postBean,
        }
        $http(httpBody).then(
            function success(res) {
                defer.resolve(res.data);
            },
            function error(res) {
                defer.reject(res);
            });

        return defer.promise;
    };
});


