gwNgApp.service("NgLoading", function () {
    var self = this;
    this.ngLoadingStart = function () {
        $("#small-sidebar").css("display", "none");
        $("#gwngapp").addClass('v-hide');
        $("#gwngapp").removeClass('v-display');
        $("#gwngapploading").addClass('v-display');
        $("#gwngapploading").removeClass('v-hide');
        /*超过４秒自动结束*/
        setTimeout(function () {
            self.ngLoadingEnd()
        },4000);
    };
    this.ngLoadingEnd = function () {
        $("#gwngapp").addClass('v-display');
        $("#gwngapp").removeClass('v-hide');
        $("#gwngapploading").addClass('v-hide');
        $("#gwngapploading").removeClass('v-display');
    };
});


