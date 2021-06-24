myApp.filter('cut', function () {
    return function (value, wordwise, max, tail) {
        if (!value) return '';
        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;
        if (wordwise) {
            var lastspace = value.lastIndexOf('.');
            if (lastspace != -1) {
                value = value.substr(0, lastspace);
            }
        }

        if (value.length <= max) {
            return value + (tail || ' …');//'...'可以换成其它文字
        }
        value = value.substr(0, max);
        return value + (tail || ' …');//'...'可以换成其它文字
    };
}).filter('docNameCut', ['SysUtils', function (SysUtils) {
    return function (docFullName, maxLength) {
        if (!docFullName) return '';
        docName = docFullName;
        suffix = '';
        if (docFullName.indexOf(".") != -1) {
            var suffixLen = docFullName.lastIndexOf(".");
            docName = docFullName.substr(0, suffixLen);
            suffix = docFullName.substr(suffixLen);
        }

        if (SysUtils.cStrLength(docFullName) > maxLength) {
            docFullName = SysUtils.cSubstr(docFullName, 0, maxLength - suffix.length - 3) + "..." + suffix;
        }

        return docFullName;
    };
}]).filter('transNumber', function () {
    return function (value) {
        return parseInt(max, 10);
    };
}).filter('limitToShow', function () {
    return function (value, wordwise, max) {
        if (!value) return '';


        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;

        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace != -1) {
                value = value.substr(0, lastspace);
            }
        }

        return value;//'...'可以换成其它文字
    };
}).filter('to_trusted', ['$sce', function ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        };
    }]
).filter('ngSubStr', ['$sce', function ($sce) {
        return function (text, start, end) {
            if (!text) {
                return;
            }
            return text.substr(start, end);
        };
    }]
).filter('nameFormat', ['$sce', function ($sce) {
        return function (text) {
            if (!text) {
                return;
            }
            text = text.replace(/\s*/g, "");
            if (2 == text.length) {
                var ret = text.substring(0, 1) + "    " + text.substring(1, 2);
                return ret;
            } else {
                return text;
            }
        };
    }]
).filter('kqsFormat', ['$sce', function ($sce) {
        return function (text) {
            if (!text) {
                return;
            }
            if ("√" == text) {
                text = '&#10003';
            }
            return text;
        };
    }]
).filter('cdbx', ['$sce', function ($sce) {
        return function (text) {
            if (text) {
                if (1 == text) {
                    return "休";
                } else {
                    return "班";
                }
            }
        };
    }]
).filter('ngTrim', ['$sce', function ($sce) {
        return function (text) {
            var replace = text.replace(/\s*/g, "");
            console.log(replace);
            return replace;

        };
    }]
).filter('strByRange', ['$sce', function ($sce) {
        return function (text) {
            if (!text) {
                return;
            }
            var dd = text.replace(/<\/?.+?>/g, "");
            return dd.replace(/ /g, "");
        };
    }]
);

