package com.gwideal.core.pdf.kit.util;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
/**
 * HTTP接口调用
 * 
 * @author libing
 */
public class HTTPConnect {
	
	
	
	public static void main(String[] args) {
		new HTTPConnect().getImgByHTTP("http://172.17.12.1:8080/restcomponent/flow/seals/liuyp", "D:/liuyp.png");
	}
	
	/**
	 * 根据url调用接口返回img
	 * @param path
	 * 
	 */
	public void getImgByHTTP(String path,String desUrl){
		try {
		    URL url = new URL(path);
		    //打开和url之间的连接
		    HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		    //请求方式
		    //conn.setRequestMethod("POST");
		    //设置通用的请求属性
		    conn.setRequestProperty("accept", "*/*");
		    conn.setRequestProperty("connection", "Keep-Alive");
		    conn.setRequestProperty("user-agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)"); 
		    //设置超时时间
			conn.setConnectTimeout(5000);
		    conn.setDoOutput(true);
		    conn.setDoInput(true);
		    //获取URLConnection对象对应的输入流
		    InputStream is = conn.getInputStream();
		    FileOutputStream fos = new FileOutputStream(new File(desUrl));
            BufferedOutputStream bos = new BufferedOutputStream(fos);
            byte[] buffer = new byte[1024];
            int len = 0;
            while((len = is.read(buffer)) >0){
                bos.write(buffer, 0, len);
                bos.flush();
            }
            bos.close();
            is.close();
		    conn.disconnect();
		} catch (Exception e) {
		    e.printStackTrace();
		}
	}
}
