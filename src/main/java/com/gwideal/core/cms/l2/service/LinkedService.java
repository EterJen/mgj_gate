package com.gwideal.core.cms.l2.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.gwideal.core.cms.l3.dao.LinkedMapper;
import com.gwideal.core.cms.l4.entity.Linked;
import com.gwideal.mybatis.metautils.ResultInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class LinkedService {

	@Autowired
	private LinkedMapper linkedMapper;

	@Autowired
	private LogService logService;
	

	public int create(Linked linked){
		Linked link = new Linked();
		link.setIsdelete(0);
		linked.setCreatetime(new Date());
		linked.setIsdelete(0);
		linked.setSortid(linkedMapper.selectMaxSortId(link));
		int result = linkedMapper.insert(linked);
		logService.log(result, LogService.AuditType.新增, linked);
		return result;
	}
	
	public Linked read(BigDecimal id){
		return linkedMapper.selectByPrimaryKey(id);
	}

	public int update(Linked linked){
		Linked oldlinked = linkedMapper.selectByPrimaryKey(linked.getId());
		linked.setUpdatetime(new Date());
		int result = linkedMapper.updateByPrimaryKey(linked);
		logService.log(result, LogService.AuditType.修改, oldlinked);
		return result;
	}
	
	public int delete(BigDecimal id){
		Linked oldlinked = linkedMapper.selectByPrimaryKey(id);
		oldlinked.setIsdelete(1);
		int result = linkedMapper.updateByPrimaryKeySelective(oldlinked);
		logService.log(result, LogService.AuditType.删除, oldlinked);
		return result;
	}
	
	
	public ResultInfo<Linked> list(Linked queryBean){
		ResultInfo<Linked> result = new ResultInfo<Linked>();
		if(queryBean.getPaging().equals("Yes")){
			PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
	        List<Linked> plist = linkedMapper.list(queryBean);
	        PageInfo<Linked> pageInfo = new PageInfo<Linked>(plist);
	        result.setTotalRows(pageInfo.getTotal());
	        result.setBeanList(pageInfo.getList());
	        result.setResultType("success");
	        return result;
		}else{
			List<Linked> plist = linkedMapper.list(queryBean);
			result.setTotalRows((long)plist.size());
	        result.setBeanList(plist);
	        result.setResultType("success");
	        return result;
		}
	}

	public ResultInfo<Linked> batchDelete(Linked linked) {
		ResultInfo<Linked> result = new ResultInfo<>();
		List<BigDecimal> ids = linked.getIds();
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
