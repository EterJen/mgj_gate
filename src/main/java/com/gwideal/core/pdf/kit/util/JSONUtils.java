package com.gwideal.core.pdf.kit.util;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializeConfig;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.alibaba.fastjson.serializer.SimpleDateFormatSerializer;


import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 
 * DESC: 封装一个结果类型的字符串，包括success和msg两个字段
 */
public class JSONUtils {
	//格式化日期
    private static String dateFormat;
    static {
        dateFormat = "yyyy-MM-dd HH:mm:ss";
    }

    private static SerializeConfig mapping = new SerializeConfig();
    static {
        //jackson默认写出的时间数据为时间戳， 这里修改为相应模式的时间数据输出格式
        mapping.put(Date.class, new SimpleDateFormatSerializer(dateFormat));
    }

    /**
     * 将对象或集合转换为json字符串
     * @param obj
     * @return
     */
    public final static String toString(Object obj){
        return JSONObject.toJSONStringWithDateFormat(obj, "yyyy-MM-dd HH:mm:ss", SerializerFeature.WriteMapNullValue);
    }

    /**
     * 将对象或集合转换为json字符串
     * @param obj
     * @return
     */
    public final static String toStringWithoutNull(Object obj){
        return JSONObject.toJSONStringWithDateFormat(obj, "yyyy-MM-dd HH:mm:ss");
    }

    /**
     * 将结果字符串转换为标准结果集
     * @param success
     * @param msg
     * @return {"success":success,"msg":msg}
     */
    public final static String toStringResult(boolean success, String msg){
        return String.format("{\"success\":%s,\"msg\":\"%s\"}", success?"true":"false", msg);
    }

    public final static String toStatusResult(int status, Object data){
        return String.format("{\"status\":%s,\"data\":%s}", status, toString(data));
    }


    /**
     * 将对象转换为标准结果集
     * @param success
     * @param msg
     * @return {"success":success,"msg":msg}
     */
    public final static String toObjectResult(boolean success, Object msg){
        if (msg != null)
            return String.format("{\"success\":%s,\"msg\":%s}", success, JSONObject.toJSONStringWithDateFormat(msg, "yyyy-MM-dd HH:mm:ss", SerializerFeature.WriteMapNullValue));
        else //把null集合转换为[]，是为了kendo ui dataSource，直接返回null，会出现Status code=200的异常
            return String.format("{\"success\":%s,\"msg\":\"[]\"}", success);
    }

    public final static String toString(String key, Object msg){
        return String.format("{\"%s\":%s}", key, JSONObject.toJSONStringWithDateFormat(msg, "yyyy-MM-dd HH:mm:ss", SerializerFeature.WriteMapNullValue));
    }

    public final static String toPageString(Integer total, List data){
        if (total == null || total == 0)
            return emptyPageString();

        return String.format("{\"total\":%s, \"data\":%s}", total, JSONObject.toJSONStringWithDateFormat(data, "yyyy-MM-dd HH:mm:ss"));
    }

    public final static String toPageString(List data){
        if (data.size() == 0)
            return emptyPageString();

        return String.format("{\"total\":%s, \"data\":%s}", data.size(), JSONObject.toJSONStringWithDateFormat(data, "yyyy-MM-dd HH:mm:ss"));
    }

    public final static String emptyPageString(){
        return "{\"total\":0, \"data\":\"\"}";
    }
   
 
    public static Object toBean(String text) {
        return JSON.parse(text);
    }
 
    public static <T> T toBean(String text, Class<T> clazz) {
        return JSON.parseObject(text, clazz);
    }
 
    // 转换为数组
    public static <T> Object[] toArray(String text) {
        return toArray(text, null);
    }
 
    // 转换为数组
    public static <T> Object[] toArray(String text, Class<T> clazz) {
        return JSON.parseArray(text, clazz).toArray();
    }
 
    // 转换为List
    public static <T> List<T> toList(String text, Class<T> clazz) {
        return JSON.parseArray(text, clazz);
    }
 
    /**
     * 将javabean转化为序列化的json字符串
     * @param keyvalue
     * @return
     */
    /*public static Object beanToJson(KeyValue keyvalue) {
        String textJson = JSON.toJSONString(keyvalue);
        Object objectJson  = JSON.parse(textJson);
        return objectJson;
    }*/
    
    /**
     * 将string转化为序列化的json字符串
     * @param keyvalue
     * @return
     */
    public static Object textToJson(String text) {
        Object objectJson  = JSON.parse(text);
        return objectJson;
    }
    
    /**
     * json字符串转化为map
     * @param s
     * @return
     */
    public static <K, V> Map<K, V>  stringToCollect(String s) {
    	Map<K, V> m = (Map<K, V>) JSONObject.parseObject(s);
        return m;
    }
    
    /**
     * 转换JSON字符串为对象
     * @param jsonData
     * @param clazz
     * @return
     */
    public static Object convertJsonToObject(String jsonData, Class<?> clazz) {
    	return JSONObject.parseObject(jsonData, clazz);
    }
    
    public static Object convertJSONToObject(String content, Class<?> clazz) {
		return JSONObject.parseObject(content, clazz);
	}
    
    /**
     * 将map转化为string
     * @param m
     * @return
     */
    public static <K, V> String collectToString(Map<K, V> m) {
        String s = JSONObject.toJSONString(m);
        return s;
    }
    

}