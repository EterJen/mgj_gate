alter table attachment add (web_url varchar2(255));
COMMENT ON COLUMN attachment."web_url" IS 'web容器下的url';