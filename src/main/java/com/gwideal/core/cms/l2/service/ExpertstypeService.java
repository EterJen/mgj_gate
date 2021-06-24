package com.gwideal.core.cms.l2.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.gwideal.core.cms.l3.dao.ExpertstypeMapper;
import com.gwideal.core.cms.l4.entity.Expertstype;
import com.gwideal.mybatis.metautils.ResultInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class ExpertstypeService {

	@Autowired
	private ExpertstypeMapper expertstypeMapper;

	@Autowired
	private LogService logService;
	

	public int create(Expertstype expertstype){
		expertstype.setIsdelete(0);
		expertstype.setUpdatetime(new Date());
		int result = expertstypeMapper.insert(expertstype);
		logService.log(result, LogService.AuditType.新增, expertstype);
		return result;
	}
	
	public Expertstype read(BigDecimal id){
		return expertstypeMapper.selectByPrimaryKey(id);
	}

	public int update(Expertstype expertstype){
		Expertstype oldexpertstype = expertstypeMapper.selectByPrimaryKey(expertstype.getId());
		int result = expertstypeMapper.updateByPrimaryKey(expertstype);
		logService.log(result, LogService.AuditType.修改, oldexpertstype);
		return result;
	}
	
	public int delete(BigDecimal id){
		Expertstype oldexpertstype = expertstypeMapper.selectByPrimaryKey(id);
		oldexpertstype.setIsdelete(1);
		int result = expertstypeMapper.updateByPrimaryKeySelective(oldexpertstype);
		logService.log(result, LogService.AuditType.删除, oldexpertstype);
		return result;
	}
	
	
	public ResultInfo<Expertstype> list(Expertstype queryBean){
		ResultInfo<Expertstype> result = new ResultInfo<Expertstype>();
		if(queryBean.getPaging().equals("Yes")){
			PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
	        List<Expertstype> plist = expertstypeMapper.list(queryBean);
	        PageInfo<Expertstype> pageInfo = new PageInfo<Expertstype>(plist);
	        result.setTotalRows(pageInfo.getTotal());
	        result.setBeanList(pageInfo.getList());
	        result.setResultType("success");
	        return result;
		}else{
			List<Expertstype> plist = expertstypeMapper.list(queryBean);
			result.setTotalRows((long)plist.size());
	        result.setBeanList(plist);
	        result.setResultType("success");
	        return result;
		}
	}

	public ResultInfo<Expertstype> batchDelete(Expertstype expertstype) {
		ResultInfo<Expertstype> result = new ResultInfo<>();
		List<BigDecimal> ids = expertstype.getIds();
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
