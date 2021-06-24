delete from ORGUSER;
delete from ORGDEPT;
delete from ORGDU;
delete from ORGGROUP;
delete from ORGGU;
delete from ORGPOST;
delete from ORGPU;
delete from ORGROLE;
delete from ORGRU;
delete from MPSMODULE;
delete from MPSAVAILMODULE;

delete from EITC09.MPSAVAILMODULE t where t.modulecode not in (select pkcode from EITC09.MPSMODULE);

insert into ORGUSER select t.pkid,t.* from EITC09.ORGUSER t;
insert into ORGDEPT select t.pkid,t.* from EITC09.ORGDEPT t;
insert into ORGDU select t.* from EITC09.ORGDU t;
insert into ORGGROUP select t.pkid,t.* from EITC09.ORGGROUP t;
insert into ORGGU select t.* from EITC09.ORGGU t;
insert into ORGPOST select t.pkid,t.* from EITC09.ORGPOST t;
insert into ORGPU select t.* from EITC09.ORGPU t;
insert into ORGROLE select t.pkid,t.* from EITC09.ORGROLE t;
insert into ORGRU select t.* from EITC09.ORGRU t;
insert into MPSMODULE select JXWOAUniversalSeq.nextval,t.* from EITC09.MPSMODULE t;
insert into MPSAVAILMODULE (select t.*,(select id from MPSMODULE m where m.PKCODE = t.MODULECODE) as MPSMODULE_ID from EITC09.MPSAVAILMODULE t);

update ORGUSER set password ='$2a$10$NuMivQ7ahtvoF1ew5oM1Jei9JlMw9vFTBsexR686mLb53BM13bWZ2';

commit;
