package com.gwideal.core.util;

import java.io.Serializable;
import java.util.List;

public class ExcelData implements Serializable {

    //表头名称
    private List<String> titles;

    //表格数据
    private List<List<Object>> data;

    //sheet页名称
    private String name;


	/**
	 * 多行表头
	 */
    private List<List<String>> mergeTitles;

    public List<String> getTitles() {
        return titles;
    }

    public void setTitles(List<String> titles) {
        this.titles = titles;
    }

    public List<List<Object>> getData() {
        return data;
    }

    public void setData(List<List<Object>> data) {
        this.data = data;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

	public List<List<String>> getMergeTitles() {
		return mergeTitles;
	}

	public void setMergeTitles(List<List<String>> mergeTitles) {
		this.mergeTitles = mergeTitles;
	}
}
