package com.gwideal.core.basic.l2.service;


import com.gwideal.core.basic.l4.entity.ActionDef;
import com.gwideal.core.jwt.JwtUser;
import com.gwideal.mybatis.metautils.ResultInfo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional
public class ActionDefService {



    /**
     * 初始化右键菜单列表
     */
    public static List<ActionDef> actionDefList = new ArrayList<ActionDef>();
    static {
        actionDefList.add(new ActionDef("add","添加","add","add"));
        actionDefList.add(new ActionDef("banci","版次","fa-plus fa-lg","rightMenu"));
        actionDefList.add(new ActionDef("editName","修改名称","fa-edit fa-lg","rightMenu"));
        actionDefList.add(new ActionDef("download","下载","fa-download fa-lg","rightMenu"));
        actionDefList.add(new ActionDef("delete","删除","fa-times fa-lg","rightMenu"));
        actionDefList.add(new ActionDef("topping","置顶","fa-level-up fa-lg","rightMenu"));
    }

    public static List<String> beans = new ArrayList<String>();
    static {
        beans.add("middleAttachmentService");
    }




    public ResultInfo<ActionDef> list(ActionDef actionDef, JwtUser currentUser1) {
        ResultInfo<ActionDef> result = new ResultInfo<ActionDef>();
        result.setBeanList(actionDefList);
        Map<String, Object> appleMap = actionDefList.stream().collect(Collectors.toMap(ActionDef::getId, a -> a,(k1, k2)->k1));
        result.setAdditionalInfo(appleMap);
        result.setResultType("success");
        return result;
    }



}
