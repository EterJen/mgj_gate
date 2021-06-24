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
public class GharticleService {

	@Autowired
	private GharticleMapper gharticleMapper;
	

	public int create(Gharticle gharticle){
		return gharticleMapper.insert(gharticle);
	}
	
	public Gharticle read(BigDecimal id){
		return gharticleMapper.selectByPrimaryKey(id);
	}

	public int update(Gharticle gharticle){
		return gharticleMapper.updateByPrimaryKey(gharticle);
	}
	
	public int delete(BigDecimal id){
		return gharticleMapper.deleteByPrimaryKey(id);
	}
	
	
	public ResultInfo<Gharticle> list(Gharticle queryBean){
		ResultInfo<Gharticle> result = new ResultInfo<Gharticle>();
		if(queryBean.getPaging().equals("Yes")){
			PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
	        List<Gharticle> plist = gharticleMapper.list(queryBean);
	        PageInfo<Gharticle> pageInfo = new PageInfo<Gharticle>(plist);
	        result.setTotalRows(pageInfo.getTotal());
	        result.setBeanList(pageInfo.getList());
	        result.setResultType("success");
	        return result;
		}else{
			List<Gharticle> plist = gharticleMapper.list(queryBean);
			result.setTotalRows((long)plist.size());
	        result.setBeanList(plist);
	        result.setResultType("success");
	        return result;
		}
	}
		
}
