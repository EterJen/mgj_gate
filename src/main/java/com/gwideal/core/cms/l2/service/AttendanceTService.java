package com.gwideal.core.cms.l2.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.OutputStream;
import java.lang.reflect.InvocationTargetException;
import java.text.SimpleDateFormat;
import java.util.*;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.TypeReference;
import com.gwideal.core.jwt.JwtUser;
import com.gwideal.core.util.BrowserUtils;
import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.beanutils.PropertyUtils;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;
import org.apache.poi.ss.util.CellRangeAddress;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gwideal.core.cms.l4.entity.*;
import com.gwideal.core.cms.l3.dao.*;
import com.gwideal.mybatis.metautils.ResultInfo;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import per.eter.utils.datetime.DateTimeUtils;
import per.eter.utils.file.FileUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.math.BigDecimal;

@Service
@Transactional
public class AttendanceTService {

    @Autowired
    private AttendanceTMapper attendanceTMapper;

    @Autowired
    private AttendanceDMapper attendanceDMapper;

/*	@Autowired
	private AttendanceDService attendanceDService;*/


    public int create(AttendanceT attendanceT) {
        int insert = attendanceTMapper.insert(attendanceT);
        List<AttendanceD> attendanceDList = attendanceT.getAttendanceDList();
        for (AttendanceD d : attendanceDList) {
            attendanceDMapper.insert(d);
        }
        return insert;
    }


    public int createAndRef(AttendanceT attendanceT) {
        int insert = attendanceTMapper.insert(attendanceT);
        for (int i = 0; i < attendanceT.getSizes().length; i++) {
            AttendanceD d = new AttendanceD();
            d.setId(BigDecimal.valueOf(i + attendanceT.getId().intValue()));
            d.setUsername(attendanceT.getSizes()[i]);
            d.setAttendanceId(attendanceT.getId());
            if ("0".equals(attendanceT.getUse()[0])) {
                d.setDay1("");
            } else {
                d.setDay1("√");
            }

            if ("0".equals(attendanceT.getUse()[1])) {
                d.setDay2("");
            } else {
                d.setDay2("√");
            }

            if ("0".equals(attendanceT.getUse()[2])) {
                d.setDay3("");
            } else {
                d.setDay3("√");
            }

            if ("0".equals(attendanceT.getUse()[3])) {
                d.setDay4("");
            } else {
                d.setDay4("√");
            }

            if ("0".equals(attendanceT.getUse()[4])) {
                d.setDay5("");
            } else {
                d.setDay5("√");
            }

            if ("0".equals(attendanceT.getUse()[5])) {
                d.setDay6("");
            } else {
                d.setDay6("√");
            }

            if ("0".equals(attendanceT.getUse()[6])) {
                d.setDay7("");
            } else {
                d.setDay7("√");
            }

            if ("0".equals(attendanceT.getUse()[7])) {
                d.setDay8("");
            } else {
                d.setDay8("√");
            }

            if ("0".equals(attendanceT.getUse()[8])) {
                d.setDay9("");
            } else {
                d.setDay9("√");
            }

            if ("0".equals(attendanceT.getUse()[9])) {
                d.setDay10("");
            } else {
                d.setDay10("√");
            }

            if ("0".equals(attendanceT.getUse()[10])) {
                d.setDay11("");
            } else {
                d.setDay11("√");
            }

            if ("0".equals(attendanceT.getUse()[11])) {
                d.setDay12("");
            } else {
                d.setDay12("√");
            }

            if ("0".equals(attendanceT.getUse()[12])) {
                d.setDay13("");
            } else {
                d.setDay13("√");
            }

            if ("0".equals(attendanceT.getUse()[13])) {
                d.setDay14("");
            } else {
                d.setDay14("√");
            }

            if ("0".equals(attendanceT.getUse()[14])) {
                d.setDay15("");
            } else {
                d.setDay15("√");
            }

            if ("0".equals(attendanceT.getUse()[15])) {
                d.setDay16("");
            } else {
                d.setDay16("√");
            }

            if ("0".equals(attendanceT.getUse()[16])) {
                d.setDay17("");
            } else {
                d.setDay17("√");
            }

            if ("0".equals(attendanceT.getUse()[17])) {
                d.setDay18("");
            } else {
                d.setDay18("√");
            }

            if ("0".equals(attendanceT.getUse()[18])) {
                d.setDay19("");
            } else {
                d.setDay19("√");
            }

            if ("0".equals(attendanceT.getUse()[19])) {
                d.setDay20("");
            } else {
                d.setDay20("√");
            }

            if ("0".equals(attendanceT.getUse()[20])) {
                d.setDay21("");
            } else {
                d.setDay21("√");
            }

            if ("0".equals(attendanceT.getUse()[21])) {
                d.setDay22("");
            } else {
                d.setDay22("√");
            }

            if ("0".equals(attendanceT.getUse()[22])) {
                d.setDay23("");
            } else {
                d.setDay23("√");
            }

            if ("0".equals(attendanceT.getUse()[23])) {
                d.setDay24("");
            } else {
                d.setDay24("√");
            }

            if ("0".equals(attendanceT.getUse()[24])) {
                d.setDay25("");
            } else {
                d.setDay25("√");
            }

            if ("0".equals(attendanceT.getUse()[25])) {
                d.setDay26("");
            } else {
                d.setDay26("√");
            }

            if ("0".equals(attendanceT.getUse()[26])) {
                d.setDay27("");
            } else {
                d.setDay27("√");
            }

            if ("0".equals(attendanceT.getUse()[27])) {
                d.setDay28("");
            } else {
                d.setDay28("√");
            }

            if (attendanceT.getUse().length > 28) {
                if ("0".equals(attendanceT.getUse()[28])) {
                    d.setDay29("");
                } else {
                    d.setDay29("√");
                }
            } else {
                d.setDay29("");
            }

            if (attendanceT.getUse().length > 29) {
                if ("0".equals(attendanceT.getUse()[29])) {
                    d.setDay30("");
                } else {
                    d.setDay30("√");
                }
            } else {
                d.setDay30("");
            }

            if (attendanceT.getUse().length > 30) {
                if ("0".equals(attendanceT.getUse()[30])) {
                    d.setDay31("");
                } else {
                    d.setDay31("√");
                }
            } else {
                d.setDay31("");
            }
            attendanceDMapper.insertAndRef(d);
        }
        return insert;
    }

    public AttendanceT read(BigDecimal id) {
        return attendanceTMapper.selectByPrimaryKey(id);
    }

    public int update(AttendanceT attendanceT) {
        attendanceT.setStatus("数据最新更新时间：" + DateTimeUtils.DATE_CN.formatNow());
        attendanceT.setLastUpdateTime(new Date());
        int i = attendanceTMapper.updateByPrimaryKey(attendanceT);
        AttendanceD attendanceD = attendanceT.getAttendanceD();
        attendanceDMapper.updateByPrimaryKey(attendanceD);
//		List<AttendanceD> attendanceDList = attendanceT.getAttendanceDList();
//		for (AttendanceD d : attendanceDList) {
//			attendanceDMapper.updateByRefId(d);
//		}
        return i;
    }


    public int updateList(List<AttendanceT> attendanceTList) {
        int flag = 0;
        for (AttendanceT attendanceT : attendanceTList) {
            flag = attendanceTMapper.updateByPrimaryKey(attendanceT);
            List<AttendanceD> attendanceDList = attendanceT.getAttendanceDList();
            for (AttendanceD d : attendanceDList) {
                flag = attendanceDMapper.updateByRefId(d);
            }
        }
        return flag;
    }


    public int delete(BigDecimal id) {
        return attendanceTMapper.deleteByPrimaryKey(id);
    }


    public ResultInfo<AttendanceT> list(AttendanceT queryBean) {
        ResultInfo<AttendanceT> result = new ResultInfo<AttendanceT>();
        if (queryBean.getPaging().equals("Yes")) {
            PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
            List<AttendanceT> plist = attendanceTMapper.list(queryBean);
            PageInfo<AttendanceT> pageInfo = new PageInfo<AttendanceT>(plist);
            result.setTotalRows(pageInfo.getTotal());
            result.setBeanList(pageInfo.getList());
            result.setResultType("success");
            return result;
        } else {
            List<AttendanceT> plist = attendanceTMapper.list(queryBean);
            result.setTotalRows((long) plist.size());
            result.setBeanList(plist);
            result.setResultType("success");
            return result;
        }
    }

    public ResultInfo<AttendanceT> initData(AttendanceT queryBean) {
        ResultInfo<AttendanceT> result = new ResultInfo<AttendanceT>();
        List<AttendanceT> attendanceTListResult = new ArrayList<>();
        result.setBeanList(attendanceTListResult);


        AttendanceT attendanceTQueryBean = new AttendanceT();
        attendanceTQueryBean.setWorkday(queryBean.getWorkday());
        List<AttendanceT> list = attendanceTMapper.list(attendanceTQueryBean);
        HashMap<String, AttendanceT> stringAttendanceTHashMap = new HashMap<>();
        HashMap<String, AttendanceD> stringAttendanceDHashMap = new HashMap<>();
        for (AttendanceT attendanceT : list) {
            attendanceTMapper.deleteByPrimaryKey(attendanceT);
            stringAttendanceTHashMap.put(attendanceT.getDeptId(), attendanceT);
            List<AttendanceD> attendanceDList = attendanceT.getAttendanceDList();
            for (AttendanceD attendanceD : attendanceDList) {
                stringAttendanceDHashMap.put(attendanceT.getDeptId() + ":" + attendanceD.getUserId(), attendanceD);
                attendanceDMapper.deleteByPrimaryKey(attendanceD);
            }
        }

        AttendanceD initAttendanceD = queryBean.getAttendanceD();
        List<AttendanceT> attendanceTList = queryBean.getAttendanceTList();
        for (AttendanceT attendanceT : attendanceTList) {
            String deptId = attendanceT.getDeptId();
            AttendanceT attendanceTDo = stringAttendanceTHashMap.get(deptId);
            if (null == attendanceTDo) {
                attendanceTDo = new AttendanceT();
                attendanceTDo.setStatus("数据由系统初始化");
                attendanceTDo.setDaySize(queryBean.getDaySize());
                attendanceTDo.setWorkday(queryBean.getWorkday());
                attendanceTDo.setDeptId(attendanceT.getDeptId());
            }
            attendanceTDo.setId(null);
            attendanceTDo.setDeptName(attendanceT.getDeptName());
            attendanceTDo.setOrderNum(attendanceT.getOrderNum());
            attendanceTMapper.insert(attendanceTDo);
            attendanceTListResult.add(attendanceTDo);
            List<AttendanceD> attendanceDListResult = new ArrayList<>();
            attendanceTDo.setAttendanceDList(attendanceDListResult);

            List<AttendanceD> attendanceDList = attendanceT.getAttendanceDList();
            for (AttendanceD attendanceD : attendanceDList) {
                AttendanceD attendanceDDo = stringAttendanceDHashMap.get(attendanceT.getDeptId() + ":" + attendanceD.getUserId());

                if (null == attendanceDDo) {
                    if ("借调人员".equals(attendanceT.getDeptName())) {
                        attendanceDDo = new AttendanceD();
                    } else {
                        try {
                            attendanceDDo = (AttendanceD) BeanUtils.cloneBean(initAttendanceD);
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                }

                if ("借调人员".equals(attendanceT.getDeptName())) {
                    attendanceDDo.setSecondFlag("1");
                    attendanceDDo.setSecondTo(attendanceD.getSecondTo());
                }
                attendanceDDo.setId(null);
                attendanceDDo.setAttendanceId(attendanceTDo.getId());
                attendanceDDo.setOrderNum(attendanceD.getOrderNum());
                attendanceDDo.setUserId(attendanceD.getUserId());
                attendanceDDo.setUsername(attendanceD.getUsername());
                attendanceDMapper.insert(attendanceDDo);
                attendanceDListResult.add(attendanceDDo);
            }
        }


        result.setResultType("success");
        return result;
    }

    public ResultInfo<AttendanceT> getOne(AttendanceT queryBean) {
        ResultInfo<AttendanceT> result = new ResultInfo<AttendanceT>();
        List<AttendanceT> attendanceTListResult = attendanceTMapper.list(queryBean);
        result.setBeanList(attendanceTListResult);
        result.setResultType("success");
        return result;
    }


    public ResultInfo<AttendanceT> getMore(AttendanceT attendanceT) {
        ResultInfo<AttendanceT> result = new ResultInfo<AttendanceT>();
        List<AttendanceT> plist = attendanceTMapper.listByWorkday(attendanceT);
        if (null != plist) {
            for (int i = 0; i < plist.size(); i++) {
                BigDecimal attendanceTid = plist.get(i).getId();
                AttendanceD attendanceD = new AttendanceD();
                attendanceD.setAttendanceId(attendanceTid);
                List<AttendanceD> attendanceDResultInfo = attendanceDMapper.listByReffceId(attendanceD);
                plist.get(i).setAttendanceDList(attendanceDResultInfo);
            }
        }
        result.setBeanList(plist);
        result.setResultType("success");
        return result;
    }

    public String nameFormat(String name) {
        int length = name.length();
        if (null == name) {
            return "";
        }
        if (2 == length) {
            name = name.substring(0, 1) + "  " + name.substring(1, 2);
        }
        return name;
    }

    public void export(String attendanceRefId, HttpServletRequest request, HttpServletResponse response) {
        OutputStream ops = null;
        HSSFWorkbook wb = null;
        POIFSFileSystem fs = null;
        HSSFSheet sheet = null;

        AttendanceT attendanceT = JSON.parseObject(attendanceRefId, new TypeReference<AttendanceT>() {
        });

        int daySize = attendanceT.getDaySize().intValue();
        String filename = "处室" + daySize + ".xlsx";

        try {
            String path = FileUtils.webResourceFilePath("classpath:static/attendance/template");
            File file = new File(String.valueOf(path) + "/" + filename);


            String yearNum = attendanceT.getWorkday().substring(0, 4);
            String monthNum = attendanceT.getWorkday().substring(5);

            fs = new POIFSFileSystem(new FileInputStream(file));
            wb = new HSSFWorkbook(fs);
            wb.setSheetName(0, yearNum + "年" + monthNum + "月");
            sheet = wb.getSheetAt(0);


            ResultInfo<AttendanceT> one = getOne(attendanceT);
            List<AttendanceT> beanList = one.getBeanList();
            String deptName = beanList.get(0).getDeptName();

            /*第1行*/
            HSSFRow row = sheet.getRow(1);
            row.getCell(0).setCellValue("（考勤周期：" + attendanceT.getWorkday().substring(0, 4) + "年" + attendanceT.getWorkday().substring(5) + "月1日至" + attendanceT.getWorkday().substring(5) + "月" + daySize + "日）");
            /*第2行*/
            HSSFRow row2 = sheet.getRow(2);
            row2.getCell(0).setCellValue("部  门：" + deptName);
            row2.getCell(25).setCellValue("考勤日期：" + new SimpleDateFormat("yyyy年MM月dd日").format(new Date()));

            int rowNum = 3;
            for (AttendanceT t : beanList) {
                List<AttendanceD> attendanceDList = t.getAttendanceDList();
                for (AttendanceD attendanceD : attendanceDList) {
                    rowNum += 1;
                    HSSFRow ro = sheet.getRow(rowNum);
                    ro.getCell(1).setCellValue(attendanceD.getUsername());
                    if ("1".equals(attendanceD.getSecondFlag())) {
                        HSSFCell cell = ro.getCell(2);
                        cell.setCellValue(attendanceD.getSecondTo());
                        CellRangeAddress region = new CellRangeAddress(rowNum, rowNum, 2, daySize + 1);
                        sheet.addMergedRegion(region);
                    } else {
                        for (int i = 1; i <= daySize; i++) {
                            Object property = PropertyUtils.getProperty(attendanceD, "day" + i);
                            if (null != property) {
                                ro.getCell(i + 1).setCellValue((String) property);
                            }
                        }

                    }
                }
            }

            /*考勤行*/
            HSSFRow row20 = sheet.getRow(20);
            UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
            JwtUser currentUser = (JwtUser) token.getPrincipal();
            row20.getCell(daySize + 2).setCellValue(currentUser.getCoreUser().getDisplay());

            /*备注行*/
            HSSFRow row22 = sheet.getRow(22);
            row22.getCell(2).setCellValue(attendanceT.getMark());

            response.setContentType("application/vnd.ms-excel");
            request.setCharacterEncoding("UTF-8");
            String browser = BrowserUtils.checkBrowser(request
                    .getHeader("user-agent"));

            BrowserUtils.setExport(browser, deptName + "考勤表" + yearNum + "年" + monthNum + "月.xls", response);
            ops = response.getOutputStream();
            wb.write(ops);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (ops != null)
                try {
                    ops.flush();
                    ops.close();
                } catch (Exception e) {
                    e.printStackTrace();
                }
        }
    }

    /**
     * 26      * 根据 年、月 获取对应的月份 的 天数
     * 27
     */
    public static int getDaysByYearMonth(int year, int month) {
        Calendar a = Calendar.getInstance();
        a.set(Calendar.YEAR, year);
        a.set(Calendar.MONTH, month - 1);
        a.set(Calendar.DATE, 1);
        a.roll(Calendar.DATE, -1);
        int maxDate = a.get(Calendar.DATE);
        return maxDate;
    }

    public void exportAll(String attendanceRefId, HttpServletRequest request, HttpServletResponse response) {
        OutputStream ops = null;
        HSSFWorkbook wb = null;
        POIFSFileSystem fs = null;
        HSSFSheet sheet = null;

        AttendanceT attendanceT = JSON.parseObject(attendanceRefId, new TypeReference<AttendanceT>() {
        });
        int daySize = attendanceT.getDaySize().intValue();
        String filename = "全局" + daySize + ".xlsx";

        try {
            String path = FileUtils.webResourceFilePath("classpath:static/attendance/template");
            File file = new File(String.valueOf(path) + "/" + filename);


            fs = new POIFSFileSystem(new FileInputStream(file));
            wb = new HSSFWorkbook(fs);
            String yearNum = attendanceT.getWorkday().substring(0, 4);
            String monthNum = attendanceT.getWorkday().substring(5);
            wb.setSheetName(0, yearNum + "年" + monthNum + "月");
            sheet = wb.getSheetAt(0);

            /*第1行*/
            HSSFRow row = sheet.getRow(1);
            row.getCell(0).setCellValue("（考勤周期：" + attendanceT.getWorkday().substring(0, 4) + "年" + attendanceT.getWorkday().substring(5) + "月1日至" + attendanceT.getWorkday().substring(5) + "月" + daySize + "日）");
            /*第2行*/
            HSSFRow row2 = sheet.getRow(2);
            row2.getCell(0).setCellValue("单  位：机要局");
            row2.getCell(25).setCellValue("考勤日期：" + new SimpleDateFormat("yyyy年MM月dd日").format(new Date()));

            ResultInfo<AttendanceT> one = getOne(attendanceT);
            List<AttendanceT> beanList = one.getBeanList();
            int rowNum = 3;
            for (AttendanceT t : beanList) {
                List<AttendanceD> attendanceDList = t.getAttendanceDList();
                for (AttendanceD attendanceD : attendanceDList) {
                    rowNum += 1;
                    if (24 == rowNum) {
                        rowNum += 1;
                    }
                    HSSFRow ro = sheet.getRow(rowNum);
                    ro.getCell(1).setCellValue(attendanceD.getUsername());
                    if ("1".equals(attendanceD.getSecondFlag())) {
                        HSSFCell cell = ro.getCell(2);
                        cell.setCellValue(attendanceD.getSecondTo());
                        CellRangeAddress region = new CellRangeAddress(rowNum, rowNum, 2, daySize + 1);
                        sheet.addMergedRegion(region);
                    } else {
                        for (int i = 1; i <= daySize; i++) {
                            Object property = PropertyUtils.getProperty(attendanceD, "day" + i);
                            if (null != property) {
                                ro.getCell(i + 1).setCellValue((String) property);
                            }
                        }

                    }
                }
            }

            /*考勤人*/
            HSSFRow row20 = sheet.getRow(58);
            UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
            JwtUser currentUser = (JwtUser) token.getPrincipal();
            row20.getCell(25).setCellValue("考勤人：" + currentUser.getCoreUser().getDisplay());

            /*删除多余行*/
            sheet.shiftRows(55, 68, rowNum + 1 - 55);//删除第一行到第四行，然后使下方单元格上移

            response.setContentType("application/vnd.ms-excel");
            request.setCharacterEncoding("UTF-8");
            String browser = BrowserUtils.checkBrowser(request
                    .getHeader("user-agent"));

            BrowserUtils.setExport(browser, "全局考勤表" + yearNum + "年" + monthNum + "月.xls", response);
            ops = response.getOutputStream();
            wb.write(ops);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (ops != null)
                try {
                    ops.flush();
                    ops.close();
                } catch (Exception e) {
                    e.printStackTrace();
                }
        }
    }

    public void copyRows(int startRow, int endRow, int pPosition,
                         HSSFSheet sheet) {
        int pStartRow = startRow - 1;
        int pEndRow = endRow - 1;
        int targetRowFrom;
        int targetRowTo;
        int columnCount;
        CellRangeAddress region = null;
        int i;
        int j;
        if (pStartRow == -1 || pEndRow == -1) {
            return;
        }
        // 拷贝合并的单元格
        for (i = 0; i < sheet.getNumMergedRegions(); i++) {
            region = sheet.getMergedRegion(i);
            if ((region.getFirstRow() >= pStartRow)
                    && (region.getLastRow() <= pEndRow)) {
                targetRowFrom = region.getFirstRow() - pStartRow + pPosition;
                targetRowTo = region.getLastRow() - pStartRow + pPosition;
                CellRangeAddress newRegion = region.copy();
                newRegion.setFirstRow(targetRowFrom);
                newRegion.setFirstColumn(region.getFirstColumn());
                newRegion.setLastRow(targetRowTo);
                newRegion.setLastColumn(region.getLastColumn());
                sheet.addMergedRegion(newRegion);
            }
        }
        // 设置列宽
        for (i = pStartRow; i <= pEndRow; i++) {
            HSSFRow sourceRow = sheet.getRow(i);
            columnCount = sourceRow.getLastCellNum();
            if (sourceRow != null) {
                HSSFRow newRow = sheet.createRow(pPosition - pStartRow + i);
                newRow.setHeight(sourceRow.getHeight());
                for (j = 0; j < columnCount; j++) {
                    HSSFCell templateCell = sourceRow.getCell(j);
                    if (templateCell != null) {
                        HSSFCell newCell = newRow.createCell(j);
                        copyCell(templateCell, newCell);
                    }
                }
            }
        }
    }


    private void copyCell(HSSFCell srcCell, HSSFCell distCell) {
        distCell.setCellStyle(srcCell.getCellStyle());
        if (srcCell.getCellComment() != null) {
            distCell.setCellComment(srcCell.getCellComment());
        }
        int srcCellType = srcCell.getCellType();
        distCell.setCellType(srcCellType);
        if (srcCellType == HSSFCell.CELL_TYPE_NUMERIC) {
            if (HSSFDateUtil.isCellDateFormatted(srcCell)) {
                distCell.setCellValue(srcCell.getDateCellValue());
            } else {
                distCell.setCellValue(srcCell.getNumericCellValue());
            }
        } else if (srcCellType == HSSFCell.CELL_TYPE_STRING) {
            distCell.setCellValue(srcCell.getRichStringCellValue());
        } else if (srcCellType == HSSFCell.CELL_TYPE_BLANK) {
            // nothing21
        } else if (srcCellType == HSSFCell.CELL_TYPE_BOOLEAN) {
            distCell.setCellValue(srcCell.getBooleanCellValue());
        } else if (srcCellType == HSSFCell.CELL_TYPE_ERROR) {
            distCell.setCellErrorValue(srcCell.getErrorCellValue());
        } else if (srcCellType == HSSFCell.CELL_TYPE_FORMULA) {
            distCell.setCellFormula(srcCell.getCellFormula());
        } else { // nothing29

        }
    }

    public void upSend(AttendanceT attendanceT) {
        Administrator cu = ((JwtUser) (((UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication()).getPrincipal())).getCoreUser();

        List<AttendanceT> attendanceTList = attendanceT.getAttendanceTList();
        String deptName = attendanceT.getDeptName();
        for (AttendanceT t : attendanceTList) {
            if ("1".equals(deptName)) {
                t.setStatus("处室内勤已确认上报：" + cu.getDisplay() + " " + DateTimeUtils.DATE_CN.formatNow());
            }
            t.setLastUpdateTime(new Date());
            int i = attendanceTMapper.updateByPrimaryKeySelective(t);
            List<AttendanceD> attendanceDList = t.getAttendanceDList();
            for (AttendanceD attendanceD : attendanceDList) {
                attendanceDMapper.updateByPrimaryKeySelective(attendanceD);
            }
        }
    }
}
