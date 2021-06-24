package com.gwideal.core.cms.l3.dao;

import org.apache.ibatis.annotations.Mapper;
import java.util.List;
import  com.gwideal.core.cms.l4.entity.*;
import org.apache.ibatis.annotations.Param;


@Mapper
public interface DutytableMapper extends tk.mybatis.mapper.common.Mapper<Dutytable>{

	public List<Dutytable> list(Dutytable dutytable);
	
	
	public List<Dutytable> getDutytableByDate(@Param("startdate") String startdate,@Param("enddate") String enddate);
	
}
