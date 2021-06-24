package com.gwideal.core.cms.l3.dao;

import com.gwideal.core.cms.l4.entity.ForeignAffairsCertificate;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.math.BigDecimal;
import java.util.List;


@Mapper
public interface ForeignAffairsCertificateMapper extends tk.mybatis.mapper.common.Mapper<ForeignAffairsCertificate>{

	public List<ForeignAffairsCertificate> list(ForeignAffairsCertificate foreignAffairsCertificate);

}
