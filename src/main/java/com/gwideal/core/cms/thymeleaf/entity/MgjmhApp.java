package com.gwideal.core.cms.thymeleaf.entity;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "mgjmh-app")
public class MgjmhApp {
    private String version;
}
