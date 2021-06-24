
package com.gwideal.core.basic.l1.controller;

import com.gwideal.core.basic.l2.service.RedisService;
import com.gwideal.core.basic.l4.entity.DicMode;
import com.gwideal.mybatis.metautils.ResultInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/redis")
public class RedisController {
    @Autowired
    RedisService redisService;

    @RequestMapping("/test")
    public void test() {
        redisService.test();

    }

    @RequestMapping("/selDicModesForBusiness")
    public ResultInfo<DicMode> selDicModesForBusiness() {
        ResultInfo<DicMode> result = new ResultInfo<DicMode>();
        List<DicMode> dicModes = redisService.selDicModesForBusiness();
        Map<String, Object> collect = dicModes.stream().collect(Collectors.toMap(DicMode::getDictype, a -> a, (k1, k2) -> k1));
        result.setAdditionalInfo(collect);
        result.setResultType("success");
        result.setMessage("获取字典成功!");
        return result;


    }

}
