package com.gwideal.core.basic.l3.dao;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

import  com.gwideal.core.basic.l4.entity.*;

import org.apache.ibatis.annotations.Param;


@Mapper
public interface CoreMpsModuleMapper extends tk.mybatis.mapper.common.Mapper<CoreMpsModule>{

	public List<CoreMpsModule> list(CoreMpsModule coreMpsModule);
	
	public List<CoreMpsModule> listtree(CoreMpsModule coreMpsModule);

	public int deletePermiss(CoreMpsModule coreMpsModule);

	public int insertPermiss(CoreMpsModule coreMpsModules);

	public List<CoreMpsModule> queryUserListByMpsmoduleId(CoreMpsModule coreMpsModule);
	
}
