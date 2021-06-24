package com.gwideal.core.sm.sm4.handler;

import com.gwideal.core.sm.sm4.SM4Utils;
import org.bouncycastle.pqc.math.linearalgebra.ByteUtils;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;

public class Sm4EcbPadding implements SM4Handler{
    @Override
    public String encrypt(String data) {
        String charset = getCharset();
        String myKey = getKey();
        byte[] myKeyBytes = new byte[0];
        try {
            myKeyBytes = myKey.getBytes(charset);
            byte[] encryptedBytes = SM4Utils.encrypt_ECB_Padding(myKeyBytes, data.getBytes(charset));
            String encryptedHexString = ByteUtils.toHexString(encryptedBytes);
            return encryptedHexString;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public String decrypt(String encryptedHexString) {
        String charset = getCharset();
        String myKey = getKey();
        byte[] myKeyBytes = new byte[0];
        try {
            myKeyBytes = myKey.getBytes(charset);
            byte[] decryptedBytes = SM4Utils.decrypt_ECB_Padding(myKeyBytes, ByteUtils.fromHexString(encryptedHexString));
            return new String(decryptedBytes, charset);
        } catch (Exception e) {

            e.printStackTrace();
        }
        return null;
    }
}
