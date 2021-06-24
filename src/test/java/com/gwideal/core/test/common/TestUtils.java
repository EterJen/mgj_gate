package com.gwideal.core.test.common;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.beans.PropertyDescriptor;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.util.Date;
import java.util.HashSet;
import java.util.Random;
import java.util.Set;

import javax.persistence.Transient;

import org.apache.commons.collections.CollectionUtils;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.test.web.servlet.MockMvc;

import com.gwideal.mybatis.metautils.JsonUtils;
import com.gwideal.mybatis.metautils.ResultInfo;

@Component
public class TestUtils {
	
	public <P> ResultInfo<P> request(String path,String contentJsonStr,Class<P> beanClass ,String tokenStr,MockMvc mockMvc) throws UnsupportedEncodingException, Exception{
		String resultJson = 
				mockMvc.perform(post(path)
				.contentType(MediaType.APPLICATION_JSON)
				.content(contentJsonStr)
				.header("Authorization", "Bearer "+tokenStr))
    			.andExpect(status().isOk()).andReturn().getResponse().getContentAsString();
		return (ResultInfo<P>)JsonUtils.readByParametricType(resultJson, ResultInfo.class,beanClass);
	}
	
	public void setInitValues(Object beanObject,String[] notSetFields) throws Exception{
		Field[] fields = beanObject.getClass().getDeclaredFields();
		Set<String> notSetFieldsSet = new HashSet<String>();
		CollectionUtils.addAll(notSetFieldsSet, notSetFields);
		for(Field f:fields){
			Transient t = f.getAnnotation(Transient.class);
			if(t==null&&!notSetFieldsSet.contains(f.getName())){
				if(f.getType().getName().equals("java.lang.String")){
					PropertyDescriptor pd = new PropertyDescriptor(f.getName(), beanObject.getClass());
					pd.getWriteMethod().invoke(beanObject, getRandomString(1));
				}else if(f.getType().getName().equals("java.lang.Integer")){
					PropertyDescriptor pd = new PropertyDescriptor(f.getName(), beanObject.getClass());
					pd.getWriteMethod().invoke(beanObject, getRandomInteger());
				}else if(f.getType().getName().equals("java.math.BigDecimal")){
					PropertyDescriptor pd = new PropertyDescriptor(f.getName(), beanObject.getClass());
					pd.getWriteMethod().invoke(beanObject, getRandomBigDecimal());
				}else if(f.getType().getName().equals("java.util.Date")){
					PropertyDescriptor pd = new PropertyDescriptor(f.getName(), beanObject.getClass());
					pd.getWriteMethod().invoke(beanObject, new Date());
				}else{
					throw new Exception("不受管理的类型");
				}
			}
		}
	}
	
	public void checkValues(Object aBean,Object bBean,String[] notCompareFieldList) throws Exception{
		if(!aBean.getClass().getName().equals(bBean.getClass().getName())){
			throw new Exception("不同类型的对象无法比较");
		}
		Field[] afields = aBean.getClass().getDeclaredFields();
		Set<String> notCompareFieldSet = new HashSet<String>();
		CollectionUtils.addAll(notCompareFieldSet, notCompareFieldList);
		for(Field f:afields){
			Transient t = f.getAnnotation(Transient.class);
			if(t==null&&!notCompareFieldSet.contains(f.getName())){
				if(f.getType().getName().equals("java.lang.String")){
					PropertyDescriptor apd = new PropertyDescriptor(f.getName(), aBean.getClass());
					PropertyDescriptor bpd = new PropertyDescriptor(f.getName(), bBean.getClass());
					String avalue = (String)apd.getReadMethod().invoke(aBean, null);
					String bvalue = (String)apd.getReadMethod().invoke(bBean, null);
					if(avalue==null){
						System.out.println("字段"+f.getName()+"的值为空");
					}
					if(!avalue.equals(bvalue))
						throw new Exception("字段："+f.getName()+"的值不同，第一个值是："+avalue+"第二个值是："+bvalue);
				}else if(f.getType().getName().equals("java.lang.Integer")){
					PropertyDescriptor apd = new PropertyDescriptor(f.getName(), aBean.getClass());
					PropertyDescriptor bpd = new PropertyDescriptor(f.getName(), bBean.getClass());
					Integer avalue = (Integer)apd.getReadMethod().invoke(aBean, null);
					Integer bvalue = (Integer)apd.getReadMethod().invoke(bBean, null);
					if(avalue==null){
						System.out.println("字段"+f.getName()+"的值为空");
					}
					if(!avalue.equals(bvalue))
						throw new Exception("字段："+f.getName()+"的值不同，第一个值是："+avalue+"第二个值是："+bvalue);
				}else if(f.getType().getName().equals("java.math.BigDecimal")){
					PropertyDescriptor apd = new PropertyDescriptor(f.getName(), aBean.getClass());
					PropertyDescriptor bpd = new PropertyDescriptor(f.getName(), bBean.getClass());
					BigDecimal avalue = (BigDecimal)apd.getReadMethod().invoke(aBean, null);
					BigDecimal bvalue = (BigDecimal)apd.getReadMethod().invoke(bBean, null);
					if(avalue==null){
						System.out.println("字段"+f.getName()+"的值为空");
					}
					if(!avalue.equals(bvalue))
						throw new Exception("字段："+f.getName()+"的值不同，第一个值是："+avalue+"第二个值是："+bvalue);
				}else if(f.getType().getName().equals("java.util.Date")){
					PropertyDescriptor apd = new PropertyDescriptor(f.getName(), aBean.getClass());
					PropertyDescriptor bpd = new PropertyDescriptor(f.getName(), bBean.getClass());
					Date avalue = (Date)apd.getReadMethod().invoke(aBean, null);
					Date bvalue = (Date)apd.getReadMethod().invoke(bBean, null);
					if(avalue==null){
						System.out.println("字段"+f.getName()+"的值为空");
					}
					if(!avalue.equals(bvalue))
						throw new Exception("字段："+f.getName()+"的值不同，第一个值是："+avalue+"第二个值是："+bvalue);
				}else{
					throw new Exception("不受管理的类型");
				}
			}
		}
	}
	
	
	
	public String getRandomString(int length) { //length表示生成字符串的长度  
	    String base = "abcdefghijklmnopqrstuvwxyz0123456789";     
	    Random random = new Random();     
	    StringBuffer sb = new StringBuffer();     
	    for (int i = 0; i < length; i++) {     
	        int number = random.nextInt(base.length());     
	        sb.append(base.charAt(number));     
	    }     
	    return sb.toString();     
	}
	
	public Integer getRandomInteger(){
		int max=9;
	    int min=1;
        Random random = new Random();
        int s = random.nextInt(max)%(max-min+1) + min;
        return s;
	}
	
	public BigDecimal getRandomBigDecimal(){
		int max=9;
	    int min=1;
        Random random = new Random();
        int s = random.nextInt(max)%(max-min+1) + min;
        return new BigDecimal(s+"");
	}
	
	
	
}
