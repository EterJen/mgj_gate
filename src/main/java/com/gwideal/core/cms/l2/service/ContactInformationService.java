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
public class ContactInformationService {

	@Autowired
	private ContactInformationMapper contactInformationMapper;
	

	public int create(ContactInformation contactInformation){
		return contactInformationMapper.insert(contactInformation);
	}
	
	public ContactInformation read(BigDecimal id){
		return contactInformationMapper.selectByPrimaryKey(id);
	}

	public int update(ContactInformation contactInformation){
		return contactInformationMapper.updateByPrimaryKey(contactInformation);
	}
	
	public int delete(BigDecimal id){
		return contactInformationMapper.deleteByPrimaryKey(id);
	}
	
	
	public ResultInfo<ContactInformation> list(ContactInformation queryBean){
		ResultInfo<ContactInformation> result = new ResultInfo<ContactInformation>();
		if(queryBean.getPaging().equals("Yes")){
			PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
	        List<ContactInformation> plist = contactInformationMapper.list(queryBean);
	        PageInfo<ContactInformation> pageInfo = new PageInfo<ContactInformation>(plist);
	        result.setTotalRows(pageInfo.getTotal());
	        result.setBeanList(pageInfo.getList());
	        result.setResultType("success");
	        return result;
		}else{
			List<ContactInformation> plist = contactInformationMapper.list(queryBean);
			result.setTotalRows((long)plist.size());
	        result.setBeanList(plist);
	        result.setResultType("success");
	        return result;
		}
	}
		
}
