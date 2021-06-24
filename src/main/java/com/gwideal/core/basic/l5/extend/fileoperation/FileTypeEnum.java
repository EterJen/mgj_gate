package com.gwideal.core.basic.l5.extend.fileoperation;


import com.gwideal.core.basic.l5.extend.fileoperation.operation.IOperation;
import com.gwideal.core.basic.l5.extend.fileoperation.operation.impl.HeadPortraitImpl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public enum FileTypeEnum {
    HeadPortrait("HeadPortrait",SpringUtil.getHeadPortraitUploadPath(), SpringUtil.getHeadPortraitDownloadPath(), new HeadPortraitImpl());

    private String fileType;
    private String uploadPath;
    private String downloadPath;
    private IOperation operation;
    private static Map<String, FileTypeEnum> fileTypeEnumMap = new HashMap<>();

    static {
        for (FileTypeEnum FileTypeEnum : FileTypeEnum.values()) {
            fileTypeEnumMap.put(FileTypeEnum.getFileType(), FileTypeEnum);
        }
    }

    /**
     * 私有化构造函数
     */
    FileTypeEnum(String fileType, String uploadPath, String downloadPath, IOperation operation) {
        this.fileType = fileType;
        this.uploadPath = uploadPath;
        this.downloadPath = downloadPath;
        this.operation = operation;
    }

    /**
     * @return
     * @Description: 依据fileType获取枚举
     */
    public static FileTypeEnum getEnumByFileType(String fileType) {
        return fileTypeEnumMap.get(fileType);
    }


    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public String getUploadPath() {
        return uploadPath;
    }

    public void setUploadPath(String uploadPath) {
        this.uploadPath = uploadPath;
    }

    public String getDownloadPath() {
        return downloadPath;
    }

    public void setDownloadPath(String downloadPath) {
        this.downloadPath = downloadPath;
    }

    public IOperation getOperation() {
        return operation;
    }

    public void setOperation(IOperation operation) {
        this.operation = operation;
    }

    public static List<FileTypeEnum> getFileTypeLists() {
        List<FileTypeEnum> fileTypeEnums = new ArrayList<>();
        fileTypeEnumMap.forEach(((k, v) -> fileTypeEnums.add(v)));
        return fileTypeEnums;
    }
}
