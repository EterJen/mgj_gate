package com.gwideal.core.test.codegenerator;


import com.gwideal.core.common.SystemUtils;
import org.junit.runner.RunWith;
import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.support.GenericApplicationContext;
import org.springframework.core.env.MutablePropertySources;
import org.springframework.core.env.PropertiesPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.IOException;

@RunWith(SpringRunner.class)
public class TestContextInitializor implements ApplicationContextInitializer<GenericApplicationContext>{

	
	@Override
	public void initialize(GenericApplicationContext applicationContext) {
		MutablePropertySources sources = applicationContext.getEnvironment().getPropertySources();
    	try {
			sources.addLast(new PropertiesPropertySource("defaultProperties",SystemUtils.getPropertiesByProfile("test")));
		} catch (IOException e) {
			e.printStackTrace();
		}
	};
	
}
