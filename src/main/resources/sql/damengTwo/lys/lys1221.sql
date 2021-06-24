--督查登陆
update MPSMODULE set ACTIONURL = '/coreHome/supervise', TARGETFRAME = 'supervise',
FLAG = 1, NG_STATE = 'coreHome.supervise' where ID = 100055;

--督查审批
update MPSMODULE set ACTIONURL = '/coreHome/approval', TARGETFRAME = 'approval',
FLAG = 1, NG_STATE = 'coreHome.approval' where ID = 100056;

--督查汇总
update MPSMODULE set ACTIONURL = '/coreHome/summary', TARGETFRAME = 'summary',
FLAG = 1, NG_STATE = 'coreHome.summary' where ID = 100057;

--公务网简报
update MPSMODULE set ACTIONURL = '/coreHome/officialbulletin', TARGETFRAME = 'officialbulletin',
FLAG = 1, NG_STATE = 'coreHome.officialbulletin' where ID = 100022;