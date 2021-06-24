alter table WF_FORM_NPCHANDLING modify (PROPOSAL_PEOPLE varchar2(200));
alter table WF_FORM_DPCOMPOSEDDEAL modify (PROPOSAL_PEOPLE varchar2(200));

insert into MPSMODULE (id,TITLE,ACTIONURL,TARGETFRAME,DESCRIPTION,FLAG,PARENTID,NG_STATE,TITLE_MENU_SHOW,PKCODE)
	                (select JXWOAUniversalSeq.nextval,
	                		'批量导入',
	                		'/coreHome/batchimport',
	                		'batchimport',
	                		'人大政协批量导入',
	                		'1',
	                		m.id,
	                		'coreHome.batchimport',
	                		'批量导入',01080810 from MPSMODULE m where m.title='办理办信');
COMMIT ;
insert into MPSAVAILMODULE (ELEMENTID,ELEMENTTYPE,FLAG,MPSMODULE_ID,MODULECODE)(select 2397,'U','1',id,01080810 from MPSMODULE where title='批量导入');
COMMIT ;