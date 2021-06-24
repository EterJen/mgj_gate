/*用户操作日志 分类 普通 管理  安全 审计*/
/*生成*/
alter table orguser add (audit_create_type varchar2(200));
comment on column "orguser"."audit_create_type" is '日志生成类型';
/*读取*/
alter table orguser add (audit_read_type  varchar2(200));
comment on column "orguser"."audit_read_type" is '日志查看类型';
commit;

UPDATE orguser SET  audit_create_type = 'ordinaryUser',audit_read_type='ordinaryUser';
UPDATE orguser SET  audit_create_type = 'sysMgr',audit_read_type='sysMgr' WHERE id='3000';
UPDATE orguser SET  audit_create_type = 'securityMgr' ,audit_read_type='securityMgr' WHERE id = '3001';
UPDATE orguser SET  audit_create_type = 'auditMgr',audit_read_type='auditMgr' WHERE  id='3002';

COMMIT;


