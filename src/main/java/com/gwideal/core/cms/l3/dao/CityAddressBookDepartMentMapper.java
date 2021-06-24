package com.gwideal.core.cms.l3.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.gwideal.core.cms.l4.entity.CityAddressBook;
import com.gwideal.core.cms.l4.entity.CityAddressBookDepartMent;

@Mapper
public interface CityAddressBookDepartMentMapper extends tk.mybatis.mapper.common.Mapper<CityAddressBookDepartMent>{

	public List<CityAddressBookDepartMent> list(CityAddressBookDepartMent cityAddressBookDepartMent);

	public List<CityAddressBookDepartMent> selectlist(CityAddressBookDepartMent cityAddressBookDepartMent);
}
