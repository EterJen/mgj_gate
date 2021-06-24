update  WF_PROCESS_INSTANCE set STATE = 'Useful' where STATE is null ;
alter table  WF_PROCESS_INSTANCE add (HANDLE_STATE  varchar2(50));
COMMENT ON COLUMN WF_PROCESS_INSTANCE.HANDLE_STATE IS '公文处理状态'

update WF_FORM_ACTION set PRE_CONDITION = '$scope.task.readMode==''proInst''' where ID =759475;

commit;

