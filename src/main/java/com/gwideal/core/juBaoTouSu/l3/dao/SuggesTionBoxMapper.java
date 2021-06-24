package com.gwideal.core.juBaoTouSu.l3.dao;

import com.gwideal.core.juBaoTouSu.l4.entity.SuggesTionBox;
import com.gwideal.core.juBaoTouSu.l4.entity.SuggesTionBoxCL;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface SuggesTionBoxMapper extends tk.mybatis.mapper.common.Mapper<SuggesTionBox>{

    public void saveSuggesTionBox(@Param("name") String name, @Param("tel") String tel,
                                  @Param("suggestion_Email")String suggestion_Email,
                                  @Param("suggestion_title")String suggestion_title,
                                  @Param("suggestion_body")String suggestion_body);

    public List<SuggesTionBox> list(SuggesTionBox suggesTionBox);
}

