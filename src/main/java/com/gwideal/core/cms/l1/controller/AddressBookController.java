package com.gwideal.core.cms.l1.controller;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gwideal.core.basic.l4.entity.CoreRole;
import com.gwideal.core.cms.l2.service.ChinaAddressBookService;
import com.gwideal.core.cms.l2.service.CityAddressBookDepartMentService;
import com.gwideal.core.cms.l2.service.CityAddressBookService;
import com.gwideal.core.cms.l4.entity.ChinaAddressBook;
import com.gwideal.core.cms.l4.entity.CityAddressBook;
import com.gwideal.core.cms.l4.entity.CityAddressBookDepartMent;
import com.gwideal.core.jwt.JwtUser;

@Controller
@RequestMapping({"/addressBook","/page/addressBook"})
public class AddressBookController {
    
	@Autowired
	CityAddressBookDepartMentService cityAddressBookDepartMentService;
	
	@Autowired
	CityAddressBookService cityAddressBookService;
	
	@Autowired
	ChinaAddressBookService chinaAddressBookService;
	
//    @Value("${jyjgl.url}")
    String jyjglurl;
	
    @RequestMapping(value = {"/"})
    public String index(ModelMap map) {
    	
    	CityAddressBookDepartMent queryBean=new CityAddressBookDepartMent();
		queryBean.setPaging("No");
		
		CityAddressBook queryBean1=new CityAddressBook();
		queryBean1.setPaging("No");
		
		List<CityAddressBookDepartMent> list=cityAddressBookDepartMentService.list(queryBean).getBeanList();
		List<CityAddressBook> booklist=cityAddressBookService.list(queryBean1).getBeanList();
		Map<BigDecimal,CityAddressBookDepartMent> departMap=new HashMap<BigDecimal,CityAddressBookDepartMent>();
		for(CityAddressBookDepartMent depart:list)
		{
			departMap.put(depart.getId(),depart);
		}
		
		for(CityAddressBook book:booklist)
		{
			CityAddressBookDepartMent depart=departMap.get(book.getDepartmentid());
			if (depart != null) {
				if (StringUtils.isNotBlank(book.getName())) {
					depart.getBookList().add(book);
				}
			}
		}
		
		TreeMap<Integer,CityAddressBookDepartMent> treemap=new TreeMap<Integer,CityAddressBookDepartMent>();
		for(CityAddressBookDepartMent depart:list)
		{
			treemap.put(depart.getOrderno(), depart);
		}
		map.put("treemap", treemap);
		
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) currentUser;
        JwtUser jwtUser = (JwtUser) token.getPrincipal();
        List<CoreRole> roles=cityAddressBookService.queryUserRoles(jwtUser.getCoreUser());
		boolean isTxlMgr=false;
        for(CoreRole role:roles)
		{
        	if("通讯录管理员".endsWith(role.getName()))
        		isTxlMgr=true;
		}
        map.put("isTxlMgr", isTxlMgr);
        
		
		
    	return "addressBook/index";
    }
    
	@RequestMapping(value = {"/city"})
	public String city(ModelMap map) {
		
		
		return "addressBook/city";
	}
	
	@RequestMapping(value = {"/district"})
	public String district(ModelMap map) {
		map.put("jyjglurl", jyjglurl);
		return "addressBook/district";
	}
	
	@RequestMapping(value = {"/unit"})
	public String unit(ModelMap map) {
		map.put("jyjglurl", jyjglurl);
		return "addressBook/unit";
	}
	
	@RequestMapping(value = {"/china"})
	public String china(ModelMap map) {
		
		List<ChinaAddressBook> books=chinaAddressBookService.list(new ChinaAddressBook()).getBeanList();
		ChinaAddressBook book=new ChinaAddressBook();
		if(books.size()>0)
		{
			book=books.get(0);
		}
		map.put("book", book);
		return "addressBook/china";
	}
	
}
