package com.gwideal.core.cms.l3.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.gwideal.core.cms.l4.entity.CityAddressBook;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface CityAddressBookMapper extends tk.mybatis.mapper.common.Mapper<CityAddressBook>{

	public List<CityAddressBook> list(CityAddressBook cityAddressBook);

	public CityAddressBook getCityAddressBook(@Param("name") String name);

}
