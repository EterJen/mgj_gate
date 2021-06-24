package com.gwideal.core.startup;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * Created by moye on 2018/8/30
 * cors 配置
 */
@Configuration
public class MyWebAppConfigurer extends WebMvcConfigurerAdapter {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**/cors/**") /*放行资源*/
//                .allowedOrigins("http://192.168.1.97")  /*放行主机*/
                .allowedMethods("GET", "POST")
                .allowCredentials(false).maxAge(3600);
    }
}
