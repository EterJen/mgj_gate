package com.gwideal.core.cms.l2.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.gwideal.core.cms.l3.dao.MsgboardMapper;
import com.gwideal.core.cms.l4.entity.Msgboard;
import com.gwideal.mybatis.metautils.ResultInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class MsgboardService {

	@Autowired
	private MsgboardMapper msgboardMapper;

	@Autowired
	private LogService logService;
	

	public int create(Msgboard msgboard){
		msgboard.setIsdelete(0);
		msgboard.setCreatetime(new Date());
		int result = msgboardMapper.insert(msgboard);
		logService.log(result, LogService.AuditType.新增, msgboard);
		return result;
	}
	
	public Msgboard read(BigDecimal id){
		return msgboardMapper.selectByPrimaryKey(id);
	}

	public int update(Msgboard msgboard){
		Msgboard oldMsgboard = msgboardMapper.selectByPrimaryKey(msgboard.getId());
		int result = msgboardMapper.updateByPrimaryKey(msgboard);
		logService.log(result, LogService.AuditType.修改, oldMsgboard);
		return result;
	}
	
	public int delete(BigDecimal id){
		Msgboard oldMsgboard = msgboardMapper.selectByPrimaryKey(id);
		oldMsgboard.setIsdelete(1);
		int result = msgboardMapper.updateByPrimaryKeySelective(oldMsgboard);
		logService.log(result, LogService.AuditType.删除, oldMsgboard);
		return result;
	}
	
	
	public ResultInfo<Msgboard> list(Msgboard queryBean){
		ResultInfo<Msgboard> result = new ResultInfo<Msgboard>();
		if(queryBean.getPaging().equals("Yes")){
			PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
	        List<Msgboard> plist = msgboardMapper.list(queryBean);
	        PageInfo<Msgboard> pageInfo = new PageInfo<Msgboard>(plist);
	        result.setTotalRows(pageInfo.getTotal());
	        result.setBeanList(pageInfo.getList());
	        result.setResultType("success");
	        return result;
		}else{
			List<Msgboard> plist = msgboardMapper.list(queryBean);
			result.setTotalRows((long)plist.size());
	        result.setBeanList(plist);
	        result.setResultType("success");
	        return result;
		}
	}

	public ResultInfo<Msgboard> batchDelete(Msgboard msgboard) {
		ResultInfo<Msgboard> result = new ResultInfo<>();
		List<BigDecimal> ids = msgboard.getIds();
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
