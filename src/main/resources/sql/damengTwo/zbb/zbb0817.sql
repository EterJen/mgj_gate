alter table wf_current_task_info modify assignee_name varchar2(50);


update wf_form_action set image_url='images/sidebar_right-bc.svg' where name='保 存';
update wf_form_action set image_url='images/sidebar_right-yjlr.svg' where name='意见录入';
update wf_form_action set image_url='images/sidebar_right-lz.svg' where name='流  转';
update wf_form_action set image_url='images/sidebar_right-bjrw.svg' where name='办结任务';
update wf_form_action set image_url='images/sidebar_right-lzjl.svg' where name='流转记录';
update wf_form_action set image_url='images/sidebar_right-bjlc.svg' where name='办结流程';
update wf_form_action set image_url='images/sidebar_right-fhbd.svg' where name='返回表单';
update wf_form_action set image_url='images/sidebar_right-bcwd.svg' where name='保存文档';
update wf_form_action set image_url='images/sidebar_right-zb.svg' where name='转  版';
update wf_form_action set image_url='images/sidebar_right-th.svg' where name='套  红';
update wf_form_action set image_url='images/sidebar_right-fhbd.svg' where name='返回表单';
update wf_form_action set image_url='images/sidebar_right-dy.svg' where name='打  印';
update wf_form_action set image_url='images/sidebar_right-glsw.svg' where name='关联收文';
update wf_form_action set image_url='images/sidebar_right-bj.svg' where name='办  结';
update wf_form_action set image_url='images/sidebar_right-js.svg' where name='接  收';
update wf_form_action set image_url='images/sidebar_right-qz.svg' where name='签  章';
update wf_form_action set image_url='images/sidebar_right-xsxd.svg' where name='显示修订';
update wf_form_action set image_url='images/sidebar_right-ycxd.svg' where name='隐藏修订';
update wf_form_action set image_url='images/sidebar_right-jsxd.svg' where name='接受修订';
update wf_form_action set image_url='images/sidebar_right-fhdj.svg' where name='份号登记';
update wf_form_action set image_url='images/sidebar_right-lzjl.svg' where name='流转记录';



insert into mpsmodule(id,pkcode,title,actionurl,description,flag,parentid,ng_state,title_menu_show)(
select "JXWOAUniversalSeq".NEXTVAL,01010300,'我的收藏','/rCurrentTaskInfo/collectionList','收藏代办和已办','1',id,'coreHome.collectionList','我的收藏' from mpsmodule where title='个人秘书'
                                                                                                   );

create table wf_my_collection ( -- 我的收藏
  id                  number, --	主键
  user_id 		  number, --用户id
  process_id        		  number, --实例id
  primary key (id)
);
comment on table wf_my_collection is '我的收藏';
comment on column wf_my_collection.id is '主键';
comment on column wf_my_collection.user_id is '用户id';
comment on column wf_my_collection.process_id is '实例id';
commit;


update mpsmodule set title='我的关注',title_menu_show='我的关注' where title='我的收藏';
alter table wf_process_def_manage modify publish_office varchar2(100);