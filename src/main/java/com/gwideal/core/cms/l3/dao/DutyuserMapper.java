package com.gwideal.core.cms.l3.dao;

import com.gwideal.core.cms.l4.entity.Dutyuser;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.math.BigDecimal;
import java.util.List;


@Mapper
public interface DutyuserMapper extends tk.mybatis.mapper.common.Mapper<Dutyuser>{

	public List<Dutyuser> list(Dutyuser dutyuser);

    BigDecimal selectMaxSortId(Dutyuser d);
    
    public List<Dutyuser>  getDutyusers(@Param("department") String department);


    void adjustSortId(Dutyuser dutyuser);
}
