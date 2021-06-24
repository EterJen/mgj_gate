package com.gwideal.core.sm.sm4.handler;

import java.nio.charset.StandardCharsets;

public interface  SM4Handler {
    default String getCharset(){
        return StandardCharsets.UTF_8.name();
    }

    // SM4密钥长度分组长度128bit，因此密匙长度为16
    default String getKey(){
        return "annaannaannaanna";
    }

    public String encrypt(String data);
    public String decrypt( String encryptedHexString);
}
