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
public class GhrollService {

	@Autowired
	private GhrollMapper ghrollMapper;
	

	public int create(Ghroll ghroll){
		return ghrollMapper.insert(ghroll);
	}
	
	public Ghroll read(BigDecimal id){
		return ghrollMapper.selectByPrimaryKey(id);
	}

	public int update(Ghroll ghroll){
		return ghrollMapper.updateByPrimaryKey(ghroll);
	}
	
	public int delete(BigDecimal id){
		return ghrollMapper.deleteByPrimaryKey(id);
	}
	
	
	public ResultInfo<Ghroll> list(Ghroll queryBean){
		ResultInfo<Ghroll> result = new ResultInfo<Ghroll>();
		if(queryBean.getPaging().equals("Yes")){
			PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
	        List<Ghroll> plist = ghrollMapper.list(queryBean);
	        PageInfo<Ghroll> pageInfo = new PageInfo<Ghroll>(plist);
	        result.setTotalRows(pageInfo.getTotal());
	        result.setBeanList(pageInfo.getList());
	        result.setResultType("success");
	        return result;
		}else{
			List<Ghroll> plist = ghrollMapper.list(queryBean);
			result.setTotalRows((long)plist.size());
	        result.setBeanList(plist);
	        result.setResultType("success");
	        return result;
		}
	}
		
}
