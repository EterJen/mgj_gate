package com.gwideal.core.pdf.kit.util;

import com.gwideal.core.pdf.kit.exception.FreeMarkerException;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateExceptionHandler;
import org.apache.commons.lang.StringUtils;
import org.springframework.util.ResourceUtils;

import java.io.File;
import java.io.IOException;
import java.io.StringWriter;

/**
 * Created by fgm on 2017/4/22.
 * FREEMARKER 模板工具类
 *
 */
public class FreeMarkerUtil {

    /**
     * @throws IOException 
     * @description 获取模板
     */
    public static String getContent(String fileName,Object data) throws IOException{
    	
        String templatePath=getPDFTemplatePath(fileName).replace("\\", "/");
        String templateFileName=getTemplateName(templatePath).replace("\\", "/");
        String templateFilePath=getTemplatePath(templatePath).replace("\\", "/");
        //URL resource = FreeMarkerUtil.class.getResource("/templates");
        System.out.println("templatePath:"+templatePath);
        System.out.println("templateFileName:"+templateFileName);
        System.out.println("templateFilePath:"+templateFilePath);
        //System.out.println("resource:"+resource.getPath());
        if(StringUtils.isEmpty(templatePath)){
            throw new FreeMarkerException("templatePath can not be empty!");
        }
       /* if(resource==null){
            throw new FreeMarkerException("templatePath can not be empty!");
        }*/
        try{
            Configuration config = new Configuration(Configuration.VERSION_2_3_25);
            config.setDefaultEncoding("UTF-8");
            //config.setDirectoryForTemplateLoading(new File(templateFilePath));
            System.out.println("进到这里了，有来无回1");
            File file = new File(templateFilePath);
            config.setDirectoryForTemplateLoading(file);
            config.setTemplateExceptionHandler(TemplateExceptionHandler.RETHROW_HANDLER);
            config.setLogTemplateExceptions(false);System.out.println("进到这里了，有来无回2");
            Template template = config.getTemplate(templateFileName);System.out.println("进到这里了，有来无回3");
            StringWriter writer = new StringWriter();
            template.process(data, writer);
            writer.flush();
            String html = writer.toString();
            return html;
        }catch (Exception ex){
            throw new FreeMarkerException("FreeMarkerUtil process fail",ex);
        }
    }

    private static String getTemplatePath(String templatePath) {
        if(StringUtils.isEmpty(templatePath)){
            return "";
        }
        String path = "";
        int ss = templatePath.lastIndexOf("/");
        if(ss==-1){
        	path=templatePath.substring(0,templatePath.lastIndexOf("\\"));
        } else {
        	path=templatePath.substring(0,templatePath.lastIndexOf("/"));
        }
        System.out.println("八嘎呀路path:"+path);
        return path;
    }

    private static String getTemplateName(String templatePath) {
        if(StringUtils.isEmpty(templatePath)){
            return "";
        }
        String fileName=templatePath.substring(templatePath.lastIndexOf("/")+1);
        return fileName;
    }

    /**
     * @description 获取PDF的模板路径,
     * 默认按照PDF文件名匹对应模板
     * @param fileName PDF文件名    (hello.pdf)
     * @return         匹配到的模板名
     * @throws IOException 
     */
    public static String getPDFTemplatePath(String fileName) throws IOException{
        //String  classpath=PDFKit.class.getClassLoader().getResource("").getPath();
    	//String  classpath=ResourceUtils.getURL("classpath:templates").getPath();
        String templatePath=ResourceUtils.getURL("classpath:templates").getPath();
        System.out.println("战神归来009："+templatePath);
        String pdfFileName=fileName.substring(0,fileName.lastIndexOf("."));
        //URL resource = FreeMarkerUtil.class.getResource("/templates/"+pdfFileName+".ftl");
        //File file=new File(templatePath);
        /*if (file.exists()) {
                 if (file.isDirectory()) {
    	                 System.out.println("dir exists");
    	            } else {
    	                 System.out.println("the same name file exists, can not create dir");
    	                 throw new PDFException("PDF模板文件不存在,请检查templates文件夹!");
    	             }
        } else {
	             System.out.println("dir not exists, create it ...");
	             file.mkdir();
        }*/
        /*if(!file.isDirectory()){
            throw new PDFException("PDF模板文件不存在,请检查templates文件夹!");
        }*/
       /* if(resource==null){
            throw new PDFException("PDF模板文件不存在,请检查templates文件夹!");
        }*/
        System.out.println("能进到这里吗？");
        //String pdfFileName=fileName.substring(0,fileName.lastIndexOf("."));
        File defaultTemplate=null;
        //File matchTemplate=null;
        File f=new File(templatePath+"/"+pdfFileName+".ftl");
        String templateName=f.getName();
            if(defaultTemplate==null){
                defaultTemplate=f;
            }
            /*templateName=templateName.substring(0,templateName.lastIndexOf("."));
            if(templateName.toLowerCase().equals(pdfFileName.toLowerCase())){
                matchTemplate=f;
                break;
            }*/
        /*for(File f:file.listFiles()){
            if(!f.isFile()){
                continue;
            }
            String templateName=f.getName();
            if(templateName.lastIndexOf(".ftl")==-1){
                continue;
            }
            if(defaultTemplate==null){
                defaultTemplate=f;
            }
            if(StringUtils.isEmpty(fileName)&&defaultTemplate!=null){
                break;
            }
            templateName=templateName.substring(0,templateName.lastIndexOf("."));
            if(templateName.toLowerCase().equals(pdfFileName.toLowerCase())){
                matchTemplate=f;
                break;
            }
        }*/
       /* if(matchTemplate!=null){System.out.println("八嘎雅鹿111");
        	System.out.println("八嘎雅鹿111："+matchTemplate.getAbsolutePath());
            return matchTemplate.getAbsolutePath();
        }*/
        if(defaultTemplate!=null){
            System.out.println("八嘎雅鹿222");
            return defaultTemplate.getAbsolutePath();
        }
        return null;
    }

}
