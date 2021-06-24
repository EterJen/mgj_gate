package com.gwideal.core.cms.l2.service;

import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.gwideal.core.cms.l3.dao.EngineMapper;
import com.gwideal.core.cms.l3.dao.ExpertsMapper;
import com.gwideal.core.cms.l3.dao.ExpertstypeMapper;
import com.gwideal.core.cms.l4.entity.Engine;
import com.gwideal.core.cms.l4.entity.Experts;
import com.gwideal.core.cms.l4.entity.Expertstype;
import com.gwideal.mybatis.metautils.ResultInfo;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class EngineService {

	@Autowired
	private EngineMapper engineMapper;

	@Autowired
	private ExpertstypeMapper expertstypeMapper;

	@Autowired
	private ExpertsMapper expertsMapper;
	

	public int create(Engine engine){
		engine.setCreatetime(new Date());
		engine.setExpertsid(JSON.toJSON(engine.getExpertsMap()).toString());
		return engineMapper.insert(engine);
	}
	
	public Engine read(BigDecimal id){
		Engine engine = engineMapper.selectByPrimaryKey(id);
		initExpertsMap(engine);
		return engine;
	}

	public int update(Engine engine){
		engine.setExpertsid(JSON.toJSON(engine.getExpertsMap()).toString());
		return engineMapper.updateByPrimaryKey(engine);
	}
	
	public int delete(BigDecimal id){
		return engineMapper.deleteByPrimaryKey(id);
	}
	
	
	public ResultInfo<Engine> list(Engine queryBean){
		ResultInfo<Engine> result = new ResultInfo<Engine>();
		if(queryBean.getPaging().equals("Yes")){
			PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
	        List<Engine> plist = engineMapper.list(queryBean);
			for (Engine engine : plist) {
				initExpertsMap(engine);
			}
	        PageInfo<Engine> pageInfo = new PageInfo<Engine>(plist);
	        result.setTotalRows(pageInfo.getTotal());
	        result.setBeanList(pageInfo.getList());
	        result.setResultType("success");
	        return result;
		}else{
			List<Engine> plist = engineMapper.list(queryBean);
			for (Engine engine : plist) {
				initExpertsMap(engine);
			}
			result.setTotalRows((long)plist.size());
	        result.setBeanList(plist);
	        result.setResultType("success");
	        return result;
		}
	}

    public ResultInfo<Engine> extract(Engine engine) {
		ResultInfo<Engine> result = new ResultInfo<Engine>();
		List<Expertstype> expertstypeList = engine.getExpertstypeList();
		Map<String,List<Experts>> map = new HashMap<>();
		for (Expertstype expertstype : expertstypeList) {
			/*Integer pageNo = expertstype.getPageNo();*/
			//查询随机抽取专家人数
			if (expertstype.getPageNo()!=null && expertstype.getPageNo()>0) {
				List<Experts> list=expertsMapper.extract(expertstype);
				map.put(expertstype.getTypename(),list);
				//expertstype.setExpertsList(list);
			}
		}
		Engine engined= new Engine();
		engined.setDisplayname(engine.getDisplayname());
		engined.setExpertsMap(map);
		//engined.setExpertsid(JSON.toJSON(map).toString());
		create(engined);
		result.setBeanId(engined.getId());
		result.setResultType("success");
		return result;
    }

	public void initExpertsMap(Engine engine){
		if (StringUtils.isNotBlank(engine.getExpertsid())) {
			Map<String,List<Experts>> map=JSON.parseObject(engine.getExpertsid(), Map.class);
			engine.setExpertsMap(map);
			//Map<String,List<Experts>> map = (Map<String,List<Experts>>)engine.getExpertsid();
			//List<Expertstype> expertstypeList=JSONArray.parseArray(engine.getExpertsid(), Expertstype.class);
			//engine.setExpertstypeList(expertstypeList);
		}
	}

	public ResultInfo<Engine> batchDelete(Engine engine) {
		ResultInfo<Engine> result = new ResultInfo<>();
		List<BigDecimal> ids = engine.getIds();
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
