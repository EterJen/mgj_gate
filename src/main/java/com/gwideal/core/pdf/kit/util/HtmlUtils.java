package com.gwideal.core.pdf.kit.util;

/**
 * HTML工具类
 * 读取HTML内容后进行封装
 *
 * @author libing
 */
public class HtmlUtils {
/*
    public static final String DATE_FORMAT = "yyyy-MM-dd";

    public static SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

    public static SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy年MM月dd日");

    public static final String DOL = "$";

    public static final String IMGDOC = ".png";

    *//**
     * 根据HTML路径获取HTML
     *
     * @param htmlSrc
     * @param bean
     * @param type
     * @return
     *//*
    public static String getHtmlString(String htmlSrc, RCurrentTaskInfo bean, String type) {
        String html = null;
        try {
            InputStream in = new FileInputStream(new File(htmlSrc));
            StringWriter writer = new StringWriter();
            IOUtils.copy(in, writer, StandardCharsets.UTF_8.name());
            html = writer.toString();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return forMatHtml(html, bean, type);
    }

    *//**
     * 格式化Html
     *
     * @param bean
     * @param type
     * @return
     *//*
    private static String forMatHtml(String html, RCurrentTaskInfo bean, String type) {
        try {
            if (StringUtils.isNotBlank(html)) {
                html = html.replace(Constants.BEAN_TITLE, bean.getTheCommonFormInfo().getBelongProInst().getTitle() == null ? "" : forMatOpinion(bean.getTheCommonFormInfo().getBelongProInst().getTitle()));
                html = html.replace(Constants.BEAN_EMERGENCELEVEL, bean.getTheCommonFormInfo().getEmergenceLevel() == null ? "" : bean.getTheCommonFormInfo().getEmergenceLevel());
                html = html.replace(Constants.BEAN_RELATEDDOCID, bean.getTheCommonFormInfo().getBelongProInst().getRelatedReceiveDocId() == null ? "" : bean.getTheCommonFormInfo().getBelongProInst().getRelatedReceiveDocId());

                html = html.replace(Constants.BEAN_WNGK, bean.getTheCommonFormInfo().getBelongProInst().getWngk() == null ? "" : bean.getTheCommonFormInfo().getBelongProInst().getWngk());
                html = html.replace(Constants.BEAN_XXGK, bean.getTheCommonFormInfo().getXxgk() == null ? "" : bean.getTheCommonFormInfo().getXxgk());

                //公开
                String publicityLevel[] = StringUtils.split(bean.getTheCommonFormInfo().getPublicityLevel(), "|") == null ? new String[0] : StringUtils.split(bean.getTheCommonFormInfo().getPublicityLevel(), "|");
                String publicityLevels[] = Constants.PUBLICITYLEVELTYPE;
                boolean flag;
                for (String level : publicityLevels) {
                    flag = false;
                    for (int i = 0; i < publicityLevel.length; i++) {
                        if (StringUtils.equals(level, publicityLevel[i])) {
                            flag = true;
                        }
                    }
                    String noStr = Constants.DOCNO;
                    if (flag) {
                        html = html.replace(DOL + level + DOL, Constants.DOCYES);
                    } else {
                        html = html.replace(DOL + level + DOL, noStr);
                    }
                }
                if (StringUtils.equals(Constants.DOC_TYPE_WUGUANJU, type) || StringUtils.equals(Constants.DOC_TYPE_FAWEN, type) || StringUtils.equals(Constants.DOC_TYPE_GFFAWEN, type) ||
                        StringUtils.equals(Constants.DOC_TYPE_GFBFAWEN, type) || StringUtils.equals(Constants.DOC_TYPE_DWFAWEN, type) || StringUtils.equals(Constants.DOC_TYPE_WHYJY, type)) {//发文
                    html = forMatFawen(html, bean, type);
                } else if (StringUtils.equals(Constants.DOC_TYPE_SHOUWEN, type) || StringUtils.equals(Constants.DOC_TYPE_DWSHOUWEN, type) ||
                        StringUtils.equals(Constants.DOC_TYPE_JYWJJ, type) || StringUtils.equals(Constants.DOC_TYPE_JYWJY, type) ||
                        StringUtils.equals(Constants.DOC_TYPE_JYWJB, type) || StringUtils.equals(Constants.DOC_TYPE_JYWJG, type)) {//收文
                    html = forMatSouwen(html, bean, type);
                } else if (StringUtils.equals(DOC_TYPE_JXWDWDUWEN, type) || StringUtils.equals(Constants.DOC_TYPE_JXWXIHAN, type) || StringUtils.equals(Constants.DOC_TYPE_JXWDUWEN, type) || StringUtils.equals(Constants.DOC_TYPE_JXWDWXIHAN, type)) {//信函
                    html = forMatLetter(html, bean, type);
                } else if (StringUtils.equals(Constants.DOC_TYPE_BLYJBP_RD, type) || StringUtils.equals(Constants.DOC_TYPE_BLYJBP_ZX, type)) {//办理意见报批
                    html = formatBLYJBP(html, bean, type);
                } else if (StringUtils.equals(Constants.DOC_TYPE_RDZX_RD, type) || StringUtils.equals(Constants.DOC_TYPE_RDZX_ZX, type)) {//人大政协
                    html = formatRDZX(html, bean, type);
                } else if (StringUtils.equals(Constants.DOC_TYPE_WORKAPPROVED, type) || StringUtils.equals(Constants.DOC_TYPE_OTHERAPPROVED, type)
                        || StringUtils.equals(Constants.DOC_TYPE_CONTRACTAPPROVED, type) || StringUtils.equals(Constants.DOC_TYPE_DRAFTAPPROVED, type)
                        || StringUtils.equals(Constants.DOC_TYPE_PARTYAPPROVED, type) || StringUtils.equals(Constants.DOC_TYPE_OFFICEPARTYAPPROVED, type)) {//工作报批
                    html = formatApproved(html, bean, type);
                } else if (StringUtils.equals(Constants.DOC_TYPE_YGCGZSBAOPI, type)) {
                    html = formatYGCGZSBAOPI(html, bean, type);
                } else if (StringUtils.equals(Constants.DOC_TYPE_YSCGJSHENGPI, type)) {
                    html = formatYscgjshengpi(html, bean, type);
                } else if (StringUtils.equals(DOC_TYPE_DW_REMINDER_NOTICE, type)||StringUtils.equals(Constants.DOC_TYPE_REMINDER_NOTICE, type)) {//催办通知单
                    html = formatReminderNotice(html, bean, type);
                } else if (StringUtils.equals(Constants.DOC_TYPE_JXWLEAVE, type)) {
                    html = formatJxwleave(html, bean, type);
                } else if (StringUtils.equals(Constants.DOC_TYPE_JXWPERSONNEL, type)) {
                    html = formatJxwpersonnel(html, bean, type);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return html;
    }

    private static String formatJxwleave(String html, RCurrentTaskInfo bean, String type) {
        FormJxwLeave leave = Optional.ofNullable(bean.getTheCommonFormInfo().getFormJxwLeave()).orElseGet(FormJxwLeave::new);
        html = html.replace("$task.theCommonFormInfo.formJxwLeave.approvedNum$", StringUtils.defaultIfBlank(leave.getApprovedNum(), ""));
        if ("Yes".equals(leave.getDeparture())) {
            html = html.replace("$checked_departure$", Constants.CHECKED);
        }
        html = html.replace("$task.theCommonFormInfo.formJxwLeave.leaveApplyPerson$", StringUtils.defaultIfBlank(leave.getLeaveApplyPerson(), ""));
        html = html.replace("$task.theCommonFormInfo.formJxwLeave.leaveApplyDept$", StringUtils.defaultIfBlank(leave.getLeaveApplyDept(), ""));
        if (StringUtils.isNotBlank(leave.getLeaveType())) {
            html = html.replace("$checked_leaveTypes." + leave.getLeaveType() + DOL, Constants.CHECKED);
        }
        html = html.replace("$task.theCommonFormInfo.formJxwLeave.leaveCause$", StringUtils.defaultIfBlank(leave.getLeaveCause(), ""));
        html = html.replace("$task.theCommonFormInfo.formJxwLeave.leaveStartDate$", null == leave.getLeaveStartDate() ? "" : DateTimeUtils.parseDate(leave.getLeaveStartDate(), DATE_FORMAT));
        html = html.replace("$task.theCommonFormInfo.formJxwLeave.leaveEndDate$", null == leave.getLeaveEndDate() ? "" : DateTimeUtils.parseDate(leave.getLeaveEndDate(), DATE_FORMAT));
        html = html.replace("$task.theCommonFormInfo.formJxwLeave.leaveDays$", StringUtils.defaultIfBlank(leave.getLeaveDays(), ""));
        if ("Yes".equals(leave.getDeparture())) {
            html = html.replace("$task.theCommonFormInfo.formJxwLeave.departureCause$", StringUtils.defaultIfBlank(leave.getDepartureCause(), ""));
            html = html.replace("$task.theCommonFormInfo.formJxwLeave.departureStartDate$", null == leave.getDepartureStartDate() ? "" : DateTimeUtils.parseDate(leave.getDepartureStartDate(), DATE_FORMAT));
            html = html.replace("$task.theCommonFormInfo.formJxwLeave.departureEndDate$", null == leave.getDepartureEndDate() ? "" : DateTimeUtils.parseDate(leave.getDepartureEndDate(), DATE_FORMAT));
            html = html.replace("$task.theCommonFormInfo.formJxwLeave.departureDestination$", StringUtils.defaultIfBlank(leave.getDepartureDestination(), ""));
            html = html.replace("$task.theCommonFormInfo.formJxwLeave.departureDays$", StringUtils.defaultIfBlank(leave.getDepartureDays(), ""));
        }
        html = html.replace("$task.theCommonFormInfo.formJxwLeave.personalSignature$", StringUtils.defaultIfBlank(leave.getPersonalSignature(), ""));
        html = html.replace("$task.theCommonFormInfo.formJxwLeave.leaveApplyDate$", null == leave.getLeaveApplyDate() ? "" : DateTimeUtils.parseDate(leave.getLeaveApplyDate(), DATE_FORMAT));
        html = html.replace("$task.theCommonFormInfo.formJxwLeave.terminateLeaveDesc$", StringUtils.defaultIfBlank(leave.getTerminateLeaveDesc(), ""));
        Map<String, List<WfOpinion>> map = bean.getUserOpinions();
        String[] keys = {"cld", "fgld", "zyld", "rjcsh", "dbba"};
        for (String key : keys) {
            html = html.replace("$task.userOpinions." + key + DOL, getContent(map.get(key), null));
        }
        return html;
    }

    private static String formatJxwpersonnel(String html, RCurrentTaskInfo bean, String type) {
        FormJxwPersonnel personnel = Optional.ofNullable(bean.getTheCommonFormInfo().getFormJxwPersonnel()).orElseGet(FormJxwPersonnel::new);
        html = html.replace("$task.theCommonFormInfo.formJxwPersonnel.approvedNum$", StringUtils.defaultIfBlank(personnel.getApprovedNum(), ""));
        html = html.replace("$task.theCommonFormInfo.formJxwPersonnel.temporaryHireDept$", StringUtils.defaultIfBlank(personnel.getTemporaryHireDept(), ""));
        html = html.replace("$task.theCommonFormInfo.formJxwPersonnel.vacantPostName$", StringUtils.defaultIfBlank(personnel.getVacantPostName(), ""));
        html = html.replace("$task.theCommonFormInfo.formJxwPersonnel.postResponsibilities$", StringUtils.defaultIfBlank(personnel.getPostResponsibilities(), ""));
        html = html.replace("$task.theCommonFormInfo.formJxwPersonnel.postQualification$", StringUtils.defaultIfBlank(personnel.getPostQualification(), ""));
        if (StringUtils.isNotBlank(personnel.getSecretPost())) {
            html = html.replace("$checked_secretPost." + personnel.getSecretPost() + DOL, Constants.CHECKED);
        }
        if (StringUtils.isNotBlank(personnel.getTemporaryPost())) {
            html = html.replace("$checked_temporaryPost." + personnel.getTemporaryPost() + DOL, Constants.CHECKED);
        }
        html = html.replace("$task.theCommonFormInfo.formJxwPersonnel.temporaryHireStartDate$", null != personnel.getTemporaryHireStartDate() ? DateTimeUtils.parseDate(personnel.getTemporaryHireStartDate(), DATE_FORMAT) : "");
        html = html.replace("$task.theCommonFormInfo.formJxwPersonnel.temporaryHireEndDate$", null != personnel.getTemporaryHireEndDate() ? DateTimeUtils.parseDate(personnel.getTemporaryHireEndDate(), DATE_FORMAT) : "");

        if (StringUtils.isNotBlank(personnel.getTemporaryHireType())) {
            html = html.replace("$checked_temporaryHireType." + personnel.getTemporaryHireType() + DOL, Constants.CHECKED);
        }
        if (StringUtils.isNotBlank(personnel.getEngageType())) {
            html = html.replace("$checked_engageType." + personnel.getEngageType() + DOL, Constants.CHECKED);
        }
        html = html.replace("$task.theCommonFormInfo.formJxwPersonnel.hirePersonName$", StringUtils.defaultIfBlank(personnel.getHirePersonName(), ""));
        html = html.replace("$task.theCommonFormInfo.formJxwPersonnel.hirePersonGender$", StringUtils.defaultIfBlank(personnel.getHirePersonGender(), ""));
        html = html.replace("$task.theCommonFormInfo.formJxwPersonnel.hirePersonBirth$", StringUtils.defaultIfBlank(personnel.getHirePersonBirth(), ""));
        html = html.replace("$task.theCommonFormInfo.formJxwPersonnel.hirePersonEducation$", StringUtils.defaultIfBlank(personnel.getHirePersonEducation(), ""));
        html = html.replace("$task.theCommonFormInfo.formJxwPersonnel.hirePersonProfession$", StringUtils.defaultIfBlank(personnel.getHirePersonProfession(), ""));
        html = html.replace("$task.theCommonFormInfo.formJxwPersonnel.hirePersonDeptname$", StringUtils.defaultIfBlank(personnel.getHirePersonDeptname(), ""));
        html = html.replace("$task.theCommonFormInfo.formJxwPersonnel.hirePersonPosition$", StringUtils.defaultIfBlank(personnel.getHirePersonPosition(), ""));
        if (StringUtils.isNotBlank(personnel.getRetireIdentity())) {
            html = html.replace("$checked_retireIdentity." + personnel.getRetireIdentity() + DOL, Constants.CHECKED);
        }
        if (StringUtils.isNotBlank(personnel.getDepartmentalCadre())) {
            html = html.replace("$checked_departmentalCadre." + personnel.getDepartmentalCadre() + DOL, Constants.CHECKED);
        }
        Map<String, List<WfOpinion>> map = bean.getUserOpinions();
        String[] keys = {"yrcs", "gbc", "rsjyc", "dbxb", "yrcld", "gbcld", "rsjycld", "dbxbld", "zyld"};
        for (String key : keys) {
            html = html.replace("$task.userOpinions." + key + DOL, getContent(map.get(key), null));
        }
        return html;
    }


    private static String formatYscgjshengpi(String html, RCurrentTaskInfo bean, String type) {
        html = html.replace("$task.theCommonFormInfo.docPrefix$", bean.getTheCommonFormInfo().getDocPrefix() == null ? "" : bean.getTheCommonFormInfo().getDocPrefix());
        html = html.replace("$task.theCommonFormInfo.docYear$", bean.getTheCommonFormInfo().getDocYear() == null ? "" : String.valueOf(bean.getTheCommonFormInfo().getDocYear()));
        html = html.replace("$task.theCommonFormInfo.docNumber$", bean.getTheCommonFormInfo().getDocNumber() == null ? "" : String.valueOf(bean.getTheCommonFormInfo().getDocNumber()));
        html = html.replace("$task.theCommonFormInfo.formYscgjshengpi.applicant$", bean.getTheCommonFormInfo().getFormYscgjshengpi().getApplicant() == null ? "" : bean.getTheCommonFormInfo().getFormYscgjshengpi().getApplicant());
        html = html.replace("$task.theCommonFormInfo.formYscgjshengpi.deptPost$", bean.getTheCommonFormInfo().getFormYscgjshengpi().getDeptPost() == null ? "" : bean.getTheCommonFormInfo().getFormYscgjshengpi().getDeptPost());
        html = html.replace("$task.theCommonFormInfo.formYscgjshengpi.otherReason$", bean.getTheCommonFormInfo().getFormYscgjshengpi().getOtherReason() == null ? "" : bean.getTheCommonFormInfo().getFormYscgjshengpi().getOtherReason());
        html = html.replace("$task.theCommonFormInfo.formYscgjshengpi.destination$", bean.getTheCommonFormInfo().getFormYscgjshengpi().getDestination() == null ? "" : bean.getTheCommonFormInfo().getFormYscgjshengpi().getDestination());
        html = html.replace("$task.theCommonFormInfo.formYscgjshengpi.startDate$", bean.getTheCommonFormInfo().getFormYscgjshengpi().getStartDate() == null ? "" : sdf.format(bean.getTheCommonFormInfo().getFormYscgjshengpi().getStartDate()));
        html = html.replace("$task.theCommonFormInfo.formYscgjshengpi.endDate$", bean.getTheCommonFormInfo().getFormYscgjshengpi().getEndDate() == null ? "" : sdf.format(bean.getTheCommonFormInfo().getFormYscgjshengpi().getEndDate()));
        html = html.replace("$task.theCommonFormInfo.formYscgjshengpi.overseasStayDays$", bean.getTheCommonFormInfo().getFormYscgjshengpi().getOverseasStayDays() == null ? "" : String.valueOf(bean.getTheCommonFormInfo().getFormYscgjshengpi().getOverseasStayDays()));
        html = html.replace("$task.theCommonFormInfo.formYscgjshengpi.otherCertificates$", bean.getTheCommonFormInfo().getFormYscgjshengpi().getOtherCertificates() == null ? "" : bean.getTheCommonFormInfo().getFormYscgjshengpi().getOtherCertificates());
        html = html.replace("$task.theCommonFormInfo.formYscgjshengpi.certificateNumber$", bean.getTheCommonFormInfo().getFormYscgjshengpi().getCertificateNumber() == null ? "" : bean.getTheCommonFormInfo().getFormYscgjshengpi().getCertificateNumber());
        html = html.replace("$task.theCommonFormInfo.formYscgjshengpi.receiveTime$", bean.getTheCommonFormInfo().getFormYscgjshengpi().getReceiveTime() == null ? "" : sdf.format(bean.getTheCommonFormInfo().getFormYscgjshengpi().getReceiveTime()));
        html = html.replace("$task.theCommonFormInfo.formYscgjshengpi.returnTime$", bean.getTheCommonFormInfo().getFormYscgjshengpi().getReturnTime() == null ? "" : sdf.format(bean.getTheCommonFormInfo().getFormYscgjshengpi().getReturnTime()));
        String userType = bean.getTheCommonFormInfo().getFormYscgjshengpi().getUserType();
        if (StringUtils.isNotBlank(userType)) {
            html = html.replace("fc.userType." +
                    userType, "checked");
        }
        String reason = bean.getTheCommonFormInfo().getFormYscgjshengpi().getReason();
        if (StringUtils.isNotBlank(reason)) {
            html = html.replace("fc.yscgReason." +
                            reason
                    , "checked");
        }
        String certificates = bean.getTheCommonFormInfo().getFormYscgjshengpi().getCertificates();
        if (StringUtils.isNotBlank(certificates)) {
            html = html.replace("fc.certificates." +
                            certificates
                    , "checked");
        }
        String certificateType = bean.getTheCommonFormInfo().getFormYscgjshengpi().getCertificateType();
        if (StringUtils.isNotBlank(certificateType)) {
            html = html.replace("fc.certificateType." +
                            certificateType
                    , "checked");
        }

        html = html.replace("$task.theCommonFormInfo.formYscgjshengpi.remarks$", bean.getTheCommonFormInfo().getFormYscgjshengpi().getRemarks() == null ? "" : bean.getTheCommonFormInfo().getFormYscgjshengpi().getRemarks());
        Map<String, List<WfOpinion>> map = bean.getUserOpinions();
        String[] keys = {"csyj", "gbcyj", "ldps"};
        for (String key : keys) {
            html = html.replace("$task.userOpinions." +
                    key +
                    "$", getContent(map.get(key), Constants.BANNIQINGKUANG));//这里只是在拟稿阶段展示日期和人名

        }

        return html;

    }

    private static String formatYGCGZSBAOPI(String html, RCurrentTaskInfo bean, String type) {
        html = html.replace("$task.belongingProInst.creatorName$", bean.getTheCommonFormInfo().getBelongProInst().getCreatorName() == null ? "" : bean.getTheCommonFormInfo().getBelongProInst().getCreatorName());
        html = html.replace("$task.theCommonFormInfo.formYgcgzsbaopi.memberSum$", bean.getTheCommonFormInfo().getFormYgcgzsbaopi().getMemberSum() == null ? "" : String.valueOf(bean.getTheCommonFormInfo().getFormYgcgzsbaopi().getMemberSum()));
        html = html.replace("$task.theCommonFormInfo.formYgcgzsbaopi.remark$", bean.getTheCommonFormInfo().getFormYgcgzsbaopi().getRemark() == null ? "" : bean.getTheCommonFormInfo().getFormYgcgzsbaopi().getRemark());
        html = html.replace("$task.theCommonFormInfo.formYgcgzsbaopi.useTime$", bean.getTheCommonFormInfo().getFormYgcgzsbaopi().getUseTime() == null ? "" : bean.getTheCommonFormInfo().getFormYgcgzsbaopi().getUseTime());
        html = html.replace("$task.theCommonFormInfo.formYgcgzsbaopi.sectionNumber$", bean.getTheCommonFormInfo().getFormYgcgzsbaopi().getSectionNumber() == null ? "" : bean.getTheCommonFormInfo().getFormYgcgzsbaopi().getSectionNumber());
        html = html.replace("$task.theCommonFormInfo.formYgcgzsbaopi.directorlNumber$", bean.getTheCommonFormInfo().getFormYgcgzsbaopi().getDirectorlNumber() == null ? "" : bean.getTheCommonFormInfo().getFormYgcgzsbaopi().getDirectorlNumber());
        html = html.replace("$task.theCommonFormInfo.formYgcgzsbaopi.officeNumber$", bean.getTheCommonFormInfo().getFormYgcgzsbaopi().getOfficeNumber() == null ? "" : bean.getTheCommonFormInfo().getFormYgcgzsbaopi().getOfficeNumber());
        html = html.replace("$task.theCommonFormInfo.formYgcgzsbaopi.memberSum$", bean.getTheCommonFormInfo().getFormYgcgzsbaopi().getMemberSum() == null ? "" : String.valueOf(bean.getTheCommonFormInfo().getFormYgcgzsbaopi().getMemberSum()));
        html = html.replace("$task.theCommonFormInfo.formYgcgzsbaopi.destination$", bean.getTheCommonFormInfo().getFormYgcgzsbaopi().getDestination() == null ? "" : bean.getTheCommonFormInfo().getFormYgcgzsbaopi().getDestination());
        html = html.replace("$task.theCommonFormInfo.formYgcgzsbaopi.approvalNumber$", bean.getTheCommonFormInfo().getFormYgcgzsbaopi().getApprovalNumber() == null ? "" : bean.getTheCommonFormInfo().getFormYgcgzsbaopi().getApprovalNumber());
        html = html.replace("$task.theCommonFormInfo.belongProInst.relatedReceiveDocId$", bean.getTheCommonFormInfo().getBelongProInst().getRelatedReceiveDocId() == null ? "" : bean.getTheCommonFormInfo().getBelongProInst().getRelatedReceiveDocId());
        html = html.replace("$task.theCommonFormInfo.belongProInst.title$", bean.getTheCommonFormInfo().getBelongProInst().getTitle() == null ? "" : bean.getTheCommonFormInfo().getBelongProInst().getTitle());
        html = html.replace("$task.theCommonFormInfo.docNumber$", bean.getTheCommonFormInfo().getDocNumber() == null ? "" : String.valueOf(bean.getTheCommonFormInfo().getDocNumber()));
        html = html.replace("$task.theCommonFormInfo.docYear$", bean.getTheCommonFormInfo().getDocYear() == null ? "" : String.valueOf(bean.getTheCommonFormInfo().getDocYear()));
        html = html.replace("$task.theCommonFormInfo.departName$", bean.getTheCommonFormInfo().getDepartName() == null ? "" : bean.getTheCommonFormInfo().getDepartName());
        html = html.replace("$task.theCommonFormInfo.formYgcgzsbaopi.niGaoDate$", bean.getTheCommonFormInfo().getFormYgcgzsbaopi().getNiGaoDate() == null ? "" : sdf.format(bean.getTheCommonFormInfo().getFormYgcgzsbaopi().getNiGaoDate()));

        Map<String, List<WfOpinion>> map = bean.getUserOpinions();
        String[] keys = {"csyj", "gbcyj", "wldyj"};
        for (String key : keys) {
            html = html.replace("$task.userOpinions." +
                    key +
                    "$", getContent(map.get(key), Constants.BANNIQINGKUANG));//这里只是在拟稿阶段展示日期和人名

        }

        return html;
    }

    private static String formatBLYJBP(String html, RCurrentTaskInfo bean, String type) {
        html = commonContent(html, bean, type);

        html = html.replace(Constants.BEAN_DICNAME, bean.getTheCommonFormInfo().getWfSecretConfirm().getDicTypeRef() == null ? "" : bean.getTheCommonFormInfo().getWfSecretConfirm().getDicTypeRef().getName());
        html = html.replace(Constants.NI_GAO_DATE, bean.getTheCommonFormInfo().getNiGaoDate() == null ? "" : sdf.format(bean.getTheCommonFormInfo().getNiGaoDate()));
        html = html.replace(Constants.JIN_BAN_DATE, bean.getTheCommonFormInfo().getJinBanDate() == null ? "" : sdf.format(bean.getTheCommonFormInfo().getJinBanDate()));
        html = html.replace(Constants.JIN_BAN_NAME, bean.getTheCommonFormInfo().getJinBanName() == null ? "" : bean.getTheCommonFormInfo().getJinBanName());
        html = html.replace(Constants.BEAN_RELATEDDOCID, bean.getTheCommonFormInfo().getBelongProInst().getRelatedReceiveDocId() == null ? "" : bean.getTheCommonFormInfo().getBelongProInst().getRelatedReceiveDocId());
        html = html.replace(ShouWenConstans.BEAN_DOCDEPART, bean.getTheCommonFormInfo().getBelongProInst().getIncomingDocDepart() == null ? "" : bean.getTheCommonFormInfo().getBelongProInst().getIncomingDocDepart());
        html = html.replace(ShouWenConstans.BEAN_DOCFULLNAME, bean.getTheCommonFormInfo().getBelongProInst().getDocFullName() == null ? "" : bean.getTheCommonFormInfo().getBelongProInst().getDocFullName());
        html = html.replace("$task.theCommonFormInfo.bulletinRemark$", bean.getTheCommonFormInfo().getBulletinRemark() == null ? "" : bean.getTheCommonFormInfo().getBulletinRemark());
        html = html.replace("$task.theCommonFormInfo.otherReason$", bean.getTheCommonFormInfo().getOtherReason() == null ? "" : bean.getTheCommonFormInfo().getOtherReason());
        Map<String, List<WfOpinion>> map = bean.getUserOpinions();
        String[] keys = {"chushi", "bangongshi", "weilingdao"};
        for (String key : keys) {
            html = html.replace("$task.userOpinions." +
                    key +
                    "$", getContent(map.get(key), Constants.BANNIQINGKUANG));//这里只是在拟稿阶段展示日期和人名

        }

        return html;
    }

    *//**
     * 格式化ShouWen
     *
     * @param bean
     * @param type
     * @return
     *//*
    private static String forMatSouwen(String html, RCurrentTaskInfo bean, String type) {
        html = commonContent(html, bean, type);
        if (StringUtils.equals(Constants.DOC_TYPE_DWSHOUWEN, type)) {
            FormJxwdwshouwen showWen = bean.getTheCommonFormInfo().getFormJxwdwshouwen();
            html = html.replace(Constants.TOPTITLE, ShouWenConstans.ShouWenEnum.JXWDWSHOUWEN.getValue());
            html = html.replace(ShouWenConstans.BEAN_NIBAN, showWen.getNiBan() == null ? "" : showWen.getNiBan());
            html = html.replace(ShouWenConstans.BEAN_NIGAODATE, showWen.getNiGaoData() == null ? "" : sdf.format(showWen.getNiGaoData()));
            html = html.replace(ShouWenConstans.BEAN_SHENHE, showWen.getShenHe() == null ? "" : showWen.getShenHe());
            html = html.replace(ShouWenConstans.BEAN_SHENHEDATE, showWen.getShenHeDate() == null ? "" : sdf.format(showWen.getShenHeDate()));
            html = html.replace(ShouWenConstans.BEAN_RECEIVEDATE, showWen.getReceiveDate() == null ? "" : sdf.format(showWen.getReceiveDate()));
        } else if (StringUtils.equals(Constants.DOC_TYPE_SHOUWEN, type)) {
            FormJxwshouwen showWen = bean.getTheCommonFormInfo().getFormJxwshouwen();
            html = html.replace(Constants.TOPTITLE, ShouWenConstans.ShouWenEnum.JXWSHOUWEN.getValue());
            html = html.replace(ShouWenConstans.BEAN_NIBAN, showWen.getNiBan() == null ? "" : showWen.getNiBan());
            html = html.replace(ShouWenConstans.BEAN_NIGAODATE, showWen.getNiGaoData() == null ? "" : sdf.format(showWen.getNiGaoData()));
            html = html.replace(ShouWenConstans.BEAN_SHENHE, showWen.getShenHe() == null ? "" : showWen.getShenHe());
            html = html.replace(ShouWenConstans.BEAN_SHENHEDATE, showWen.getShenHeDate() == null ? "" : sdf.format(showWen.getShenHeDate()));
            html = html.replace(ShouWenConstans.BEAN_RECEIVEDATE, showWen.getReceiveDate() == null ? "" : sdf.format(showWen.getReceiveDate()));
        } else if (StringUtils.equals(Constants.DOC_TYPE_JYWJJ, type) || StringUtils.equals(Constants.DOC_TYPE_JYWJY, type)
                || StringUtils.equals(Constants.DOC_TYPE_JYWJB, type) || StringUtils.equals(Constants.DOC_TYPE_JYWJG, type)) {
            html = html.replace(ShouWenConstans.BEAN_INCOMINGZIHAO, bean.getTheCommonFormInfo().getBelongProInst().getIncomingDocNum() == null ? "" : bean.getTheCommonFormInfo().getBelongProInst().getIncomingDocNum());
            if (StringUtils.equals(Constants.DOC_TYPE_JYWJJ, type)) {
                html = html.replace(ShouWenConstans.BEAN_RECEIVEDATE, bean.getTheCommonFormInfo().getFormJywjj().getReceiveDate() == null ? "" : sdf.format(bean.getTheCommonFormInfo().getFormJywjj().getReceiveDate()));
                html = html.replace(ShouWenConstans.BEAN_REGISTERUSER, bean.getTheCommonFormInfo().getFormJywjj().getRegisterUser() == null ? "" : bean.getTheCommonFormInfo().getFormJywjj().getRegisterUser());
                html = html.replace(ShouWenConstans.BEAN_REGISTERDATE, bean.getTheCommonFormInfo().getFormJywjj().getRegisterDate() == null ? "" : sdf.format(bean.getTheCommonFormInfo().getFormJywjj().getRegisterDate()));
            } else if (StringUtils.equals(Constants.DOC_TYPE_JYWJY, type)) {
                html = html.replace(ShouWenConstans.BEAN_RECEIVEDATE, bean.getTheCommonFormInfo().getFormJywjy().getReceiveDate() == null ? "" : sdf.format(bean.getTheCommonFormInfo().getFormJywjy().getReceiveDate()));
                html = html.replace(ShouWenConstans.BEAN_REGISTERUSER, bean.getTheCommonFormInfo().getFormJywjy().getRegisterUser() == null ? "" : bean.getTheCommonFormInfo().getFormJywjy().getRegisterUser());
                html = html.replace(ShouWenConstans.BEAN_REGISTERDATE, bean.getTheCommonFormInfo().getFormJywjy().getRegisterDate() == null ? "" : sdf.format(bean.getTheCommonFormInfo().getFormJywjy().getRegisterDate()));
            } else if (StringUtils.equals(Constants.DOC_TYPE_JYWJB, type)) {
                html = html.replace(ShouWenConstans.BEAN_RECEIVEDATE, bean.getTheCommonFormInfo().getFormJywjb().getReceiveDate() == null ? "" : sdf.format(bean.getTheCommonFormInfo().getFormJywjb().getReceiveDate()));
                html = html.replace(ShouWenConstans.BEAN_REGISTERUSER, bean.getTheCommonFormInfo().getFormJywjb().getRegisterUser() == null ? "" : bean.getTheCommonFormInfo().getFormJywjb().getRegisterUser());
                html = html.replace(ShouWenConstans.BEAN_REGISTERDATE, bean.getTheCommonFormInfo().getFormJywjb().getRegisterDate() == null ? "" : sdf.format(bean.getTheCommonFormInfo().getFormJywjb().getRegisterDate()));
            } else if (StringUtils.equals(Constants.DOC_TYPE_JYWJG, type)) {
                html = html.replace(ShouWenConstans.BEAN_RECEIVEDATE, bean.getTheCommonFormInfo().getFormJywjg().getReceiveDate() == null ? "" : sdf.format(bean.getTheCommonFormInfo().getFormJywjg().getReceiveDate()));
                html = html.replace(ShouWenConstans.BEAN_REGISTERUSER, bean.getTheCommonFormInfo().getFormJywjg().getRegisterUser() == null ? "" : bean.getTheCommonFormInfo().getFormJywjg().getRegisterUser());
                html = html.replace(ShouWenConstans.BEAN_REGISTERDATE, bean.getTheCommonFormInfo().getFormJywjg().getRegisterDate() == null ? "" : sdf.format(bean.getTheCommonFormInfo().getFormJywjg().getRegisterDate()));
            }


        }


        return html;
    }

    *//**
     * 格式化XINHAN
     *
     * @param bean
     * @param type
     * @return
     *//*
    private static String forMatLetter(String html, RCurrentTaskInfo bean, String type) {
        html = commonContent(html, bean, type);
        if (StringUtils.equals(Constants.DOC_TYPE_JXWXIHAN, type)) {
            html = html.replace(LetterConstants.BEAN_RECEIVEDATE, bean.getTheCommonFormInfo().getFormJxwxinhan().getReceiveDate() == null ? "" : sdf.format(bean.getTheCommonFormInfo().getFormJxwxinhan().getReceiveDate()));
            html = html.replace(LetterConstants.BEAN_DOCTYPE, bean.getTheCommonFormInfo().getFormJxwxinhan().getDocType() == null ? "" : bean.getTheCommonFormInfo().getFormJxwxinhan().getDocType());
            html = html.replace(LetterConstants.BEAN_DOCABSTRACT, bean.getTheCommonFormInfo().getFormJxwxinhan().getDocAbstract() == null ? "" : forMatOpinion(bean.getTheCommonFormInfo().getFormJxwxinhan().getDocAbstract()));
            html = html.replace(LetterConstants.BEAN_RECEIVEUSER, bean.getTheCommonFormInfo().getFormJxwxinhan().getReceiveUser() == null ? "" : bean.getTheCommonFormInfo().getFormJxwxinhan().getReceiveUser());
            html = html.replace(LetterConstants.BEAN_AUDITUSER, bean.getTheCommonFormInfo().getFormJxwxinhan().getAuditUser() == null ? "" : bean.getTheCommonFormInfo().getFormJxwxinhan().getAuditUser());
            html = html.replace(LetterConstants.BEAN_SHOUJIANDATE, bean.getTheCommonFormInfo().getFormJxwxinhan().getShoujianDate() == null ? "" : sdf.format(bean.getTheCommonFormInfo().getFormJxwxinhan().getShoujianDate()));

        } else if (StringUtils.equals(Constants.DOC_TYPE_JXWDUWEN, type) || StringUtils.equals(DOC_TYPE_JXWDWDUWEN, type)) {
            if (BigDecimal.ONE.compareTo(bean.getTheCommonFormInfo().getBelongProInst().getDuwenHandleAgainNum()) != 0) {
                html = html.replace(Constants.IS_SECOND_DUWEN, Constants.DUWEN_DISPLAY_BLOCK);
                html = html.replace(Constants.SECOND_DUWEN, bean.getTheCommonFormInfo().getBelongProInst().getDuwenHandleAgainNum() == null ? "" : bean.getTheCommonFormInfo().getBelongProInst().getDuwenHandleAgainNum().toString());
            } else {
                html = html.replace(Constants.IS_SECOND_DUWEN, Constants.DUWEN_DISPLAY_NONE);
            }

            html = html.replace(LetterConstants.BEAN_RECEIVEDOCTIME, bean.getTheCommonFormInfo().getBelongProInst().getReceiveDocTime() == null ? "" : sdf.format(bean.getTheCommonFormInfo().getBelongProInst().getReceiveDocTime()));
            html = html.replace(LetterConstants.BEAN_CHENBANDEPART, bean.getTheCommonFormInfo().getBelongProInst().getChenBanDepart() == null ? "" : bean.getTheCommonFormInfo().getBelongProInst().getChenBanDepart());
            html = html.replace(LetterConstants.BEAN_XIANBANTIME, bean.getTheCommonFormInfo().getBelongProInst().getXianBanTime() == null ? "" : sdf.format(bean.getTheCommonFormInfo().getBelongProInst().getXianBanTime()));
            html = html.replace(LetterConstants.BEAN_CITYAPPROAL, bean.getTheCommonFormInfo().getCityApproval() == null ? "" : forMatOpinion(bean.getTheCommonFormInfo().getCityApproval()));
            html = html.replace(LetterConstants.BEAN_DENGLUPERSON, bean.getTheCommonFormInfo().getBelongProInst().getDenluPerson() == null ? "" : bean.getTheCommonFormInfo().getBelongProInst().getDenluPerson());
            html = html.replace(LetterConstants.BEAN_DENGLUTIME, bean.getTheCommonFormInfo().getBelongProInst().getDenluTime() == null ? "" : sdf.format(bean.getTheCommonFormInfo().getBelongProInst().getDenluTime()));
            html = html.replace(LetterConstants.BEAN_DUBANPERSON, bean.getTheCommonFormInfo().getBelongProInst().getDubanPerson() == null ? "" : bean.getTheCommonFormInfo().getBelongProInst().getDubanPerson());
            html = html.replace(LetterConstants.BEAN_DUBANTIME, bean.getTheCommonFormInfo().getBelongProInst().getDubanTime() == null ? "" : sdf.format(bean.getTheCommonFormInfo().getBelongProInst().getDubanTime()));
            html = html.replace(LetterConstants.BEAN_SHENHEPERSON, bean.getTheCommonFormInfo().getBelongProInst().getShenhePerson() == null ? "" : bean.getTheCommonFormInfo().getBelongProInst().getShenhePerson());
            html = html.replace(LetterConstants.BEAN_SHENHETIME, bean.getTheCommonFormInfo().getBelongProInst().getShenheTime() == null ? "" : sdf.format(bean.getTheCommonFormInfo().getBelongProInst().getShenheTime()));
            if (StringUtils.equals(Boolean.TRUE.toString(), bean.getTheCommonFormInfo().getBelongProInst().getPointSupervise())) {
                html = html.replace(LetterConstants.BEAN_POINTSUPERVISE, Constants.CHECKED);
            }
        } else if (StringUtils.equals(Constants.DOC_TYPE_JXWDWXIHAN, type)) {
            html = html.replace(LetterConstants.BEAN_RECEIVEDATE, bean.getTheCommonFormInfo().getFormJxwdwxinhan().getReceiveDate() == null ? "" : sdf.format(bean.getTheCommonFormInfo().getFormJxwdwxinhan().getReceiveDate()));
            html = html.replace(LetterConstants.BEAN_DOCTYPE, bean.getTheCommonFormInfo().getFormJxwdwxinhan().getDocType() == null ? "" : bean.getTheCommonFormInfo().getFormJxwdwxinhan().getDocType());
            html = html.replace(LetterConstants.BEAN_DOCABSTRACT, bean.getTheCommonFormInfo().getFormJxwdwxinhan().getDocAbstract() == null ? "" : forMatOpinion(bean.getTheCommonFormInfo().getFormJxwdwxinhan().getDocAbstract()));
            html = html.replace(LetterConstants.BEAN_RECEIVEUSER, bean.getTheCommonFormInfo().getFormJxwdwxinhan().getReceiveUser() == null ? "" : forMatOpinion(bean.getTheCommonFormInfo().getFormJxwdwxinhan().getReceiveUser()));
            html = html.replace(LetterConstants.BEAN_AUDITUSER, bean.getTheCommonFormInfo().getFormJxwdwxinhan().getAuditUser() == null ? "" : bean.getTheCommonFormInfo().getFormJxwdwxinhan().getAuditUser());
            html = html.replace(LetterConstants.BEAN_SHOUJIANDATE, bean.getTheCommonFormInfo().getFormJxwdwxinhan().getShoujianDate() == null ? "" : sdf.format(bean.getTheCommonFormInfo().getFormJxwdwxinhan().getShoujianDate()));
        }
        return html;
    }

    *//**
     * 格式化FAWEN
     *
     * @param bean
     * @param type
     * @return
     *//*
    private static String forMatFawen(String html, RCurrentTaskInfo bean, String type) {

        html = html.replace(Constants.BEAN_DOCTYPE, bean.getTheCommonFormInfo().getDocType() == null ? "" : bean.getTheCommonFormInfo().getDocType());
        html = html.replace(Constants.BEAN_DICNAME, bean.getTheCommonFormInfo().getWfSecretConfirm().getDicTypeRef() == null ? "" : bean.getTheCommonFormInfo().getWfSecretConfirm().getDicTypeRef().getName());
        html = html.replace(Constants.BEAN_DOCPREFIX, bean.getTheCommonFormInfo().getDocPrefix() == null ? "" : bean.getTheCommonFormInfo().getDocPrefix());
        if (StringUtils.equals(Constants.DOCPREFIX, bean.getTheCommonFormInfo().getDocPrefix())) {
            html = html.replace(Constants.WIDTH_NO1, Constants.WIDTH_NUM1);
            html = html.replace(Constants.WIDTH_NO2, Constants.WIDTH_NUM2);
        } else {
            html = html.replace(Constants.WIDTH_NO1, Constants.WIDTH_NUM3);
            html = html.replace(Constants.WIDTH_NO2, Constants.WIDTH_NUM3);
        }
        html = html.replace(Constants.BEAN_DEPARTNAME, bean.getTheCommonFormInfo().getDepartName() == null ? "" : bean.getTheCommonFormInfo().getDepartName());
        html = html.replace(Constants.BEAN_DOCYEAR, bean.getTheCommonFormInfo().getDocYear() == null ? "" : String.valueOf(bean.getTheCommonFormInfo().getDocYear()));
        html = html.replace(Constants.BEAN_DOCNUMBER, bean.getTheCommonFormInfo().getDocNumber() == null ? "" : String.valueOf(bean.getTheCommonFormInfo().getDocNumber()));
        html = html.replace(Constants.BEAN_CREATORNAME, bean.getTheCommonFormInfo().getBelongProInst().getCreatorName() == null ? "" : bean.getTheCommonFormInfo().getBelongProInst().getCreatorName());
        html = html.replace(Constants.BEAN_OTHERREASON, bean.getTheCommonFormInfo().getOtherReason() == null ? "" : forMatOpinion(bean.getTheCommonFormInfo().getOtherReason()));
        Map<String, List<WfOpinion>> map = bean.getUserOpinions();
        List<WfOpinion> heGaos = map.get(Constants.HEGAO);
        html = html.replace(Constants.BEAN_HEGAOOPINION, getContent(heGaos, null));
        Map<String, List<WfOpinion>> huMap = bean.getUserOpinions();
        List<WfOpinion> huiGaos = huMap.get(Constants.HUIGAO);
        html = html.replace(Constants.BEAN_HUIGAOOPINION, getContent(huiGaos, null));
        html = html.replace(Constants.BEAN_OTHERREASON, bean.getTheCommonFormInfo().getOtherReason() == null ? "" : bean.getTheCommonFormInfo().getOtherReason());
        html = html.replace(Constants.BEAN_NUMBEROFCOPY, bean.getTheCommonFormInfo().getBelongProInst().getIncomingNum() == null ? "" : String.valueOf(bean.getTheCommonFormInfo().getBelongProInst().getIncomingNum()));
        List<WfOpinion> shenHe = map.get(Constants.SHENHE);
        html = html.replace(Constants.BEAN_SHENHEOPINION, getContent(shenHe, null));
        List<WfOpinion> qianFa = map.get(Constants.QIANFA);
        html = html.replace(Constants.BEAN_QIANFAOPINION, getContent(qianFa, Constants.QIANFA));
        String notOpenReason[] = StringUtils.split(bean.getTheCommonFormInfo().getNotOpenReason(), "|") == null ? new String[0] : StringUtils.split(bean.getTheCommonFormInfo().getNotOpenReason(), "|");
        String notOpenReasons[] = Constants.ALLTYPE;
        for (String reason : notOpenReasons) {
            boolean flag = false;
            for (int i = 0; i < notOpenReason.length; i++) {
                if (StringUtils.equals(reason, notOpenReason[i])) {
                    flag = true;
                }
            }
            if (flag) {
                html = html.replace("$checked_" + reason + DOL, Constants.CHECKED);
            } else {
                html = html.replace("$checked_" + reason + DOL, "");
            }
        }
        if (StringUtils.equals(Constants.DOC_TYPE_DWFAWEN, type)) {
            html = forMatDwFawen(html, bean);
        }
        Calendar cl = Calendar.getInstance();
        Date date = null;
        if (StringUtils.equals(Constants.DOC_TYPE_FAWEN, type)) {
            html = html.replace(Constants.BEAN_SENDTOMAIN, bean.getTheCommonFormInfo().getFormFawen().getSendToMain() == null ? "" : bean.getTheCommonFormInfo().getFormFawen().getSendToMain());
            html = html.replace(Constants.BEAN_SENDTOCC, bean.getTheCommonFormInfo().getFormFawen().getSendToCc() == null ? "" : bean.getTheCommonFormInfo().getFormFawen().getSendToCc());
            html = html.replace(Constants.BEAN_HUIQIAN, bean.getTheCommonFormInfo().getFormFawen().getHuiQian() == null ? "" : bean.getTheCommonFormInfo().getFormFawen().getHuiQian());
            date = bean.getTheCommonFormInfo().getFormFawen().getNiGaoDate() == null ? new Date() : bean.getTheCommonFormInfo().getFormFawen().getNiGaoDate();
        } else if (StringUtils.equals(Constants.DOC_TYPE_GFFAWEN, type)) {
            html = html.replace(Constants.BEAN_SENDTOMAIN, bean.getTheCommonFormInfo().getFormHjxgffawen().getSendToMain() == null ? "" : bean.getTheCommonFormInfo().getFormHjxgffawen().getSendToMain());
            html = html.replace(Constants.BEAN_SENDTOCC, bean.getTheCommonFormInfo().getFormHjxgffawen().getSendToCc() == null ? "" : bean.getTheCommonFormInfo().getFormHjxgffawen().getSendToCc());
            html = html.replace(Constants.BEAN_HUIQIAN, bean.getTheCommonFormInfo().getFormHjxgffawen().getHuiQian() == null ? "" : bean.getTheCommonFormInfo().getFormHjxgffawen().getHuiQian());
            date = bean.getTheCommonFormInfo().getFormHjxgffawen().getNiGaoDate() == null ? new Date() : bean.getTheCommonFormInfo().getFormHjxgffawen().getNiGaoDate();
        } else if (StringUtils.equals(Constants.DOC_TYPE_GFBFAWEN, type)) {
            html = html.replace(Constants.BEAN_SENDTOMAIN, bean.getTheCommonFormInfo().getFormGfkgbfawen().getSendToMain() == null ? "" : bean.getTheCommonFormInfo().getFormGfkgbfawen().getSendToMain());
            html = html.replace(Constants.BEAN_SENDTOCC, bean.getTheCommonFormInfo().getFormGfkgbfawen().getSendToCc() == null ? "" : bean.getTheCommonFormInfo().getFormGfkgbfawen().getSendToCc());
            html = html.replace(Constants.BEAN_HUIQIAN, bean.getTheCommonFormInfo().getFormGfkgbfawen().getHuiQian() == null ? "" : bean.getTheCommonFormInfo().getFormGfkgbfawen().getHuiQian());
            date = bean.getTheCommonFormInfo().getFormGfkgbfawen().getNiGaoDate() == null ? new Date() : bean.getTheCommonFormInfo().getFormGfkgbfawen().getNiGaoDate();
        } else if (StringUtils.equals(Constants.DOC_TYPE_DWFAWEN, type)) {
            html = html.replace(Constants.BEAN_SENDTOMAIN, bean.getTheCommonFormInfo().getFormJxwdwfawen().getSendToMain() == null ? "" : bean.getTheCommonFormInfo().getFormJxwdwfawen().getSendToMain());
            html = html.replace(Constants.BEAN_SENDTOCC, bean.getTheCommonFormInfo().getFormJxwdwfawen().getSendToCc() == null ? "" : bean.getTheCommonFormInfo().getFormJxwdwfawen().getSendToCc());
            html = html.replace(Constants.BEAN_HUIQIAN, bean.getTheCommonFormInfo().getFormJxwdwfawen().getHuiQian() == null ? "" : bean.getTheCommonFormInfo().getFormJxwdwfawen().getHuiQian());
            date = bean.getTheCommonFormInfo().getFormJxwdwfawen().getNiGaoDate() == null ? new Date() : bean.getTheCommonFormInfo().getFormJxwdwfawen().getNiGaoDate();
        } else if (StringUtils.equals(Constants.DOC_TYPE_WUGUANJU, type)) {
            html = html.replace(Constants.BEAN_SENDTOMAIN, bean.getTheCommonFormInfo().getFormWuguanju().getSendToMain() == null ? "" : bean.getTheCommonFormInfo().getFormWuguanju().getSendToMain());
            html = html.replace(Constants.BEAN_SENDTOCC, bean.getTheCommonFormInfo().getFormWuguanju().getSendToCc() == null ? "" : bean.getTheCommonFormInfo().getFormWuguanju().getSendToCc());
            html = html.replace(Constants.BEAN_HUIQIAN, bean.getTheCommonFormInfo().getFormWuguanju().getHuiQian() == null ? "" : bean.getTheCommonFormInfo().getFormWuguanju().getHuiQian());
            date = bean.getTheCommonFormInfo().getFormWuguanju().getNiGaoDate() == null ? new Date() : bean.getTheCommonFormInfo().getFormWuguanju().getNiGaoDate();
        } else if (StringUtils.equals(Constants.DOC_TYPE_WHYJY, type)) {
            html = html.replace(Constants.BEAN_SENDTOMAIN, bean.getTheCommonFormInfo().getFormJxwdwhyjy().getSendToMain() == null ? "" : bean.getTheCommonFormInfo().getFormJxwdwhyjy().getSendToMain());
            html = html.replace(Constants.BEAN_SENDTOCC, bean.getTheCommonFormInfo().getFormJxwdwhyjy().getSendToCc() == null ? "" : bean.getTheCommonFormInfo().getFormJxwdwhyjy().getSendToCc());
            html = html.replace(Constants.BEAN_HUIQIAN, bean.getTheCommonFormInfo().getFormJxwdwhyjy().getHuiQian() == null ? "" : bean.getTheCommonFormInfo().getFormJxwdwhyjy().getHuiQian());
            date = bean.getTheCommonFormInfo().getFormJxwdwhyjy().getNiGaoDate() == null ? new Date() : bean.getTheCommonFormInfo().getFormJxwdwhyjy().getNiGaoDate();
        }
        cl.setTime(date);
        html = html.replace(Constants.BEAN_NIGAOY, String.valueOf(cl.get(Calendar.YEAR)));
        html = html.replace(Constants.BEAN_NIGAOM, String.valueOf(cl.get(cl.MONTH) + 1));
        html = html.replace(Constants.BEAN_NIGAOD, String.valueOf(cl.get(cl.DATE)));
        return html;
    }


    *//**
     * 格式化DWFAWEN
     *
     * @param bean
     * @return
     *//*
    private static String forMatDwFawen(String html, RCurrentTaskInfo bean) {

        html = html.replace(Constants.BEAN_JIAODUIUSER, "");
        html = html.replace(Constants.BEAN_ZHUSONGNUM, "");
        html = html.replace(Constants.BEAN_CHAOSONGNUM, "");
        html = html.replace(Constants.BEAN_ZHINENGNUM, "");
        html = html.replace(Constants.BEAN_GUIDANGNUM, "");
        html = html.replace(Constants.BEAN_OTHERNUM, "");

        return html;
    }

    *//**
     * 获取签名
     *
     * @param html
     * @param bean
     * @param type
     * @return
     *//*
    public static String commonContent(String html, RCurrentTaskInfo bean, String type) {
        html = html.replace(ShouWenConstans.BEAN_RELATEDUWENDOCID, bean.getTheCommonFormInfo().getBelongProInst().getRelateDuWenDocId() == null ? "" : bean.getTheCommonFormInfo().getBelongProInst().getRelateDuWenDocId());
        html = html.replace(ShouWenConstans.BEAN_SECRETLEVEL, bean.getTheCommonFormInfo().getSecretLevel() == null ? "" : bean.getTheCommonFormInfo().getSecretLevel());
        html = html.replace(ShouWenConstans.BEAN_DOCDEPART, bean.getTheCommonFormInfo().getBelongProInst().getIncomingDocDepart() == null ? "" : bean.getTheCommonFormInfo().getBelongProInst().getIncomingDocDepart());
        html = html.replace(ShouWenConstans.BEAN_DOCNUM, bean.getTheCommonFormInfo().getBelongProInst().getIncomingDocNum() == null ? "" : bean.getTheCommonFormInfo().getBelongProInst().getIncomingDocNum());
        html = html.replace(ShouWenConstans.BEAN_INCOMINGNUM, bean.getTheCommonFormInfo().getBelongProInst().getIncomingNum() == null ? "" : String.valueOf(bean.getTheCommonFormInfo().getBelongProInst().getIncomingNum()));
        html = html.replace(ShouWenConstans.BEAN_DOCFULLNAME, bean.getTheCommonFormInfo().getBelongProInst().getDocFullName() == null ? "" : bean.getTheCommonFormInfo().getBelongProInst().getDocFullName());

        Map<String, List<WfOpinion>> map = bean.getUserOpinions();
        List<WfOpinion> piShi = map.get(Constants.PISHI);
        html = html.replace(ShouWenConstans.BEAN_PISHIOPINION, getContent(piShi, Constants.PISHI));
        List<WfOpinion> niBan = map.get(Constants.NIBAN);
        html = html.replace(ShouWenConstans.BEAN_NIBANOPINION, getContent(niBan, Constants.NIBAN));
        List<WfOpinion> yueShi = map.get(Constants.YUESHI);
        html = html.replace(ShouWenConstans.BEAN_YUESHIOPINION, getContent(yueShi, Constants.YUESHI));
        List<WfOpinion> banLi = map.get(Constants.BANLI);
        html = html.replace(ShouWenConstans.BEAN_BANLIOPINION, getContent(banLi, Constants.BANLI));
        List<WfOpinion> liuZhuan = map.get(Constants.LIUZHUAN);
        html = html.replace(LetterConstants.BEAN_LIUZHUANOPINION, getContent(liuZhuan, Constants.LIUZHUAN));
        List<WfOpinion> sldps = map.get(Constants.DUWENSLDPS);
        if ("jxwdwduwen".equals(bean.getTheCommonFormInfo().getFormDetailType())||"jxwduwen".equals(bean.getTheCommonFormInfo().getFormDetailType())) {
            List<WfOpinion> sldps2 = new ArrayList<>();
            List<WfOpinion> sldps1 = new ArrayList<>();
            if (null != sldps) {
                for (WfOpinion sldp : sldps) {
                    if (sldp.getStepId() != null && sldp.getStepId().compareTo(new BigDecimal(1)) == 1) {
                        sldps2.add(sldp);
                    } else {
                        sldps1.add(sldp);
                    }
                }

            }

            html = html.replace(LetterConstants.BEAN_CITYAPPROAL2, getContent(sldps2, Constants.DUWENSLDPS));

            html = html.replace(LetterConstants.BEAN_CITYAPPROAL, getContent(sldps1, Constants.DUWENSLDPS));
        } else {
            html = html.replace(LetterConstants.BEAN_CITYAPPROAL, getContent(sldps, Constants.DUWENSLDPS));
        }

        List<WfOpinion> wldps = map.get(Constants.WLDPS);
        html = html.replace(LetterConstants.BEAN_WLDPSOPINION, getContent(wldps, Constants.WLDPS));
        List<WfOpinion> dbyj = map.get(Constants.DBYJ);
        html = html.replace(LetterConstants.BEAN_DBYJOPINION, getContent(dbyj, null));
        List<WfOpinion> csyj = map.get(Constants.CSYJ);
        html = html.replace(LetterConstants.BEAN_CSYJOPINION, getContent(csyj, Constants.CSYJ));
        List<WfOpinion> blqk = map.get(Constants.BLYJ);
        html = html.replace(LetterConstants.BEAN_BLQKOPINION, getContent(blqk, null));

        List<WfOpinion> lingdaopishi = map.get(Constants.LINGDAOPISHI);
        html = html.replace(LetterConstants.BEAN_LINGDAOPISHI, getContent(lingdaopishi, Constants.LINGDAOPISHI));
        List<WfOpinion> banniqingkuang = map.get(Constants.BANNIQINGKUANG);
        html = html.replace(LetterConstants.BEAN_BANNIQINGKUANG, getContent(banniqingkuang, Constants.BANNIQINGKUANG));

        List<WfOpinion> bgsyj = map.get(WorkApprovedConstants.BGSYJ);
        html = html.replace(WorkApprovedConstants.OPINION_BGSYJ, getContent(bgsyj, null));
        List<WfOpinion> wldyj = map.get(WorkApprovedConstants.WLDYJ);
        html = html.replace(WorkApprovedConstants.OPINION_WLDYJ, getContent(wldyj, WorkApprovedConstants.WLDYJ));

        List<WfOpinion> czyj = map.get(WorkApprovedConstants.CZYJ);
        html = html.replace(WorkApprovedConstants.OPINION_CZYJ, getContent(czyj, null));
        List<WfOpinion> bnyj = map.get(WorkApprovedConstants.BNYJ);
        html = html.replace(WorkApprovedConstants.OPINION_BNYJ, getContent(bnyj, null));
        List<WfOpinion> bjyj = map.get(WorkApprovedConstants.BJYJ);
        html = html.replace(WorkApprovedConstants.OPINION_BJYJ, getContent(bjyj, null));
        List<WfOpinion> spyj = map.get(WorkApprovedConstants.SPYJ);
        html = html.replace(WorkApprovedConstants.OPINION_SPYJ, getContent(spyj, null));
        List<WfOpinion> yjsyj = map.get(WorkApprovedConstants.YJSYJ);
        html = html.replace(WorkApprovedConstants.OPINION_YJSYJ, getContent(yjsyj, null));
        return html;
    }

    *//**
     * 获取人大政协
     *
     * @param html
     * @param bean
     * @param type
     * @return
     *//*
    public static String formatRDZX(String html, RCurrentTaskInfo bean, String type) throws IntrospectionException, InvocationTargetException, IllegalAccessException {
        html = commonContent(html, bean, type);
        String formDetai = "form" + SystemUtils.toUpperCase4Index(bean.getTheCommonFormInfo().getFormDetailType());
        PropertyDescriptor pd = new PropertyDescriptor(formDetai, RFormCommon.class);
        Object invoke = pd.getReadMethod().invoke(bean.getTheCommonFormInfo());
        *//*获取个性表单所有的属性和属性的值*//*
        Map<String, Object> keyAndValue = SystemUtils.getKeyAndValue(invoke);
        for (Object key : keyAndValue.keySet()) {
            html = html.replace("$task.theCommonFormInfo." + formDetai + "." + key + "$", keyAndValue.get(key) == null ? "" : forMatOpinion(keyAndValue.get(key).toString()));
            //System.out.println("Key = " + ("$task.theCommonFormInfo."+formDetai+"."+key+"$")+"==="+keyAndValue.get(key));
        }

        return html;
    }

    *//**
     * 获取催办通知单
     *
     * @param html
     * @param bean
     * @param type
     * @return
     *//*
    public static String formatReminderNotice(String html, RCurrentTaskInfo bean, String type) throws IntrospectionException, InvocationTargetException, IllegalAccessException {
        html = commonContent(html, bean, type);
        html = html.replace("$task.theCommonFormInfo.belongProInst.chenBanDepart$", bean.getTheCommonFormInfo().getBelongProInst().getChenBanDepart() == null ? "" : bean.getTheCommonFormInfo().getBelongProInst().getChenBanDepart());
        html = html.replace("$task.theCommonFormInfo.belongProInst.incomingDocDepart$", bean.getTheCommonFormInfo().getBelongProInst().getIncomingDocDepart() == null ? "" : bean.getTheCommonFormInfo().getBelongProInst().getIncomingDocDepart());

        html = html.replace("$task.theCommonFormInfo.belongProInst.authorshipService$", bean.getTheCommonFormInfo().getBelongProInst().getAuthorshipService() == null ? "" : bean.getTheCommonFormInfo().getBelongProInst().getAuthorshipService());
        html = html.replace("$task.theCommonFormInfo.belongProInst.cityApproval$", bean.getTheCommonFormInfo().getBelongProInst().getCityApproval() == null ? "" : bean.getTheCommonFormInfo().getBelongProInst().getCityApproval());


        html = html.replace("$task.theCommonFormInfo.belongProInst.xianBanTime$", bean.getTheCommonFormInfo().getBelongProInst().getXianBanTime() == null ? "" : sdf.format(bean.getTheCommonFormInfo().getBelongProInst().getXianBanTime()));

        html = html.replace("$task.theCommonFormInfo.belongProInst.denluTime$", bean.getTheCommonFormInfo().getBelongProInst().getDenluTime() == null ? "" : sdf.format(bean.getTheCommonFormInfo().getBelongProInst().getDenluTime()));
        if (StringUtils.isNotBlank(bean.getTheCommonFormInfo().getBelongProInst().getBulletinType())) {
            String[] split = bean.getTheCommonFormInfo().getBelongProInst().getBulletinType().split("\\|");
            for (String s : split) {
                html = html.replace("$checked_" + s + "$", Constants.CHECKED);
            }
        }
        if (StringUtils.isNotBlank(bean.getTheCommonFormInfo().getBelongProInst().getTitle())) {
            if (bean.getTheCommonFormInfo().getBelongProInst().getTitle().trim().length() > 40) {
                String title = bean.getTheCommonFormInfo().getBelongProInst().getTitle().trim();
                html = html.replace("$task.title1$", title.substring(0, 40));
                System.out.println(title);
                html = html.replace("$task.title2$", title.substring(40));
            } else {
                html = html.replace("$task.title1$", bean.getTheCommonFormInfo().getBelongProInst().getTitle());
                html = html.replace("$task.title2$", "");
            }
        }

        return html;
    }

    *//**
     * 根据List获取content
     *
     * @param lists
     * @return
     *//*
    private static String getContent(List<WfOpinion> lists, String opinionType) {
        StringBuilder sb = new StringBuilder("");
        if (CollectionUtils.isNotEmpty(lists)) {
            int i = 0;
            for (WfOpinion l : lists) {
                if (StringUtils.isBlank(l.getOpinion())) {
                    l.setOpinion("");
                }
                i++;
                if (lists.size() > 2 && lists.size() - i >= 2 && StringUtils.isNotBlank(opinionType) && !StringUtils.equals(Constants.QIANFA, opinionType) && !StringUtils.equals(Constants.WLDPS, opinionType) && !StringUtils.equals(Constants.PISHI, opinionType) && !StringUtils.equals(Constants.DUWENSLDPS, opinionType)
                        && !StringUtils.equals(Constants.YUESHI, opinionType) && !StringUtils.equals(Constants.BANLI, opinionType) && !StringUtils.equals(Constants.LIUZHUAN, opinionType) &&
                        !StringUtils.equals(Constants.CSYJ, opinionType) && !StringUtils.equals(Constants.NIBAN, opinionType) && !StringUtils.equals(Constants.LINGDAOPISHI, opinionType) && !StringUtils.equals(Constants.BANNIQINGKUANG, opinionType) && !StringUtils.equals(WorkApprovedConstants.WLDYJ, opinionType)) {
                    continue;
                }
                if (StringUtils.equals(Constants.DUWENSLDPS, opinionType)) {
                    if (BigDecimal.ONE.equals(l.getStepId())) {
                        sb.append(forMatOpinion(l.getOpinion())).append("<br>");
                    } else {
                        sb.append("<span class=\"user-option-bold\">" +
                                forMatOpinion(l.getOpinion())
                                + "</span>").append("</br>");
                    }
                    continue;
                }
                sb.append(forMatOpinion(l.getOpinion())).append(" ");
                if (!("1".equals(l.getStepId() == null ? "" : l.getStepId().toString())) && !(StringUtils.equals(Constants.NIBAN, opinionType) || StringUtils.equals(Constants.LIUZHUAN, opinionType))) {
                    Calendar ca = Calendar.getInstance();
                    ca.setTime(l.getApproveTime());
                    sb.append(!StringUtils.equals("1", l.getAgentFlag()) ? getImage(l.getApproverId()) : l.getApproverName()).append(" ").append(ca.get(Calendar.MONTH) + 1).append("/").append(ca.get(Calendar.DATE)).append("<br>");
                } else {
                    if ((StringUtils.equals(Constants.NIBAN, opinionType) || StringUtils.equals(Constants.LIUZHUAN, opinionType)) && !("1".equals(l.getStepId() == null ? "" : l.getStepId().toString()))) {
                        Calendar ca = Calendar.getInstance();
                        ca.setTime(l.getApproveTime());
                        sb.append(!(StringUtils.equals("1", l.getAgentFlag()) || StringUtils.isBlank(l.getAgentFlag())) ? getImage(l.getApproverId()) : l.getApproverName()).append(" ").append(ca.get(Calendar.MONTH) + 1).append("/").append(ca.get(Calendar.DATE)).append("<br>");
                    } else if (StringUtils.equals(Constants.BANNIQINGKUANG, opinionType) || StringUtils.equals(Constants.CSYJ, opinionType)) {
                        Calendar ca = Calendar.getInstance();
                        ca.setTime(l.getApproveTime());
                        sb.append(!StringUtils.equals("1", l.getAgentFlag()) ? getImage(l.getApproverId()) : l.getApproverName()).append(" ").append(ca.get(Calendar.MONTH) + 1).append("/").append(ca.get(Calendar.DATE)).append("<br>");
                    } else {
                        sb.append("<br>");
                    }
                }
            }
        }
        return sb.toString();
    }

    *//**
     * 格式化工作报批
     *
     * @param html
     * @param bean
     * @param type
     * @return
     *//*
    private static String formatApproved(String html, RCurrentTaskInfo bean, String type) {

        html = html.replace(Constants.BEAN_CREATORNAME, bean.getTheCommonFormInfo().getBelongProInst().getCreatorName() == null ? "" : bean.getTheCommonFormInfo().getBelongProInst().getCreatorName());
        if (StringUtils.equals(Constants.DOC_TYPE_CONTRACTAPPROVED, type)) {
            html = html.replace(ShouWenConstans.BEAN_DOCFULLNAME, bean.getTheCommonFormInfo().getBelongProInst().getDocFullName() == null ? "" : bean.getTheCommonFormInfo().getBelongProInst().getDocFullName());
            html = html.replace(ShouWenConstans.BEAN_DOCDEPART, bean.getTheCommonFormInfo().getBelongProInst().getIncomingDocDepart() == null ? "" : bean.getTheCommonFormInfo().getBelongProInst().getIncomingDocDepart());

            html = html.replace(WorkApprovedConstants.NIGAO_DATE, bean.getTheCommonFormInfo().getFormContractApproved().getNigaoDate() == null ? "" : sdf.format(bean.getTheCommonFormInfo().getFormContractApproved().getNigaoDate()));
            html = html.replace(WorkApprovedConstants.SUPERVISOR, bean.getTheCommonFormInfo().getFormContractApproved().getSupervisor() == null ? "" : bean.getTheCommonFormInfo().getFormContractApproved().getSupervisor());
            html = html.replace(WorkApprovedConstants.SERVICE_CONTENT, bean.getTheCommonFormInfo().getFormContractApproved().getServicecontent() == null ? "" : forMatOpinion(bean.getTheCommonFormInfo().getFormContractApproved().getServicecontent()));
            html = html.replace(WorkApprovedConstants.CONTRACT_DETAIL, bean.getTheCommonFormInfo().getFormContractApproved().getContractdetail() == null ? "" : forMatOpinion(bean.getTheCommonFormInfo().getFormContractApproved().getContractdetail()));


            Map<String, List<WfOpinion>> map = bean.getUserOpinions();
            List<WfOpinion> workNiban = map.get(WorkApprovedConstants.NIBAN);
            html = html.replace(WorkApprovedConstants.OPINION_NIBAN, getWorkApprovedContent(workNiban, WorkApprovedConstants.NIBAN));
            List<WfOpinion> officeNiban = map.get(WorkApprovedConstants.OFFICESBGSNBYJ);
            html = html.replace(WorkApprovedConstants.OPINION_OFFICENIBAN, getWorkApprovedContent(officeNiban, WorkApprovedConstants.OFFICESBGSNBYJ));
            List<WfOpinion> officeShenhe = map.get(WorkApprovedConstants.OFFICESHENHE);
            html = html.replace(WorkApprovedConstants.OPINION_OFFICESHENHE, getWorkApprovedContent(officeShenhe, WorkApprovedConstants.OFFICESHENHE));
            List<WfOpinion> fgcNiban = map.get(WorkApprovedConstants.LAYEWNIBAN);
            html = html.replace(WorkApprovedConstants.OPINION_LAYEWNIBAN, getWorkApprovedContent(fgcNiban, WorkApprovedConstants.LAYEWNIBAN));
            List<WfOpinion> fgcShenhe = map.get(WorkApprovedConstants.LAYEWSHENHE);
            html = html.replace(WorkApprovedConstants.OPINION_LAYEWSHENHE, getWorkApprovedContent(fgcShenhe, WorkApprovedConstants.LAYEWSHENHE));
            List<WfOpinion> wld = map.get(WorkApprovedConstants.LEADER);
            html = html.replace(WorkApprovedConstants.OPINION_LEADER, getWorkApprovedContent(wld, WorkApprovedConstants.LEADER));
            List<WfOpinion> csyj = map.get(Constants.CSYJ);
            html = html.replace(WorkApprovedConstants.OPINION_CSYJ, getWorkApprovedContent(csyj, Constants.CSYJ));
            List<WfOpinion> hucsyj = map.get(WorkApprovedConstants.HBCSYJ);
            html = html.replace(WorkApprovedConstants.OPINION_HBCSYJ, getWorkApprovedContent(hucsyj, WorkApprovedConstants.HBCSYJ));
            if (null != wld && wld.size() > 0) {
                html = html.replace(WorkApprovedConstants.LAST_OPINIONTIME, sdf1.format(wld.get(wld.size() - 1).getApproveTime()));
            } else {
                html = html.replace(WorkApprovedConstants.LAST_OPINIONTIME, sdf1.format(new Date()));
            }

        } else {
            html = commonContent(html, bean, type);
            if (StringUtils.equals(Constants.DOC_TYPE_WORKAPPROVED, type)) {
                html = html.replace(WorkApprovedConstants.APPROVED_DATE, bean.getTheCommonFormInfo().getFormWorkApproved().getNiGaoData() == null ? "" : sdf.format(bean.getTheCommonFormInfo().getFormWorkApproved().getNiGaoData()));
                html = html.replace(WorkApprovedConstants.APPROVED_TYPE, bean.getTheCommonFormInfo().getFormWorkApproved().getType() == null ? "" : bean.getTheCommonFormInfo().getFormWorkApproved().getType());

            } else if (StringUtils.equals(Constants.DOC_TYPE_OTHERAPPROVED, type)) {
                html = html.replace(WorkApprovedConstants.APPROVED_REPORTING, bean.getTheCommonFormInfo().getFormOtherApproved().getReporting() == null ? "" : bean.getTheCommonFormInfo().getFormOtherApproved().getReporting());
                html = html.replace(WorkApprovedConstants.APPROVED_TELEPHONE, bean.getTheCommonFormInfo().getFormOtherApproved().getTelePhone() == null ? "" : bean.getTheCommonFormInfo().getFormOtherApproved().getTelePhone());
                html = html.replace(WorkApprovedConstants.APPROVED_GROUPDEPART, bean.getTheCommonFormInfo().getFormOtherApproved().getGroupDepart() == null ? "" : forMatOpinion(bean.getTheCommonFormInfo().getFormOtherApproved().getGroupDepart()));
                html = html.replace(WorkApprovedConstants.APPROVED_VISITCOUNTRY, bean.getTheCommonFormInfo().getFormOtherApproved().getVisitCountry() == null ? "" : bean.getTheCommonFormInfo().getFormOtherApproved().getVisitCountry());
                html = html.replace(WorkApprovedConstants.APPROVED_VISITTIME, bean.getTheCommonFormInfo().getFormOtherApproved().getVisitTime() == null ? "" : bean.getTheCommonFormInfo().getFormOtherApproved().getVisitTime());
                html = html.replace(WorkApprovedConstants.APPROVED_VISITPURPOSE, bean.getTheCommonFormInfo().getFormOtherApproved().getVisitPurpose() == null ? "" : forMatOpinion(bean.getTheCommonFormInfo().getFormOtherApproved().getVisitPurpose()));
                if (StringUtils.isNotBlank(bean.getTheCommonFormInfo().getFormOtherApproved().getFamilyCondition())) {
                    String a = bean.getTheCommonFormInfo().getFormOtherApproved().getFamilyCondition().replaceAll("\n", "<br>");
                    bean.getTheCommonFormInfo().getFormOtherApproved().setFamilyCondition(a);
                }
                html = html.replace(WorkApprovedConstants.APPROVED_FAMILYCONDITION, bean.getTheCommonFormInfo().getFormOtherApproved().getFamilyCondition() == null ? "" : bean.getTheCommonFormInfo().getFormOtherApproved().getFamilyCondition());
                html = html.replace(WorkApprovedConstants.APPROVED_VISITACOUNT, bean.getTheCommonFormInfo().getFormOtherApproved().getVisitAcount() == null ? "" : bean.getTheCommonFormInfo().getFormOtherApproved().getVisitAcount());
                html = html.replace(WorkApprovedConstants.APPROVED_OPEN, bean.getTheCommonFormInfo().getFormOtherApproved().getOpen() == null ? "" : bean.getTheCommonFormInfo().getFormOtherApproved().getOpen());
                html = html.replace(Constants.BEAN_DOCYEAR, bean.getTheCommonFormInfo().getDocYear() == null ? "" : String.valueOf(bean.getTheCommonFormInfo().getDocYear()));
                html = html.replace(Constants.BEAN_DOCNUMBER, bean.getTheCommonFormInfo().getDocNumber() == null ? "" : String.valueOf(bean.getTheCommonFormInfo().getDocNumber()));
                if (StringUtils.isNotBlank(bean.getTheCommonFormInfo().getDocPrefix())) {
                    if (bean.getTheCommonFormInfo().getDocPrefix().length() > 2) {
                        html = html.replace(Constants.BEAN_DOCPREFIX, bean.getTheCommonFormInfo().getDocPrefix().substring(3));
                    } else {
                        html = html.replace(Constants.BEAN_DOCPREFIX, bean.getTheCommonFormInfo().getDocPrefix());
                    }
                }
//                html = html.replace(Constants.BEAN_DOCPREFIX, bean.getTheCommonFormInfo().getDocPrefix() == null ? "" : bean.getTheCommonFormInfo().getDocPrefix());
                *//*对于回车换行打印解析*//*
                //html = html.replaceAll("\n","<br>");

            } else if (StringUtils.equals(Constants.DOC_TYPE_DRAFTAPPROVED, type)) {
                html = html.replace(WorkApprovedConstants.APPROVED_DATE, bean.getTheCommonFormInfo().getFormDraftApproved().getNigaoDate() == null ? "" : sdf.format(bean.getTheCommonFormInfo().getFormDraftApproved().getNigaoDate()));
                html = html.replace(WorkApprovedConstants.APPROVED_TYPE, bean.getTheCommonFormInfo().getFormDraftApproved().getType() == null ? "" : bean.getTheCommonFormInfo().getFormDraftApproved().getType());
            } else if (StringUtils.equals(Constants.DOC_TYPE_PARTYAPPROVED, type)) {

                html = html.replace(WorkApprovedConstants.APPROVED_DATE, bean.getTheCommonFormInfo().getFormPartyApproved().getNiGaoData() == null ? "" : sdf.format(bean.getTheCommonFormInfo().getFormPartyApproved().getNiGaoData()));
                html = html.replace(WorkApprovedConstants.APPROVED_TYPE, bean.getTheCommonFormInfo().getFormPartyApproved().getType() == null ? "" : bean.getTheCommonFormInfo().getFormPartyApproved().getType());
            } else if (StringUtils.equals(Constants.DOC_TYPE_OFFICEPARTYAPPROVED, type)) {

                html = html.replace(WorkApprovedConstants.APPROVED_DATE, bean.getTheCommonFormInfo().getFormOfficePartyApproved().getNiGaoData() == null ? "" : sdf.format(bean.getTheCommonFormInfo().getFormOfficePartyApproved().getNiGaoData()));
                html = html.replace(WorkApprovedConstants.APPROVED_TYPE, bean.getTheCommonFormInfo().getFormOfficePartyApproved().getType() == null ? "" : bean.getTheCommonFormInfo().getFormOfficePartyApproved().getType());
            }


        }
        return html;
    }

    *//**
     * 合同报批意见特殊处理
     *
     * @param lists
     * @param type
     * @return
     *//*
    private static CharSequence getWorkApprovedContent(List<WfOpinion> lists, String type) {
        StringBuilder sb = new StringBuilder("");
        if (CollectionUtils.isNotEmpty(lists)) {
            for (WfOpinion l : lists) {
                if (StringUtils.isBlank(l.getOpinion())) {
                    l.setOpinion("");
                }
                Calendar ca = Calendar.getInstance();
                ca.setTime(l.getApproveTime());
                if (StringUtils.equals(WorkApprovedConstants.NIBAN, type) || StringUtils.equals(WorkApprovedConstants.OFFICENIBAN, type) || StringUtils.equals(WorkApprovedConstants.LAYEWNIBAN, type) || StringUtils.equals(WorkApprovedConstants.OFFICESBGSNBYJ, type)) {
                    sb.append(l.getOpinion()).append("<br>经办人：").append(!StringUtils.equals("1", l.getAgentFlag()) ? getImage(l.getApproverId()) : l.getApproverName()).append(" ").append(ca.get(Calendar.MONTH) + 1).append("/").append(ca.get(Calendar.DATE)).append("<br>");
                } else if (StringUtils.equals(WorkApprovedConstants.OFFICESHENHE, type)) {
                    sb.append(l.getOpinion()).append("<br>处长：").append(!StringUtils.equals("1", l.getAgentFlag()) ? getImage(l.getApproverId()) : l.getApproverName()).append(" ").append(ca.get(Calendar.MONTH) + 1).append("/").append(ca.get(Calendar.DATE)).append("<br>");

                } else if (StringUtils.equals(WorkApprovedConstants.LAYEWSHENHE, type) || StringUtils.equals(Constants.CSYJ, type)) {
                    sb.append(l.getOpinion()).append("<br>处长：").append(!StringUtils.equals("1", l.getAgentFlag()) ? getImage(l.getApproverId()) : l.getApproverName()).append(" ").append(ca.get(Calendar.MONTH) + 1).append("/").append(ca.get(Calendar.DATE)).append("<br>");

                } else if (StringUtils.equals(WorkApprovedConstants.LEADER, type)) {
                    sb.append(l.getOpinion()).append(" ").append(!StringUtils.equals("1", l.getAgentFlag()) ? getImage(l.getApproverId()) : l.getApproverName()).append(" ").append(ca.get(Calendar.MONTH) + 1).append("/").append(ca.get(Calendar.DATE)).append("<br>");

                } else if (StringUtils.equals(WorkApprovedConstants.HBCSYJ, type)) {
                    sb.append(l.getOpinion()).append("<br>").append(l.getDepartName()).append(":").append(!StringUtils.equals("1", l.getAgentFlag()) ? getImage(l.getApproverId()) : l.getApproverName()).append(" ").append(ca.get(Calendar.MONTH) + 1).append("/").append(ca.get(Calendar.DATE)).append("<br>");

                }

            }
        }
        return sb.toString();
    }

    *//**
     * 格式化意见
     *
     * @param opinion
     * @return
     *//*
    private static String forMatOpinion(String opinion) {
        if (StringUtils.contains(opinion, "<")) {
            opinion = opinion.replaceAll("<", "&lt;");
        }
        if (StringUtils.contains(opinion, ">")) {
            opinion = opinion.replaceAll(">", "&gt;");
        }
        return opinion;
    }

    *//**
     * 根据ID获取图片
     *
     * @param approverId
     * @return
     *//*
    private static String getImage(BigDecimal approverId) {
        CoreUserService coreUserService = (CoreUserService) SpringUtil.getBean(CoreUserService.class);
        AttachmentService attachService = (AttachmentService) SpringUtil.getBean(AttachmentService.class);
        CoreUser user = coreUserService.read(approverId);
        String name = user.getUsername();
        String imgUrl = PDFUtils.STATICSOURCE + name + IMGDOC;
        new HTTPConnect().getImgByHTTP(attachService.getSignHttpUrl() + name, imgUrl);

        StringBuilder sb = new StringBuilder("");
        File imgFile = new File(imgUrl);
        System.out.println(imgFile.length());
        if (imgFile.exists() && imgFile.length() > 0) {
            //默认大小30 69
            sb.append("<img style=\"position: relative;top:8px\" src=").append(name + IMGDOC).append(">");
        } else {
            sb.append(user.getName());
        }
        return sb.toString();
    }*/
}
