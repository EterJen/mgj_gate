update mpsmodule set flag = '1', icon = 'i_1' where title = '办公';
update mpsmodule set flag = '1', icon = 'i_2' where title = '事务';

commit;

/*根据pkcode 确定菜单树顺序  尽量用以前系统数据 若需要新增一个菜单 请为该记录设置合理的pkcode*/
update mpsmodule set flag = '1', pkcode = '05020105' where title = '定密管理';
update mpsmodule set flag = '1', pkcode = '05030105' where title = '模板管理';
update mpsmodule set flag = '1', pkcode = '01010205' where title = '已办流程';

/*select * from mpsmodule where title LIKE '%项目资金%'
select * from mpsmodule where title = '专项<br>资金'
select * from mpsmodule where id = '100152'
update mpsmodule set  where title = '专项<br>资金';*/

/*菜单权限树 动态展示扩展字段*/
alter table mpsmodule add (title_menu_show varchar2(50));
comment on column "mpsmodule"."title_menu_show" is '权限菜单带html格式存储';
commit;

update mpsmodule set title_menu_show = title;
update mpsmodule set flag = '1', icon = 'i_3',title_menu_show  = '专项<br>资金' where title = '项目资金';
update mpsmodule set flag = '1', icon = 'i_4',title_menu_show  = '系统<br>设置' where title = '系统';
commit;
