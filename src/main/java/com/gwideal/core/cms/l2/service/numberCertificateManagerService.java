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
public class numberCertificateManagerService {

	@Autowired
	private numberCertificateManagerMapper numberCertificateManagerMapper;
	

	public int create(numberCertificateManager numberCertificateManager){
		return numberCertificateManagerMapper.insert(numberCertificateManager);
	}
	
	public numberCertificateManager read(BigDecimal id){
		return numberCertificateManagerMapper.selectByPrimaryKey(id);
	}

	public int update(numberCertificateManager numberCertificateManager){
		return numberCertificateManagerMapper.updateByPrimaryKey(numberCertificateManager);
	}
	
	public int delete(BigDecimal id){
		return numberCertificateManagerMapper.deleteByPrimaryKey(id);
	}
	
	
	public ResultInfo<numberCertificateManager> list(numberCertificateManager queryBean){
		ResultInfo<numberCertificateManager> result = new ResultInfo<numberCertificateManager>();
		if(queryBean.getPaging().equals("Yes")){
			PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
	        List<numberCertificateManager> plist = numberCertificateManagerMapper.list(queryBean);
	        PageInfo<numberCertificateManager> pageInfo = new PageInfo<numberCertificateManager>(plist);
	        result.setTotalRows(pageInfo.getTotal());
	        result.setBeanList(pageInfo.getList());
	        result.setResultType("success");
	        return result;
		}else{
			List<numberCertificateManager> plist = numberCertificateManagerMapper.list(queryBean);
			result.setTotalRows((long)plist.size());
	        result.setBeanList(plist);
	        result.setResultType("success");
	        return result;
		}
	}
		
}
