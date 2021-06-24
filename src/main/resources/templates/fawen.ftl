<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <link href="file:/D:\\layout.css" type="text/css" rel="stylesheet"/>
</head>

<body>
<div style="background:white; width: 680px;padding: 0 2% 5% 2%;box-shadow: 5px 2px 5px #575757">
    <table style="width:100%" border="0" align="center" cellpadding="0" cellspacing="0" class="tblGw01">
        <tr>
            <td align="center" class="td03">
                <p class="GwTitleRedLargeBigSF" align="center" style="display:inline;letter-spacing:-7px;color:#F50000;">
                    <font>444上海市长城电子发文单</font>

                </p>
            </td>
            <td align="right" class="td03" style="display:block;">
                <table width="115" border="0" cellpadding="0" cellspacing="0" class="tblGw01 tab-fontfamily">
                    <tr align="center">
                        <td width="70%" height="20" class="td02">紧急程度</td>
                        <td width="30%" height="20" class="td02" style="color:#F50000">
                        ${(task.theCommonFormInfo.emergenceLevel)!''}
                        </td>
                    </tr>
                    <tr align="center">
                        <td class="td02">委内公开</td>
                        <td class="td02">
                        ${(publicityLevelDetail.wngk)!''}
                        </td>
                    </tr>
                    <tr align="center">
                        <td class="td02">主动公开</td>
                        <td class="td02">
                        ${(publicityLevelDetail.zdgk)!''}
                        </td>
                    </tr>
                    <tr align="center">
                        <td class="td02">不予公开</td>
                        <td class="td02">
                        ${(publicityLevelDetail.bygk)!''}
                        </td>
                    </tr>
                    <tr align="center">
                        <td class="td02">依申请公开</td>
                        <td class="td02">
                        ${(publicityLevelDetail.ysqgk)!''}
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <table style="width:100%" border="0" align="center" cellpadding="0" cellspacing="0" class="tblGw01">
        <tr>
            <td colspan="9" class="td04">&nbsp;
            </td>
        </tr>
        <tr>
            <td width="56" class="td04">文种:</td>
            <td width="117" class="td05">
            ${(task.theCommonFormInfo.docType)!''}
            </td>
            <td width="56" class="td04">密级:
            </td>
            <td width="110" class="td05">
            ${(task.theCommonFormInfo.wfSecretConfirm.dicTypeRef.name)!''}
            </td>

                <#if task.theCommonFormInfo.docPrefix == '长城电子'>
                    <td width="69" class="td04" >
                        <font style="FONT-SIZE: 16px; font-family: KaiTi_GB2312"> 长城电子</font>
                    </td>
                </#if>
                <#if task.theCommonFormInfo.docPrefix == '公告'>
                    <td width="46" class="td04" >
                        <font style="FONT-SIZE: 16px; font-family: KaiTi_GB2312"> 公告</font>
                    </td>
                </#if>
                <#if task.theCommonFormInfo.docPrefix != '公告'>
                    <td width="22" class="td04" >
                        ${(task.theCommonFormInfo.departName)!''}
                    </td>
                </#if>
            <td width="23" class="td04">（
            </td>
            <td width="34" class="td04">
            ${(task.theCommonFormInfo.docYear)!''}
            </td>
                <#if task.theCommonFormInfo.docPrefix != '公告'>
                    <td width="23" class="td04">）
                    </td>
                </#if>
                <#if task.theCommonFormInfo.docPrefix == '公告'>
                    <td width="46"  class="td04">）
                    </td>
                </#if>
            <td width="41" class="td04">
            ${(task.theCommonFormInfo.docNumber)!''}
            </td>
            <td width="40" class="td04">号
            </td>
        </tr>
    </table>

    <table style="width:100%" border="0" align="center" cellpadding="0" cellspacing="0" class="tblGw01">
        <tr>
            <td width="105" class="td04">关联收文号:
            </td>
            <td width="475" class="td05">
            ${(task.theCommonFormInfo.belongProInst.relatedReceiveDocId)!''}
            </td>
        </tr>
    </table>

    <table style="width:100%" border="0" align="center" cellpadding="0" cellspacing="0" class="tblGw01">
        <tr>
            <td colspan="2" class="td04">标 题：
            </td>
        </tr>
        <tr>
            <td height="60" valign="top" class="td05">
            ${(task.theCommonFormInfo.belongProInst.title)!''}
            </td>
        </tr>
        <tr>
            <td class="td04" colspan="2">主送机关：
            </td>
        </tr>
        <tr>
            <td height="50" colspan="2" valign="top" class="td05">
            ${(task.theCommonFormInfo.formFawen.sendToMain)!''}
            </td>
        </tr>
        <tr>
            <td class="td04" colspan="2">抄 送：
            </td>
        </tr>
        <tr>
            <td height="50" colspan="2" valign="top" class="td05">
            ${(task.theCommonFormInfo.formFawen.sendToCc)!''}
            </td>
        </tr>
    </table>

    <table style="width:100%" border="0" align="center" cellpadding="0" cellspacing="0" class="tblGw01">
        <tr>
            <td width="280" class="td04">核稿:
            </td>
            <td width="300" class="td04">会稿:
            </td>
        </tr>
        <tr>
            <td width="280" height="60" class="td05">
                <div style="height:48px;" class="Inputhidden011" >
                        <#if (task.userOpinions.hegao)??>
                            <#list task.userOpinions.hegao as o>
                                <div  style="word-break: break-all; word-wrap:break-word;">
                                    ${o.opinion} &nbsp;&nbsp;<span id="userOption_${o.flowId}_${o.id}">${o.approverName}</span> &nbsp;&nbsp; ${o.approveTime}
                                </div>
                            </#list>
                        </#if>
                </div>
            </td>
            <td width="300" class="td05">
                <div style="height:48px;" class="Inputhidden011">
                        <#if (task.userOpinions.huigao)??>
                            <#list task.userOpinions.huigao as o>
                                <div style="word-break: break-all; word-wrap:break-word;">
                                    ${o.opinion} &nbsp;&nbsp;<span id="userOption_${o.flowId}_${o.id}">${o.approverName}</span> &nbsp;&nbsp; ${o.approveTime}
                                </div>
                            </#list>
                        </#if>
                </div>
            </td>
        </tr>
        <tr>
            <td class="td04">会签:</td>
            <td class="td04">审核:</td>
        </tr>
        <tr>
            <td height="60" class="td05">
                <textarea name="会签" cols="40" class="Inputhidden011" id="textarea4" style=" resize:none; width: 100%;height:100%;" value="${(task.theCommonFormInfo.formFawen.huiQian)!''}" ></textarea>
            </td>
            <td height="60" class="td05">
                <div style="height:48px;" class="Inputhidden011" >
                        <#if (task.userOpinions.shenhe)??>
                            <#list task.userOpinions.shenhe as o>
                                <div  style="word-break: break-all; word-wrap:break-word;">
                                    ${o.opinion} &nbsp;&nbsp;<span id="userOption_${o.flowId}_${o.id}">${o.approverName}</span> &nbsp;&nbsp; ${o.approveTime}
                                </div>
                            </#list>
                        </#if>
                </div>
            </td>
        </tr>
        <tr>
            <td colspan="2" class="td04">签发:
            </td>
        </tr>
        <tr>
            <td height="100" colspan="2" class="td05">
                <div style="height:100px;" class="Inputhidden011" >
                        <#if (task.userOpinions.qianfa)??>
                            <#list task.userOpinions.qianfa as o>
                                <div style="word-break: break-all; word-wrap:break-word;">
                                    ${o.opinion} &nbsp;&nbsp;<span id="userOption_${o.flowId}_${o.id}">${o.approverName}</span> &nbsp;&nbsp; ${o.approveTime}
                                </div>
                            </#list>
                        </#if>
                </div>
            </td>
        </tr>
    </table>
    <table style="width:100%" border="0" align="center" cellpadding="0" cellspacing="0" class="tblGw01">
        <tr>
            <td colspan="2" class="td04">不予公开理由:
            </td>
        </tr>
        <tr>
            <td height="60" colspan="2" class="td05">
                <table class="fontSizeFamily" style="width:95%" border="0" align="center" cellpadding="0" cellspacing="0">
                    <tr>
                        <td>
                            <input name="国家秘密" id="gjmm" <#if (notOpenReason.gjmm)??>checked="checked"</#if> type="checkbox"></input>
                            <span >国家秘密</span>
                        </td>
                        <td>
                            <input name="个人隐私" id="grys" <#if (notOpenReason.grys)??>checked="checked"</#if> type="checkbox"></input>
                            <span>个人隐私</span>
                        </td>
                        <td>
                            <input name="内部管理信息" id="nbglxx" <#if (notOpenReason.nbglxx)??>checked="checked"</#if> type="checkbox"></input>
                            <span >内部管理信息</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input name="商业秘密" id="symm" <#if (notOpenReason.symm)??>checked="checked"</#if>  type="checkbox"></input>
                            <span >商业秘密</span>
                        </td>
                        <td>
                            <input  name="危及三安全一稳定" id="wjsaywd" <#if (notOpenReason.wjsaywd)??>checked="checked"</#if>  type="checkbox"></input>
                            <span>危及三安全一稳定</span>
                        </td>
                        <td>
                            <input  name="过程性信息"  id="gcxxx" <#if (notOpenReason.gcxxx)??>checked="checked"</#if> type="checkbox"></input>
                            <span>过程性信息</span>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3">
                            <input  id="otherReson" <#if (notOpenReason.otherReson)??>checked="checked"</#if> type="checkbox"></input>
                            <span>其他理由</span>&nbsp;&nbsp;
                        ${(task.theCommonFormInfo.otherReason)!''}
                        <#--<input placeholder="请输入其他理由" value="${(task.theCommonFormInfo.otherReason)!''}" type="text" class="Inputhidden01"   style="width: 500px;"></input>-->
                        </td>
                    </tr>
                <#--</td>-->
                </table>
            </td>
        </tr>
    </table>

    <table style="width:100%" border="0" align="center" cellpadding="0" cellspacing="0" class="tblGw01">
        <tr>
            <td class="td04 nigao-value" >拟稿人:
            </td>
            <td class="nigao-name">
            ${(task.belongingProInst.creatorName)!''}

            </td>
            <td width="90">&nbsp;</td>
            <td width="32" align="right" >
            ${(task.theCommonFormInfo.formFawen.niGaoY)!''}

            </td>
            <td width="24" align="right" class="td04">年
            </td>
            <td width="24" align="right" >
            ${(task.theCommonFormInfo.formFawen.niGaoM)!''}
            </td>
            <td width="24" align="right" class="td04">月
            </td>
            <td width="20" align="right" >
            ${(task.theCommonFormInfo.formFawen.niGaoD)!''}
            </td>
            <td width="60" align="right" class="td04">日 共印
            </td>
            <td width="34" align="right" >
            ${(task.theCommonFormInfo.numberOfCopy)!''}
            </td>
            <td width="20" align="right" class="td04">份
            </td>
        </tr>
    </table>
</div>
</body>
</html>
