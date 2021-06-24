--------------------------查询数据库所有表结构和相关注释----------------------------------
SELECT t.table_name,
       t.colUMN_NAME,
       t.DATA_TYPE || '(' || t.DATA_LENGTH || ')',
       t1.COMMENTS
 FROM User_Tab_Cols t, User_Col_Comments t1
WHERE t.table_name = t1.table_name
  AND t.column_name = t1.column_name
  and(t.table_name='PROCESS_DEF_GROUP' or t.table_name like 'WF_%') order by t.table_name;  --order by t.column_id
--------------------------查询数据库所有表结构和相关注释-------end---------------------------

create or replace function count_rows(table_name in varchar2,
                                      owner      in varchar2 default null)
  return number authid current_user IS
  num_rows number;
  stmt     varchar2(2000);
begin
  if owner is null then
    stmt := 'select count(*) from "' || table_name || '"';
  else
    stmt := 'select count(*) from "' || owner || '"."' || table_name || '"';
  end if;
  execute immediate stmt
    into num_rows;
  return num_rows;
end;

select table_name, count_rows(table_name) nrows from user_tables