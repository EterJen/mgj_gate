package com.gwideal.core.pdf.kit.util;

import java.io.FileOutputStream;

import com.lowagie.text.Image;
import com.lowagie.text.pdf.BaseFont;
import com.lowagie.text.pdf.PdfContentByte;
import com.lowagie.text.pdf.PdfGState;
import com.lowagie.text.pdf.PdfReader;
import com.lowagie.text.pdf.PdfStamper;

public class WaterMarkUtil {
	/**
	 * 加水印（字符串）
	 * 
	 * @param inputFile
	 *            需要加水印的PDF路径
	 * @param outputFile
	 *            输出生成PDF的路径
	 * @param waterMarkName
	 *            水印字符
	 */
	public static void stringWaterMark(String inputFile, String waterMarkName) {
		try {
			String[] spe = DataUtil.separatePath(inputFile);
			String outputFile = spe[0] + "_水印." + spe[1];

			PdfReader reader = new PdfReader(inputFile);
			PdfStamper stamper = new PdfStamper(reader, new FileOutputStream(outputFile));

			// 添加中文字体
			/*BaseFont bfChinese = BaseFont.createFont("STSong-Light",
					"UniGB-UCS2-H", BaseFont.NOT_EMBEDDED);*/
			BaseFont bfChinese = BaseFont.createFont(FontUtil.getFontPath("SIMLI.TTF"),
					BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
			int total = reader.getNumberOfPages() + 1;

			PdfContentByte under;
			int j = waterMarkName.length();
			char c = 0;
			int rise = 0;
			// 给每一页加水印
			for (int i = 1; i < total; i++) {
				rise = 400;
				under = stamper.getUnderContent(i);
				under.beginText();
				under.setFontAndSize(bfChinese, 30);
				under.setTextMatrix(200, 120);
				for (int k = 0; k < j; k++) {
					under.setTextRise(rise);
					c = waterMarkName.charAt(k);
					under.showText(c + "");
				}

				// 添加水印文字
				under.endText();
			}
			stamper.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 加水印（图片）
	 * 
	 * @param inputFile
	 *            需要加水印的PDF路径
	 * @param outputFile
	 *            输出生成PDF的路径
	 * @param imageFile
	 *            水印图片路径
	 */
	public static void imageWaterMark(String inputFile, String imageFile) {
		try {
			String[] spe = DataUtil.separatePath(inputFile);
			String outputFile = spe[0] + "_WM." + spe[1];

			PdfReader reader = new PdfReader(inputFile);
			PdfStamper stamper = new PdfStamper(reader, new FileOutputStream(
					outputFile));

			int total = reader.getNumberOfPages() + 1;

			Image image = Image.getInstance(imageFile);
			image.setAbsolutePosition(50, 50);// 坐标
			image.scaleAbsolute(mmTopx(40), mmTopx(10));// 自定义大小
			// image.setRotation(-20);//旋转 弧度
			// image.setRotationDegrees(-45);//旋转 角度
			// image.scalePercent(50);//依照比例缩放

			PdfGState gs = new PdfGState();
			gs.setFillOpacity(0.4f);// 设置透明度为0.2

			PdfContentByte under;
			// 给每一页加水印
			for (int i = 1; i < total; i++) {
				under = stamper.getUnderContent(i);
				under.beginText();
				// 添加水印图片
				under.addImage(image);
				under.setGState(gs);
			}
			stamper.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	/**
     * 毫米转像素
     * @param mm
     * @return
     */
    public static float mmTopx(float mm){
     mm = (float) (mm *3.33) ;
     return mm ;
    }
}
