alter table  WF_PROCESS_INSTANCE add (TRANSACTOR varchar2(50));
COMMENT ON COLUMN WF_PROCESS_INSTANCE.TRANSACTOR IS '当前流程处理人'

commit;

