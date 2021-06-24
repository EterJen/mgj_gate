package com.gwideal.core.basic.l4.entity;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@PropertySource("classpath:authUri.properties")
@ConfigurationProperties(prefix="authUri")
public class AuthUri{

    private List<String> uriList = new ArrayList<String>();

    public List<String> getUriList() {
        return uriList;
    }
}
