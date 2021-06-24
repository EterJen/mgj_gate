package com.gwideal.core.util;

import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Element;
import com.lowagie.text.pdf.BaseFont;
import com.lowagie.text.pdf.ExtendedColor;
import com.lowagie.text.pdf.GrayColor;
import com.lowagie.text.pdf.PdfContentByte;
import com.lowagie.text.pdf.PdfGState;
import com.lowagie.text.pdf.PdfWriter;

import freemarker.core.ParseException;
import freemarker.template.MalformedTemplateNameException;
import freemarker.template.TemplateException;
import freemarker.template.TemplateNotFoundException;

import org.apache.commons.lang.StringUtils;
import org.xhtmlrenderer.pdf.ITextRenderer;

import javax.servlet.http.HttpServletResponse;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ExportPdfUtils {

    public static void main(String[] args) {
        try {

            Map<Object, Object> o=new HashMap<Object, Object>();
            //存入一个集合
            List<String> list = new ArrayList<String>();
            list.add("小明");
            list.add("张三");
            list.add("李四");
            o.put("name", "http://www.xdemo.org/");
            o.put("nameList", list);

            String path=PdfHelper.getPath();

            generateToFile(path, "tpl.ftl",path+"pdf/", o, "D:\\xdemo.pdf");

        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    /**
     * 生成PDF到文件
     * @param ftlPath 模板文件路径（不含文件名）
     * @param ftlName 模板文件吗（不含路径）
     * @param imageDiskPath 图片的磁盘路径
     * @param data 数据
     * @param outputFile 目标文件（全路径名称）
     * @throws Exception
     */
    public static void generateToFile(String ftlPath,String ftlName,String imageDiskPath,Object data,String outputFile) throws Exception {
        String html=PdfHelper.getPdfContent(ftlPath, ftlName, data);
        OutputStream out = null;
        ITextRenderer render = null;
        out = new FileOutputStream(outputFile);
        render = PdfHelper.getRender();
        render.setDocumentFromString(html);
        if(imageDiskPath!=null&&!imageDiskPath.equals("")){
            //html中如果有图片，图片的路径则使用这里设置的路径的相对路径，这个是作为根路径
            render.getSharedContext().setBaseURL("file:/"+imageDiskPath);
        }

        render.layout();
        render.createPDF(out);
        render.finishPDF();
        render = null;
        out.close();
    }

    /**
     * 生成PDF到输出流中（ServletOutputStream用于下载PDF）
     * @param ftlPath ftl模板文件的路径（不含文件名）
     * @param ftlName ftl模板文件的名称（不含路径）
     * @param imageDiskPath 如果PDF中要求图片，那么需要传入图片所在位置的磁盘路径
     * @param data 输入到FTL中的数据
     * @param response HttpServletResponse
     * @return
     * @throws TemplateNotFoundException
     * @throws MalformedTemplateNameException
     * @throws ParseException
     * @throws IOException
     * @throws TemplateException
     * @throws DocumentException
     */
    public static OutputStream generateToServletOutputStream(String ftlPath, String ftlName, String imageDiskPath, Object data, HttpServletResponse response) throws TemplateNotFoundException, MalformedTemplateNameException, ParseException, IOException, TemplateException, DocumentException {
        String html=PdfHelper.getPdfContent(ftlPath, ftlName, data);
        OutputStream out = null;
        ITextRenderer render = null;
        out = response.getOutputStream();
        render = PdfHelper.getRender();
        render.setDocumentFromString(html);
        if(imageDiskPath!=null&&!imageDiskPath.equals("")){
            //html中如果有图片，图片的路径则使用这里设置的路径的相对路径，这个是作为根路径
            render.getSharedContext().setBaseURL("file:/"+imageDiskPath);
        }
        render.layout();
        render.createPDF(out);
        render.finishPDF();
        render = null;
        return out;
    }
    
    public static OutputStream generateAddressBookToServletOutputStream(String ftlPath, String ftlName, String imageDiskPath, Object data, HttpServletResponse response) throws TemplateNotFoundException, MalformedTemplateNameException, ParseException, IOException, TemplateException, DocumentException {
        String html=PdfHelper.getPdfContent(ftlPath, ftlName, data);
        OutputStream out = null;
        ITextRenderer render = null;
        out = response.getOutputStream();
        render = PdfHelper.getRender();
        render.setDocumentFromString(html);
        if(imageDiskPath!=null&&!imageDiskPath.equals("")){
            //html中如果有图片，图片的路径则使用这里设置的路径的相对路径，这个是作为根路径
            render.getSharedContext().setBaseURL("file:/"+imageDiskPath);
        }
        render.layout();
        //render.createPDF(out);
        render.createPDF(out, false, 0);
        buildDocumentWaterMark(render,BaseFont.createFont("static/fonts/仿宋GB2312.ttf",BaseFont.IDENTITY_H,BaseFont.NOT_EMBEDDED),260,Element.ALIGN_LEFT,"保",130, 200, 0);
        buildDocumentWaterMark(render,BaseFont.createFont("static/fonts/仿宋GB2312.ttf",BaseFont.IDENTITY_H,BaseFont.NOT_EMBEDDED),260,Element.ALIGN_LEFT,"密",530, 200, 0);
        render.finishPDF();
        render = null;
        return out;
    }
    
    
    public static void buildDocumentWaterMark(ITextRenderer render,BaseFont font,float size,int alignment, String waterMarkText, float x, float y, float rotation){
    	PdfWriter writer=render.getWriter();
        if (StringUtils.isNotBlank(waterMarkText)) {
            // 加入水印
            PdfContentByte waterMar = writer.getDirectContentUnder();
            // 开始设置水印
            waterMar.beginText();
            // 设置水印透明度
            PdfGState gs = new PdfGState();
            // 设置填充字体不透明度为0.4f 
            gs.setFillOpacity(0.1f);
            try {
                // 设置水印字体参数及大小                                  (字体参数，字体编码格式，是否将字体信息嵌入到pdf中（一般不需要嵌入），字体大小)
                try {
                	waterMar.setFontAndSize(font, size);
                	//waterMar.setFontAndSize(BaseFont.createFont("/biz/pdf/fonts/SIMLI.TTF",BaseFont.IDENTITY_H,BaseFont.NOT_EMBEDDED), 36);
                } catch (Exception e) {
                    e.printStackTrace();
                }
                // 设置透明度
                waterMar.setGState(gs);
                // 设置水印对齐方式 水印内容 X坐标 Y坐标 旋转角度
                waterMar.showTextAligned(alignment, waterMarkText ,x, y, rotation);
                // 设置水印颜色
                waterMar.setColorFill(new GrayColor(0.3f));
                //结束设置
                waterMar.endText();
                waterMar.stroke();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    

}
