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
import java.util.stream.Collectors;

@Service
@Transactional
public class FriendlyLinkService {

	@Autowired

	private FriendlyLinkMapper friendlyLinkMapper;
	

	public int create(FriendlyLink friendlyLink){
		int insert = friendlyLinkMapper.insert(friendlyLink);
		friendlyLink.setSortNumber(friendlyLink.getId());
		String category = friendlyLink.getCategory();
		BigDecimal order = null;
		switch (category) {
			case "zygjbm":
				order = new BigDecimal(1);
				break;
			case "mmgljg":
				order = new BigDecimal(2);
				break;
			case "xgdw":
				order = new BigDecimal(3);
				break;
		}
		friendlyLink.setCategorySortNumber(order);
		friendlyLinkMapper.updateByPrimaryKeySelective(friendlyLink);
		return insert;
	}
	
	public FriendlyLink read(BigDecimal id){
		return friendlyLinkMapper.selectByPrimaryKey(id);
	}

	public int update(FriendlyLink friendlyLink){
		return friendlyLinkMapper.updateByPrimaryKey(friendlyLink);
	}
	
	public int delete(BigDecimal id){
		return friendlyLinkMapper.deleteByPrimaryKey(id);
	}
	
	
	public ResultInfo<FriendlyLink> list(FriendlyLink queryBean){
		ResultInfo<FriendlyLink> result = new ResultInfo<FriendlyLink>();
		if(queryBean.getPaging().equals("Yes")){
			PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
	        List<FriendlyLink> plist = friendlyLinkMapper.list(queryBean);
	        PageInfo<FriendlyLink> pageInfo = new PageInfo<FriendlyLink>(plist);
	        result.setTotalRows(pageInfo.getTotal());
	        result.setBeanList(pageInfo.getList());
	        result.setResultType("success");
	        return result;
		}else{
			List<FriendlyLink> plist = friendlyLinkMapper.list(queryBean);
			result.setTotalRows((long)plist.size());
	        result.setBeanList(plist);
	        result.setResultType("success");
	        return result;
		}
	}

	public ResultInfo<FriendlyLink> batchDel(List<FriendlyLink> friendlyLinks) {
		List<BigDecimal> ids = friendlyLinks.stream().map(FriendlyLink::getId).collect(Collectors.toList());
		ResultInfo<FriendlyLink> result = new ResultInfo<FriendlyLink>();
		if (ids.size() > 0) {
			friendlyLinkMapper.batchDelete(ids);
		}
		result.setResultType("success");
		result.setMessage("创建成功");
		return result;
	}

	public ResultInfo<FriendlyLink> sortUpdateBatch(List<FriendlyLink> friendlyLinks) {
		FriendlyLink friendlyLinkUpdeateBean = new FriendlyLink();
		for (FriendlyLink friendlyLink : friendlyLinks) {
			friendlyLinkUpdeateBean.setId(friendlyLink.getId());
			friendlyLinkUpdeateBean.setSortNumber(friendlyLink.getSortNumber());
			friendlyLinkMapper.updateByPrimaryKeySelective(friendlyLinkUpdeateBean);
		}
		ResultInfo<FriendlyLink> result = new ResultInfo<FriendlyLink>();
		result.setResultType("success");
		result.setMessage("创建成功");
		return result;
	}
}
