package com.gwideal.core.test.common;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@Transactional
public class TestInitService {

	@Autowired
	TestInitMapper testInitMapper;  
	
	public void cleardb(){
		testInitMapper.cleardb();
	}
	
	public void addInitInfo(){
		testInitMapper.addInitInfo();
	}
	
}
