package com.gwideal.core.cms.l2.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.gwideal.core.date.l3.dao.ComonDateMapper;
import com.gwideal.core.date.l4.entity.ComonDate;
import com.gwideal.core.util.DateTimeUtils;
import lombok.Data;
import lombok.Getter;
import org.hothub.calendarist.Calendarist;
import org.hothub.calendarist.pojo.LunarDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gwideal.core.cms.l4.entity.*;
import com.gwideal.core.cms.l3.dao.*;
import com.gwideal.mybatis.metautils.*;
import com.gwideal.mybatis.metautils.ResultInfo;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.github.pagehelper.PageInfo;
import per.eter.utils.datetime.SolarTermsUtil;

import java.math.BigDecimal;

@Service
@Transactional
public class UserViewSkinService {
    @Autowired
    private ComonDateMapper comonDateMapper;
    @Autowired
    private UserViewSkinMapper userViewSkinMapper;


    public int create(UserViewSkin userViewSkin) {
        return userViewSkinMapper.insert(userViewSkin);
    }

    public UserViewSkin read(BigDecimal id) {
        return userViewSkinMapper.selectByPrimaryKey(id);
    }

    public int update(UserViewSkin userViewSkin) {
        return userViewSkinMapper.updateByPrimaryKey(userViewSkin);
    }

    public int delete(BigDecimal id) {
        return userViewSkinMapper.deleteByPrimaryKey(id);
    }

    public Skin[] getSkins() {
        return Skin.values();
    }

    public ResultInfo<UserViewSkin> list(UserViewSkin queryBean) {
        ResultInfo<UserViewSkin> result = new ResultInfo<UserViewSkin>();
        if (queryBean.getPaging().equals("Yes")) {
            PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
            List<UserViewSkin> plist = userViewSkinMapper.list(queryBean);
            PageInfo<UserViewSkin> pageInfo = new PageInfo<UserViewSkin>(plist);
            result.setTotalRows(pageInfo.getTotal());
            result.setBeanList(pageInfo.getList());
            result.setResultType("success");
            return result;
        } else {
            List<UserViewSkin> plist = userViewSkinMapper.list(queryBean);
            result.setTotalRows((long) plist.size());
            result.setBeanList(plist);
            result.setResultType("success");
            return result;
        }
    }


    public void init(int year) {
        int nextYear = year + 1;
        String firstDay = "" + year + "-01-01 00:00:00";
        String lastDay = "" + nextYear + "-01-01 00:00:00";

        DateTimeFormatter dateFmt = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime startDay = LocalDateTime.parse(firstDay, dateFmt);
        LocalDateTime endDay = LocalDateTime.parse(lastDay, dateFmt);

        UserViewSkin deleteBean = new UserViewSkin();
        deleteBean.setStartDay(DateTimeUtils.ldt2Date(startDay));
        deleteBean.setEndDay(DateTimeUtils.ldt2Date(endDay));
        userViewSkinMapper.deleteByDayScope(deleteBean);

        while (startDay.isBefore(endDay)) {
            try {
                UserViewSkin userViewSkinInsert = new UserViewSkin();
                Date date = DateTimeUtils.ldt2Date(startDay);
                userViewSkinInsert.setDay(date);
                userViewSkinInsert.setSkin(getSkin(date));

                userViewSkinMapper.insert(userViewSkinInsert);
                startDay = startDay.plusDays(1);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

    }


    public static Map<String, Skin> solarSkin = new HashMap<String, Skin>() {
        {
            put("1-1", Skin.YUAN_DAN);
            put("5-1", Skin.LAO_DONG);
            put("10-1", Skin.GUO_QING);
        }
    };
    public static Map<String, Skin> lunarSkin = new HashMap<String, Skin>() {
        {
            put("12-29", Skin.CHU_XI);/*月小２９*/
            put("1-12-30", Skin.CHU_XI);/*月大３０*/
            put("-1-1", Skin.CHUN_JIE);
            put("1-1-1", Skin.CHUN_JIE);
            put("-5-5", Skin.DUAN_WU);
            put("1-5-5", Skin.DUAN_WU);
            put("-8-15", Skin.ZHONG_QIU);
            put("1-8-15", Skin.ZHONG_QIU);
        }
    };
    public static Map<String, Skin> termSkin = new HashMap<String, Skin>() {
        {
            put("清明", Skin.QING_MING);
        }
    };
    public static Map<String, Skin> seasonsSkin = new HashMap<String, Skin>() {
        {
            put("春", Skin.CHUN_TIAN);
            put("夏", Skin.XIA_TIAN);
            put("秋", Skin.QIU_TIAN);
            put("冬", Skin.DONG_TIAN);
        }
    };

    private String getSkin(Date date) {
        ComonDate comonDateQuery = new ComonDate();
        comonDateQuery.setODate(date);
        ComonDate comonDate = comonDateMapper.list(comonDateQuery).get(0);
        Skin skin = null;
        String key = "";

        BigDecimal month = comonDate.getMonth();
        BigDecimal day = comonDate.getDay();
        key = "" + month + "-" + day;
        skin = solarSkin.get(key);

        if (null == skin) {
            BigDecimal isBigMonth = comonDate.getIsBigMonth();
            BigDecimal lunarMonth = comonDate.getLunarMonth();
            BigDecimal lunarDate = comonDate.getLunarDate();
            if (null != isBigMonth) {
                key = isBigMonth + "-" + lunarMonth + "-" + lunarDate;
            } else {
                key = "-" + lunarMonth + "-" + lunarDate;
            }
            skin = lunarSkin.get(key);
        }

        if (null == skin) {
            String term = comonDate.getTerm();
            skin = termSkin.get(term);
        }

        if (null == skin) {
            String seasons = comonDate.getSeasons();
            skin = seasonsSkin.get(seasons);
        }

        return skin.getSkinName();
    }

    public List<UserViewSkin> query(int year) {
        int nextYear = year + 1;
        String firstDay = "" + year + "-01-01 00:00:00";
        String lastDay = "" + nextYear + "-01-01 00:00:00";

        DateTimeFormatter dateFmt = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime startDay = LocalDateTime.parse(firstDay, dateFmt);
        LocalDateTime endDay = LocalDateTime.parse(lastDay, dateFmt);

        UserViewSkin queryBean = new UserViewSkin();
        queryBean.setStartDay(DateTimeUtils.ldt2Date(startDay));
        queryBean.setEndDay(DateTimeUtils.ldt2Date(endDay));
        List<UserViewSkin> plist = userViewSkinMapper.list(queryBean);
        return plist;

    }
}




