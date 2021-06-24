package com.gwideal.core.cms.l3.dao;

import java.math.BigDecimal;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.gwideal.core.cms.l4.entity.LinksInfo;

public interface LinksInfoMapper  extends tk.mybatis.mapper.common.Mapper<LinksInfo>{
	
	public List<LinksInfo> list(LinksInfo friendlyLink);

	int batchDelete(@Param("ids") List<BigDecimal> ids);
}
