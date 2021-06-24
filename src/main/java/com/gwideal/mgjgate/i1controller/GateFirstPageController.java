package com.gwideal.mgjgate.i1controller;

import com.gwideal.core.jwt.JwtUser;
import com.gwideal.mgjgate.i2service.GateFirstPageService;
import com.gwideal.mgjgate.i3pojo.GateFirstPagePojo;
import com.gwideal.mybatis.metautils.ResultInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import per.eter.utils.datetime.SimpleDay;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/trustedRequest/gateFirstPage")
public class GateFirstPageController {

    @Autowired
    private GateFirstPageService gateFirstPageService;
    @RequestMapping("/init")
    public ResultInfo<GateFirstPagePojo> init(){
        return gateFirstPageService.init();
    }

    @RequestMapping("/categoryStrTreeMap")
    public ResultInfo<Map> categoryStrTreeMap(){
        return gateFirstPageService.categoryStrTreeMap();
    }
    @RequestMapping("/currentDay")
    public ResultInfo<SimpleDay> currentDay(){
        ResultInfo<SimpleDay> result = new ResultInfo<>();
        SimpleDay bean = new SimpleDay(LocalDateTime.now());
        result.setResultType("success");
        result.setMessage("读取成功");
        result.setBean(bean);
        return result;
    }
}
