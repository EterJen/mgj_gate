alter table WF_FORM_YSCGJSHENGPI add (applicant VARCHAR2(100)) ;
comment on column WF_FORM_YSCGJSHENGPI.applicant is '申请人姓名';
alter table WF_FORM_YSCGJSHENGPI add (certificate_type VARCHAR2(100)) ;
comment on column WF_FORM_YSCGJSHENGPI.certificate_type is '证件类别';
alter table WF_FORM_YSCGJSHENGPI add (certificate_number VARCHAR2(40)) ;
comment on column WF_FORM_YSCGJSHENGPI.certificate_number is '证件号码';
alter table WF_FORM_YSCGJSHENGPI add (receive_time DATETIME) ;
comment on column WF_FORM_YSCGJSHENGPI.receive_time is '证件领用时间';
alter table WF_FORM_YSCGJSHENGPI add (return_time DATETIME) ;
comment on column WF_FORM_YSCGJSHENGPI.return_time is '证件归还时间';
alter table WF_FORM_YSCGJSHENGPI add (user_type VARCHAR2(30)) ;
comment on column WF_FORM_YSCGJSHENGPI.user_type is '人员类别';