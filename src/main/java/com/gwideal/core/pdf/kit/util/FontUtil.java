package com.gwideal.core.pdf.kit.util;

/**
 * Created by fgm on 2017/4/22.
 */
public class FontUtil {


    public static String getFontPath(String fontName){
        String calsspath=FontUtil.class.getClassLoader().getResource("").getPath();
        System.out.println("八嘎008："+calsspath+"fonts/"+fontName);
        return calsspath+"fonts/"+fontName;
    }

}
