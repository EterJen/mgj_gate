package com.gwideal.core.cms.l2.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.gwideal.core.cms.l3.dao.JyphonebookMapper;
import com.gwideal.core.cms.l4.entity.Jyphonebook;
import com.gwideal.mybatis.metautils.ResultInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class JyphonebookService {

	@Autowired
	private JyphonebookMapper jyphonebookMapper;

	@Autowired
	private LogService logService;
	

	public int create(Jyphonebook jyphonebook){
		jyphonebook.setIsdelete(0);
		jyphonebook.setUpdatetime(new Date());
		int result = jyphonebookMapper.insert(jyphonebook);
		logService.log(result, LogService.AuditType.新增, jyphonebook);
		return result;
	}
	
	public Jyphonebook read(BigDecimal id){
		return jyphonebookMapper.selectByPrimaryKey(id);
	}

	public int update(Jyphonebook jyphonebook){
		Jyphonebook oldJyphonebook = jyphonebookMapper.selectByPrimaryKey(jyphonebook.getId());
		int result = jyphonebookMapper.updateByPrimaryKey(jyphonebook);
		logService.log(result, LogService.AuditType.修改, oldJyphonebook);
		return result;
	}
	
	public int delete(BigDecimal id){
		Jyphonebook oldJyphonebook = jyphonebookMapper.selectByPrimaryKey(id);
		oldJyphonebook.setIsdelete(1);
		int result = jyphonebookMapper.updateByPrimaryKeySelective(oldJyphonebook);
		logService.log(result, LogService.AuditType.删除, oldJyphonebook);
		return result;
	}
	
	
	public ResultInfo<Jyphonebook> list(Jyphonebook queryBean){
		ResultInfo<Jyphonebook> result = new ResultInfo<Jyphonebook>();
		if(queryBean.getPaging().equals("Yes")){
			PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
	        List<Jyphonebook> plist = jyphonebookMapper.list(queryBean);
	        PageInfo<Jyphonebook> pageInfo = new PageInfo<Jyphonebook>(plist);
	        result.setTotalRows(pageInfo.getTotal());
	        result.setBeanList(pageInfo.getList());
	        result.setResultType("success");
	        return result;
		}else{
			List<Jyphonebook> plist = jyphonebookMapper.list(queryBean);
			result.setTotalRows((long)plist.size());
	        result.setBeanList(plist);
	        result.setResultType("success");
	        return result;
		}
	}

	public ResultInfo<Jyphonebook> batchDelete(Jyphonebook jyphonebook) {
		ResultInfo<Jyphonebook> result = new ResultInfo<>();
		List<BigDecimal> ids = jyphonebook.getIds();
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
