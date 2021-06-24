package com.gwideal.core.basic.l2.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

import com.gwideal.core.basic.l3.dao.CoreRoleMapper;
import com.gwideal.core.basic.l4.entity.CoreRole;

import com.gwideal.core.cms.l2.service.LogService;
import com.gwideal.core.cms.l4.entity.Administrator;
import com.gwideal.mybatis.metautils.ResultInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class CoreRoleService {

	@Autowired
	private CoreRoleMapper coreRoleMapper;

	@Autowired
	private LogService logService;

	public int create(CoreRole coreRole) {
		coreRole.setFlag(new BigDecimal(1));
		coreRole.setClickrate(new BigDecimal(0));
		int result = coreRoleMapper.insert(coreRole);
		logService.log(result, LogService.AuditType.新增, coreRole); // 审计动作
		return result;
	}

	public CoreRole read(BigDecimal id) {
		CoreRole coreRole = coreRoleMapper.selectByPrimaryKey(id);

		// coreRole的点击数加1
		BigDecimal clickRate = coreRole.getClickrate();
		if (clickRate == null)
			clickRate = new BigDecimal(1);
		else
			clickRate = clickRate.add(new BigDecimal(1));
		coreRole.setClickrate(clickRate);
		coreRoleMapper.updateByPrimaryKey(coreRole);

		if (coreRole != null) {
			coreRole.setUsers(coreRoleMapper.queryUserByRid(coreRole.getId()));
		}
		return coreRole;
	}

	public int update(CoreRole coreRole) {
		CoreRole previous = coreRoleMapper.selectByPrimaryKey(coreRole.getId());
		int result = coreRoleMapper.updateByPrimaryKey(coreRole);
		logService.log(result, LogService.AuditType.修改, previous); // 审计动作
		return result;
	}

	public int delete(BigDecimal id) {
		CoreRole coreRole = coreRoleMapper.selectByPrimaryKey(id);
		coreRole.setFlag(new BigDecimal(-1));
		int result = coreRoleMapper.updateByPrimaryKey(coreRole);
		logService.log(result, LogService.AuditType.删除, coreRole); // 审计动作
		return result;
	}

	public ResultInfo<CoreRole> list(CoreRole queryBean) {
		ResultInfo<CoreRole> result = new ResultInfo<CoreRole>();
		if (queryBean.getPaging().equals("Yes")) {
			PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
			List<CoreRole> plist = coreRoleMapper.list(queryBean);
			PageInfo<CoreRole> pageInfo = new PageInfo<CoreRole>(plist);
			result.setTotalRows(pageInfo.getTotal());
			result.setBeanList(pageInfo.getList());
			result.setResultType("success");
			return result;
		} else {
			List<CoreRole> plist = coreRoleMapper.list(queryBean);
			result.setTotalRows((long) plist.size());
			result.setBeanList(plist);
			result.setResultType("success");
			return result;
		}
	}
	
	public ResultInfo<CoreRole> listByClickrate(CoreRole queryBean) {
		ResultInfo<CoreRole> result = new ResultInfo<CoreRole>();
		if (queryBean.getPaging().equals("Yes")) {
			PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
			List<CoreRole> plist = coreRoleMapper.listByClickrate(queryBean);
			PageInfo<CoreRole> pageInfo = new PageInfo<CoreRole>(plist);
			result.setTotalRows(pageInfo.getTotal());
			result.setBeanList(pageInfo.getList());
			result.setResultType("success");
			return result;
		} else {
			List<CoreRole> plist = coreRoleMapper.listByClickrate(queryBean);
			result.setTotalRows((long) plist.size());
			result.setBeanList(plist);
			result.setResultType("success");
			return result;
		}
	}

	public ResultInfo<Administrator> queryUserByRid(BigDecimal id) {
		ResultInfo<Administrator> result = new ResultInfo<Administrator>();
		List<Administrator> users = coreRoleMapper.queryUserByRid(id);
		result.setTotalRows((long) users.size());
		result.setBeanList(users);
		result.setResultType("success");
		return result;
	}

	public ResultInfo<CoreRole> saveRoleUser(CoreRole coreRole) {
		ResultInfo<CoreRole> result = new ResultInfo<CoreRole>();
		BigDecimal maxUserOrderNumByRoleId = coreRoleMapper.queryMaxUserOrderNumByRoleId(coreRole.getId());
		List<Administrator> coreUserList = new ArrayList<Administrator>();
		if (coreRole.getIds() != null) {
			for (int i = 0; i < coreRole.getIds().size(); i++) {
				Administrator u = new Administrator();
				u.setId(coreRole.getIds().get(i));
				BigDecimal bigDecimal = new BigDecimal(i);
				u.setOrderNum(
						bigDecimal.add(maxUserOrderNumByRoleId == null ? new BigDecimal(1) : maxUserOrderNumByRoleId));
				coreUserList.add(u);
			}
		}
		coreRole.setUsers(coreUserList);
		int saveRoleUser = coreRoleMapper.saveRoleUser(coreRole);
		if (saveRoleUser > 0) {
			result.setResultType("success");
			result.setMessage("添加成功");
			logService.log(result, LogService.AuditType.新增关联, coreRole); // 审计动作
		} else {
			result.setResultType("fail");
			result.setMessage("添加失败");
		}
		return result;
	}

	public ResultInfo<CoreRole> deleteRoleUser(CoreRole coreRole) {
		ResultInfo<CoreRole> result = new ResultInfo<CoreRole>();
		int saveRoleUser = coreRoleMapper.deleteRoleUser(coreRole);
		if (saveRoleUser > 0) {
			result.setResultType("success");
			result.setMessage("删除成功");
			logService.log(result, LogService.AuditType.删除关联, coreRole); // 审计动作
		} else {
			result.setResultType("fail");
			result.setMessage("删除失败");
		}
		return result;
	}

	public ResultInfo<CoreRole> searchRoleByName(CoreRole queryBean) {
		ResultInfo<CoreRole> result = new ResultInfo<CoreRole>();
		List<CoreRole> plist = coreRoleMapper.searchRoleByName(queryBean);
		result.setTotalRows((long) plist.size());
		result.setBeanList(plist);
		result.setResultType("success");
		return result;
	}
	
	public ResultInfo<CoreRole> searchRoleByNameLike(CoreRole queryBean) {
		ResultInfo<CoreRole> result = new ResultInfo<CoreRole>();
		List<CoreRole> plist = coreRoleMapper.searchRoleByNameLike(queryBean);
		result.setTotalRows((long) plist.size());
		result.setBeanList(plist);
		result.setResultType("success");
		return result;
	}

	public List<Administrator> notExistsUsers(BigDecimal roleId) {
		return coreRoleMapper.notExistsUsers(roleId);
	}
}
