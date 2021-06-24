/*为公文ofd 附件增加打印控制信息  记录已打印份号和未打印份号  json格式*/
alter table middle_attachment add (print_ctl_info varchar2(1000));
comment on column "middle_attachment"."print_ctl_info" is '份号打印控制信息';
commit;
