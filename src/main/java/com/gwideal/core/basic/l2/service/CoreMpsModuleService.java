package com.gwideal.core.basic.l2.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.gwideal.core.basic.l3.dao.*;
import com.gwideal.core.basic.l4.entity.*;
import com.gwideal.core.cms.l3.dao.AdministratorMapper;
import com.gwideal.core.cms.l4.entity.Administrator;
import com.gwideal.core.common.CoreBaseEntity;
import com.gwideal.core.common.CoreBaseServeice;
import com.gwideal.core.jwt.JwtUser;
import com.gwideal.mybatis.metautils.ResultInfo;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import static java.util.stream.Collectors.toList;


@Service
@Transactional
public class CoreMpsModuleService extends CoreBaseServeice {

    @Autowired
    private CoreMpsModuleMapper coreMpsModuleMapper;

    @Autowired
    private AdministratorMapper administratorMapper;

    @Autowired
    private CoreRoleMapper coreRoleMapper;






    public int create(CoreMpsModule coreMpsModule) {
        return coreMpsModuleMapper.insert(coreMpsModule);
    }

    public CoreMpsModule read(BigDecimal id) {
        return coreMpsModuleMapper.selectByPrimaryKey(id);
    }

    public int update(CoreMpsModule coreMpsModule) {
        return coreMpsModuleMapper.updateByPrimaryKey(coreMpsModule);
    }

    public int delete(String id) {
        return coreMpsModuleMapper.deleteByPrimaryKey(id);
    }


    public ResultInfo<CoreMpsModule> list(CoreMpsModule queryBean) {
        ResultInfo<CoreMpsModule> result = new ResultInfo<CoreMpsModule>();
        if (queryBean.getPaging().equals("Yes")) {
            PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
            List<CoreMpsModule> plist = coreMpsModuleMapper.list(queryBean);
            PageInfo<CoreMpsModule> pageInfo = new PageInfo<CoreMpsModule>(plist);
            result.setTotalRows(pageInfo.getTotal());
            result.setBeanList(pageInfo.getList());
            result.setResultType("success");
            return result;
        } else {
            List<CoreMpsModule> plist = coreMpsModuleMapper.list(queryBean);
            result.setTotalRows((long) plist.size());
            result.setBeanList(plist);
            result.setResultType("success");
            return result;
        }
    }


    //树形菜单拼接
    public ResultInfo<CoreMpsModule> mpsModuleTree(
            CoreMpsModule coreMpsModule) {
        ResultInfo<CoreMpsModule> result = new ResultInfo<CoreMpsModule>();
        coreMpsModule.setPaging("No");
        List<CoreMpsModule> list = new ArrayList<CoreMpsModule>();
        Administrator coreUser=new Administrator();
        if("U".equals(coreMpsModule.getInitType())){
            coreUser.setId(coreMpsModule.getUserId());
            list = cacheAuthTree(coreUser);
        } else if (StringUtils.isNotBlank(coreMpsModule.getInitType())) {
            coreUser.setId(coreMpsModule.getUserId());
            coreUser.setInitType(coreMpsModule.getInitType());
            list =queryOnlyModule(coreUser);
        }else {
            list = coreMpsModuleMapper.list(coreMpsModule);
        }

        /*for(CoreMpsModule m:list){
			for(CoreMpsavailModule s:m.getMpsavailModule()){
				if(s.isChecked()){
					m.setChecked(s.isChecked());
					break;
				}
			}
		}*/
       /* Map<BigDecimal, CoreMpsModule> inputMap = new LinkedHashMap<BigDecimal, CoreMpsModule>();
        for (CoreMpsModule c : list) {
            inputMap.put(c.getId(), c);
        }
        Map<BigDecimal, CoreMpsModule> outputMap = new LinkedHashMap<BigDecimal, CoreMpsModule>();
        for (BigDecimal k : inputMap.keySet()) {
            CoreMpsModule temp = inputMap.get(k);
            if (temp.getParentid() == null || inputMap.get(temp.getParentid()) == null) {
                outputMap.put(k, temp);
            } else {
                CoreMpsModule parent = inputMap.get(temp.getParentid());
                //System.out.println(temp.getId()+temp.getParent());
                if (parent.getNodes() == null) {
                    List<CoreMpsModule> no = new ArrayList<CoreMpsModule>();
                    no.add(temp);
                    parent.setNodes(no);
                } else
                    parent.getNodes().add(temp);
            }
        }
        List<CoreMpsModule> departmentList = new ArrayList<CoreMpsModule>();
        for (BigDecimal cid : outputMap.keySet()) {
            CoreMpsModule rootTree = outputMap.get(cid);
            departmentList.add(rootTree);
        }*/
        List list1 = toTree(list);
        authTreeFilter(list1);
        result.setBeanList(list1);
        result.setResultType("success");
        result.setMessage("树形菜单请求成功");
        return result;
    }

    /**
     * 这个接口应对点击部门所拥有的权限
     * @param coreMpsModule
     * @return result
     */
    public ResultInfo<CoreMpsModule> queryHavePromiss(
            CoreMpsModule coreMpsModule) {
        ResultInfo<CoreMpsModule> result = new ResultInfo<CoreMpsModule>();
        coreMpsModule.setPaging("No");
        List<CoreMpsModule> list = new ArrayList<CoreMpsModule>();
        Administrator coreUser=new Administrator();
        if("U".equals(coreMpsModule.getInitType())){
            //coreUser.setId(coreMpsModule.getDepartment().getId());
            //list = cacheAuthTree(coreUser);
        } else if (StringUtils.isNotBlank(coreMpsModule.getInitType())) {
            //coreUser.setId(coreMpsModule.getDepartment().getId());
            coreUser.setInitType(coreMpsModule.getInitType());
            list = coreMpsModuleMapper.list(coreMpsModule);
        }else {
            list = coreMpsModuleMapper.list(coreMpsModule);
        }
        List list1 = toTree(list);
//        authTreeFilter(list1);
        result.setBeanList(list1);
        result.setResultType("success");
        result.setMessage("树形菜单请求成功");
        return result;
    }

    //生成关系树
    public ResultInfo<CoreMpsModule> mpsModuleCreatParent() {
        ResultInfo<CoreMpsModule> result = new ResultInfo<CoreMpsModule>();
        CoreMpsModule m = new CoreMpsModule();
        for (int i = 1; i <= 5; i++) {
            String entityId = "0" + i;
            m.setEntityId(entityId);
            m.setPageNo(1);
            m.setPageSize(2);
            m.setInitType("eq");
            m.setTotalRows(3);
            m.setPaging("000000");
            List<CoreMpsModule> listtree = coreMpsModuleMapper.listtree(m);
            CoreMpsModule parent = new CoreMpsModule();
            if (listtree != null && listtree.size() == 1) {
                parent = listtree.get(0);
                for (int a = 1; a <= 20; a++) {
                    entityId = "0" + i + "0" + a;
                    if (Integer.toString(a).length() == 2) {
                        entityId = "0" + i + a;
                    }
                    m.setEntityId(entityId);
                    m.setPageNo(1);
                    m.setPageSize(4);
                    m.setInitType("eq");
                    m.setTotalRows(5);
                    m.setPaging("0000");
                    List<CoreMpsModule> listSPartree = coreMpsModuleMapper.listtree(m);
                    if (listSPartree != null && listSPartree.size() == 1) {
                        CoreMpsModule Th = listSPartree.get(0);
                        Th.setParentid(parent.getId());
                        coreMpsModuleMapper.updateByPrimaryKey(Th);
        				 /*m.setInitType("noeq");
        				 List<CoreMpsModule> listThPartree = coreMpsModuleMapper.listtree(m);*/
                        for (int b = 1; b <= 20; b++) {
                            //for(CoreMpsModule x:listThPartree){
                            entityId = "0" + i + "0" + a + "0" + b;
                            if (Integer.toString(b).length() == 2) {
                                entityId = "0" + i + "0" + a + b;
                            }
                            m.setEntityId(entityId);
                            m.setPageNo(1);
                            m.setPageSize(6);
                            m.setInitType("eq");
                            m.setTotalRows(7);
                            m.setPaging("00");
                            List<CoreMpsModule> listTPartree = coreMpsModuleMapper.listtree(m);
                            if (listTPartree != null && listTPartree.size() > 0) {
                                CoreMpsModule Four = listTPartree.get(0);
                                Four.setParentid(Th.getId());
                                coreMpsModuleMapper.updateByPrimaryKey(Four);
                                m.setInitType("noeq");
                                List<CoreMpsModule> listThPartree = coreMpsModuleMapper.listtree(m);
                                for (CoreMpsModule x : listThPartree) {
                                    x.setParentid(Four.getId());
                                    coreMpsModuleMapper.updateByPrimaryKey(x);
                                }
                            }
                        }
                    }
                }
            }
        }

        result.setResultType("success");
        result.setMessage("批量生成父id成功");
        return result;
    }

    public ResultInfo<CoreMpsModule> savaMpsModulePermiss(CoreMpsModule queryBean) {
        ResultInfo<CoreMpsModule> result = new ResultInfo<CoreMpsModule>();
        List<Administrator> userList = new ArrayList<Administrator>();
				/*if("D".equals(queryBean.getElementtype())){
					CoreDepartment read = coreDepartmentService.read(queryBean.getElementid());
					 userList=read.getUsers();
				}else if("P".equals(queryBean.getElementtype())){
					userList=corePostService.queryUserByPid(queryBean.getElementid()).getBeanList();
				}else if("R".equals(queryBean.getElementtype())){
					userList=coreRoleService.queryUserByRid(queryBean.getElementid()).getBeanList();
				}else if("G".equals(queryBean.getElementtype())){
					userList=coreGroupService.queryUserByGroupid(queryBean.getElementid()).getBeanList();
				}*/
        if (queryBean != null && queryBean.getElementid() != null) {
            CoreMpsModule coreMpsModule = new CoreMpsModule();
            coreMpsModule.setElementid(queryBean.getElementid());
            coreMpsModule.setElementtype(queryBean.getElementtype());
            coreMpsModuleMapper.deletePermiss(coreMpsModule);

        }

        for (CoreMpsModule coreMpsModule : queryBean.getNodes()) {
            CoreMpsModule coreMpsModules = new CoreMpsModule();
            coreMpsModules.setElementid(queryBean.getElementid());
            ;
            coreMpsModules.setElementtype(queryBean.getElementtype());
            coreMpsModules.setMpsmoduleId(coreMpsModule.getId());
            coreMpsModuleMapper.insertPermiss(coreMpsModules);
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
        return result;
    }

    public ResultInfo<CoreMpsModule> queryUserListByMpsmoduleId(CoreMpsModule coreMpsModule, JwtUser currentUser) {
        ResultInfo<CoreMpsModule> result = new ResultInfo<CoreMpsModule>();
        List<CoreMpsModule> mpsModuleList = coreMpsModuleMapper.queryUserListByMpsmoduleId(coreMpsModule);
        List<Administrator> userList = new ArrayList<Administrator>();

        List<CoreRole> roleList = new ArrayList<CoreRole>();

        if (mpsModuleList != null && mpsModuleList.size() > 0) {
            for (CoreMpsModule mpsModule : mpsModuleList) {
                if ("U".equals(mpsModule.getElementtype())) {
                    Administrator user = administratorMapper.selectByPrimaryKey(mpsModule.getElementid());
                    if (!userList.contains(user)) {
                        userList.add(user);
                    }
                } else if ("R".equals(mpsModule.getElementtype())) {
                    CoreRole coreRole = coreRoleMapper.selectByPrimaryKey(mpsModule.getElementid());
                    if (!roleList.contains(coreRole)) {
                        roleList.add(coreRole);
                    }

                    List<Administrator> tempUserList = coreRoleMapper.queryUserByRid(mpsModule.getElementid());
                    if (!tempUserList.isEmpty() && !userList.isEmpty()) {
                        tempUserList.removeAll(userList);
                        userList.addAll(tempUserList);
                    }
                }/* else if ("D".equals(mpsModule.getElementtype())) {
                    CoreDepartment coreDepartment = coreDepartmentMapper.selectByPrimaryKey(mpsModule.getElementid());
                    if (!departmentList.contains(coreDepartment)) {
                        departmentList.add(coreDepartment);
                    }

                    List<CoreUser> tempUserList = coreDepartmentMapper.readUsersByDepartmentId(mpsModule.getElementid());
                    if (!tempUserList.isEmpty() && !userList.isEmpty()) {
                        tempUserList.removeAll(userList);
                        userList.addAll(tempUserList);
                    }
                } else if ("P".equals(mpsModule.getElementtype())) {
                    CorePost corePost = corePostMapper.selectByPrimaryKey(mpsModule.getElementid());
                    if (!postList.contains(corePost)) {
                        postList.add(corePost);
                    }

                    List<CoreUser> tempUserList = corePostMapper.queryUserByPid(mpsModule.getElementid());
                    if (!tempUserList.isEmpty() && !userList.isEmpty()) {
                        tempUserList.removeAll(userList);
                        userList.addAll(tempUserList);
                    }
                } else if ("G".equals(mpsModule.getElementtype())) {
                    CoreGroup coreGroup = coreGroupMapper.selectByPrimaryKey(mpsModule.getElementid());
                    if (!groupList.contains(coreGroup)) {
                        groupList.add(coreGroup);
                    }

                    List<CoreUser> tempUserList = coreGroupMapper.queryUserByGroupid(mpsModule.getElementid());
                    if (!tempUserList.isEmpty() && !userList.isEmpty()) {
                        tempUserList.removeAll(userList);
                        userList.addAll(tempUserList);
                    }
                }*/
            }
        }
        CoreMpsModule mpsmodule = new CoreMpsModule();
        mpsmodule.setUserList(userList);
        //mpsmodule.setDepartmentList(departmentList);
        //mpsmodule.setPostList(postList);
        mpsmodule.setRoleList(roleList);
        //mpsmodule.setGroupList(groupList);
        result.setBean(mpsmodule);
        result.setResultType("success");
        return result;
    }

    /*url访问 拦截用*/
//    @Cacheable(value = "userAuth", key = "'user_'+#coreUser.getId()")
    public List<CoreMpsModule> userAuthlists(Administrator coreUser) {
        System.out.println("userAuth savae user_"+coreUser.getId());
        List<CoreMpsModule> list = cacheAuthTree(coreUser);
        return list;
    }
//    @CacheEvict(value = "userAuth", key = "'user_'+#coreUser.getId()")
    public void userAuthlistsMvCh(Administrator coreUser) {
        System.out.println("从 [userAuth] 中清除 [" + coreUser.getDisplay() + "] 用户的缓存");
    }

//    @CacheEvict(value = "userAuth", allEntries = true)
    public void userAuthlistsMvChAll() {
        System.out.println("清空 [userAuth] 缓存 ");
    }


//    @Cacheable(value = "authTree", key = "'user_'+#coreUser.getId()")
    public List<CoreMpsModule> createUserAuthTree(Administrator coreUser) {
        List<CoreMpsModule> list = cacheAuthTree(coreUser);
//        System.out.println("authTree savae user_"+coreUser.getId());

        if (!list.isEmpty()) {
            return toTree(list);
        } else {
            return list;
        }
    }

//    @CacheEvict(value = "authTree", allEntries = true)
    public void createUserAuthTreeMvChAll() {
        System.out.println("清空 [authTree] 缓存 ");
    }

//    @CacheEvict(value = "authTree", key = "'user_'+#coreUser.getId()")
    public void createUserAuthTreeMvCh(Administrator coreUser) {
        System.out.println("从 [authTree] 中清除 [" + coreUser.getDisplay() + "] 用户的缓存");
    }


    public List<CoreMpsModule> cacheAuthTree(Administrator coreUser) {
       /* List<CoreDepartment> userDepts = administratorMapper.queryUserDeparts(coreUser);*/
        /*List<CorePost> userPosts = coreUserMapper.queryUserPosts(coreUser);*/
        List<CoreRole> userRoles = administratorMapper.queryUserRoles(coreUser);
//        List<CoreGroup> userGroups = coreUserMapper.queryUserGroups(coreUser);

        List<CoreMpsModule> list = listUserAuth(coreUser);

        /*userDepts.forEach(item -> {
            list.addAll(listDepartAuth(item));
        });*/
        /*userPosts.forEach(item -> {
            list.addAll(listPostAuth(item));
        });*/
        userRoles.forEach(item -> {
            list.addAll(listRoleAuth(item));
        });
       /* userGroups.forEach(item -> {
            list.addAll(listGroupAuth(item));
        });*/

        return list.stream().distinct().collect(toList());
    }

    public List<CoreMpsModule> listRoleAuth(CoreRole coreRole) {
        return listAuth("R", coreRole);
    }

    /*public List<CoreMpsModule> listDepartAuth(CoreDepartment department) {
        return listAuth("D", department);
    }

    public List<CoreMpsModule> listGroupAuth(CoreGroup coreGroup) {
        return listAuth("G", coreGroup);
    }

    public List<CoreMpsModule> listPostAuth(CorePost corePost) {
        return listAuth("P", corePost);
    }*/

    public List<CoreMpsModule> listUserAuth(Administrator coreUser) {
        return listAuth("U", coreUser);
    }

    public List<CoreMpsModule> listAuth(String r, CoreBaseEntity coreBaseEntity) {
        CoreMpsModule coreMpsModule = new CoreMpsModule();

        coreMpsModule.setPaging("No");
        /*CoreDepartment coreDepartment = new CoreDepartment();
        coreDepartment.setId(coreBaseEntity.getId());
        coreMpsModule.setDepartment(coreDepartment);*/
        coreMpsModule.setId(coreBaseEntity.getId());
        coreMpsModule.setInitType(r);
        coreMpsModule.setQueryListType("queryHavePermiss");

        List<CoreMpsModule> list = coreMpsModuleMapper.list(coreMpsModule);
        return list;
    }


    public List<CoreMpsModule> queryMpsmoduleByTitle() {
        CoreMpsModule coreMpsModule = new CoreMpsModule();
        coreMpsModule.setFlag("2");
        return coreMpsModuleMapper.select(coreMpsModule);
    }

    public List<CoreMpsModule> queryOnlyModule(Administrator coreUser) {

        List<CoreRole> userRoles = administratorMapper.queryUserRoles(coreUser);

        List<CoreMpsModule> list = new ArrayList<CoreMpsModule>();

        if("R".equals(coreUser.getInitType())){
            userRoles.forEach(item -> {
                list.addAll(listRoleAuth(item));
            });
        }
        return list.stream().distinct().collect(toList());
    }
}
