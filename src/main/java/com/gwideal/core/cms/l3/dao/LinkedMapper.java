package com.gwideal.core.cms.l3.dao;

import com.gwideal.core.cms.l4.entity.Linked;
import org.apache.ibatis.annotations.Mapper;

import java.math.BigDecimal;
import java.util.List;


@Mapper
public interface LinkedMapper extends tk.mybatis.mapper.common.Mapper<Linked>{

	public List<Linked> list(Linked linked);

	BigDecimal selectMaxSortId(Linked link);
}
