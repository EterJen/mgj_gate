package com.gwideal.core.startup;

import com.gwideal.core.common.SystemUtils;
import com.gwideal.core.sm.sm4.handler.SM4Handler;
import com.gwideal.core.startup.servlet.CorseTools;
import com.gwideal.core.util.SignUtils;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceBuilder;
import org.springframework.boot.context.embedded.ConfigurableEmbeddedServletContainer;
import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.boot.web.support.ErrorPageFilter;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.*;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;
import per.eter.utils.http.RequestTemplate;
import per.eter.web.beanconfig.SslRestTemplateConfig;

import javax.annotation.Resource;
import javax.servlet.MultipartConfigElement;
import javax.sql.DataSource;
import java.io.File;


@SpringBootApplication
@ComponentScan(basePackages = {"com.gwideal","per.eter"})
@ImportResource(locations = {"classpath:coreApplicationContext.xml"})
@MapperScan(basePackages = {"com.gwideal"})
//@EnableCaching
@ServletComponentScan(basePackages="com.gwideal.core.startup.filter")
public class GwCoreProjectApplication{
    @Resource
    RedisConfig redisConfig;

    @Bean
    @Primary
    public RestTemplate restTemplate() {
        SslRestTemplateConfig sslRestTemplateConfig = new SslRestTemplateConfig();
        RestTemplate restTemplate = sslRestTemplateConfig.restTemplate();
        return restTemplate;
    }

    @Resource
    private CorseTools corseTools;

    @Bean
    public SM4Handler sm4Handler() {
        return new JYJSm4EcbPadding();
    }

    @Bean
    public ErrorPageFilter errorPageFilter() {
        return new ErrorPageFilter();
    }

    @Bean
    public FilterRegistrationBean disableSpringBootErrorFilter(ErrorPageFilter filter) {
        FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean();
        filterRegistrationBean.setFilter(filter);
        filterRegistrationBean.setEnabled(false);
        return filterRegistrationBean;
    }


    @Bean(name = "hikariDataSource")
    @Qualifier("hikariDataSource")
    @ConfigurationProperties(prefix = "spring.datasource.hikari")
    public DataSource hikariDataSource() {
        return DataSourceBuilder.create().type(com.zaxxer.hikari.HikariDataSource.class).build();
    }

    /**
     * 文件上传临时路径
     */
//    @Bean
    MultipartConfigElement multipartConfigElement() {
        MultipartConfigFactory factory = new MultipartConfigFactory();
        String location = System.getProperty("user.dir") + "/data/tmp";
        File tmpFile = new File(location);
        if (!tmpFile.exists()) {
            tmpFile.mkdirs();
        }
        factory.setLocation(location);
        return factory.createMultipartConfig();
    }

    @Bean
    RequestTemplate requestTemplate() {
        return new RequestTemplate();
    }


    /*session  生命周期配置*/
/*
    @Bean
    public EmbeddedServletContainerCustomizer containerCustomizer() {
        return new EmbeddedServletContainerCustomizer() {
            @Override
            public void customize(ConfigurableEmbeddedServletContainer container) {
                container.setSessionTimeout(9999);//单位为S
            }
        };
    }
*/




    public static void main(String[] args) throws Exception {
        System.out.println("参数的长度：" + args.length);
        String profile = "dev";//默认是dev
        if (args != null) {
            for (String arg : args) {
                if (arg.startsWith("profile")) {
                    String[] split = arg.split("=");
                    profile = split[1];
                    System.out.println("系统的启动模式是：" + profile);
                }
            }
        }
        System.out.println("===========os.name:" + System.getProperties().getProperty("os.name"));
        SpringApplication app = new SpringApplication(GwCoreProjectApplication.class);
        app.setDefaultProperties(SystemUtils.getPropertiesByProfile(profile));
        ApplicationContext applicationContext = app.run(args);
        /*
        RProcessInstanceService rProcessInstanceService = applicationContext.getBean(RProcessInstanceService.class);*/

        //初始化表到实体的映射关系
        /*IncGeneratorConfig incGeneratorConfig = JsonUtils.readByClass("codeGenerateConfig.json",IncGeneratorConfig.class);
		for(IncMetaPackage mp: incGeneratorConfig.getMetaPackageList()){
			for(IncMetaTable mt:mp.getMetaTableConfigs()){
				CoreBaseEntity.tableToEntityMap.put(mt.getTableName(), mp.getPackageNameBase()+".l4.entity."+mt.getEntityName());
			}
		}
		rProcessInstanceService.initProcessDef();*/


    }
}
