package com.gwideal.core.jwt;

import org.apache.commons.lang3.StringUtils;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * Created with IntelliJ IDEA.
 * User: Eter
 * Date: 2018/5/28
 * Time: 13:13
 * Description:
 **/
public class jxwMd5Encoder implements PasswordEncoder {
    @Override
    public String encode(CharSequence rawPassword)   {
        String result = rawPassword+"jxw"+"md5";
        String re_md5 = new String();
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            md.update(result.getBytes());
            byte b[] = md.digest();

            int i;

            StringBuffer buf = new StringBuffer("");
            for (int offset = 0; offset < b.length; offset++) {
                i = b[offset];
                if (i < 0)
                    i += 256;
                if (i < 16)
                    buf.append("0");
                buf.append(Integer.toHexString(i));
            }

            re_md5 = buf.toString();

        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        String s = re_md5.toUpperCase();
        return s;
    }

    @Override
    public boolean matches(CharSequence rawPassword, String encodedPassword) {
        if (StringUtils.isBlank(rawPassword) || StringUtils.isBlank(encodedPassword)) {
            return false;
        } else {
            return encodedPassword.equals(encode(rawPassword));
        }
    }
}