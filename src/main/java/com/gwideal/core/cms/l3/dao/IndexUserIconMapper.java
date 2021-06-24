package com.gwideal.core.cms.l3.dao;

import com.gwideal.core.cms.l4.entity.IndexUserIcon;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;


@Mapper
public interface IndexUserIconMapper extends tk.mybatis.mapper.common.Mapper<IndexUserIcon>{

	public List<IndexUserIcon> list(IndexUserIcon indexUserIcon);


}
