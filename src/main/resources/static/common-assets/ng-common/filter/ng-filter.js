gwNgApp.filter('mgjgatefileRead', function () {
    return function (info) {
        if (!info) {
            return;
        }
        var res = '';
        res = SysInfo.activeEnv.sourcePrefix + '/fileOperation/trustedRequest/remoteRead/' + info;
        return res;
    };
}).filter('timeYmd', function () {
    return function (info) {
        if (!info) {
            return;
        }
        var res = '';
        res = info.substr(0,10)
        return res;
    };
}).filter('dateStrFormatZh', function () {
    return function (info) {
        if (!info) {
            return;
        }
        var res = '';
        res = new Date(info).format('yyyy年MM月dd日');
        return res;
    };
}).filter('trustedSceHtml', ['$sce', function ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        };
    }]
).filter("highLight", function ($sce) {
    return function (text, search,hcss) {
        if (!search) {
            return $sce.trustAsHtml(text);
        }
        if (text) {
            //text = encodeURIComponent(text);
            // search = encodeURIComponent(search);
            var regex = new RegExp(search, 'gi');
            var result = text.replace(regex, '<span class="'+hcss+'">$&</span>');
            // result = decodeURIComponent(result);
            return $sce.trustAsHtml(result);
        }
    };
});