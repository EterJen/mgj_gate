package com.gwideal.core.basic.l2.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;

@Service
public class ResourceService {
    @Value("${cms.prefixWindows}")
    String cmsPrefixWindows;

    @Value("${cms.prefixLinux}")
    String cmsPrefixLinux;

    @Value("${cms.basicPath}")
    String cmsBasicPath;

    @Value("${cms.basicDocumentPath}")
    String cmsBasicDocumentPath;

    public String getCmsPrefixWindows() {
        return cmsPrefixWindows;
    }

    public String getCmsPrefixLinux() {
        return cmsPrefixLinux;
    }

    public String getCmsBasicPath() {
        String[] split = cmsBasicPath.split("\\.");
        String realCmsBasicPath="";
        for (String s : split) {
            realCmsBasicPath+=s+ File.separator;
        }
        return realCmsBasicPath;
    }

    public String getCmsBasicDocumentPath() {
        String[] split = cmsBasicDocumentPath.split("\\.");
        String realCmsBasicPath="";
        for (String s : split) {
            realCmsBasicPath+=s+ File.separator;
        }
        return realCmsBasicPath;
    }
}
