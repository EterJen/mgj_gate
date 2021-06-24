package com.gwideal.core.cms.l3.dao;

import com.gwideal.core.cms.l4.entity.Twolevelcolumn;
import org.apache.ibatis.annotations.Mapper;

import java.math.BigDecimal;
import java.util.List;


@Mapper
public interface TwolevelcolumnMapper extends tk.mybatis.mapper.common.Mapper<Twolevelcolumn>{

	public List<Twolevelcolumn> list(Twolevelcolumn twolevelcolumn);

	BigDecimal selectMaxNo(Twolevelcolumn twolevelcolumn);
}
