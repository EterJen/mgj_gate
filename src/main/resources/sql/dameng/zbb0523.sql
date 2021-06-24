alter table middle_attachment add (note_appended varchar2(500));
COMMENT ON COLUMN middle_attachment."note_appended" IS '公文域附注';

alter table middle_attachment add (annex_description varchar2(500));
COMMENT ON COLUMN middle_attachment."annex_description" IS '公文域附件说明';

alter table wf_process_instance add (part_number varchar2(50));
COMMENT ON COLUMN wf_process_instance."part_number" IS '公文域份号';

alter table wf_process_instance add (authorship_service varchar2(100));
COMMENT ON COLUMN wf_process_instance."authorship_service" IS '公文域发文机关署名';

--5.26修改
alter table middle_attachment modify (creator_id NUMBER); -- 修改数据类型

--2.28
alter table middle_attachment add (large_version NUMBER);
COMMENT ON COLUMN middle_attachment."large_version" IS '附件大的版本号';

alter table middle_attachment add (minor_version NUMBER);
COMMENT ON COLUMN middle_attachment."large_version" IS '附件小的版本号';