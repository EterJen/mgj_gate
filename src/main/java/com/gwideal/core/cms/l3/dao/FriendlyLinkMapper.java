package com.gwideal.core.cms.l3.dao;

import org.apache.ibatis.annotations.Mapper;

import java.math.BigDecimal;
import java.util.List;
import  com.gwideal.core.cms.l4.entity.*;
import org.apache.ibatis.annotations.Param;


@Mapper
public interface FriendlyLinkMapper extends tk.mybatis.mapper.common.Mapper<FriendlyLink>{

	public List<FriendlyLink> list(FriendlyLink friendlyLink);

	int batchDelete(@Param("ids") List<BigDecimal> ids);
}
