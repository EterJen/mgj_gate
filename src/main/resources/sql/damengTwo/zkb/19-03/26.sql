alter table MIDDLE_ATTACHMENT add (IP varchar2(64));
COMMENT ON COLUMN MIDDLE_ATTACHMENT."IP" IS '客户端ip';