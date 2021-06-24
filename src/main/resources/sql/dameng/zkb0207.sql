-- 2、登录模式默认为单用户替换，修改默认值；修改脚本放入迁移脚本；
update  ORGUSER   set  USERMODE =22 where USERMODE=1;
update  ORGUSER   set  USERMODE =1 where USERMODE=3;
update  ORGUSER   set  USERMODE =3 where USERMODE=22;

