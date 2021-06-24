package com.gwideal.core.cms.l3.dao;

import org.apache.ibatis.annotations.Mapper;
import java.util.List;
import  com.gwideal.core.cms.l4.entity.*;
import org.apache.ibatis.annotations.Param;


@Mapper
public interface WorkdayMapper extends tk.mybatis.mapper.common.Mapper<Workday>{

	public List<Workday> list(Workday workday);
	
	public long getYearCount(String year);
	
	public List<Workday> getWorkDayList(String ymd);
	
	public List<Workday> getWorkDayListByDate(@Param("startdate") String startdate,@Param("enddate") String enddate);
	
	public List<Workday> getWorkDayListBystartDate(@Param("startdate") String startdate);
	
}
