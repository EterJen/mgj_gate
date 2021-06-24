package com.gwideal.core.startup.filter;

import com.alibaba.fastjson.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;

/* @Description CrosXss拦截过滤
        * @Date 2020/5/20 9:33
        */
@WebFilter("/*")
public class CrosXssFilter implements Filter {

    private static Logger logger = LoggerFactory.getLogger(CrosXssFilter.class);

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {

        HttpServletRequest req=(HttpServletRequest) request;
        HttpServletResponse res=(HttpServletResponse) response;
        //获取请求界面的路径
        String a=req.getRequestURI();
        if(a.endsWith(".css") || a.endsWith(".js") || a.endsWith(".png")|| a.endsWith(".jpg")){
            chain.doFilter(request, response);
            return;
        }

        request.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");


        //sql、xss过滤
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        logger.debug("CrosXssFilter----->orignal url:{},ParameterMap:{}",httpRequest.getRequestURI(), JSONObject.toJSONString(httpRequest.getParameterMap()));
        XssHttpServletRequestWrapper xssHttpServletRequestWrapper = new XssHttpServletRequestWrapper(httpRequest);
        String param = getBodyString(xssHttpServletRequestWrapper.getReader());
        if(xssHttpServletRequestWrapper.checkSqlKeyWords(param)){
            response.setCharacterEncoding("UTF-8");
            response.setContentType("application/json;charset=UTF-8");
            PrintWriter out = response.getWriter();
            out.write("参数中不允许存在sql关键字");
            return;
        }
        chain.doFilter(xssHttpServletRequestWrapper,response);
        logger.debug("CrosXssFilter..........doFilter url:{},ParameterMap:{}",xssHttpServletRequestWrapper.getRequestURI(), JSONObject.toJSONString(xssHttpServletRequestWrapper.getParameterMap()));
    }

    @Override
    public void init(FilterConfig config) throws ServletException {

    }

    @Override
    public void destroy() {

    }

    public static String getBodyString(BufferedReader br) {
        String inputLine;
        String str = "";
        try {
            while ((inputLine = br.readLine()) != null) {
                str += inputLine;
            }
            br.close();
        } catch (IOException e) {
            logger.error("过滤参数异常：{}",e.getMessage());
        }
        return str;
    }
}

