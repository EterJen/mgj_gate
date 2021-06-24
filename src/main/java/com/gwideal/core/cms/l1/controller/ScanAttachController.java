package com.gwideal.core.cms.l1.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gwideal.core.basic.l2.service.DicTypeService;
import com.gwideal.core.basic.l4.entity.DicType;
import com.gwideal.core.jwt.JwtUser;
import com.gwideal.mybatis.metautils.ResultInfo;

@Controller
@RequestMapping("/scanAttach")
public class ScanAttachController {
	
	@Autowired
	DicTypeService dicTypeService;
	
	private String getCookieValue(HttpServletRequest request,String cookieName)
	{
		String cookieValue=null;
		Cookie[] cookies = request.getCookies();//这样便可以获取一个cookie数组
		for(Cookie cookie : cookies){
			if(cookieName.equals(cookie.getName()))
			{
				cookieValue=cookie.getValue();
				break;
			}
		}
		return cookieValue;
	}
	
	@RequestMapping(value = {"/"})
	public String index(HttpServletRequest request,ModelMap map,String saveurl,String format) {
		//map.put("currentUser", getCoreUser());
		map.put("netScan", dicTypeService.getDicTypesByDicModeName("网络扫描仪").getBeanList());
		map.put("scantype",getCookieValue(request,"scantype"));
		map.put("saveurl",saveurl);
		List<String> formats=new ArrayList<String>();
		if(StringUtils.isNotEmpty(format))
		{
			formats=Arrays.asList(format.split(","));
		}
		else
		{
			formats.add(".pdf");
			formats.add(".ofd");
		}
		map.put("formats",formats);	
		
		System.out.println("saveurl====="+saveurl);
		return "scanAttach/index";
		//scanAttach/index_1.2.0.ftl  适配sdk1.2.0
		//scanAttach/index.ftl  适配sdk2.2.1
		
	}
	

}
