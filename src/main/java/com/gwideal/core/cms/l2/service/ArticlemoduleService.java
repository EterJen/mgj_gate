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
public class ArticlemoduleService {

	@Autowired
	private ArticlemoduleMapper articlemoduleMapper;
	

	public int create(Articlemodule articlemodule){
		return articlemoduleMapper.insert(articlemodule);
	}
	
	public Articlemodule read(BigDecimal id){
		return articlemoduleMapper.selectByPrimaryKey(id);
	}

	public int update(Articlemodule articlemodule){
		return articlemoduleMapper.updateByPrimaryKey(articlemodule);
	}
	
	public int delete(BigDecimal id){
		return articlemoduleMapper.deleteByPrimaryKey(id);
	}
	
	
	public ResultInfo<Articlemodule> list(Articlemodule queryBean){
		ResultInfo<Articlemodule> result = new ResultInfo<Articlemodule>();
		if(queryBean.getPaging().equals("Yes")){
			PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
	        List<Articlemodule> plist = articlemoduleMapper.list(queryBean);
	        PageInfo<Articlemodule> pageInfo = new PageInfo<Articlemodule>(plist);
	        result.setTotalRows(pageInfo.getTotal());
	        result.setBeanList(pageInfo.getList());
	        result.setResultType("success");
	        return result;
		}else{
			List<Articlemodule> plist = articlemoduleMapper.list(queryBean);
			result.setTotalRows((long)plist.size());
	        result.setBeanList(plist);
	        result.setResultType("success");
	        return result;
		}
	}
		
}
