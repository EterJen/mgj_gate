package com.gwideal.mgjgate.i2service;


import com.gwideal.core.cms.l2.service.ArticleService;
import com.gwideal.core.cms.l2.service.TwolevelcolumnService;
import com.gwideal.core.cms.l3.dao.ArticleMapper;
import com.gwideal.core.cms.l3.dao.BayWindowMapper;
import com.gwideal.core.cms.l3.dao.ContactInformationMapper;
import com.gwideal.core.cms.l3.dao.FriendlyLinkMapper;
import com.gwideal.core.cms.l4.entity.*;
import com.gwideal.mgjgate.i3pojo.GateFirstPagePojo;
import com.gwideal.mybatis.metautils.ResultInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Service;
import per.eter.utils.datetime.DateTimeUtils;
import per.eter.utils.datetime.SimpleDay;
import per.eter.utils.http.RequestTemplate;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class GateFirstPageService {
    @Autowired
    TwolevelcolumnService twolevelcolumnService;
    @Autowired
    private ArticleService articleService;
    @Autowired
    private FriendlyLinkMapper friendlyLinkMapper;
    @Autowired
    private ContactInformationMapper contactInformationMapper;
    @Autowired
    private BayWindowMapper bayWindowMapper;

    public ResultInfo<GateFirstPagePojo> init() {
        ResultInfo<GateFirstPagePojo> result = new ResultInfo<>();
        GateFirstPagePojo bean = new GateFirstPagePojo();
        ContactInformation contactInformation = contactInformationMapper.selectByPrimaryKey(BigDecimal.ONE);
        bean.setContactInformation(contactInformation);


        BayWindow bayWindow = bayWindowMapper.selectByPrimaryKey(BigDecimal.ONE);
        bean.setBayWindow(bayWindow);

        Article articleQueryBean = new Article();
        articleQueryBean.setIfDelete(BigDecimal.ZERO);

        articleQueryBean.setIfImageNews(BigDecimal.ONE);
        articleQueryBean.setPaging("Yes");
        articleQueryBean.setPageNo(1);
        articleQueryBean.setPageSize(5);
        bean.setTpxwArticles(articleService.list(articleQueryBean).getBeanList());
        articleQueryBean.setIfImageNews(null);

        articleQueryBean.setIfVideoNews(BigDecimal.ONE);
        articleQueryBean.setPaging("Yes");
        articleQueryBean.setPageNo(1);
        articleQueryBean.setPageSize(5);
        bean.setSpxwArticles(articleService.list(articleQueryBean).getBeanList());
        articleQueryBean.setIfVideoNews(null);

        articleQueryBean.setPaging("Yes");
        articleQueryBean.setPageNo(1);
        articleQueryBean.setPageSize(6);
        articleQueryBean.setCategoryIdStr("tzgg");
        List<Article> list = articleService.list(articleQueryBean).getBeanList();
        bean.setTzggArticles(list);

        articleQueryBean.setPaging("Yes");
        articleQueryBean.setPageNo(1);
        articleQueryBean.setPageSize(7);
        articleQueryBean.setCategoryIdStr("zcfg");
        bean.setZcfgArticles(articleService.list(articleQueryBean).getBeanList());

        articleQueryBean.setPaging("Yes");
        articleQueryBean.setPageNo(1);
        articleQueryBean.setPageSize(2);
        articleQueryBean.setCategoryIdStr("bszn");
        bean.setBsznArticles(articleService.list(articleQueryBean).getBeanList());

        articleQueryBean.setPaging("Yes");
        articleQueryBean.setPageNo(1);
        articleQueryBean.setPageSize(2);
        articleQueryBean.setCategoryIdStr("xzfw");
        bean.setXzfwArticles(articleService.list(articleQueryBean).getBeanList());

        articleQueryBean.setPaging("Yes");
        articleQueryBean.setPageNo(1);
        articleQueryBean.setPageSize(3);
        articleQueryBean.setCategoryIdStr("smdt");
        bean.setSmdtArticles(articleService.list(articleQueryBean).getBeanList());

        FriendlyLink friendlyLinkQueryBean = new FriendlyLink();
        friendlyLinkQueryBean.setPaging("No");
        friendlyLinkQueryBean.setIfDelete(BigDecimal.ZERO);
        friendlyLinkQueryBean.setCategory(GateFirstPagePojo.zfbmLinkCategory);
        List<FriendlyLink> dbLinks = friendlyLinkMapper.list(friendlyLinkQueryBean);
        List<FriendlyLink> friendlyLinks = new ArrayList<>();
        friendlyLinks.add(GateFirstPagePojo.activeZfbmLink);
        friendlyLinks.addAll(dbLinks);
        bean.setZfbmLinks(friendlyLinks);

        friendlyLinkQueryBean.setCategory(GateFirstPagePojo.mmglbmLinkCategory);
        dbLinks = friendlyLinkMapper.list(friendlyLinkQueryBean);
        friendlyLinks = new ArrayList<>();
        friendlyLinks.add(GateFirstPagePojo.activeMmglbmLink);
        friendlyLinks.addAll(dbLinks);
        bean.setMmglbmLinks(friendlyLinks);

        friendlyLinkQueryBean.setCategory(GateFirstPagePojo.xgbmLinkCategory);
        dbLinks = friendlyLinkMapper.list(friendlyLinkQueryBean);
        friendlyLinks = new ArrayList<>();
        friendlyLinks.add(GateFirstPagePojo.activeXgbmLink);
        friendlyLinks.addAll(dbLinks);
        bean.setXgbmLinks(friendlyLinks);


        result.setResultType("success");
        result.setMessage("读取成功");
        result.setBean(bean);
        return result;
    }

    public ResultInfo<Map> categoryStrTreeMap() {
        ResultInfo<Map> result = new ResultInfo<>();
        Map<String, Twolevelcolumn> bean = twolevelcolumnService.allArticleCategoryStrMap();
        Map<String, String> stringStringMap = twolevelcolumnService.categoryMapidstr();
        Map<String, Object> addinfo = new HashMap<>();
        addinfo.put("categoryIdstrMap", stringStringMap);
        result.setAdditionalInfo(addinfo);
        result.setResultType("success");
        result.setMessage("读取成功");
        result.setBean(bean);
        return result;
    }
}
