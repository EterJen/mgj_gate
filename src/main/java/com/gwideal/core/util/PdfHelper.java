package com.gwideal.core.util;

import com.lowagie.text.DocumentException;
import com.lowagie.text.pdf.BaseFont;
import freemarker.core.ParseException;
import freemarker.template.*;
import org.apache.commons.lang3.StringUtils;
import org.xhtmlrenderer.pdf.ITextRenderer;

import java.io.File;
import java.io.IOException;
import java.io.StringWriter;
import java.util.Locale;

public class PdfHelper {
    public static ITextRenderer getRender() throws DocumentException, IOException {

        ITextRenderer render = new ITextRenderer();

        String path = getPath();
        /*BaseFont font = BaseFont.createFont(path + "楷体GB2312", BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
        Font f=new Font(font);
        f.setColor(Color.red);
        f = FontFactory.getFont(
                f.getFamilyname(),
                f.getSize(),
                Font.BOLD,
                f.getColor());*/
        //添加字体，以支持中文
        render.getFontResolver().addFont(path + "arialuni.ttf", BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
        render.getFontResolver().addFont(path + "arialuni.ttf", BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
        render.getFontResolver().addFont(path + "楷体GB2312.ttf", BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
        render.getFontResolver().addFont(path + "仿宋GB2312.ttf", BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
        render.getFontResolver().addFont(path + "方正姚体.ttf", BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
        render.getFontResolver().addFont(path + "方正姚体GBK.ttf", BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
        render.getFontResolver().addFont(path + "方正姚体简体.ttf", BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);

        /*render.getFontResolver().addFont(path + "simsun.ttc", BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);


        render.getFontResolver().addFont(path + "fangsong_GB2312.ttf", BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
        render.getFontResolver().addFont(path + "fangzheng.ttf", BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
        render.getFontResolver().addFont(path + "kaiti.ttf", BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);*/


        return render;
    }

    //获取要写入PDF的内容
    public static String getPdfContent(String ftlPath, String ftlName, Object o) throws TemplateNotFoundException, MalformedTemplateNameException, ParseException, IOException, TemplateException {
        return useTemplate(ftlPath, ftlName, o);
    }

    //使用freemarker得到html内容
    public static String useTemplate(String ftlPath, String ftlName, Object o) throws TemplateNotFoundException, MalformedTemplateNameException, ParseException, IOException, TemplateException {

        String html = null;

        Template tpl = getFreemarkerConfig(ftlPath).getTemplate(ftlName);
        tpl.setEncoding("UTF-8");

        StringWriter writer = new StringWriter();
        tpl.process(o, writer);
        writer.flush();
        html = writer.toString();
        return html;
    }

    /**
     * 获取Freemarker配置
     * @param templatePath
     * @return
     * @throws IOException
     */
    private static Configuration getFreemarkerConfig(String templatePath) throws IOException {
        freemarker.template.Version version = new freemarker.template.Version("2.3.22");
        Configuration config = new Configuration(version);
        config.setDirectoryForTemplateLoading(new File(templatePath));
        config.setEncoding(Locale.CHINA, "utf-8");
        return config;
    }

    /**
     * 获取字体路径
     * @return
     */
    public static String getPath(){
        String classpath=PdfHelper.class.getClassLoader().getResource("static").getPath();
        String fontpath=classpath+"/fonts/";
        /*String basepath = PdfHelper.class.getResource("/").getPath().substring(1);
        String fullpath = basepath+"com/gwideal/core/util/";*/
        System.out.println(fontpath);
        return fontpath;
    }

    /**
     * 输出文档全路径，包含文件名称,如果fileName为空则返回模板所在的路径
     * @param fileName 文件名称
     * @return
     */
    public static String fileOutPatn(String fileName){
        String classpath=PdfHelper.class.getClassLoader().getResource("templates/").getPath();
        if(StringUtils.isBlank(fileName)){
            return classpath;
        }
        System.out.println("路径=="+classpath);
        File file=new File(classpath+fileName);
        if(!file.getParentFile().exists()){
            file.getParentFile().mkdirs();
        }
        return classpath+fileName;
    }

}
