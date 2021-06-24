package com.gwideal.core.cms.l2.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.gwideal.core.cms.l3.dao.PolicyMapper;
import com.gwideal.core.cms.l4.entity.Policy;
import com.gwideal.mybatis.metautils.ResultInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class PolicyService {

	@Autowired
	private PolicyMapper policyMapper;
	

	public int create(Policy policy){
		policy.setCreatetime(new Date());
		return policyMapper.insert(policy);
	}
	
	public Policy read(BigDecimal id){
		return policyMapper.selectByPrimaryKey(id);
	}

	public int update(Policy policy){
		return policyMapper.updateByPrimaryKey(policy);
	}
	
	public int delete(BigDecimal id){
		return policyMapper.deleteByPrimaryKey(id);
	}
	
	
	public ResultInfo<Policy> list(Policy queryBean){
		ResultInfo<Policy> result = new ResultInfo<Policy>();
		if(queryBean.getPaging().equals("Yes")){
			PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
	        List<Policy> plist = policyMapper.list(queryBean);
	        PageInfo<Policy> pageInfo = new PageInfo<Policy>(plist);
	        result.setTotalRows(pageInfo.getTotal());
	        result.setBeanList(pageInfo.getList());
	        result.setResultType("success");
	        return result;
		}else{
			List<Policy> plist = policyMapper.list(queryBean);
			result.setTotalRows((long)plist.size());
	        result.setBeanList(plist);
	        result.setResultType("success");
	        return result;
		}
	}

	public ResultInfo<Policy> batchDelete(Policy policy) {
		ResultInfo<Policy> result = new ResultInfo<>();
		List<BigDecimal> ids = policy.getIds();
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
