package com.gwideal.core.jwt;

import org.springframework.stereotype.Component;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class LoginUserInfo {

	//当前系统实例中已登录用户的信息：用户username和当前用户登录的token的map，用于控制单一用户和用户替换的要求。对于多模式用户不做控制；
    private Map<String, Set<String>> loginUserInfo = new ConcurrentHashMap<>();
    
    public Set<String> getTokenByUsername(String username){
	    return loginUserInfo.get(username);
	}
    
    public String putUserInfo(String username, String token){
	    Set<String> tokenSet = loginUserInfo.get(username);
	    if (null == tokenSet || tokenSet.isEmpty()) {
		    tokenSet = new HashSet<>();
	    }
	    tokenSet.add(token);
	    loginUserInfo.put(username, tokenSet);
	    return token;
    }
    
    public void removeUserInfo(String username){
    	loginUserInfo.remove(username);
    }

	public String getUserNameByToken(String token) {
		Iterator<Map.Entry<String, Set<String>>> iterator = loginUserInfo.entrySet().iterator();
		while (iterator.hasNext()) {
			Map.Entry<String, Set<String>> next = iterator.next();
			if (next.getValue().contains(token)) {
				return next.getKey();
			}
		}
		return null;
	}

}
