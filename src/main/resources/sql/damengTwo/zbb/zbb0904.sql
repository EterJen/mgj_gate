create table wf_other_domain ( -- 表单中没有公文域的字段存储
  id                  number, --	主键
  process_id        	number, --实例id
  dic_type_id    		  number, --文中id
  name 		  varchar2(100), --公文域的id
  value 		  varchar2(100), --公文域的值
  primary key (id)
);
comment on table wf_other_domain is '公文域储存';
comment on column wf_other_domain.id is '主键';
comment on column wf_other_domain.process_id is '实例id';
comment on column wf_other_domain.dic_type_id is '实例id';
comment on column wf_other_domain.name is '公文域的id';
comment on column wf_other_domain.value is '公文域的值';
commit;

update wf_form_action set pre_condition='$scope.task.readMode==''task''&& $scope.fc.wpsDetail.middleContentType==''wps'' && $scope.fc.currentAttach!=null&&$scope.fc.currentAttach.attachment.id!=null&&$scope.fc.currentAttach.bizFileType==''content''&&$scope.fc.currentAttach.bizAttachType==''zhengwen''' where name='套  红';

update wf_form_action set pre_condition='$scope.task.readMode==''task''&& $scope.fc.wpsDetail.middleContentType==''wps'' && $scope.fc.currentAttach!=null&&$scope.fc.currentAttach.bizFileType==''taohong''&&$scope.fc.currentAttach.bizAttachType==''zhengwen''' where name='转  版';