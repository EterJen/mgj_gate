package com.gwideal.core.cms.l2.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.gwideal.core.cms.l3.dao.ExpertsMapper;
import com.gwideal.core.cms.l4.entity.Experts;
import com.gwideal.mybatis.metautils.ResultInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class ExpertsService {

	@Autowired
	private ExpertsMapper expertsMapper;

	@Autowired
	private LogService logService;
	

	public int create(Experts experts){
		experts.setUpdatetime(new Date());
		int result = expertsMapper.insert(experts);
		logService.log(result, LogService.AuditType.新增, experts);
		return result;
	}
	
	public Experts read(BigDecimal id){
		return expertsMapper.selectByPrimaryKey(id);
	}

	public int update(Experts experts){
		Experts oldexperts = expertsMapper.selectByPrimaryKey(experts.getId());
		int result = expertsMapper.updateByPrimaryKey(experts);
		logService.log(result, LogService.AuditType.修改, oldexperts);
		return result;
	}
	
	public int delete(BigDecimal id){
		Experts oldexperts = expertsMapper.selectByPrimaryKey(id);
		int result = expertsMapper.deleteByPrimaryKey(id);
		logService.log(result, LogService.AuditType.删除, oldexperts);
		return result;
	}
	
	
	public ResultInfo<Experts> list(Experts queryBean){
		ResultInfo<Experts> result = new ResultInfo<Experts>();
		if(queryBean.getPaging().equals("Yes")){
			PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
	        List<Experts> plist = expertsMapper.list(queryBean);
	        PageInfo<Experts> pageInfo = new PageInfo<Experts>(plist);
	        result.setTotalRows(pageInfo.getTotal());
	        result.setBeanList(pageInfo.getList());
	        result.setResultType("success");
	        return result;
		}else{
			List<Experts> plist = expertsMapper.list(queryBean);
			result.setTotalRows((long)plist.size());
	        result.setBeanList(plist);
	        result.setResultType("success");
	        return result;
		}
	}

	public ResultInfo<Experts> batchDelete(Experts experts) {
		ResultInfo<Experts> result = new ResultInfo<>();
		List<BigDecimal> ids = experts.getIds();
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
