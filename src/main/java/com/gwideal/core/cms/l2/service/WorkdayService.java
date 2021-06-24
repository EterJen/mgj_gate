package com.gwideal.core.cms.l2.service;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

import com.gwideal.core.cms.l4.entity.*;
import com.gwideal.core.cms.l3.dao.*;
import com.gwideal.mybatis.metautils.*;
import com.gwideal.mybatis.metautils.ResultInfo;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.github.pagehelper.PageInfo;
import java.math.BigDecimal;

@Service
@Transactional
public class WorkdayService {

	@Autowired
	private WorkdayMapper workdayMapper;
	
	
	public long getYearCount(String year){
		return  workdayMapper.getYearCount(year);
		
	}

	public List<Workday> getWorkDayList(String ymd){
		return  workdayMapper.getWorkDayList(ymd);
	}
	
	public int create(Workday workday){
		return workdayMapper.insert(workday);
	}
	
	public Workday read(BigDecimal id){
		return workdayMapper.selectByPrimaryKey(id);
	}

	public int update(Workday workday){
		return workdayMapper.updateByPrimaryKey(workday);
	}
	
	public int delete(BigDecimal id){
		return workdayMapper.deleteByPrimaryKey(id);
	}
	
	
	public List<Workday> find(Workday queryBean){
		return workdayMapper.list(queryBean);
	}
	
	public ResultInfo<Workday> list(Workday queryBean){
		ResultInfo<Workday> result = new ResultInfo<Workday>();
		if(queryBean.getPaging().equals("Yes")){
			PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
	        List<Workday> plist = workdayMapper.list(queryBean);
	        PageInfo<Workday> pageInfo = new PageInfo<Workday>(plist);
	        result.setTotalRows(pageInfo.getTotal());
	        result.setBeanList(pageInfo.getList());
	        result.setResultType("success");
	        return result;
		}else{
			List<Workday> plist = workdayMapper.list(queryBean);
			result.setTotalRows((long)plist.size());
	        result.setBeanList(plist);
	        result.setResultType("success");
	        return result;
		}
	}

	public List getWorkDayListByDate(String startdate, String enddate) {
		return workdayMapper.getWorkDayListByDate(startdate,enddate);
	}
}
