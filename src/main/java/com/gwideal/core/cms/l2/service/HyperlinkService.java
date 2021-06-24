package com.gwideal.core.cms.l2.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.gwideal.core.cms.l3.dao.HyperlinkMapper;
import com.gwideal.core.cms.l4.entity.Hyperlink;
import com.gwideal.mybatis.metautils.ResultInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tk.mybatis.mapper.entity.Example;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class HyperlinkService {

	@Autowired
	private HyperlinkMapper hyperlinkMapper;

	@Autowired
	private LogService logService;
	

	public int create(Hyperlink hyperlink){
		Example example = new Example(Hyperlink.class);
		Example.Criteria criteria = example.createCriteria();
		criteria.andEqualTo("isdelete",0);
		hyperlink.setCreatetime(new Date());
		hyperlink.setIsdelete(0);
		hyperlink.setSortid(new BigDecimal(hyperlinkMapper.selectCountByExample(example)+1));
		int result = hyperlinkMapper.insert(hyperlink);
		logService.log(result, LogService.AuditType.新增, hyperlink);
		return result;
	}
	
	public Hyperlink read(BigDecimal id){
		return hyperlinkMapper.selectByPrimaryKey(id);
	}

	public int update(Hyperlink hyperlink){
		Hyperlink oldHyperlink = hyperlinkMapper.selectByPrimaryKey(hyperlink.getId());
		int result = hyperlinkMapper.updateByPrimaryKey(hyperlink);
		logService.log(result, LogService.AuditType.修改, oldHyperlink);
		return result;
	}
	
	public int delete(BigDecimal id){
		Hyperlink hyperlink = hyperlinkMapper.selectByPrimaryKey(id);
		hyperlink.setIsdelete(1);
		int result = hyperlinkMapper.updateByPrimaryKeySelective(hyperlink);
		logService.log(result, LogService.AuditType.删除, hyperlink);
		return result;
	}
	
	
	public ResultInfo<Hyperlink> list(Hyperlink queryBean){
		ResultInfo<Hyperlink> result = new ResultInfo<Hyperlink>();
		if(queryBean.getPaging().equals("Yes")){
			PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
	        List<Hyperlink> plist = hyperlinkMapper.list(queryBean);
	        PageInfo<Hyperlink> pageInfo = new PageInfo<Hyperlink>(plist);
	        result.setTotalRows(pageInfo.getTotal());
	        result.setBeanList(pageInfo.getList());
	        result.setResultType("success");
	        return result;
		}else{
			List<Hyperlink> plist = hyperlinkMapper.list(queryBean);
			result.setTotalRows((long)plist.size());
	        result.setBeanList(plist);
	        result.setResultType("success");
	        return result;
		}
	}

	public ResultInfo<Hyperlink> batchDelete(Hyperlink hyperlink) {
		ResultInfo<Hyperlink> result = new ResultInfo<>();
		List<BigDecimal> ids = hyperlink.getIds();
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
