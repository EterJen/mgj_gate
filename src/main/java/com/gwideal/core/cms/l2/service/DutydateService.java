package com.gwideal.core.cms.l2.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.gwideal.core.cms.l3.dao.DutydateMapper;
import com.gwideal.core.cms.l4.entity.Dutydate;
import com.gwideal.mybatis.metautils.ResultInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class DutydateService {

	@Autowired
	private DutydateMapper dutydateMapper;

	@Autowired
	private LogService logService;
	

	public int create(Dutydate dutydate){
		dutydate.setUpdatetime(new Date());
		return dutydateMapper.insert(dutydate);
	}
	
	public Dutydate read(BigDecimal id){
		return dutydateMapper.selectByPrimaryKey(id);
	}

	public int update(Dutydate dutydate){
		return dutydateMapper.updateByPrimaryKey(dutydate);
	}
	
	public int delete(BigDecimal id){
		return dutydateMapper.deleteByPrimaryKey(id);
	}
	
	
	public ResultInfo<Dutydate> list(Dutydate queryBean){
		ResultInfo<Dutydate> result = new ResultInfo<Dutydate>();
		if(queryBean.getPaging().equals("Yes")){
			PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
	        List<Dutydate> plist = dutydateMapper.list(queryBean);
	        PageInfo<Dutydate> pageInfo = new PageInfo<Dutydate>(plist);
	        result.setTotalRows(pageInfo.getTotal());
	        result.setBeanList(pageInfo.getList());
	        result.setResultType("success");
	        return result;
		}else{
			List<Dutydate> plist = dutydateMapper.list(queryBean);
			result.setTotalRows((long)plist.size());
	        result.setBeanList(plist);
	        result.setResultType("success");
	        return result;
		}
	}

	public ResultInfo<Dutydate> batchDelete(Dutydate dutydate) {
		ResultInfo<Dutydate> result = new ResultInfo<>();
		List<BigDecimal> ids = dutydate.getIds();
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
