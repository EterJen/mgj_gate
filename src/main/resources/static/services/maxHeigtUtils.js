myApp.service('maxHeigtTool', function () {
    /*防止变量未定义就使用*/
    var self = this;
    this.maxHeigt=function(srcHeight,values){
    	angular.forEach(values, function(data){
    		srcHeight=srcHeight-data;
    	});
    	return srcHeight;
    }
    
});