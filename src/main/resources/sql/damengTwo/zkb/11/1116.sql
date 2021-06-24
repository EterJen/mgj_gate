alter table DIC_TYPE add (ORDER_NUM VARCHAR2(20));
COMMENT ON COLUMN DIC_TYPE.ORDER_NUM IS '字典项排序';

INSERT INTO WF_FORM_ACTION (ID, ACTION_ID, NAME, DESCRIPTION, PRE_CONDITION, ACTION_TO_PERFORM, IMAGE_URL, ORDER_NUM, FLAG, ACTION_TYPE) VALUES (759484, 'silencePrintFormHis', '静默打印', '审批单：静默打印', '$scope.fc.wpsDetail.middleContentType==''form''', '$scope.fc.silencePrintForm()', 'images/sidebar_right-jsxd.svg', 240, '1', 'hisView');
INSERT INTO WF_FORM_ACTION (ID, ACTION_ID, NAME, DESCRIPTION, PRE_CONDITION, ACTION_TO_PERFORM, IMAGE_URL, ORDER_NUM, FLAG, ACTION_TYPE) VALUES (759485, 'silencePrintForm', '静默打印', '审批单：静默打印', '$scope.fc.wpsDetail.middleContentType==''form''', '$scope.fc.silencePrintForm()', 'images/sidebar_right-jsxd.svg', 240, '1', 'currentTaskDeal');