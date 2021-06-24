package com.gwideal.core.common;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.gwideal.core.cms.l4.entity.Administrator;
import com.gwideal.core.jwt.JwtUser;
import com.gwideal.increment.generator.IncAnnoColumn;
import com.gwideal.increment.generator.IncMetaColumn;
import com.gwideal.mybatis.metautils.MetaColumn;
import com.gwideal.mybatis.metautils.ResultInfo;
import org.springframework.util.StringUtils;

import javax.persistence.Transient;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@JsonIgnoreProperties(ignoreUnknown = true)
public class CoreBaseEntity <T,B> {
	
	@javax.persistence.Transient
	private String paging = "Yes";
	@javax.persistence.Transient
	private Integer pageNo=1;//第几页
	@javax.persistence.Transient
	private Integer pageSize=15;//每页多少
	@javax.persistence.Transient
	private Integer totalRows;
	@javax.persistence.Transient
	private String entityType;
	@javax.persistence.Transient
    private String entityId;
	@javax.persistence.Transient
	protected String className;
	@javax.persistence.Transient
	protected String actionId;
	@javax.persistence.Transient
    protected Map<String,Object> dbParams = new HashMap<String,Object>();
	@javax.persistence.Transient
    private JwtUser currentUser;
	@javax.persistence.Transient
	public static String dbName;
	@javax.persistence.Transient
    public static Map<String,String> tableToEntityMap = new HashMap<String,String>();
	@javax.persistence.Transient
    private List<B> ids;
	@javax.persistence.Transient
	protected String opinion;
	@javax.persistence.Transient
	private String initType;
	@javax.persistence.Transient
	private String delAble;
	@javax.persistence.Transient
	private Administrator currCoreUser;
	@javax.persistence.Transient
	private Map<String,Object> workflowParamMap = new HashMap<String,Object>();
	@javax.persistence.Transient
	private ResultInfo result;
	@Transient
	boolean filter = true;

	@Transient
	boolean isModify = false;


	public boolean isModify() {
		return isModify;
	}

	public void setModify(boolean modify) {
		isModify = modify;
	}

	public Map<String, Object> getWorkflowParamMap() {
		return workflowParamMap;
	}
	public void setWorkflowParamMap(Map<String, Object> workflowParamMap) {
		this.workflowParamMap = workflowParamMap;
	}

	public Administrator getCurrCoreUser() {
		return currCoreUser;
	}

	public void setCurrCoreUser(Administrator currCoreUser) {
		this.currCoreUser = currCoreUser;
	}

	public String getOpinion() {
		return opinion;
	}
	public void setOpinion(String opinion) {
		this.opinion = opinion;
	}
	public JwtUser getCurrentUser() {
		return currentUser;
	}
	public void setCurrentUser(JwtUser currentUser) {
		this.currentUser = currentUser;
	}
	public static String getDbName() {
		return dbName;
	}
	public static void setDbName(String dbName) {
		CoreBaseEntity.dbName = dbName;
	}
	public static Map<String, String> getTableToEntityMap() {
		return tableToEntityMap;
	}
	public static void setTableToEntityMap(Map<String, String> tableToEntityMap) {
		CoreBaseEntity.tableToEntityMap = tableToEntityMap;
	}
	public Map<String, Object> getDbParams() {
		return dbParams;
	}
	public void setDbParams(Map<String, Object> dbParams) {
		this.dbParams = dbParams;
	}
	public String getClassName() {
		return className;
	}
	public void setClassName(String className) {
		this.className = className;
	}
	public String getActionId() {
		return actionId;
	}
	public void setActionId(String actionId) {
		this.actionId = actionId;
	}
	public String getPaging() {
		return paging;
	}
	public void setPaging(String paging) {
		this.paging = paging;
	}
	public String getEntityType() {
		return entityType;
	}
	public void setEntityType(String entityType) {
		this.entityType = entityType;
	}
	public String getEntityId() {
		return entityId;
	}
	public void setEntityId(String entityId) {
		this.entityId = entityId;
	}
	public Integer getTotalRows() {
		return totalRows;
	}
	public void setTotalRows(Integer totalRows) {
		this.totalRows = totalRows;
	}

	public ResultInfo getResult() {
		ResultInfo result = this.result;
		this.result = null;
		return result;
	}

	public void setResult(ResultInfo result) {
		this.result = result;
	}

	@JsonIgnore
	public Integer getStartRow() {
		return (pageNo-1)*pageSize;
	}
	@JsonIgnore
	public Integer getEndRow() {
		return (pageNo)*pageSize;
	}
	public Integer getPageNo() {
		return pageNo;
	}
	public void setPageNo(Integer pageNo) {
		this.pageNo = pageNo;
	}
	public Integer getPageSize() {
		return pageSize;
	}
	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}
	
	
	
	public String getInitType() {
		return initType;
	}
	public void setInitType(String initType) {
		this.initType = initType;
	}
	public List<B> getIds() {
		return ids;
	}
	public void setIds(List<B> articleCategoryIds) {
		this.ids = articleCategoryIds;
	}
	
	public static List<IncMetaColumn> getPersistentFields(Class<?> clazz) throws Exception{
		Field[] dFields = clazz.getDeclaredFields();
		List<IncMetaColumn> result=new ArrayList<IncMetaColumn>();
		for(Field f:dFields){
			if(f.getAnnotation(javax.persistence.Transient.class)==null){//如果没有标记为TransientField，则作为持久化字段处理
				if(f.getAnnotation(IncAnnoColumn.class)!=null){
					IncMetaColumn mc = new IncMetaColumn();
					IncAnnoColumn c = f.getAnnotation(IncAnnoColumn.class);
					mc.setColumnName(c.name());
					MetaColumn query = new MetaColumn();
					query.setColType(c.dbType());
					query.setDataScale(c.dataScale().equals("")?0:Integer.parseInt(c.dataScale()));
					mc.setJdbcType(c.jdbcType());
					mc.setJavaFieldName(f.getName());
					mc.setJavaType(f.getType().getTypeName());
					mc.setTypeCategory("BasicType");
					mc.setComment(c.comment());
					result.add(mc);
				}else{
					throw new Exception("持久化字段"+f.getName()+"必须标记为IncAnnoColumn");
				}
			}
		}
		return result;
	}
	
	
	@JsonIgnore
	public String getDynamicConditions() throws Exception{
		String result = " 1=1 ";
		for(IncMetaColumn mc:getPersistentFields(this.getClass())){
			PropertyDescriptor pd = new PropertyDescriptor(mc.getJavaFieldName(), this.getClass());
			Object objectValue = pd.getReadMethod().invoke(this);
			if(mc.getJavaType().equals("java.lang.String")){
				if(objectValue!=null){
					String value = (String)objectValue;
					/*if(mc.getJavaFieldName().contains("name") ||  mc.getJavaFieldName().contains("Name")){
						result += " and t."+mc.getColumnName() + " like '%#{"+mc.getJavaFieldName()+",jdbcType="+mc.getJdbcType()+"}%'";
					}else*/
					if(!StringUtils.trimWhitespace(value).equals("")){
						result += " and t."+mc.getColumnName() + " = #{"+mc.getJavaFieldName()+",jdbcType="+mc.getJdbcType()+"}";
					}
				}	
			}else if(mc.getJavaType().equals("java.lang.Integer")){
				if(objectValue!=null){
					result += " and t."+mc.getColumnName() + "=#{"+mc.getJavaFieldName()+",jdbcType="+mc.getJdbcType()+"}"; 
				}
    		}else if(mc.getJavaType().equals("java.math.BigDecimal")){
				if(objectValue!=null){
					result += " and t."+mc.getColumnName() + "=#{"+mc.getJavaFieldName()+",jdbcType="+mc.getJdbcType()+"}"; 
				}
    		}
		}
		return result;
    }
	
	public static String getFieldList(String tableName) throws Exception{
    	String result = "";
    	String className = tableToEntityMap.get(tableName);
    	for(IncMetaColumn mc:getPersistentFields(Class.forName(className))){
    		result += mc.getColumnName()+",";
    	}
    	if(result.length()>0)
    		result = result.substring(0,result.length()-1);
    	return result;
    }
	
	
	public static String getValueList(String tableName) throws Exception{
		String result = "";
		String className =  tableToEntityMap.get(tableName);
		for(IncMetaColumn mc:getPersistentFields(Class.forName(className))){
    		if(mc.getTypeCategory().equals("BasicType")){
    			result += "#{"+mc.getJavaFieldName()+",jdbcType="+mc.getJdbcType()+"},";
    		}else if(mc.getTypeCategory().equals("Reference")){
    			result += "#{"+mc.getJavaFieldName()+".id,jdbcType=VARCHAR},";
    		}
    	}
    	if(result.length()>0)
    		result = result.substring(0,result.length()-1);
    	return result;
	}
    
    public static String getUpdateList(String tableName) throws Exception{
    	String result = "";
    	String className =  tableToEntityMap.get(tableName);
    	for(IncMetaColumn mc:getPersistentFields(Class.forName(className))){
			if(!mc.getColumnName().equals("ID"))
        		if(mc.getTypeCategory().equals("BasicType")){
        			result += mc.getColumnName()+"="+"#{"+mc.getJavaFieldName()+",jdbcType="+mc.getJdbcType()+"},"  ;
        		}else if(mc.getTypeCategory().equals("Reference")){
        			result += mc.getColumnName()+"="+"#{"+mc.getJavaFieldName()+".id,jdbcType=VARCHAR},";
        		}
    	}
    	if(result.length()>0)
    		result = result.substring(0,result.length()-1);
    	return result;
	}
    
    public static String getSelectColumns(String tableName,String selectPrefix,String asPrefix) throws Exception{
    	String result = "";
    	String className =  tableToEntityMap.get(tableName);
//    	System.out.println("*******************"+tableName);
		for(IncMetaColumn mc:getPersistentFields(Class.forName(className))){
			result += selectPrefix+mc.getColumnName()+" as "+asPrefix+mc.getColumnName()+",";
    	}
    	if(result.length()>0)
    		result = result.substring(0,result.length()-1);
    	return result;
    }

	@javax.persistence.Transient
	private List<T> nodes = new ArrayList<T>();
	@javax.persistence.Transient
	private java.math.BigDecimal parentid;
	@javax.persistence.Transient
	private java.math.BigDecimal id;
	@Transient
	private Boolean processMonitor = Boolean.FALSE;

	public List<T> getNodes() {
		return nodes;
	}

	public void setNodes(List<T> nodes) {
		this.nodes = nodes;
	}

	public BigDecimal getParentid() {
		return parentid;
	}

	public void setParentid(BigDecimal parentid) {
		this.parentid = parentid;
	}

	public BigDecimal getId() {
		return id;
	}

	public void setId(BigDecimal id) {
		this.id = id;
	}

	public boolean isFilter() {
		return filter;
	}

	public void setFilter(boolean filter) {
		this.filter = filter;
	}

	public String getDelAble() {
		return delAble;
	}

	public void setDelAble(String delAble) {
		this.delAble = delAble;
	}

	public Boolean getProcessMonitor() {
		return processMonitor;
	}

	public void setProcessMonitor(Boolean processMonitor) {
		this.processMonitor = processMonitor;
	}
}
