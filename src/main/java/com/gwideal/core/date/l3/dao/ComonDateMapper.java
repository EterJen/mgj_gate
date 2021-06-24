package com.gwideal.core.date.l3.dao;

import org.apache.ibatis.annotations.Mapper;
import java.util.List;
import  com.gwideal.core.date.l4.entity.*;
import org.apache.ibatis.annotations.Param;


@Mapper
public interface ComonDateMapper extends tk.mybatis.mapper.common.Mapper<ComonDate>{

	public List<ComonDate> list(ComonDate comonDate);

    void updateCommon(ComonDate updateBean);
}
