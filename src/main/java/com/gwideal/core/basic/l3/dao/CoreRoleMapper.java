package com.gwideal.core.basic.l3.dao;

import com.gwideal.core.cms.l4.entity.Administrator;
import org.apache.ibatis.annotations.Mapper;

import java.math.BigDecimal;
import java.util.List;

import  com.gwideal.core.basic.l4.entity.*;

import org.apache.ibatis.annotations.Param;


@Mapper
public interface CoreRoleMapper extends tk.mybatis.mapper.common.Mapper<CoreRole>{

	public List<CoreRole> list(CoreRole coreRole);
	
	public List<CoreRole> listByClickrate(CoreRole coreRole);

	public List<Administrator> queryUserByRid(BigDecimal id);
	
	public int saveRoleUser(CoreRole coreRole);
	
	public BigDecimal queryMaxUserOrderNumByRoleId(BigDecimal id);
	
	public int deleteRoleUser(CoreRole coreRole);
	
	public List<CoreRole> searchRoleByName(CoreRole CoreRole);
	
	public List<CoreRole> searchRoleByNameLike(CoreRole CoreRole);

	public List<CoreRole> queryUsersByRole(CoreRole CoreRole);

	List<Administrator> notExistsUsers(BigDecimal roleId);
}
