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
public class DutytempService {

	@Autowired
	private DutytempMapper dutytempMapper;
	

	public int create(Dutytemp dutytemp){
		return dutytempMapper.insert(dutytemp);
	}
	
	public Dutytemp read(BigDecimal id){
		return dutytempMapper.selectByPrimaryKey(id);
	}

	public int update(Dutytemp dutytemp){
		return dutytempMapper.updateByPrimaryKey(dutytemp);
	}
	
	public int delete(BigDecimal id){
		return dutytempMapper.deleteByPrimaryKey(id);
	}
	
	
	public ResultInfo<Dutytemp> list(Dutytemp queryBean){
		ResultInfo<Dutytemp> result = new ResultInfo<Dutytemp>();
		if(queryBean.getPaging().equals("Yes")){
			PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
	        List<Dutytemp> plist = dutytempMapper.list(queryBean);
	        PageInfo<Dutytemp> pageInfo = new PageInfo<Dutytemp>(plist);
	        result.setTotalRows(pageInfo.getTotal());
	        result.setBeanList(pageInfo.getList());
	        result.setResultType("success");
	        return result;
		}else{
			List<Dutytemp> plist = dutytempMapper.list(queryBean);
			result.setTotalRows((long)plist.size());
	        result.setBeanList(plist);
	        result.setResultType("success");
	        return result;
		}
	}
		
}
