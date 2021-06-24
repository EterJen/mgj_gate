package com.gwideal.core.basic.l2.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.gwideal.core.basic.l3.dao.DicCategoryMapper;
import com.gwideal.core.basic.l4.entity.DicCategory;
import com.gwideal.core.basic.l4.entity.DicMode;
import com.gwideal.mybatis.metautils.ResultInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@Transactional
public class DicCategoryService {

    @Autowired
    private DicCategoryMapper dicCategoryMapper;


    public int create(DicCategory dicCategory) {
        return dicCategoryMapper.insert(dicCategory);
    }

    public DicCategory read(BigDecimal id) {
        return dicCategoryMapper.selectByPrimaryKey(id);
    }

    public int update(DicCategory dicCategory) {
        return dicCategoryMapper.updateByPrimaryKey(dicCategory);
    }

    public int delete(BigDecimal id) {
        return dicCategoryMapper.deleteByPrimaryKey(id);
    }


    public ResultInfo<DicCategory> list(DicCategory queryBean) {
        ResultInfo<DicCategory> result = new ResultInfo<DicCategory>();
        if (queryBean.getPaging().equals("Yes")) {
            PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
            List<DicCategory> plist = dicCategoryMapper.list(queryBean);
            PageInfo<DicCategory> pageInfo = new PageInfo<DicCategory>(plist);
            result.setTotalRows(pageInfo.getTotal());
            result.setBeanList(pageInfo.getList());
            result.setResultType("success");
            return result;
        } else {
            List<DicCategory> plist = dicCategoryMapper.list(queryBean);
            result.setTotalRows((long) plist.size());
            result.setBeanList(plist);
            result.setResultType("success");
            return result;
        }
    }

    public void delDicModes(BigDecimal id, List<DicMode> dicModes, ResultInfo<String> result) {
        Integer res = null;
        try {
            res = dicCategoryMapper.delDicModes(id, dicModes);
            if (res >= 1) {
                result.setResultType("success");
                result.setMessage("删除成功");
            } else {
                result.setResultType("fail");
                result.setMessage("删除失败");
            }
        } catch (Exception e) {
            e.printStackTrace();
            result.setResultType("error");
            result.setMessage(e.getMessage());
        } finally {
        }
    }
}


