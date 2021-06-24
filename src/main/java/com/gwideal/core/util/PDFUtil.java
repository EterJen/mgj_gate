package com.gwideal.core.util;

import org.apache.commons.net.util.Base64;

import java.io.*;
import java.net.ConnectException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;

public class PDFUtil {

    public static synchronized void office2pdf(String officeFilePath, String pdfFilePath, String docType) throws Exception {
        officeFilePath = officeFilePath.replaceAll("\\\\", "/");
        pdfFilePath = pdfFilePath.replaceAll("\\\\", "/");

        File officeFile = new File(officeFilePath);
        Long officeFileLength = officeFile.length();
        byte[] filecontent = new byte[officeFileLength.intValue()];
        FileInputStream in = new FileInputStream(officeFile);
        in.read(filecontent);
        in.close();

        byte[] bts = Base64.encodeBase64(filecontent);
        String officeFileEncodeStr = new String(bts);
        String serverAddress = "http://193.168.85.28:8230/convert/toPDF/" + docType;
        String pdfFileEncodeStr = webConvert(serverAddress, officeFileEncodeStr);
        byte[] pdfFileBytes = Base64.decodeBase64(pdfFileEncodeStr.getBytes());
        File pdfFile = new File(pdfFilePath);
        if (!pdfFile.exists()) {
            pdfFile.createNewFile();
        }
        FileOutputStream outputStream = new FileOutputStream(pdfFile);
        outputStream.write(pdfFileBytes);
        outputStream.flush();
        outputStream.close();
    }

    private static String webConvert(String serverAddress, String officeFileEncodeStr) {
        StringBuffer buffer = new StringBuffer();
        try {
            URL url = new URL(serverAddress);
            HttpURLConnection urlConnection = (HttpURLConnection)url.openConnection();
            urlConnection.setConnectTimeout(3000);
            urlConnection.setReadTimeout(200000);
            urlConnection.setDoOutput(true);
            urlConnection.setDoInput(true);
            urlConnection.setUseCaches(false);
            urlConnection.setRequestProperty("Charset", "UTF-8");
            urlConnection.setRequestProperty("Content-Type", "application/x-msword");

            String username = "swnw";
            String password = "75";
            String input = username + ":" + password;
            String encodeAuth = new String(Base64.encodeBase64(input.getBytes()));
            urlConnection.setRequestProperty("Authorization", encodeAuth);
            urlConnection.setRequestMethod("POST");
            urlConnection.connect();

            if (null != officeFileEncodeStr) {
                PrintWriter printWriter = new PrintWriter(urlConnection.getOutputStream());
                printWriter.write(officeFileEncodeStr);
                printWriter.flush();
            }

            InputStream inputStream = urlConnection.getInputStream();
            InputStreamReader inputStreamReader = new InputStreamReader(inputStream, "UTF-8");
            BufferedReader bufferedReader = new BufferedReader(inputStreamReader);

            String str = null;
            while ((str = bufferedReader.readLine()) != null) {
                buffer.append(str);
            }

            bufferedReader.close();
            inputStreamReader.close();
            inputStream.close();
            inputStream = null;
            urlConnection.disconnect();
        } catch (ConnectException ce) {
            ce.printStackTrace();
            return "error1";
        } catch (Exception e) {
            e.printStackTrace();
        }

        return buffer.toString();
    }
}
