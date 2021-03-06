package com.gwideal.core.cms.l2.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.gwideal.core.cms.l3.dao.DutydateMapper;
import com.gwideal.core.cms.l3.dao.DutytableMapper;
import com.gwideal.core.cms.l3.dao.DutyuserMapper;
import com.gwideal.core.cms.l3.dao.WorkdayMapper;
import com.gwideal.core.cms.l4.entity.Dutydate;
import com.gwideal.core.cms.l4.entity.Dutyshow;
import com.gwideal.core.cms.l4.entity.Dutytable;
import com.gwideal.core.cms.l4.entity.Dutyuser;
import com.gwideal.core.cms.l4.entity.Workday;
import com.gwideal.core.util.BrowserUtils;
import com.gwideal.core.util.DateTimeUtils;
import com.gwideal.core.util.PoiExcelToHtmlUtil;
import com.gwideal.mybatis.metautils.ResultInfo;

import org.hothub.calendarist.Calendarist;
import org.hothub.calendarist.pojo.LunarDate;
import per.eter.utils.file.FileUtils;

import org.apache.commons.lang3.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.FileInputStream;
import java.io.OutputStream;
import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Service
@Transactional
public class DutytableService {

    @Autowired
    private DutytableMapper dutytableMapper;

    @Autowired
    private DutydateMapper dutydateMapper;

    @Autowired
    private WorkdayMapper workdayMapper;

    @Autowired
    private DutyuserMapper dutyuserMapper;

    public int create(Dutytable dutytable) {
        return dutytableMapper.insert(dutytable);
    }

    public Dutytable read(BigDecimal id) {
        return dutytableMapper.selectByPrimaryKey(id);
    }

    public int update(Dutytable dutytable) {
        return dutytableMapper.updateByPrimaryKey(dutytable);
    }

    public int delete(BigDecimal id) {
        return dutytableMapper.deleteByPrimaryKey(id);
    }


    public ResultInfo<Dutytable> list(Dutytable queryBean) {
        ResultInfo<Dutytable> result = new ResultInfo<Dutytable>();
        if (queryBean.getPaging().equals("Yes")) {
            PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
            List<Dutytable> plist = dutytableMapper.list(queryBean);
            PageInfo<Dutytable> pageInfo = new PageInfo<Dutytable>(plist);
            result.setTotalRows(pageInfo.getTotal());
            result.setBeanList(pageInfo.getList());
            result.setResultType("success");
            return result;
        } else {
            List<Dutytable> plist = dutytableMapper.list(queryBean);
            result.setTotalRows((long) plist.size());
            result.setBeanList(plist);
            result.setResultType("success");
            return result;
        }
    }

    public static HashMap<String, String> monthMap = new HashMap<>();
    public static HashMap<String, String> dayMap = new HashMap<>();

    static {
        monthMap.put("1", "??????");
        monthMap.put("2", "??????");
        monthMap.put("3", "??????");
        monthMap.put("4", "??????");
        monthMap.put("5", "??????");
        monthMap.put("6", "??????");
        monthMap.put("7", "??????");
        monthMap.put("8", "??????");
        monthMap.put("9", "??????");
        monthMap.put("10", "??????");
        monthMap.put("11", "??????");
        monthMap.put("12", "??????");

        dayMap.put("1", "??????");
        dayMap.put("2", "??????");
        dayMap.put("3", "??????");
        dayMap.put("4", "??????");
        dayMap.put("5", "??????");
        dayMap.put("6", "??????");
        dayMap.put("7", "??????");
        dayMap.put("8", "??????");
        dayMap.put("9", "??????");
        dayMap.put("10", "??????");
        dayMap.put("11", "??????");
        dayMap.put("12", "??????");
        dayMap.put("13", "??????");
        dayMap.put("14", "??????");
        dayMap.put("15", "??????");
        dayMap.put("16", "??????");
        dayMap.put("17", "??????");
        dayMap.put("18", "??????");
        dayMap.put("19", "??????");
        dayMap.put("20", "??????");
        dayMap.put("21", "??????");
        dayMap.put("22", "??????");
        dayMap.put("23", "??????");
        dayMap.put("24", "??????");
        dayMap.put("25", "??????");
        dayMap.put("26", "??????");
        dayMap.put("27", "??????");
        dayMap.put("28", "??????");
        dayMap.put("29", "??????");
        dayMap.put("30", "??????");
    }

    /**
     * ??????????????????
     *
     * @param dutytable
     * @return
     */
    public ResultInfo<Dutyshow> showMonth(Dutytable dutytable) {

        ResultInfo<Dutyshow> result = new ResultInfo<Dutyshow>();

        Date currentMonthFirstday = DateTimeUtils.getCurrentMonthFirstdayByDate(DateTimeUtils.str2Date(dutytable.getDatelong(), "yyyy-MM-dd"));
        Date currentMonthLastday = DateTimeUtils.getCurrentMonthLastdayByDate(DateTimeUtils.str2Date(dutytable.getDatelong(), "yyyy-MM-dd"));

        List<Dutytable> dutylist = dutytableMapper.getDutytableByDate(DateTimeUtils.parseDate(currentMonthFirstday, "yyyy-MM-dd"), DateTimeUtils.parseDate(currentMonthLastday, "yyyy-MM-dd"));

        Map<Object, Object> rotaMap = new HashMap<>();
        //???map?????????
        for (int i = 0; i < dutylist.size(); i++) {
            Dutytable dutytable2 = dutylist.get(i);
            rotaMap.put(i, dutytable2);
        }
        //????????????2?????????
        int temp = rotaMap.size();
        if (temp == 28 || temp == 30) {
            temp /= 2;
        } else if (temp == 29) {
            temp = 15;
        } else if (temp == 31) {
            temp = rotaMap.size() - 15;
        }
        int rotasize = temp;

        List<Dutyshow> rotashowList = new ArrayList<Dutyshow>();
        for (int i = 0; i < rotasize; i++) {
            int cloum2 = i + rotasize;
            Dutyshow show = new Dutyshow();

            String datelong = ((Dutytable) rotaMap.get(i)).getDatelong();
            LocalDate localDate = LocalDate.parse(datelong, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
            LocalDateTime localDateTime = localDate.atStartOfDay();
            Date date = per.eter.utils.datetime.DateTimeUtils.ldt2Date(localDateTime);
            Calendarist calendarist = Calendarist.fromSolar(date.getTime());
            LunarDate lunarDate = calendarist.toLunar();
            show.setRotadate1TolunarDate(monthMap.get("" + lunarDate.getMonth()) + dayMap.get("" + lunarDate.getDay()));

            show.setRotadate1(((Dutytable) rotaMap.get(i))
                    .getDatelong());
            show.setRotaweek1(((Dutytable) rotaMap.get(i))
                    .getWeekName());
            show.setRotaname1(((Dutytable) rotaMap.get(i))
                    .getUser1());
            show.setRotatxname1(((Dutytable) rotaMap.get(i))
                    .getUser2());
            show.setRotabwname1(((Dutytable) rotaMap.get(i))
                    .getUser3());
            show.setRotatype1(((Dutytable) rotaMap.get(i))
                    .getHoliday() + "");
            if (cloum2 < rotaMap.size()) {

                datelong = ((Dutytable) rotaMap.get(cloum2)).getDatelong();
                localDate = LocalDate.parse(datelong, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
                localDateTime = localDate.atStartOfDay();
                date = per.eter.utils.datetime.DateTimeUtils.ldt2Date(localDateTime);
                calendarist = Calendarist.fromSolar(date.getTime());
                lunarDate = calendarist.toLunar();
                show.setRotadate2TolunarDate(monthMap.get("" + lunarDate.getMonth()) + dayMap.get("" + lunarDate.getDay()));


                show.setRotadate2(((Dutytable) rotaMap.get(cloum2))
                        .getDatelong());
                show.setRotaweek2(((Dutytable) rotaMap.get(cloum2))
                        .getWeekName());
                show.setRotaname2(((Dutytable) rotaMap.get(cloum2))
                        .getUser1());
                show.setRotatxname2(((Dutytable) rotaMap.get(cloum2))
                        .getUser2());
                show.setRotabwname2(((Dutytable) rotaMap.get(cloum2))
                        .getUser3());
                show.setRotatype2(((Dutytable) rotaMap.get(cloum2))
                        .getHoliday() + "");
            }

            rotashowList.add(show);
        }

        result.setTotalRows((long) rotashowList.size());
        result.setBeanList(rotashowList);
        result.setResultType("success");
        return result;
    }

    public ResultInfo<Dutytable> queryMonth(Dutytable dutytable) {
        ResultInfo<Dutytable> result = new ResultInfo<Dutytable>();
        /*???????????????????????????*/
        if (StringUtils.isNotBlank(dutytable.getDatelong())) {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            try {
                Date currentMonthFirstday = DateTimeUtils.getCurrentMonthFirstdayByDate(sdf.parse(dutytable.getDatelong()));
                Date currentMonthLastday = DateTimeUtils.getCurrentMonthLastdayByDate(sdf.parse(dutytable.getDatelong()));
                dutytable.setStartDate(currentMonthFirstday);
                dutytable.setEndDate(currentMonthLastday);
            } catch (ParseException e) {
                e.printStackTrace();
            }

        }
        //---------------------?????????????????????
        //??????????????????????????????????????????????????????????????????????????????????????????
        List<Workday> list = workdayMapper.getWorkDayListByDate(DateTimeUtils.parseDate(dutytable.getStartDate(), "yyyy-MM-dd"), DateTimeUtils.parseDate(dutytable.getEndDate(), "yyyy-MM-dd"));

        //?????????????????????Map
        List<Dutyuser> listDutyuser = dutyuserMapper.getDutyusers("1");//???????????????
        Map<Object, Object> jbcmap = new HashMap<>();
        for (int i = 0; i < listDutyuser.size(); i++) {
            Dutyuser userMap = listDutyuser.get(i);
            jbcmap.put(i, userMap);
        }
        int index = 0;
        for (int i = 0; i < list.size(); i++) {
            Dutyuser user = null;
            Workday workday = list.get(i);
            user = (Dutyuser) jbcmap.get(index);

            //??????????????????????????????
            if (StringUtils.isNotBlank(user.getStartdate()) && StringUtils.isNotBlank(user.getEnddate())) {//????????????
                if (DateTimeUtils.str2Date(user.getStartdate(), "yyyy-MM-dd").getTime() <= workday.getWorkdate().getTime()
                        &&
                        workday.getWorkdate().getTime() <= DateTimeUtils.str2Date(user.getEnddate(), "yyyy-MM-dd").getTime()) {
                    index++;
                    user = (Dutyuser) jbcmap.get(index);//?????????????????????????????????
                }
            }
            if (StringUtils.isNotBlank(user.getStartdate()) && StringUtils.isNotBlank(user.getEnddate())) {
                //??????2???
                if (DateTimeUtils.str2Date(user.getStartdate(), "yyyy-MM-dd").getTime() <= workday.getWorkdate().getTime()
                        &&
                        workday.getWorkdate().getTime() <= DateTimeUtils.str2Date(user.getEnddate(), "yyyy-MM-dd").getTime()) {
                    index++;
                    user = (Dutyuser) jbcmap.get(index);//?????????????????????????????????
                }
            }
            if (StringUtils.isNotBlank(user.getStartdate()) && StringUtils.isNotBlank(user.getEnddate())) {
                //??????3???
                if (DateTimeUtils.str2Date(user.getStartdate(), "yyyy-MM-dd").getTime() <= workday.getWorkdate().getTime()
                        &&
                        workday.getWorkdate().getTime() <= DateTimeUtils.str2Date(user.getEnddate(), "yyyy-MM-dd").getTime()) {
                    index++;
                    user = (Dutyuser) jbcmap.get(index);//?????????????????????????????????
                }
            }

            //??????
            if (index >= jbcmap.size() - 1) {
                index = 0;
            } else {
                index++;
            }

            //System.out.println(i+"index=="+index+user.getName());
            Dutytable selectDutytable = new Dutytable();
            selectDutytable.setDatelong(DateTimeUtils.parseDate(workday.getWorkdate(), "yyyy-MM-dd"));
            List<Dutytable> list2 = dutytableMapper.select(selectDutytable);
            if (list2.size() > 0) {//??????
	        	 /*Dutytable updatedutytable=list2.get(0);
	        	 if("0".equals(workday.getIswork())){//??????
	        		 updatedutytable.setHoliday(1);
	        	 }else{
	        		 updatedutytable.setHoliday(0);
	        	 }
	        	 updatedutytable.setUser1(user.getName());
	        	 dutytableMapper.updateByPrimaryKey(updatedutytable);*/
            } else {//??????
                Dutytable newdutytable = new Dutytable();
                String ymd = selectDutytable.getDatelong();
                newdutytable.setYear(Integer.parseInt(ymd.substring(0, 4)));
                newdutytable.setMonth(Integer.parseInt(ymd.substring(5, 7)));
                newdutytable.setDay(Integer.parseInt(ymd.substring(8, 10)));
                newdutytable.setWeek(DateTimeUtils.dateToWeek(ymd));
                newdutytable.setDatelong(ymd);
                if ("0".equals(workday.getIswork())) {//??????
                    newdutytable.setHoliday(1);
                } else {
                    newdutytable.setHoliday(0);
                }
                if ("3".equals(workday.getMustworkday())) {
                    newdutytable.setHoliday(3);//?????????
                }
                if ("4".equals(workday.getMustworkday())) {
                    newdutytable.setHoliday(4);//??????
                }
                newdutytable.setUser1(user.getName());
                dutytableMapper.insert(newdutytable);
            }

        }
        ///---------------------?????????
        if (dutytable.getPaging().equals("Yes")) {
            PageHelper.startPage(1, 35);
            List<Dutytable> plist = dutytableMapper.list(dutytable);
            PageInfo<Dutytable> pageInfo = new PageInfo<Dutytable>(plist);
            //setHoliday(pageInfo.getList(),dutytable);

            result.setTotalRows((long) plist.size());
            result.setBeanList(pageInfo.getList());
            result.setResultType("success");
            return result;
        } else {
            List<Dutytable> plist = dutytableMapper.list(dutytable);
            //setHoliday(plist,dutytable);
            result.setTotalRows((long) plist.size());
            result.setBeanList(plist);
            result.setResultType("success");
            return result;
        }
    }

    /**
     * ???????????????????????????
     *
     * @param dutytable
     * @return
     */
    public ResultInfo<Dutytable> updateUsers(Dutytable dutytable) {
        ResultInfo<Dutytable> result = new ResultInfo<Dutytable>();

        Date d1 = DateTimeUtils.getCurrentMonthFirstdayByDate(new Date());
        Date d2 = DateTimeUtils.str2Date(dutytable.getDatelong(), "yyyy-MM-dd");
        if (d2.getTime() < d1.getTime()) {//?????????????????????????????????????????????
            result.setResultType("fail");
            result.setMessage("????????????????????????????????????");
            return result;
        }

        //?????????????????????????????????
        List<Workday> list = workdayMapper.getWorkDayListBystartDate(dutytable.getDatelong());
        //?????????????????????Map
        List<Dutyuser> listDutyuser = dutyuserMapper.getDutyusers("1");//???????????????
        Map<Object, Object> jbcmap = new HashMap<>();
        int index = 0;
        for (int i = 0; i < listDutyuser.size(); i++) {
            Dutyuser userMap = listDutyuser.get(i);
            jbcmap.put(i, userMap);
            if (userMap.getName().equals(dutytable.getUser1())) {
                index = i;//?????????????????????????????????????????????
            }
        }

        for (int i = 0; i < list.size(); i++) {
            Dutyuser user = null;
            Workday workday = list.get(i);
            user = (Dutyuser) jbcmap.get(index);
            //??????????????????????????????
            if (StringUtils.isNotBlank(user.getStartdate()) && StringUtils.isNotBlank(user.getEnddate())) {//????????????
                if (DateTimeUtils.str2Date(user.getStartdate(), "yyyy-MM-dd").getTime() <= workday.getWorkdate().getTime()
                        &&
                        workday.getWorkdate().getTime() <= DateTimeUtils.str2Date(user.getEnddate(), "yyyy-MM-dd").getTime()) {
                    index++;
                    user = (Dutyuser) jbcmap.get(index);//?????????????????????????????????
                }
            }
            if (StringUtils.isNotBlank(user.getStartdate()) && StringUtils.isNotBlank(user.getEnddate())) {
                //??????2???
                if (DateTimeUtils.str2Date(user.getStartdate(), "yyyy-MM-dd").getTime() <= workday.getWorkdate().getTime()
                        &&
                        workday.getWorkdate().getTime() <= DateTimeUtils.str2Date(user.getEnddate(), "yyyy-MM-dd").getTime()) {
                    index++;
                    user = (Dutyuser) jbcmap.get(index);//?????????????????????????????????
                }
            }
            if (StringUtils.isNotBlank(user.getStartdate()) && StringUtils.isNotBlank(user.getEnddate())) {
                //??????3???
                if (DateTimeUtils.str2Date(user.getStartdate(), "yyyy-MM-dd").getTime() <= workday.getWorkdate().getTime()
                        &&
                        workday.getWorkdate().getTime() <= DateTimeUtils.str2Date(user.getEnddate(), "yyyy-MM-dd").getTime()) {
                    index++;
                    user = (Dutyuser) jbcmap.get(index);//?????????????????????????????????
                }
            }

            //??????
            if (index >= jbcmap.size() - 1) {
                index = 0;
            } else {
                index++;
            }
            Dutytable selectDutytable = new Dutytable();
            selectDutytable.setDatelong(DateTimeUtils.parseDate(workday.getWorkdate(), "yyyy-MM-dd"));
            List<Dutytable> list2 = dutytableMapper.select(selectDutytable);
            if (list2.size() > 0) {//??????
                Dutytable updatedutytable = list2.get(0);
                if ("0".equals(workday.getIswork())) {//??????
                    updatedutytable.setHoliday(1);//??????
                } else {
                    updatedutytable.setHoliday(0);//?????????
                }
                if ("3".equals(workday.getMustworkday())) {
                    updatedutytable.setHoliday(3);//?????????
                }
                if ("4".equals(workday.getMustworkday())) {
                    updatedutytable.setHoliday(4);//??????
                }

                updatedutytable.setUser1(user.getName());
                dutytableMapper.updateByPrimaryKey(updatedutytable);
            }
        }
        result.setResultType("success");
        result.setMessage("????????????");
        return result;
    }

    /**
     * ?????????????????????????????????
     *
     * @param dutytable
     * @param type
     * @return
     */
    public ResultInfo<Dutytable> updateUsersTxbw(Dutytable dutytable, String type) {
        ResultInfo<Dutytable> result = new ResultInfo<Dutytable>();

        Date d1 = DateTimeUtils.getCurrentMonthFirstdayByDate(new Date());
        Date d2 = DateTimeUtils.str2Date(dutytable.getDatelong(), "yyyy-MM-dd");
        if (d2.getTime() < d1.getTime()) {//?????????????????????????????????????????????
            result.setResultType("fail");
            result.setMessage("????????????????????????????????????");
            return result;
        }

        //?????????????????????????????????
        List<Workday> list = workdayMapper.getWorkDayListBystartDate(dutytable.getDatelong());
        //?????????????????????Map
        List<Dutyuser> listDutyuser = null;
        if ("2".equals(type)) {
            listDutyuser = dutyuserMapper.getDutyusers("2");//??????
        }
        if ("3".equals(type)) {
            listDutyuser = dutyuserMapper.getDutyusers("3");//??????
        }

        Map<Object, Object> jbcmap = new HashMap<>();
        int index = 0;
        for (int i = 0; i < listDutyuser.size(); i++) {
            Dutyuser userMap = listDutyuser.get(i);
            jbcmap.put(i, userMap);
            String username = "";
            if ("2".equals(type)) {//??????
                username = dutytable.getUser2();
            }
            if ("3".equals(type)) {//??????
                username = dutytable.getUser3();
            }

            if (userMap.getName().equals(username)) {
                index = i;//?????????????????????????????????????????????
            }
        }

        for (int i = 0; i < list.size(); i++) {
            Dutyuser user = null;
            Workday workday = list.get(i);
            user = (Dutyuser) jbcmap.get(index);
            //??????????????????????????????
            if (StringUtils.isNotBlank(user.getStartdate()) && StringUtils.isNotBlank(user.getEnddate())) {//????????????
                if (DateTimeUtils.str2Date(user.getStartdate(), "yyyy-MM-dd").getTime() <= workday.getWorkdate().getTime()
                        &&
                        workday.getWorkdate().getTime() <= DateTimeUtils.str2Date(user.getEnddate(), "yyyy-MM-dd").getTime()) {
                    index++;
                    user = (Dutyuser) jbcmap.get(index);//?????????????????????????????????
                }
            }
            if (StringUtils.isNotBlank(user.getStartdate()) && StringUtils.isNotBlank(user.getEnddate())) {
                //??????2???
                if (DateTimeUtils.str2Date(user.getStartdate(), "yyyy-MM-dd").getTime() <= workday.getWorkdate().getTime()
                        &&
                        workday.getWorkdate().getTime() <= DateTimeUtils.str2Date(user.getEnddate(), "yyyy-MM-dd").getTime()) {
                    index++;
                    user = (Dutyuser) jbcmap.get(index);//?????????????????????????????????
                }
            }
            if (StringUtils.isNotBlank(user.getStartdate()) && StringUtils.isNotBlank(user.getEnddate())) {
                //??????3???
                if (DateTimeUtils.str2Date(user.getStartdate(), "yyyy-MM-dd").getTime() <= workday.getWorkdate().getTime()
                        &&
                        workday.getWorkdate().getTime() <= DateTimeUtils.str2Date(user.getEnddate(), "yyyy-MM-dd").getTime()) {
                    index++;
                    user = (Dutyuser) jbcmap.get(index);//?????????????????????????????????
                }
            }

            //??????
            if (index >= jbcmap.size() - 1) {
                index = 0;
            } else {
                index++;
            }
            Dutytable selectDutytable = new Dutytable();
            selectDutytable.setDatelong(DateTimeUtils.parseDate(workday.getWorkdate(), "yyyy-MM-dd"));
            List<Dutytable> list2 = dutytableMapper.select(selectDutytable);
            if (list2.size() > 0) {//??????
                Dutytable updatedutytable = list2.get(0);
                if ("0".equals(workday.getIswork())) {//??????
                    updatedutytable.setHoliday(1);//??????
                } else {
                    updatedutytable.setHoliday(0);//?????????
                }
                if ("3".equals(workday.getMustworkday())) {
                    updatedutytable.setHoliday(3);//?????????
                }
                if ("4".equals(workday.getMustworkday())) {
                    updatedutytable.setHoliday(4);//??????
                }
                //
                if ("2".equals(type)) {//??????
                    updatedutytable.setUser2(user.getName());
                }
                if ("3".equals(type)) {//??????
                    updatedutytable.setUser3(user.getName());
                }
                dutytableMapper.updateByPrimaryKey(updatedutytable);
            }
        }
        result.setResultType("success");
        result.setMessage("????????????");
        return result;
    }

    /**
     * ???????????????????????????
     *
     * @param dutytable
     * @return
     */
    public ResultInfo<Dutytable> deleteUser(Dutytable dutytable) {
        ResultInfo<Dutytable> result = new ResultInfo<Dutytable>();

        Date d1 = DateTimeUtils.getCurrentMonthFirstdayByDate(new Date());
        Date d2 = DateTimeUtils.str2Date(dutytable.getDatelong(), "yyyy-MM-dd");
        if (d2.getTime() < d1.getTime()) {//?????????????????????????????????????????????
            result.setResultType("fail");
            result.setMessage("????????????????????????????????????");
            return result;
        }

        //?????????????????????????????????
        List<Workday> list = workdayMapper.getWorkDayListBystartDate(dutytable.getDatelong());
        //?????????????????????Map
        List<Dutyuser> listDutyuser = dutyuserMapper.getDutyusers("1");//???????????????
        String type = "";
        if (StringUtils.isNotBlank(dutytable.getInitType())) {
            type = dutytable.getInitType();
        }
        if ("2".equals(type)) {//??????
            listDutyuser = dutyuserMapper.getDutyusers("2");
        }
        if ("3".equals(type)) {//??????
            listDutyuser = dutyuserMapper.getDutyusers("3");
        }

        Map<Object, Object> jbcmap = new HashMap<>();
        int index = 0;
        for (int i = 0; i < listDutyuser.size(); i++) {
            Dutyuser userMap = listDutyuser.get(i);
            jbcmap.put(i, userMap);
            String username = dutytable.getUser1();//???????????????
            if ("2".equals(type)) {//??????
                username = dutytable.getUser2();
            } else if ("3".equals(type)) {//??????
                username = dutytable.getUser3();
            }

            if (userMap.getName().equals(username)) {
                index = i + 1;//??????????????????????????????????????????????????????
            }
        }
        for (int i = 0; i < list.size(); i++) {
            Dutyuser user = null;
            Workday workday = list.get(i);
            user = (Dutyuser) jbcmap.get(index);
            //??????????????????????????????
            if (StringUtils.isNotBlank(user.getStartdate()) && StringUtils.isNotBlank(user.getEnddate())) {//????????????
                if (DateTimeUtils.str2Date(user.getStartdate(), "yyyy-MM-dd").getTime() <= workday.getWorkdate().getTime()
                        &&
                        workday.getWorkdate().getTime() <= DateTimeUtils.str2Date(user.getEnddate(), "yyyy-MM-dd").getTime()) {
                    index++;
                    user = (Dutyuser) jbcmap.get(index);//?????????????????????????????????
                    //??????????????????
                    if (index >= jbcmap.size() - 1) {
                        index = 0;
                    }
                }
            }
            if (StringUtils.isNotBlank(user.getStartdate()) && StringUtils.isNotBlank(user.getEnddate())) {
                //??????2???
                if (DateTimeUtils.str2Date(user.getStartdate(), "yyyy-MM-dd").getTime() <= workday.getWorkdate().getTime()
                        &&
                        workday.getWorkdate().getTime() <= DateTimeUtils.str2Date(user.getEnddate(), "yyyy-MM-dd").getTime()) {
                    index++;
                    user = (Dutyuser) jbcmap.get(index);//?????????????????????????????????
                    //??????????????????
                    if (index >= jbcmap.size() - 1) {
                        index = 0;
                    }
                }
            }
            if (StringUtils.isNotBlank(user.getStartdate()) && StringUtils.isNotBlank(user.getEnddate())) {
                //??????3???
                if (DateTimeUtils.str2Date(user.getStartdate(), "yyyy-MM-dd").getTime() <= workday.getWorkdate().getTime()
                        &&
                        workday.getWorkdate().getTime() <= DateTimeUtils.str2Date(user.getEnddate(), "yyyy-MM-dd").getTime()) {
                    index++;
                    user = (Dutyuser) jbcmap.get(index);//?????????????????????????????????
                    //??????????????????
                    if (index >= jbcmap.size() - 1) {
                        index = 0;
                    }
                }
            }

            //??????
            if (index >= jbcmap.size() - 1) {
                index = 0;
            } else {
                index++;
            }
            Dutytable selectDutytable = new Dutytable();
            selectDutytable.setDatelong(DateTimeUtils.parseDate(workday.getWorkdate(), "yyyy-MM-dd"));
            List<Dutytable> list2 = dutytableMapper.select(selectDutytable);
            if (list2.size() > 0) {//??????
                Dutytable updatedutytable = list2.get(0);
                if ("0".equals(workday.getIswork())) {//??????
                    updatedutytable.setHoliday(1);//??????
                } else {
                    updatedutytable.setHoliday(0);//?????????
                }
                if ("3".equals(workday.getMustworkday())) {
                    updatedutytable.setHoliday(3);//?????????
                }
                if ("4".equals(workday.getMustworkday())) {
                    updatedutytable.setHoliday(4);//??????
                }


                if ("2".equals(type)) {//??????
                    updatedutytable.setUser2(user.getName());
                } else if ("3".equals(type)) {//??????
                    updatedutytable.setUser3(user.getName());
                } else {
                    updatedutytable.setUser1(user.getName());
                }

                dutytableMapper.updateByPrimaryKey(updatedutytable);
            }
        }
        result.setResultType("success");
        result.setMessage("????????????");
        return result;
    }


    /**
     * ?????????????????????excel
     *
     * @param startdate
     * @param request
     * @param response
     */
    public void exportMonth(String startdate, HttpServletRequest request, HttpServletResponse response) {

        System.out.println(DateTimeUtils.str2Date(startdate, "yyyy-MM-dd"));
        Date currentMonthFirstday = DateTimeUtils.getCurrentMonthFirstdayByDate(DateTimeUtils.str2Date(startdate, "yyyy-MM-dd"));
        Date currentMonthLastday = DateTimeUtils.getCurrentMonthLastdayByDate(DateTimeUtils.str2Date(startdate, "yyyy-MM-dd"));

        HSSFWorkbook wb = null;
        POIFSFileSystem fs = null;

        List<Dutytable> dutylist = dutytableMapper.getDutytableByDate(DateTimeUtils.parseDate(currentMonthFirstday, "yyyy-MM-dd"), DateTimeUtils.parseDate(currentMonthLastday, "yyyy-MM-dd"));

        Map<Object, Object> rotaMap = new HashMap<>();
        //???map?????????
        for (int i = 0; i < dutylist.size(); i++) {
            Dutytable dutytable2 = dutylist.get(i);
            rotaMap.put(i, dutytable2);
        }
        //????????????2?????????
        int temp = rotaMap.size();
        if (temp == 28 || temp == 30) {
            temp /= 2;
        } else if (temp == 29) {
            temp = 15;
        } else if (temp == 31) {
            temp = rotaMap.size() - 15;
        }
        int rotasize = temp;

        //???????????????????????????
        List<Dutyshow> rotashowList = new ArrayList<Dutyshow>();
        for (int i = 0; i < rotasize; i++) {
            int cloum2 = i + rotasize;
            Dutyshow show = new Dutyshow();

            show.setRotadate1(((Dutytable) rotaMap.get(i))
                    .getDay() + "???");
            show.setRotaweek1(((Dutytable) rotaMap.get(i))
                    .getWeekName());
            show.setRotaname1(((Dutytable) rotaMap.get(i))
                    .getUser1());
            show.setRotatype1(((Dutytable) rotaMap.get(i))
                    .getHoliday() + "");
            if (cloum2 < rotaMap.size()) {
                show.setRotadate2(((Dutytable) rotaMap.get(cloum2))
                        .getDay() + "???");
                show.setRotaweek2(((Dutytable) rotaMap.get(cloum2))
                        .getWeekName());
                show.setRotaname2(((Dutytable) rotaMap.get(cloum2))
                        .getUser1());
                show.setRotatype2(((Dutytable) rotaMap.get(cloum2))
                        .getHoliday() + "");
            }

            rotashowList.add(show);
        }
        String realName = "????????????????????????.xls";
        realName = "?????????????????????????????????(" + startdate + ").xls";

        HSSFCell cell = null;
        HSSFRow row = null;
        HSSFSheet sheet = null;
        OutputStream ops = null;

        //????????????Excel
        try {
            String path = FileUtils.webResourceFilePath("classpath:static/dutyFiles/template");
            File file_path = new File(path);
            if (!file_path.exists())
                file_path.mkdirs();
            File file = new File(String.valueOf(path) + "/antoRota_statistics1.xls");
            if (!file.exists())
                file.createNewFile();
            fs = new POIFSFileSystem(new FileInputStream(file));
            wb = new HSSFWorkbook(fs);
            sheet = wb.getSheetAt(0);
            HSSFCellStyle setBorder = wb.createCellStyle();
            setBorder.setWrapText(true);
            HSSFCellStyle style1 = wb.createCellStyle();
            style1.setBorderBottom((short) 1);
            style1.setBorderLeft((short) 1);
            style1.setBorderRight((short) 1);
            style1.setBorderTop((short) 1);
            style1.setVerticalAlignment((short) 1);
            style1.setAlignment((short) 2);
            HSSFFont font = wb.createFont();
            font.setFontName("??????");
            font.setFontHeightInPoints((short) 18);
            style1.setFont(font);

            HSSFCellStyle styleIswork = wb.createCellStyle();
            styleIswork.setBorderBottom((short) 1);
            styleIswork.setBorderLeft((short) 1);
            styleIswork.setBorderRight((short) 1);
            styleIswork.setBorderTop((short) 1);
            styleIswork.setVerticalAlignment((short) 1);
            styleIswork.setAlignment((short) 2);
            HSSFFont font3 = wb.createFont();
            font3.setFontName("??????");
            font3.setFontHeightInPoints((short) 18);

            font3.setItalic(true);
            font3.setBoldweight((short) 700);
            font3.setColor((short) 10);
            styleIswork.setFont(font3);

            HSSFCellStyle styleIswork2 = wb.createCellStyle();
            styleIswork2.setBorderBottom((short) 1);
            styleIswork2.setBorderLeft((short) 1);
            styleIswork2.setBorderRight((short) 1);
            styleIswork2.setBorderTop((short) 1);
            styleIswork2.setVerticalAlignment((short) 1);
            styleIswork2.setAlignment((short) 2);
            HSSFFont font4 = wb.createFont();
            font4.setFontName("??????");
            font4.setFontHeightInPoints((short) 18);

            font4.setBoldweight((short) 700);
            styleIswork2.setFont(font4);

            row = sheet.createRow(0);

            HSSFCellStyle style2 = wb.createCellStyle();
            HSSFFont font2 = wb.createFont();
            style2.setVerticalAlignment((short) 1);
            style2.setAlignment((short) 2);
            font2.setFontName("??????");
            font2.setFontHeightInPoints((short) 28);
            font2.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);//????????????

            style2.setFont(font2);

            HSSFCell hreadcell = row.createCell(0);
            String[] s = startdate.split("-");
            hreadcell.setCellValue("???????????????" + s[0] + "???" + s[1] + "???????????????");
            hreadcell.setCellStyle(style2);

            //??????
            for (int i = 0; i < rotashowList.size(); i++) {
                row = sheet.createRow(i + 3);
                row.setHeight((short) 700);
                Dutyshow rota = rotashowList.get(i);
                System.out.println(rota.getRotadate1() + "\t" +
                        rota.getRotaweek1() + "\t" + rota.getRotaname1() +
                        "\t" + rota.getRotatype1() + "\t" +
                        rota.getRotadate2() + "\t" + rota.getRotaweek2() +
                        "\t" + rota.getRotaname2() + "\t" +
                        rota.getRotatype2());
                HSSFCell cell0 = row.createCell(0);
                HSSFCell cell1 = row.createCell(1);
                HSSFCell cell2 = row.createCell(2);

                if ("0".equals(rota.getRotatype1())) {
                    cell0.setCellStyle(style1);
                    cell1.setCellStyle(style1);
                    cell2.setCellStyle(style1);
                } else {
                    cell0.setCellStyle(styleIswork2);
                    cell1.setCellStyle(styleIswork);
                    cell2.setCellStyle(styleIswork2);
                }
                cell0.setCellValue(rota.getRotadate1());
                cell1.setCellValue(rota.getRotaweek1());
                cell2.setCellValue(rota.getRotaname1());

                if (rota.getRotadate2() != null &&
                        rota.getRotaweek2() != null &&
                        rota.getRotaname2() != null) {

                    HSSFCell cell3 = row.createCell(3);
                    HSSFCell cell4 = row.createCell(4);
                    HSSFCell cell5 = row.createCell(5);

                    if ("0".equals(rota.getRotatype2())) {
                        cell3.setCellStyle(style1);
                        cell4.setCellStyle(style1);
                        cell5.setCellStyle(style1);
                    } else {
                        cell3.setCellStyle(styleIswork2);
                        cell4.setCellStyle(styleIswork);
                        cell5.setCellStyle(styleIswork2);
                    }
                    cell3.setCellValue(rota.getRotadate2());
                    cell4.setCellValue(rota.getRotaweek2());
                    cell5.setCellValue(rota.getRotaname2());
                } else {
                    HSSFCell cell3 = row.createCell(3);
                    cell3.setCellStyle(style1);
                    cell3.setCellValue("");

                    HSSFCell cell4 = row.createCell(4);
                    cell4.setCellValue("");
                    cell4.setCellStyle(style1);

                    HSSFCell cell5 = row.createCell(5);
                    cell5.setCellValue("");
                    cell5.setCellStyle(style1);
                }
            }
            response.setContentType("application/vnd.ms-excel");
            request.setCharacterEncoding("UTF-8");
            String browser = BrowserUtils.checkBrowser(request
                    .getHeader("user-agent"));
            BrowserUtils.setExport(browser, realName, response);
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
     * ???????????????????????????excel
     *
     * @param startdate
     * @param request
     * @param response
     */
    public void exportMonthTxbw(String startdate, HttpServletRequest request, HttpServletResponse response) {

        System.out.println(DateTimeUtils.str2Date(startdate, "yyyy-MM-dd"));
        Date currentMonthFirstday = DateTimeUtils.getCurrentMonthFirstdayByDate(DateTimeUtils.str2Date(startdate, "yyyy-MM-dd"));
        Date currentMonthLastday = DateTimeUtils.getCurrentMonthLastdayByDate(DateTimeUtils.str2Date(startdate, "yyyy-MM-dd"));

        HSSFWorkbook wb = null;
        POIFSFileSystem fs = null;

        List<Dutytable> dutylist = dutytableMapper.getDutytableByDate(DateTimeUtils.parseDate(currentMonthFirstday, "yyyy-MM-dd"), DateTimeUtils.parseDate(currentMonthLastday, "yyyy-MM-dd"));

        Map<Object, Object> rotaMap = new HashMap<>();
        //???map?????????
        for (int i = 0; i < dutylist.size(); i++) {
            Dutytable dutytable2 = dutylist.get(i);
            rotaMap.put(i, dutytable2);
        }
        //????????????2?????????
        int temp = rotaMap.size();
        if (temp == 28 || temp == 30) {
            temp /= 2;
        } else if (temp == 29) {
            temp = 15;
        } else if (temp == 31) {
            temp = rotaMap.size() - 15;
        }
        int rotasize = temp;

        //???????????????????????????
        List<Dutyshow> rotashowList = new ArrayList<Dutyshow>();
        for (int i = 0; i < rotasize; i++) {
            int cloum2 = i + rotasize;
            Dutyshow show = new Dutyshow();

            show.setRotadate1(((Dutytable) rotaMap.get(i))
                    .getDay() + "???");
            show.setRotaweek1(((Dutytable) rotaMap.get(i))
                    .getWeekName());
            show.setRotaname1(((Dutytable) rotaMap.get(i))
                    .getUser2());
            show.setRotabwname1(((Dutytable) rotaMap.get(i))
                    .getUser3());
            show.setRotatype1(((Dutytable) rotaMap.get(i))
                    .getHoliday() + "");
            if (cloum2 < rotaMap.size()) {
                show.setRotadate2(((Dutytable) rotaMap.get(cloum2))
                        .getDay() + "???");
                show.setRotaweek2(((Dutytable) rotaMap.get(cloum2))
                        .getWeekName());
                show.setRotaname2(((Dutytable) rotaMap.get(cloum2))
                        .getUser2());
                show.setRotabwname2(((Dutytable) rotaMap.get(cloum2))
                        .getUser3());
                show.setRotatype2(((Dutytable) rotaMap.get(cloum2))
                        .getHoliday() + "");
            }

            rotashowList.add(show);
        }
        String realName = "????????????????????????.xls";
        realName = "?????????????????????????????????(" + startdate + ").xls";

        HSSFCell cell = null;
        HSSFRow row = null;
        HSSFSheet sheet = null;
        OutputStream ops = null;

        //????????????Excel
        try {
            String path = FileUtils.webResourceFilePath("classpath:static/dutyFiles/template");
            File file_path = new File(path);
            if (!file_path.exists())
                file_path.mkdirs();
            File file = new File(String.valueOf(path) + "/antoRota_statistics2.xls");
            if (!file.exists())
                file.createNewFile();
            fs = new POIFSFileSystem(new FileInputStream(file));
            wb = new HSSFWorkbook(fs);
            sheet = wb.getSheetAt(0);
            HSSFCellStyle setBorder = wb.createCellStyle();
            setBorder.setWrapText(true);
            HSSFCellStyle style1 = wb.createCellStyle();
            style1.setBorderBottom((short) 1);
            style1.setBorderLeft((short) 1);
            style1.setBorderRight((short) 1);
            style1.setBorderTop((short) 1);
            style1.setVerticalAlignment((short) 1);
            style1.setAlignment((short) 2);
            HSSFFont font = wb.createFont();
            font.setFontName("??????");
            font.setFontHeightInPoints((short) 18);
            style1.setFont(font);

            HSSFCellStyle styleIswork = wb.createCellStyle();
            styleIswork.setBorderBottom((short) 1);
            styleIswork.setBorderLeft((short) 1);
            styleIswork.setBorderRight((short) 1);
            styleIswork.setBorderTop((short) 1);
            styleIswork.setVerticalAlignment((short) 1);
            styleIswork.setAlignment((short) 2);
            HSSFFont font3 = wb.createFont();
            font3.setFontName("??????");
            font3.setFontHeightInPoints((short) 18);

            font3.setItalic(true);
            font3.setBoldweight((short) 700);
            font3.setColor((short) 10);
            styleIswork.setFont(font3);

            HSSFCellStyle styleIswork2 = wb.createCellStyle();
            styleIswork2.setBorderBottom((short) 1);
            styleIswork2.setBorderLeft((short) 1);
            styleIswork2.setBorderRight((short) 1);
            styleIswork2.setBorderTop((short) 1);
            styleIswork2.setVerticalAlignment((short) 1);
            styleIswork2.setAlignment((short) 2);
            HSSFFont font4 = wb.createFont();
            font4.setFontName("??????");
            font4.setFontHeightInPoints((short) 18);

            font4.setBoldweight((short) 700);
            styleIswork2.setFont(font4);

            row = sheet.createRow(0);

            HSSFCellStyle style2 = wb.createCellStyle();
            HSSFFont font2 = wb.createFont();
            style2.setVerticalAlignment((short) 1);
            style2.setAlignment((short) 2);
            font2.setFontName("??????");
            font2.setFontHeightInPoints((short) 28);
            font2.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);//????????????

            style2.setFont(font2);

            HSSFCell hreadcell = row.createCell(0);
            String[] s = startdate.split("-");
            hreadcell.setCellValue("???????????????" + s[0] + "???" + s[1] + "???????????????");
            hreadcell.setCellStyle(style2);

            //??????
            for (int i = 0; i < rotashowList.size(); i++) {
                row = sheet.createRow(i + 3);
                row.setHeight((short) 700);
                Dutyshow rota = rotashowList.get(i);
                System.out.println(rota.getRotadate1() + "\t" +
                        rota.getRotaweek1() + "\t" + rota.getRotaname1() + rota.getRotabwname1() +
                        "\t" + rota.getRotatype1() + "\t" +
                        rota.getRotadate2() + "\t" + rota.getRotaweek2() +
                        "\t" + rota.getRotaname2() + "\t" + rota.getRotabwname2() +
                        rota.getRotatype2());
                HSSFCell cell0 = row.createCell(0);
                HSSFCell cell1 = row.createCell(1);
                HSSFCell cell2 = row.createCell(2);
                HSSFCell cell3 = row.createCell(3);
                if ("0".equals(rota.getRotatype1())) {
                    cell0.setCellStyle(style1);
                    cell1.setCellStyle(style1);
                    cell2.setCellStyle(style1);
                    cell3.setCellStyle(style1);
                } else {
                    cell0.setCellStyle(styleIswork2);
                    cell1.setCellStyle(styleIswork);
                    cell2.setCellStyle(styleIswork2);
                    cell3.setCellStyle(styleIswork2);
                }
                cell0.setCellValue(rota.getRotadate1());
                cell1.setCellValue(rota.getRotaweek1());
                cell2.setCellValue(rota.getRotaname1());
                cell3.setCellValue(rota.getRotabwname1());
                if (rota.getRotadate2() != null &&
                        rota.getRotaweek2() != null && rota.getRotaname2() != null &&
                        rota.getRotabwname2() != null) {

                    HSSFCell cell4 = row.createCell(4);
                    HSSFCell cell5 = row.createCell(5);
                    HSSFCell cell6 = row.createCell(6);
                    HSSFCell cell7 = row.createCell(7);

                    if ("0".equals(rota.getRotatype2())) {
                        cell4.setCellStyle(style1);
                        cell5.setCellStyle(style1);
                        cell6.setCellStyle(style1);
                        cell7.setCellStyle(style1);
                    } else {
                        cell4.setCellStyle(styleIswork2);
                        cell5.setCellStyle(styleIswork);
                        cell6.setCellStyle(styleIswork2);
                        cell7.setCellStyle(styleIswork2);
                    }
                    cell4.setCellValue(rota.getRotadate2());
                    cell5.setCellValue(rota.getRotaweek2());
                    cell6.setCellValue(rota.getRotaname2());
                    cell7.setCellValue(rota.getRotabwname2());
                } else {
                    HSSFCell cell4 = row.createCell(4);
                    cell4.setCellStyle(style1);
                    cell4.setCellValue("");

                    HSSFCell cell5 = row.createCell(5);
                    cell5.setCellValue("");
                    cell5.setCellStyle(style1);

                    HSSFCell cell6 = row.createCell(6);
                    cell6.setCellValue("");
                    cell6.setCellStyle(style1);

                    HSSFCell cell7 = row.createCell(7);
                    cell7.setCellValue("");
                    cell7.setCellStyle(style1);
                }
            }
            response.setContentType("application/vnd.ms-excel");
            request.setCharacterEncoding("UTF-8");
            String browser = BrowserUtils.checkBrowser(request
                    .getHeader("user-agent"));
            BrowserUtils.setExport(browser, realName, response);
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

    public void setHoliday(List<Dutytable> plist, Dutytable dutytable) {
        /*???????????????*/
        Dutydate dutydate = new Dutydate();
        dutydate.setYear(dutytable.getYear());
        Dutydate dutydate1 = dutydateMapper.selectOne(dutydate);
        for (Dutytable dtable : plist) {
            /*????????????????????????1.??????????????????2???????????????????????????????????????*/
            if (StringUtils.isNotBlank(dutydate1.getHoliday()) && dutydate1.getHoliday().contains(dtable.getDatelong())) {
                dtable.setHoliday(1);
            } else if (StringUtils.isBlank(dutydate1.getHoliday()) && (dtable.getWeek() == 6 || dtable.getWeek() == 7)) {
                dtable.setHoliday(1);
            } else if (StringUtils.isNotBlank(dutydate1.getHoliday()) && (dtable.getWeek() == 6 || dtable.getWeek() == 7) && !dutydate1.getWorkday().contains(dtable.getDatelong())) {
                dtable.setHoliday(1);
            } else {
                dtable.setHoliday(0);
            }
        }
    }
}
