package com.gwideal.core.basic.l3.dao;

import org.apache.ibatis.annotations.Mapper;
import java.util.List;
import  com.gwideal.core.basic.l4.entity.*;
import org.apache.ibatis.annotations.Param;


@Mapper
public interface CoreMpsavailModuleMapper extends tk.mybatis.mapper.common.Mapper<CoreMpsavailModule>{

	public List<CoreMpsavailModule> list(CoreMpsavailModule coreMpsavailModule);
	
	public int deletePermiss(CoreMpsavailModule coreMpsavailModule);
	
	
}
