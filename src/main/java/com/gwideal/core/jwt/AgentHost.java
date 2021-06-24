package com.gwideal.core.jwt;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
@PropertySource("classpath:agentHost.properties")
@ConfigurationProperties(prefix="agentHost")
public class AgentHost {

    private Map<String,String> agentHosts = new HashMap();

    public Map<String,String> getAgentHosts() {
        return agentHosts;
    }
}
