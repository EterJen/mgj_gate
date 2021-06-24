package com.gwideal.core.util;

import com.gwideal.core.util.ResultCode;
import lombok.Data;

import java.io.Serializable;
import java.util.HashMap;
import java.util.LinkedHashMap;

@Data
public class JsonResult implements Serializable {
    private static final long serialVersionUID = 783015033603078674L;
    private int code;
    private String msg;
    private HashMap data = new LinkedHashMap<String,Object>();
    private boolean success;


    public JsonResult() {
        ResultCode resultCode = ResultCode.SUCCESS;
        setResultCode(resultCode);
    }

    public JsonResult  setResultCode(ResultCode resultCode) {
        this.code = resultCode.getCode();
        this.msg = resultCode.getMsg();
        return this;
    }


    public JsonResult  addDate(String key,Object val) {
        this.data.put(key, val);
        return this;
    }

}

