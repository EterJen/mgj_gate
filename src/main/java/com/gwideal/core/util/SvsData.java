package com.gwideal.core.util;

import lombok.Data;
import org.apache.commons.lang.StringUtils;

@Data
public class SvsData {
    private String certAlias;
    private String signType;
    private String data;
    private String signData;
}
