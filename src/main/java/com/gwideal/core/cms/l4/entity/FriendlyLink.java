package com.gwideal.core.cms.l4.entity;

import javax.persistence.Transient;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import com.gwideal.increment.generator.IncAnnoColumn;
import com.gwideal.increment.generator.IncAnnoDbName;

@Table(name = "FRIENDLY_LINK")
@IncAnnoDbName(name = "dameng", comment = "友情链接表")
public class FriendlyLink extends com.gwideal.core.common.CoreBaseEntity {

    @Id()
    @IncAnnoColumn(name = "ID", dbType = "NUMERIC", jdbcType = "NUMERIC", dataPrecision = "38", dataScale = "65531", dataLength = "0", comment = "主键")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "select JXWOAUniversalSeq.nextval from dual")
    private java.math.BigDecimal id;

    @IncAnnoColumn(name = "CATEGORY", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "200", comment = "分类")
    private java.lang.String category;

    @IncAnnoColumn(name = "NAME", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "1024", comment = "名称")
    private java.lang.String name;

    @IncAnnoColumn(name = "LINK", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "1024", comment = "地址")
    private java.lang.String link;

    @IncAnnoColumn(name = "SORT_NUMBER", dbType = "NUMERIC", jdbcType = "NUMERIC", dataPrecision = "38", dataScale = "65531", dataLength = "0", comment = "排序值")
    private java.math.BigDecimal sortNumber;

    @IncAnnoColumn(name = "IF_DELETE", dbType = "NUMERIC", jdbcType = "NUMERIC", dataPrecision = "38", dataScale = "65531", dataLength = "0", comment = "删除标记位")
    private java.math.BigDecimal ifDelete;

    @IncAnnoColumn(name = "CATEGORY_SORT_NUMBER", dbType = "NUMERIC", jdbcType = "NUMERIC", dataPrecision = "38", dataScale = "65531", dataLength = "0", comment = "分类排序值")
    private java.math.BigDecimal categorySortNumber;

    public java.math.BigDecimal getId() {
        return this.id;
    }

    public void setId(java.math.BigDecimal id) {
        this.id = id;
    }

    public java.lang.String getCategory() {
        return this.category;
    }

    public void setCategory(java.lang.String category) {
        this.category = category;
    }

    public java.lang.String getName() {
        return this.name;
    }

    public void setName(java.lang.String name) {
        this.name = name;
    }

    public java.lang.String getLink() {
        return this.link;
    }

    public void setLink(java.lang.String link) {
        this.link = link;
    }

    public java.math.BigDecimal getSortNumber() {
        return this.sortNumber;
    }

    public void setSortNumber(java.math.BigDecimal sortNumber) {
        this.sortNumber = sortNumber;
    }

    public java.math.BigDecimal getIfDelete() {
        return this.ifDelete;
    }

    public void setIfDelete(java.math.BigDecimal ifDelete) {
        this.ifDelete = ifDelete;
    }

    public void setCategorySortNumber(java.math.BigDecimal categorySortNumber) {
        this.categorySortNumber = categorySortNumber;
    }

    public java.math.BigDecimal getCategorySortNumber() {
        return this.categorySortNumber;
    }

    @Transient
    private String titleLike;

    public String getTitleLike() {
        return titleLike;
    }

    public void setTitleLike(String titleLike) {
        this.titleLike = titleLike;
    }
}
