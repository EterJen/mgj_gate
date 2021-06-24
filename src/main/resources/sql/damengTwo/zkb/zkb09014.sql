alter table  audit_info add (operator_Ename  varchar2(20));
COMMENT ON COLUMN audit_info.operator_Ename IS '操作者英文名';
alter table  audit_info add (entity_id  varchar2(20));
COMMENT ON COLUMN audit_info.entity_id IS '操作对象id';

commit;