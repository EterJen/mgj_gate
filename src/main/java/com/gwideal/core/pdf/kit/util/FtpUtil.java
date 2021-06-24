package com.gwideal.core.pdf.kit.util;

import com.gwideal.core.common.SystemUtils;
import com.gwideal.mybatis.metautils.ResultInfo;
import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPFile;
import org.apache.commons.net.ftp.FTPReply;
import org.apache.log4j.Logger;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.math.BigDecimal;

public class FtpUtil {
    public static Logger log = Logger.getLogger(FtpUtil.class);

    /**
     * Description: 向FTP服务器上传文件
     *
     * @param host     FTP服务器hostname
     * @param port     FTP服务器端口
     * @param username FTP登录账号
     * @param password FTP登录密码
     * @param basePath FTP服务器基础目录
     * @param filePath FTP服务器文件存放路径。例如分日期存放：/2015/01/01。文件的路径为basePath+filePath
     * @param filename 上传到FTP服务器上的文件名
     * @param input    输入流
     * @return 成功返回true，否则返回false
     */
    public static boolean uploadFile(String host, int port, String username, String password, String basePath,
                                     String filePath, String filename, InputStream input) {
        boolean result = false;
        FTPClient ftp = new FTPClient();
        //log.info("進入uploadFile");  
        try {
            int reply;
            ftp.connect(host, port);// 连接FTP服务器  
            // 如果采用默认端口，可以使用ftp.connect(host)的方式直接连接FTP服务器  
            ftp.login(username, password);// 登录  
            reply = ftp.getReplyCode();
            System.out.println("验证连接成功");
            if (!FTPReply.isPositiveCompletion(reply)) {
                System.out.println("错误的ftp用户名密码");
                ftp.disconnect();
                return result;
            }
            //切换到上传目录  
            System.out.println("开始切换目录" + ftp.printWorkingDirectory());
            String workingDirectory = basePath + filePath;
            workingDirectory = workingDirectory.replaceAll("\\\\", "\\/");
            if (!ftp.changeWorkingDirectory(workingDirectory)) {
                //如果目录不存在创建目录  
                String[] dirs = filePath.split("/");
                String tempPath = basePath;
                for (String dir : dirs) {
                    if (null == dir || "".equals(dir)) continue;
                    tempPath += "/" + dir;
                    if (!ftp.changeWorkingDirectory(tempPath)) {
                        if (!ftp.makeDirectory(dir)) {
                            return result;
                        } else {
                            //System.out.println("切换目录结束" + ftp.printWorkingDirectory());
                            if (!ftp.changeWorkingDirectory(dir)) {
                                return result;
                            }
                        }
                    }
                }
            }
            System.out.println("切换目录结束" + ftp.printWorkingDirectory());
            //设置上传文件的类型为二进制类型
            ftp.setFileType(FTP.BINARY_FILE_TYPE);
            ftp.setControlEncoding("UTF-8");
            //log.info("设置主動模式");  
            //设置被动模式（测试库）--服务器是主动模式，所以只需要判断是否是linux
            if (SystemUtils.getPlatForm().equals(SystemUtils.Platform.Windows)) {
                System.out.println("win 特殊模式 ftp.enterLocalPassiveMode()");
                ftp.enterLocalPassiveMode();
            }
            //上传文件
            System.out.println("准备上传");
            if (!ftp.storeFile(filename, input)) {
                System.out.println("上传失败");
                return result;
            }
            System.out.println("完成上传");
//            log.info("上传文件完成");
            input.close();
            ftp.logout();
            result = true;
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println(e.toString());
        } finally {
            if (ftp.isConnected()) {
                try {
                    ftp.disconnect();
                } catch (IOException ioe) {
                }
            }
            return result;
        }
    }

    public static void isExit(String host, int port, String username, String password, String workPath, String url, ResultInfo ri) {
        FTPClient ftp = new FTPClient();
        try {
            int reply;
            ftp.connect(host, port);// 连接FTP服务器
            try {
                ftp.setDataTimeout(180000);
                ftp.setFileType(FTP.BINARY_FILE_TYPE);
                ftp.setControlEncoding("UTF-8");
            } catch (IOException e) {
                ri.setBeanId(BigDecimal.valueOf(-1));
                ri.setResultType("error");
                ri.setMessage(e.toString());
                return;
            }
            // 如果采用默认端口，可以使用ftp.connect(host)的方式直接连接FTP服务器
            ftp.login(username, password);// 登录
            reply = ftp.getReplyCode();
            if (!FTPReply.isPositiveCompletion(reply)) {
                ri.setBeanId(BigDecimal.valueOf(-1));
                ri.setResultType("error");
                ri.setMessage("错误的ftp用户名密码");
                return;
            }

            url = url.replaceAll("\\\\", "/");
            String fileName = url.substring(url.lastIndexOf("/") + 1);
            String workingDirectory = workPath + url.substring(0, url.lastIndexOf("/") + 1);
            workingDirectory = workingDirectory.replaceAll("//", "/");
            if (!ftp.changeWorkingDirectory(workingDirectory)) {
                ri.setBeanId(BigDecimal.valueOf(-1));
                ri.setResultType("error");
                ri.setMessage("切换目录失败");
                return;
            }
            InputStream is = ftp.retrieveFileStream(fileName);
            Thread.sleep(1000);/*延时3毫秒 防止socket流为空*/
            int available = is.available();
            if (is == null || ftp.getReplyCode() == FTPReply.FILE_UNAVAILABLE) {
                ri.setBeanId(BigDecimal.valueOf(-1));
                ri.setResultType("error");
                ri.setMessage("文件不存在");
                return;
            } else {
                ri.setBeanId(BigDecimal.valueOf(available));
                ri.setResultType("success");
                ri.setMessage(fileName + ":" + available);
                return;
            }

        } catch (Exception e) {
            ri.setBeanId(BigDecimal.valueOf(-1));
            ri.setResultType("error");
            ri.setMessage(e.toString());
        }
    }

    /**
     * Description: 从FTP服务器下载文件
     *
     * @param host       FTP服务器hostname
     * @param port       FTP服务器端口
     * @param username   FTP登录账号
     * @param password   FTP登录密码
     * @param remotePath FTP服务器上的相对路径
     * @param fileName   要下载的文件名
     * @param localPath  下载后保存到本地的路径
     * @return
     */
    public static boolean downloadFile(String host, int port, String username, String password, String remotePath,
                                       String fileName, String localPath) {
        boolean result = false;
        FTPClient ftp = new FTPClient();


        try {
            int reply;
            ftp.connect(host, port);
            // 如果采用默认端口，可以使用ftp.connect(host)的方式直接连接FTP服务器  
            ftp.login(username, password);// 登录  
            reply = ftp.getReplyCode();
            if (!FTPReply.isPositiveCompletion(reply)) {
                ftp.disconnect();
                return result;
            }
            try {
                ftp.setFileType(FTP.BINARY_FILE_TYPE);
                ftp.setControlEncoding("UTF-8");
            } catch (IOException e) {
                e.printStackTrace();
            }
            ftp.changeWorkingDirectory(remotePath);// 转移到FTP服务器目录
            FTPFile[] fs = ftp.listFiles();
            for (FTPFile ff : fs) {
                if (ff.getName().equals(fileName)) {
                    File localFile = new File(localPath + ff.getName());
                    OutputStream is = new FileOutputStream(localFile);
                    ftp.retrieveFile(ff.getName(), is);
                    is.close();
                }
            }
            ftp.logout();
            result = true;
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (ftp.isConnected()) {
                try {
                    ftp.disconnect();
                } catch (IOException ioe) {
                }
            }
        }
        return result;
    }

    public static String ftpFile2resXmlStr(String host, int port,
                                           String username, String password,
                                           String remotePath, String fileName) {
        String result = "";
        FTPClient ftp = new FTPClient();

        try {
            int reply;
            ftp.connect(host, port);
            // 如果采用默认端口，可以使用ftp.connect(host)的方式直接连接FTP服务器
            ftp.login(username, password);// 登录
            reply = ftp.getReplyCode();
            if (!FTPReply.isPositiveCompletion(reply)) {
                System.out.println("ftp登陆失败，请检查ip及端口：\n" +
                        "ip：" + host +
                        "端口：" + port +
                        "");
                ftp.disconnect();
                return result;
            }
            try {
                ftp.setDataTimeout(180000);
                ftp.setFileType(FTP.BINARY_FILE_TYPE);
                ftp.setControlEncoding("UTF-8");
            } catch (IOException e) {
                e.printStackTrace();
            }
            System.out.println("当前ftp根路径" + ftp.printWorkingDirectory());
            ftp.changeWorkingDirectory(remotePath);// 转移到FTP服务器目录
            System.out.println("当前ftp工作路径" + ftp.printWorkingDirectory());
            InputStream inputStream = ftp.retrieveFileStream(fileName);
            Thread.sleep(300);/*延时3毫秒 防止socket流为空*/

            StringBuffer var2 = new StringBuffer();
            BufferedReader var1 = new BufferedReader(new InputStreamReader(inputStream));
            for (String var3 = var1.readLine(); var3 != null; var3 = var1.readLine()) {
                var2.append(var3 + "\n");
            }
            var1.close();

            result = var2.toString();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            if (ftp.isConnected()) {
                try {
                    ftp.logout();
                    ftp.disconnect();
                } catch (IOException ioe) {
                    ioe.printStackTrace();
                }
            }
        }
        return result;
    }

    public static int ftpFile2resOutStream(String host, int port,
                                           String username, String password,
                                           String remotePath, String fileName,
                                           OutputStream outputStream) {
        int result = 0;
        FTPClient ftp = new FTPClient();

        try {
            int reply;
            ftp.connect(host, port);
            // 如果采用默认端口，可以使用ftp.connect(host)的方式直接连接FTP服务器
            ftp.login(username, password);// 登录
            reply = ftp.getReplyCode();
            if (!FTPReply.isPositiveCompletion(reply)) {
                ftp.disconnect();
                return result;
            }
            try {
                ftp.setDataTimeout(180000);
                ftp.setFileType(FTP.BINARY_FILE_TYPE);
                ftp.setControlEncoding("UTF-8");
            } catch (IOException e) {
                e.printStackTrace();
            }
            System.out.println("预下载路径：" + remotePath);
            System.out.println("切换前工作路径：" + ftp.printWorkingDirectory());
            ftp.changeWorkingDirectory(remotePath);// 转移到FTP服务器目录
            System.out.println("切换后工作路径：" + ftp.printWorkingDirectory());
            InputStream inputStream = ftp.retrieveFileStream(fileName);
            Thread.sleep(300);/*延时3毫秒 防止socket流为空*/
            int available = inputStream.available();
            System.out.println(available);

            BufferedInputStream inBuffer = new BufferedInputStream(inputStream);
            BufferedOutputStream outBuffer = new BufferedOutputStream(outputStream);
            byte[] buf = new byte[1024]; //自定义的字节缓冲区
            while ((available = inBuffer.read(buf)) != -1) { //返回的是数组中的个数，如读完或读满，则返回-1
                outBuffer.write(buf, 0, available);
                result++;
            }

            outBuffer.flush();
            outBuffer.close();
            inBuffer.close();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            if (ftp.isConnected()) {
                try {
                    ftp.logout();
                    ftp.disconnect();
                } catch (IOException ioe) {
                    ioe.printStackTrace();
                }
            }
            return result;
        }
    }

    public static InputStream downloadFile(String host, int port, String username, String password, String remotePath,
                                           String fileName) {
        InputStream result = null;
        FTPClient ftp = new FTPClient();


        try {
            int reply;
            ftp.connect(host, port);
            // 如果采用默认端口，可以使用ftp.connect(host)的方式直接连接FTP服务器
            ftp.login(username, password);// 登录
            reply = ftp.getReplyCode();
            if (!FTPReply.isPositiveCompletion(reply)) {
                ftp.disconnect();
                return result;
            }
            try {
                ftp.setDataTimeout(180000);
                ftp.setFileType(FTP.BINARY_FILE_TYPE);
                ftp.setControlEncoding("UTF-8");
            } catch (IOException e) {
                e.printStackTrace();
            }
            ftp.changeWorkingDirectory(remotePath);// 转移到FTP服务器目录
            result = ftp.retrieveFileStream(fileName);
            ftp.logout();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (ftp.isConnected()) {
                try {
                    ftp.disconnect();
                } catch (IOException ioe) {
                }
            }
        }
        return result;
    }

    /**
     * Description: 从FTP服务器下载文件
     *
     * @param host       FTP服务器hostname
     * @param port       FTP服务器端口
     * @param username   FTP登录账号
     * @param password   FTP登录密码
     * @param remotePath FTP服务器上的相对路径
     * @param fileName   要下载的文件名
     * @param response   返回流
     */
    public static void downloadFileRespon(String host, int port, String username, String password, String remotePath,
                                          String fileName, HttpServletResponse response, OutputStream outputStream) {
        FTPClient ftp = new FTPClient();
        try {
            int reply;
            ftp.connect(host, port);
            // 如果采用默认端口，可以使用ftp.connect(host)的方式直接连接FTP服务器
            ftp.login(username, password);// 登录
            reply = ftp.getReplyCode();
            if (!FTPReply.isPositiveCompletion(reply)) {
                ftp.disconnect();
            }
            ftp.changeWorkingDirectory(remotePath);// 转移到FTP服务器目录
            FTPFile[] fs = ftp.listFiles();
            InputStream inputStream = null;
            byte b[] = new byte[1024];
            for (FTPFile ff : fs) {
                if (ff.getName().equals(fileName)) {
                    if (SystemUtils.getPlatForm().equals(SystemUtils.Platform.Windows)) {
                        ftp.enterLocalPassiveMode();
                    }
                    //String s = new String((remotePath + fileName).getBytes("UTF-8"), "ISO-8859-1");
                    inputStream = ftp.retrieveFileStream(remotePath + fileName);
                    int available = inputStream.available();
                    response.setHeader("Content-length", String.valueOf(available));
                    int n = 0;
                    while ((n = inputStream.read(b)) > 0) {
                        outputStream.write(b, 0, n);
                    }
                }
            }
            inputStream.close();
            outputStream.close();
            ftp.completePendingCommand();
            ftp.logout();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (ftp.isConnected()) {
                try {
                    ftp.disconnect();
                } catch (IOException ioe) {
                }
            }
        }
    }
}