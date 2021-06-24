
package com.gwideal.ueditor;

import com.alibaba.fastjson.JSON;
import com.gwideal.core.common.SystemUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import per.eter.utils.file.FileUtils;
import per.eter.utils.file.SimpFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.HashMap;
import java.util.Map;


@Controller
@RequestMapping(value = "/ueditor")
public class Ueditor {


    @Autowired
    private FileUtils fileUtils;






    /**
     * 初始化UEditor上传文件、图片等配置
     *
     * @param request
     * @param response
     */
    @RequestMapping(value = "/init")
    public void initController(MultipartFile upfile, HttpServletRequest request, HttpServletResponse response) {

        try {
            request.setCharacterEncoding("UTF-8");
            response.setHeader("Content-Type", "text/html");
            response.setContentType("text/html; charset=utf-8");


            String action = request.getParameter("action");

            // 文件上传的路径
            String result = null;
            if ("config".equals(action)) { //  读取配置文件，将配置文件数据以json格式返回
                /**
                 *  返回JOSN数据
                 * {"videoMaxSize":102400000,"videoActionName":"uploadvideo","fileActionName":"uploadfile","fileManagerListPath":"/ueditor/jsp/upload/file/","imageCompressBorder":1600,"imageManagerAllowFiles":[".png",".jpg",".jpeg",".gif",".bmp"],"imageManagerListPath":"/ueditor/jsp/upload/image/","fileMaxSize":51200000,"fileManagerAllowFiles":[".png",".jpg",".jpeg",".gif",".bmp",".flv",".swf",".mkv",".avi",".rm",".rmvb",".mpeg",".mpg",".ogg",".ogv",".mov",".wmv",".mp4",".webm",".mp3",".wav",".mid",".rar",".zip",".tar",".gz",".7z",".bz2",".cab",".iso",".doc",".docx",".xls",".xlsx",".ppt",".pptx",".pdf",".txt",".md",".xml"],"fileManagerActionName":"listfile","snapscreenInsertAlign":"none","scrawlActionName":"uploadscrawl","videoFieldName":"upfile","imageCompressEnable":true,"videoUrlPrefix":"","fileManagerUrlPrefix":"","catcherAllowFiles":[".png",".jpg",".jpeg",".gif",".bmp"],"imageManagerActionName":"listimage","snapscreenPathFormat":"/upload/image/{yyyy}{mm}{dd}/{time}{rand:6}","scrawlPathFormat":"/upload/image/{yyyy}{mm}{dd}/{time}{rand:6}","scrawlMaxSize":2048000,"imageInsertAlign":"none","catcherPathFormat":"/upload/image/{yyyy}{mm}{dd}/{time}{rand:6}","catcherMaxSize":2048000,"snapscreenUrlPrefix":"","imagePathFormat":"/upload/image/{yyyy}{mm}{dd}/{time}{rand:6}","imageManagerUrlPrefix":"","scrawlUrlPrefix":"","scrawlFieldName":"upfile","imageMaxSize":2048000,"imageAllowFiles":[".png",".jpg",".jpeg",".gif",".bmp"],"snapscreenActionName":"uploadimage","catcherActionName":"catchimage","fileFieldName":"upfile","fileUrlPrefix":"","imageManagerInsertAlign":"none","catcherLocalDomain":["127.0.0.1","localhost","img.baidu.com"],"filePathFormat":"/ueditor/jsp/upload/file/{yyyy}{mm}{dd}/{time}{rand:6}","videoPathFormat":"/ueditor/jsp/upload/video/{yyyy}{mm}{dd}/{time}{rand:6}","fileManagerListSize":20,"imageActionName":"uploadimage","imageFieldName":"upfile","imageUrlPrefix":"","scrawlInsertAlign":"none","fileAllowFiles":[".png",".jpg",".jpeg",".gif",".bmp",".flv",".swf",".mkv",".avi",".rm",".rmvb",".mpeg",".mpg",".ogg",".ogv",".mov",".wmv",".mp4",".webm",".mp3",".wav",".mid",".rar",".zip",".tar",".gz",".7z",".bz2",".cab",".iso",".doc",".docx",".xls",".xlsx",".ppt",".pptx",".pdf",".txt",".md",".xml"],"catcherUrlPrefix":"","imageManagerListSize":20,"catcherFieldName":"source","videoAllowFiles":[".flv",".swf",".mkv",".avi",".rm",".rmvb",".mpeg",".mpg",".ogg",".ogv",".mov",".wmv",".mp4",".webm",".mp3",".wav",".mid"]}
                 */
                InputStream inStream = new FileInputStream(SystemUtils.getRootPath() + "/common-assets/lib/ueditor/jsp/config.json");
                StringBuilder builder = new StringBuilder();
                try {
                    InputStreamReader reader = new InputStreamReader(inStream, "UTF-8");
                    BufferedReader bfReader = new BufferedReader(reader);
                    String tmpContent = null;
                    while ((tmpContent = bfReader.readLine()) != null) {
                        builder.append(tmpContent);
                    }
                    bfReader.close();
                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                }
                // 过滤输入字符串, 剔除多行注释以及替换掉反斜杠
                result = builder.toString().replaceAll("/\\*[\\s\\S]*?\\*/", "").replaceAll(" ", "");
            } else if ("uploadfile".equals(action) || "uploadimage".equals(action) || "uploadvideo".equals(action)) {// 上传文件
                String originalFilename = upfile.getOriginalFilename();
                MultipartFile[] files = new MultipartFile[]{upfile};
                Map<String, SimpFile> stringSimpFileMap = fileUtils.remoteUpload(files, null);
                String relativePath = stringSimpFileMap.get(originalFilename).getRelativePath();

                String type = originalFilename.substring(originalFilename.indexOf("."), originalFilename.length());
                long size = upfile.getSize();

                Map<String, Object> map = new HashMap<String, Object>();
                map.put("state", "SUCCESS");
                map.put("original", originalFilename);
                map.put("size", size);
                map.put("title", originalFilename);
                if ("uploadimage".equals(action)) {
                    map.put("_imgserverid", relativePath);
                }else if ("uploadfile".equals(action)) {
                    map.put("_nghref", relativePath);
                }
                map.put("type", type);
                map.put("url", "fileOperation/trustedRequest/remoteRead/" + relativePath);

                result = JSON.toJSONString(map);

            }

            PrintWriter writer = response.getWriter();
            writer.write(result);
            writer.flush();
            writer.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
