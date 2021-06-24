package com.gwideal.core.cms.l2.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.gwideal.core.basic.l2.service.RedisService;
import com.gwideal.core.cms.l3.dao.IndexIconMapper;
import com.gwideal.core.cms.l3.dao.IndexUserIconMapper;
import com.gwideal.core.cms.l4.entity.Administrator;
import com.gwideal.core.cms.l4.entity.IndexIcon;
import com.gwideal.core.cms.l4.entity.IndexUserIcon;
import com.gwideal.core.common.CoreBaseServeice;
import com.gwideal.mybatis.metautils.ResultInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional
public class IndexIconService extends CoreBaseServeice {

    @Autowired
    private IndexIconMapper indexIconMapper;
    @Autowired
    private IndexUserIconMapper indexUserIconMapper;
    @Autowired
    private RedisService redisService;


    public int create(IndexIcon indexIcon) {
        return indexIconMapper.insert(indexIcon);
    }

    public IndexIcon read(BigDecimal id) {
        return indexIconMapper.selectByPrimaryKey(id);
    }

    public int update(IndexIcon indexIcon) {
        return indexIconMapper.updateByPrimaryKey(indexIcon);
    }

    public int delete(BigDecimal id) {
        return indexIconMapper.deleteByPrimaryKey(id);
    }


    public ResultInfo<IndexIcon> list(IndexIcon queryBean) {
        ResultInfo<IndexIcon> result = new ResultInfo<IndexIcon>();
        if (queryBean.getPaging().equals("Yes")) {
            PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
            List<IndexIcon> plist = indexIconMapper.list(queryBean);
            PageInfo<IndexIcon> pageInfo = new PageInfo<IndexIcon>(plist);
            result.setTotalRows(pageInfo.getTotal());
            result.setBeanList(pageInfo.getList());
            result.setResultType("success");
            return result;
        } else {
            List<IndexIcon> plist = indexIconMapper.list(queryBean);
            result.setTotalRows((long) plist.size());
            result.setBeanList(plist);
            result.setResultType("success");
            return result;
        }
    }

    public ResultInfo<IndexIcon> queryIcons(IndexIcon indexIcon) {
        ResultInfo<IndexIcon> result = new ResultInfo<IndexIcon>();
        /*查询自定义菜单*/
        Administrator administrator = redisService.selUserNg(indexIcon.getCurrentUser().getCoreUser());

        List<IndexIcon> list = indexIconMapper.queryIconsIsContainUserIcon(indexIcon);
        list =
                list.stream().filter(d -> {
                    return (!"考勤".equals(d.getIconname())) ||
                            (administrator.isHasRoleNeiQin() || administrator.isZhenzhi() || administrator.isFuzhi()) && ("考勤".equals(d.getIconname()));
                }).collect(Collectors.toList());
        List<IndexIcon> list1 = toTree(list);
        /*查询个人所拥有自定义菜单*/
        BigDecimal id = indexIcon.getCurrentUser().getCoreUser().getId();
        IndexUserIcon indexUserIcon = new IndexUserIcon();
        indexUserIcon.setUserid(id);
        indexUserIcon.setPaging("No");
        List<IndexUserIcon> userIcons = indexUserIconMapper.list(indexUserIcon);
        userIcons = userIcons.stream().filter(
                d -> {
                    return (!"考勤".equals(d.getIndexIcon().getIconname())) ||
                            (administrator.isHasRoleNeiQin() || administrator.isZhenzhi() || administrator.isFuzhi()) && ("考勤".equals(d.getIndexIcon().getIconname()));
                }
        ).collect(Collectors.toList());
        Map<String, Object> map = new HashMap<>();
        map.put("topList", list1);
        map.put("userIcons", userIcons);
        result.setAdditionalInfo(map);
        result.setResultType("success");
        return result;
    }
}
