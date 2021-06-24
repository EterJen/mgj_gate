package com.gwideal.core.pdf.kit.util;

import com.gwideal.core.common.SystemUtils;
import com.itextpdf.html2pdf.ConverterProperties;
import com.itextpdf.html2pdf.HtmlConverter;
import com.itextpdf.html2pdf.resolver.font.DefaultFontProvider;
import com.itextpdf.io.font.FontProgram;
import com.itextpdf.io.font.FontProgramFactory;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.font.FontProvider;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;

/**
 * PDF工具类
 * HTML转PDF（支持图片，字体）
 *
 * @author libing
 */
public class PDFUtils {

	public static String basePath = SystemUtils.getRootPath();
	
    public static final String[] FONTS = {
            basePath+ "/css/font/STSong-Light.ttf",
            basePath+ "/css/font/fangzheng.ttf",
            basePath + "/css/font/fangsong_GB2312.ttf",
            basePath + "/css/font/kaiti.ttf"
    };
    //图片路径
    public static final String STATICSOURCE = basePath+"/apps/workflow/pdfTemplates/source/";
    
/*    //燕托接口路径
    //服务器需要更改
    public static final String HTTPURL = "http://localhost:8080/restcomponent/flow/seals/";*/

    /**
     * 根据HTML创建PDF
     *
     * @param html
     * @param fonts
     * @param dest
     */
    public static void createPdf(String html, String dest) throws IOException {
        ConverterProperties properties = new ConverterProperties();
        properties.setBaseUri(STATICSOURCE);
        FontProvider fontProvider = new DefaultFontProvider(false, false, false);
        for (String font : FONTS) {
            FontProgram fontProgram = FontProgramFactory.createFont(font);
            fontProvider.addFont(fontProgram);
        }
        properties.setFontProvider(fontProvider);
        HtmlConverter.convertToPdf(html, new PdfWriter(new File(dest)), properties);
    }

    /**
     * 根据HTML创建PDF
     *
     * @param html
     * @return
     */
    public static ByteArrayOutputStream html2Pdf(String html) throws FileNotFoundException, IOException {
        ConverterProperties props = new ConverterProperties();
        props.setBaseUri(STATICSOURCE);
        DefaultFontProvider fontProvider = new DefaultFontProvider(false, false, false);
        for (String font : FONTS) {
            FontProgram fontProgram = FontProgramFactory.createFont(font);
            fontProvider.addFont(fontProgram);
        }
        props.setFontProvider(fontProvider);
        ByteArrayOutputStream bao = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(bao);
        PdfDocument pdf = new PdfDocument(writer);
        pdf.setDefaultPageSize(new PageSize(595, 14400));
        Document document = HtmlConverter.convertToDocument(html, pdf, props);
        document.close();
        return bao;
    }
}
