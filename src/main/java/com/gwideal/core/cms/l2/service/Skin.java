package com.gwideal.core.cms.l2.service;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum Skin {
    YUAN_DAN("元旦", "yuanDan",1),
    CHU_XI("除夕", "chuXi",1),
    CHUN_JIE("春节", "chunJIe",2),
    QING_MING("清明节", "qingMing",1),
    LAO_DONG("劳动节", "laoDong",1),
    DUAN_WU("端午节", "duanWu",1),
    ZHONG_QIU("中秋节", "zhongQiu",1),
    GUO_QING("国庆节", "guoQing",1),


    CHUN_TIAN("春天", "chunTian",2),
    XIA_TIAN("夏天", "xiaTian",2),
    QIU_TIAN("秋天", "qiuTian",1),
    DONG_TIAN("冬天", "dongTian",1),
    ;
    public static Map skinEn2zhMap = new HashMap<String, String>(){{
        Skin[] values = Skin.values();
        for (Skin value : values) {
            put(value.getSkinName(), value.getZhName());
        }
    }};
    public static List skinEns = new ArrayList(){{
        Skin[] values = Skin.values();
        for (Skin value : values) {
            if(value.getFlag() == 2){
            }
            add(value.getSkinName());
        }
    }};
    public static Map getSkinEn2zhMap() {
        return skinEn2zhMap;
    }

    private final String zhName;
    private final String skinName;
    private final Integer flag;


    Skin(String zhName, String skinName,Integer flag) {
        this.zhName = zhName;
        this.skinName = skinName;
        this.flag = flag;
    }

    public static List getSkinEns() {
        return skinEns;
    }
}

