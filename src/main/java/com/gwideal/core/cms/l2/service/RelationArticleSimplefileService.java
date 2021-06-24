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
public class RelationArticleSimplefileService {

	@Autowired
	private RelationArticleSimplefileMapper relationArticleSimplefileMapper;
	

	public int create(RelationArticleSimplefile relationArticleSimplefile){
		return relationArticleSimplefileMapper.insert(relationArticleSimplefile);
	}
	
	public RelationArticleSimplefile read(BigDecimal id){
		return relationArticleSimplefileMapper.selectByPrimaryKey(id);
	}

	public int update(RelationArticleSimplefile relationArticleSimplefile){
		return relationArticleSimplefileMapper.updateByPrimaryKey(relationArticleSimplefile);
	}
	
	public int delete(BigDecimal id){
		return relationArticleSimplefileMapper.deleteByPrimaryKey(id);
	}
	
	
	public ResultInfo<RelationArticleSimplefile> list(RelationArticleSimplefile queryBean){
		ResultInfo<RelationArticleSimplefile> result = new ResultInfo<RelationArticleSimplefile>();
		if(queryBean.getPaging().equals("Yes")){
			PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
	        List<RelationArticleSimplefile> plist = relationArticleSimplefileMapper.list(queryBean);
	        PageInfo<RelationArticleSimplefile> pageInfo = new PageInfo<RelationArticleSimplefile>(plist);
	        result.setTotalRows(pageInfo.getTotal());
	        result.setBeanList(pageInfo.getList());
	        result.setResultType("success");
	        return result;
		}else{
			List<RelationArticleSimplefile> plist = relationArticleSimplefileMapper.list(queryBean);
			result.setTotalRows((long)plist.size());
	        result.setBeanList(plist);
	        result.setResultType("success");
	        return result;
		}
	}
		
}
