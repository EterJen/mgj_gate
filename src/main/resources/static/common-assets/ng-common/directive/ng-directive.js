gwNgApp.directive('repeatFinish', function () {
    return {
        link: function (scope, element, attr) {
            // console.log(scope.$index)
            if (scope.$last == true) {
                // console.log('ng-repeat执行完毕')
                // $parse(radioModel.bindAtt).assign(scope, attr.radioClickVal);
                // scope.$eval(radioModel.bindAttChange)();
                scope.$eval(attr.repeatFinish);
            }
        }
    }
});

gwNgApp.directive('elementLoad', function ($window) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('load', function () {
                scope.$apply(attrs.elementLoad);
            });
        }
    }
});
gwNgApp.directive('rawHref', function ($window, $timeout,$compile) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            attrs.$observe("rawHref", function (html) {
                if (attrs.rawHref) {
                    element.attr('target',"_blank");
                    element.attr('href',attrs.rawHref);
                }
            });
        }
    }
});
gwNgApp.directive('gwNgHref', function ($window, $timeout,$compile) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            if (attrs.gwNgHref) {
                element.attr('target',"_blank");
                element.attr('href', SysInfo.activeEnv.sourcePrefix + "/fileOperation/trustedRequest/remoteRead/" + attrs.gwNgHref);
            }
        }
    }
});
gwNgApp.directive('gwImgDyn', function ($window, $timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            attrs.$observe("gwImgDyn", function (html) {
                if (attrs.gwImgDyn) {
                    element.attr('src', SysInfo.activeEnv.sourcePrefix + "/fileOperation/trustedRequest/remoteRead/" + attrs.gwImgDyn);
                }
            });
        }
    }
});
gwNgApp.directive('ngImg', function ($window, $timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            if (attrs.ngImg) {
                element.attr('src',SysInfo.activeEnv.sourcePrefix+"/fileOperation/trustedRequest/remoteRead/"+ attrs.ngImg);
            }
        }
    }
});
gwNgApp.directive('ngGwVideo', function ($window, $timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            if (attrs.ngGwVideo) {
                element.attr('src',SysInfo.activeEnv.sourcePrefix+"/fileOperation/trustedRequest/processRequest?video="+ attrs.ngGwVideo);
            }
        }
    }
});
gwNgApp.directive('ngLastRept', function ($window, $timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            if (scope.$last == true) {
                $timeout(function () {
                    scope.$apply(attrs.ngLastRept);
                });
            }
        }
    }
});

/*动态监听并编译html*/
gwNgApp.directive('ngSceHtml', function ($window, $timeout, $compile) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.$watch(
                function (scope) {
                    // watch the 'compile' expression for changes
                    return scope.$eval(attrs.ngSceHtml);
                },
                function (value) {
                    // when the 'compile' expression changes
                    // assign it into the current DOM
                    element.html(value);

                    // compile the new DOM and link it to the current
                    // scope.
                    // NOTE: we only compile .childNodes so that
                    // we don't get into infinite loop compiling ourselves
                    $compile(element.contents())(scope);
                }
            );
        }
    }
});

/*动态编译html 销毁子作用域　防止内存溢出*/
gwNgApp.directive("dyCompile", ["$compile", function ($compile) {
    return {
        replace: true,
        restrict: 'EA',
        link: function (scope, elm, iAttrs) {
            var DUMMY_SCOPE = {
                    $destroy: angular.noop
                },
                root = elm,
                childScope,
                destroyChildScope = function () {
                    (childScope || DUMMY_SCOPE).$destroy();
                };

            iAttrs.$observe("html", function (html) {
                if (html) {
                    destroyChildScope();
                    childScope = scope.$new(false);
                    var content = $compile(html)(childScope);
                    root.replaceWith(content);
                    root = content;
                }

                scope.$on("$destroy", destroyChildScope);
            });
        }
    };
}]);