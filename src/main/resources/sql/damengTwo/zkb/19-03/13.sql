alter table wf_process_instance add (CREATER_DEPT varchar2(100));
COMMENT ON COLUMN wf_process_instance."CREATER_DEPT" IS '办理处室';
update wf_process_instance i set CREATER_DEPT = (
select  d.name from ORGDEPT d inner join ORGDU du on du.DEPTID=d.ID where du.USERID = i.creator_id and ROWNUM <= 1
);

UPDATE WF_LEADERWORK_VIEW_MODE SET FLAG = '1', CREATOR_ID = 8, CREATOR_NAME = '吴平娣', CREATE_TIME = '2019-01-25 13:01:42.153000', LAST_UPDATED_TIME = '2019-01-25 13:01:42.161000', MODE_NAME = '行政领导安排', MODE_VIEW = '[{"id":2459,"name":"陈鸣波","order":0},{"id":3,"name":"吴金城","order":1},{"id":116,"name":"傅新华","order":2},{"id":2038,"name":"戎之勤","order":3},{"id":867561,"name":"张建明","order":4},{"id":877328,"name":"阮力","order":5},{"id":321,"name":"张英","order":6},{"id":2,"name":"史文军","order":7}]', MODE_TYPE = 'X', MODE_DESC = '查看长城电子领导工作安排' WHERE ID = 915395;

INSERT INTO ORGRU (ROLEID, USERID, ORDERNUM) VALUES (3004, 2065, 1);
INSERT INTO ORGRU (ROLEID, USERID, ORDERNUM) VALUES (3004, 192, 1);
/*
*替换机关党委模板
*各流程控制表单控制配置，包括全部节点
*/
