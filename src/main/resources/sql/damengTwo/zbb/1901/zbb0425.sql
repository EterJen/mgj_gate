/*行政物品管理*/
update  MPSMODULE set parentid=100125,flag=1,NG_STATE='coreHome.itemStatistics:administrative',ACTIONURL='/coreHome/itemStatistics/administrative' where id=100128;
/*党委物品管理*/
update  MPSMODULE set parentid=100131,flag=1,NG_STATE='coreHome.itemStatistics:partyCommittee',ACTIONURL='/coreHome/itemStatistics/partyCommittee' where id=100134;


insert into MPSMODULE (id,TITLE,ACTIONURL,TARGETFRAME,DESCRIPTION,FLAG,PARENTID,NG_STATE,PKCODE,TITLE_MENU_SHOW)
	                (select JXWOAUniversalSeq.nextval,
	                		'物品分发',
	                		'/coreHome/itemDistribution/administrative',
	                		'itemDistribution',
	                		'物品分发',
	                		'1',
	                		m.id,
	                		'coreHome.itemDistribution:administrative',02120201,'物品分发' from MPSMODULE m where m.title='办公用品');

insert into MPSMODULE (id,TITLE,ACTIONURL,TARGETFRAME,DESCRIPTION,FLAG,PARENTID,NG_STATE,PKCODE,TITLE_MENU_SHOW)
	                (select JXWOAUniversalSeq.nextval,
	                		'物品分发',
	                		'/coreHome/itemDistribution/partyCommittee',
	                		'itemDistribution',
	                		'物品分发',
	                		'1',
	                		m.id,
	                		'coreHome.itemDistribution:partyCommittee',02130201,'物品分发' from MPSMODULE m where m.title='党委办公用品');


insert into MPSMODULE (id,TITLE,ACTIONURL,TARGETFRAME,DESCRIPTION,FLAG,PARENTID,NG_STATE,PKCODE,TITLE_MENU_SHOW)
	                (select JXWOAUniversalSeq.nextval,
	                		'申领确认',
	                		'/coreHome/claimConfirmation/administrative',
	                		'claimConfirmation',
	                		'申领确认',
	                		'1',
	                		m.id,
	                		'coreHome.claimConfirmation:administrative',02120202,'申领确认' from MPSMODULE m where m.title='办公用品');

insert into MPSMODULE (id,TITLE,ACTIONURL,TARGETFRAME,DESCRIPTION,FLAG,PARENTID,NG_STATE,PKCODE,TITLE_MENU_SHOW)
	                (select JXWOAUniversalSeq.nextval,
	                		'申领确认',
	                		'/coreHome/claimConfirmation/partyCommittee',
	                		'claimConfirmation',
	                		'申领确认',
	                		'1',
	                		m.id,
	                		'coreHome.claimConfirmation:partyCommittee',02130202,'申领确认' from MPSMODULE m where m.title='党委办公用品');

COMMIT ;



alter table GOODS add (goods_ag_id number);
COMMENT ON COLUMN GOODS.goods_ag_id IS 'goods_a_g表的id';
commit;
drop table GOODS_A_G;

CREATE TABLE goods_A_g
(
ID NUMBER NOT NULL,
goods_ID NUMBER NOT NULL,
Application_ID NUMBER NOT NULL,//申请物品表id
Quantity NUMBER,//申请数量
status VARCHAR2(125),//流转状态
CLUSTER PRIMARY KEY(ID)) STORAGE(ON MAIN, CLUSTERBTR) ;
COMMENT ON TABLE goods_A_g IS '申请物品和商品中间表';
COMMENT ON COLUMN goods_A_g.ID IS '主键';
COMMENT ON COLUMN goods_A_g.goods_ID IS '商品表主键';
COMMENT ON COLUMN goods_A_g.Application_ID IS '申请物品表id';
COMMENT ON COLUMN goods_A_g.Quantity IS '申请数量';
COMMENT ON COLUMN goods_A_g.status IS '申领状态';





alter table GOODS add (old_name VARCHAR2(150));
COMMENT ON COLUMN GOODS.old_name IS '修改名字，记录下来';
commit;