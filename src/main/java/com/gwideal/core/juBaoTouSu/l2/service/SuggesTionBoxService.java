package com.gwideal.core.juBaoTouSu.l2.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.gwideal.core.juBaoTouSu.l3.dao.SuggesTionBoxMapper;
import com.gwideal.core.juBaoTouSu.l4.entity.SuggesTionBox;
import com.gwideal.mybatis.metautils.ResultInfo;
import net.sf.json.JSON;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class SuggesTionBoxService {


    @Autowired
    SuggesTionBoxMapper suggesTionBoxMapper;

    /**
     *
     * @param name
     * @param tel
     * @param suggestion_Email
     * @param suggestion_title
     * @param suggestion_body
     */
    public void saveSuggesTionBox(String name,String tel,String suggestion_Email,String suggestion_title,String suggestion_body){
        suggesTionBoxMapper.saveSuggesTionBox(name,tel,suggestion_Email,suggestion_title,suggestion_body);
    }


    public void list(String name,String tel,String suggestion_Email,String suggestion_title,String suggestion_body){
        suggesTionBoxMapper.saveSuggesTionBox(name,tel,suggestion_Email,suggestion_title,suggestion_body);
    }


    public ResultInfo<SuggesTionBox> list(SuggesTionBox queryBean){
        ResultInfo<SuggesTionBox> result = new ResultInfo<SuggesTionBox>();
        if(queryBean.getPaging().equals("Yes")){
            PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
            List<SuggesTionBox> plist = suggesTionBoxMapper.list(queryBean);
            PageInfo<SuggesTionBox> pageInfo = new PageInfo<SuggesTionBox>(plist);
            result.setTotalRows(pageInfo.getTotal());
            result.setBeanList(pageInfo.getList());
            result.setResultType("success");
            return result;
        }else{
            List<SuggesTionBox> plist = suggesTionBoxMapper.list(queryBean);
            result.setTotalRows((long)plist.size());
            result.setBeanList(plist);
            result.setResultType("success");
            return result;
        }
    }

    public int delete(BigDecimal id){
        return suggesTionBoxMapper.deleteByPrimaryKey(id);
    }

    public int update(SuggesTionBox suggesTionBox){
        return suggesTionBoxMapper.updateByPrimaryKey(suggesTionBox);
    }

}
