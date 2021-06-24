alter table MIDDLE_ATTACHMENT add (PARENT_ID number);
COMMENT ON COLUMN MIDDLE_ATTACHMENT.PARENT_ID IS '上一个版本Id';
INSERT INTO WF_FORM_ACTION (ID, ACTION_ID, NAME, DESCRIPTION, PRE_CONDITION, ACTION_TO_PERFORM, IMAGE_URL, ORDER_NUM, FLAG, ACTION_TYPE) VALUES (869342, 'delofdSign', '撤销签章', '正文版式ofd：撤销签章', '$scope.fc.wpsDetail.middleContentType==''ofd''', '$scope.fc.delofdSign()', 'images/sidebar_right-ht.svg', 470, '1', 'currentTaskDeal');
