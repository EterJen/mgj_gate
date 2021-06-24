package com.gwideal.core.cms.l4.entity;

import javax.persistence.Transient;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import com.gwideal.increment.generator.IncAnnoColumn;
import com.gwideal.increment.generator.IncAnnoDbName;

@Table(name = "RELATION_ARTICLE_SIMPLEFILE")
@IncAnnoDbName(name = "dameng", comment = "默认表名")
public class RelationArticleSimplefile extends com.gwideal.core.common.CoreBaseEntity {

    @IncAnnoColumn(name = "ARTICLE_ID", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "默认标签")
    private java.math.BigDecimal articleId;

    @IncAnnoColumn(name = "SIMPLE_FILE_ID", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "默认标签")
    private java.math.BigDecimal simpleFileId;

    @IncAnnoColumn(name = "ORDER_NUMBER", dbType = "NUMBER", jdbcType = "NUMERIC", dataPrecision = "", dataScale = "", dataLength = "22", comment = "默认标签")
    private java.math.BigDecimal orderNumber;

    public java.math.BigDecimal getArticleId() {
        return this.articleId;
    }

    public void setArticleId(java.math.BigDecimal articleId) {
        this.articleId = articleId;
    }

    public java.math.BigDecimal getSimpleFileId() {
        return this.simpleFileId;
    }

    public void setSimpleFileId(java.math.BigDecimal simpleFileId) {
        this.simpleFileId = simpleFileId;
    }

    public void setOrderNumber(java.math.BigDecimal orderNumber) {
        this.orderNumber = orderNumber;
    }

    public java.math.BigDecimal getOrderNumber() {
        return this.orderNumber;
    }
}
