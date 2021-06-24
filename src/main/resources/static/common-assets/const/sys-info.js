// var serverContextPath = '/apps';
// var serverContextPath = '/mgj';
// var uri = document.location.toString();
// var end = uri.indexOf(serverContextPath);
// var HostUri = uri.substr(0, end);

var SysInfo = {
    mgjGate:{
      sessionUserKey:"mgjgateViewSessionUser:",
    },
    activeEnv: {
        sourcePrefix: mgjmhReqHost,
        // sourcePrefix: HostUri+serverContextPath,
    },
}
console.log(SysInfo)

