package com.gwideal.core.basic.ehcache;

import net.sf.ehcache.Cache;
import net.sf.ehcache.Element;
import org.springframework.cache.ehcache.EhCacheCacheManager;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

@Service
public class EhcacheUtil extends EhcacheHelper {
	@Resource
	EhCacheCacheManager ehCacheCacheManager;
	
    /**
     * 指定缓存失效时间
     * @param key 键
     * @param time 时间(秒)
     * @return
     */
    public boolean expire(String name,String key,long time){
        try {
            if(time>0){
            	Cache cache = ehCacheCacheManager.getCacheManager().getCache(name);
            	Element element = cache.get(key);
            	element.setTimeToLive((int) time);
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    
    /**
     * 根据key 获取过期时间
     * @param key 键 不能为null
     * @return 时间(秒) 返回0代表为永久有效
     */
    public long getExpire(String name,String key){
    	Cache cache = ehCacheCacheManager.getCacheManager().getCache(name);
    	Element element = cache.get(key);
        return element.getTimeToLive();
    }
    
    /**
     * 删除缓存
     * @param key 可以传一个值 或多个
     */
    public void del(String name, String ... key){
    	Cache cache = ehCacheCacheManager.getCacheManager().getCache(name);
		for(String k : key) {
			cache.remove(k);
		}
    }
    
    /**
     * 普通缓存获取
     * @param key 键
     * @return 值
     */
    public Object get(String name,String key){
    	Cache cache = ehCacheCacheManager.getCacheManager().getCache(name);
    	Element element = cache.get(key);
        return element==null?null:element.getObjectValue();
    }
    
    /**
     * 普通缓存放入
     * @param key 键
     * @param value 值
     * @return true成功 false失败
     */
    public boolean set(String name,String key,Object value) {
        try {
        	Cache cache = ehCacheCacheManager.getCacheManager().getCache(name);
            /*if (cache == null) {
                ehCacheCacheManager.getCacheManager().;
            }*/
        	Element element = new Element(key, value);
        	cache.put(element);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    
    /**
     * 普通缓存放入并设置时间
     * @param key 键
     * @param value 值
     * @param time 时间(秒) time要大于0 如果time小于等于0 将设置无限期
     * @return true成功 false 失败
     */
    public boolean set(String name,String key,Object value,long time){
        try {
            if(time>0){
            	Cache cache = ehCacheCacheManager.getCacheManager().getCache(name);
            	Element element = new Element(key, value);
            	cache.put(element);
            	element.setTimeToIdle((int) time);
            }else{
                set(name, key, value);
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    
    /**
     * 获取hashKey对应的所有键值
     * @param key 键
     * @return 对应的多个键值
     */
    @SuppressWarnings("unchecked")
	public Map<Object,Object> hmget(String name,String key){
    	return (Map<Object, Object>) get(name, key);
    }
    
    /**
     * 向一张hash表中放入数据,如果不存在将创建
     * @param key 键
     * @param item 项
     * @param value 值
     * @return true 成功 false失败
     */
    public boolean hset(String name,String key,String item,Object value) {
        try {
        	Map<String,Object> map = new HashMap<String, Object>();
        	map.put(item, value);
        	set(name, key, map);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    
    /**
     * 删除hash表中的值
     * @param key 键 不能为null
     * @param item 项 可以使多个 不能为null
     */
    public void hdel(String name, String key,Object... item){
    	Map<Object,Object> map = hmget(name,key);
    	if(map==null)return;
    	for(Entry<Object, Object> e : map.entrySet()) {
    		for(Object o : item) {
    			if(o.toString().equals(e.getKey().toString()))map.remove(o);
    		}
    	}
    }
    
    /**
     * 存在
     * @param key
     * @param values
     * @param name
     * @return
     */
    public Boolean sSetIsMember(String name, String key, Object values) {
        try {
        	Cache cache = ehCacheCacheManager.getCacheManager().getCache(name);
            if (cache == null) {
                return false;
            }
        	Element element = cache.get(key);
        	if(element == null)return false;
    		return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    
    /**
     * 将set数据放入缓存
     * @param key 键
     * @param time 时间(秒)
     * @param values 值 可以是多个
     * @return 成功个数
     */
    public long sSetAndTime(String name,String key,long time,Object... values) {
        try {
        	Map<String,Object> map = new HashMap<String,Object>();
        	map.put(key, values);
        	set(name, key, values);
            if(time>0) expire(name, key, time);
            return 1;
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }
    
    /**
     * 获取set缓存的长度
     * @param key 键
     * @return
     */
    public long sGetSetSize(String name,String key){
        try {
        	Cache cache = ehCacheCacheManager.getCacheManager().getCache(name);
        	Element element = cache.get(key);
        	return element.getSerializedSize();
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }
    
    /**
     * 移除值为value的
     * @param key 键
     * @param values 值 可以是多个
     * @return 移除的个数
     */
    public long setRemove(String name,String key, Object ...values) {
    	try {
        	Map<Object,Object> map = hmget(key, name);
        	for(Entry<Object, Object> e : map.entrySet()) {
        		for(Object o : values) {
        			if(o.toString().equals(e.getValue().toString()))map.remove(e.getKey());
        		}
        	}
        	return 1;
		} catch (Exception e) {
			return 0;
		}
    }
    
    public void delKeysLike(String name,String s) {
    	Cache cache = ehCacheCacheManager.getCacheManager().getCache(name);
    	List<?> list = cache.getKeys();
    	for(Object ls : list) {
    		if(String.valueOf(ls).contains(s)) {
    			cache.remove(ls);
    		}
    	}
    }
    
    public void cleanCache() {
    	ehCacheCacheManager.getCacheManager().clearAll();
    }

    public void cleanNotByUserCache() {
        String[] cacheNames = ehCacheCacheManager.getCacheManager().getCacheNames();
        System.out.println(cacheNames.toString());
        for (String cacheName : cacheNames) {
            ehCacheCacheManager.getCacheManager().clearAllStartingWith(cacheName);
        }
    }


    /*
     * 使用set数据结构　 用于多用户登录　一个用户名　可存存多个token 　后台根据用户名　取有效token 实现单用户登录　主动踢出　禁止登录等
     * 涉及修改ｓｅｔ　防止脏数据　需要加锁原子操作　添加和删除元素不要单独使用　线程不安全　查询不用
     * */
    public enum EsopType {
        ADD,
        REMOVE,
    }
    public synchronized boolean esPushOrRemove(EsopType esopType,String name,String key,Object value) {
        if (EsopType.ADD.equals(esopType)) {
            return esPush(name, key,  value);
        } else if (EsopType.REMOVE.equals(esopType)) {
            return esRemove(name, key, value);
        } else {
            return false;
        }
    }
    private   boolean esPush(String name,String key,Object value) {
        boolean result = false;
        try {
            HashSet<Object> objectHashSet = esGet(name, key);
            if (null !=objectHashSet) {
                objectHashSet.add(value);
                set(name, key, objectHashSet);
                result = true;
            }
        } catch (Exception e) {
            e.printStackTrace();
            result = false;
        }finally {
            return result;
        }
    }
    private  boolean esRemove(String name,String key,Object value) {
        boolean result = false;
        try {
            HashSet<Object> objectHashSet = esGet(name, key);
            if (null !=objectHashSet) {
                objectHashSet.remove(value);
                set(name, key, objectHashSet);
                result = true;
            }
        } catch (Exception e) {
            e.printStackTrace();
            result = false;
        }finally {
            return result;
        }
    }
    public  boolean esIsMember(String name,String key,Object value) {
        boolean result = false;
        try {
            HashSet<Object> objectHashSet = esGet(name, key);
            if (null !=objectHashSet) {
                if (objectHashSet.contains(value)) {
                    result = true;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            result = false;
        }finally {
            return result;
        }
    }
    public  HashSet<Object> esGet(String name,String key) {
        HashSet<Object> result = null;
        try {
            Object o = get(name, key);
            if (null == o) {
                result = new HashSet<>();
            } else {
                result = (HashSet<Object>) o;
            }

        } catch (Exception e) {
            result = null;
            e.printStackTrace();
        }finally {
            return result;
        }
    }
}
