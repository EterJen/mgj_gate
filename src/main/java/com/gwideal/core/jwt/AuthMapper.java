package com.gwideal.core.jwt;

import com.gwideal.core.cms.l4.entity.Administrator;

import java.util.List;

public interface AuthMapper extends tk.mybatis.mapper.common.Mapper<Administrator> {

	public List<Administrator> findByUsername(String name);

    List<Administrator> findByName(String sname);
}
