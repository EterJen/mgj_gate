
insert into wf_form_action(id,action_id,name,description,pre_condition,action_to_perform,image_url,order_num,flag,action_type)values(
							52,'saveOfdSignature','保  存','正文版式ofd:保存签章','$scope.task.readMode==''task''&& $scope.fc.wpsDetail.middleContentType==''ofd''&& $scope.task.status==''Accepted''',
							'$scope.fc.saveOfdSignature()','images/sidebar_right-bc.svg',470,'1','currentTaskDeal');

--insert into ATTACHMENT(id,FILENAME,URL,FLAG)(select 1,'fujianInsert','fujianInsert.wps',1);
--insert into ATTACHMENT(id,FILENAME,URL,FLAG)(select 2,'FJSM','FJSM.wpt',1);