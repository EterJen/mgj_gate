package com.gwideal.core.basic.l2.service;


import com.gwideal.core.basic.ehcache.EhcacheUtil;
import com.gwideal.core.basic.l3.dao.DicModeMapper;
import com.gwideal.core.cms.l4.entity.Administrator;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;


@Service
public class RedisUserLoginInfo {
    @Autowired
    EhcacheUtil redisMapper;

    @Autowired
    private RedisServiceHandle redisServiceHandle;

    @Autowired
    private DicModeMapper dicModeMapper;

    public static final  String LOGIN_SET_KEYPREFIX = "loginInfoSet:userName:";
    public static final String LOGIN_KEYPRIFIX = "loginInfo:sessionId:";
    private static long LOGIN_EXPIRE_TIME = 86400;

    /*向用户登陆set,map中添加记录*/
    public boolean login(Administrator coreUser) {
        boolean pushOK = redisMapper.esPushOrRemove(EhcacheUtil.EsopType.ADD, "user", LOGIN_SET_KEYPREFIX + coreUser.getName(), coreUser.getSessionId());
        boolean setOk = redisMapper.set("user", LOGIN_KEYPRIFIX + coreUser.getSessionId(), coreUser.getName(), LOGIN_EXPIRE_TIME);
        return (pushOK && setOk);
    }

    /*判断用户是否登陆有效*/
    public boolean effective(Administrator coreUser) {
        return redisMapper.esIsMember("user", LOGIN_SET_KEYPREFIX + coreUser.getName(), coreUser.getSessionId());
    }

    public String getUserNameByToken(String sessionid) {
        return (String) redisMapper.get("user",LOGIN_KEYPRIFIX + sessionid);
    }

    /*向用户登陆set,map中删除记录*/
    public boolean logout(Administrator coreUser) {
        redisMapper.esPushOrRemove(EhcacheUtil.EsopType.REMOVE,"user",LOGIN_SET_KEYPREFIX + coreUser.getName(), coreUser.getSessionId());
        redisMapper.del("user", LOGIN_KEYPRIFIX + coreUser.getSessionId());
        return true;
    }

    public boolean loginUnique(Administrator coreUser) {
        redisMapper.del("user", LOGIN_SET_KEYPREFIX + coreUser.getName());
        redisMapper.del("user", LOGIN_KEYPRIFIX + coreUser.getSessionId());
        return login(coreUser);
    }

    public boolean hasLogin(Administrator coreUser) {
        boolean res = false;
        HashSet<Object> objectHashSet = redisMapper.esGet("user", LOGIN_SET_KEYPREFIX + coreUser.getName());
        if (CollectionUtils.isNotEmpty(objectHashSet)) {
            res = true;
        }
        return res;
    }

	public String getSessionidByUserName(Administrator coreUser) {
		Set<Object> sessionids = (Set<Object>) redisMapper.get("user",LOGIN_SET_KEYPREFIX + coreUser.getName());
		return String.valueOf(sessionids.stream().filter(s -> StringUtils.isNotBlank(this.getUserNameByToken(String.valueOf(s)))).findFirst().orElseGet(String::new));
	}
}

