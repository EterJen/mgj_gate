package com.gwideal.core.cms.l2.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.gwideal.core.cms.l3.dao.ShphonebookMapper;
import com.gwideal.core.cms.l4.entity.Shphonebook;
import com.gwideal.mybatis.metautils.ResultInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class ShphonebookService {

	@Autowired
	private ShphonebookMapper shphonebookMapper;
	@Autowired
	private LogService logService;
	

	public int create(Shphonebook shphonebook){
		shphonebook.setIsdelete(0);
		shphonebook.setUpdatetime(new Date());
		int result = shphonebookMapper.insert(shphonebook);
		logService.log(result, LogService.AuditType.新增, shphonebook);
		return result;
	}
	
	public Shphonebook read(BigDecimal id){
		return shphonebookMapper.selectByPrimaryKey(id);
	}

	public int update(Shphonebook shphonebook){
		Shphonebook oldshphonebook = shphonebookMapper.selectByPrimaryKey(shphonebook.getId());
		int result = shphonebookMapper.updateByPrimaryKey(shphonebook);
		logService.log(result, LogService.AuditType.修改, oldshphonebook);
		return result;
	}
	
	public int delete(BigDecimal id){
		Shphonebook oldshphonebook = shphonebookMapper.selectByPrimaryKey(id);
		oldshphonebook.setIsdelete(1);
		int result = shphonebookMapper.updateByPrimaryKeySelective(oldshphonebook);
		logService.log(result, LogService.AuditType.删除, oldshphonebook);
		return result;
	}
	
	
	public ResultInfo<Shphonebook> list(Shphonebook queryBean){
		ResultInfo<Shphonebook> result = new ResultInfo<Shphonebook>();
		if(queryBean.getPaging().equals("Yes")){
			PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
	        List<Shphonebook> plist = shphonebookMapper.list(queryBean);
	        PageInfo<Shphonebook> pageInfo = new PageInfo<Shphonebook>(plist);
	        result.setTotalRows(pageInfo.getTotal());
	        result.setBeanList(pageInfo.getList());
	        result.setResultType("success");
	        return result;
		}else{
			List<Shphonebook> plist = shphonebookMapper.list(queryBean);
			result.setTotalRows((long)plist.size());
	        result.setBeanList(plist);
	        result.setResultType("success");
	        return result;
		}
	}

	public ResultInfo<Shphonebook> batchDelete(Shphonebook shphonebook) {
		ResultInfo<Shphonebook> result = new ResultInfo<>();
		List<BigDecimal> ids = shphonebook.getIds();
		int i=0;
		if (ids!=null&& ids.size()>0) {
			for (BigDecimal id : ids) {
				i+=delete(id);
			}
		}
		result.setResultType("success");
		result.setMessage("批量删除成功，删除"+i+"条记录！");
		return result;
	}
		
}
