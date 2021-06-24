package com.gwideal.core.util;

import com.gwideal.core.basic.l4.entity.ExportType;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.*;
import org.apache.poi.xssf.usermodel.extensions.XSSFCellBorder;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.Color;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 导出Excel工具类
 */
public class ExportExcelUtils {

    public static HSSFWorkbook createHssfWorkBook(ExcelData excelData) {

        //创建HSSFWorkbook，对应一个Excel文件
        HSSFWorkbook wb = new HSSFWorkbook();
        //添加一个sheet，对应Excel文件中的sheet
        HSSFSheet sheet = wb.createSheet(excelData.getName());

        //在创建的sheet页中创建表头
        HSSFRow row = sheet.createRow(0);

        //创建居中样式
        HSSFCellStyle cellStyle = wb.createCellStyle();
        cellStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);

        //生命单元格对象
        HSSFCell cell = null;
        int colIndex = 0;
        //设置表头
        for (String title : excelData.getTitles()) {
            cell = row.createCell(colIndex);
            cell.setCellValue(title);
            colIndex++;
        }

        int bodyStartRow = 1;
        //设置表格数据
        for (List<Object> list : excelData.getData()) {
            row = sheet.createRow(bodyStartRow);
            colIndex = 0;
            for (Object obj : list) {
                cell = row.createCell(colIndex);
                if (null != obj) {
                    cell.setCellValue(obj.toString());
                }
                colIndex++;
            }
            bodyStartRow++;
        }
        return wb;
    }

    public static void exportExcel(HttpServletResponse response, String fileName, ExcelData data) throws Exception {
        // 告诉浏览器用什么软件可以打开此文件
        response.setHeader("content-Type", "application/vnd.ms-excel");
        // 下载文件的默认名称
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        String agent = request.getHeader("USER-AGENT").toLowerCase();
        if (agent.contains("firefox")) {
            response.setCharacterEncoding("utf-8");
            response.setHeader("content-disposition", "attachment;filename=" + new String(fileName.getBytes(), "ISO8859-1"));
        } else {
            response.setHeader("Content-Disposition", "attachment;filename=" + URLEncoder.encode(fileName, "utf-8"));
        }
        exportExcel(data, response.getOutputStream());
    }

    public static void exportExcel(ExcelData data, OutputStream out) throws Exception {

        XSSFWorkbook wb = new XSSFWorkbook();
        try {
            String sheetName = data.getName();
            if (null == sheetName) {
                sheetName = "Sheet1";
            }
            XSSFSheet sheet = wb.createSheet(sheetName);
            writeExcel(wb, sheet, data);

            wb.write(out);
        } finally {
            out.close();
        }
    }

    private static void writeExcel(XSSFWorkbook wb, Sheet sheet, ExcelData data) {

        int rowIndex = 0;
        int columnNums = 0;
        boolean flag = false;
        if (null != data.getTitles() && !data.getTitles().isEmpty()) {
            columnNums = data.getTitles().size() + 1;
            rowIndex = writeTitlesToExcel(wb, sheet, data.getTitles());
        }
        if (null != data.getMergeTitles() && !data.getMergeTitles().isEmpty()) {
            flag = true;
            columnNums = data.getMergeTitles().get(0).size() + 1;
            rowIndex = writeMergeTitlesToExcel(wb, sheet, data.getMergeTitles());
        }
        writeRowsToExcel(wb, sheet, data.getData(), rowIndex, flag);
        autoSizeColumns(sheet, columnNums);

    }

    private static int writeMergeTitlesToExcel(XSSFWorkbook wb, Sheet sheet, List<List<String>> mergeTitles) {
        if (mergeTitles.size() <= 1) {
            return writeTitlesToExcel(wb, sheet, mergeTitles.get(0));
        } else {
            int rowIndex = 0;
            Font titleFont = wb.createFont();
            titleFont.setFontName("simsun");
            ((XSSFFont) titleFont).setBold(true);
            // titleFont.setFontHeightInPoints((short) 14);
            titleFont.setColor(IndexedColors.BLACK.index);

            XSSFCellStyle titleStyle = wb.createCellStyle();
            titleStyle.setAlignment(XSSFCellStyle.ALIGN_CENTER);
            titleStyle.setVerticalAlignment(XSSFCellStyle.VERTICAL_CENTER);
            titleStyle.setFillForegroundColor(new XSSFColor(new Color(182, 184, 192)));
            titleStyle.setFillPattern(XSSFCellStyle.SOLID_FOREGROUND);
            titleStyle.setFont(titleFont);
            // titleRow.setHeightInPoints(25);
            setBorder(titleStyle, new BorderStyle[]{BorderStyle.NONE, BorderStyle.THIN, BorderStyle.NONE, BorderStyle.THIN}, new XSSFColor(new Color(0, 0, 0)));

            /*对于多行title,行数不一样，做跨行处理*/
            Boolean addMergedRegion = false;
            if (mergeTitles!=null && mergeTitles.size()==2&&mergeTitles.get(0).size()==1&&mergeTitles.get(0).size()!=mergeTitles.get(1).size()) {
                addMergedRegion=true;
            }
            int i=0;
            for (List<String> titles : mergeTitles) {
                if (i==0&&addMergedRegion) {
                    sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, mergeTitles.get(1).size()-1));
                }
                Row titleRow = sheet.createRow(rowIndex);
                int colIndex = 0;
                for (String title : titles) {
                    Cell cell = titleRow.createCell(colIndex);
                    cell.setCellValue(title);
                    cell.setCellStyle(titleStyle);
                    colIndex++;
                }
                rowIndex++;
                i++;
            }

            return rowIndex;
        }
    }

    private static int writeTitlesToExcel(XSSFWorkbook wb, Sheet sheet, List<String> titles) {
        int rowIndex = 0;
        int colIndex = 0;

        Font titleFont = wb.createFont();
        titleFont.setFontName("simsun");
        ((XSSFFont) titleFont).setBold(true);
        // titleFont.setFontHeightInPoints((short) 14);
        titleFont.setColor(IndexedColors.BLACK.index);

        XSSFCellStyle titleStyle = wb.createCellStyle();
        titleStyle.setAlignment(XSSFCellStyle.ALIGN_CENTER);
        titleStyle.setVerticalAlignment(XSSFCellStyle.VERTICAL_CENTER);
        titleStyle.setFillForegroundColor(new XSSFColor(new Color(182, 184, 192)));
        titleStyle.setFillPattern(XSSFCellStyle.SOLID_FOREGROUND);
        titleStyle.setFont(titleFont);
        setBorder(titleStyle, BorderStyle.THIN, new XSSFColor(new Color(0, 0, 0)));

        Row titleRow = sheet.createRow(rowIndex);
        // titleRow.setHeightInPoints(25);
        colIndex = 0;

        for (String field : titles) {
            Cell cell = titleRow.createCell(colIndex);
            cell.setCellValue(field);
            cell.setCellStyle(titleStyle);
            colIndex++;
        }

        rowIndex++;
        return rowIndex;
    }

    private static int writeRowsToExcel(XSSFWorkbook wb, Sheet sheet, List<List<Object>> rows, int rowIndex, Boolean flag) {
        int colIndex = 0;

        Font dataFont = wb.createFont();
        dataFont.setFontName("simsun");
        // dataFont.setFontHeightInPoints((short) 14);
        dataFont.setColor(IndexedColors.BLACK.index);

        XSSFCellStyle dataStyle = wb.createCellStyle();
        if (flag) {
            dataStyle.setAlignment(XSSFCellStyle.ALIGN_LEFT);
        }
        dataStyle.setVerticalAlignment(XSSFCellStyle.VERTICAL_CENTER);
        dataStyle.setFont(dataFont);
        dataStyle.setWrapText(true);
        setBorder(dataStyle, BorderStyle.THIN, new XSSFColor(new Color(0, 0, 0)));

        for (List<Object> rowData : rows) {
            Row dataRow = sheet.createRow(rowIndex);
            // dataRow.setHeightInPoints(25);
            colIndex = 0;
            for (Object cellData : rowData) {
                Cell cell = dataRow.createCell(colIndex);
                cell.setCellStyle(dataStyle);
                if (cellData != null) {
                    cell.setCellValue(new XSSFRichTextString(cellData.toString()));
                } else {
                    cell.setCellValue("");
                }

                colIndex++;
            }
            rowIndex++;
        }
        return rowIndex;
    }

    private static void autoSizeColumns(Sheet sheet, int columnNumber) {
        //单元格最大宽度
        int maxWidth = 10240;
        ExportType exportType = ExportExcelUtils.exportTypeMap.get(sheet.getSheetName());
        String[] colWidth = null;
        if (null != exportType) {
            colWidth = exportType.getColWidth();
        }
        if (null != colWidth && colWidth.length > 0) {
            for (int i = 0; i < colWidth.length; i++) {
                String s = colWidth[i];
                if ("0".equals(s)) {
                    sheet.autoSizeColumn(i, true);
                } else {
                    sheet.setColumnWidth(i, Integer.parseInt(s));
                }
            }
        } else {
            for (int i = 0; i < columnNumber; i++) {
                int orgWidth = sheet.getColumnWidth(i);
                sheet.autoSizeColumn(i, true);
                int newWidth = (int) (sheet.getColumnWidth(i) + 100);
                if (newWidth >= maxWidth) {
                    sheet.setColumnWidth(i, maxWidth);
                } else if (newWidth < maxWidth && newWidth > orgWidth) {
                    sheet.setColumnWidth(i, newWidth);
                } else {
                    sheet.setColumnWidth(i, orgWidth);
                }
            }
        }
    }

    /**
     * 设置单元格样式
     *
     * @param style
     * @param borderStyles 单元格边框样式(上、右、下、左)
     * @param color
     */
    private static void setBorder(XSSFCellStyle style, BorderStyle[] borderStyles, XSSFColor color) {
        style.setBorderTop(borderStyles[0]);
        style.setBorderRight(borderStyles[1]);
        style.setBorderBottom(borderStyles[2]);
        style.setBorderLeft(borderStyles[3]);
        style.setBorderColor(XSSFCellBorder.BorderSide.TOP, color);
        style.setBorderColor(XSSFCellBorder.BorderSide.LEFT, color);
        style.setBorderColor(XSSFCellBorder.BorderSide.RIGHT, color);
        style.setBorderColor(XSSFCellBorder.BorderSide.BOTTOM, color);
    }

    private static void setBorder(XSSFCellStyle style, BorderStyle border, XSSFColor color) {
        style.setBorderTop(border);
        style.setBorderLeft(border);
        style.setBorderRight(border);
        style.setBorderBottom(border);
        style.setBorderColor(XSSFCellBorder.BorderSide.TOP, color);
        style.setBorderColor(XSSFCellBorder.BorderSide.LEFT, color);
        style.setBorderColor(XSSFCellBorder.BorderSide.RIGHT, color);
        style.setBorderColor(XSSFCellBorder.BorderSide.BOTTOM, color);
    }

    /****************************************导出发文统计情况结果---start***********************************************************/
    public static String[] tiltes = new String[]{
            "序号",
            "发文字号",
            "标题",
            "密级",
            "份数",
            "委内公开",
            "主动公开",
            "依申请公开",
            "不予公开"
    };
    public static String[] fawenStatisticsColWidth = new String[]{/*指定宽度*/
            "0", //"序号",
            "0", //"发文字号",
            "30240", //"标题",
            "0", //"密级",
            "0", //"份数",
            "0", //"委内公开",
            "0", //"主动公开",
            "0", //"依申请公开",
            "0", //"不予公开"
    };

    public static String[] fawenStatisticsToInsert = new String[]{//导出时Excel中的每一列，顺序很重要
            "pageNo",
            "docFullName",
            "title",
            "theCommonFormInfo.secretLevel",
            "incomingNum",
            "theCommonFormInfo.publicityLevel.wngk",
            "theCommonFormInfo.publicityLevel.zdgk",
            "theCommonFormInfo.publicityLevel.ysqgk",
            "theCommonFormInfo.publicityLevel.bygk"
    };
    /****************************************导出发文统计情况结果---end***********************************************************/

    /****************************************导出收发文，上级来文等等查询条件---start***********************************************************/
    public static String[] fawentiltes = new String[]{
            "序号",
            "发文字号",
            "标题",
            "密级",
            "份数",
            "主动公开"
    };
    private static final String[] fawenColWidth = new String[]{
            "0", //"序号",
            "0", //"发文字号",
            "30240", //"标题",
            "0", //"密级",
            "0", //"份数",
            "0", //"主动公开"
    };

    public static String[] fawenQueryToInsert = new String[]{//导出时Excel中的每一列，顺序很重要
            "pageNo",
            "docFullName",
            "title",
            "theCommonFormInfo.secretLevel",
            "incomingNum",
            /*"theCommonFormInfo.publicityLevel.wngk",*/
            "theCommonFormInfo.publicityLevel.zdgk"
            /*"theCommonFormInfo.publicityLevel.ysqgk",
            "theCommonFormInfo.publicityLevel.bygk"*/
    };

    public static String[] shouwentiltes = new String[]{
            "序号",
            "收文字号",
            "来文字号",
            "标题",
            "密级",
            "份数"
            /*"委内公开",
            "主动公开",
            "依申请公开",
            "不予公开"*/
    };
    public static String[] shouwenColWidth = new String[]{
            "0", //"序号",
            "0", //"收文字号",
            "0", //"来文字号",
            "30240", //"标题",
            "0", //"密级",
            "0", //"份数"
    };

    public static String[] shouwenQueryToInsert = new String[]{//导出时Excel中的每一列，顺序很重要
            "pageNo",
            "docFullName",
            "incomingDocNum",
            "title",
            "theCommonFormInfo.secretLevel",
            "incomingNum"
            /*"theCommonFormInfo.publicityLevel.wngk",
            "theCommonFormInfo.publicityLevel.zdgk",
            "theCommonFormInfo.publicityLevel.ysqgk",
            "theCommonFormInfo.publicityLevel.bygk"*/
    };

    public static String[] xinhantiltes = new String[]{
            "序号",
            "日期",
            "收文文号",
            "来文单位",
            "类别",
            "标题",
            "经办人",
            "当前处理人"

    };
    private static final String[] xinhanColWidth = new String[]{
            "0", //"序号",
            "0", //"日期",
            "0", //"收文文号",
            "0", //"来文单位",
            "0", //"类别",
            "30240", //"标题",
            "0", //"经办人",
            "0", //"当前处理人"
    };

    public static String[] xinhanQueryToInsert = new String[]{//导出时Excel中的每一列，顺序很重要
            "pageNo",
            "createTime",
            "docFullName",
            "incomingDocDepart",
            "handleState",
            "title",
            "creatorName",
            "canBeReturnTask.assigneeName"
    };
    public static String[] duwenSuperviseTitles = new String[]{
            "收文日期",
            "长城电子督编号",
            "来文字号",
            "来自收文",
            "文件标题",
            "所处阶段",
            "阶段操作人"
    };


    public static String[] duwenSuperviseColWidth = new String[]{
            "0", //"收文日期",
            "0", //"长城电子督编号",
            "0", //"来文字号",
            "0", //"来自收文",
            "30240", //"文件标题",
            "0", //"所处阶段",
            "0", //"阶段操作人"
    };

    public static String[] duwenSuperviseToInsert = new String[]{
            "receiveDocTime",
            "docFullName",
            "incomingDocNum",
            "relatedReceiveDocId",
            "title"
    };


    public static String[] duwenExportTitles = new String[]{
            "序号",
            "来文单位",
            "长城电子督编号",
            "来文字号",
            "文件标题",
            "市领导批示",
            "委领导批示",
            "承办处室",
            "完成情况"
    };

    public static String[] duwenExportColWidth = new String[]{
            "0", //"序号",
            "0", //"来文单位",
            "0", //"长城电子督编号",
            "0", //"来文字号",
            "30240", //"文件标题",
            "0", //"市领导批示",
            "0", //"委领导批示",
            "0", //"承办处室",
            "0", //"完成情况"
    };

    public static String[] rdzxQueryToInsertOne = new String[]{//人大政协导入时Excel中的每一列，顺序很重要
            "incomingDocDepart",
            "proposalNumber",
            "proposalPeople",
            "title",
            "sendToMain",
            "presidentDepartment",
            "",
            "handlingResult",
            "",
            ""
    };

    public static String[] rdzxQueryToInsertTwo = new String[]{//人大政协导入时Excel中的每一列，顺序很重要
            "",
            "incomingDocDepart",
            "proposalNumber",
            "title",
            "proposalPeople",
            "sendToMain",
            "presidentDepartment",
            "",
            ""
    };

    public static String[] lhfwTiltes = new String[]{
            "序号",
            "登录日期",
            "发文字号",
            "标题",
    };

    public static String[] lhfwColWidth = new String[]{
            "0", //"序号",
            "0", //"登录日期",
            "0", //"发文字号",
            "40240", //"标题",
    };

    public static String[] lhfwToInsert = new String[]{//导出时Excel中的每一列，顺序很重要
            "pageNo",
            "denluTime",
            "docFullName",
            "title"
    };

    public static String[] notPurchasedToInsert = new String[]{//导出时Excel中的每一列，顺序很重要
            "pageNo",
            "name",
            "dicTypeName",
            "quantity"
    };

    public static String[] notPurchasedColWidth = new String[]{
            "0", //"序号",
            "0", //"登录日期",
            "0", //"发文字号",
            "0", //"标题",
    };

    public static String[] lnotPurchasedTiltes = new String[]{
            "序号",
            "物品名称",
            "物品分类",
            "申领数量",
    };

    public static String[] BoughtToInsert = new String[]{//导出时Excel中的每一列，顺序很重要
            "pageNo",
            "numbering",
            "name",
            "dicTypeName",
            "quantity",
            "unit",
            "specification",
            "requiredDepartment",
            "remarks",
            "reasonAplication",
            "createTime"
    };


    public static String[] BoughtColWidth = new String[]{
            "0", //"序号",
            "0", //"物品编号",
            "0", //"物品名称",
            "0", //"分类",
            "0", //"数量",
            "0", //"单位",
            "0", //"规格",
            "0", //"所需部门",
            "0", //"备注",
            "0", //"申请理由",
            "0" //"登记时间",
    };

    public static String[] BoughtTiltes = new String[]{
            "序号",
            "物品编号",
            "物品名称",
            "分类",
            "数量",
            "单位",
            "规格",
            "所需部门",
            "备注",
            "申请理由",
            "登记时间"
    };

    public static String[] inboundStatisticsToInsert = new String[]{//导出时Excel中的每一列，顺序很重要
            "pageNo",
            "numbering",
            "name",
            "dicTypeName",
            "quantity",
            "unit",
            "specification",
            "unitPrice",
            "totalPrice",
            "createTime",
            "manager",
            "remarks"
    };


    public static String[] inboundStatisticsColWidth = new String[]{
            "0", //"序号",
            "0", //"物品编号",
            "0", //"物品名称",
            "0", //"分类",
            "0", //"数量",
            "0", //"单位",
            "0", //"规格",
            "0", //"所需部门",
            "0", //"备注",
            "0", //"申请理由",
            "0", //"申请理由",
            "0" //"登记时间",
    };

    public static String[] inboundStatisticsTiltes = new String[]{
            "序号",
            "物品编号",
            "物品名称",
            "分类",
            "入库数量",
            "单位",
            "规格",
            "单价",
            "总价",
            "入库时间",
            "经办人",
            "备注"
    };


    public static String[] claimStatisticsToInsert = new String[]{//导出时Excel中的每一列，顺序很重要
            "pageNo",
            "name",
            "unitPrice",
            "numbering",
            "quantity",
            "totalPrice"
    };


    public static String[] claimStatisticsColWidth = new String[]{
            "0", //"序号",
            "0", //"物品编号",
            "0", //"物品名称",
            "0", //"分类",
            "0", //"数量",
            "0" //"单位",
    };

    public static String[] claimStatisticsTiltes = new String[]{
            "序号",
            "物品名称",
            "单价",
            "物品编号",
            "数目合计",
            "金额合计"
    };
    /****************************************导出收发文，上级来文等等查询条件---end***********************************************************/


    public static Map<String, ExportType> exportTypeMap = new HashMap<String, ExportType>();

    static {
        ExportType fawenStatistics = new ExportType("fawenStatistics", fawenStatisticsToInsert, tiltes, "发文结果汇总", fawenStatisticsColWidth);
        ExportType fawenQuery = new ExportType("fawenQuery", fawenQueryToInsert, fawentiltes, "发文查询", fawenColWidth);
        ExportType shouwenQuery = new ExportType("shouwenQuery", shouwenQueryToInsert, shouwentiltes, "收文查询", shouwenColWidth);
        ExportType xinhanQuery = new ExportType("xinhanQuery", xinhanQueryToInsert, xinhantiltes, "信函查询", xinhanColWidth);
        ExportType duwenSupervise = new ExportType("duwenSupervise", null, duwenSuperviseTitles, "督文监督", duwenSuperviseColWidth);
        ExportType duwenExport = new ExportType("duwenExport", null, duwenExportTitles, "督文导出", duwenExportColWidth);
        ExportType lhfwExport = new ExportType("lhfwExport", lhfwToInsert, lhfwTiltes, "联合发文", lhfwColWidth);

        ExportType NotPurchased = new ExportType("NotPurchased", notPurchasedToInsert, lnotPurchasedTiltes, "采购未购买", notPurchasedColWidth);
        ExportType Bought = new ExportType("Bought", BoughtToInsert, BoughtTiltes, "采购已购买入库", BoughtColWidth);
        ExportType inboundStatistics = new ExportType("inboundStatistics", inboundStatisticsToInsert, inboundStatisticsTiltes, "物品入库统计", inboundStatisticsColWidth);

        ExportType claimingStatistics = new ExportType("claimingStatistics", claimStatisticsToInsert, claimStatisticsTiltes, "物品申领统计", claimStatisticsColWidth);
        ExportType claimingStatisticsToarget = new ExportType("claimingStatisticsToarget", claimStatisticsToInsert, claimStatisticsTiltes, "物品申领统计", claimStatisticsColWidth);

        exportTypeMap.put("fawenStatistics", fawenStatistics);
        exportTypeMap.put("fawenQuery", fawenQuery);
        exportTypeMap.put("shangjilaiwenQuery", fawenQuery);
        exportTypeMap.put("shouwenQuery", shouwenQuery);
        exportTypeMap.put("xinhanQuery", xinhanQuery);
        exportTypeMap.put("duwenSupervise", duwenSupervise);
        exportTypeMap.put("duwenExport", duwenExport);
        exportTypeMap.put("lhfwExport", lhfwExport);
        exportTypeMap.put("NotPurchased", NotPurchased);
        exportTypeMap.put("Bought", Bought);
        exportTypeMap.put("inboundStatistics", inboundStatistics);
        exportTypeMap.put("claimingStatistics", claimingStatistics);
        exportTypeMap.put("claimingStatisticsToarget", claimingStatisticsToarget);
    }
}
