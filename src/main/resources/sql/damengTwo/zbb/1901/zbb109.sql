alter table WF_FORM_NPCHANDLING drop (RECEIPT_NUMBER);
alter table WF_FORM_NPCHANDLING drop (RECEIPT_YEAR);

alter table WF_FORM_DPCOMPOSEDDEAL drop (RECEIPT_NUMBER);
alter table WF_FORM_DPCOMPOSEDDEAL drop (RECEIPT_YEAR);

alter table WF_FORM_OTHERAPPROVED modify (VISIT_TIME VARCHAR2(255));
