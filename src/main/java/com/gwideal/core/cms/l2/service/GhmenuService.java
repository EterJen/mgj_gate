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
public class GhmenuService {

	@Autowired
	private GhmenuMapper ghmenuMapper;
	

	public int create(Ghmenu ghmenu){
		return ghmenuMapper.insert(ghmenu);
	}
	
	public Ghmenu read(BigDecimal id){
		return ghmenuMapper.selectByPrimaryKey(id);
	}

	public int update(Ghmenu ghmenu){
		return ghmenuMapper.updateByPrimaryKey(ghmenu);
	}
	
	public int delete(BigDecimal id){
		return ghmenuMapper.deleteByPrimaryKey(id);
	}
	
	
	public ResultInfo<Ghmenu> list(Ghmenu queryBean){
		ResultInfo<Ghmenu> result = new ResultInfo<Ghmenu>();
		if(queryBean.getPaging().equals("Yes")){
			PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
	        List<Ghmenu> plist = ghmenuMapper.list(queryBean);
	        PageInfo<Ghmenu> pageInfo = new PageInfo<Ghmenu>(plist);
	        result.setTotalRows(pageInfo.getTotal());
	        result.setBeanList(pageInfo.getList());
	        result.setResultType("success");
	        return result;
		}else{
			List<Ghmenu> plist = ghmenuMapper.list(queryBean);
			result.setTotalRows((long)plist.size());
	        result.setBeanList(plist);
	        result.setResultType("success");
	        return result;
		}
	}
		
}
