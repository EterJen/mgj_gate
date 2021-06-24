package com.gwideal.core.basic.l3.dao;

import com.gwideal.core.basic.l4.entity.DicType;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;


@Mapper
public interface DicTypeMapper extends tk.mybatis.mapper.common.Mapper<DicType>{

	public List<DicType> list(DicType dicType);

    Integer delDicTypes(@Param("dicTypes") List<DicType> dicTypes);

    List<DicType> getDicTypesByDicModeName(@Param("modeName") String modeName);

    public List<DicType> queryByModeDicTypeList(DicType dicType);

    String queryMaxNumber(DicType dicType);
}
