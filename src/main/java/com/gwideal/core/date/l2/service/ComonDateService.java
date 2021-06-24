package com.gwideal.core.date.l2.service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.gwideal.core.basic.l4.entity.DicType;
import com.gwideal.core.cms.l4.entity.AttendanceT;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gwideal.core.date.l4.entity.*;
import com.gwideal.core.date.l3.dao.*;
import com.gwideal.mybatis.metautils.*;
import com.gwideal.mybatis.metautils.ResultInfo;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.github.pagehelper.PageInfo;
import per.eter.utils.datetime.DateTimeUtils;

import java.math.BigDecimal;
import java.util.stream.Collectors;

@Service
@Transactional
public class ComonDateService {

    @Autowired
    private ComonDateMapper comonDateMapper;


    public int create(ComonDate comonDate) {
        return comonDateMapper.insert(comonDate);
    }

    public ComonDate read(BigDecimal id) {
        return comonDateMapper.selectByPrimaryKey(id);
    }

    public int update(ComonDate comonDate) {
        return comonDateMapper.updateByPrimaryKey(comonDate);
    }

    public int delete(BigDecimal id) {
        return comonDateMapper.deleteByPrimaryKey(id);
    }


    public ResultInfo<ComonDate> list(ComonDate queryBean) {
        ResultInfo<ComonDate> result = new ResultInfo<ComonDate>();
        if (queryBean.getPaging().equals("Yes")) {
            PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
            List<ComonDate> plist = comonDateMapper.list(queryBean);
            PageInfo<ComonDate> pageInfo = new PageInfo<ComonDate>(plist);
            result.setTotalRows(pageInfo.getTotal());
            result.setBeanList(pageInfo.getList());
            result.setResultType("success");
            return result;
        } else {
            List<ComonDate> plist = comonDateMapper.list(queryBean);
            result.setTotalRows((long) plist.size());
            result.setBeanList(plist);
            result.setResultType("success");
            return result;
        }
    }

    public void rsync(String quey) {
        String query = "2050年12月";
        BufferedReader reader = null;
        String result = null;
        //int yearBegin = 2021;
        //int yearEnd = 2021;
        int yearBegin = 1900;
        int yearEnd = 2050;
        int month = 1;

        try {

            ComonDate existDateQuery = new ComonDate();
            for (int y = yearBegin; y <= yearEnd; y++) {
                for (month = 1; month <= 12; month++) {
                    String seasons = "";
                    switch (month) {
                        case 3:
                        case 4:
                        case 5:
                            seasons = "春";
                            break;
                        case 6:
                        case 7:
                        case 8:
                            seasons = "夏";
                            break;
                        case 9:
                        case 10:
                        case 11:
                            seasons = "秋";
                            break;
                        case 12:
                        case 1:
                        case 2:
                            seasons = "冬";
                            break;

                    }
                    query = y + "年" + month + "月";
                    String httpUrl = "https://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php?query=" + query + "&co=&resource_id=39043&t=1612492672210&ie=utf8&oe=gbk&cb=op_aladdin_callback,jQuery110202589086671148326_1612405512200&format=json&tn=wisetpl&_=1612405512730";
                    URL url = new URL(httpUrl);
                    HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                    connection.setRequestMethod("GET");
                    connection.connect();
                    InputStream is = connection.getInputStream();
                    reader = new BufferedReader(new InputStreamReader(is, "GBK"));
                    String strRead = null;
                    StringBuffer sbf = new StringBuffer();
                    while ((strRead = reader.readLine()) != null) {
                        sbf.append(strRead);
                        //sbf.append("\r\n");
                    }
                    reader.close();
                    result = sbf.toString();
                    int i1 = result.indexOf("\"almanac\":[");
                    int i2 = result.lastIndexOf("\"almanac#num#baidu\"");
                    result = result.substring(i1 + 1, i2);
                    i1 = result.indexOf("[") - 1;
                    i2 = result.lastIndexOf("]") + 1;
                    result = result.substring(i1 + 1, i2);
                    List<ComonDate> comonDates = JSON.parseObject(result, new TypeReference<List<ComonDate>>() {
                    });
                    int finalMonth = month;
                    List<ComonDate> collect = comonDates.stream().filter(s -> s.getMonth().intValue() == finalMonth).collect(Collectors.toList());
                    for (ComonDate date : collect) {
                        existDateQuery.setYear(date.getYear());
                        existDateQuery.setMonth(date.getMonth());
                        existDateQuery.setDay(date.getDay());
                        List<ComonDate> list = comonDateMapper.list(existDateQuery);
                        if (!CollectionUtils.isNotEmpty(list)) {
                            date.setDescription(date.getDesc());
                            date.setSeasons(seasons);
                            comonDateMapper.insert(date);
                            System.out.println("y:" + y + " m:" + date.getMonth() + "  d:" + date.getDay());
                        }
                    }
                }
            }


        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public ComonDate today() {
        String s = DateTimeUtils.DATE.formatNow();
        Date parse = DateTimeUtils.DATE_TIME.parse(s+" 00:00:00");
        ComonDate comonDate = new ComonDate();
        comonDate.setODate(parse);
        return comonDateMapper.list(comonDate).get(0);
    }
}
