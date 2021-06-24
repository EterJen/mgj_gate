package com.gwideal.core.cms.l3.dao;

import com.gwideal.core.cms.l4.entity.IndexIcon;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;


@Mapper
public interface IndexIconMapper extends tk.mybatis.mapper.common.Mapper<IndexIcon>{

	public List<IndexIcon> list(IndexIcon indexIcon);

	public List<IndexIcon> queryIconsIsContainUserIcon(IndexIcon indexIcon);

}
