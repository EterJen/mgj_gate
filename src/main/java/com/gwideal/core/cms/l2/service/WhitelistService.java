package com.gwideal.core.cms.l2.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.gwideal.core.cms.l3.dao.WhitelistMapper;
import com.gwideal.core.cms.l4.entity.Whitelist;
import com.gwideal.mybatis.metautils.ResultInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class WhitelistService {

	@Autowired
	private WhitelistMapper whitelistMapper;

	@Autowired
	private LogService logService;
	

	public int create(Whitelist whitelist){
		whitelist.setCreatetime(new Date());
		int result =whitelistMapper.insert(whitelist);
		logService.log(result, LogService.AuditType.新增, whitelist);
		return result;
	}
	
	public Whitelist read(BigDecimal id){
		return whitelistMapper.selectByPrimaryKey(id);
	}

	public int update(Whitelist whitelist){
		Whitelist oldWhitelist = whitelistMapper.selectByPrimaryKey(whitelist.getId());
		int result = whitelistMapper.updateByPrimaryKey(whitelist);
		logService.log(result, LogService.AuditType.修改, oldWhitelist);
		return result;
	}
	
	public int delete(BigDecimal id){
		Whitelist oldWhitelist = whitelistMapper.selectByPrimaryKey(id);
		int result = whitelistMapper.deleteByPrimaryKey(id);
		logService.log(result, LogService.AuditType.修改, oldWhitelist);
		return result;
	}
	
	
	public ResultInfo<Whitelist> list(Whitelist queryBean){
		ResultInfo<Whitelist> result = new ResultInfo<Whitelist>();
		if(queryBean.getPaging().equals("Yes")){
			PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
	        List<Whitelist> plist = whitelistMapper.list(queryBean);
	        PageInfo<Whitelist> pageInfo = new PageInfo<Whitelist>(plist);
	        result.setTotalRows(pageInfo.getTotal());
	        result.setBeanList(pageInfo.getList());
	        result.setResultType("success");
	        return result;
		}else{
			List<Whitelist> plist = whitelistMapper.list(queryBean);
			result.setTotalRows((long)plist.size());
	        result.setBeanList(plist);
	        result.setResultType("success");
	        return result;
		}
	}
		
}
