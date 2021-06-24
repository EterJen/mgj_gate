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
import java.math.BigDecimal;
import java.util.stream.Collectors;

@Service
@Transactional
public class LinksInfoService {

	@Autowired
	private LinksInfoMapper linksInfoMapper;
	

	public int create(LinksInfo linksInfo){
		int insert = linksInfoMapper.insert(linksInfo);
		
		linksInfoMapper.updateByPrimaryKeySelective(linksInfo);
		return insert;
	}
	
	public LinksInfo read(BigDecimal id){
		return linksInfoMapper.selectByPrimaryKey(id);
	}

	public int update(LinksInfo linksInfo){
		return linksInfoMapper.updateByPrimaryKey(linksInfo);
	}
	
	public int delete(BigDecimal id){
		return linksInfoMapper.deleteByPrimaryKey(id);
	}
	
	
	public ResultInfo<LinksInfo> list(LinksInfo queryBean){
		ResultInfo<LinksInfo> result = new ResultInfo<LinksInfo>();
		if(queryBean.getPaging().equals("Yes")){
			PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
	        List<LinksInfo> plist = linksInfoMapper.list(queryBean);
	        PageInfo<LinksInfo> pageInfo = new PageInfo<LinksInfo>(plist);
	        result.setTotalRows(pageInfo.getTotal());
	        result.setBeanList(pageInfo.getList());
	        result.setResultType("success");
	        return result;
		}else{
			List<LinksInfo> plist = linksInfoMapper.list(queryBean);
			result.setTotalRows((long)plist.size());
	        result.setBeanList(plist);
	        result.setResultType("success");
	        return result;
		}
	}

	public ResultInfo<LinksInfo> batchDel(List<LinksInfo> friendlyLinks) {
		List<BigDecimal> ids = friendlyLinks.stream().map(LinksInfo::getId).collect(Collectors.toList());
		ResultInfo<LinksInfo> result = new ResultInfo<LinksInfo>();
		if (ids.size() > 0) {
			linksInfoMapper.batchDelete(ids);
		}
		result.setResultType("success");
		result.setMessage("创建成功");
		return result;
	}

	public ResultInfo<LinksInfo> sortUpdateBatch(List<LinksInfo> linksInfos) {
		LinksInfo linksInfoUpdeateBean = new LinksInfo();
		for (LinksInfo linksInfo : linksInfos) {
			linksInfoUpdeateBean.setId(linksInfo.getId());
			linksInfoMapper.updateByPrimaryKeySelective(linksInfoUpdeateBean);
		}
		ResultInfo<LinksInfo> result = new ResultInfo<LinksInfo>();
		result.setResultType("success");
		result.setMessage("创建成功");
		return result;
	}
}
