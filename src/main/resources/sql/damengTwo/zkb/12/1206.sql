alter table MIDDLE_ATTACHMENT add (ORDER_NUM number);
COMMENT ON COLUMN MIDDLE_ATTACHMENT.ORDER_NUM IS '排序';
alter table MIDDLE_ATTACHMENT add (FINAL_VERSION number);
COMMENT ON COLUMN MIDDLE_ATTACHMENT.FINAL_VERSION IS '最终版本标记';
update MIDDLE_ATTACHMENT set FINAL_VERSION = 1,PARENT_ID = 1, GROUP_LEADER_ID = ID  where GROUP_LEADER_ID is null;
update MIDDLE_ATTACHMENT set ORDER_NUM = id;
update MIDDLE_ATTACHMENT set MINOR_VERSION = 0 where MINOR_VERSION is null ;
update MIDDLE_ATTACHMENT set LARGE_VERSION = 0 where LARGE_VERSION is null ;
update ATTACHMENT set FILENAME = '未命名.wps' where FILENAME is null ;

INSERT INTO WF_FORM_ACTION (ID, ACTION_ID, NAME, DESCRIPTION, PRE_CONDITION, ACTION_TO_PERFORM, IMAGE_URL, ORDER_NUM, FLAG, ACTION_TYPE) VALUES (600000, 'uploadFile', '上传文档', '流程：上传文档', '$scope.fc.wpsDetail.middleContentType==''form''&& $scope.task.status==''Accepted'' && $scope.task.taskType==''NormalFlow''', '$scope.addAttachment()', 'images/sidebar_right-uploadFile.svg', 201, '1', 'currentTaskDeal');
INSERT INTO WF_FORM_ACTION (ID, ACTION_ID, NAME, DESCRIPTION, PRE_CONDITION, ACTION_TO_PERFORM, IMAGE_URL, ORDER_NUM, FLAG, ACTION_TYPE) VALUES (600001, 'downloadFile', '下载文档', '流程：下载文档', '$scope.fc.wpsDetail.middleContentType!=''form''', '$scope.fc.downLoadCurrentAtt()', 'images/sidebar_right-downloadFile.svg', 305, '1', 'currentTaskDeal');

commit ;