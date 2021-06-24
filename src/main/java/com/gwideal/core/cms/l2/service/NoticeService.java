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
public class NoticeService {

	@Autowired
	private NoticeMapper noticeMapper;
	

	public int create(Notice notice){
		return noticeMapper.insert(notice);
	}
	
	public Notice read(BigDecimal id){
		return noticeMapper.selectByPrimaryKey(id);
	}

	public int update(Notice notice){
		return noticeMapper.updateByPrimaryKey(notice);
	}
	
	public int delete(BigDecimal id){
		return noticeMapper.deleteByPrimaryKey(id);
	}
	
	
	public ResultInfo<Notice> list(Notice queryBean){
		ResultInfo<Notice> result = new ResultInfo<Notice>();
		if(queryBean.getPaging().equals("Yes")){
			PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
	        List<Notice> plist = noticeMapper.list(queryBean);
	        PageInfo<Notice> pageInfo = new PageInfo<Notice>(plist);
	        result.setTotalRows(pageInfo.getTotal());
	        result.setBeanList(pageInfo.getList());
	        result.setResultType("success");
	        return result;
		}else{
			List<Notice> plist = noticeMapper.list(queryBean);
			result.setTotalRows((long)plist.size());
	        result.setBeanList(plist);
	        result.setResultType("success");
	        return result;
		}
	}
		
}
