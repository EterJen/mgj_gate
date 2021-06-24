package com.gwideal.core.cms.l2.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.gwideal.core.cms.l3.dao.CityAddressBookDepartMentMapper;
import com.gwideal.core.cms.l4.entity.CityAddressBookDepartMent;
import com.gwideal.mybatis.metautils.ResultInfo;

@Service
@Transactional
public class CityAddressBookDepartMentService {

	@Autowired
	private CityAddressBookDepartMentMapper cityAddressBookDepartMentMapper;
	
	@Autowired
	private LogService logService;
	
	public int create(CityAddressBookDepartMent cityAddressBookDepartMent){
		cityAddressBookDepartMent.setIsdelete(0);
		int result = cityAddressBookDepartMentMapper.insert(cityAddressBookDepartMent);
		logService.log(result, LogService.AuditType.新增, cityAddressBookDepartMent);
		return result;
	}
	
	public CityAddressBookDepartMent read(BigDecimal id){
		return cityAddressBookDepartMentMapper.selectByPrimaryKey(id);
	}

	public int update(CityAddressBookDepartMent cityAddressBookDepartMent){
		CityAddressBookDepartMent oldCityAddressBookDepartMent = cityAddressBookDepartMentMapper.selectByPrimaryKey(cityAddressBookDepartMent.getId());
		int result = cityAddressBookDepartMentMapper.updateByPrimaryKey(cityAddressBookDepartMent);
		logService.log(result, LogService.AuditType.修改, oldCityAddressBookDepartMent);
		return result;
	}
	
	public int delete(BigDecimal id){
		CityAddressBookDepartMent oldCityAddressBookDepartMent = cityAddressBookDepartMentMapper.selectByPrimaryKey(id);
		oldCityAddressBookDepartMent.setIsdelete(1);
		int result = cityAddressBookDepartMentMapper.updateByPrimaryKeySelective(oldCityAddressBookDepartMent);
		logService.log(result, LogService.AuditType.删除, oldCityAddressBookDepartMent);
		return result;
	}
	
	public ResultInfo<CityAddressBookDepartMent> selectlist(CityAddressBookDepartMent queryBean){
		ResultInfo<CityAddressBookDepartMent> result = new ResultInfo<CityAddressBookDepartMent>();
		if(queryBean.getPaging().equals("Yes")){
			PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
	        List<CityAddressBookDepartMent> plist = cityAddressBookDepartMentMapper.selectlist(queryBean);
	        PageInfo<CityAddressBookDepartMent> pageInfo = new PageInfo<CityAddressBookDepartMent>(plist);
	        result.setTotalRows(pageInfo.getTotal());
	        result.setBeanList(pageInfo.getList());
	        result.setResultType("success");
	        return result;
		}else{
			List<CityAddressBookDepartMent> plist = cityAddressBookDepartMentMapper.selectlist(queryBean);
			result.setTotalRows((long)plist.size());
	        result.setBeanList(plist);
	        result.setResultType("success");
	        return result;
		}
	}
	
	public ResultInfo<CityAddressBookDepartMent> list(CityAddressBookDepartMent queryBean){
		ResultInfo<CityAddressBookDepartMent> result = new ResultInfo<CityAddressBookDepartMent>();
		if(queryBean.getPaging().equals("Yes")){
			PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
	        List<CityAddressBookDepartMent> plist = cityAddressBookDepartMentMapper.list(queryBean);
	        PageInfo<CityAddressBookDepartMent> pageInfo = new PageInfo<CityAddressBookDepartMent>(plist);
	        result.setTotalRows(pageInfo.getTotal());
	        result.setBeanList(pageInfo.getList());
	        result.setResultType("success");
	        return result;
		}else{
			List<CityAddressBookDepartMent> plist = cityAddressBookDepartMentMapper.list(queryBean);
			result.setTotalRows((long)plist.size());
	        result.setBeanList(plist);
	        result.setResultType("success");
	        return result;
		}
	}

	public ResultInfo<CityAddressBookDepartMent> batchDelete(CityAddressBookDepartMent cityAddressBookDepartMent) {
		ResultInfo<CityAddressBookDepartMent> result = new ResultInfo<>();
		List<BigDecimal> ids = cityAddressBookDepartMent.getIds();
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
