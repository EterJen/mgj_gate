package com.gwideal.core.cms.l2.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.gwideal.core.basic.l2.service.CacheService;
import com.gwideal.core.basic.l4.entity.DicMode;
import com.gwideal.core.cms.l3.dao.TwolevelcolumnMapper;
import com.gwideal.core.cms.l4.entity.Twolevelcolumn;
import com.gwideal.core.common.CoreBaseServeice;
import com.gwideal.mybatis.metautils.ResultInfo;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class TwolevelcolumnService extends CoreBaseServeice {
    @Autowired
    CacheService cacheService;

    @Autowired
    private TwolevelcolumnMapper twolevelcolumnMapper;

    @Autowired
    private LogService logService;


    public int create(Twolevelcolumn twolevelcolumn) {
        twolevelcolumn.setModifytime(new Date());
        twolevelcolumn.setIsdelete(BigDecimal.ZERO);
        //如果增加位一级菜单需要查出一级菜单N0的最大值
        if (twolevelcolumn.getParentlev() == null) {
            twolevelcolumn.setNo(twolevelcolumnMapper.selectMaxNo(twolevelcolumn));
        } else {
            Twolevelcolumn twolevelcolumn1 = twolevelcolumnMapper.selectByPrimaryKey(twolevelcolumn.getParentlev());
            twolevelcolumn.setNo(twolevelcolumn1.getNo());
        }
        int result = twolevelcolumnMapper.insert(twolevelcolumn);
        logService.log(result, LogService.AuditType.新增, twolevelcolumn);
        return result;
    }

    public Twolevelcolumn read(BigDecimal id) {
        Twolevelcolumn twolevelcolumn = twolevelcolumnMapper.selectByPrimaryKey(id);
        if (twolevelcolumn.getParentlev() != null) {
            Twolevelcolumn twolevelcolumn1 = twolevelcolumnMapper.selectByPrimaryKey(twolevelcolumn.getParentlev());
            if (twolevelcolumn1.getParentlev() != null) {
                twolevelcolumn.setParentTwolevelcolumn(twolevelcolumn1);
            }
        }
        return twolevelcolumnMapper.selectByPrimaryKey(id);
    }

    public int update(Twolevelcolumn twolevelcolumn) {
        Twolevelcolumn oldTwolevelcolumn = twolevelcolumnMapper.selectByPrimaryKey(twolevelcolumn.getId());
        twolevelcolumn.setModifytime(new Date());
        int result = twolevelcolumnMapper.updateByPrimaryKey(twolevelcolumn);
        logService.log(result, LogService.AuditType.修改, oldTwolevelcolumn);
        return result;
    }

    public int delete(BigDecimal id) {
        Twolevelcolumn oldTwolevelcolumn = twolevelcolumnMapper.selectByPrimaryKey(id);
        oldTwolevelcolumn.setIsdelete(BigDecimal.ONE);
        int result = twolevelcolumnMapper.updateByPrimaryKeySelective(oldTwolevelcolumn);
        logService.log(result, LogService.AuditType.删除, oldTwolevelcolumn);
        return result;
    }


    public ResultInfo<Twolevelcolumn> list(Twolevelcolumn queryBean) {
        ResultInfo<Twolevelcolumn> result = new ResultInfo<Twolevelcolumn>();
        if (queryBean.getPaging().equals("Yes")) {
            PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
            List<Twolevelcolumn> plist = twolevelcolumnMapper.list(queryBean);
            PageInfo<Twolevelcolumn> pageInfo = new PageInfo<Twolevelcolumn>(plist);
            result.setTotalRows(pageInfo.getTotal());
            result.setBeanList(pageInfo.getList());
            result.setResultType("success");
            return result;
        } else {
            List<Twolevelcolumn> plist = twolevelcolumnMapper.list(queryBean);
            result.setTotalRows((long) plist.size());
            result.setBeanList(plist);
            result.setResultType("success");
            return result;
        }
    }

    public List<BigDecimal> articleCategoryids(BigDecimal docCategoryId) {
        List<BigDecimal> ids = null;
        Object o = cacheService.cacheMixMap("articleCategoryids:" + docCategoryId, null);

        if (null == o) {
            ids = new ArrayList<>();
            Map<BigDecimal, Twolevelcolumn> bigDecimalTwolevelcolumnMap = allArticleCategoryMap();
            Twolevelcolumn twolevelcolumn = bigDecimalTwolevelcolumnMap.get(docCategoryId);
            findAllIds(twolevelcolumn, ids);
            cacheService.cacheMixMap("articleCategoryids:" + docCategoryId, ids);
        } else {
            ids = (List<BigDecimal>) o;
        }
        return ids;
    }

    public void findAllIds(Twolevelcolumn twolevelcolumn, List<BigDecimal> ids) {
        ids.add(twolevelcolumn.getId());
        List<Twolevelcolumn> nodes = twolevelcolumn.getNodes();
        if (CollectionUtils.isNotEmpty(nodes)) {
            for (Twolevelcolumn node : nodes) {
                findAllIds(node, ids);
            }
        }
    }

    public Map<String, String> categoryMapidstr() {
        Object o = cacheService.cacheMixMap("categoryMapidstr", null);
        Map<String, String> res = null;
        if (null == o) {
            res = new HashMap<>();
            Map<String, Twolevelcolumn> allArticleCategoryStrMap = allArticleCategoryStrMap();
            for (Map.Entry<String, Twolevelcolumn> stringTwolevelcolumnEntry : allArticleCategoryStrMap.entrySet()) {
                String key = stringTwolevelcolumnEntry.getKey();
                Twolevelcolumn value = stringTwolevelcolumnEntry.getValue();
                String idstr = value.getId().toString();
                res.put(key, idstr);
                res.put("id:" + idstr, key);
            }
            cacheService.cacheMixMap("categoryMapidstr", res);
        } else {
            res = (Map<String, String>) o;
        }
        return res;
    }

    public BigDecimal getArticleCategoryId(String categoryStr) {
        Object o = cacheService.cacheMixMap("getArticleCategoryId:" + categoryStr, null);
        BigDecimal id = null;
        if (null == o) {
            Map<String, Twolevelcolumn> stringTwolevelcolumnMap = allArticleCategoryStrMap();
            Twolevelcolumn twolevelcolumn = stringTwolevelcolumnMap.get(categoryStr);
            id = twolevelcolumn.getId();
            cacheService.cacheMixMap("getArticleCategoryId:" + categoryStr, id);
        } else {
            id = (BigDecimal) o;
        }
        return id;
    }

    public Map<String, Twolevelcolumn> allArticleCategoryStrMap() {
        Object o = cacheService.cacheMixMap("allArticleCategoryStrMap", null);
        Map<String, Twolevelcolumn> articleCategoryMap;
        if (null == o) {
            List<Twolevelcolumn> twolevelcolumns = allArticleCategoryList();
            toTree(twolevelcolumns);
            articleCategoryMap = twolevelcolumns.stream().collect(Collectors.toMap(Twolevelcolumn::getCategoryStr, a -> a, (k1, k2) -> k1));
            cacheService.cacheMixMap("allArticleCategoryStrMap", articleCategoryMap);
        } else {
            articleCategoryMap = (Map<String, Twolevelcolumn>) o;
        }
        return articleCategoryMap;
    }

    public Map<BigDecimal, Twolevelcolumn> allArticleCategoryMap() {
        Object o = cacheService.cacheMixMap("articleCategoryMap", null);
        Map<BigDecimal, Twolevelcolumn> articleCategoryMap;
        if (null == o) {
            List<Twolevelcolumn> twolevelcolumns = allArticleCategoryList();
            toTree(twolevelcolumns);
            articleCategoryMap = twolevelcolumns.stream().collect(Collectors.toMap(Twolevelcolumn::getId, a -> a, (k1, k2) -> k1));
            cacheService.cacheMixMap("articleCategoryMap", articleCategoryMap);
        } else {
            articleCategoryMap = (Map<BigDecimal, Twolevelcolumn>) o;
        }
        return articleCategoryMap;
    }

    public List<Twolevelcolumn> allArticleCategoryList() {
        Object o = cacheService.cacheMixMap("allArticleCategoryList", null);
        List<Twolevelcolumn> list = null;
        if (null == o) {
            Twolevelcolumn twolevelcolumn = new Twolevelcolumn();
            twolevelcolumn.setIsdelete(BigDecimal.ZERO);
            list = twolevelcolumnMapper.list(twolevelcolumn);
            cacheService.cacheMixMap("allArticleCategoryList", list);
        } else {
            list = (List<Twolevelcolumn>) o;
        }
        return list;
    }

    public ResultInfo<Twolevelcolumn> findColumns(Twolevelcolumn twolevelcolumn) {
        ResultInfo<Twolevelcolumn> result = new ResultInfo<Twolevelcolumn>();
        List<Twolevelcolumn> list = twolevelcolumnMapper.list(twolevelcolumn);
//		Map<String, Object> additionalInfo = new HashMap<>();
//		additionalInfo.put("beanList",list);
//		result.setAdditionalInfo(additionalInfo);
        result.setBeanList(toTree(list));
        result.setResultType("success");
        return result;
    }
}
