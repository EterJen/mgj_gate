package com.gwideal.core.basic.l2.service;



import com.gwideal.core.basic.l4.entity.DicMode;

import com.gwideal.core.cms.l4.entity.Administrator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


/*解决同类中方法调用不走缓存
也可以通过调用((本类名强制转换)AopContext.currentProxy()).方法名的方式强制走代理
((GroupUserService)AopContext.currentProxy()).removeGroupUserStatusCached
*/
@Service
public class RedisServiceHandle {
    @Autowired
    RedisService redisService;
    private ArrayList<DicMode> dicModesForHandleTask = new ArrayList<DicMode>() {{
        add(new DicMode("emergenceLevel", "Level"));
        add(new DicMode("docType", "DocumentType"));
        add(new DicMode("sendToMain", "SendDept"));
        add(new DicMode("sendToCc", "SendDept"));
        add(new DicMode("duwenDept", "Dept"));
        add(new DicMode("fwSecurityLevel", "fwSecurityLevel"));
        add(new DicMode("SecurityLevel", "SecurityLevel"));
        add(new DicMode("SendDept", "SendDept"));
        add(new DicMode("RsvPaperJia", "RsvPaperJia"));
        add(new DicMode("RsvPaperYi", "RsvPaperYi"));
        add(new DicMode("RsvPaperBing", "RsvPaperBing"));
        add(new DicMode("RsvPaperGuo", "RsvPaperGuo"));
        add(new DicMode("RsvLetter", "RsvLetter"));
        add(new DicMode("Require", "Require"));
        add(new DicMode("blyjbpzx", "blyjResult"));
        add(new DicMode("blyjbprd", "DPResult"));
        add(new DicMode("wngk", "InfoPublic"));
        add(new DicMode("xxgk", "InfoPublic"));
    }};

    private ArrayList<DicMode> dicModesForHandleBusiness = new ArrayList<DicMode>() {{
        add(new DicMode("dwCommonPerson", "dwCommonPerson"));
        add(new DicMode("xzCommonPerson", "xzCommonPerson"));
        add(new DicMode("typItem", "typItem"));
        add(new DicMode("typBuyState", "typBuyState"));
    }};

    public List<DicMode> selDicModesForHandleTask() {
        List<DicMode> result = new ArrayList<>();
        for (DicMode dicMode : this.dicModesForHandleTask) {
            DicMode cacheDicMod = redisService.selDicMode(dicMode);
            cacheDicMod.setDictype(dicMode.getFlag());
            result.add(cacheDicMod);
        }
        return result;
    }

    public List<DicMode> selDicModesForBusiness() {
        List<DicMode> result = new ArrayList<>();
        for (DicMode dicMode : this.dicModesForHandleBusiness) {
            DicMode cacheDicMod = redisService.selDicMode(dicMode);
            cacheDicMod.setDictype(dicMode.getFlag());
            result.add(cacheDicMod);
        }
        return result;
    }



    public void delUserEveryWhere(Administrator coreUser) {
        redisService.delUser(coreUser);
        redisService.delUserNg(coreUser);
    }


}

