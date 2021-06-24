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
public class ThematicService {

	@Autowired
	private ThematicMapper thematicMapper;
	

	public int create(Thematic thematic){
		return thematicMapper.insert(thematic);
	}
	
	public Thematic read(BigDecimal id){
		return thematicMapper.selectByPrimaryKey(id);
	}

	public int update(Thematic thematic){
		return thematicMapper.updateByPrimaryKey(thematic);
	}
	
	public int delete(BigDecimal id){
		return thematicMapper.deleteByPrimaryKey(id);
	}
	
	
	public ResultInfo<Thematic> list(Thematic queryBean){
		ResultInfo<Thematic> result = new ResultInfo<Thematic>();
		if(queryBean.getPaging().equals("Yes")){
			PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
	        List<Thematic> plist = thematicMapper.list(queryBean);
	        PageInfo<Thematic> pageInfo = new PageInfo<Thematic>(plist);
	        result.setTotalRows(pageInfo.getTotal());
	        result.setBeanList(pageInfo.getList());
	        result.setResultType("success");
	        return result;
		}else{
			List<Thematic> plist = thematicMapper.list(queryBean);
			result.setTotalRows((long)plist.size());
	        result.setBeanList(plist);
	        result.setResultType("success");
	        return result;
		}
	}
		
}
