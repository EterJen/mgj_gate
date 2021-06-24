package com.gwideal.core.cms.l2.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.gwideal.core.basic.l2.service.CoreMpsModuleService;
import com.gwideal.core.basic.l2.service.RedisService;
import com.gwideal.core.basic.l4.entity.CoreMpsModule;
import com.gwideal.core.basic.l4.entity.CoreRole;
import com.gwideal.core.cms.l3.dao.AdministratorMapper;
import com.gwideal.core.cms.l4.entity.Administrator;
import com.gwideal.core.common.HttpClientTool;
import com.gwideal.core.common.SystemUtils;
import com.gwideal.core.jwt.AgentHost;
import com.gwideal.core.jwt.JwtUser;
import com.gwideal.core.util.SignUtils;
import com.gwideal.jyjcms.reqthird.jyjoa.I2service.OaSourcesService;
import com.gwideal.mybatis.metautils.ResultInfo;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class AdministratorService {

	@Autowired
	private AdministratorMapper administratorMapper;
	@Autowired
	private OaSourcesService thirdTrustedRequestService;
	@Autowired
	private AgentHost agentHosts;

	@Autowired
	HttpClientTool httpClientTool;

	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	private RedisService redisService;

	@Autowired
	private CoreMpsModuleService coreMpsModuleService;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private LogService logService;

	@Autowired
	private SignUtils signUtils;

	public void autoAdd(Administrator administrator){
		administrator.setIsdelete(0);
		administrator.setShowAble(BigDecimal.ONE);
		administrator.setCreatetime(new Date());
		administrator.setPassword("6B86B273FF34FCE19D6B804EFF5A3F5747ADA4EAA22F1D49C01E52DDB7875B4B");
		int result = administratorMapper.insert(administrator);
    }

	public int create(Administrator administrator){
		administrator.setIsdelete(0);
		administrator.setCreatetime(new Date());

		//签名
		Map<String, Object> postBean = new HashMap<>();
		postBean.put("data",administrator.toString().getBytes());


		/*String sign = signUtils.sign(postBean);
		administrator.setSignText(sign);*/

		String sign = signUtils.sign(postBean);
		administrator.setSignText(sign);

		int result = administratorMapper.insert(administrator);
		logService.log(result, LogService.AuditType.新增, administrator);
		return result;
	}
	
	public Administrator read(BigDecimal id){
		return administratorMapper.selectByPrimaryKey(id);
	}

	public int update(Administrator administrator) {
		Administrator oldAdministrator = administratorMapper.selectByPrimaryKey(administrator.getId());
		administrator.setModifytime(new Date());

		//签名
/*		String sign = signUtils.sign(administrator.toString().getBytes());
		administrator.setSignText(sign);*/

		Map<String, Object> postBean = new HashMap<>();
		postBean.put("data",administrator.toString());

		String sign = signUtils.sign(postBean);
        administrator.setSignText(sign);

		int result = administratorMapper.updateByPrimaryKey(administrator);
		logService.log(result, LogService.AuditType.修改, oldAdministrator);
		return result;
	}
	
	public int delete(BigDecimal id){
		Administrator oldAdministrator = administratorMapper.selectByPrimaryKey(id);
		oldAdministrator.setIsdelete(1);
		int result = administratorMapper.updateByPrimaryKeySelective(oldAdministrator);
		logService.log(result, LogService.AuditType.删除, oldAdministrator);
		return result;
	}
	
	
	public ResultInfo<Administrator> list(Administrator queryBean){
		ResultInfo<Administrator> result = new ResultInfo<Administrator>();
		if(queryBean.getPaging().equals("Yes")){
			PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
	        List<Administrator> plist = administratorMapper.list(queryBean);

			plist.forEach(administrator ->{
				if(StringUtils.isNotEmpty(administrator.getSignText())){
					//对比签名

					Map<String, Object> postBean = new HashMap<>();
					postBean.put("data",administrator.toString());
					postBean.put("signData",administrator.getSignText());
					if(!signUtils.verify(postBean)){
						administrator.setModify(true);
					}
				}
			});


	        PageInfo<Administrator> pageInfo = new PageInfo<Administrator>(plist);
	        result.setTotalRows(pageInfo.getTotal());
	        result.setBeanList(pageInfo.getList());
	        result.setResultType("success");
	        return result;
		}else{
			List<Administrator> plist = administratorMapper.list(queryBean);
			result.setTotalRows((long)plist.size());
	        result.setBeanList(plist);
	        result.setResultType("success");
	        return result;
		}
	}

	public Administrator findUserBySn(String sn) {
		final Administrator administrator = new Administrator();
		administrator.setSn(sn);
		final List<Administrator> list = administratorMapper.findUser(administrator);
		if (CollectionUtils.isNotEmpty(list)) {
			return list.get(0);
		}
		return null;
	}
	public ResultInfo<Administrator> findUser(Administrator queryBean) {
		ResultInfo<Administrator> result = new ResultInfo<Administrator>();
		if (queryBean.getPaging().equals("Yes")) {
			PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
			List<Administrator> plist = administratorMapper.findUser(queryBean);
			PageInfo<Administrator> pageInfo = new PageInfo<Administrator>(plist);
			List<Administrator> list = pageInfo.getList();

			result.setTotalRows(pageInfo.getTotal());
			result.setBeanList(list);
			result.setResultType("success");
			return result;
		} else {
			Administrator cu = ((JwtUser) (((UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication()).getPrincipal())).getCoreUser();
			List<Administrator> plist = administratorMapper.findUser(queryBean);
			result.setTotalRows((long) plist.size());
			result.setBeanList(plist);
			result.setResultType("success");
			return result;
		}
	}


	public Administrator akCorsUser(String agentHost, Map<String, String> parms) {
		Administrator coreUser = null;
		String corsUserNmae = "";

		String agentUrl = agentHosts.getAgentHosts().get(agentHost);
		try {
			corsUserNmae = httpClientTool.get(agentUrl, String.class, parms);
			System.out.println("akCors获取到的用户名：" + corsUserNmae);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (StringUtils.isNotBlank(corsUserNmae)) {
				final UserDetails userDetails = userDetailsService.loadUserByUsername(corsUserNmae);
				JwtUser userDetails1 = (JwtUser) userDetails;
				if ("success".equals(userDetails1.getStatus())) {
					System.out.println("用户有效");
					coreUser = userDetails1.getCoreUser();
				} else {
					System.out.println("用户名无效");
					coreUser = null;
				}
			}
			return coreUser;
		}
	}

	/*更新cacheUser即可更新对应缓存  所以一定不要直接将cacheUser作为方法的操作参数*/
	public Administrator cacheCompleteCopy(Administrator coreUser) {
		return redisService.selUser(coreUser);
	}


	/*更新cacheUser即可更新对应缓存  所以一定不要直接将cacheUser作为方法的操作参数*/
	public Administrator cacheNgCopy(Administrator coreUser) {
		return redisService.selUserNg(coreUser);
	}



	/*整合用户权限 组织关系*/
	public Administrator wrapUser(Administrator coreUser) {
		coreUser = read(coreUser.getId());


		List<CoreRole> userRoles = administratorMapper.queryUserRoles(coreUser);

	/*	for (CoreRole userRole : userRoles) {
			if (BigDecimal.ONE.equals(userRole.getId())) {
				coreUser.setAdmin(true);
			}
		}*/

		coreUser.setRoleList(userRoles);

		List<CoreMpsModule> list = coreMpsModuleService.listUserAuth(coreUser);


		userRoles.forEach(item -> {
			list.addAll(coreMpsModuleService.listRoleAuth(item));
		});
		/**
		 * 查询公文管理标记位为0的展示出来
		 */
		list.addAll(coreMpsModuleService.queryMpsmoduleByTitle());
		List<CoreMpsModule> userAuths = list.stream().collect(Collectors.collectingAndThen(Collectors.toCollection(() -> new TreeSet<>(Comparator.comparing(f -> f.getId()))), ArrayList::new));
		userAuths = SystemUtils.deepCopyList(userAuths);/*防止mybatis二级缓存*/


		List<CoreMpsModule> userAuthTree;

		if (!userAuths.isEmpty()) {
			userAuths.sort((ord1, ord2) -> ord1.getPkcode().compareTo(ord2.getPkcode()));
			userAuthTree = coreMpsModuleService.toTree(userAuths);
			coreUser.setHtfw(true);
		} else {
			userAuthTree = userAuths;
		}

		/*三员　涉密权限用户 3000角色*/
		coreUser.setSecurityUser();

		Set<String> authUriSet = new HashSet<>();
		for (CoreMpsModule coreMpsModule : userAuths) {
			String actionurl = coreMpsModule.getActionurl();
			String[] split = null;
			if (org.apache.commons.lang3.StringUtils.isNotBlank(actionurl)) {
				split = actionurl.split("\\|");
			}
			if (null != split) {
				for (String s : split) {
					authUriSet.add(s);
				}
			}
		}
		coreUser.setUserAuthUri(authUriSet);

		coreUser.setUserAuthTree(userAuthTree);

		Map<String, Object> postBean = new HashMap<>();
		postBean.put("name",coreUser.getDisplay());
		try {

			String jyjoaUserinfo = thirdTrustedRequestService.getJyjoaUserinfo(postBean);
			if (null != jyjoaUserinfo) {
				JSONObject jsonObject = JSON.parseObject(jyjoaUserinfo);
				coreUser.setZhenzhi((Boolean) jsonObject.get("zhenzhi"));
				coreUser.setFuzhi((Boolean) jsonObject.get("fuzhi"));
				coreUser.setBgsUser(jsonObject.getBoolean("bgsUser"));
				coreUser.setHasRoleNeiQin((Boolean) jsonObject.get("hasRoleNeiQin"));
				Object oaDeptId = jsonObject.get("oaDeptId");
				if (null != oaDeptId) {
					Integer id = (Integer) oaDeptId;
					coreUser.setOaDeptId(BigDecimal.valueOf(id));
				}
				Object oaDeptName = jsonObject.get("oaDeptName");
				if (null != oaDeptName) {
					coreUser.setOaDeptName((String) oaDeptName);
				}
			}
		} catch (Exception e) {
//			System.out.println(e.getCause());
		}

		/*coreUser.setAgentUser(coreUserMapper.findAgentUser(coreUser));
		coreUser.setByAgentUser(coreUserMapper.findByAgentUser(coreUser));*/
		return coreUser;
	}

	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public boolean checkPwd(String username, String password) throws Exception {
		boolean result = false;
		UsernamePasswordAuthenticationToken upToken = new UsernamePasswordAuthenticationToken(username, password);
		final Authentication authentication = authenticationManager.authenticate(upToken);
		result = true;
		return result;
	}

	public Administrator ngWrapUser(Administrator coreUser) {
		Administrator selUserComplete = redisService.selUser(coreUser);
		Administrator returnCacheUser = new Administrator();

		returnCacheUser.setId(selUserComplete.getId());
		returnCacheUser.setAdmin(selUserComplete.isAdmin());
		returnCacheUser.setHtfw(selUserComplete.isHtfw());
		returnCacheUser.setDisplay(selUserComplete.getDisplay());
		returnCacheUser.setName(selUserComplete.getName());
		returnCacheUser.setDepartment(selUserComplete.getDepartment());
		returnCacheUser.setUserAuthTree(selUserComplete.getUserAuthTree());
		returnCacheUser.setPassword(selUserComplete.getPassword());
		returnCacheUser.setZhenzhi(selUserComplete.isZhenzhi());
		returnCacheUser.setFuzhi(selUserComplete.isFuzhi());
		returnCacheUser.setHasRoleNeiQin(selUserComplete.isHasRoleNeiQin());
		returnCacheUser.setBgsUser(selUserComplete.isBgsUser());
		returnCacheUser.setOaDeptName(selUserComplete.getOaDeptName());
		returnCacheUser.setOaDeptId(selUserComplete.getOaDeptId());
		returnCacheUser.setSecurityUser(selUserComplete.isSecurityUser());
		return returnCacheUser;
	}


	public ResultInfo<Administrator> batchDelete(Administrator administrator) {
		ResultInfo<Administrator> result = new ResultInfo<>();
		List<BigDecimal> ids = administrator.getIds();
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
