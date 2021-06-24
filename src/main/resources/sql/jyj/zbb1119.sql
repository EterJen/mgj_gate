CREATE TABLE "JYJ"."INDEX_ICON"
(
"ID" NUMBER NOT NULL,
isdelete number(1),
"UPDATOR" NUMBER,
"UPDATETIME" DATETIME(6),
"ICONNAME" VARCHAR2(50),
"ICONURL" VARCHAR2(200),
"CLASSNAME" VARCHAR2(50),
"IMGNAME" VARCHAR2(50),
"ORDERNO" NUMBER,
"PARENTID" NUMBER) STORAGE(ON "MAIN", CLUSTERBTR) ;

comment on table INDEX_ICON is '自定义底部菜单表';
comment on column INDEX_ICON.ID is '主键';
comment on column INDEX_ICON.isdelete is '是否删除 0：否，1：是';
comment on column INDEX_ICON.UPDATOR is '更新人';
comment on column INDEX_ICON.UPDATETIME is '更新时间';
comment on column INDEX_ICON.ICONNAME is '图标名字';
comment on column INDEX_ICON.ICONURL is '图标url';
comment on column INDEX_ICON.CLASSNAME is 'class的名字';
comment on column INDEX_ICON.IMGNAME is '图片名字';
comment on column INDEX_ICON.ORDERNO is '排序';
comment on column INDEX_ICON.PARENTID is '父id';



CREATE TABLE "JYJ"."INDEX_USER_ICON"
(
"ID" NUMBER NOT NULL,
"USERID" NUMBER,
"ORDERNO" NUMBER,
"ICONID" NUMBER) STORAGE(ON "MAIN", CLUSTERBTR) ;

comment on table INDEX_USER_ICON is '用户自定义菜单表';
comment on column INDEX_USER_ICON.ID is '主键';
comment on column INDEX_USER_ICON.USERID is '用户id';
comment on column INDEX_USER_ICON.ORDERNO is '排序';
comment on column INDEX_USER_ICON.ICONID is 'ICON表id';