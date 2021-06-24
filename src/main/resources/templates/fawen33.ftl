<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta http-equiv="Content-Style-Type" content="text/css"/>
    <title></title>
    <link rel="stylesheet" type="text/css" href="http://ak.oa.jxw/css/layout.css"></link>
    <#--<link rel="stylesheet" href="css/processForm.css">
    <link rel="stylesheet" href="css/app.css">
    <link rel="stylesheet" href="css/processForm.css">-->
    <style type="text/css">
        body {
            font-family: pingfang sc light;
        }
    </style>
</head>
<body>
<!--第一页开始-->
<div class="page" >
    <div >
        2222${(task.theCommonFormInfo.emergenceLevel)!''}
        <table  >
            <tr>
                <td  >
                    <p   >
                        上海市长城电子发文单
                    </p>
                </td>
                <td  >
                    <table  >
                        <tr >
                            <td  >紧急程度</td>
                            <td  >
                                <input name="紧急程度"  value="${(task.theCommonFormInfo.emergenceLevel)!''}" type="text" id="emergenceLevel"  ></input>
                            </td>
                        </tr>
                        <tr >
                            <td >委内公开</td>
                            <td >
                                <input name="委内公开" value="${(publicityLevelDetail.wngk)!''}" type="text" ></input>
                            </td>
                        </tr>
                        <tr >
                            <td >主动公开</td>
                            <td >
                                <input name="主动公开" value="${(publicityLevelDetail.zdgk)!''}"  type="text"  ></input>
                            </td>
                        </tr>
                        <tr >
                            <td >不予公开</td>
                            <td >
                                <input name="不予公开" value="${(publicityLevelDetail.bygk)!''}"  type="text"  ></input>
                            </td>
                        </tr>
                        <tr >
                            <td >依申请公开</td>
                            <td >
                                <input name="依申请公开" value="${(publicityLevelDetail.ysqgk)!''}"  type="text" ></input>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>

        <#--<table style="width:100%" border="0" align="center" cellpadding="0" cellspacing="0" class="tblGw01">
            <tr>
                <td colspan="9" class="td04">&nbsp;
                </td>
            </tr>
            <tr>
                <td width="56" class="td04">文种:</td>
                <td width="117" class="td05">
                    <input name="文种" id='docType' value="${(task.theCommonFormInfo.docType)!''}" type="text" class="Inputhidden01 formCtrlField" style="width: 100%;height: 100%;font-family: 楷体_GB2312" size="20">
                </td>
                <td width="56" class="td04">密级:
                </td>
                <td width="110" class="td05">
                    <input name="密级" value="${(task.theCommonFormInfo.wfSecretConfirm.dicTypeRef.name)!''}" type="text" class="Inputhidden01" style="font-family: 楷体_GB2312" size="10" readonly>
                </td>

                <#if task.theCommonFormInfo.docPrefix == '长城电子'>
                    <td width="69" class="td04" >
                        <font style="FONT-SIZE: 16px; font-family: 楷体_GB2312"> 长城电子</font>
                    </td>
                </#if>
                <#if task.theCommonFormInfo.docPrefix == '公告'>
                    <td width="46" class="td04" >
                        <font style="FONT-SIZE: 16px; font-family: 楷体_GB2312"> 公告</font>
                    </td>
                </#if>
                <#if task.theCommonFormInfo.docPrefix != '公告'>
                    <td width="22" class="td04" >
                        <input value="${(task.theCommonFormInfo.departName)!''}" readonly type="text" class="Inputhidden01" style="color:black;font-weight: normal;width: 100%;height: 100%;font-family: 楷体_GB2312" size="1" maxlength="1" />
                    </td>
                </#if>
                <td width="23" class="td04">（
                </td>
                <td width="34" class="td04">
                    <input name="年份" value="${(task.theCommonFormInfo.docYear)!''}" type="number" class="Inputhidden01" style="color:black;font-weight: normal;width: 35px;height: 100%;font-family: 楷体_GB2312"   size="8">
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
                    <input name="文号" value="${(task.theCommonFormInfo.docNumber)!''}" type="number" class="Inputhidden01" style="color:black;font-weight: normal;width: 100%;height: 100%;font-family: 楷体_GB2312"  size="3" maxlength="4">
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
                    <input name="关联收文号" value="${(task.theCommonFormInfo.belongProInst.relatedReceiveDocId)!''}" type="text" class="Inputhidden01" style="width: 100%;height: 100%;font-family: 楷体_GB2312" size="150"  >
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
                    <textarea name="标题" value="${(task.theCommonFormInfo.belongProInst.title)!''}" class="InputHidden01 "  style="resize:none; width: 100%;height: 100%;font-family: 楷体_GB2312"></textarea>
                </td>
            </tr>
            <tr>
                <td class="td04" colspan="2">主送机关：
                </td>
            </tr>
            <tr>
                <td height="50" colspan="2" valign="top" class="td05">
                    <textarea name="主送机关"  value="${(task.theCommonFormInfo.formFawen.sendToMain)!''}" class="InputHidden01 " style="resize:none; width: 100%;height: 100%;font-family: 楷体_GB2312"  ></textarea>
                </td>
            </tr>
            <tr>
                <td class="td04" colspan="2">抄 送：
                </td>
            </tr>
            <tr>
                <td height="50" colspan="2" valign="top" class="td05">
                    <textarea name="抄送机关"  value="${(task.theCommonFormInfo.formFawen.sendToCc)!''}" class="InputHidden01 " style="resize:none; width: 100%;height: 100%;font-family: 楷体_GB2312"  ></textarea>
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
                    <textarea name="会签" cols="40" class="Inputhidden011" id="textarea4" style=" resize:none; width: 100%;height:100%;font-family: 楷体_GB2312" value="${(task.theCommonFormInfo.formFawen.huiQian)!''}" ></textarea>
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
                                <input name="国家秘密" id="gjmm" <#if (notOpenReason.gjmm)??>checked</#if> type="checkbox">
                                <span for="gjmm">国家秘密</span>
                            </td>
                            <td>
                                <input name="个人隐私" id="grys" <#if (notOpenReason.grys)??>checked</#if> type="checkbox">
                                <span>个人隐私</span>
                            </td>
                            <td>
                                <input name="内部管理信息" id="nbglxx" <#if (notOpenReason.nbglxx)??>checked</#if> type="checkbox">
                                <span >内部管理信息</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input name="商业秘密" id="symm" <#if (notOpenReason.symm)??>checked</#if>  type="checkbox">
                                <span >商业秘密</span>
                            </td>
                            <td>
                                <input  name="危及三安全一稳定" id="wjsaywd" <#if (notOpenReason.wjsaywd)??>checked</#if>  type="checkbox">
                                <span>危及三安全一稳定</span>
                            </td>
                            <td>
                                <input  name="过程性信息"  id="gcxxx" <#if (notOpenReason.gcxxx)??>checked</#if> type="checkbox">
                                <span>过程性信息</span>
                            </td>
                        </tr>
                        <tr>
                            <td colspan=3>
                                <input  id="otherReson" <#if (notOpenReason.otherReson)??>checked</#if> type="checkbox">
                                <span>其他理由</span>
                                <input placeholder="请输入其他理由" value="${(task.theCommonFormInfo.otherReason)!''}" type="text" class="Inputhidden01"   style="font-family: 楷体_GB2312;width: 500px;">
                            </td>
                        </tr>
                        </td>
                    </table>
                </td>
            </tr>
        </table>

        <table style="width:100%" border="0" align="center" cellpadding="0" cellspacing="0" class="tblGw01">
            <tr>
                <td class="td04 nigao-value" >拟稿人:
                </td>
                <td class="nigao-name">
                    <input  readonly type="text" value="${(task.belongingProInst.creatorName)!''}" class="Inputhidden01"  style="width: 100%;height: 100%;font-family: 楷体_GB2312"    size="12">
                </td>
                <td width="90">&nbsp;</td>
                <td width="32" align="right" >
                    <input  value="${(task.theCommonFormInfo.formFawen.niGaoY)!''}"  type="text" class="Inputhidden01" style="width: 100%;height: 100%;font-family: 楷体_GB2312"  size="1"  >
                </td>
                <td width="24" align="right" class="td04">年
                </td>
                <td width="24" align="right" >
                    <input   value="${(task.theCommonFormInfo.formFawen.niGaoM)!''}"  type="text" class="Inputhidden01" style="width: 100%;height: 100%;font-family: 楷体_GB2312"  size="1"  >
                </td>
                <td width="24" align="right" class="td04">月
                </td>
                <td width="20" align="right" >
                    <input   value="${(task.theCommonFormInfo.formFawen.niGaoD)!''}"  type="text" class="Inputhidden01" style="width: 100%;height: 100%;font-family: 楷体_GB2312"  size="1"  >
                </td>
                <td width="60" align="right" class="td04">日 共印
                </td>
                <td width="34" align="right" >
                    <input name="份数"  type="number" value="${(task.theCommonFormInfo.numberOfCopy)!''}" class="Inputhidden01" style="width: 100%;height: 100%;font-family: 楷体_GB2312" size="1" >
                </td>
                <td width="20" align="right" class="td04">份
                </td>
            </tr>
        </table>-->
    </div>
</div>
<!--第一页结束-->
<!---分页标记-->
<#--<span style="page-break-after:always;"></span>-->
</body>
</html>