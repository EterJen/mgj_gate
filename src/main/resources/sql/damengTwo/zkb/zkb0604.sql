UPDATE DIC_TYPE SET NAME  = '无'  WHERE  ID = '102962';
UPDATE MPSMODULE  SET FLAG = '1', TARGETFRAME = 'processDefList',ACTIONURL='/processDefManage/groupingTree' WHERE TITLE = '流程定制';
COMMIT

/*工作流 流程表单*/
drop table wf_process_form;
CREATE TABLE wf_process_form (
  ID          NUMBER, --	主键
  form_en_name varchar2 (64),
  form_zh_name varchar2 (128),
  description varchar2(400),
  belong_group varchar2(64),
  flag varchar2(5),
  PRIMARY KEY (ID)
);


drop table process_def_group;
CREATE TABLE process_def_group(
  id NUMBER,
  form_en_name varchar2 (64),
  form_zh_name varchar2 (128),
  description varchar2(400),
  flag varchar2(5),
  ORDER_NUM varchar2(5),
  PRIMARY KEY (ID)
);

INSERT INTO process_def_group (id, form_en_name, form_zh_name, description, flag, ORDER_NUM) VALUES (1, 'fawen', '发文', null, '1', '1');
INSERT INTO process_def_group (id, form_en_name, form_zh_name, description, flag, ORDER_NUM) VALUES (2, 'shangjilaiwen', '上级来文', null, '1', '3');
INSERT INTO process_def_group (id, form_en_name, form_zh_name, description, flag, ORDER_NUM) VALUES (3, 'shouwen', '收文', null, '1', '2');
INSERT INTO process_def_group (id, form_en_name, form_zh_name, description, flag, ORDER_NUM) VALUES (4, 'xinhan', '信函', null, '1', '4');

INSERT INTO wf_process_form (ID, form_en_name, form_zh_name, description, belong_group, flag) VALUES (1, 'fawen', '长城电子发文', null, 'fawen', '1');
INSERT INTO wf_process_form (ID, form_en_name, form_zh_name, description, belong_group, flag) VALUES (2, 'jxwdwfawen', '长城电子党工发文', null, 'fawen', '1');
INSERT INTO wf_process_form (ID, form_en_name, form_zh_name, description, belong_group, flag) VALUES (3, 'gfkgbfawen', '沪府国防办发', null, 'fawen', '1');
INSERT INTO wf_process_form (ID, form_en_name, form_zh_name, description, belong_group, flag) VALUES (4, 'jxwdwshouwen', '长城电子党工收文', null, 'shouwen', '1');
INSERT INTO wf_process_form (ID, form_en_name, form_zh_name, description, belong_group, flag) VALUES (5, 'jxwshouwen', '长城电子收', null, 'shouwen', '1');
INSERT INTO wf_process_form (ID, form_en_name, form_zh_name, description, belong_group, flag) VALUES (6, 'jxwxinhan', '信函', null, 'xinhan', '1');
INSERT INTO wf_process_form (ID, form_en_name, form_zh_name, description, belong_group, flag) VALUES (7, 'hjxgffawen', '长城电子规范发文', null, 'fawen', '1');
INSERT INTO wf_process_form (ID, form_en_name, form_zh_name, description, belong_group, flag) VALUES (8, 'jywjj', '机要文件甲', null, 'shangjilaiwen', '1');
INSERT INTO wf_process_form (ID, form_en_name, form_zh_name, description, belong_group, flag) VALUES (9, 'jywjy', '机要文件乙', null, 'shangjilaiwen', '1');
INSERT INTO wf_process_form (ID, form_en_name, form_zh_name, description, belong_group, flag) VALUES (10, 'jywjb', '机要文件丙', null, 'shangjilaiwen', '1');
INSERT INTO wf_process_form (ID, form_en_name, form_zh_name, description, belong_group, flag) VALUES (11, 'jywjg', '机要文件国', null, 'shangjilaiwen', '1');


alter table wf_process_def_manage add (publish_office varchar2(45)); --发文机关
alter table wf_process_def_manage add (publish_symbol varchar2(45)); --发文代字
alter table wf_process_def_manage add (unified_social_credit_code varchar2(90)); --统一社会信用代码


alter table wf_process_instance add (document_identification varchar2(90)); --在生成ofd后需要有公文标识

DROP TABLE wf_form_action;
CREATE TABLE wf_form_action(
  id NUMBER,
  action_id varchar2 (24),
  name varchar2 (45),
  description varchar2(45),
  pre_condition varchar2(300),
  action_to_perform varchar2(90),
  image_url varchar2(150),
  ORDER_NUM varchar2(5),
  flag varchar2(5),
  PRIMARY KEY (ID)
);


alter table wf_form_action modify (ORDER_NUM NUMBER ); -- 修改数据类型
alter table process_def_group modify (ORDER_NUM NUMBER ); -- 修改数据类型
alter table wf_process_form ADD (ORDER_NUM NUMBER ); -- 修改数据类型

DELETE FROM wf_form_action;
INSERT INTO wf_form_action (id, action_id, name, description, pre_condition, action_to_perform, image_url, ORDER_NUM, flag) VALUES (1, 'saveForm', '保 存', '审批单：保 存', '$scope.task.readMode==''task''&& $scope.fc.wpsDetail.middleContentType==''form''&& $scope.task.status==''Accepted'' && $scope.task.taskType!=''SecretResponse''', '$scope.saveForm()', 'images/sidebar_right-01.png', 2, '1');
INSERT INTO wf_form_action (id, action_id, name, description, pre_condition, action_to_perform, image_url, ORDER_NUM, flag) VALUES (2, 'inputOpinion', '意见录入', '审批单：意见录入', '$scope.task.readMode==''task''&& $scope.fc.wpsDetail.middleContentType==''form''&& $scope.task.status==''Accepted'' && $scope.task.taskType!=''SecretResponse''', '$scope.inputOption()', 'images/sidebar_right-02.png', 2, '1');
INSERT INTO wf_form_action (id, action_id, name, description, pre_condition, action_to_perform, image_url, ORDER_NUM, flag) VALUES (3, 'changeWorkflow', '流  转', '任务：流 转', '$scope.task.readMode==''task''&& $scope.fc.wpsDetail.middleContentType==''form''&& $scope.task.status==''Accepted'' && $scope.task.taskType!=''SecretResponse''', '$scope.fc.openMoveWorkflowDialog()', 'images/sidebar_right-03.png', 3, '1');
INSERT INTO wf_form_action (id, action_id, name, description, pre_condition, action_to_perform, image_url, ORDER_NUM, flag) VALUES (4, 'finishTask', '办结任务', '任务：办结', '$scope.task.readMode==''task''&& $scope.fc.wpsDetail.middleContentType==''form''&& $scope.task.status==''Accepted'' && $scope.task.taskType!=''SecretResponse''', '$scope.finishTask()', 'images/sidebar_right-01.png', 4, '1');
INSERT INTO wf_form_action (id, action_id, name, description, pre_condition, action_to_perform, image_url, ORDER_NUM, flag) VALUES (5, 'viewHistory', '流转记录', '任务：流转记录', '$scope.task.readMode==''task''&& $scope.fc.wpsDetail.middleContentType==''form''&& $scope.task.status==''Accepted''', '$scope.viewHistory()', 'images/sidebar_right-01.png', 5, '1');
INSERT INTO wf_form_action (id, action_id, name, description, pre_condition, action_to_perform, image_url, ORDER_NUM, flag) VALUES (6, 'finishInstance', '办结流程', '流程：办结', '$scope.task.readMode==''task''&& $scope.fc.wpsDetail.middleContentType==''form''&& $scope.task.status==''Accepted'' && $scope.task.taskType!=''SecretResponse''', '$scope.finishInstance()', 'images/sidebar_right-01.png', 6, '1');
INSERT INTO wf_form_action (id, action_id, name, description, pre_condition, action_to_perform, image_url, ORDER_NUM, flag) VALUES (7, 'returnFormWps', '返回表单', 'wps：返回表单', '$scope.task.readMode==''task''&& $scope.fc.wpsDetail.middleContentType==''wps''', '$scope.fc.returnForm()', 'images/sidebar_right-01.png', 7, '1');
INSERT INTO wf_form_action (id, action_id, name, description, pre_condition, action_to_perform, image_url, ORDER_NUM, flag) VALUES (8, 'saveDoc', '保存文档', 'wps：保存', '$scope.task.readMode==''task''&& $scope.fc.wpsDetail.middleContentType==''wps''', '$scope.fc.SendDataToServer()', 'images/sidebar_right-01.png', 8, '1');
INSERT INTO wf_form_action (id, action_id, name, description, pre_condition, action_to_perform, image_url, ORDER_NUM, flag) VALUES (9, 'convertToOfd', '转  版', 'wps：转 版', '$scope.task.readMode==''task''&& $scope.fc.wpsDetail.middleContentType==''wps'' && $scope.fc.currentAttach!=null&&$scope.fc.currentAttach.bizFileType==''taohong''', '$scope.fc.convertToOfd()', 'images/sidebar_right-01.png', 9, '1');
INSERT INTO wf_form_action (id, action_id, name, description, pre_condition, action_to_perform, image_url, ORDER_NUM, flag) VALUES (10, 'taohong', '套  红', 'wps：套  红', '$scope.task.readMode==''task''&& $scope.fc.wpsDetail.middleContentType==''wps'' && $scope.fc.currentAttach!=null&&$scope.fc.currentAttach.attachment.id!=null&&$scope.fc.currentAttach.bizFileType==''content''', '$scope.fc.openWithTemplate()', 'images/sidebar_right-01.png', 10, '1');
INSERT INTO wf_form_action (id, action_id, name, description, pre_condition, action_to_perform, image_url, ORDER_NUM, flag) VALUES (11, 'returnFormOfd', '返回表单', 'ofd：返回表单', '$scope.task.readMode==''task''&& $scope.fc.wpsDetail.middleContentType==''ofd''', '$scope.fc.returnForm()', 'images/sidebar_right-01.png', 11, '1');
INSERT INTO wf_form_action (id, action_id, name, description, pre_condition, action_to_perform, image_url, ORDER_NUM, flag) VALUES (12, 'printOfd', '打  印', 'ofd：打 印', '$scope.task.readMode==''task''&& $scope.fc.wpsDetail.middleContentType==''ofd''', '$scope.fx_printInfo(''fileTitle'',0)', 'images/sidebar_right-01.png', 12, '1');
INSERT INTO wf_form_action (id, action_id, name, description, pre_condition, action_to_perform, image_url, ORDER_NUM, flag) VALUES (13, 'relationReciveDoc', '关联收文', '审批单：关联收文', 'task.belongingProInst.relatedReceiveDocId && $scope.task.readMode==''task''&& $scope.fc.wpsDetail.middleContentType==''form''&& $scope.task.status==''Accepted''', '$scope.fc.relationReciveDoc()', 'images/sidebar_right-04.png', 1, '1');
INSERT INTO wf_form_action (id, action_id, name, description, pre_condition, action_to_perform, image_url, ORDER_NUM, flag) VALUES (14, 'dmTaskFinish', '办  结', '定密任务：办结', '$scope.task.readMode==''task''&& $scope.fc.wpsDetail.middleContentType==''form''&& $scope.task.status==''Accepted'' && $scope.task.taskType ==''SecretResponse''', '$scope.saveForm()', 'images/sidebar_right-01.png', 14, '1');
INSERT INTO wf_form_action (id, action_id, name, description, pre_condition, action_to_perform, image_url, ORDER_NUM, flag) VALUES (15, 'acceptTask', '接  收', '任务：接收', '$scope.task.readMode==''task''&& $scope.fc.wpsDetail.middleContentType==''form''&& $scope.task.status==''NotAccepted''', '$scope.acceptTask()', 'images/sidebar_right-01.png', 15, '1');
INSERT INTO wf_form_action (id, action_id, name, description, pre_condition, action_to_perform, image_url, ORDER_NUM, flag) VALUES (16, 'ofdSign', '签  章', 'ofd：签章', '$scope.task.readMode==''task''&& $scope.fc.wpsDetail.middleContentType==''ofd''', '$scope.fc.ofdSign()', 'images/sidebar_right-01.png', 16, '1');

COMMIT


