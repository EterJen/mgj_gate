package com.gwideal.core.basic.l5.extend.fileoperation;


import com.gwideal.core.cms.l3.dao.AdministratorMapper;
import com.gwideal.core.common.SystemUtils;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

/**
 * Created with IntelliJ IDEA.
 * User: Eter
 * Date: 2018/1/29
 * Time: 17:49
 * Description:
 **/
@Component
public class SpringUtil implements ApplicationContextAware {
    private static ApplicationContext applicationContext = null;



    private static String headPortraitUW;
    private static String headPortraitUL;
    private static String headPortraitDW;
    private static String headPortraitDL;

    @Value("${headPortrait.uploadPath.win}")
    public void setHeadPortraitUW(String headPortraitUW) {
        SpringUtil.headPortraitUW = headPortraitUW;
    }

    @Value("${headPortrait.uploadPath.linux}")
    public void setHeadPortraitUL(String headPortraitUL) {
        SpringUtil.headPortraitUL = headPortraitUL;
    }

    @Value("${headPortrait.downloadPath.win}")
    public void setHeadPortraitDW(String headPortraitDW) {
        SpringUtil.headPortraitDW = headPortraitDW;
    }

    @Value("${headPortrait.downloadPath.linux}")
    public void setHeadPortraitDL(String headPortraitDL) {
        SpringUtil.headPortraitDL = headPortraitDL;
    }



    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        if (SpringUtil.applicationContext == null) {
            SpringUtil.applicationContext = applicationContext;
        }
        System.out.println("---------------------------------------------------------------------");
        System.out.println("---------------------------------------------------------------------");
        System.out.println("---------------com.example.order.util.SpringUtil------------------------------------------------------");
        System.out.println("========ApplicationContext配置成功,在普通类可以通过调用SpringUtils.getAppContext()获取applicationContext对象,applicationContext=" + SpringUtil.applicationContext + "========");
        System.out.println("---------------------------------------------------------------------");

    }

    //获取applicationContext
    public static ApplicationContext getApplicationContext() {
        return applicationContext;
    }

    //通过name获取 Bean.
    public static Object getBean(String name) {
        if ("rProcessInstanceMapper".equals(name)) {
            name = "RProcessInstanceMapper";
        }

        return getApplicationContext().getBean(name);

    }

    /*获取seq序列*/
    public static BigDecimal getSequence() {
        AdministratorMapper coreUserMapper = (AdministratorMapper) SpringUtil.getBean("administratorMapper");
        return coreUserMapper.getSequence();
    }

    //通过class获取Bean.
    public static <T> T getBean(Class<T> clazz) {
        return getApplicationContext().getBean(clazz);
    }

    //通过name,以及Clazz返回指定的Bean
    public static <T> T WingetBean(String name, Class<T> clazz) {
        return getApplicationContext().getBean(name, clazz);
    }

    public static String getHeadPortraitUploadPath() {
        if (SystemUtils.getPlatForm().equals(SystemUtils.Platform.Windows)) {
            return headPortraitUW;
        } else {
            return headPortraitUL;
        }
    }

    public static String getHeadPortraitDownloadPath() {
        if (SystemUtils.getPlatForm().equals(SystemUtils.Platform.Windows)) {
            return headPortraitDW;
        } else {
            return headPortraitDL;
        }
    }
}