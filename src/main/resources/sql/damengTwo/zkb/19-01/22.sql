--修改用户表密码字段长度
alter table wf_process_instance modify city_approval varchar2(5000);

update WF_PROCESS_INSTANCE set WNGK = '是' where WNGK  = '1';
update WF_PROCESS_INSTANCE set WNGK = '否' where WNGK  = '0' or WNGK is null ;

update DIC_TYPE set  ORDER_NUM = 1 where ID = 102955;
update DIC_TYPE set  ORDER_NUM = 2 where ID = 102956;

alter table WF_FORM_COMMON add (xxgk  varchar2(5));
COMMENT ON COLUMN WF_FORM_COMMON.xxgk IS '信息公开';

update WF_CURRENT_TASK_INFO  a set PRO_INST_FLAG = '1';
update WF_CURRENT_TASK_INFO  a set PRO_INST_FLAG = '0' where  exists (
select 1 from WF_PROCESS_INSTANCE b where b.id = a.PRO_INST_ID and STATE = 'Delete'
);

ALTER TABLE WF_FORM_COMMON add (pro_inst_flag varchar2(15));
COMMENT ON COLUMN WF_FORM_COMMON.pro_inst_flag IS '根据instance逻辑删除';
update WF_FORM_COMMON  a set PRO_INST_FLAG = '1';
update WF_FORM_COMMON  a set PRO_INST_FLAG = '0' where  exists (
select 1 from WF_PROCESS_INSTANCE b where b.id = a.PRO_INST_ID and STATE = 'Delete'
);

INSERT INTO ORGROLE (ID, PKID, NAME, DESCRIPTION, FLAG, CLICKRATE) VALUES (3004, null, '委内公开透明', '角色内的人员可以查看所有公文，包括委内不公开', 0, null);
INSERT INTO ORGRU (ROLEID, USERID, ORDERNUM) VALUES (3004, 8, 1);
INSERT INTO ORGRU (ROLEID, USERID, ORDERNUM) VALUES (3004, 2507, 1);
INSERT INTO ORGRU (ROLEID, USERID, ORDERNUM) VALUES (3004, 2077, 1);

-- middleAttachmentService.isShouWenDenlu()
-- middleAttachmentService.isFaWenDenlu()
