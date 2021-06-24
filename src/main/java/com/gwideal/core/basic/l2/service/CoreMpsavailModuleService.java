package com.gwideal.core.basic.l2.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.gwideal.core.basic.l3.dao.CoreMpsavailModuleMapper;
import com.gwideal.core.basic.l4.entity.CoreMpsavailModule;
import com.gwideal.mybatis.metautils.ResultInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;


@Service
@Transactional
public class CoreMpsavailModuleService {

	@Autowired
	private CoreMpsavailModuleMapper coreMpsavailModuleMapper;

	

	
	@Autowired
    private CoreRoleService coreRoleService;
	

	
	public int create(CoreMpsavailModule coreMpsavailModule){
		return coreMpsavailModuleMapper.insert(coreMpsavailModule);
	}
	
	public CoreMpsavailModule read(BigDecimal id){
		return coreMpsavailModuleMapper.selectByPrimaryKey(id);
	}

	public int update(CoreMpsavailModule coreMpsavailModule){
		return coreMpsavailModuleMapper.updateByPrimaryKey(coreMpsavailModule);
	}
	
	public int delete(String id){
		return coreMpsavailModuleMapper.deleteByPrimaryKey(id);
	}
	
	
	public ResultInfo<CoreMpsavailModule> list(CoreMpsavailModule queryBean){
		ResultInfo<CoreMpsavailModule> result = new ResultInfo<CoreMpsavailModule>();
		if(queryBean.getPaging().equals("Yes")){
			PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
	        List<CoreMpsavailModule> plist = coreMpsavailModuleMapper.list(queryBean);
	        PageInfo<CoreMpsavailModule> pageInfo = new PageInfo<CoreMpsavailModule>(plist);
	        result.setTotalRows(pageInfo.getTotal());
	        result.setBeanList(pageInfo.getList());
	        result.setResultType("success");
	        return result;
		}else{
			List<CoreMpsavailModule> plist = coreMpsavailModuleMapper.list(queryBean);
			result.setTotalRows((long)plist.size());
	        result.setBeanList(plist);
	        result.setResultType("success");
	        return result;
		}
	}

	public ResultInfo<CoreMpsavailModule> authorization(
			CoreMpsavailModule queryBean) {
		ResultInfo<CoreMpsavailModule> result = new ResultInfo<CoreMpsavailModule>();
        if (queryBean != null && queryBean.getElementid() != null) {
        	CoreMpsavailModule coreMpsavailModule = new CoreMpsavailModule();
        	coreMpsavailModule.setElementid(queryBean.getElementid());
        	coreMpsavailModule.setElementtype(queryBean.getElementtype());
            coreMpsavailModuleMapper.deletePermiss(coreMpsavailModule);
        }
        for (BigDecimal id : queryBean.getIds()) {
        	CoreMpsavailModule coreMpsavailModule = new CoreMpsavailModule();
        	coreMpsavailModule.setElementid(queryBean.getElementid());
        	coreMpsavailModule.setFlag("1");
        	coreMpsavailModule.setElementtype(queryBean.getElementtype());
        	coreMpsavailModule.setMpsmoduleId(id);
        	coreMpsavailModule.setModulecode(id);
        	coreMpsavailModuleMapper.insert(coreMpsavailModule);
					/*for(CoreUser u:userList){
						CoreMpsModule coreMpsModuleUser=new CoreMpsModule();
						coreMpsModuleUser.setElementtype("U");;
						coreMpsModuleUser.setMpsmoduleId(coreMpsModule.getId());
						coreMpsModuleUser.setElementid(u.getId());
						coreMpsModuleMapper.deletePermiss(coreMpsModuleUser);
						coreMpsModuleMapper.insertPermiss(coreMpsModuleUser);
					}*/
        }
        result.setResultType("success");
        result.setMessage("授权成功");
        return result;
	}

	
}
