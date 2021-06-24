package com.gwideal.core.startup.servlet;

import com.gwideal.core.startup.CorsFilter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Configuration
@ConfigurationProperties(prefix = "cors-conf")
public class CorseTools {
    private static List<String> staticAllowedOrigins;

    private List<String> allowedOrigins;

    public static boolean refererAble(HttpServletRequest request, HttpServletResponse response) {

        boolean isCorsAble = false;
        String referer = request.getHeader("Referer");
        if (referer != null) {
            final String trim = referer.trim();
            for (String staticAllowedOrigin : staticAllowedOrigins) {
                if (trim.contains(staticAllowedOrigin)) {
                    String[] split = trim.split("/");
                    isCorsAble = true;
                    response.setHeader("Access-Control-Allow-Origin", split[0]+"//"+split[2]);
                    response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
                    response.setHeader("Access-Control-Max-Age", "3600");
                    response.setHeader("Access-Control-Allow-Headers", "content-type, x-requested-with, Authorization, xsrf-token");
                    response.setHeader("Access-Control-Allow-Credentials", "true");
                    break;
                }
            }
        } else {
            isCorsAble = true;
        }

        return isCorsAble;


    }


    public List<String> getAllowedOrigins() {
        return allowedOrigins;
    }

    public void setAllowedOrigins(List<String> allowedOrigins) {
        this.allowedOrigins = allowedOrigins;
    }

    @PostConstruct
    public void init() {
        staticAllowedOrigins = allowedOrigins;
    }


}
