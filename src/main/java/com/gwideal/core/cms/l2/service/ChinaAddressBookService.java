package com.gwideal.core.cms.l2.service;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.gwideal.core.cms.l3.dao.ChinaAddressBookMapper;
import com.gwideal.core.cms.l4.entity.ChinaAddressBook;
import com.gwideal.mybatis.metautils.ResultInfo;

import per.eter.utils.file.FileUtils;
import per.eter.utils.file.SimpFile;

@Service
@Transactional
public class ChinaAddressBookService {

	@Autowired
	private FileUtils fileUtils;
	
	@Autowired
	private ChinaAddressBookMapper chinaAddressBookMapper;
	
	@Autowired
	private LogService logService;
	
	public static String attRelativePath = "/ChinaAddressBook/chinaAddressBook";
	
	public int create(ChinaAddressBook chinaAddressBook){
		int result = chinaAddressBookMapper.insert(chinaAddressBook);
		logService.log(result, LogService.AuditType.新增, chinaAddressBook);
		return result;
	}
	
	public ResultInfo<ChinaAddressBook> save(ChinaAddressBook chinaAddressBook,MultipartFile file){
		ResultInfo<ChinaAddressBook> result = new ResultInfo<>();
		MultipartFile[] multipartFiles = {file};
		try {
			Map<String, SimpFile> stringSimpFileMap = fileUtils.remoteUpload(multipartFiles, attRelativePath);
			SimpFile simpFile = stringSimpFileMap.get(file.getOriginalFilename());
			if (SimpFile.FileOperationResult.success.equals(simpFile.getFileOperationResult())) {
				chinaAddressBook.setFileName(simpFile.getOriginalFilename());
				chinaAddressBook.setFilePath(simpFile.getRelativePath());
			} else {
				result.setResultType("fail");
				result.setMessage("附件上传失败");
				return result;
			}
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		int i;
		if (chinaAddressBook.getId()!=null) {
			i=update(chinaAddressBook);
			result.setBeanId(chinaAddressBook.getId());
		}else{
			i=create(chinaAddressBook);
			result.setBeanId(chinaAddressBook.getId());
		}
		
		if(i>0){
			result.setResultType("success");
			result.setMessage("保存成功");
		}else{
			result.setResultType("fail");
			result.setMessage("保存失败");
		}
		return result;
	}
	
	public void download(SimpFile simpFile,HttpServletResponse response) throws Exception{
		fileUtils.remoteRead(simpFile, response);
	}
	
	public ChinaAddressBook read(BigDecimal id){
		return chinaAddressBookMapper.selectByPrimaryKey(id);
	}

	public int update(ChinaAddressBook chinaAddressBook){
		ChinaAddressBook oldchinaAddressBook = chinaAddressBookMapper.selectByPrimaryKey(chinaAddressBook.getId());
		int result = chinaAddressBookMapper.updateByPrimaryKey(chinaAddressBook);
		logService.log(result, LogService.AuditType.修改, oldchinaAddressBook);
		return result;
	}
	
	public int delete(BigDecimal id){
		ChinaAddressBook oldchinaAddressBook = chinaAddressBookMapper.selectByPrimaryKey(id);
		int result = chinaAddressBookMapper.updateByPrimaryKeySelective(oldchinaAddressBook);
		logService.log(result, LogService.AuditType.删除, oldchinaAddressBook);
		return result;
	}
	
	
	public ResultInfo<ChinaAddressBook> list(ChinaAddressBook queryBean){
		ResultInfo<ChinaAddressBook> result = new ResultInfo<ChinaAddressBook>();
		if(queryBean.getPaging().equals("Yes")){
			PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
	        List<ChinaAddressBook> plist = chinaAddressBookMapper.list(queryBean);
	        PageInfo<ChinaAddressBook> pageInfo = new PageInfo<ChinaAddressBook>(plist);
	        result.setTotalRows(pageInfo.getTotal());
	        result.setBeanList(pageInfo.getList());
	        result.setResultType("success");
	        return result;
		}else{
			List<ChinaAddressBook> plist = chinaAddressBookMapper.list(queryBean);
			result.setTotalRows((long)plist.size());
	        result.setBeanList(plist);
	        result.setResultType("success");
	        return result;
		}
	}

	public ResultInfo<ChinaAddressBook> batchDelete(ChinaAddressBook chinaAddressBook) {
		ResultInfo<ChinaAddressBook> result = new ResultInfo<>();
		List<BigDecimal> ids = chinaAddressBook.getIds();
		int i=0;
		if (ids!=null&& ids.size()>0) {
			for (BigDecimal id : ids) {
				i+=delete(id);
			}
		}
		result.setResultType("success");
		result.setMessage("批量删除成功，删除"+i+"条记录！");
		return result;
	}
	
}
