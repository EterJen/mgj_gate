--意见展示节点配置更新  后期放xml或流程版本中
UPDATE JXW4.wf_process_def_manage SET name = '长城电子发', description = '长城电子发文', order_num = 1, form_def_id = 'fawen', pro_def_group_id = 'fawen', flag = '1', publish_office = '上海市长城电子', publish_symbol = '0A', unified_social_credit_code = '12100000400002195R', doc_oid = '1.2.156.10', send_depart_code = '000', serial_number = '00065', publish_office_brif = null, issue_person = '测试', issue_person_post = '处长', option_show_conf = '{ "hegao": [ "2", "4" ], "huigao": [ "3" ], "shenhe": [ "5" ], "qianfa": [ "6" ] }' WHERE id = 109705;
UPDATE JXW4.wf_process_def_manage SET name = '长城电子党委发文', description = '长城电子党工发文', order_num = 3, form_def_id = 'jxwdwfawen', pro_def_group_id = 'fawen', flag = '1', publish_office = null, publish_symbol = null, unified_social_credit_code = null, doc_oid = null, send_depart_code = null, serial_number = null, publish_office_brif = null, issue_person = null, issue_person_post = null, option_show_conf = '{ "hegao": [ "2", "4" ], "huigao": [ "3" ], "shenhe": [ "5" ], "qianfa": [ "6" ,"7" ] }' WHERE id = 109894;
UPDATE JXW4.wf_process_def_manage SET name = '国防办发文', description = '沪府国防办发', order_num = 4, form_def_id = 'gfkgbfawen', pro_def_group_id = 'fawen', flag = '1', publish_office = null, publish_symbol = null, unified_social_credit_code = null, doc_oid = null, send_depart_code = null, serial_number = null, publish_office_brif = null, issue_person = null, issue_person_post = null, option_show_conf = '{ "hegao": [ "2", "4" ], "huigao": [ "3" ], "shenhe": [ "5" ], "qianfa": [ "6" ,"11" ] }' WHERE id = 109901;
UPDATE JXW4.wf_process_def_manage SET name = '长城电子党委收文', description = '长城电子党工收文', order_num = 6, form_def_id = 'jxwdwshouwen', pro_def_group_id = 'shouwen', flag = '1', publish_office = null, publish_symbol = null, unified_social_credit_code = null, doc_oid = null, send_depart_code = null, serial_number = null, publish_office_brif = null, issue_person = null, issue_person_post = null, option_show_conf = '{ "pishi": [ "2", "3", "5" ], "niban": [ "4", "6" ] }' WHERE id = 109903;
UPDATE JXW4.wf_process_def_manage SET name = '长城电子收', description = '长城电子收', order_num = 5, form_def_id = 'jxwshouwen', pro_def_group_id = 'shouwen', flag = '1', publish_office = null, publish_symbol = '', unified_social_credit_code = null, doc_oid = null, send_depart_code = null, serial_number = null, publish_office_brif = null, issue_person = null, issue_person_post = null, option_show_conf = '{ "pishi": [ "2", "3", "4" ], "niban": [ "1", "5" ] }' WHERE id = 109906;
UPDATE JXW4.wf_process_def_manage SET name = '信函', description = '信函', order_num = 11, form_def_id = 'jxwxinhan', pro_def_group_id = 'xinhan', flag = '1', publish_office = null, publish_symbol = null, unified_social_credit_code = null, doc_oid = null, send_depart_code = null, serial_number = null, publish_office_brif = null, issue_person = null, issue_person_post = null, option_show_conf = '{ "liuzhuan": [ "1", "2" ] }' WHERE id = 109910;
UPDATE JXW4.wf_process_def_manage SET name = '长城电子规范发文', description = '长城电子规范发文', order_num = 2, form_def_id = 'hjxgffawen', pro_def_group_id = 'fawen', flag = '1', publish_office = null, publish_symbol = null, unified_social_credit_code = null, doc_oid = null, send_depart_code = null, serial_number = null, publish_office_brif = null, issue_person = null, issue_person_post = null, option_show_conf = '{ "hegao": [ "2", "4" ], "huigao": [ "3" ], "shenhe": [ "5" ], "qianfa": [ "6" ] }' WHERE id = 110069;
UPDATE JXW4.wf_process_def_manage SET name = '中央文件（甲）', description = '机要文件甲', order_num = 7, form_def_id = 'jywjj', pro_def_group_id = 'shangjilaiwen', flag = '1', publish_office = null, publish_symbol = null, unified_social_credit_code = null, doc_oid = null, send_depart_code = null, serial_number = null, publish_office_brif = null, issue_person = null, issue_person_post = null, option_show_conf = '{ "yueshi": [ "2" ], "banli": [ "3" ] }' WHERE id = 110070;
UPDATE JXW4.wf_process_def_manage SET name = '市委文件（乙）', description = '机要文件乙', order_num = 8, form_def_id = 'jywjy', pro_def_group_id = 'shangjilaiwen', flag = '1', publish_office = null, publish_symbol = null, unified_social_credit_code = null, doc_oid = null, send_depart_code = null, serial_number = null, publish_office_brif = null, issue_person = null, issue_person_post = null, option_show_conf = '{ "yueshi": [ "2" ], "banli": [ "3" ] }' WHERE id = 110071;
UPDATE JXW4.wf_process_def_manage SET name = '市府文件（丙）', description = '机要文件丙', order_num = 9, form_def_id = 'jywjb', pro_def_group_id = 'shangjilaiwen', flag = '1', publish_office = null, publish_symbol = null, unified_social_credit_code = null, doc_oid = null, send_depart_code = null, serial_number = null, publish_office_brif = null, issue_person = null, issue_person_post = null, option_show_conf = '{ "yueshi": [ "2" ], "banli": [ "3" ] }' WHERE id = 110072;
UPDATE JXW4.wf_process_def_manage SET name = '国务院文件（国）', description = '机要文件国', order_num = 10, form_def_id = 'jywjg', pro_def_group_id = 'shangjilaiwen', flag = '1', publish_office = null, publish_symbol = null, unified_social_credit_code = null, doc_oid = null, send_depart_code = null, serial_number = null, publish_office_brif = null, issue_person = null, issue_person_post = null, option_show_conf = '{ "yueshi": [ "2" ], "banli": [ "3" ] }' WHERE id = 110073;
UPDATE JXW4.wf_process_def_manage SET name = '党委信函', description = null, order_num = null, form_def_id = 'jxwxinhan', pro_def_group_id = 'xinhan', flag = '1', publish_office = null, publish_symbol = null, unified_social_credit_code = null, doc_oid = null, send_depart_code = null, serial_number = null, publish_office_brif = null, issue_person = null, issue_person_post = null, option_show_conf = '{ "liuzhuan": [ "1", "2" ] }' WHERE id = 758900;