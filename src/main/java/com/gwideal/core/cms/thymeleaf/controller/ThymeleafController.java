package com.gwideal.core.cms.thymeleaf.controller;

import com.gwideal.core.cms.l2.service.UserViewSkinService;
import com.gwideal.core.cms.l3.dao.UserViewSkinMapper;
import com.gwideal.core.cms.l4.entity.UserViewSkin;
import com.gwideal.core.cms.thymeleaf.entity.MgjmhApp;
import com.gwideal.core.date.l2.service.ComonDateService;
import com.gwideal.core.date.l4.entity.ComonDate;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@Slf4j
@Controller
public class ThymeleafController {
    @Autowired
    ComonDateService comonDateService;
    @Autowired
    UserViewSkinMapper userViewSkinMapper;
    @Autowired
    private MgjmhApp mgjmhApp;


    @RequestMapping("/apps/user-view/index")
    public String userViewIndex(Model model, HttpServletRequest request) {
     /*   Enumeration<String> headerNames = request.getHeaderNames();
        String scheme = request.getScheme();
        System.out.println(scheme);
        System.out.println("打印请求头开始-----------");
        while (headerNames.hasMoreElements()) {

            String s = headerNames.nextElement();
            System.out.println(s + " : " + request.getHeader(s));
        }
        System.out.println("打印请求头结束-----------");*/

        try {
            ComonDate today = comonDateService.today();
            Date oDate = today.getODate();
            UserViewSkin userViewSkin = new UserViewSkin();
            userViewSkin.setDay(oDate);
            UserViewSkin userViewSkin1 = userViewSkinMapper.list(userViewSkin).get(0);
            model.addAttribute("userViewSkin", "" + userViewSkin1.getSkin());
        } catch (Exception e) {
            log.error("前台皮肤未设置");
            //e.printStackTrace();
        }
        model.addAttribute("appVersion", "" + mgjmhApp.getVersion());
        model.addAttribute("reqHost", "" + request.getHeader("host"));
        model.addAttribute("scheme", "" + request.getScheme());
        return "/apps/user-view/index";
    }

    @RequestMapping("/index")
    public String mngIndex(Model model, HttpServletRequest request) {
        model.addAttribute("appVersion", "" + mgjmhApp.getVersion());
        model.addAttribute("reqHost", "" + request.getHeader("host"));
        model.addAttribute("scheme", "" + request.getScheme());
        return "index";
    }

}
