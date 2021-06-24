update  MPSMODULE set flag=1,NG_STATE='coreHome.',ICONFOCUS='administrative' where title= '办公用品';
update  MPSMODULE set flag=1,NG_STATE='coreHome.',ICONFOCUS='partyCommittee' where title= '党委办公用品';

/*行政物品管理*/
update  MPSMODULE set parentid=100125,flag=1,NG_STATE='coreHome.itemManagement:administrative',ACTIONURL='/coreHome/itemManagement/administrative' where id=100126;
/*党委物品管理*/
update  MPSMODULE set parentid=100131,flag=1,NG_STATE='coreHome.itemManagement:partyCommittee',ACTIONURL='/coreHome/itemManagement/partyCommittee' where id=100132;

/*行政物品管理*/
update  MPSMODULE set parentid=100125,flag=1,NG_STATE='coreHome.purchaseGoods:administrative',ACTIONURL='/coreHome/purchaseGoods/administrative' where id=100127;
/*党委物品管理*/
update  MPSMODULE set parentid=100131,flag=1,NG_STATE='coreHome.purchaseGoods:partyCommittee',ACTIONURL='/coreHome/purchaseGoods/partyCommittee' where id=100133;

/*行政物品管理*/
update  MPSMODULE set parentid=100125,flag=1,NG_STATE='coreHome.applicationGoods:administrative',ACTIONURL='/coreHome/applicationGoods/administrative' where id=100129;
/*党委物品管理*/
update  MPSMODULE set parentid=100131,flag=1,NG_STATE='coreHome.applicationGoods:partyCommittee',ACTIONURL='/coreHome/applicationGoods/partyCommittee' where id=100135;


CREATE TABLE goods
(
ID NUMBER NOT NULL,
Numbering NUMBER,//编号
name VARCHAR2(125),//物品名称
DIC_TYPE_id NUMBER,//分类id
Quantity NUMBER,//数量
unit VARCHAR2(200),//单位
specification VARCHAR2(200),//规格
unit_price NUMBER,//单价
purchase_time DATETIME(6),//采购时间
purchase_people VARCHAR2(50),//采购人
Manager VARCHAR2(50),//经办人
remarks VARCHAR2(4000),//备注
CREATOR_ID NUMBER,//创建者id
CREATOR_NAME VARCHAR2(50),//创建者名字
CREATE_TIME DATETIME(6),//创建时间
flag VARCHAR2(125),//逻辑标记位
status VARCHAR2(125),//商品的状态
required_department VARCHAR2(215),//所需部门
required_department_id NUMBER,//所需部门id
reason_aplication VARCHAR2(4000),//申请理由
is_Application_item VARCHAR2(50),//是否需要申请物品
is_Special_item VARCHAR2(50),//是否特殊物品
Product_Types VARCHAR2(50),//是行政还是党委的商品
Item_status VARCHAR2(125),//物品状态
CLUSTER PRIMARY KEY(ID)) STORAGE(ON MAIN, CLUSTERBTR) ;
COMMENT ON TABLE goods IS '物品信息表';
COMMENT ON COLUMN goods.ID IS '主键';
COMMENT ON COLUMN goods.Numbering IS '物品编号';
COMMENT ON COLUMN goods.name IS '物品名称';
COMMENT ON COLUMN goods.DIC_TYPE_id IS '分类id';
COMMENT ON COLUMN goods.Quantity IS '数量';
COMMENT ON COLUMN goods.unit IS '单位';
COMMENT ON COLUMN goods.specification IS '规格';
COMMENT ON COLUMN goods.unit_price IS '单价';
COMMENT ON COLUMN goods.purchase_time IS '采购时间';
COMMENT ON COLUMN goods.remarks IS '备注';
COMMENT ON COLUMN goods.CREATOR_ID IS '创建者id';
COMMENT ON COLUMN goods.CREATOR_NAME IS '创建者名字';
COMMENT ON COLUMN goods.CREATE_TIME IS '创建时间';
COMMENT ON COLUMN goods.flag IS '逻辑标记位';
COMMENT ON COLUMN goods.status IS '商品的状态';
COMMENT ON COLUMN goods.required_department IS '所需部门';
COMMENT ON COLUMN goods.required_department_id IS '所需部门id';
COMMENT ON COLUMN goods.reason_aplication IS '申请理由';
COMMENT ON COLUMN goods.is_Application_item IS '是否需要申请物品';
COMMENT ON COLUMN goods.is_Special_item IS '是否特殊物品';
COMMENT ON COLUMN goods.Product_Types IS '是行政还是党委的商品';
COMMENT ON COLUMN goods.Item_status IS '物品状态未购买或者已购买入库暂时未用';
COMMENT ON COLUMN goods.purchase_people IS '采购人';
COMMENT ON COLUMN goods.Manager IS '经办人';





CREATE TABLE goods_Application
(
ID NUMBER NOT NULL,
CREATOR_ID NUMBER,//创建者id
CREATOR_NAME VARCHAR2(50),//创建者名字
CREATE_TIME DATETIME(6),//创建时间
Application_sector VARCHAR2(215),//申请部门
Application_sector_id NUMBER,//申请部门id
flag VARCHAR2(125),//逻辑标记位
status VARCHAR2(125),//流转状态
CLUSTER PRIMARY KEY(ID)) STORAGE(ON MAIN, CLUSTERBTR) ;
COMMENT ON TABLE goods_Application IS '申请物品表';
COMMENT ON COLUMN goods_Application.ID IS '主键';
COMMENT ON COLUMN goods_Application.CREATOR_ID IS '创建者id';
COMMENT ON COLUMN goods_Application.CREATOR_NAME IS '创建者名字';
COMMENT ON COLUMN goods_Application.CREATE_TIME IS '创建时间';
COMMENT ON COLUMN goods_Application.Application_sector IS '申请部门';
COMMENT ON COLUMN goods_Application.Application_sector_id IS '申请部门id';
COMMENT ON COLUMN goods_Application.flag IS '逻辑标记位';
COMMENT ON COLUMN goods_Application.status IS '审批状态';




CREATE TABLE goods_A_g
(
goods_ID NUMBER NOT NULL,
Application_ID NUMBER NOT NULL,//申请物品表id
Quantity NUMBER,//申请数量
status VARCHAR2(125)//流转状态
);
/*CLUSTER PRIMARY KEY(ID)) STORAGE(ON MAIN, CLUSTERBTR) ;*/
COMMENT ON TABLE goods_A_g IS '申请物品和商品中间表';
COMMENT ON COLUMN goods_A_g.goods_ID IS '商品表主键';
COMMENT ON COLUMN goods_A_g.Application_ID IS '申请物品表id';
COMMENT ON COLUMN goods_A_g.Quantity IS '申请数量';
COMMENT ON COLUMN goods_A_g.status IS '申领状态';


