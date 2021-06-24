package com.gwideal.core.cms.l2.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.gwideal.core.basic.l2.service.RedisService;
import com.gwideal.core.cms.l3.dao.IndexUserIconMapper;
import com.gwideal.core.cms.l4.entity.Administrator;
import com.gwideal.core.cms.l4.entity.IndexUserIcon;
import com.gwideal.core.jwt.JwtUser;
import com.gwideal.mybatis.metautils.ResultInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tk.mybatis.mapper.entity.Example;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class IndexUserIconService {

	@Autowired
	private IndexUserIconMapper indexUserIconMapper;

	@Autowired
	private RedisService redisService;
	public int create(IndexUserIcon indexUserIcon){
		indexUserIcon.setUserid(indexUserIcon.getCurrentUser().getCoreUser().getId());
		Example example = new Example(IndexUserIcon.class);
		Example.Criteria criteria = example.createCriteria();
		criteria.andEqualTo("userid",indexUserIcon.getCurrentUser().getCoreUser().getId());
		indexUserIcon.setOrderno(new BigDecimal(indexUserIconMapper.selectCountByExample(example)+1));
		return indexUserIconMapper.insert(indexUserIcon);
	}
	
	public IndexUserIcon read(BigDecimal id){
		return indexUserIconMapper.selectByPrimaryKey(id);
	}

	public int update(IndexUserIcon indexUserIcon){
		return indexUserIconMapper.updateByPrimaryKey(indexUserIcon);
	}
	
	public int delete(BigDecimal id){
		int result = indexUserIconMapper.deleteByPrimaryKey(id);
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)currentUser;
		JwtUser currentUser1 =(JwtUser)token.getPrincipal();
		//更新其他排序
		IndexUserIcon indexUserIcon = new IndexUserIcon();
		indexUserIcon.setUserid(currentUser1.getCoreUser().getId());
		List<IndexUserIcon> select = indexUserIconMapper.select(indexUserIcon);
		int i=1;
		for (IndexUserIcon userIcon : select) {
			userIcon.setOrderno(new BigDecimal(i));
			indexUserIconMapper.updateByPrimaryKey(userIcon);
			i++;
		}
		return result;
	}
	
	
	public ResultInfo<IndexUserIcon> list(IndexUserIcon queryBean){
		ResultInfo<IndexUserIcon> result = new ResultInfo<IndexUserIcon>();
		Administrator administrator = redisService.selUserNg(queryBean.getCurrentUser().getCoreUser());
		if(queryBean.getPaging().equals("Yes")){
			PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
	        List<IndexUserIcon> plist = indexUserIconMapper.list(queryBean);
	        PageInfo<IndexUserIcon> pageInfo = new PageInfo<IndexUserIcon>(plist);
	        result.setTotalRows(pageInfo.getTotal());
	        result.setBeanList(pageInfo.getList());
	        result.setResultType("success");
	        return result;
		}else{
			List<IndexUserIcon> plist = indexUserIconMapper.list(queryBean);
			plist = plist.stream().filter(
					d -> {
						return (!"考勤".equals(d.getIndexIcon().getIconname())) ||
								(administrator.isHasRoleNeiQin() || administrator.isZhenzhi() || administrator.isFuzhi()) && ("考勤".equals(d.getIndexIcon().getIconname()));

					}
			).collect(Collectors.toList());
			result.setTotalRows((long)plist.size());
	        result.setBeanList(plist);
	        result.setResultType("success");
	        return result;
		}
	}

	public ResultInfo<IndexUserIcon> saveconfig(List<IndexUserIcon> indexUserIconList) {
		ResultInfo<IndexUserIcon> result = new ResultInfo<IndexUserIcon>();
		int i=1;
		for (IndexUserIcon indexUserIcon : indexUserIconList) {
			indexUserIcon.setOrderno(new BigDecimal(i));
			indexUserIconMapper.updateByPrimaryKey(indexUserIcon);
			i++;
		}
		result.setResultType("success");
		return result;
	}
}
