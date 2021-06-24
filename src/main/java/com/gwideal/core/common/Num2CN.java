package com.gwideal.core.common;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class Num2CN {
    /**
     * 单位进位，中文默认为4位即（万、亿）
     */
    public static int UNIT_STEP = 4;

    /**
     * 单位
     */
    public static String[] CN_UNITS = new String[] { "个", "十", "百", "千", "万", "十",
            "百", "千", "亿", "十", "百", "千", "万" };

    /**
     * 汉字
     */
    public static String[] CN_CHARS = new String[] { "零", "一", "二", "三", "四",
            "五", "六", "七", "八", "九" };

    /**
     * 数值转换为中文字符串
     *
     * @param num
     *            需要转换的数值，默认不为口语化，例如12转换为'十二'而不是'一十二'。
     * @return
     */
    public static String cvt(long num) {
        return cvt(num, true);
    }

    /**
     * 数值转换为中文字符串(口语化)
     *
     * @param num
     *            需要转换的数值
     * @param isColloquial
     *            是否口语化。isColloquial为true不为口语，例如12转换为'十二'而不是'一十二'。
     * @return
     */
    public static String cvt(long num, boolean isColloquial) {
        String[] result = convert(num, isColloquial);
        StringBuffer strs = new StringBuffer(32);
        for (String str : result) {
            strs.append(str);
        }
        return strs.toString();
    }

    /**
     * 将数值转换为中文
     *
     * @param num
     *            需要转换的数值
     * @param isColloquial
     *            是否口语化。例如12转换为'十二'而不是'一十二'。
     * @return
     */
    public static String[] convert(long num, boolean isColloquial) {
        if (num < 10) {// 10以下直接返回对应汉字
            return new String[] { CN_CHARS[(int) num] };// ASCII2int
        }

        char[] chars = String.valueOf(num).toCharArray();
        if (chars.length > CN_UNITS.length) {// 超过单位表示范围的返回空
            return new String[] {};
        }

        boolean isLastUnitStep = false;// 记录上次单位进位
        ArrayList<String> cnchars = new ArrayList<String>(chars.length * 2);// 创建数组，将数字填入单位对应的位置
        for (int pos = chars.length - 1; pos >= 0; pos--) {// 从低位向高位循环
            char ch = chars[pos];
            String cnChar = CN_CHARS[ch - '0'];// ascii2int 汉字
            int unitPos = chars.length - pos - 1;// 对应的单位坐标
            String cnUnit = CN_UNITS[unitPos];// 单位
            boolean isZero = (ch == '0');// 是否为0
            boolean isZeroLow = (pos + 1 < chars.length && chars[pos + 1] == '0');// 是否低位为0

            boolean isUnitStep = (unitPos >= UNIT_STEP && (unitPos % UNIT_STEP == 0));// 当前位是否需要单位进位

            if (isUnitStep && isLastUnitStep) {// 去除相邻的上一个单位进位
                int size = cnchars.size();
                cnchars.remove(size - 1);
                if (!CN_CHARS[0].equals(cnchars.get(size - 2))) {// 补0
                    cnchars.add(CN_CHARS[0]);
                }
            }

            if (isUnitStep || !isZero) {// 单位进位(万、亿)，或者非0时加上单位
                cnchars.add(cnUnit);
                isLastUnitStep = isUnitStep;
            }
            if (isZero && (isZeroLow || isUnitStep)) {// 当前位为0低位为0，或者当前位为0并且为单位进位时进行省略
                continue;
            }
            cnchars.add(cnChar);
            isLastUnitStep = false;
        }

        Collections.reverse(cnchars);
        // 清除最后一位的0
        int chSize = cnchars.size();
        String chEnd = cnchars.get(chSize - 1);
        if (CN_CHARS[0].equals(chEnd) || CN_UNITS[0].equals(chEnd)) {
            cnchars.remove(chSize - 1);
        }

        // 口语化处理
        if (isColloquial) {
            String chFirst = cnchars.get(0);
            String chSecond = cnchars.get(1);
            if (chFirst.equals(CN_CHARS[1]) && chSecond.startsWith(CN_UNITS[1])) {// 是否以'一'开头，紧跟'十'
                cnchars.remove(0);
            }
        }
        return cnchars.toArray(new String[] {});
    }

    public static Map<String,BigDecimal> countRDZX=new HashMap<String,BigDecimal>();
    static{
        countRDZX.put("一",new BigDecimal(1));
        countRDZX.put("二",new BigDecimal(2));
        countRDZX.put("三",new BigDecimal(3));
        countRDZX.put("四",new BigDecimal(4));
        countRDZX.put("五",new BigDecimal(5));

        countRDZX.put("十一",new BigDecimal(11));
        countRDZX.put("十二",new BigDecimal(12));
        countRDZX.put("十三",new BigDecimal(13));
        countRDZX.put("十四",new BigDecimal(14));
        countRDZX.put("十五",new BigDecimal(15));
        countRDZX.put("十六",new BigDecimal(16));
        countRDZX.put("十七",new BigDecimal(17));
        countRDZX.put("十八",new BigDecimal(18));
        countRDZX.put("十九",new BigDecimal(19));
        countRDZX.put("二十",new BigDecimal(20));
        countRDZX.put("二十一",new BigDecimal(21));
        countRDZX.put("二十二",new BigDecimal(22));
        countRDZX.put("二十三",new BigDecimal(23));
        countRDZX.put("二十四",new BigDecimal(24));
        countRDZX.put("二十五",new BigDecimal(25));
        countRDZX.put("二十六",new BigDecimal(26));
        countRDZX.put("二十七",new BigDecimal(27));
        countRDZX.put("二十八",new BigDecimal(28));
        countRDZX.put("二十九",new BigDecimal(29));
        countRDZX.put("三十",new BigDecimal(30));

    }
}
