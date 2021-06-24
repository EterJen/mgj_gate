package com.gwideal.core.yeWu.l2.service;

import com.gwideal.core.yeWu.l3.dao.PyOverSeasUserMapper;
import com.gwideal.core.yeWu.l4.entity.PyOverSeasUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@Transactional
public class PyOverSeasUserService {


   @Autowired
   private PyOverSeasUserMapper pyOverSeasUserMapper;

   /**
    * 根据用户名密码获取用户
    * @param username
    * @param password
    * @return
    */
   public PyOverSeasUser getPyOverSeasUser(String username,String password){
      return pyOverSeasUserMapper.getPyOverSeasUser(username,password);
   }

   /**
    * 根据token找用户
    * 重置密码
    * @param token
    * @return
    */
   public PyOverSeasUser getPyOverSeasUserToken(String token){
      return pyOverSeasUserMapper.getPyOverSeasUserToken(token);
   }

   /**
    * 注册
    * @param username
    * @param password
    * @param email
    * @param organname
    */
   public void savePyOverSeasUser(String username,String password,String email,String organname){
      pyOverSeasUserMapper.savePyOverSeasUser(username,password,email,organname);
   }

   /**
    * 找回密码，生成token
    * @param username
    * @param token
    */
   public void updatePyOverSeasUserToken(String username,String token){
      pyOverSeasUserMapper.updatePyOverSeasUserToken(username,token);
   }

   /**
    * 重置密码
    * 根据token重置password，token
    * @param password
    * @param token
    */
   public void updatePyOverSeasUserTokenPassword(String password,String token){
      pyOverSeasUserMapper.updatePyOverSeasUserTokenPassword(password,token);
   }


}
