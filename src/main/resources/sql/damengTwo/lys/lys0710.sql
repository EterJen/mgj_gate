--启用收文管理、发文管理模块
update mpsmodule set actionurl = '/shouwenmanage',targetframe = 'shouwenmanage',flag = '1' where id = '100016';

update mpsmodule set actionurl = '/fawenmanage',targetframe = 'fawenmanage',flag = '1' where id = '100017';
COMMIT