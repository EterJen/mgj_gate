alter table WF_OPINION modify opinion varchar2(5000);
alter table WF_PERSON_FLOW_OPTION modify opinion varchar2(5000);
alter table WF_PERSON_FLOW_OPTION  add (show_position  varchar2(30));
COMMENT ON COLUMN WF_PERSON_FLOW_OPTION.show_position IS '展示位置';
commit;
