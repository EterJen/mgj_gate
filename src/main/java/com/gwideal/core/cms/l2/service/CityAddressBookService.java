package com.gwideal.core.cms.l2.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.gwideal.core.basic.l4.entity.CoreRole;
import com.gwideal.core.cms.l3.dao.AdministratorMapper;
import com.gwideal.core.cms.l3.dao.CityAddressBookMapper;
import com.gwideal.core.cms.l4.entity.Administrator;
import com.gwideal.core.cms.l4.entity.CityAddressBook;
import com.gwideal.mybatis.metautils.ResultInfo;

@Service
@Transactional
public class CityAddressBookService {

	@Autowired
	private CityAddressBookMapper cityAddressBookMapper;
	
    @Autowired
    private AdministratorMapper administratorMapper;
	
	@Autowired
	private LogService logService;
	
	public  List<CoreRole> queryUserRoles(Administrator coreUser)
	{
		return administratorMapper.queryUserRoles(coreUser);
	}
	
	
	public int create(CityAddressBook cityAddressBook){
		cityAddressBook.setIsdelete(0);
		int result = cityAddressBookMapper.insert(cityAddressBook);
		logService.log(result, LogService.AuditType.新增, cityAddressBook);
		return result;
	}
	
	public CityAddressBook read(BigDecimal id){
		return cityAddressBookMapper.selectByPrimaryKey(id);
	}

	public int update(CityAddressBook cityAddressBook){
		CityAddressBook oldcityAddressBook = cityAddressBookMapper.selectByPrimaryKey(cityAddressBook.getId());
		int result = cityAddressBookMapper.updateByPrimaryKey(cityAddressBook);
		logService.log(result, LogService.AuditType.修改, oldcityAddressBook);
		return result;
	}
	
	public int delete(BigDecimal id){
		CityAddressBook oldcityAddressBook = cityAddressBookMapper.selectByPrimaryKey(id);
		oldcityAddressBook.setIsdelete(1);
		int result = cityAddressBookMapper.updateByPrimaryKeySelective(oldcityAddressBook);
		logService.log(result, LogService.AuditType.删除, oldcityAddressBook);
		return result;
	}
	
	
	public ResultInfo<CityAddressBook> list(CityAddressBook queryBean){
		ResultInfo<CityAddressBook> result = new ResultInfo<CityAddressBook>();
		if(queryBean.getPaging().equals("Yes")){
			PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
	        List<CityAddressBook> plist = cityAddressBookMapper.list(queryBean);
	        PageInfo<CityAddressBook> pageInfo = new PageInfo<CityAddressBook>(plist);
	        result.setTotalRows(pageInfo.getTotal());
	        result.setBeanList(pageInfo.getList());
	        result.setResultType("success");
	        return result;
		}else{
			List<CityAddressBook> plist = cityAddressBookMapper.list(queryBean);
			result.setTotalRows((long)plist.size());
	        result.setBeanList(plist);
	        result.setResultType("success");
	        return result;
		}
	}

	public ResultInfo<CityAddressBook> batchDelete(CityAddressBook cityAddressBook) {
		ResultInfo<CityAddressBook> result = new ResultInfo<>();
		List<BigDecimal> ids = cityAddressBook.getIds();
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

	public CityAddressBook getCityAddressBook(String name){
		return cityAddressBookMapper.getCityAddressBook(name);
	}
	
}
