package com.gwideal.core.cms.l4.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.gwideal.increment.generator.IncAnnoColumn;
import com.gwideal.increment.generator.IncAnnoDbName;
import javax.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

@Table(name = "ARTICLE")
@IncAnnoDbName(name = "dameng", comment = "文章表")
public class Article extends com.gwideal.core.common.CoreBaseEntity<Article, BigDecimal> {

    @Id()
    @IncAnnoColumn(name = "ID", dbType = "NUMERIC", jdbcType = "NUMERIC", dataPrecision = "38", dataScale = "65531", dataLength = "0", comment = "主键")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "select JXWOAUniversalSeq.nextval from dual")
    private java.math.BigDecimal id;

    @IncAnnoColumn(name = "TITLE", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "512", comment = "标题")
    private java.lang.String title;

    @IncAnnoColumn(name = "CONTENT", dbType = "TEXT", jdbcType = "LONGVARCHAR", dataPrecision = "", dataScale = "", dataLength = "0", comment = "文章内容")
    private java.lang.String content;

    @IncAnnoColumn(name = "IF_VIDEO_NEWS", dbType = "NUMERIC", jdbcType = "NUMERIC", dataPrecision = "38", dataScale = "65531", dataLength = "0", comment = "是否视频新闻")
    private java.math.BigDecimal ifVideoNews;

    @IncAnnoColumn(name = "IF_IMAGE_NEWS", dbType = "NUMERIC", jdbcType = "NUMERIC", dataPrecision = "38", dataScale = "65531", dataLength = "0", comment = "是否图片新闻")
    private java.math.BigDecimal ifImageNews;

    @IncAnnoColumn(name = "IF_PUBLISHED", dbType = "NUMERIC", jdbcType = "NUMERIC", dataPrecision = "38", dataScale = "65531", dataLength = "0", comment = "是否已发布")
    private java.math.BigDecimal ifPublished;

    @IncAnnoColumn(name = "VIDEO_COVER_PATH", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "512", comment = "视频新闻封面路径")
    private java.lang.String videoCoverPath;

    @IncAnnoColumn(name = "IMAGE_PATH", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "512", comment = "图片新闻路径")
    private java.lang.String imagePath;

    @IncAnnoColumn(name = "NEW_FLAG_SHOW_DAYS", dbType = "NUMERIC", jdbcType = "NUMERIC", dataPrecision = "38", dataScale = "65531", dataLength = "0", comment = "NEW标记展示天数")
    private java.math.BigDecimal newFlagShowDays;

    @IncAnnoColumn(name = "SET_TOP_SORT", dbType = "NUMERIC", jdbcType = "NUMERIC", dataPrecision = "38", dataScale = "65531", dataLength = "0", comment = "置顶排序号")
    private java.math.BigDecimal setTopSort;

    @Override
    public String toString() {
        return "{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", publishTime=" + publishTime +
                ", docCategoryId=" + docCategoryId +
                ", creater='" + creater + '\'' +
                ", docFrom='" + docFrom + '\'' +
                '}';
    }

    @IncAnnoColumn(name = "IF_DELETE", dbType = "NUMERIC", jdbcType = "NUMERIC", dataPrecision = "1", dataScale = "0", dataLength = "0", comment = "记录删除标记")
    private java.math.BigDecimal ifDelete;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @IncAnnoColumn(name = "PUBLISH_TIME", dbType = "TIMESTAMP", jdbcType = "TIMESTAMP", dataPrecision = "", dataScale = "", dataLength = "8", comment = "文章日期 基础排序")
    private java.util.Date publishTime;

    @IncAnnoColumn(name = "DOC_CATEGORY_ID", dbType = "NUMERIC", jdbcType = "NUMERIC", dataPrecision = "38", dataScale = "65531", dataLength = "0", comment = "文章分栏ID")
    private java.math.BigDecimal docCategoryId;

    @IncAnnoColumn(name = "SHOW_NEW_FLAG", dbType = "NUMERIC", jdbcType = "NUMERIC", dataPrecision = "38", dataScale = "65531", dataLength = "0", comment = "是否NEW标记展示")
    private java.math.BigDecimal showNewFlag;

    @IncAnnoColumn(name = "CREATER", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "20", comment = "作者")
    private java.lang.String creater;

    @IncAnnoColumn(name = "DOC_FROM", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "512", comment = "文章来源")
    private java.lang.String docFrom;

    @IncAnnoColumn(name = "IF_SET_TOP", dbType = "NUMERIC", jdbcType = "NUMERIC", dataPrecision = "38", dataScale = "65531", dataLength = "0", comment = "是否置顶")
    private java.math.BigDecimal ifSetTop;

    @IncAnnoColumn(name = "CREATER_ID", dbType = "NUMERIC", jdbcType = "NUMERIC", dataPrecision = "38", dataScale = "65531", dataLength = "0", comment = "作者ID")
    private java.math.BigDecimal createrId;

    @IncAnnoColumn(name = "VIDEO_PATH", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "512", comment = "视频存储路径")
    private java.lang.String videoPath;

    public java.math.BigDecimal getId() {
        return this.id;
    }

    public void setId(java.math.BigDecimal id) {
        this.id = id;
    }

    public java.lang.String getTitle() {
        return this.title;
    }

    public void setTitle(java.lang.String title) {
        this.title = title;
    }

    public java.lang.String getContent() {
        return this.content;
    }

    public void setContent(java.lang.String content) {
        this.content = content;
    }

    public void setIfVideoNews(java.math.BigDecimal ifVideoNews) {
        this.ifVideoNews = ifVideoNews;
    }

    public java.math.BigDecimal getIfVideoNews() {
        return this.ifVideoNews;
    }

    public void setIfImageNews(java.math.BigDecimal ifImageNews) {
        this.ifImageNews = ifImageNews;
    }

    public java.math.BigDecimal getIfImageNews() {
        return this.ifImageNews;
    }

    public void setIfPublished(java.math.BigDecimal ifPublished) {
        this.ifPublished = ifPublished;
    }

    public java.math.BigDecimal getIfPublished() {
        return this.ifPublished;
    }

    public void setVideoCoverPath(java.lang.String videoCoverPath) {
        this.videoCoverPath = videoCoverPath;
    }

    public java.lang.String getVideoCoverPath() {
        return this.videoCoverPath;
    }

    public void setImagePath(java.lang.String imagePath) {
        this.imagePath = imagePath;
    }

    public java.lang.String getImagePath() {
        return this.imagePath;
    }

    public void setNewFlagShowDays(java.math.BigDecimal newFlagShowDays) {
        this.newFlagShowDays = newFlagShowDays;
    }

    public java.math.BigDecimal getNewFlagShowDays() {
        return this.newFlagShowDays;
    }

    public void setSetTopSort(java.math.BigDecimal setTopSort) {
        this.setTopSort = setTopSort;
    }

    public java.math.BigDecimal getSetTopSort() {
        return this.setTopSort;
    }

    public void setIfDelete(java.math.BigDecimal ifDelete) {
        this.ifDelete = ifDelete;
    }

    public java.math.BigDecimal getIfDelete() {
        return this.ifDelete;
    }

    public void setPublishTime(java.util.Date publishTime) {
        this.publishTime = publishTime;
    }

    public java.util.Date getPublishTime() {
        return this.publishTime;
    }

    public void setDocCategoryId(java.math.BigDecimal docCategoryId) {
        this.docCategoryId = docCategoryId;
    }

    public java.math.BigDecimal getDocCategoryId() {
        return this.docCategoryId;
    }

    public void setShowNewFlag(java.math.BigDecimal showNewFlag) {
        this.showNewFlag = showNewFlag;
    }

    public java.math.BigDecimal getShowNewFlag() {
        return this.showNewFlag;
    }

    public void setCreater(java.lang.String creater) {
        this.creater = creater;
    }

    public java.lang.String getCreater() {
        return this.creater;
    }

    public void setDocFrom(java.lang.String docFrom) {
        this.docFrom = docFrom;
    }

    public java.lang.String getDocFrom() {
        return this.docFrom;
    }

    public void setIfSetTop(java.math.BigDecimal ifSetTop) {
        this.ifSetTop = ifSetTop;
    }

    public java.math.BigDecimal getIfSetTop() {
        return this.ifSetTop;
    }

    public void setCreaterId(java.math.BigDecimal createrId) {
        this.createrId = createrId;
    }

    public java.math.BigDecimal getCreaterId() {
        return this.createrId;
    }

    public void setVideoPath(java.lang.String videoPath) {
        this.videoPath = videoPath;
    }

    public java.lang.String getVideoPath() {
        return this.videoPath;
    }

    @Transient
    private List<Twolevelcolumn> twolevelcolumnList = new ArrayList<Twolevelcolumn>();

    @Transient
    private String titleLike;

    @Transient
    private String columnChinese;
    @Transient
    private String categoryIdStr;
    @Transient
    private HashSet<String> flagFilters;

    @Transient
    private List<SimpleFile> simpleFiles;

    @Transient
    private List<BigDecimal> articleCategoryIds = new ArrayList<>();

    @Transient
    private boolean docNeed2Pdf;

    @Transient
    private String sql = "";

    @Transient
    private BigDecimal twolevelcolumnId;

    public List<Twolevelcolumn> getTwolevelcolumnList() {
        return twolevelcolumnList;
    }

    public void setTwolevelcolumnList(List<Twolevelcolumn> twolevelcolumnList) {
        this.twolevelcolumnList = twolevelcolumnList;
    }

    public String getColumnChinese() {
        return columnChinese;
    }

    public void setColumnChinese(String columnChinese) {
        this.columnChinese = columnChinese;
    }

    public BigDecimal getTwolevelcolumnId() {
        return twolevelcolumnId;
    }

    public void setTwolevelcolumnId(BigDecimal twolevelcolumnId) {
        this.twolevelcolumnId = twolevelcolumnId;
    }

    public boolean isDocNeed2Pdf() {
        return docNeed2Pdf;
    }

    public void setDocNeed2Pdf(boolean docNeed2Pdf) {
        this.docNeed2Pdf = docNeed2Pdf;
    }

    public String getSql() {
        return sql;
    }

    public void setSql(String sql) {
        this.sql = sql;
    }

    public List<SimpleFile> getSimpleFiles() {
        return simpleFiles;
    }

    public void setSimpleFiles(List<SimpleFile> simpleFiles) {
        this.simpleFiles = simpleFiles;
    }

    public HashSet<String> getFlagFilters() {
        return flagFilters;
    }

    public void setFlagFilters(HashSet<String> flagFilters) {
        this.flagFilters = flagFilters;
    }

    public String getTitleLike() {
        return titleLike;
    }

    public void setTitleLike(String titleLike) {
        this.titleLike = titleLike;
    }

    public String getCategoryIdStr() {
        return categoryIdStr;
    }

    public void setCategoryIdStr(String categoryIdStr) {
        this.categoryIdStr = categoryIdStr;
    }

    public List<BigDecimal> getArticleCategoryIds() {
        return articleCategoryIds;
    }

    public void setArticleCategoryIds(List<BigDecimal> articleCategoryIds) {
        this.articleCategoryIds = articleCategoryIds;
    }

    @IncAnnoColumn(name = "SIGN_TEXT", dbType = "TEXT", jdbcType = "LONGVARCHAR", dataPrecision = "", dataScale = "0", dataLength = "2147483647", comment = "默认标签")
    private java.lang.String signText;

    public String getSignText() {
        return signText;
    }

    public void setSignText(String signText) {
        this.signText = signText;
    }


}
