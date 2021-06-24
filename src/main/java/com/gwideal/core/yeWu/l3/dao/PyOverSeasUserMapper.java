package com.gwideal.core.yeWu.l3.dao;

import com.gwideal.core.yeWu.l4.entity.PyOverSeasUser;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface PyOverSeasUserMapper extends tk.mybatis.mapper.common.Mapper<PyOverSeasUser>{

    public PyOverSeasUser getPyOverSeasUser(@Param("username") String username, @Param("password") String password);

    public void savePyOverSeasUser(@Param("username") String username, @Param("password") String password,
                                             @Param("email")String email,@Param("organname")String organname);

    public void updatePyOverSeasUserToken(@Param("username") String username, @Param("token") String token);

    public void updatePyOverSeasUserTokenPassword(@Param("password") String password, @Param("token") String token);

    public PyOverSeasUser getPyOverSeasUserToken(@Param("token") String token);



}
