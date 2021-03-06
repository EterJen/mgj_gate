package com.gwideal.core.util;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.Charset;
import java.util.Map;
import java.util.Vector;
      
/**    
. * HTTP请求对象    
 *     
 * @author YYmmiinngg    
 */     
public class HttpRequester {      
    private static String defaultContentEncoding = Charset.defaultCharset().name();
       

    /**    
     * 发送GET请求    
     *     
     * @param urlString    
     *            URL地址    
     * @return 响应对象    
     * @throws IOException    
     */     
    public static HttpRespons sendGet(String urlString) throws IOException {
        return send(urlString, "GET", null, null);
    }      
       
    /**    
     * 发送GET请求    
     *     
     * @param urlString    
     *            URL地址    
     * @param params    
    *            参数集合    
     * @return 响应对象    
     * @throws IOException    
     */     
   public HttpRespons sendGet(String urlString, Map<String, String> params)      
            throws IOException {      
        return send(urlString, "GET", params, null);
    }      
       
   /**    
     * 发送GET请求    
     *     
     * @param urlString    
     *            URL地址    
     * @param params    
     *            参数集合    
     * @param propertys    
     *            请求属性    
     * @return 响应对象    
     * @throws IOException    
     */     
   public HttpRespons sendGet(String urlString, Map<String, String> params,      
            Map<String, String> propertys) throws IOException {      
        return send(urlString, "GET", params, propertys);
    }      
       
    /**    
     * 发送POST请求    
     *     
     * @param urlString    
     *            URL地址    
     * @return 响应对象    
     * @throws IOException    
     */     
    public HttpRespons sendPost(String urlString) throws IOException {      
        return send(urlString, "POST", null, null);
    }      
       
    /**    
     * 发送POST请求    
     *     
     * @param urlString    
     *            URL地址    
     * @param params    
     *            参数集合    
     * @return 响应对象    
     * @throws IOException    
     */     
   public static HttpRespons sendPost(String urlString, Map<String, String> params)
            throws IOException {      
        return send(urlString, "POST", params, null);
    }      
       
    /**    
     * 发送POST请求    
     *     
     * @param urlString    
     *            URL地址    
     * @param params    
     *            参数集合    
     * @param propertys    
     *            请求属性    
     * @return 响应对象    
     * @throws IOException    
     */     
    public static HttpRespons sendPost(String urlString, Map<String, String> params,
            Map<String, String> propertys) throws IOException {      
        return send(urlString, "POST", params, propertys);
    }      
       
    /**    
     * 发送HTTP请求    
     *     
     * @param urlString    
     * @return 响映对象    
     * @throws IOException    
     */     
    private static HttpRespons send(String urlString, String method,
            Map<String, String> parameters, Map<String, String> propertys)      
            throws IOException {      
        HttpURLConnection urlConnection = null;      
       
        if (method.equalsIgnoreCase("GET") && parameters != null) {      
            StringBuffer param = new StringBuffer();      
            int i = 0;      
            for (String key : parameters.keySet()) {      
                if (i == 0) {
	                param.append("?");
                } else {
	                param.append("&");
                }
                param.append(key).append("=").append(parameters.get(key));      
                i++;      
            }      
            urlString += param;      
        }      
        URL url = new URL(urlString);      
        urlConnection = (HttpURLConnection) url.openConnection(); 
        urlConnection.setRequestProperty("Accept-Charset", "utf-8");
        urlConnection.setRequestProperty("contentType", "utf-8");
        // 设置通用的请求属性
        urlConnection.setRequestProperty("accept", "*/*");
        urlConnection.setRequestProperty("connection", "Keep-Alive");
        urlConnection.setRequestProperty("user-agent",
                "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");
       
        urlConnection.setRequestMethod(method);      
        urlConnection.setDoOutput(true);      
        urlConnection.setDoInput(true);      
        urlConnection.setUseCaches(false);      
       
        if (propertys != null) {
	        for (String key : propertys.keySet()) {
	            urlConnection.addRequestProperty(key, propertys.get(key));
	        }
        }
       
        if (method.equalsIgnoreCase("POST") && parameters != null) {      
            StringBuffer param = new StringBuffer();      
            for (String key : parameters.keySet()) {      
                param.append("&");      
                param.append(key).append("=").append(parameters.get(key));      
            }    
            
            urlConnection.getOutputStream().write(param.toString().getBytes());    
//            PrintWriter out = new PrintWriter(new OutputStreamWriter(urlConnection.getOutputStream(),"utf-8"));
//            out.println(param.toString().getBytes());
            urlConnection.getOutputStream().flush();      
            urlConnection.getOutputStream().close();      
        }      
        return makeContent(urlString, urlConnection);
    }      
       
    /**    
     * 得到响应对象    
     *     
     * @param urlConnection    
     * @return 响应对象    
     * @throws IOException    
     */     
   private static HttpRespons makeContent(String urlString,
            HttpURLConnection urlConnection) throws IOException {      
        HttpRespons httpResponser = new HttpRespons();      
        try {      
            InputStream in = urlConnection.getInputStream();      
            BufferedReader bufferedReader = new BufferedReader(      
                    new InputStreamReader(in,"utf-8"));      
            httpResponser.contentCollection = new Vector<String>();      
            StringBuffer temp = new StringBuffer();      
            String line = bufferedReader.readLine();      
            while (line != null) {      
                httpResponser.contentCollection.add(line);      
                temp.append(line).append("\r\n");      
                line = bufferedReader.readLine();      
            }      
            bufferedReader.close();      
       
            String ecod = urlConnection.getContentEncoding();      
            if (ecod == null) {
	            ecod = defaultContentEncoding;
            }
       
            httpResponser.urlString = urlString;      
       
            httpResponser.defaultPort = urlConnection.getURL().getDefaultPort();      
            httpResponser.file = urlConnection.getURL().getFile();      
            httpResponser.host = urlConnection.getURL().getHost();      
            httpResponser.path = urlConnection.getURL().getPath();      
            httpResponser.port = urlConnection.getURL().getPort();      
            httpResponser.protocol = urlConnection.getURL().getProtocol();      
            httpResponser.query = urlConnection.getURL().getQuery();      
            httpResponser.ref = urlConnection.getURL().getRef();      
            httpResponser.userInfo = urlConnection.getURL().getUserInfo();      
       
            httpResponser.content = new String(temp.toString().getBytes(), ecod);      
            httpResponser.contentEncoding = ecod;      
            httpResponser.code = urlConnection.getResponseCode();      
           httpResponser.message = urlConnection.getResponseMessage();      
            httpResponser.contentType = urlConnection.getContentType();      
            httpResponser.method = urlConnection.getRequestMethod();      
            httpResponser.connectTimeout = urlConnection.getConnectTimeout();      
            httpResponser.readTimeout = urlConnection.getReadTimeout();      
       
            return httpResponser;      
        } catch (IOException e) {      
            throw e;      
        } finally {      
            if (urlConnection != null) {
	            urlConnection.disconnect();
            }
        }      
    }      
       
    /**    
     * 默认的响应字符集    
     */     
    public String getDefaultContentEncoding() {      
        return defaultContentEncoding;
    }      
       
    /**    
     * 设置默认的响应字符集    
     */     
    public void setDefaultContentEncoding(String defaultContentEncoding) {      
        defaultContentEncoding = defaultContentEncoding;
    }      
}     
 
   
