myApp.directive("ckEditor", ['ENV', function(ENV) {
	return {
	    require: '?ngModel',
	    link: function(scope, elm, attr, ngModel) {
	      var ck = CKEDITOR.replace(elm[0]);

	      if (!ngModel) return;

	      ck.on('instanceReady', function() {
	        ck.setData(ngModel.$viewValue);
	      });

	      function updateModel() {
	          scope.$apply(function() {
	              ngModel.$setViewValue(ck.getData());
	          });
	      }

	      ck.on('change', updateModel);
	      ck.on('key', updateModel);
	      ck.on('dataReady', updateModel);
	      ck.on('paste', updateModel);
	      ck.on('selectionChange', updateModel);

	      ngModel.$render = function(value) {
	        ck.setData(ngModel.$viewValue);
	      };
	    }
	  };
}]);