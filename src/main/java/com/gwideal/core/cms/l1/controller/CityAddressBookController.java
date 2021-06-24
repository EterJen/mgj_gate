package com.gwideal.core.cms.l1.controller;

import java.beans.IntrospectionException;
import java.beans.PropertyDescriptor;
import java.io.IOException;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import javax.servlet.http.HttpServletResponse;
import javax.validation.groups.Default;

import com.gwideal.core.cms.l4.entity.Comform;
import com.gwideal.core.jwt.JwtUser;
import com.gwideal.mybatis.metautils.ResultInfo;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.time.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.gwideal.core.cms.l2.service.CityAddressBookDepartMentService;
import com.gwideal.core.cms.l2.service.CityAddressBookMergeService;
import com.gwideal.core.cms.l2.service.CityAddressBookService;
import com.gwideal.core.cms.l3.dao.CityAddressBookMapper;
import com.gwideal.core.cms.l4.entity.CityAddressBook;
import com.gwideal.core.cms.l4.entity.CityAddressBookDepartMent;
import com.gwideal.core.cms.l4.entity.CityAddressBookMerge;
import com.gwideal.core.util.ExportPdfUtils;
import com.gwideal.core.util.PdfHelper;
import com.lowagie.text.DocumentException;

import freemarker.core.ParseException;
import freemarker.template.MalformedTemplateNameException;
import freemarker.template.TemplateException;
import freemarker.template.TemplateNotFoundException;

@Controller
@RequestMapping("/cityAddressBook")
public class CityAddressBookController {

	@Autowired
	CityAddressBookDepartMentService cityAddressBookDepartMentService;
	
	@Autowired
	CityAddressBookService cityAddressBookService;
	
	@Autowired
	CityAddressBookMergeService cityAddressBookMergeService;
	
	
	private void getData(Map map)
	{
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
		
		
		CityAddressBookMerge queryBean2=new CityAddressBookMerge();
		queryBean2.setPaging("No");
		List<CityAddressBookMerge> list1=cityAddressBookMergeService.list(queryBean2).getBeanList();
		Map<String,CityAddressBookMerge> mergeMap=new HashMap<String,CityAddressBookMerge>();
		for(CityAddressBookMerge bookMerge:list1)
		{
			mergeMap.put(bookMerge.getBookid()+"_"+bookMerge.getColumnname(),bookMerge);
		}
		
		for(CityAddressBook book:booklist)
		{
			CityAddressBookDepartMent depart=departMap.get(book.getDepartmentid());
			if(depart!=null)
				depart.getBookList().add(book);
		}
		
		TreeMap<Integer,CityAddressBookDepartMent> treemap=new TreeMap<Integer,CityAddressBookDepartMent>();
		for(CityAddressBookDepartMent depart:list)
		{
			if(depart.getBookList().size()>1)
			{
				//above内容相同 实现列合并
				for(int i=1;i<depart.getBookList().size();i++)
				{
					CityAddressBook now=depart.getBookList().get(i);
					
					String[] propertys=new String[]{"name","address","room","extension","redphone","mobile","directline"};
					for(int j=0;j<propertys.length;j++)
					{
						CityAddressBookMerge bookMergeNow=null;
						if(mergeMap.containsKey(now.getId()+"_"+propertys[j]))
							bookMergeNow=mergeMap.get(now.getId()+"_"+propertys[j]);
						
						for(int k=i-1;k>=0;k--)
						{
							CityAddressBook last=depart.getBookList().get(k);
							CityAddressBookMerge bookMergeLast=null;
							if(mergeMap.containsKey(last.getId()+"_"+propertys[j]))
								bookMergeLast=mergeMap.get(now.getId()+"_"+propertys[j]);
							try {
								PropertyDescriptor pd = new PropertyDescriptor(propertys[j], CityAddressBook.class);
								String nowValue = (String)pd.getReadMethod().invoke(now);
								String lastValue = (String)pd.getReadMethod().invoke(last);
								
								if(StringUtils.isEmpty(lastValue) && bookMergeNow!=null && bookMergeNow.getAboveblank()!=null  )
								{
									if(last.getDisplayMap().containsKey(propertys[j]) &&  "none".equals(last.getDisplayMap().get(propertys[j])))
										continue;
									else
									{
										now.getDisplayMap().put(propertys[j], "none");
										Integer rowspan=1;
										if(last.getRowspanMap().containsKey(propertys[j]))
										{
											rowspan=(Integer)last.getRowspanMap().get(propertys[j]);
										}
										last.getRowspanMap().put(propertys[j], rowspan+1);
									}
									
									if(bookMergeLast==null ||  bookMergeLast.getAboveblank()==null)
										break;
								}
								/* 暂时有逻辑问题没实现
								else if(bookMergeNow!=null && bookMergeNow.getAbove())
								{
									
								}*/
								else if(StringUtils.isEmpty(nowValue) || !nowValue.equals(lastValue))
								{
									break;
								}
								else if(nowValue.equals(lastValue))
								{
									if(last.getDisplayMap().containsKey(propertys[j]) &&  "none".equals(last.getDisplayMap().get(propertys[j])))
										continue;
									else
									{
										now.getDisplayMap().put(propertys[j], "none");
										Integer rowspan=1;
										if(last.getRowspanMap().containsKey(propertys[j]))
										{
											rowspan=(Integer)last.getRowspanMap().get(propertys[j]);
										}
										last.getRowspanMap().put(propertys[j], rowspan+1);
									}
								}
							} catch (Exception e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							}
						}
					}
				}
				//实现合并左侧单元格
				for(int i=0;i<depart.getBookList().size();i++)
				{
					CityAddressBook now=depart.getBookList().get(i);
					String[] propertys=new String[]{"name","address","room","extension","redphone","mobile","directline"};
					for(int j=propertys.length-1;j>0;j--)
					{
						CityAddressBookMerge bookMergeNow=null;
						if(mergeMap.containsKey(now.getId()+"_"+propertys[j]))
							bookMergeNow=mergeMap.get(now.getId()+"_"+propertys[j]);
						
						try {
							PropertyDescriptor pd = new PropertyDescriptor(propertys[j], CityAddressBook.class);
							String nowValue = (String)pd.getReadMethod().invoke(now);
							for(int k=j-1;k>=0;k--)
							{
								CityAddressBookMerge bookMergeLeft=null;
								if(mergeMap.containsKey(now.getId()+"_"+propertys[k]))
									bookMergeLeft=mergeMap.get(now.getId()+"_"+propertys[k]);
								
								PropertyDescriptor pd_left = new PropertyDescriptor(propertys[k], CityAddressBook.class);
								String leftValue = (String)pd_left.getReadMethod().invoke(now);
								
								if(StringUtils.isEmpty(leftValue) && bookMergeNow!=null && bookMergeNow.getLeftblank()!=null )
								{
									if(now.getDisplayMap().containsKey(propertys[k]) &&  "none".equals(now.getDisplayMap().get(propertys[k])))
										continue;
									else
									{
										now.getDisplayMap().put(propertys[k], "none");
										Integer colspan=1;
										if(now.getColspanMap().containsKey(propertys[j]))
										{
											colspan=(Integer)now.getColspanMap().get(propertys[j]);
										}
										now.getColspanMap().put(propertys[j], colspan+1);
									}

									if(bookMergeLeft==null ||  bookMergeLeft.getLeftblank()==null)
										break;
								}
							}
							
						} catch (Exception e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					}
				}
			}
			//非常规空白合并
			treemap.put(depart.getOrderno(), depart);
		}
		map.put("treemap", treemap);
		
	}
	
	
	@RequestMapping("/")
	public String index(ModelMap map) {
		getData(map);
		return "cityAddressBook/index";
	}
	
	@RequestMapping("/editDepart")
	public String editDepart(ModelMap map,BigDecimal departid) {
		CityAddressBookDepartMent depart=new CityAddressBookDepartMent();
		if(departid!=null)
		{
			depart=cityAddressBookDepartMentService.read(departid);
		}
		map.put("depart", depart);
		return "cityAddressBook/editDepart";
	}
	
	@ResponseBody
	@RequestMapping(value="/saveDepart")
	//@RequestBody Map map,
	public JSONObject saveDepart(@RequestBody CityAddressBookDepartMent depart) {
		JSONObject object=new JSONObject();
		object.put("message", "AAA");
		if(depart.getId()==null)
			cityAddressBookDepartMentService.create(depart);
		else
			cityAddressBookDepartMentService.update(depart);
		object.put("departid", depart.getId());
		return object;
	}
	
	@ResponseBody
	@RequestMapping(value="/checkDeleteDepart")
	public JSONObject checkDeleteDepart(BigDecimal departid) {
		JSONObject object=new JSONObject();
		CityAddressBook queryBean1=new CityAddressBook();
		queryBean1.setDepartmentid(departid);
		queryBean1.setPaging("No");
		List<CityAddressBook> booklist=cityAddressBookService.list(queryBean1).getBeanList();
		if(booklist.size()>0)
		{
			object.put("message", "error");
		}
		else
		{
			object.put("message", "ok");
		}
		return object;
	}
	
	@ResponseBody
	@RequestMapping(value="/deleteDepart")
	public JSONObject deleteDepart(@RequestBody CityAddressBookDepartMent depart) {
		JSONObject object=new JSONObject();
		
		if(depart.getId()!=null)
		    cityAddressBookDepartMentService.delete(depart.getId());
		
		object.put("message", "AAA");
		return object;
	}
	
	@RequestMapping("/editUser")
	public String editUser(ModelMap map,BigDecimal userid) {
		CityAddressBook user=new CityAddressBook();
		if(userid!=null)
		{
			user=cityAddressBookService.read(userid);
		}
		CityAddressBookDepartMent queryBean=new CityAddressBookDepartMent();
		queryBean.setPaging("No");
		List<CityAddressBookDepartMent> selectlist=cityAddressBookDepartMentService.selectlist(queryBean).getBeanList();
		
		if(userid!=null)
		{
			CityAddressBookMerge queryBean1=new CityAddressBookMerge();
			queryBean1.setPaging("No");
			queryBean1.setBookid(userid);
			List<CityAddressBookMerge> list1=cityAddressBookMergeService.list(queryBean1).getBeanList();
			Map mergeMap=new HashMap();
			for(CityAddressBookMerge cityAddressBookMerge:list1)
			{
				mergeMap.put(cityAddressBookMerge.getColumnname()+"_left", cityAddressBookMerge.getLeft());
				mergeMap.put(cityAddressBookMerge.getColumnname()+"_leftblank", cityAddressBookMerge.getLeftblank());
				mergeMap.put(cityAddressBookMerge.getColumnname()+"_above", cityAddressBookMerge.getAbove());
				mergeMap.put(cityAddressBookMerge.getColumnname()+"_aboveblank", cityAddressBookMerge.getAboveblank());
			}
			map.put("mergeMap", mergeMap);
		}
		else
			map.put("mergeMap", new HashMap());
	
		
		
		
		map.put("user", user);
		map.put("selectlist", selectlist);
		return "cityAddressBook/editUser";
	}
	
	@ResponseBody
	@RequestMapping("/saveUser")
	public JSONObject saveUser(String json,String[] nameArray,String[] addressArray,String[] roomArray,String[] extensionArray,String[] redphoneArray,String[] mobileArray,String[] directlineArray) {
		//CityAddressBook user=(CityAddressBook)JSONObject.toBean(jsonObject, CityAddressBook.class);
		CityAddressBook user=JSON.parseObject(json, new TypeReference<CityAddressBook>() {});
		
		
		
		
		
		JSONObject object=new JSONObject();
		object.put("message", "AAA");
		
		if(user!=null && user.getId()==null)
		   cityAddressBookService.create(user);
		else
		   cityAddressBookService.update(user);
		
		if(nameArray!=null)
		{
			saveColumnMerge(user.getId(), nameArray, "name");
		}
		if(addressArray!=null)
		{
			saveColumnMerge(user.getId(), addressArray, "address");
		}
		if(roomArray!=null)
		{
			saveColumnMerge(user.getId(), roomArray, "room");
		}
		if(extensionArray!=null)
		{
			saveColumnMerge(user.getId(), extensionArray, "extension");
		}
		if(redphoneArray!=null)
		{
			saveColumnMerge(user.getId(), redphoneArray, "redphone");
		}
		if(mobileArray!=null)
		{
			saveColumnMerge(user.getId(), mobileArray, "mobile");
		}
		if(directlineArray!=null)
		{
			saveColumnMerge(user.getId(), directlineArray, "directline");
		}
		object.put("userid", user.getId());
		//cityAddressBookService.create(book);
		return object;
	}
	
	private void saveColumnMerge(BigDecimal bookid,String[] array,String colummname)
	{
		cityAddressBookMergeService.deleteByBookidAndColumn(bookid, colummname);
		if(array.length>0)
		{
			List arrays=Arrays.asList(array);
			CityAddressBookMerge  cityAddressBookMerge=new CityAddressBookMerge();
			cityAddressBookMerge.setBookid(bookid);
			cityAddressBookMerge.setColumnname(colummname);
			if(arrays.contains("left"))
				cityAddressBookMerge.setLeft(true);
			if(arrays.contains("leftblank"))
				cityAddressBookMerge.setLeftblank(true);
			if(arrays.contains("above"))
				cityAddressBookMerge.setAbove(true);
			if(arrays.contains("aboveblank"))
				cityAddressBookMerge.setAboveblank(true);
			cityAddressBookMergeService.create(cityAddressBookMerge);
		}
	}
	
	
	@ResponseBody
	@RequestMapping(value="/deleteUser")
	public JSONObject deleteUser(@RequestBody CityAddressBook user) {
		JSONObject object=new JSONObject();
		
		if(user.getId()!=null)
		    cityAddressBookService.delete(user.getId());
		
		object.put("message", "AAA");
		return object;
	}
	
	@RequestMapping(value="/index_export")
	public String index_export(ModelMap map)
	{
		getData(map);
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy.MM");  
        map.put("date", formatter.format(new Date()));
		return "cityAddressBook/index_export";
	}
	
	
	@RequestMapping(value="/export")
	public void export(HttpServletResponse response) throws Exception {
		Map data=new HashMap();
		getData(data);
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy.MM");  
		data.put("date", formatter.format(new Date()));
        
		String classpath=PdfHelper.class.getClassLoader().getResource("templates").getPath();
        String ftlPath=classpath+"/cityAddressBook/";
        response.setContentType("application/pdf");
		response.setHeader("Content-disposition","atachment;filename=test.pdf");
		//ExportPdfUtils.generateToFile(ftlPath, "index_export.ftl", null, data, "D:\\1.pdf");
		ExportPdfUtils.generateAddressBookToServletOutputStream(ftlPath, "index_export.ftl", null, data, response);
	}

	@ResponseBody
	@RequestMapping(value = "/getDeptByUserName")
	public ResultInfo<CityAddressBook> getDeptByUserName(){
		ResultInfo<CityAddressBook> result = new ResultInfo<CityAddressBook>();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
		JwtUser currentUser =(JwtUser)token.getPrincipal();
		JSONObject object=new JSONObject();
		CityAddressBook read = cityAddressBookService.getCityAddressBook(currentUser.getCoreUser().getDisplay());
		result.setBean(read);
		result.setResultType("success");
		return result;
	}
	
}
