package com.gwideal.core.startup;

import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;

/**
 * 修改启动类，继承 SpringBootServletInitializer 并重写 configure 方法
*/
public class SpringBootStartApplication extends SpringBootServletInitializer{
	@Override
	  protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
	    // 注意这里要指向原先用main方法执行的Application启动类
		String property = System.getProperty("file.separator");
		System.out.println("系统的启动模式是property："+property);
	    return builder.sources(GwCoreProjectApplication.class);
	  }
}
