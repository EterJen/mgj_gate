package com.gwideal.core.test.codegenerator;


import com.gwideal.core.common.SystemUtils;
import com.gwideal.increment.generator.IncMetaTableService;
import com.zaxxer.hikari.HikariDataSource;
import lombok.extern.slf4j.Slf4j;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceBuilder;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;

import javax.sql.DataSource;

@Slf4j
@SpringBootApplication
@ComponentScan(basePackages={"com.gwideal.**.increment"})
@MapperScan(basePackages={"com.gwideal.**.generator"})
public class CoreCodeGeneratorApplication {
	@Bean(name = "hikariDataSource")
	@Qualifier("hikariDataSource")
	@ConfigurationProperties(prefix = "spring.datasource.hikari")
	public DataSource hikariDataSource() {
		return DataSourceBuilder.create().type(HikariDataSource.class).build();
	}

	public static void main(String[] args) throws Exception {
		String outputBasePath = System.getProperty("user.dir");
		ConfigurableApplicationContext applicationContext = SpringApplication.run(CoreCodeGeneratorApplication.class, args);

//		SpringApplication app = new SpringApplication(Application.class);
//        app.setWebEnvironment(false);
//        ApplicationContext ac = app.run(args);
		log.info("\n" +
				"代码生成开始：\n" +
				"工作根路径：{}\n",outputBasePath);
		IncMetaTableService incMetaTableService = applicationContext.getBean(IncMetaTableService.class);
		incMetaTableService.runByConfigFile("myCodeGenerateConfig.json",outputBasePath);
	}



}
