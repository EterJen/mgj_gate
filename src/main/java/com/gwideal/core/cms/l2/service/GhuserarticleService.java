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
public class GhuserarticleService {

	@Autowired
	private GhuserarticleMapper ghuserarticleMapper;
	

	public int create(Ghuserarticle ghuserarticle){
		return ghuserarticleMapper.insert(ghuserarticle);
	}
	
	public Ghuserarticle read(BigDecimal id){
		return ghuserarticleMapper.selectByPrimaryKey(id);
	}

	public int update(Ghuserarticle ghuserarticle){
		return ghuserarticleMapper.updateByPrimaryKey(ghuserarticle);
	}
	
	public int delete(BigDecimal id){
		return ghuserarticleMapper.deleteByPrimaryKey(id);
	}
	
	
	public ResultInfo<Ghuserarticle> list(Ghuserarticle queryBean){
		ResultInfo<Ghuserarticle> result = new ResultInfo<Ghuserarticle>();
		if(queryBean.getPaging().equals("Yes")){
			PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
	        List<Ghuserarticle> plist = ghuserarticleMapper.list(queryBean);
	        PageInfo<Ghuserarticle> pageInfo = new PageInfo<Ghuserarticle>(plist);
	        result.setTotalRows(pageInfo.getTotal());
	        result.setBeanList(pageInfo.getList());
	        result.setResultType("success");
	        return result;
		}else{
			List<Ghuserarticle> plist = ghuserarticleMapper.list(queryBean);
			result.setTotalRows((long)plist.size());
	        result.setBeanList(plist);
	        result.setResultType("success");
	        return result;
		}
	}
		
}
