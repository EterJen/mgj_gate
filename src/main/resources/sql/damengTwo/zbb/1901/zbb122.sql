update DIC_TYPE set flag='0' where id=102346 and name='难以解决';
COMMIT ;
insert into DIC_MODE(select JXWOAUniversalSeq.nextval,'blyjResult','1','办理结果政协',24,'1');
COMMIT ;
insert into DIC_TYPE(select JXWOAUniversalSeq.nextval,'解决或采纳',null,null,null,'1',id,'1' from DIC_MODE where DICTYPE='blyjResult');
insert into DIC_TYPE(select JXWOAUniversalSeq.nextval,'列入计划拟解决',null,null,null,'1',id,'2' from DIC_MODE where DICTYPE='blyjResult');
insert into DIC_TYPE(select JXWOAUniversalSeq.nextval,'留作参考',null,null,null,'1',id,'3' from DIC_MODE where DICTYPE='blyjResult');
COMMIT ;

insert into "WF_FORM_ACTION" ("ID","ACTION_ID","NAME","DESCRIPTION","PRE_CONDITION","ACTION_TO_PERFORM","IMAGE_URL","ORDER_NUM","FLAG","ACTION_TYPE") values (53, 'convertJumpToOfd', '套     红', '正文流式wps：附件直接套红', '$scope.task.status==''Accepted'' && $scope.fc.wpsDetail.middleContentType==''wps'' && $scope.fc.currentAttach!=null', '$scope.fc.convertToOfd()', 'images/sidebar_right-zb.svg', 400, '1', 'currentTaskDeal');
