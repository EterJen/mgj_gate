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
public class BayWindowService {

	@Autowired
	private BayWindowMapper bayWindowMapper;
	

	public int create(BayWindow bayWindow){
		return bayWindowMapper.insert(bayWindow);
	}
	
	public BayWindow read(BigDecimal id){
		return bayWindowMapper.selectByPrimaryKey(id);
	}

	public int update(BayWindow bayWindow){
		return bayWindowMapper.updateByPrimaryKey(bayWindow);
	}
	
	public int delete(BigDecimal id){
		return bayWindowMapper.deleteByPrimaryKey(id);
	}
	
	
	public ResultInfo<BayWindow> list(BayWindow queryBean){
		ResultInfo<BayWindow> result = new ResultInfo<BayWindow>();
		if(queryBean.getPaging().equals("Yes")){
			PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
	        List<BayWindow> plist = bayWindowMapper.list(queryBean);
	        PageInfo<BayWindow> pageInfo = new PageInfo<BayWindow>(plist);
	        result.setTotalRows(pageInfo.getTotal());
	        result.setBeanList(pageInfo.getList());
	        result.setResultType("success");
	        return result;
		}else{
			List<BayWindow> plist = bayWindowMapper.list(queryBean);
			result.setTotalRows((long)plist.size());
	        result.setBeanList(plist);
	        result.setResultType("success");
	        return result;
		}
	}
		
}
