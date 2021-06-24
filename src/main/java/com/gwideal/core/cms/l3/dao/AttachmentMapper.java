package com.gwideal.core.cms.l3.dao;

import org.apache.ibatis.annotations.Mapper;
import java.util.List;
import  com.gwideal.core.cms.l4.entity.*;
import org.apache.ibatis.annotations.Param;


@Mapper
public interface AttachmentMapper extends tk.mybatis.mapper.common.Mapper<Attachment>{

	public List<Attachment> list(Attachment attachment);
	
}
