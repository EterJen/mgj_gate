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
public class AttendanceDService {

	@Autowired
	private AttendanceDMapper attendanceDMapper;
	

	public int create(AttendanceD attendanceD){
		return attendanceDMapper.insert(attendanceD);
	}
	
	public AttendanceD read(BigDecimal id){
		return attendanceDMapper.selectByPrimaryKey(id);
	}

	public int update(AttendanceD attendanceD){
		return attendanceDMapper.updateByPrimaryKey(attendanceD);
	}

	public int updateByRefId(AttendanceD attendanceD){
		return attendanceDMapper.updateByRefId(attendanceD);
	}
	
	public int delete(BigDecimal id){
		return attendanceDMapper.deleteByPrimaryKey(id);
	}
	
	
	public ResultInfo<AttendanceD> list(AttendanceD queryBean){
		ResultInfo<AttendanceD> result = new ResultInfo<AttendanceD>();
		if(queryBean.getPaging().equals("Yes")){
			PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
	        List<AttendanceD> plist = attendanceDMapper.list(queryBean);
	        PageInfo<AttendanceD> pageInfo = new PageInfo<AttendanceD>(plist);
	        result.setTotalRows(pageInfo.getTotal());
	        result.setBeanList(pageInfo.getList());
	        result.setResultType("success");
	        return result;
		}else{
			List<AttendanceD> plist = attendanceDMapper.list(queryBean);
			result.setTotalRows((long)plist.size());
	        result.setBeanList(plist);
	        result.setResultType("success");
	        return result;
		}
	}

	public List<AttendanceD> listByReffceId(AttendanceD queryBean){
		List<AttendanceD> plist = attendanceDMapper.listByReffceId(queryBean);
		return plist;
	}
		
}
