update WF_FORM_ACTION set ACTION_ID='checkSignature' where id=32;
update WF_FORM_ACTION set ACTION_ID='checkSignatureHistory' where id=33;

insert into wf_form_action(id,action_id,name,description,pre_condition,action_to_perform,image_url,order_num,flag,action_type)values(
							34,'conversionTypeHistory','办结任务','最后一个任务办结流程','$scope.task.readMode==''task''&& $scope.fc.wpsDetail.middleContentType==''form''&& $scope.task.status==''Accepted'' && $scope.task.taskType!=''SecretResponse''',
							'$scope.finishAllTaskInstance()','images/sidebar_right-bc.svg',34,'1','currentTaskDeal');