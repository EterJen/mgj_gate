insert into wf_form_action(id,action_id,name,description,pre_condition,action_to_perform,image_url,order_num,flag,action_type)values(
							20,'printBaseForm','打印表单','form：打印表单','$scope.fc.wpsDetail.middleContentType==''form''',
							'$scope.fc.printForm()','images/sidebar_right-bc.svg',20,'1','currentTaskDeal');

insert into wf_form_action(id,action_id,name,description,pre_condition,action_to_perform,image_url,order_num,flag,action_type)values(
							21,'printBaseFormHistory','打印表单','form：打印表单','$scope.fc.wpsDetail.middleContentType==''form''',
							'$scope.fc.printForm()','images/sidebar_right-bc.svg',21,'1','hisView');

insert into wf_form_action(id,action_id,name,description,pre_condition,action_to_perform,image_url,order_num,flag,action_type)values(
							22,'closeBaseForm','关闭窗口','关闭窗口','$scope.fc.wpsDetail.middleContentType==''form''',
							'$scope.fc.closeCurrentForm()','images/sidebar_right-bc.svg',22,'1','currentTaskDeal');

insert into wf_form_action(id,action_id,name,description,pre_condition,action_to_perform,image_url,order_num,flag,action_type)values(
							23,'closeBaseFormHistory','关闭窗口','关闭窗口','$scope.fc.wpsDetail.middleContentType==''form''',
							'$scope.fc.closeCurrentForm()','images/sidebar_right-bc.svg',23,'1','hisView');

insert into wf_form_action(id,action_id,name,description,pre_condition,action_to_perform,image_url,order_num,flag,action_type)values(
							24,'convertType','转换类型','转换类型','$scope.fc.wpsDetail.middleContentType==''form''',
							'$scope.fc.printForm()','images/sidebar_right-bc.svg',24,'1','currentTaskDeal');

insert into wf_form_action(id,action_id,name,description,pre_condition,action_to_perform,image_url,order_num,flag,action_type)values(
							25,'convertTypeHistory','转换类型','转换类型','$scope.fc.wpsDetail.middleContentType==''form''',
							'$scope.fc.printForm()','images/sidebar_right-bc.svg',25,'1','hisView');

insert into wf_form_action(id,action_id,name,description,pre_condition,action_to_perform,image_url,order_num,flag,action_type)values(
							26,'associatedFile','关联文件','关联文件','$scope.fc.wpsDetail.middleContentType==''form''',
							'$scope.fc.printForm()','images/sidebar_right-bc.svg',26,'1','currentTaskDeal');

insert into wf_form_action(id,action_id,name,description,pre_condition,action_to_perform,image_url,order_num,flag,action_type)values(
							27,'associatedFileHistory','关联文件','关联文件','$scope.fc.wpsDetail.middleContentType==''form''',
							'$scope.fc.printForm()','images/sidebar_right-bc.svg',27,'1','hisView');

insert into wf_form_action(id,action_id,name,description,pre_condition,action_to_perform,image_url,order_num,flag,action_type)values(
							28,'transfeGovernor','转 督 文','转督文','$scope.fc.wpsDetail.middleContentType==''form''',
							'$scope.fc.printForm()','images/sidebar_right-bc.svg',28,'1','currentTaskDeal');

insert into wf_form_action(id,action_id,name,description,pre_condition,action_to_perform,image_url,order_num,flag,action_type)values(
							29,'transfeGovernorHistory','转 督 文','转督文','$scope.fc.wpsDetail.middleContentType==''form''',
							'$scope.fc.printForm()','images/sidebar_right-bc.svg',29,'1','hisView');

insert into wf_form_action(id,action_id,name,description,pre_condition,action_to_perform,image_url,order_num,flag,action_type)values(
							28,'transfeGovernor','关联督文','关联督文','$scope.fc.wpsDetail.middleContentType==''form''',
							'$scope.fc.printForm()','images/sidebar_right-bc.svg',28,'1','currentTaskDeal');

insert into wf_form_action(id,action_id,name,description,pre_condition,action_to_perform,image_url,order_num,flag,action_type)values(
							29,'transfeGovernorHistory','关联督文','关联督文','$scope.fc.wpsDetail.middleContentType==''form''',
							'$scope.fc.printForm()','images/sidebar_right-bc.svg',29,'1','hisView');


insert into wf_form_action(id,action_id,name,description,pre_condition,action_to_perform,image_url,order_num,flag,action_type)values(
							30,'conversionType','转换类型','form:转换类型','$scope.fc.wpsDetail.middleContentType==''form''',
							'$scope.fc.printForm()','images/sidebar_right-bc.svg',30,'1','currentTaskDeal');

insert into wf_form_action(id,action_id,name,description,pre_condition,action_to_perform,image_url,order_num,flag,action_type)values(
							31,'conversionTypeHistory','转换类型','form:转换类型','$scope.fc.wpsDetail.middleContentType==''form''',
							'$scope.fc.printForm()','images/sidebar_right-bc.svg',31,'1','hisView');

insert into wf_form_action(id,action_id,name,description,pre_condition,action_to_perform,image_url,order_num,flag,action_type)values(
							32,'conversionType','查看签章','form:查看签章','$scope.fc.wpsDetail.middleContentType==''form''',
							'$scope.fc.printForm()','images/sidebar_right-bc.svg',32,'1','currentTaskDeal');

insert into wf_form_action(id,action_id,name,description,pre_condition,action_to_perform,image_url,order_num,flag,action_type)values(
							33,'conversionTypeHistory','查看签章','form:查看签章','$scope.fc.wpsDetail.middleContentType==''form''',
							'$scope.fc.printForm()','images/sidebar_right-bc.svg',33,'1','hisView');


update MPSMODULE set flag='1',NG_STATE='coreHome.adjustmentOpinion' where title='意见调整';
INSERT INTO MPSAVAILMODULE (ELEMENTID, ELEMENTTYPE, MODULECODE, FLAG, MPSMODULE_ID) VALUES (3000, 'U', 05030500, '1', 100345);

alter table WF_OPINION add (state VARCHAR2(50));
COMMIT ;
COMMENT ON COLUMN WF_OPINION.state IS '逻辑删除状态';
COMMIT ;