--------------------------2018.8.6新增加----------------------------------
alter table middle_attachment add (current_node_id VARCHAR2(50));
COMMENT ON COLUMN middle_attachment.current_node_id IS '附件上传所在的当前节点';
--------------------------2018.8.1新增加----------------------------------
update mpsmodule set flag=0 where title='事务';
insert into wf_form_action(id,action_id,name,description,pre_condition,action_to_perform,image_url,order_num,flag)values(
							17,'isShowRevise','显示修订','wps：显示修订','$scope.task.readMode==''task''&& $scope.fc.wpsDetail.middleContentType==''wps'' && $scope.fc.currentAttach!=null&&$scope.fc.currentAttach.attachment.id!=null&&$scope.fc.currentAttach.bizFileType==''content''&&!$scope.task.currNodeIsShowRevise',
							'$scope.fc.isRevise(0)','images/sidebar_right-01.png',17,'1');
							
insert into wf_form_action(id,action_id,name,description,pre_condition,action_to_perform,image_url,order_num,flag)values(
							18,'isHideRevise','隐藏修订','wps：隐藏修订','$scope.task.readMode==''task''&& $scope.fc.wpsDetail.middleContentType==''wps'' && $scope.fc.currentAttach!=null&&$scope.fc.currentAttach.attachment.id!=null&&$scope.fc.currentAttach.bizFileType==''content''&&$scope.task.currNodeIsShowRevise',
							'$scope.fc.isRevise(2)','images/sidebar_right-01.png',18,'1');
							
insert into wf_form_action(id,action_id,name,description,pre_condition,action_to_perform,image_url,order_num,flag)values(
							19,'revisionAcceptCommand','接受修订','wps：接受修订','$scope.task.readMode==''task''&& $scope.fc.wpsDetail.middleContentType==''wps'' && $scope.fc.currentAttach!=null&&$scope.fc.currentAttach.attachment.id!=null&&$scope.fc.currentAttach.bizFileType==''content''',
							'$scope.fc.revisionAcceptCommand()','images/sidebar_right-01.png',19,'1');

COMMIT ;
--------------------------2018.7.11新增加----------------------------------
alter table audit_info add (customer_type VARCHAR2(50));
COMMIT ;
COMMENT ON COLUMN audit_info.customer_type IS '用户类型为：普通用户，系统管理，安全管理，审计管理';
COMMIT ;
insert into MPSMODULE (id,TITLE,ACTIONURL,TARGETFRAME,DESCRIPTION,FLAG,PARENTID) 
	                (select JXWOAUniversalSeq.nextval,
	                		'定密管理',
	                		'/coreHome/responsiblePersonManage',
	                		'responsiblePersonManage',
	                		'定密责任人管理',
	                		'1',
	                		m.id from MPSMODULE m where m.title='权限管理');
COMMIT ;
insert into MPSAVAILMODULE (ELEMENTID,ELEMENTTYPE,FLAG,MPSMODULE_ID)(select 0,'U','1',id from MPSMODULE where title='定密管理');
COMMIT ;
--------------------------2018.6.28新增加----------------------------------
 update attachment set url=substr(url,8,100) where id in (select a.id from middle_attachment m 
 inner join attachment a on a.id=m.attachmentId 
 where m.biz_attach_type='taohongmoban' and biz_file_type='content' and group_leader_id is null);
 COMMIT;

--------------------------2018.6.28新增加-------end---------------------------
insert into MPSMODULE (id,TITLE,ACTIONURL,TARGETFRAME,DESCRIPTION,FLAG,PARENTID) 
	                (select JXWOAUniversalSeq.nextval,
	                		'模板管理',
	                		'/coreHome/redTemplate',
	                		'redTemplate',
	                		'套红模板管理',
	                		'1',
	                		m.id from MPSMODULE m where m.title='流程管理');
COMMIT ;	            
insert into MPSAVAILMODULE (ELEMENTID,ELEMENTTYPE,FLAG,MPSMODULE_ID)(select 0,'R','1',id from MPSMODULE where title='模板管理');
COMMIT ;

--update DIC_TYPE set ename='ask' where name='请示';
--update DIC_TYPE set ename='bulletin' where name='公报';
--update DIC_TYPE set ename='resolution' where name='决议';
--update DIC_TYPE set ename='command' where name='命令';
--update DIC_TYPE set ename='announcement' where name='通告';
--update DIC_TYPE set ename='notice' where name='公告';
--update DIC_TYPE set ename='decision' where name='决定';
--update DIC_TYPE set ename='summary' where name='纪要';
--update DIC_TYPE set ename='opinion' where name='意见';
--update DIC_TYPE set ename='bill' where name='议案';
--update DIC_TYPE set ename='notified' where name='通报';
--update DIC_TYPE set ename='letter' where name='函';
--update DIC_TYPE set ename='inform' where name='通知';
--update DIC_TYPE set ename='reply' where name='批复';
--update DIC_TYPE set ename='presentation' where name='报告';
--COMMIT ;


CREATE TABLE WF_DOC_TYPE ( -- 文种上下行
  ID                  NUMBER, --	主键
  DIC_TYPE_ID 		  NUMBER, --字典id
  TYPENAME        		  VARCHAR2(50), --類型的名字
  PRIMARY KEY (ID)
);
COMMENT ON TABLE WF_DOC_TYPE IS '文種上下文類型';
COMMENT ON COLUMN WF_DOC_TYPE.ID IS '主键';
COMMENT ON COLUMN WF_DOC_TYPE.DIC_TYPE_ID IS '字典id';
COMMENT ON COLUMN WF_DOC_TYPE.TYPENAME IS '類型名字';
COMMIT;
insert into WF_DOC_TYPE(select JXWOAUniversalSeq.nextval,t.id ,'上行' from DIC_TYPE t,DIC_MODE m where m.id=t.DIC_MODE_id and m.dictype='DocumentType' and t.name='请示');
insert into WF_DOC_TYPE(select JXWOAUniversalSeq.nextval,t.id ,'公报' from DIC_TYPE t,DIC_MODE m where m.id=t.DIC_MODE_id and m.dictype='DocumentType' and name='公报');
insert into WF_DOC_TYPE(select JXWOAUniversalSeq.nextval,t.id ,'下行' from DIC_TYPE t,DIC_MODE m where m.id=t.DIC_MODE_id and m.dictype='DocumentType' and name='决议');
insert into WF_DOC_TYPE(select JXWOAUniversalSeq.nextval,t.id ,'令' from DIC_TYPE t,DIC_MODE m where m.id=t.DIC_MODE_id and m.dictype='DocumentType' and name='命令');
insert into WF_DOC_TYPE(select JXWOAUniversalSeq.nextval,t.id ,'下行' from DIC_TYPE t,DIC_MODE m where m.id=t.DIC_MODE_id and m.dictype='DocumentType' and name='通告');
insert into WF_DOC_TYPE(select JXWOAUniversalSeq.nextval,t.id ,'公告' from DIC_TYPE t,DIC_MODE m where m.id=t.DIC_MODE_id and m.dictype='DocumentType' and name='公告');
insert into WF_DOC_TYPE(select JXWOAUniversalSeq.nextval,t.id ,'下行' from DIC_TYPE t,DIC_MODE m where m.id=t.DIC_MODE_id and m.dictype='DocumentType' and name='决定');
insert into WF_DOC_TYPE(select JXWOAUniversalSeq.nextval,t.id ,'纪要' from DIC_TYPE t,DIC_MODE m where m.id=t.DIC_MODE_id and m.dictype='DocumentType' and name='纪要');
insert into WF_DOC_TYPE(select JXWOAUniversalSeq.nextval,t.id ,'意见' from DIC_TYPE t,DIC_MODE m where m.id=t.DIC_MODE_id and m.dictype='DocumentType' and name='意见');
insert into WF_DOC_TYPE(select JXWOAUniversalSeq.nextval,t.id ,'议案' from DIC_TYPE t,DIC_MODE m where m.id=t.DIC_MODE_id and m.dictype='DocumentType' and name='议案');
insert into WF_DOC_TYPE(select JXWOAUniversalSeq.nextval,t.id ,'下行' from DIC_TYPE t,DIC_MODE m where m.id=t.DIC_MODE_id and m.dictype='DocumentType' and name='通报');
insert into WF_DOC_TYPE(select JXWOAUniversalSeq.nextval,t.id ,'函' from DIC_TYPE t,DIC_MODE m where m.id=t.DIC_MODE_id and m.dictype='DocumentType' and name='函');
insert into WF_DOC_TYPE(select JXWOAUniversalSeq.nextval,t.id ,'下行' from DIC_TYPE t,DIC_MODE m where m.id=t.DIC_MODE_id and m.dictype='DocumentType' and name='通知');
insert into WF_DOC_TYPE(select JXWOAUniversalSeq.nextval,t.id ,'下行' from DIC_TYPE t,DIC_MODE m where m.id=t.DIC_MODE_id and m.dictype='DocumentType' and name='批复');
insert into WF_DOC_TYPE(select JXWOAUniversalSeq.nextval,t.id ,'下行' from DIC_TYPE t,DIC_MODE m where m.id=t.DIC_MODE_id and m.dictype='DocumentType' and name='报告');
COMMIT;
alter table wf_form_common add (wf_doc_type_id number);
COMMIT;

--2018.6.12新增加

CREATE TABLE WF_INSTANCE_NUMBER ( -- 份号管理
  ID                  NUMBER, --	主键
  PROCESS_INSTANCE_ID 		  NUMBER, --实例的id
  START_NUMBER        		  NUMBER, --起始份号
  END_NUMBER        		  NUMBER, --结束份号
  UNIT_NAME					  VARCHAR2(50),
  PRIMARY KEY (ID)
);
COMMENT ON TABLE WF_INSTANCE_NUMBER IS '份号管理';
COMMENT ON COLUMN WF_INSTANCE_NUMBER.ID IS '主键';
COMMENT ON COLUMN WF_INSTANCE_NUMBER.PROCESS_INSTANCE_ID IS '实例id';
COMMENT ON COLUMN WF_INSTANCE_NUMBER.START_NUMBER IS '起始份号';
COMMENT ON COLUMN WF_INSTANCE_NUMBER.END_NUMBER IS '结束份号';
COMMENT ON COLUMN WF_INSTANCE_NUMBER.UNIT_NAME IS '单位名称';
COMMIT;

alter table middle_attachment add (PART_NUMBER number);
alter table middle_attachment add (IS_PRINT VARCHAR2(10));
COMMENT ON COLUMN middle_attachment.PART_NUMBER IS '份号';
COMMENT ON COLUMN middle_attachment.IS_PRINT IS '是否打印';
COMMIT;




/*insert into MPSMODULE (id,PKCODE,TITLE,ACTIONURL,TARGETFRAME,DESCRIPTION,FLAG,PARENTID,NG_STATE,TITLE_MENU_SHOW)
	                (select JXWOAUniversalSeq.nextval,
	                		'01020001',
	                		'归档管理',
	                		'/coreHome/archiveManage',
	                		'archiveManage',
	                		'归档管理',
	                		'1',
	                		m.id,
	                		'coreHome.archiveManage',
	                		'归档管理'
	                		 from MPSMODULE m where m.title='公文管理');*/