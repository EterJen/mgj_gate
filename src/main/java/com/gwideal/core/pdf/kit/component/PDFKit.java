/*package com.gwideal.core.pdf.kit.component;

import com.google.common.collect.Lists;
import com.gwideal.core.pdf.kit.component.builder.HeaderFooterBuilder;
import com.gwideal.core.pdf.kit.component.builder.PDFBuilder;
import com.gwideal.core.pdf.kit.component.chart.Line;
import com.gwideal.core.pdf.kit.exception.PDFException;
import com.gwideal.core.pdf.kit.util.FreeMarkerUtil;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;
import org.xhtmlrenderer.pdf.ITextRenderer;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.nio.charset.Charset;
import java.util.List;

@Slf4j
public class PDFKit {

    //PDF页眉、页脚定制工具
    private HeaderFooterBuilder headerFooterBuilder;
    private String saveFilePath;
    *//**
     * @description     导出pdf到文件
     * @param fileName  输出PDF文件名
     * @param data      模板所需要的数据
     *
     *//*
    public String exportToFile(String fileName,Object data){
    	try {
    		String htmlData= FreeMarkerUtil.getContent(fileName, data);
            if(StringUtils.isEmpty(saveFilePath)){
                saveFilePath=getDefaultSavePath(fileName);
            }
            File file=new File(saveFilePath);
            if(!file.getParentFile().exists()){
                file.getParentFile().mkdirs();
            }
            FileOutputStream outputStream=null;
            try{
                //设置输出路径
                outputStream=new FileOutputStream(saveFilePath);
                //设置文档大小
                Document document = new Document(PageSize.A4);
                PdfWriter writer = PdfWriter.getInstance(document, outputStream);

                //设置页眉页脚
                PDFBuilder builder = new PDFBuilder(headerFooterBuilder,data);
                builder.setPresentFontSize(10);
                writer.setPageEvent(builder);

                //输出为PDF文件
                convertToPDF(writer,document,htmlData);
            }catch(Exception ex){
                throw new PDFException("PDF export to File fail",ex);
            }finally{
                IOUtils.closeQuietly(outputStream);
            }
            
		} catch (Exception e) {
			e.printStackTrace();
		}
    	return saveFilePath;
    }




    *//**
     * 生成PDF到输出流中（ServletOutputStream用于下载PDF）
     * @param ftlPath ftl模板文件的路径（不含文件名）
     * @param data 输入到FTL中的数据
     * @param response HttpServletResponse
     * @return
     * @throws IOException 
     *//*
    public  OutputStream exportToResponse(String ftlPath,Object data,
                                                     HttpServletResponse response) throws IOException{

        String html= FreeMarkerUtil.getContent(ftlPath,data);
        try{
            OutputStream out = null;
            ITextRenderer render = null;
            out = response.getOutputStream();
            //设置文档大小
            Document document = new Document(PageSize.A4);
            PdfWriter writer = PdfWriter.getInstance(document, out);
            //设置页眉页脚
            PDFBuilder builder = new PDFBuilder(headerFooterBuilder,data);
            writer.setPageEvent(builder);
            //输出为PDF文件
            convertToPDF(writer,document,html);
            return out;
        }catch (Exception ex){
            throw  new PDFException("PDF export to response fail",ex);
        }

    }

    *//**
     * @description PDF文件生成
     *//*
    private  void convertToPDF(PdfWriter writer,Document document,String htmlString){
        //获取字体路径
        String fontPath=getFontPath();
        document.open();
        try {
            XMLWorkerHelper.getInstance().parseXHtml(writer,document,
                    new ByteArrayInputStream(htmlString.getBytes()),
                    XMLWorkerHelper.class.getResourceAsStream("/default.css"),
                    Charset.forName("UTF-8"),new XMLWorkerFontProvider(fontPath));
        } catch (IOException e) {
            e.printStackTrace();
            throw new PDFException("PDF文件生成异常",e);
        }finally {
            document.close();
        }

    }
    *//**
     * @description 创建默认保存路径
     *//*
    private  String  getDefaultSavePath(String fileName){
        String classpath=PDFKit.class.getClassLoader().getResource("").getPath();
        String saveFilePath=classpath+"pdf/"+fileName;
        System.out.println("战神1："+saveFilePath);
        File f=new File(saveFilePath);
        if(!f.getParentFile().exists()){
            f.mkdirs();
        }
        return saveFilePath;
    }

    *//**
     * @description 获取字体设置路径
     *//*
    public static String getFontPath() {
        String classpath=PDFKit.class.getClassLoader().getResource("static").getPath();
        //ResourceUtils.getURL("classpath:static").getPath();
        //String classpath="C:/templates/";
        String fontpath=classpath+"/fonts";
        return fontpath;
    }

    public HeaderFooterBuilder getHeaderFooterBuilder() {
        return headerFooterBuilder;
    }
    public void setHeaderFooterBuilder(HeaderFooterBuilder headerFooterBuilder) {
        this.headerFooterBuilder = headerFooterBuilder;
    }
    public String getSaveFilePath() {
        return saveFilePath;
    }
    public void setSaveFilePath(String saveFilePath) {
        this.saveFilePath = saveFilePath;
    }
    
    public  String createPDF(Object data, String fileName){
        //pdf保存路径
        try {
            //设置自定义PDF页眉页脚工具类
            PDFHeaderFooter headerFooter=new PDFHeaderFooter();
            PDFKit kit=new PDFKit();
            kit.setHeaderFooterBuilder(headerFooter);
            //设置输出路径
            String classpath=PDFKit.class.getClassLoader().getResource("templates/").getPath();
            System.out.println("路径=="+classpath);
            //pdf保存的路径
            kit.setSaveFilePath(classpath+fileName);

            String saveFilePath=kit.exportToFile(fileName,data);
            return  saveFilePath;
        } catch (Exception e) {
        	System.out.println("竟然失败了，艹！");
        	e.printStackTrace();
//            log.error("PDF生成失败{}", ExceptionUtils.getFullStackTrace(e));
           System.out.println("PDF生成失败{}");
            return null;
        }
    }
    
    public List<Line> getTemperatureLineList() {
        List<Line> list= Lists.newArrayList();
        for(int i=1;i<=7;i++){
            Line line=new Line();
            float random=Math.round(Math.random()*10);
            line.setxValue("星期"+i);
            line.setyValue(20+random);
            line.setGroupName("下周");
            list.add(line);
        }
        for(int i=1;i<=7;i++){
            Line line=new Line();
            float random=Math.round(Math.random()*10);
            line.setxValue("星期"+i);
            line.setyValue(20+random);
            line.setGroupName("这周");
            list.add(line);
        }
        return list;
    }
}*/