package com.gwideal.core.cms.l3.dao;

import com.gwideal.core.cms.l4.entity.Experts;
import com.gwideal.core.cms.l4.entity.Expertstype;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;


@Mapper
public interface ExpertsMapper extends tk.mybatis.mapper.common.Mapper<Experts>{

	public List<Experts> list(Experts experts);

	List<Experts> extract(Expertstype expertstype);
}
