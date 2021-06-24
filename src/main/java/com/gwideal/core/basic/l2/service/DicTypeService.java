package com.gwideal.core.basic.l2.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.gwideal.core.basic.l3.dao.DicModeMapper;
import com.gwideal.core.basic.l3.dao.DicTypeMapper;
import com.gwideal.core.basic.l4.entity.DicMode;
import com.gwideal.core.basic.l4.entity.DicType;
import com.gwideal.mybatis.metautils.ResultInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@Transactional
public class DicTypeService {

	@Autowired
	private DicTypeMapper dicTypeMapper;

	@Autowired
	private DicModeMapper dicModeMapper;
	

	public int create(DicType dicType){
		return dicTypeMapper.insert(dicType);
	}

	/**
	 * 创建物品分类下的dicType
	 * @param dicType
	 * @return
	 */
	public int createTypItem(DicType dicType){
		/*查询*/
		DicMode dicMode = new DicMode();
		dicMode.setFlag("1");
		dicMode.setDictype("typItem");
        DicMode dicMode1 = dicModeMapper.selectOne(dicMode);
        dicType.setDicModeId(dicMode1.getId());
        dicType.setOrderNum(dicTypeMapper.queryMaxNumber(dicType));
        return dicTypeMapper.insert(dicType);
	}

	
	public DicType read(BigDecimal id){
		return dicTypeMapper.selectByPrimaryKey(id);
	}

	public int update(DicType dicType){
		return dicTypeMapper.updateByPrimaryKey(dicType);
	}
	
	public int delete(BigDecimal id){
		return dicTypeMapper.deleteByPrimaryKey(id);
	}
	
	
	public ResultInfo<DicType> list(DicType queryBean){
		ResultInfo<DicType> result = new ResultInfo<DicType>();
		if(queryBean.getPaging().equals("Yes")){
			PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
	        List<DicType> plist = dicTypeMapper.list(queryBean);
	        PageInfo<DicType> pageInfo = new PageInfo<DicType>(plist);
	        result.setTotalRows(pageInfo.getTotal());
	        result.setBeanList(pageInfo.getList());
	        result.setResultType("success");
	        return result;
		}else{
			List<DicType> plist = dicTypeMapper.list(queryBean);
			result.setTotalRows((long)plist.size());
	        result.setBeanList(plist);
	        result.setResultType("success");
	        return result;
		}
	}

	public ResultInfo<DicType> queryByModeDicTypeList(DicType queryBean){
		ResultInfo<DicType> result = new ResultInfo<DicType>();
		if(queryBean.getPaging().equals("Yes")){
			PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
			List<DicType> plist = dicTypeMapper.queryByModeDicTypeList(queryBean);
			PageInfo<DicType> pageInfo = new PageInfo<DicType>(plist);
			result.setTotalRows(pageInfo.getTotal());
			result.setBeanList(pageInfo.getList());
			result.setResultType("success");
			return result;
		}else{
			List<DicType> plist = dicTypeMapper.queryByModeDicTypeList(queryBean);
			result.setTotalRows((long)plist.size());
			result.setBeanList(plist);
			result.setResultType("success");
			return result;
		}
	}

    public void delDicTypes(List<DicType> dicTypes, ResultInfo<String> result) {
		Integer res = null;
		try {
			res = dicTypeMapper.delDicTypes(dicTypes);
			if (res >= 1) {
				result.setResultType("success");
				result.setMessage("删除成功");
			} else {
				result.setResultType("fail");
				result.setMessage("删除失败");
			}
		} catch (Exception e) {
			e.printStackTrace();
			result.setResultType("error");
			result.setMessage(e.getMessage());
		} finally {
		}
    }

	public ResultInfo<DicType> getDicTypesByDicModeName(String modeName) {
		ResultInfo<DicType> resultInfo = new ResultInfo<>();
		List<DicType> types = dicTypeMapper.getDicTypesByDicModeName(modeName);
		resultInfo.setResultType("success");
		resultInfo.setBeanList(types);
		return resultInfo;
	}

	public void updateBatch(List<DicType> dicTypes, ResultInfo<DicType> result) {
		for (DicType dicType : dicTypes) {
			dicTypeMapper.updateByPrimaryKeySelective(dicType);
		}
		result.setResultType("success");
	}
}
