package com.gwideal.core.util;


import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Service;
import per.eter.utils.http.RequestTemplate;
import javax.annotation.Resource;
import java.io.IOException;
import java.util.Map;

@Service
@ConfigurationProperties(
        prefix = "sign.http"
)
public class SignUtils {

    @Resource
    RequestTemplate requestTemplate;

    private String toDoTaskUrl = "";


    public String getToDoTaskUrl() {
        return toDoTaskUrl;
    }

    public void setToDoTaskUrl(String toDoTaskUrl) {
        this.toDoTaskUrl = toDoTaskUrl;
    }

    public String sign(Map<String, Object> postBean){

        ObjectMapper objectMapper = new ObjectMapper();
        try {
            String s = requestTemplate.jsonClient(toDoTaskUrl + "/sign", postBean);
            JsonResult jsonResult = objectMapper.readValue(s, JsonResult.class);
            if(200 == jsonResult.getCode()){
                return jsonResult.getData().get("svsData").toString();
            }
        } catch (Exception e) {
            System.out.println("签名服务异常");
        }

        return "";
    }


    public Boolean verify(Map<String, Object> postBean) {

        ObjectMapper objectMapper = new ObjectMapper();
        try {
            String s = requestTemplate.jsonClient(toDoTaskUrl + "/verify", postBean);
            JsonResult jsonResult = objectMapper.readValue(s, JsonResult.class);
            if(200 == jsonResult.getCode()){
                return Integer.valueOf(jsonResult.getData().get("svsData").toString())== 0;
            }
        } catch (Exception e) {
            System.out.println("验签服务异常");
        }

        return false;

    }

}
