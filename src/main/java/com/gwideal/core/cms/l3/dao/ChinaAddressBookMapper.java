package com.gwideal.core.cms.l3.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.gwideal.core.cms.l4.entity.ChinaAddressBook;

@Mapper
public interface ChinaAddressBookMapper extends tk.mybatis.mapper.common.Mapper<ChinaAddressBook>{

	public List<ChinaAddressBook> list(ChinaAddressBook chinaAddressBook);
}
