package com.gwideal.core.basic.l2.service;


import com.gwideal.core.basic.ehcache.EhcacheUtil;
import com.gwideal.core.basic.l3.dao.DicModeMapper;
import com.gwideal.core.basic.l4.entity.DicMode;
import com.gwideal.core.basic.l4.entity.DicType;
import com.gwideal.core.cms.l2.service.AdministratorService;
import com.gwideal.core.cms.l4.entity.Administrator;
import com.gwideal.core.visual.VisualController;
import com.gwideal.mybatis.metautils.ResultInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@Service
@ConfigurationProperties(prefix = "sysInitVal.forRedisService")
public class RedisService {

    @Resource
    private RedisTemplate<String, Object> redisTemplate;

    @Value("${workflow.processDefDir}")
    String dirStr;

    @Value("${workflow.linuxProcessDefDir}")
    String linuxDirStr;

    /*@Value("${ftp_address}")
    String ftpAddress;

    @Value("${ftp_port}")
    int ftpPort;

    @Value("${ftp_username}")
    String ftpUsername;

    @Value("${ftp_password}")
    String ftpPassword;

    @Value("${ftp_basepath}")
    String ftpBasepath;*/

    @Autowired
    EhcacheUtil redisMapper;


    @Autowired
    private RedisServiceHandle redisServiceHandle;

    @Autowired
    private DicModeMapper dicModeMapper;
    @Autowired
    private AdministratorService administratorService;


    @Autowired
    VisualController visualController;
    public void test() {
        /*CoreUser user = coreUserService.cacheCompleteCopy(new CoreUser(new BigDecimal(8)));
        redisMapper.set("user", "user", user);
        Object useer1 = redisMapper.get("user","users:user192");
        long user1 = redisMapper.getExpire("user","user");
        if (useer1 instanceof CoreUser) {
            CoreUser useer11 = (CoreUser) useer1;
            useer11.setName("和");
        }*/
    }

    //<editor-fold desc="用户信息缓存">
    /*用户完整信息缓存操作,服务器端使用： 组织机构  权限树 基本信息*/
    @Cacheable(value = "user", key = "'complete:'+ #coreUser.getId()")
    public Administrator selUser(Administrator coreUser) {
        return administratorService.wrapUser(coreUser);
    }

    @CacheEvict(value = "user", key = "'complete:'+ #coreUser.getId()")
    public void delUser(Administrator coreUser) {
        System.out.println("从 [user:complete] 库中清除 [" + coreUser.getId() + "] 的缓存");
    }


    /*供前后端信息交互 只传递必要、轻量、安全数据*/
    @Cacheable(value = "user", key = "'ng:'+ #coreUser.getId()")
    public Administrator selUserNg(Administrator coreUser) {
        return administratorService.ngWrapUser(coreUser);
    }

    @CacheEvict(value = "user", key = "'ng:'+ #coreUser.getId()")
    public void delUserNg(Administrator coreUser) {
        System.out.println("从 [user:ng] 库中清除 [" + coreUser.getId() + "] 的缓存");
    }


    @CacheEvict(value = "user", allEntries = true)
    public void cleanUser() {
        System.out.println("清空 [user] 缓存 ");
    }
    //</editor-fold>

    //<editor-fold desc="字典信息缓存">
    @Cacheable(value = "dicMode", key = "'complete:'+ #dicMode.getDictype()")
    public DicMode selDicMode(DicMode dicMode) {
        DicMode result = dicModeMapper.findDicMod(dicMode);
        Map<String, DicType> dicTypeMap = result.getDicTypes().stream().collect(Collectors.toMap(DicType::getEname, a -> a, (k1, k2) -> k1));
        result.setDicTypeMap(dicTypeMap);
        return result;
    }

    /*公文流转页面用到的字典项*/
    @Cacheable(value = "dicMode", key = "'completeList:ForHandleTask'")
    public List<DicMode> selDicModesForHandleTask() {
        return redisServiceHandle.selDicModesForHandleTask();
    }

    /*业务特殊字典项*/
    @Cacheable(value = "dicMode", key = "'completeList:ForBusiness'")
    public List<DicMode> selDicModesForBusiness() {
        return redisServiceHandle.selDicModesForBusiness();
    }

    @CacheEvict(value = "dicMode", allEntries = true)
    public void cleanDicMode() {
        System.out.println("清空 [dicMode] 缓存 ");
    }
    //</editor-fold>

    //<editor-fold desc="部门信息缓存">
    /*系统中排序后的部门列表*/
    /*@Cacheable(value = "dept", key = "'completeList:ordered'")
    public List<CoreDepartment> selDeptListOrdered() {
        CoreDepartment coreDepartment = new CoreDepartment();
        coreDepartment.setFlag(new BigDecimal(1));
        List<CoreDepartment> departments = coreDepartmentMapper.listDynamic(coreDepartment);
        DecimalFormat decimalFormat = new DecimalFormat("0000");
        for (CoreDepartment department : departments) {
            BigDecimal orderNum = department.getOrderNum();
            String s = "9999";
            if (null != orderNum) {
                s = orderNum.toString();
            }
            department.setOrderBy(decimalFormat.format(Integer.parseInt(s)));
            if (null == department.getOrderBy()) {
                department.setOrderBy("9999");
            }
        }
        departments.sort((ord1, ord2) -> ord1.getOrderBy().compareTo(ord2.getOrderBy()));
        return departments;
    }*/

    /*@Cacheable(value = "dept", key = "'completeMap:ordered'")
    public Map<String, CoreDepartment> selDeptMapOrdered() {
        Map<String, CoreDepartment> result = new LinkedHashMap<>();
        SystemUtils.list2Map(redisServiceHandle.selDeptListOrdered(), "getId", CoreDepartment.class)
                .forEach((key, value) -> result.put(String.valueOf(key), value));
        return result;
    }*/

   /* @CacheEvict(value = "dept", allEntries = true)
    public void cleanDept() {
        System.out.println("清空 [dept] 缓存 ");
    }*/
    //</editor-fold>

    //<editor-fold desc="流程信息缓存">
    private final String PROCESS_TEMPLATE_MAP_KEYPREFIX = "processTemplate:Map:proDefGroupId:";

    /*流程定义缓存  不包括失效 根据表单名缓存*/
    /*@Cacheable(value = "processDef", key = "'formDefId:'+ #processDefVersion.getProcessDefManage().getFormDefId()")
    public ProcessDefVersion selProcessDef(ProcessDefVersion processDefVersion) {
        Object cachePushReady = processDefVersion.getDbParams().get("cachePushReady");
        if (null != cachePushReady) {
            return processDefVersion;
        }
        ProcessDefManage processDefManage = processDefVersion.getProcessDefManage();
        ProcessDefVersion queryBean = new ProcessDefVersion();
        queryBean.getDbParams().put("defManageFlag", "1");
        queryBean.setIsActive("1");
        queryBean.getDbParams().put("proDefGroupId", processDefManage.getProDefGroupId());
        queryBean.getDbParams().put("formDefId", processDefManage.getFormDefId());
        List<ProcessDefVersion> plist = processDefVersionMapper.list(queryBean);
        if (null != plist && !plist.isEmpty()) {
            processDefVersion = plist.get(0);
        } else {
            System.err.println("流程定义数据不存在");
            return null;
        }
        return processDefVersion;
    }*/

    /*流程定义缓存表中有效的defmanage*/
    /*@Cacheable(value = "processDefManage", key = "'processDefManageAll:id'")
    public List<ProcessDefManage> selProcessDefManage() {

        ProcessDefManage queryBean = new ProcessDefManage();
        queryBean.setFlag("1");
        List<ProcessDefManage> plist = processDefManageMapper.list(queryBean);
        return plist;
    }*/

    /*@CacheEvict(value = "processDef", key = "'formDefId:'+ #processDefVersion.getProcessDefManage().getFormDefId()")
    public void delProcessDef(ProcessDefVersion processDefVersion) {
        System.out.println("从 [processDef:formDefId：] 库中清除 [" + processDefVersion.getProcessDefManage().getFormDefId() + "] 的缓存");
    }*/

    /*@CacheEvict(value = "processDef", allEntries = true)
    public void cleanProcessDef() {
        System.out.println("清空 [processDef] 缓存 ");
    }*/

    /*流程模板缓存 包括失效 根据id 缓存*/
    /*@Cacheable(value = "processTemplate", key = "'id:'+ #processDefVersion.getId()")
    public DProcess selProcessTemplate(ProcessDefVersion processDefVersion) {
        if (null == processDefVersion.getId()) {
            System.err.println("流程定义id为空，不可以初始化模板");
            return null;
        }

        ProcessDefManage processDefManage = processDefVersion.getProcessDefManage();
        if (null == processDefManage) {
            ProcessDefVersion queryBean = new ProcessDefVersion();
            queryBean.setId(processDefVersion.getId());
            queryBean.getDbParams().put("defManageFlag", "1");
            List<ProcessDefVersion> plist = processDefVersionMapper.list(queryBean);
            if (null != plist && !plist.isEmpty()) {
                processDefVersion = plist.get(0);
                processDefManage = processDefVersion.getProcessDefManage();
            } else {
                System.err.println("流程定义数据不存在");
                return null;
            }
        }

        *//*内部调用走缓存需要走代理*//*
        processDefVersion.getDbParams().put("cachePushReady", "ok");
        redisServiceHandle.selProcessDef(processDefVersion);
//        ((RedisService) AopContext.currentProxy()).selProcessDef(processDefVersion);

        System.out.println("初始化流程配置文件");
        System.out.println(processDefVersion.getId());
        System.out.println(processDefVersion.getNameAndVersion());
        System.out.println(processDefVersion.getFilePath());
        DProcess process = null;
        try {
            String formDefId = processDefManage.getFormDefId();
            //String s = FtpUtil.ftpFile2resXmlStr(ftpAddress, ftpPort, ftpUsername, ftpPassword, ftpBasepath + linuxDirStr, processDefVersion.getFilePath());
            String realFileName="";
            if (SystemUtils.getPlatForm().equals(SystemUtils.Platform.Windows)) {
                realFileName=dirStr;
            }else {
                realFileName=linuxDirStr;
            }
            InputStream in=new FileInputStream(realFileName+processDefVersion.getFilePath());
            String s = visualController.readStream(in);
            process = rProcessInstanceService.initProcessDefByXml(s);
            process.getProcessBeans().add("fawenService");
            if ("npcHandling".equals(formDefId)) {
                process.getProcessBeans().add("formDpComposedDealService");
            }
            if (StringUtils.isNotBlank(formDefId)) {
                process.getProcessBeans().add("form" + formDefId.substring(0, 1).toUpperCase() + formDefId.substring(1) + "Service");
            }

            redisMapper.hset("processTemplate",PROCESS_TEMPLATE_MAP_KEYPREFIX + processDefManage.getProDefGroupId(), formDefId, process);
        } catch (IOException e) {
            process = null;
            e.printStackTrace();
            System.err.println("流程模板读取失败,请稍后重试");
        }

        return process;
    }*/

    /*流程相关缓存清理统一走一个接口 初始化也只走一个接口 保证数据统一*/
    /*@CacheEvict(value = "processTemplate", key = "'id:'+ #processDefVersion.getId()")
    public void delProcessTemplate(ProcessDefVersion processDefVersion) {
        if (null == processDefVersion.getId()) {
            System.err.println("流程定义id为空，流程模板删除提前结束");
            return;
        }

        ProcessDefManage processDefManage = processDefVersion.getProcessDefManage();
        if (null == processDefManage) {
            ProcessDefVersion queryBean = new ProcessDefVersion();
            queryBean.setId(processDefVersion.getId());
            queryBean.getDbParams().put("defManageFlag", "1");
            queryBean.setPaging("no");
            List<ProcessDefVersion> plist = processDefVersionMapper.list(queryBean);
            if (null != plist && !plist.isEmpty()) {
                processDefVersion = plist.get(0);
                processDefManage = processDefVersion.getProcessDefManage();
            } else {
                System.err.println("流程定义数据不存在,流程模板删除提前结束");
                return;
            }
        }

//        ((RedisService) AopContext.currentProxy()).delProcessDef(processDefVersion); 走代理需提前设计接口
        redisServiceHandle.delProcessDef(processDefVersion);
        redisMapper.hdel("processTemplate",PROCESS_TEMPLATE_MAP_KEYPREFIX + processDefManage.getProDefGroupId(), processDefManage.getFormDefId());
        redisMapper.delKeysLike("processTemplate",PROCESS_NODE_IDS_KEYPREFIX + processDefManage.getProDefGroupId());
        System.out.println("从 [processTemplate:id] 库中清除 [" + processDefVersion.getId() + "] 的缓存");
    }*/

    private final String PROCESS_NODE_IDS_KEYPREFIX = "processNodeIds:groupId:";

    /*@Cacheable(value = "processNodeIds", key = "'groupId:'+ #groupId+ ':nodeName:'+#pNodeName")
    public Set<String> selProcessNodeIds(String groupId, String pNodeName) {
        if ("allshouwen".equals(groupId)) {
            return null;
        }
        Set<String> result = new HashSet<>();

        if (StringUtils.isNotEmpty(groupId) && StringUtils.isNotEmpty(pNodeName)) {
            Map<Object, Object> hmget = redisMapper.hmget("processTemplate",PROCESS_TEMPLATE_MAP_KEYPREFIX + groupId);
            if (null == hmget || hmget.isEmpty()) {
                System.err.println("查询组分类模板未命中缓存：等待相关模板缓存重载");
                ProcessDefVersion queryBean = new ProcessDefVersion();
                queryBean.getDbParams().put("defManageFlag", "1");
                queryBean.setIsActive("1");
                queryBean.getDbParams().put("proDefGroupId", groupId);
                List<ProcessDefVersion> plist = processDefVersionMapper.list(queryBean);
                for (ProcessDefVersion processDefVersion : plist) {
                    redisServiceHandle.delProcessTemplate(processDefVersion);
                    redisServiceHandle.selProcessTemplate(processDefVersion);
                }
                hmget = redisMapper.hmget("processTemplate",PROCESS_TEMPLATE_MAP_KEYPREFIX + groupId);
                if (null == hmget || hmget.isEmpty()) {
                    System.err.println("流程模板加载失败：不存在的缓存模板分类");
                    return null;
                }
            }
            for (Map.Entry<Object, Object> objectObjectEntry : hmget.entrySet()) {
                DProcess process = (DProcess) objectObjectEntry.getValue();
                List<DNode> nodes = process.getNodes();
                for (int i = 0; i < nodes.size(); i++) {
                    if (pNodeName.equals(nodes.get(i).getName())) {
                        result.add(nodes.get(i).getId());
                        break;
                    }
                    if ("swdl".equalsIgnoreCase(pNodeName)) {
                        if (i == 0) {
                            result.add(nodes.get(i).getId());
                            break;
                        }
                    }
                    if ("swcl".equalsIgnoreCase(pNodeName)) {
                        if (i != 0) {
                            result.add(nodes.get(i).getId());
                        }
                    }
                }

            }
        } else {
            System.out.println("processNodeIds:空参数请求");
        }
        return result;
    }*/

    /*@CacheEvict(value = "processNodeIds", allEntries = true)
    public void cleanProcessNodeIds() {
        System.out.println("清空 [processNodeIds] 缓存 ");
    }*/


    /*@CacheEvict(value = "processTemplate", allEntries = true)
    public void cleanProcessRef() {
        redisServiceHandle.cleanProcessDef();
        redisServiceHandle.cleanProcessNodeIds();
        redisMapper.delKeysLike("user",PROCESS_TEMPLATE_MAP_KEYPREFIX);
        System.out.println("清空 [processTemplate] 缓存 ");
    }*/


    //</editor-fold>

    //<editor-fold desc="收文管理缓存">
    private ArrayList<String> selShouWenTypesXz;
    private ArrayList<String> selShouWenTypesDw;

    /*public void setSelShouWenTypesXz(ArrayList<String> selShouWenTypesXz) {
        this.selShouWenTypesXz = selShouWenTypesXz;
    }*/

    /*public void setSelShouWenTypesDw(ArrayList<String> selShouWenTypesDw) {
        this.selShouWenTypesDw = selShouWenTypesDw;
    }*/
    /*@Cacheable(value = "handleState", key = "'transactor:'+ #transactor")
    public String selHandleStateByTransactor(String transactor) {
        CoreUser coreUser = new CoreUser();
        coreUser.setName(transactor);
        List<CoreUser> list = coreUserMapper.list(coreUser);
        if (null != list && !list.isEmpty()) {
            CoreUser user = list.get(0);
            CoreUser cacheUser = selUser(user);
            CoreDepartment department = cacheUser.getDepartment();
            if (null != department) {
                transactor = department.getName();
            }
        }
        return transactor;
    }*/
    /*@Cacheable(value = "shouWenTypes", key = "'roleType:'+ #roleType")
    public List<ProcessDefManage> selShouWenTypes(String roleType) {
        List<ProcessDefManage> types = new ArrayList<>();
        ProcessDefVersion processDefVersion = new ProcessDefVersion();
        ProcessDefManage processDefManage = new ProcessDefManage();
        processDefVersion.setProcessDefManage(processDefManage);

        switch (roleType) {
            case "dw":
                for (String s : selShouWenTypesDw) {
                    processDefManage.setFormDefId(s);
                    ProcessDefVersion processDefVersion1 = redisServiceHandle.selProcessDef(processDefVersion);
                    types.add(processDefVersion1.getProcessDefManage());
                }
                break;
            case "xz":
                for (String s : selShouWenTypesXz) {
                    processDefManage.setFormDefId(s);
                    ProcessDefVersion processDefVersion1 = redisServiceHandle.selProcessDef(processDefVersion);
                    types.add(processDefVersion1.getProcessDefManage());
                }
                break;
            case "xz_dw":
                for (String s : selShouWenTypesXz) {
                    processDefManage.setFormDefId(s);
                    ProcessDefVersion processDefVersion1 = redisServiceHandle.selProcessDef(processDefVersion);
                    types.add(processDefVersion1.getProcessDefManage());
                }
                for (String s : selShouWenTypesDw) {
                    processDefManage.setFormDefId(s);
                    ProcessDefVersion processDefVersion1 = redisServiceHandle.selProcessDef(processDefVersion);
                    types.add(processDefVersion1.getProcessDefManage());
                }
                break;
            case "dw_xz":
                for (String s : selShouWenTypesDw) {
                    processDefManage.setFormDefId(s);
                    ProcessDefVersion processDefVersion1 = redisServiceHandle.selProcessDef(processDefVersion);
                    types.add(processDefVersion1.getProcessDefManage());
                }
                for (String s : selShouWenTypesXz) {
                    processDefManage.setFormDefId(s);
                    ProcessDefVersion processDefVersion1 = redisServiceHandle.selProcessDef(processDefVersion);
                    types.add(processDefVersion1.getProcessDefManage());
                }
                break;
        }

        if (!types.isEmpty()) {
            StringBuffer allDefIds = new StringBuffer();
            types.forEach(type -> {
                type.setIdDefIdGroupId(type.getId() + "-" + type.getFormDefId() + "-" + type.getProDefGroupId());
                allDefIds.append(type.getFormDefId() + "|");
            });
            ProcessDefManage allProcessDefManage = new ProcessDefManage();
            allProcessDefManage.setFormDefId(allDefIds.deleteCharAt(allDefIds.length() - 1).toString());
            allProcessDefManage.setIdDefIdGroupId("xxx-xxx-allshouwen");
            allProcessDefManage.setProDefGroupId("allshouwen");
            allProcessDefManage.setName("全部");
            types.add(allProcessDefManage);
        }
        return types;
    }*/

    /*@CacheEvict(value = "shouWenTypes", allEntries = true)
    public void cleanShouWenTypes() {
        System.out.println("清空 [shouWenTypes] 缓存 ");
    }*/

    private List<Map<String, String>> shouwen_manage_listmap;

    public List<Map<String, String>> getShouwen_manage_listmap() {
        return shouwen_manage_listmap;
    }

    public void setShouwen_manage_listmap(List<Map<String, String>> shouwen_manage_listmap) {
        this.shouwen_manage_listmap = shouwen_manage_listmap;
    }



    private Map<String, Map<String, String>> shouwen_manage_map;

    public Map<String, Map<String, String>> getShouwen_manage_map() {
        return shouwen_manage_map;
    }

    public void setShouwen_manage_map(Map<String, Map<String, String>> shouwen_manage_map) {
        this.shouwen_manage_map = shouwen_manage_map;
    }

    @PostConstruct
    public void initMethod() {
        System.out.println(">>>>>>>>>RedisService initMethod<<<<<<<<<<<");
        this.shouwen_manage_map = new HashMap<>();
        for (Map<String, String> stringStringMap : shouwen_manage_listmap) {
            this.shouwen_manage_map.put(stringStringMap.get("name"), stringStringMap);
        }
    }

    /*@Cacheable(value = "shouWenManageExSql", key = "#queryBean.getFormDefId()")
    public List<Map<String, String>> selShouWenManageExSql(RProcessInstance queryBean) {
        List<Map<String, String>> mapList = new ArrayList<>();
        String[] formDefIds = queryBean.getFormDefIds();

        for (String formDefId : formDefIds) {
            mapList.add(this.shouwen_manage_map.get(formDefId));
        }
        return mapList;
    }*/

    /*@CacheEvict(value = "shouWenManageExSql", allEntries = true)
    public void cleanShouWenManageExSql() {
        System.out.println("清空 [shouWenManageExSql] 缓存 ");
    }*/

    public ResultInfo<Administrator> cleanSysCache(String type) {
        ResultInfo<Administrator> ri = new ResultInfo<>();
        //Set<String> keys = redisTemplate.keys("*");
        String retainKeys = null;

        if (null == type) {
            type = "exceptLoginInfo";
        }
        switch (type) {
            case "exceptLoginInfo":
                //retainKeys = redisTemplate.keys(LOGIN_SET_KEYPREFIX + "*");
                //retainKeys.addAll(redisTemplate.keys(LOGIN_KEYPRIFIX + "*"));
                retainKeys="cleanAllCache";
                ri.setMessage("系统所有缓存清除成功");
                break;
            case "all":
                ri.setMessage("系统所有缓存清除成功,不包括登陆信息");
                break;
        }

        if ("cleanAllCache".equals(retainKeys)) {
            //keys.removeAll(retainKeys);
            redisMapper.cleanCache();
        }else {
            redisMapper.cleanNotByUserCache();
        }

        ri.setResultType("success");

        return ri;
    }


    //</editor-fold>

}

