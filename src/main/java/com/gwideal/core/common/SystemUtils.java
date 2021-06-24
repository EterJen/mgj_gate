package com.gwideal.core.common;

import com.gwideal.core.startup.PropertyUtils;
import com.gwideal.core.workflow.DNode;
import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.io.FileUtils;
import org.springframework.util.ResourceUtils;

import java.beans.IntrospectionException;
import java.beans.PropertyDescriptor;
import java.io.*;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.*;
public class SystemUtils {
    public static DecimalFormat decimalFormat = new DecimalFormat("0000");


    public static String trim(String source, String beTrim) {
        if (source == null) {
            return "";
        }
        source = source.trim(); // 循环去掉字符串首的beTrim字符
        if (source.isEmpty()) {
            return "";
        }
        String beginChar = source.substring(0, 1);
        if (beginChar.equalsIgnoreCase(beTrim)) {
            source = source.substring(1, source.length());
            beginChar = source.substring(0, 1);
        }
        // 循环去掉字符串尾的beTrim字符
        String endChar = source.substring(source.length() - 1, source.length());
        if (endChar.equalsIgnoreCase(beTrim)) {
            source = source.substring(0, source.length() - 1);
            endChar = source.substring(source.length() - 1, source.length());
        }
        return source;
    }

    public enum Platform {
        Windows,
        Linux
    }


    public static Platform getPlatForm() {
        if (System.getProperties().getProperty("os.name").contains("Windows"))
            return Platform.Windows;
        else
            return Platform.Linux;

    }


    public static Properties getPropertiesByProfile(String profile) throws IOException {
        System.out.println("启用的profile是：" + profile);
        Properties properties = new Properties();
        if ("deploy".equals(profile)) {
            String[] filePath = {"application.properties", "application-deploy.properties"};
            properties = PropertyUtils.loadProperties(filePath);
        } else if ("test".equals(profile)) {
            String[] filePath = {"application.properties", "application-test.properties"};
            properties = PropertyUtils.loadProperties(filePath);
        } else if ("dev".equals(profile)) {
            String[] filePath = {"application.properties", "application-dev.properties"};
            properties = PropertyUtils.loadProperties(filePath);
        }
        return properties;
    }

    /**
     * 判断字符串的编码
     *
     * @param str
     * @return
     */
    public static String getEncoding(String str) {
        String encode[] = new String[]{
                "UTF-8",
                "ISO-8859-1",
                "GB2312",
                "GBK",
                "GB18030",
                "Big5",
                "Unicode",
                "ASCII"
        };
        for (int i = 0; i < encode.length; i++) {
            try {
                if (str.equals(new String(str.getBytes(encode[i]), encode[i]))) {
                    return encode[i];
                }
            } catch (Exception ex) {
            }
        }

        return "";
    }

    public static <P> boolean contains(BigDecimal id, List<P> list, String identityFieldId) {
        for (P p : list) {
            PropertyDescriptor pd;
            try {
                pd = new PropertyDescriptor(identityFieldId, p.getClass());
                BigDecimal tempId = (BigDecimal) pd.getReadMethod().invoke(p, null);
                if (id.equals(tempId))
                    return true;
            } catch (Exception e) {
                e.printStackTrace();
                return false;
            }
        }
        return false;
    }

    @SuppressWarnings("unchecked")
    public static <T> List<T> deepCopyList(List<T> src) {
        List<T> dest = null;
        try {
            ByteArrayOutputStream byteOut = new ByteArrayOutputStream();
            ObjectOutputStream out = new ObjectOutputStream(byteOut);
            out.writeObject(src);
            ByteArrayInputStream byteIn = new ByteArrayInputStream(byteOut.toByteArray());
            ObjectInputStream in = new ObjectInputStream(byteIn);
            dest = (List<T>) in.readObject();
            out.close();
            in.close();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        return dest;
    }

    /**
     * 深度copy--DNode
     *
     * @param src
     * @return
     */
    public static List<DNode> deepCopyNodeList(List<DNode> src) {
        //拿到对象的所有属性
        DNode dn = new DNode();
        Map<String, Object> keyAndValue = getKeyAndValue(dn);
        Set<String> strings = keyAndValue.keySet();
        List<DNode> dest = new ArrayList<>();
        for (DNode srcNode : src) {
            DNode dNode = new DNode();
            for (String s : strings) {
                PropertyDescriptor pd = null;
                PropertyDescriptor pds = null;
                try {
                    pd = new PropertyDescriptor(s, DNode.class);
                    pds = new PropertyDescriptor(s, DNode.class);
                    pd.getWriteMethod().invoke(dNode, pds.getReadMethod().invoke(srcNode));
                } catch (IntrospectionException e) {
                    e.printStackTrace();
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                } catch (InvocationTargetException e) {
                    e.printStackTrace();
                }
            }
            dest.add(dNode);
        }
        return dest;
    }

    /**
     * 单个对象的所有键值
     *
     * @param obj 单个对象
     * @return Map<String   ,       Object> map 所有 String键 Object值 ex：{pjzyfy=0.00,
     * xh=01, zzyl=0.00, mc=住院患者压疮发生率, pjypfy=0.00, rs=0, pjzyts=0.00,
     * czydm=0037, lx=921, zssl=0.00}
     */
    public static Map<String, Object> getKeyAndValue(Object obj) {
        Map<String, Object> map = new HashMap<String, Object>();
        // 得到类对象
        Class userCla = (Class) obj.getClass();
        /* 得到类中的所有属性集合 */
        Field[] fs = userCla.getDeclaredFields();
        for (int i = 0; i < fs.length; i++) {
            Field f = fs[i];
            f.setAccessible(true); // 设置些属性是可以访问的
            Object val = new Object();
            try {
                val = f.get(obj);
                if(val!=null){
                    if (val instanceof Date) {
                        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                        val=sdf.format(val);
                    }
                }

            /*if (val instanceof Integer) {
        int value = ((Integer) param).intValue();
        prepStatement.setInt(i + 1, value);
        } else if (param instanceof String) {
        String s = (String) param;
        prepStatement.setString(i + 1, s);
        } else if (param instanceof Double) {
        double d = ((Double) param).doubleValue();
        prepStatement.setDouble(i + 1, d);
        } else if (param instanceof Float) {
        float f = ((Float) param).floatValue();
        prepStatement.setFloat(i + 1, f);
        } else if (param instanceof Long) {
        long l = ((Long) param).longValue();
        prepStatement.setLong(i + 1, l);
       } else if (param instanceof Boolean) {
        boolean b = ((Boolean) param).booleanValue();
        prepStatement.setBoolean(i + 1, b);
        } else if (param instanceof Date) {
        Date d = (Date) param;
        prepStatement.setDate(i + 1, (Date) param);
        }*/
                // 得到此属性的值
                map.put(f.getName(), val);// 设置键值
            } catch (IllegalArgumentException e) {
                e.printStackTrace();
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }
        System.out.println("单个对象的所有键值==反射==" + map.toString());
        return map;
    }

    @SuppressWarnings("unchecked")
    public static <T> T deepCopy(T src) {
        T dest = null;
        try {
            ByteArrayOutputStream byteOut = new ByteArrayOutputStream();
            ObjectOutputStream out = new ObjectOutputStream(byteOut);
            out.writeObject(src);
            ByteArrayInputStream byteIn = new ByteArrayInputStream(byteOut.toByteArray());
            ObjectInputStream in = new ObjectInputStream(byteIn);
            dest = (T) in.readObject();
            out.close();
            in.close();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        return dest;
    }


    public static <K, V> Map<K, V> list2Map(List<V> list, String keyMethodName, Class<V> c) {
        Map<K, V> map = new HashMap<K, V>();
        if (list != null) {
            try {
                Method methodGetKey = c.getMethod(keyMethodName);
                for (int i = 0; i < list.size(); i++) {
                    V value = list.get(i);
                    @SuppressWarnings("unchecked")
                    K key = (K) methodGetKey.invoke(list.get(i));
                    map.put(key, value);
                }
            } catch (Exception e) {
                throw new IllegalArgumentException("field can't match the key!");
            }
        }

        return map;
    }

    public static <P> List<Integer> getIndexList(BigDecimal id, List<P> list, String identityFieldId) {
        List<Integer> indexList = new ArrayList<Integer>();
        for (int i = 0; i < list.size(); i++) {
            PropertyDescriptor pd;
            P p = list.get(i);
            try {
                pd = new PropertyDescriptor(identityFieldId, p.getClass());
                BigDecimal tempId = (BigDecimal) pd.getReadMethod().invoke(p, null);
                if (id.equals(tempId))
                    indexList.add(i);
            } catch (Exception e) {
                e.printStackTrace();
                break;
            }
        }
        return indexList;
    }

    /**
     * 首字母大写
     *
     * @param string
     * @return
     */
    public static String toUpperCase4Index(String string) {
        char[] methodName = string.toCharArray();
        methodName[0] = toUpperCase(methodName[0]);
        return String.valueOf(methodName);
    }

    /**
     * 字符转成大写
     *
     * @param chars
     * @return
     */
    public static char toUpperCase(char chars) {
        if (97 <= chars && chars <= 122) {
            chars ^= 32;
        }
        return chars;
    }

    //获取跟目录
    public static String getRootPath() {
        String path = null;
        try {
            path = ResourceUtils.getURL("classpath:static").getPath();
            if (System.getProperties().getProperty("os.name").contains("Windows")) {
                path = path.startsWith("/") ? path.substring(1) : path;
                path = path.endsWith("/") ? path : path + "/";
                path = path.endsWith("/") ? path : path + "/";
            }
        } catch (Exception e) {

        }

        return path;
    }

    /**
     * 附件复制
     * @param srcPath
     * @param dstBasePath
     */
    public static void copyFile(File srcPath,String dstBasePath){
        if (srcPath.exists()) {
            try {
                File path = new File(ResourceUtils.getURL("classpath:static").getPath());
                File dstPath = new File(path.getAbsolutePath()+File.separator+dstBasePath);

                //System.out.println(dstPath.getParentFile());
                if (!dstPath.getParentFile().exists()) {
                    dstPath.getParentFile().mkdirs();
                }
                /*判断目标文件是否存在*/
                if (!dstPath.exists()) {
                    FileUtils.copyFile(srcPath, dstPath);
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    /**
     *
     *
     * Map转换层Bean，使用泛型免去了类型转换的麻烦。
     * @param <T>
     * @param map
     * @param class1
     * @return
     */
    public static <T> T map2Bean(Map<String, Object> map, Class<T> class1) {
        T bean = null;
        try {
            bean = class1.newInstance();
            BeanUtils.populate(bean, map);
        } catch (InstantiationException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        }
        return bean;
    }

    public enum CustomerType {
        root,//系统用户
        security,//安全用户
        audit,//审计用户
        ordinaryUser//普通用户
    }


}
