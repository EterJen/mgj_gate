
package com.gwideal.core.cms.l1.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gwideal.core.cms.l2.service.ArticleService;
import com.gwideal.core.cms.l4.entity.Article;
import com.gwideal.core.date.l4.entity.ComonDate;
import com.gwideal.core.jwt.JwtUser;
import com.gwideal.core.util.DateTimeUtils;
import com.gwideal.mybatis.metautils.ResultInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.groups.Default;
import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/article")
public class ArticleController {

    @Autowired
    ArticleService articleService;

    @RequestMapping(value = "/attfile/**")
    public void attfile(HttpServletRequest request, HttpServletResponse response) throws Exception {
        articleService.attfile(request, response);
    }

    @RequestMapping("/init")
    public ResultInfo<Article> init(String initType) {
        ResultInfo<Article> result = new ResultInfo<Article>();
        UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        JwtUser currentUser = (JwtUser) token.getPrincipal();
        Article initBean = null;
        if (initType.equals("create")) {
            initBean = new Article();
        } else if (initType.equals("query")) {
            initBean = new Article();
        }
        result.setBean(initBean);
        return result;
    }

    @RequestMapping(value = "/dsr")
    public ResultInfo<Article> ddl(@RequestBody @Validated(value = {Default.class}) Article coreUser) {
        ResultInfo<Article> result = new ResultInfo<Article>();
        try {
            articleService.ddl(coreUser);
            result.setResultType("success");
            result.setMessage("执行成功");
        } catch (Exception e) {
            result.setResultType("fail");
            e.printStackTrace();
            result.setMessage(e.getMessage());
        }
        return result;
    }


    @RequestMapping("/create")
    public ResultInfo<Article> create(@RequestBody @Validated(value = {Default.class}) Article article, BindingResult bindingResult) {
        UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        JwtUser currentUser = (JwtUser) token.getPrincipal();
        ResultInfo<Article> result = new ResultInfo<Article>();
        if (bindingResult.hasErrors()) {
            result.setResultType("validationError");
            for (FieldError fe : bindingResult.getFieldErrors()) {
                result.getErrors().put(fe.getField(), fe.getDefaultMessage());
            }
            return result;
        }
        //article.setCurrCoreUser(currentUser.getCoreUser());
        article.setCurrentUser(currentUser);
        if (articleService.create(article) > 0) {
            result.setResultType("success");
            result.setBean(article);
            result.setBeanId(article.getId());
            result.setMessage("创建成功");
        } else {
            result.setResultType("fail");
            result.setMessage("创建失败");
        }
        return result;
    }

    @RequestMapping(value = {"/read/{id}", "/trustedRequest/read/{id}"})
    public ResultInfo<Article> read(@PathVariable(name = "id") BigDecimal id) {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        ResultInfo<Article> result = new ResultInfo<Article>();
        Article bean = articleService.read(id);
        if (bean == null) {
            result.setResultType("fail");
            result.setMessage("读取的数据不存在");
        } else {
            result.setResultType("success");
            result.setMessage("读取成功");
            result.setBean(bean);
        }
        return result;
    }

    @RequestMapping(value = "/update")
    public ResultInfo<Article> update(@RequestBody @Validated(value = {Default.class}) Article article, BindingResult bindingResult) {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        ResultInfo<Article> result = new ResultInfo<Article>();
        if (bindingResult.hasErrors()) {
            result.setResultType("validationError");
            for (FieldError fe : bindingResult.getFieldErrors()) {
                result.getErrors().put(fe.getField(), fe.getDefaultMessage());
            }
            return result;
        }
        if (articleService.update(article) > 0) {
            result.setBean(article);
            result.setResultType("success");
            result.setMessage("更新成功");
        } else {
            result.setResultType("fail");
            result.setMessage("更新失败");
        }
        return result;
    }

    @RequestMapping(value = "/delete/{id}")
    public ResultInfo<Article> delete(@PathVariable(name = "id") BigDecimal id) {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        ResultInfo<Article> result = new ResultInfo<Article>();
        if (articleService.delete(id) > 0) {
            result.setResultType("success");
            result.setMessage("删除成功");
        } else {
            result.setResultType("fail");
            result.setMessage("删除失败");
        }
        return result;
    }

    @RequestMapping(value = {"/trustedRequest/list", "/list"})
    public ResultInfo<Article> list(@RequestBody Article article) {
        return articleService.list(article);
    }

    @RequestMapping(value = "/deleteIds")
    public ResultInfo<Article> deleteIds(@RequestBody Article article) {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) currentUser;
        JwtUser currentUser1 = (JwtUser) token.getPrincipal();
        article.setCurrentUser(currentUser1);
        return articleService.deleteIds(article);
    }

    @RequestMapping(value = {"/queryBeanList", "/trustedRequest/queryBeanList"})
    public ResultInfo<Article> queryBeanList(@RequestBody Article article) {
//		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
//		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)currentUser;
//		JwtUser currentUser1 =(JwtUser)token.getPrincipal();
//		article.setCurrentUser(currentUser1);
        return articleService.queryBeanList(article);
    }

    @RequestMapping(value = "/saveOrupdateArticle")
    public ResultInfo<Article> saveOrupdateArticle(@RequestParam(value = "file", required = false) MultipartFile file, @RequestParam(value = "selectedBean", required = false) String selectedBean) {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) currentUser;
        JwtUser currentUser1 = (JwtUser) token.getPrincipal();
        ObjectMapper mapper = new ObjectMapper();
        Article article = null;
        try {
            article = mapper.readValue(selectedBean, Article.class);
        } catch (IOException e) {
            e.printStackTrace();
        }
        article.setCurrentUser(currentUser1);
        return articleService.saveOrupdateArticle(article, file);
    }


}
