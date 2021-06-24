/*追加*/
CREATE or replace unique index uidx_udno on wf_person_flow_option (task_assignee_id, flow_def_id,flow_node_id,opinion);

/*个人常用意见表*/
create TABLE "wf_person_flow_option" (
    "id" number primary key ,
    "task_assignee_id" NUMBER,
    "flow_def_id" NUMBER,
    "flow_node_id" NUMBER,
    "opinion" VARCHAR2(3000),
    "order_num" NUMBER
);
COMMENT ON TABLE wf_person_flow_option IS '个人常用意见表';
COMMENT ON COLUMN wf_person_flow_option.id IS '主键';
COMMENT ON COLUMN wf_person_flow_option.task_assignee_id IS '任务处理人id（存在代理）';
COMMENT ON COLUMN wf_person_flow_option.flow_def_id IS '流程定义id';
COMMENT ON COLUMN wf_person_flow_option.flow_node_id IS '流程节点id';
COMMENT ON COLUMN wf_person_flow_option.opinion IS '意见内容';
COMMENT ON COLUMN wf_person_flow_option.order_num IS '排序字段';

COMMIT;
/*select *
from user_tab_comments
where Table_Name='org_l_d'
order by Table_Name;

--获取字段注释：

select *
from user_col_comments
where Table_Name='org_l_d'
order by column_name*/

