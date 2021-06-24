package com.gwideal.core.basic.l3.dao;

import com.gwideal.core.basic.l4.entity.DicCategory;
import com.gwideal.core.basic.l4.entity.DicMode;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.math.BigDecimal;
import java.util.List;


@Mapper
public interface DicCategoryMapper extends tk.mybatis.mapper.common.Mapper<DicCategory>{

	public List<DicCategory> list(DicCategory dicCategory);

    Integer delDicModes(@Param("id") BigDecimal id, @Param("dicModes") List<DicMode> dicModes);
}
