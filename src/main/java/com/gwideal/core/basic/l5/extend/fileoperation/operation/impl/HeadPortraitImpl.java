package com.gwideal.core.basic.l5.extend.fileoperation.operation.impl;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gwideal.core.basic.l5.extend.fileoperation.FileOperationController;
import com.gwideal.core.basic.l5.extend.fileoperation.FileTypeEnum;
import com.gwideal.core.basic.l5.extend.fileoperation.SpringUtil;
import com.gwideal.core.basic.l5.extend.fileoperation.operation.IOperation;
import com.gwideal.core.cms.l3.dao.AdministratorMapper;
import com.gwideal.core.cms.l4.entity.Administrator;
import com.gwideal.mybatis.metautils.ResultInfo;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 2018/1/29
 * Time: 13:47
 * Description:
 **/

public class HeadPortraitImpl implements IOperation {


    @Override
    public boolean beforeUpload(ResultInfo<String> resultInfo, MultipartFile file) {
        return true;
    }

    @Override
    public void afterUpload(ResultInfo<String> result, String selectedBean, String fileName) {
        ObjectMapper mapper = new ObjectMapper();

        Administrator user = null;
        try {
            mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            user = mapper.readValue(selectedBean, Administrator.class);
        } catch (IOException e) {
            e.printStackTrace();
        }

        if (null != user) {
            int dbResult = -1;

            AdministratorMapper coreUserMapper = (AdministratorMapper) SpringUtil.getBean("coreUserMapper");


            //user.setPhotofilePath(fileName);
            if (null == user.getId()) {
                dbResult = coreUserMapper.insert(user);
            } else {
                dbResult = coreUserMapper.updateByPrimaryKeySelective(user);
            }


            if (dbResult > 0) {
                result.setBean(FileOperationController.fileMapping(FileTypeEnum.HeadPortrait, fileName));
                result.setBeanId(user.getId());
                result.setResultType("success");
                result.setMessage(result.getMessage() + "->更新表字段成功");
            } else {
                result.setResultType("fail");
                result.setMessage(result.getMessage() + "->更新表字段失败");
            }
        }
    }
}