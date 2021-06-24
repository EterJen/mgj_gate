package com.gwideal.core.basic.l2.service;


import com.gwideal.core.basic.l3.dao.DicModeMapper;
import com.gwideal.core.basic.l4.entity.DicMode;
import com.gwideal.core.basic.l4.entity.DicType;
import com.gwideal.core.cms.l2.service.AdministratorService;
import com.gwideal.core.cms.l3.dao.AdministratorMapper;
import com.gwideal.core.cms.l4.entity.Administrator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional
public class CacheService {
    /*用户信息缓存*/
    @Autowired
    private AdministratorService administratorService;


    @Autowired
    private AdministratorMapper administratorMapper;
    @Autowired
    private DicModeMapper dicModeMapper;

    @CacheEvict(value = "mixMap", key = "#key")
    public void rmMixMapByKey(String key) {
        System.out.println("从 [系统] 缓存 清除" + "[" + key + "]");
    }

    @CacheEvict(value = "mixMap", allEntries = true)
    public void cleanMixMap(String key) {
        System.out.println("清空 [系统] 缓存 ");
    }


    @Cacheable(value = "mixMap", key = "#key")
    public Object cacheMixMap(String key, Object o) {
        return o;
    }


    @CacheEvict(value = "users", allEntries = true)
    public void cleanCacheUsers(Administrator coreUser) {
        System.out.println("清空 [users] 缓存 ");
    }

    @CacheEvict(value = "users", key = "'user'+ #coreUser.getId()")
    public void mvUserCache(Administrator coreUser) {
        System.out.println("从 [users] 中清除 [" + coreUser.getId() + "] 用户的缓存");
    }


    @Cacheable(value = "users", key = "'user'+ #coreUser.getId()")
    public Administrator cacheUser(Administrator coreUser) {
        return administratorService.wrapUser(coreUser);
    }


    @CacheEvict(value = "byAgentUsers", key = "'byAgentUser'+ #coreUser.getId()")
    public void mvByAgentUsers(Administrator coreUser) {
        System.out.println("从 [byAgentUsers] 中清除 [" + coreUser.getId() + "] 用户的缓存");
    }

    /*字典缓存*/
    @Cacheable(value = "dicModes", key = "'dic'+ #dicMode.getDictype()")
    public DicMode findDicMod(DicMode dicMode) {
        DicMode result = dicModeMapper.findDicMod(dicMode);
        Map<String, DicType> dicTypeMap = result.getDicTypes().stream().collect(Collectors.toMap(DicType::getEname, a -> a, (k1, k2) -> k1));
        result.setDicTypeMap(dicTypeMap);
        return result;
    }

    @CacheEvict(value = "dicModes", allEntries = true)
    public void cleanCachDicMods(DicMode dicMode) {
        System.out.println("清空 [dicModes] 缓存 ");
    }

    @CacheEvict(value = "dicModes", key = "'dic'+ #dicMode.getDictype")
    public void mvCachDicMod(DicMode dicMode) {
        System.out.println("从 [dicModes] 中清除 [" + dicMode.getId() + "] 字典的缓存");
    }
}
