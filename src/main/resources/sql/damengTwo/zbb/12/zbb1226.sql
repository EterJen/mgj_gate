update MPSMODULE set title='代理管理' where title='代理人管理';
update MPSMODULE set ACTIONURL='/coreHome/collectionList' where TITLE='我的关注';


--jxw党委新增
alter table WF_FORM_JXWDWFAWEN add (
  zhu_song_num number,
  chao_song_num number,
  zhi_neng_chu_shi_num number,
  gui_dang_num number,
  other_num number
);
COMMENT ON COLUMN WF_FORM_JXWDWFAWEN.zhu_song_num IS '主送份数';
COMMENT ON COLUMN WF_FORM_JXWDWFAWEN.chao_song_num IS '抄送份数';
COMMENT ON COLUMN WF_FORM_JXWDWFAWEN.zhi_neng_chu_shi_num IS '职能处室份数';
COMMENT ON COLUMN WF_FORM_JXWDWFAWEN.gui_dang_num IS '归档份数';
COMMENT ON COLUMN WF_FORM_JXWDWFAWEN.other_num IS '其他份数';