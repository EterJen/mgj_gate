package com.gwideal.core.startup;

import org.apache.cxf.jaxws.endpoint.dynamic.JaxWsDynamicClientFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author 18800
 * @date 2019/3/7 18:38
 */
@Configuration
public class WebServiceConfig {

	@Bean
	public JaxWsDynamicClientFactory jaxWsDynamicClientFactory() {
		return JaxWsDynamicClientFactory.newInstance();
	}

}
