package com.gwideal.core.cms.l3.dao;

import com.gwideal.core.basic.l4.entity.CoreRole;
import com.gwideal.core.cms.l4.entity.Administrator;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.math.BigDecimal;
import java.util.List;


@Mapper
public interface AdministratorMapper extends tk.mybatis.mapper.common.Mapper<Administrator>{

	public List<Administrator> list(Administrator administrator);

	List<CoreRole> queryUserRoles(Administrator corUser);

	@Select("select JXWOAUniversalSeq.nextval from dual")
	BigDecimal getSequence();

    List<Administrator> findUser(Administrator queryBean);
}
