package com.gwideal.core.cms.l1.controller;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSONObject;
import com.gwideal.core.cms.l2.service.ChinaAddressBookService;
import com.gwideal.core.cms.l2.service.CityAddressBookService;
import com.gwideal.core.cms.l4.entity.ChinaAddressBook;
import com.gwideal.mybatis.metautils.ResultInfo;

import per.eter.utils.file.SimpFile;


@Controller
@RequestMapping("/chinaAddressBook")
public class ChinaAddressBookController {

	@Autowired
	ChinaAddressBookService chinaAddressBookService;
	
	
	@RequestMapping("/")
	public String index(ModelMap map) {
		
		List<ChinaAddressBook> books=chinaAddressBookService.list(new ChinaAddressBook()).getBeanList();
		ChinaAddressBook book=new ChinaAddressBook();
		if(books.size()>0)
		{
			book=books.get(0);
		}
		map.put("book", book);
		return "chinaAddressBook/index";
	}
	
	
	@RequestMapping({"/downloadChina"})
	public void downloadChina(BigDecimal fileid, HttpServletResponse response) throws Exception {
		SimpFile simpFile = new SimpFile();
		ChinaAddressBook book=chinaAddressBookService.read(fileid);
		simpFile.setDownloadName(book.getFileName());
		simpFile.setRelativePath(book.getFilePath());
		chinaAddressBookService.download(simpFile, response);
	}
	
	@ResponseBody
	@RequestMapping("/uploadChina")
	public JSONObject uploadChina(@RequestParam(value = "file", required = true) MultipartFile file) {
		
		List<ChinaAddressBook> books=chinaAddressBookService.list(new ChinaAddressBook()).getBeanList();
		JSONObject object=new JSONObject();
		ResultInfo<ChinaAddressBook> resultInfo=null;
		ChinaAddressBook chinaAddressBook=new ChinaAddressBook();
		if(books.size()>0)
		{
			chinaAddressBook=books.get(0);
		}
		chinaAddressBook.setFileTime(new Date());
		resultInfo=chinaAddressBookService.save(chinaAddressBook,file);
		if(resultInfo!=null)
		{
			object.put("resultType", resultInfo.getResultType());
			object.put("message", resultInfo.getMessage());
		}
		else
		{
			object.put("resultType", "fail");
			object.put("message", "未找到");
		}
		return object;
	}
}
