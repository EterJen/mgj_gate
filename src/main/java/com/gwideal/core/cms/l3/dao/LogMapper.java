package com.gwideal.core.cms.l3.dao;

import org.apache.ibatis.annotations.Mapper;
import java.util.List;
import  com.gwideal.core.cms.l4.entity.*;
import org.apache.ibatis.annotations.Param;


@Mapper
public interface LogMapper extends tk.mybatis.mapper.common.Mapper<Log>{

	public List<Log> list(Log log);
	
}
