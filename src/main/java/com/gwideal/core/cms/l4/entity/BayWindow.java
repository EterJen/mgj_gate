package com.gwideal.core.cms.l4.entity;

import javax.persistence.Transient;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import com.gwideal.increment.generator.IncAnnoColumn;
import com.gwideal.increment.generator.IncAnnoDbName;

@Table(name = "BAY_WINDOW")
@IncAnnoDbName(name = "dameng", comment = "默认表名")
public class BayWindow extends com.gwideal.core.common.CoreBaseEntity {

    @IncAnnoColumn(name = "ID", dbType = "NUMERIC", jdbcType = "NUMERIC", dataPrecision = "38", dataScale = "65531", dataLength = "0", comment = "默认标签")
    @Id()
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "select JXWOAUniversalSeq.nextval from dual")
    private java.math.BigDecimal id;

    @IncAnnoColumn(name = "LINK", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "200", comment = "默认标签")
    private java.lang.String link;

    @IncAnnoColumn(name = "IMAGE_PATH", dbType = "VARCHAR", jdbcType = "VARCHAR", dataPrecision = "", dataScale = "", dataLength = "300", comment = "默认标签")
    private java.lang.String imagePath;

    @IncAnnoColumn(name = "IMAGE_WIDTH", dbType = "NUMERIC", jdbcType = "NUMERIC", dataPrecision = "38", dataScale = "65531", dataLength = "0", comment = "默认标签")
    private java.math.BigDecimal imageWidth;

    @IncAnnoColumn(name = "IMAGE_HEIGHT", dbType = "NUMERIC", jdbcType = "NUMERIC", dataPrecision = "38", dataScale = "65531", dataLength = "0", comment = "默认标签")
    private java.math.BigDecimal imageHeight;

    @IncAnnoColumn(name = "IF_DELETE", dbType = "NUMERIC", jdbcType = "NUMERIC", dataPrecision = "38", dataScale = "65531", dataLength = "0", comment = "默认标签")
    private java.math.BigDecimal ifDelete;

    public java.math.BigDecimal getId() {
        return this.id;
    }

    public void setId(java.math.BigDecimal id) {
        this.id = id;
    }

    public java.lang.String getLink() {
        return this.link;
    }

    public void setLink(java.lang.String link) {
        this.link = link;
    }

    public java.lang.String getImagePath() {
        return this.imagePath;
    }

    public void setImagePath(java.lang.String imagePath) {
        this.imagePath = imagePath;
    }

    public java.math.BigDecimal getImageWidth() {
        return this.imageWidth;
    }

    public void setImageWidth(java.math.BigDecimal imageWidth) {
        this.imageWidth = imageWidth;
    }

    public java.math.BigDecimal getImageHeight() {
        return this.imageHeight;
    }

    public void setImageHeight(java.math.BigDecimal imageHeight) {
        this.imageHeight = imageHeight;
    }

    public java.math.BigDecimal getIfDelete() {
        return this.ifDelete;
    }

    public void setIfDelete(java.math.BigDecimal ifDelete) {
        this.ifDelete = ifDelete;
    }
}
