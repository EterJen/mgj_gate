package com.gwideal.core.workflow;

/*用于配置流程可选参与者 类型 为混合类型时的 参与者列表*/
public class MixedCandidateList {
    /*全局参与者选择方案 Multiple(可多选) Exclusive(单选)  默认值:Multiple*/
    private String candidateChoseType;

    //任务接收者选择方案 candidateSelf candidateSonNodes both 默认both
    private String taskRecipientChoseScheme;

    //任务流转方案 TfCdDelOldTask: 流转给参与者自身并删除原来任务
    //在任务流转时 同时存储到代办任务表中 以便后续对该任务进行特殊处理（如角色下的单一用户接收，替换本条任务）
    //TfCd: 流转给参与者自身不删除原来任务
    //TfChildrenDelOldTask: 流转给所有孩子并删除原来任务
    //TfChildDelOldTask: 流转给某个孩子并删除原来任务
    //TfChildren: 流转给所有孩子不删除原来任务

    /*任务流转 执行方案*/
    /*默认值 ttfsNormal*/
    private String taskTransformScheme;
    /*任务流转 执行java方法表达式 因为任务流转中存在特殊处理方式 如“长城电子发文”流程中,流转至专职核稿时,
    如果专职核稿角色没有人,则跳过专职核稿阶段，并将任务流给下阶段的处长（刘益平）*/
    /*默认值 */
    private String taskTransformExec;


}
