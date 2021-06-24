
alter table GOODS_A_G add (amount_declared number);
COMMENT ON COLUMN GOODS_A_G.amount_declared IS '物品单价会被改，申领的时候记录物品金额';
commit;