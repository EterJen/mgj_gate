update mpsmodule set title = '待办事项' where title = '待办事宜';
update wf_form_action set action_to_perform = '$scope.ofdPrint()' where id = 12;

update mpsmodule set actionurl = '/coreHome/receivedOfficialDocuments' , ng_state = 'coreHome.receivedOfficialDocuments' where ng_state = 'coreHome.shouwenmanage';
update mpsmodule set actionurl = '/coreHome/sentOfficialDocuments' , ng_state = 'coreHome.sentOfficialDocuments' where ng_state = 'coreHome.fawenmanage';
update mpsmodule set actionurl = '/coreHome/officialDocuments' , ng_state = 'coreHome.officialDocuments' where ng_state = 'coreHome.zongheQuery';

commit;

