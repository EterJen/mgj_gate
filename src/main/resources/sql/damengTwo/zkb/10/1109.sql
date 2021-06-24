alter table wf_process_def_manage add (DOC_PREFIX varchar2(20));
COMMENT ON COLUMN wf_process_def_manage.DOC_PREFIX IS '公文前缀';

commit;

UPDATE WF_PROCESS_DEF_MANAGE SET DOC_PREFIX = '长城电子' WHERE ID = 109705;
UPDATE WF_PROCESS_DEF_MANAGE SET DOC_PREFIX = '长城电子工委' WHERE ID = 109894;
UPDATE WF_PROCESS_DEF_MANAGE SET DOC_PREFIX = '沪国防办' WHERE ID = 109901;
UPDATE WF_PROCESS_DEF_MANAGE SET DOC_PREFIX = '长城电子工委收' WHERE ID = 109903;
UPDATE WF_PROCESS_DEF_MANAGE SET DOC_PREFIX = '长城电子收' WHERE ID = 109906;
UPDATE WF_PROCESS_DEF_MANAGE SET DOC_PREFIX = '信函' WHERE ID = 109910;
UPDATE WF_PROCESS_DEF_MANAGE SET DOC_PREFIX = '长城电子规范' WHERE ID = 110069;
UPDATE WF_PROCESS_DEF_MANAGE SET DOC_PREFIX = '甲' WHERE ID = 110070;
UPDATE WF_PROCESS_DEF_MANAGE SET DOC_PREFIX = '乙' WHERE ID = 110071;
UPDATE WF_PROCESS_DEF_MANAGE SET DOC_PREFIX = '丙' WHERE ID = 110072;
UPDATE WF_PROCESS_DEF_MANAGE SET DOC_PREFIX = '国' WHERE ID = 110073;
UPDATE WF_PROCESS_DEF_MANAGE SET DOC_PREFIX = '党委信函' WHERE ID = 758900;
UPDATE WF_PROCESS_DEF_MANAGE SET DOC_PREFIX = '长城电子督' WHERE ID = 882464;
commit;