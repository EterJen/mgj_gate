insert  into PROCESS_DEF_GROUP (SELECT 8,'urgent','催办','立督阶段发起通知单','1',8);
insert  into WF_PROCESS_DEF_MANAGE(id,name,DESCRIPTION,ORDER_NUM,FORM_DEF_ID,PRO_DEF_GROUP_ID,FLAG)(
select JXWOAUNIVERSALSEQ.NEXTVAL,'催办通知单','立督阶段可以创建通知单',254,'reminderNotice','urgent','1'
);

insert into WF_PROCESS_FORM( SELECT 22,'reminderNotice','催办通知单','立督阶段可以创建通知单','urgent','1',null);
commit ;



insert into wf_form_action(id,action_id,name,description,pre_condition,action_to_perform,image_url,order_num,flag,action_type)(
						select	JXWOAUNIVERSALSEQ.NEXTVAL,'reminderNotice','通知单','立督创建催办单','$scope.task.readMode==''task''&& $scope.fc.wpsDetail.middleContentType==''form''&& $scope.task.status==''Accepted'' ',
							'$scope.createReminderNotice("reminderNotice")','images/sidebar_right-bc.svg',897,'1','currentTaskDeal');

insert into wf_form_action(id,action_id,name,description,pre_condition,action_to_perform,image_url,order_num,flag,action_type)(
						select	JXWOAUNIVERSALSEQ.NEXTVAL,'reminderNoticeHistory','通知单','立督创建催办单','$scope.task.readMode==''task''&& $scope.fc.wpsDetail.middleContentType==''form''&& $scope.task.status==''Accepted'' ',
							'$scope.createReminderNotice("reminderNotice")','images/sidebar_right-bc.svg',897,'1','hisView');

COMMIT ;