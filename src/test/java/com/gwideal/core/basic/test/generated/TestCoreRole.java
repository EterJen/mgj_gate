package com.gwideal.core.basic.test.generated;

import static org.junit.Assert.assertEquals;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.gwideal.core.basic.l4.entity.*;

import static org.junit.Assert.assertEquals;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.io.UnsupportedEncodingException;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.core.JsonProcessingException;

import com.gwideal.core.common.TokenResult;
import com.gwideal.core.jwt.JwtAuthenticationRequest;
import com.gwideal.core.startup.GwCoreProjectApplication;
import com.gwideal.core.test.codegenerator.TestContextInitializor;
import com.gwideal.core.test.common.TestInitService;
import com.gwideal.core.test.common.TestUtils;
import com.gwideal.mybatis.metautils.JsonUtils;
import com.gwideal.mybatis.metautils.ResultInfo;
import java.math.BigDecimal;

@RunWith(SpringRunner.class)
@SpringBootTest(classes=GwCoreProjectApplication.class,webEnvironment=WebEnvironment.MOCK)
@WebAppConfiguration 
@ContextConfiguration(initializers={TestContextInitializor.class}) 
public class TestCoreRole {


	
	@Autowired  
    WebApplicationContext WebApplicationContext;  
	
	@Autowired
	TestInitService testInitService;
	
	@Autowired
	TestUtils testUtils;
	
	private MockMvc mockMvc;
	
	String resultJson = null;
	String unittestTokenStr = null;
	ResultInfo<CoreRole> resultInfo = null;
	CoreRole initBean = null;
	CoreRole createdBean = null;
	CoreRole updatedBean = null;
	BigDecimal createdBeanId = null;
	List<CoreRole> beanList = null;
	
	
	@Before
	public void setUpEnv() throws UnsupportedEncodingException, JsonProcessingException, Exception{
		testInitService.cleardb();
		testInitService.addInitInfo();
		mockMvc = MockMvcBuilders.webAppContextSetup(WebApplicationContext).apply(springSecurity()).build();  
		loginUser();
		
	}

	public void loginUser() throws UnsupportedEncodingException, JsonProcessingException, Exception{
		JwtAuthenticationRequest loginRequest = new JwtAuthenticationRequest("admin","testPassword");
		resultJson = 
				mockMvc.perform(post("/auth").contentType(MediaType.APPLICATION_JSON).content(JsonUtils.writeAsFlatJson(loginRequest)))
    			.andExpect(status().isOk()).andReturn().getResponse().getContentAsString();
		System.out.println(resultJson);
		TokenResult unittestToken = JsonUtils.readByJsonStrAndClass(resultJson, TokenResult.class);
		unittestTokenStr = unittestToken.getToken();
	}
	
	
	
	@Test
	public void testCrud() throws Exception{
		//????????????:?????????
		resultInfo = testUtils.request("/coreRole/init?initType=create", JsonUtils.emptyJson,CoreRole.class, unittestTokenStr, mockMvc);
		initBean = resultInfo.getBean();
		
		//????????????????????????????????????
		testUtils.setInitValues(initBean,new String[]{"id"});
		resultInfo = testUtils.request("/coreRole/create", JsonUtils.writeAsFlatJson(initBean),CoreRole.class, unittestTokenStr, mockMvc);
		createdBeanId = resultInfo.getBeanId();
		initBean.setId(createdBeanId);
		
		//???????????????
		resultInfo = testUtils.request("/coreRole/read/"+createdBeanId, JsonUtils.emptyJson, CoreRole.class, unittestTokenStr, mockMvc);
		createdBean = resultInfo.getBean();
		testUtils.checkValues(initBean, createdBean, new String[]{});
		
		//??????bean????????????????????????
		testUtils.setInitValues(createdBean,new String[]{"id"});
		resultInfo = testUtils.request("/coreRole/update", JsonUtils.writeAsFlatJson(createdBean), CoreRole.class, unittestTokenStr, mockMvc);
		
		//???????????????????????????????????????????????????
		resultInfo = testUtils.request("/coreRole/read/"+createdBeanId, JsonUtils.emptyJson, CoreRole.class, unittestTokenStr, mockMvc);
		updatedBean = resultInfo.getBean();
		testUtils.checkValues(createdBean,updatedBean,new String[]{});
		
		//??????queryBean
		resultInfo = testUtils.request("/coreRole/init?initType=query", JsonUtils.emptyJson,CoreRole.class, unittestTokenStr, mockMvc);
		CoreRole queryBean = resultInfo.getBean();
		queryBean.setId(updatedBean.getId());
		resultInfo = testUtils.request("/coreRole/list", JsonUtils.writeAsFlatJson(queryBean), CoreRole.class, unittestTokenStr, mockMvc);
		assertEquals(1,resultInfo.getBeanList().size());
		assertEquals(1,resultInfo.getTotalRows().longValue());
		testUtils.checkValues(updatedBean,resultInfo.getBeanList().get(0),new String[]{});
		
		//??????
		resultInfo = testUtils.request("/coreRole/delete/"+createdBeanId, JsonUtils.emptyJson, CoreRole.class, unittestTokenStr, mockMvc);
		
		//???????????????
		resultInfo = testUtils.request("/coreRole/read/"+createdBeanId, JsonUtils.emptyJson, CoreRole.class, unittestTokenStr, mockMvc);
		assertEquals(null,resultInfo.getBean());
		
	}
	
}






