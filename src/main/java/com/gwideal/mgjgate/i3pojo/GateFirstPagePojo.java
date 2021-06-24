package com.gwideal.mgjgate.i3pojo;

import com.gwideal.core.cms.l4.entity.*;
import lombok.Data;
import per.eter.utils.datetime.SimpleDay;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Data
public class GateFirstPagePojo {





    private List<Article> tpxwArticles;
    private List<Article> tzggArticles;
    private List<Article> zcfgArticles;
    private List<Article> bsznArticles;
    private List<Article> smdtArticles;
    private List<Article> xzfwArticles;
    private List<Article> spxwArticles;

    public static final String zfbmLinkCategory = "zygjbm";
    public static final String mmglbmLinkCategory = "mmgljg";
    public static final String xgbmLinkCategory = "xgdw";

    private List<FriendlyLink> zfbmLinks;
    private List<FriendlyLink> mmglbmLinks;
    private List<FriendlyLink> xgbmLinks;

    public static final FriendlyLink activeZfbmLink = new FriendlyLink();
    public static final FriendlyLink activeMmglbmLink = new FriendlyLink();
    public static final FriendlyLink activeXgbmLink = new FriendlyLink();

    static {
        activeZfbmLink.setName("政府部门网站");
        activeMmglbmLink.setName("密码管理部门网站");
        activeXgbmLink.setName("相关网站");
    }

    private ContactInformation contactInformation;
    private BayWindow bayWindow;

}
