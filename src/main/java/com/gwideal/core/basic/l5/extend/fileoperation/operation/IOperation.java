package com.gwideal.core.basic.l5.extend.fileoperation.operation;

import com.gwideal.mybatis.metautils.ResultInfo;
import org.springframework.web.multipart.MultipartFile;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 2018/1/29
 * Time: 13:41
 * Description:
 **/
public interface IOperation {
    boolean beforeUpload(ResultInfo<String> resultInfo, MultipartFile file);
    void afterUpload(ResultInfo<String> result, String selectedBean, String fileName);
}