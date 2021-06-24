package com.gwideal.core.basic.l3.dao;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.collections.MapUtils;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;

import java.math.BigDecimal;
import java.util.*;

/**
 * Created with IntelliJ IDEA.
 * User: Eter
 * Date: 2018/2/1
 * Time: 16:39
 * Description:
 **/
public class Ognl {
    /**
     * 使用ognl扩展
     * 该功能为，根据传入的值，
     * 如果值为0，则 ... 。
     * 如果值为1，则 ... 。
     * 使用实例  <if test="@com.core.dao.Ognl@isSolve(type,1)"> AND T.N_STATUS=2</if>
     *
     * @return
     */
    public static boolean isSolve(Object o, String soleState) {
        if (o == null) {
            return false;
        }
        String str = null;
        if (o instanceof String[]) {
            String[] objects = (String[]) o;
            str = objects[0];
        } else if (o instanceof Character) {
            Character c = (Character) o;
            str = Character.toString(c);
        } else if (o instanceof String) {
            String s = (String) o;
            str = s;
        }
        if (soleState.equals(str)) {
            return true;
        } else {
            return false;
        }

    }

    /**
     * 可以用于判断 Map,Collection,String,Array是否为空
     *
     * @param o
     * @return
     */
    @SuppressWarnings("unchecked")
    public static boolean isEmpty(Object o) throws IllegalArgumentException {
        if (o == null)
            return true;
        if (o instanceof String) {
            return StringUtils.isEmpty((String) o);
        } else if (o instanceof BigDecimal) {
            return o == null;
        } else if (o instanceof Collection) {
            return CollectionUtils.isEmpty((Collection) o);
        } else if (o.getClass().isArray()) {
            return ArrayUtils.isEmpty((Object[]) o);
        } else if (o instanceof Map) {
            MapUtils.isEmpty((Map) o);
        } else if (o instanceof Date) {
            return o == null;
        } else if (o instanceof Number) {
            return o == null;
        } else if (o instanceof Boolean) {
            return o == null;
        } else {
            throw new IllegalArgumentException("Illegal argument type,must be : Map,Collection,Array,String. but was:"
                    + o.getClass());
        }

        return false;
    }

    /**
     * 可以用于判断 Map,Collection,String,Array是否不为空
     *
     * @param o
     * @return
     */
    public static boolean isNotEmpty(Object o) {
        return !isEmpty(o);
    }

    public static boolean isNotEmpty(Object... objects) {
        if (objects == null)
            return false;
        for (Object obj : objects) {
            if (isEmpty(obj)) {
                return false;
            }
            ;
        }
        return true;
    }

    public static boolean isNotBlank(Object o) {
        return !isBlank(o);
    }

    public static boolean isBlank(Object o) {
        return StringUtils.isBlank((String) o);
    }

    public static boolean isBlank(String str) {
        return StringUtils.isBlank(str);
    }

    public static boolean contains(List<String> list, String str) {
        boolean flag = false;
        if (null != list && !list.isEmpty()) {
            for (String s : list) {
                if (s.equalsIgnoreCase(str) || s.indexOf(str) >= 0) {
                    flag = true;
                    break;
                }
            }
        }
        return flag;
    }

    public static boolean containsArr(String[] arr, String str) {
        boolean flag = false;
        List<String> list=null;
        if(arr!=null){
            list= Arrays.asList(arr);
        }
        if (null != list && !list.isEmpty()) {
            for (String s : list) {
                if (s.equalsIgnoreCase(str) || s.indexOf(str) >= 0) {
                    flag = true;
                    break;
                }
            }
        }
        return flag;
    }

    public static boolean hasEquals(List<String> list, String str) {
        boolean flag = false;
        if (null != list && !list.isEmpty()) {
            for (String s : list) {
                if (s.equalsIgnoreCase(str)) {
                    flag = true;
                    break;
                }
            }
        }
        return flag;
    }

}