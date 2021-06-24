package com.gwideal.core.basic.l2.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.gwideal.core.basic.l3.dao.DicModeMapper;

import com.gwideal.core.basic.l4.entity.DicMode;
import com.gwideal.core.basic.l4.entity.DicType;
import com.gwideal.core.cms.l4.entity.Administrator;
import com.gwideal.core.common.CoreBaseServeice;

import com.gwideal.mybatis.metautils.ResultInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class DicModeService extends CoreBaseServeice {
    @Autowired
    DicTypeService dicTypeService;
    @Autowired
    private RedisService redisService;
    @Autowired
    DicModeService dicModeService;




    @Autowired
    private DicModeMapper dicModeMapper;


    public int create(DicMode dicMode) {
        return dicModeMapper.insert(dicMode);
    }

    public DicMode read(BigDecimal id) {
        return dicModeMapper.selectByPrimaryKey(id);
    }

    public int update(DicMode dicMode) {
        return dicModeMapper.updateByPrimaryKey(dicMode);
    }

    public int delete(BigDecimal id) {
        return dicModeMapper.deleteByPrimaryKey(id);
    }

    public void queryDicTypes(ResultInfo<DicType> result, BigDecimal id, DicType queryBean) {
        List<DicType> dicTypes = null;

        if (queryBean.getPaging().equals("Yes")) {
            PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
            dicTypes = dicModeMapper.queryDicTypes(id, queryBean);
            PageInfo<DicType> pageInfo = new PageInfo<DicType>(dicTypes);
            result.setTotalRows(pageInfo.getTotal());
            result.setBeanList(pageInfo.getList());
        } else {
            dicTypes = dicModeMapper.queryDicTypes(id, queryBean);
            result.setTotalRows((long) dicTypes.size());
            result.setBeanList(dicTypes);
        }

        resultCheck(result, dicTypes);
    }

    public void resultCheck(ResultInfo<DicType> result, List<DicType> dicTypes) {
        if (dicTypes.size() >= 0) {
            result.setResultType("success");
            result.setMessage("获取字典项成功");
        } else {
            result.setMessage("获取字典项失败");
            result.setResultType("fail");
        }
    }

    public void queryDicTypes(ResultInfo<DicType> result, DicMode dicMode, DicType queryBean) {
        List<DicType> dicTypes = null;

        if (queryBean.getPaging().equals("Yes")) {
            PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
            dicTypes = dicModeMapper.dicTypeList(dicMode, queryBean);
            PageInfo<DicType> pageInfo = new PageInfo<DicType>(dicTypes);
            result.setTotalRows(pageInfo.getTotal());
            result.setBeanList(pageInfo.getList());
        } else {
            dicTypes = dicModeMapper.dicTypeList(dicMode, queryBean);
            result.setTotalRows((long) dicTypes.size());
            result.setBeanList(dicTypes);
        }
        //对于文中需要把模板绑定出巡出来
        /*if("DocumentType".equals(dicMode.getDictype())){
            for(DicType d:dicTypes){
                d.setWfDocTypeList(wfDocTypeMapper.queryByDicTypeId(d.getId()));
            }
        }*/

        resultCheck(result, dicTypes);
    }


    public ResultInfo<DicMode> list(DicMode queryBean) {
        ResultInfo<DicMode> result = new ResultInfo<DicMode>();
        if (queryBean.getPaging().equals("Yes")) {
            PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
            List<DicMode> plist = dicModeMapper.list(queryBean);
            PageInfo<DicMode> pageInfo = new PageInfo<DicMode>(plist);
            result.setTotalRows(pageInfo.getTotal());
            result.setBeanList(pageInfo.getList());
            result.setResultType("success");
            return result;
        } else {
            List<DicMode> plist = dicModeMapper.list(queryBean);
            result.setTotalRows((long) plist.size());
            result.setBeanList(plist);
            result.setResultType("success");
            return result;
        }
    }

    public List<DicType> basisSettingTree(Administrator coreUser) {
        DicMode dicMode = new DicMode();
        dicMode.setDictype("personalBasisSetting");
        dicMode.setPaging("No");
        ResultInfo<DicMode> dicModeResultInfo = dicModeService.list(dicMode);

        DicType dicType = new DicType();
        dicType.setPaging("No");

        List<DicType> list = dicModeMapper.dicTypeList(dicMode, dicType);

        dicType.setName(dicModeResultInfo.getBeanList().get(0).getCname());
        dicType.setId(dicModeResultInfo.getBeanList().get(0).getId());
        dicType.setParentid(null);

        for (DicType type : list) {
            type.setParentid(dicType.getId());
        }
        list.add(dicType);

        if (!list.isEmpty()) {
            return toTree(list);
        } else {
            return list;
        }
    }

    public Map<String,Object> queryDicModes(List<DicMode> dicModes) {
        Map<String, Object> objectMap = new HashMap<>();
        if (null != dicModes && !dicModes.isEmpty()) {
            for (DicMode dicMode : dicModes) {
                DicMode cacheDicMod = redisService.selDicMode(dicMode);
                objectMap.put(cacheDicMod.getDictype(), cacheDicMod);
            }
        }
        return objectMap;
    }

    public List<DicMode> dicModesForHandleTask() {
        return redisService.selDicModesForHandleTask();
    }

    public ResultInfo<DicMode> findDicMod(DicMode queryBean) {
        ResultInfo<DicMode> result = new ResultInfo<DicMode>();
        DicMode dicMod = dicModeMapper.findDicMod(queryBean);
        result.setBean(dicMod);
        result.setResultType("success");
        return result;
    }

}
