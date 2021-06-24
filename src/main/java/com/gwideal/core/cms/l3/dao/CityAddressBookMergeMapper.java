package com.gwideal.core.cms.l3.dao;

import java.util.List;

import com.gwideal.core.cms.l4.entity.CityAddressBookMerge;

public interface CityAddressBookMergeMapper extends tk.mybatis.mapper.common.Mapper<CityAddressBookMerge>{

	public List<CityAddressBookMerge> list(CityAddressBookMerge cityAddressBookMerge);
}
