package com.gwideal.core.basic.l3.dao;

import com.gwideal.core.basic.l4.entity.DicMode;
import com.gwideal.core.basic.l4.entity.DicType;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.math.BigDecimal;
import java.util.List;


@Mapper
public interface DicModeMapper extends tk.mybatis.mapper.common.Mapper<DicMode>{

	public List<DicMode> list(DicMode dicMode);
	List<DicType> queryDicTypes(@Param("dicModeId") BigDecimal id, @Param("dicType") DicType queryBean);
	List<DicType> dicTypeList(@Param("dicMode") DicMode dicMode, @Param("dicType") DicType queryBean);

    DicMode findDicMod(DicMode dicMode);
}
