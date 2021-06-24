update MPSMODULE set title='办文',TITLE_MENU_SHOW='办文' where title='办公';
update MPSMODULE set title='公文管理',TITLE_MENU_SHOW='公文管理' where title='办公管理';




update MPSMODULE set flag='2' where (title='公文审批' or  title='工作报批' or title='公务网简报' or  title='委领导安排')and parentid=(select id from MPSMODULE where title='办文') and flag='0';

update MPSMODULE set flag='2' where (title='区县收发' or  title='督查管理' or title='办理办信' or  title='主任信箱' or  title='企业呼声'or  title='并联审批')and parentid=(select id from MPSMODULE where title='办文') and flag='0';

update MPSMODULE set flag='2' where  title='事务';

update WF_DOC_TYPE set TYPENAME='上行' where DIC_TYPE_ID=(select t.id from DIC_TYPE t,DIC_MODE m where m.id=t.DIC_MODE_id and m.dictype='DocumentType' and name='报告');

--http://ak.oa.jxw/rProcessInstance/createBatch