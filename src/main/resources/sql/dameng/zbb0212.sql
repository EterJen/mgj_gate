alter table ORGDEPT add (PRINCIPALID NUMBER);
COMMENT ON COLUMN ORGDEPT.PRINCIPALID IS '负责人id';
--权限菜单树形结构请访问项目地址：localhost:9999/coreMpsModule/mpsModuleCreatParent


