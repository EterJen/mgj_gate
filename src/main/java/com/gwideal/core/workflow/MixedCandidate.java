package com.gwideal.core.workflow;

import java.util.ArrayList;

/*用于配置流程可选参与者 类型 为混合类型时的 参与者列表*/
public class MixedCandidate {
    private String candidateType; //D P R U 参与者类型
    private String candidateTypec; //D P R U 参与者类型
    private String candidateId; //参与者id
    private String candidateName; //参与者名字

    //任务接收者可选择方案 candidateSelf candidateSonNodes both 默认both
    private String taskRecipientChoseScheme;

    /*任务流转对象选择方案*/
    /* candidateSelf candidateSonNodes both 默认candidateSelf*/
    private String taskTransformChoseScheme;


    /*任务流转 执行方案*/
    /*默认值 ttfsNormal*/
    private String taskTransformScheme;
    /*任务流转 执行java方法表达式 因为任务流转中存在特殊处理方式 如“长城电子发文”流程中,流转至专职核稿时,
    如果专职核稿角色没有人,则跳过专职核稿阶段，并将任务流给下阶段的处长（刘益平）*/
    /*默认值 */
    private String taskTransformExec;


    private ArrayList<String> positionPath;//确保节点有序 快速定位取代循环检索

    public String getCandidateType() {
        return candidateType;
    }

    public void setCandidateType(String candidateType) {
        this.candidateType = candidateType;
    }

    public String getCandidateId() {
        return candidateId;
    }

    public void setCandidateId(String candidateId) {
        this.candidateId = candidateId;
    }

    public String getCandidateName() {
        return candidateName;
    }

    public void setCandidateName(String candidateName) {
        this.candidateName = candidateName;
    }

    public String getTaskRecipientChoseScheme() {
        return taskRecipientChoseScheme;
    }

    public void setTaskRecipientChoseScheme(String taskRecipientChoseScheme) {
        this.taskRecipientChoseScheme = taskRecipientChoseScheme;
    }

    public String getTaskTransformScheme() {
        return taskTransformScheme;
    }

    public void setTaskTransformScheme(String taskTransformScheme) {
        this.taskTransformScheme = taskTransformScheme;
    }

    public ArrayList<String> getPositionPath() {
        return positionPath;
    }

    public void setPositionPath(ArrayList<String> positionPath) {
        this.positionPath = positionPath;
    }

    public String getCandidateTypec() {
        return candidateTypec;
    }

    public void setCandidateTypec(String candidateTypec) {
        this.candidateTypec = candidateTypec;
    }

    public String getTaskTransformExec() {
        return taskTransformExec;
    }

    public void setTaskTransformExec(String taskTransformExec) {
        this.taskTransformExec = taskTransformExec;
    }
}
