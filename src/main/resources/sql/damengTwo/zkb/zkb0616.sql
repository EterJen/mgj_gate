alter table wf_process_def_manage add (publish_office_brif varchar2(30)); -- 发文机关代字
alter table wf_process_def_manage add (issue_person varchar2(90)); --签发人
alter table wf_process_def_manage add (issue_person_post varchar2(60)); --签发人职务

INSERT INTO wf_form_action (id, action_id, name, description, pre_condition, action_to_perform, image_url, ORDER_NUM, flag) VALUES (108466, 'printNumRegist', '份号登记', '涉密发文：份号登记', 'SysUtils.notEmpty( $scope.task.theCommonFormInfo,["wfSecretConfirm","dicTypeRef","name"]) && SysUtils.notEmpty( $scope.task.theCommonFormInfo,["formFawen","sendToMain"]) && SysUtils.notEmpty( $scope.task.theCommonFormInfo,["numberOfCopy"])', '$scope.fc.openInstanceNumber()', 'images/sidebar_right-01.png', 17, '1');


