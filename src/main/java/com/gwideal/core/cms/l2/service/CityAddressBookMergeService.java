package com.gwideal.core.cms.l2.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.gwideal.core.cms.l3.dao.CityAddressBookMergeMapper;
import com.gwideal.core.cms.l4.entity.CityAddressBookMerge;
import com.gwideal.mybatis.metautils.ResultInfo;

@Service
@Transactional
public class CityAddressBookMergeService {

	@Autowired
	private CityAddressBookMergeMapper cityAddressBookMergeMapper;
	
	@Autowired
	private LogService logService;
	
	public int create(CityAddressBookMerge cityAddressBookMerge){
		int result = cityAddressBookMergeMapper.insert(cityAddressBookMerge);
		logService.log(result, LogService.AuditType.新增, cityAddressBookMerge);
		return result;
	}
	
	
	public CityAddressBookMerge read(BigDecimal id){
		return cityAddressBookMergeMapper.selectByPrimaryKey(id);
	}

	public int update(CityAddressBookMerge cityAddressBookMerge){
		CityAddressBookMerge oldcityAddressBookMerge = cityAddressBookMergeMapper.selectByPrimaryKey(cityAddressBookMerge.getId());
		int result = cityAddressBookMergeMapper.updateByPrimaryKey(cityAddressBookMerge);
		logService.log(result, LogService.AuditType.修改, oldcityAddressBookMerge);
		return result;
	}
	
	public int delete(BigDecimal id){
		CityAddressBookMerge oldcityAddressBookMerge = cityAddressBookMergeMapper.selectByPrimaryKey(id);
		int result = cityAddressBookMergeMapper.deleteByPrimaryKey(id);
		logService.log(result, LogService.AuditType.删除, oldcityAddressBookMerge);
		return result;
	}
	
	public int deleteByBookidAndColumn(BigDecimal bookid,String column){
		CityAddressBookMerge queryBean=new CityAddressBookMerge();
		queryBean.setBookid(bookid);
		queryBean.setColumnname(column);
		List<CityAddressBookMerge> plist = cityAddressBookMergeMapper.list(queryBean);
		int result=0;
		for(CityAddressBookMerge cityAddressBookMerge:plist)
		{
			result = cityAddressBookMergeMapper.deleteByPrimaryKey(cityAddressBookMerge.getId());
			logService.log(result, LogService.AuditType.删除, cityAddressBookMerge);
		}
		return result;
	}
	
	
	public ResultInfo<CityAddressBookMerge> list(CityAddressBookMerge queryBean){
		ResultInfo<CityAddressBookMerge> result = new ResultInfo<CityAddressBookMerge>();
		if(queryBean.getPaging().equals("Yes")){
			PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
	        List<CityAddressBookMerge> plist = cityAddressBookMergeMapper.list(queryBean);
	        PageInfo<CityAddressBookMerge> pageInfo = new PageInfo<CityAddressBookMerge>(plist);
	        result.setTotalRows(pageInfo.getTotal());
	        result.setBeanList(pageInfo.getList());
	        result.setResultType("success");
	        return result;
		}else{
			List<CityAddressBookMerge> plist = cityAddressBookMergeMapper.list(queryBean);
			result.setTotalRows((long)plist.size());
	        result.setBeanList(plist);
	        result.setResultType("success");
	        return result;
		}
	}

	public ResultInfo<CityAddressBookMerge> batchDelete(CityAddressBookMerge cityAddressBookMerge) {
		ResultInfo<CityAddressBookMerge> result = new ResultInfo<>();
		List<BigDecimal> ids = cityAddressBookMerge.getIds();
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
