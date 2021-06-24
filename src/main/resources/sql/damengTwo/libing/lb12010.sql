insert into "WF_PROCESS_DEF_VERSION" ("ID","PROCESS_DEF_ID","VERSION","FILE_NAME","FILE_PATH","IS_ACTIVE","DESCRIPTION") values (867935, 110074, 425, 'c27891b6-fddd-4584-8937-35fed8e52a9c', 'c27891b6-fddd-4584-8937-35fed8e52a9c.xml', '1', '工作报批');
insert into "WF_PROCESS_DEF_VERSION" ("ID","PROCESS_DEF_ID","VERSION","FILE_NAME","FILE_PATH","IS_ACTIVE","DESCRIPTION") values (868473, 110075, 425, '371c37fa-285b-4d99-8105-92078fb2ab7d', '371c37fa-285b-4d99-8105-92078fb2ab7d.xml', '1', '外事报批');
insert into "WF_PROCESS_DEF_VERSION" ("ID","PROCESS_DEF_ID","VERSION","FILE_NAME","FILE_PATH","IS_ACTIVE","DESCRIPTION") values (868530, 110076, 425, '3c79e567-0f89-4d22-a5cb-9604301ab3c9', '3c79e567-0f89-4d22-a5cb-9604301ab3c9.xml', '1', '合同报批');
insert into "WF_PROCESS_DEF_VERSION" ("ID","PROCESS_DEF_ID","VERSION","FILE_NAME","FILE_PATH","IS_ACTIVE","DESCRIPTION") values (868569, 110077, 425, '97d5e376-b400-466f-b90f-9a4163226ab8', '97d5e376-b400-466f-b90f-9a4163226ab8.xml', '1', '委内文稿审核');






insert into "WF_PROCESS_DEF_MANAGE" ("ID","NAME","DESCRIPTION","ORDER_NUM","FORM_DEF_ID","PRO_DEF_GROUP_ID","FLAG","PUBLISH_OFFICE","PUBLISH_SYMBOL","UNIFIED_SOCIAL_CREDIT_CODE","DOC_OID","SEND_DEPART_CODE","SERIAL_NUMBER","PUBLISH_OFFICE_BRIF","ISSUE_PERSON","ISSUE_PERSON_POST","OPTION_SHOW_CONF","DOC_PREFIX") values (110074, '工作报批', '工作报批', 13, 'workapproved', 'xinhan', '1', null, null, null, null, null, null, null, null, null, '{ "csyj": [ "2" ], "bgsyj": [ "3" ],"wldyj":["4"] }	', null);
insert into "WF_PROCESS_DEF_MANAGE" ("ID","NAME","DESCRIPTION","ORDER_NUM","FORM_DEF_ID","PRO_DEF_GROUP_ID","FLAG","PUBLISH_OFFICE","PUBLISH_SYMBOL","UNIFIED_SOCIAL_CREDIT_CODE","DOC_OID","SEND_DEPART_CODE","SERIAL_NUMBER","PUBLISH_OFFICE_BRIF","ISSUE_PERSON","ISSUE_PERSON_POST","OPTION_SHOW_CONF","DOC_PREFIX") values (110075, '外事报批', '外事报批', 15, 'otherapproved', 'xinhan', '1', null, null, null, null, null, null, null, null, null, '{ "czyj": [ "2" ], "spyj": [ "3" ],"bnyj":["4"] ,"wldyj":["5"] ,"bjyj":["6"]}', null);
insert into "WF_PROCESS_DEF_MANAGE" ("ID","NAME","DESCRIPTION","ORDER_NUM","FORM_DEF_ID","PRO_DEF_GROUP_ID","FLAG","PUBLISH_OFFICE","PUBLISH_SYMBOL","UNIFIED_SOCIAL_CREDIT_CODE","DOC_OID","SEND_DEPART_CODE","SERIAL_NUMBER","PUBLISH_OFFICE_BRIF","ISSUE_PERSON","ISSUE_PERSON_POST","OPTION_SHOW_CONF","DOC_PREFIX") values (110076, '合同报批', '合同报批', 14, 'contractapproved', 'xinhan', '1', null, null, null, null, null, null, null, null, null, '{ "nibyj": [ "1" ], "csyj": [ "2" ], "bgsnbyj": [ "3" ],"bgsshyj": [ "4" ],"hbcsyj":["5"],"flblyj":["6"],"flshyj":["7"],"wfgldyj":["8"] }', null);
insert into "WF_PROCESS_DEF_MANAGE" ("ID","NAME","DESCRIPTION","ORDER_NUM","FORM_DEF_ID","PRO_DEF_GROUP_ID","FLAG","PUBLISH_OFFICE","PUBLISH_SYMBOL","UNIFIED_SOCIAL_CREDIT_CODE","DOC_OID","SEND_DEPART_CODE","SERIAL_NUMBER","PUBLISH_OFFICE_BRIF","ISSUE_PERSON","ISSUE_PERSON_POST","OPTION_SHOW_CONF","DOC_PREFIX") values (110077, '委内文稿审核单', '委内文稿审核单', 15, 'draftapproved', 'xinhan', '1', null, null, null, null, null, null, null, null, null, '{ "csyj": [ "2" ], "bgsyj": [ "3" ],"yjsyj":["4"] }', null);


