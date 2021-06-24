function FileChunkUploadClent(file, partUploadUrl, mergeFileUrl,partOkFunc,mergeOkFunc) {
    this.nowOkChunks = 0;/*当前成功分片*/
    this.file = file;
    this.partUploadUrl = partUploadUrl;
    this.mergeFileUrl = mergeFileUrl;
    this.partOkFunc = partOkFunc;
    this.mergeOkFunc = mergeOkFunc;
}

FileChunkUploadClent.prototype.upload = function () {
    status = 0;
    var GUID = this.guid();
    var file = this.file,  //文件对象
        name = file.name,        //文件名
        size = file.size;        //总大小
    var shardSize = 20 * 1024 * 1024,    //以20MB为一个分片
        shardCount = Math.ceil(size / shardSize);  //总片数
    for (var i = 0; i < shardCount; ++i) {
        //计算每一片的起始与结束位置
        var start = i * shardSize,
            end = Math.min(size, start + shardSize);
        var partFile = file.slice(start, end);
        this.partUpload(GUID, partFile, name, shardCount, i);
    }
};

FileChunkUploadClent.prototype.guid = function (prefix) {
    var counter = 0;
    var guid = (+new Date()).toString(32),
        i = 0;
    for (; i < 5; i++) {
        guid += Math.floor(Math.random() * 65535).toString(32);
    }
    return (prefix || 'temp_') + guid + (counter++).toString(32);
};

FileChunkUploadClent.prototype.partUpload = function (GUID, partFile, name, chunks, chunk) {
    //构造一个表单，FormData是HTML5新增的
    var app = this;
    var form = new FormData();
    form.append("guid", GUID);
    form.append("file", partFile);  //slice方法用于切出文件的一部分
    form.append("fileName", name);
    form.append("chunks", chunks);  //总片数
    form.append("chunk", chunk);        //当前是第几片
    //Ajax提交
    $.ajax({
        url: this.partUploadUrl,
        type: "POST",
        data: form,
        async: true,        //异步
        processData: false,  //很重要，告诉jquery不要对form进行处理
        contentType: false,  //很重要，指定为false才能形成正确的Content-Type
        success: function (data) {
            app.nowOkChunks += 1;
            if (data.code == 200) {
                app.partOkFunc(app.nowOkChunks, chunks);
            }
            if (app.nowOkChunks == chunks) {
                app.mergeFile(GUID, name);
            }
        },
        error: function (XMLResponse) {
            console.log(JSON.stringify(XMLResponse));
        }
    });
};

FileChunkUploadClent.prototype.mergeFile = function(GUID,name){
    var app = this;
    var formMerge = new FormData();
    formMerge.append("guid", GUID);
    formMerge.append("fileName", name);
    $.ajax({
        url: this.mergeFileUrl,
        type: "POST",
        data: formMerge,
        processData: false,  //很重要，告诉jquery不要对form进行处理
        contentType: false,  //很重要，指定为false才能形成正确的Content-Type
        success: function(data){
            if(data.code == 200){
                app.mergeOkFunc(data);
            }
        }
    });
};
