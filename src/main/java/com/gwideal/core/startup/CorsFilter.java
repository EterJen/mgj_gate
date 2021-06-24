package com.gwideal.core.startup;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gwideal.core.cms.l4.entity.Administrator;
import com.gwideal.core.startup.servlet.CorseTools;
import com.gwideal.mybatis.metautils.ResultInfo;
import org.apache.commons.lang.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;


public class CorsFilter extends OncePerRequestFilter {


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        final boolean refererAble = CorseTools.refererAble(request, response);

        if (!refererAble) {
            ObjectMapper objectMapper = new ObjectMapper();
            ResultInfo<Administrator> ri = new ResultInfo<Administrator>();
            ri.setResultType("sessionInvalid");
            ri.setMessage("非法跨域请求");
            String resultJson = objectMapper.writeValueAsString(ri);
            response.setContentType("text/html");
            response.setCharacterEncoding("utf-8");
            PrintWriter out = response.getWriter();
            out.write(resultJson);
            out.close();
            return;
        }


        if ("OPTIONS".equals(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
        } else {
            filterChain.doFilter(request, response);
        }
    }
}