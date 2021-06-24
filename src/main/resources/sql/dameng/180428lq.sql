/*alter table attachment drop column web_url;*/



/*alter table middle_attachment add (creator_id varchar2(50));
alter table middle_attachment add (creator_name varchar2(50));
alter table middle_attachment add (creator_departname varchar2(50));
alter table middle_attachment add (create_time DATETIME);*/

drop table middle_attachment;

alter table middle_attachment add (group_leader_id NUMBER ));
CREATE TABLE middle_attachment(
id NUMBER,
process_instance_id number,
attachmentId NUMBER,
biz_attach_type VARCHAR2(50),
biz_file_type VARCHAR2(50),
file_ext VARCHAR2(50),
creator_id VARCHAR2(50),
creator_name VARCHAR2(50),
creator_departname VARCHAR2(50),
create_time datetime,
PRIMARY KEY (ID)
)