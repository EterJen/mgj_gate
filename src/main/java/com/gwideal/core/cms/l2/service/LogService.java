package com.gwideal.core.cms.l2.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.gwideal.core.basic.l5.extend.fileoperation.SpringUtil;
import com.gwideal.core.cms.l3.dao.LogMapper;
import com.gwideal.core.cms.l4.entity.Administrator;
import com.gwideal.core.cms.l4.entity.Log;
import com.gwideal.core.common.CoreBaseEntity;
import com.gwideal.core.jwt.JwtUser;
import com.gwideal.increment.generator.IncAnnoDbName;
import com.gwideal.increment.generator.IncMetaColumn;
import com.gwideal.mybatis.metautils.ResultInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tk.mybatis.mapper.common.Mapper;

import javax.persistence.Id;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class LogService {

	@Autowired
	private LogMapper logMapper;




	public enum AuditType {
		查询, 登录,退出,新增, 修改, 删除, 新增关联, 删除关联,流转
	}


	public int create(Log log){
		return logMapper.insert(log);
	}
	
	public Log read(BigDecimal id){
		return logMapper.selectByPrimaryKey(id);
	}

	public int update(Log log){
		return logMapper.updateByPrimaryKey(log);
	}
	
	public int delete(BigDecimal id){
		return logMapper.deleteByPrimaryKey(id);
	}

	/**
	 * 对应返回值为int的数据库操作
	 *
	 * @param result
	 *            >0时表示数据库操作成功
	 * @param auditType
	 *            操作类型
	 * @param entity
	 *            操作对象
	 */
	public <P extends CoreBaseEntity> void log(int result, LogService.AuditType auditType, P entity) {
		if (result > 0) {
			log(auditType, entity);
		}
	}

	/**
	 * 对应返回值为ResutlInfo的数据库操作
	 *
	 * @param result
	 *            等于success时表示数据库操作成功
	 * @param auditType
	 *            操作类型
	 * @param entity
	 *            操作对象
	 */
	public <P extends CoreBaseEntity> void log(ResultInfo<P> result, LogService.AuditType auditType, P entity) {
		if ("success".equals(result.getResultType())) {
			log(auditType, entity);
		}
	}

	/**
	 * 根据auditType和entity，执行审计记录动作
	 *
	 * @param auditType
	 *            操作类型
	 * @param entity
	 *            操作对象
	 */
	private <P extends CoreBaseEntity<P,BigDecimal>> void log(LogService.AuditType auditType, P entity) {

		// result不为0，进行以下审计动作
		// 获取用户信息
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) SecurityContextHolder
				.getContext().getAuthentication();
		WebAuthenticationDetails details = (WebAuthenticationDetails) token.getDetails();
		Administrator currentUser = ((JwtUser) token.getPrincipal()).getCoreUser();

		// 构建审计数据
		Log ai = new Log();
		ai.setAccount(currentUser.getDisplay());// 用户姓名+用户登录名同时记录
		ai.setEntityId(String.valueOf(entity.getId()));
		/*if (null != currentUser.getDepartment()) {
			ai.setOperatorDeptId(currentUser.getDepartment().getId());
			ai.setOperatorDeptName(currentUser.getDepartment().getName());
		}*/
		ai.setCreatetime(new Date());
		ai.setCommented(auditType.name()+getClassComment(entity));
		ai.setIp(details.getRemoteAddress());
		//ai.setCustomerType(currentUser.getAuditCreateType());
//		ai.setCustomerType(coreUserService.getCustomerType(currentUser));
		// 根据操作类型，设置对应的description值
		try {
			if (auditType == LogService.AuditType.新增 || auditType == LogService.AuditType.登录 || auditType == LogService.AuditType.退出) {
				ai.setMessage("对象([id]:" + getKeyValue(entity) + ")");
			}  else if (auditType == LogService.AuditType.删除) {
				ai.setMessage("对象([id]:" + getKeyValue(entity) + ")");

			} else if (auditType == LogService.AuditType.修改) {
				// 修改操作，根据传入参数的主键值找到更新后的entity，以便分析记录修改内容--------------------------------
				String className = entity.getClass().getSimpleName();
				String mapperName = className.substring(0, 1).toLowerCase() + className.substring(1) + "Mapper";// entity命名方式和mapper命名需要满足规则
				Mapper<P> mapper = (Mapper<P>) SpringUtil.getBean(mapperName);
				P newEntity = mapper.selectByPrimaryKey(getKeyValue(entity));
				ai.setMessage("对象([id]:" + getKeyValue(entity) + ")"+ getUpdateDescription(entity, newEntity));
				// ----------------------------------------------------------------------------------------------

			} else if (auditType == LogService.AuditType.删除关联) {
				String description = "对象([id]:" + getKeyValue(entity) + ")删除了与以下对象的关联：";
				for (BigDecimal id : entity.getIds()) {
					description += id.toString();
				}
				ai.setMessage(description);

			} else if (auditType == LogService.AuditType.新增关联) {
				String description = "对象([id]:" + getKeyValue(entity) + ")新增了与以下对象的关联：";
				for (BigDecimal id : entity.getIds()) {
					description += id.toString();
				}
				ai.setMessage(description);
			} else if (auditType == LogService.AuditType.流转) {

				String description="";
				if(entity.getClass().getSimpleName().equals("RCurrentTaskInfo")){
					PropertyDescriptor pd = new PropertyDescriptor("assigneeName", entity.getClass());
					Object value = pd.getReadMethod().invoke(entity);
					description = "对象([id]:" + getKeyValue(entity) + ")流转给："+value;
				}



				ai.setMessage(description);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		logMapper.insert(ai);

	}

	/**
	 * 获取object的属性值描述
	 *
	 * @param object
	 * @return
	 * @throws Exception
	 */
	private <P extends CoreBaseEntity> String getDescription(P object) throws Exception {
		List<IncMetaColumn> mtColumns = CoreBaseEntity.getPersistentFields(object.getClass());
		String result = "{";
		for (IncMetaColumn mc : mtColumns) {

			PropertyDescriptor pd = new PropertyDescriptor(mc.getJavaFieldName(), object.getClass());
			Object value = pd.getReadMethod().invoke(object);
			if (result.equals("{"))
				result += mc.getComment() + ":" + value + "";
			else
				result += "," + mc.getComment() + ":" + value + "";
		}
		result += "}";
		return result;
	}

	/**
	 *
	 * @param entity
	 * @return 返回entity IncAnnoDbName注解中的comment值
	 */
	private <P extends CoreBaseEntity> Object getClassComment(P entity) {
		Class<? extends CoreBaseEntity> clazz = entity.getClass();
		if (clazz.isAnnotationPresent(IncAnnoDbName.class)) {
			IncAnnoDbName annotation = (IncAnnoDbName) clazz.getAnnotation(IncAnnoDbName.class);
			return annotation.comment().replace("表", "");// 不要comment中的表字
		} else{
			return null;
		}

	}

	/**
	 * 根据entity类中的id注解位置判断entity的主键，并返回entity的主键值
	 *
	 * @param entity
	 *            带有id注解的CoreBaseEntity类
	 * @return entity的主键值，如果无法获取，则返回null
	 */
	private <P extends CoreBaseEntity> Object getKeyValue(P entity) {
		Object objectValue = null;
		try {
			Class<? extends CoreBaseEntity> clazz = entity.getClass();
			Field[] fields = clazz.getDeclaredFields();
			for (Field field : fields) {
				if (field.getAnnotation(Id.class) != null) {// 拥有id标注
					PropertyDescriptor pd = new PropertyDescriptor(field.getName(), clazz);
					objectValue = pd.getReadMethod().invoke(entity);
					break;
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return objectValue;
	}

	/**
	 * 根据新老CoreBaseEntity对象返回修改说明，未修改的字段不说明
	 *
	 * @param oldObject
	 * @param newObject
	 * @return
	 * @throws Exception
	 */
	private <P extends CoreBaseEntity> String getUpdateDescription(P oldObject, P newObject) throws Exception {
		List<IncMetaColumn> mtColumns = CoreBaseEntity.getPersistentFields(oldObject.getClass());
		String result = "";
		for (IncMetaColumn mc : mtColumns) {
			if (!mc.getJavaFieldName().equals("id") && !mc.getJavaFieldName().equals("pkid")) {
				PropertyDescriptor pd = new PropertyDescriptor(mc.getJavaFieldName(), oldObject.getClass());
				Object oldObjectValue = pd.getReadMethod().invoke(oldObject);
				Object newObjectValue = pd.getReadMethod().invoke(newObject);
				String oldstrValue = oldObjectValue == null ? "空值" : oldObjectValue.toString();
				String newstrValue = newObjectValue == null ? "空值" : newObjectValue.toString();
				if (!oldstrValue.equals(newstrValue)) {
					result += "\n[" + mc.getComment() + "]的值从:" + oldstrValue + " 改为:" + newstrValue + ";";
				}
			}
		}
		return result;
	}
	
	
	public ResultInfo<Log> list(Log queryBean){
		ResultInfo<Log> result = new ResultInfo<Log>();
		if(queryBean.getPaging().equals("Yes")){
			PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
	        List<Log> plist = logMapper.list(queryBean);
	        PageInfo<Log> pageInfo = new PageInfo<Log>(plist);
	        result.setTotalRows(pageInfo.getTotal());
	        result.setBeanList(pageInfo.getList());
	        result.setResultType("success");
	        return result;
		}else{
			List<Log> plist = logMapper.list(queryBean);
			result.setTotalRows((long)plist.size());
	        result.setBeanList(plist);
	        result.setResultType("success");
	        return result;
		}
	}
		
}
