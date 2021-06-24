
package com.gwideal.core.basic.l5.extend.fileoperation;


import com.gwideal.mybatis.metautils.ResultInfo;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.ResourceUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.UUID;

@Controller
@RequestMapping("/fileOperation")
@ResponseBody
public class FileOperationController {

	/*@Autowired
	AttachmentService attachmentService;*/

    @RequestMapping("/greeting")
    public String greeting(@RequestParam(value = "name", required = false, defaultValue = "eter") String name, Model model) {
        model.addAttribute("name", name);
        return "greeting " + name;
    }

    //文件上传相关代码

    /**
     * 文件上传API
     *
     * @param fileType     文件类型
     * @param selectedBean 存储文件名的实体 json串
     * @param file         上传文件
     * @return ResultInfo标准结果
     */
    @RequestMapping(value = "/upload")
    public ResultInfo<String> upload(@RequestParam(value = "fileType", required = false) String fileType,
                                     @RequestParam(value = "selectedBean", required = false) String selectedBean,
                                     @RequestParam(value = "file", required = false) MultipartFile file) {
        ResultInfo<String> result = new ResultInfo<>();
        if (null == fileType) {
            result.setResultType("fail");
            result.setMessage("文件类型不能为空");
            return result;
        }
        if (null == selectedBean) {
            result.setResultType("fail");
            result.setMessage("文件名存储依附对象不存在");
            return result;
        }
        if (file.isEmpty()) {
            result.setResultType("fail");
            result.setMessage("文件为空");
            return result;
        }


        // 获取文件名
        String fileName = file.getOriginalFilename();
        // 获取文件的后缀名
        String suffixName = fileName.substring(fileName.lastIndexOf("."));
        // 文件上传路径处理
        FileTypeEnum fileTypeEnum = FileTypeEnum.getEnumByFileType(fileType);

        if (null == fileTypeEnum) {
            result.setResultType("fail");
            result.setMessage("文件上传类型有误");
            return result;
        }


        /*文件格式过滤*/
        if (!fileTypeEnum.getOperation().beforeUpload(result, file)) {
            return result;
        }

        String filePath = fileTypeEnum.getUploadPath();
        // 解决中文问题，liunx下中文路径，显示问题
        fileName = UUID.randomUUID() + suffixName;
        File dest = new File(filePath + fileName);
        // 检测是否存在目录
        if (!dest.getParentFile().exists()) {
            dest.getParentFile().mkdirs();
        }
        try {
            file.transferTo(dest);
            result.setResultType("success");
            result.setMessage(file.getName() + "文件上传成功");
			//上传到ftp服务器
	        /*FtpUtil.uploadFile(attachmentService.getFtpAddress(), attachmentService.getFtpPort(), attachmentService.getFtpUsername(),
			        attachmentService.getFtpPassword(), attachmentService.getFtpBasepath(), FileTypeEnum.HeadPortrait.getDownloadPath(),
			        fileName, new FileInputStream(dest));*/

            /*上传成功后 用文件名更新依附实体*/
            fileTypeEnum.getOperation().afterUpload(result, selectedBean, fileName);
        } catch (IllegalStateException e) {
            e.printStackTrace();
            result.setResultType("fail");
            result.setMessage("文件上传失败->" + e.getStackTrace().toString());
        } catch (IOException e) {
            e.printStackTrace();
            result.setResultType("fail");
            result.setMessage("文件上传失败->" + e.getStackTrace().toString());
        }

        return result;
    }

    public static String fileMapping(FileTypeEnum fileTypeEnum, String fileName) {
        if (null == fileName || StringUtils.isEmpty(fileName)) {
            return null;
        }

        String mapSrc = fileTypeEnum.getDownloadPath() + fileName;

        try {
            File path = new File(ResourceUtils.getURL("classpath:static").getPath());
            File dstPath = new File(path.getAbsolutePath(), mapSrc);
            if (!dstPath.exists()) {
                File srcPath = new File(fileTypeEnum.getUploadPath() + fileName);
                if (srcPath.exists()) {
                    FileUtils.copyFile(srcPath, dstPath);
                } else {
                    /*本地文件不存在*/
                    return null;
                }
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
            return e.getStackTrace().toString();
        } catch (IOException e) {
            e.printStackTrace();
            return e.getStackTrace().toString();
        }

        return mapSrc.toString().substring(1);
    }



/*
    //文件下载相关代码
    @RequestMapping("/download")
    public ResultInfo<String> downloadFile(org.apache.catalina.servlet4preview.http.HttpServletRequest request, HttpServletResponse response){
        ResultInfo<CoreGroup> result = new ResultInfo<CoreGroup>();
        String fileName = "FileUploadTests.java";
        if (fileName != null) {
            //当前是从该工程的WEB-INF//File//下获取文件(该目录可以在下面一行代码配置)然后下载到C:\\users\\downloads即本机的默认下载的目录
            String realPath = request.getServletContext().getRealPath(
                    "//WEB-INF//");
            File file = new File(realPath, fileName);
            if (file.exists()) {
                response.setContentType("application/force-download");// 设置强制下载不打开
                response.addHeader("Content-Disposition",
                        "attachment;fileName=" +  fileName);// 设置文件名
                byte[] buffer = new byte[1024];
                FileInputStream fis = null;
                BufferedInputStream bis = null;
                try {
                    fis = new FileInputStream(file);
                    bis = new BufferedInputStream(fis);
                    OutputStream os = response.getOutputStream();
                    int i = bis.read(buffer);
                    while (i != -1) {
                        os.write(buffer, 0, i);
                        i = bis.read(buffer);
                    }
                    System.out.println("success");
                } catch (Exception e) {
                    e.printStackTrace();
                } finally {
                    if (bis != null) {
                        try {
                            bis.close();
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                    if (fis != null) {
                        try {
                            fis.close();
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                }
            }
        }
        return null;
    }*/
}
